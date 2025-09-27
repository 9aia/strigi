import { input, select } from "@inquirer/prompts"
import c from "chalk-template"
import { Command } from "clipanion"
import { config, saveConfig } from "../config"
import StrigiCommand from "../lib/StrigiCommand"
import { getAvailableModels } from "../lib/gemini"

export default class InstructCommand extends StrigiCommand {
  static usage = Command.Usage({
    description: "Add custom instructions for tailored responses.",
    details: `The \`s instruct\` command empowers you to provide specific guidelines or preferences to the model for more tailored and accurate responses. Your custom instructions will be integrated into future interactions with the model.`,
    category: "Configuration",
  })

  static paths = [["instruct"], ["i"]]

  async execute() {
    let contentModels;

    try {
      contentModels = await getAvailableModels();
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
      this.context.stdout.write(c`{green Configuration set successfully!}\n`)
    }
    catch (_e) {
      const e = _e as Error
      this.context.stdout.write(c`{red Error saving configuration:}\n\n${e.message}\n`)
    }
  }
}
