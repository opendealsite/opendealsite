import { api } from '@/lib/api';
import { getMerchantLogoUrl } from '@/lib/merchantLogos';
import { formatRelativeTime } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { FooterInfo } from '@/components/custom/FooterInfo';
import { SEO } from '@/components/SEO';
import { ExternalDealLink } from '@/components/ExternalDealLink';

interface PageProps {
  params: Promise<{
    country: string;
    slug: string;
    id: string;
  }>;
}

export default async function DealDetailPage({ params }: PageProps) {
  const { country, slug, id } = await params;
  
  // Fetch deal data and trending deals for sidebar in parallel
  const [deal, trendingDeals] = await Promise.all([
    api.getDealById(id).catch(() => null),
    api.getHotDeals(24, 0, 8, country).catch(() => [])
  ]);

  if (!deal) notFound();

  const logoUrl = getMerchantLogoUrl(deal.origDealDomain);
  const hasDiscount = deal.percentOff != null && deal.percentOff > 0;
  const hasPrice = deal.dealPrice != null;

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header country={country} />
      
      <main className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="bg-surface p-6 rounded-xl shadow-sm border border-border">
              <SEO 
                title={deal.title}
                description={hasPrice ? `Get this deal for $${deal.dealPrice}! ${deal.title}` : deal.title}
                image={deal.imageLink}
                deal={deal}
              />
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                  <div className="aspect-4/3 w-full overflow-hidden rounded-lg bg-background">
                    {deal.imageLink ? (
                      <img 
                        src={deal.imageLink} 
                        alt={deal.title} 
                        className="h-full w-full object-contain" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground/30">
                        <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {hasDiscount && (
                    <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 font-bold rounded shadow">
                      {deal.percentOff}% OFF
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4 text-muted-foreground text-sm">
                    <span>Posted {formatRelativeTime(deal.dateCreated)} ago</span>
                    <span>•</span>
                    <span>{deal.origDealDomain}</span>
                  </div>

                  <h1 className="text-3xl font-bold text-foreground mb-4 leading-tight">{deal.title}</h1>

                  <div className="flex items-center gap-4 mb-6 flex-wrap">
                    {hasPrice ? (
                      <span className="text-4xl font-bold text-red-500">${deal.dealPrice?.toFixed(2)}</span>
                    ) : (
                      <span className="text-3xl font-bold text-primary">Check Price</span>
                    )}
                    
                    {deal.regPrice != null && (
                      <span className="text-xl text-muted-foreground line-through">${deal.regPrice.toFixed(2)}</span>
                    )}
                    
                    {deal.savedAmount != null && deal.savedAmount > 0 && (
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded text-sm font-semibold">
                        Save ${deal.savedAmount.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="mb-8">
                     <div className="flex items-center justify-between mb-2">
                        <span className="flex items-center gap-1.5">
                           <span className="text-orange-500 font-bold">🔥 {deal.hotValue}</span>
                           <span className="text-muted-foreground text-sm font-medium">degrees</span>
                        </span>
                     </div>
                     <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                           className="h-full rounded-full transition-all duration-1000"
                           style={{ 
                              width: `${Math.min(deal.hotValue, 100)}%`,
                              background: 'linear-gradient(90deg, #f97316 0%, #ef4444 100%)'
                           }}
                        />
                     </div>
                  </div>

                  <div className="flex gap-4">
                    <ExternalDealLink 
                      href={deal.origDealLink} 
                      dealId={id}
                      className="flex-1 bg-primary text-primary-foreground text-center py-3 rounded-lg font-bold text-lg hover:opacity-90 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                    >
                      <span>See Deal on {deal.origDealDomain}</span>
                      {logoUrl && (
                        <img src={logoUrl} className="h-8 rounded bg-white p-0.5" alt="" />
                      )}
                    </ExternalDealLink>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 border-t border-border pt-8">
                <h2 className="text-xl font-bold mb-4">About this deal</h2>
                <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                  {deal.description || `Great savings on ${deal.title}. Verified by the community. Valid as of ${new Date().toLocaleDateString()}.`}
                </div>
              </div>
            </div>
          </div>
          
          <aside className="w-full lg:w-80 shrink-0">
            <Sidebar country={country} trendingDeals={trendingDeals} />
          </aside>
        </div>
      </main>

      <FooterInfo country={country} />
    </div>
  );
}
