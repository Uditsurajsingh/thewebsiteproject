import { availablePixels, boardConfig } from "@/lib/board";

export type ReservationInput = {
  brand?: unknown;
  email?: unknown;
  height?: unknown;
  durationDays?: unknown;
  endX?: unknown;
  endY?: unknown;
  selectedPixelIds?: unknown;
  startX?: unknown;
  startY?: unknown;
  url?: unknown;
  width?: unknown;
};

export type AutomatedReservation = {
  id: string;
  brand: string;
  email: string;
  url: string;
  width: number;
  height: number;
  durationDays: number;
  endX: number;
  endY: number;
  startX: number;
  startY: number;
  selectedPixelIds: string[];
  pixels: number;
  estimatedPriceUsd: number;
  status: "PENDING_REVIEW";
  reviewRequired: true;
  paymentStatus: "NOT_REQUESTED";
  requestedStartsAt: string;
  requestedEndsAt: string;
  paymentDueAt: string;
};

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function readPositiveInteger(value: unknown) {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return 0;
  }

  return parsed;
}

function addDays(date: Date, days: number) {
  const nextDate = new Date(date);
  nextDate.setUTCDate(nextDate.getUTCDate() + days);
  return nextDate;
}

export function createAutomatedReservation(input: ReservationInput) {
  const brand = readString(input.brand);
  const email = readString(input.email);
  const url = readString(input.url);
  const width = readPositiveInteger(input.width);
  const height = readPositiveInteger(input.height);
  const durationDays = readPositiveInteger(input.durationDays || 30);
  const startX = readPositiveInteger(Number(input.startX) + 1) - 1;
  const startY = readPositiveInteger(Number(input.startY) + 1) - 1;
  const endX = readPositiveInteger(Number(input.endX) + 1) - 1;
  const endY = readPositiveInteger(Number(input.endY) + 1) - 1;
  const selectedPixelIds = readString(input.selectedPixelIds)
    .split(",")
    .map((pixelId) => pixelId.trim())
    .filter(Boolean);
  const pixels = width * height;

  if (!brand || !email || !url) {
    return {
      ok: false as const,
      message: "Brand, email, and URL are required.",
    };
  }

  try {
    const parsedUrl = new URL(url);

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new Error("Unsupported URL protocol.");
    }
  } catch {
    return {
      ok: false as const,
      message: "Enter a valid http or https offer URL.",
    };
  }

  if (width < 1 || height < 1) {
    return {
      ok: false as const,
      message: "Width and height must each be at least 1 pixel.",
    };
  }

  if (durationDays < 1 || durationDays > 365) {
    return {
      ok: false as const,
      message: "Duration must be between 1 and 365 days.",
    };
  }

  if (
    startX < 0 ||
    startY < 0 ||
    endX < startX ||
    endY < startY ||
    startX + width > boardConfig.columns ||
    startY + height > boardConfig.rows ||
    endX >= boardConfig.columns ||
    endY >= boardConfig.rows
  ) {
    return {
      ok: false as const,
      message: "Selected placement does not fit on the board.",
    };
  }

  if (pixels > availablePixels) {
    return {
      ok: false as const,
      message: "Requested placement is larger than the currently available inventory.",
    };
  }

  if (selectedPixelIds.length !== pixels) {
    return {
      ok: false as const,
      message: "Selected pixel IDs must match the requested rectangle size.",
    };
  }

  const now = new Date();
  const requestedEndsAt = addDays(now, durationDays);
  const paymentDueAt = addDays(now, 1);

  return {
    ok: true as const,
    reservation: {
      id: crypto.randomUUID(),
      brand,
      email,
      url,
      width,
      height,
      durationDays,
      startX,
      startY,
      endX,
      endY,
      selectedPixelIds,
      pixels,
      estimatedPriceUsd: pixels * boardConfig.pricePerPixelUsd,
      status: "PENDING_REVIEW",
      reviewRequired: true,
      paymentStatus: "NOT_REQUESTED",
      requestedStartsAt: now.toISOString(),
      requestedEndsAt: requestedEndsAt.toISOString(),
      paymentDueAt: paymentDueAt.toISOString(),
    } satisfies AutomatedReservation,
  };
}
