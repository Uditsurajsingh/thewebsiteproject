import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PixelLease | Rent Pixels for Ads",
  description:
    "A beautiful, static-first marketplace where brands rent pixels on a public advertising board.",
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
