import Header from '../components/Header';
import Footer from '../components/Footer';

export default function General() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl font-black mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          General Statement
        </h1>
        <div className="prose prose-invert text-gray-300 text-lg leading-relaxed space-y-6">
          <p>DexNova is a decentralized exchange data aggregator that provides real-time information about tokens, liquidity pools, and trading activity across multiple blockchain networks.</p>
          <p>We do not offer financial advice, investment recommendations, or trading signals. All data displayed is for informational purposes only.</p>
          <p>Cryptocurrency trading involves substantial risk. You should conduct your own research and consult with qualified financial advisors before making any investment decisions.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
