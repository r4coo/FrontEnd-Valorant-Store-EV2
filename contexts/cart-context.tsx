"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import type { CartItem } from "@/types/valorant"

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (index: number) => void
  increaseQuantity: (index: number) => void
  decreaseQuantity: (index: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = useCallback((item: Omit<CartItem, "quantity">) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id)
      if (existingItem) {
        return prevCart.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prevCart, { ...item, quantity: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index))
  }, [])

  const increaseQuantity = useCallback((index: number) => {
    setCart((prevCart) => prevCart.map((item, i) => (i === index ? { ...item, quantity: item.quantity + 1 } : item)))
  }, [])

  const decreaseQuantity = useCallback((index: number) => {
    setCart((prevCart) => {
      const newCart = [...prevCart]
      if (newCart[index].quantity > 1) {
        newCart[index] = { ...newCart[index], quantity: newCart[index].quantity - 1 }
      } else {
        newCart.splice(index, 1)
      }
      return newCart
    })
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const getTotalItems = useCallback(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  }, [cart])

  const getTotalPrice = useCallback(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [cart])

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
