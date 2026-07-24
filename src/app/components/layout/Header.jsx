"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import { Text } from "..";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const menus = [
  { name: "Trending", href: "/", category: "" },
  { name: "Moral", href: "/moral", category: "moral" },
  { name: "Rhymes", href: "/rhymes", category: "rhymes" },
  { name: "Animals", href: "/animals", category: "animals" },
  { name: "Cartoons", href: "/cartoon", category: "cartoon" },
  { name: "Birds", href: "/birds", category: "birds" },
  { name: "Bedtime", href: "/bedtime", category: "bedtime" },
 
  { name: "Analytics", href: "/analytics", category: "analytics" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  // Monitor scrolling to append shadow header depth
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drop down navigation drawer when clicking outside bounds
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 bg-[#ffffff] transition-all duration-300",
        scrolled && "shadow-lg border-b border-primary"
      )}
    >
      <div className="mx-auto max-w-7xl py-3 px-4 sm:px-6 lg:px-20">
        {/* Layout container: justify-between on mobile, justify-start on desktop */}
        <div className="flex items-center justify-between lg:justify-start lg:gap-20">

          {/* Brand Logo Identity */}
  <Link href="/" className="flex items-center gap-3 group">
  {/* Icon Container */}
  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary transition-transform group-hover:scale-105">
    <Sparkles size={20} className="text-white" />
  </div>

  {/* Text Container centered using inline flex alignment */}
  <div className="flex items-center">
    <Text
      as="h2"
      variant="h4"
      className="m-3 p-0 text-base font-bold text-primary normal-case capitalize leading-none"
    >
      Trending Tracker
    </Text>
  </div>
</Link>

          {/* Desktop Menu Wrapper */}
          <nav className="hidden lg:flex items-center gap-6">
            {menus.map((menu) => (
              <Link
                key={menu.name}
                href={menu.href}
                className={clsx(
                  "text-sm font-medium transition-colors duration-300",
                  pathname === menu.href
                    ? "text-primary font-semibold"
                    : "text-heading hover:text-primary"
                )}
              >
                {menu.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Action Controls */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-gray-100 bg-slate-50 transition hover:bg-slate-100 lg:hidden"
            aria-label="Toggle Menu"
          >
            {open ? <X size={20} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Layout */}
      <div
        ref={menuRef}
        className={clsx(
          "overflow-hidden transition-all duration-300 lg:hidden border-border bg-white shadow-xl",
          open ? "max-h-[500px] border-t" : "max-h-0"
        )}
      >
        <nav className="flex flex-col p-2 gap-1">
          {menus.map((menu) => (
            <Link
              key={menu.name}
              href={menu.href}
              onClick={() => setOpen(false)}
              className={clsx(
                "rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                pathname === menu.href
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-heading hover:bg-slate-50 hover:text-primary"
              )}
            >
              {menu.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}