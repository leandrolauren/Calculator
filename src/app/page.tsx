'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Login from './components/Login'
import { LoginHeader } from './components/LoginHeader'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const tokenExists = document.cookie.includes('access_token=')
    setIsLoggedIn(tokenExists)
  }, [])

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
    router.push('/') // Redirect to the home page after login
  }

  return (
    <div>
      {!isLoggedIn ? (
        <>
          <LoginHeader />
          <div className="container text-center">
            <Login onLoginSuccess={handleLoginSuccess} />
          </div>
        </>
      ) : (
        <div className="container text-center">
          <h1>Welcome!</h1>
          <p>
            This project provides an interface to analyze stock quotes and
            includes a compound interest calculator. Navigate through the
            application to explore these features and make informed financial
            decisions.
          </p>
        </div>
      )}
    </div>
  )
}
