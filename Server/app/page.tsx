"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { Footer } from "@/components/footer"
import { PageTransition } from "@/components/page-transition"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const showcaseRooms = [
  {
    name: "The Grand Deluxe",
    image: "/images/room-deluxe.jpg",
    price: "$450",
  },
  {
    name: "Presidential Suite",
    image: "/images/room-suite.jpg",
    price: "$1,200",
  },
  {
    name: "The Penthouse",
    image: "/images/room-penthouse.jpg",
    price: "$2,500",
  },
]

export default function Home() {
  return (
    <PageTransition>
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />

        {/* Room Showcase */}
        <section className="border-t border-border/30 bg-card py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
            >
              <div>
                <p
                  className="mb-4 text-xs tracking-[0.5em] text-primary uppercase"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Our Accommodations
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                  Signature Rooms
                </h2>
              </div>
              <Link
                href="/rooms"
                className="inline-flex items-center border border-primary px-8 py-3 text-xs font-semibold tracking-[0.2em] text-primary uppercase transition-all duration-500 hover:bg-primary hover:text-primary-foreground"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                View All Rooms
              </Link>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {showcaseRooms.map((room, i) => (
                <motion.div
                  key={room.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative overflow-hidden border border-border/30"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-2xl font-bold text-foreground">
                        {room.name}
                      </p>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-xl font-bold text-primary">
                          {room.price}
                        </span>
                        <span
                          className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase"
                          style={{ fontFamily: "var(--font-inter), sans-serif" }}
                        >
                          / night
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative border-t border-border/30 bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p
                className="mb-4 text-xs tracking-[0.5em] text-primary uppercase"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Begin Your Journey
              </p>
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
                Your Extraordinary Stay Awaits
              </h2>
              <p
                className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-muted-foreground"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Reserve your place among the privileged few who call Aurum their
                home away from home.
              </p>
              <Link
                href="/reservations"
                className="inline-flex items-center border border-primary bg-primary px-12 py-4 text-xs font-semibold tracking-[0.25em] text-primary-foreground uppercase transition-all duration-500 hover:bg-transparent hover:text-primary"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Make a Reservation
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  )
}
