'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const tokenExists = document.cookie.includes('access_token=')
    setIsLoggedIn(tokenExists)
  }, [])

  const handleLogout = () => {
    document.cookie = 'access_token=; max-age=0'
    document.cookie = 'token_type=; max-age=0'
    setIsLoggedIn(false)
    window.location.reload() // Reload the page to reflect logout
  }

  return (
    <header className="flex px-2 py-4 bg-zinc-900 text-white">
      <div className="flex items-center justify-between w-full mx-auto max-w-7x1">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-8 h-8" />
          <span>Leandro - NextJS</span>
        </div>
        {isLoggedIn && (
          <nav className="flex items-center gap-4">
            <ul className="flex items-center justify-center gap-2">
              <li>
                <Link href={'/'}>Home</Link>
              </li>
              <li>
                <Link href={'/calculator'}>Calculator</Link>
              </li>
              <li>
                <Link href={'/stock'}>Stock</Link>
              </li>
            </ul>
            <button
              onClick={handleLogout}
              style={{
                color: '#fff',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}
