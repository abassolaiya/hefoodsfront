import "./globals.css";
import Header from "../components/Header";
import SelectionBar from "../components/SelectionBar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HeyFood Africa",
  description: "Replicating the HeyFood Africa stores page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Header />
        <SelectionBar/> */}
        {children}
      </body>
    </html>
  );
}
