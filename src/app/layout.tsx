

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext"; // Импортируем наш новый провайдер
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://helpmame.ru'),
  title: "HelpMame - Помощь мамам",
  description: "Онлайн и оффлайн помощь для мам",
  icons: {
    icon: '/logo.jpg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider> 
            <Navbar />
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>
        <Analytics />
        </body>
    </html>
  );
}
