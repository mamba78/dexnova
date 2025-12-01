import { NextResponse } from 'next/server';

const mockTokens = [
  { address: "EKpQGSJ...", name: "dogwifhat", symbol: "WIF", price: "$2.41", change24h: "+8.7%" },
  { address: "JUPyiwrY...", name: "Jupiter", symbol: "JUP", price: "$0.92", change24h: "+15.3%" },
];

export async function GET() {
  return NextResponse.json({ tokens: mockTokens });
}
