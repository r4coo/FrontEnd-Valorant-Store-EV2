"use client"

import type { ValorantAgent } from "@/types/valorant"
import { useCart } from "@/contexts/cart-context"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react"

interface HeroCarouselProps {
  agents: ValorantAgent[]
  currentIndex: number
  onPrevious: () => void
  onNext: () => void
}

export function HeroCarousel({ agents, currentIndex, onPrevious, onNext }: HeroCarouselProps) {
  const { addToCart } = useCart()

  if (agents.length === 0) return null

  const currentAgent = agents[currentIndex]

  const handleAddToCart = () => {
    addToCart({
      id: currentAgent.uuid,
      name: currentAgent.displayName,
      image: currentAgent.fullPortrait,
      price: 29.99,
    })
  }

  return (
    <section className="bg-gradient-to-br from-gray-900 via-red-950 to-black pb-12 px-4" data-testid="hero-section">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-white space-y-6" data-testid="hero-info">
            <h2 className="text-5xl font-bold text-red-500" data-testid="hero-name">
              {currentAgent.displayName.toUpperCase()}
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed" data-testid="hero-description">
              {currentAgent.description}
            </p>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-red-400">HABILIDADES</h3>
              <div className="flex gap-4" data-testid="hero-abilities">
                {currentAgent.abilities?.slice(0, 4).map((ability, index) => (
                  <div
                    key={index}
                    className="w-16 h-16 bg-red-900/50 rounded-lg p-2 border-2 border-red-500 hover:border-red-400 transition-colors"
                    data-testid={`hero-ability-${index}`}
                  >
                    {ability.displayIcon && (
                      <Image
                        src={ability.displayIcon || "/placeholder.svg"}
                        alt={ability.displayName}
                        width={48}
                        height={48}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="bg-black/40 rounded-lg px-6 py-3 border-2 border-green-500">
                <div className="text-4xl font-bold text-green-400">$29.99</div>
                <div className="text-sm text-gray-400">Figura Premium</div>
              </div>
              <button
                onClick={handleAddToCart}
                className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-xl hover:shadow-red-500/50 flex items-center gap-3"
                data-testid="hero-add-to-cart"
              >
                <ShoppingCart className="w-6 h-6 group-hover:animate-bounce" />
                AÑADIR AL CARRITO
              </button>
            </div>
          </div>

          <div className="relative" data-testid="hero-image-container">
            <Image
              src={currentAgent.fullPortrait || "/placeholder.svg"}
              alt={currentAgent.displayName}
              width={600}
              height={800}
              className="w-full h-auto object-contain drop-shadow-2xl"
              data-testid="hero-image"
              priority
            />
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-8">
          <button
            onClick={onPrevious}
            className="group bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white w-14 h-14 rounded-full font-bold text-2xl transition-all transform hover:scale-110 shadow-lg hover:shadow-red-500/50 flex items-center justify-center"
            data-testid="hero-prev-button"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <button
            onClick={onNext}
            className="group bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white w-14 h-14 rounded-full font-bold text-2xl transition-all transform hover:scale-110 shadow-lg hover:shadow-red-500/50 flex items-center justify-center"
            data-testid="hero-next-button"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </div>
      </div>
    </section>
  )
}
