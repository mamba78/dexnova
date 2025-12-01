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
          <p>DexNova is a cutting-edge multi-chain DEX analytics platform launched in 2025. We track real-time data from 8 major blockchains, providing traders with actionable insights on hot pairs, volume, liquidity, and market trends.</p>
          <p>Founded by crypto veterans with over 10 years of experience, DexNova aims to be the go-to tool for degens and professionals alike. Our platform is built on Next.js 15 for lightning-fast performance and GeckoTerminal API for reliable data.</p>
          <p><strong>Key Features:</strong></p>
          <ul className="list-disc pl-8 space-y-2">
            <li>Real-time multi-chain tracking</li>
            <li>Advanced filters and charts</li>
            <li>Token boost and affiliate programs</li>
            <li>Admin dashboard for customization</li>
          </ul>
          <p>Join our community on <a href="https://twitter.com/dexnova" className="text-purple-400 hover:underline">Twitter</a> and <a href="https://t.me/dexnova" className="text-purple-400 hover:underline">Telegram</a>.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
