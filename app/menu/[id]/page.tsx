import { createServerSupabaseClient } from '@/app/supabase-server';
import { SearchDialog } from '@/components/SearchDialog';
import { FoodItem } from '@/components/FoodItem';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion';

async function getFoods( id: string ) {
  const supabase = createServerSupabaseClient()
  //cleaned id
  const user_id = id.replace(/['"]+/g, '')
  const { data, error } = await supabase
    .from('foods')
    .select('*')
    .eq('user_id', user_id)

  return {
    data,
    error
  }
}


interface Food {
  id: string,
  name: string,
  price: string,
  image_url: string,
  description: string,
  ingredients: string,
  category: string
}

interface Category {
  [key: string]: Food[]
}



export default async function MenuPage({ params }: { params: { id: string } }) {

  const { id } = params
  const { data: foods, error } = await getFoods(id)
  console.log(foods)
  if (error) {
    return <div 
    className='flex flex-col justify-center items-center text-white text-2xl font-bold mt-20  w-full'
    >Failed to load foods</div>;
  }
  if (!foods) {
    return <div 
    className='flex flex-col justify-center items-center text-white text-2xl font-bold mt-20  w-full'
    >Loading...</div>;
  }


  // categories hash map with category name key foods array value
  const categories = foods?.reduce((acc, food) => {
    if (!acc[food.category]) {
      acc[food.category] = [];
    }
    acc[food.category].push(food);
    return acc;
  }
  , {});

  return (
    <div className="flex flex-center justify-center space-y-4">
    <div className='flex flex-col mt-20 ml-40 mr-40 w-full'>
     <SearchDialog  />
      <div className="  text-white grid grid-cols-1 ">
       
          <Accordion type="single" collapsible className="w-full">
        { categories && Object.keys(categories).map((category, index) => (
            <AccordionItem value={category}>
            <AccordionTrigger defaultChecked={index === 0} >{category}</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories[category].map((food:Food) => (
                    <FoodItem
                      key={food.id}
                      name={food.name}
                      price={food.price}
                      image_url={food.image_url}
                      description={food.description}
                      ingredients={food.ingredients}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
        ))}
        </Accordion>
           
        
        </div>
        
    
    </div>
    
    </div>
  );
}
