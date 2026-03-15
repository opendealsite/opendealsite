import { NextResponse } from "next/server";
import { ADSENSE_CLIENT_ID } from "@/lib/constants";

export async function GET() {
  if (!ADSENSE_CLIENT_ID) {
    return new NextResponse(null, { status: 404 });
  }

  // "ca-pub-XXXX" -> "pub-XXXX" for the ads.txt entry
  const publisherId = ADSENSE_CLIENT_ID.replace(/^ca-/, "");
  const content = `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0\n`;

  return new NextResponse(content, {
    headers: { "Content-Type": "text/plain" },
  });
}
