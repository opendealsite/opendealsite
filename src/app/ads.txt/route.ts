import { NextResponse } from "next/server";
import { ADSENSE_PUBLISHER_ID } from "@/lib/constants";

export async function GET() {
  if (!ADSENSE_PUBLISHER_ID) {
    return new NextResponse(null, { status: 404 });
  }

  const content = `google.com, ${ADSENSE_PUBLISHER_ID}, DIRECT, f08c47fec0942fa0\n`;

  return new NextResponse(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
