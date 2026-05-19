import { boardConfig, boardPixels, claimedPixels, placements } from "@/lib/board";
import { brand } from "@/lib/brand";
import { ConsentModal } from "./consent-modal";
import Link from "next/link";

export const metadata = {
  title: `Deal Grid | ${brand.name}`,
  description: "A full-screen brand deal grid where claimed pixels link to real offers.",
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
          {brand.name}
        </Link>
        <div className="boardStatus" aria-label="Board status">
          <span>
            {boardConfig.columns} x {boardConfig.rows} board
          </span>
          <span>{claimedPixels.toLocaleString()} claimed</span>
          <span>{placements.length} companies</span>
        </div>
      </header>

      <section className="fullBoardWrap" aria-label="Full brand deal grid">
        <div className="fullBoard">
          {boardPixels.map((pixel) => (
            <a
              aria-label={pixel.label}
              className={pixel.className}
              href={pixel.href}
              key={pixel.id}
              rel={pixel.isClaimed ? "noreferrer" : undefined}
              target={pixel.isClaimed ? "_blank" : undefined}
              title={pixel.isClaimed ? `${pixel.company} offer link` : "Available placement"}
            />
          ))}
        </div>
      </section>
      <ConsentModal />
    </main>
  );
}
