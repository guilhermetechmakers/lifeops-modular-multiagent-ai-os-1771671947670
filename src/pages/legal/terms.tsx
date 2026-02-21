import { Link } from 'react-router-dom'
import { ArrowLeft, FileText } from 'lucide-react'

function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <FileText className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Terms of Service</h1>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground">Last updated: February 21, 2026</p>

          <div className="space-y-8 mt-8">
            {[
              { title: '1. Acceptance of Terms', content: 'By accessing or using LifeOps, you agree to be bound by these Terms of Service. If you are using LifeOps on behalf of an organization, you represent that you have authority to bind that organization.' },
              { title: '2. Service Description', content: 'LifeOps provides a multi-agent AI orchestration platform for automating workflows across projects, content, finance, and health domains. The service includes agent management, cronjob scheduling, approval workflows, and integration connectors.' },
              { title: '3. User Responsibilities', content: 'You are responsible for maintaining the security of your account, configuring appropriate automation levels and safety rails, reviewing and approving agent actions as required, and ensuring compliance with applicable laws when using automated workflows.' },
              { title: '4. AI Agent Limitations', content: 'AI agents operate within configured constraints and automation levels. While we strive for accuracy, agent outputs should be reviewed before critical actions. All agent actions are logged and reversible. You maintain ultimate responsibility for actions taken through your account.' },
              { title: '5. Data Ownership', content: 'You retain ownership of all data you input into LifeOps. We claim no ownership over your content, configurations, or workflow outputs. You grant us a limited license to process your data as necessary to provide the service.' },
              { title: '6. Service Availability', content: 'We target 99.9% uptime for the LifeOps platform. Scheduled maintenance windows will be communicated in advance. Enterprise customers may negotiate custom SLA terms.' },
              { title: '7. Limitation of Liability', content: 'LifeOps is provided "as is" without warranties of any kind. We are not liable for damages resulting from agent actions, integration failures, or service interruptions beyond the scope of our SLA commitments.' },
              { title: '8. Termination', content: 'You may terminate your account at any time. Upon termination, your data will be retained per your configured retention policy, after which it will be permanently deleted. We may terminate accounts that violate these terms.' },
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

export default TermsOfServicePage
