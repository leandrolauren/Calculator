'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface LoginProps {
  onLoginSuccess: () => void
}

const Login = ({ onLoginSuccess }: LoginProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false) // Loading state
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true) // Start loading
    setError('') // Clear previous errors

    try {
      const formData = new FormData()
      formData.append('grant_type', 'password')
      formData.append('username', username)
      formData.append('password', password)

      const response = await fetch('https://cotacao.onrender.com/login', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Invalid username or password')
      }

      const data = await response.json()
      const token = data.access_token
      const tokenType = data.token_type

      // Store token in cookies
      document.cookie = `access_token=${token}; max-age=604800` // 7 days
      document.cookie = `token_type=${tokenType}; max-age=604800`

      onLoginSuccess()
      router.push('/') // Redirect to home page
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false) // Stop loading
    }
  }

  if (isLoading) {
    return (
      <div
        className="loading-screen"
        style={{ textAlign: 'center', marginTop: '2rem' }}
      >
        <h2>Logging in...</h2>
        <p>Please wait while we process your login.</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
