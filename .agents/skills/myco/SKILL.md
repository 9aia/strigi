---
name: myco
description: Manage project state via the myco CLI — tasks, backlog, issues, proposals, plans, ADRs, handoffs in `project/` worktree files. Trigger when working with `project/` files, planning, tracking tasks, or starting/resuming work.
metadata:
  version: "2.0.0"
---

# myco — agent-first project management

`myco` owns every deterministic write to a repo's `project/` worktree
(orphan `project` branch, gitignored on main). Markdown is canonical;
the CLI is the write path; git history is the audit trail.

## The one rule

**Never hand-edit `project/` files when a `myco` verb exists.** If a
change genuinely has no verb, edit — then run `myco check` to
re-validate and `myco check --fix` to repair drift.

## Bootstrap

```bash
command -v myco   # missing? install from the repo:
cargo xtask install        # in 9aia/myco — installs to ~/.cargo/bin
```

## Discovery — prefer asking the CLI over reading docs

```bash
myco manifest          # capabilities + full verb list (JSON)
myco schema            # the file/state spec, machine-readable
myco <verb> --help     # every verb, self-documenting
```

`--json` is accepted on every verb — use it for machine consumption.
`--dir`/`--root` override worktree discovery when cwd isn't the repo.

## Verb cheat sheet — by intent

| Intent | Command |
| --- | --- |
| Session start / where things stand | `myco status --prompt` |
| Add a task | `myco todo add "title" [--pri high] [--owner devin]` |
| Park / re-activate a task | `myco todo defer T-NNN` / `myco backlog promote T-NNN` |
| Claim / start / block / finish | `myco item set T-NNN --status claimed|in-progress|blocked|done` |
| Done a task | `myco todo done T-NNN` |
| File / close an issue | `myco issue new "title"` / `myco issue resolve I-NNN` |
| Design / plan / decision docs | `myco proposal new` · `myco plan new` · `myco adr new` |
| Inspect / mutate any item | `myco item show T-NNN` · `myco item set T-NNN …` |
| Session end (resumable state) | `myco handoff T-NNN --note "done/next/open"` |
| Restart work on an item | `myco resume T-NNN` |
| Views | `myco board` · `report` · `epic` · `milestone` |
| Cross-repo | `myco index add <repo>` · `myco org status` |
| Housekeeping | `myco init` · `check` · `migrate` · `commit` |

## The daily loop

1. `myco status --prompt` — token-sized digest of the ledger.
2. Work. Track state as you go: `--status claimed` on pickup,
   `in-progress` when started, `blocked` when stuck.
3. Exit: `myco item set <ID> --status done` for finished work,
   `myco handoff <ID> --note …` for anything resumable.

## References — read only what the task needs

- [lifecycle.md](file://./references/lifecycle.md) — init / check /
  migrate / commit, the worktree model, auto-commit semantics
- [items.md](file://./references/items.md) — all item verbs, id
  scheme, state machine, metadata tokens
- [continuity.md](file://./references/continuity.md) — handoff /
  resume / status --prompt — the core agent workflow
- [views.md](file://./references/views.md) — board / report / epic /
  milestone / index / org
