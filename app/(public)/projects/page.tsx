import { ProjectsPageContent } from "@/components/public/projects/projects-page-content";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brijesh.janaktravels.com/';

export const metadata: Metadata = {
  title: "Projects",
  description: "Thesis research and projects in cloud security, DevSecOps, and threat detection.",
  keywords: ["cloud security", "devsecops", "threat detection", "security projects"],
  openGraph: {
    title: "Projects | Brijesh Palta",
    description: "Projects covering cloud security, DevSecOps, and threat detection.",
    url: `${baseUrl}/projects`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image-projects.png`,
        width: 1200,
        height: 630,
        alt: "Brijesh Palta Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Brijesh Palta",
    description: "Cloud security, DevSecOps, and threat detection projects.",
    images: [`${baseUrl}/og-image-projects.png`],
  },
  alternates: {
    canonical: `${baseUrl}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <div className="pt-24">
      <ProjectsPageContent />
    </div>
  );
}
