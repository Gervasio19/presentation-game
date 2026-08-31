import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LAPSE — Survive the 2008 Crisis",
  description:
    "A decision-driven educational game about the 2008 Global Financial Crisis. Navigate 6 chapters of crisis decisions. Balance Economy, Trust, Policy, and Banking to survive. Monetary & Financial Theory — Topic 2.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased notranslate`} translate="no" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-zinc-950 text-white font-sans notranslate" translate="no">
        {children}
      </body>
    </html>
  );
}
