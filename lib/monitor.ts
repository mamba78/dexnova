import toast from 'react-hot-toast';

let ws: WebSocket | null = null;
let reconnectAttempts = 0;
const MAX_RECONNECT = 10;

export function startRealTimeMonitoring(onUpdate: React.Dispatch<React.SetStateAction<any[]>>) {
  function connect() {
    try {
      ws = new WebSocket('wss://public-api.birdeye.so/socket');

      ws.onopen = () => {
        console.log('Real-time monitoring: Connected');
        reconnectAttempts = 0;
        toast.success('Real-time monitoring ACTIVE');
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'price' && data.address && data.price !== undefined) {
            onUpdate(prev => {
              const updated = [...prev];
              const idx = updated.findIndex((t: any) => t.address === data.address);
              if (idx !== -1) {
                updated[idx] = { ...updated[idx], price: `$${parseFloat(data.price).toFixed(6)}` };
              }
              return updated;
            });
          }
        } catch (e) {
          // Ignore malformed messages
        }
      };

      ws.onerror = () => toast.error('Real-time connection error');
      ws.onclose = () => {
        if (reconnectAttempts < MAX_RECONNECT) {
          reconnectAttempts++;
          setTimeout(connect, 3000 * reconnectAttempts);
        }
      };
    } catch (e) {
      // Fallback polling every 10s
      const interval = setInterval(async () => {
        try {
          const res = await fetch('/api/trending');
          const data = await res.json();
          onUpdate(data.tokens || []);
        } catch {}
      }, 10000);
      return () => clearInterval(interval);
    }
  }

  connect();
}
