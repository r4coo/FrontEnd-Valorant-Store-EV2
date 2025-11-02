"use client"

import { useCart } from "@/contexts/cart-context"
import Image from "next/image"

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, getTotalPrice } = useCart()

  if (!isOpen) return null

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío")
      return
    }
    alert(
      `¡Gracias por tu compra!\nTotal: $${getTotalPrice().toFixed(2)}\n\nEsto es una demo - no se procesará ningún pago real.`,
    )
    clearCart()
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      data-testid="cart-modal"
    >
      <div
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-red-500"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white" data-testid="cart-title">
            CARRITO DE COMPRAS
          </h2>
          <button
            onClick={onClose}
            className="text-white text-2xl hover:text-red-500 transition-colors"
            data-testid="cart-close"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 mb-6" data-testid="cart-items">
          {cart.length === 0 ? (
            <div className="text-center text-gray-400 py-8" data-testid="empty-cart">
              TU CARRITO ESTÁ VACÍO
            </div>
          ) : (
            cart.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 bg-gray-800 p-4 rounded-lg border border-gray-700"
                data-testid={`cart-item-${index}`}
              >
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-contain"
                    data-testid={`cart-item-image-${index}`}
                  />
                </div>
                <div className="flex-1">
                  <div className="text-white font-bold" data-testid={`cart-item-name-${index}`}>
                    {item.name.toUpperCase()}
                  </div>
                  <div className="text-green-400" data-testid={`cart-item-price-${index}`}>
                    ${item.price.toFixed(2)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(index)}
                    className="bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded font-bold"
                    data-testid={`cart-item-decrease-${index}`}
                  >
                    -
                  </button>
                  <span className="text-white font-bold w-8 text-center" data-testid={`cart-item-quantity-${index}`}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(index)}
                    className="bg-green-600 hover:bg-green-700 text-white w-8 h-8 rounded font-bold"
                    data-testid={`cart-item-increase-${index}`}
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm ml-2"
                    data-testid={`cart-item-remove-${index}`}
                  >
                    ELIMINAR
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-gray-700 pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white font-bold text-xl">Total:</span>
            <span className="text-green-400 font-bold text-2xl" data-testid="cart-total">
              ${getTotalPrice().toFixed(2)}
            </span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={clearCart}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded font-bold transition-colors"
              data-testid="cart-clear"
            >
              VACIAR CARRITO
            </button>
            <button
              onClick={handleCheckout}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white py-3 rounded font-bold transition-all"
              data-testid="cart-checkout"
            >
              COMPRAR AHORA
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
