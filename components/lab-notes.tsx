"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

const notes = [
  {
    id: 1,
    title: "IoT Security Workshop",
    excerpt:
      "Simulated smart home appliance security testing using a demo web interface. Hands-on experience with IoT vulnerability assessment and threat modeling.",
    date: "24 Jan 2026",
    timestamp: new Date("2026-01-24").getTime(),
    category: "security",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 2,
    title: "Cloud Security Workshop",
    excerpt:
      "Cloud security fundamentals and best practices. AWS security architecture, IAM policies, and defense-in-depth strategies.",
    date: "07 Feb 2026",
    timestamp: new Date("2026-02-07").getTime(),
    category: "cloud",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 3,
    title: "Application Security Testing",
    excerpt:
      "Deep dive into authentication flows, input validation, access control vulnerabilities, and secure code review practices.",
    date: "Jan 2025",
    timestamp: new Date("2025-01-15").getTime(),
    category: "security",
    color: "from-primary/20 to-emerald-500/20",
  },
  {
    id: 4,
    title: "Network Defense & Monitoring",
    excerpt:
      "Enterprise network security, routing optimization, LAN/WAN deployments, and real-time threat monitoring with SIEM and IDS.",
    date: "Nov 2024",
    timestamp: new Date("2024-11-15").getTime(),
    category: "network",
    color: "from-orange-500/20 to-amber-500/20",
  },
]

const filters = ["all", "upcoming", "past"]

export function LabNotes() {
  const [expandedNote, setExpandedNote] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState("all")

  const now = new Date().getTime()
  const filteredNotes = notes.filter((note) => {
    if (activeFilter === "all") return true
    if (activeFilter === "upcoming") return note.timestamp > now
    if (activeFilter === "past") return note.timestamp <= now
    return true
  })

  return (
    <section id="notes" className="px-4 sm:px-6 py-20 sm:py-28 border-t border-border/30">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 sm:mb-14 space-y-3 animate-fade-in-up">
          <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">Field Notes</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Workshops & Learning</h2>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Hands-on learning experiences, security research, and technical investigations from the field.
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-8 animate-fade-in-up stagger-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "rounded-lg border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 active:scale-[0.98]",
                activeFilter === filter
                  ? "border-primary bg-primary/15 text-primary shadow-sm shadow-primary/20"
                  : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground hover:bg-secondary/50",
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {filteredNotes.map((note, index) => (
            <article
              key={note.id}
              className={cn(
                "group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-card/40 glass p-6 sm:p-7 transition-all duration-400 hover:border-primary/40 hover:bg-card/60 active:scale-[0.99] hover-lift animate-fade-in-up",
                expandedNote === note.id && "border-primary/50 bg-card/70",
              )}
              style={{ animationDelay: `${index * 100 + 200}ms` }}
              onClick={() => setExpandedNote(expandedNote === note.id ? null : note.id)}
            >
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                  note.color,
                )}
              />

              <div className="relative z-10">
                <div className="mb-4 sm:mb-5 flex items-center justify-between gap-3">
                  <span className="rounded-lg border border-border/80 bg-secondary/60 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors group-hover:border-primary/50 group-hover:text-foreground">
                    {note.category}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{note.date}</span>
                </div>

                <h3 className="mb-3 text-lg sm:text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-gradient">
                  {note.title}
                </h3>

                <p className="text-sm leading-relaxed text-muted-foreground">{note.excerpt}</p>

                <div className="mt-5 flex items-center gap-2 font-mono text-xs text-primary transition-all duration-300 sm:opacity-0 sm:translate-x-[-8px] group-hover:opacity-100 group-hover:translate-x-0">
                  <span>read more</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-transparent transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <p className="font-mono text-sm text-muted-foreground">No workshops found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}
