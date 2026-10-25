import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HypnoMophosis",
  description: "HypnoMophosis",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
