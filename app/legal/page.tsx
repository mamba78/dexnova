import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Legal() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl font-black mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Legal Advice & Disclaimer
        </h1>
        <div className="prose prose-invert text-gray-300 text-lg leading-relaxed space-y-6">
          <p>DexNova does not provide legal, financial, or investment advice. The information on this platform is for educational and informational purposes only.</p>
          <p>Users assume all risks associated with using the platform, including but not limited to data inaccuracies, market volatility, and third-party API failures.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
