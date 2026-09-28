import type { Metadata } from "next"
import { SecurityPanel } from "@/components/public/security/security-panel"

export const metadata: Metadata = {
  title: "BP > Security Knowledge Terminal",
  description: "A local cybersecurity knowledge base and Q&A terminal covering secure engineering, cloud, APIs, mobile, AI, and incident response.",
}

export default function SecurityPage() {
  return <SecurityPanel />
}