import "./globals.css";
import { Inter } from "next/font/google";
import { SearchProvider } from "../context/SearchContext";
import { CategorySearchProvider } from "../context/CategorySearchContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HeyFood Africa",
  description: "Your food search app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CategorySearchProvider>
          <SearchProvider>{children}</SearchProvider>
        </CategorySearchProvider>
      </body>
    </html>
  );
}
