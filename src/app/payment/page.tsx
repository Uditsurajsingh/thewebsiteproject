import { availablePixels, boardConfig, claimedPixels, totalPixels } from "@/lib/board";
import { brand } from "@/lib/brand";
import Link from "next/link";

const packages = [
  {
    name: "Coupon Tile",
    size: "10 x 10",
    pixels: 100,
    detail: "A small coupon-code block for a campaign or evergreen promo page.",
  },
  {
    name: "Brand Portal",
    size: "25 x 20",
    pixels: 500,
    detail: "A larger placement for a marketing portal, marketplace, or seasonal offer.",
  },
  {
    name: "Launch Block",
    size: "50 x 50",
    pixels: 2500,
    detail: "A dominant board position for a launch, partnership, or deal hub.",
  },
];

export const metadata = {
  title: `List a Brand Deal | ${brand.name}`,
  description: "Reserve placement for a real discount, coupon, or marketing portal.",
};

export default function PaymentPage() {
  return (
    <main>
      <section className="paymentPage">
        <header className="siteHeader paymentHeader">
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
          <nav aria-label="Payment navigation">
            <Link href="/">Home base</Link>
            <Link href="/board">DealGrid</Link>
          </nav>
          <Link className="headerCta" href="/board">
            Open grid
          </Link>
        </header>

        <div className="paymentGrid">
          <div className="reserveCopy">
            <p className="eyebrow">Brand deal placement</p>
            <h1>List your offer where deal-seekers browse.</h1>
            <p className="lede">
              Use this flow for coupon codes, discount pages, affiliate portals,
              and brand campaign links. No placement goes live until it points
              to a real destination and passes review.
            </p>
            <dl className="metrics" aria-label="Inventory metrics">
              <div>
                <dt>Total slots</dt>
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

          <form className="paymentForm" action="/api/reservations" method="post">
            <label>
              Company or brand name
              <input name="brand" placeholder="Acme Deals" required />
            </label>
            <label>
              Work email
              <input name="email" placeholder="growth@company.com" required type="email" />
            </label>
            <label>
              Width in pixels
              <input min="10" name="width" placeholder="10" required type="number" />
            </label>
            <label>
              Height in pixels
              <input min="10" name="height" placeholder="10" required type="number" />
            </label>
            <label className="wide">
              Coupon, discount, or brand portal URL
              <input name="url" placeholder="https://company.com/deals" required type="url" />
            </label>
            <button type="submit">Request payment estimate</button>
          </form>
        </div>
      </section>

      <section className="section pricing">
        <div className="sectionIntro">
          <div>
            <p className="eyebrow">Placement sizes</p>
            <h2>Start small, prove demand, scale up.</h2>
          </div>
          <p>
            Estimates use the current ${boardConfig.pricePerPixelUsd} per-pixel
            model. Payment provider integration comes in a later tracked change.
          </p>
        </div>
        <div className="packageGrid">
          {packages.map((item) => (
            <article className="packageCard" key={item.name}>
              <p>{item.size}</p>
              <h3>{item.name}</h3>
              <strong>${item.pixels * boardConfig.pricePerPixelUsd}</strong>
              <span>{item.detail}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
