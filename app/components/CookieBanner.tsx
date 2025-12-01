'use client';
import { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem('cookie-accepted')) setShow(true);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-0 inset-x-0 bg-gray-900/95 backdrop-blur border-t border-gray-700 p-6 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-sm">
          <Cookie className="w-6 h-6 text-cyan-400" />
          <p>We use cookies to enhance your experience.</p>
        </div>
        <button onClick={() => { localStorage.setItem('cookie-accepted','1'); setShow(false); }} className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-bold">
          Accept
        </button>
      </div>
    </div>
  );
}
