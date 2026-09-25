import type { BlogPost } from './blog-data'

export function generateBlogPostStructuredData(post: BlogPost, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `${url}/og-images/${post.slug}.png`,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: 'https://github.com/brijesh-palta',
    },

    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${url}/blog/${post.slug}`,
    },
    articleSection: post.category,
    keywords: post.tags.join(', '),
    timeRequired: post.readTime,
  }
}

export function generateWebsiteStructuredData(url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Brijesh Palta - Security Lab',
    description: "Cloud Security Engineer & DevSecOps specialist. Securing systems, analyzing threats, and architecting resilient infrastructure.",
    url: url,
    author: {
      '@type': 'Person',
      name: 'Brijesh Palta',
      url: 'https://github.com/brijeshpalta',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/blog?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generatePersonStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Brijesh Palta',
    url: 'https://brijesh-palta.dev',
    image: 'https://brijesh-palta.dev/developer-portrait.png',
    sameAs: [
      'https://github.com/brijeshpalta',
      'https://twitter.com/brijeshpalta',
      'https://linkedin.com/in/brijesh-palta',
    ],
    jobTitle: 'Cloud Security Engineer & DevSecOps Specialist',
    email: 'brijeshpalta99@gmail.com',
    worksFor: {
      '@type': 'Organization',
      name: 'Security Lab',
    },
    educationalCredential: [
      'Master of Cyber Security (Professional) - Deakin University',
      'Bachelor of Technology in ICT - Marwadi University',
    ],
    knowsAbout: [
      'Cloud Security',
      'DevSecOps',
      'Network Security',
      'SIEM',
      'AWS',
      'Threat Detection',
      'Secure Software Development',
    ],
  }
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
