"use client"

import { useState, useEffect } from "react"

export function HeroCube() {
  const [useCSS, setUseCSS] = useState(true)

  useEffect(() => {
    // We're defaulting to CSS implementation since WebGL is restricted
    setUseCSS(true)
  }, [])

  return (
    <div className="h-[400px] w-[400px] flex items-center justify-center">
      <div className="css-cube-container">
        <div className="css-cube">
          <div className="css-cube-face css-cube-face-front">NABEERA</div>
          <div className="css-cube-face css-cube-face-back">BAEERA</div>
          <div className="css-cube-face css-cube-face-right">STYLE</div>
          <div className="css-cube-face css-cube-face-left">BOLD</div>
          <div className="css-cube-face css-cube-face-top">BRUTAL</div>
          <div className="css-cube-face css-cube-face-bottom">DESIGN</div>
        </div>
      </div>
    </div>
  )
}
