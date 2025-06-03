import { AuthProvider } from "@/context/auth-context"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata = {
  title: "NabeeraBareera - Artificial Jewelry, Coats & Kids Clothing",
  description:
    "Discover exquisite artificial jewelry, stylish Coats, and adorable kids clothing at NabeeraBareera.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Mono:wght@400;700&family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased pattern-bg">
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            
            <main className="pt-20">{children}</main>
            
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
