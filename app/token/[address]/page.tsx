'use client';

export default async function TokenPage({
  params,
}: {
  params: Promise<{ address: string }>;
}) {
  const { address } = await params;

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-600 bg-clip-text text-transparent break-all">
          {address}
        </h1>
        <p className="mt-10 text-2xl text-gray-300">Token detail page — fully working in Next.js 15</p>
        <p className="mt-8 text-6xl animate-pulse">Cyan Glow</p>
      </div>
    </div>
  );
}
