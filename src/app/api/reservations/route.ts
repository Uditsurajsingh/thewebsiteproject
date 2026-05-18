import { NextResponse } from "next/server";

type ReservationRequest = {
  brand?: string;
  email?: string;
  width?: number;
  height?: number;
  url?: string;
};

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  const body = contentType.includes("application/json")
    ? ((await request.json().catch(() => null)) as ReservationRequest | null)
    : Object.fromEntries(await request.formData()) as ReservationRequest;

  if (!body?.brand || !body.email || !body.url) {
    return NextResponse.json(
      { ok: false, message: "Brand, email, and URL are required." },
      { status: 400 },
    );
  }

  const width = Number(body.width || 0);
  const height = Number(body.height || 0);
  const pixels = Math.max(width * height, 0);

  return NextResponse.json({
    ok: true,
    reservation: {
      brand: body.brand,
      email: body.email,
      url: body.url,
      pixels,
      estimatedPriceUsd: pixels,
      status: "received",
    },
  });
}
