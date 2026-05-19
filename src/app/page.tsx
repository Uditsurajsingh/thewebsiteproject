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

export default function Home() {
  return (
    <main className="homeBoardPage">
      <div className="heroBackdrop" aria-hidden="true" />
      <header className="siteHeader homeBoardHeader">
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
        <div className="boardStatus homeBoardStatus" aria-label="Board status">
          <span>
            {boardConfig.columns} x {boardConfig.rows} board
          </span>
          <span>{claimedPixels.toLocaleString()} live offers</span>
          <span>{placements.length.toLocaleString()} companies</span>
        </div>
      </header>

      <section className="homeBoardHero" aria-label="DealGrid home board">
        <div className="homeBoardCopy">
          <p className="eyebrow">Coupon hunting mode: online</p>
          <h1>{brand.shortTagline}</h1>
          <p className="lede">
            A visual grid for brand deals, coupon codes, and promo portals.
            Start as a shopper, or list an offer as a publisher.
          </p>
          <div className="portalActions" aria-label="Portal links">
            <Link className="primaryButton" href="/board">
              Consumer portal
            </Link>
            <Link className="secondaryButton" href="/payment">
              Publisher portal
            </Link>
          </div>
          <dl className="metrics" aria-label="DealGrid inventory">
            <div>
              <dt>Total slots</dt>
              <dd>{totalPixels.toLocaleString()}</dd>
            </div>
            <div>
              <dt>Available</dt>
              <dd>{availablePixels.toLocaleString()}</dd>
            </div>
          </dl>
        </div>

        <Link className="homeBoardShell" href="/board" aria-label="Open consumer portal">
          <div className="boardToolbar">
            <span>DealGrid live board</span>
            <span>{availablePixels.toLocaleString()} slots open</span>
          </div>
          <div className="pixelBoard homePixelBoard" aria-label="Deal board preview">
            {previewPixels.map((pixel) => (
              <span
                aria-label={pixel.label}
                className={pixel.className}
                key={pixel.id}
                title={pixel.label}
              />
            ))}
          </div>
        </Link>
      </section>
    </main>
  );
}
