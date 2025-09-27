import { Command, Option } from "clipanion"
import { confirm } from "@inquirer/prompts"
import c from "chalk-template"
import { config, CONFIG_PATH } from "../config"
import StrigiCommand from "../lib/StrigiCommand"

export default class ConfigCommand extends StrigiCommand {
  static usage = Command.Usage({
    description: "Display the current configuration settings.",
    details: `The \`s config\` command displays the current configuration settings including the Gemini API key status, model, and custom instructions.`,
    examples: [
      ["Display current configuration", "s config"],
      ["Display configuration with API key revealed", "s config --reveal"],
    ],
    category: "Configuration",
  })

  static paths = [["config"], ["c"]]

  reveal = Option.Boolean("-r, --reveal", { description: "Reveal the API key in the output" })

  private async displayApiKey() {
    if (!config.geminiApiKey) {
      this.context.stdout.write(c`API Key: {red Not set}\n`)
      return
    }

    if (!this.reveal) {
      this.context.stdout.write(c`API Key: {green Set}\n`)
      return
    }

    const confirmed = await confirm({
      message: "Are you sure you want to reveal the API key? This may pose a security risk.",
      default: false,
    })

    if (!confirmed) {
      this.context.stdout.write(c`API Key: {green Set} {gray (reveal cancelled)}\n`)
      return
    }

    this.context.stdout.write(c`API Key: {green ${config.geminiApiKey}}\n`)
  }

  private displayModel() {
    this.context.stdout.write(c`Model: {cyan ${config.model || "gemini-2.5-flash"}}\n`)
  }

  private displayCustomInstructions() {
    if (config.customInstructions) {
      this.context.stdout.write(c`\nCustom Instructions:\n`)
      const aboutMe = config.customInstructions.aboutMe?.trim()
        ? config.customInstructions.aboutMe
        : c`{gray Not configured}`
      const responsePreference = config.customInstructions.responsePreference?.trim()
        ? config.customInstructions.responsePreference
        : c`{gray Not configured}`

      this.context.stdout.write(c`- About Me: {yellow ${aboutMe}}\n`)
      this.context.stdout.write(c`- Response Preference: {yellow ${responsePreference}}\n`)
    } else {
      this.context.stdout.write(c`\nCustom Instructions: {gray Not configured}\n`)
    }
  }

  private displayConfigFilePath() {
    this.context.stdout.write(c`\nConfig File Path: {gray ${CONFIG_PATH}}\n`)
  }

  async execute() {
    this.context.stdout.write(c`{bold Configuration Settings}\n\n`)

    this.displayModel()
    this.displayCustomInstructions()
    this.displayConfigFilePath()

    await this.displayApiKey()
  }
}
