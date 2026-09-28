"use client"

import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Star, GitFork, Sparkles } from "lucide-react"

const projects = [
  {
    id: 0,
    title: "Binary Mind: Secure File Sharing",
    description:
      "A cloud file-sharing project with AES-256 encryption, role-based access, and activity logs.",
    tags: ["Encryption", "RBAC", "Cloud Security", "Python"],
    category: "Cloud Security",
    year: "2024",
    stars: 12,
    forks: 2,
    featured: true,
    highlight: true,
  },
  {
    id: 1,
    title: "Project Radar: Task Management",
    description:
      "An iOS and Android task manager using Firebase Authentication and Firestore to sync tasks.",
    tags: ["Firebase", "Kotlin", "Swift", "DevSecOps"],
    category: "Application Development",
    year: "2025",
    stars: 8,
    forks: 1,
    featured: true,
  },
  {
    id: 2,
    title: "Insider Threat Detection System",
    description:
      "A VMware lab using Active Directory, Wazuh, Suricata, and the ELK Stack to study insider-threat detection.",
    tags: ["SIEM", "Wazuh", "IDS", "Threat Detection"],
    category: "Threat Detection",
    year: "2025",
    stars: 15,
    forks: 3,
    featured: true,
  },
  {
    id: 3,
    title: "Digital Visiting Card: QR System",
    description:
      "A QR contact card backed by Firebase Authentication and Firestore for sharing contact details.",
    tags: ["Firebase", "QR Codes", "Mobile", "Security"],
    category: "Application Development",
    year: "2025",
    stars: 6,
    forks: 1,
    featured: false,
  },
  {
    id: 4,
    title: "Brijaix: Diet and Workout Recommender",
    description:
      "A recommendation project using data preparation and regression models to suggest diet and workout plans.",
    tags: ["Python", "Machine Learning", "AI", "Regression"],
    category: "Machine Learning",
    year: "2025",
    stars: 11,
    forks: 2,
    featured: false,
  },
  {
    id: 5,
    title: "Cloud Security Research Lab",
    description:
      "Hands-on learning and research environment for AWS security, IAM policies, VPC configuration, and security group implementations.",
    tags: ["AWS", "IAM", "Cloud Security", "DevSecOps"],
    category: "Cloud Security",
    year: "2025",
    stars: 9,
    forks: 2,
    featured: false,
  },
  {
    id: 6,
    title: "Network Security Toolkit",
    description:
      "Collection of network monitoring and analysis tools for threat detection, packet analysis, and network optimization using Wireshark and tcpdump.",
    tags: ["Wireshark", "Network Security", "tcpdump", "Monitoring"],
    category: "Network Security",
    year: "2025",
    stars: 7,
    forks: 1,
    featured: false,
  },
  {
    id: 7,
    title: "DevSecOps Pipeline Automation",
    description:
      "Automated CI/CD security pipeline with GitHub Actions, SAST/DAST integration, and secure code review workflows for production deployments.",
    tags: ["GitHub Actions", "CI/CD", "SAST", "DevSecOps"],
    category: "DevSecOps",
    year: "2025",
    stars: 10,
    forks: 2,
    featured: false,
  },
]

const categories = ["all", "Cloud Security", "Threat Detection", "DevSecOps", "Network Security", "Application Development", "Machine Learning"]

export function ProjectsPageContent() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredProjects = activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter)

  return (
    <section ref={sectionRef} className="px-4 sm:px-6 py-12 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <div className={cn("mb-12 sm:mb-16 space-y-4 opacity-0", isVisible && "animate-fade-in-up")}>
          <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">Artifacts</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Security Projects</h1>
          <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            A collection of cloud security, DevSecOps, and threat detection projects. Built with security-first principles and production-ready standards.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible sm:flex-wrap scrollbar-hide mb-12 animate-fade-in-up stagger-2">
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

        {/* Projects Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              className={cn(
                "group relative overflow-hidden rounded-xl border bg-card/40 p-6 sm:p-7 glass transition-all duration-400 active:scale-[0.99] hover-lift opacity-0",
                isVisible && "animate-fade-in-up",
                hoveredProject === project.id && "border-primary/40 bg-card/70",
                project.highlight
                  ? "sm:col-span-2 lg:col-span-2 border-primary/30 bg-gradient-to-br from-primary/8 via-card/50 to-primary/8"
                  : "border-border/60",
                project.featured && !project.highlight && "sm:col-span-2 lg:col-span-1",
              )}
              style={{ animationDelay: `${(index % 6) * 80 + 200}ms` }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {project.highlight && (
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-3.5 py-1.5 animate-pulse-glow">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-primary font-medium">
                    Featured
                  </span>
                </div>
              )}

              {/* Category indicator */}
              <div
                className={cn(
                  "absolute right-5 top-5 flex items-center gap-2.5",
                  project.highlight && "top-5",
                )}
              >
                <span className="h-2.5 w-2.5 rounded-full bg-primary shadow-sm shadow-primary/50" />
                <span className="font-mono text-xs text-muted-foreground">{project.category}</span>
              </div>

              <div
                className={cn(
                  "mb-5 font-mono text-xs text-muted-foreground",
                  project.highlight && "mt-10",
                )}
              >
                {project.year}
              </div>

              <h3
                className={cn(
                  "mb-3 font-bold tracking-tight transition-all duration-300 group-hover:text-gradient",
                  project.highlight ? "text-xl sm:text-2xl" : "text-lg sm:text-xl",
                )}
              >
                {project.title}
              </h3>

              <p
                className={cn(
                  "mb-5 text-sm leading-relaxed text-muted-foreground",
                  project.highlight ? "line-clamp-3" : "line-clamp-2",
                )}
              >
                {project.description}
              </p>

              <div className="mb-5 flex items-center gap-5 font-mono text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5 transition-colors group-hover:text-yellow-500">
                  <Star className="h-3.5 w-3.5" />
                  {project.stars}
                </span>
                <span className="flex items-center gap-1.5 transition-colors group-hover:text-foreground">
                  <GitFork className="h-3.5 w-3.5" />
                  {project.forks}
                </span>
              </div>

              <div className="mb-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border/80 bg-secondary/60 px-2.5 py-1 font-mono text-xs text-secondary-foreground transition-colors hover:border-primary/50 hover:bg-primary/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary via-primary/80 to-transparent transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="font-mono text-sm text-muted-foreground">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}
