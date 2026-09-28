import { BlogHero } from "@/components/public/blog/blog-hero";
import { BlogList } from "@/components/public/blog/blog-list";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://brijesh.janaktravels.com/';

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles and notes on cloud security, DevSecOps, and threat detection.",
  openGraph: {
    title: "Blog | Brijesh Palta",
    description: "Articles and notes on cloud security, DevSecOps, and threat detection.",
    url: `${baseUrl}/blog`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image-blog.png`,
        width: 1200,
        height: 630,
        alt: "Brijesh Palta Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Brijesh Palta",
    description: "Articles and notes on cloud security, DevSecOps, and threat detection.",
    images: [`${baseUrl}/og-image-blog.png`],
  },
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
};

export default function BlogPage() {
  return (
    <div>
      <BlogHero />
      <section className="px-4 sm:px-6 py-16 sm:py-20 border-t border-border/30">
        <div className="mx-auto max-w-7xl">
          <BlogList />
        </div>
      </section>
    </div>
  );
}
