import { api } from "@/lib/api";
import { getMerchantLogoUrl } from "@/lib/merchantLogos";
import { formatRelativeTime } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { FooterInfo } from "@/components/custom/FooterInfo";
import { SEO } from "@/components/SEO";
import { ExternalDealLink } from "@/components/ExternalDealLink";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    country: string;
    slug: string;
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { country, id } = await params;
  const deal = await api.getDealById(id, country).catch(() => null);

  if (!deal) return { title: "Deal Not Found" };

  const hasPrice = deal.dealPrice != null;
  return {
    title: deal.title,
    description: hasPrice
      ? `Get this deal for $${deal.dealPrice}! ${deal.title}`
      : deal.title,
    openGraph: {
      images: deal.imageLink ? [deal.imageLink] : [],
    },
  };
}

export default async function DealDetailPage({ params }: PageProps) {
  const { country, slug, id } = await params;

  // Fetch deal data and trending deals for sidebar in parallel
  const [deal, trendingDeals] = await Promise.all([
    api.getDealById(id, country).catch(() => null),
    api.getHotDeals(24, 0, 8, country).catch(() => []),
  ]);

  if (!deal) notFound();

  const logoUrl = getMerchantLogoUrl(deal.origDealDomain);
  const hasDiscount = deal.percentOff != null && deal.percentOff > 0;
  const hasPrice = deal.dealPrice != null;

  return (
    <div className="bg-background text-foreground min-h-screen transition-colors duration-300">
      <Header country={country} />

      <main className="mx-auto max-w-350 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="min-w-0 flex-1">
            <div className="bg-surface border-border rounded-xl border p-6 shadow-sm">
              <SEO
                title={deal.title}
                description={
                  hasPrice
                    ? `Get this deal for $${deal.dealPrice}! ${deal.title}`
                    : deal.title
                }
                image={deal.imageLink}
                deal={deal}
              />

              <div className="grid gap-8 md:grid-cols-2">
                <div className="relative">
                  <div className="bg-background aspect-4/3 w-full overflow-hidden rounded-lg">
                    {deal.imageLink ? (
                      <img
                        src={deal.imageLink}
                        alt={deal.title}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <div className="bg-muted text-muted-foreground/30 flex h-full w-full items-center justify-center">
                        <svg
                          className="h-24 w-24"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  {hasDiscount && (
                    <div className="bg-primary absolute top-4 left-4 rounded px-3 py-1 font-bold text-white shadow">
                      {deal.percentOff}% OFF
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-center">
                  <div className="text-muted-foreground mb-4 flex items-center gap-2 text-sm">
                    <span>
                      Posted {formatRelativeTime(deal.dateCreated)} ago
                    </span>
                    <span>•</span>
                    <span>{deal.origDealDomain}</span>
                  </div>

                  <h1 className="text-foreground mb-4 text-3xl leading-tight font-bold">
                    {deal.title}
                  </h1>

                  <div className="mb-6 flex flex-wrap items-baseline gap-4">
                    {hasPrice ? (
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-4xl font-bold text-red-500">
                          ${deal.dealPrice?.toFixed(2)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          (as of {new Date(deal.dateCreated).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'America/New_York' })} ET)
                        </span>
                      </div>
                    ) : (
                      <span className="text-primary text-3xl font-bold">
                        Check Price
                      </span>
                    )}

                    {deal.regPrice != null && (
                      <span className="text-muted-foreground text-xl line-through">
                        ${deal.regPrice.toFixed(2)}
                      </span>
                    )}

                    {deal.savedAmount != null && deal.savedAmount > 0 && (
                      <span className="rounded bg-green-100 px-2 py-1 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        Save ${deal.savedAmount.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="mb-8">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span className="font-bold text-orange-500">
                          🔥 {deal.hotValue}
                        </span>
                        <span className="text-muted-foreground text-sm font-medium">
                          degrees
                        </span>
                      </span>
                    </div>
                    <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${Math.min(deal.hotValue, 100)}%`,
                          background:
                            "linear-gradient(90deg, #f97316 0%, #ef4444 100%)",
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <ExternalDealLink
                      href={deal.origDealLink}
                      dealId={id}
                      className="bg-primary text-primary-foreground shadow-primary/20 flex flex-1 items-center justify-center gap-2 rounded-lg py-3 text-center text-lg font-bold shadow-lg transition-colors hover:opacity-90"
                    >
                      <span>See Deal on {deal.origDealDomain}</span>
                      {logoUrl && (
                        <img
                          src={logoUrl}
                          className="h-8 rounded bg-white p-0.5"
                          alt=""
                        />
                      )}
                    </ExternalDealLink>
                  </div>
                </div>
              </div>

              <div className="border-border mt-12 border-t pt-8">
                <h2 className="mb-4 text-xl font-bold">About this deal</h2>
                <div className="prose prose-sm dark:prose-invert text-muted-foreground max-w-none leading-relaxed">
                  {deal.description ||
                    `Great savings on ${deal.title}. Verified by the community. Valid as of ${new Date().toLocaleDateString()}.`}
                </div>
              </div>
            </div>
          </div>

          <aside className="w-full shrink-0 lg:w-80">
            <Sidebar country={country} trendingDeals={trendingDeals} />
          </aside>
        </div>
      </main>

      <FooterInfo country={country} />
    </div>
  );
}
