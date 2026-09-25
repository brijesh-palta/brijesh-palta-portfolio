"use client"

import { Download, ExternalLink, MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"

const fullName = "Brijesh Palta"

export function ResumePageContent() {
  const [displayName, setDisplayName] = useState("")
  const [nameComplete, setNameComplete] = useState(false)

  // Typing animation for name
  useEffect(() => {
    if (!nameComplete && displayName.length < fullName.length) {
      const timeout = setTimeout(() => {
        setDisplayName(fullName.slice(0, displayName.length + 1))
      }, 120)
      return () => clearTimeout(timeout)
    } else if (displayName.length === fullName.length) {
      setNameComplete(true)
    }
  }, [displayName, nameComplete])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-muted-foreground">
                Professional Resume
              </p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
                {displayName}
                {!nameComplete && <span className="animate-pulse ml-1">_</span>}
              </h1>
              <p className="text-xl text-primary font-semibold">Cyber Security | Software Engineering | AI & Machine Learning</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:brijeshpalta99@gmail.com"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <span>brijeshpalta99@gmail.com</span>
              </a>
              <a
                href="https://www.linkedin.com/in/brijesh-palta/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <span>linkedin.com/in/brijesh-palta</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/brijesh-palta"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <span>https://github.com/brijesh-palta</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <a
              href="/brijesh-palta-portfolio/Brijesh_Palta_Resume.txt"
              download="Brijesh_Palta_Resume.txt"
              className="inline-flex items-center gap-2 rounded-lg border border-primary bg-primary/10 px-6 py-3 font-mono text-sm text-primary hover:bg-primary/20 transition-colors"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </a>
            <a
              href="https://wa.me/919033030450"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/30 px-6 py-3 font-mono text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <MessageCircle className="h-4 w-4" />
              Discuss a Project
            </a>
          </div>
        </div>
      </section>

      {/* Resume Content */}
      <section className="px-4 sm:px-6 py-12 sm:py-20 border-t border-border/30">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Professional Summary */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Professional Summary</h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              Master of Cyber Security candidate with hands-on experience in Python development, machine learning, REST API engineering, cloud platforms, and production application security. Strong foundation in software engineering, applied machine learning, cybersecurity, and cloud infrastructure.
            </p>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Education</h2>
            <div className="space-y-6">
              <div className="rounded-lg border border-border/50 bg-card/40 p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold">Master of Cyber Security (Professional)</h3>
                  <span className="font-mono text-xs text-muted-foreground">Jul 2025 - Jan 2027</span>
                </div>
                <p className="text-muted-foreground mb-2">Deakin University, GIFT City, India</p>
                <p className="text-sm text-muted-foreground">WAM: 80.08%</p>
              </div>

              <div className="rounded-lg border border-border/50 bg-card/40 p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold">Bachelor of Technology in ICT</h3>
                  <span className="font-mono text-xs text-muted-foreground">Aug 2022 - May 2025</span>
                </div>
                <p className="text-muted-foreground mb-2">Marwadi University, Rajkot, India</p>
                <p className="text-sm text-muted-foreground">B.Tech - Information & Communication Technology | CGPA: 7.38/10</p>
              </div>

              <div className="rounded-lg border border-border/50 bg-card/40 p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold">Diploma - Information & Communication Technology</h3>
                  <span className="font-mono text-xs text-muted-foreground">Jul 2019 - May 2022</span>
                </div>
                <p className="text-muted-foreground mb-2">Marwadi University, Rajkot, India</p>
                <p className="text-sm text-muted-foreground">CGPA: 8.02/10</p>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Experience</h2>
            <div className="space-y-4">
              {[
                {
                  role: "Junior Team Lead",
                  organization: "Gopher Industries (Industry Capstone - Deakin University)",
                  period: "Nov 2025 - Jan 2026",
                  location: "Australia (Remote)",
                  points: [
                    "Led a team of 4 engineers through sprint planning, task allocation, technical coordination, and delivery tracking.",
                    "Resolved technical blockers through hands-on debugging and structured code reviews.",
                  ],
                },
                {
                  role: "Cyber Security Intern",
                  organization: "CJ Darcl Logistics Ltd.",
                  period: "Jan 2025 - Apr 2025",
                  location: "Gurgaon, Haryana, India",
                  points: [
                    "Designed Python Flask REST APIs for Android, iOS, and React.js applications with authentication and input validation.",
                    "Identified and remediated application vulnerabilities across 3 internal production applications.",
                    "Tested authentication, session management, and input validation using OWASP Top 10 methodology.",
                    "Built a cross-platform Digital Visiting Card application with Kotlin/Java, SwiftUI, QR identity exchange, and Firebase Authentication.",
                  ],
                },
                {
                  role: "Network Engineer Intern",
                  organization: "Impulse Integrated Systems Pvt. Ltd.",
                  period: "Aug 2024 - Nov 2024",
                  location: "Pune, Maharashtra, India",
                  points: [
                    "Configured and maintained Cisco routers and switches in a live production network.",
                    "Investigated routing, latency, and connectivity incidents through structured troubleshooting and packet analysis.",
                    "Delivered LAN and WAN rollouts including VLAN segmentation and site-to-site VPN setup.",
                  ],
                },
              ].map((job) => (
                <article key={job.role} className="rounded-lg border border-border/50 bg-card/40 p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{job.role}</h3>
                      <p className="text-muted-foreground">{job.organization}</p>
                      <p className="text-sm text-muted-foreground">{job.location}</p>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">{job.period}</span>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                    {job.points.map((point) => <li key={point}>• {point}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          {/* Core Competencies */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Core Competencies</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { title: "AI & Machine Learning", skills: "LLMs, DistilBERT, scikit-learn, regression modelling, feature engineering, Pandas, NumPy" },
                { title: "NLP & Information Retrieval", skills: "Text classification, BM25, evidence retrieval, LIME, SHAP, confidence estimation" },
                { title: "Programming & Backend", skills: "Python, SQL, JavaScript, Java, Flask, Django, Node.js, Express.js, REST APIs" },
                { title: "Cloud & Infrastructure", skills: "AWS, S3, EC2, Lambda, IAM, VPC, GuardDuty, KMS, CloudWatch, Docker, Linux" },
                { title: "Application Development", skills: "React.js, Android Kotlin/Java, iOS SwiftUI, Firebase Authentication" },
                { title: "Security Engineering", skills: "Wazuh, Suricata, Zeek, ELK Stack, OWASP Top 10, Burp Suite, Nmap, Wireshark, MITRE ATT&CK" },
              ].map((comp, idx) => (
                <div key={idx} className="rounded-lg border border-border/50 bg-card/40 p-4">
                  <h3 className="font-semibold mb-2">{comp.title}</h3>
                  <p className="text-sm text-muted-foreground">{comp.skills}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Technical Skills</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-border/50 bg-card/40 p-4">
                <p className="font-semibold mb-2">Languages</p>
                <p className="text-sm text-muted-foreground">Python, SQL, JavaScript, Java, Kotlin, Swift</p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/40 p-4">
                <p className="font-semibold mb-2">Cloud Platforms</p>
                <p className="text-sm text-muted-foreground">AWS, S3, EC2, Lambda, IAM, VPC, GuardDuty, KMS, CloudWatch</p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/40 p-4">
                <p className="font-semibold mb-2">Security Tools</p>
                <p className="text-sm text-muted-foreground">Wazuh, Suricata, Zeek, ELK Stack, OWASP, Burp Suite, Nmap, Wireshark</p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/40 p-4">
                <p className="font-semibold mb-2">DevOps & Frameworks</p>
                <p className="text-sm text-muted-foreground">Git, GitHub Actions, VMware, Active Directory, Tableau, Docker, Linux</p>
              </div>
            </div>
          </div>

          {/* Key Projects */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Key Projects</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Explainable Multi-Domain Fact-Checking System with LLM Verification",
                  desc: "Research system combining DistilBERT domain classification, BM25 evidence retrieval, confidence estimation, LIME/SHAP explainability, and an LLM verification layer.",
                },
                {
                  title: "Brijaix - Machine Learning Recommendation System",
                  desc: "Python recommendation engine using scikit-learn, preprocessing, feature engineering, regression modelling, Flask REST API, and React.js.",
                },
                {
                  title: "Binary Mind - Secure Cloud File Sharing Platform",
                  desc: "AWS S3 and Node.js platform with IAM access control, AES-256 encryption at rest, OAuth 2.0, authenticated file operations, and activity logging.",
                },
                {
                  title: "Insider Threat Detection Lab - Corporate Network Simulation",
                  desc: "VMware environment integrating Active Directory, Wazuh, Suricata, Zeek, and ELK, with detection rules mapped to MITRE ATT&CK.",
                },
              ].map((proj, idx) => (
                <div key={idx} className="rounded-lg border border-border/50 bg-card/40 p-4">
                  <h3 className="font-semibold mb-1">{proj.title}</h3>
                  <p className="text-sm text-muted-foreground">{proj.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Workshops */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Workshops & Learning</h2>
            <div className="space-y-3">
              <div className="rounded-lg border border-border/50 bg-card/40 p-4">
                <p className="font-semibold mb-1">IoT Security Workshop</p>
                <p className="text-sm text-muted-foreground">Jan 2026 • Device security testing, vulnerability assessment, IoT architecture</p>
              </div>
              <div className="rounded-lg border border-border/50 bg-card/40 p-4">
                <p className="font-semibold mb-1">Cloud Security Workshop</p>
                <p className="text-sm text-muted-foreground">Feb 2026 • AWS security best practices, IAM, VPC configuration, encryption strategies</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Certifications</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {[
                "AWS Certified AI Practitioner - Amazon Web Services",
                "Neural Networks and Deep Learning - DeepLearning.AI, Coursera",
                "Machine Learning: Regression - Coursera",
                "AWS Academy - Cloud Foundations; Cloud Developing",
                "Cisco - Introduction to Cybersecurity; Cybersecurity Essentials",
                "Certificate of Appreciation - Cyber Security Internship, CJ Darcl Logistics Ltd.",
              ].map((certification) => (
                <div key={certification} className="rounded-lg border border-border/50 bg-card/40 p-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">{certification}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Leadership & Activities</h2>
            <div className="rounded-lg border border-border/50 bg-card/40 p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Student Placement Coordinator</h3>
                  <p className="text-muted-foreground">Deakin University</p>
                </div>
                <span className="font-mono text-xs text-muted-foreground">Nov 2025 - Mar 2026</span>
              </div>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                <li>• Supported employer outreach by researching hiring companies, roles, and selection criteria.</li>
                <li>• Guided students on cloud security, DevSecOps, and software engineering learning paths.</li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-8 text-center space-y-4">
            <p className="text-lg font-semibold">Ready to discuss security opportunities?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:brijeshpalta99@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary bg-primary/10 px-6 py-3 font-mono text-sm text-primary hover:bg-primary/20 transition-colors"
              >
                Send Email
              </a>
              <a
                href="https://www.linkedin.com/in/brijesh-palta/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary/30 px-6 py-3 font-mono text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                Connect on LinkedIn
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
