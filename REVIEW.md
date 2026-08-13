# Review instructions

Standing instructions for automated code review of this repository. Read by
[roborev](https://roborev.io) (per-commit background review) and by Claude Code's
`/code-review`, which both auto-discover this file.

**This file is a map, not a copy.** It deliberately does not restate any rule, so it cannot
drift out of sync with the real ones. Each row below names a trigger and the canonical file that
owns the rule — when a change matches a trigger, open the cited file and enforce what it
actually says. If a rule seems to be missing here, the standards in `.context/standards/` and
`.claude/rules/` are authoritative regardless.

Prefer a small number of high-confidence findings over exhaustive nitpicking.

## Project shape

Platform.Bible is an Electron app: a TypeScript/React renderer, a Node extension host, and a
.NET 8 / C# data provider communicating over JSON-RPC. Extensions in `extensions/src/` are
sandboxed and reach the platform only through PAPI. Architecture detail:
`.context/standards/Architecture.md`.

## When a change touches this, read that

| Trigger                                                                                                                                                                                                                                                                           | Canonical rule                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| New or changed public API surface — anything reaching `papi.d.ts`, extension `.d.ts` contracts, new public model fields, or anything newly visible on the wire (commands, network objects, data providers, web-view providers, PDP factories, network events, menu contributions) | `.context/standards/Paranext-Core-Patterns.md` § Experimental APIs                      |
| C# that mutates project data — text, settings, comments/notes, project files, extension data                                                                                                                                                                                      | `CLAUDE.md` § Send/Receive Write Gate                                                   |
| Any keyboard handler — `keydown`/`keyup`/`keypress`, Electron accelerators, `before-input-event`, `useHotkeys`                                                                                                                                                                    | `.claude/rules/keyboard-shortcuts-catalog.md`                                           |
| Anything synchronizing state or behavior across views, tabs, or panes — scroll sync, selection sync, focus-follows, live highlighting                                                                                                                                             | `.claude/rules/cross-view-sync-hidden-views.md`                                         |
| Any file under `lib/platform-bible-react/src/components/shadcn-ui/`                                                                                                                                                                                                               | `.claude/rules/code-quality/shadcn-discipline.md`                                       |
| `eslint-disable`, `@ts-ignore`, `@ts-expect-error`, `// prettier-ignore`, or `as` type assertions                                                                                                                                                                                 | `.claude/rules/code-quality/eslint-disable-discipline.md`                               |
| Comments — especially ones referencing tickets, PRs, or the change's own history                                                                                                                                                                                                  | `.context/standards/Code-Style-Guide.md`, "Comments describe the code, not its history" |
| Naming, TSDoc, `undefined` vs `null`, imports, async style                                                                                                                                                                                                                        | `.context/standards/Code-Style-Guide.md`                                                |
| Tests                                                                                                                                                                                                                                                                             | `.context/standards/Testing-Guide.md`                                                   |
| User-facing strings                                                                                                                                                                                                                                                               | `.context/standards/Localization-Guide.md`                                              |
| Every change — this repository is public                                                                                                                                                                                                                                          | `.claude/rules/code-quality/no-secrets.md`                                              |

## Do not flag

- Generated or vendored output: `lib/papi-dts/papi.d.ts` (regenerated by `npm run build:types`,
  never hand-edited), `dist/` directories, minified bundles, source maps.
- Extension `tsconfig.json` files using `../../../` relative paths for `typeRoots`, and
  `global.webViewComponent = ...` in web views. Both are the documented correct pattern here —
  see `.context/standards/Component-Builder-Patterns.md`.
- Missing database migrations or ORM concerns. There is no database in this codebase.
