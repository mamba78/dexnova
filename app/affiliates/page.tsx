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
          <p>Add <code className="bg-gray-900 px-4 py-2 rounded text-purple-400">?ref=yourname</code> to any DexNova link</p>
          <p className="text-4xl font-black text-green-400">42.8 SOL earned this month</p>
          <p>Join our affiliate program by emailing <a href="mailto:affiliates@dexnova.io" className="text-purple-400 hover:underline">affiliates@dexnova.io</a></p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
