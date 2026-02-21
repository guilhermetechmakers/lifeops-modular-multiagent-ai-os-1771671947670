import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { AuthLayout } from '@/components/layout/auth-layout'

const LandingPage = lazy(() => import('@/pages/landing'))
const LoginPage = lazy(() => import('@/pages/auth/login'))
const SignupPage = lazy(() => import('@/pages/auth/signup'))
const VerifyEmailPage = lazy(() => import('@/pages/auth/verify-email'))
const ResetPasswordPage = lazy(() => import('@/pages/auth/reset-password'))

const DashboardOverview = lazy(() => import('@/pages/dashboard/overview'))
const AgentsPage = lazy(() => import('@/pages/dashboard/agents'))
const ProjectsModule = lazy(() => import('@/pages/dashboard/modules/projects'))
const ContentModule = lazy(() => import('@/pages/dashboard/modules/content'))
const FinanceModule = lazy(() => import('@/pages/dashboard/modules/finance'))
const HealthModule = lazy(() => import('@/pages/dashboard/modules/health'))
const CronjobsPage = lazy(() => import('@/pages/dashboard/cronjobs'))
const WorkflowsPage = lazy(() => import('@/pages/dashboard/workflows'))
const ApprovalsPage = lazy(() => import('@/pages/dashboard/approvals'))
const RunDetailsPage = lazy(() => import('@/pages/dashboard/run-details'))
const ProfilePage = lazy(() => import('@/pages/dashboard/profile'))
const OrganizationPage = lazy(() => import('@/pages/dashboard/organization'))
const SettingsPage = lazy(() => import('@/pages/dashboard/settings'))
const AdminPage = lazy(() => import('@/pages/dashboard/admin'))
const ConnectorsPage = lazy(() => import('@/pages/dashboard/connectors'))
const DocsPage = lazy(() => import('@/pages/dashboard/docs'))

const PrivacyPolicyPage = lazy(() => import('@/pages/legal/privacy'))
const TermsOfServicePage = lazy(() => import('@/pages/legal/terms'))
const CookiePolicyPage = lazy(() => import('@/pages/legal/cookies'))
const NotFoundPage = lazy(() => import('@/pages/errors/not-found'))
const ServerErrorPage = lazy(() => import('@/pages/errors/server-error'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
})

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public */}
            <Route path="/" element={<LandingPage />} />

            {/* Auth */}
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
              <Route path="verify-email" element={<VerifyEmailPage />} />
              <Route path="reset-password" element={<ResetPasswordPage />} />
            </Route>

            {/* Dashboard */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="agents" element={<AgentsPage />} />
              <Route path="projects" element={<ProjectsModule />} />
              <Route path="content" element={<ContentModule />} />
              <Route path="finance" element={<FinanceModule />} />
              <Route path="health" element={<HealthModule />} />
              <Route path="cronjobs" element={<CronjobsPage />} />
              <Route path="workflows" element={<WorkflowsPage />} />
              <Route path="approvals" element={<ApprovalsPage />} />
              <Route path="runs/:runId" element={<RunDetailsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="organization" element={<OrganizationPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="admin" element={<AdminPage />} />
              <Route path="connectors" element={<ConnectorsPage />} />
              <Route path="docs" element={<DocsPage />} />
            </Route>

            {/* Legal */}
            <Route path="/legal/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/legal/terms" element={<TermsOfServicePage />} />
            <Route path="/legal/cookies" element={<CookiePolicyPage />} />

            {/* Errors */}
            <Route path="/500" element={<ServerErrorPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'rgb(35, 35, 38)',
            border: '1px solid rgb(55, 55, 60)',
            color: 'rgb(229, 231, 235)',
          },
        }}
      />
    </QueryClientProvider>
  )
}

export default App
