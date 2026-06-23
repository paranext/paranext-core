---
status: proposed
---

# Required checks block within their stage (a deliberate PT10 divergence from PT9)

PT9's engine advances a chapter's plan on **manual task completion only**. Required and optional checks are surfaced — including "regressed checks" that re-acquire issues after a stage completed — but they **never block** stage advancement, and check results live in a separate checking subsystem keyed by a content hash (MD5), not in `ProjectProgress.xml`.

For the next-step prototype we adopt a **hybrid**: the persisted progress data stays faithful to PT9 — a chapter's current stage is *derived* from task completion, and check results stay content-addressed and out of the progress record, so `ProjectProgress.xml` round-trips — but the *design* makes a **required** check (`requiredInStage`) block a chapter from leaving the stage that requires it until the check passes. Checks ratchet **forward**: once a chapter advances past a stage, a later regression of that stage's check is advisory (surfaced, not demoting) unless a subsequent stage also requires the check, where it gates again. Notify-only checks never block.

**Why:** PT9's *non-use* of progress tracking is the very problem this work targets, so "should an unresolved required check make a chapter feel not-done?" is a hypothesis worth testing with designees rather than inheriting PT9's non-blocking behavior. This is held with an open hand and is the reason for the record: a reader who knows PT9 would expect non-blocking checks, so this notes that the divergence is **deliberate and provisional** — to be validated by the focus groups, not "fixed" as a bug.
