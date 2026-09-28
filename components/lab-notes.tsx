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
    content:
      "A practical IoT assessment starts with understanding what a device exposes: network services, web interfaces, wireless protocols, and update mechanisms. In a controlled lab, inventory devices and their open services, then inspect traffic for plaintext data or weak authentication. Test the interface for common access-control and input-validation issues, and document each finding with its impact and reproduction steps. The goal is to turn those observations into defenses: change default credentials, isolate devices on dedicated network segments, encrypt communications, and establish a reliable firmware update process. Only test devices and networks you own or have explicit permission to assess.",
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
    content:
      "A secure cloud foundation begins with identity and clear boundaries. Require multi-factor authentication, prefer short-lived role credentials, and grant each workload only the actions it needs. Place application and data services in private subnets, expose only deliberate entry points, and encrypt data both at rest and in transit. Enable audit logging before deploying workloads, then route important events into alerts that someone will review. A useful workshop exercise is to trace one request from the public edge to its data store and identify the identity, network rule, and log entry that governs each step. Revisit these controls as the architecture changes.",
    date: "07 Feb 2026",
    timestamp: new Date("2026-02-07").getTime(),
    category: "cloud",
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 3,
    title: "Application Security Testing",
    excerpt:
      "Notes on authentication, input validation, access control, and secure code review.",
    content:
      "Application security testing is most effective when it follows a user journey. Map sign-in, password recovery, role changes, and sensitive actions, then verify that every transition checks identity and authorization on the server. Try malformed and unexpected inputs in a safe test environment, and confirm that validation happens at the system boundary rather than only in the browser. During code review, look for trust assumptions around user-controlled values, secrets, and error handling. Record a concise reproduction, impact, and remediation for each finding, then add a regression test so the fix stays fixed.",
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
    content:
      "Good network defense combines sensible segmentation with visibility. Keep systems with different risk profiles in separate zones, restrict traffic to the paths services actually need, and document the expected flows. Centralize DNS, firewall, and endpoint events so investigations can connect activity across systems. Detection rules should have a clear purpose, an owner, and a response path; tune noisy alerts instead of letting them become background noise. Regularly review routing and access rules against the current architecture, and practice tracing a sample alert from its first event through triage and containment.",
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
                "group relative overflow-hidden rounded-xl border border-border bg-card/40 glass p-6 sm:p-7 transition-all duration-400 hover:border-primary/40 hover:bg-card/60 hover-lift animate-fade-in-up",
                expandedNote === note.id && "border-primary/50 bg-card/70",
              )}
              style={{ animationDelay: `${index * 100 + 200}ms` }}
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

                <button
                  type="button"
                  aria-expanded={expandedNote === note.id}
                  aria-controls={`lab-note-content-${note.id}`}
                  onClick={() => setExpandedNote(expandedNote === note.id ? null : note.id)}
                  className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-primary transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span>{expandedNote === note.id ? "show less" : "read more"}</span>
                  <ArrowRight className={cn("h-3.5 w-3.5 transition-transform", expandedNote === note.id && "rotate-90")} />
                </button>
                {expandedNote === note.id && (
                  <div id={`lab-note-content-${note.id}`} className="mt-4 border-t border-border/60 pt-4">
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-justify">{note.content}</p>
                  </div>
                )}
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
