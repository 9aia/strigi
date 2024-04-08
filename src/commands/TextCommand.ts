import chalk from "chalk"
import { Command, Option } from "clipanion"
import ora from "ora"
import GenerativeCommand from "../lib/GenerativeCommand"
import { generateTextStream } from "../services/generateText"

export default class TextCommand extends GenerativeCommand {
  static usage = Command.Usage({
    description: "Generate text based on the prompt",
  })

  static paths = [["text"], ["t"]]

  prompt = Option.Rest({ name: "prompt", required: 1 })

  async execute() {
    this.assertGeminiKey()

    const spinner = ora().start()

    const prompt = this.prompt.join(" ")
    const cmdStream = await generateTextStream(prompt)
    spinner.stop()

    await this.writeStream(cmdStream, chunk => chalk.cyan(chunk))
  }
}