import "./polyfills";
import { Builtins, Cli } from 'clipanion';
import pkg from '../package.json';
import MainCommand from "./commands/MainCommand";
import { initConfig } from "./config";
import AuthCommand from "./commands/AuthCommand";
import LogoutCommand from "./commands/LogoutCommand";

await initConfig();

const [node, app, ...args] = process.argv;

const cli = new Cli({
  binaryName: "s",
  binaryLabel: "Strigi",
  binaryVersion: pkg.version,
});
cli.register(Builtins.HelpCommand);
cli.register(Builtins.VersionCommand);
cli.register(MainCommand)
cli.register(AuthCommand)
cli.register(LogoutCommand)
cli.runExit(args);
