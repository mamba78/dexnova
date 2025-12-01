import { X, MessageCircle, Globe, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const links = [
    "General Statement", "Legal Advice", "About Us", "DEXT Token", "Team", "Contact",
    "Privacy Policy", "Terms of Service", "Cookie Policy", "Affiliates", "API Docs"
  ];

  return (
    <footer className="bg-[#0b0e17] border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center text-sm text-gray-500 mb-8">
          All content available on our website is for informational purposes only. Trading is high risk.
        </div>
        <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm">
          {links.map(link => (
            <a key={link} href="#" className="hover:text-cyan-400 transition">{link}</a>
          ))}
        </div>
        <div className="flex justify-center gap-8 mb-8">
          <X className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          <MessageCircle className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          <Globe className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          <Youtube className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
        </div>
        <div className="text-center text-gray-600 text-center">© 2025 DexNova.io — All Rights Reserved</div>
      </div>
    </footer>
  );
}
