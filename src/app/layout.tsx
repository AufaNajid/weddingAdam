import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const display = localFont({ src: [{ path: "./fonts/cormorant-regular.ttf", weight: "400" }, { path: "./fonts/cormorant-medium.ttf", weight: "500" }], variable: "--font-cormorant", display: "swap" });
const utility = localFont({ src: [{ path: "./fonts/jost-regular.ttf", weight: "400" }, { path: "./fonts/jost-medium.ttf", weight: "500" }], variable: "--font-jost", display: "swap" });
const script = localFont({ src: "./fonts/parisienne.ttf", variable: "--font-parisienne", display: "swap" });

export const metadata: Metadata = {
  title: "Adam & Salma — A Lifetime of Us",
  description: "Dengan penuh cinta, kami mengundang Anda merayakan pernikahan Adam dan Salma. 29 November 2026, Kudus, Jawa Tengah.",
  openGraph: { title: "The Wedding of Adam & Salma", description: "29 November 2026 · Kudus, Jawa Tengah. A little story, a lifetime of us.", locale: "id_ID", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id" className={`${display.variable} ${utility.variable} ${script.variable}`}><body>{children}</body></html>;
}
