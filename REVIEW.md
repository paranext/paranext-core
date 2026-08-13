# Review instructions

Standing instructions for automated code review of this repository. Read by
[roborev](https://roborev.io) (per-commit background review) and by Claude Code's
`/code-review`, which both auto-discover this file.

Depth for every rule below lives in `.context/standards/`; this file is the checklist, not
the explanation. Prefer a small number of high-confidence findings over exhaustive nitpicking.

## Project shape

Platform.Bible is an Electron app: TypeScript/React renderer, a Node extension host, and a
.NET 8 / C# data provider, communicating over JSON-RPC. Extensions in `extensions/src/` are
sandboxed and talk to the platform only through PAPI. Treat `lib/papi-dts/papi.d.ts` as
generated output — it is never hand-edited.

## Always flag

- **Missing `@experimental` on new public API.** Anything newly reaching `papi.d.ts`,
  extension `.d.ts` contracts, or new fields on public models needs a TSDoc `@experimental`
  tag. Anything newly visible on the wire — commands, network objects, data providers,
  web-view providers, PDP factories, network events — needs `'x-experimental': true` in its
  OpenRPC documentation object (`"isExperimental": true` for menu contributions). Both
  surfaces, not just one. In extension `.d.ts` files each member must be tagged individually.
- **Ungated project-data writes in C#.** Any new code path that mutates project data
  (`PutText`, `Settings.Save`/`SetSetting`/`RemoveSetting`, `FileManager` operations, comment
  or note mutations, extension data) must open with
  `using var _ = SendReceiveWriteLock.EnterWrite(projectId);` as the first statement of its
  entry-point method. Keep the scope tight — mutation only. Nested `EnterWrite` calls are a
  defect, not a style issue: one scope per mutation.
- **Keyboard handlers not reflected in the catalog.** Adding, changing, or removing a
  `keydown`/`keyup`/`keypress` listener, an Electron accelerator or `before-input-event`
  branch, or a `useHotkeys` binding requires the matching entry in
  `src/stories/keyboard-shortcuts.data.ts` in the same change.
- **Cross-view sync that only handles the visible case.** rc-dock keeps inactive tabs
  mounted but `display: none`, where geometry reads return zero and `scrollIntoView` no-ops.
  Any scroll sync, selection sync, focus-follows, or live highlighting must state what
  happens while the target view is hidden and how it catches up on activation. "Do nothing
  while hidden" is acceptable only when a comment at the sync site says so deliberately.
- **Unannotated shadcn edits.** Every change under
  `lib/platform-bible-react/src/components/shadcn-ui/` needs a `// CUSTOM:` comment
  immediately above it saying what changed and why. No exceptions, including mechanical
  find-and-replace.
- **Secrets.** This repository is public. Flag any credential, token, key, connection
  string, or secret file — including base64-encoded or otherwise obfuscated values, and
  default values that are real secrets.
- **Suppressions without justification.** `eslint-disable`, `@ts-ignore`, `// prettier-ignore`,
  and `as Type` assertions need a comment explaining why fixing the code is worse. Prefer
  `@ts-expect-error` with the error code over `@ts-ignore`.
- **Transient references in source comments.** Ticket IDs (`PT-1234`), PR numbers, and
  before/after-the-fix framing do not belong in code comments. The explanation should stand
  on its own without them.

## Do not flag

- Generated or vendored output: `lib/papi-dts/papi.d.ts`, `dist/` directories, minified
  bundles.
- Extensions using `../../../` relative paths for `typeRoots` in `tsconfig.json` — that is
  the correct pattern here, not a mistake.
- `global.webViewComponent = ...` in web views. `globalThis` does not work in that context.
- Missing database migrations or ORM concerns. There is no database in this codebase.
