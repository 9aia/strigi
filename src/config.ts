import { join } from "node:path"
import os from "node:os"
import type { Config } from "./types"

export const DEFAULT_CONFIG: Config = {
  geminiApiKey: null,
  model: "gemini-2.5-flash",
}

export const CONFIG_DIR_PATH = Bun.env.S_CONFIG_DIR_PATH || join(os.homedir(), "./.config/strigi")
export const CONFIG_PATH = join(CONFIG_DIR_PATH, "config.json")
const file = Bun.file(CONFIG_PATH)

// eslint-disable-next-line import/no-mutable-exports
export let config = DEFAULT_CONFIG

export async function initConfig() {
  if (await file.exists())
    config = await file.json()
}

export async function saveConfig() {
  await Bun.write(CONFIG_PATH, JSON.stringify(config, null, 2))
}
