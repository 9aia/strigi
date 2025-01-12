# Contributing Guide

Thank you for considering contributing to Strigi! We welcome contributions from the community to help improve the project and make it even better. This guide outlines the various ways you can contribute.

1. **Reporting Bugs:** If you encounter any bugs or issues with the project, please [open an issue](https://github.com/9aia/strigi/issues) on GitHub. Include detailed information about the bug and steps to reproduce it.
2. **Feature Requests:** If you have ideas for new features or improvements, feel free to [open an issue](https://github.com/9aia/strigi/issues) to discuss them. We value your feedback and ideas.
3. **Code Contributions:** If you're a developer and want to contribute code to the project, you can fork the repository, make your changes, and submit a pull request. Please follow our coding standards and guidelines.
4. **Documentation Improvements:** Help us improve the project's documentation by fixing typos, adding examples, or clarifying instructions. You can edit the documentation directly on GitHub.
5. **Sharing:** Share it with your network and help us reach more users who can benefit from it.
6. **Project Management:** Assist with organizing and managing Strigi’s development by contributing ideas, prioritizing tasks, or helping maintain documentation on ongoing and planned work.

## Project Management

Strigi keeps track of ideas, plans, and tasks using the following resources:

- **[Ideas](pm/notes/ideas.md):** A collection of brainstorming and raw ideas that need further refinement and consideration. Explore potential features and concepts to shape Strigi's future.
- **[Backlog](pm/BACKLOG.md):** A comprehensive list of planned features, bug reports, enhancements, and documentation tasks. Use this to stay informed on what's next for Strigi and contribute where possible.
- **[To-Do](pm/TODO.md):** An up-to-date list of current development tasks, including short-term goals and ongoing priorities. This is the primary reference for work in progress.

Feel free to review and contribute to any of these areas as Strigi continues to evolve!

## Development

### Tools

We use the following tools for development:

- [Bun 1.1.34 or higher](https://bun.sh/) - Bun is a fast JavaScript all-in-one toolkit.

### Scripts

- **`bun run start`**: Launch Strigi in its default mode.
- **`bun run dev`**: Start Strigi in watch mode, automatically rebuilding on file changes.
- **`bun run lint`**: Lint the codebase to identify potential issues and enforce coding standards.
- **`bun run lint --fix`**: Automatically fix fixable linting issues.
- **`bun run build`**: Build Strigi for production, including minification and sourcemaps for optimized performance.
- **`bun link`**: Link your local package globally for testing. Run the CLI commands as if the package were installed globally without needing to publish it.
- **`bun run docs:dev`**: Start the documentation site in development mode, with live-reloading for changes.
- **`bun run docs:build`**: Build the documentation site for production, optimizing for deployment.
- **`bun run docs:preview`**: Preview the built documentation site locally before deployment.
- **`bun run docs:deploy`**: Deploy the built documentation to your chosen hosting platform.
- **`bun run docs:licenses`**: Generate the `/about/open-source.md` file, listing open-source licenses used in the project.
- **`bun run release`**: Create a new release version, including necessary versioning and packaging tasks.
