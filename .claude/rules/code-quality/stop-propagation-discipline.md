## Stop Propagation Discipline

`event.stopPropagation()` (and its heavier siblings `stopImmediatePropagation()`
and `nativeEvent.stopImmediatePropagation()`) silently prevent an event from
reaching ancestor handlers. That is a blunt, action-at-a-distance instrument: it
can break click, keyboard, focus, and dismiss behavior on components the author
never looked at — a parent row's selection, a dialog's Escape-to-close, a
global hotkey, a menu's outside-click detection. Reach for it only when a
narrower technique cannot express the intent.

### Prefer the narrowest technique that works (in order)

1. **Do nothing to the event.** If the ancestor handler firing too is actually
   fine (or desirable), let the event bubble. See the deliberate
   `// NO stopPropagation` decisions in `encyclopedia-display-item` /
   `dictionary-display-item` — sometimes two handlers *should* both run.
2. **`preventDefault()`** when the goal is to suppress the browser's default
   action (typing a character, submitting a form, scrolling, navigating a link)
   — not to hide the event from ancestors. `preventDefault` and
   `stopPropagation` solve different problems; do not use one as a proxy for the
   other.
3. **Target/scope checks in the ancestor.** When a container handler should
   ignore events that originate from an interactive child, gate it in the
   container (`if (event.target.closest('button, [role="button"], input'))
   return;` or a `data-*` attribute) instead of having every child defensively
   stop propagation. One check in the parent beats N stops in the children and
   does not swallow unrelated events.
4. **Handle the event where it belongs / early-return.** Often the parent
   handler is over-broad; tightening *it* is better than muzzling children.
5. **`stopPropagation()`** only when the options above genuinely cannot express
   the intent — most legitimately when integrating with a third-party widget
   (cmdk, Radix, Lexical) whose event handling you cannot otherwise opt out of.

### When `stopPropagation` IS justified

- **Scoped keyboard handling for a composite/third-party widget** where you
  stop **only the specific keys you actually consume** (and pair with
  `preventDefault` where a default action must also be suppressed). Example: a
  cmdk-based picker stopping Enter/Arrow/Home/End so cmdk's parallel handler
  does not also fire.
- **A self-contained modal/popover boundary** where, by design, no key or click
  inside should reach an outer menu — applied once at the container root, with a
  comment saying so.
- **Integrating with a library that itself stops propagation** — e.g. Lexical
  calls `stopPropagation()` on keydown before React sees it, so a
  **capture-phase** handler (`onKeyDownCapture` / `addEventListener(…, true)`)
  is the correct tool. Capture-phase interception is a legitimate, documented
  pattern, not a smell.

### When it is NOT okay

- **A blanket `onClick` / `onMouseDown` stop with no key/target condition**,
  used only to keep a parent row/card/cell from reacting. Fix the ancestor with
  a target check instead (technique 3). This is the most common offense.
- **Stopping propagation as a substitute for `preventDefault`** (or vice-versa).
- **Guarding different event phases inconsistently** — e.g. stopping
  `onMouseDown` on one element and `onClick` on a sibling for the same logical
  interaction. Pick one phase and be consistent.
- **`stopImmediatePropagation()` when plain `stopPropagation()` would do.**
  `stopImmediatePropagation` additionally kills *other listeners on the same
  element*, which can silently disable a sibling handler. Use it only when you
  have verified a same-element listener must also be blocked, and say why.
- **Any stop with no explanation.** If a future reader cannot tell what would
  break by removing the line, it is not okay yet.

### Mandatory: comment every stop

Every `stopPropagation` / `stopImmediatePropagation` call **must** have an
adjacent comment stating **what** would otherwise fire and **why** that is
wrong here (which ancestor handler / library, which keys). A bare stop is
treated as a defect in review because it cannot be safely maintained or removed.

For calls inside `lib/platform-bible-react/src/components/shadcn-ui/`, this
comment must additionally follow the `// CUSTOM:` annotation convention (see
`shadcn-discipline.md`).

### Reviewer checklist

- Is a narrower technique (1–4 above) sufficient? If yes, prefer it.
- Is the stop **scoped** (specific keys/conditions) or a blanket catch-all?
- Is it paired correctly with `preventDefault` (or wrongly used instead of it)?
- If `stopImmediatePropagation`, is the same-element-listener case real?
- Is there a comment naming what would break without it?
