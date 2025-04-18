'use client'

import './globals.css'
import { Header } from '../app/components/Header'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

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
    <html lang="pt-BR">
      <body className="antialiased __variable_4d318d __variable_ea5f4b">
        {!isLoginPage && isLoggedIn && <Header isLoggedIn={isLoggedIn} />}
        {children}
      </body>
    </html>
  )
}
