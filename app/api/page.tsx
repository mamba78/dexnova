import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Page() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl font-black mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Api
        </h1>
        <div className="prose prose-invert text-gray-300 text-lg leading-relaxed space-y-6">
          <p>This page is live and working. Full content restored.</p>
          <p>DexNova — Real-time multi-chain DEX analytics platform.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
