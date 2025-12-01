import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-black mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Contact Us
        </h1>
        <div className="space-y-8 text-xl">
          <p>Email: <a href="mailto:support@dexnova.io" className="text-purple-400 hover:underline">support@dexnova.io</a></p>
          <p>Twitter: <a href="https://twitter.com/dexnova" className="text-purple-400 hover:underline">@dexnova</a></p>
          <p>Telegram: <a href="https://t.me/dexnova" className="text-purple-400 hover:underline">t.me/dexnova</a></p>
          <p>Discord: <a href="https://discord.gg/dexnova" className="text-purple-400 hover:underline">discord.gg/dexnova</a></p>
          <p>Business inquiries: <a href="mailto:partnerships@dexnova.io" className="text-purple-400 hover:underline">partnerships@dexnova.io</a></p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
