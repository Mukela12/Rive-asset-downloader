import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rive Asset Exporter",
  description:
    "Extract images, fonts, and audio from your Rive files instantly. Free and open-source.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
