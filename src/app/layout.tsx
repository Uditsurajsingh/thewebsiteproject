import type { Metadata, Viewport } from "next";
import { brand } from "@/lib/brand";
import "./globals.css";

export const metadata: Metadata = {
  title: `${brand.name} | Brand Deals, Coupon Codes, and Promo Portals`,
  description: brand.tagline,
};

export const viewport: Viewport = {
  themeColor: "#0f1110",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
