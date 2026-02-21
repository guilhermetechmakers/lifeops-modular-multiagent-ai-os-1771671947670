import { Link } from 'react-router-dom'
import { ArrowLeft, Cookie } from 'lucide-react'

function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <Cookie className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">Cookie Policy</h1>
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground">Last updated: February 21, 2026</p>

          <div className="space-y-8 mt-8">
            {[
              { title: '1. What Are Cookies', content: 'Cookies are small text files stored on your device when you visit LifeOps. They help us provide a better experience by remembering your preferences and maintaining your session.' },
              { title: '2. Essential Cookies', content: 'These cookies are necessary for LifeOps to function. They include session tokens, CSRF protection, and sidebar collapse state. These cannot be disabled.' },
              { title: '3. Analytics Cookies', content: 'We use analytics cookies to understand how users interact with LifeOps, which features are most used, and where we can improve. This data is anonymized and aggregated.' },
              { title: '4. Preference Cookies', content: 'These cookies remember your settings such as theme preferences, notification settings, and dashboard layout configurations.' },
              { title: '5. Managing Cookies', content: 'You can manage cookie preferences through your browser settings. Note that disabling essential cookies may affect LifeOps functionality.' },
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

export default CookiePolicyPage
