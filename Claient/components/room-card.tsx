"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import type { Room } from "@/lib/api"

const roomImages = [
  "/images/room-deluxe.jpg",
  "/images/room-suite.jpg",
  "/images/room-standard.jpg",
  "/images/room-penthouse.jpg",
]

const roomTypeNames = ["Deluxe Room", "Executive Suite", "Standard Room", "Penthouse"]

export function RoomCard({ room, index }: { room: Room; index: number }) {
  const isOccupied = room.status === 1
  const imageIndex = index % roomImages.length
  const roomType = room.type || roomTypeNames[imageIndex]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden border border-border/40 bg-card"
    >
      {/* Image Container with Hover Zoom */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={roomImages[imageIndex]}
          alt={`${roomType} - Room ${room.roomNumber}`}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Hover Overlay with Details */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="p-6">
            <p
              className="mb-2 text-xs tracking-[0.3em] text-primary uppercase"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Room Details
            </p>
            <p
              className="text-sm leading-relaxed text-muted-foreground"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              {room.description ||
                "Experience refined luxury with premium amenities, bespoke furnishings, and breathtaking views."}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute left-4 top-4">
          <span
            className={`inline-block px-3 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase ${
              isOccupied
                ? "bg-destructive/90 text-destructive-foreground"
                : "bg-primary/90 text-primary-foreground"
            }`}
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {isOccupied ? "Occupied" : "Available"}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p
              className="mb-1 text-[10px] tracking-[0.4em] text-muted-foreground uppercase"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Room {room.roomNumber}
            </p>
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              {roomType}
            </h3>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">
              ${room.basePrice.toLocaleString()}
            </p>
            <p
              className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              per night
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 border-t border-border/30 pt-4">
          {isOccupied ? (
            <span
              className="flex-1 py-3 text-center text-xs tracking-[0.2em] text-muted-foreground uppercase cursor-not-allowed"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
              aria-disabled="true"
            >
              Currently Occupied
            </span>
          ) : (
            <Link
              href={`/reservations?roomId=${room.id}&roomNumber=${room.roomNumber}`}
              className="flex-1 border border-primary bg-primary py-3 text-center text-xs font-semibold tracking-[0.2em] text-primary-foreground uppercase transition-all duration-500 hover:bg-transparent hover:text-primary"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Book Now
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  )
}
