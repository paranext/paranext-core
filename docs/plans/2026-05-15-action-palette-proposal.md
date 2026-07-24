# Action Palette — A Proposal

**To:** TJ
**Date:** 2026-05-15
**Status:** RFC — looking for your read and pushback, not a sign-off

---

## TL;DR

Proposing a feature: the **Action Palette** — a catch-all, searchable launcher (think VS Code's Command Palette, but tighter and Raycast-ish) where users can find and trigger anything the app can do.

To make it work cleanly, also proposing a vocabulary shift that gives us a sharper mental model:

- **Command** = the existing PAPI RPC. The machine-layer contract. Unchanged.
- **Action** = a new concept. The user-facing wrapper around a Command. Owns the localized label, the description, the argument-collection flow, and the confirmation UX.

The Action Palette displays Actions. Menus, keybindings, and toolbar buttons also dispatch through Actions. Scripts and other extensions keep calling Commands directly. This separation is the load-bearing idea in the proposal.

**This branch is docs-only.** While preparing this proposal I started renaming the existing `overlay-command-palette` code to `ActionPalette` to make the proposal concrete — and discovered something that strengthens the case for the proposal itself. See [The existing "command palette" code isn't an Action Palette](#the-existing-command-palette-code-isnt-an-action-palette) below. The exploratory rename (retargeted at a generic name) lives on a separate draft PR — see this PR's description for the link.

---

## Why this matters

Three structural value propositions:

**1. Team velocity and decoupling.** Today every new user-facing feature has to negotiate its own home — a menu item, a button placement, a keybinding, a context-menu entry — and someone has to decide that _before_ we've watched anyone try to use the thing. UX gets pulled in to make placement calls on functionality that doesn't exist yet; devs get blocked waiting on those calls. The Action Palette flips that. New functionality lands in the palette first as the always-available default; bespoke UI placement is earned later, once we've watched users reach for it. Devs ship behind a palette entry without waiting on UX; UX validates and prioritizes placement with real usage data instead of guesses.

**2. Triggers decoupled from functionality.** If P10 Power and P10 Simple need to expose the same underlying operation differently — different labels, different keybindings, different confirmation copy, different surfacing — the Action layer is the joint that makes that possible. Same Command, multiple Action declarations, no duplication of the underlying behavior. We build the functionality once and dress it for each audience separately. This generalizes to anything else we might ship on top of the platform: training modes, accessibility shells, partner-branded variants. Without an Action layer, this kind of differentiation forces either duplicated Command implementations or a pile of conditionals inside each Command.

**3. A unified discovery surface for users.** Bible translators are knowledge workers. A searchable launcher meets them halfway between menu-hunting and shortcut memorization. Power users get keyboard speed; new and occasional users get a "what can this thing do?" surface. Every other tool serious knowledge workers use has one (VS Code, Linear, Notion, Raycast, Slack; Figma's variant is the [Actions Menu](https://help.figma.com/hc/en-us/articles/23570416033943-Use-the-actions-menu-in-Figma-Design)). We don't. We should.

The user benefit (3) is the most visible. The team-velocity argument (1) is what makes this worth doing soon rather than later — the longer we live with feature-by-feature placement negotiations, the more time we burn that we could be spending on actual problems.

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

If you reject (6), we can still make most of this work, but Commands will need optional confirmation/localization metadata and the boundary between Command and Action gets fuzzy. (6) is the right call but it's the one I'm least certain about — would value your read.

---

## Why two concepts instead of one?

This is the move you're most likely to push back on, so it gets its own section.

The lighter-weight option: **keep one concept (Command), add UI-facing metadata to it (title, description, icon, when-clause), filter the palette by which Commands declare that metadata.** Roughly VS Code's `contributes.commands` model. Simpler. Why two concepts instead?

The case against the one-concept version:

**1. Internal Commands that aren't user-facing.** `platform.restartExtensionHost`, `platform.isSendReceiveAvailable` (a predicate, not a verb), `helloRock3.deleteHelloRock3ProjectByWebViewId` (plumbing keyed by opaque IDs). Either these grow user-facing metadata fields (wrong — they aren't user-facing), or we add an `isUserFacing: true` flag to filter the palette. If we're adding the flag, we already have two implicit concepts — user-facing Commands vs. not — and we're just refusing to name the distinction. Naming it (as Action) makes the split explicit and lets the type system carry it.

**2. Dynamic palette items don't fit static metadata.** "Recent: Genesis 1 — MyProject" isn't a registered Command. Each entry is `platform.navigateToScriptureLocation` with provider-supplied args, produced at query time from a recents list. Static metadata on a Command can't express "one Command, many palette entries, args provided dynamically." You need a separate concept (Bound Action / Action Provider) to express this — at which point the second concept is already there.

**3. Same Command, different exposure per product surface.** P10 Power and P10 Simple may want to expose the same underlying operation with different labels, different keybindings, different confirmation copy, different surfacing. If labels live on the Command, you can't have two of them. Two concepts let one Command have many Action wrappers — one per audience. The same generalizes to future variants (training mode, accessibility shell, partner builds).

**4. Localized titles vs. precise dev names.** The Command name is `platform.assignChapter`. The UI label is "Assign Chapter…" in English, "Asignar capítulo…" in Spanish, with search keywords like "delegate". One-concept means all of that hangs off the Command — which works if there's exactly one canonical UI label, but breaks the moment audience-specific differences appear (see #3).

**5. Confirmation belongs in the human layer, not the machine contract.** A user picking "Delete Project" from the palette needs a modal. A script calling `platform.deleteProject(id)` doesn't. If confirmation lives on the Command, scripts have to bypass it or pass a `skipConfirm` flag everywhere. If confirmation lives on the Action, Commands stay pure and human-protection happens uniformly across every UI surface.

**6. Arg-flow declarations don't fit Command signatures.** "How to collect args from sub-pickers, context, providers" is a real declarative shape with validation, defaults, and skip conditions. Attaching it to the Command ties the Command signature to UI collection patterns — which is exactly the kind of coupling Commands shouldn't have if they're going to remain callable from scripts and other Commands.

Put together: the one-concept version solves each of these by adding optional metadata to Commands, until Commands have grown a bunch of UI fields that internal Commands don't use, plus a flag distinguishing user-facing ones, plus an inline arg-flow spec, plus a confirm hook. At that point the second concept is already present, just unnamed. Two concepts make it explicit, keep Commands pure, and give us natural seams for multi-audience exposure.

### The cost

This proposal is large. Seven concepts where today we have roughly one (Command) plus a generic picker overlay: Command, Action, Action Provider, Bound Action, Arg-flow, Deep Link, Action Palette. A reasonable read is "this is over-engineered; can we do less?"

- Most extension authors will only ever touch Command + Action. Providers, Bound Actions, and arg-flow are advanced features that appear when there's a real need (recents, multi-step arg collection). Deep Links are optional. Simple case stays simple — one Command, one Action declaring a title and a dispatch target, done.
- The phasing options in Open Questions let us land this incrementally. Command + Action + a minimal palette first; grow Providers and arg-flow when concrete use cases force it.
- The alternative isn't "no concepts" — it's "the same concepts smuggled into Commands as optional metadata." The complexity exists either way; the question is whether it's named or implicit.

If your read is "start with metadata-on-Commands and grow into the layered shape later," push back below and tell me why. My counter is that the trigger-decoupling case (P10 Power vs. P10 Simple) and the dynamic-palette case (recents) come up soon enough that we'd be refactoring into this shape within a year. "Later" is the right call if there's other architectural work that needs to settle first — say so if there is.

---

## Alternatives considered

The big one — keeping Commands as the single concept — is its own section above. Other alternatives we considered and didn't pursue:

### B. Actions that hold logic (orchestration layer)

Make Actions a richer concept that can chain Commands, run conditionals, hold state.

**Why I'm not proposing this:** it grows a second programming model in parallel to Commands. Two ways to do the same thing → drift. Actions stay declarative; if you need orchestration, that orchestration is itself a Command worth naming, or it's a Deep Link.

### C. "Command Palette" as the name (industry standard)

VS Code, Linear, Notion, JetBrains, and shadcn's `cmdk` component all use "Command Palette." Figma calls theirs the [Actions Menu](https://help.figma.com/hc/en-us/articles/23570416033943-Use-the-actions-menu-in-Figma-Design) — different, and useful precedent for the direction we're proposing.

**Why I'm proposing "Action Palette" instead:** if we go with the Command/Action split, naming the surface "Command Palette" reintroduces the exact overload the split exists to eliminate. The items in it are Actions, not Commands. Extension docs would read "Declare an Action; it appears in the Command Palette" — a small but persistent paper cut for everyone working in the codebase. We pay a one-time 5-second adjustment for ex-VS-Code users in exchange for vocabulary that stays coherent forever. Documented in [ADR-0001](../adr/0001-action-palette-naming.md).

### D. Use the existing overlay's `CommandPaletteItem` as-is for everything

Today's `CommandPaletteItem` is already a generic searchable item (the comment says items can be "marker code like 'ft' or command name"). We could just lean on it.

**Why this doesn't go far enough:** it's a renderable item, not a domain concept. It has no notion of dispatch target, arg-flow, when-clause, or localized identity. It's a UI primitive that lives at the wrong layer. The Action sits above it and projects onto it for rendering.

---

## The existing "command palette" code isn't an Action Palette

While preparing this proposal I went to rename `overlay-command-palette` to `overlay-action-palette` — and stopped when I looked at what it's actually doing. The findings are concrete evidence for the proposal itself, so I'm including them here.

**The only production caller is `hello-rock3.web-view.tsx`, and it uses the overlay to pick USFM markers**, not to invoke actions:

```ts
papi.overlays.showCommandPalette({
  items: [
    { id: 'p', label: 'Paragraph (p)', description: 'Normal paragraph', group: 'Paragraphs' },
    { id: 'q1', label: 'Poetry Line 1 (q1)', description: 'First level poetry', group: 'Poetry' },
    { id: 'ft', label: 'Footnote (ft)', description: 'Footnote text', group: 'Notes' },
    { id: 'pro', label: 'Pronoun (pro)', badge: 'Deprecated', disabled: true },
    /* ... */
  ],
});
```

Those are **data records** (marker codes) — not user-invocable verbs. The user selects a marker; the caller gets back `'ft'` and inserts that marker into the editor. That's a generic searchable picker pattern — VS Code calls this `QuickPick`. It is _not_ the global, app-wide Action Palette this proposal is asking for.

Even the original `CommandPaletteItem` type doc hints at the dual use:

```ts
/** Primary display text (e.g., marker code like "ft" or command name) */
label: string | LocalizeKey;
```

The overload — "this generic picker is sometimes for markers, sometimes for commands" — was baked in from day one. Renaming the surface from "Command Palette" to "Action Palette" would just swap one wrong name for another.

**What that means for the proposal:**

- The existing overlay is a per-WebView **generic picker primitive**. It deserves a better name (`QuickPick`, `Picker`, etc.) — separate from this proposal. I've put that rename on a companion draft PR (linked in this PR's description) for you to weigh in on independently.
- The **Action Palette** I'm asking for is a different thing entirely: an **app-global, top-level** surface that lists Actions across the whole product. It would likely be built _on top of_ the same primitive, but it isn't a rename of it.
- The fact that the original author had to thread "marker code or command name" through a type called `CommandPaletteItem` is a real-world example of the term overload this proposal exists to eliminate.

So this branch is intentionally **docs-only**:

1. **`CONTEXT.md`** — glossary entry for Command, Action, Action Provider, Bound Action, Arg-flow, Deep Link, Action Palette. Designed as a stable reference if the proposal is accepted.
2. **`docs/adr/0001-action-palette-naming.md`** — naming decision and considered alternatives.
3. **This proposal.**

No code is touched. The exploratory rename — retargeted at a generic name — is on a separate draft PR so you can evaluate the two decisions independently.

---

## Open questions for you

1. **Do you buy the Command vs. Action split?** Or do you prefer Alternative A (metadata on Commands, no second concept)?
2. **Do keybindings target Actions or Commands?** I'm proposing Actions. If you say Commands, the model still mostly works but the layering gets fuzzier.
3. **Naming**: Action Palette vs. Command Palette. Or something else.
4. **Scope of first delivery.** Phasing options: (a) docs + glossary only, (b) docs + Action declaration API, no UI yet, (c) docs + minimal palette UI dispatching to existing Commands without arg-flow, (d) full feature including Action Providers and arg-flow drilling. Suggested: (b) → (c) → (d) as separate milestones. (a) alone works if you want to defer the rest.
5. **Where Actions live in the codebase.** Likely a sibling of `command.service.ts` (e.g., `src/shared/services/action.service.ts`) with its own registration API, typed via `papi-shared-types` augmentation just like Commands. Open to your preference.
6. **How extensions declare Actions.** Programmatic (`papi.actions.registerAction(...)`) or manifest-declared (JSON in the extension), or both? VS Code does both. Has implications for static discoverability and packaging.

---

## The ask

I'm not asking you to approve this for shipping. I'm asking you to engage with it: poke at the model, find the parts you don't like, push back on the layering, raise the concerns I haven't anticipated. **Grill me.**

Specifically, I'd like your read on:

1. **Direction.** Is the Command/Action split a shape you'd want this platform to grow into? Or do you instinctively want to keep it one concept and let it grow as needed?
2. **What's broken about this.** What am I missing? What falls over at scale? What's wrong about the layering? Where does the model fail on a case I haven't thought of?
3. **Refactor appetite.** If this is roughly the right direction, is it something you'd be open to making space for — yours or someone you'd point at it? A small concept change still costs real refactor work, and I'd rather know your gut on that early than spend cycles pursuing something the platform isn't going to absorb.
4. **Timing.** My instinct is sooner-rather-than-later. The longer we live with the current Command overload and the case-by-case "where does this button go?" pattern, the more we'll have to unwind. But you have a much better view of the platform roadmap than I do; if there's other architectural work that should land first, I want to plan around that rather than push against it.

If your read is "right direction, wrong layering," tell me. If your read is "wrong direction entirely, keep Commands as one concept and add metadata," tell me why — there's likely something you're seeing that I'm not.

Happy to walk through any of this in person or on a call. The doc is here to be reacted to.

Thanks.
