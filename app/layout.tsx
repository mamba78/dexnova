import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'DexNova — The DEX Tracker That Pays YOU',
  description: 'Real-time Solana & multi-chain meme coin tracker with Jupiter affiliate revenue',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-black text-white">
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
