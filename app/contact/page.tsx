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
          <p>Email: support@dexnova.io</p>
          <p>Twitter: @dexnova</p>
          <p>Telegram: t.me/dexnova</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
