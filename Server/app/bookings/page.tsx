"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/page-transition";
import { motion, AnimatePresence } from "framer-motion";
import useSWR, { mutate } from "swr";
import { format } from "date-fns";
import {
  CalendarDays,
  DollarSign,
  Loader2,
  ArrowRight,
  Trash2,
  Inbox,
} from "lucide-react";

const API_BASE = "https://localhost:7032/api";

const fetcher = (url: string) => {
  const token = localStorage.getItem("token");
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  });
};

function formatDate(dateStr: string) {
  try {
    return format(new Date(dateStr), "MMM dd, yyyy");
  } catch {
    return dateStr;
  }
}

export default function BookingsPage() {
  const [isCleaning, setIsCleaning] = useState(false);
  const userRole =
    typeof window !== "undefined" ? localStorage.getItem("userRole") : null;

  const {
    data: bookings,
    error,
    isLoading,
  } = useSWR(`${API_BASE}/Bookings`, fetcher);
  async function handleCleanup() {
    if (!confirm("Are you sure you want to delete all expired bookings?"))
      return;

    setIsCleaning(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/Bookings/cleanup-expired`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        alert("Expired bookings cleared successfully");
        mutate(`${API_BASE}/Bookings`);
      }
    } catch (err) {
      alert("Failed to clear bookings");
    } finally {
      setIsCleaning(false);
    }
  }

  return (
    <PageTransition>
      <Navigation />
      <main className="min-h-screen pt-24 bg-background">
        <section className="pb-12 pt-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <p className="mb-4 text-xs tracking-[0.5em] text-primary uppercase">
                  Hotel Management
                </p>
                <h1 className="text-4xl font-serif tracking-tight text-foreground md:text-6xl uppercase">
                  Guest Bookings
                </h1>
              </motion.div>
              <motion.button
                onClick={handleCleanup}
                disabled={isCleaning}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 border border-primary/40 px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-50"
              >
                {isCleaning ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Trash2 size={14} />
                )}
                Clear Expired Bookings
              </motion.button>
            </div>
          </div>
        </section>
        <section className="border-y border-border/30 bg-card/50">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
            <p className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
              {bookings?.length || 0} active records found
            </p>
            {isLoading && (
              <Loader2 size={14} className="animate-spin text-primary" />
            )}
          </div>
        </section>
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {bookings && bookings.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 border border-dashed border-border/40 bg-card/20"
              >
                <Inbox
                  size={48}
                  className="text-primary/20 mb-6"
                  strokeWidth={1}
                />
                <h3 className="text-sm tracking-[0.2em] uppercase font-medium text-foreground">
                  No bookings available to display
                </h3>
                <p className="text-xs text-muted-foreground mt-2 uppercase tracking-widest">
                  All current reservations have been cleared
                </p>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-6">
                <AnimatePresence>
                  {bookings?.map((booking: any, i: number) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group border border-border/40 bg-card p-6 transition-all duration-500 hover:border-primary/40 md:p-8"
                    >
                      <div className="flex flex-col gap-8 md:flex-row md:items-center">
                        <div className="flex-1">
                          <div className="mb-3 flex items-center gap-4">
                            <span className="text-[10px] tracking-[0.3em] text-primary uppercase font-bold">
                              Ref #{booking.id}
                            </span>
                            <span className="h-1 w-1 rounded-full bg-border" />
                            <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                              Room {booking.roomNumber}
                            </span>
                          </div>
                          <h3 className="text-2xl font-serif text-foreground uppercase tracking-tight">
                            {booking.guestName || "Private Guest"}
                          </h3>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-3 border border-border/30 bg-secondary/30 px-5 py-3">
                            <CalendarDays size={14} className="text-primary" />
                            <div>
                              <p className="text-[8px] tracking-[0.2em] text-muted-foreground uppercase mb-1">
                                Check-in
                              </p>
                              <p className="text-xs font-bold uppercase">
                                {formatDate(booking.checkInDate)}
                              </p>
                            </div>
                          </div>
                          <ArrowRight
                            size={14}
                            className="text-muted-foreground/40"
                          />
                          <div className="flex items-center gap-3 border border-border/30 bg-secondary/30 px-5 py-3">
                            <CalendarDays size={14} className="text-primary" />
                            <div>
                              <p className="text-[8px] tracking-[0.2em] text-muted-foreground uppercase mb-1">
                                Check-out
                              </p>
                              <p className="text-xs font-bold uppercase">
                                {formatDate(booking.checkOutDate)}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 border-l border-border/30 pl-8 min-w-[150px]">
                          <DollarSign size={18} className="text-primary" />
                          <div>
                            <p className="text-2xl font-serif font-bold text-foreground">
                              {booking.finalPrice?.toLocaleString()}
                            </p>
                            <p className="text-[8px] tracking-[0.3em] text-muted-foreground uppercase">
                              Total Amount
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
}
