"use client"

interface RoleFiltersProps {
  selectedRole: string
  onRoleChange: (role: string) => void
}

const roles = [
  { id: "all", label: "TODOS" },
  { id: "Duelist", label: "DUELISTAS" },
  { id: "Controller", label: "CONTROLADORES" },
  { id: "Sentinel", label: "CENTINELAS" },
  { id: "Initiator", label: "INICIADORES" },
]

export function RoleFilters({ selectedRole, onRoleChange }: RoleFiltersProps) {
  return (
    <section className="bg-gray-900 py-6 px-4" data-testid="filters-section">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => onRoleChange(role.id)}
              className={`px-6 py-3 rounded-lg font-bold text-sm transition-all ${
                selectedRole === role.id
                  ? "bg-red-600 text-white scale-105"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              data-testid={`filter-${role.id}`}
            >
              {role.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
