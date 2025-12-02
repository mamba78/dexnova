import Link from 'next/link';
import { X, MessageCircle, Globe, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const links = [
    "General Statement", "Legal Advice", "About Us", "DEXT Token", "Team", "Contact",
    "Privacy Policy", "Terms of Service", "Cookie Policy", "Affiliates", "API Docs"
  ];

  return (
    <footer className="border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center text-xs text-gray-500 mb-6">
          All content is for informational purposes only. Trading is high risk.
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs mb-6">
          {links.map(link => (
            <Link key={link} href={`/${link.toLowerCase().replace(/ /g, '-')}`} className="hover:text-purple-400 transition">
              {link}
            </Link>
          ))}
        </div>
        <div className="flex justify-center gap-6 mb-6">
          <X className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
          <MessageCircle className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
          <Globe className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
          <Instagram className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
          <Youtube className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer" />
        </div>
        <div className="text-center text-xs text-gray-600">
          © 2025 DexNova.io — All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
