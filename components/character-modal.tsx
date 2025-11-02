"use client"

import type { ValorantAgent } from "@/types/valorant"
import { useCart } from "@/contexts/cart-context"
import { generateFigureSpecs } from "@/lib/figure-specs"
import Image from "next/image"

interface CharacterModalProps {
  agent: ValorantAgent | null
  isOpen: boolean
  onClose: () => void
}

export function CharacterModal({ agent, isOpen, onClose }: CharacterModalProps) {
  const { addToCart } = useCart()

  if (!isOpen || !agent) return null

  const specs = generateFigureSpecs(agent)

  const handleAddToCart = () => {
    addToCart({
      id: agent.uuid,
      name: agent.displayName,
      image: agent.fullPortrait,
      price: 29.99,
    })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={onClose}
      data-testid="character-modal"
    >
      <div
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-8 max-w-4xl w-full my-8 border-2 border-red-500"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white" data-testid="character-modal-name">
            {agent.displayName.toUpperCase()}
          </h2>
          <button
            onClick={onClose}
            className="text-white text-2xl hover:text-red-500 transition-colors"
            data-testid="character-modal-close"
          >
            ✕
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="relative h-96 bg-gradient-to-br from-red-950 to-black rounded-lg overflow-hidden mb-4">
              <Image
                src={agent.fullPortrait || "/placeholder.svg"}
                alt={agent.displayName}
                fill
                className="object-contain"
                data-testid="character-modal-image"
              />
            </div>
            <div
              className="bg-red-900/50 text-white text-center py-2 rounded font-bold"
              data-testid="character-modal-role"
            >
              {agent.role?.displayName.toUpperCase() || "AGENTE"}
            </div>
          </div>

          <div className="text-white space-y-6">
            <div>
              <h3 className="text-xl font-bold text-red-400 mb-2">BIOGRAFÍA</h3>
              <p className="text-gray-300 leading-relaxed" data-testid="character-modal-bio">
                {agent.description || "Información no disponible"}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-red-400 mb-3">ESPECIFICACIONES DE LA FIGURA</h3>
              <div className="grid grid-cols-2 gap-3 text-sm" data-testid="character-specs">
                <div className="bg-gray-800 p-3 rounded">
                  <div className="text-gray-400">ALTURA:</div>
                  <div className="font-bold" data-testid="spec-height">
                    {specs.height}
                  </div>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <div className="text-gray-400">PESO:</div>
                  <div className="font-bold" data-testid="spec-weight">
                    {specs.weight}
                  </div>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <div className="text-gray-400">MATERIAL:</div>
                  <div className="font-bold" data-testid="spec-material">
                    {specs.material}
                  </div>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <div className="text-gray-400">ARTICULACIONES:</div>
                  <div className="font-bold" data-testid="spec-joints">
                    {specs.joints}
                  </div>
                </div>
                <div className="bg-gray-800 p-3 rounded col-span-2">
                  <div className="text-gray-400">ACCESORIOS:</div>
                  <div className="font-bold" data-testid="spec-accessories">
                    {specs.accessories}
                  </div>
                </div>
                <div className="bg-gray-800 p-3 rounded col-span-2">
                  <div className="text-gray-400">EDAD RECOMENDADA:</div>
                  <div className="font-bold" data-testid="spec-age">
                    {specs.age}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-red-400 mb-3">HABILIDADES</h3>
              <div className="space-y-3" data-testid="character-abilities">
                {agent.abilities && agent.abilities.length > 0 ? (
                  agent.abilities.map((ability, index) => (
                    <div key={index} className="flex gap-3 bg-gray-800 p-3 rounded" data-testid={`ability-${index}`}>
                      {ability.displayIcon && (
                        <div className="w-12 h-12 flex-shrink-0">
                          <Image
                            src={ability.displayIcon || "/placeholder.svg"}
                            alt={ability.displayName}
                            width={48}
                            height={48}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-red-400">{ability.displayName.toUpperCase()}</div>
                        <div className="text-sm text-gray-400">
                          {ability.description || "Descripción no disponible"}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No hay información de habilidades disponible</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
            data-testid="character-add-to-cart"
          >
            AÑADIR AL CARRITO - $29.99
          </button>
        </div>
      </div>
    </div>
  )
}
