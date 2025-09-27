import { Command } from "clipanion"
import StrigiCommand from "../lib/StrigiCommand"

export default class HelpCommand extends StrigiCommand {
  static paths = [["help"]]

  static usage = Command.Usage({
    description: "Show help information",
    details: "Display help information for the Strigi CLI tool.",
  })

  async execute() {
    // Execute the built-in help command by running the CLI with -h flag
    this.cli.run(["-h"])
  }
}
