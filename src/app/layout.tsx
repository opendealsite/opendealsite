import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Script from "next/script";
import { THEME_CONFIG, GTM_ID } from "@/lib/constants";
import { type ThemeConfig } from "@/types";

export const metadata: Metadata = {
  title: {
    template: `%s | ${THEME_CONFIG.BRAND_NAME}`,
    default: `${THEME_CONFIG.BRAND_NAME} - Community Deal Finder`,
  },
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
        {GTM_ID && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
        )}
        {themeCSS && <style dangerouslySetInnerHTML={{ __html: themeCSS }} />}
      </head>
      <body>
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}
