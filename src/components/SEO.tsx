"use client";

import React, { useEffect } from "react";
import { THEME_CONFIG } from "@/lib/constants";
import type { Deal } from "~/types";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  canonical?: string;
  deal?: Deal;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image,
  canonical,
  deal,
}) => {
  useEffect(() => {
    document.title = `${title} | ${THEME_CONFIG.BRAND_NAME}`;

    // Update meta tags
    const updateMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const updateOg = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    updateMeta("description", description);
    updateOg("og:title", title);
    updateOg("og:description", description);
    if (image) updateOg("og:image", image);

    if (canonical) {
      let el = document.querySelector('link[rel="canonical"]');
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", "canonical");
        document.head.appendChild(el);
      }
      el.setAttribute("href", canonical);
    }

    // JSON-LD Injection
    const existingScript = document.getElementById("json-ld");
    if (existingScript) existingScript.remove();

    if (deal) {
      const schema: any = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: deal.title,
        description: deal.description || deal.title,
        offers: {
          "@type": "Offer",
          url: typeof window !== "undefined" ? window.location.href : "",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          seller: { "@type": "Organization", name: deal.origDealDomain },
        },
      };

      if (deal.imageLink) {
        schema.image = [deal.imageLink];
      }

      if (deal.dealPrice != null) {
        schema.offers.price = deal.dealPrice;
      }

      const script = document.createElement("script");
      script.id = "json-ld";
      script.type = "application/ld+json";
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [title, description, image, canonical, deal]);

  return null;
};
