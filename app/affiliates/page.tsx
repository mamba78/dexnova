import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Affiliates() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-black mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Affiliate Program
        </h1>
        <div className="text-2xl text-gray-300 space-y-8">
          <p>Earn 30% lifetime commission on all referrals</p>
          <p>Just add <code className="bg-gray-900 px-4 py-2 rounded">?ref=yourname</code> to any link</p>
          <p className="text-4xl font-black text-green-400 mt-12">42.8 SOL earned this month</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
