import { X, MessageCircle, Globe, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0f] border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <p className="text-gray-400 text-sm leading-relaxed max-w-5xl mx-auto mb-10">
          All content available on our website, on hyperlinked websites and on applications, forums, blogs, social media accounts and other platforms associated with DexNova is intended solely to provide you with general information. Trading is a high-risk activity.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm">
          <a href="/general" className="hover:text-cyan-400">General Statement</a>
          <a href="/legal" className="hover:text-cyan-400">Legal Advice</a>
          <a href="/about" className="hover:text-cyan-400">About Us</a>
          <a href="/token" className="hover:text-cyan-400">DEXT Token</a>
          <a href="/team" className="hover:text-cyan-400">Team</a>
          <a href="/contact" className="hover:text-cyan-400">Contact</a>
        </div>
        <div className="flex justify-center gap-8 mb-8">
          <X className="w-6 h-6 text-gray-400 hover:text-white" />
          <MessageCircle className="w-6 h-6 text-gray-400 hover:text-white" />
          <Globe className="w-6 h-6 text-gray-400 hover:text-white" />
          <Instagram className="w-6 h-6 text-gray-400 hover:text-white" />
          <Youtube className="w-6 h-6 text-gray-400 hover:text-white" />
        </div>
        <div className="text-gray-600 text-sm">© DexNova.io 2025 — info@dexnova.io</div>
      </div>
    </footer>
  );
}
