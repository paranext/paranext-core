# Paratext 10 App Shell (reference build)

`app-shell-storybook.html` is a single-file Storybook build of the Paratext 10 window, titled "Unified Selection Stories". It is the reference for how Paratext 10 looks around a feature. The `paratext-bet-pitch-prototype` skill uses it to build each bet's clickable prototype inside the real shell.

- **Source:** the published claude.ai artifact "App Shell", saved on 2026-11-25 (the artifact link is in the skill's instructions).
- **Story sources:** the stories it was built from (`src/stories/platform/current-app-shell.tsx`, `src/stories/design-ideas/*`) are not on `main`. This file is a snapshot. Rebuild it when those stories change.
- **Fonts:** the Storybook UI font (Nunito Sans) is linked by a relative path that isn't included, so the story picker falls back to a system font. The shell itself is unaffected.

## How to open it

Download `app-shell-storybook.html` and open it in a browser. The picker at the bottom right switches the theme (Platform or Paratext, light or dark) and the story. The stories include Default, Simple, Power, First start, Save and sync, Sync statuses and the project pickers.

## What the shell contains (captured 2026-11-26)

**Title bar:** logo, **Paratext** and **Help** menus, the project picker (Simple), Home (Power), back and forward, the reference box, Sync (Simple), the user menu.

**Simple mode (Default story):** three columns.
- **Model text** on the left.
- **The project editor** in the middle. Its toolbar has the ≡ tab menu, Undo, Redo, the paragraph style, the team layout, structure protection and View.
- **Tools and resources** on the right, as icon tabs: Bible texts, Text Collection, Commentaries, Dictionary, Find, Comments.

**Power mode (Power story):** a dock layout.
- Tab groups with "+", for example Home, a project tab "HNF (Editable)" and "TPTS (Editable)".
- A "Bible texts" pane with a resource picker.
- A pane with Comments and Find tabs.

**Menus** (in prototypes, show the Paratext menu first; call the editor's menu the "≡ tab menu"):

| Menu | Simple | Power |
|---|---|---|
| Paratext | Import from Paratext 9… · Settings · Exit | Get resources · Open (Ctrl+O) · Dictionary: SDBH/SDBG · Settings · New window · Exit |
| Help | Browse help · Community support · Show the tour · About Platform.Bible | same |
| ≡ tab menu | **Project:** Project settings (Ctrl+J) · **Edit** › · **Insert:** Insert comment (Ctrl+Shift+N), Insert footnote (Ctrl+T), Insert cross-reference (Ctrl+Shift+T), Insert endnote · **Tools and resources:** Bible texts, Commentaries, Text collection, Dictionary, Find (Ctrl+F), Comments | **Project:** Manage books, Project settings (Ctrl+J) · **Edit** › · **View:** Switch Scripture view, Zoom in, Zoom out, Zoom 100%, Show footnotes (F7), Change footnote pane location · **Insert:** (as Simple) · **Tools:** Comments |
| View (Simple toolbar) | Zoom in · Zoom out · Zoom 100% · Show footnotes (F7) · Change footnote pane location | in the ≡ tab menu |

**Theme tokens:** the shell uses the slate tokens in `lib/platform-bible-react/src/index.css` (background, foreground, primary, muted, border; radius 0.625rem).
