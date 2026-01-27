
import { NextRequest } from 'next/server';
import { api } from '@/lib/api';
import { generateRss } from '@/lib/rss';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ country: string }> }
) {
  const { country } = await params;
  
  try {
    // Fetch latest 20 deals for the specified country
    const deals = await api.getDeals(null, 0, 20, country);
    
    // Determine the base URL for links in the RSS feed
    const host = request.headers.get('host') || 'localhost:3000';
    const protocol = request.headers.get('x-forwarded-proto') || (request.nextUrl.protocol.split(':')[0]) || 'http';
    const baseUrl = `${protocol}://${host}`;
    
    const rss = generateRss(deals, country, baseUrl);
    
    return new Response(rss, {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200'
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new Response('Error generating RSS feed', { status: 500 });
  }
}
