"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/page-transition";
import { motion } from "framer-motion";
import useSWR from "swr";
import type { Booking } from "@/lib/api";
import { format } from "date-fns";
import { CalendarDays, DollarSign, Loader2, ArrowRight } from "lucide-react";

const API_BASE = "https://localhost:7032/api";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const fallbackBookings: Booking[] = [
  {
    id: 1,
    userId: 1,
    roomId: 1,
    roomNumber: "101",
    guestName: "James Whitmore",
    checkInDate: "2026-03-01T14:00:00",
    checkOutDate: "2026-03-05T11:00:00",
    finalPrice: 1800,
    status: 1,
  },
  {
    id: 2,
    userId: 2,
    roomId: 2,
    roomNumber: "201",
    guestName: "Eleanor Vance",
    checkInDate: "2026-03-10T14:00:00",
    checkOutDate: "2026-03-14T11:00:00",
    finalPrice: 4800,
    status: 1,
  },
  {
    id: 3,
    userId: 3,
    roomId: 4,
    roomNumber: "PH1",
    guestName: "Alexander Sterling",
    checkInDate: "2026-03-15T14:00:00",
    checkOutDate: "2026-03-20T11:00:00",
    finalPrice: 12500,
    status: 0,
  },
];

function formatDate(dateStr: string) {
  try {
    return format(new Date(dateStr), "MMM dd, yyyy");
  } catch {
    return dateStr;
  }
}

export default function BookingsPage() {
  const {
    data: bookings,
    error,
    isLoading,
  } = useSWR<Booking[]>(`${API_BASE}/Bookings`, fetcher, {
    fallbackData: fallbackBookings,
    onError: () => {},
  });

  const displayBookings = bookings || fallbackBookings;

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
                Management
              </p>
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                Guest Bookings
              </h1>
              <p
                className="max-w-xl text-base leading-relaxed text-muted-foreground"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                View and manage all current and upcoming guest reservations with
                complete details.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Status Bar */}
        <section className="border-y border-border/30 bg-card">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
            <p
              className="text-xs tracking-[0.2em] text-muted-foreground uppercase"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {displayBookings.length} bookings
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

        {/* Bookings List */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col gap-6">
              {displayBookings.map((booking, i) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group border border-border/40 bg-card p-6 transition-all duration-500 hover:border-primary/40 md:p-8"
                >
                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    {/* Booking Info */}
                    <div className="flex-1">
                      <div className="mb-3 flex items-center gap-4">
                        <p
                          className="text-[10px] tracking-[0.3em] text-primary uppercase"
                          style={{
                            fontFamily: "var(--font-inter), sans-serif",
                          }}
                        >
                          Booking #{booking.id}
                        </p>
                        {booking.roomNumber && (
                          <p
                            className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase"
                            style={{
                              fontFamily: "var(--font-inter), sans-serif",
                            }}
                          >
                            Room {booking.roomNumber}
                          </p>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-foreground">
                        {booking.guestName || "Guest"}
                      </h3>
                    </div>

                    {/* Dates */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 border border-border/30 bg-secondary px-4 py-3">
                        <CalendarDays size={14} className="text-primary" />
                        <div>
                          <p
                            className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase"
                            style={{
                              fontFamily: "var(--font-inter), sans-serif",
                            }}
                          >
                            Check-in
                          </p>
                          <p
                            className="text-sm font-medium text-foreground"
                            style={{
                              fontFamily: "var(--font-inter), sans-serif",
                            }}
                          >
                            {formatDate(booking.checkInDate)}
                          </p>
                        </div>
                      </div>

                      <ArrowRight size={14} className="text-muted-foreground" />

                      <div className="flex items-center gap-2 border border-border/30 bg-secondary px-4 py-3">
                        <CalendarDays size={14} className="text-primary" />
                        <div>
                          <p
                            className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase"
                            style={{
                              fontFamily: "var(--font-inter), sans-serif",
                            }}
                          >
                            Check-out
                          </p>
                          <p
                            className="text-sm font-medium text-foreground"
                            style={{
                              fontFamily: "var(--font-inter), sans-serif",
                            }}
                          >
                            {formatDate(booking.checkOutDate)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 border-l border-border/30 pl-6">
                      <DollarSign size={16} className="text-primary" />
                      <div>
                        <p className="text-2xl font-bold text-primary">
                          {booking.finalPrice.toLocaleString()}
                        </p>
                        <p
                          className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase"
                          style={{
                            fontFamily: "var(--font-inter), sans-serif",
                          }}
                        >
                          Total
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
}
