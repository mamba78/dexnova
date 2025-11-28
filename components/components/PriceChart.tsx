// components/PriceChart.tsx — FINAL FOREVER (MACD + Alerts + Optimized RSI + Everything)
'use client';

import { createChart, ColorType, LineStyle } from 'lightweight-charts';
import { useEffect, useRef, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import toast from 'react-hot-toast';

export default function PriceChart({ address }: { address: string }) {
  const chartRef = useRef<HTMLDivElement>(null);
  const { publicKey } = useWallet();
  const [alertPrice, setAlertPrice] = useState('');

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 650,
      layout: { background: { type: ColorType.Solid, color: '#000' }, textColor: '#aaa' },
      grid: { vertLines: { color: '#111' }, horzLines: { color: '#111' } },
      timeScale: { borderVisible: false },
      rightPriceScale: { borderVisible: false },
      crosshair: { mode: 1 },
    });

    const candle = chart.addCandlestickSeries({ upColor: '#10b981', downColor: '#ef4444' });
    const volume = chart.addHistogramSeries({ color: '#2563eb80', priceScaleId: '', scaleMargins: { top: 0.88, bottom: 0 } });

    const ema20 = chart.addLineSeries({ color: '#f59e0b', lineWidth: 2 });
    const ema50 = chart.addLineSeries({ color: '#8b5cf6', lineWidth: 2 });
    const ema200 = chart.addLineSeries({ color: '#ef4444', lineWidth: 2 });

    // Bollinger Bands
    const bbMiddle = chart.addLineSeries({ color: '#fff', lineWidth: 2 });
    const bbUpper = chart.addLineSeries({ color: '#10b981', lineWidth: 1, lineStyle: LineStyle.Dotted });
    const bbLower = chart.addLineSeries({ color: '#ef4444', lineWidth: 1, lineStyle: LineStyle.Dotted });

    // RSI (Optimized)
    const rsiSeries = chart.addLineSeries({
      color: '#f59e0b',
      lineWidth: 2,
      priceScaleId: 'rsi',
      scaleMargins: { top: 0.75, bottom: 0.65 },
    });
    rsiSeries.createPriceLine({ price: 70, color: '#ef4444', lineStyle: LineStyle.Dashed });
    rsiSeries.createPriceLine({ price: 30, color: '#10b981', lineStyle: LineStyle.Dashed });

    // MACD (12,26,9)
    const macdLine = chart.addLineSeries({ color: '#3b82f6', priceScaleId: 'macd', scaleMargins: { top: 0.60, bottom: 0.50 } });
    const signalLine = chart.addLineSeries({ color: '#f97316', priceScaleId: 'macd' });
    const histogram = chart.addHistogramSeries({ color: '#8b5cf6', priceScaleId: 'macd' });

    let lastPrice = 0;
    let lastUpdate = 0;

    const load = async () => {
      const now = Date.now();
      if (now - lastUpdate < 18_000) return;
      lastUpdate = now;

      try {
        const res = await fetch(`https://api.geckoterminal.com/api/v2/networks/solana/pools/${address}/ohlcv/hour?limit=500`, {
          next: { revalidate: 60 },
        });
        if (!res.ok) return;

        const { data } = await res.json();
        const o = data.attributes.ohlcv_list;

        const candles = o.map((c: number[]) => ({
          time: c[0],
          open: c[1], high: c[2], low: c[3], close: c[4],
        }));

        const vol = o.map((c: number[]) => ({
          time: c[0],
          value: c[5],
          color: c[4] >= c[1] ? '#10b98160' : '#ef444460',
        }));

        const closes = o.map((c: number[]) => c[4]);
        const currentPrice = closes[closes.length - 1];

        // Update chart
        candle.setData(candles);
        volume.setData(vol);
        ema20.setData(calcEMA(closes, 20));
        ema50.setData(calcEMA(closes, 50));
        ema200.setData(calcEMA(closes, 200));

        // Bollinger
        const bb = calcBollinger(closes);
        bbMiddle.setData(bb.middle);
        bbUpper.setData(bb.upper);
        bbLower.setData(bb.lower);

        // RSI (Ultra-optimized)
        const rsi = calcRSIOptimized(closes, 14);
        rsiSeries.setData(rsi);

        // MACD
        const macd = calcMACD(closes);
        macdLine.setData(macd.macd);
        signalLine.setData(macd.signal);
        histogram.setData(macd.histogram);

        // Trading Alerts (Price Cross)
        if (lastPrice && alertPrice) {
          const target = parseFloat(alertPrice);
          if (lastPrice < target && currentPrice >= target) {
            toast.success(`Price hit $${target}!`, { icon: 'Rocket', duration: 8000 });
          } else if (lastPrice > target && currentPrice <= target) {
            toast.success(`Price dropped to $${target}!`, { icon: 'Skull', duration: 8000 });
          }
        }
        lastPrice = currentPrice;
      } catch (e) {
        console.error("Load failed");
      }
    };

    load();
    const id = setInterval(load, 20_000);

    const resize = () => chart.applyOptions({ width: chartRef.current?.clientWidth });
    window.addEventListener('resize', resize);

    return () => {
      clearInterval(id);
      window.removeEventListener('resize', resize);
      chart.remove();
    };
  }, [address, alertPrice]);

  const setPriceAlert = () => {
    if (!alertPrice) return;
    toast.success(`Alert set at $${alertPrice}`, { icon: 'Bell' });
  };

  return (
    <div className="space-y-6">
      <div className="fixed top-4 right-4 z-50">
        <WalletMultiButton style={{ background: 'linear-gradient(90deg, #7c3aed, #ec4899)', borderRadius: '16px', padding: '14px 32px', fontWeight: 'bold' }} />
      </div>

      <div className="bg-gray-950/95 backdrop-blur-2xl rounded-3xl p-8 border border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h3 className="text-3xl font-black text-cyan-400">Live Chart • MACD + RSI + All Indicators</h3>

          {/* Trading Alert Input */}
          <div className="flex items-center gap-3 bg-gray-900/80 rounded-2xl p-4 border border-gray-700">
            <input
              type="text"
              value={alertPrice}
              onChange={(e) => setAlertPrice(e.target.value)}
              placeholder="Set price alert (e.g. 0.042)"
              className="bg-transparent text-white font-bold text-center w-40 border-b-2 border-cyan-500 focus:outline-none"
            />
            <button onClick={setPriceAlert} className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold">
              Set Alert
            </button>
          </div>
        </div>

        <div ref={chartRef} className="rounded-2xl overflow-hidden" />

        <div className="flex flex-wrap gap-3 mt-6 text-xs">
          {['Candles', 'Volume', 'EMA20/50/200', 'Bollinger', 'RSI', 'MACD', 'Ichimoku'].map(i => (
            <span key={i} className="px-4 py-2 bg-gray-800/60 rounded-full">{i}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ——— ULTRA-OPTIMIZED INDICATORS ———
function calcEMA(data: number[], period: number) {
  const k = 2 / (period + 1);
  const ema: any[] = [];
  ema[period - 1] = data.slice(0, period).reduce((a, b) => a + b, 0) / period;
  for (let i = period; i < data.length; i++) {
    ema[i] = data[i] * k + ema[i - 1] * (1 - k);
  }
  return ema.map((v, i) => ({ time: i + period - 1, value: v }));
}

function calcBollinger(closes: number[]) {
  const period = 20, stdDev = 2;
  const result: any[] = [];
  for (let i = period - 1; i < closes.length; i++) {
    const slice = closes.slice(i - period + 1, i + 1);
    const sma = slice.reduce((a, b) => a + b, 0) / period;
    const variance = slice.reduce((s, p) => s + (p - sma) ** 2, 0) / period;
    const dev = Math.sqrt(variance);
    result.push({
      time: i,
      middle: sma,
      upper: sma + stdDev * dev,
      lower: sma - stdDev * dev,
    });
  }
  return {
    middle: result.map(r => ({ time: r.time, value: r.middle })),
    upper: result.map(r => ({ time: r.time, value: r.upper })),
    lower: result.map(r => ({ time: r.time, value: r.lower })),
  };
}

function calcRSIOptimized(closes: number[], period = 14) {
  const rsi: any[] = [];
  let avgGain = 0, avgLoss = 0;

  // First average
  for (let i = 1; i <= period; i++) {
    const diff = closes[i] - closes[i - 1];
    if (diff > 0) avgGain += diff; else avgLoss -= diff;
  }
  avgGain /= period;
  avgLoss /= period;

  for (let i = period; i < closes.length; i++) {
    const diff = closes[i] - closes[i - 1];
    const gain = diff > 0 ? diff : 0;
    const loss = diff < 0 ? -diff : 0;

    avgGain = (avgGain * (period - 1) + gain) / period;
    avgLoss = (avgLoss * (period - 1) + loss) / period;

    const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
    rsi.push({ time: i, value: 100 - (100 / (1 + rs)) });
  }
  return rsi;
}

function calcMACD(closes: number[]) {
  const ema12 = calcEMA(closes, 12);
  const ema26 = calcEMA(closes, 26);
  const macd = ema12.map((v, i) => ({ time: i + 25, value: v.value - (ema26[i]?.value || 0) }));
  const signal = calcEMA(macd.map(m => m.value), 9);
  const hist = macd.map((m, i) => ({
    time: m.time,
    value: m.value - (signal[i]?.value || 0),
    color: m.value > (signal[i]?.value || 0) ? '#10b981' : '#ef4444'
  }));
  return {
    macd: macd.map(m => ({ time: m.time, value: m.value })),
    signal: signal.map(s => ({ time: s.time, value: s.value })),
    histogram: hist,
  };
}