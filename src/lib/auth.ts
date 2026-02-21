import { api, ApiError } from '@/lib/api'
import type { AuthResponse, LoginFormData, SignupFormData } from '@/lib/validations/auth'

const AUTH_TOKEN_KEY = 'auth_token'
const REFRESH_TOKEN_KEY = 'auth_refresh_token'
const REMEMBER_ME_KEY = 'auth_remember_me'

export function setAuthTokens(token: string, refreshToken: string, rememberMe: boolean) {
  localStorage.setItem(REMEMBER_ME_KEY, String(rememberMe))
  const storage = rememberMe ? localStorage : sessionStorage
  storage.setItem(AUTH_TOKEN_KEY, token)
  storage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}

export function getAuthToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY) || sessionStorage.getItem(AUTH_TOKEN_KEY)
}

export function clearAuthTokens() {
  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem(REMEMBER_ME_KEY)
  sessionStorage.removeItem(AUTH_TOKEN_KEY)
  sessionStorage.removeItem(REFRESH_TOKEN_KEY)
}

export function isAuthenticated(): boolean {
  return !!getAuthToken()
}

export async function loginWithEmail(data: LoginFormData): Promise<AuthResponse> {
  try {
    const response = await api.post<AuthResponse>('/auth/login', {
      email: data.email,
      password: data.password,
    })
    setAuthTokens(response.token, response.refreshToken, data.rememberMe ?? false)
    return response
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 401) throw new Error('Invalid email or password')
      if (error.status === 429) throw new Error('Too many attempts. Please try again later.')
      if (error.status === 403) throw new Error('Account locked. Please reset your password.')
    }
    throw new Error('Something went wrong. Please try again.')
  }
}

export async function signupWithEmail(data: SignupFormData): Promise<AuthResponse> {
  try {
    const response = await api.post<AuthResponse>('/auth/signup', {
      name: data.name,
      email: data.email,
      password: data.password,
    })
    setAuthTokens(response.token, response.refreshToken, false)
    return response
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 409) throw new Error('An account with this email already exists')
      if (error.status === 422) throw new Error('Please check your information and try again')
    }
    throw new Error('Something went wrong. Please try again.')
  }
}

export type SSOProvider = 'google' | 'microsoft' | 'github'

export async function loginWithSSO(provider: SSOProvider): Promise<void> {
  window.location.href = `/api/auth/sso/${provider}`
}

export async function logout(): Promise<void> {
  try {
    await api.post('/auth/logout')
  } finally {
    clearAuthTokens()
  }
}
