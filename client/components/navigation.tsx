"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, UserPlus, User, LogOut } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/bookings", label: "Bookings" },
  { href: "/reservations", label: "Reservations" },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("userName");
    setUserName(stored);
    setAuthReady(true);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userTZ");
    window.location.href = "/";
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 backdrop-blur-2xl bg-background/60"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="hidden md:flex items-center gap-3 min-w-[240px]">
          <AnimatePresence mode="wait">
            {authReady && (userName ? (
              <motion.div key="logged-in" className="flex items-center gap-3">
                <Link 
                  href="/profile" 
                  className="flex items-center gap-2.5 px-4 py-2 border border-border/40 bg-card/50 rounded-sm hover:border-primary/50 transition-colors group"
                >
                  <User size={14} className="text-primary group-hover:scale-110 transition-transform" />
                  <span className="text-xs tracking-[0.15em] text-foreground/90 uppercase font-bold">
                    Hello, {userName}
                  </span>
                </Link>
                <button onClick={handleLogout} className="group flex items-center gap-1.5 px-3 py-2 text-muted-foreground hover:text-destructive transition-colors">
                  <LogOut size={13} />
                  <span className="text-[10px] tracking-[0.2em] uppercase">Logout</span>
                </button>
              </motion.div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link href="/login" className="px-4 py-2 border border-border/50 text-[10px] tracking-[0.2em] uppercase rounded-sm">Login</Link>
                <Link href="/register" className="px-4 py-2 bg-primary text-primary-foreground text-[10px] tracking-[0.2em] uppercase rounded-sm">Register</Link>
              </div>
            ))}
          </AnimatePresence>
        </div>
        <nav className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="group relative">
              <span className={`text-xs font-medium tracking-[0.25em] uppercase ${pathname === link.href ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                {link.label}
              </span>
              {pathname === link.href && <motion.div layoutId="navIndicator" className="absolute -bottom-1 left-0 right-0 h-px bg-primary" />}
            </Link>
          ))}
        </nav>
        <Link href="/" className="flex items-center gap-3">
          <div className="text-right">
            <h1 className="text-lg font-bold tracking-[0.3em] uppercase">Aurum</h1>
            <p className="text-[10px] tracking-[0.5em] text-muted-foreground uppercase">Hotel & Suites</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center border border-primary/40">
            <span className="text-primary text-lg font-bold">A</span>
          </div>
        </Link>
        <div className="flex items-center gap-3 md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X size={24} /> : <Menu size={24} />}</button>
        </div>
      </div>
    </motion.header>
  );
}