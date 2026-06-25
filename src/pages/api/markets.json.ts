import { marketRows } from '@/data/content';

export const prerender = false;

type MarketRow = typeof marketRows[number];

type LiveMarketPayload = {
  symbol: string;
  name: string;
  price: number;
  changePct: number;
  trend: 'up' | 'down';
  closes: number[];
  live: boolean;
  source?: string;
};

const fallbackNumber = (value: string) => Number(String(value).replace(/,/g, '').replace('%', '').replace('+', ''));
const yahooChartEndpoint = (symbol: string) => `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=1d&interval=5m`;
const stooqEndpoint = (symbol: string) => `https://stooq.com/q/l/?s=${encodeURIComponent(symbol)}&f=sd2t2ohlcv&h&e=csv`;
const coingeckoEndpoint = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true';

const headers = {
  'user-agent': 'Mozilla/5.0 (compatible; NEXOR SIGNAL market fetcher)',
  'accept': 'application/json,text/csv,*/*'
};

const stooqSymbols: Record<string, string> = {
  NVDA: 'nvda.us',
  AVGO: 'avgo.us',
  SOXX: 'soxx.us',
  PLTR: 'pltr.us'
};

const cryptoIds: Record<string, 'bitcoin' | 'ethereum'> = {
  BTC: 'bitcoin',
  ETH: 'ethereum'
};

const fallbackRow = (row: MarketRow): LiveMarketPayload => ({
  symbol: row.symbol,
  name: row.name,
  price: fallbackNumber(row.price),
  changePct: fallbackNumber(row.change),
  trend: row.trend === 'down' ? 'down' : 'up',
  closes: [],
  live: false,
  source: 'fallback'
});

const cleanNumber = (value: unknown) => {
  if (typeof value === 'number') return value;
  const parsed = Number(String(value ?? '').replace(/,/g, ''));
  return Number.isFinite(parsed) ? parsed : NaN;
};

const readYahooChart = async (row: MarketRow): Promise<LiveMarketPayload> => {
  const res = await fetch(yahooChartEndpoint(row.yahoo), { headers, cache: 'no-store' });
  if (!res.ok) throw new Error(`Yahoo fetch failed: ${row.yahoo}`);
  const json = await res.json();
  const result = json?.chart?.result?.[0];
  const meta = result?.meta ?? {};
  const quote = result?.indicators?.quote?.[0] ?? {};
  const closes = (quote?.close ?? []).filter((value: unknown) => typeof value === 'number');
  const price = meta.regularMarketPrice ?? closes.at(-1);
  const previous = meta.chartPreviousClose ?? closes[0];
  if (!Number.isFinite(price) || !Number.isFinite(previous)) throw new Error(`Yahoo incomplete: ${row.yahoo}`);
  const changePct = previous ? ((price - previous) / previous) * 100 : 0;
  return {
    symbol: row.symbol,
    name: row.name,
    price,
    changePct,
    trend: changePct >= 0 ? 'up' : 'down',
    closes: closes.slice(-36),
    live: true,
    source: 'yahoo'
  };
};

const readStooq = async (row: MarketRow): Promise<LiveMarketPayload> => {
  const symbol = stooqSymbols[row.symbol];
  if (!symbol) throw new Error(`No Stooq symbol for ${row.symbol}`);
  const res = await fetch(stooqEndpoint(symbol), { headers, cache: 'no-store' });
  if (!res.ok) throw new Error(`Stooq fetch failed: ${symbol}`);
  const csv = await res.text();
  const lines = csv.trim().split(/\r?\n/);
  if (lines.length < 2) throw new Error(`Stooq empty: ${symbol}`);
  const values = lines[1].split(',');
  const open = cleanNumber(values[3]);
  const high = cleanNumber(values[4]);
  const low = cleanNumber(values[5]);
  const close = cleanNumber(values[6]);
  if (!Number.isFinite(close)) throw new Error(`Stooq no close: ${symbol}`);
  const base = Number.isFinite(open) && open > 0 ? open : close;
  const changePct = base ? ((close - base) / base) * 100 : 0;
  const spark = [open, low, (open + close) / 2, high, close].filter(Number.isFinite) as number[];
  return {
    symbol: row.symbol,
    name: row.name,
    price: close,
    changePct,
    trend: changePct >= 0 ? 'up' : 'down',
    closes: spark,
    live: true,
    source: 'stooq'
  };
};

let cryptoCache: { expires: number; data: Record<string, any> } | null = null;
const readCoinGeckoPayload = async () => {
  const now = Date.now();
  if (cryptoCache && cryptoCache.expires > now) return cryptoCache.data;
  const res = await fetch(coingeckoEndpoint, { headers, cache: 'no-store' });
  if (!res.ok) throw new Error('CoinGecko fetch failed');
  const data = await res.json();
  cryptoCache = { expires: now + 60_000, data };
  return data;
};

const readCrypto = async (row: MarketRow): Promise<LiveMarketPayload> => {
  const id = cryptoIds[row.symbol];
  if (!id) throw new Error(`No crypto id for ${row.symbol}`);
  const data = await readCoinGeckoPayload();
  const price = cleanNumber(data?.[id]?.usd);
  const changePct = cleanNumber(data?.[id]?.usd_24h_change);
  if (!Number.isFinite(price) || !Number.isFinite(changePct)) throw new Error(`CoinGecko incomplete: ${id}`);
  const direction = changePct >= 0 ? 1 : -1;
  const base = price / (1 + changePct / 100);
  const closes = [base, base * (1 + direction * 0.002), price * (1 - direction * 0.0015), price];
  return {
    symbol: row.symbol,
    name: row.name,
    price,
    changePct,
    trend: changePct >= 0 ? 'up' : 'down',
    closes,
    live: true,
    source: 'coingecko'
  };
};

const readMarket = async (row: MarketRow): Promise<LiveMarketPayload> => {
  if (cryptoIds[row.symbol]) {
    try { return await readCrypto(row); } catch {}
  }

  try { return await readYahooChart(row); } catch {}
  try { return await readStooq(row); } catch {}
  return fallbackRow(row);
};

export async function GET() {
  const rows = await Promise.all(marketRows.map(readMarket));
  const liveCount = rows.filter((row) => row.live).length;

  return new Response(JSON.stringify({ updatedAt: new Date().toISOString(), liveCount, rows }), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=300'
    }
  });
}
