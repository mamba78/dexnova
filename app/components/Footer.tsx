import { X, MessageCircle, Globe, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0b0e17] border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center text-sm">
        <p className="text-gray-500 leading-relaxed mb-8">© 2025 DexNova.io — All Rights Reserved</p>
        <div className="flex justify-center gap-8">
          <X className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          <MessageCircle className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          <Globe className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          <Youtube className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
        </div>
      </div>
    </footer>
  );
}
