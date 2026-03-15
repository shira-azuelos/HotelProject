"use client"

import { motion } from "framer-motion"
import { Crown, Gem, Wine, Shield } from "lucide-react"

const features = [
  {
    icon: Crown,
    title: "Royal Service",
    description:
      "Dedicated concierge and butler service available around the clock for your every need.",
  },
  {
    icon: Gem,
    title: "Exquisite Rooms",
    description:
      "Each room is a masterpiece of design, appointed with the finest materials and furnishings.",
  },
  {
    icon: Wine,
    title: "Fine Dining",
    description:
      "Michelin-starred cuisine crafted by world-renowned chefs, paired with rare vintages.",
  },
  {
    icon: Shield,
    title: "Absolute Privacy",
    description:
      "State-of-the-art security and complete discretion for our distinguished guests.",
  },
]

export function FeaturesSection() {
  return (
    <section className="border-t border-border/30 bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p
            className="mb-4 text-xs tracking-[0.5em] text-primary uppercase"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            The Aurum Experience
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
            Crafted for the Extraordinary
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group border border-border/30 bg-card p-8 transition-all duration-500 hover:border-primary/40"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center border border-primary/30">
                <feature.icon size={20} className="text-primary" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-foreground">
                {feature.title}
              </h3>
              <p
                className="text-sm leading-relaxed text-muted-foreground"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
