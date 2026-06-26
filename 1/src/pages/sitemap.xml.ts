import { allPosts } from '@/data/content';
import { site, nav } from '@/config/site';

export function GET() {
  const staticPaths = [...nav.map((n) => n.href), '/support/', '/contact/', '/privacy/'];
  const postPaths = allPosts.map((post) => post.type === 'essay' ? `/essays/${post.slug}/` : `/signal/${post.slug}/`);
  const urls = Array.from(new Set([...staticPaths, ...postPaths]));
  const body = urls.map((path) => `<url><loc>${site.url}${path}</loc></url>`).join('');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`, {
    headers: { 'Content-Type': 'application/xml' }
  });
}
