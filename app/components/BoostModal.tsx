'use client';
import { useState } from 'react';
import { X, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import { verifyBoostPayment } from '../lib/solanaVerify';

interface BoostModalProps {
  token: any;
  onClose: () => void;
  onBoosted: () => void;
}

const PRICES = { '24h': 5, '7d': 25, '30d': 80 };

export default function BoostModal({ token, onClose, onBoosted }: BoostModalProps) {
  const [step, setStep] = useState<'select' | 'pay' | 'verify'>('select');
  const [duration, setDuration] = useState<'24h' | '7d' | '30d'>('24h');
  const [txSig, setTxSig] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');

  const handlePay = () => {
    const link = `https://jup.ag/pay?recipient=YOUR_WALLET&amount=${PRICES[duration]}&token=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&label=Boost ${encodeURIComponent(token.name)}&message=${duration}`;
    window.open(link, '_blank');
    setStep('verify');
  };

  const verifyAndBoost = async () => {
    if (!txSig.trim()) {
      setError("Please enter transaction signature");
      return;
    }

    setVerifying(true);
    setError('');

    const success = await verifyBoostPayment(txSig, PRICES[duration]);
    
    if (success) {
      const hours = duration === '24h' ? 24 : duration === '7d' ? 168 : 720;
      localStorage.setItem(`boosted-${token.id}`, JSON.stringify({
        expiresAt: Date.now() + hours * 60 * 60 * 1000,
        boostedAt: Date.now(),
        duration,
        priceUsd: PRICES[duration],
        txSignature: txSig,
        verified: true
      }));
      onBoosted();
      onClose();
    } else {
      setError("Payment not found or amount incorrect. Please check signature.");
    }
    setVerifying(false);
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-purple-500 rounded-2xl p-8 max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>

        {step === 'select' && (
          <>
            <div className="text-center mb-8">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
              <h2 className="text-3xl font-black mb-2">Boost Token</h2>
              <p className="text-xl font-bold text-purple-400">{token.name}</p>
            </div>
            <div className="space-y-4 mb-8">
              {(['24h', '7d', '30d'] as const).map(d => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`w-full py-5 rounded-xl font-bold text-xl transition-all ${
                    duration === d 
                      ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-black shadow-2xl' 
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  {d === '24h' ? '24 Hours' : d === '7d' ? '7 Days' : '30 Days'} — ${PRICES[d]}
                </button>
              ))}
            </div>
            <button onClick={handlePay} className="w-full py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-xl hover:scale-105 transition">
              Pay with Solana Pay
            </button>
          </>
        )}

        {step === 'verify' && (
          <div className="text-center space-y-6">
            <CheckCircle className="w-20 h-20 mx-auto text-green-500" />
            <h3 className="text-2xl font-bold">Verify Payment</h3>
            <p className="text-gray-400">Paste your transaction signature below</p>
            
            <input
              type="text"
              placeholder="e.g. 5f3...abc"
              value={txSig}
              onChange={e => setTxSig(e.target.value)}
              className="w-full px-6 py-4 bg-gray-800 rounded-xl text-center font-mono"
            />

            {error && (
              <div className="flex items-center gap-3 text-red-400 bg-red-900/20 px-4 py-3 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            <button 
              onClick={verifyAndBoost}
              disabled={verifying || !txSig}
              className="w-full py-5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-bold text-xl disabled:opacity-50"
            >
              {verifying ? 'Verifying...' : 'Confirm & Boost'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
