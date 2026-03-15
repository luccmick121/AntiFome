import type { Metadata } from "next";
import { Roboto, Public_Sans } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-public-sans",
});

export const metadata: Metadata = {
  title: "Antifome RS - Sistema de Gestão da Segurança Alimentar",
  description:
    "Sistema de gestão da segurança alimentar no Rio Grande do Sul",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${roboto.variable} ${publicSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
