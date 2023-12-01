import Navbar from "../../components/section/Navbar";
import "./globals.css";
import { Cabin, Cormorant, Inter, Lato, Sora } from "next/font/google";
import Footer from "../../components/section/Footer";
import { CartContextProvider } from "../providers/CartContext";
import { fetchCategories, fetchLogo } from "./data";
import { ClerkProvider } from "@clerk/nextjs";

export const lato = Lato({
  subsets: ["latin"],
  weight: "900",
});

export const cabin = Cabin({
  subsets: ["latin"],
  weight: "400",
});

export const sora = Sora({
  subsets: ["latin"],
  weight: "700",
});

export const sora_light = Sora({
  subsets: ["latin"],
  weight: "400",
});

export const sora_l = Sora({
  subsets: ["latin"],
  weight: "300",
});

export const sora_d = Sora({
  subsets: ["latin"],
  weight: "600",
});

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
//   viewport: {
//     content: "width=device-width",
//     initialScale: 1.0,
//   },
// };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await fetchCategories();
  const { logo }: any = await fetchLogo();
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className="my-[2rem] space-y-[5rem]"
          suppressHydrationWarning={true}
        >
          <CartContextProvider>
            <Navbar navLinks={categories} logo={logo} key={logo.asset.url} />
            {children}
            <Footer />
          </CartContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
