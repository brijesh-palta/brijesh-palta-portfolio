"use client"

import { useEffect, useState, type FormEvent } from "react"
import { RotateCcw, Send, ShieldCheck, Terminal, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

const storageKey = "security-panel-checklist-v1"

const checks = [
  {
    id: "headers",
    category: "Browser",
    title: "Set security headers at your host or CDN",
    guidance:
      "Start with a Content Security Policy, X-Content-Type-Options: nosniff, Referrer-Policy, and frame-ancestors 'none'. Allow only the script, image, font, and connection sources your app needs. A static React app cannot set response headers itself; configure these where it is hosted.",
  },
  {
    id: "https",
    category: "Browser",
    title: "Use HTTPS everywhere and enable HSTS",
    guidance:
      "Redirect HTTP to HTTPS at the edge. Add Strict-Transport-Security only after HTTPS works across the hostnames you intend to cover; includeSubDomains affects every subdomain.",
  },
  {
    id: "auth",
    category: "Access",
    title: "Protect accounts with MFA and least privilege",
    guidance:
      "Require multi-factor authentication for administrators, prefer passkeys or security keys where available, remove unused accounts, and grant each role only the permissions its work requires.",
  },
  {
    id: "authorization",
    category: "Access",
    title: "Enforce authorization on the server",
    guidance:
      "Check permissions for every protected action and object on the server. Never rely on hidden buttons or client-side route checks; test that one user cannot read or change another user's records.",
  },
  {
    id: "input-output",
    category: "Data",
    title: "Validate inputs and encode output by context",
    guidance:
      "Validate types, lengths, and allowed values at trust boundaries. Use parameterized database queries and context-aware output encoding. Treat uploaded files and third-party responses as untrusted input.",
  },
  {
    id: "secrets",
    category: "Data",
    title: "Keep secrets out of source and browser bundles",
    guidance:
      "Store credentials in a managed secret store or protected server environment variables. Anything prefixed with NEXT_PUBLIC is shipped to browsers. Rotate exposed credentials and scope each secret to the smallest required permissions.",
  },
  {
    id: "dependencies",
    category: "Operations",
    title: "Audit and update dependencies regularly",
    guidance:
      "Commit the lockfile, review dependency changes, run the package manager's audit command in CI, and update vulnerable packages deliberately. Remove packages and capabilities the application no longer uses.",
  },
  {
    id: "recovery",
    category: "Operations",
    title: "Prepare for incidents and recovery",
    guidance:
      "Keep tested backups, centralize useful security logs, define who responds to an incident, and rehearse restoring service. Avoid recording passwords, tokens, or sensitive personal data in logs.",
  },
] as const

const categories = ["All", "Browser", "Access", "Data", "Operations"] as const
type Category = (typeof categories)[number]

function getTerminalReply(prompt: string, completionCount: number) {
  const query = prompt.trim().toLowerCase()

  if (query === "help" || query === "?") {
    return "Ask about site hardening, HTTPS, security headers, accounts, APIs, input handling, uploads, secrets, cloud, networks, dependencies, logging, or incident response. This guide gives general advice only. It does not run commands or scan a target."
  }
  if (query.includes("scan") || query.includes("pentest") || query.includes("penetration test") || query.includes("test my site")) {
    return "This guide cannot scan or test a website. Only assess systems you own or have explicit permission to test. Use an authorized scanner, then verify findings manually."
  }
  if (query.includes("status") || query.includes("progress")) {
    return `You have marked ${completionCount} of ${checks.length} checklist items verified. This is local checklist progress, not a security assessment.`
  }

  const topics = [
    {
      terms: ["content security policy", "csp", "security header", "security headers", "headers"],
      reply: "Configure response headers at your host or CDN. Start with a restrictive Content-Security-Policy, X-Content-Type-Options: nosniff, Referrer-Policy, and frame-ancestors 'none'. Test a CSP in report-only mode first. GitHub Pages ignores the public/_headers file, so use an edge proxy or CDN for headers there.",
    },
    {
      terms: ["https", "tls", "ssl", "certificate", "hsts", "protocol"],
      reply: "Serve the site over HTTPS, redirect HTTP to HTTPS at the host, and renew certificates automatically. Add HSTS only when HTTPS works on every covered hostname. Start without includeSubDomains unless all subdomains support HTTPS.",
    },
    {
      terms: ["api key", "secret", "token", "credential", "password", "private key"],
      reply: "Keep secrets out of source code and browser bundles. Store them in a managed secret store or protected server environment, grant minimum permissions, and rotate any key that may have been exposed. Values prefixed with NEXT_PUBLIC are public to site visitors.",
    },
    {
      terms: ["authentication", "login", "mfa", "multi-factor", "passkey", "session", "cookie", "account"],
      reply: "Use MFA or passkeys for privileged accounts, secure session cookies with Secure, HttpOnly, and SameSite attributes, rotate sessions after login, and rate-limit authentication attempts. Never store plaintext passwords; use a purpose-built password hashing function on the server.",
    },
    {
      terms: ["phishing", "suspicious email", "email security"],
      reply: "Use phishing-resistant MFA for important accounts, verify unexpected requests through a separate trusted channel, and report suspicious messages. For organizations, filter mail, configure SPF, DKIM, and DMARC, and rehearse reporting and account recovery.",
    },
    {
      terms: ["malware", "endpoint", "virus", "ransomware"],
      reply: "Keep operating systems and endpoint protection current, use standard accounts for daily work, restrict untrusted software, and isolate affected devices during an incident. Maintain tested backups that are not writable with everyday credentials.",
    },
    {
      terms: ["container", "docker", "kubernetes", "image hardening"],
      reply: "Use trusted, minimal images, pin and scan dependencies, run containers as non-root, drop unnecessary capabilities, and set resource limits. Do not bake secrets into image layers; restrict cluster permissions and exposed services.",
    },
    {
      terms: ["secure coding", "code review", "threat model", "owasp", "secure development"],
      reply: "Threat-model important data flows, use framework protections, review security-sensitive changes, and add tests for access control and input handling. Use OWASP guidance as a checklist, then verify each control against your application's actual design.",
    },
    {
      terms: ["authorization", "access control", "permission", "role", "least privilege", "idor"],
      reply: "Check authorization on the server for every action and requested object. Apply least privilege, deny by default, and test with separate accounts to confirm users cannot read or change one another's data.",
    },
    {
      terms: ["api", "endpoint", "rest", "graphql"],
      reply: "For APIs, authenticate callers, authorize every operation and object, validate request schemas and sizes, rate-limit by account or client, and return only the fields callers need. Avoid putting credentials in URLs, which are often logged.",
    },
    {
      terms: ["cors", "cross-origin"],
      reply: "Allow only the specific trusted origins your browser client uses. Avoid wildcard origins for credentialed requests, and remember that CORS is a browser rule, not authentication or access control.",
    },
    {
      terms: ["input", "xss", "injection", "sql", "validation", "sanitize", "untrusted"],
      reply: "Validate type, length, and allowed values at trust boundaries. Use parameterized database queries and context-aware output encoding. Avoid inserting untrusted strings as HTML; treat external data as untrusted too.",
    },
    {
      terms: ["upload", "file upload", "attachment"],
      reply: "Restrict upload size and allowed file types, verify file content instead of trusting its extension, rename files, and store them outside executable web paths. Scan uploads where appropriate and require authorization to retrieve them.",
    },
    {
      terms: ["dependency", "dependencies", "package", "npm", "pnpm", "supply chain", "lockfile", "audit"],
      reply: "Commit and review the lockfile, run dependency audits in CI, update vulnerable packages, and remove unused dependencies. Pin trusted CI actions and review changes that add install scripts or new permissions.",
    },
    {
      terms: ["cloud", "aws", "iam", "vpc", "s3"],
      reply: "In cloud environments, use short-lived roles and least-privilege policies, keep data stores private, encrypt sensitive data, enable audit logs, and alert on unusual access. Review public exposure and account permissions regularly.",
    },
    {
      terms: ["network", "firewall", "segmentation", "port"],
      reply: "Expose only required services. Restrict inbound and outbound traffic with firewall rules, separate systems by trust level, remove unused listeners, and review network changes against expected traffic flows.",
    },
    {
      terms: ["rate limit", "rate-limit", "ddos", "denial of service", "dos"],
      reply: "Set request and payload limits at the edge and application, apply rate limits to costly or sensitive operations, and use your host's DDoS protections. Return clear retry guidance and monitor for traffic spikes.",
    },
    {
      terms: ["encryption", "encrypt", "data at rest", "data in transit", "kms"],
      reply: "Use modern TLS for data in transit and managed encryption for sensitive data at rest. Limit access to encryption keys, define rotation and recovery procedures, and do not treat encryption as a substitute for authorization.",
    },
    {
      terms: ["privacy", "personal data", "data protection", "retention"],
      reply: "Collect only the personal data the service needs, restrict access, set retention and deletion rules, and explain how data is used. Protect exports and backups too, and avoid putting personal data or credentials in logs.",
    },
    {
      terms: ["log", "logging", "monitor", "monitoring", "alert", "incident", "breach"],
      reply: "Collect authentication, access, and administrative events centrally. Alert on actionable patterns, restrict log access, set retention deliberately, and redact passwords, tokens, and sensitive personal data. Write down who responds to an alert.",
    },
    {
      terms: ["backup", "recovery", "restore", "ransomware"],
      reply: "Keep backups separate from production credentials, protect them from alteration, and test restoring them. Document recovery priorities and practice the steps before an incident occurs.",
    },
  ]

  const matchedTopic = topics.find((topic) => topic.terms.some((term) => query.includes(term)))
  if (matchedTopic) return matchedTopic.reply

  if ((query.includes("secure") || query.includes("security")) && /\b(site|website|app|application|portfolio)\b/.test(query)) {
    return "For this static portfolio: keep dependencies patched, avoid putting secrets in browser code, and serve the site only over HTTPS. Configure CSP and other response headers at a CDN or edge proxy because GitHub Pages ignores public/_headers. Review third-party scripts and links, keep the Pages workflow locked to pnpm, and monitor dependency-audit results. This guide cannot verify the live deployment."
  }

  const securityTerms = ["security", "secure", "protect", "vulnerab", "threat", "attack", "risk", "hack", "exploit", "privacy", "phish", "malware", "virus", "endpoint", "container", "docker", "kubernetes", "identity", "compliance", "owasp", "zero trust"]
  if (!securityTerms.some((term) => query.includes(term))) {
    return "This terminal answers security questions only. Ask about securing a site, HTTPS, APIs, accounts, cloud, code, or incident response. Type 'help' for topics."
  }

  return "For that security question, start by identifying what data and systems are at risk, who can access them, and how you would detect misuse. Then apply least privilege, reduce exposed services, validate inputs, keep software updated, and test the controls. Ask about a specific area for more detail."
}

export function SecurityPanel() {
  const [completed, setCompleted] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<Category>("All")
  const [storageReady, setStorageReady] = useState(false)
  const [terminalInput, setTerminalInput] = useState("")
  const [terminalMessages, setTerminalMessages] = useState<Array<{ prompt: string; reply: string }>>([])

  useEffect(() => {
    try {
      const stored: unknown = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]")
      if (Array.isArray(stored)) {
        setCompleted(
          stored.filter(
            (id): id is string => typeof id === "string" && checks.some((check) => check.id === id),
          ),
        )
      }
    } catch {
      setCompleted([])
    } finally {
      setStorageReady(true)
    }
  }, [])

  useEffect(() => {
    if (!storageReady) return

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(completed))
    } catch {
      // The checklist remains usable when browser storage is unavailable.
    }
  }, [completed, storageReady])

  const visibleChecks = checks.filter(
    (check) => activeCategory === "All" || check.category === activeCategory,
  )
  const completionCount = checks.filter((check) => completed.includes(check.id)).length
  const progress = Math.round((completionCount / checks.length) * 100)

  const toggleCheck = (id: string) => {
    setCompleted((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  const submitTerminalPrompt = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const prompt = terminalInput.trim().slice(0, 160)
    if (!prompt) return

    if (prompt.toLowerCase() === "clear") {
      setTerminalMessages([])
    } else {
      setTerminalMessages((current) => [
        ...current,
        { prompt, reply: getTerminalReply(prompt, completionCount) },
      ].slice(-30))
    }
    setTerminalInput("")
  }

  return (
    <section className="px-4 py-28 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 border-b border-border/40 pb-8 sm:mb-12">
          <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase text-primary">
            <ShieldCheck className="h-4 w-4" />
            Security practice
          </div>
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">Security panel</h1>
          <p className="max-w-2xl leading-relaxed text-muted-foreground">
            Work through practical safeguards for applications you build or maintain. Mark steps as you verify them.
          </p>
        </div>

        <div className="mb-8 border-l-2 border-amber-500 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
          This is a self-assessment checklist, not a scanner. It does not inspect this website or verify your setup.
          Your checked items stay in this browser and are not sent to a server.
        </div>

        <section
          aria-labelledby="security-terminal-title"
          className="mb-12 overflow-hidden rounded-lg border border-emerald-500/30 bg-[#08110e] shadow-lg shadow-black/10"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-500/20 px-4 py-3 sm:px-5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-emerald-500/30 bg-emerald-400/10 font-mono text-xs font-bold text-emerald-300">
                BP
              </span>
              <div className="min-w-0">
                <h2 id="security-terminal-title" className="flex items-center gap-2 font-mono text-sm text-emerald-100">
                  <Terminal className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span className="truncate">Security Q&amp;A</span>
                </h2>
                <p className="mt-1 font-mono text-[10px] text-emerald-500/80">SECURITY QUESTIONS ONLY · LOCAL GUIDANCE</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setTerminalMessages([])}
              disabled={terminalMessages.length === 0}
              className="inline-flex items-center gap-1.5 font-mono text-[10px] text-emerald-300/70 transition-colors hover:text-emerald-100 disabled:cursor-not-allowed disabled:opacity-35"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear
            </button>
          </div>

          <div className="max-h-80 min-h-40 space-y-4 overflow-y-auto p-4 font-mono text-xs leading-relaxed sm:min-h-48 sm:p-5 sm:text-sm">
            <p className="text-emerald-200/70">
              <span className="text-emerald-400">guide@brijesh:~$</span> Security questions only. This guide does not run commands or scan sites.
            </p>
            <div aria-live="polite" aria-relevant="additions" className="space-y-4">
              {terminalMessages.map((message, index) => (
                <div key={`${index}-${message.prompt}`} className="space-y-2 break-words">
                  <p className="text-emerald-300">
                    <span className="text-emerald-500">$</span> {message.prompt}
                  </p>
                  <p className="whitespace-pre-wrap text-slate-200">
                    <span className="text-emerald-400">guide</span>› {message.reply}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={submitTerminalPrompt} className="border-t border-emerald-500/20 p-3 sm:p-4">
            <label htmlFor="security-terminal-input" className="sr-only">Ask a security question</label>
            <div className="flex min-w-0 items-center gap-2 rounded border border-emerald-500/25 bg-black/30 px-3 focus-within:border-emerald-400/60 focus-within:ring-1 focus-within:ring-emerald-400/40">
              <span aria-hidden="true" className="shrink-0 font-mono text-sm text-emerald-400">&gt;_</span>
              <input
                id="security-terminal-input"
                value={terminalInput}
                onChange={(event) => setTerminalInput(event.target.value)}
                maxLength={160}
                autoComplete="off"
                spellCheck={false}
                placeholder="Ask a security question..."
                className="h-11 min-w-0 flex-1 bg-transparent font-mono text-xs text-emerald-100 outline-none placeholder:text-emerald-100/35 sm:text-sm"
              />
              <button
                type="submit"
                disabled={!terminalInput.trim()}
                aria-label="Send question"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded text-emerald-300 transition-colors hover:bg-emerald-400/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-35"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {["secure my site", "HTTPS setup", "API security", "protect API keys", "scan safely"].map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => setTerminalInput(prompt)}
                  className="font-mono text-[10px] text-emerald-300/60 transition-colors hover:text-emerald-200"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </form>
        </section>

        <div className="mb-8 flex flex-col gap-4 border-b border-border/40 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="w-full max-w-xl">
            <div className="mb-2 flex items-center justify-between gap-4 text-sm">
              <span className="font-medium">Your review</span>
              <span aria-live="polite" className="font-mono text-xs text-muted-foreground">
                {completionCount} of {checks.length} verified
              </span>
            </div>
            <div
              role="progressbar"
              aria-label="Checklist progress"
              aria-valuemin={0}
              aria-valuemax={checks.length}
              aria-valuenow={completionCount}
              className="h-2 overflow-hidden bg-secondary"
            >
              <div
                className="h-full bg-primary transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => setCompleted([])}
            disabled={completionCount === 0}
            className="inline-flex items-center gap-2 self-start font-mono text-xs text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 sm:self-auto"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset checklist
          </button>
        </div>

        <div className="mb-5 flex flex-wrap gap-2" aria-label="Filter checklist by category">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "border px-3 py-2 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                activeCategory === category
                  ? "border-primary/60 bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="divide-y divide-border/40 border-y border-border/40">
          {visibleChecks.map((check) => {
            const isComplete = completed.includes(check.id)

            return (
              <article key={check.id} className="py-5 sm:py-6">
                <div className="flex items-start gap-4">
                  <input
                    id={`security-check-${check.id}`}
                    type="checkbox"
                    checked={isComplete}
                    onChange={() => toggleCheck(check.id)}
                    className="mt-1 h-4 w-4 shrink-0 accent-primary"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 font-mono text-[10px] uppercase text-primary">{check.category}</div>
                    <label
                      htmlFor={`security-check-${check.id}`}
                      className={cn(
                        "cursor-pointer font-medium transition-colors",
                        isComplete && "text-muted-foreground line-through",
                      )}
                    >
                      {check.title}
                    </label>
                    <details className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      <summary className="w-fit cursor-pointer font-mono text-xs text-foreground/80 hover:text-primary">
                        Practical steps
                      </summary>
                      <p className="mt-3 max-w-3xl">{check.guidance}</p>
                    </details>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}