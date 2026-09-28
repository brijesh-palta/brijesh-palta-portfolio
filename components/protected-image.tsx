"use client"

import Image, { type ImageProps } from "next/image"
import {
  useEffect,
  useState,
  type ClipboardEventHandler,
  type DragEventHandler,
  type MouseEventHandler,
} from "react"
import { cn } from "@/lib/utils"

interface ProtectedImageProps extends Omit<ImageProps, "draggable" | "onContextMenu" | "onCopy" | "onDragStart"> {
  watermark?: string
  obscureWhenHidden?: boolean
  frameClassName?: string
}

const isProduction = process.env.NODE_ENV === "production"
const watermarkPositions = ["top-1/4 left-1/4", "top-1/4 right-1/4", "bottom-1/4 left-1/4", "bottom-1/4 right-1/4"]

export function ProtectedImage({
  alt,
  className,
  frameClassName,
  watermark = "BRIJESH PALTA / PORTFOLIO",
  obscureWhenHidden = true,
  ...imageProps
}: ProtectedImageProps) {
  const [isPageVisible, setIsPageVisible] = useState(true)

  useEffect(() => {
    if (!isProduction || !obscureWhenHidden) return

    const updateVisibility = () => setIsPageVisible(!document.hidden)
    document.addEventListener("visibilitychange", updateVisibility)
    updateVisibility()

    return () => document.removeEventListener("visibilitychange", updateVisibility)
  }, [obscureWhenHidden])

  const preventAction = (event: { preventDefault: () => void }) => {
    if (isProduction) event.preventDefault()
  }

  const protectContextMenu: MouseEventHandler<HTMLDivElement> = preventAction
  const protectCopy: ClipboardEventHandler<HTMLDivElement> = preventAction
  const protectDrag: DragEventHandler<HTMLDivElement> = preventAction

  const isObscured = isProduction && obscureWhenHidden && !isPageVisible

  return (
    <div
      className={cn(
        "protected-visual relative isolate overflow-hidden",
        isProduction && "select-none print:hidden",
        frameClassName,
      )}
      onContextMenu={protectContextMenu}
      onCopy={protectCopy}
      onDragStart={protectDrag}
    >
      <Image
        {...imageProps}
        alt={alt}
        draggable={isProduction ? false : undefined}
        className={cn(isProduction && "pointer-events-none select-none", className)}
      />
      {isProduction && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-[-20%] -rotate-12">
            {watermarkPositions.map((position) => (
              <span
                key={position}
                className={cn(
                  "absolute whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-white/45 drop-shadow",
                  position,
                )}
              >
                {watermark}
              </span>
            ))}
          </div>
        </div>
      )}
      {isObscured && (
        <div
          role="status"
          className="absolute inset-0 flex items-center justify-center bg-background/95 px-4 text-center font-mono text-sm text-muted-foreground"
        >
          Protected content
        </div>
      )}
    </div>
  )
}