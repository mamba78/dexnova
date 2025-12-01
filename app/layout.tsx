import './globals.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';

export const metadata = {
  title: 'DexNova — Ultimate Multi-Chain Tracker 2025',
  description: 'Real-time hot pairs, Dune Analytics, boost system',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <div className="flex">
          <Sidebar />
          <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 pt-20">{children}</main>
            <Footer />
            <CookieBanner />
          </div>
        </div>
      </body>
    </html>
  );
}
