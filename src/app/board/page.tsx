import { boardConfig, boardPixels, claimedPixels, placements } from "@/lib/board";
import Link from "next/link";

export const metadata = {
  title: "Pixel Board | PixelLease",
  description: "A full-screen pixel advertising board where claimed pixels link to real clients.",
};

export default function BoardPage() {
  return (
    <main className="boardPage">
      <header className="boardHeader">
        <Link className="brand boardBrand" href="/">
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
        </Link>
        <div className="boardStatus" aria-label="Board status">
          <span>
            {boardConfig.columns} x {boardConfig.rows} board
          </span>
          <span>{claimedPixels.toLocaleString()} claimed</span>
          <span>{placements.length} clients</span>
        </div>
        <Link className="headerCta" href="/#reserve">
          Rent pixels
        </Link>
      </header>

      <section className="fullBoardWrap" aria-label="Full sponsor pixel board">
        <div className="fullBoard">
          {boardPixels.map((pixel) => (
            <a
              aria-label={pixel.label}
              className={pixel.className}
              href={pixel.href}
              key={pixel.id}
              rel={pixel.isClaimed ? "noreferrer" : undefined}
              target={pixel.isClaimed ? "_blank" : undefined}
              title={`${pixel.sponsor} sponsor link`}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
