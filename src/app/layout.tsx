import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { THEME_CONFIG } from "@/lib/constants";
import { type ThemeConfig } from "@/types";

export const metadata: Metadata = {
  title: "DealSite - Community Deal Finder",
  description: "Find and share the best deals from around the web.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Generate dynamic CSS variables from config
  const colors = THEME_CONFIG.COLORS;
  
  const generateThemeCSS = () => {
    if (!colors) return "";
    
    let css = ":root {\n";
    if (colors.light) {
      Object.entries(colors.light).forEach(([key, value]) => {
        css += `  --color-${key}: ${value};\n`;
      });
    }
    css += "}\n\n.dark {\n";
    if (colors.dark) {
      Object.entries(colors.dark).forEach(([key, value]) => {
        css += `  --color-${key}: ${value};\n`;
      });
    }
    css += "}";
    return css;
  };

  const themeCSS = generateThemeCSS();

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <head>
        {themeCSS && (
          <style dangerouslySetInnerHTML={{ __html: themeCSS }} />
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
