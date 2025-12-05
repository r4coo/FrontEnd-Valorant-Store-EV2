"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react" // 🟢 Importar useEffect
import type { CartItem } from "@/types/valorant"

// Clave para localStorage
const STORAGE_KEY = "valorant_cart"

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
  // 1. 🟢 Inicializar con un arreglo vacío. La carga real ocurre en useEffect.
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false) // Estado para asegurar que cargamos solo una vez

  // --- 🟢 LÓGICA DE PERSISTENCIA ---

  // Efecto 1: Cargar el carrito desde localStorage al montar el componente
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const storedCart = localStorage.getItem(STORAGE_KEY)
        if (storedCart) {
          // Intentar parsear el JSON
          const initialCart: CartItem[] = JSON.parse(storedCart)
          setCart(initialCart)
        }
        setIsLoaded(true) // Marcar como cargado
      }
    } catch (error) {
      console.error("Error al cargar el carrito desde localStorage:", error)
      setIsLoaded(true) // Asegurar que el componente se renderice incluso si hay un error
    }
  }, []) // Se ejecuta solo una vez al inicio

  // Efecto 2: Guardar el carrito en localStorage cada vez que 'cart' cambia
  useEffect(() => {
    // Solo guardar si ya se cargó (para evitar sobrescribir un carrito vacío al inicio)
    if (isLoaded && typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
      } catch (error) {
        console.error("Error al guardar el carrito en localStorage:", error)
      }
    }
  }, [cart, isLoaded]) // Se ejecuta cada vez que 'cart' o 'isLoaded' cambian

  // --- LÓGICA DEL CARRITO (Optimized with useCallback) ---

  // Nota: Todas las funciones addToCart, removeFromCart, etc., usan setCart(),
  // lo cual activa el segundo useEffect y guarda los datos automáticamente.

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

  // --- Renderizado ---

  // 3. Opcional: Puedes decidir no renderizar contenido hasta que el carrito se haya cargado
  // if (!isLoaded) {
  //   return <div>Cargando carrito...</div>; 
  // }

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
