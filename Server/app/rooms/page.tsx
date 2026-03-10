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

const fetcher = (url: string) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return fetch(url, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export default function RoomsPage() {
  const { data: rooms, mutate: mutateRooms, isLoading: roomsLoading } = useSWR<Room[]>(`${API_BASE}/Rooms`, fetcher);
  const { data: bookings, mutate: mutateBookings } = useSWR<any[]>(`${API_BASE}/Bookings`, fetcher);

  const checkOccupied = (roomId: number) => {
    if (!bookings || !Array.isArray(bookings)) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTime = today.getTime();

    return bookings.some(b => {
      const bRoomId = b.roomId ?? b.RoomId;
      if (Number(bRoomId) !== Number(roomId)) return false;
      const bStatus = b.status ?? b.Status;
      if (bStatus !== undefined && Number(bStatus) !== 1) return false;
      const start = new Date(b.checkInDate ?? b.CheckInDate);
      const end = new Date(b.checkOutDate ?? b.CheckOutDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      const startTime = start.getTime();
      const endTime = end.getTime();

      const isOccupied = todayTime >= startTime && todayTime < endTime;
      
      if (isOccupied) {
        console.log(`!!! חדר ${roomId} תפוס עכשיו !!!`);
      }
      
      return isOccupied;
    });
  };

  return (
    <PageTransition>
      <Navigation />
      <main className="min-h-screen pt-24 bg-background">
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-12 text-center uppercase tracking-tighter">Our Rooms</h1>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {rooms?.map((room, index) => {
                const isNowOccupied = checkOccupied(room.id);
                const updatedRoom = { ...room, status: isNowOccupied ? 1 : 0 };

                return (
                  <RoomCard 
                    key={room.id} 
                    room={updatedRoom} 
                    index={index} 
                    onUpdated={() => { mutateRooms(); mutateBookings(); }}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  )
}