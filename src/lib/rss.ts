
import type { Deal } from '../types';
import { THEME_CONFIG } from './constants';

export function generateRss(deals: Deal[], country: string, baseUrl: string) {
  const brandName = THEME_CONFIG.BRAND_NAME;
  const siteUrl = `${baseUrl}/${country}`;
  const feedUrl = `${baseUrl}/${country}/feeds`;

  const items = deals.map(deal => {
    const dealUrl = `${baseUrl}/${country}/deal/${deal.slug || 'deal'}/${deal.id}`;
    const pubDate = new Date(deal.dateCreated).toUTCString();
    
    // Create description with image and details
    let description = '';
    if (deal.imageLink) {
      description += `<img src="${deal.imageLink}" style="max-width: 100%; height: auto;" /><br/>`;
    }
    if (deal.dealPrice) {
      description += `<strong>Price: $${deal.dealPrice}</strong>`;
      if (deal.regPrice) {
        description += ` <strike>$${deal.regPrice}</strike>`;
      }
      description += `<br/>`;
    }
    if (deal.percentOff) {
      description += `<span>${deal.percentOff}% OFF</span><br/>`;
    }
    if (deal.description) {
      description += `<p>${deal.description}</p>`;
    }
    description += `<p><a href="${dealUrl}">View deal on ${brandName}</a></p>`;

    return `
    <item>
      <title><![CDATA[${deal.title}]]></title>
      <link>${dealUrl}</link>
      <guid isPermaLink="false">${deal.id}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${description}]]></description>
      <author>${brandName}</author>
    </item>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${brandName} - Latest Deals (${country.toUpperCase()})</title>
    <link>${siteUrl}</link>
    <description>The latest 20 deals from ${brandName} in ${country.toUpperCase()}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;
}
