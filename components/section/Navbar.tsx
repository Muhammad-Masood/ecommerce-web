"use client";
import Image from "next/image";
import { Menu, Search, ShoppingCart, XSquare } from "lucide-react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./../ui/navigation-menu";
import { Category, PImage, Product } from "@/app/utils/types";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../src/providers/CartContext";
import { fetchCategories } from "@/app/data";
import { Sora } from "next/font/google";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "components/ui/button";
import { useRouter } from "next/navigation";
import { sora, sora_l, sora_light } from "@/app/()/layout";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import axios from "axios";

const Navbar = ({
  navLinks,
  logo,
}: {
  navLinks: Category[];
  logo: PImage;
}) => {
  // const { cartItems } = useContext(CartContext);
  const router = useRouter();
  const [state, dispatch] = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();

  return (
    <div
      className={`flex justify-between items-center ${sora_l.className} space-x-4 main`}
    >
      <Link href="/">
        <Image
          src={logo.asset.url}
          className="w-auto h-auto"
          alt="logo"
          width={140}
          height={140}
        />
      </Link>

      <div className="hidden lg:block pt-1">
        <NavigationMenu>
          <NavigationMenuList className="space-x-14">
            <NavigationMenuItem className="text-[16px]">
              <Link href={`/shop`}>Shop</Link>
            </NavigationMenuItem>

            {navLinks != null
              ? navLinks
                  .slice(0, 4)
                  .map((category: Category, index: number) => (
                    <NavigationMenuItem className=" text-[18px]" key={index}>
                      <Link href={`/shop/${category.name}`}>
                        {category.name}
                      </Link>
                    </NavigationMenuItem>
                  ))
              : null}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="hidden lg:block">
        <div className="flex border border-black-600 rounded-lg items-center  gap-x-6">
          <Search className="bg-white rounded-l h-4 pl-2" />
          <input
            type="text"
            placeholder="What you are looking for"
            className="rounded-r p-1 w-72 focus:outline-none"
          />
        </div>
      </div>
      <div className="p-2 rounded-full bg-gray-200 hover:scale-110 transition duration-300  hidden lg:block relative">
        <Link href="/cart">
          <ShoppingCart />
          <span className="absolute top-[-10px] right-0 h-6 w-6 text-center rounded-full bg-[#f02d34] text-white">
            {state.cartItems}
          </span>
        </Link>
      </div>

      {isSignedIn && isLoaded ? (
        <UserButton afterSignOutUrl="/" afterSwitchSessionUrl="/" />
      ) : (
        <SignInButton mode="modal" afterSignUpUrl="/" afterSignInUrl="/">
          <Button className="bg-blue-600 hover:bg-blue-700 duration-200 rounded-full">
            LogIn
          </Button>
        </SignInButton>
      )}

      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent className="w-[300px]">
            <SheetHeader className="gap-y-1">
              {navLinks != null
                ? navLinks.slice(0, 6).map((category: Category, index) => (
                    <SheetTitle
                      className=" text-lg"
                      key={index}
                      onClick={() => setOpen(false)}
                    >
                      <Link href={`/shop/${category.name}`}>
                        {category.name}
                      </Link>
                    </SheetTitle>
                  ))
                : null}
              <SheetTitle>
                <Button
                  className={`w-full gap-x-2 ${sora.className} tracking-wider`}
                  onClick={() => {
                    router.push("/cart");
                    setOpen(false)
                  }}
                >
                  Cart{" "}
                  <span className="right-0 h-6 w-6 rounded-full bg-black text-white flex items-center justify-center">
                    {state.cartItems}
                  </span>{" "}
                </Button>
              </SheetTitle>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;
