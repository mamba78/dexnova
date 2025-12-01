import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Legal() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl font-black mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Legal Advice
        </h1>
        <div className="prose prose-invert text-gray-300 text-lg leading-relaxed space-y-6">
          <p>The information provided on DexNova is not legal advice. We are not lawyers and do not provide legal services.</p>
          <p>Users are responsible for compliance with laws and regulations in their jurisdiction regarding cryptocurrency trading and taxation.</p>
          <p>DexNova operates as a data provider and is not registered as a financial institution, broker, or advisor in any jurisdiction.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
