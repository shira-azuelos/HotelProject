"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    tz: "",
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    role: 0 
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("https://localhost:7032/api/User", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert("נרשמת בהצלחה! כעת ניתן להתחבר.")
        router.push("/login")
      }
    } catch (err) {
      alert("שגיאה בתהליך ההרשמה")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/20 p-4" dir="rtl">
      <div className="w-full max-w-md bg-white p-10 shadow-xl border border-border/40">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-foreground uppercase tracking-tight">יצירת חשבון</h2>
          <p className="text-muted-foreground mt-2 text-sm">הצטרפו למלון AURUM ותיהנו מחופשה יוקרתית</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* תעודת זהות */}
          <div className="space-y-1 text-right">
            <label className="block text-xs font-bold tracking-widest text-muted-foreground uppercase">תעודת זהות</label>
            <input 
              type="text" 
              className="w-full border border-border/60 bg-black text-white p-3 focus:border-primary outline-none transition-all placeholder:text-gray-500"
              placeholder="הכניסו תעודת זהות"
              onChange={(e) => setFormData({ ...formData, tz: e.target.value })}
              required 
            />
          </div>

          {/* שם פרטי ושם משפחה בשורה אחת */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1 text-right">
              <label className="block text-xs font-bold tracking-widest text-muted-foreground uppercase">שם פרטי</label>
              <input 
                type="text" 
                className="w-full border border-border/60 bg-black text-white p-3 focus:border-primary outline-none transition-all placeholder:text-gray-500"
                placeholder="שם פרטי"
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required 
              />
            </div>
            <div className="space-y-1 text-right">
              <label className="block text-xs font-bold tracking-widest text-muted-foreground uppercase">שם משפחה</label>
              <input 
                type="text" 
                className="w-full border border-border/60 bg-black text-white p-3 focus:border-primary outline-none transition-all placeholder:text-gray-500"
                placeholder="שם משפחה"
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required 
              />
            </div>
          </div>

          {/* טלפון */}
          <div className="space-y-1 text-right">
            <label className="block text-xs font-bold tracking-widest text-muted-foreground uppercase">טלפון</label>
            <input 
              type="text" 
              className="w-full border border-border/60 bg-black text-white p-3 focus:border-primary outline-none transition-all placeholder:text-gray-500"
              placeholder="מספר טלפון"
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required 
            />
          </div>

          {/* סיסמה */}
          <div className="space-y-1 text-right">
            <label className="block text-xs font-bold tracking-widest text-muted-foreground uppercase">סיסמה</label>
            <input 
              type="password" 
              className="w-full border border-border/60 bg-black text-white p-3 focus:border-primary outline-none transition-all placeholder:text-gray-500"
              placeholder="********"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#C5A373] py-4 text-black font-bold tracking-widest uppercase hover:bg-[#b08e5a] transition-all disabled:bg-muted-foreground mt-4"
          >
            {loading ? "מעבד..." : "הירשם עכשיו"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm border-t border-border/30 pt-6">
          <p className="text-muted-foreground">
            כבר יש לך חשבון?{" "}
            <Link href="/login" className="text-primary hover:underline font-bold uppercase tracking-tighter">
              התחבר כאן
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}