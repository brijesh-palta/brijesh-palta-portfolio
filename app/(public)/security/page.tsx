import type { Metadata } from "next"
import { SecurityPanel } from "@/components/public/security/security-panel"

export const metadata: Metadata = {
  title: "Security Panel",
  description: "An interactive, browser-local checklist for improving application security.",
}

export default function SecurityPage() {
  return <SecurityPanel />
}