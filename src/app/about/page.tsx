import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { THEME_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: `About - ${THEME_CONFIG.BRAND_NAME}`,
  description: `About ${THEME_CONFIG.BRAND_NAME} - Community-driven deal finder`,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl bg-card p-8 rounded-xl shadow-sm border border-border">
          <Link href="/" className="text-sm text-primary hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold mb-6 text-foreground">About {THEME_CONFIG.BRAND_NAME}</h1>
          <div className="text-muted-foreground space-y-4 leading-relaxed">
            <p>
              <strong>{THEME_CONFIG.BRAND_NAME}</strong> is a community-driven platform for discovering and sharing the best deals from around the web.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-6">Our Mission</h2>
            <p>
              We believe that everyone deserves access to great deals. Our mission is to make deal hunting easier by aggregating the best offers and letting our community help surface the hottest deals.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-6">How It Works</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Deals are aggregated from various sources across the internet</li>
              <li>Community members can vote on deals to help surface the best ones</li>
              <li>Hot deals are those with the most engagement from our community</li>
              <li>You can search for specific products or browse by category</li>
            </ul>

            <h2 className="text-xl font-bold text-foreground mt-6">Open Source</h2>
            <p>
              {THEME_CONFIG.BRAND_NAME} is built on open-source technology and welcomes contributions from developers around the world. Check out our GitHub repository to learn more about how you can contribute.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-6">Contact</h2>
            <p>
              Have questions or feedback? We&apos;d love to hear from you!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
