import TokensTable from './components/TokensTable';
import ChainFilter from './components/ChainFilter';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 px-6">
      <h1 className="text-6xl font-black text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Hot Pairs • Live Multi-Chain
      </h1>
      <ChainFilter />
      <TokensTable />
    </div>
  );
}
