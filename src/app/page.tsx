'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  useGoogleReCaptcha,
  GoogleReCaptchaProvider,
} from 'react-google-recaptcha-v3'
import Cookies from 'js-cookie'

const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY

function Login() {
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { executeRecaptcha } = useGoogleReCaptcha()
  const router = useRouter()

  useEffect(() => {
    if (!executeRecaptcha) {
      console.error('Google ReCaptcha has not been initialized properly.')
    }
  }, [executeRecaptcha])

  const handleLogin = async () => {
    if (!executeRecaptcha) {
      setError('ReCaptcha is not ready. Please try again later.')
      return
    }

    try {
      const recaptchaToken = await executeRecaptcha('login')

      const res = await fetch('https://cotacao.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, recaptchaToken }),
      })

      const data = await res.json()

      if (!data.success) {
        throw new Error('Login failed')
      }

      Cookies.set('authToken', data.access_token, { expires: 7 })
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    }
  }

  const handleRegister = async () => {
    if (!executeRecaptcha) {
      setError('ReCaptcha is not ready. Please try again later.')
      return
    }

    try {
      const recaptchaToken = await executeRecaptcha('register')

      const res = await fetch('https://cotacao.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, recaptchaToken }),
      })

      const data = await res.json()

      if (!data.success) {
        throw new Error('Registration failed')
      }

      alert(data.message)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    }
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p className="error-message">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  )
}

export default function App() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY || ''}>
      <Login />
    </GoogleReCaptchaProvider>
  )
}
