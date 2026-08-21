import "./globals.css";
import type { Metadata } from "next";
import { Manrope, Fraunces } from "next/font/google";
import Footer from "./components/Footer";
import NavBar from "./components/Navbar";
import { FplProvider } from "./providers/FplProvider";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Turbo FPL",
  description:
    "FPL Turbo is the ultimate Fantasy Premier League tool, featuring AI-powered predicted points, Opta stats for all players, team management with FPL ID and predicted price changes. Optimize your FPL strategy with data-driven insights and make smarter decisions each week",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="B_3g9Ie1OKyPo9ykh2SyuF9XOIVHuP6N4jmkC9NkpUM"
        ></meta>
        <link
          rel="icon"
          type="image/x-icon"
          href="https://turbo-fpl.vercel.app/favicon.ico"
        ></link>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#12191d" />
      </head>
      <body className={`${manrope.variable} ${fraunces.variable}`}>
        <FplProvider>
          <NavBar />
          {children}
          <Footer />
        </FplProvider>
      </body>
    </html>
  );
}
