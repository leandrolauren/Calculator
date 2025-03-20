import type { Metadata } from "next";
import "./globals.css";
import { Header } from "../app/components/Header"
import { url } from "inspector";

export const metadata: Metadata = {
  title: "Aprendendo Next JS - Leandro",
  description: "Aprendizado de Next.js",
  authors: [{name:"Leandro Laurenzette", url:"https://github.com/leandrolauren"}],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased __variable_4d318d __variable_ea5f4b">
        <Header/>
        {children}
      </body>
    </html>
  )
}
