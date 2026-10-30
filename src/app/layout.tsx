import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Landing Page Grader | Audience-Aware Teardowns & Conversion Calibration",
  description:
    "Paste any URL to get a comprehensive, deterministic scored teardown. Features audience detection, Google PageSpeed analysis, and empirical calibration against real conversion data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
