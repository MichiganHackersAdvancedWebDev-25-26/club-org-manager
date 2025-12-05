import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { GithubIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";

const footerLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Features",
    href: "/features",
  },
  {
    title: "Discover",
    href: "/org",
  },
  {
    title: "FAQ",
    href: "/faq",
  },
  {
    title: "Dashboard",
    href: "/dashboard",
  },
];

const Footer04Page = () => {
  return (
    <footer className="border-t bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="py-16 flex flex-col sm:flex-row items-start justify-between gap-x-12 gap-y-10 px-6">
          <div className="space-y-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <svg
                width="36"
                height="36"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform group-hover:scale-110"
              >
                <defs>
                  <linearGradient id="footerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#d946ef" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="42" stroke="url(#footerLogoGradient)" strokeWidth="6" fill="none" />
                <circle cx="35" cy="42" r="8" fill="url(#footerLogoGradient)" />
                <circle cx="65" cy="42" r="8" fill="url(#footerLogoGradient)" />
                <circle cx="50" cy="62" r="8" fill="url(#footerLogoGradient)" />
                <path d="M35 50 L50 54 L65 50" stroke="url(#footerLogoGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M42 56 L50 62 L58 56" stroke="url(#footerLogoGradient)" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
              <span className="font-bold text-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                ClubOrg
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              The modern platform for campus club management. Connect, organize, and grow your community.
            </p>
            <ul className="flex items-center gap-6 flex-wrap">
              {footerLinks.map(({ title, href }) => (
                <li key={title}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe Newsletter */}
          <div className="max-w-sm w-full space-y-4">
            <h6 className="font-semibold text-lg">Stay up to date</h6>
            <p className="text-sm text-muted-foreground">
              Get the latest updates on new features and club activities.
            </p>
            <form className="flex items-center gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-background/50 border-border/50 focus:border-indigo-500/50"
              />
              <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white border-0 shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 transition-all">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <Separator className="opacity-50" />
        <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6">
          {/* Copyright */}
          <span className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()}{" "}
            <Link href="/" className="hover:text-foreground transition-colors font-medium">
              ClubOrg
            </Link>
            . All rights reserved.
          </span>

          <div className="flex items-center gap-4">
            <Link 
              href="https://twitter.com" 
              target="_blank" 
              className="p-2 rounded-full bg-muted/50 text-muted-foreground hover:bg-indigo-500/10 hover:text-indigo-500 transition-all"
            >
              <TwitterIcon className="h-4 w-4" />
            </Link>
            <Link 
              href="https://github.com" 
              target="_blank" 
              className="p-2 rounded-full bg-muted/50 text-muted-foreground hover:bg-indigo-500/10 hover:text-indigo-500 transition-all"
            >
              <GithubIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer04Page;
