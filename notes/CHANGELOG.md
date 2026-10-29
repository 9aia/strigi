# Changelog

## [Unreleased]

## [0.5.0] - 2025-09-27

### Added

- Added a new `config` command to display current settings, including API key status, selected model, custom instructions, and configuration file location
  - Included an option to reveal your API key when using the `config` command
- Added a new `personalize` command to customize your AI experience by selecting your preferred Gemini model and setting custom instructions
- Introduced a new `help` command for easily accessing help information
- Added a `--model` option to `generate`, `explain`, and `revise` commands, allowing you to specify a Gemini model directly for specific tasks

### Removed

- Removed the `instruct` command, as its functionality was integrated and enhanced within the new `personalize` command

### Changed

- Updated the default Gemini model for new configurations to `gemini-2.5-flash`
- Migrated project repository, homepage, and bug report links to the new `9aia` organization

## [0.4.1] - 2024-11-18

### Fixed

- Resolved an issue where an unnecessary linebreak appeared after printing commands
- Added finish reason validation for `revise` and `explain` command responses
- Ensured proper handling of cases where the finish reason is missing

### Changed

- Upgraded `@google/generative-ai` to version `0.21.0`
- Reimplemented prompts to utilize system instructions for better consistency and performance
- Enhanced prompting for clarity and efficiency

## [0.4.0] - 2024-11-14

### Added

- Added option "Copy"

### Fixed

- Added Gemini finish reason handling
- Implemented exit on cancel
- Prevented the stacktrace from being printed

### Changed

- Updated to use Gemini 1.5 Flash

## [0.3.0] - 2024-04-16

### Added

- Added OS platform injection in prompts
- Added revise command

### Fixed

- Fixed `Ctrl+C` line break

### Changed

- Renamed `s run` to `s generate`
- Renamed `s r` to `s g`
- Allowed the user to choose actions after canceling command execution

## [0.2.0] - 2024-04-09

### Added

- Added custom instructions
- Added explain command
- Added keyboard shortcuts

### Changed

- Improved help

### Fixed

- Added support for pipe, redirects and backgrounding
- Improved response generation accuracy

## [0.1.0] - 2024-04-03

### Added

- Added main command
- Added run action
- Added cancel action
- Added explanation for the generated command
- Added explanation streaming
- Added authentication with API key setting
