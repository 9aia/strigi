# Items — ids, state machine, the item verbs

## Id scheme

| Kind | Id | Home |
| --- | --- | --- |
| Task | `T-NNN` | lines in `TODO.md` (live) / `BACKLOG.md` (parked) |
| Issue | `I-NNN` | `issues/issue-NNNN-<slug>.md`, one file each |
| Proposal | `P-NNN` | `proposals/proposal-NNNN-<slug>.md` |
| Plan | `PL-NNN` | `plans/pl-NNNN-<slug>.md` |
| ADR | `ADR-NNNN` | `adrs/NNNN-<slug>.md` (no prefix) |

Ids are allocated by the store (`meta.toml` counters) — never invent
or renumber one. File-backed kinds carry TOML frontmatter (`+++`);
the schema for fields is `myco schema`, not this doc.

## State machine

`open → claimed → in-progress → done`, plus `blocked` (stuck) and
`deferred` (parked). **Single steps only** — `item set --status`
walks one legal edge; multi-step jumps error out naming the valid
targets (e.g. `open → done` must go through `in-progress`).

```
open     → claimed | in-progress | deferred
claimed  → in-progress | open | deferred
in-progress → blocked | done | deferred
blocked  → in-progress | open | deferred
deferred → open
done     → (terminal)
```

Tasks move files as they transition: `deferred` moves the line
TODO→BACKLOG, `open` moves it back, `done` deletes the line (git
history keeps the record).

## Verbs

```bash
myco todo add "title" [--section S] [--pri high] [--owner devin] \
    [--label x] [--blocks T-1] [--epic v2] [--milestone 0.2]
myco todo done T-NNN          # → done, line removed
myco todo defer T-NNN         # → deferred, line → BACKLOG.md
myco todo list                # backlog list / promote T-NNN likewise

myco issue new "title" [--text|--body FILE|-]   # issues/issue-NNNN-slug.md
myco issue comment I-NNN "note"                 # dated note, append-only
myco issue resolve I-NNN [--resolution "…"]     # → done
myco issue archive I-NNN                        # done → issues/archive/

myco proposal new "title"     # draft (status open)
myco proposal status P-NNN accepted|rejected    # aliases: accepted→done,
                              # rejected→deferred — walked step-by-step
myco plan new "title"         # phase-checklist template
myco adr new "title"          # status open = "proposed"
myco adr supersede ADR-1 --by ADR-2             # reciprocal links

myco item show T-NNN          # any kind, live or archived
myco item set T-NNN --status in-progress --owner devin \
    --label +urgent --unlabel stale --blocks +I-3 --epic v2
```

`item set` mutates metadata in place; `--status` is the only field
routed through the state machine. `--label`/`--blocks` take `+`/`-`
prefixes; `--epic ""` clears.

## Metadata tokens

- `--pri low|med|high|crit` — priority
- `--owner <actor>` — `devin`, `human:luis`, … (who owns it)
- `--label <tag>` — `#label`, repeatable
- `--blocks <ids>` — "this item blocks those" dependencies
- `--epic` / `--milestone` — `[A-Za-z0-9_.-]+` grouping names, feed
  `myco epic` / `myco milestone` / `board --epic/--milestone`

## Importing

`myco absorb comments` sweeps `TODO`/`FIXME`/`HACK` code comments
into the backlog (or `--to issues`); `--dry` previews. `absorb jira`
/ `absorb github` import CSV/JSON dumps (closed rows skipped unless
`--include-done`).
