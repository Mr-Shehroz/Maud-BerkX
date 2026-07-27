import type { Metadata } from "next";
import { EB_Garamond, Hanken_Grotesk, Great_Vibes } from 'next/font/google';
import "./globals.css";

const ebGaramond = EB_Garamond({ 
  subsets: ['latin'], 
  variable: '--font-eb-garamond',
  weight: ['400', '500', '600', '700', '800']
});

const hankenGrotesk = Hanken_Grotesk({ 
  subsets: ['latin'], 
  variable: '--font-hanken',
  weight: ['300', '400', '500', '600', '700']
});

const greatVibes = Great_Vibes({ 
  subsets: ['latin'], 
  variable: '--font-signature',
  weight: ['400']
});

export const metadata: Metadata = {
  title: "Maud Berkx | Kingdom Legacy Leadership",
  description: "Helping women build a Kingdom legacy through faith, wisdom and leadership.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ebGaramond.variable} ${hankenGrotesk.variable} ${greatVibes.variable}`}>
      <body 
        style={{ fontFamily: 'var(--font-hanken), sans-serif' }}
        className="bg-[#F9F8F6] text-[#2D241E] antialiased min-h-screen"
      >
        {children}
      </body>
    </html>
  );
}