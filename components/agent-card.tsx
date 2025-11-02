"use client"

import type React from "react"

import type { ValorantAgent } from "@/types/valorant"
import { useCart } from "@/contexts/cart-context"
import Image from "next/image"

interface AgentCardProps {
  agent: ValorantAgent
  onClick: () => void
}

export function AgentCard({ agent, onClick }: AgentCardProps) {
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart({
      id: agent.uuid,
      name: agent.displayName,
      image: agent.fullPortrait,
      price: 29.99,
    })
  }

  return (
    <div
      onClick={onClick}
      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden border-2 border-gray-700 hover:border-red-500 transition-all cursor-pointer transform hover:scale-105"
      data-testid={`agent-card-${agent.uuid}`}
    >
      <div className="relative h-80 bg-gradient-to-br from-red-950 to-black">
        <Image
          src={agent.fullPortrait || "/placeholder.svg"}
          alt={agent.displayName}
          fill
          className="object-contain"
          data-testid={`agent-image-${agent.uuid}`}
        />
      </div>
      <div className="p-4 text-white">
        <h3 className="text-xl font-bold mb-2" data-testid={`agent-name-${agent.uuid}`}>
          {agent.displayName.toUpperCase()}
        </h3>
        <div className="text-red-400 text-sm mb-4" data-testid={`agent-role-${agent.uuid}`}>
          {agent.role?.displayName.toUpperCase() || "AGENTE"}
        </div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-2xl font-bold text-green-400">$29.99</div>
            <div className="text-xs text-gray-400">Figura Premium</div>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-2 rounded font-bold transition-all"
          data-testid={`add-to-cart-${agent.uuid}`}
        >
          AÑADIR AL CARRITO
        </button>
      </div>
    </div>
  )
}
