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
        <div className="bg-gray-900 p-8 rounded-xl border border-gray-700 space-y-6">
          <h2 className="text-2xl font-bold">Get Hot Pairs</h2>
          <code className="block bg-gray-800 p-4 rounded text-green-400 text-sm">GET /api/pools?chain=solana</code>
          <p className="text-gray-300">Response: JSON with trending pools</p>
          <h2 className="text-2xl font-bold">Get Token Detail</h2>
          <code className="block bg-gray-800 p-4 rounded text-green-400 text-sm">GET /api/token/:address</code>
          <p className="text-gray-300">Free tier: 100 calls/min | Pro: 10,000 calls/min</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
