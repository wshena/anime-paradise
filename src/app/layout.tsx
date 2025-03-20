import "./globals.css";
import 'nprogress/nprogress.css'
import type { Metadata } from "next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Geist, Geist_Mono } from "next/font/google";
import AppProvider from "@/components/provider/AppProvider";
import ProgressBar from "@/components/ProgressBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anime Paradise: Watch Popular Anime, Play Games & Shop Online",
  description: "Embark on an anime adventure with Anime Paradise, your ultimate destination for watching a vast collection of anime series and movies. Delve into the captivating worlds of hit titles such as One Piece, Jujutsu Kaisen, Chainsaw Man, and Attack on Titan. Start your free trial today and immerse yourself in the thrilling world of anime with Anime Paradise!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="og:title" content="The World's Largest Dedicated Anime Collection - Anime Paradise" data-rh="true" />
        <meta name="og:site_name" content="Anime Paradise" data-rh="true" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="og:description" content="Embark on an anime adventure with Anime Paradise, your ultimate destination for watching a vast collection of anime series and movies. Delve into the captivating worlds of hit titles such as One Piece, Jujutsu Kaisen, Chainsaw Man, and Attack on Titan. Start your free trial today and immerse yourself in the thrilling world of anime with Anime Paradise!" data-rh="true" />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProgressBar />
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
