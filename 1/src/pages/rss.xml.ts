import { allPosts } from '@/data/content';
import { site } from '@/config/site';

export async function GET() {
  const items = allPosts.map((post) => {
    const path = post.type === 'essay' ? `/essays/${post.slug}/` : `/signal/${post.slug}/`;
    return `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <description><![CDATA[${post.description}]]></description>
        <link>${site.url}${path}</link>
        <guid>${site.url}${path}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      </item>`;
  }).join('');

  return new Response(`<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${site.name}</title>
        <description>${site.description}</description>
        <link>${site.url}</link>
        ${items}
      </channel>
    </rss>`, {
    headers: { 'Content-Type': 'application/rss+xml' }
  });
}
