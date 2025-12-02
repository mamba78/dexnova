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
          <p>All data displayed on DexNova is sourced from public blockchain explorers and DEX protocols. We do not execute trades, hold funds, or provide financial advice.</p>
          <p>DexNova operates as a neutral data aggregator and is not affiliated with any specific project, token, or exchange.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
