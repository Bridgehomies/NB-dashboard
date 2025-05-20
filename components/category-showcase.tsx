"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { AnimatedButton } from "@/components/ui-brutalist/animated-button"
import { CircleDoodle, StarDoodle, ZigzagDoodle } from "@/components/ui-brutalist/doodles"

const categories = [
  {
    id: "jewelry",
    title: "Artificial Jewelry",
    description: "Discover our stunning collection of artificial jewelry that adds elegance to any outfit.",
    image: "/placeholder.svg?height=800&width=600",
    color: "bg-rose-50",
  },
  {
    id: "mens-coats",
    title: "Men's Coats",
    description: "Stay stylish and warm with our premium selection of men's coats for every season.",
    image: "/placeholder.svg?height=800&width=600",
    color: "bg-blue-50",
  },
  {
    id: "kids-clothing",
    title: "Kids Clothing",
    description: "Adorable and comfortable clothing for kids that combines style with durability.",
    image: "/placeholder.svg?height=800&width=600",
    color: "bg-amber-50",
  },
]

export function CategoryShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const sections = containerRef.current.querySelectorAll(".category-section")
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom > 0

        if (isVisible) {
          section.classList.add("animate-in")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    // Trigger once on load
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="py-16 relative">
      <ZigzagDoodle className="absolute top-10 left-1/2 transform -translate-x-1/2 text-primary" />

      {categories.map((category, index) => (
        <section key={category.id} className="category-section opacity-0 bg-white relative">
          {index % 2 === 0 ? (
            <CircleDoodle className="absolute top-10 right-10 text-accent" />
          ) : (
            <StarDoodle className="absolute bottom-10 left-10 text-primary" />
          )}

          <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
            <div className="brutalist-container">
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 0 ? "" : "md:flex-row-reverse"
                }`}
              >
                <div className={`order-2 ${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase">{category.title}</h2>
                  <p className="text-lg text-gray-700 mb-6 uppercase">{category.description}</p>
                  <AnimatedButton
                    href={`/category/${category.id}`}
                    animation={index % 2 === 0 ? "bounce" : "shake"}
                    variant={index % 2 === 0 ? "primary" : "accent"}
                    size="lg"
                    iconPosition="right"
                  >
                    EXPLORE COLLECTION
                  </AnimatedButton>
                </div>
                <div className={`order-1 ${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
                  <div className="brutalist-image relative h-[400px] md:h-[500px] transform rotate-1">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.title}
                      fill
                      className="object-cover"
                    />
                    {/* Decorative corner elements */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-8 border-l-8 border-accent"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-8 border-r-8 border-primary"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-8 border-l-8 border-primary"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-8 border-r-8 border-accent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
