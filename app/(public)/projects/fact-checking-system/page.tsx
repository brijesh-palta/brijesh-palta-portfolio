import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Explainable Multi-Domain Fact-Checking Research",
  description:
    "Thesis research on multi-domain claim routing, evidence retrieval, confidence estimation, explainability, and robustness.",
}

const stages = [
  { number: "01", name: "Claim guard", detail: "Preprocessing and adversarial sanity checks." },
  { number: "02", name: "Domain routing", detail: "DistilBERT assigns a claim to one of seven domains." },
  { number: "03", name: "Evidence retrieval", detail: "BM25 searches the evidence corpus for relevant passages." },
  { number: "04", name: "Veracity prediction", detail: "The model predicts TRUE, FALSE, or NEI and estimates confidence." },
  { number: "05", name: "Explanation", detail: "LIME and SHAP show which features influenced the prediction." },
]

const domains = ["Politics", "Healthcare", "Finance", "Journalism", "Social media", "General", "Cybersecurity"]

export default function FactCheckingResearchPage() {
  return (
    <article className="px-4 pb-20 pt-28 sm:px-6 sm:pb-28 sm:pt-32">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/projects"
          className="mb-10 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>

        <header className="max-w-4xl border-b border-border/40 pb-10 sm:pb-12">
          <p className="mb-4 font-mono text-xs uppercase text-primary">Thesis research · 2026 · Deakin University</p>
          <h1 className="mb-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            An Explainable Multi-Domain Fact-Checking System
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Research into confidence estimation and selective large-language-model verification across seven claim domains.
            The system predicts TRUE, FALSE, or NEI (Not Enough Information), retrieves evidence, and exposes model
            behavior for evaluation.
          </p>
          <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-mono text-xs uppercase text-muted-foreground">Candidate</dt>
              <dd className="mt-1 font-medium">Brijesh Palta</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase text-muted-foreground">Supervisor</dt>
              <dd className="mt-1 font-medium">Prof. Ram Krishn Mishra, Deakin University</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase text-muted-foreground">Program</dt>
              <dd className="mt-1 font-medium">Master of Cyber Security (Professional)</dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase text-muted-foreground">Units</dt>
              <dd className="mt-1 font-medium">SIT723 / SIT792</dd>
            </div>
          </dl>
        </header>

        <section aria-labelledby="corpus-title" className="border-b border-border/40 py-10 sm:py-12">
          <p className="mb-3 font-mono text-xs uppercase text-primary">Corpus engineering</p>
          <h2 id="corpus-title" className="mb-6 text-2xl font-semibold sm:text-3xl">From eight benchmarks to a controlled evaluation</h2>
          <dl className="grid grid-cols-2 gap-px border border-border/40 bg-border/40 sm:grid-cols-4">
            {[
              ["8", "benchmark datasets"],
              ["~865k", "raw records"],
              ["383,898", "cleaned records"],
              ["65,427", "balanced claims"],
            ].map(([value, label]) => (
              <div key={label} className="bg-background p-4 sm:p-5">
                <dd className="text-2xl font-semibold sm:text-3xl">{value}</dd>
                <dt className="mt-1 font-mono text-[10px] uppercase text-muted-foreground sm:text-xs">{label}</dt>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            The balanced set was split into 45,799 training claims, 9,814 validation claims, and 9,814 held-out test claims.
            The deck reports seven domains: {domains.join(", ")}.
          </p>
        </section>

        <section aria-labelledby="pipeline-title" className="border-b border-border/40 py-10 sm:py-12">
          <p className="mb-3 font-mono text-xs uppercase text-primary">System design</p>
          <h2 id="pipeline-title" className="mb-6 text-2xl font-semibold sm:text-3xl">A staged verification pipeline</h2>
          <ol className="grid gap-0 border-y border-border/40 sm:grid-cols-2 lg:grid-cols-5">
            {stages.map((stage) => (
              <li key={stage.number} className="border-b border-border/40 py-5 sm:px-4 lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0">
                <p className="mb-4 font-mono text-xs text-primary">STAGE {stage.number}</p>
                <h3 className="mb-2 text-lg font-semibold">{stage.name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{stage.detail}</p>
              </li>
            ))}
          </ol>
          <p className="mt-5 max-w-4xl text-sm leading-relaxed text-muted-foreground">
            An external LLM is a selective second opinion for low-confidence cases, not the primary verifier. The deck
            does not report standalone LLM accuracy or F1.
          </p>
        </section>

        <section aria-labelledby="findings-title" className="border-b border-border/40 py-10 sm:py-12">
          <p className="mb-3 font-mono text-xs uppercase text-primary">Evaluation findings</p>
          <h2 id="findings-title" className="mb-3 text-2xl font-semibold sm:text-3xl">What the reported experiments show</h2>
          <p className="mb-7 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Four research questions examined domain routing, evidence impact, explanation behavior, and adversarial fragility.
          </p>
          <div className="divide-y divide-border/40 border-y border-border/40">
            <section className="grid gap-3 py-5 sm:grid-cols-[10rem_1fr] sm:gap-8">
              <h3 className="font-mono text-xs uppercase text-primary">RQ1 · Routing</h3>
              <div>
                <p className="font-medium">TF-IDF reached 0.86 test macro-F1 for domain classification.</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">DistilBERT reached 0.94 macro-F1 on validation data. These scores use different splits and should not be compared directly.</p>
              </div>
            </section>
            <section className="grid gap-3 py-5 sm:grid-cols-[10rem_1fr] sm:gap-8">
              <h3 className="font-mono text-xs uppercase text-primary">RQ2 · Evidence</h3>
              <div>
                <p className="font-medium">Claim-only accuracy was 0.576; appending retrieved text reduced accuracy.</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">BM25 Recall@5 was 0.81, but retrieving relevant passages did not make raw text concatenation helpful to the classifier.</p>
              </div>
            </section>
            <section className="grid gap-3 py-5 sm:grid-cols-[10rem_1fr] sm:gap-8">
              <h3 className="font-mono text-xs uppercase text-primary">RQ3 · Explanations</h3>
              <div>
                <p className="font-medium">Removing the highest-attributed tokens changed 29.6% of verdicts.</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">The mean confidence drop was 0.124. This measures sensitivity to features, not whether a claim is true.</p>
              </div>
            </section>
            <section className="grid gap-3 py-5 sm:grid-cols-[10rem_1fr] sm:gap-8">
              <h3 className="font-mono text-xs uppercase text-primary">RQ4 · Robustness</h3>
              <div>
                <p className="font-medium">The overall verdict flip rate was 13.7%; the cybersecurity subset was about 4%.</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Tests covered character, spacing, and synonym changes. Fluent paraphrase attacks were not evaluated.</p>
              </div>
            </section>
          </div>
        </section>

        <section aria-labelledby="limits-title" className="grid gap-10 py-10 sm:py-12 lg:grid-cols-2">
          <div>
            <p className="mb-3 font-mono text-xs uppercase text-primary">Scope and limitations</p>
            <h2 id="limits-title" className="mb-5 text-2xl font-semibold sm:text-3xl">A research prototype, not a production fact-checker</h2>
            <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li>The veracity model is linear and feature-based; no fine-tuned transformer veracity model was evaluated.</li>
              <li>Source credibility weights are heuristic, and raw BM25 text concatenation added noise.</li>
              <li>Adversarial tests use simple perturbations; fluent paraphrasing remains future work.</li>
              <li>The LLM is a fallback opinion. Its independent accuracy was not measured.</li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-mono text-xs uppercase text-primary">Next experiments</p>
            <h2 className="mb-5 text-2xl font-semibold sm:text-3xl">Where the work can go next</h2>
            <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li>Fine-tune transformer veracity models and calibrate confidence across domains.</li>
              <li>Test dense retrieval and explicit natural-language-inference entailment.</li>
              <li>Learn source-credibility weights instead of relying on heuristics.</li>
              <li>Evaluate fluent paraphrases and compare LLM judgments with human fact-checkers.</li>
            </ul>
          </div>
        </section>
      </div>
    </article>
  )
}