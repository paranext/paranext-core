# Auto-Sync Cancellable Startup Task — Design Spec

**Date:** 2026-04-28
**Repos affected:** `paranext-core`, `paratext-bible-internal-extensions`

---

## Overview

On startup, Platform.Bible automatically runs a Send/Receive (S/R) operation against the Paratext
server to sync all projects. A sonar notification appears in the bottom-right corner while sync is
running, with a Cancel button the user can click to dismiss it. When the sync completes (or is
cancelled), the sonar is dismissed programmatically.

This requires two changes:

1. **`paranext-core`** — extend the notification service with a `dismiss()` method and a `duration`
   option on notifications.
2. **`paratext-bible-internal-extensions`** — add auto-sync startup logic and a `cancelAutoSync`
   command inside the existing `paratextBibleSendReceive` extension.

---

## Section 1: Notification Service Extension (`paranext-core`)

### New `duration` field on `PlatformNotification`

`PlatformNotification` gains an optional `duration?: number` field (milliseconds). When omitted,
the existing default sonner behavior applies. The auto-sync notification uses `duration: 35000`
(35 seconds — the sonner's existing maximum) so it stays visible for long-running syncs without
persisting forever if dismiss is never called.

**Files changed:**

- `src/shared/models/notification.service-model.ts` — add `duration?: number` to
  `PlatformNotification`
- `src/renderer/services/notification.service-host.ts` — pass `duration` through to the display
- `src/renderer/components/notification-display.tsx` — forward `duration` to the sonner component

### New `dismiss()` method on `INotificationService`

```typescript
// src/shared/models/notification.service-model.ts
export interface INotificationService {
  send(notification: PlatformNotification): Promise<string | number>;
  dismiss(notificationId: string | number): Promise<void>;
}
```

The host implementation removes the matching notification from renderer state. Calling `dismiss()`
on an already-gone notification is a no-op.

**Files changed:**

- `src/shared/models/notification.service-model.ts` — add method to interface
- `src/shared/services/notification.service.ts` — add client call via network object
- `src/renderer/services/notification.service-host.ts` — add host-side handler
- `src/renderer/components/notification-display.tsx` — remove notification from state on dismiss

`lib/papi-dts/papi.d.ts` is auto-generated and will reflect the new method after a build.

---

## Section 2: Auto-Sync Extension (`paratext-bible-internal-extensions`)

The auto-sync logic lives inside the existing `paratextBibleSendReceive` extension. A background
task is fired (not awaited) from `activate()` so extension startup is not blocked.

### Module-level state

```typescript
let autoSyncNotificationId: string | number | undefined;
```

This single variable is the source of truth for whether a sync is in progress. No extra flags or
job queues needed.

### Background task flow

```
activate()
  → register cancelAutoSync command
  → fire runAutoSync() — not awaited

runAutoSync()
  → notifications.send({ message, severity: 'info', duration: 35000,
                          clickCommandLabel: 'Cancel',
                          clickCommand: 'paratextBibleSendReceive.cancelAutoSync' })
  → store returned id in autoSyncNotificationId
  → await sendCommand('paratextBibleSendReceive.sendReceiveProjects')  // no args = all projects
  → catch: dismiss sonar, send error notification
  → finally: if autoSyncNotificationId is set, dismiss it and clear
```

### Command declaration

`paratextBibleSendReceive.cancelAutoSync` is declared in `papi-shared-types` `CommandHandlers`:

```typescript
'paratextBibleSendReceive.cancelAutoSync': () => Promise<void>;
```

---

## Section 3: Cancel Command & Forward Compatibility

### Current behavior

```typescript
papi.commands.registerCommand('paratextBibleSendReceive.cancelAutoSync', async () => {
  if (autoSyncNotificationId !== undefined) {
    await papi.notifications.dismiss(autoSyncNotificationId);
    autoSyncNotificationId = undefined;
  }
});
```

### Future behavior (when dotnet S/R cancellation is implemented)

A third step is inserted between dismiss and clear:

```typescript
await papi.commands.sendCommand('paratextBibleSendReceive.stopSendReceive'); // not yet implemented
```

No other code changes required — the sonar, the notification flow, and the command registration
all stay the same.

### Race condition handling

If the user cancels mid-sync:

1. `cancelAutoSync` fires → dismisses sonar, sets `autoSyncNotificationId = undefined`
2. `sendReceiveProjects` eventually resolves → `finally` sees `undefined`, skips dismiss

No double-dismiss, no error. The S/R runs to completion in the background until dotnet
cancellation is available.

---

## Section 4: Error Handling

| Scenario                                        | Behavior                                                                                                                                                                      |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| S/R fails                                       | `catch` dismisses in-progress sonar, sends `severity: 'error'` notification with failure message, clears ID                                                                   |
| User cancels, S/R later completes               | `finally` sees `id === undefined`, skips dismiss — no double-dismiss                                                                                                          |
| Extension deactivates mid-sync                  | `cancelAutoSync` unregisters; background task still holds ID reference and calls `dismiss()` in `finally` when promise resolves — notification service outlives the extension |
| `dismiss()` called on already-gone notification | No-op                                                                                                                                                                         |

---

## Data Flow Summary

```
Extension activate()
  ├─ register cancelAutoSync command
  └─ runAutoSync() [background, not awaited]
       ├─ notifications.send(...) → notifId stored
       ├─ sendReceiveProjects() [long-running]
       │    ├─ completes → finally: dismiss(notifId)
       │    └─ fails    → catch: dismiss(notifId) + error notification
       └─ user clicks Cancel
            └─ cancelAutoSync fires → dismiss(notifId), clear id
                 └─ [future: stop S/R on dotnet side]
```
