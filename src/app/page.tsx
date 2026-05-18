import {
  availablePixels,
  boardConfig,
  claimedPixels,
  placements,
  previewPixels,
  totalPixels,
} from "@/lib/board";
import Link from "next/link";

const packages = [
  {
    name: "Micro Drop",
    size: "10 x 10",
    price: "$100",
    detail: "A compact logo, launch badge, or collector stamp.",
  },
  {
    name: "Signal Block",
    size: "50 x 50",
    price: "$2,500",
    detail: "Enough room for a bold mark and recognizable art direction.",
  },
  {
    name: "Landmark",
    size: "100 x 100",
    price: "$10,000",
    detail: "A permanent board anchor for a brand, product, or movement.",
  },
];

const principles = [
  "Static-first public pages",
  "Open-source stack",
  "SQLite before Postgres",
  "S3-compatible assets",
  "No vendor lock-in",
  "One API route per paid workflow",
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="heroBackdrop" aria-hidden="true" />
        <header className="siteHeader">
          <a className="brand" href="#">
            <span className="brandMark" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </span>
            PixelLease
          </a>
          <nav aria-label="Primary navigation">
            <Link href="/board">Board</Link>
            <a href="#pricing">Pricing</a>
            <a href="#stack">Stack</a>
          </nav>
          <a className="headerCta" href="#reserve">
            Claim pixels
          </a>
        </header>

        <div className="heroGrid">
          <div className="heroCopy">
            <p className="eyebrow">Rent tiny ad territory</p>
            <h1>{totalPixels.toLocaleString()} pixels. Zero pretend hype.</h1>
            <p className="lede">
              A seductive public pixel wall where every claimed square links to
              a real client. Today the board is open, honest, and ready for its
              first sponsors.
            </p>
            <div className="heroActions">
              <a className="primaryButton" href="#reserve">
                Reserve a block
              </a>
              <Link className="secondaryButton" href="/board">
                View the board
              </Link>
            </div>
            <dl className="metrics" aria-label="Board metrics">
              <div>
                <dt>Total pixels</dt>
                <dd>{totalPixels.toLocaleString()}</dd>
              </div>
              <div>
                <dt>Claimed</dt>
                <dd>{claimedPixels.toLocaleString()}</dd>
              </div>
              <div>
                <dt>Available</dt>
                <dd>{availablePixels.toLocaleString()}</dd>
              </div>
            </dl>
          </div>

          <div className="boardShell" id="board">
            <div className="boardToolbar">
              <span>Real board preview</span>
              <span>{placements.length} clients live</span>
            </div>
            <div className="pixelBoard" aria-label="Pixel advertising board">
              {previewPixels.map((pixel) => (
                <a
                  aria-label={pixel.label}
                  className={pixel.className}
                  href={pixel.href}
                  key={pixel.id}
                  rel={pixel.isClaimed ? "noreferrer" : undefined}
                  target={pixel.isClaimed ? "_blank" : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ticker" aria-label="Example advertisers">
        <span>Launches</span>
        <span>Creators</span>
        <span>SaaS</span>
        <span>Indie games</span>
        <span>Newsletters</span>
        <span>Events</span>
        <span>Studios</span>
      </section>

      <section className="section split">
        <div>
          <p className="eyebrow">How it works</p>
          <h2>Small space, sharp signal.</h2>
        </div>
        <div className="steps">
          <article>
            <span>01</span>
            <h3>Pick territory</h3>
            <p>Choose a rectangle that fits your campaign and budget.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Upload art</h3>
            <p>Use pixel art, a logo, a product crop, or a tiny manifesto.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Link forever</h3>
            <p>Your patch becomes a permanent doorway to your URL.</p>
          </article>
        </div>
      </section>

      <section className="section pricing" id="pricing">
        <div className="sectionIntro">
          <p className="eyebrow">Pricing</p>
          <h2>Brutally simple economics.</h2>
          <p>
            One pixel costs ${boardConfig.pricePerPixelUsd}. Start tiny, buy a
            campaign block, or become the first landmark on the board.
          </p>
        </div>
        <div className="packageGrid">
          {packages.map((item) => (
            <article className="packageCard" key={item.name}>
              <p>{item.size}</p>
              <h3>{item.name}</h3>
              <strong>{item.price}</strong>
              <span>{item.detail}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section stack" id="stack">
        <div>
          <p className="eyebrow">Scalable, frugal, open</p>
          <h2>Designed to stay cheap until success demands otherwise.</h2>
        </div>
        <div className="principleGrid">
          {principles.map((principle) => (
            <span key={principle}>{principle}</span>
          ))}
        </div>
      </section>

      <section className="reserve" id="reserve">
        <div className="reserveCopy">
          <p className="eyebrow">Reserve</p>
          <h2>Claim your corner of the board.</h2>
          <p>
            This form is ready to wire into storage and payments. For now, the
            API returns a clean reservation estimate so the product flow is easy
            to extend.
          </p>
        </div>
        <form action="/api/reservations" method="post">
          <label>
            Brand
            <input name="brand" placeholder="Neon Sandwich" required />
          </label>
          <label>
            Email
            <input name="email" placeholder="you@example.com" required type="email" />
          </label>
          <label>
            Width
            <input min="10" name="width" placeholder="100" required type="number" />
          </label>
          <label>
            Height
            <input min="10" name="height" placeholder="50" required type="number" />
          </label>
          <label className="wide">
            Destination URL
            <input name="url" placeholder="https://example.com" required type="url" />
          </label>
          <button type="submit">Request reservation</button>
        </form>
      </section>
    </main>
  );
}
