import 'server-only';

import { getMarketplaceListings } from './marketplace';

function formatCurrency(value: number, currency: string) {
  return value.toLocaleString('en-US', { style: 'currency', currency, maximumFractionDigits: value % 1 ? 2 : 0 });
}

export async function getMarketTrendsSummary() {
  const listings = await getMarketplaceListings();
  const featured = listings.filter((listing) => listing.isFeatured);
  const categoryCounts = listings.reduce<Record<string, number>>((counts, listing) => {
    counts[listing.categoryName] = (counts[listing.categoryName] ?? 0) + 1;
    return counts;
  }, {});
  const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0];
  const totalViews = listings.reduce((sum, listing) => sum + listing.views, 0);
  const averagePrice = listings.length > 0 ? listings.reduce((sum, listing) => sum + listing.price, 0) / listings.length : 0;

  const fallbackSummary = [
    `Inventory is strongest in ${topCategory?.[0] ?? 'local essentials'} with ${topCategory?.[1] ?? 0} active listings.`,
    `${featured.length} featured listings are currently carrying the highest visibility across the marketplace.`,
    `Total recorded views are ${totalViews.toLocaleString()}, with an average asking price of ${formatCurrency(averagePrice, listings[0]?.currency ?? 'USD')}.`,
  ];

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || listings.length === 0) {
    return {
      ready: false,
      summary: fallbackSummary,
      highlights: [
        `Top category: ${topCategory?.[0] ?? 'No categories yet'}`,
        `Featured listings: ${featured.length}`,
        `Total views: ${totalViews.toLocaleString()}`,
      ],
      recommendations: [
        'Improve product photos and first-line descriptions on high-view listings.',
        'Feature listings in the best-selling category to improve discovery.',
        'Respond quickly to inquiries on items with strong view counts.',
      ],
    };
  }

  const model = process.env.OPENAI_MODEL ?? 'gpt-4o-mini';
  const payload = {
    model,
    messages: [
      {
        role: 'system',
        content:
          'You are a marketplace analyst for a local hyperlocal marketplace. Write concise, practical insights for sellers. Keep the response short and actionable.',
      },
      {
        role: 'user',
        content: JSON.stringify(
          {
            totalListings: listings.length,
            featuredListings: featured.map((listing) => ({
              title: listing.title.en,
              category: listing.categoryName,
              price: listing.price,
              city: listing.city,
              views: listing.views,
            })),
            topCategories: Object.entries(categoryCounts)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([name, count]) => ({ name, count })),
            totalViews,
            averagePrice,
          },
          null,
          2,
        ),
      },
    ],
    temperature: 0.4,
  };

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`OpenAI request failed with status ${response.status}`);
    }

    const data = (await response.json()) as { choices?: { message?: { content?: string } }[] };
    const content = data.choices?.[0]?.message?.content?.trim() ?? '';
    const lines = content
      .split('\n')
      .map((line) => line.replace(/^[-*\d.\s]+/, '').trim())
      .filter(Boolean);

    return {
      ready: true,
      summary: lines.slice(0, 3).length > 0 ? lines.slice(0, 3) : fallbackSummary,
      highlights: [
        `Top category: ${topCategory?.[0] ?? 'No categories yet'}`,
        `Featured listings: ${featured.length}`,
        `Total views: ${totalViews.toLocaleString()}`,
      ],
      recommendations: lines.length > 3 ? lines.slice(3, 6) : fallbackSummary,
    };
  } catch {
    return {
      ready: false,
      summary: fallbackSummary,
      highlights: [
        `Top category: ${topCategory?.[0] ?? 'No categories yet'}`,
        `Featured listings: ${featured.length}`,
        `Total views: ${totalViews.toLocaleString()}`,
      ],
      recommendations: [
        'Improve product photos and first-line descriptions on high-view listings.',
        'Feature listings in the best-selling category to improve discovery.',
        'Respond quickly to inquiries on items with strong view counts.',
      ],
    };
  }
}
