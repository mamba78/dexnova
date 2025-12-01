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
          <p>DEXT is the native utility token of the DexNova ecosystem.</p>
          <p><strong>Total Supply:</strong> 100,000,000 DEXT</p>
          <p><strong>Use Cases:</strong></p>
          <ul className="list-disc pl-8 space-y-2">
            <li>Premium features access</li>
            <li>Boosted token listings</li>
            <li>Reduced trading fees</li>
            <li>Governance voting</li>
            <li>Staking rewards</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
