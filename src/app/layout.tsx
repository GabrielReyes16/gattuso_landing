import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Gattuso Chicken 2 | Pollo a la Brasa en Lima, Perú",
  description:
    "El mejor pollo a la brasa de Lima. Doradito por fuera, jugoso por dentro. Delivery en 20 minutos. ¡Pide ya por WhatsApp!",
  keywords: [
    "pollo a la brasa",
    "pollería",
    "la victoria",
    "pollo a la brasa en la victoria",
    "delivery",
    "polleria la victoria",
    "pollo broaster",
  ],
  icons: {
    icon: "/iconopolleria.ico",
    shortcut: "/iconopolleria.ico",
    apple: "/iconopolleria.ico",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  openGraph: {
    title: "Gattuso Chicken 2 | Pollo a la Brasa",
    description:
      "El mejor pollo a la brasa de Lima. Doradito por fuera, jugoso por dentro.",
    type: "website",
    locale: "es_PE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${outfit.variable} antialiased`}>{children}</body>
    </html>
  );
}
