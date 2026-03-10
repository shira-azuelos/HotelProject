"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageTransition } from "@/components/page-transition"
import { BookingForm } from "@/components/booking-form"
import { motion } from "framer-motion"
import Image from "next/image"

export default function ReservationsPage() {
  return (
    <PageTransition>
      <Navigation />
      <main className="min-h-screen pt-24">
        {/* Page Header */}
        <section className="pb-16 pt-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p
                className="mb-4 text-xs tracking-[0.5em] text-primary uppercase"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Reserve Your Stay
              </p>
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                Make a Reservation
              </h1>
              <p
                className="max-w-xl text-base leading-relaxed text-muted-foreground"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Complete the form below to secure your extraordinary stay at
                Aurum Hotel & Suites.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Form Section */}
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <BookingForm />
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative hidden overflow-hidden lg:block"
              >
                <Image
                  src="/images/room-suite.jpg"
                  alt="Luxury hotel suite"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="border border-border/40 bg-background/80 p-6 backdrop-blur-sm">
                    <p
                      className="mb-2 text-xs tracking-[0.3em] text-primary uppercase"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      Complimentary
                    </p>
                    <p className="text-lg font-bold text-foreground">
                      Welcome Amenities
                    </p>
                    <p
                      className="mt-2 text-sm text-muted-foreground"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      Every reservation includes champagne, artisan chocolates,
                      and personalized concierge service upon arrival.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  )
}
