'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTheme } from '../contexts/ThemeContext'

interface HeaderProps {
  isLoggedIn: boolean
}

export function Header({ isLoggedIn }: HeaderProps) {
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()

  const handleLogout = () => {
    document.cookie = 'access_token=; max-age=0'
    document.cookie = 'token_type=; max-age=0'
    localStorage.removeItem('calculatorData')
    localStorage.removeItem('stocksList')
    router.push('/') // Redirect to the login page
  }

  return (
    <header
      className="flex px-2 py-4"
      style={{
        background: 'var(--header-bg)',
        color: 'var(--header-text)',
      }}
    >
      <div className="flex items-center justify-between w-full mx-auto max-w-7x1">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-8 h-8" />
          <span>
            <Link href={'/home'}>Leandro - NextJS</Link>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              fontSize: '1.5rem',
              cursor: 'pointer',
            }}
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
          {isLoggedIn && (
            <nav className="flex items-center gap-4">
              <ul className="flex items-center justify-center gap-2">
                <li>
                  <Link href={'/home'}>Home</Link>
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
      </div>
    </header>
  )
}
