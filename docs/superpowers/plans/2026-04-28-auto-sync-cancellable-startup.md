# Auto-Sync Cancellable Startup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a startup Auto-Sync that runs Send/Receive for all projects, shows a dismissible sonar notification with a Cancel button, and extends the notification service with `duration` and `dismiss()` capabilities.

**Architecture:** The `paranext-core` notification service gains two new capabilities: a `duration` field on `PlatformNotification` and a `dismiss()` method on `INotificationService` implemented via sonner's `toast.dismiss()`. The `paratextBibleSendReceive` extension in `paratext-bible-internal-extensions` fires a background `runAutoSync()` task on activation that shows a sonar, awaits `sendReceiveProjects`, and dismisses the sonar in `finally`. A `cancelAutoSync` command dismisses the sonar immediately and is structured to later cancel the dotnet-side S/R operation.

**Tech Stack:** TypeScript, Vitest, sonner (toast library), PAPI (Platform.Bible extension API), `@papi/backend`

---

## File Structure

**`paranext-core`** (notification service):

- Modify: `src/shared/models/notification.service-model.ts` — add `duration?: number` to `PlatformNotification`; add `dismiss()` to `INotificationService`
- Modify: `src/renderer/services/notification.service-host.ts` — use `notification.duration` when provided; implement `dismiss()` via `toast.dismiss()`; register `dismiss` on the network object
- Create: `src/renderer/services/notification.service-host.test.ts` — unit tests for `duration` and `dismiss()`

**`../paratext-bible-internal-extensions/src/paratext-bible-send-receive`** (auto-sync):

- Modify: `src/types/paratext-bible-send-receive.d.ts` — declare `cancelAutoSync` command in `CommandHandlers`
- Modify: `contributions/localizedStrings.json` — add `%autoSync_notification_inProgress%` and `%autoSync_notification_cancel%`
- Modify: `src/main.ts` — add module-level `autoSyncNotificationId`, `runAutoSync()`, and `cancelAutoSync` command registration

---

## Task 1: Add `duration` to `PlatformNotification`

**Files:**

- Modify: `src/shared/models/notification.service-model.ts`
- Modify: `src/renderer/services/notification.service-host.ts`
- Create: `src/renderer/services/notification.service-host.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/renderer/services/notification.service-host.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type {
  INotificationService,
  PlatformNotification,
} from '@shared/models/notification.service-model';

const mockToastInfo = vi.fn(() => 'mock-toast-id');
const mockToastWarning = vi.fn(() => 'mock-toast-id');
const mockToastError = vi.fn(() => 'mock-toast-id');
const mockToast = Object.assign(
  vi.fn(() => 'mock-toast-id'),
  {
    info: mockToastInfo,
    warning: mockToastWarning,
    error: mockToastError,
    dismiss: vi.fn(),
  },
);

vi.mock('sonner', () => ({ toast: mockToast }));
vi.mock('@shared/services/command.service', () => ({ sendCommand: vi.fn() }));
vi.mock('@shared/services/localization.service', () => ({
  localizationService: {
    getLocalizedString: vi.fn(({ localizeKey }: { localizeKey: string }) =>
      Promise.resolve(localizeKey),
    ),
  },
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

let capturedService: INotificationService;
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: {
    set: vi.fn((_name: string, service: INotificationService) => {
      capturedService = service;
      return Promise.resolve();
    }),
  },
}));

describe('notification service host', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    // Re-import to reset module-level map state between tests
    vi.resetModules();
    // Re-apply mocks after resetModules
    vi.mock('sonner', () => ({ toast: mockToast }));
    vi.mock('@shared/services/command.service', () => ({ sendCommand: vi.fn() }));
    vi.mock('@shared/services/localization.service', () => ({
      localizationService: {
        getLocalizedString: vi.fn(({ localizeKey }: { localizeKey: string }) =>
          Promise.resolve(localizeKey),
        ),
      },
    }));
    vi.mock('@shared/services/logger.service', () => ({
      logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
    }));
    vi.mock('@shared/services/network-object.service', () => ({
      networkObjectService: {
        set: vi.fn((_name: string, service: INotificationService) => {
          capturedService = service;
          return Promise.resolve();
        }),
      },
    }));
    const { startNotificationService } = await import(
      '@renderer/services/notification.service-host'
    );
    await startNotificationService();
  });

  describe('send with duration', () => {
    it('uses the provided duration when specified', async () => {
      const notification: PlatformNotification = {
        message: 'test',
        severity: 'info',
        duration: 5000,
      };

      await capturedService.send(notification);

      expect(mockToastInfo).toHaveBeenCalledWith(
        'test',
        expect.objectContaining({ duration: 5000 }),
      );
    });

    it('uses the computed duration when duration is not specified', async () => {
      const notification: PlatformNotification = {
        message: 'test',
        severity: 'info',
      };

      await capturedService.send(notification);

      // 'test' has length 4: Math.min(Math.max(4 * 265, 10000), 35000) = 10000
      expect(mockToastInfo).toHaveBeenCalledWith(
        'test',
        expect.objectContaining({ duration: 10000 }),
      );
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- src/renderer/services/notification.service-host.test.ts
```

Expected: FAIL — `duration` property does not exist on `PlatformNotification`

- [ ] **Step 3: Add `duration` to `PlatformNotification`**

In `src/shared/models/notification.service-model.ts`, add `duration` after `notificationId`:

```typescript
export interface PlatformNotification {
  message: string | LocalizeKey;
  severity: Severity;
  clickCommandLabel?: string | LocalizeKey;
  clickCommand?: keyof CommandHandlers;
  notificationId?: string | number;
  /**
   * Optional duration in milliseconds for how long the notification is displayed.
   *
   * When omitted, duration is computed from message length (minimum 10 seconds, maximum 35
   * seconds).
   */
  duration?: number;
}
```

- [ ] **Step 4: Use `duration` in the notification host**

In `src/renderer/services/notification.service-host.ts`, replace the `duration` line in `toastOptions`:

```typescript
const toastOptions = {
  action:
    clickCommandLabel && clickCommand
      ? {
          label: await localize(clickCommandLabel),
          onClick: () => commandService.sendCommand(clickCommand, effectiveNotificationId),
          id: toastId,
        }
      : undefined,
  // Duration calc from https://paratextstudio.atlassian.net/browse/PT-2196?focusedCommentId=13075
  duration:
    notification.duration ?? Math.min(Math.max(localizedMessage.length * 265, 10000), 35000),
};
```

Also update the destructuring at the top of `send` to include `duration`:

```typescript
const { message, severity, clickCommand, clickCommandLabel, notificationId, duration } =
  notification;
```

Wait — `duration` is used inline via `notification.duration`, so destructuring is not strictly required. Use `notification.duration` directly as shown in the `toastOptions` change above.

- [ ] **Step 5: Run test to verify it passes**

```bash
npm test -- src/renderer/services/notification.service-host.test.ts
```

Expected: PASS for both `duration` tests

- [ ] **Step 6: Commit**

```bash
git add src/shared/models/notification.service-model.ts \
        src/renderer/services/notification.service-host.ts \
        src/renderer/services/notification.service-host.test.ts
git commit -m "feat: add duration option to PlatformNotification"
```

---

## Task 2: Add `dismiss()` to the Notification Service

**Files:**

- Modify: `src/shared/models/notification.service-model.ts`
- Modify: `src/renderer/services/notification.service-host.ts`
- Modify: `src/renderer/services/notification.service-host.test.ts`

- [ ] **Step 1: Write the failing test**

Add a new `describe` block to `src/renderer/services/notification.service-host.test.ts` (inside the outer `describe`):

```typescript
describe('dismiss', () => {
  it('calls toast.dismiss with the mapped toast id', async () => {
    mockToastInfo.mockReturnValueOnce('specific-toast-id');
    const notification: PlatformNotification = { message: 'test', severity: 'info' };
    const notifId = await capturedService.send(notification);

    await capturedService.dismiss(notifId);

    expect(mockToast.dismiss).toHaveBeenCalledWith('specific-toast-id');
  });

  it('does nothing when the notification id is not found', async () => {
    await capturedService.dismiss('nonexistent-id');

    expect(mockToast.dismiss).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- src/renderer/services/notification.service-host.test.ts
```

Expected: FAIL — `capturedService.dismiss is not a function`

- [ ] **Step 3: Add `dismiss()` to `INotificationService`**

In `src/shared/models/notification.service-model.ts`, add `dismiss` to the interface:

```typescript
export interface INotificationService {
  /**
   * Send a notification to the user. If a notification with the same ID is already showing, it will
   * be updated with the new notification.
   *
   * @param notification Notification to send
   * @returns Promise that resolves with the ID of the notification
   */
  send(notification: PlatformNotification): Promise<string | number>;
  /**
   * Dismiss a notification by its ID. If the notification is not found, this is a no-op.
   *
   * @param notificationId ID of the notification to dismiss, as returned by {@link send}
   */
  dismiss(notificationId: string | number): Promise<void>;
}
```

- [ ] **Step 4: Implement `dismiss()` in the notification host**

In `src/renderer/services/notification.service-host.ts`, add the `dismiss` function after `send`:

```typescript
async function dismiss(notificationId: string | number): Promise<void> {
  const toastId = mapOfNotificationIdsToToastIds.get(notificationId);
  if (toastId !== undefined) {
    toast.dismiss(toastId);
    mapOfNotificationIdsToToastIds.delete(notificationId);
  }
}
```

Then update the `notificationService` object:

```typescript
const notificationService: INotificationService = {
  send,
  dismiss,
};
```

- [ ] **Step 5: Register `dismiss` on the network object**

In `startNotificationService()`, add `dismiss` to the `methods` array passed to `networkObjectService.set`:

```typescript
{
  name: 'dismiss',
  summary: "Dismiss a notification from the user's UI",
  params: [
    {
      name: 'notificationId',
      required: true,
      summary: 'The ID of the notification to dismiss',
      schema: { type: ['string', 'number'] },
    },
  ],
  result: {
    name: 'return value',
    schema: { type: 'null' },
  },
},
```

- [ ] **Step 6: Run test to verify it passes**

```bash
npm test -- src/renderer/services/notification.service-host.test.ts
```

Expected: PASS for all tests

- [ ] **Step 7: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors

- [ ] **Step 8: Commit**

```bash
git add src/shared/models/notification.service-model.ts \
        src/renderer/services/notification.service-host.ts \
        src/renderer/services/notification.service-host.test.ts
git commit -m "feat: add dismiss() method to notification service"
```

---

## Task 3: Declare `cancelAutoSync` command and add localized strings

All steps in this task run in the `../paratext-bible-internal-extensions/src/paratext-bible-send-receive` directory.

**Files:**

- Modify: `src/types/paratext-bible-send-receive.d.ts`
- Modify: `contributions/localizedStrings.json`

- [ ] **Step 1: Add `cancelAutoSync` to `CommandHandlers`**

In `src/types/paratext-bible-send-receive.d.ts`, add the new command after `'paratextBibleSendReceive.sendReceiveProjects'`:

```typescript
/**
 * Cancels the Auto-Sync operation and dismisses the in-progress notification.
 *
 * When S/R cancellation is implemented on the dotnet side, this command will also
 * interrupt the running Send/Receive operation.
 */
'paratextBibleSendReceive.cancelAutoSync': () => Promise<void>;
```

- [ ] **Step 2: Add localized strings for Auto-Sync notification**

In `contributions/localizedStrings.json`, add two entries to the `"en"` object (after the last entry, before the closing brace):

```json
"%autoSync_notification_inProgress%": "Auto-syncing projects...",
"%autoSync_notification_cancel%": "Cancel"
```

- [ ] **Step 3: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add src/types/paratext-bible-send-receive.d.ts contributions/localizedStrings.json
git commit -m "feat: declare cancelAutoSync command and add auto-sync localized strings"
```

---

## Task 4: Add Auto-Sync startup logic to `main.ts`

All steps in this task run in the `../paratext-bible-internal-extensions/src/paratext-bible-send-receive` directory.

**Files:**

- Modify: `src/main.ts`

- [ ] **Step 1: Add module-level state and `runAutoSync` function**

At the top of `src/main.ts`, after the existing imports, add the module-level variable:

```typescript
let autoSyncNotificationId: string | number | undefined;
```

Then add the `runAutoSync` function before `activate`. Insert it after the web view provider declarations:

```typescript
async function runAutoSync(): Promise<void> {
  autoSyncNotificationId = await papi.notifications.send({
    message: '%autoSync_notification_inProgress%',
    severity: 'info',
    duration: 35000,
    clickCommandLabel: '%autoSync_notification_cancel%',
    clickCommand: 'paratextBibleSendReceive.cancelAutoSync',
  });
  try {
    await papi.commands.sendCommand('paratextBibleSendReceive.sendReceiveProjects');
  } catch (e) {
    logger.warn(`Auto-Sync failed: ${getErrorMessage(e)}`);
    await papi.notifications.send({
      severity: 'error',
      message: '%sendReceive_results_dialog_failed%',
    });
  } finally {
    if (autoSyncNotificationId !== undefined) {
      await papi.notifications.dismiss(autoSyncNotificationId);
      autoSyncNotificationId = undefined;
    }
  }
}
```

- [ ] **Step 2: Register `cancelAutoSync` command in `activate()`**

In the `activate` function, add the `cancelAutoSync` command registration before the `context.registrations.add` call:

```typescript
const cancelAutoSyncCommandPromise = papi.commands.registerCommand(
  'paratextBibleSendReceive.cancelAutoSync',
  async () => {
    if (autoSyncNotificationId !== undefined) {
      await papi.notifications.dismiss(autoSyncNotificationId);
      autoSyncNotificationId = undefined;
    }
  },
  {
    method: {
      description: 'Cancel the Auto-Sync operation and dismiss the notification',
      params: [],
      result: { name: 'return value', schema: { type: 'null' } },
    },
  },
);
```

- [ ] **Step 3: Add `cancelAutoSync` to `context.registrations` and fire `runAutoSync`**

Update `context.registrations.add` to include the new command:

```typescript
context.registrations.add(
  await selectedProjectIdsValidatorPromise,
  await sendReceiveWebViewProviderPromise,
  await compareVersionsWebViewProviderPromise,
  await compareVersionsByWebViewIdCommandPromise,
  await openSendReceiveWebViewCommandPromise,
  await sendReceiveProjectsByWebViewIdCommandPromise,
  await cancelAutoSyncCommandPromise,
);
```

Then fire the background task immediately after (still inside `activate`, after `context.registrations.add`):

```typescript
// Fire auto-sync as a background task - not awaited so activation is not blocked
runAutoSync();
```

- [ ] **Step 4: Run typecheck**

```bash
npm run typecheck
```

Expected: no errors. If `papi.notifications.dismiss` is not found, ensure `paranext-core` has been built and the local package reference is up to date (`npm install` in the extension directory).

- [ ] **Step 5: Commit**

```bash
git add src/main.ts
git commit -m "feat: add cancellable auto-sync on startup"
```

---

## Verification

After all tasks are complete:

- [ ] Build and run the app: `./.erb/scripts/refresh.sh` (in `paranext-core`)
- [ ] On startup, confirm a sonar notification appears in the bottom-right corner with a Cancel button
- [ ] Confirm the sonar disappears when sync completes
- [ ] Click Cancel during a sync and confirm the sonar is dismissed immediately
- [ ] Confirm no double-dismiss errors appear in logs
