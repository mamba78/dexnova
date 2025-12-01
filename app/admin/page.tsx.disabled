// app/admin/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import AdminDashboard from '@/components/AdminDashboard';

export default async function AdminPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  // Simple wallet-based admin (replace with your wallet)
  const ADMIN_WALLET = "YOUR_WALLET_ADDRESS_HERE".toLowerCase();
  const userWallet = session?.user?.user_metadata?.provider_id || "";

  if (userWallet !== ADMIN_WALLET) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-4">Admin Access Denied</h1>
          <p className="text-gray-400">Connect with admin wallet</p>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}