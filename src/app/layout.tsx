'use client'

import './globals.css'
import { Header } from '../app/components/Header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased __variable_4d318d __variable_ea5f4b">
        <Header />
        {children}
      </body>
    </html>
  )
}
