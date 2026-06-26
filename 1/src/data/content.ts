export type PostType = 'signal' | 'essay';

export type Post = {
  slug: string;
  type: PostType;
  label: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  featured?: boolean;
  source?: 'TikTok' | 'Essay' | 'Market Test';
  body: string[];
};

export const signalPosts: Post[] = [
  {
    slug: 'more-ai-tools-is-not-the-edge',
    type: 'signal',
    label: 'Systems',
    title: 'Most people don’t need more AI tools',
    description: 'They need fewer tabs, cleaner defaults, and systems that survive pressure. More tools often create more noise.',
    date: '2026-06-25',
    readTime: '2 min read',
    source: 'TikTok',
    body: [
      'Most people do not need more AI tools. They need fewer tabs, cleaner defaults, and a system that still works when they are tired.',
      'The AI tool race makes people feel productive because every new app gives the brain a fresh hit of possibility. But possibility is not leverage. Leverage is a repeatable path from intention to execution.',
      'A messy workflow with ten AI tools is still a messy workflow. The problem is usually not missing software. The problem is unclear input, scattered context, weak naming, too many decisions, and no default process.',
      'The edge is not collecting tools. The edge is reducing friction between thinking and shipping.',
      'Tools are useful. Systems compound.'
    ]
  },
  {
    slug: 'future-runs-on-infrastructure',
    type: 'signal',
    label: 'Infrastructure',
    title: 'The future runs on boring infrastructure',
    description: 'AI looks magical at the surface. Underneath it is power, chips, datacenters, cooling, bandwidth, and patience.',
    date: '2026-06-25',
    readTime: '3 min read',
    source: 'TikTok',
    body: [
      'Everyone wants the future. Almost nobody wants the infrastructure bill that comes with it.',
      'AI looks like software on the surface, but the real constraint is increasingly physical: energy, chips, datacenters, cooling, memory, bandwidth, logistics, and capital expenditure.',
      'The model gets the headline. The substrate decides who can scale.',
      'This is why compute culture is becoming infrastructure culture again. The next wave will not only be won by the companies with the best demos. It will be won by the companies that own the boring layers underneath the demo.',
      'The future is rented by hype for a while. Eventually it is owned by whoever controls the base.'
    ]
  },
  {
    slug: 'markets-reward-signal',
    type: 'signal',
    label: 'Markets',
    title: 'Markets reward signal, not noise',
    description: 'Price moves are not always information. The edge is knowing which movements matter and which movements are just exhaustion.',
    date: '2026-06-25',
    readTime: '2 min read',
    source: 'Market Test',
    body: [
      'Markets do not reward the person who reacts to everything. They reward the person who can separate movement from meaning.',
      'Algorithms amplify noise because noise is easy to distribute. A price spike, a red candle, a headline, a screenshot — all of it can feel urgent without being useful.',
      'Signal is slower. It needs context. It asks whether liquidity changed, whether positioning changed, whether the move is confirmed by volume, and whether the market is rewarding risk or punishing it.',
      'The edge is not reacting faster. It is filtering better.',
      'Think longer. Size smaller. Stay calm while others churn.'
    ]
  },
  {
    slug: 'same-asset-different-emotions',
    type: 'signal',
    label: 'Crypto',
    title: 'Same asset. Different emotions.',
    description: 'Bitcoin at one price can feel cheap, expensive, safe, or terrifying depending on the crowd around it.',
    date: '2026-06-23',
    readTime: '2 min read',
    source: 'TikTok',
    body: [
      'The asset is the same. The emotion around it changes.',
      'Bitcoin at one level can feel like opportunity when the feed is euphoric and danger when everyone is exhausted. The price may be similar. The psychology is completely different.',
      'This is why most people do not lose only because they picked the wrong asset. They lose because they borrow the emotion of the crowd at the worst possible moment.',
      'A market is not just a chart. It is a pressure test for attention, patience, liquidity, and fear.',
      'Same asset. Different emotions. Different decisions.'
    ]
  },
  {
    slug: 'buying-decisions-need-fewer-tabs',
    type: 'signal',
    label: 'Buying Decisions',
    title: 'Buying decisions need fewer tabs',
    description: 'Most tech research fails because people compare specs instead of deciding what job the device must do.',
    date: '2026-06-21',
    readTime: '2 min read',
    source: 'TikTok',
    body: [
      'Most buying decisions do not need more tabs. They need a clearer job definition.',
      'People compare laptops, phones, keyboards, monitors, and software like every spec has equal weight. It does not. The right question is simpler: what job must this thing do, under what constraints, and for how long?',
      'A powerful device that does the wrong job is expensive noise. A boring device that solves the actual constraint is leverage.',
      'Start with the job. Then filter the market. Not the other way around.'
    ]
  },
  {
    slug: 'attention-is-the-real-market',
    type: 'signal',
    label: 'Culture',
    title: 'Attention is the real market',
    description: 'The feed is not free. It is paid for with focus, patience, and decision quality.',
    date: '2026-06-19',
    readTime: '2 min read',
    source: 'TikTok',
    body: [
      'The feed is not free. It is paid for with attention.',
      'Every notification, chart, headline, and viral clip competes for the same scarce resource: the ability to think clearly long enough to make a good decision.',
      'The modern edge is not knowing everything. It is protecting the few inputs that actually improve your judgment.',
      'Attention is the real market. Spend it like capital.'
    ]
  }
];

export const essays: Post[] = [
  {
    slug: 'compute-is-the-new-leverage',
    type: 'essay',
    label: 'Featured Essay',
    title: 'Compute Is the New Leverage',
    description: 'Why the next decade will be shaped by people and companies who can turn raw compute into calm execution.',
    date: '2026-06-25',
    readTime: '7 min read',
    featured: true,
    source: 'Essay',
    body: [
      'The next decade of AI will not be defined by models alone. It will be defined by the systems that make those models usable, reliable, and calm enough to live with.',
      'Raw capability is everywhere. The harder problem is turning capability into leverage: a workflow, an interface, a decision loop, a business process, a product, a habit, a repeatable advantage.',
      'This is where most AI hype breaks. It mistakes output for leverage. More text, more images, more agents, more dashboards — none of that matters if the system creates more cognitive load than it removes.',
      'The winners will not simply chase benchmarks. They will own the substrate: compute, memory, energy, interface, workflow, trust, distribution, and the boring operational layers that make intelligence useful.',
      'The interface is the battlefield. The model is powerful, but the system decides whether that power becomes clarity or noise.',
      'For individuals, the same rule applies. The edge is not having access to every tool. The edge is building a personal operating system that makes better decisions easier and worse decisions harder.',
      'Compute is the new leverage only when it reduces friction between thought and execution. Everything else is noise.'
    ]
  },
  {
    slug: 'energy-is-the-new-alpha',
    type: 'essay',
    label: 'Essay',
    title: 'Energy Is the New Alpha',
    description: 'Power determines everything. Compute simply reveals it.',
    date: '2026-06-22',
    readTime: '5 min read',
    source: 'Essay',
    body: [
      'Every software revolution eventually finds a physical constraint. For AI, that constraint is energy.',
      'The market often talks about models as if intelligence floats in the cloud. It does not. It runs through power plants, transformers, substations, datacenters, cooling systems, chips, cables, and land.',
      'When compute demand rises, energy stops being background infrastructure and becomes strategic leverage.',
      'This is why the AI trade is not only a software trade. It is an energy trade, a semiconductor trade, a cooling trade, a grid trade, and a capital allocation trade.',
      'Power determines what can scale. Compute reveals who prepared for it.'
    ]
  },
  {
    slug: 'the-attention-recession',
    type: 'essay',
    label: 'Essay',
    title: 'The Attention Recession',
    description: 'Markets, media, and models compete for a resource you cannot print.',
    date: '2026-06-20',
    readTime: '6 min read',
    source: 'Essay',
    body: [
      'The modern bottleneck is not information. It is attention.',
      'People have access to more data, more tools, more opinions, and more output than ever. But the ability to process that flood without distortion is shrinking.',
      'This creates an attention recession: not a lack of content, but a shortage of clean cognitive bandwidth.',
      'Markets exploit it. Media exploits it. Algorithms exploit it. Even productivity tools can exploit it by making motion feel like progress.',
      'The next premium products will not only create more output. They will reduce cognitive load.',
      'The next premium people will not be the ones who know everything. They will be the ones who can protect attention long enough to see clearly.'
    ]
  }
];

export const allPosts = [...signalPosts, ...essays].sort((a, b) => +new Date(b.date) - +new Date(a.date));

export const marketRows = [
  { symbol: 'NVDA', yahoo: 'NVDA', name: 'NVIDIA Corp.', price: '958.83', change: '+2.31%', trend: 'up' },
  { symbol: 'AVGO', yahoo: 'AVGO', name: 'Broadcom Inc.', price: '1642.21', change: '+1.45%', trend: 'up' },
  { symbol: 'BTC', yahoo: 'BTC-USD', name: 'Bitcoin / U.S. Dollar', price: '67,264.21', change: '+0.82%', trend: 'up' },
  { symbol: 'ETH', yahoo: 'ETH-USD', name: 'Ethereum / U.S. Dollar', price: '3,121.18', change: '+1.25%', trend: 'up' },
  { symbol: 'SOXX', yahoo: 'SOXX', name: 'iShares Semiconductor ETF', price: '253.17', change: '+1.85%', trend: 'up' },
  { symbol: 'PLTR', yahoo: 'PLTR', name: 'Palantir Technologies', price: '24.48', change: '+2.74%', trend: 'up' }
];
