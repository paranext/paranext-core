# Gate Automatic Send/Receive on First-Run Consent

Simple mode auto-syncs projects, and the first-run wizard is an **overlay** — the dock layout, the
project picker, and the shutdown tasks all keep running behind it. So any automatic sync can fire
before the user has reached the wizard's sync-consent step and been asked, or right after they
declined.

## The rule

Every code path that starts a Send/Receive **without the user asking for it right then** must first
get `granted` from the one consent gate, and skip the sync on any other answer:

- **Main process** — `getAutomaticSyncConsent()` in `src/main/first-run-consent.util.ts`.
- **Extension host** — the `platform.getAutomaticSyncConsent` command, which calls that same
  function (a bundled extension cannot import from `src/main`). `syncOnProjectSwitch` in
  `platform-scripture-editor` is the reference caller. Do not re-derive the answer from
  `platform.firstRunComplete`: that misses the session deferral below.

Log the skip at `info` with the reason, so a support log can explain a session that did not sync.

**Fail closed.** An unreadable flag or a rejected consent request means *do not sync*: syncing
unasked cannot be undone, while a missed automatic sync is picked up at the next opportunity.

**"Don't sync yet" lasts the session.** Declining completes the wizard, but the gate answers
`deferred` until the app restarts.

**Simple mode only — establish it before asking.** `platform.firstRunComplete` is written solely by
the Simple-mode wizard, so in Power mode it stays `false` forever. Gating a Power-mode path on it
would permanently disable that path with no UI to recover — `startup-tasks.test.ts` carries a
regression test naming this trap. An interface mode that cannot be read must not become a way past
the gate: skip the sync, or treat the mode as Simple.

## What is NOT gated

User-initiated syncs — the wizard's own Sync button, the Send/Receive dialog, a toolbar action. The
click *is* the consent.

## Enforcement

There is no chokepoint: `commandService.sendCommand` is generic, and gating there would suppress the
user-initiated paths too. The gate is applied per trigger, so **a new automatic trigger that forgets
it reintroduces the bug silently**. Reviewers should treat any new `syncProjects` /
`sendReceiveProjects` call site as needing this gate or an explicit reason why not.

TODO(PT-4774): replace reviewer vigilance with a source-scan test that fails on an ungated
automatic sync call site, as `SendReceiveWriteLockCoverageTests` does for the C# write gate.

Rationale and rejected alternatives: `adr-first-run-sync-consent` in
[`Architecture-Decisions.md`](../../.context/standards/Architecture-Decisions.md).
