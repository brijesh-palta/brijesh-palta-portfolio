# Brijesh Palta | Portfolio

Personal portfolio for Brijesh Palta, focused on cloud security, DevSecOps, projects, technical writing, and learning notes.

## Stack

- Next.js App Router with static export
- React and TypeScript
- Tailwind CSS and Radix UI
- pnpm for dependency management

## Local development

Requirements: Node.js 20 or newer and pnpm 10.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Useful checks:

```bash
pnpm exec tsc --noEmit
pnpm audit
pnpm build
```

The production build exports static files. Deploy the contents of `out/` to a static host. The `public/_headers` file follows the Cloudflare Pages/Netlify header-file format; GitHub Pages ignores it, so configure equivalent response headers at an edge proxy/CDN if you use one. Review the Content Security Policy against the services enabled for your deployment.

The Security page is a local educational checklist and command-style guide. It does not scan websites, execute shell commands, or send user input to a server.

## Browser deterrence

Production builds intercept a short list of common inspection shortcuts and provide a reusable `ProtectedImage` component for selected visuals. These measures only discourage casual actions: browser tools and direct requests can bypass them, and websites cannot reliably prevent operating-system screenshots or external capture. Static files in `public/` remain directly accessible, so never put secrets or access-controlled material there. No inspection shortcuts are intercepted during local development.
