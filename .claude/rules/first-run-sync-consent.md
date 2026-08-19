# Gate Automatic Send/Receive on First-Run Consent

Simple mode auto-syncs projects, and the first-run wizard is an **overlay** — the dock layout, the
project picker, and the shutdown tasks all keep running behind it. So any automatic sync can fire
before the user has reached the wizard's sync-consent step and been asked.

## The rule

Every code path that starts a Send/Receive **without the user asking for it right then** must first
check that the wizard has been answered:

- **Main process** — `isFirstRunComplete()` in `src/main/first-run-consent.util.ts`.
- **Extension host** — read `platform.firstRunComplete` via `papi.settings.get` (a bundled extension
  cannot import from `src/main`; `syncOnProjectSwitch` in `platform-scripture-editor` is the
  reference copy).

**Fail closed.** An unreadable flag means *do not sync*: syncing unasked cannot be undone, while a
missed automatic sync is picked up at the next opportunity.

**Simple mode only.** `platform.firstRunComplete` is written solely by the Simple-mode wizard, so in
Power mode it stays `false` forever. Gating a Power-mode path on it would permanently disable that
path with no UI to recover — `startup-tasks.test.ts` carries a regression test naming this trap.

## What is NOT gated

User-initiated syncs — the wizard's own Sync button, the Send/Receive dialog, a toolbar action. The
click *is* the consent.

## Enforcement

There is no chokepoint: `commandService.sendCommand` is generic, and gating there would suppress the
user-initiated paths too. The gate is applied per trigger, so **a new automatic trigger that forgets
it reintroduces the bug silently**. Reviewers should treat any new `syncProjects` /
`sendReceiveProjects` call site as needing this gate or an explicit reason why not.

Rationale and rejected alternatives: the `first-run-sync-consent` ADR in `.context/standards/Architecture-Decisions.md`.
