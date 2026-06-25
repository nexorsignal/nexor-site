import { marketRows } from '@/data/content';

export const prerender = false;

type MarketRow = typeof marketRows[number];

const chartEndpoint = (symbol: string) => `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=1d&interval=5m`;
const headers = {
  'user-agent': 'Mozilla/5.0 (compatible; NEXOR SIGNAL market fetcher)',
  'accept': 'application/json'
};

const fallbackNumber = (value: string) => Number(String(value).replace(/,/g, '').replace('%', '').replace('+', ''));

const readChart = async (row: MarketRow) => {
  const res = await fetch(chartEndpoint(row.yahoo), { headers, cache: 'no-store' });
  if (!res.ok) throw new Error(`Market fetch failed: ${row.yahoo}`);
  const json = await res.json();
  const result = json?.chart?.result?.[0];
  const meta = result?.meta ?? {};
  const quote = result?.indicators?.quote?.[0] ?? {};
  const closes = (quote?.close ?? []).filter((value: unknown) => typeof value === 'number');
  const price = meta.regularMarketPrice ?? closes.at(-1) ?? fallbackNumber(row.price);
  const previous = meta.chartPreviousClose ?? closes[0] ?? price;
  const changePct = previous ? ((price - previous) / previous) * 100 : fallbackNumber(row.change);

  return {
    symbol: row.symbol,
    name: row.name,
    price,
    changePct,
    trend: changePct >= 0 ? 'up' : 'down',
    closes: closes.slice(-36),
    live: true
  };
};

const fallbackRow = (row: MarketRow) => ({
  symbol: row.symbol,
  name: row.name,
  price: fallbackNumber(row.price),
  changePct: fallbackNumber(row.change),
  trend: row.trend,
  closes: [],
  live: false
});

export async function GET() {
  const rows = await Promise.all(
    marketRows.map(async (row) => {
      try {
        return await readChart(row);
      } catch {
        return fallbackRow(row);
      }
    })
  );

  const liveCount = rows.filter((row) => row.live).length;
  return new Response(JSON.stringify({ updatedAt: new Date().toISOString(), liveCount, rows }), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=300'
    }
  });
}
