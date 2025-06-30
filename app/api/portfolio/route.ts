// app/api/portfolio/route.ts
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const investorId = session.user.id;
  const raw = await prisma.investment.groupBy({
    by: ["startupId", "tokenId", "gameId", "propertyId"],
    where: { investorId },
    _sum: { amount: true },
  });

  const data = [
    { name: "Startup",  value: raw.filter(r => r.startupId).reduce((sum, r) => sum + Number(r._sum.amount ?? 0), 0) },
    { name: "Token",    value: raw.filter(r => r.tokenId).reduce((sum, r) => sum + Number(r._sum.amount ?? 0), 0) },
    { name: "Game",     value: raw.filter(r => r.gameId).reduce((sum, r) => sum + Number(r._sum.amount ?? 0), 0) },
    { name: "Property", value: raw.filter(r => r.propertyId).reduce((sum, r) => sum + Number(r._sum.amount ?? 0), 0) },
  ].filter(d => d.value > 0);

  return NextResponse.json(data);
}
