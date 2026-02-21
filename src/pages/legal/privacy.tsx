import { Link } from 'react-router-dom'
import { ArrowLeft, Shield } from 'lucide-react'

function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground">Last updated: February 21, 2026</p>

          <div className="space-y-8 mt-8">
            {[
              { title: '1. Information We Collect', content: 'We collect information you provide directly, including account details (name, email), usage data (agent configurations, run logs), and technical data (IP address, browser type). We also collect data from connected third-party services as authorized by you.' },
              { title: '2. How We Use Your Information', content: 'We use your information to provide and improve LifeOps services, execute agent workflows, maintain audit logs, send notifications, and ensure platform security. We never sell your personal data to third parties.' },
              { title: '3. Data Storage & Security', content: 'All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Audit logs are stored in tamper-evident, append-only stores. Secrets are managed through enterprise-grade vault integrations (KMS/HashiCorp). We maintain SOC 2 Type II compliance.' },
              { title: '4. Agent Data Processing', content: 'AI agents process data within scoped memory boundaries. Agent actions are logged, explainable, and reversible. You maintain full control over automation levels and can revoke agent access at any time.' },
              { title: '5. Third-Party Integrations', content: 'When you connect external services (GitHub, Plaid, etc.), we access only the data necessary for configured workflows. Connector credentials are stored in encrypted vaults with scoped access controls.' },
              { title: '6. Data Retention', content: 'You can configure data retention periods for run artifacts, audit logs, and message traces. Default retention periods are documented in your settings. You may request data deletion at any time.' },
              { title: '7. Your Rights', content: 'You have the right to access, correct, delete, and export your data. You can manage these rights through your profile settings or by contacting our support team.' },
              { title: '8. Contact Us', content: 'For privacy-related inquiries, contact us at privacy@lifeops.ai or through the support portal in your dashboard.' },
            ].map((section) => (
              <div key={section.title}>
                <h2 className="text-lg font-semibold text-foreground mb-2">{section.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicyPage
