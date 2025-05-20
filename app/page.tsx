import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { FeaturedProducts } from "@/components/featured-products"
import { CategoryShowcase } from "@/components/category-showcase"
import { Newsletter } from "@/components/newsletter"
import { ScrollingText } from "@/components/ui-brutalist/scrolling-text"
import { ScrollingGrid } from "@/components/ui-brutalist/scrolling-grid"
import { MouseFollower } from "@/components/ui-brutalist/mouse-follower"
import { HeroCube } from "@/components/ui-brutalist/hero-cube"
import { AnimatedButton } from "@/components/ui-brutalist/animated-button"
import { CircleDoodle, StarDoodle, ZigzagDoodle, DoodleBackground } from "@/components/ui-brutalist/doodles"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative pattern-bg">
      <DoodleBackground />
      <MouseFollower />

      {/* Hero Section */}
      <section className="relative h-[100vh] w-full overflow-hidden border-b-8 border-primary">
        <ScrollingGrid />
        <div className="absolute inset-0 bg-black/10 z-10" />
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="NabeeraBaeera Fashion"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="relative z-20 container mx-auto h-full flex items-center justify-between px-4 md:px-6">
          <div className="brutalist-container bg-white max-w-2xl ml-0 mr-auto mt-0 mb-0 md:ml-8 transform -rotate-2">
            <StarDoodle className="absolute -top-10 -right-10 text-accent" />
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-black mb-4 leading-none threed-text">
              NABEERA BAEERA
            </h1>
            <p className="text-xl md:text-2xl text-black max-w-xl mb-8 uppercase font-bold">
              ARTIFICIAL JEWELRY. MEN'S COATS. KIDS CLOTHING.
            </p>
            <div className="flex flex-wrap gap-6">
              <AnimatedButton href="/shop" animation="bounce" size="lg" variant="primary" iconPosition="right">
                SHOP NOW
              </AnimatedButton>
              <AnimatedButton href="/collections" variant="outline" animation="shake" size="lg" iconPosition="right">
                EXPLORE
              </AnimatedButton>
            </div>
          </div>
          <div className="hidden lg:block mr-0 ml-auto">
            <HeroCube />
          </div>
        </div>
      </section>

      {/* Scrolling Ticker */}
      <ScrollingText
        messages={[
          "FREE SHIPPING ON ORDERS OVER $50",
          "NEW COLLECTION AVAILABLE NOW",
          "USE CODE 'BRUTAL' FOR 10% OFF",
          "LIMITED EDITION ITEMS AVAILABLE",
        ]}
      />

      {/* Featured Categories - Uneven Grid */}
      <section className="py-16 bg-white brutalist-section relative">
        <CircleDoodle className="absolute top-10 right-10 text-accent" />
        <ZigzagDoodle className="absolute bottom-10 left-10 text-primary" />

        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-12 uppercase threed-text">COLLECTIONS</h2>
          <div className="uneven-grid">
            <div className="uneven-col-1 uneven-spacing-1">
              <BrutalistCategoryCard
                title="Artificial Jewelry"
                image="/placeholder.svg?height=600&width=400"
                link="/category/jewelry"
              />
            </div>
            <div className="uneven-col-2 uneven-spacing-2">
              <BrutalistCategoryCard
                title="Men's Coats"
                image="/placeholder.svg?height=600&width=400"
                link="/category/mens-coats"
              />
            </div>
            <div className="uneven-col-3 uneven-spacing-3">
              <BrutalistCategoryCard
                title="Kids Clothing"
                image="/placeholder.svg?height=600&width=400"
                link="/category/kids-clothing"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Brutalist Banner */}
      <section className="bg-primary-dark text-white py-20 relative">
        <StarDoodle className="absolute top-10 left-10 text-white opacity-30" />
        <CircleDoodle className="absolute bottom-10 right-10 text-white opacity-30" />

        <div className="container mx-auto px-4 md:px-6">
          <div className="brutalist-grid h-[60vh] flex flex-col justify-center items-center text-center p-8">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 uppercase threed-text-white">NEW SEASON ARRIVALS</h2>
            <p className="text-xl max-w-2xl mb-8 uppercase">
              DISCOVER OUR LATEST COLLECTIONS AND ELEVATE YOUR STYLE WITH NABEERABAEERA'S PREMIUM SELECTIONS
            </p>
            <AnimatedButton href="/new-arrivals" variant="accent" animation="pulse" size="lg" iconPosition="right">
              VIEW NEW ARRIVALS
            </AnimatedButton>
          </div>
        </div>
      </section>

      {/* Category Showcase - Asymmetrical Layout */}
      <CategoryShowcase />

      {/* Newsletter */}
      <Newsletter />
    </div>
  )
}

function BrutalistCategoryCard({ title, image, link }: { title: string; image: string; link: string }) {
  return (
    <Link href={link} className="block transform-card group">
      <div className="brutalist-card transform rotate-2 hover:rotate-0 transition-transform">
        <div className="brutalist-image relative h-[400px]">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />

          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-accent"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-accent"></div>
        </div>
        <div className="p-6 bg-primary text-white transition-transform duration-300 group-hover:bg-accent transform -rotate-1 group-hover:rotate-0">
          <h3 className="text-2xl font-bold uppercase mb-2">{title}</h3>
          <div className="flex items-center text-white">
            <span className="uppercase font-bold">SHOP NOW</span>
            <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-2" />
          </div>
        </div>
      </div>
    </Link>
  )
}
