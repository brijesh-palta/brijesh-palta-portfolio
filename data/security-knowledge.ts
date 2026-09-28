export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced"

export type SecurityKnowledgeEntry = {
  id: string
  question: string
  keywords: string[]
  category: string
  difficulty: DifficultyLevel
  relatedQuestions: string[]
  answer: {
    whatIsIt: string
    whyItMatters: string
    example: string
    howToDetectIt: string
    howToPreventIt: string
    bestPractices: string[]
  }
}

export const securityKnowledgeEntries: SecurityKnowledgeEntry[] = [
  {
    id: "sql-injection",
    question: "What is SQL injection?",
    keywords: ["sql injection", "database", "query", "injection", "db security"],
    category: "Web Security",
    difficulty: "Intermediate",
    relatedQuestions: ["xss", "ssrf", "api-security", "database-security"],
    answer: {
      whatIsIt:
        "SQL injection is a code injection technique where untrusted input alters the logic of a SQL query. Attackers exploit input validation or query construction flaws to change what the database executes.",
      whyItMatters:
        "It can expose or modify sensitive data, bypass login checks, and escalate access if the database account has broad permissions. In many real incidents, it leads to direct data exposure or account takeover.",
      example:
        "A login form sends username='admin' OR '1'='1' to a query such as SELECT * FROM users WHERE username = '...' AND password = '...'. If unsafely constructed, the condition may always evaluate to true.",
      howToDetectIt:
        "Use application security testing, SQLi scanners, and code review to look for string concatenation in database queries. Monitor for anomalous database error patterns, query anomalies, and unexpected results from user-controlled inputs.",
      howToPreventIt:
        "Use parameterized queries, prepared statements, and ORM APIs that bind values instead of concatenating SQL text. Validate and constrain user input, enforce least-privilege database accounts, and log suspicious query behavior.",
      bestPractices: [
        "Use parameterized queries and prepared statements",
        "Separate database accounts by role and privilege",
        "Validate input before it reaches the database",
        "Review error handling so details do not leak internals",
      ],
    },
  },
  {
    id: "xss",
    question: "What is XSS?",
    keywords: ["xss", "cross site scripting", "reflected xss", "stored xss", "dom xss"],
    category: "Web Security",
    difficulty: "Intermediate",
    relatedQuestions: ["csrf", "content-security-policy", "output-encoding", "secure-coding"],
    answer: {
      whatIsIt:
        "Cross-site scripting is a class of vulnerabilities where untrusted input is injected into a web page and executed as script in a victim's browser.",
      whyItMatters:
        "XSS can steal session tokens, change page content, perform actions on behalf of a user, and expose sensitive data to attackers. It remains common because browser execution environments are powerful and many apps still render untrusted content unsafely.",
      example:
        "A comment field renders user text as HTML without escaping, so an attacker submits <script>alert(document.cookie)</script> and every viewer executes it.",
      howToDetectIt:
        "Test for reflected, stored, and DOM-based flows by reviewing rendering logic, search parameters, and dynamic DOM insertion. Inspect usage of innerHTML, insertAdjacentHTML, and unsafe URL sinks.",
      howToPreventIt:
        "Encode output according to context, use template systems that escape by default, enforce a restrictive Content Security Policy, and sanitize user-generated content according to policy. Avoid writing untrusted strings into HTML, JavaScript, or URL contexts.",
      bestPractices: [
        "Escape output by context: HTML, JavaScript, URL, CSS",
        "Use CSP headers and trusted content sources",
        "Review third-party scripts and unsafe DOM APIs",
        "Sanitize or whitelist rich content where required",
      ],
    },
  },
  {
    id: "csrf",
    question: "What is CSRF?",
    keywords: ["csrf", "cross site request forgery", "state changing request", "browser security"],
    category: "Web Security",
    difficulty: "Intermediate",
    relatedQuestions: ["xss", "secure-cookies", "oauth-2", "session-security"],
    answer: {
      whatIsIt:
        "CSRF tricks a logged-in user into submitting a request to a trusted site without their intent. The browser sends the session cookie automatically, so the request appears valid.",
      whyItMatters:
        "It can alter account settings, transfer funds, or trigger actions in authenticated contexts without user approval. It often combines with user trust and browser cookie behavior.",
      example:
        "An attacker hosts a malicious form that submits a transfer request to a banking site where the victim is already logged in. If the banking site does not verify the request origin, it may accept it.",
      howToDetectIt:
        "Review forms and state-changing endpoints for origin or CSRF token validation. Verify that sensitive actions require a unique token and inspect whether cookies are sent cross-site.",
      howToPreventIt:
        "Require anti-CSRF tokens for state-changing actions, use SameSite cookies, verify Origin and Referer headers on trusted routes, and enforce same-site policy for authenticated sessions.",
      bestPractices: [
        "Use double-submit or sync-token protections",
        "Set SameSite=Lax or Strict on session cookies",
        "Require reauthentication for sensitive actions",
        "Verify Origin headers for API requests",
      ],
    },
  },
  {
    id: "ssrf",
    question: "What is SSRF?",
    keywords: ["ssrf", "server side request forgery", "internal network", "metadata service"],
    category: "Web Security",
    difficulty: "Advanced",
    relatedQuestions: ["network-security", "firewall", "cloud-security", "web-security"],
    answer: {
      whatIsIt:
        "SSRF occurs when an application fetches a URL or resource based on attacker-controlled input, allowing the server to access unintended internal or external destinations.",
      whyItMatters:
        "Attackers can pivot into internal services, metadata endpoints, admin dashboards, or private cloud resources. SSRF often becomes a stepping stone to broader network discovery and credential theft.",
      example:
        "A web app accepts a URL for a screenshot service; an attacker provides http://169.254.169.254/latest/meta-data/ to read cloud metadata credentials.",
      howToDetectIt:
        "Inspect outbound fetches, allowlists, and URL parsing in app code. Review endpoints that fetch remote resources, preview links, and metadata or local network addresses.",
      howToPreventIt:
        "Use strict allowlists for destinations, block localhost and private ranges, disable redirects, and isolate outgoing network access. Validate hostnames and ports with a defense-in-depth network policy.",
      bestPractices: [
        "Block internal RFC1918, loopback, and link-local ranges",
        "Limit outbound egress to trusted services",
        "Log URL destinations and deny suspicious patterns",
        "Use dedicated network controls for metadata endpoints",
      ],
    },
  },
  {
    id: "idor",
    question: "What is IDOR or BOLA?",
    keywords: ["idor", "bola", "broken object level authorization", "object level access"],
    category: "Web Security",
    difficulty: "Intermediate",
    relatedQuestions: ["authorization", "rbac", "least-privilege", "api-security"],
    answer: {
      whatIsIt:
        "IDOR, or Broken Object Level Authorization, is when an application exposes or modifies an object based on user-controlled identifiers without verifying access permissions.",
      whyItMatters:
        "Users can enumerate IDs and access or change records they should not see. This is one of the most common authorization flaws in business applications and APIs.",
      example:
        "A GET /account/123 invoice endpoint accepts the user-supplied ID without checking whether the current user owns the invoice, so a user changes another customer's object reference.",
      howToDetectIt:
        "Test authorization at the object level with different accounts, especially for collection endpoints, file downloads, and IDs in URLs, headers, and JSON bodies.",
      howToPreventIt:
        "Authorize every object access on the server, use user-scoped queries, enforce RBAC or ABAC, and avoid exposing internal IDs when a public reference is not required. Check object ownership, tenancy, and permissions each time.",
      bestPractices: [
        "Validate access at the server for every object",
        "Use opaque IDs or random tokens where possible",
        "Test with multiple user roles and records",
        "Design access checks around resource ownership and tenancy",
      ],
    },
  },
  {
    id: "authentication-vs-authorization",
    question: "What is the difference between authentication and authorization?",
    keywords: ["authentication", "authorization", "who are you", "what can you do"],
    category: "Authentication",
    difficulty: "Beginner",
    relatedQuestions: ["mfa", "jwt-security", "oauth-2", "zero-trust"],
    answer: {
      whatIsIt:
        "Authentication answers 'Who are you?' by validating a user's identity. Authorization answers 'What are you allowed to do?' by checking permissions and access rules.",
      whyItMatters:
        "Security programs must verify identity before granting access. Without proper authorization, users may reach resources beyond their role or task.",
      example:
        "A user logs in with a password and receives a session. Authentication confirms the identity; authorization then decides whether that user can view admin reports or only read their own profile.",
      howToDetectIt:
        "Review login flows, session issuance, and decision points for protected resources. Test whether a user can access data or actions outside their permissions.",
      howToPreventIt:
        "Use strong identity verification, short-lived sessions, and policy enforcement at every protected action. Apply least privilege and deny by default.",
      bestPractices: [
        "Verify identity before enforcing any permissions",
        "Centralize authorization checks",
        "Apply least privilege to roles and API clients",
        "Review privileged paths and emergency access carefully",
      ],
    },
  },
  {
    id: "mfa",
    question: "What is MFA and why is it important?",
    keywords: ["mfa", "multi factor authentication", "2fa", "security keys"],
    category: "Authentication",
    difficulty: "Beginner",
    relatedQuestions: ["password-hashing", "session-security", "oauth-2", "phishing"],
    answer: {
      whatIsIt:
        "Multi-factor authentication requires a user to provide two or more independent factors such as something they know, something they have, or something they are.",
      whyItMatters:
        "It reduces the impact of password theft or phishing by requiring additional verification. Attackers who steal credentials alone often cannot complete the sign-in without the second factor.",
      example:
        "A user enters a password and confirms with a one-time code from an authenticator app or hardware security key.",
      howToDetectIt:
        "Review sign-in policies, account recovery flows, and high-risk admin access paths. Look for password-only access and weak recovery mechanisms.",
      howToPreventIt:
        "Require MFA for privileged accounts, remote access, and high-risk workflows. Prefer phishing-resistant methods such as passkeys or hardware security keys where available.",
      bestPractices: [
        "Protect administrator and cloud accounts with MFA",
        "Use phishing-resistant authenticators when possible",
        "Do not rely on SMS as the only factor if stronger options exist",
        "Train users to report suspicious prompts and requests",
      ],
    },
  },
  {
    id: "jwt-security",
    question: "How do I secure JWT authentication?",
    keywords: ["jwt", "json web token", "bearer token", "token security"],
    category: "API Security",
    difficulty: "Intermediate",
    relatedQuestions: ["oauth-2", "secure-cookies", "api-security", "session-security"],
    answer: {
      whatIsIt:
        "JWT is a compact signed token format used to assert identity and claims. It is commonly used in APIs and OAuth ecosystems, but it is not inherently secure unless implemented carefully.",
      whyItMatters:
        "JWTs are often passed in headers or stored client-side. If implemented without proper validation or key management, attackers may replay or forge tokens.",
      example:
        "An API receives an Authorization: Bearer token and verifies the signature with a server-held public key before trusting the embedded user ID and roles.",
      howToDetectIt:
        "Review token validation, signature algorithms, expiry handling, and storage. Look for tokens accepted without verifying alg, issuer, audience, or expiration.",
      howToPreventIt:
        "Use strong algorithms, validate issuer, audience, expiry, and signature, keep signing keys in a secret manager, and rotate keys carefully. Store refresh tokens securely and short-circuit access tokens where possible.",
      bestPractices: [
        "Validate all JWT claims before trusting them",
        "Use short-lived access tokens and secure refresh flows",
        "Keep signing keys outside application code",
        "Avoid storing sensitive data directly in JWT payloads",
      ],
    },
  },
  {
    id: "oauth-2",
    question: "How does OAuth 2.0 work?",
    keywords: ["oauth", "oauth2", "authorization", "openid connect", "sso"],
    category: "Authentication",
    difficulty: "Intermediate",
    relatedQuestions: ["jwt-security", "saml", "zero-trust", "api-security"],
    answer: {
      whatIsIt:
        "OAuth 2.0 is an authorization framework that lets an application obtain limited access on behalf of a user without exposing their password. OpenID Connect adds identity information on top of OAuth.",
      whyItMatters:
        "It enables delegated access, federation, and SSO across applications. Misconfigurations can lead to over-scoped tokens, consent abuse, or insecure redirect handling.",
      example:
        "A web app asks a provider to grant access to a user's calendar; the provider returns an authorization code and then a token that the app can use to call the API.",
      howToDetectIt:
        "Review redirect URIs, client secret handling, scopes, PKCE usage, and token storage. Validate that the app requests only the minimal permissions it needs.",
      howToPreventIt:
        "Use PKCE for public clients, validate redirect URIs strictly, store client secrets in a trusted secret manager, and request least-privilege scopes. Use OIDC when user identity details are required.",
      bestPractices: [
        "Prefer PKCE and short-lived tokens",
        "Validate every redirect URI and issuer",
        "Scope access to the minimum required set",
        "Regularly rotate client credentials and review consent",
      ],
    },
  },
  {
    id: "api-security",
    question: "How do I protect an API?",
    keywords: ["api security", "rest api", "graphql security", "rate limiting", "cors"],
    category: "API Security",
    difficulty: "Intermediate",
    relatedQuestions: ["jwt-security", "idor", "oauth-2", "rate-limiting"],
    answer: {
      whatIsIt:
        "API security is the set of controls that ensure application programming interfaces are authenticated, authorized, validated, monitored, and resilient to abuse or misuse.",
      whyItMatters:
        "APIs are often the main entry point to data and business logic. Weak API controls expose sensitive records, allow privilege abuse, and can enable mass data exfiltration.",
      example:
        "A mobile app calls a `/orders` endpoint with a bearer token. The API must validate the token, check the caller's authorization, enforce rate limits, and ensure only the expected data is returned.",
      howToDetectIt:
        "Review authentication and authorization paths, schema validation, rate limiting, and abnormal traffic patterns. Test with multiple user roles and edge conditions.",
      howToPreventIt:
        "Require strong authentication, validate schemas, apply rate limits and quotas, log access in a central system, and enforce least privilege for every method and route. Return only necessary data and use API gateways where helpful.",
      bestPractices: [
        "Validate input and response schemas",
        "Use short-lived credentials and scoped permissions",
        "Rate limit expensive or sensitive operations",
        "Monitor abuse patterns and block suspicious clients",
      ],
    },
  },
  {
    id: "rate-limiting",
    question: "How do I implement rate limiting?",
    keywords: ["rate limiting", "throttling", "abuse prevention", "ddos", "api protection"],
    category: "API Security",
    difficulty: "Intermediate",
    relatedQuestions: ["api-security", "waf", "ddos", "web-security"],
    answer: {
      whatIsIt:
        "Rate limiting restricts how often a client, user, or service can make requests within a given time period. It prevents abuse, brute force, and denial-of-service effects.",
      whyItMatters:
        "Without limits, attackers can spam login attempts, overwhelm expensive queries, or trigger business logic repeatedly. Rate limits also protect against accidental misuse and bot activity.",
      example:
        "An authentication endpoint allows only five failed attempts per minute per IP or account before the request is throttled or temporarily blocked.",
      howToDetectIt:
        "Analyze traffic spikes, auth failures, and repeated expensive requests. Review logs and monitoring for unusual concurrency or saturation patterns.",
      howToPreventIt:
        "Apply quotas at the edge, app layer, and API gateway. Differentiate between anonymous and authenticated clients and use token bucket or fixed-window algorithms with clear retry guidance.",
      bestPractices: [
        "Set limits by client, user, and route",
        "Protect expensive endpoints with stricter quotas",
        "Use centralized telemetry and alerting",
        "Return clear 429 responses with retry hints",
      ],
    },
  },
  {
    id: "zero-trust",
    question: "What is zero trust?",
    keywords: ["zero trust", "identity driven security", "network segmentation", "least privilege"],
    category: "Security Architecture",
    difficulty: "Intermediate",
    relatedQuestions: ["least-privilege", "network-security", "mfa", "identity"],
    answer: {
      whatIsIt:
        "Zero trust is a security model that assumes no network segment or user is inherently trustworthy. Access is granted based on verified identity, device health, policy, and continuous evaluation.",
      whyItMatters:
        "Traditional castle-and-moat approaches fail when users connect from many locations and workloads move across cloud and hybrid environments. Zero trust reduces lateral movement and privilege abuse.",
      example:
        "A developer accessing a production service must verify identity, device posture, location, and role before being allowed to connect through a short-lived, policy-based access path.",
      howToDetectIt:
        "Review identity and access policies, segmentation, and conditional access controls. Look for broad trust relationships and implicit network access between tiers.",
      howToPreventIt:
        "Use strong identity verification, least privilege, segmentation, device posture checks, and continuous monitoring. Treat every access request as a new trust decision.",
      bestPractices: [
        "Segment by trust level and business purpose",
        "Require strong identity and device verification",
        "Prefer short-lived, policy-based access",
        "Use telemetry to continuously validate trust",
      ],
    },
  },
  {
    id: "aws-security",
    question: "How do I secure AWS?",
    keywords: ["aws security", "iam", "s3", "kms", "cloudtrail", "guardduty"],
    category: "Cloud Security",
    difficulty: "Intermediate",
    relatedQuestions: ["azure-security", "gcp-security", "iam-least-privilege", "encryption"],
    answer: {
      whatIsIt:
        "AWS security involves protecting identity, network boundaries, data, workloads, and logging across services like IAM, S3, EC2, Lambda, and VPC.",
      whyItMatters:
        "Cloud platforms let you provision resources quickly, which also makes misconfiguration and overly broad access a major risk. Security must be built into infrastructure and operations.",
      example:
        "An S3 bucket is public by default because of a bucket policy change. The fix is to restrict public access, enable encryption, and review access logs and bucket policies.",
      howToDetectIt:
        "Review IAM policies, public exposure, encryption settings, audit logs, and security alerts from GuardDuty or Security Hub. Look for unused roles, broad wildcard permissions, and open network paths.",
      howToPreventIt:
        "Use least privilege IAM, short-lived roles, encrypted storage, VPC segmentation, centralized logging, and managed detection services. Keep data and access flows private unless a business need exists.",
      bestPractices: [
        "Use IAM roles instead of long-lived credentials",
        "Enable CloudTrail, GuardDuty, and CloudWatch alarms",
        "Restrict public access and shared resources",
        "Encrypt data at rest and in transit",
      ],
    },
  },
  {
    id: "kubernetes-security",
    question: "How do I secure Kubernetes?",
    keywords: ["kubernetes", "rbac", "network policies", "pod security", "admission controls"],
    category: "Cloud Security",
    difficulty: "Advanced",
    relatedQuestions: ["docker-security", "container-security", "cloud-security", "devsecops"],
    answer: {
      whatIsIt:
        "Kubernetes security focuses on protecting the control plane, nodes, pods, secrets, and network interactions across clusters. It requires identity, policy, and container hygiene controls.",
      whyItMatters:
        "Clusters run critical services and often hold secrets and persistent data. Misconfigured RBAC or pod isolation can enable lateral movement or data theft.",
      example:
        "A pod runs as root with a broad service account, exposes an internal dashboard, and can reach other workloads. The fix is to restrict privileges, apply network policies, and limit service account permissions.",
      howToDetectIt:
        "Review RBAC, admission policies, API server access, pod security contexts, and suspicious behavior such as unexpected node access or secret use.",
      howToPreventIt:
        "Use RBAC least privilege, network policies, pod security standards, minimal images, non-root containers, and image scanning. Protect secrets and isolate trust boundaries.",
      bestPractices: [
        "Run workloads as non-root with restricted capabilities",
        "Use admission controls and image scanning",
        "Restrict Kubernetes API access and service accounts",
        "Patch clusters and nodes consistently",
      ],
    },
  },
  {
    id: "docker-security",
    question: "How do I secure Docker?",
    keywords: ["docker security", "container isolation", "image scanning", "rootless"],
    category: "Cloud Security",
    difficulty: "Intermediate",
    relatedQuestions: ["kubernetes-security", "container-security", "devsecops", "supply-chain"],
    answer: {
      whatIsIt:
        "Docker security is about hardening container images, enforcing runtime constraints, and protecting hosts and orchestration layers from unsafe workloads.",
      whyItMatters:
        "Containers are lightweight but can still escalate privileges, expose secrets, or allow container breakout if misconfigured. Weak base image choices or broad permissions often cause risk.",
      example:
        "A Dockerfile installs aggressive packages, uses a root user, and copies a secret into the image. The image is then pushed to a registry and deployed in production.",
      howToDetectIt:
        "Review Dockerfiles, image provenance, scanning results, runtime privilege settings, and host-level isolation. Look for root users, high capabilities, and exposed ports.",
      howToPreventIt:
        "Use minimal images, scan dependencies and base layers, run as non-root, drop capabilities, use read-only filesystems where possible, and avoid storing secrets in image layers.",
      bestPractices: [
        "Prefer minimal, trusted base images",
        "Scan images in CI and at registry time",
        "Use namespace separation and resource limits",
        "Avoid root unless strictly necessary",
      ],
    },
  },
  {
    id: "android-security",
    question: "How do I secure an Android app?",
    keywords: ["android security", "android keystore", "network security config", "certificate pinning"],
    category: "Mobile Security",
    difficulty: "Intermediate",
    relatedQuestions: ["ios-security", "mobile-api-security", "secure-storage", "certificate-pinning"],
    answer: {
      whatIsIt:
        "Android application security covers secure coding, storage, transport, permissions, and runtime protections across the device and app environment.",
      whyItMatters:
        "Mobile apps process personal data, credentials, tokens, and sometimes payment flows. Weak storage, insecure deep links, and misconfigured network connections are common attack paths.",
      example:
        "An app stores an API token in plain SharedPreferences and uses a permissive WebView, allowing local extraction and token abuse.",
      howToDetectIt:
        "Review Android permissions, exported components, WebView settings, data storage, and certificate handling. Test the app under a secure mobile threat model and inspect local storage.",
      howToPreventIt:
        "Use Android Keystore, encrypted storage, network security config, certificate pinning where appropriate, sign release builds, and minimize exported components. Protect against debug and root detection bypasses with robust release controls.",
      bestPractices: [
        "Use Android Keystore for private keys",
        "Protect tokens and PII in encrypted storage",
        "Restrict exported activities and deep links",
        "Configure WebView and TLS policy carefully",
      ],
    },
  },
  {
    id: "ios-security",
    question: "How do I secure an iOS app?",
    keywords: ["ios security", "keychain", "secure enclave", "ats", "jailbreak detection"],
    category: "Mobile Security",
    difficulty: "Intermediate",
    relatedQuestions: ["android-security", "mobile-api-security", "certificate-pinning", "secure-local-storage"],
    answer: {
      whatIsIt:
        "iOS security focuses on securing data in the Keychain, enforcing ATS and certificate validation, and protecting app logic, tokens, and sensitive flows.",
      whyItMatters:
        "iOS has strong platform protections, but app design flaws still expose PII, tokens, and business logic when they are stored or transmitted insecurely.",
      example:
        "An iOS app stores a session token in plain user defaults and allows untrusted URL schemes, exposing the token to untrusted app interactions or jailbreak contexts.",
      howToDetectIt:
        "Review Keychain use, ATS enforcement, URL scheme handling, certificate validation, and local storage patterns. Check for insecure logging and weak trust assumptions.",
      howToPreventIt:
        "Use Keychain for secrets, enforce ATS, validate certificates, use secure local storage, and treat jailbreak and rooted device conditions as risk signals. Minimize insecure URL handling and allowlists.",
      bestPractices: [
        "Store credentials in the Keychain",
        "Use ATS and evaluate exceptions carefully",
        "Avoid logging sensitive data or tokens",
        "Validate URL schemes and app deep links",
      ],
    },
  },
  {
    id: "tls",
    question: "What is TLS and why is it important?",
    keywords: ["tls", "https", "certificate validation", "cryptography", "transport security"],
    category: "Cryptography",
    difficulty: "Beginner",
    relatedQuestions: ["encryption", "pki", "https", "wifi-security"],
    answer: {
      whatIsIt:
        "TLS is a protocol that encrypts traffic between clients and servers and verifies server identity using certificates. HTTPS is the web form of TLS.",
      whyItMatters:
        "Without TLS, attackers can read or modify data in transit. It also protects credentials, tokens, and API data from eavesdropping and tampering.",
      example:
        "A user's browser connects to a shopping site over HTTPS. TLS encrypts the session and authenticates the server certificate before the browser sends payment or account information.",
      howToDetectIt:
        "Verify certificate chains, protocol versions, cipher suites, and endpoints. Look for downgrade, expired certificate, or weak TLS settings in web servers and clients.",
      howToPreventIt:
        "Use modern TLS versions, valid certificates, strong ciphers, HSTS, and certificate rotation. Disable legacy protocols and misconfigured trust settings.",
      bestPractices: [
        "Use TLS for all internet traffic",
        "Enforce certificate validation and timely rotation",
        "Prefer modern TLS 1.2+ configurations",
        "Protect endpoints with HSTS and secure ciphers",
      ],
    },
  },
  {
    id: "encryption",
    question: "What is encryption and how is it used?",
    keywords: ["encryption", "decrypt", "symmetric", "asymmetric", "key management"],
    category: "Cryptography",
    difficulty: "Beginner",
    relatedQuestions: ["tls", "hashing", "aes", "rsa", "pki"],
    answer: {
      whatIsIt:
        "Encryption transforms readable data into ciphertext so that only authorized parties with the correct key can recover it. Decryption reverses the process.",
      whyItMatters:
        "It protects data at rest and in transit, especially when stored on disk, in backups, or transmitted over networks. Encryption alone does not replace authentication or authorization.",
      example:
        "A database system encrypts customer records at rest using a managed key service, and TLS encrypts responses between the app and browser.",
      howToDetectIt:
        "Review where sensitive data lives, how keys are managed, and whether critical channels use encryption. Look for plaintext secrets and weak key handling.",
      howToPreventIt:
        "Use modern algorithms, manage keys in a secret store or KMS, rotate keys, and restrict access to decryption capabilities. Always pair encryption with proper identity and policy controls.",
      bestPractices: [
        "Encrypt data at rest and in transit",
        "Use managed KMS or HSM-backed key services",
        "Protect keys separately from encrypted data",
        "Rotate keys and monitor failures",
      ],
    },
  },
  {
    id: "ransomware-response",
    question: "How should I respond to ransomware?",
    keywords: ["ransomware", "incident response", "backup", "containment", "malware"],
    category: "Incident Response",
    difficulty: "Intermediate",
    relatedQuestions: ["malware", "phishing", "incident-response-lifecycle", "backup"],
    answer: {
      whatIsIt:
        "Ransomware is malicious software that encrypts data or locks systems and demands payment to restore access. It often spreads through phishing, vulnerable services, or stolen credentials.",
      whyItMatters:
        "It can disrupt operations, destroy trust, and cause irreversible data loss if the recovery strategy is weak. Containing it quickly and preserving evidence matters.",
      example:
        "An employee clicks a malicious attachment, malware encrypts sensitive shares, and the SOC isolates endpoints before the spread reaches backups or domain controllers.",
      howToDetectIt:
        "Use endpoint alerts, file activity monitoring, unusual encryption patterns, and domain-wide telemetry. Watch for rapid file renames, encrypted extensions, and new service creation.",
      howToPreventIt:
        "Prevention focuses on patching, phishing defenses, MFA, backups, EDR, and segmentation. During an incident, isolate affected systems, preserve evidence, and restore from clean backups.",
      bestPractices: [
        "Isolate affected hosts and disable shared credentials",
        "Verify backups are clean and protected from modification",
        "Preserve logs and forensic artifacts before recovery",
        "Follow a tested incident playbook and communicate clearly",
      ],
    },
  },
  {
    id: "soc",
    question: "What is a SOC and how does it help?",
    keywords: ["soc", "siem", "soar", "edr", "threat detection"],
    category: "SOC",
    difficulty: "Intermediate",
    relatedQuestions: ["siem", "incident-response-lifecycle", "threat-hunting", "mitre-attack"],
    answer: {
      whatIsIt:
        "A SOC, or Security Operations Center, is a function that monitors systems, detects suspicious activity, triages alerts, and coordinates response. It combines people, processes, and technology.",
      whyItMatters:
        "Most attacks leave traces in logs, endpoints, identity systems, and network telemetry. A SOC helps detect and respond before damage escalates.",
      example:
        "An analyst sees a failed login sequence followed by a new admin account creation and suspicious lateral movement. The SOC triages and investigates the chain of events.",
      howToDetectIt:
        "Use SIEM correlation, EDR telemetry, and detection engineering to identify suspicious patterns such as repeated logins, privilege changes, and unusual network flows.",
      howToPreventIt:
        "Collect high-value logs, tune detections to reduce noise, add threat-hunting workflows, and practice alert triage. Align alerting to the business risk and incident priorities.",
      bestPractices: [
        "Standardize alert triage and escalation",
        "Tune detections to reduce false positives",
        "Correlate identity, endpoint, and network signals",
        "Practice playbooks for high-severity incidents",
      ],
    },
  },
  {
    id: "mitre-attack",
    question: "What is MITRE ATT&CK?",
    keywords: ["mitre attack", "tactics", "techniques", "initial access", "lateral movement"],
    category: "MITRE",
    difficulty: "Intermediate",
    relatedQuestions: ["soc", "threat-hunting", "incident-response-lifecycle", "malware"],
    answer: {
      whatIsIt:
        "MITRE ATT&CK is a knowledge base of adversary tactics, techniques, and procedures used to model security threats and improve detections and defenses.",
      whyItMatters:
        "It helps defenders map observed behaviors to known adversary patterns, making detection engineering and investigations more systematic and actionable.",
      example:
        "A suspicious PowerShell execution, credential dumping, and remote service use can be mapped to ATT&CK techniques like Execution, Credential Access, and Lateral Movement.",
      howToDetectIt:
        "Map telemetry to the ATT&CK framework, align detections to techniques, and validate how reliably your environment covers suspicious sequences.",
      howToPreventIt:
        "Use ATT&CK to prioritize detection coverage, harden risky behaviors, and validate defensive controls against the most likely attack paths.",
      bestPractices: [
        "Map detections to ATT&CK techniques",
        "Review coverage for privilege escalation and credential access",
        "Use ATT&CK for threat hunting and red-blue exercises",
        "Keep detections aligned to emerging adversary behavior",
      ],
    },
  },
  {
    id: "penetration-testing",
    question: "What is penetration testing?",
    keywords: ["penetration testing", "vulnerability assessment", "red team", "ethical hacking"],
    category: "Penetration Testing",
    difficulty: "Intermediate",
    relatedQuestions: ["owasp", "threat-modeling", "vulnerability-management", "mitre-attack"],
    answer: {
      whatIsIt:
        "Penetration testing is a controlled, authorized security assessment that attempts to find and validate vulnerabilities in systems, applications, or networks using professional methods.",
      whyItMatters:
        "Organizations need realistic validation of controls before depend on them. By simulating adversary behavior, teams can uncover risk and strengthen defenses.",
      example:
        "A security team conducts a scoped test against a web app, validates a misconfiguration or injection flaw, and documents the impact and remediation guidance.",
      howToDetectIt:
        "Use vulnerability scanning, targeted exploitation attempts, and manual verification under clear authorization and rules of engagement. Focus on validation and risk.",
      howToPreventIt:
        "Develop a defensible testing program with clear scope, change windows, and remediation tracking. Treat testing as a complement to secure design and monitoring.",
      bestPractices: [
        "Scope and authorize all testing explicitly",
        "Validate findings before reporting impact",
        "Track remediation with risk rating and ownership",
        "Use the right tools for the target and environment",
      ],
    },
  },
  {
    id: "ai-security",
    question: "What is AI security and LLM security?",
    keywords: ["ai security", "llm security", "prompt injection", "model poisoning", "rag security"],
    category: "AI Security",
    difficulty: "Advanced",
    relatedQuestions: ["secure-coding", "data-leakage", "responsible-ai", "supply-chain"],
    answer: {
      whatIsIt:
        "AI security addresses risks in machine learning models, LLMs, training data, prompts, integrations, and retrieval pipelines. LLM security focuses on prompt injection, jailbreaks, data leakage, and unsafe agent actions.",
      whyItMatters:
        "AI systems can leak sensitive data, execute unsafe instructions, or be manipulated by crafted inputs. They also require governance around model provenance, data handling, and output trust.",
      example:
        "A chatbot connected to internal documents is tricked with a prompt that causes it to reveal confidential files or externalize protected data through a reply.",
      howToDetectIt:
        "Review prompt handling, tool permissions, output filtering, retrieval boundaries, and downstream model security. Test for prompt injection, unsafe tool invocation, and information leakage.",
      howToPreventIt:
        "Gate tool access, limit prompts and outputs, validate model inputs, isolate sensitive data, and monitor for misuse. Apply secure design, data classification, and model governance.",
      bestPractices: [
        "Treat prompts as untrusted input",
        "Use least-privilege model tool access",
        "Filter and validate outputs before acting on them",
        "Protect training data, prompts, and retrieval sources",
      ],
    },
  },
  {
    id: "devsecops",
    question: "What is DevSecOps?",
    keywords: ["devsecops", "secure sdls", "sast", "daST", "iac scanning"],
    category: "DevSecOps",
    difficulty: "Intermediate",
    relatedQuestions: ["secure-coding", "supply-chain", "container-security", "vulnerability-management"],
    answer: {
      whatIsIt:
        "DevSecOps embeds security into the software development lifecycle so that vulnerabilities are found earlier and treated as part of the delivery pipeline rather than an afterthought.",
      whyItMatters:
        "A secure SDLC reduces the chance that vulnerable code or dependencies reach production. It also shortens the time to remediate issues by making scanning and review continuous.",
      example:
        "A CI pipeline runs SAST, dependency scanning, and IaC checks before deployment. If a secret is committed or a vulnerable package is introduced, the pipeline blocks the change.",
      howToDetectIt:
        "Review pipeline security, branch protection, scanning coverage, and remediation workflows. Look for missing scans or privileged pipelines that can access production secrets.",
      howToPreventIt:
        "Add security gates to CI/CD, enforce signed commits, scan dependencies and IaC, protect secrets, and require code review and branch protection for critical branches.",
      bestPractices: [
        "Shift left with code and dependency scanning",
        "Use secret scanning and SBOM generation",
        "Protect pipelines with least privilege and approvals",
        "Track vulnerabilities through triage and remediation",
      ],
    },
  },
  {
    id: "secure-coding",
    question: "How do I write secure code?",
    keywords: ["secure coding", "input validation", "output encoding", "logging", "threat modeling"],
    category: "Software Security",
    difficulty: "Beginner",
    relatedQuestions: ["xss", "sql-injection", "api-security", "threat-modeling"],
    answer: {
      whatIsIt:
        "Secure coding is the practice of designing and implementing software with security in mind: validating inputs, protecting state, limiting privilege, and handling failures safely.",
      whyItMatters:
        "Most vulnerabilities are introduced during development, not at deployment. Good coding habits reduce exploitable flaws and make later review easier.",
      example:
        "A login system validates input, uses a password hashing algorithm, validates authorization on the server, and ensures errors do not reveal database details.",
      howToDetectIt:
        "Review risky code paths, data flows, trust boundaries, and security-sensitive operations. Use code review, audits, and security tests to catch misses.",
      howToPreventIt:
        "Use frameworks and libraries securely, validate input at boundaries, encode output by context, enforce authorization, protect secrets, and log moderately without exposing sensitive information.",
      bestPractices: [
        "Validate input and constrain it to expected types and ranges",
        "Use safe defaults and fail-secure behavior",
        "Minimize privileges and secrets in source code",
        "Test security-sensitive flows with realistic cases",
      ],
    },
  },
  {
    id: "iso-27001",
    question: "What is ISO 27001?",
    keywords: ["iso 27001", "information security management", "cybersecurity framework", "risk management"],
    category: "Compliance",
    difficulty: "Beginner",
    relatedQuestions: ["nist-csf", "soc-2", "gdpr", "risk-assessment"],
    answer: {
      whatIsIt:
        "ISO 27001 is an international standard for establishing, implementing, maintaining, and improving an information security management system (ISMS).",
      whyItMatters:
        "It helps organizations manage cybersecurity risk systematically through policy, governance, operational controls, and continual improvement.",
      example:
        "An organization documents roles, asset inventories, access controls, incident response plans, supplier security expectations, and periodic reviews under the program.",
      howToDetectIt:
        "Review governance, policies, asset inventories, risk assessment, and evidence of operational control performance. Look for gaps between policy and actual practice.",
      howToPreventIt:
        "Define security ownership, risk-based controls, training, measurement, and improvement loops. Tie the controls to business processes and asset criticality.",
      bestPractices: [
        "Map controls to business risk and assets",
        "Review the ISMS regularly and update as technology changes",
        "Assess third-party risk and governance rigorously",
        "Track incidents, nonconformities, and corrective actions",
      ],
    },
  },
  {
    id: "database-security",
    question: "How do I secure a database?",
    keywords: ["database security", "postgresql", "mysql", "mongodb", "row level security"],
    category: "Database Security",
    difficulty: "Intermediate",
    relatedQuestions: ["sql-injection", "encrypted-storage", "least-privilege", "secrets-management"],
    answer: {
      whatIsIt:
        "Database security covers protecting data confidentiality, integrity, and availability through authentication, authorization, encryption, auditing, and backup controls.",
      whyItMatters:
        "Databases often hold the most valuable information in an application. A single weak database credential or misconfigured permission can lead to broad exposure.",
      example:
        "A production database accepts connections from every host, stores encryption keys in plain files, and grants a shared account broad privileges. This creates a high-risk posture.",
      howToDetectIt:
        "Review user roles, connection rules, encryption settings, audit logs, and data exposure paths. Inspect for shared accounts, open ports, and row-level policy gaps.",
      howToPreventIt:
        "Use least privilege, strong auth, TLS, encrypted backups, auditing, and separate admin responsibilities. Minimize data exposure and ensure secrets are managed outside code and config files.",
      bestPractices: [
        "Use unique credentials and minimal privileges",
        "Encrypt data at rest and in transit",
        "Audit access and query activity",
        "Apply row-level security where needed",
      ],
    },
  },
  {
    id: "active-directory",
    question: "How is Active Directory secured?",
    keywords: ["active directory", "domain controller", "kerberos", "ntlm", "group policy"],
    category: "Active Directory",
    difficulty: "Advanced",
    relatedQuestions: ["windows-security", "privilege-escalation", "lateral-movement", "mfa"],
    answer: {
      whatIsIt:
        "Active Directory is Microsoft's identity and access directory service. It authenticates users and systems and controls access to resources in Windows enterprise environments.",
      whyItMatters:
        "AD often underpins enterprise trust. If it is compromised, attackers can move laterally, steal credentials, and access major business systems.",
      example:
        "An administrator account with unrestricted domain rights is abused to create a new domain admin account and spread through the environment.",
      howToDetectIt:
        "Monitor domain controller events, authentication anomalies, privilege changes, and abnormal service account activity. Review Group Policy and privileged admin actions.",
      howToPreventIt:
        "Apply least privilege, separate privileged groups, protect admin workstations, enable secure authentication, and monitor suspicious activity. Limit service account privileges and patch domain controllers regularly.",
      bestPractices: [
        "Use tiered admin models and tightly scoped privileges",
        "Protect privileged accounts with strong MFA and auditing",
        "Monitor Kerberos, NTLM, and service account activity",
        "Patch and harden domain controllers consistently",
      ],
    },
  },
  {
    id: "cloud-incident-response",
    question: "What is cloud incident response?",
    keywords: ["cloud incident response", "aws incident", "azure", "gcp", "forensics"],
    category: "Cloud Security",
    difficulty: "Intermediate",
    relatedQuestions: ["aws-security", "soc", "incident-response-lifecycle", "logging"],
    answer: {
      whatIsIt:
        "Cloud incident response is the process of identifying, containing, investigating, and recovering from security events in cloud environments while preserving evidence and minimizing business impact.",
      whyItMatters:
        "Cloud environments scale quickly and are often interconnected with code, identities, networks, and data stores. Security incidents can propagate across services rapidly.",
      example:
        "An attacker obtains a cloud role and starts enumerating resources. The response includes tracing the role usage, revoking credentials, isolating workloads, and reviewing access logs.",
      howToDetectIt:
        "Use centralized logging, identity telemetry, audit trails, and alerts from cloud-native services such as CloudTrail, Azure Monitor, or Google Cloud Logging.",
      howToPreventIt:
        "Define incident playbooks, protect administrative access, review logs, require least privilege, and test recovery by simulating common attack patterns.",
      bestPractices: [
        "Centralize telemetry and alerting",
        "Protect admin identities and secrets",
        "Practice cloud-specific containment and recovery",
        "Document evidence handling and stakeholder coordination",
      ],
    },
  },
]

export const securityCategories = Array.from(
  new Set(securityKnowledgeEntries.map((entry) => entry.category)),
)

export const popularSecurityTopics = [
  "What is SQL injection?",
  "How do I protect an API?",
  "What is JWT?",
  "How do I secure AWS?",
  "What is zero trust?",
  "How do I secure Kubernetes?",
  "How should I respond to ransomware?",
  "What is AI security and LLM security?",
  "How do I secure an Android app?",
  "What is MITRE ATT&CK?",
]

export const securityKnowledgeLookup = Object.fromEntries(
  securityKnowledgeEntries.map((entry) => [entry.id, entry]),
)
