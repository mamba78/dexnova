import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Team() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <h1 className="text-6xl font-black text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Our Team
        </h1>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-48 h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-2">Alex Crypto</h3>
            <p className="text-purple-400 text-lg">Founder & CEO</p>
            <p className="text-gray-300 text-sm">10+ years in blockchain, built 5 DEXs</p>
          </div>
          <div className="text-center">
            <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-2">Sarah Dev</h3>
            <p className="text-blue-400 text-lg">Lead Developer</p>
            <p className="text-gray-300 text-sm">Full-stack expert, Next.js specialist</p>
          </div>
          <div className="text-center">
            <div className="w-48 h-48 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-2">Mike Analytics</h3>
            <p className="text-green-400 text-lg">Data Scientist</p>
            <p className="text-gray-300 text-sm">Real-time data wizard</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
