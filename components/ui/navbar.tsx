"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { signout } from "@/app/dashboard/actions";
import { ThemeToggle } from "@/components/theme-toggle";
const Logo = (props: React.SVGAttributes<SVGElement>) => {
  return (
    <svg
      width="1.2em"
      height="1.2em"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>
      </defs>
      {/* Main circle representing community */}
      <circle cx="50" cy="50" r="42" stroke="url(#logoGradient)" strokeWidth="6" fill="none" />
      {/* Inner connected people symbols */}
      <circle cx="35" cy="42" r="8" fill="url(#logoGradient)" />
      <circle cx="65" cy="42" r="8" fill="url(#logoGradient)" />
      <circle cx="50" cy="62" r="8" fill="url(#logoGradient)" />
      {/* Connection lines */}
      <path d="M35 50 L50 54 L65 50" stroke="url(#logoGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M42 56 L50 62 L58 56" stroke="url(#logoGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
};
const HamburgerIcon = ({
  className,
  ...props
}: React.SVGAttributes<SVGElement>) => (
  <svg
    className={cn("pointer-events-none", className)}
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 12L20 12"
      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
    />
    <path
      d="M4 12H20"
      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
    />
    <path
      d="M4 12H20"
      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
    />
  </svg>
);
export interface Navbar01NavLink {
  href: string;
  label: string;
  active?: boolean;
}
export interface Navbar01Props extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  logoHref?: string;
  navigationLinks?: Navbar01NavLink[];
  signInText?: string;
  signInHref?: string;
  ctaText?: string;
  ctaHref?: string;
  onSignInClick?: () => void;
  onCtaClick?: () => void;
}
const defaultNavigationLinks: Navbar01NavLink[] = [
  { href: "/", label: "Home", active: true },
  { href: "/faq", label: "FAQ" },
  { href: "/features", label: "Features" },
  { href: "/org", label: "Discover" },
];
export const Navbar = React.forwardRef<HTMLElement, Navbar01Props>(
  (
    {
      className,
      logo = <Logo />,
      logoHref = "/",
      navigationLinks = defaultNavigationLinks,
      signInText = "Sign In",
      signInHref = "#signin",
      ctaText = "Get Started",
      ctaHref = "#get-started",
      onSignInClick,
      onCtaClick,
      ...props
    },
    ref
  ) => {
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const containerRef = useRef<HTMLElement>(null);
    useEffect(() => {
      setMounted(true);
      const supabase = createClient();

      const checkAuth = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setIsLoggedIn(!!user);
      };

      checkAuth();

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setIsLoggedIn(!!session?.user);
      });

      const checkWidth = () => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          setIsMobile(width < 768);
        }
      };
      checkWidth();
      const resizeObserver = new ResizeObserver(checkWidth);
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }
      return () => {
        resizeObserver.disconnect();
        subscription.unsubscribe();
      };
    }, []);
    const combinedRef = React.useCallback(
      (node: HTMLElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );
    return (
      <header
        ref={combinedRef}
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 [&_*]:no-underline",
          className
        )}
        {...props}
      >
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {isMobile && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                    variant="ghost"
                    size="icon"
                  >
                    <HamburgerIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-48 p-2">
                  <NavigationMenu className="max-w-none">
                    <NavigationMenuList className="flex-col items-start gap-1">
                      {navigationLinks.map((link, index) => (
                        <NavigationMenuItem key={index} className="w-full">
                          <Link
                            href={link.href}
                            className={cn(
                              "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer no-underline",
                              link.active
                                ? "bg-accent text-accent-foreground"
                                : "text-foreground/80"
                            )}
                          >
                            {link.label}
                          </Link>
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                </PopoverContent>
              </Popover>
            )}
            <div className="flex items-center gap-6">
              <Link
                href={logoHref}
                className="flex items-center space-x-2 hover:opacity-90 transition-opacity cursor-pointer"
              >
                <div className="text-3xl">{logo}</div>
                <span className="hidden font-bold text-xl sm:inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                  ClubOrg
                </span>
              </Link>
              {!isMobile && (
                <NavigationMenu className="flex">
                  <NavigationMenuList className="gap-1">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index}>
                        <Link
                          href={link.href}
                          className={cn(
                            "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer no-underline",
                            link.active
                              ? "bg-accent text-accent-foreground"
                              : "text-foreground/80 hover:text-foreground"
                          )}
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {mounted && (
              <>
                {isLoggedIn ? (
                  <form action={signout}>
                    <Button
                      type="submit"
                      variant="ghost"
                      size="sm"
                      className="text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      Sign Out
                    </Button>
                  </form>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    asChild
                  >
                    <Link href="/login">{signInText}</Link>
                  </Button>
                )}
                <Button
                  size="sm"
                  className="text-sm font-medium px-4 h-9 rounded-md shadow-sm"
                  asChild
                >
                  <Link href={isLoggedIn ? "/dashboard" : "/login"}>
                    {ctaText}
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>
    );
  }
);
Navbar.displayName = "Navbar01";
export { Logo, HamburgerIcon };
