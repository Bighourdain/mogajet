import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MogaJet — Private Aviation, Personalized",
  description: "Private jet charter search and quote requests."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}