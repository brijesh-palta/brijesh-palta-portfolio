import { WorkbenchPageContent } from "@/components/public/workbench/workbench-page-content";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brijesh.janaktravels.com/';

export const metadata: Metadata = {
  title: "Workbench",
  description: "Current projects and lab work in cloud security, threat detection, and defensive engineering.",
  keywords: ["security", "workbench", "research", "development"],
  openGraph: {
    title: "Workbench | Brijesh Palta",
    description: "Current projects and lab work in cloud security, threat detection, and defensive engineering.",
    url: `${baseUrl}/workbench`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image-workbench.png`,
        width: 1200,
        height: 630,
        alt: "Brijesh Palta Workbench",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Workbench | Brijesh Palta",
    description: "Active security projects and research initiatives.",
    images: [`${baseUrl}/og-image-workbench.png`],
  },
  alternates: {
    canonical: `${baseUrl}/workbench`,
  },
};

export default function WorkbenchPage() {
  return (
    <div className="pt-24">
      <WorkbenchPageContent />
    </div>
  );
}
