## Applying Changes — Apply-Model Defaults

How changes take effect (settings, selections, edits). Full guidance + rationale + examples:
`lib/platform-bible-react/src/stories/guidelines/applying-changes.mdx` (`Guidelines/Applying Changes`).

When building or reviewing any UI that persists a change, apply these invariants:

- **Default to immediate apply.** The change takes effect the moment the user makes it. Do NOT reach for an OK/Cancel or Save step by default — Paratext 9's OK/Cancel-everywhere is the pattern we're moving away from.
- **Reserve explicit apply** (stage-then-commit) for changes that only make sense committed **as a group**, or that need a **contained preview**. Auto-save drafts (continuous, on blur/pause, with a "Saving…/Saved" indicator) are for freeform text (Lexical editor, comment/footnote fields).
- **HARD RULE — never interleave apply models as siblings.** Immediate-apply and explicit-apply controls must not sit side by side. Isolate explicit-apply controls in their own nested container with their own Apply button; everything else stays immediate.
- **Avoid the OK/Cancel label.** Use a specific action verb that names the outcome: `Save changes` / `Discard changes`, `Apply changes` / `Cancel`, `Delete project` / `Keep project`. A bare `✕` means Close (preserve), not Cancel (discard) — don't let it silently discard staged edits.
- **Friction before XOR recovery after.** Irreversible/consequential/expensive/risky → confirmation dialog before. Reversible → undo after. Don't stack both. A confirmation dialog on a routine action doesn't protect anyone (users click through it).
- **Feedback in inverse proportion to visibility.** Effect visible on screen → no toast. Off-screen/bulk + reversible → undo `Sonner`. Async → inline "Saving…/Saved". Failures → never silent. For visible reversible immediate-apply changes, rely on app-wide undo (`Ctrl+Z`), not an undo toast.

Do NOT invent new apply mechanisms (commit-on-close, ad-hoc staging, per-field dirty markers) without explicit UX approval — several are named as "avoid" or "under consideration" in the article.
