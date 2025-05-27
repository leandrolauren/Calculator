'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import CircularProgress from '@mui/material/CircularProgress'
import styled from 'styled-components'

export default function LoginPage() {
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

      document.cookie = `access_token=${token}`
      document.cookie = `token_type=${tokenType}`

      router.push('/home')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div
        className="loading-screen"
        style={{ textAlign: 'center', marginTop: '2rem' }}
      >
        <CircularProgress />
      </div>
    )
  }

  return (
    <StyledWrapper>
      <form className="form" onSubmit={handleLogin}>
        <p>Login</p>
        <div className="group">
          <input
            required
            className="main-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <span className="highlight-span" />
          <label className="label-email">User</label>
        </div>
        <div className="container-1">
          <div className="group">
            <input
              required
              className="main-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="highlight-span" />
            <label className="label-email">Password</label>
          </div>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button className="submit" type="submit">
          Login
        </button>
      </form>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid white;
    padding: 40px;
    background-color: #000; /* fixo */
    border-radius: 20px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .form p {
    padding-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 0.5px;
    color: #fff;
  }

  .group {
    position: relative;
    width: 100%;
  }

  .container-1 {
    padding-top: 30px;
    width: 100%;
  }

  .main-input {
    font-size: 16px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    border-bottom: 1px solid #6c6c6c;
    background: #181818; /* fixo */
    color: #fff;         /* fixo */
    transition: background 0.2s, color 0.2s;
  }

  .main-input:focus {
    outline: none;
    border-bottom-color: #42ff1c;
  }

  .label-email {
    color: #fff; /* fixo */
    opacity: 0.7;
    font-size: 18px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 0.2s ease all;
  }

  .main-input:focus ~ .label-email,
  .main-input:valid ~ .label-email {
    top: -20px;
    font-size: 14px;
    color: #42ff1c;
  }

  .highlight-span {
    position: absolute;
    height: 60%;
    width: 0px;
    top: 25%;
    left: 0;
    pointer-events: none;
    opacity: 0.5;
  }

  .main-input:focus ~ .highlight-span {
    animation: input-focus 0.3s ease;
  }

  @keyframes input-focus {
    from {
      background: #42ff1c;
    }
    to {
      width: 100%;
    }
  }

  .submit {
    margin-top: 1.2rem;
    padding: 10px 20px;
    border-radius: 10px;
    width: 100%;
    max-width: 200px;
    background-color: #42ff1c;
    color: #000;
    border: none;
    cursor: pointer;
    font-weight: bold;
  }

  .submit:hover {
  .submit:hover {lor: #36cc17;
    background-color: #36cc17;
  }
`
