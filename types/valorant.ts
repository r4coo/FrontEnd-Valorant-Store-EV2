export interface ValorantAbility {
  slot: string
  displayName: string
  description: string
  displayIcon: string | null
}

export interface ValorantRole {
  uuid: string
  displayName: string
  description: string
  displayIcon: string
  assetPath: string
}

export interface ValorantAgent {
  uuid: string
  displayName: string
  description: string
  developerName: string
  characterTags: string[] | null
  displayIcon: string
  displayIconSmall: string
  bustPortrait: string
  fullPortrait: string
  fullPortraitV2: string
  killfeedPortrait: string
  background: string
  backgroundGradientColors: string[]
  assetPath: string
  isFullPortraitRightFacing: boolean
  isPlayableCharacter: boolean
  isAvailableForTest: boolean
  isBaseContent: boolean
  role: ValorantRole
  abilities: ValorantAbility[]
  voiceLine: any
}

export interface CartItem {
  id: string
  name: string
  image: string
  price: number
  quantity: number
}

export interface FigureSpecs {
  height: string
  weight: string
  material: string
  joints: string
  accessories: string
  age: string
}
