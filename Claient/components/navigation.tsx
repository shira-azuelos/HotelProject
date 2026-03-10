"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const links = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/bookings", label: "Bookings" },
  { href: "/reservations", label: "Reservations" },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 backdrop-blur-xl bg-background/80"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center border border-primary/40">
            <span className="text-primary text-lg font-bold tracking-widest">A</span>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-[0.3em] text-foreground uppercase">
              Aurum
            </h1>
            <p className="text-[10px] tracking-[0.5em] text-muted-foreground uppercase">
              Hotel & Suites
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-10 md:flex" role="navigation" aria-label="Main navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative"
            >
              <span
                className={`text-xs font-medium tracking-[0.25em] uppercase transition-colors duration-300 ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {link.label}
              </span>
              {pathname === link.href && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border/30 md:hidden"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-3 text-sm tracking-[0.2em] uppercase transition-colors ${
                      pathname === link.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
