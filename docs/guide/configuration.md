# Configuration

Strigi is designed to work out of the box without requiring configuration. However, for curated Strigi's behavior, there are a few configuration options available.

## Changing the AI Model

Strigi uses Google's Gemini models for generating commands and explanations. You can change the model in several ways:

### Method 1: Using the Personalize Command (Recommended)

The easiest way to change your default model is through the personalize command:

```bash
$ s personalize
```

When prompted with "Which model would you like to use?", select your preferred model from the available options. This will set your default model for all future interactions.

### Method 2: Using the Model Flag (Temporary)

You can specify a different model for a single command using the `-m` or `--model` flag:

```bash
# Use a specific model for one command
$ s -m gemini-2.5-flash-lite "list files in current directory"

# Or with any subcommand
$ s generate -m gemini-2.5-flash-lite "update packages"
$ s explain -m gemini-2.5-flash-lite "git status"
$ s revise -m gemini-2.5-flash-lite "ls -la"
```

### Available Models

Strigi automatically fetches the latest available models from Google's API. Common models include:

- `gemini-2.5-flash` (default) - Fast and efficient for most tasks
- `gemini-2.5-flash-lite` - Even faster, good for simple commands
- `gemini-2.5-pro` - More capable for complex reasoning

To see all available models, run the personalize command and browse the selection menu.

### Model Selection Tips

- **For speed**: Choose `gemini-2.5-flash-lite` for quick command generation
- **For accuracy**: Use `gemini-2.5-flash` (default) for balanced performance
- **For complexity**: Select `gemini-2.5-pro` for advanced tasks

Your model preference is saved in your configuration and will be used for all future commands unless you override it with the `-m` flag.

## Providing General Contextual Instructions

Strigi strives to be adaptable, and you can leverage the `s personalize` command to provide specific instructions or preferences that influence its responses.

* Use the following command to begin the process:

  ```bash
  $ s personalize
  ```

* Strigi will prompt you with three questions:

  * `Which model would you like to use?` - Choose your preferred Gemini model from the available options.
  * `What would you like the model to know about you to provide better responses?` - This allows you to share details about your environment or preferences (e.g., "I primarily use a Linux environment").  This information can help Strigi tailor its responses and command suggestions to your specific context.
  * `How would you like the model to respond?` - Here, you can specify your preferred response style (e.g., brief, detailed, specific tone).

## Setting Your Preferred Explanation Language

* To initiate the customization process, use the command:

  ```bash
  $ s personalize
  ```

* In the first prompt (about yourself), you can leave the default behavior and press `Enter`.
* In the second prompt (regarding model responses), add a statement indicating your preferred locale. For example:

  ```
  Respond using pt-br.
  ```

## Tailoring Command Generation to Your Operating System

* To instruct Strigi to prioritize commands specific to your operating system (e.g., Linux distribution), type the following command.

  ```bash
  $ s personalize
  ```

* In the first prompt (about yourself), add a statement indicating your operating system. For example:

  ```
  I use Arch btw.
  ```

* In the second prompt (regarding model responses), you can leave the default behavior.
