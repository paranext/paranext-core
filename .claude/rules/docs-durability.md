---
paths:
  - ".context/**"
  - ".claude/**"
---

# Documentation durability

Conventions for writing `.context/` and `.claude/` content that stays true as the code moves
(introduced 2026-08-03 after a staleness audit found ~1,000 already-drifted line citations and
dozens of expired status claims).

- **Cite code by file + symbol, not line number.** `WindowCollection.cs` `OpenQuickModeWindow`
  outlives any `WindowCollection.cs:1209`. Line numbers are acceptable only inside a frozen
  record.
- **Date every status claim.** Never bare present tense for external state — write "as of
  2026-08-03, PR #2626 is open" or "merged 2026-07-30 via #2590", so rot announces itself
  instead of silently lying.
- **Fence point-in-time documents.** Executed plans, investigation briefs, and approved designs
  get a `> **Frozen record** — …` blockquote at the top telling readers (and agents) to follow
  the current files, not the document. Fenced files are history, exempt from staleness fixes.
- **Verify claims before landing them.** A concrete path, symbol, script name, or behavior
  stated in a living doc must be checked against the live repo when written — or explicitly
  marked "aspirational, not yet in repo". Most staleness found by the audit was never true.
