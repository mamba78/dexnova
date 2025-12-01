'use client';
import { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem('cookies-accepted')) setShow(true);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur border-t border-gray-700 p-6 z-50">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Cookie className="w-8 h-8 text-cyan-400" />
          <p className="text-sm">We use cookies. <a href="#" className="text-cyan-400 underline">Policy</a></p>
        </div>
        <button onClick={() => { localStorage.setItem('cookies-accepted', 'true'); setShow(false); }} className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold">
          Accept
        </button>
      </div>
    </div>
  );
}
