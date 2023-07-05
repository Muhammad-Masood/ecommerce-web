"use client";
import Navbar from "../../components/section/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "../../components/section/Footer";
import { CartContext } from "../../components/section/CartContext";
import { useState } from "react";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import Menu from "components/section/Menu";
import Image from "next/image";
import { MenuProps } from "components/section/Menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  viewport: {
    content: "width=device-width",
    initialScale: 1.0,
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hide, setHide] = useState(false);
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins&family=Roboto+Condensed&display=swap" rel="stylesheet">
        </link>
      </head>
      <body className={inter.className}>
        {hide ? (
          <Menu setHide={setHide} children={children} />
        ) : (
          <CartContext>
            <div className=" sm:hidden">
              <div className="flex  gap-4">
                <Link href=""><Image src={"/Logo.webp"} alt="website logo" width={200} height={250} /></Link>
                <MenuIcon onClick={() => setHide(true)} />
              </div>
            </div>
            <Navbar />
              {children}
              <Footer />
          </CartContext>
        )}
      </body>
    </html>
  );
}
