import process from "node:process"
import { Builtins, Cli } from "clipanion"
import pkg from "../package.json"
import AuthCommand from "./commands/AuthCommand"
import ConfigCommand from "./commands/ConfigCommand"
import ExplainCommand from "./commands/ExplainCommand"
import GenerateCommand from "./commands/GenerateCommand"
import HelpCommand from "./commands/HelpCommand"
import PersonalizeCommand from "./commands/PersonalizeCommand"
import LogoutCommand from "./commands/LogoutCommand"
import MainCommand from "./commands/MainCommand"
import ReviseCommand from "./commands/ReviseCommand"
import { initConfig } from "./config"
import "./polyfills"

await initConfig()

process.on("SIGINT", () => {
  process.stdout.write("\n\n")
  process.exit()
})

const cli = new Cli({
  binaryName: "s",
  binaryLabel: "Strigi",
  binaryVersion: pkg.version,
})
cli.register(ExplainCommand)
cli.register(ReviseCommand)
cli.register(GenerateCommand)
cli.register(AuthCommand)
cli.register(LogoutCommand)
cli.register(PersonalizeCommand)
cli.register(ConfigCommand)
cli.register(MainCommand)
cli.register(HelpCommand)
cli.register(Builtins.HelpCommand)
cli.register(Builtins.VersionCommand)
cli.runExit(process.argv.slice(2))
