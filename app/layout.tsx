import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

// Configure fonts with proper options
const geist = Geist({
  subsets: ["latin"],
  variable: '--font-geist',
  display: 'swap',
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: '--font-geist-mono',
  display: 'swap',
})
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://brijesh.janaktravels.com/'),
  title: {
    default: "Brijesh Palta — Cloud Security & DevSecOps Engineer",
    template: "%s | Brijesh Palta",
  },
  description:
    "Cloud Security Engineer & DevSecOps specialist. Architecting secure, resilient systems with a focus on threat detection, network defense, and secure software development.",
  keywords: ["Cloud Security", "DevSecOps", "AWS", "Cybersecurity", "SIEM", "Network Security", "Secure Development", "Threat Detection", "Information Security"],
  authors: [{ name: "Brijesh Palta", url: "https://github.com/brijesh-palta" }],
  creator: "Brijesh Palta",
  publisher: "Brijesh Palta",
  generator: "v0.app",
  referrer: "strict-origin-when-cross-origin",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Brijesh Palta — Cloud Security & DevSecOps Engineer",
    description: "Architecting secure, resilient systems with expertise in threat detection, network defense, and secure software development.",
    siteName: "Brijesh Palta",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Brijesh Palta — Cloud Security Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brijesh Palta — Cloud Security & DevSecOps Engineer",
    description: "Architecting secure, resilient systems with expertise in cloud security, network defense, and secure development.",
    creator: "@brijeshpalta",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/icon.svg",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true} storageKey="theme-mode">
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
