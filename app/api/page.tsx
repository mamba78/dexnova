import Header from '../components/Header';
import Footer from '../components/Footer';

export default function API() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl font-black mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          API Documentation
        </h1>
        <div className="bg-gray-900 p-8 rounded-xl border border-gray-700">
          <code className="text-green-400">GET https://api.dexnova.io/v1/pools/solana</code>
          <p className="text-gray-300 mt-4">Free tier: 100 requests/min</p>
          <p className="text-gray-300">Pro tier: 10,000 requests/min</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
