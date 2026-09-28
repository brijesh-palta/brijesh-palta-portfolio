"use client"

import { useEffect, type ReactNode } from "react"

interface SecurityProviderProps {
  children: ReactNode
}

const isProduction = process.env.NODE_ENV === "production"

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false

  return (
    target.isContentEditable ||
    target.closest(
      "input, textarea, select, [contenteditable]:not([contenteditable='false']), [role='textbox'], [data-allow-inspection-shortcuts]",
    ) !== null
  )
}

function handleInspectionShortcut(event: KeyboardEvent) {
  if (isEditableTarget(event.target)) return

  const key = event.key.toLowerCase()
  const devToolsKey = ["i", "j", "c"].includes(key)
  const functionKey = key === "f12"
  const viewSource = event.ctrlKey && key === "u" && !event.shiftKey && !event.altKey
  const windowsDevTools = event.ctrlKey && event.shiftKey && !event.altKey && devToolsKey
  const macDevTools = event.metaKey && event.altKey && !event.ctrlKey && !event.shiftKey && devToolsKey

  if (functionKey || viewSource || windowsDevTools || macDevTools) {
    event.preventDefault()
  }
}

export function SecurityProvider({ children }: SecurityProviderProps) {
  useEffect(() => {
    if (!isProduction) return

    window.addEventListener("keydown", handleInspectionShortcut, true)
    return () => window.removeEventListener("keydown", handleInspectionShortcut, true)
  }, [])

  return children
}