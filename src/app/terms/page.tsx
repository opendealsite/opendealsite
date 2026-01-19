import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { THEME_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Terms of Service - ${THEME_CONFIG.BRAND_NAME}`,
  description: `Terms of Service for ${THEME_CONFIG.BRAND_NAME}`,
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl bg-card p-8 rounded-xl shadow-sm border border-border">
          <Link href="/" className="text-sm text-primary hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold mb-6 text-foreground">Terms of Service</h1>
          <div className="text-muted-foreground space-y-4 leading-relaxed">
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p>
              Please read these Terms of Service (&quot;Terms&quot;, &quot;Terms of Service&quot;) carefully before using the <strong>{THEME_CONFIG.BRAND_NAME}</strong> website.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-6">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-6">2. Content and Deals</h2>
            <p>
              <strong>{THEME_CONFIG.BRAND_NAME}</strong> is an aggregator of deals. We do not sell products directly. Prices and availability of products are subject to change without notice. We are not responsible for any errors or inaccuracies in the deals listed.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-6">3. Affiliate Disclosure</h2>
            <p>
              {THEME_CONFIG.BRAND_NAME} may participate in affiliate marketing programs, which means we may get paid commissions on editorially chosen products purchased through our links to retailer sites.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-6">4. Limitation of Liability</h2>
            <p>
              In no event shall {THEME_CONFIG.BRAND_NAME}, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
