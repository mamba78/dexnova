import toast from 'react-hot-toast';

export function showWhaleAlert(amount: string, token: string, wallet: string, tx: string) {
  toast.success(
    `WHALE ALERT\n${amount} ${token}\nWallet: ${wallet.slice(0, 8)}...\nTx: ${tx.slice(0, 10)}...`,
    {
      duration: 10000,
      style: {
        background: '#1e1b4b',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '16px',
        padding: '16px',
        borderRadius: '12px',
        border: '2px solid #a78bfa',
      },
    }
  );
}

// Mock whale alerts for demo
export function startMockWhaleAlerts() {
  setInterval(() => {
    const tokens = ['WIF', 'BONK', 'JUP', 'POPCAT'];
    const token = tokens[Math.floor(Math.random() * tokens.length)];
    showWhaleAlert(
      '$' + (Math.random() * 200000 + 50000).toFixed(0),
      token,
      '4x9a...8z2k',
      '5f8e...9k3m'
    );
  }, 15000);
}
