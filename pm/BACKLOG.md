# Backlog

## Security

- Add security file

## Features

- Add the ability to generate and execute a multi-step plan from a single prompt
- Read GEMINI_API_KEY from .env and
  - Add option to pass the env file
- Add revise and explain after errors
- Add command highlighting
- Add explanation highlighting
- Add arg/config to disable streaming
- Add arg/config for other models
- Add credentials to env var. Export S_GEMINI_API_KEY = ""
- Add support for other models not just Gemini
- Add i18n

## Bugs

- Go back to menu after canceling run
- Fix long response printing
- Fix retry multiple times crash
- Fix undefined after try to command gen
- Fix menu after `s explain`

## Enhancements

- Add `@see` to docs in `s -h`

## Performance

## Legal

## DX

- Refactor config access (resolve it to default, avoiding undefined config)

## QA

- Add tests
