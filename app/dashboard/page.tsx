import {
  getSession,
  getUserDetails,
  getSubscription,
  createServerSupabaseClient
} from '@/app/supabase-server';
import { redirect } from 'next/navigation';
import { AddFood} from '@/components/CreateFood';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion';
import { FoodItem } from '@/components/FoodItem';


export default async function DashboardPage() {
  const supabase = createServerSupabaseClient();
  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription()
  ]);


  const user = session?.user;

  if (!session) {
    return redirect('/signin');
  }
  const { data: foods , error } = await supabase
  .from('foods')
  .select('*')
  .eq('user_id', user?.id);
   
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
   <div className="flex text-white flex-center justify-center space-y-4 mt-20 ml-40 mr-40">
    <Accordion type="single" collapsible className="w-full">
        { categories && Object.keys(categories).map((category, index) => (
            <AccordionItem  value={category}>
            <AccordionTrigger  >{category}</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories[category].map((food) => (
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
      <AddFood userId={user?.id} />
    </div>
  );
}
