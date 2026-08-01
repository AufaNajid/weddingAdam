import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aurelia & Rasyid — Wedding Invitation",
  description: "White Floral wedding invitation — Aurelia & Rasyid",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Parisienne&family=Jost:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink font-utility">
        {children}
      </body>
    </html>
  );
}
