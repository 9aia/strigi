import { Command, Option } from "clipanion";
import pkg from '../../package.json';
import generateCommand, { type CommandGeneration } from "../services/generateCommand";
import { select, confirm } from '@inquirer/prompts';
import c from "chalk-template";
import explainCommand from "../services/explainCommand";
import chalk from "chalk";

export default class MainCommand extends Command {
  query = Option.Rest({ name: "query", required: 1 })

  static usage = Command.Usage({
    description: pkg.description
  })

  explanation: string | null = null

  async respond(query: string, cmd: string) {
    this.context.stdout.write(chalk.blue(`${cmd}\n\n`));

    const action = await select<'run' | 'cancel' | 'explain'>({
      message: "",
      choices: [
        {
          name: 'Run',
          value: 'run'
        },
        {
          name: 'Cancel',
          value: 'cancel',
        },
        {
          name: !this.explanation ? 'Explain' : 'Explain again',
          value: 'explain',
        }
      ]
    })

    const cancel = () => {
      this.context.stdout.write(c`{yellow Canceled.}\n`)
    }

    const run = async () => {
      const answer = await confirm({
        message: 'Are you sure you want to run?',
        default: true,
      })

      if (answer) {
        this.context.stdout.write(c`\n{green Executing...}\n`)

        const cmdArray = cmd.split(" ");
        const label = cmdArray[0];

        const commandPath = Bun.which(label);

        if (!commandPath) {
          this.context.stdout.write(c`{red Command not found in PATH}\n`)
          return;
        }

        const res = Bun.spawnSync(cmdArray);

        if (!res.success) {
          this.context.stdout.write(c`{red Command failed with exit code ${res.exitCode}. }\n\n${res.stderr}`)
          return;
        }

        this.context.stdout.write(`\n${res.stdout}`)
        return;
      }

      cancel()
    }

    const explain = async () => {
      const explanation = await explainCommand(query, cmd);
      this.explanation = explanation;

      this.context.stdout.write(`\n${explanation}\n\n`)

      await this.respond(query, cmd)
    }

    const actions: Record<typeof action, () => Promise<void> | void> = {
      run,
      cancel,
      explain,
    }
    const handle = actions[action]!;

    await handle()
  }

  async execute() {
    const query = this.query.join(" ");
    const generation = await generateCommand(query);

    this.respond(query, generation.cmd)
  }
}
