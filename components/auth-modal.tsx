import { useState, type FormEvent } from "react"
// NO se utiliza useAuth ni ningún Contexto de Autenticación, según la solicitud.

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

  // Estados para manejar el loading y el error/mensaje de estado
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)


  // ⚠️ Importante: Reemplaza esta URL con tu variable de entorno real
  const API_BASE_URL = "https://backend-production-566e.up.railway.app" 
  
  if (!isOpen) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError(null);
    setSuccessMessage(null);
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)
    setIsLoading(true)

    if (!API_BASE_URL) {
      setError("Error: La URL del backend no está configurada.")
      setIsLoading(false);
      return
    }

    if (mode === "register") {
      // =========================================================
      // 🚀 LÓGICA DE REGISTRO
      // =========================================================

      // 1. VALIDACIONES LOCALES (REGISTRO)
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError("Por favor, completa todos los campos.")
        setIsLoading(false);
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Las contraseñas no coinciden.")
        setIsLoading(false);
        return
      }
      if (formData.password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres.")
        setIsLoading(false);
        return
      }

      // 2. PREPARACIÓN DE DATOS PARA EL BACKEND (REGISTRO)
      const registerData = {
        nombreUsuario: formData.name,
        correo: formData.email,
        password: formData.password,
      }

      // 3. LLAMADA AL BACKEND (REGISTRO)
      try {
        const response = await fetch(`${API_BASE_URL}/usuarios`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
        })

        // 4. MANEJO DE RESPUESTA (REGISTRO)
        if (response.ok) {
          setSuccessMessage("¡Registro exitoso! Ahora puedes iniciar sesión.")

          // ➡️ Limpia el formulario y cambia a modo login
          setFormData({ name: "", email: formData.email, password: "", confirmPassword: "" })
          setTimeout(() => {
            onSwitchMode() 
          }, 1500)
          
        } else {
          const errorBody = await response.json().catch(() => ({}));
          const errorText = errorBody.message || errorBody.error || await response.text();
          const errorMessage = `Error ${response.status}: ${errorText || 'Error desconocido'}`
          setError(`Error al registrar: ${errorMessage}`)
        }
      } catch (err) {
        console.error("Error de red/servidor:", err)
        setError("No se pudo conectar con el servidor. Intenta de nuevo.")
      } finally {
        setIsLoading(false)
      }
    } else {
      // =========================================================
      // 🚀 LÓGICA DE INICIO DE SESIÓN (LOGIN)
      // =========================================================
      
      // 1. VALIDACIONES LOCALES (LOGIN)
      if (!formData.email || !formData.password) {
        setError("Por favor, completa el correo y la contraseña.")
        setIsLoading(false);
        return
      }

      // 2. PREPARACIÓN DE DATOS PARA EL BACKEND (LOGIN)
      const loginData = {
        correo: formData.email,
        password: formData.password,
      }

      // 3. LLAMADA AL BACKEND (LOGIN)
      try {
        const response = await fetch(`${API_BASE_URL}/usuarios/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        })

        // 4. MANEJO DE RESPUESTA (LOGIN)
        if (response.ok) {
          // 💡 NOTA: Aquí el backend devuelve el objeto Usuario con nombre y correo.
          // Si no se usa un Contexto de Autenticación, esta data se pierde tras cerrar el modal.
          const userData = await response.json() 
          
          setSuccessMessage("¡Inicio de sesión exitoso!")

          // ➡️ Llama a onSuccess (usualmente cierra el modal)
          setTimeout(() => {
            onSuccess() 
            setFormData({ name: "", email: "", password: "", confirmPassword: "" }) // Limpia el formulario
            // Para persistir la sesión, debes guardar 'userData' en localStorage aquí.
            localStorage.setItem('temp_user_data', JSON.stringify(userData)); // Uso temporal para el ejemplo
          }, 1000)
          
        } else {
          const errorBody = await response.json().catch(() => ({}));
          const errorText = errorBody.message || errorBody.error || await response.text();
          const errorMessage = `Error ${response.status}: ${errorText || 'Credenciales inválidas o error desconocido'}`
          setError(`Error al iniciar sesión: ${errorMessage}`)
        }
      } catch (err) {
        console.error("Error de red/servidor:", err)
        setError("No se pudo conectar con el servidor. Intenta de nuevo.")
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      data-testid={`${mode}-modal`}
    >
      <div
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-8 max-w-md w-full border-2 border-red-500 shadow-2xl transition-all duration-300"
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

        {/* 💡 Mensajes de estado */}
        {error && (
          <p className="text-red-300 text-center text-sm font-medium mb-4 p-2 bg-red-900/30 rounded-md border border-red-500/50">
            {error}
          </p>
        )}
        {successMessage && (
          <p className="text-green-300 text-center text-sm font-medium mb-4 p-2 bg-green-900/30 rounded-md border border-green-500/50">
            {successMessage}
          </p>
        )}

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
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-800 text-white border-2 border-gray-700 rounded focus:border-red-500 outline-none"
                required
                data-testid="register-name-input"
                disabled={isLoading}
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
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-800 text-white border-2 border-gray-700 rounded focus:border-red-500 outline-none"
              required
              data-testid={`${mode}-email-input`}
              disabled={isLoading}
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
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-800 text-white border-2 border-gray-700 rounded focus:border-red-500 outline-none"
              required
              data-testid={`${mode}-password-input`}
              disabled={isLoading}
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
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-800 text-white border-2 border-gray-700 rounded focus:border-red-500 outline-none"
                required
                data-testid="register-confirm-password-input"
                disabled={isLoading}
              />
            </div>
          )}

          {/* 🔹 Botón principal */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-3 rounded font-bold transition-all disabled:opacity-50"
            data-testid={`${mode}-submit`}
            disabled={isLoading || !!successMessage} // Deshabilita mientras carga o si hay mensaje de éxito
          >
            {isLoading
              ? "Cargando..."
              : mode === "login"
              ? "INICIAR SESIÓN"
              : "REGISTRARSE"}
          </button>
        </form>

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
              disabled={isLoading || !!successMessage}
            >
              {mode === "login" ? "REGISTRARSE" : "INICIAR SESIÓN"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
