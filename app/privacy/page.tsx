import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl font-black mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <div className="prose prose-invert text-gray-300 text-lg leading-relaxed space-y-6">
          <p>Last updated: December 2025</p>
          <p>DexNova respects your privacy. We do not collect personal information unless you voluntarily provide it.</p>
          <p>We use cookies only for essential functionality and analytics. No tracking for advertising.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
