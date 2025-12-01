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
          <p>We use cookies to:</p>
          <ul className="list-disc pl-8 space-y-2">
            <li>Remember your preferences</li>
            <li>Improve site performance</li>
            <li>Provide analytics</li>
          </ul>
          <p>You can disable cookies in your browser settings.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
