import { X, MessageCircle, Globe, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0b0e17] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12 text-center text-sm">
        <p className="text-gray-500 leading-relaxed max-w-4xl mx-auto mb-10">
          All content is for informational purposes only. Trading is high risk. Not financial advice.
        </p>
        <div className="flex justify-center gap-8 mb-8">
          <X className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          <MessageCircle className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          <Globe className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          <Youtube className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
        </div>
        <div className="text-gray-600">© 2025 DexNova.io — All Rights Reserved</div>
      </div>
    </footer>
  );
}
