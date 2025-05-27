'use client'

import './globals.css'
import { Header } from '../app/components/Header'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import { StyledComponentsRegistry } from './styled-components-provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const tokenExists = document.cookie.includes('access_token=')
    setIsLoggedIn(tokenExists)

    // Redirect to login if not logged in and trying to access a restricted page
    const restrictedPaths = ['/home', '/calculator', '/stock']
    if (!tokenExists && restrictedPaths.includes(pathname)) {
      router.push('/')
    }
  }, [pathname, router])

  // Check if the current route is the login page
  const isLoginPage = pathname === '/'

  return (
    <StyledComponentsRegistry>
      <html lang="pt-BR">
        <body>
          <ThemeProvider>
            {!isLoginPage && isLoggedIn && <Header isLoggedIn={isLoggedIn} />}
            {children}
          </ThemeProvider>
        </body>
      </html>
    </StyledComponentsRegistry>
  )
}
