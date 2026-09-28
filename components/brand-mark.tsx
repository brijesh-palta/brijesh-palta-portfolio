import { cn } from "@/lib/utils"

interface BrandMarkProps {
  className?: string
}

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      fill="none"
      className={cn("shrink-0", className)}
    >
      <rect x="1" y="1" width="62" height="62" rx="15" className="fill-background stroke-current" strokeWidth="1.5" />
      <path
        d="M32 7 52 14.5v14.2c0 12.1-7.4 21.2-20 27.3-12.6-6.1-20-15.2-20-27.3V14.5L32 7Z"
        className="fill-primary/10 stroke-current"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <text
        x="32"
        y="38"
        textAnchor="middle"
        className="fill-current font-sans text-[19px] font-bold"
        letterSpacing="-1.5"
      >
        BP
      </text>
      <path d="M23 46h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}