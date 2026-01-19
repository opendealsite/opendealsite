import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { THEME_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Privacy Policy - ${THEME_CONFIG.BRAND_NAME}`,
  description: `Privacy Policy for ${THEME_CONFIG.BRAND_NAME}`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl bg-card p-8 rounded-xl shadow-sm border border-border">
          <Link href="/" className="text-sm text-primary hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold mb-6 text-foreground">Privacy Policy</h1>
          <div className="text-muted-foreground space-y-4 leading-relaxed">
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p>
              At <strong>{THEME_CONFIG.BRAND_NAME}</strong>, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information.
            </p>
            
            <h2 className="text-xl font-bold text-foreground mt-6">Information We Collect</h2>
            <p>
              We collect minimal information necessary to operate the service. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Usage Data:</strong> We may collect anonymous usage statistics (pages visited, deals clicked) to improve our service.</li>
              <li><strong>Cookies:</strong> We use cookies to store your preferences (such as theme and view mode).</li>
            </ul>

            <h2 className="text-xl font-bold text-foreground mt-6">How We Use Your Information</h2>
            <p>
              We use the information to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide and maintain the service.</li>
              <li>Analyze usage patterns to improve user experience.</li>
            </ul>

            <h2 className="text-xl font-bold text-foreground mt-6">Third-Party Services</h2>
            <p>
              We may link to third-party merchant sites. Please note that {THEME_CONFIG.BRAND_NAME} is not responsible for the privacy practices of these external sites. When you click a deal, you are subject to the privacy policy of that merchant.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-6">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
