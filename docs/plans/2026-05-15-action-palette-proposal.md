# Action Palette — A Proposal

**To:** TJ Couch
**From:** Alex Mercado (UX)
**Date:** 2026-05-15
**Status:** Seeking architectural approval

---

## TL;DR

I'm asking for your blessing to add a feature called the **Action Palette** — a catch-all, searchable launcher (think VS Code's Command Palette, but tighter and Raycast-ish) where users can find and trigger anything the app can do.

To make this work cleanly, I'm also proposing a small vocabulary shift that gives us a sharper mental model:

- **Command** = the existing PAPI RPC. The machine-layer contract. Unchanged.
- **Action** = a new concept. The user-facing wrapper around a Command. Owns the localized label, the description, the argument-collection flow, and the confirmation UX.

The Action Palette displays Actions. Menus, keybindings, and toolbar buttons also dispatch through Actions. Scripts and other extensions keep calling Commands directly. This separation is the load-bearing idea in the proposal.

**The branch this proposal lives on (`refactor/action-palette`) includes a working illustrative rename** that introduces the `ActionPalette*` terminology in the overlay service and keeps `CommandPalette*` as `@deprecated` aliases. **Treat that code as a sketch, not a mandate.** It's there to show that the rename is mechanical, that the tests still pass, and to make the proposal concrete. If you'd rather we land a different shape — or hold off on the rename entirely until the broader feature is approved — that's fine; I'd rather make this decision once with you than twice without you.

---

## Why this matters

I want to be able to ship new functionality without having to decide up front _where_ users will reach it from. Today, every new feature negotiates its own home — a menu item, a button somewhere, a keybinding, a context menu entry — and we have to predict that placement before we've watched anyone actually try to use the thing. The Action Palette flips that: every new bit of user-facing functionality lands in the palette first, gets used, and _then_ we earn it a dedicated button or menu placement once we know what users reach for and where.

The palette also becomes the unified discovery surface ("I know there's a way to do this — let me search for it") and the keyboard-driven power-user path. Bible translators are knowledge workers; they will benefit.

---

## The problem with the current vocabulary

"Command" already does two jobs in this codebase:

1. **Programmer-facing**: a registered PAPI RPC (`platform.assignChapter`, `platformScriptureEditor.insertFootnote`). Identified by precise dot-separated names. Typed via `papi-shared-types`. Powers menus.
2. **UI-facing**: the things the user invokes — buttons, menu items, keyboard shortcuts. Not all PAPI commands are user-facing (e.g. `platform.restartExtensionHost`, `platform.isSendReceiveAvailable`, `helloRock3.deleteHelloRock3ProjectByWebViewId`). The user-facing set is a _subset_ of the PAPI command surface.

If we introduce a Command Palette and tell extension authors "your command appears in the Command Palette," they will reasonably ask: _which commands?_ All of them? The user-invocable ones? Who decides? How do they declare it? Where do localized labels come from? How does it know whether to prompt for an argument?

These aren't theoretical. They surface as concrete failure modes:

- Internal RPCs like `platform.isSendReceiveAvailable` (a predicate) and `helloRock3.openHelloRock3ProjectViewerByWebViewId` (plumbing keyed by opaque IDs) would show up in the palette and confuse users — or developers would have to invent ad-hoc conventions to hide them.
- A precise developer name (`platform.assignChapter`) is bad UI microcopy. The palette label should say "Assign Chapter…", localized into the user's language. Forcing these to be the same thing handcuffs both audiences.
- Some user-facing entries need to _collect arguments_ before they can run (Go to BCV, Switch Project). PAPI commands take typed parameters but have no declarative way to say "this is the arg-collection UX." Actions can.

We can either patch the Command concept until it grows enough metadata to do both jobs (and overload itself further), or we can name the user-facing layer separately and keep each concept simple. I'm proposing the latter.

---

## The proposed mental model

> Glossary lives at [`CONTEXT.md`](../../CONTEXT.md). Naming rationale lives at [`docs/adr/0001-action-palette-naming.md`](../adr/0001-action-palette-naming.md).

### Command (unchanged)

A registered PAPI RPC. The machine contract for an operation, identified by its precise dot-separated name. Pure: no localized labels, no confirmation UX, no argument-gathering. Callable from any process, extension, or script.

Not every Command is user-facing. Many are internal RPCs or developer/diagnostic operations.

### Action (new)

The user-facing surface for invoking a Command. An Action owns:

- Localized **title**, **description**, **search keywords**, **icon**, **category**
- A **when-clause** for availability (e.g. "only when a project is focused")
- An **arg-flow**: declarative spec for how to collect the Command's arguments from context, user input, or providers
- Optional **confirmation UX** (where destructive-action protection lives)
- A **dispatch target**: the name of one Command

Every human invocation path — Action Palette, menus, keybindings, toolbar buttons — goes through an Action. Scripts and other extensions invoke Commands directly without involving Actions.

The set of Actions is precisely the user-facing subset of Commands. An internal Command simply has no Action.

### Action Provider (new)

A dynamic source of Bound Actions. Yields palette entries at query time from data like recently visited locations, the project list, known settings, or open comments. This is how "Recent: Genesis 1 — MyProject" gets into the palette without us having to register a static Action for every possible recent.

### Bound Action (new)

An Action with some or all arguments pre-supplied — either at declaration time ("Sync MyProject") or at query time (yielded by an Action Provider, like recents). Renders in the palette indistinguishably from a regular Action.

### Arg-flow (new)

The declarative spec on an Action for collecting a Command's arguments before dispatch. Covers sub-pickers, context resolution ("current project," "selected text"), provider-driven choices, dependent arguments, validation, defaults, skip conditions, and cancellation.

Arg-flow structures _input collection_, not operation composition. Hierarchical drilling — pick book, then pick chapter from that book, then pick a user — is arg-flow. Chaining multiple Commands is composition, which lives in the Command layer (if it names a real operation) or in a Deep Link (if it represents navigation/state). **An Action's arg-flow always resolves to exactly one Command call.** This is the rule that keeps Actions thin.

### Deep Link (new pattern, possibly familiar)

A URI representing application state (e.g., `paratext://project/X/resources`). One Command — say `platform.navigateToDeepLink` — handles all deep links. This is the data-shaped alternative to inventing composite Commands every time the UI needs "open X and show Y." Bound Actions can carry pre-filled deep-link URIs from providers (recents, bookmarks).

### Action Palette (new, the feature)

The catch-all UI surface. Lists Actions and Bound Actions with search, Raycast-style in-palette sub-picker drilling for arg-flow, and dialog escape for argument types that don't fit inline. Not a surface for developer-facing functionality — Commands without Actions do not appear.

---

## What this unlocks (worked examples)

Real candidates from a brain-dump of things I'd want in the palette. Each is mapped to the model so the shape is concrete, not hand-wavy.

### Pure verbs, no args — straightforward

> Undo · Indent · Dedent · Next Tab · Previous Tab · Focus Column 1 · Report a Problem · View Keyboard Shortcuts · Login · Logout · Switch Accounts · About Paratext · Sync All Projects · Focus Next Result

Each is one Action declaring (localized title, keywords, when-clause) dispatching to one Command with no arg-flow. Cheap.

### Verbs that resolve args from context (no user prompt)

> Word of Jesus (apply `\wj`) · Comment · Reply to Comment · Resolve Comment · Ignore Misspelling · Suggest a Localization for Selected UI Text

Action declares arg-flow entries like `{selection: from-context}` or `{commentAtCursor: from-context}`. The palette doesn't prompt; the Command receives the resolved args at dispatch. If the required context isn't available (no selection, no comment at cursor), the when-clause hides the Action from the palette.

### Verbs with user-supplied args (in-palette drilling)

> Switch to Project… · Go to Scripture Location · Navigate to a Setting · Assign Chapter to Susan

Action declares arg-flow with sub-pickers. "Assign Chapter to Susan" is the interesting case: the user picks Book → Chapter → User in successive palette steps, and the Action dispatches `platform.assignChapter({book, chapter}, userRef)`. This is **arg-flow**, not composition — it resolves to a single Command call. Composition would be "assign + notify + log" as three Commands chained, which would belong in the Command layer (a `platform.assignChapterWithNotification` command) or in a Deep Link.

### Dynamic items from Action Providers

> "Recent: Genesis 1 — MyProject" · Recent Projects · Open Comments · Known Settings

These aren't separate Actions. They're **Bound Actions** yielded at query time by an Action Provider. The underlying Command is something like `platform.navigateToScriptureLocation(bcv, projectId)`; the provider supplies the args. The user sees a flat list including "Recent: Genesis 1 — MyProject" alongside regular Actions like "Go to Scripture Location…" — exactly Raycast's model.

### Composition that _isn't_ a composite command

> "Open project and show its resources"

Doesn't need a new Command. Express it as a Deep Link: `paratext://project/X/resources`, handled by one navigation Command. Keeps the Command surface small while supporting arbitrary "go to X" flows.

---

## Architectural posture

This is the shape of the proposal at the architectural level — the load-bearing rules:

1. **Commands stay pure.** No UI concerns. No confirmation prompts. No localized strings. Same machine contract regardless of whether the caller is a script, another extension, a keybinding, or a palette pick.
2. **Actions never hold logic.** They are declarative: presentation + arg-flow + dispatch. The palette walks an Action's arg-flow spec; it does not run arbitrary code between "user picked" and "Command runs."
3. **Every human invocation path goes through an Action.** Palette, menu, keybinding, toolbar button — all dispatch via Actions. This is how human-protection concerns (confirmation, localization, when-clauses) stay in one place. Scripts and extensions bypass Actions and call Commands directly.
4. **Confirmation is a human concern, owned by the Action.** A script calling `platform.deleteProject(id)` doesn't get a modal. A user picking "Delete Project" from the palette does. This is correct: humans and machines need different safety guarantees. Putting the confirmation in the Command would either block scripts or force every UI surface to re-implement it.
5. **Composition belongs in the Command layer or in Deep Links — never in Actions.** If "Sync All Projects" is a real operation other callers want, it's a Command. If "open project AND show resources" is just a navigation flow, it's a Deep Link. Actions that loop or orchestrate would grow into a parallel programming model. Don't.
6. **Keybindings target Actions, not Commands.** This is the call that makes (1)–(5) actually hold. If keybindings could target Commands directly, Commands would have to grow back the human-protection concerns we just moved out. VS Code does it the other way and pays for it.

If you reject (6), we can still make most of this work, but Commands will need optional confirmation/localization metadata and the boundary between Command and Action gets fuzzy. I think (6) is the right call but it's the one I'm least certain about — would value your read.

---

## Alternatives considered

### A. Metadata on Commands only (no Action concept)

Keep "Command" as the only concept. Add user-facing fields (title, description, icon, when-clause) directly to Commands. Filter the palette by which Commands declare those fields. This is roughly VS Code's `contributes.commands` model.

**Why I'm not proposing this:**

- Doesn't accommodate dynamic palette items. "Recent: Genesis 1 — MyProject" isn't a registered Command; it's `platform.navigateToScriptureLocation` with pre-bound args produced at query time. Static metadata on Commands can't express that.
- Doesn't accommodate in-palette arg drilling cleanly. The palette would need to inspect Command parameter types and synthesize sub-pickers, which is fragile and ungeneralizable.
- Conflates the dev name (`platform.assignChapter`) with the UI label ("Assign Chapter…"). Forces you to pick one shape for both audiences.
- Confirmation/safety logic ends up in Commands, which scripts then have to bypass — exactly the muddling we want to avoid.

It's the lighter-weight option and it's not wrong; it's just under-powered for what we actually want the palette to do.

### B. Actions that hold logic (orchestration layer)

Make Actions a richer concept that can chain Commands, run conditionals, hold state.

**Why I'm not proposing this:** it grows a second programming model in parallel to Commands. Two ways to do the same thing → drift. Actions stay declarative; if you need orchestration, that orchestration is itself a Command worth naming, or it's a Deep Link.

### C. "Command Palette" as the name (industry standard)

VS Code, Linear, Notion, Figma, JetBrains, shadcn's `cmdk` component all use "Command Palette."

**Why I'm proposing "Action Palette" instead:** if we go with the Command/Action split, naming the surface "Command Palette" reintroduces the exact overload the split exists to eliminate. The items in it are Actions, not Commands. Extension docs would read "Declare an Action; it appears in the Command Palette" — a small but persistent paper cut for everyone working in the codebase. We pay a one-time 5-second adjustment for ex-VS-Code users in exchange for vocabulary that stays coherent forever. Documented in [ADR-0001](../adr/0001-action-palette-naming.md).

I genuinely don't feel strongly about this name and would defer to your call. If you want "Command Palette" because of brand recognition or muscle memory, we can split — Command Palette as the _surface name_, Actions as the _items_. The internal coherence cost is real but absorbable.

### D. Use the existing overlay's `CommandPaletteItem` as-is for everything

Today's `CommandPaletteItem` is already a generic searchable item (the comment says items can be "marker code like 'ft' or command name"). We could just lean on it.

**Why this doesn't go far enough:** it's a renderable item, not a domain concept. It has no notion of dispatch target, arg-flow, when-clause, or localized identity. It's a UI primitive that lives at the wrong layer. The Action sits above it and projects onto it for rendering.

---

## What's in this branch (illustrative)

The `refactor/action-palette` branch currently contains:

1. **`CONTEXT.md`** — glossary entry for the new vocabulary. Designed as a stable reference for anyone working in the codebase.
2. **`docs/adr/0001-action-palette-naming.md`** — the naming decision and considered alternatives.
3. **A working rename of the existing overlay-command-palette code** — `ActionPaletteItem`, `ActionPaletteRequest`, `showActionPalette`, internal symbol renames, file renames via `git mv` (history preserved), data-attribute renames, LocalizeKey renames, plus localization JSON updates for English and Spanish.
4. **Backward compatibility**: `CommandPaletteItem`, `CommandPaletteRequest`, and `showCommandPalette` remain as `@deprecated` aliases so out-of-repo extensions don't break.
5. **`papi.d.ts` regenerated** with both new and deprecated names.
6. **167 overlay tests pass; ESLint clean.**

**Please treat the code changes as a sketch.** They demonstrate that the rename is mechanical and low-risk, but the _real_ proposal is the mental model, not these specific edits. If you'd rather:

- Defer the rename until the broader Action feature is approved
- Keep "Command Palette" as the name and just add the Action concept beneath it
- Land the docs only and drop the code changes
- Take a different shape entirely

…any of those is fine. I'd much rather we make the call together than have me presume.

---

## Open questions for you

1. **Do you buy the Command vs. Action split?** Or do you prefer Alternative A (metadata on Commands, no second concept)?
2. **Do keybindings target Actions or Commands?** I'm proposing Actions. If you say Commands, the model still mostly works but the layering gets fuzzier.
3. **Naming**: Action Palette vs. Command Palette. I have an opinion but will follow your call.
4. **Scope of first delivery.** Reasonable phasing: (a) docs + glossary only, (b) docs + Action declaration API, no UI yet, (c) docs + minimal palette UI dispatching to existing Commands without arg-flow, (d) full feature including Action Providers and arg-flow drilling. I'd suggest (b) → (c) → (d) as separate milestones; (a) alone is also defensible if you want to think more.
5. **Where Actions live in the codebase.** Likely a sibling of `command.service.ts` (e.g., `src/shared/services/action.service.ts`) with its own registration API, typed via `papi-shared-types` augmentation just like Commands. Open to your preference.
6. **How extensions declare Actions.** Programmatic (`papi.actions.registerAction(...)`) or manifest-declared (JSON in the extension), or both? VS Code does both. Has implications for static discoverability and packaging.

---

## The ask

If you're broadly bought in, I'd like permission to:

1. Land the docs (CONTEXT.md, ADR) on `main` either as-is or in whatever shape you prefer.
2. Open a follow-up design issue for the Action service API and palette UI, with you as the architect of record.
3. Either land the illustrative rename or revert it, your call.

Happy to walk through any of this in person/over a call. The branch is here so you can poke at the rename and see the shape of it in real code.

Thanks for considering it.
