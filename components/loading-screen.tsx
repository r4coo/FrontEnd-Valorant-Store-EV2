export function LoadingScreen() {
  return (
    <div
      className="fixed inset-0 bg-gradient-to-br from-red-950 via-black to-red-950 flex items-center justify-center z-50"
      data-testid="loading-screen"
    >
      <div className="text-center">
        <div className="text-4xl font-bold text-red-500 mb-4 animate-pulse">CARGANDO AGENTES...</div>
        <div className="text-xl text-red-300">Preparando la tienda</div>
      </div>
    </div>
  )
}
