import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SupabaseProvider } from "@/lib/supabaseClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DexNova – The Safest & Most Fun DEX Tracker",
  description: "Real-time multi-chain scanner with positive metrics & gamified engagement",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white`}>
        <SupabaseProvider>{children}</SupabaseProvider>
      </body>
    </html>
  );
}