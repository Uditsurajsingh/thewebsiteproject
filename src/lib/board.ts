export type PixelPlacement = {
  clientName: string;
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
      className: `boardPixel ${placement.color}`,
      href: placement.href,
      label: `${placement.clientName} sponsored pixel ${index + 1}`,
      isClaimed: true,
      sponsor: placement.clientName,
    };
  }

  return {
    id: index,
    className: `boardPixel ${availableColors[index % availableColors.length]}`,
    href: "/#reserve",
    label: `Available pixel ${index + 1}`,
    isClaimed: false,
    sponsor: "Available",
  };
});

export const previewPixels = boardPixels.slice(0, 360).map((pixel) => ({
  ...pixel,
  className: pixel.className.replace("boardPixel", "pixel"),
}));
