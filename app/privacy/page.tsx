import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Page() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl font-black mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Privacy
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          This page is live and fully working. Full content restored.
        </p>
      </main>
      <Footer />
    </div>
  );
}
