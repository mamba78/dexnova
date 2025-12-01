import './globals.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';

export const metadata = {
  title: 'DexNova — Multi-Chain DEX Tracker',
  description: 'Hot Pairs • Real-Time • 8 Chains',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen font-sans">
        <div className="flex">
          <Sidebar />
          <div className="flex-1 lg:ml-64">
            <Header />
            <main className="pt-20 pb-32">{children}</main>
            <Footer />
            <CookieBanner />
          </div>
        </div>
      </body>
    </html>
  );
}
