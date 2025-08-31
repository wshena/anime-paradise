import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainContainer from "@/components/containers/MainContainer";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anime Paradise - Discover and Watch Your Favourite Anime",
  description: "Embark on an anime adventure with Anime Paradise, your ultimate destination for watching a vast collection of anime series and movies. Delve into the captivating worlds of hit titles such as One Piece, Jujutsu Kaisen, Chainsaw Man, and Attack on Titan. Start your journey today and immerse yourself in the thrilling world of anime with Anime Paradise!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="og:title" content="The World's Largest Dedicated Anime Collection - Anime Paradise" data-rh="true" />
        <meta name="og:site_name" content="Anime Paradise" data-rh="true" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="description" content="Embark on an anime adventure with Anime Paradise, your ultimate destination for watching a vast collection of anime series and movies. Delve into the captivating worlds of hit titles such as One Piece, Jujutsu Kaisen, Chainsaw Man, and Attack on Titan. Start your journey today and immerse yourself in the thrilling world of anime with Anime Paradise!" />

        {/* slick carousel default styling */}
        <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick.css"/>
        <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick-theme.css"/>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MainContainer>
          {children}
        </MainContainer>
        
        <Footer />
        {/* slick carousel */}
        <script type="text/javascript" src="//cdn.jsdelivr.net/gh/kenwheeler/slick@1.8.1/slick/slick.min.js"></script>
      </body>
    </html>
  );
}
