# Review instructions

Standing instructions for automated code review of this repository. Read by
[roborev](https://roborev.io) (per-commit background review) and by Claude Code's
`/code-review`, which both auto-discover this file.

**This file is a map, not a copy.** It deliberately does not restate any rule, so it cannot
drift out of sync with the real ones. Each row below names a trigger and the canonical file that
owns the rule — when a change matches a trigger, open the cited file and enforce what it
actually says. If a rule seems to be missing here, the standards in `.context/standards/` and
`.claude/rules/` are authoritative regardless.

The table lists **every** rule under `.claude/rules/`, including ones a Claude Code session would
pick up on its own. Rules carrying a `paths:` glob attach only inside an editing session, so no
external reviewer receives them; rules without one attach only for a reviewer that reads
`.claude/rules/` in the first place, which a reviewer running under a different agent does not.
Since this repo deliberately leaves the review agent unpinned, these rows are the only channel
that works regardless of who is reviewing.

Prefer a small number of high-confidence findings over exhaustive nitpicking.

## Project shape

Platform.Bible is an Electron app: a TypeScript/React renderer, a Node extension host, and a
.NET 8 / C# data provider communicating over JSON-RPC. Extensions in `extensions/src/` are
sandboxed and reach the platform only through PAPI. Architecture detail:
`.context/standards/Architecture.md`.

## When a change touches this, read that

| Trigger                                                                                                                                                                                                                                                                           | Canonical rule                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| New or changed public API surface — anything reaching `papi.d.ts`, extension `.d.ts` contracts, new public model fields, or anything newly visible on the wire (commands, network objects, data providers, web-view providers, PDP factories, network events, menu contributions) | `.context/standards/Paranext-Core-Patterns.md` § Experimental APIs                                   |
| C# that mutates project data — text, settings, comments/notes, project files, extension data                                                                                                                                                                                      | `CLAUDE.md` § Send/Receive Write Gate                                                                |
| Any keyboard handler — `keydown`/`keyup`/`keypress`, Electron accelerators, `before-input-event`, `useHotkeys`                                                                                                                                                                    | `.claude/rules/keyboard-shortcuts-catalog.md`                                                        |
| Anything synchronizing state or behavior across views, tabs, or panes — scroll sync, selection sync, focus-follows, live highlighting                                                                                                                                             | `.claude/rules/cross-view-sync-hidden-views.md`                                                      |
| Any file under `lib/platform-bible-react/src/components/shadcn-ui/`                                                                                                                                                                                                               | `.claude/rules/code-quality/shadcn-discipline.md`                                                    |
| `eslint-disable`, `@ts-ignore`, `@ts-expect-error`, `// prettier-ignore`, or `as` type assertions                                                                                                                                                                                 | `.claude/rules/code-quality/eslint-disable-discipline.md`                                            |
| Comments — especially ones referencing tickets, PRs, or the change's own history                                                                                                                                                                                                  | `.context/standards/Code-Style-Guide.md`, "Comments describe the code, not its history"              |
| Naming, TSDoc, `undefined` vs `null`, imports, async style                                                                                                                                                                                                                        | `.context/standards/Code-Style-Guide.md`                                                             |
| Tests — `**/*.test.ts`, `**/*.test.tsx`, `c-sharp-tests/**/*.cs`                                                                                                                                                                                                                  | `.context/standards/Testing-Guide.md`, `.claude/rules/testing/tdd-discipline.md`                     |
| User-facing strings                                                                                                                                                                                                                                                               | `.context/standards/Localization-Guide.md`                                                           |
| `c-sharp/**/*.cs`                                                                                                                                                                                                                                                                 | `.claude/rules/architecture/csharp-patterns.md`                                                      |
| `extensions/src/**`                                                                                                                                                                                                                                                               | `.claude/rules/architecture/extension-patterns.md`                                                   |
| `lib/platform-bible-react/**`, `**/*.web-view.tsx`                                                                                                                                                                                                                                | `.claude/rules/architecture/react-patterns.md`                                                       |
| `lib/platform-bible-react/**`, `src/renderer/**`, `extensions/src/**/*.component.tsx`, `**/*.web-view.tsx`                                                                                                                                                                        | `.claude/rules/ux/apply-model.md`                                                                    |
| `src/shared/**`, `src/node/**`                                                                                                                                                                                                                                                    | `.claude/rules/architecture/shared-patterns.md`                                                      |
| `c-sharp/**`, `extensions/src/**`, `src/**` — new code that may duplicate something existing                                                                                                                                                                                      | `.claude/rules/architecture/discover-before-implementing.md`                                         |
| Code ported from Paratext 9 / WinForms                                                                                                                                                                                                                                            | `.claude/rules/architecture/porting-discipline.md`, `.claude/rules/architecture/winforms-porting.md` |
| Storybook stories and links                                                                                                                                                                                                                                                       | `.claude/rules/architecture/storybook-links.md`                                                      |
| `.context/**`, `.claude/**` — documentation and agent-facing content                                                                                                                                                                                                              | `.claude/rules/docs-durability.md`                                                                   |
| `.claude/agents/**`, `.claude/commands/**`, `.claude/skills/**`                                                                                                                                                                                                                   | `.claude/rules/agent-authoring-link-dont-paraphrase.md`                                              |
| New or relocated guidance — `.claude/rules/**`, `.context/standards/**`, `lib/platform-bible-react/src/stories/guidelines/**`, `CLAUDE.md`, `CONSTITUTION.md`, `docs/adr/**`                                                                                                      | `.claude/rules/where-to-add-guidance.md`                                                             |
| A design doc, spec, or implementation plan added to the repository                                                                                                                                                                                                                | `.context/standards/Agentic-Engineering-Guide.md` § Where artifacts live                             |
| `.claude/commands/prd-to-jira.md`                                                                                                                                                                                                                                                 | `.claude/rules/jira-issue-creation.md`                                                               |
| A commit whose stated purpose is clearing lint across many files                                                                                                                                                                                                                  | `.claude/rules/code-quality/lint-sweep-verification.md`                                              |
| Selecting a subset from a large list by judgment — files, symbols, usages, importers                                                                                                                                                                                              | `.claude/rules/grep-safety-net.md`                                                                   |
| Every change — this repository is public                                                                                                                                                                                                                                          | `.claude/rules/code-quality/no-secrets.md`                                                           |

## Do not flag

- Generated or vendored output: `lib/papi-dts/papi.d.ts` (regenerated by `npm run build:types`,
  never hand-edited), `dist/` directories, minified bundles, source maps.
- Extension `tsconfig.json` files using `../../../` relative paths for `typeRoots` — the correct
  pattern here, see `.context/standards/Component-Builder-Patterns.md`.
- Either spelling of the web view export. `globalThis.webViewComponent` is the canonical form
  documented in `papi.d.ts`; `global.webViewComponent` also works and appears in shipped web
  views. Neither is a defect.
- Missing database migrations or ORM concerns. There is no database in this codebase.
