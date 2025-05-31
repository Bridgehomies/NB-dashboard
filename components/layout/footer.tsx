import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { CircleDoodle, StarDoodle, ZigzagDoodle } from "@/components/ui-brutalist/doodles"

export function Footer() {
  return (
    <footer className="brutalist-footer relative">
      <StarDoodle className="absolute top-10 left-10 text-white opacity-30" />
      <CircleDoodle className="absolute top-20 right-20 text-white opacity-30" />
      <ZigzagDoodle className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white opacity-30" />

      <div className="container mx-auto px-4 md:px-6 py-12 relative z-10">
        <div className="border-t-4 border-white mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0 uppercase">
            &copy; {new Date().getFullYear()} NabeeraBaeera. All rights reserved.
          </p>
          
        </div>
      </div>
    </footer>
  )
}
