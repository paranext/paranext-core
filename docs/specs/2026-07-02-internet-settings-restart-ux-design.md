# Internet Settings — Immediate-Apply with Deferred Restart

**Date:** 2026-07-02
**Author:** alex_mercado@sil.org (AI-assisted)
**Area:** `paratext-registration` extension — Internet Settings dialog
**Status:** Proposal

## 1. Summary

Today the Internet Settings dialog bundles several settings behind a single
**"Save and restart"** button that always restarts the app. This violates
Platform.Bible's immediate-apply principle and forces a restart even when the
user only changed something that may not need one.

This plan proposes to:

1. **Apply each setting immediately** as the user changes it (no "Save" button
   gating the change).
2. **Tag which settings require a restart to take effect**, and when one of
   those changes, surface a non-blocking notice that a restart is pending.
3. **Let the user choose when to restart** — "Restart now" or "Restart later" —
   so they can batch several restart-requiring changes into a single restart
   instead of paying the cost per change.
4. **Keep reminding the user until they actually restart** — a dismissed prompt
   must not leave a novice user stranded with changes that never took effect.

## 2. Background — how it works today

The dialog is a web view, not a normal settings entry. The relevant code:

- **UI / restart flow:** `extensions/src/paratext-registration/src/internet-settings.web-view.tsx`
  - A single controlled form with one action: `saveAndRestart` (line ~103).
  - On click it saves the _entire_ `InternetSettings` object via
    `paratextRegistration.setParatextDataInternetSettings`, waits 5s
    (`INTERNET_SETTINGS_RESTART_DELAY_MS`), then calls `platform.restart`
    **unconditionally** (lines ~110–121). Nothing branches on _which_ field
    changed.
  - The button is enabled only when there are unsaved changes
    (`hasUnsavedChanges`, deep-equal against the loaded settings).
- **Presentational form:** `extensions/src/paratext-registration/src/internet-settings.component.tsx`
  - Fields: internet-use mode (`permittedInternetUse`: `Enabled` = "Allow
    unrestricted Internet use", `VpnRequired`, `Disabled`, `ProxyOnly`),
    conditional proxy settings, and server selection (`selectedServer`).
  - One "Save and restart" button (line ~266).
- **Backend setter:** `c-sharp/Users/ParatextRegistrationService.cs`
  → `SetParatextDataInternetSettings` (line ~261). It **mutates ParatextData's
  `InternetAccess` static state in place** (`RawStatus`, `SelectedServers`,
  `SetProxy(...)`, DBL overrides). There is no "requires restart" concept in the
  backend — the values are live in the static class the moment the setter
  returns.

**Key architectural fact:** the forced restart lives entirely in the
TypeScript web view. The backend already behaves as immediate-apply. So this is
primarily a frontend change.

## 3. Problem statement

- **Violates immediate-apply.** Everywhere else in Platform.Bible, changing a
  setting applies it. Here the user edits a form and must press a dedicated
  button, which is inconsistent and adds a "did my change save?" question.
- **Over-restarts.** The single button always restarts, even if the changed
  field doesn't strictly require it, and even if the user intends to make more
  changes.
- **Couples unrelated concerns.** Internet-use permission, proxy config, and
  server selection are edited and committed together, so the user can't reason
  about them independently.
- **Restart is expensive**, which is _why_ bundling is tempting — but bundling
  behind a mandatory button is the wrong lever. The user should decide when to
  pay the restart cost, and be able to batch changes into one restart.

## 4. Design principle

**Immediate apply, deferred restart.** Changing a setting takes effect as far as
possible right away. When a change needs a restart to _fully_ take effect, we
don't block it — we persist it and tell the user a restart is pending, letting
them restart now or keep working and restart later.

This preserves the one legitimate benefit of the old design (batch several
restart-requiring changes into a single restart) while removing its costs
(mandatory button, forced immediate restart, coupling).

## 5. Proposed design

### 5.1 Apply on change

Each control writes its value to the backend as soon as it changes (debounced
for text inputs like proxy host/port/credentials). Remove the "Save and restart"
button as the gate for _saving_. The backend setter is already immediate, so no
backend change is required for the apply step.

### 5.2 Classify each setting: restart-required or not

Every setting in the dialog is tagged as either:

- **Live** — takes effect immediately, no restart needed.
- **Restart-required** — persisted immediately but only fully in effect after a
  restart.

The classification must be verified against actual ParatextData behavior (see
[§8 Open questions](#8-open-questions-must-verify-before-build)). Current best
understanding:

| Setting                                    | Likely classification         | Rationale                                                                                                                                       |
| ------------------------------------------ | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Internet-use mode (`permittedInternetUse`) | **Live (needs verification)** | The one in-repo consumer reads `InternetAccess.Status` at call time (`PlatformScrTextCollection.cs:47`), suggesting the gate is evaluated live. |
| Server selection (`selectedServer`)        | **Restart-required (likely)** | Established registry/send-receive/DBL clients may cache the endpoint at init.                                                                   |
| Proxy settings                             | **Restart-required (likely)** | Already-constructed HTTP clients / connections may hold the old proxy config.                                                                   |

The point of the design is that the _mechanism_ is per-setting, so we can adjust
the table as verification comes in without reworking the UX.

### 5.3 Pending-restart indicator

When the user changes a restart-required setting, show a **persistent,
non-blocking banner** in the dialog that reads roughly: _"Some changes require a
restart to take effect."_ The banner offers two actions:

- **Restart now** — calls `platform.restart` (optionally after the existing
  short delay so the user sees the confirmation).
- **Restart later** — dismisses the prompt _for now_; the pending-restart state
  itself is **not** cleared (see §5.5).

If the user only changes **live** settings, no banner appears at all — the
change simply takes effect. This is the common case for toggling internet-use.

### 5.4 Restart-now / restart-later choice

This replaces the mandatory "Save and restart" button. It is not a blocking
"are you sure?" modal — it's an offer surfaced only when a restart is actually
pending. Framing:

- Title: _"Restart required"_ (or _"Restart to finish applying changes"_).
- Body: names what changed and that it will apply on next restart.
- Buttons: **Restart now** (primary) / **Restart later** (secondary).

Because settings are already applied and persisted, "Restart later" is safe —
the values survive to the next launch regardless.

### 5.5 Don't strand the user after "Restart later"

**Problem:** a novice user clicks "Restart later" (or closes the dialog),
forgets, and is left with changes that silently never take effect — with no
obvious way to recover. The pending state must remain visible and actionable
until an actual restart happens.

**Recommended primary mechanism — persistent reminder banner.** A dismissal of
the restart _dialog_ must not clear the pending-restart _state_. As long as any
applied-but-not-yet-effective change exists, keep a lightweight reminder banner
visible with a **Restart now** action. It should:

- Persist across dialog close/reopen and across app surfaces (not only inside
  the Internet Settings web view), since the user will typically navigate away.
- Clear only when the app actually restarts (i.e. when effective state catches
  up to applied state).
- Be quiet but non-disappearing — an ambient bar/indicator, not a repeated
  interrupting modal.

**Required coverage — the empty (no-project) state.** When there is no open
project, the normal app chrome that would host a reminder banner may not be
present, so the pending-restart prompt **must also be surfaced in the
empty-state UI**. This is exactly the situation a novice hits first (fresh
install, configuring internet settings before opening anything), so it's the
highest-risk place to strand them. The empty-state view should render the same
"Restart to apply your changes" prompt with a **Restart now** action whenever a
restart is pending.

These two are complementary, not alternatives: the persistent banner is the
general mechanism; surfacing it in the empty state is a specific placement that
mechanism must guarantee.

## 6. Interaction flow

```
User opens Internet Settings
        │
        ▼
Changes a field ──► value persisted immediately (backend setter)
        │
        ├─ field is "live"           ──► done. No prompt.
        │
        └─ field is "restart-required" ──► pending-restart prompt appears
                                              │
                          ┌───────────────────┴───────────────────┐
                          ▼                                        ▼
                   [Restart now]                            [Restart later]
                          │                                        │
                   platform.restart                     pending state REMAINS:
                                                        persistent reminder banner
                                                        (incl. empty-state UI)
                                                        until an actual restart.
                                                        Further changes fold in.
```

## 7. Edge cases & details

- **Batching:** multiple restart-required changes collapse into one pending
  state and one restart. This is the explicit win over today's per-commit
  restart.
- **Pending state persistence:** if the dialog is closed while a restart is
  pending, the reminder survives (app-level + empty-state indicator). Restore
  the prompt by comparing applied-vs-effective state on load.
- **Proxy validation:** proxy host is required when mode is `ProxyOnly`
  (existing `isProxyHostValid` logic). With immediate apply, don't persist an
  invalid/incomplete proxy config — hold the write until the field is valid,
  and reflect invalid state inline as today.
- **`SetProxy` side effect:** the backend's `SetProxy` resets `RawStatus` to
  `Disabled`, and the setter re-applies the user's internet-use choice
  afterward (`ParatextRegistrationService.cs:286–302`). Applying fields
  independently must preserve this ordering so internet-use isn't clobbered by a
  proxy write.
- **Sibling dialog:** the Paratext **Registration Information** dialog uses the
  same save-and-restart pattern and always restarts. It's a natural candidate
  for the same treatment; a shared/app-level pending-restart indicator would let
  a change in either dialog contribute to one restart.

## 8. Open questions (must verify before build)

1. **Does ParatextData pick up a live internet-use change without a restart** for
   the paths that matter (send/receive, DBL download, resource listing)? The
   in-repo evidence (`PlatformScrTextCollection.cs:47` reading
   `InternetAccess.Status` per call) is suggestive but not conclusive — the
   networking consumers live inside `ParatextData.dll`, which isn't in this repo.
   Verify empirically: change internet-use without restarting, then attempt a
   send/receive or DBL download and confirm the new value is respected.
2. **Do server-selection and proxy changes truly require a restart**, or do
   they also apply live? This determines whether the banner ever appears in
   practice.
3. **App-level + empty-state pending-restart surface:** is there an existing
   "restart to apply" affordance and an empty-state slot to reuse, or do these
   introduce new ones? What owns the pending-restart state across surfaces?
4. **Scope:** do we apply this only to Internet Settings, or also to the
   Registration Information dialog in the same pass?

## 9. Implementation sketch (frontend-first)

1. Replace the single-`saveState` machine in `internet-settings.web-view.tsx`
   with per-field apply-on-change handlers that call
   `setParatextDataInternetSettings` (or a more granular setter if we split it).
2. Introduce a `restartPending` state derived from whether any
   restart-required field differs from its last-effective value, owned somewhere
   app-scoped so it can drive both the in-dialog banner and the empty-state
   prompt.
3. Render the pending-restart banner + Restart now / Restart later actions;
   remove the mandatory "Save and restart" button.
4. Wire the same pending-restart prompt into the empty (no-project) UI.
5. Keep the existing 5s delay only on the explicit "Restart now" path so the
   success message is visible before the app goes down.
6. No backend change needed for apply; a backend change is only needed if we
   want a truer signal of "is this value fully in effect" than the frontend can
   compute.

## 10. Out of scope

- Redesigning the settings-system's general handling of restart-required
  settings (this is a targeted fix to two web-view dialogs). If a general
  "restart required" affordance is wanted platform-wide, that's a separate
  proposal this one could feed into.
