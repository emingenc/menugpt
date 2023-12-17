'use client'
// Components from your UI library
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from "@/components/ui/button";

// Form library and validation setup
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// UI components from your library
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { postData } from "@/utils/helpers";

// Define the form schema for food item details
const formSchema = z.object({
  user_id: z.string(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  price: z.string(),
  description: z.string().optional(),
  image_url: z.string().optional(), // Adjust type if image upload uses different approach
  ingredients: z.string().optional(),
  calories: z.string().optional(),
  category: z.string().optional()
});

interface AddFoodProps {
  userId: any;
}

export  function AddFood({ userId }: AddFoodProps) {
  // Initialize form hooks with schema and default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: userId,
      name: "",
      price: '',
      description: "",
      image_url: "",
      ingredients: "",
      calories: "",
      category: ""
    },
  });

  // Submit handler for adding the new food item
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Perform your desired logic here, like sending data to API or updating local state
    // console.log("Adding new food item:", values);
    // Show success message or perform additional actions
    postData(
      {
        url: '/api/add-food',
        data: values 
      }
    )
    // refresh the page wait 1 second
    setTimeout(function(){ window.location.reload(); }, 1000);
  }

  function BulkUpload() {
    // Perform your desired logic here, like sending data to API or updating local state
    console.log("Bulk Upload");
    // Show success message or perform additional actions
    const datas = [ 
      {
          "name": "Spinach Artichoke Dip",
          "price": "6.99",
          "description": "Creamy spinach and artichoke dip served with tortilla chips",
          "image_url": "https://example.com/spinach-dip.jpg",
          "ingredients": "Spinach, artichoke, cream cheese",
          "category": "Appetizers",
          "calories": 320
        },
        {
          "name": "Bruschetta",
          "price": "5.99",
          "description": "Toasted bread topped with diced tomatoes, garlic, and basil",
          "image_url": "https://example.com/bruschetta.jpg",
          "ingredients": "Tomatoes, garlic, basil, bread",
          "category": "Appetizers",
          "calories": 180
        },
        {
          "name": "Chicken Wings",
          "price": "8.99",
          "description": "Crispy chicken wings tossed in your choice of sauce",
          "image_url": "https://example.com/chicken-wings.jpg",
          "ingredients": "Chicken wings, sauce",
          "category": "Appetizers",
          "calories": 450
        },
        {
          "name": "Stuffed Mushrooms",
          "price": "7.50",
          "description": "Mushroom caps stuffed with a savory filling",
          "image_url": "https://example.com/stuffed-mushrooms.jpg",
          "ingredients": "Mushrooms, filling",
          "category": "Appetizers",
          "calories": 250
        },
        {
          "name": "Shrimp Cocktail",
          "price": "9.99",
          "description": "Chilled shrimp served with cocktail sauce",
          "image_url": "https://example.com/shrimp-cocktail.jpg",
          "ingredients": "Shrimp, cocktail sauce",
          "category": "Appetizers",
          "calories": 180
        },
        {
          "name": "Mozzarella Sticks",
          "price": "6.50",
          "description": "Golden-fried mozzarella sticks with marinara sauce",
          "image_url": "https://example.com/mozzarella-sticks.jpg",
          "ingredients": "Mozzarella, breading, marinara sauce",
          "category": "Appetizers",
          "calories": 320
        },
        {
          "name": "Crispy Calamari",
          "price": "8.50",
          "description": "Lightly breaded and fried calamari rings with aioli dip",
          "image_url": "https://example.com/crispy-calamari.jpg",
          "ingredients": "Calamari, breading, aioli",
          "category": "Appetizers",
          "calories": 380
        },
        {
          "name": "Caesar Salad",
          "price": "8.99",
          "description": "Romaine lettuce, croutons, parmesan cheese, and Caesar dressing",
          "image_url": "https://example.com/caesar-salad.jpg",
          "ingredients": "Romaine lettuce, croutons, parmesan cheese, Caesar dressing",
          "category": "Soups and Salads",
          "calories": 280
        },
        {
          "name": "Tomato Basil Soup",
          "price": "5.99",
          "description": "Classic tomato soup with fresh basil",
          "image_url": "https://example.com/tomato-basil-soup.jpg",
          "ingredients": "Tomatoes, basil, broth",
          "category": "Soups and Salads",
          "calories": 210
        },
        {
          "name": "Greek Salad",
          "price": "9.50",
          "description": "Mixed greens, tomatoes, cucumbers, feta cheese, and olives",
          "image_url": "https://example.com/greek-salad.jpg",
          "ingredients": "Mixed greens, tomatoes, cucumbers, feta cheese, olives",
          "category": "Soups and Salads",
          "calories": 320
        },
        {
          "name": "Minestrone Soup",
          "price": "6.50",
          "description": "Hearty vegetable soup with beans and pasta",
          "image_url": "https://example.com/minestrone-soup.jpg",
          "ingredients": "Vegetables, beans, pasta, broth",
          "category": "Soups and Salads",
          "calories": 240
        },
        {
          "name": "Spinach Strawberry Salad",
          "price": "7.99",
          "description": "Fresh spinach, strawberries, feta cheese, and balsamic vinaigrette",
          "image_url": "https://example.com/spinach-strawberry-salad.jpg",
          "ingredients": "Spinach, strawberries, feta cheese, balsamic vinaigrette",
          "category": "Soups and Salads",
          "calories": 180
        },
        {
          "name": "Lentil Soup",
          "price": "6.99",
          "description": "Hearty lentil soup with vegetables and spices",
          "image_url": "https://example.com/lentil-soup.jpg",
          "ingredients": "Lentils, vegetables, spices, broth",
          "category": "Soups and Salads",
          "calories": 290
        },
        {
          "name": "Cobb Salad",
          "price": "10.50",
          "description": "Mixed greens, grilled chicken, bacon, avocado, and blue cheese",
          "image_url": "https://example.com/cobb-salad.jpg",
          "ingredients": "Mixed greens, grilled chicken, bacon, avocado, blue cheese",
          "category": "Soups and Salads",
          "calories": 420
        },
        {
          "name": "Grilled Salmon",
          "price": "16.99",
          "description": "Fresh grilled salmon fillet with lemon dill sauce",
          "image_url": "https://example.com/grilled-salmon.jpg",
          "ingredients": "Salmon, lemon, dill",
          "category": "Main Courses",
          "calories": 380
        },
        {
          "name": "Chicken Parmesan",
          "price": "14.50",
          "description": "Breaded and baked chicken topped with marinara and melted cheese",
          "image_url": "https://example.com/chicken-parmesan.jpg",
          "ingredients": "Chicken, marinara sauce, cheese",
          "category": "Main Courses",
          "calories": 450
        },
        {
          "name": "Vegetable Stir-Fry",
          "price": "12.99",
          "description": "Assorted vegetables stir-fried in a savory sauce, served over rice",
          "image_url": "https://example.com/vegetable-stir-fry.jpg",
          "ingredients": "Assorted vegetables, sauce, rice",
          "category": "Main Courses",
          "calories": 320
        },
        {
          "name": "Beef Tenderloin Steak",
          "price": "19.99",
          "description": "Juicy beef tenderloin steak cooked to perfection",
          "image_url": "https://example.com/beef-steak.jpg",
          "ingredients": "Beef tenderloin, seasoning",
          "category": "Main Courses",
          "calories": 550
        },
        {
          "name": "Eggplant Parmesan",
          "price": "13.50",
          "description": "Breaded and baked eggplant topped with marinara and melted cheese",
          "image_url": "https://example.com/eggplant-parmesan.jpg",
          "ingredients": "Eggplant, marinara sauce, cheese",
          "category": "Main Courses",
          "calories": 320
        },
        {
          "name": "Shrimp Scampi Pasta",
          "price": "16.50",
          "description": "Linguine pasta with succulent shrimp in a garlic butter sauce",
          "image_url": "https://example.com/shrimp-scampi.jpg",
          "ingredients": "Shrimp, linguine, garlic butter sauce",
          "category": "Main Courses",
          "calories": 420
        },
        {
          "name": "Mushroom Risotto",
          "price": "15.99",
          "description": "Creamy risotto with mushrooms and Parmesan cheese",
          "image_url": "https://example.com/mushroom-risotto.jpg",
          "ingredients": "Risotto, mushrooms, Parmesan cheese",
          "category": "Main Courses",
          "calories": 380
        },
        {
          "name": "Garlic Mashed Potatoes",
          "price": "4.99",
          "description": "Creamy mashed potatoes with roasted garlic",
          "image_url": "https://example.com/mashed-potatoes.jpg",
          "ingredients": "Potatoes, butter, garlic",
          "category": "Side Dishes",
          "calories": 220
        },
        {
          "name": "Grilled Vegetables",
          "price": "5.50",
          "description": "Assorted vegetables grilled to perfection",
          "image_url": "https://example.com/grilled-vegetables.jpg",
          "ingredients": "Zucchini, bell peppers, mushrooms",
          "category": "Side Dishes",
          "calories": 180
        },
        {
          "name": "Steamed Asparagus",
          "price": "6.99",
          "description": "Tender asparagus spears steamed to perfection",
          "image_url": "https://example.com/steamed-asparagus.jpg",
          "ingredients": "Asparagus, olive oil, salt",
          "category": "Side Dishes",
          "calories": 120
        },
        {
          "name": "Crispy Onion Rings",
          "price": "4.50",
          "description": "Golden-fried onion rings with a crunchy coating",
          "image_url": "https://example.com/onion-rings.jpg",
          "ingredients": "Onions, batter",
          "category": "Side Dishes",
          "calories": 280
        },
        {
          "name": "Quinoa Pilaf",
          "price": "5.99",
          "description": "Fluffy quinoa cooked with vegetables and herbs",
          "image_url": "https://example.com/quinoa-pilaf.jpg",
          "ingredients": "Quinoa, vegetables, herbs",
          "category": "Side Dishes",
          "calories": 220
        },
        {
          "name": "Sweet Potato Fries",
          "price": "5.50",
          "description": "Crispy sweet potato fries seasoned with spices",
          "image_url": "https://example.com/sweet-potato-fries.jpg",
          "ingredients": "Sweet potatoes, spices",
          "category": "Side Dishes",
          "calories": 250
        },
        {
          "name": "Caprese Salad",
          "price": "6.50",
          "description": "Sliced tomatoes, fresh mozzarella, and basil drizzled with balsamic glaze",
          "image_url": "https://example.com/caprese-salad.jpg",
          "ingredients": "Tomatoes, mozzarella, basil, balsamic glaze",
          "category": "Side Dishes",
          "calories": 160
        },
        {
          "name": "Chocolate Lava Cake",
          "price": "7.99",
          "description": "Warm chocolate cake with a gooey molten center, served with vanilla ice cream",
          "image_url": "https://example.com/chocolate-lava-cake.jpg",
          "ingredients": "Chocolate cake, molten center, vanilla ice cream",
          "category": "Desserts",
          "calories": 450
        },
        {
          "name": "New York Cheesecake",
          "price": "6.50",
          "description": "Creamy cheesecake with a graham cracker crust, topped with fruit compote",
          "image_url": "https://example.com/cheesecake.jpg",
          "ingredients": "Cream cheese, graham cracker crust, fruit compote",
          "category": "Desserts",
          "calories": 380
        },
        {
          "name": "Tiramisu",
          "price": "8.50",
          "description": "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream",
          "image_url": "https://example.com/tiramisu.jpg",
          "ingredients": "Ladyfingers, coffee, mascarpone cream",
          "category": "Desserts",
          "calories": 320
        },
        {
          "name": "Fruit Tart",
          "price": "9.99",
          "description": "Buttery tart crust filled with pastry cream and topped with fresh seasonal fruits",
          "image_url": "https://example.com/fruit-tart.jpg",
          "ingredients": "Tart crust, pastry cream, fresh fruits",
          "category": "Desserts",
          "calories": 280
        },
        {
          "name": "Molten Caramel Brownie",
          "price": "7.50",
          "description": "Rich chocolate brownie with a gooey caramel center, served warm",
          "image_url": "https://example.com/caramel-brownie.jpg",
          "ingredients": "Chocolate brownie, caramel filling",
          "category": "Desserts",
          "calories": 420
        },
        {
          "name": "Strawberry Shortcake",
          "price": "6.99",
          "description": "Layers of sponge cake with fresh strawberries and whipped cream",
          "image_url": "https://example.com/strawberry-shortcake.jpg",
          "ingredients": "Sponge cake, strawberries, whipped cream",
          "category": "Desserts",
          "calories": 350
        },
        {
          "name": "Dark Chocolate Mousse",
          "price": "8.99",
          "description": "Velvety dark chocolate mousse topped with a dollop of whipped cream",
          "image_url": "https://example.com/chocolate-mousse.jpg",
          "ingredients": "Dark chocolate, mousse, whipped cream",
          "category": "Desserts",
          "calories": 300
        },
        {
          "name": "Classic Mojito",
          "price": "9.99",
          "description": "Refreshing cocktail with fresh lime, mint, and rum",
          "image_url": "https://example.com/mojito.jpg",
          "ingredients": "Lime, mint, rum, soda water",
          "category": "Beverages",
          "calories": 150
        },
        {
          "name": "Iced Caramel Macchiato",
          "price": "5.50",
          "description": "Espresso with milk and caramel syrup, served over ice",
          "image_url": "https://example.com/caramel-macchiato.jpg",
          "ingredients": "Espresso, milk, caramel syrup, ice",
          "category": "Beverages",
          "calories": 200
        },
        {
          "name": "Freshly Squeezed Orange Juice",
          "price": "4.99",
          "description": "Juicy and tangy orange juice made from freshly squeezed oranges",
          "image_url": "https://example.com/orange-juice.jpg",
          "ingredients": "Oranges",
          "category": "Beverages",
          "calories": 120
        },
        {
          "name": "Hot Green Tea",
          "price": "3.99",
          "description": "Steaming cup of green tea with a subtle, earthy flavor",
          "image_url": "https://example.com/green-tea.jpg",
          "ingredients": "Green tea leaves, hot water",
          "category": "Beverages",
          "calories": 5
        },
        {
          "name": "Strawberry Lemonade",
          "price": "6.50",
          "description": "Homemade lemonade with fresh strawberries and a hint of mint",
          "image_url": "https://example.com/strawberry-lemonade.jpg",
          "ingredients": "Lemonade, strawberries, mint",
          "category": "Beverages",
          "calories": 180
        },
        {
          "name": "Sparkling Water with Lime",
          "price": "2.99",
          "description": "Bubbly sparkling water infused with a squeeze of fresh lime",
          "image_url": "https://example.com/sparkling-water.jpg",
          "ingredients": "Sparkling water, lime",
          "category": "Beverages",
          "calories": 0
        },
        {
          "name": "Mango Lassi",
          "price": "7.99",
          "description": "Creamy yogurt drink with ripe mango and a touch of cardamom",
          "image_url": "https://example.com/mango-lassi.jpg",
          "ingredients": "Yogurt, mango, cardamom",
          "category": "Beverages",
          "calories": 250
        },
        {
          "name": "Turkey Club Sandwich",
          "price": "10.99",
          "description": "Triple-decker sandwich with roasted turkey, bacon, lettuce, and tomato",
          "image_url": "https://example.com/turkey-club-sandwich.jpg",
          "ingredients": "Roasted turkey, bacon, lettuce, tomato, mayonnaise",
          "category": "Sandwiches and Wraps",
          "calories": 550
        },
        {
          "name": "Caprese Panini",
          "price": "8.50",
          "description": "Grilled panini with fresh mozzarella, tomatoes, basil, and balsamic glaze",
          "image_url": "https://example.com/caprese-panini.jpg",
          "ingredients": "Mozzarella, tomatoes, basil, balsamic glaze",
          "category": "Sandwiches and Wraps",
          "calories": 420
        },
        {
          "name": "Chicken Caesar Wrap",
          "price": "9.99",
          "description": "Grilled chicken, romaine lettuce, parmesan cheese, and Caesar dressing in a wrap",
          "image_url": "https://example.com/caesar-wrap.jpg",
          "ingredients": "Grilled chicken, romaine lettuce, parmesan cheese, Caesar dressing, wrap",
          "category": "Sandwiches and Wraps",
          "calories": 480
        },
        {
          "name": "BLT Sandwich",
          "price": "7.50",
          "description": "Classic sandwich with crispy bacon, lettuce, and tomato on toasted bread",
          "image_url": "https://example.com/blt-sandwich.jpg",
          "ingredients": "Bacon, lettuce, tomato, bread, mayonnaise",
          "category": "Sandwiches and Wraps",
          "calories": 400
        },
        {
          "name": "Vegetarian Wrap",
          "price": "8.99",
          "description": "Colorful wrap with hummus, roasted vegetables, and mixed greens",
          "image_url": "https://example.com/vegetarian-wrap.jpg",
          "ingredients": "Hummus, roasted vegetables, mixed greens, wrap",
          "category": "Sandwiches and Wraps",
          "calories": 350
        },
        {
          "name": "Grilled Cheese Sandwich",
          "price": "6.50",
          "description": "Classic comfort food with melted cheese on grilled bread",
          "image_url": "https://example.com/grilled-cheese.jpg",
          "ingredients": "Cheese, bread, butter",
          "category": "Sandwiches and Wraps",
          "calories": 320
        },
        {
          "name": "Chicken Avocado Club Wrap",
          "price": "10.50",
          "description": "Grilled chicken, avocado, bacon, lettuce, and tomato in a wrap",
          "image_url": "https://example.com/avocado-wrap.jpg",
          "ingredients": "Grilled chicken, avocado, bacon, lettuce, tomato, wrap",
          "category": "Sandwiches and Wraps",
          "calories": 520
        }
        ,{
          "name": "Classic Cheeseburger",
          "price": "9.99",
          "description": "Juicy beef patty with American cheese, lettuce, tomato, and pickles",
          "image_url": "https://example.com/classic-cheeseburger.jpg",
          "ingredients": "Beef patty, American cheese, lettuce, tomato, pickles",
          "category": "Burgers",
          "calories": 600
        },
        {
          "name": "Bacon BBQ Burger",
          "price": "11.50",
          "description": "Grilled beef patty with crispy bacon, cheddar cheese, BBQ sauce, and onion rings",
          "image_url": "https://example.com/bacon-bbq-burger.jpg",
          "ingredients": "Beef patty, bacon, cheddar cheese, BBQ sauce, onion rings",
          "category": "Burgers",
          "calories": 700
        },
        {
          "name": "Veggie Burger",
          "price": "8.99",
          "description": "Plant-based patty with lettuce, tomato, onion, and vegan mayo",
          "image_url": "https://example.com/veggie-burger.jpg",
          "ingredients": "Veggie patty, lettuce, tomato, onion, vegan mayo",
          "category": "Burgers",
          "calories": 450
        },
        {
          "name": "Mushroom Swiss Burger",
          "price": "10.50",
          "description": "Beef patty topped with sautéed mushrooms, Swiss cheese, and truffle aioli",
          "image_url": "https://example.com/mushroom-swiss-burger.jpg",
          "ingredients": "Beef patty, mushrooms, Swiss cheese, truffle aioli",
          "category": "Burgers",
          "calories": 650
        },
        {
          "name": "Spicy Jalapeño Burger",
          "price": "10.99",
          "description": "Spicy beef patty with pepper jack cheese, jalapeños, and chipotle mayo",
          "image_url": "https://example.com/jalapeno-burger.jpg",
          "ingredients": "Spicy beef patty, pepper jack cheese, jalapeños, chipotle mayo",
          "category": "Burgers",
          "calories": 670
        },
        {
          "name": "Blue Cheese Burger",
          "price": "11.50",
          "description": "Beef patty with tangy blue cheese, caramelized onions, and arugula",
          "image_url": "https://example.com/blue-cheese-burger.jpg",
          "ingredients": "Beef patty, blue cheese, caramelized onions, arugula",
          "category": "Burgers",
          "calories": 620
        },
        {
          "name": "Guacamole Turkey Burger",
          "price": "10.99",
          "description": "Grilled turkey patty with guacamole, lettuce, and tomato",
          "image_url": "https://example.com/turkey-burger.jpg",
          "ingredients": "Turkey patty, guacamole, lettuce, tomato",
          "category": "Burgers",
          "calories": 500
        },{
          "name": "Margherita Pizza",
          "price": "12.99",
          "description": "Classic pizza with tomato sauce, fresh mozzarella, and basil",
          "image_url": "https://example.com/margherita-pizza.jpg",
          "ingredients": "Tomato sauce, mozzarella, basil",
          "category": "Pizza/Pasta",
          "calories": 800
        },
        {
          "name": "Spaghetti Bolognese",
          "price": "11.50",
          "description": "Spaghetti with savory Bolognese sauce made with ground beef and tomatoes",
          "image_url": "https://example.com/spaghetti-bolognese.jpg",
          "ingredients": "Spaghetti, ground beef, tomatoes, herbs",
          "category": "Pizza/Pasta",
          "calories": 750
        },
        {
          "name": "Pepperoni Pizza",
          "price": "13.99",
          "description": "Classic pizza topped with pepperoni, tomato sauce, and mozzarella",
          "image_url": "https://example.com/pepperoni-pizza.jpg",
          "ingredients": "Pepperoni, tomato sauce, mozzarella",
          "category": "Pizza/Pasta",
          "calories": 850
        },
        {
          "name": "Chicken Alfredo Pizza",
          "price": "14.50",
          "description": "White pizza with Alfredo sauce, grilled chicken, and spinach",
          "image_url": "https://example.com/chicken-alfredo-pizza.jpg",
          "ingredients": "Alfredo sauce, chicken, spinach",
          "category": "Pizza/Pasta",
          "calories": 900
        },
        {
          "name": "Penne alla Vodka",
          "price": "12.99",
          "description": "Penne pasta in a creamy vodka sauce with tomatoes and herbs",
          "image_url": "https://example.com/penne-alla-vodka.jpg",
          "ingredients": "Penne pasta, vodka sauce, tomatoes, herbs",
          "category": "Pizza/Pasta",
          "calories": 820
        },
        {
          "name": "Four Cheese Pizza",
          "price": "13.50",
          "description": "Pizza topped with a blend of four cheeses: mozzarella, cheddar, feta, and parmesan",
          "image_url": "https://example.com/four-cheese-pizza.jpg",
          "ingredients": "Mozzarella, cheddar, feta, parmesan",
          "category": "Pizza/Pasta",
          "calories": 880
        },
        {
          "name": "Vegetable Lasagna",
          "price": "12.99",
          "description": "Layered lasagna with a variety of fresh vegetables and marinara sauce",
          "image_url": "https://example.com/vegetable-lasagna.jpg",
          "ingredients": "Lasagna noodles, vegetables, marinara sauce",
          "category": "Pizza/Pasta",
          "calories": 790
        }
        
  
    ]

    for (const data of datas) {
      const uploadData = {
        user_id: userId,
        ...data
      }
      postData(
        {
          url: '/api/add-food',
          data: uploadData 
        }
      )
    }
  }

  return (
      <Dialog >
      <DialogTrigger asChild>
      <Button
        className="text-base flex gap-2 items-center px-4 py-2 z-50 relative
        text-slate-500 dark:text-slate-400  hover:text-slate-700 dark:hover:text-slate-300
        transition-colors
        rounded-full
        border border-slate-200 dark:border-slate-500 hover:border-slate-300 dark:hover:border-slate-500
        w-50 h-30
        absolute bottom-10 right-10"
      >
        <span className="inline-block  text-center">
          <p className="flex text-center">
            new food
          </p>
          </span>

      </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[950px] max-h-[100vh] overflow-y-auto text-black">
        <Card className="dark">
          <CardHeader>
            <CardTitle>Add Food Details</CardTitle>
            <CardDescription>Fill in the fields below to add a new dish.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dish Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Pizza Margherita" {...field} />
                      </FormControl>
                      <FormDescription>Enter the name of your dish.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (in USD)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="10.99"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Enter the price per serving.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Spicy tomato sauce, mozzarella cheese..." {...field} />
                      </FormControl>
                      <FormDescription>Describe your dish's flavors and ingredients.</FormDescription>
                    </FormItem>
                  )}
                />
<FormField
                  control={form.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL (optional)</FormLabel>
                      <FormControl>
                        <Input type="url" placeholder="https://..." {...field} />
                      </FormControl>
                      <FormDescription>Add a relevant image URL for your dish.</FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ingredients"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ingredients</FormLabel>
                      <FormControl>
                        < Input type="text" placeholder="Tomato sauce, mozzarella cheese..." {...field} />
                      </FormControl>
                      <FormDescription>specify all ingredients used with comma ','. </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="calories"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Calories</FormLabel>
                      <FormControl>
                        < Input type="text" placeholder="1000" {...field} />
                      </FormControl>
                      <FormDescription>specify the calories of the dish. </FormDescription>
                    </FormItem>
                  )}
                />
              <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        < Input type="text" placeholder="Appetizers (Starters),Soups and Salads , Pizza/Pasta ..." {...field} />
                      </FormControl>
                      <FormDescription>specify the category of the dish. </FormDescription>
                    </FormItem>
                  )}
                />
                <Button type="submit">Add Food Item</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            {/* Additional actions or options could be placed here, like cancel button or preview */}
            {/* <Button className="ml-auto" variant="ghost"
            onClick={()=> BulkUpload() }> 
             Bulk Upload
            </Button> */}
          </CardFooter>
        </Card>
      </DialogContent>
      </Dialog>
  );
}