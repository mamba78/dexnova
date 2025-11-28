// app/WalletConnectButton.tsx
'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

export default function WalletConnectButton() {
  return (
    <div className="fixed top-4 right-4 z-50">
      <WalletMultiButton
        style={{
          background: "linear-gradient(90deg, #00d1ff, #7b2cbf)",
          borderRadius: "16px",
          fontWeight: "bold",
          padding: "12px 24px",
        }}
      />
    </div>
  );
}