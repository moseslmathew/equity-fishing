import type { Metadata } from "next";
import "./globals.css";
import "./workspace-navigation.css";
import "./observatory.css";

export const metadata: Metadata = {
  title: "Smallcap Observatory | Mutual fund holdings",
  description: "Explore monthly mutual fund holdings, changes in share counts and foreign investor ownership.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
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
