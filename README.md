# PixelLease

PixelLease is a static-first pixel advertising marketplace: a million-pixel board where brands can rent visual territory and link it to a campaign, drop, product, or project.

## Stack

- Next.js with the App Router
- React and TypeScript
- Plain CSS, no paid UI kit, no hosted design dependency
- Static-first pages so the site can run cheaply on any Next-compatible host

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Frugal Growth Path

The current app keeps the public page static and lightweight. Add backend pieces only when the product needs them:

- Reservation capture: start with a simple email/API handler or SQLite.
- Payments: add Stripe, Polar, or another provider behind one API route.
- Board data: store sold blocks in SQLite first, then move to Postgres if traffic requires it.
- Assets: use local uploads while testing, then S3-compatible storage such as MinIO, R2, or Backblaze B2.
- Deployment: Vercel, Fly.io, Coolify, Dokploy, or a small VPS all work.

## License

MIT. See [LICENSE](./LICENSE).
