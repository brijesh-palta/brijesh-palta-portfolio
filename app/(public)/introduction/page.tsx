import { Code2, Layers, FileText, Zap, Shield, Globe } from "lucide-react";

export default function IntroductionPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground">
                Welcome to Security Lab
              </p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
                Where Security Meets{" "}
                <span className="bg-gradient-to-l from-primary/50 to-accent text-transparent bg-clip-text">
                  Innovation
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-3xl">
              A digital security laboratory and professional portfolio showcasing cloud security expertise, DevSecOps practices, and secure system architecture. Building with security-first principles in every project.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="rounded border border-border/50 bg-card/50 p-6 sm:p-10 backdrop-blur-sm space-y-8">
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">
                About This Space
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                A Security Engineer&apos;s Research Lab
              </h2>
            </div>

            <div className="space-y-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
              <p>
                This security lab showcases hands-on experience in cloud architecture, threat detection, and DevSecOps automation. It represents a commitment to building secure, resilient systems through practical implementation and continuous learning.
              </p>

              <p>
                With expertise spanning AWS security, SIEM integration, network defense, and secure application development, this portfolio documents real-world security challenges and innovative solutions. Every project reflects a security-first mindset and defense-in-depth architecture principles.
              </p>

              <p>
                The work here demonstrates collaboration with security teams, vulnerability assessment expertise, and the ability to implement security controls across infrastructure and application layers. Always learning, always improving security posture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 space-y-4 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary">
              Security Expertise
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built for Defense
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Shield,
                title: "Cloud Security",
                description:
                  "AWS security architecture, IAM policies, encryption implementation, and defense-in-depth strategies for cloud infrastructure.",
              },
              {
                icon: Layers,
                title: "DevSecOps",
                description:
                  "Automated security in CI/CD pipelines, SAST/DAST integration, and secure artifact management throughout development.",
              },
              {
                icon: FileText,
                title: "Documentation",
                description:
                  "Detailed security findings, threat analysis reports, and technical documentation of vulnerability assessments and remediations.",
              },
              {
                icon: Zap,
                title: "Threat Detection",
                description:
                  "SIEM implementation, behavioral anomaly analysis, and real-time threat monitoring with Wazuh and ELK Stack.",
              },
              {
                icon: Code2,
                title: "Secure Development",
                description:
                  "Secure coding practices, application security testing, OWASP Top 10 awareness, and vulnerability remediation.",
              },
              {
                icon: Globe,
                title: "Network Security",
                description:
                  "Network architecture, firewall configuration, IDS/IPS systems, and packet analysis for threat identification.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group rounded border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-card/80"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded border border-primary/30 bg-primary/10 text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-mono text-sm font-semibold uppercase tracking-wider text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
