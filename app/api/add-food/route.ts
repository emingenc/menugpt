import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import {
  Configuration,
  OpenAIApi,
  CreateModerationResponse,
  CreateEmbeddingResponse,
} from 'openai-edge'
import { ApplicationError, UserError } from '@/lib/errors'
import { Database } from '@/types_db';

const openAiKey = process.env.OPENAI_KEY
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

const config = new Configuration({
  apiKey: openAiKey,
})
const openai = new OpenAIApi(config)

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    if (!openAiKey) {
      throw new ApplicationError('Missing environment variable OPENAI_KEY')
    }

    if (!supabaseUrl) {
      throw new ApplicationError('Missing environment variable SUPABASE_URL')
    }

    const requestData = await req.json()

    if (!requestData) {
      throw new UserError('Missing request data')
    }

    const { 
      user_id: user_id,
      name: name,
      description: description,
      ingredients: ingredients,
      price: price,
      image_url: image_url,
      calories: calories,
      category: category,

     } = requestData


    const supabaseClient = createRouteHandlerClient<Database>({cookies});

    // create doc out of request data
    const sanitizedDoc = `name:${name} description:${description} ingridients:${ingredients} price:${price} calories:${calories}, category:${category}`

    // Moderate the content to comply with OpenAI T&C
    const moderationResponse: CreateModerationResponse = await openai
      .createModeration({ input: sanitizedDoc })
      .then((res) => res.json())

    const [results] = moderationResponse.results

    if (results.flagged) {
      throw new UserError('Flagged content', {
        flagged: true,
        categories: results.categories,
      })
    }

    // Create embedding from query
    const embeddingResponse = await openai.createEmbedding({
      model: 'text-embedding-ada-002',
      input: sanitizedDoc,
    })

    if (embeddingResponse.status !== 200) {
      throw new ApplicationError('Failed to create embedding for question', embeddingResponse)
    }

    const {
      data: [{ embedding }],
    }: CreateEmbeddingResponse = await embeddingResponse.json()

    // Insert the question into the database
    const { data, error } = await supabaseClient.from('foods').insert([
      {
        user_id: user_id,
        name: name,
        description: description,
        ingredients: ingredients,
        price: price,
        image_url: image_url,
        calories: calories,
        category: category,
        embedding: embedding,
      },
    ])

    if (error) {
      throw new ApplicationError('Failed to insert question into database', error)
    }

    return new Response(
      JSON.stringify({
        data,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )

  } catch (err: unknown) {
    if (err instanceof UserError) {
      return new Response(
        JSON.stringify({
          error: err.message,
          data: err.data,
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    } else if (err instanceof ApplicationError) {
      // Print out application errors with their additional data
      console.error(`${err.message}: ${JSON.stringify(err.data)}`)
    } else {
      // Print out unexpected errors as is to help with debugging
      console.error(err)
    }

    return new Response(
      JSON.stringify({
        error: 'There was an error processing your request',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
