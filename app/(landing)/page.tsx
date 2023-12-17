import {
  getSession,
  getUserDetails,
  getSubscription
} from '@/app/supabase-server';
import { redirect } from 'next/navigation';

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

  return (
   <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-semibold">Welcome to the landing page!</h1>
      <p className="text-gray-500">
        This page is public and does not require authentication.
      </p>
    </div>
  );
}
