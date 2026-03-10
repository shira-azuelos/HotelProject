"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const [formData, setFormData] = useState({ tz: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // שליחת הבקשה לשרת ה-C#
      const response = await fetch("https://localhost:7032/api/Auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            Tz: formData.tz,        // שימוש ב-T גדולה כדי להתאים ל-UserPostPutModel
            password: formData.password 
        }),
      })

      if (response.ok) {
        const data = await response.json()
        
        // שמירת הנתונים ב-LocalStorage לשימוש בטופס ההזמנה
        localStorage.setItem("token", data.token)
        localStorage.setItem("userId", data.userId.toString()) // שמירת ה-ID האוטומטי
        localStorage.setItem("userName", data.firstName)
        
        // מעבר לדף הבית או דף החדרים
        router.push("/") 
      } else {
        const errorData = await response.text()
        setError(errorData || "פרטי התחברות שגויים. נסו שוב.")
      }
    } catch (err) {
      setError("שגיאה בתקשורת עם השרת. וודאו שה-Backend רץ בפורט 7032.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/20 p-4" dir="rtl">
      <div className="w-full max-w-md bg-white p-10 shadow-xl border border-border/40">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-foreground">ברוכים השבים</h2>
          <p className="text-muted-foreground mt-2 text-sm">התחברו כדי לנהל את ההזמנות שלכם</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1 text-right">
            <label className="block text-xs font-bold tracking-widest text-muted-foreground uppercase">תעודת זהות</label>
            <input 
              type="text" 
              className="w-full border border-border/60 bg-background p-3 focus:border-primary outline-none transition-all"
              placeholder="הכניסו תעודת זהות"
              onChange={(e) => setFormData({ ...formData, tz: e.target.value })}
              required 
            />
          </div>
          
          <div className="space-y-1 text-right">
            <label className="block text-xs font-bold tracking-widest text-muted-foreground uppercase">סיסמה</label>
            <input 
              type="password" 
              className="w-full border border-border/60 bg-background p-3 focus:border-primary outline-none transition-all"
              placeholder="********"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required 
            />
          </div>
          
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 p-3 text-center">
                <p className="text-xs text-destructive font-bold">{error}</p>
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary py-4 text-primary-foreground font-bold tracking-widest uppercase hover:bg-primary/90 transition-colors disabled:bg-muted-foreground"
          >
            {loading ? "מתחבר..." : "כניסה למערכת"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm border-t border-border/30 pt-6">
          <p className="text-muted-foreground">
            עדיין אין לך חשבון?{" "}
            <Link href="/register" className="text-primary hover:underline font-bold">
              הירשם עכשיו
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}