import { UserContextProvider } from '@/data/globalContext';
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Awesome Dashboard",
  description: "Example dashboard in Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserContextProvider>
          {children}
        </UserContextProvider>
      </body>
    </html>
  );
}
