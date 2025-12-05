import { useState, type FormEvent } from "react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: "login" | "register"
  onSuccess: () => void
  onSwitchMode: () => void
}

function AuthModal({ isOpen, onClose, mode, onSuccess, onSwitchMode }: AuthModalProps) {
  // 💡 Usando el hook real para obtener la función login
  const { login } = useAuth() 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // ⚠️ REEMPLAZAR ESTA URL CON TU BACKEND REAL DE SPRING BOOT
  // const API_BASE_URL = process.env.NEXT_PUBLIC_API_BACK; 
  const API_BASE_URL = "https://backend-production-566e.up.railway.app"; 

  if (!isOpen) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError(null);
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

    const endpoint = mode === "register" ? "/usuarios" : "/usuarios/login";
    
    try {
      let dataToSend: any;
      
      if (mode === "register") {
        // Validación de Registro
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setError("Por favor, completa todos los campos.")
            return
        }
        if (formData.password !== formData.confirmPassword) {
            setError("Las contraseñas no coinciden.")
            return
        }
        if (formData.password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.")
            return
        }
        dataToSend = {
          nombreUsuario: formData.name,
          correo: formData.email,
          password: formData.password,
        };
      } else {
        // Validación de Login
        if (!formData.email || !formData.password) {
            setError("Por favor, completa el correo y la contraseña.")
            return
        }
        dataToSend = {
          correo: formData.email,
          password: formData.password,
        };
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      })

      if (response.ok) {
        const userData: UserData = await response.json();

        if (mode === "login") {
          // 💡 ESTA ES LA CLAVE: Llamar a login del Contexto con los datos reales
          login(userData); 
          setSuccessMessage("¡Inicio de sesión exitoso!");
          setTimeout(() => onSuccess(), 1000); // Cierra el modal y notifica éxito
        } else {
          setSuccessMessage("¡Registro exitoso! Ahora inicia sesión.");
          // Cambia a modo login después de un registro exitoso
          setTimeout(() => {
            setFormData({ name: "", email: userData.correo, password: "", confirmPassword: "" });
            onSwitchMode();
          }, 1500);
        }
      } else {
        const errorBody = await response.json().catch(() => ({}));
        const errorText = errorBody.message || errorBody.error || await response.text();
        const defaultMsg = mode === "login" ? 'Credenciales inválidas.' : 'Error desconocido al registrar.';
        setError(`Error ${response.status}: ${errorText || defaultMsg}`)
      }
    } catch (err) {
      console.error("Error de red/servidor:", err)
      setError("No se pudo conectar con el servidor. Verifica la URL y la configuración.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-8 max-w-md w-full border-2 border-red-500 shadow-2xl transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Título y botón de cierre */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <LogIn className="w-6 h-6 text-red-500" />
            {mode === "login" ? "INICIAR SESIÓN" : "REGISTRARSE"}
          </h2>
          <button
            onClick={onClose}
            className="text-white text-2xl hover:text-red-500 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Mensajes de estado */}
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

        {/* Formulario principal */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {mode === "register" && (
            <div>
              <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
                NOMBRE:
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-800 text-white border-2 border-gray-700 rounded focus:border-red-500 outline-none"
                required
                disabled={isLoading}
              />
            </div>
          )}

          <div>
            <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
              EMAIL:
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-800 text-white border-2 border-gray-700 rounded focus:border-red-500 outline-none"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
              CONTRASEÑA:
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-gray-800 text-white border-2 border-gray-700 rounded focus:border-red-500 outline-none"
              required
              disabled={isLoading}
            />
          </div>

          {mode === "register" && (
            <div>
              <label className="block text-white text-sm font-bold mb-2" htmlFor="confirmPassword">
                CONFIRMAR CONTRASEÑA:
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-800 text-white border-2 border-gray-700 rounded focus:border-red-500 outline-none"
                required
                disabled={isLoading}
              />
            </div>
          )}

          {/* Botón principal */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white py-3 rounded font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            disabled={isLoading || !!successMessage}
          >
            {isLoading
              ? <><Zap className="w-5 h-5 animate-spin" /> Procesando...</>
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
