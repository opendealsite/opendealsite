import "@/styles/globals.css";

import { GoogleTagManager } from "@next/third-parties/google";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Script from "next/script";
import { THEME_CONFIG, GTM_ID, ADSENSE_CLIENT_ID } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    template: `%s | ${THEME_CONFIG.BRAND_NAME}`,
    default: `${THEME_CONFIG.BRAND_NAME} - Community Deal Finder`,
  },
  description: "Find and share the best deals from around the web.",
  icons: [{ rel: "icon", url: THEME_CONFIG.FAVICON_URL ?? "/favicon.ico" }],
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
  const adsenseScriptUrl = ADSENSE_CLIENT_ID
    ? `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(
        ADSENSE_CLIENT_ID,
      )}`
    : "";
  const gtmNoScriptUrl = GTM_ID
    ? `https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(GTM_ID)}`
    : "";

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
      <head>
        {themeCSS && <style dangerouslySetInnerHTML={{ __html: themeCSS }} />}
        {ADSENSE_CLIENT_ID && (
          <Script
            id="google-adsense"
            src={adsenseScriptUrl}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body>
        {GTM_ID && (
          <noscript>
            <iframe
              src={gtmNoScriptUrl}
              height="0"
              width="0"
              title="Google Tag Manager"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}
