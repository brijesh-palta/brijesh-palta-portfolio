"use client"

import { useMemo, useState, type FormEvent } from "react"
import { ArrowRight, Search, Send, ShieldCheck, Sparkles, Terminal, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  popularSecurityTopics,
  securityCategories,
  securityKnowledgeEntries,
} from "@/data/security-knowledge"

const difficultyFilters = ["All", "Beginner", "Intermediate", "Advanced"] as const

type DifficultyFilter = (typeof difficultyFilters)[number]

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()

function findBestMatch(query: string) {
  const input = normalizeText(query)
  if (!input) return securityKnowledgeEntries[0]

  const exactMatch = securityKnowledgeEntries.find((entry) => {
    if (normalizeText(entry.question) === input) return true
    return entry.keywords.some((keyword) => normalizeText(keyword) === input)
  })
  if (exactMatch) return exactMatch

  const tokens = input.split(" ").filter(Boolean)
  const scored = securityKnowledgeEntries
    .map((entry) => {
      const haystack = [
        entry.question,
        entry.category,
        ...entry.keywords,
        ...entry.relatedQuestions,
        entry.answer.whatIsIt,
        entry.answer.whyItMatters,
      ].join(" ")
      const normalizedHaystack = normalizeText(haystack)

      let score = 0
      for (const token of tokens) {
        if (normalizedHaystack.includes(token)) score += 2
        if (normalizeText(entry.question).includes(token)) score += 4
        if (entry.keywords.some((keyword) => normalizeText(keyword).includes(token))) score += 3
      }

      const synonymBoost =
        (input.includes("secure") || input.includes("security")) && entry.category.toLowerCase().includes("security")
          ? 4
          : 0
      const categoryBoost = input.includes(entry.category.toLowerCase().replace(/\s+/g, "")) ? 5 : 0

      return { entry, score: score + synonymBoost + categoryBoost }
    })
    .sort((a, b) => b.score - a.score)

  const best = scored[0]
  if (best && best.score > 0) return best.entry

  return securityKnowledgeEntries[0]
}

function getSuggestedQuestions(prompt: string): string[] {
  const cleaned = normalizeText(prompt)
  if (!cleaned) return popularSecurityTopics.slice(0, 6)

  const allQuestions = securityKnowledgeEntries.map((entry) => entry.question)
  const scored = allQuestions
    .map((question) => {
      const normalizedQuestion = normalizeText(question)
      let score = 0
      for (const term of cleaned.split(" ")) {
        if (!term) continue
        if (normalizedQuestion.includes(term)) score += 2
      }
      return { question, score }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)

  return scored.length > 0 ? scored.map((item) => item.question) : popularSecurityTopics.slice(0, 6)
}

export function SecurityPanel() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeDifficulty, setActiveDifficulty] = useState<DifficultyFilter>("All")
  const [selectedEntryId, setSelectedEntryId] = useState(securityKnowledgeEntries[0].id)
  const [terminalInput, setTerminalInput] = useState("")
  const [terminalMessages, setTerminalMessages] = useState<Array<{ prompt: string; reply: string }>>([
    {
      prompt: "help",
      reply:
        "Ask about secure coding, APIs, cloud, network, incident response, Kubernetes, AI security, Windows, Linux, or identity. This tool stays local and educational; it does not scan devices or systems.",
    },
  ])

  const filteredEntries = useMemo(() => {
    const normalizedQuery = normalizeText(searchQuery)

    return securityKnowledgeEntries.filter((entry) => {
      const matchesCategory = activeCategory === "All" || entry.category === activeCategory
      const matchesDifficulty = activeDifficulty === "All" || entry.difficulty === activeDifficulty
      const matchesQuery =
        !normalizedQuery ||
        [
          entry.question,
          entry.category,
          ...entry.keywords,
          ...entry.relatedQuestions,
          entry.answer.whatIsIt,
          entry.answer.whyItMatters,
          entry.answer.example,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery)

      return matchesCategory && matchesDifficulty && matchesQuery
    })
  }, [searchQuery, activeCategory, activeDifficulty])

  const selectedEntry =
    filteredEntries.find((entry) => entry.id === selectedEntryId) ??
    filteredEntries[0] ??
    securityKnowledgeEntries[0]

  const suggestionList = useMemo(() => getSuggestedQuestions(searchQuery), [searchQuery])

  const runQuery = (prompt: string) => {
    const trimmedPrompt = prompt.trim()
    if (!trimmedPrompt) return

    const matchedEntry = findBestMatch(trimmedPrompt)
    setSelectedEntryId(matchedEntry.id)
    setSearchQuery(trimmedPrompt)

    const reply = `${matchedEntry.question} — ${matchedEntry.category} (${matchedEntry.difficulty})`
    setTerminalMessages((current) => [...current, { prompt: trimmedPrompt, reply }].slice(-18))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const prompt = terminalInput.trim().slice(0, 160)
    if (!prompt) return

    if (prompt.toLowerCase() === "clear") {
      setTerminalMessages([])
      setTerminalInput("")
      return
    }

    runQuery(prompt)
    setTerminalInput("")
  }

  const handleSearchSelection = (question: string) => {
    const matchedEntry = findBestMatch(question)
    setSelectedEntryId(matchedEntry.id)
    setSearchQuery(question)
  }

  return (
    <section className="px-4 py-28 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 border-b border-border/40 pb-8">
          <div className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-300">
            <ShieldCheck className="h-4 w-4" />
            BP &gt; SECURITY KNOWLEDGE TERMINAL
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">Cybersecurity Q&amp;A Knowledge Base</h1>
          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
            A local, educational security guidance terminal covering web, mobile, cloud, identity, DevSecOps, SOC, DFIR,
            AI security, governance, and secure engineering practices. It does not inspect devices, websites, or user systems.
          </p>
        </div>

        <div className="mb-8 border-l-2 border-emerald-500/60 bg-emerald-500/5 px-4 py-3 text-sm text-muted-foreground">
          This is a defensive knowledge base for security education only. It does not run commands, scan arbitrary targets, or collect sensitive user data.
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section
            aria-labelledby="security-terminal-title"
            className="overflow-hidden rounded-lg border border-emerald-500/30 bg-[#08110e] shadow-[0_0_0_1px_rgba(52,211,153,0.12)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-500/20 px-4 py-3 sm:px-5">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-emerald-500/30 bg-emerald-400/10 font-mono text-xs font-bold text-emerald-300">
                  BP
                </span>
                <div className="min-w-0">
                  <h2 id="security-terminal-title" className="flex items-center gap-2 font-mono text-sm text-emerald-100">
                    <Terminal className="h-4 w-4 shrink-0 text-emerald-400" />
                    <span className="truncate">guide@brijesh:~$</span>
                  </h2>
                  <p className="mt-1 font-mono text-[10px] text-emerald-500/80">LOCAL SECURITY GUIDANCE · EDUCATIONAL ONLY</p>
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

            <div className="max-h-[22rem] min-h-[18rem] space-y-4 overflow-y-auto p-4 font-mono text-xs leading-relaxed sm:p-5 sm:text-sm">
              <p className="text-emerald-200/70">
                <span className="text-emerald-400">guide@brijesh:~$</span> Security questions only. No device scans, exploit tools, or credential theft.
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

            <form onSubmit={handleSubmit} className="border-t border-emerald-500/20 p-3 sm:p-4">
              <label htmlFor="security-terminal-input" className="sr-only">
                Ask a cybersecurity question
              </label>
              <div className="flex min-w-0 items-center gap-2 rounded border border-emerald-500/25 bg-black/30 px-3 focus-within:border-emerald-400/60 focus-within:ring-1 focus-within:ring-emerald-400/40">
                <span aria-hidden="true" className="shrink-0 font-mono text-sm text-emerald-400">
                  &gt;_
                </span>
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
                {[
                  "what is SQL injection",
                  "how do I protect an API",
                  "how do I secure AWS",
                  "what is zero trust",
                  "how should I respond to ransomware",
                ].map((prompt) => (
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

          <aside className="rounded-lg border border-emerald-500/20 bg-background/50 p-4 shadow-inner shadow-emerald-500/5">
            <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300">
              <Sparkles className="h-4 w-4" />
              Suggested topics
            </div>

            <div className="space-y-2">
              {suggestionList.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => handleSearchSelection(question)}
                  className="flex w-full items-center justify-between gap-2 rounded border border-border/60 bg-muted/40 px-3 py-2 text-left text-sm transition-colors hover:border-emerald-500/40 hover:text-emerald-200"
                >
                  <span className="truncate">{question}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-emerald-400" />
                </button>
              ))}
            </div>

            <div className="mt-6 rounded border border-border/60 bg-emerald-500/5 p-3 font-mono text-[10px] text-emerald-200/80">
              Search by topic, category, or exact question. Results are local and defensive.
            </div>
          </aside>
        </div>

        <div className="mt-8 rounded-lg border border-border/50 bg-card/50 p-4">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-400" />
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search the knowledge base..."
                className="h-11 w-full rounded border border-emerald-500/20 bg-background pl-10 pr-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {difficultyFilters.map((difficulty) => (
                <button
                  key={difficulty}
                  type="button"
                  onClick={() => setActiveDifficulty(difficulty)}
                  className={cn(
                    "rounded border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors",
                    activeDifficulty === difficulty
                      ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-200"
                      : "border-border/60 text-muted-foreground hover:text-foreground",
                  )}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {['All', ...securityCategories].map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "rounded border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors",
                  activeCategory === category
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-200"
                    : "border-border/60 text-muted-foreground hover:text-foreground",
                )}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mb-4 text-sm text-muted-foreground">
            Showing {filteredEntries.length} matched security topics.
          </div>

          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex max-h-[32rem] flex-col gap-2 overflow-y-auto pr-1">
              {filteredEntries.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => setSelectedEntryId(entry.id)}
                  className={cn(
                    "rounded border p-3 text-left transition-colors",
                    selectedEntry.id === entry.id
                      ? "border-emerald-500/50 bg-emerald-500/10"
                      : "border-border/50 bg-background/60 hover:border-emerald-500/30",
                  )}
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-300">{entry.category}</span>
                    <span className="rounded border border-emerald-500/30 bg-emerald-500/5 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-200">
                      {entry.difficulty}
                    </span>
                  </div>
                  <div className="text-sm font-medium leading-relaxed text-foreground">{entry.question}</div>
                </button>
              ))}
            </div>

            <article className="rounded border border-emerald-500/20 bg-[#08110e] p-5 shadow-inner shadow-emerald-500/5">
              {selectedEntry && (
                <>
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-emerald-300">{selectedEntry.category}</div>
                      <h3 className="mt-2 text-2xl font-semibold leading-tight text-emerald-50">{selectedEntry.question}</h3>
                    </div>
                    <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-200">
                      {selectedEntry.difficulty}
                    </span>
                  </div>

                  <div className="space-y-5 text-sm leading-relaxed text-slate-200">
                    <div>
                      <h4 className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-300">What is it?</h4>
                      <p>{selectedEntry.answer.whatIsIt}</p>
                    </div>

                    <div>
                      <h4 className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-300">Why does it matter?</h4>
                      <p>{selectedEntry.answer.whyItMatters}</p>
                    </div>

                    <div>
                      <h4 className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-300">Example</h4>
                      <p>{selectedEntry.answer.example}</p>
                    </div>

                    <div>
                      <h4 className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-300">How to detect it</h4>
                      <p>{selectedEntry.answer.howToDetectIt}</p>
                    </div>

                    <div>
                      <h4 className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-300">How to prevent it</h4>
                      <p>{selectedEntry.answer.howToPreventIt}</p>
                    </div>

                    <div>
                      <h4 className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-300">Best practices</h4>
                      <ul className="list-inside list-disc space-y-1 text-slate-200">
                        {selectedEntry.answer.bestPractices.map((practice) => (
                          <li key={practice}>{practice}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-300">Related topics</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedEntry.relatedQuestions.map((relatedQuestion) => {
                          const relativeEntry = securityKnowledgeEntries.find((entry) => entry.id === relatedQuestion)
                          const label = relativeEntry ? relativeEntry.question : relatedQuestion

                          return (
                            <button
                              key={relatedQuestion}
                              type="button"
                              onClick={() => {
                                const entry = securityKnowledgeEntries.find((item) => item.id === relatedQuestion)
                                if (entry) {
                                  setSelectedEntryId(entry.id)
                                  setSearchQuery(entry.question)
                                }
                              }}
                              className="rounded border border-emerald-500/25 bg-emerald-500/5 px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-200 transition-colors hover:border-emerald-500/40 hover:text-emerald-100"
                            >
                              {label}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}