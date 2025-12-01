import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Cookie() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl font-black mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Cookie Policy
        </h1>
        <div className="prose prose-invert text-gray-300 text-lg leading-relaxed space-y-6">
          <p><strong>Effective Date:</strong> December 1, 2025</p>
          <p>DexNova uses cookies to enhance user experience. Cookies are small files stored on your device.</p>
          <p><strong>Cookie Types:</strong></p>
          <ul className="list-disc pl-8 space-y-2">
            <li><strong>Essential:</strong> For site functionality (session management)</li>
            <li><strong>Analytics:</strong> Google Analytics for usage data (anonymous)</li>
            <li><strong>Preferences:</strong> Remember language and theme</li>
          </ul>
          <p>You can manage cookies in your browser settings. Disabling essential cookies may break site functionality.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
