# Context

Glossary of domain terms used in this codebase. Implementation details belong elsewhere (ADRs, code, READMEs).

## Command

A registered PAPI RPC — the machine contract for an operation, identified by a precise dot-separated name (e.g., `platform.assignChapter`). A Command is pure: no localized labels, no confirmation UX, no argument-gathering. It is callable from any process and from any extension or script.

Not every Command is user-facing. Internal RPCs and developer/diagnostic operations are Commands without a corresponding Action.

## Action

The user-facing surface for invoking a Command. An Action owns: localized title, description, search keywords, icon, category, when-clause, arg-flow, optional confirmation UX, and a dispatch target naming one Command.

Every human invocation path — Action Palette, menus, keybindings, toolbar buttons — goes through an Action. Scripts and extensions invoke Commands directly without involving Actions.

The set of Actions is precisely the user-facing subset of Commands. An Action dispatches to exactly one Command. Operations that combine multiple Commands are themselves Commands (when they name a real composite operation) or are expressed as Deep Links (when the combination is navigation/state composition).

## Action Provider

A dynamic source of Bound Actions. Yields palette entries at query time from data like recent locations, the project list, known settings, or open comments.

## Bound Action

An Action with some or all arguments pre-supplied — at declaration time (a static favorite) or at query time (yielded by an Action Provider). Renders in the Action Palette indistinguishably from a regular Action.

## Arg-flow

The declarative specification on an Action for collecting a Command's arguments before dispatch. Covers sub-pickers, context resolution, provider-driven choices, dependent arguments, validation, defaults, skip conditions, and cancellation.

Arg-flow structures _input collection_, not operation composition. Hierarchical drilling — e.g., pick book, then pick chapter from that book, then pick a user — is arg-flow when it resolves to one Command call. Chaining multiple Commands is composition, which lives in the Command layer (if it names a real operation) or in a Deep Link (if it represents navigation/state).

An Action's arg-flow always resolves to exactly one Command call.

## Deep Link

A URI representing application state (e.g., `paratext://project/X/resources`). One Command, `platform.navigateToDeepLink`, handles all deep links. Deep Links are the data-shaped alternative to inventing composite Commands for navigation/state composition; Bound Actions may carry pre-filled deep-link URIs from providers (recents, bookmarks).

## Action Palette

The catch-all UI surface for user-facing functionality. Lists Actions and Bound Actions, with search, sub-picker drilling for arg-flow, and dialog escape for argument types that don't fit inline.

The Action Palette is not a surface for developer-facing functionality. Commands without Actions do not appear.

Named "Action Palette" rather than the industry-standard "Command Palette" to keep the user-facing vocabulary aligned with the Action concept. The items in the palette are Actions, not Commands; calling the surface a "Command Palette" would reintroduce the overload between the machine-layer Command and the user-layer Action. See `docs/adr/0001-action-palette-naming.md`.
