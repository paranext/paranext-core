# Settings & State: A Shared Mental Model

> **Status:** Draft for discussion (dev + UX alignment). This is not a spec of
> guaranteed behavior — it describes how things work today and proposes shared
> vocabulary. Parts of the "scope interaction" section are open design
> questions, flagged inline.

## Why this document exists

UX and dev have been talking about "settings" without a shared definition of
what a setting *is*, where one lives, and how it relates to the other places we
stash state. This document puts the whole spectrum in one place so we can agree
on vocabulary and set expectations before designing features that touch it.

Two recurring UX questions motivated this:

1. **"Can something be editable in the Settings UI *and* somewhere else too?"**
   — Yes (see below).
2. **"What kinds of settings can exist, and how do user-level and project-level
   choices interact?"** — This is the part that is *not* yet formalized. See
   [Scope interaction](#scope-interaction-the-part-were-still-defining).

---

## Part 1 — The vocabulary

### Is it called a "setting"?

Mostly yes. The primary term in code is **setting**:

- Service: `ISettingsService` / `IProjectSettingsService`
- Hooks: `useSetting` / `useProjectSetting`
- Types: `SettingNames`, `SettingTypes`, `ProjectSettingNames`, `ProjectSettingTypes`
- UI: `setting.component.tsx`, `project-setting.component.tsx`

There is **one nuance**: when an extension *contributes* a setting (in
`manifest.json` → `contributions/settings.json`), each individual setting is
declared as a **property** of a settings **group**:

```jsonc
[{
  "label": "Hello Rock3 Settings",          // the group
  "properties": {
    "helloRock3.personName": {              // the setting, declared as a "property"
      "label": "...",
      "default": "Bill"
    }
  }
}]
```

So: the user-facing thing is a **setting**; the schema entry that defines it is
a **property** of a group. (This mirrors VS Code's `configuration.properties`.)
**Recommendation: say "setting" for the concept; reserve "property" for the
contribution schema.**

### A setting is not owned by the Settings UI

This is the most important thing for UX to internalize. A setting is just a
piece of **shared, persisted, reactive data** behind a service and a hook. The
Settings tab is *one consumer* of that data, not its owner.

That means **yes — the same setting can be edited in Settings AND in a
convenient inline place** (a toolbar, a panel header, a context menu). Both call
the same hook, edit the same value, and stay in sync live (settings are
reactive via subscribe / `onDidUpdate`). This is the intended design, not a
workaround.

```ts
// Inside any web view — identical value to what the Settings tab shows
const [name, setName] = useSetting('helloRock3.personName', 'Kathy');
```

---

## Part 2 — The storage spectrum

These are the distinct "places state lives," ordered from most
configuration-like (deliberate, persistent, user-meaningful) to most ephemeral
(per-view, transient UI memory).

| Layer | Code name / hook | Scope | Persisted where | Edited by user via |
|---|---|---|---|---|
| **User Setting** | `useSetting` | The whole app, per user | Backend file `settings.json` | Settings UI and/or inline controls |
| **Project Setting** | `useProjectSetting` | One project | Inside that project's Project Data Provider (PDP) | Settings UI (filtered to project) and/or inline |
| **Project Data** | `useProjectData` (PDP) | One project | PDP backend | The actual content/editing UI (not "settings") |
| **Web View State** | `useWebViewState` | One open panel instance | `localStorage` (`web-view-state`) | Implicitly, by interacting with that panel |
| **Workspace / Layout State** | dock layout | The whole workspace arrangement | `localStorage` (`dock-saved-layout`) | Dragging/arranging panels (power mode only) |
| **Scroll / Verse Reference** | `useWebViewScrollGroupScrRef` | Shared across linked panels | In-memory service + saved on the web view | Navigating Scripture; choosing a scroll group |

### How to tell them apart (the distinctions devs actually make)

- **User Setting vs Project Setting** — *same machinery*, different scope. User
  settings are global to the person; project settings travel with a specific
  project and can be filtered to only apply to certain project types (via
  `includeProjectInterfaces`). A per-project preference is a project setting.
- **Setting vs Project Data** — A setting is *configuration about how something
  behaves*; data is *the content itself* (the Scripture text, notes, etc.).
  Both can live in a project's PDP, but a setting is small, typed, has a
  default, and is meant to be tweaked.
- **Setting vs Web View State** — Web View State is *one open panel's private
  memory* (a scroll position, a local toggle). It isn't surfaced in Settings,
  isn't shared, and is keyed to that panel instance. Two copies of the same view
  each have their own.
- **Setting vs Workspace State** — Layout (which panels are open and where) is
  workspace state in `localStorage`, *not* in the settings system. Users edit it
  by arranging panels, not in a dialog. (Note: only saved in "power" interface
  mode.)
- **Scroll/Verse reference** is its own shared, synchronized state across panels
  in the same scroll group — not a setting.

---

## Part 3 — Scope interaction *(the part we're still defining)*

> **This is the gap.** The codebase gives us *storage primitives* (user setting,
> project setting, web view state). It does **not** define a standard for *how a
> user-level choice and a project-level choice compose*. Today that's decided
> per-feature. UX is right to push for a shared model here.

The key realization: **the project↔user relationship is not always the same.**
Two of our current designs already behave differently:

### Pattern A — Additive / superset (project sets a floor)

> *Example: a project's resource list.*

The project provides a base list. In their UX, the user can **add** to it but
**cannot subtract** from it. The user always sees a **superset** of what the
project specifies. The project value is a **floor / minimum**; the user layer
can only union more onto it. This is **persistent** user intent.

```
effective = projectList ∪ userAdditions     (user cannot remove project items)
```

### Pattern B — Default + transient reduction (project sets a default, user can show less)

> *Example: text collections (designed, not yet built).*

The project determines what the user *initially* sees. But the user can show
**less** than that — e.g., there are five texts but the screen only has room for
three. This is **display state**, not a durable preference: it's closer to
**web view / workspace state** than to a setting. The project value is a
**default**, and the reduction is transient and per-view.

```
displayed = projectDefault − userHidesForThisView   (transient, per-view)
```

### Why this matters for classification

Pattern A and Pattern B look similar to UX ("project provides something, user
adjusts it") but map onto **different storage layers** in code:

- Pattern A = **project setting** + **user setting** that *compose additively*.
  Both are durable; the composition rule (union, user-can-only-add) is the
  feature's responsibility.
- Pattern B = **project setting / project data** (the source of truth) +
  **web view / workspace state** (the transient reduction). The "show less"
  choice probably should **not** be a setting at all.

### Open questions for the team

1. Do we want a **named, reusable set of interaction patterns** (e.g.
   "project-only," "user-only," "user-overrides," "additive/superset,"
   "default + transient reduction") that designs can reference by name?
2. When a user choice is a *reduction for display*, is that always **web view /
   workspace state**, never a setting? (Proposed: yes.)
3. For additive cases, do we need first-class support in the settings system for
   "this user setting composes onto that project setting," or does each feature
   keep implementing the union itself?
4. How does composition behave across **multiple machines / sync**? (User
   settings are per-user; do additive user choices follow the user everywhere?)

These are design decisions, not facts about the code. The point of writing them
down is so we choose deliberately instead of re-deciding ad hoc each feature.

---

## TL;DR

- The thing is a **setting**; "property" = its contribution-schema entry.
- A setting is shared reactive data — **editable in Settings AND inline**, in
  sync.
- There's a **spectrum**: user setting → project setting → project data → web
  view state → workspace state → scroll group. Each has a clear "what it's for."
- The **user↔project composition rules are NOT standardized** in code. Our own
  designs already use at least two different patterns (additive superset vs.
  transient reduction). Let's name and agree on these patterns.
