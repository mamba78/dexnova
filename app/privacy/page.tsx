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
          <p><strong>Effective Date:</strong> December 1, 2025</p>
          <p>DexNova ("we", "us", "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and disclose your information when you use our website and services.</p>
          <p><strong>Data We Collect:</strong></p>
          <ul className="list-disc pl-8 space-y-2">
            <li>Usage data (IP address, browser type, pages visited)</li>
            <li>Cookies for session management</li>
            <li>Wallet addresses for transaction tracking</li>
          </ul>
          <p><strong>How We Use Your Data:</strong></p>
          <ul className="list-disc pl-8 space-y-2">
            <li>Improve site performance</li>
            <li>Provide personalized features</li>
            <li>Analytics and research</li>
          </ul>
          <p>We do not sell your data. For questions, email <a href="mailto:privacy@dexnova.io" className="text-purple-400 hover:underline">privacy@dexnova.io</a>.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
