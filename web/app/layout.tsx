import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Equinor Brandwalls",
  description: "Application to showcase on brandwalls",
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
