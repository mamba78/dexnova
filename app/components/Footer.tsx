import Link from 'next/link';
import { X, MessageCircle, Globe, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const links = [
    { name: "General Statement", href: "/general" },
    { name: "Legal Advice", href: "/legal" },
    { name: "About Us", href: "/about" },
    { name: "DEXT Token", href: "/token" },
    { name: "Team", href: "/team" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookie" },
    { name: "Affiliates", href: "/affiliates" },
    { name: "API Docs", href: "/api" },
  ];

  return (
    <footer className="bg-[#0b0e17] border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center text-xs text-gray-500 mb-8">
          All content is for informational purposes only. Trading is high risk.
        </div>
        <div className="flex flex-wrap justify-center gap-6 mb-10 text-xs">
          {links.map(link => (
            <Link key={link.name} href={link.href} className="hover:text-cyan-400 transition">
              {link.name}
            </Link>
          ))}
        </div>
        <div className="flex justify-center gap-8 mb-8">
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
