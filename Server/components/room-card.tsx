"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import type { Room } from "@/lib/api"
import { updateRoom, deleteRoom } from "@/lib/api"
import {
  Pencil,
  Trash2,
  X,
  Check,
  Loader2,
  DollarSign,
  Hash,
  Tag,
  AlertTriangle,
} from "lucide-react"

const roomImages = [
  "/images/room-deluxe.jpg",
  "/images/room-suite.jpg",
  "/images/room-standard.jpg",
  "/images/room-penthouse.jpg",
]

const roomTypeNames = ["Deluxe Room", "Executive Suite", "Standard Room", "Penthouse"]

export function RoomCard({
  room,
  index,
  onDeleted,
  onUpdated,
}: {
  room: Room
  index: number
  onDeleted?: (id: number) => void
  onUpdated?: (room: Room) => void
}) {
  const isOccupied = room.status===1;
  const imageIndex = index % roomImages.length
  const roomType = room.type || roomTypeNames[imageIndex]

  const [isAdmin, setIsAdmin] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [editData, setEditData] = useState({
  roomNumber: room.roomNumber,
  basePrice: String(room.basePrice),
  type: room.type || "", 
})
  const [editStatus, setEditStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [deleteStatus, setDeleteStatus] = useState<"idle" | "deleting" | "error">("idle")

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role && role.toLowerCase() === "admin") {
      setIsAdmin(true)
    }
  }, [])

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEditStatus("submitting")
    try {
      const updated = await updateRoom(room.id, {
      ...editData,
      numberOfBeds: (room as any).numberOfBeds || 1
    })
      setEditStatus("success")
      if (onUpdated) {
      onUpdated(updated)
    }

    setTimeout(() => {
      setShowEditModal(false)
      setEditStatus("idle")
    }, 1000)
  } catch (error) {
    setEditStatus("error")
  }
  }

  const handleDelete = async () => {
    setDeleteStatus("deleting")
    try {
      await deleteRoom(room.id)
      setShowDeleteConfirm(false)
      onDeleted?.(room.id)
    } catch {
      setDeleteStatus("error")
    }
  }

  const inputBaseClass =
    "w-full border border-border/50 bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300"

  return (
    <>
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

        {/* Admin action buttons — rendered AFTER image to guarantee stacking */}
        {isAdmin && (
          <div className="absolute right-3 top-3 z-[100] flex items-center gap-1.5">
            <span
              className="mr-1 flex items-center bg-primary px-2 py-1 text-[9px] font-bold tracking-[0.2em] text-primary-foreground uppercase"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              Admin Mode
            </span>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setEditData({
                  roomNumber: room.roomNumber,
                  basePrice: String(room.basePrice),
                  type: room.type || roomTypeNames[imageIndex],
                })
                setShowEditModal(true)
              }}
              className="flex h-9 w-9 items-center justify-center bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/80"
              aria-label="Edit room"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setShowDeleteConfirm(true)
              }}
              className="flex h-9 w-9 items-center justify-center bg-destructive text-destructive-foreground shadow-lg transition-all duration-300 hover:bg-destructive/80"
              aria-label="Delete room"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}

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

      {/* ─── Edit Modal ─────────────────────────────────── */}
      <AnimatePresence>
        {showEditModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4"
            onClick={() => {
              setShowEditModal(false)
              setEditStatus("idle")
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-md border border-border/40 bg-card"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-border/30 px-6 py-4">
                <div>
                  <p
                    className="mb-0.5 text-xs tracking-[0.4em] text-primary uppercase"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Admin
                  </p>
                  <h3 className="text-lg font-bold text-foreground">
                    Edit Room {room.roomNumber}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setShowEditModal(false)
                    setEditStatus("idle")
                  }}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleEdit} className="flex flex-col gap-5 p-6">
                <div>
                  <label
                    htmlFor={`edit-number-${room.id}`}
                    className="mb-2 flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground uppercase"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    <Hash size={12} className="text-primary" />
                    Room Number
                  </label>
                  <input
                    id={`edit-number-${room.id}`}
                    type="text"
                    required
                    value={editData.roomNumber}
                    onChange={(e) =>
                      setEditData({ ...editData, roomNumber: e.target.value })
                    }
                    className={inputBaseClass}
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  />
                </div>

                <div>
                  <label
                    htmlFor={`edit-price-${room.id}`}
                    className="mb-2 flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground uppercase"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    <DollarSign size={12} className="text-primary" />
                    Base Price
                  </label>
                  <input
                    id={`edit-price-${room.id}`}
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={editData.basePrice}
                    onChange={(e) =>
                      setEditData({ ...editData, basePrice: e.target.value })
                    }
                    className={inputBaseClass}
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  />
                </div>

                <div>
                  <label
                    htmlFor={`edit-type-${room.id}`}
                    className="mb-2 flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground uppercase"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    <Tag size={12} className="text-primary" />
                    Room Type
                  </label>
                  <input
                    id={`edit-type-${room.id}`}
                    type="text"
                    required
                    value={editData.type}
                    onChange={(e) =>
                      setEditData({ ...editData, type: e.target.value })
                    }
                    className={inputBaseClass}
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  />
                </div>

                {/* Status */}
                <AnimatePresence mode="wait">
                  {editStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 border border-primary/30 bg-primary/10 px-4 py-3"
                    >
                      <Check size={14} className="text-primary" />
                      <p
                        className="text-sm text-primary"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      >
                        Room updated successfully.
                      </p>
                    </motion.div>
                  )}
                  {editStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="border border-destructive/30 bg-destructive/10 px-4 py-3"
                    >
                      <p
                        className="text-sm text-destructive"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      >
                        Failed to update room. Please try again.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={editStatus === "submitting"}
                  className="flex items-center justify-center gap-3 border border-primary bg-primary px-8 py-3.5 text-xs font-semibold tracking-[0.2em] text-primary-foreground uppercase transition-all duration-500 hover:bg-transparent hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {editStatus === "submitting" ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Saving
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Delete Confirmation Modal ──────────────────── */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4"
            onClick={() => {
              setShowDeleteConfirm(false)
              setDeleteStatus("idle")
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-sm border border-border/40 bg-card p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center border border-destructive/40 bg-destructive/10">
                  <AlertTriangle size={18} className="text-destructive" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    Delete Room
                  </h3>
                  <p
                    className="text-xs text-muted-foreground"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Room {room.roomNumber} - {roomType}
                  </p>
                </div>
              </div>

              <p
                className="mb-6 text-sm leading-relaxed text-muted-foreground"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Are you sure you want to permanently remove this room? This action cannot be undone.
              </p>

              {deleteStatus === "error" && (
                <div className="mb-4 border border-destructive/30 bg-destructive/10 px-4 py-3">
                  <p
                    className="text-sm text-destructive"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    Failed to delete room. Please try again.
                  </p>
                </div>
              )}

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false)
                    setDeleteStatus("idle")
                  }}
                  className="flex-1 border border-border/50 py-3 text-center text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase transition-all duration-300 hover:border-foreground/30 hover:text-foreground"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleteStatus === "deleting"}
                  className="flex flex-1 items-center justify-center gap-2 border border-destructive bg-destructive py-3 text-xs font-semibold tracking-[0.2em] text-destructive-foreground uppercase transition-all duration-300 hover:bg-destructive/80 disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {deleteStatus === "deleting" ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      Deleting
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
