"use client"

import { useState, type FormEvent } from "react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: "login" | "register"
  onSuccess: () => void
  onSwitchMode: () => void
}

export function AuthModal({ isOpen, onClose, mode, onSuccess, onSwitchMode }: AuthModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  
  if (!isOpen) return null

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (mode === "register") {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        alert("Por favor, completa todos los campos")
        return
      }
      if (formData.password !== formData.confirmPassword) {
        alert("Las contraseñas no coinciden")
        return
      }
      if (formData.password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres")
        return
      }
      alert("¡Registro exitoso! Bienvenido a Figuras Valorant (Demo)")
    } else {
      if (!formData.email || !formData.password) {
        alert("Por favor, completa todos los campos")
        return
      }
      alert("¡Inicio de sesión exitoso! (Demo)")
    }

    onSuccess()
    setFormData({ name: "", email: "", password: "", confirmPassword: "" })
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      data-testid={`${mode}-modal`}
    >
      <div
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-8 max-w-md w-full border-2 border-red-500"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 🔹 Título y botón de cierre */}
        <div className="flex justify-between items-center mb-6">
          <h2
            className="text-2xl font-bold text-white"
            data-testid={`${mode}-title`}
          >
            {mode === "login" ? "INICIAR SESIÓN" : "REGISTRARSE"}
          </h2>
          <button
            onClick={onClose}
            className="text-white text-2xl hover:text-red-500 transition-colors"
            data-testid={`${mode}-close`}
          >
            ✕
          </button>
        </div>

        {/* 🔹 Formulario principal */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          data-testid={`${mode}-form`}
        >
          {mode === "register" && (
            <div>
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="name"
              >
                NOMBRE:
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 bg-gray-800 text-white border-2 border-gray-700 rounded focus:border-red-500 outline-none"
                required
                data-testid="register-name-input"
              />
            </div>
          )}

          <div>
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="email"
            >
              EMAIL:
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-800 text-white border-2 border-gray-700 rounded focus:border-red-500 outline-none"
              required
              data-testid={`${mode}-email-input`}
            />
          </div>

          <div>
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="password"
            >
              CONTRASEÑA:
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-800 text-white border-2 border-gray-700 rounded focus:border-red-500 outline-none"
              required
              data-testid={`${mode}-password-input`}
            />
          </div>

          {mode === "register" && (
            <div>
              <label
                className="block text-white text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                CONFIRMAR CONTRASEÑA:
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-2 bg-gray-800 text-white border-2 border-gray-700 rounded focus:border-red-500 outline-none"
                required
                data-testid="register-confirm-password-input"
              />
            </div>
          )}

          {/* 🔹 Botón principal */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-3 rounded font-bold transition-all"
            data-testid={`${mode}-submit`}
          >
            {mode === "login" ? "INICIAR SESIÓN" : "REGISTRARSE"}
          </button>
        </form>

        {/* 🔹 Enlace para cambiar entre login y registro */}
        <div className="mt-6 text-center text-gray-400">
          <p>
            {mode === "login"
              ? "¿No tienes cuenta?"
              : "¿Ya tienes cuenta?"}{" "}
            <button
              onClick={onSwitchMode}
              className="text-red-500 hover:text-red-400 font-bold"
              data-testid={`switch-to-${
                mode === "login" ? "register" : "login"
              }`}
            >
              {mode === "login" ? "REGISTRARSE" : "INICIAR SESIÓN"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
