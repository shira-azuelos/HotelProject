"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageTransition } from "@/components/page-transition"
import { RoomCard } from "@/components/room-card"
import { motion } from "framer-motion"
import useSWR from "swr"
import type { Room } from "@/lib/api"
import { Loader2 } from "lucide-react"

const API_BASE = "https://localhost:7032/api"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

// Fallback rooms for demonstration when API is unavailable
const fallbackRooms: Room[] = [
  { id: 1, roomNumber: "101", basePrice: 450, status: 0, type: "Deluxe Room" },
  { id: 2, roomNumber: "201", basePrice: 1200, status: 1, type: "Executive Suite" },
  { id: 3, roomNumber: "301", basePrice: 280, status: 0, type: "Standard Room" },
  { id: 4, roomNumber: "PH1", basePrice: 2500, status: 0, type: "Penthouse" },
  { id: 5, roomNumber: "102", basePrice: 450, status: 0, type: "Deluxe Room" },
  { id: 6, roomNumber: "202", basePrice: 1200, status: 1, type: "Executive Suite" },
]

export default function RoomsPage() {
  const { data: rooms, error, isLoading } = useSWR<Room[]>(
    `${API_BASE}/Rooms`,
    fetcher,
    {
      fallbackData: fallbackRooms,
      onError: () => {
        // Silently fall back to demo data
      },
    }
  )

  const displayRooms = rooms || fallbackRooms

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
                Accommodations
              </p>
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                Our Rooms & Suites
              </h1>
              <p
                className="max-w-xl text-base leading-relaxed text-muted-foreground"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Each room is a sanctuary of refined elegance, designed to
                provide the ultimate in comfort and luxury.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Status Filter Bar */}
        <section className="border-y border-border/30 bg-card">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
            <p
              className="text-xs tracking-[0.2em] text-muted-foreground uppercase"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {displayRooms.length} rooms available
            </p>
            {isLoading && (
              <div className="flex items-center gap-2 text-primary">
                <Loader2 size={14} className="animate-spin" />
                <span
                  className="text-xs tracking-[0.2em] uppercase"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Loading
                </span>
              </div>
            )}
            {error && (
              <span
                className="text-xs tracking-[0.2em] text-muted-foreground uppercase"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Showing preview data
              </span>
            )}
          </div>
        </section>

        {/* Rooms Grid */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {displayRooms.map((room, index) => (
                <RoomCard key={room.id} room={room} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  )
}
