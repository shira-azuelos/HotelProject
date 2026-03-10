"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        poster="/images/room-suite.jpg"
      >
        <source
          src="https://videos.pexels.com/video-files/3773486/3773486-uhd_2560_1440_30fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-background/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mb-6 text-xs tracking-[0.6em] text-primary uppercase"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Luxury Redefined
          </motion.p>

          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl text-balance">
            Where Elegance
            <br />
            <span className="text-primary">Meets Serenity</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Discover an unparalleled experience of refined hospitality, curated
            to perfection for the most discerning guests.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/rooms"
              className="group inline-flex items-center gap-3 border border-primary bg-primary px-10 py-4 text-xs font-semibold tracking-[0.25em] text-primary-foreground uppercase transition-all duration-500 hover:bg-transparent hover:text-primary"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Explore Rooms
            </Link>
            <Link
              href="/reservations"
              className="inline-flex items-center gap-3 border border-border px-10 py-4 text-xs font-semibold tracking-[0.25em] text-foreground uppercase transition-all duration-500 hover:border-primary hover:text-primary"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Book a Stay
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span
              className="text-[10px] tracking-[0.4em] text-muted-foreground uppercase"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Scroll to discover
            </span>
            <ChevronDown size={16} className="text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
