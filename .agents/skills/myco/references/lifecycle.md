# Lifecycle — init / check / migrate / commit

The `project/` ledger lives on an orphan `project` branch, mounted as
a git worktree at `<repo>/project` and gitignored on `main`. Nothing
under `project/` is ever committed to the working branch — the
orphan-branch history is the audit trail.

## Auto-commit semantics

Every mutating verb ends in one atomic commit on the `project`
branch (`chore: <verb> <id>`). No commit when the tree didn't change.
Opt out with `--no-commit` or `$MYCO_NO_COMMIT` (tests, dry runs);
batch up later with `myco commit -m "…"`.

## `myco init` — scaffold a repo

```bash
myco init            # inside the repo (or --root <path>)
```

Creates the orphan branch + worktree + `meta.toml` + seed files,
appends `project/` to `.gitignore` (committed on the current branch).
Idempotent — a valid existing worktree gets scaffold gaps repaired,
never overwritten. Refuses to clobber a `project/` dir that isn't a
worktree: move it aside first, then init and copy content back.

## `myco check` — validate + repair

```bash
myco check           # report findings, exit 1 when dirty
myco check --fix     # apply safe repairs, commit
```

Validates the file spec and the state machine, detects file/index
drift. Run it after any forced hand-edit, after merge/rebase surgery
inside the worktree, and as the CI gate.

## `myco migrate` — legacy → v2

Auto-detects two modes:

- `pm/` dir at the repo root → converted into `project/` (inits the
  worktree first when missing), `pm/` deletion committed on main.
- Files already on the `project` branch → normalized in place:
  id-less bullets get ids, `[x]`/done lines drop (history keeps
  them), heading-like lines become sections, unfrontmattered files in
  `issues/`/`proposals/`/`plans/`/`adrs/` are adopted (fresh id +
  frontmatter + canonical filename, body kept verbatim), `index.md`
  links are repointed, everything re-emitted canonically.

Always read the JSON report (`--json`) and spot-check
`git -C project log`/`diff` for content loss afterward.

## `myco commit` — manual sweep

Stage + commit outstanding worktree changes with a conventional
message (`-m` to override). Use after hand-edits or `--no-commit`
batches — worktree changes are otherwise left dirty.

## Discovery — how verbs find the worktree

`--dir <worktree>` → `--root <repo>` (`<root>/project`) →
`myco.toml`'s `project_dir` → walk up from cwd for a qualifying
`project/` → cwd inside the worktree itself. From anywhere inside a
repo, plain `myco <verb>` just works.
