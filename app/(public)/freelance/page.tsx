import type { Metadata } from "next"
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Code2,
  Globe2,
  Mail,
  MessageCircle,
  Palette,
  Server,
  Smartphone,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Freelance Development",
  description:
    "Freelance app, website, UI/UX, backend, API, and AI development services by Brijesh Palta.",
}

const services = [
  {
    title: "App Development",
    description: "Mobile applications for iOS, Android, and cross-platform products, plus practical improvements and bug fixes for existing apps.",
    icon: Smartphone,
    points: ["iOS and Android applications", "Cross-platform mobile development", "Existing app improvements and bug fixing"],
  },
  {
    title: "Website Development",
    description: "Responsive websites and web applications designed around your business goals, content, and customer experience.",
    icon: Globe2,
    points: ["Business and portfolio websites", "Modern responsive websites", "React and web application development"],
  },
  {
    title: "UI/UX Design",
    description: "Clear, modern interfaces for websites and mobile products, with attention to usability across screen sizes.",
    icon: Palette,
    points: ["Website and mobile app UI/UX", "Responsive interface design", "User-focused, clean experiences"],
  },
  {
    title: "Backend & API Development",
    description: "Reliable application foundations, integrations, and APIs that keep your product connected and maintainable.",
    icon: Server,
    points: ["Backend development", "REST API development", "Firebase and database integration"],
  },
  {
    title: "AI Integration & AI Agents",
    description: "Useful AI capabilities integrated into products and workflows, with a focus on practical automation and user value.",
    icon: Bot,
    points: ["AI-powered product features", "AI integrations", "AI agent development and intelligent automation"],
  },
]

const projects = [
  {
    name: "Janak Travels",
    status: "Live",
    type: "Website Development",
    description: "Professional travel and transportation website.",
  },
  {
    name: "BlissFinTrip",
    status: "Live",
    type: "Website Development",
    description: "Live travel website project.",
  },
  {
    name: "BDRY Laundry",
    status: "In Development",
    type: "Mobile Application",
    platforms: "iOS + Android",
    description: "Mobile laundry service application currently under development.",
  },
]

const whatsappLinks = [
  { label: "Chat on WhatsApp", href: "https://wa.me/919033030450" },
  { label: "WhatsApp 2", href: "https://wa.me/919265825526" },
]

export default function FreelancePage() {
  return (
    <div className="pt-24">
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary sm:tracking-[0.35em]">
                  Freelance Development
                </p>
                <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Build something useful, polished, and ready for people.
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  I help businesses and product teams turn ideas into responsive websites, mobile applications, thoughtful interfaces, connected backends, and practical AI-powered features.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappLinks[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 rounded-lg border border-primary bg-primary/10 px-6 py-3.5 font-mono text-sm text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                >
                  <MessageCircle className="h-4 w-4" />
                  Start a Project
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-3 rounded-lg border border-border px-6 py-3.5 font-mono text-sm text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  View Project Experience
                </a>
              </div>
            </div>

            <div className="relative animate-scale-in stagger-2">
              <div className="rounded-xl border border-border bg-card/50 p-6 glass sm:p-8">
                <div className="mb-6 flex items-center gap-3 border-b border-border/50 pb-5">
                  <Code2 className="h-5 w-5 text-primary" />
                  <span className="font-mono text-sm text-foreground">Available for paid projects</span>
                </div>
                <div className="space-y-5">
                  {["Websites and web applications", "Mobile products for iOS and Android", "Product interfaces and integrations"].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 -right-3 rounded-lg border border-primary/40 bg-primary/10 px-4 py-2 font-mono text-xs text-primary sm:-right-5">
                Let&apos;s work together
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/30 px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl space-y-3 sm:mb-14">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary sm:tracking-[0.35em]">Services</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">What I can build</h2>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Focused development support from an initial idea through a reliable, responsive product experience.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <article
                key={service.title}
                className="group rounded-xl border border-border/60 bg-card/40 p-6 glass transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card/70 animate-fade-in-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <service.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-3 text-xl font-semibold tracking-tight">{service.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                <ul className="space-y-2.5">
                  {service.points.map((point) => (
                    <li key={point} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="border-t border-border/30 px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 space-y-3 sm:mb-14">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary sm:tracking-[0.35em]">Project Experience</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Work already in motion</h2>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              A selection of real projects across travel, transportation, and mobile services.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {projects.map((project, index) => (
              <article
                key={project.name}
                className="rounded-xl border border-border/60 bg-card/40 p-6 glass transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card/70 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">{project.type}</p>
                    <h3 className="text-2xl font-semibold tracking-tight">{project.name}</h3>
                  </div>
                  <span className="shrink-0 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
                    {project.status}
                  </span>
                </div>
                <p className="mb-6 min-h-12 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                {project.platforms && (
                  <p className="border-t border-border/50 pt-4 font-mono text-xs text-muted-foreground">
                    Platforms: <span className="text-foreground">{project.platforms}</span>
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/30 px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-4xl rounded-xl border border-primary/30 bg-primary/5 p-8 text-center sm:p-12">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-primary sm:tracking-[0.35em]">Start a conversation</p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Have a project in mind?</h2>
          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-muted-foreground">
            Share what you are building, what you need improved, or where you are stuck. WhatsApp is the quickest way to discuss the next step.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            {whatsappLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary bg-primary/10 px-6 py-3 font-mono text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <MessageCircle className="h-4 w-4" />
                {link.label}
              </a>
            ))}
            <a
              href="mailto:brijeshpalta99@gmail.com"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary/30 px-6 py-3 font-mono text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Mail className="h-4 w-4" />
              Contact Me
            </a>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">brijeshpalta99@gmail.com</p>
        </div>
      </section>
    </div>
  )
}