'use client'

import React, { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

const wipItems = [
  {
    id: 1,
    name: "binary-mind-secure-sharing",
    description: "Secure file-sharing platform with AES-256 encryption, RBAC, and activity logging",
    progress: 85,
    lastUpdated: "Dec 2024",
    category: "Cloud Security",
  },
  {
    id: 2,
    name: "insider-threat-detection",
    description: "Enterprise SIEM with Wazuh, Suricata IDS, and behavioral anomaly detection",
    progress: 75,
    lastUpdated: "Feb 2026",
    category: "Threat Detection",
  },
  {
    id: 3,
    name: "devsecops-automation",
    description: "CI/CD security pipeline with SAST/DAST and automated vulnerability scanning",
    progress: 80,
    lastUpdated: "Feb 2026",
    category: "DevSecOps",
  },
  {
    id: 4,
    name: "cloud-security-lab",
    description: "AWS security research and hardening lab with IAM, VPC, and KMS implementation",
    progress: 70,
    lastUpdated: "Jan 2026",
    category: "Cloud Security",
  },
]

const categories = ["all", "Cloud Security", "Threat Detection", "DevSecOps"]

export function WorkbenchPageContent() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredItems = activeFilter === "all" ? wipItems : wipItems.filter((item) => item.category === activeFilter)

  return (
    <section ref={sectionRef} className="px-4 sm:px-6 py-12 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <div className={cn("mb-12 sm:mb-16 space-y-4 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">
            Work in Progress
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Workbench</h1>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            Active security projects and research initiatives. Systems being secured, threats being analyzed, and defenses being strengthened.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:flex-wrap scrollbar-hide mb-8 animate-fade-in-up stagger-2">
          {categories.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "rounded-lg border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 active:scale-[0.98] whitespace-nowrap",
                activeFilter === filter
                  ? "border-primary bg-primary/15 text-primary shadow-sm shadow-primary/20"
                  : "border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground hover:bg-secondary/50",
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card/40 glass backdrop-blur-sm overflow-hidden hover-lift animate-scale-in stagger-2">
          {/* Terminal header */}
          <div className="flex items-center gap-3 border-b border-border/50 bg-secondary/40 px-4 sm:px-5 py-3.5 sm:py-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-destructive/60 transition-colors hover:bg-destructive cursor-pointer" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/60 transition-colors hover:bg-yellow-500 cursor-pointer" />
              <div className="h-3 w-3 rounded-full bg-primary/60 transition-colors hover:bg-primary cursor-pointer" />
            </div>
            <span className="ml-4 font-mono text-xs text-muted-foreground truncate">~/brijeshpalta/security-lab</span>
            <div className="ml-auto hidden sm:flex items-center gap-2 text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs">live</span>
            </div>
          </div>

          <div className="divide-y divide-border/30">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="group flex flex-col gap-4 p-5 sm:p-6 transition-all duration-300 sm:flex-row sm:items-center sm:justify-between hover:bg-secondary/30 animate-fade-in"
                style={{ animationDelay: `${index * 100 + 400}ms` }}
              >
                <div className="flex-1 space-y-2 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="text-primary font-mono text-sm shrink-0 transition-transform duration-300 group-hover:translate-x-1">
                      $
                    </span>
                    <h4 className="font-mono text-sm font-medium tracking-tight transition-colors group-hover:text-gradient truncate">
                      {item.name}
                    </h4>
                    <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[10px] text-primary shrink-0">
                      {item.category}
                    </span>
                  </div>
                  <p className="pl-6 text-xs text-muted-foreground line-clamp-2 sm:line-clamp-1">{item.description}</p>
                </div>

                <div className="flex items-center justify-between gap-6 pl-6 sm:pl-0 sm:justify-end">
                  <div className="flex items-center gap-3 flex-1 sm:flex-none">
                    <div className="h-2 w-full sm:w-28 overflow-hidden rounded-full bg-secondary/80 relative">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-700 ease-out",
                          item.progress >= 80 ? "bg-primary" : item.progress >= 50 ? "bg-yellow-500" : "bg-orange-500",
                        )}
                        style={{ width: `${item.progress}%` }}
                      />
                      <div className="absolute inset-0 animate-shimmer opacity-30" />
                    </div>
                    <span
                      className={cn(
                        "font-mono text-xs w-10 shrink-0 transition-colors",
                        item.progress >= 80 ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      {item.progress}%
                    </span>
                  </div>

                  <span className="font-mono text-xs text-muted-foreground shrink-0">{item.lastUpdated}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border/50 bg-secondary/30 px-4 sm:px-5 py-4">
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="text-primary">❯</span>
              <span className="typing-cursor truncate">git status --all</span>
              <span className="ml-auto text-primary/50 hidden sm:block">press enter to run</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
