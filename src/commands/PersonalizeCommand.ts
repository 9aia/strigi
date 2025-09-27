import { input, select } from "@inquirer/prompts"
import c from "chalk-template"
import { Command } from "clipanion"
import { config, saveConfig } from "../config"
import StrigiCommand from "../lib/StrigiCommand"
import { getAvailableModels } from "../lib/gemini"

export default class PersonalizeCommand extends StrigiCommand {
  static usage = Command.Usage({
    description: "Personalize your AI experience with model preferences and custom instructions.",
    details: `The \`s personalize\` command allows you to customize your AI experience by selecting your preferred Gemini model and providing personal instructions for more tailored and accurate responses. Your personalization settings will be used in all future interactions with the model.`,
    category: "Configuration",
  })

  static paths = [["personalize"], ["p"]]

  async execute() {
    let contentModels

    try {
      contentModels = await getAvailableModels()
    }
    catch (error: any) {
      this.context.stdout.write(c`{red Error getting available models:}\n\n${error.message}\n`)
      return
    }

    const model = await select<string>({
      message: "Which model would you like to use?",
      choices: contentModels.map((model: any) => ({ name: model.name, value: model.name })),
      default: config.model || "gemini-2.5-flash",
    })

    const aboutMe = await input({
      message: "What would you like the model to know about you to provide better responses?",
      default: config.customInstructions?.aboutMe,
    })

    const responsePreference = await input({
      message: "How would you like the model to respond?",
      default: config.customInstructions?.responsePreference,
    })

    try {
      config.customInstructions = {
        aboutMe,
        responsePreference,
      }
      config.model = model

      await saveConfig()
      this.context.stdout.write(c`{green Personalization settings saved successfully!}\n`)
    }
    catch (_e) {
      const e = _e as Error
      this.context.stdout.write(c`{red Error saving personalization settings:}\n\n${e.message}\n`)
    }
  }
}
