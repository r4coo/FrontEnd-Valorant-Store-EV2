"use client"

import type { ValorantAgent } from "@/types/valorant"
import { AgentCard } from "./agent-card"

interface AgentsGridProps {
  agents: ValorantAgent[]
  onAgentClick: (agent: ValorantAgent) => void
}

export function AgentsGrid({ agents, onAgentClick }: AgentsGridProps) {
  return (
    <section className="bg-black py-12 px-4" data-testid="agents-section">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="agents-grid">
          {agents.map((agent) => (
            <AgentCard key={agent.uuid} agent={agent} onClick={() => onAgentClick(agent)} />
          ))}
        </div>
      </div>
    </section>
  )
}
