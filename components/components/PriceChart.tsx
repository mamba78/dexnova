'use client';

import { createChart } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

export default function PriceChart({ address }: { address: string }) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 400,
      layout: { background: { color: '#000000' }, textColor: '#d1d5db' },
      grid: { vertLines: { color: '#1f2937' }, horzLines: { color: '#1f2937' } },
      rightPriceScale: { borderColor: '#374151' },
      timeScale: { borderColor: '#374151' },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#10b981',
      downColor: '#ef4444',
      borderVisible: false,
      wickUpColor: '#10b981',
      wickDownColor: '#ef4444',
    });

    candlestickSeries.setData([
      { time: '2025-04-01', open: 0.0008, high: 0.0012, low: 0.0007, close: 0.0011 },
      { time: '2025-04-02', open: 0.0011, high: 0.0015, low: 0.0010, close: 0.0014 },
      { time: '2025-04-03', open: 0.0014, high: 0.0018, low: 0.0013, close: 0.0016 },
      { time: '2025-04-04', open: 0.0016, high: 0.0021, low: 0.0015, close: 0.0020 },
    ]);

    const handleResize = () => chart.applyOptions({ width: chartRef.current!.clientWidth });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [address]);

  return <div ref={chartRef} className="w-full rounded-xl overflow-hidden" />;
}
