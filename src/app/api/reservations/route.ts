import { NextResponse } from "next/server";
import { createAutomatedReservation } from "@/lib/reservations";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  const body = contentType.includes("application/json")
    ? await request.json().catch(() => null)
    : Object.fromEntries(await request.formData());

  const result = createAutomatedReservation(body || {});

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: result.message },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    reservation: result.reservation,
  });
}
