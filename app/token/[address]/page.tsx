// app/token/[address]/page.tsx — FINAL
import PriceChart from "@/components/PriceChart";
import WatchlistButton from "@/components/WatchlistButton";

export default async function TokenPage({ params }: { params: { address: string } }) {
  return (
    <div className="min-h-screen bg-black text-white py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Token Analytics
          </h1>
        </div>

        {/* Chart */}
        <PriceChart address={params.address} />

        {/* Actions */}
        <div className="flex justify-center gap-6">
          <WatchlistButton token={{ address: params.address, name: "Token }} />
          <button onClick={() => {
            const chatId = prompt("Send /start to @DexNovaAlertBot, then paste your chat ID:");
            if (chatId) fetch("/api/telegram", { method: "POST", body: JSON.stringify({ chatId, tokenName: "TOKEN", threshold: "0.01" }) });
          }} className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl font-bold hover:scale-105">
            Get Telegram Alerts
          </button>
        </div>
      </div>
    </div>
  );
}