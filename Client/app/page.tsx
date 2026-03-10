"use client"

import { useEffect, useState } from "react"
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
  const [user, setUser] = useState<{ name: string } | null>(null)

  useEffect(() => {
    // בדיקה אם המשתמש מחובר כדי להציג לו כפתור אישי או התחברות
    const userName = localStorage.getItem("userName")
    if (userName) {
      setUser({ name: userName })
    }
  }, [])

  return (
    <PageTransition>
      <Navigation />
      <main>
        <HeroSection />
        {!user && (
          <div className="flex justify-center gap-6 pb-12 bg-background">
            <Link 
              href="/login" 
              className="px-8 py-3 bg-primary text-primary-foreground text-xs font-bold tracking-widest uppercase hover:bg-primary/90 transition-all"
            >
              כניסה למערכת
            </Link>
            <Link 
              href="/register" 
              className="px-8 py-3 border border-primary text-primary text-xs font-bold tracking-widest uppercase hover:bg-primary/5 transition-all"
            >
              הרשמה
            </Link>
          </div>
        )}

        <FeaturesSection />

        <section className="border-t border-border/30 bg-card py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-16 text-center"
            >
              <p className="mb-4 text-xs tracking-[0.5em] text-primary uppercase">
                Accommodations
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                The Masterpieces
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              {showcaseRooms.map((room, i) => (
                <motion.div
                  key={room.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                  className="group"
                >
                  <div className="relative mb-6 aspect-[4/5] overflow-hidden bg-muted">
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:opacity-0" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{room.name}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Starting from {room.price} / night
                  </p>
                  <Link
                    href="/rooms"
                    className="text-xs font-bold tracking-widest text-primary uppercase transition-colors hover:text-foreground"
                  >
                    View Details
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="mb-4 text-xs tracking-[0.5em] text-primary uppercase">
                Begin Your Journey
              </p>
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
                Your Extraordinary Stay Awaits
              </h2>
              <Link
                href="/rooms" 
                className="inline-flex items-center border border-primary bg-primary px-12 py-4 text-xs font-semibold tracking-[0.25em] text-primary-foreground uppercase transition-all duration-500 hover:bg-transparent hover:text-primary"
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