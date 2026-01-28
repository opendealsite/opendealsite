import React, { Suspense } from "react";
import { api } from "@/lib/api";
import type { Deal } from "@/types";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { DealsFeed } from "@/components/DealsFeed";
import { FooterInfo } from "@/components/custom/FooterInfo";
import { THEME_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";

// Type for Next.js 15+ Params (Async) or prior (Sync)
type Props = {
  params: Promise<{ country: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.q as string | undefined;
  const hours = resolvedSearchParams?.hottest
    ? parseInt(resolvedSearchParams.hottest as string)
    : undefined;

  let title = "Latest Drops";
  if (query) {
    title = `Results for "${query}"`;
  } else if (hours) {
    title = "Hottest Deals";
  }

  return {
    title,
    description: query
      ? `Search results for deals matching "${query}"`
      : hours
        ? `Hottest deals from the last ${hours} hours.`
        : `Find and share the best deals from around the web on ${THEME_CONFIG.BRAND_NAME}.`,
  };
}

export default async function Page({ params, searchParams }: Props) {
  const { country } = await params;
  const resolvedSearchParams = await searchParams;

  const query = resolvedSearchParams?.q as string | undefined;
  const hours = resolvedSearchParams?.hottest
    ? parseInt(resolvedSearchParams.hottest as string)
    : undefined;

  // Decide which data fetch method to use based on URL state
  let deals: Deal[] = [];
  let pageTitle = "Latest Drops";
  let pageDescription = "Latest hot deals";

  // Always fetch trending deals for the sidebar
  let trendingDeals: Deal[] = [];

  try {
    // Parallel fetch for main feed and sidebar if possible, but keeping it simple for now
    trendingDeals = await api.getHotDeals(24, 0, 10, country);

    if (query) {
      deals = await api.getDeals(query, 0, 20, country);
      pageTitle = `Results for "${query}"`;
      pageDescription = `Search results for deals matching "${query}"`;
    } else if (hours) {
      deals = await api.getHotDeals(hours, 0, 20, country);
      pageTitle = "Hottest Deals";
      pageDescription = `Hottest deals from the last ${hours} hours.`;
    } else {
      deals = await api.getDeals(null, 0, 20, country);
    }
  } catch (error) {
    console.error("Failed to fetch deals:", error);
    deals = [];
  }

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Suspense
        fallback={
          <header className="border-border bg-background h-16 border-b" />
        }
      >
        <Header country={country} />
      </Suspense>

      <main className="container mx-auto flex flex-1 flex-col gap-8 px-4 py-6 lg:flex-row">
        <DealsFeed
          deals={deals}
          country={country}
          pageTitle={pageTitle}
          pageDescription={pageDescription}
          query={query}
          hottest={hours}
        />

        {/* Sidebar */}
        <Sidebar country={country} trendingDeals={trendingDeals} />
      </main>

      <FooterInfo country={country} />
    </div>
  );
}
