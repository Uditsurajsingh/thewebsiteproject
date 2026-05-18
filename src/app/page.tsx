import {
  availablePixels,
  boardConfig,
  claimedPixels,
  placements,
  previewPixels,
  totalPixels,
} from "@/lib/board";
import { brand } from "@/lib/brand";
import Link from "next/link";

const dealTypes = [
  "Coupon codes",
  "Student offers",
  "Launch discounts",
  "Cashback portals",
  "Brand campaigns",
  "Limited drops",
];

const principles = [
  "Real offer links only",
  "No fake company counts",
  "Static-first public board",
  "Open-source codebase",
  "Cheap to host",
  "Payment flow separated",
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="heroBackdrop" aria-hidden="true" />
        <header className="siteHeader">
          <Link className="brand" href="/">
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
            {brand.name}
          </Link>
          <nav aria-label="Primary navigation">
            <Link href="/board">Deal grid</Link>
            <a href="#categories">Categories</a>
            <Link href="/payment">For brands</Link>
          </nav>
          <Link className="headerCta" href="/board">
            Open board
          </Link>
        </header>

        <div className="heroGrid">
          <div className="heroCopy">
            <p className="eyebrow">Brand deals, coupon codes, promo links</p>
            <h1>{brand.shortTagline}</h1>
            <p className="lede">
              Browse a visual grid of discounts, coupon pages, and marketing
              portals from companies that want shoppers to find their best
              offers fast. Claimed pixels point to real company links, never
              placeholder brands or inflated counts.
            </p>
            <div className="dealSearch" role="search">
              <input aria-label="Search brand deals" placeholder="Search brands, coupons, portals" />
              <Link href="/board">Browse live board</Link>
            </div>
            <div className="heroActions">
              <Link className="primaryButton" href="/board">
                Explore brand deals
              </Link>
              <Link className="secondaryButton" href="/payment">
                Add your company
              </Link>
            </div>
            <dl className="metrics" aria-label="Board metrics">
              <div>
                <dt>Total slots</dt>
                <dd>{totalPixels.toLocaleString()}</dd>
              </div>
              <div>
                <dt>Live offers</dt>
                <dd>{claimedPixels.toLocaleString()}</dd>
              </div>
              <div>
                <dt>Companies</dt>
                <dd>{placements.length.toLocaleString()}</dd>
              </div>
            </dl>
          </div>

          <div className="boardShell">
            <div className="boardToolbar">
              <span>Live deal grid preview</span>
              <span>{availablePixels.toLocaleString()} slots open</span>
            </div>
            <div className="pixelBoard" aria-label="Deal board preview">
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

      <section className="ticker" aria-label="Brand deal categories">
        {dealTypes.map((type) => (
          <span key={type}>{type}</span>
        ))}
      </section>

      <section className="section split" id="categories">
        <div>
          <p className="eyebrow">Shopper flow</p>
          <h2>One place for shoppers who already want a deal.</h2>
        </div>
        <div className="steps">
          <article>
            <span>01</span>
            <h3>Scan the board</h3>
            <p>Use the grid to scan for brands, categories, and active offer pages.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Open the offer</h3>
            <p>Claimed pixels go directly to the company’s coupon, sale, or campaign portal.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Compare promos</h3>
            <p>No fake rankings. The grid shows only what is actually live in the data.</p>
          </article>
        </div>
      </section>

      <section className="section pricing">
        <div className="sectionIntro">
          <div>
            <p className="eyebrow">For companies</p>
            <h2>Companies get a separate placement flow.</h2>
          </div>
          <p>
            The homepage stays focused on shoppers searching for brand deals.
            Company placement, sizing, price estimates, and campaign URLs live
            in a separate payment flow.
          </p>
        </div>
        <div className="packageGrid">
          <article className="packageCard">
            <p>Public board</p>
            <h3>{boardConfig.columns} x {boardConfig.rows}</h3>
            <strong>{totalPixels.toLocaleString()}</strong>
            <span>Total deal slots available in the current production board model.</span>
          </article>
          <article className="packageCard">
            <p>Real inventory</p>
            <h3>{availablePixels.toLocaleString()} open</h3>
            <strong>{claimedPixels.toLocaleString()}</strong>
            <span>Live offers are derived from actual placement data only.</span>
          </article>
          <article className="packageCard">
            <p>Brand flow</p>
            <h3>Separate checkout</h3>
            <strong>${boardConfig.pricePerPixelUsd}</strong>
            <span>Per-pixel estimate before payment provider integration.</span>
          </article>
        </div>
      </section>

      <section className="section stack" id="stack">
        <div>
          <p className="eyebrow">Production posture</p>
          <h2>Honest data first, monetization second.</h2>
        </div>
        <div className="principleGrid">
          {principles.map((principle) => (
            <span key={principle}>{principle}</span>
          ))}
        </div>
      </section>
    </main>
  );
}
