import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Token() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl font-black mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          DEXT Token
        </h1>
        <div className="prose prose-invert text-gray-300 text-lg leading-relaxed space-y-6">
          <p>DEXT is the native utility token powering the DexNova ecosystem. It enables premium features, governance, and rewards for users and affiliates.</p>
          <p><strong>Tokenomics:</strong></p>
          <ul className="list-disc pl-8 space-y-2">
            <li><strong>Total Supply:</strong> 100,000,000 DEXT</li>
            <li><strong>Circulating Supply:</strong> 50,000,000 DEXT</li>
            <li><strong>Allocation:</strong> 40% Ecosystem, 30% Team, 20% Liquidity, 10% Marketing</li>
          </ul>
          <p><strong>Use Cases:</strong></p>
          <ul className="list-disc pl-8 space-y-2">
            <li>Boost token listings (pay with DEXT for featured spots)</li>
            <li>Access premium filters and alerts</li>
            <li>Governance voting on platform upgrades</li>
            <li>Stake for affiliate commissions</li>
          </ul>
          <p>DEXT is available on Solana DEXs. <a href="https://dexscreener.com/solana/dext-token" className="text-purple-400 hover:underline">Buy DEXT</a>.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
