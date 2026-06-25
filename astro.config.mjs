import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://nexor.gg',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  trailingSlash: 'always'
});
