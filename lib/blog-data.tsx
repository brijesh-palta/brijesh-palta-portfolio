export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  category: string
  tags: string[]
  author: {
    name: string
    avatar: string
    role: string
  }
  featured: boolean
  color: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 0,
    slug: "iot-security-workshop-guide",
    title: "IoT Security Workshop: Practical Guide",
    excerpt:
      "Covers common IoT weaknesses, safe assessment methods, and practical ways to reduce risk.",
    content: `
## Introduction

The Internet of Things (IoT) is rapidly expanding, connecting billions of devices worldwide. However, IoT security remains a critical challenge. This guide covers practical IoT security testing and defense strategies.

## IoT Security Challenges

IoT devices face unique security challenges:

- **Limited Resources**: Constrained computing power and memory
- **Legacy Protocols**: Old communication standards with minimal security
- **Difficult Updates**: Hard to patch firmware on deployed devices
- **Complex Supply Chains**: Multiple vendors and integration points

## Vulnerability Assessment

### Device Discovery
\`\`\`
# Scan for IoT devices on network
nmap -sV --script=http-title 192.168.1.0/24
\`\`\`

### Common IoT Vulnerabilities
- Default Credentials: Unchanged default passwords
- Unencrypted Communications: Plaintext data transmission
- Lack of Authentication: Missing identity verification
- Firmware Vulnerabilities: Outdated or unpatched code

## Testing Methodology

### 1. Network Analysis
- Monitor IoT device communications
- Capture and analyze traffic patterns
- Identify unencrypted data streams

### 2. Interface Testing
- Test web interfaces for OWASP Top 10
- Check for authentication bypass
- Verify authorization controls

### 3. Communication Security
- Verify TLS/SSL implementation
- Check certificate validity
- Test for man-in-the-middle vulnerabilities

## Securing IoT Systems

### Implementation Strategies
1. **Strong Authentication**: Implement multi-factor authentication
2. **Encryption**: Encrypt all data in transit and at rest
3. **Network Segmentation**: Isolate IoT devices from critical systems
4. **Regular Updates**: Establish firmware patching procedures
5. **Monitoring**: Implement IDS/IPS for IoT networks

### Best Practices
- Disable unnecessary services
- Change all default credentials
- Use secure boot and code signing
- Implement device lifecycle management

## Conclusion

IoT security requires a comprehensive approach combining technical controls, proper deployment, and continuous monitoring. Stay informed about emerging threats and new security paradigms.
    `,
    date: "Jan 24, 2026",
    readTime: "15 min read",
    category: "security",
    tags: ["IoT", "security-testing", "workshop", "vulnerability-assessment"],
    author: {
      name: "Brijesh Palta",
      avatar: "/developer-portrait.png",
      role: "Cloud Security Engineer",
    },
    featured: true,
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 1,
    slug: "cloud-security-workshop-essentials",
    title: "Cloud Security Workshop: Essential Controls",
    excerpt:
      "Practical AWS controls for identity, network boundaries, encryption, logging, and monitoring.",
    content: `
## Introduction

Cloud security is foundational to modern infrastructure. This workshop guide covers essential security controls for major cloud platforms and implementation best practices.

## Cloud Security Fundamentals

### Shared Responsibility Model

Cloud providers handle infrastructure security, but you're responsible for:
- Access management
- Data protection
- Application security
- Compliance

### Security Pillars

1. **Identity & Access Management**
2. **Data Protection**
3. **Infrastructure Security**
4. **Compliance & Governance**
5. **Incident Response**

## AWS Security Architecture

### Identity & Access Management (IAM)

\`\`\`yaml
# Principle of Least Privilege
Effect: Allow
Action:
  - s3:GetObject
Resource: arn:aws:s3:::bucket/specific-prefix/*
\`\`\`

### VPC Configuration

- **Public Subnets**: For load balancers and NAT gateways
- **Private Subnets**: For application and database servers
- **Security Groups**: Stateful firewalls for instance-level control
- **Network ACLs**: Stateless firewalls for subnet-level control

### Encryption Strategy

**Data at Rest:**
- Enable default encryption for S3 buckets
- Use KMS for key management
- Implement field-level encryption for sensitive data

**Data in Transit:**
- Enforce TLS 1.2 minimum
- Use TLS certificates from ACM
- Implement mutual TLS (mTLS) for service-to-service communication

## Monitoring & Detection

### CloudTrail
- Logs all API calls
- Enables audit and compliance
- Critical for forensics

### CloudWatch
- Monitor metrics and logs
- Set up alarms for anomalies
- Create dashboards for visibility

### GuardDuty
- AI-powered threat detection
- Detects unusual behavior
- Integrates with security tools

## Compliance & Governance

### Security Controls

1. **Preventive**: Stop security issues before they happen
2. **Detective**: Identify issues when they occur
3. **Corrective**: Remediate detected issues

### Best Practices

- Regular security assessments
- Penetration testing
- Security awareness training
- Incident response planning

## Hands-On Implementation

### Step 1: Enable MFA
\`\`\`bash
aws iam enable-mfa-device \\
  --user-name username \\
  --serial-number arn:aws:iam::account:mfa/device
\`\`\`

### Step 2: Create Restrictive Policy
- Start with deny-all
- Explicitly allow required actions
- Review quarterly

### Step 3: Monitor Activity
- Enable CloudTrail
- Set up CloudWatch alerts
- Review logs regularly

## Conclusion

Cloud security is not a one-time setup but an ongoing process. Implement defense-in-depth, monitor continuously, and stay updated on emerging threats.
    `,
    date: "Feb 07, 2026",
    readTime: "16 min read",
    category: "security",
    tags: ["cloud-security", "AWS", "workshop", "IAM", "compliance"],
    author: {
      name: "Brijesh Palta",
      avatar: "/developer-portrait.png",
      role: "Cloud Security Engineer",
    },
    featured: true,
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 2,
    slug: "aws-cloud-security-best-practices",
    title: "AWS Cloud Security Best Practices",
    excerpt:
      "A practical AWS checklist for IAM, network boundaries, encryption, and continuous monitoring.",
    content: `
## Introduction

AWS security requires a layered approach. This guide covers fundamental practices to secure your cloud infrastructure from the ground up.

## IAM: Identity and Access Management

The foundation of AWS security is proper IAM configuration:

\`\`\`
1. Principle of Least Privilege: Grant minimum required permissions
2. Use IAM Roles: Never share long-term credentials
3. Enable MFA: Multi-factor authentication on all accounts
4. Regular Audits: Review permissions quarterly
\`\`\`

## VPC Configuration

Your Virtual Private Cloud is your security perimeter:

- Deploy resources in private subnets
- Use Security Groups as stateful firewalls
- Implement Network ACLs for additional filtering
- Monitor with VPC Flow Logs

## Encryption Strategy

Always encrypt sensitive data:

- **In Transit**: TLS/SSL for all communications
- **At Rest**: KMS for key management, S3 encryption
- **Key Rotation**: Implement regular key rotation policies

## Monitoring and Detection

Continuous monitoring is critical:

- CloudTrail for audit logging
- CloudWatch for metric monitoring
- GuardDuty for threat detection
- Config for compliance checking

## Conclusion

Cloud security is not a one-time setup. It requires continuous improvement and monitoring.
    `,
    date: "Jan 28, 2026",
    readTime: "12 min read",
    category: "security",
    tags: ["aws", "cloud", "security", "iam"],
    author: {
      name: "Brijesh Palta",
      avatar: "/developer-portrait.png",
      role: "Cloud Security Engineer",
    },
    featured: false,
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 3,
    slug: "aws-cloud-security-best-practices",
    title: "AWS Cloud Security Best Practices",
    excerpt:
      "A practical AWS checklist for IAM, network boundaries, encryption, and continuous monitoring.",
    content: `
## Introduction

AWS security requires a layered approach. This guide covers fundamental practices to secure your cloud infrastructure from the ground up.

## IAM: Identity and Access Management

The foundation of AWS security is proper IAM configuration:

\`\`\`
1. Principle of Least Privilege: Grant minimum required permissions
2. Use IAM Roles: Never share long-term credentials
3. Enable MFA: Multi-factor authentication on all accounts
4. Regular Audits: Review permissions quarterly
\`\`\`

## VPC Configuration

Your Virtual Private Cloud is your security perimeter:

- Deploy resources in private subnets
- Use Security Groups as stateful firewalls
- Implement Network ACLs for additional filtering
- Monitor with VPC Flow Logs

## Encryption Strategy

Always encrypt sensitive data:

- **In Transit**: TLS/SSL for all communications
- **At Rest**: KMS for key management, S3 encryption
- **Key Rotation**: Implement regular key rotation policies

## Monitoring and Detection

Continuous monitoring is critical:

- CloudTrail for audit logging
- CloudWatch for metric monitoring
- GuardDuty for threat detection
- Config for compliance checking

## Conclusion

Cloud security is not a one-time setup. It requires continuous improvement and monitoring.
    `,
    date: "Jan 28, 2026",
    readTime: "12 min read",
    category: "security",
    tags: ["aws", "cloud", "security", "iam"],
    author: {
      name: "Brijesh Palta",
      avatar: "/developer-portrait.png",
      role: "Cloud Security Engineer",
    },
    featured: true,
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    id: 4,
    slug: "siem-threat-detection-guide",
    title: "Building SIEM Systems for Threat Detection",
    excerpt:
      "Set up Wazuh and the ELK Stack to collect logs, write detections, and investigate suspicious activity.",
    content: `
## What is SIEM?

Security Information and Event Management (SIEM) centralizes security monitoring across your infrastructure.

## Wazuh Architecture

Wazuh provides:
- Centralized log collection
- Real-time threat detection
- Compliance reporting (PCI-DSS, HIPAA)
- Vulnerability assessment

## Detection Rules

Writing effective detection rules:

\`\`\`yaml
rule:
  id: 1001
  title: Brute force login attempts
  description: Detect multiple failed login attempts
  condition: failed_login_count > 5 in 5_minutes
\`\`\`

## ELK Stack Integration

The Elastic Stack provides powerful analytics:

- Elasticsearch: Scalable search and analytics
- Logstash: Log processing and transformation
- Kibana: Visualization and dashboards

## Behavioral Anomaly Detection

Identify threats through:
- User activity baselines
- Network traffic patterns
- System performance metrics
- Authentication anomalies

## Conclusion

Effective threat detection requires multiple layers and continuous tuning.
    `,
    date: "Jan 15, 2026",
    readTime: "14 min read",
    category: "security",
    tags: ["siem", "wazuh", "threat-detection", "monitoring"],
    author: {
      name: "Brijesh Palta",
      avatar: "/developer-portrait.png",
      role: "Cloud Security Engineer",
    },
    featured: true,
    color: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 5,
    slug: "devsecops-pipeline-automation",
    title: "Automating Security in CI/CD Pipelines",
    excerpt:
      "Building secure CI/CD pipelines with automated security testing, SAST/DAST integration, and secure artifact management using GitHub Actions and modern DevSecOps practices.",
    content: `
## DevSecOps Philosophy

Security must be built into development, not added after. This requires:
- Automated security testing
- Continuous vulnerability scanning
- Secure secrets management
- Compliance automation

## GitHub Actions Security Workflow

\`\`\`yaml
name: Security Checks
on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: SAST Scanning
        run: npm run security:scan
        
      - name: Dependency Check
        run: npm audit
        
      - name: DAST
        run: npm run security:dast
\`\`\`

## SAST Tools

Static Application Security Testing:
- Snyk: Vulnerability scanning
- SonarQube: Code quality and security
- Trivy: Container image scanning

## Secrets Management

Never expose credentials:
- Use GitHub Secrets
- Implement secret rotation
- Use AWS Secrets Manager
- Enable audit logging

## Artifact Security

Secure your build artifacts:
- Sign container images
- Store in private registries
- Implement RBAC
- Enable immutable tags

## Conclusion

Automated security in pipelines catches issues early and reduces risk.
    `,
    date: "Dec 20, 2025",
    readTime: "11 min read",
    category: "security",
    tags: ["devops", "ci-cd", "automation", "security"],
    author: {
      name: "Brijesh Palta",
      avatar: "/developer-portrait.png",
      role: "Cloud Security Engineer",
    },
    featured: false,
    color: "from-primary/20 to-emerald-500/20",
  },
  {
    id: 6,
    slug: "network-security-fundamentals",
    title: "Network Security Fundamentals",
    excerpt:
      "Essential network security concepts: OSI model, firewalls, IDS/IPS systems, packet analysis, and defense against common network attacks.",
    content: `
## OSI Model Security

Understanding the OSI model is crucial for network security:

- Layer 1-2: Physical/Data Link - Cable security, MAC filtering
- Layer 3: Network - IP filtering, routing security
- Layer 4: Transport - Port security, TCP/UDP filtering
- Layer 7: Application - WAF, API security

## Firewall Architecture

Types of firewalls:
- Stateless: Rule-based filtering
- Stateful: Connection tracking
- Next-Generation: Deep packet inspection

## IDS vs IPS

**IDS (Intrusion Detection System)**:
- Monitors and alerts
- Non-intrusive
- Good for analysis

**IPS (Intrusion Prevention System)**:
- Monitors and blocks
- Inline deployment
- Automatic response

## Packet Analysis

Using Wireshark:
- Capture network traffic
- Filter by protocol
- Identify anomalies
- Troubleshoot issues

## Common Attack Vectors

- Man-in-the-Middle (MITM)
- DDoS attacks
- Port scanning
- DNS spoofing
- ARP poisoning

## Conclusion

Network security requires constant vigilance and proper monitoring infrastructure.
    `,
    date: "Nov 10, 2025",
    readTime: "10 min read",
    category: "security",
    tags: ["network", "firewall", "ids", "security"],
    author: {
      name: "Brijesh Palta",
      avatar: "/developer-portrait.png",
      role: "Cloud Security Engineer",
    },
    featured: false,
    color: "from-orange-500/20 to-amber-500/20",
  },
  {
    id: 7,
    slug: "secure-coding-practices",
    title: "Secure Coding Practices for Developers",
    excerpt:
      "Essential secure coding principles: input validation, output encoding, authentication, authorization, and defense against OWASP Top 10 vulnerabilities.",
    content: `
## OWASP Top 10

The most critical web application security risks:

1. Broken Access Control
2. Cryptographic Failures
3. Injection
4. Insecure Design
5. Security Misconfiguration
6. Vulnerable Components
7. Authentication Failures
8. Software/Data Integrity
9. Logging/Monitoring
10. SSRF

## Input Validation

Never trust user input:

\`\`\`python
# Bad
user_input = request.form['input']
query = f"SELECT * FROM users WHERE id = {user_input}"

# Good
from sqlalchemy import text
query = text("SELECT * FROM users WHERE id = :user_id")
result = db.session.execute(query, {"user_id": user_input})
\`\`\`

## Authentication Best Practices

- Use strong password hashing (bcrypt, Argon2)
- Implement multi-factor authentication
- Use secure session management
- Never store passwords in plain text

## Cryptography

- Use established libraries (don't implement your own)
- Use TLS for all communications
- Implement key rotation
- Use secure random number generation

## Error Handling

- Don't expose sensitive information in errors
- Log security events
- Implement proper rate limiting
- Monitor for attack patterns

## Conclusion

Security must be built into the development process from day one.
    `,
    date: "Oct 25, 2025",
    readTime: "13 min read",
    category: "security",
    tags: ["secure-coding", "owasp", "best-practices"],
    author: {
      name: "Brijesh Palta",
      avatar: "/developer-portrait.png",
      role: "Cloud Security Engineer",
    },
    featured: false,
    color: "from-red-500/20 to-orange-500/20",
  },
  {
    id: 8,
    slug: "threat-modeling-101",
    title: "Threat Modeling for Security Architecture",
    excerpt:
      "Introduction to threat modeling: identifying assets, threat actors, attack vectors, and implementing appropriate controls for resilient systems.",
    content: `
## What is Threat Modeling?

Threat modeling is a systematic approach to identifying and mitigating security risks:

1. Identify Assets
2. Map Threat Actors
3. Identify Threats
4. Analyze Vulnerabilities
5. Determine Controls

## Asset Classification

Categorize what you need to protect:
- Confidential data
- System availability
- User integrity
- Business continuity

## Threat Actors

Understand who might attack:
- Malicious insiders
- External attackers
- Script kiddies
- Advanced Persistent Threats (APT)

## Attack Trees

Visual representation of attack paths:

\`\`\`
Goal: Compromise data
├── Network attacks
│   ├── Man-in-the-middle
│   └── Network sniffing
├── Application attacks
│   ├── SQL Injection
│   └── XSS
└── Physical attacks
    └── Physical access
\`\`\`

## Risk Prioritization

Use CVSS scores to prioritize:
- Severity: How bad is the impact?
- Exploitability: How easy to exploit?
- Impact: Availability, Confidentiality, Integrity

## Control Implementation

- Preventive: Stop attacks before they happen
- Detective: Identify attacks in progress
- Corrective: Respond and remediate
- Compensating: Alternative controls

## Conclusion

Threat modeling should be part of every security architecture review.
    `,
    date: "Sep 30, 2025",
    readTime: "11 min read",
    category: "security",
    tags: ["threat-modeling", "architecture", "risk"],
    author: {
      name: "Brijesh Palta",
      avatar: "/developer-portrait.png",
      role: "Cloud Security Engineer",
    },
    featured: false,
    color: "from-teal-500/20 to-cyan-500/20",
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug)
  if (!currentPost) return []

  return blogPosts
    .filter((post) => post.slug !== currentSlug)
    .filter((post) => post.category === currentPost.category || post.tags.some((tag) => currentPost.tags.includes(tag)))
    .slice(0, limit)
}
