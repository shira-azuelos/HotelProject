"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="border-t border-border/30 bg-card"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-bold tracking-[0.25em] text-foreground uppercase">
              Aurum
            </h3>
            <p
              className="text-sm leading-relaxed text-muted-foreground"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Where every moment is crafted with intention, and every detail
              speaks of timeless elegance.
            </p>
          </div>
          <div>
            <p
              className="mb-4 text-xs font-semibold tracking-[0.3em] text-primary uppercase"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Contact
            </p>
            <div
              className="flex flex-col gap-2 text-sm text-muted-foreground"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              <span>reservations@aurumhotel.com</span>
              <span>+1 (800) 555-AURUM</span>
              <span>1 Grand Boulevard, Luxury District</span>
            </div>
          </div>
          <div>
            <p
              className="mb-4 text-xs font-semibold tracking-[0.3em] text-primary uppercase"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Hours
            </p>
            <div
              className="flex flex-col gap-2 text-sm text-muted-foreground"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              <span>Front Desk: 24 / 6</span>
              <span>Concierge: 6AM - 12AM</span>
              <span>Dining: 7AM - 11PM</span>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border/30 pt-8 text-center">
          <p
            className="text-xs tracking-[0.2em] text-muted-foreground"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            &copy; {new Date().getFullYear()} Aurum Hotel & Suites. All rights
            reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
