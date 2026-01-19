import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "DealSite - Community Deal Finder",
  description: "Find and share the best deals from around the web.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
       {/* 
         Note: In a real app we might wrap this in providers 
         (Theme, Auth, QueryClient, etc.) 
       */}
      <body>{children}</body>
    </html>
  );
}
