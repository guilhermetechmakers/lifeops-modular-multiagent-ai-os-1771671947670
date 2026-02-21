import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required'),
  rememberMe: z.boolean().optional().default(false),
})

export const signupSchema = z.object({
  name: z
    .string()
    .min(1, 'Full name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, 'Password must contain at least one special character'),
  acceptTos: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the Terms of Service' }),
  }),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type SignupFormData = z.infer<typeof signupSchema>

export interface AuthResponse {
  user: {
    id: string
    email: string
    name: string
    avatar?: string
    role: 'admin' | 'member' | 'viewer'
  }
  token: string
  refreshToken: string
}

export interface PasswordCheck {
  label: string
  met: boolean
}

export function getPasswordChecks(password: string): PasswordCheck[] {
  return [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains uppercase', met: /[A-Z]/.test(password) },
    { label: 'Contains number', met: /\d/.test(password) },
    { label: 'Special character', met: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password) },
  ]
}

export function getPasswordStrength(password: string): number {
  return getPasswordChecks(password).filter((c) => c.met).length
}
