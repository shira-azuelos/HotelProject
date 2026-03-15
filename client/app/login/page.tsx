"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/page-transition";
import {
  KeyRound,
  CreditCard,
  Loader2,
  Check,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";

const API_BASE = "https://localhost:7032/api";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ tz: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch(`${API_BASE}/Auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tz: formData.tz,
          password: formData.password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(errorData || "Invalid credentials");
      }

      const data = await res.json();
      const token = data.Token || data.token || "";
      const userId = data.UserId || data.userId || data.id;
      const userTZ = data.userTZ || data.UserTZ || data.tz || formData.tz;
      const name = data.FirstName || data.firstName || "Guest";
      const role = data.Role || data.role || "User";

      localStorage.setItem("token", token);
      localStorage.setItem("userId", String(userId)); 
      localStorage.setItem("userTZ", String(userTZ));
      localStorage.setItem("userName", name);
      localStorage.setItem("userRole", role);
      window.dispatchEvent(new Event("storage"));

      setStatus("success");

      setTimeout(() => {
        window.location.href = "/";
      }, 1200);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Unable to sign in. Please check your credentials and try again.",
      );
    }
  };

  const inputBaseClass =
    "w-full border border-border/50 bg-secondary px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300";

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
                <KeyRound size={24} className="text-primary" />
              </div>
              <p className="mb-2 text-xs tracking-[0.4em] text-primary uppercase">
                Welcome Back
              </p>
              <h1 className="text-3xl font-bold text-foreground">Sign In</h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border border-border/40 bg-card"
            >
              <div className="border-b border-border/30 px-8 py-6">
                <p className="mb-1 text-xs tracking-[0.4em] text-primary uppercase">
                  Authentication
                </p>
                <h2 className="text-2xl font-bold text-foreground">
                  Your Credentials
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-8">
                <div>
                  <label
                    htmlFor="tz"
                    className="mb-2 flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground uppercase"
                  >
                    <CreditCard size={12} className="text-primary" /> ID (Tz)
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

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground uppercase"
                  >
                    <KeyRound size={12} className="text-primary" /> Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className={`${inputBaseClass} pr-12`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-3 bg-primary/10 border border-primary/30 p-4 text-primary text-sm"
                    >
                      <Check size={16} /> Signed in successfully. Redirecting...
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-destructive/10 border border-destructive/30 p-4 text-destructive text-sm"
                    >
                      {errorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={status === "submitting" || status === "success"}
                  className="group flex items-center justify-center gap-3 border border-primary bg-primary px-10 py-4 text-xs font-semibold tracking-[0.25em] text-primary-foreground uppercase transition-all duration-500 hover:bg-transparent hover:text-primary disabled:opacity-50"
                >
                  {status === "submitting" ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              <div className="border-t border-border/30 px-8 py-5 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="text-primary hover:underline underline-offset-4"
                  >
                    Create one
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </PageTransition>
      </main>
      <Footer />
    </>
  );
}
