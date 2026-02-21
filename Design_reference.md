# Modern Design Best Practices

## Philosophy

Create unique, memorable experiences while maintaining consistency through modern design principles. Every project should feel distinct yet professional, innovative yet intuitive.

---

## Landing Pages & Marketing Sites

### Hero Sections
**Go beyond static backgrounds:**
- Animated gradients with subtle movement
- Particle systems or geometric shapes floating
- Interactive canvas backgrounds (Three.js, WebGL)
- Video backgrounds with proper fallbacks
- Parallax scrolling effects
- Gradient mesh animations
- Morphing blob animations


### Layout Patterns
**Use modern grid systems:**
- Bento grids (asymmetric card layouts)
- Masonry layouts for varied content
- Feature sections with diagonal cuts or curves
- Overlapping elements with proper z-index
- Split-screen designs with scroll-triggered reveals

**Avoid:** Traditional 3-column equal grids

### Scroll Animations
**Engage users as they scroll:**
- Fade-in and slide-up animations for sections
- Scroll-triggered parallax effects
- Progress indicators for long pages
- Sticky elements that transform on scroll
- Horizontal scroll sections for portfolios
- Text reveal animations (word by word, letter by letter)
- Number counters animating into view

**Avoid:** Static pages with no scroll interaction

### Call-to-Action Areas
**Make CTAs impossible to miss:**
- Gradient buttons with hover effects
- Floating action buttons with micro-interactions
- Animated borders or glowing effects
- Scale/lift on hover
- Interactive elements that respond to mouse position
- Pulsing indicators for primary actions

---

## Dashboard Applications

### Layout Structure
**Always use collapsible side navigation:**
- Sidebar that can collapse to icons only
- Smooth transition animations between states
- Persistent navigation state (remember user preference)
- Mobile: drawer that slides in/out
- Desktop: sidebar with expand/collapse toggle
- Icons visible even when collapsed

**Structure:**
```
/dashboard (layout wrapper with sidebar)
  /dashboard/overview
  /dashboard/analytics
  /dashboard/settings
  /dashboard/users
  /dashboard/projects
```

All dashboard pages should be nested inside the dashboard layout, not separate routes.

### Data Tables
**Modern table design:**
- Sticky headers on scroll
- Row hover states with subtle elevation
- Sortable columns with clear indicators
- Pagination with items-per-page control
- Search/filter with instant feedback
- Selection checkboxes with bulk actions
- Responsive: cards on mobile, table on desktop
- Loading skeletons, not spinners
- Empty states with illustrations or helpful text

**Use modern table libraries:**
- TanStack Table (React Table v8)
- AG Grid for complex data
- Data Grid from MUI (if using MUI)

### Charts & Visualizations
**Use the latest charting libraries:**
- Recharts (for React, simple charts)
- Chart.js v4 (versatile, well-maintained)
- Apache ECharts (advanced, interactive)
- D3.js (custom, complex visualizations)
- Tremor (for dashboards, built on Recharts)

**Chart best practices:**
- Animated transitions when data changes
- Interactive tooltips with detailed info
- Responsive sizing
- Color scheme matching design system
- Legend placement that doesn't obstruct data
- Loading states while fetching data

### Dashboard Cards
**Metric cards should stand out:**
- Gradient backgrounds or colored accents
- Trend indicators (↑ ↓ with color coding)
- Sparkline charts for historical data
- Hover effects revealing more detail
- Icon representing the metric
- Comparison to previous period

---

## Color & Visual Design

### Color Palettes
**Create depth with gradients:**
- Primary gradient (not just solid primary color)
- Subtle background gradients
- Gradient text for headings
- Gradient borders on cards
- Elevated surfaces for depth

**Color usage:**
- 60-30-10 rule (dominant, secondary, accent)
- Consistent semantic colors (success, warning, error)
- Accessible contrast ratios (WCAG AA minimum)

### Typography
**Create hierarchy through contrast:**
- Large, bold headings (48-72px for heroes)
- Clear size differences between levels
- Variable font weights (300, 400, 600, 700)
- Letter spacing for small caps
- Line height 1.5-1.7 for body text
- Inter, Poppins, or DM Sans for modern feel

### Shadows & Depth
**Layer UI elements:**
- Multi-layer shadows for realistic depth
- Colored shadows matching element color
- Elevated states on hover
- Neumorphism for special elements (sparingly)

---

## Interactions & Micro-animations

### Button Interactions
**Every button should react:**
- Scale slightly on hover (1.02-1.05)
- Lift with shadow on hover
- Ripple effect on click
- Loading state with spinner or progress
- Disabled state clearly visible
- Success state with checkmark animation

### Card Interactions
**Make cards feel alive:**
- Lift on hover with increased shadow
- Subtle border glow on hover
- Tilt effect following mouse (3D transform)
- Smooth transitions (200-300ms)
- Click feedback for interactive cards

### Form Interactions
**Guide users through forms:**
- Input focus states with border color change
- Floating labels that animate up
- Real-time validation with inline messages
- Success checkmarks for valid inputs
- Error states with shake animation
- Password strength indicators
- Character count for text areas

### Page Transitions
**Smooth between views:**
- Fade + slide for page changes
- Skeleton loaders during data fetch
- Optimistic UI updates
- Stagger animations for lists
- Route transition animations

---

## Mobile Responsiveness

### Mobile-First Approach
**Design for mobile, enhance for desktop:**
- Touch targets minimum 44x44px
- Generous padding and spacing
- Sticky bottom navigation on mobile
- Collapsible sections for long content
- Swipeable cards and galleries
- Pull-to-refresh where appropriate

### Responsive Patterns
**Adapt layouts intelligently:**
- Hamburger menu → full nav bar
- Card grid → stack on mobile
- Sidebar → drawer
- Multi-column → single column
- Data tables → card list
- Hide/show elements based on viewport

---

## Loading & Empty States

### Loading States
**Never leave users wondering:**
- Skeleton screens matching content layout
- Progress bars for known durations
- Animated placeholders
- Spinners only for short waits (<3s)
- Stagger loading for multiple elements
- Shimmer effects on skeletons

### Empty States
**Make empty states helpful:**
- Illustrations or icons
- Helpful copy explaining why it's empty
- Clear CTA to add first item
- Examples or suggestions
- No "no data" text alone

---

## Unique Elements to Stand Out

### Distinctive Features
**Add personality:**
- Custom cursor effects on landing pages
- Animated page numbers or section indicators
- Unusual hover effects (magnification, distortion)
- Custom scrollbars
- Glassmorphism for overlays
- Animated SVG icons
- Typewriter effects for hero text
- Confetti or celebration animations for actions

### Interactive Elements
**Engage users:**
- Drag-and-drop interfaces
- Sliders and range controls
- Toggle switches with animations
- Progress steps with animations
- Expandable/collapsible sections
- Tabs with slide indicators
- Image comparison sliders
- Interactive demos or playgrounds

---

## Consistency Rules

### Maintain Consistency
**What should stay consistent:**
- Spacing scale (4px, 8px, 16px, 24px, 32px, 48px, 64px)
- Border radius values
- Animation timing (200ms, 300ms, 500ms)
- Color system (primary, secondary, accent, neutrals)
- Typography scale
- Icon style (outline vs filled)
- Button styles across the app
- Form element styles

### What Can Vary
**Project-specific customization:**
- Color palette (different colors, same system)
- Layout creativity (grids, asymmetry)
- Illustration style
- Animation personality
- Feature-specific interactions
- Hero section design
- Card styling variations
- Background patterns or textures

---

## Technical Excellence

### Performance
- Optimize images (WebP, lazy loading)
- Code splitting for faster loads
- Debounce search inputs
- Virtualize long lists
- Minimize re-renders
- Use proper memoization

### Accessibility
- Keyboard navigation throughout
- ARIA labels where needed
- Focus indicators visible
- Screen reader friendly
- Sufficient color contrast
- Respect reduced motion preferences

---

## Key Principles

1. **Be Bold** - Don't be afraid to try unique layouts and interactions
2. **Be Consistent** - Use the same patterns for similar functions
3. **Be Responsive** - Design works beautifully on all devices
4. **Be Fast** - Animations are smooth, loading is quick
5. **Be Accessible** - Everyone can use what you build
6. **Be Modern** - Use current design trends and technologies
7. **Be Unique** - Each project should have its own personality
8. **Be Intuitive** - Users shouldn't need instructions


---

# Project-Specific Customizations

**IMPORTANT: This section contains the specific design requirements for THIS project. The guidelines above are universal best practices - these customizations below take precedence for project-specific decisions.**

## User Design Requirements

# LifeOps — Development Blueprint

## Project Concept
LifeOps is a modular, multi-agent AI operating system that automates projects, content, finances, and health through coordinated GPT-5–powered agents. It provides a Master Dashboard and module dashboards (Projects, Content, Finance, Health), an orchestration layer for traceable agent-to-agent messages, scoped shared memory, conflict resolution rules, and a Cronjobs system treating scheduled autonomy as first-class objects. Each action is explainable, permissioned, schema-validated, logged, and reversible. The vision is an enterprise-grade, AI-native orchestration platform enabling safe, auditable, and configurable autonomous assistants for power users, teams, and orgs.

AI app description: Specialized agents per domain communicate through an ordered message bus and runtime abstraction. Cronjobs schedule or trigger agents/workflows with rich constraints, safety rails, and approval levels. The platform emphasizes explainability, reversibility, and full audit artifacts while integrating with external systems (VCS, CI/CD, CMS, banks, fitness trackers).

## Problem Statement
- Core problems:
  - Knowledge workers and teams spend repeated time on recurring operational tasks (triage PRs, monthly close, content pipelines, training plans).
  - Existing single-agent automations lack multi-agent coordination, traceability, and safe rollback.
  - Scheduled autonomy is often brittle or all-or-nothing without fine-grained controls and human-in-the-loop approvals.
  - Integrations across VCS, CI, finance, CMS and trackers are fragmented and hard to orchestrate with explainability and compliance.
- Who experiences these problems:
  - Individual founders, knowledge workers, content teams, finance managers, coaches/athletes, and org admins.
- Why these problems matter:
  - Time wasted, risky automated actions, lack of auditability, compliance exposure, and lost trust hinder adoption.
- Current state/gaps:
  - Tools either provide basic scheduling or heavy RPA but lack AI-native multi-agent orchestration, reversible actions, and first-class Cronjob objects with safety/approval controls.

## Solution
- How it addresses problems:
  - Multi-agent orchestration enables domain-specific agents to negotiate, handoff, and reach consensus with traceable messages and shared scoped memory.
  - Cronjobs as first-class objects provide safe scheduled autonomy with templated payloads, automation levels, constraints, retries and run artifacts.
  - Explainability and reversible actions (diffs, rollback scripts, schema validation) build trust and compliance.
  - Rich connectors and developer SDKs allow deep integration with VCS, CI, CMS, banks, trackers, and email/billing.
- Approach & methodology:
  - Modular architecture: agent runtime, message bus, cron engine, approvals layer, connectors/secret vault, UI frontends per module, REST/gRPC APIs, and SDKs.
  - Security & compliance-first: RBAC, audit logs, tamper-evident entries, encryption, and optional on-prem runners.
  - Progressive disclosure UX with templates and guided onboarding to reduce complexity.
- Key differentiators:
  - First-class Cronjobs with automation levels and full run artifacts.
  - Explainability stored alongside actions and schema-validated outputs enabling safe reversals.
  - Developer-centric project automation integrated with release orchestration and CI.
- Value creation:
  - Saves operational time, reduces human error, increases trust in automation, and unlocks new workflows through reusable templates and marketplace.

## Requirements

### 1. Pages (UI Screens)
List of pages with purpose, key components, and contribution:

- Landing Page (Public marketing)
  - Purpose: Communicate value, convert visitors to signups/demos.
  - Key sections: Hero, Feature Overview (Projects, Content, Finance, Health), Cronjobs & Approvals Snapshot, Use Cases, Pricing Teaser, Footer.
  - Contribution: Drives acquisition and explains first-class Cronjobs and agent benefits.

- Login / Signup
  - Purpose: Authentication entrypoint.
  - Key components: Email/password forms, SSO/Social buttons (Google, Microsoft, GitHub), password strength meter, TOS checkbox.
  - Contribution: Secure onboarding and SSO for enterprise users.

- Email Verification
  - Purpose: Confirm user ownership of email.
  - Key components: Verification message, resend button (rate limited), manual 6-digit code input.
  - Contribution: Security & account trust.

- Password Reset
  - Purpose: Secure recovery flow.
  - Key components: Request form, reset form with token validation, strength meter.
  - Contribution: Account safety and accessibility.

- Master Dashboard
  - Purpose: Single command center for system health and orchestration.
  - Key components: Top nav (search, avatar, org switch), System Overview cards, Cronjobs Timeline (list/calendar), Active Runs Feed, Alerts Panel, Audit Snapshot, Quick Create.
  - Contribution: Central monitoring and quick control for automation.

- Agent Directory
  - Purpose: Manage agents (system/user).
  - Key components: Filterable list, agent details (capabilities, memory scope, connectors), Create Agent Wizard, actions (clone/archive), message trace viewer.
  - Contribution: Visibility and lifecycle management for agents.

- Module Dashboard — Projects
  - Purpose: Developer-centric automation (roadmaps, tickets, CI).
  - Key components: Project selector, Roadmap timeline, Ticket Board (Kanban with auto-triage), PR & Release pane, Integrations panel.
  - Contribution: Automates developer workflows and release orchestration.

- Module Dashboard — Content
  - Purpose: End-to-end content pipeline automation.
  - Key components: Content calendar, Idea inbox (agent outlines), Editor workspace with suggestions and versioning, publishing connectors, analytics.
  - Contribution: Streamlines content creation and publishing.

- Module Dashboard — Finance
  - Purpose: Automate bookkeeping, forecasting, anomalies.
  - Key components: Accounts overview, transactions feed with agent suggestions, subscriptions manager, forecasting & close workspace, export & audit.
  - Contribution: Reduce month-end effort and ensure traceable financial actions.

- Module Dashboard — Health
  - Purpose: Automate habits, training plans, recovery balancing.
  - Key components: Habits & goals, training plans with calendar sync, nutrition planner, recovery/load insights, device integrations.
  - Contribution: Personalized coaching and automated planning.

- Cronjobs Manager
  - Purpose: CRUD and visualize Cronjobs as first-class objects.
  - Key components: Cronjob list (next run, last outcome), Cronjob details (payload, constraints, safety rails), Schedule builder UI, Create/Edit wizard, run controls.
  - Contribution: Safe scheduling and governance for automated workflows.

- Workflow Template Library
  - Purpose: Reusable multi-agent workflow templates.
  - Key components: Template catalog, template details, import & customize flow, rating & comments.
  - Contribution: Accelerates adoption with prebuilt workflows.

- Approvals Queue
  - Purpose: Human-in-the-loop reviews for pending actions.
  - Key components: Approvals list with SLA timers, approval details (diffs, artifacts), decision controls (approve/reject/modify), threaded comments.
  - Contribution: Safety and auditability for automation.

- Run Details & Artifacts
  - Purpose: Inspect single run with full artifacts and rollback.
  - Key components: Run summary, message trace viewer, action diffs (side-by-side), artifacts panel, rollback controls.
  - Contribution: Explainability and reversible actions.

- User Profile
  - Purpose: Manage personal settings and API keys.
  - Key components: Profile info, connections, API keys, agent presets, security (2FA).
  - Contribution: User-level control and developer access.

- Organization / Team Settings
  - Purpose: Manage teams, RBAC, billing, enterprise config.
  - Key components: Team roster, RBAC policies, billing, enterprise options (SAML, on‑prem).
  - Contribution: Governance and enterprise controls.

- Settings & Preferences
  - Purpose: Global app settings and defaults.
  - Key components: Notification rules, automation defaults, data retention, developer settings.
  - Contribution: Platform customization and compliance.

- Admin Dashboard
  - Purpose: System admin controls and monitoring.
  - Key components: User management, system health, analytics, policy management.
  - Contribution: Operational reliability and policy enforcement.

- Integration Connectors
  - Purpose: Catalog and configure external connectors.
  - Key components: Connector catalog, setup wizard (OAuth/API key), secrets management, health panel.
  - Contribution: Enables workflow integrations.

- Docs & Help
  - Purpose: Documentation, tutorials, API docs.
  - Key components: Searchable docs, tutorials, support contact, changelog & status.
  - Contribution: Self-service enablement and onboarding.

- Privacy Policy, Terms of Service, Cookie Policy
  - Purpose: Legal and compliance pages.
  - Contribution: Regulatory and legal compliance.

- 404 Not Found / 500 Server Error
  - Purpose: User-friendly error handling.
  - Contribution: UX resilience and support guidance.

- Loading & Success States
  - Purpose: Standardized feedback components.
  - Contribution: Polished UX and clarity.

### 2. Features
Core features with technical details and implementation notes:

- User Authentication & Security
  - JWT access/refresh tokens, secure refresh flow.
  - OAuth2 (Google, Microsoft, GitHub), SAML for enterprise.
  - Password hashing with bcrypt/argon2, password policy enforcement.
  - Email verification with expiring tokens; TOTP 2FA with recovery codes.
  - Session management dashboard and revocation APIs.
  - Rate limiting & account lockout.

- Agent Orchestration Layer
  - Message bus (ordered, durable) with persistent traces (append-only store).
  - Agent runtime abstraction with pluggable skills/tools (connectors).
  - Scoped shared memory with ACLs, versioning and conflict resolution engine (rules: user constraints > safety > deadlines > ROI).
  - Explainability hooks (store rationales), schema validation for outputs, and audit logging.
  - APIs for agent registration, runtime telemetry, and tracing.

- Cronjobs Engine
  - Scheduler with cron expression and UI builder, timezone-aware next-run calculation.
  - Triggers: time, event (webhook), conditional expression language.
  - Payload templating with secure secret injection and variable mapping.
  - Automation levels: suggest-only, approval-required, conditional-auto, bounded-autopilot.
  - Constraint enforcement at runtime (max actions, spend limits, allowed tools).
  - Retry/backoff policy, dead-letter queue, run artifact storage, cost accounting.
  - Scalable worker pool with concurrency controls and rate limiting.

- Approvals Workflow
  - Approval queue model with SLA timers, assignment, and escalation.
  - Diff generation for text/structured data and partial approval (modify inputs).
  - Threaded comments, role gating, and conversion to recurring Cronjob.

- Explainability & Reversible Actions
  - Rationale storage per action, structured metadata, and schema validation service.
  - Diff engine for code/docs/ledger entries and automated reversal scripts.
  - Permission checks before rollback, simulated dry-run rollback.
  - Immutable audit logs and artifact versioning.

- Connectors & Secrets Management
  - Connector SDK and registry with metadata, OAuth and API key flows.
  - Secrets vault integration (KMS/HashiCorp/Azure Key Vault) with scoped access.
  - Connector health monitoring, retries, and sandbox test mode.

- Activity & Audit Logging
  - Append-only audit store with export CSV/JSON, fast indexing, retention config, and signed/tamper-evident entries.
  - SIEM integration and webhook forwarding.

- Search & Filter
  - Full-text + structured search (Elasticsearch/OpenSearch), faceted filters, access control at query time, autocomplete and saved queries.

- Notifications & Webhooks
  - Notification service with adapters (email, in-app, webhook, Slack), configurable rules, delivery retries and DLQ, audit of notifications.

- Billing & Usage Metering
  - Usage metering per run (GPT credits, connectors), Stripe/Chargebee integration, quota enforcement, usage dashboard.

- Developer SDK & APIs
  - REST + gRPC endpoints for agent registration, run invocation, message traces, artifacts.
  - SDKs: Node, Python, Go with auth helpers and samples.
  - API rate limiting, versioning, sandbox keys, and full API docs.

- Performance, Monitoring & Backup
  - Observability: Prometheus + Grafana / OpenTelemetry, tracing, alerts.
  - Automated backups for artifacts and traces, DR plan, health checks.

### 3. User Journeys
Step-by-step flows for each user type:

- New Individual User (End User)
  1. Visit Landing Page → Click Try Free → Signup (email/OAuth) → Email verification.
  2. Onboard flow: choose modules, connect 1–2 connectors (e.g., Google Calendar, GitHub), guided tour.
  3. Create first Cronjob via template (e.g., weekly digest): fill payload variables, set automation level to suggest-only.
  4. Run test execution → inspect Run Details & Artifacts, view message trace and rationale.
  5. Approve suggested actions in Approvals Queue → see action executed → view audit and optional rollback.

- Developer / Engineering Lead
  1. Signup via SSO → Connect GitHub and CI provider → Navigate to Projects module.
  2. Create an agent from template (PR triage), configure tools and permissions, test run.
  3. Create Cronjob to auto-triage nightly PRs with automation level approval-required.
  4. Review nightly Approval items, approve safe changes; gradually increase automation to bounded-autopilot.
  5. Use Run Details to inspect diffs and trigger rollback for erroneous changes.

- Content Creator / Manager
  1. Signup → Connect CMS & social accounts → Open Content module.
  2. Use Idea Inbox and agent outlines to generate drafts; iterate in Editor workspace with citations.
  3. Schedule publish via Cronjob with conditional trigger (e.g., analytics threshold) and approval-required.
  4. Monitor published performance; feed analytics to agent for future suggestions.

- Finance Manager
  1. Signup → Connect bank aggregator (Plaid) → Open Finance module.
  2. Configure Transactions Feed with agent auto-categorization (suggest-only).
  3. Create Cronjob for monthly close with constraints (max ledger changes, approval-required).
  4. Review anomalies flagged by agents in Approvals Queue, approve or modify adjustments.
  5. Export GL and store artifacts for audit.

- Health User / Coach
  1. Signup → Connect fitness trackers and calendar → Open Health module.
  2. Create goals and generate training plan via agent wizard; schedule plan deployments via Cronjob.
  3. Agents send periodic check-ins and adapt plan; user approves modifications as needed.
  4. Track adherence metrics and adjust automation levels.

- Admin / Org Owner
  1. SSO signup as admin → Go to Admin Dashboard → Configure RBAC, seats, billing.
  2. Set global automation defaults and safety policies; enable enterprise connectors (SAML, on-prem runners).
  3. Monitor connector health and Cronjob reliability metrics; manage approvals SLAs and escalations.
  4. Audit critical runs, export logs for compliance, orchestrate disaster recovery drills.

## UI Guide
Apply the design system consistently. All UI components must adhere to the Visual Style and Design Philosophy below.

## Visual Style

### Color Palette:
- Primary background: Deep charcoal black (#18181B).
- Secondary background: Slightly lighter dark gray (#232326, #242426).
- Accent colors: Vivid orange (#FF7300); soft green (#3FC56B); purple (#B16FFF).
- Borders/dividers: Semi-transparent gray (#2E2E32, #37373C).
- Text: White (#FFFFFF), off-white (#E5E7EB), muted gray (#A1A1AA).
- Interactive states: Light gray (#313136); thin neon color bars for active tags.
- Surface elevation: Subtle dark gradients and overlays.

### Typography & Layout:
- Font family: Modern geometric sans-serif (Inter / SF Pro).
- Weights: Headings 600–700; body 400–500.
- Spacing: Card padding 24–32px; list spacing 8–16px.
- Alignment: Left-aligned content with strong grid.

### Key Design Elements

- Card Design
  - Rounded corners (10–14px), dark backgrounds, subtle shadows/border-glows.
  - Optional color-coded sidebars for status.
  - Hover lift and brightness increase.

- Navigation
  - Fixed collapsible sidebar; slim top nav for global actions.
  - Smooth expand/collapse animations.

- Data Visualization
  - Flat neon-accented charts (orange/green/purple) on dark backgrounds.
  - Minimalist legends and muted labels.

- Interactive Elements
  - Buttons: Rounded rectangles; primary accent orange.
  - Form fields: Rounded dark inputs, clear accent focus outline.
  - Micro-interactions: Smooth transitions for modals/popovers/drag-and-drop.

### Design Philosophy
- Minimalist, information-dense, dark-first UI.
- Rounded approachable shapes with precise grids.
- Guided discovery, progressive disclosure, and reduced cognitive load.
- Enterprise-grade trust: clarity, traceability, and safe controls.

Implementation notes: Use dark palettes and typographic hierarchy consistently across pages. Provide accessible color contrasts and keyboard/mouse interactions.

## Instructions to AI Development Tool
1. Refer to Project Concept, Problem Statement, and Solution to preserve the "why" for each requirement.
2. Ensure all features and pages align with solving identified problems and user journeys.
3. Verify features and pages meet specifications before marking complete.
4. Enforce the UI Guide strictly: color palette, typography, spacing, and component behavior.
5. Maintain consistency with the solution approach, security, explainability, and reversibility across implementation.

---

Appendix: Technical Integrations & Assets Summary
- APIs: OpenAI/GPT‑5, OAuth providers (Google, Microsoft, GitHub), GitHub/GitLab, CI/CD providers, CMS & Social APIs, Plaid/aggregators, fitness trackers, SendGrid/Mailgun, Stripe/Chargebee, AWS S3/Azure Blob, Elasticsearch/OpenSearch.
- Assets: Brand logos (light/dark), Design System UI Kit, illustrations & icons (SVG), onboarding copy & tour, marketing assets, agent persona templates, Cronjob example templates, API/SDK samples.
- Observability: Prometheus + Grafana / OpenTelemetry, backup schedule, DR playbook.
- Security: KMS/HashiCorp/Azure Key Vault for secrets, RBAC, signed audit logs, encryption in transit/at rest.

This blueprint provides the full context and specifications to implement LifeOps: architecture, pages, features, flows, UI system, integrations, and assets. Build to these specs to deliver a secure, auditable, and modular multi-agent automation platform.

## Implementation Notes

When implementing this project:

1. **Follow Universal Guidelines**: Use the design best practices documented above as your foundation
2. **Apply Project Customizations**: Implement the specific design requirements stated in the "User Design Requirements" section
3. **Priority Order**: Project-specific requirements override universal guidelines when there's a conflict
4. **Color System**: Extract and implement color values as CSS custom properties in RGB format
5. **Typography**: Define font families, sizes, and weights based on specifications
6. **Spacing**: Establish consistent spacing scale following the design system
7. **Components**: Style all Shadcn components to match the design aesthetic
8. **Animations**: Use Motion library for transitions matching the design personality
9. **Responsive Design**: Ensure mobile-first responsive implementation

## Implementation Checklist

- [ ] Review universal design guidelines above
- [ ] Extract project-specific color palette and define CSS variables
- [ ] Configure Tailwind theme with custom colors
- [ ] Set up typography system (fonts, sizes, weights)
- [ ] Define spacing and sizing scales
- [ ] Create component variants matching design
- [ ] Implement responsive breakpoints
- [ ] Add animations and transitions
- [ ] Ensure accessibility standards
- [ ] Validate against user design requirements

---

**Remember: Always reference this file for design decisions. Do not use generic or placeholder designs.**
