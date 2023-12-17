import {
  getSession,
  getUserDetails,
  getSubscription
} from '@/app/supabase-server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function LandingPage() {
  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription()
  ]);

  const user = session?.user;

  if (session) {
    return redirect('/dashboard');
  }

  // Dummy data for each section
  const mainHeadline = "Discover the Perfect Meal";
  const supportingHeadline = "Solving the problem of deciding what to eat";
  const uniqueSellingProposition = "Our smart menu SaaS provides personalized recommendations based on your preferences.";
  const benefits = [
    "Save time and eliminate decision fatigue",
    "Explore a variety of options tailored to your taste",
    "Discover new flavors and culinary experiences"
  ];
  const imageUrl = "https://nypost.com/wp-content/uploads/sites/2/2022/06/OR-codes.jpg?quality=75&strip=all";
  const socialProof = "satisfied customers";
  const reinforcementStatement = "Join the smart menu revolution and elevate your dining experience.";
  const closingArgument = "Don't settle for ordinary. Experience the future of menu browsing.";
  const callToAction = "Get Started";

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className=" bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-5xl font-bold">{mainHeadline}</h1>
          <p className="text-gray-400 mt-2">{supportingHeadline}</p>
          
          <Link href="/signin"  >
            sign up
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Unique Selling Proposition</h2>
            <p className="text-gray-300">{uniqueSellingProposition}</p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-4">Benefits</h2>
            <ul className="text-gray-300 list-disc pl-6">
              {benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <img src={imageUrl} alt="Meal" className="w-full md:w-1/2 rounded-lg shadow-lg" />
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-300">{socialProof}</p>
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-300">{reinforcementStatement}</p>
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-300">{closingArgument}</p>
        </div>
        <div className="flex justify-center mt-12">
          <button  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg">
          <Link href="/signin"  >
            {callToAction}
            </Link>
          </button>
        </div>
      </main>
      <footer className="bg-gray-800 py-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-400">&copy; 2022 Smart Menu SaaS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
