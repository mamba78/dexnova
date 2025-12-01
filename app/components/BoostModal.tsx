'use client';
import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

interface BoostModalProps {
  token: any;
  onClose: () => void;
}

const BOOST_PRICES = {
  '24h': 5,   // 5 USD in USDC
  '7d': 25,
  '30d': 80,
};

export default function BoostModal({ token, onClose }: BoostModalProps) {
  const [duration, setDuration] = useState<'24h' | '7d' | '30d'>('24h');
  const [paying, setPaying] = useState(false);

  const handleBoost = async () => {
    setPaying(true);
    
    // Simulate Solana Pay / Jupiter payment
    const paymentLink = `https://jup.ag/pay?recipient=BOOST_WALLET_ADDRESS&amount=${BOOST_PRICES[duration]}&token=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&label=Boost ${token.name} on DexNova&message=${duration} boost`;
    
    window.open(paymentLink, '_blank');
    
    // Simulate payment confirmation after 10s
    setTimeout(() => {
      const expiresAt = Date.now() + (duration === '24h' ? 24*60*60*1000 : duration === '7d' ? 7*24*60*60*1000 : 30*24*60*60*1000);
      localStorage.setItem(`boosted-${token.id}`, JSON.stringify({ expiresAt }));
      alert(`${token.name} boosted for ${duration}!`);
      onClose();
      window.location.reload();
    }, 10000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-purple-500 rounded-2xl p-8 max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <Sparkles className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-3xl font-black mb-2">Boost Token</h2>
          <p className="text-xl font-bold">{token.name}</p>
          <p className="text-gray-400">{token.chain}</p>
        </div>

        <div className="space-y-4 mb-8">
          {(['24h', '7d', '30d'] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                duration === d 
                  ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-black shadow-xl shadow-yellow-500/50' 
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              {d === '24h' ? '24 Hours' : d === '7d' ? '7 Days' : '30 Days'} — ${BOOST_PRICES[d]}
            </button>
          ))}
        </div>

        <button 
          onClick={handleBoost}
          disabled={paying}
          className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-xl hover:scale-105 transition disabled:opacity-50"
        >
          {paying ? 'Waiting for payment...' : 'Pay with Solana Pay'}
        </button>

        <p className="text-center text-xs text-gray-500 mt-6">
          Payment via Jupiter • No custody • Instant activation
        </p>
      </div>
    </div>
  );
}
