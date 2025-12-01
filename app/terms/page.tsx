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
          <p><strong>Effective Date:</strong> December 1, 2025</p>
          <p>By using DexNova, you agree to these Terms of Service. If you do not agree, do not use the platform.</p>
          <p><strong>User Responsibilities:</strong></p>
          <ul className="list-disc pl-8 space-y-2">
            <li>You are responsible for your account security</li>
            <li>You must comply with all applicable laws</li>
            <li>You agree not to use the platform for illegal activities</li>
          </ul>
          <p><strong>Limited Liability:</strong> DexNova is not liable for any losses from trading or data errors. The platform is provided "as is".</p>
          <p>For disputes, contact <a href="mailto:legal@dexnova.io" className="text-purple-400 hover:underline">legal@dexnova.io</a>.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
