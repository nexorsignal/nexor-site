# NEXOR SIGNAL — Deploy Notes

## Important
The live market snapshot uses an Astro API route at:

`/api/markets.json`

That means the project is configured for **server output** with the Astro Node adapter.

## Best publish options
Use one of these if you want live markets to work:

- a Node-capable server
- Railway
- Render
- Fly.io
- a VPS
- any host that can run `node ./dist/server/entry.mjs`

## Not recommended for live markets
GitHub Pages is static only. It can host the site visually, but it will not run the live market API route.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Production start
After build:

```bash
node ./dist/server/entry.mjs
```

## Support links
Buy Me a Coffee is already set:

`https://buymeacoffee.com/nexorsignal`

Phoenix Wallet QR and Lightning invoice are set in:

`src/config/site.ts`

QR image:

`public/assets/phoenix-wallet-qr.png`


## Newsletter

The subscribe form posts to Buttondown using the public embedded form endpoint configured in `src/config/site.ts`. Use Buttondown double opt-in and keep unsubscribe links enabled in every email.
