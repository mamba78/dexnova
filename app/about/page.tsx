import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl font-black mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          About DexNova
        </h1>
        <div className="prose prose-invert text-gray-300 text-lg leading-relaxed space-y-6">
          <p>DexNova is the next-generation multi-chain DEX tracker built for traders who demand speed, accuracy, and real-time insights.</p>
          <p>Launched in 2025, we support 8 major chains including Solana, Ethereum, Base, Arbitrum, and ZKsync Era — with more coming soon.</p>
          <p>Our mission is to become the most trusted and fastest DEX analytics platform in crypto.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
