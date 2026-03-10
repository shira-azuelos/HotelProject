"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageTransition } from "@/components/page-transition"
import {
  UserPlus,
  CreditCard,
  User,
  Phone,
  KeyRound,
  Loader2,
  Check,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react"

const API_BASE = "https://localhost:7032/api"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    tz: "",
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch(`${API_BASE}/User`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tz: formData.tz,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }
      const userId = data.id || data.Id;
      const userName = data.firstName || data.FirstName || formData.firstName;

      if (userId) {
        localStorage.setItem("userId", String(userId));
      }
      localStorage.setItem("userTZ", formData.tz);
      localStorage.setItem("userName", userName);
      if (data.token || data.Token) {
        localStorage.setItem("token", data.token || data.Token);
      }

      window.dispatchEvent(new Event("storage"));
      setStatus("success");

      setTimeout(() => {
        if (localStorage.getItem("token")) {
          router.push("/");
        } else {
          router.push("/login");
        }
      }, 1500);

    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Registration failed");
    }
  };

  const inputBaseClass =
    "w-full border border-border/50 bg-secondary px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300"

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background pt-24 pb-20">
        <PageTransition>
          <div className="mx-auto max-w-md px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-10 text-center"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center border border-primary/40">
                <UserPlus size={24} className="text-primary" />
              </div>
              <p
                className="mb-2 text-xs tracking-[0.4em] text-primary uppercase"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Join Aurum
              </p>
              <h1 className="text-3xl font-bold text-foreground">
                Create Account
              </h1>
              <p
                className="mt-3 text-sm text-muted-foreground"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                Begin your journey of exceptional hospitality
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border border-border/40 bg-card"
            >
              <div className="border-b border-border/30 px-8 py-6">
                <p
                  className="mb-1 text-xs tracking-[0.4em] text-primary uppercase"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Registration
                </p>
                <h2 className="text-2xl font-bold text-foreground">
                  Your Details
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8">
                <div>
                  <label
                    htmlFor="tz"
                    className="mb-2 flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground uppercase"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    <CreditCard size={12} className="text-primary" />
                    ID (Tz)
                  </label>
                  <input
                    id="tz"
                    type="text"
                    required
                    placeholder="Enter your ID number"
                    value={formData.tz}
                    onChange={(e) =>
                      setFormData({ ...formData, tz: e.target.value })
                    }
                    className={inputBaseClass}
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground uppercase"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      <User size={12} className="text-primary" />
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      required
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className={inputBaseClass}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground uppercase"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      <User size={12} className="text-primary" />
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      required
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className={inputBaseClass}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground uppercase"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    <Phone size={12} className="text-primary" />
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className={inputBaseClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground uppercase"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    <KeyRound size={12} className="text-primary" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Create a secure password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className={`${inputBaseClass} pr-12`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 border border-primary/30 bg-primary/10 px-4 py-3"
                    >
                      <Check size={16} className="text-primary" />
                      <p className="text-sm text-primary">
                        Account created successfully. Welcome to Aurum!
                      </p>
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="border border-destructive/30 bg-destructive/10 px-4 py-3"
                    >
                      <p className="text-sm text-destructive">
                        {errorMessage}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={status === "submitting" || status === "success"}
                  className="group flex items-center justify-center gap-3 border border-primary bg-primary px-10 py-4 text-xs font-semibold tracking-[0.25em] text-primary-foreground uppercase transition-all duration-500 hover:bg-transparent hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Creating Account
                    </>
                  ) : status === "success" ? (
                    <>
                      <Check size={14} />
                      Redirecting...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>

              <div className="border-t border-border/30 px-8 py-5 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-primary hover:text-primary/80 transition-colors duration-300 underline underline-offset-4"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </PageTransition>
      </main>
      <Footer />
    </>
  )
}