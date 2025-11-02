import type { ValorantAgent } from "@/types/valorant"

export async function fetchAgents(): Promise<ValorantAgent[]> {
  try {
    const response = await fetch("https://valorant-api.com/v1/agents?language=es-ES&isPlayableCharacter=true")
    const data = await response.json()

    if (data.data) {
      return data.data.filter((agent: ValorantAgent) => agent.fullPortrait)
    }
    return []
  } catch (error) {
    console.error("Error fetching agents:", error)
    return []
  }
}
