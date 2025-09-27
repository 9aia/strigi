export interface Config {
  geminiApiKey: string | null | undefined
  model?: string
  customInstructions?: CustomInstructions
}

export interface CustomInstructions {
  aboutMe: string
  responsePreference: string
}
