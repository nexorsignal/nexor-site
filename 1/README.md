# NEXOR SIGNAL

Publish-ready Astro site for NEXOR SIGNAL.

## Stack
- Astro
- Node adapter (server output)
- Live market API route via Yahoo Finance server-side fetch

## Commands
```bash
npm install
npm run dev
npm run build
npm run preview
```

## Notes
- Live markets now use `/api/markets.json` and require server output.
- Buy Me a Coffee points to `https://buymeacoffee.com/nexorsignal`.
- Bitcoin / Lightning support is integrated on `/support/` with Phoenix Wallet QR.
- Update site config in `src/config/site.ts` if you want to change links later.


Official domain: https://nexorsignal.com
Live markets use a server API route with Yahoo, Stooq, and CoinGecko fallbacks.


## Newsletter

The subscribe form posts to Buttondown using the public embedded form endpoint configured in `src/config/site.ts`. Use Buttondown double opt-in and keep unsubscribe links enabled in every email.
