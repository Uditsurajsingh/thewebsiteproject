export type PixelPlacement = {
  companyName: string;
  href: string;
  start: number;
  length: number;
  color: "amber" | "cobalt" | "coral" | "cream" | "ink" | "mint" | "paper" | "sage";
};

export const boardConfig = {
  columns: 100,
  rows: 100,
  pricePerPixelUsd: 1,
};

export const placements: PixelPlacement[] = [];

const availableColors = ["cream", "mint", "paper"];

export const totalPixels = boardConfig.columns * boardConfig.rows;
export const claimedPixels = placements.reduce((sum, placement) => sum + placement.length, 0);
export const availablePixels = totalPixels - claimedPixels;

export function getPixelIdentifier(index: number) {
  const row = Math.floor(index / boardConfig.columns) + 1;
  const column = (index % boardConfig.columns) + 1;

  return `DG-R${String(row).padStart(3, "0")}-C${String(column).padStart(3, "0")}`;
}

function getPlacement(pixelIndex: number) {
  return placements.find(
    (placement) =>
      pixelIndex >= placement.start && pixelIndex < placement.start + placement.length,
  );
}

export const boardPixels = Array.from({ length: totalPixels }, (_, index) => {
  const placement = getPlacement(index);

  if (placement) {
    return {
      id: index,
      pixelId: getPixelIdentifier(index),
      x: index % boardConfig.columns,
      y: Math.floor(index / boardConfig.columns),
      className: `boardPixel ${placement.color}`,
      href: placement.href,
      label: `${placement.companyName} deal pixel ${getPixelIdentifier(index)}`,
      isClaimed: true,
      company: placement.companyName,
    };
  }

  return {
    id: index,
    pixelId: getPixelIdentifier(index),
    x: index % boardConfig.columns,
    y: Math.floor(index / boardConfig.columns),
    className: `boardPixel ${availableColors[index % availableColors.length]}`,
    href: "/payment",
    label: `Available pixel ${getPixelIdentifier(index)}`,
    isClaimed: false,
    company: "Available",
  };
});

export const previewPixels = boardPixels.slice(0, 360).map((pixel) => ({
  ...pixel,
  className: pixel.className.replace("boardPixel", "pixel"),
}));
