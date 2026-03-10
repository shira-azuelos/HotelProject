"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import useSWR from "swr"
import { createBooking, type Room } from "@/lib/api"
import { CalendarDays, User, Users, Hash, Check, Loader2, AlertCircle } from "lucide-react"

const API_BASE = "https://localhost:7032/api"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function BookingForm() {
  const searchParams = useSearchParams()
  const preselectedRoomId = searchParams.get("roomId")

  // משיכת חדרים מהשרת
  const { data: rooms } = useSWR<Room[]>(`${API_BASE}/Rooms`, fetcher, {
    revalidateOnFocus: true
  })

  const availableRooms = rooms?.filter((r) => r.status !== 1) || []

  const [formData, setFormData] = useState({
    roomId: preselectedRoomId || "",
    userId: "", // יתמלא אוטומטית מה-LocalStorage
    checkInDate: "",
    checkOutDate: "",
    numberOfGuests: "1",
  })

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // טעינת ה-UserId מהדפדפן ברגע שהקומפוננטה עולה
  useEffect(() => {
    const storedId = localStorage.getItem("userId")
    if (storedId) {
      setFormData(prev => ({ ...prev, userId: storedId }))
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.userId) {
      setStatus("error")
      setErrorMessage("עליך להתחבר למערכת כדי לבצע הזמנה.")
      return
    }

    setStatus("submitting")
    setErrorMessage("")

    try {
      await createBooking({
        userId: Number(formData.userId),
        roomId: Number(formData.roomId),
        checkInDate: new Date(formData.checkInDate).toISOString(),
        checkOutDate: new Date(formData.checkOutDate).toISOString(),
        status: 1, // נשלח כמאושר (Confirmed)
      })

      setStatus("success")
      setFormData({
        roomId: "",
        userId: localStorage.getItem("userId") || "",
        checkInDate: "",
        checkOutDate: "",
        numberOfGuests: "1",
      })
    } catch (error) {
      console.error("Booking Error:", error)
      setStatus("error")
      setErrorMessage("חלה שגיאה בשמירת ההזמנה. ודאי שהשרת רץ.")
    }
  }

  const inputBaseClass =
    "w-full border border-border/50 bg-secondary px-4 py-3.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300"

  return (
    <div className="border border-border/40 bg-card">
      <div className="border-b border-border/30 px-8 py-6 text-right" dir="rtl">
        <p className="mb-1 text-xs tracking-[0.4em] text-primary uppercase">הזמנה חדשה</p>
        <h2 className="text-2xl font-bold text-foreground font-serif">הזמן את שהותך</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8 text-right" dir="rtl">
        
        {/* User ID - מוצג אוטומטית */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-xs tracking-[0.1em] text-muted-foreground uppercase justify-end">
             מספר משתמש (מזוהה אוטומטית)
            <User size={12} className="text-primary" />
          </label>
          <input
            type="text"
            readOnly
            value={formData.userId}
            placeholder="יש להתחבר כדי לראות ID"
            className={`${inputBaseClass} bg-muted/50 cursor-not-allowed text-center`}
          />
          {!formData.userId && (
            <p className="text-xs text-destructive mt-1 flex items-center gap-1 justify-end">
              אנא התחברי כדי לבצע הזמנה <AlertCircle size={10} />
            </p>
          )}
        </div>

        {/* Room Selection */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-xs tracking-[0.1em] text-muted-foreground uppercase justify-end">
            בחר חדר
            <Hash size={12} className="text-primary" />
          </label>
          <select
            required
            value={formData.roomId}
            onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
            className={inputBaseClass}
          >
            <option value="">בחר חדר מהרשימה</option>
            {availableRooms.map((room) => (
              <option key={room.id} value={room.id}>
                חדר {room.roomNumber} - (${room.basePrice} ללילה)
              </option>
            ))}
          </select>
        </div>

        {/* Dates */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 flex items-center gap-2 text-xs tracking-[0.1em] text-muted-foreground uppercase justify-end">
              תאריך יציאה
              <CalendarDays size={12} className="text-primary" />
            </label>
            <input
              type="date"
              required
              value={formData.checkOutDate}
              onChange={(e) => setFormData({ ...formData, checkOutDate: e.target.value })}
              className={inputBaseClass}
            />
          </div>
          <div>
            <label className="mb-2 flex items-center gap-2 text-xs tracking-[0.1em] text-muted-foreground uppercase justify-end">
              תאריך כניסה
              <CalendarDays size={12} className="text-primary" />
            </label>
            <input
              type="date"
              required
              value={formData.checkInDate}
              onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })}
              className={inputBaseClass}
            />
          </div>
        </div>

        {/* Status Messages */}
        <AnimatePresence mode="wait">
          {status === "success" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 border border-primary/30 bg-primary/10 px-4 py-3 justify-end">
              <p className="text-sm text-primary">ההזמנה נשמרה ב-SQL והמחיר חושב אוטומטית!</p>
              <Check size={16} className="text-primary" />
            </motion.div>
          )}
          {status === "error" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border border-destructive/30 bg-destructive/10 px-4 py-3 text-center">
              <p className="text-sm text-destructive font-medium">{errorMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={status === "submitting" || !formData.userId}
          className="flex items-center justify-center gap-3 border border-primary bg-primary px-10 py-4 text-xs font-bold tracking-[0.2em] text-primary-foreground uppercase transition-all duration-500 hover:bg-transparent hover:text-primary disabled:opacity-50"
        >
          {status === "submitting" ? <Loader2 size={16} className="animate-spin" /> : "אשר הזמנה"}
        </button>
      </form>
    </div>
  )
}