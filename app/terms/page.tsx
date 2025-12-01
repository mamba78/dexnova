import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Terms() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl font-black mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Terms of Service
        </h1>
        <div className="prose prose-invert text-gray-300 text-lg leading-relaxed space-y-6">
          <p>By using DexNova, you agree to our Terms of Service.</p>
          <p>You must be 18 years or older to use this platform.</p>
          <p>We reserve the right to modify or discontinue service at any time.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
