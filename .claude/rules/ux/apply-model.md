## Applying Changes — UX apply-model (wiring)

This is a thin pointer, not the rule itself. When building or reviewing any UI that
persists a change (settings, selections, edits), the **Applying Changes** guideline is
the source of truth for the apply-model, error handling, feedback, and button microcopy:

`lib/platform-bible-react/src/stories/guidelines/applying-changes.mdx`
(Storybook: `Guidelines/Applying Changes`). **Read it before designing the interaction** —
it has the full typology, the exceptions, and the "avoid" / "under consideration" cases
this summary omits. Do not treat the bullets below as the whole rule.

Load-bearing defaults (orientation only — the article governs):

- **Default to immediate apply.** Reserve explicit apply (stage-then-commit) for changes that only make sense committed as a group or need a contained preview.
- **Never interleave immediate- and explicit-apply controls as siblings** — isolate explicit apply in its own container with its own Apply button.
- **Reversible immediate-apply changes still need undo.** App-wide undo does not exist yet (known gap) — provide feature-local undo until it does; don't ship with no recovery.
- **Avoid a bare `OK`/`Cancel` label** — name the outcome (`Save changes` / `Discard changes`).

Anything past these defaults (auto-save drafts, optimistic/pessimistic updates, dirty-state
signaling, staged changes) is nuanced — consult the article, and get UX approval before
inventing a new apply mechanism.
