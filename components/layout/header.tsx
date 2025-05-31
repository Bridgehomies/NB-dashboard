"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, Search, ShoppingBag, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"
import { AnimatedButton } from "@/components/ui-brutalist/animated-button"
import { StarDoodle, CircleDoodle } from "@/components/ui-brutalist/doodles"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const isMobile = useMobile()
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveMegaMenu(null)
      }
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousedown", handleClickOutside)

    // Check initial scroll position
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleMegaMenu = (menuId: string) => {
    if (activeMegaMenu === menuId) {
      setActiveMegaMenu(null)
    } else {
      setActiveMegaMenu(menuId)
    }
  }

  const closeMegaMenu = () => {
    setActiveMegaMenu(null)
  }

  return (
    <header ref={headerRef} className="brutalist-header">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/admin" className="brutalist-logo z-20">
            NABEERA BAEERA
          </Link>
        </div>
     
      </div>
      
    </header>
  )
}
