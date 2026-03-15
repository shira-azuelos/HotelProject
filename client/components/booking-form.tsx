"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import useSWR from "swr";
import { type Room } from "@/lib/api";
import { CalendarDays, User, Users, Hash, Check, Loader2 } from "lucide-react";

const API_BASE = "https://localhost:7032/api";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function BookingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const preselectedRoomId = searchParams.get("roomId");

  const { data: rooms } = useSWR<Room[]>(`${API_BASE}/Rooms`, fetcher);

  const [formData, setFormData] = useState({
    roomId: preselectedRoomId || "",
    checkInDate: "",
    checkOutDate: "",
    numberOfGuests: "1",
  });

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || userId === "undefined" || !token) {
      setErrorMessage("Please login again to make a reservation");
      setStatus("error");
      setTimeout(() => router.push("/login"), 2000);
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch(`${API_BASE}/Bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          UserId: Number(userId),
          RoomId: Number(formData.roomId),
          CheckInDate: new Date(formData.checkInDate).toISOString(),
          CheckOutDate: new Date(formData.checkOutDate).toISOString(),
        }),
      });
      if (!response.ok) {
        const errorText = await response.text(); 
        let errorMsg = "Reservation failed";
        try {
           const errorData = JSON.parse(errorText); 
           if (errorData.errors) {
               errorMsg = JSON.stringify(errorData.errors);
           } else if (errorData.message) {
               errorMsg = errorData.message;
           }
        } catch {
           errorMsg = errorText; 
        }
        throw new Error(errorMsg || "Room is already booked for these dates");
      }

      setStatus("success");
      setTimeout(() => router.push("/bookings"), 2000);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    }
  };

  const availableRooms = (rooms || []).filter((r) => r.status !== 1);
  const inputBaseClass =
    "w-full border border-border/50 bg-secondary px-4 py-3.5 text-sm text-foreground focus:border-primary focus:outline-none transition-all duration-300";

  return (
    <div className="border border-border/40 bg-card">
      <div className="border-b border-border/30 px-8 py-6">
        <p className="mb-1 text-xs tracking-[0.4em] text-primary uppercase">
          New Reservation
        </p>
        <h2 className="text-2xl font-bold text-foreground">Book Your Stay</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8">
        <div>
          <label className="mb-2 flex items-center gap-2 text-xs text-muted-foreground uppercase">
            <Hash size={12} className="text-primary" /> Select Room
          </label>
          <select
            required
            value={formData.roomId}
            onChange={(e) =>
              setFormData({ ...formData, roomId: e.target.value })
            }
            className={inputBaseClass}
          >
            <option value="">Choose a room</option>
            {availableRooms.map((room) => (
              <option key={room.id} value={room.id}>
                Room {room.roomNumber} - {room.type} (${room.basePrice}/night)
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 flex items-center gap-2 text-xs text-muted-foreground uppercase">
              <CalendarDays size={12} className="text-primary" /> Check-in
            </label>
            <input
              type="date"
              required
              value={formData.checkInDate}
              onChange={(e) =>
                setFormData({ ...formData, checkInDate: e.target.value })
              }
              className={inputBaseClass}
            />
          </div>
          <div>
            <label className="mb-2 flex items-center gap-2 text-xs text-muted-foreground uppercase">
              <CalendarDays size={12} className="text-primary" /> Check-out
            </label>
            <input
              type="date"
              required
              value={formData.checkOutDate}
              onChange={(e) =>
                setFormData({ ...formData, checkOutDate: e.target.value })
              }
              className={inputBaseClass}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 bg-primary/10 p-4 text-primary"
            >
              <Check size={16} /> <p>Reservation successful! Redirecting...</p>
            </motion.div>
          )}
          {status === "error" && (
            <div className="bg-destructive/10 p-4 text-destructive text-sm">
              {errorMessage}
            </div>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={status === "submitting" || status === "success"}
          className="flex items-center justify-center gap-3 bg-primary px-10 py-4 text-xs font-semibold text-primary-foreground uppercase hover:bg-transparent hover:text-primary border border-primary transition-all duration-500"
        >
          {status === "submitting" ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            "Confirm Reservation"
          )}
        </button>
      </form>
    </div>
  );
}