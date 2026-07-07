"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import { Text } from "..";
import clsx from "clsx";
import { usePathname } from "next/navigation";
const menus = [
  {
    name: "Trending",
    href: "/",
    category: "",
  },
  {
    name: "Rhymes",
    href: "/rhymes",
    category: "rhymes",
  },
  {
    name: "Stories",
    href: "/stories",
    category: "stories",
  },
  {
    name: "Cartoons",
    href: "/cartoon",
    category: "cartoon",
  },
  {
    name: "Animations",
    href: "/animation",
    category: "animation",
  },
  {
    name: "Birds",
    href: "/birds",
    category: "birds",
  },
  {
    name: "Bedtime",
    href: "/bedtime",
    category: "bedtime",
  },
  {
    name: "Moral",
    href: "/moral",
    category: "moral",
  },
   {
    name: "Analytics",
    href: "/analytics",
    category: "analytics",
  },
];
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-100 bg-[#ffffff] transition-all duration-300 ",
        scrolled && "shadow-lg border-b border-primary"
      )}
    >
      <div className="mx-auto max-w-7xl py-3 px-4 sm:px-6 lg:px-20">
        <div className="flex  items-center gap-20 justify-start">
          {/* Logo */}

          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <Sparkles size={20} className="text-white" />
            </div>

            <div>
              <Text
                as="h2"
                variant="h5"
                className="leading-none text-primary"
              >
                TollyKids
              </Text>

              <Text
                as="p"
                variant="label"
                className="mt-1 text-[8px] uppercase tracking-[3px] text-muted"
              >
                Trending Tracker
              </Text>
            </div>
          </Link>

          {/* Desktop Menu */}

          <nav className="hidden lg:flex items-center gap-4">
            {menus.map((menu) => (
              <Link
                key={menu.name}
                href={menu.href}
                className={clsx(
                  "text-sm font-medium transition-colors duration-300",
                  pathname === menu.href
                    ? "text-primary"
                    : "text-heading hover:text-primary"
                )}
              >
                {menu.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Button */}

          <button
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center  lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}

      <div
        className={clsx(
          "overflow-hidden transition-all duration-300 lg:hidden",
          open ? "max-h-[500px]" : "max-h-0"
        )}
      >
        <div
          ref={menuRef}
          className="border-t border-border bg-white  shadow-lg"
        >
          <nav className="flex flex-col gap-1">
            {menus.map((menu, index) => (
              <Link
                key={menu.name}
                href={menu.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "border-b px-4 py-2 text-xs font-medium transition",
                  index === 0
                    ? "text-primary"
                    : "text-heading hover:bg-card hover:text-primary"
                )}
              >
                {menu.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}