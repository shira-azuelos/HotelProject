"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { fetchUser, updateUser } from "@/lib/api"
import { Loader2, Save, User, Phone } from "lucide-react"
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: ""
  })

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userTz = localStorage.getItem("userTZ")
        if (!userTz) {
          console.error("No userTz found in localStorage")
          setLoading(false)
          return
        }
        const data = await fetchUser(userTz)
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          phone: data.phone || ""
        })
      } catch (error) {
        console.error("Error loading profile:", error)
        setMessage({ type: "error", text: "Error loading profile" })
      } finally {
        setLoading(false)
      }
    }
    loadUserData()
  }, [])

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const userTZ = localStorage.getItem("userTZ")
      if (!userTZ) return

      const updateData = {
        tz: userTZ,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        password: "TemporaryPassword123!" 
      }

      await updateUser(userTZ, updateData)
      
      localStorage.setItem("userName", formData.firstName)
      setMessage({ type: "success", text: "Profile updated successfully!" })
      
      setTimeout(() => router.push("/"), 1500)
    } catch (error) {
      setMessage({ type: "error", text: "Update failed. Please try again." })
    } finally {
      setSaving(false)
    }
}
  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-32 pb-16 px-6 bg-background">
        <div className="mx-auto max-w-xl bg-card border border-border/40 p-10 shadow-2xl">
          <h1 className="text-3xl font-serif mb-8 tracking-tight uppercase">Update Profile</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">First Name</label>
                <input 
                  type="text" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full bg-secondary/50 border border-border/50 px-4 py-3 text-sm focus:border-primary outline-none text-foreground"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Last Name</label>
                <input 
                  type="text" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full bg-secondary/50 border border-border/50 px-4 py-3 text-sm focus:border-primary outline-none text-foreground"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Phone Number</label>
              <input 
                type="text" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-secondary/50 border border-border/50 px-4 py-3 text-sm focus:border-primary outline-none text-foreground"
              />
            </div>

            {message.text && (
              <div className={`p-4 text-[10px] tracking-widest uppercase border ${
                message.type === "success" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
              }`}>
                {message.text}
              </div>
            )}

            <button 
              type="submit" 
              disabled={saving}
              className="w-full bg-primary text-primary-foreground py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
            >
              {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </main>
    </>
  )
}