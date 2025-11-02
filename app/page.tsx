"use client"

import { useState, useEffect, useCallback } from "react"
import type { ValorantAgent } from "@/types/valorant"
import { fetchAgents } from "@/lib/valorant-api"
import { LoadingScreen } from "@/components/loading-screen"
import { Header } from "@/components/header"
import { HeroCarousel } from "@/components/hero-carousel"
import { RoleFilters } from "@/components/role-filters"
import { AgentsGrid } from "@/components/agents-grid"
import { CharacterModal } from "@/components/character-modal"

export default function Home() {
  const [agents, setAgents] = useState<ValorantAgent[]>([])
  const [filteredAgents, setFilteredAgents] = useState<ValorantAgent[]>([])
  const [loading, setLoading] = useState(true)
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0)
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedAgent, setSelectedAgent] = useState<ValorantAgent | null>(null)
  const [showCharacterModal, setShowCharacterModal] = useState(false)

  useEffect(() => {
    const loadAgents = async () => {
      const data = await fetchAgents()
      setAgents(data)
      setFilteredAgents(data)
      setLoading(false)
    }
    loadAgents()
  }, [])

  const filterAgents = useCallback(
    (role: string) => {
      if (role === "all") {
        setFilteredAgents(agents)
      } else {
        const filtered = agents.filter((agent) => {
          const agentRole = agent.role?.displayName
          return agentRole === role || agentRole === getRoleMapping(role)
        })
        setFilteredAgents(filtered)
      }
      setCurrentHeroIndex(0)
    },
    [agents],
  )

  const getRoleMapping = (role: string): string => {
    const roleMap: Record<string, string> = {
      Duelist: "Duelista",
      Controller: "Controlador",
      Sentinel: "Centinela",
      Initiator: "Iniciador",
    }
    return roleMap[role] || role
  }

  const handleRoleChange = (role: string) => {
    setSelectedRole(role)
    filterAgents(role)
  }

  const handlePreviousHero = () => {
    setCurrentHeroIndex((prev) => (prev - 1 + filteredAgents.length) % filteredAgents.length)
  }

  const handleNextHero = () => {
    setCurrentHeroIndex((prev) => (prev + 1) % filteredAgents.length)
  }

  const handleAgentClick = (agent: ValorantAgent) => {
    setSelectedAgent(agent)
    setShowCharacterModal(true)
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-black" data-testid="main-container">
      <Header />
      <HeroCarousel
        agents={filteredAgents}
        currentIndex={currentHeroIndex}
        onPrevious={handlePreviousHero}
        onNext={handleNextHero}
      />
      <RoleFilters selectedRole={selectedRole} onRoleChange={handleRoleChange} />
      <AgentsGrid agents={filteredAgents} onAgentClick={handleAgentClick} />
      <CharacterModal agent={selectedAgent} isOpen={showCharacterModal} onClose={() => setShowCharacterModal(false)} />
      <footer className="bg-gray-900 text-center text-gray-400 py-4 text-sm" data-testid="footer">
        Datos vía{" "}
        <a
          href="https://valorant-api.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-500 hover:text-red-400"
        >
          valorant-api.com
        </a>
      </footer>
    </div>
  )
}
