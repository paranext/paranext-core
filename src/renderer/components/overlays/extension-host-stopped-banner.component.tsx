import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Z_INDEX_ABOVE_DOCK,
} from 'platform-bible-react';
import { getErrorMessage, LocalizeKey } from 'platform-bible-utils';
import { CircleCheck, TriangleAlert } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { useExtensionHostNotice } from '@renderer/hooks/use-extension-host-notice.hook';
import { useIsConnectionLost } from '@renderer/hooks/use-is-connection-lost.hook';
import { useIsPowerMode } from '@renderer/hooks/use-is-power-mode.hook';
import { getToolbarHeight } from '@renderer/components/toolbar-height.util';
import {
  dismissExtensionHostNotice,
  ExtensionHostNotice,
  markExtensionHostRestarted,
  markExtensionHostRestarting,
  revertExtensionHostRestart,
} from '@renderer/services/extension-host-stopped-store';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import type { ExtensionHostStopReason } from '@shared/models/extension-host-lifecycle.model';

export const EXTENSION_HOST_STOPPED_TITLE_KEY =
  '%extensionHostStopped_title%' satisfies LocalizeKey;
export const EXTENSION_HOST_STOPPED_MESSAGE_LOST_CONNECTION_KEY =
  '%extensionHostStopped_messageLostConnection%' satisfies LocalizeKey;
export const EXTENSION_HOST_STOPPED_MESSAGE_CRASHED_KEY =
  '%extensionHostStopped_messageCrashed%' satisfies LocalizeKey;
export const EXTENSION_HOST_STOPPED_RESTART_EXTENSIONS_KEY =
  '%extensionHostStopped_restartExtensions%' satisfies LocalizeKey;
export const EXTENSION_HOST_STOPPED_RESTART_APP_KEY =
  '%extensionHostStopped_restartApp%' satisfies LocalizeKey;
export const EXTENSION_HOST_STOPPED_RESTARTING_KEY =
  '%extensionHostStopped_restarting%' satisfies LocalizeKey;
export const EXTENSION_HOST_STOPPED_RESTARTED_TITLE_KEY =
  '%extensionHostStopped_restartedTitle%' satisfies LocalizeKey;
export const EXTENSION_HOST_STOPPED_RESTARTED_MESSAGE_KEY =
  '%extensionHostStopped_restartedMessage%' satisfies LocalizeKey;
export const EXTENSION_HOST_STOPPED_DISMISS_KEY =
  '%extensionHostStopped_dismiss%' satisfies LocalizeKey;

/** Every localization key this component requests. */
export type ExtensionHostStoppedKey =
  | typeof EXTENSION_HOST_STOPPED_TITLE_KEY
  | typeof EXTENSION_HOST_STOPPED_MESSAGE_LOST_CONNECTION_KEY
  | typeof EXTENSION_HOST_STOPPED_MESSAGE_CRASHED_KEY
  | typeof EXTENSION_HOST_STOPPED_RESTART_EXTENSIONS_KEY
  | typeof EXTENSION_HOST_STOPPED_RESTART_APP_KEY
  | typeof EXTENSION_HOST_STOPPED_RESTARTING_KEY
  | typeof EXTENSION_HOST_STOPPED_RESTARTED_TITLE_KEY
  | typeof EXTENSION_HOST_STOPPED_RESTARTED_MESSAGE_KEY
  | typeof EXTENSION_HOST_STOPPED_DISMISS_KEY;

/** Exported so the localization-parity test asserts against the list the component reads. */
export const LOCALIZED_STRING_KEYS: ExtensionHostStoppedKey[] = [
  EXTENSION_HOST_STOPPED_DISMISS_KEY,
  EXTENSION_HOST_STOPPED_MESSAGE_CRASHED_KEY,
  EXTENSION_HOST_STOPPED_MESSAGE_LOST_CONNECTION_KEY,
  EXTENSION_HOST_STOPPED_RESTART_APP_KEY,
  EXTENSION_HOST_STOPPED_RESTARTED_MESSAGE_KEY,
  EXTENSION_HOST_STOPPED_RESTARTED_TITLE_KEY,
  EXTENSION_HOST_STOPPED_RESTART_EXTENSIONS_KEY,
  EXTENSION_HOST_STOPPED_RESTARTING_KEY,
  EXTENSION_HOST_STOPPED_TITLE_KEY,
];

/**
 * English text shown when a key has no resolved translation, matching `en.json`. The localization
 * service lives in the extension host, which is exactly what has stopped when this banner matters,
 * so a stop before localization has answered would otherwise render a literal `%key%`.
 */
export const ENGLISH_FALLBACKS: { [K in ExtensionHostStoppedKey]: string } = {
  [EXTENSION_HOST_STOPPED_TITLE_KEY]: 'Extensions have stopped working',
  [EXTENSION_HOST_STOPPED_MESSAGE_LOST_CONNECTION_KEY]:
    'Extensions lost contact with the rest of the app. Editing and most tabs will not respond until they are restarted.',
  [EXTENSION_HOST_STOPPED_MESSAGE_CRASHED_KEY]:
    'Extensions stopped unexpectedly. Editing and most tabs will not respond until they are restarted.',
  [EXTENSION_HOST_STOPPED_RESTART_EXTENSIONS_KEY]: 'Restart extensions',
  [EXTENSION_HOST_STOPPED_RESTART_APP_KEY]: 'Restart app',
  [EXTENSION_HOST_STOPPED_RESTARTING_KEY]: 'Restarting extensions. This can take a moment…',
  [EXTENSION_HOST_STOPPED_RESTARTED_TITLE_KEY]: 'Extensions restarted',
  [EXTENSION_HOST_STOPPED_RESTARTED_MESSAGE_KEY]:
    'If anything still does not respond, restart the app.',
  [EXTENSION_HOST_STOPPED_DISMISS_KEY]: 'Dismiss',
};

/**
 * How long a restart may stay in the restarting phase without `platform.onDidStartExtensionHost`
 * arriving before the banner gives up waiting and shows the restarted state anyway. A dev build
 * needs about a minute to transpile and activate extensions; a packaged build is faster. Exported
 * for the test.
 */
export const RESTART_READY_FALLBACK_MS = 90_000;

/** The string for `key`, or its English fallback when localization has not resolved it. */
function localizedOrEnglish(
  strings: Partial<Record<ExtensionHostStoppedKey, string>>,
  key: ExtensionHostStoppedKey,
) {
  const value = strings[key];
  if (!value || value === key) return ENGLISH_FALLBACKS[key];
  return value;
}

const MESSAGE_KEY_BY_REASON: { [R in ExtensionHostStopReason]: ExtensionHostStoppedKey } = {
  'lost-connection': EXTENSION_HOST_STOPPED_MESSAGE_LOST_CONNECTION_KEY,
  crashed: EXTENSION_HOST_STOPPED_MESSAGE_CRASHED_KEY,
};

type Props = {
  phase: ExtensionHostNotice['phase'];
  title: string;
  message: string;
  restartExtensionsLabel: string;
  restartAppLabel: string;
  dismissLabel: string;
  isPowerMode: boolean;
  onRestartExtensions: () => void;
  onRestartApp: () => void;
  onDismiss: () => void;
};

/**
 * A strip across the top of the window, below the toolbar, saying extensions have stopped and
 * offering the ways back. Deliberately NOT a scrim and NOT a dialog: everything main provides
 * (menus, window management, the restart commands themselves) still works in this state, so
 * blocking the window would take away controls that work. The user is told, not fenced in.
 *
 * Three phases. `stopped` alarms (destructive tone, Restart extensions + Restart app). `restarting`
 * keeps the alarm tone with both buttons disabled while the new process comes up. `restarted` stays
 * up, calmer (default tone, Restart app + Dismiss): a restart does not heal every part of a window,
 * so a banner that vanished could leave things quietly dead, which is the failure this notice
 * exists to end.
 *
 * `role="status"` with `aria-live="polite"`: an interruption the user did not ask for, but one they
 * can act on at their own pace.
 */
export function ExtensionHostStoppedBannerPresentational({
  phase,
  title,
  message,
  restartExtensionsLabel,
  restartAppLabel,
  dismissLabel,
  isPowerMode,
  onRestartExtensions,
  onRestartApp,
  onDismiss,
}: Props) {
  const isAlarm = phase !== 'restarted';
  const isRestarting = phase === 'restarting';
  const alarmClassName =
    'tw:rounded-none tw:border-x-0 tw:border-destructive/40 tw:bg-transparent tw:px-3 tw:text-diff-deleted tw:has-[>svg]:grid-cols-[auto_1fr_auto] tw:*:data-[slot=alert-description]:text-diff-deleted/90';
  const calmClassName =
    'tw:rounded-none tw:border-x-0 tw:bg-transparent tw:px-3 tw:has-[>svg]:grid-cols-[auto_1fr_auto]';
  const icon = isAlarm ? <TriangleAlert aria-hidden="true" /> : <CircleCheck aria-hidden="true" />;
  const restartExtensionsButton = isAlarm ? (
    <Button variant="outline" size="sm" disabled={isRestarting} onClick={onRestartExtensions}>
      {restartExtensionsLabel}
    </Button>
  ) : undefined;
  const dismissButton = isAlarm ? undefined : (
    <Button variant="ghost" size="sm" onClick={onDismiss}>
      {dismissLabel}
    </Button>
  );
  return (
    <div
      data-testid="extension-host-stopped-banner"
      role="status"
      aria-live="polite"
      className="pr-twp tw:fixed tw:inset-x-0 tw:bg-background"
      style={{ top: getToolbarHeight(isPowerMode), zIndex: Z_INDEX_ABOVE_DOCK }}
    >
      <Alert
        variant={isAlarm ? 'destructive' : 'default'}
        role={undefined}
        className={isAlarm ? alarmClassName : calmClassName}
      >
        {icon}
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
        <div className="tw:col-start-3 tw:row-span-2 tw:row-start-1 tw:flex tw:gap-2 tw:self-center tw:ps-3">
          {restartExtensionsButton}
          <Button variant="outline" size="sm" disabled={isRestarting} onClick={onRestartApp}>
            {restartAppLabel}
          </Button>
          {dismissButton}
        </div>
      </Alert>
    </div>
  );
}

/**
 * The banner wired to the store. Mounted unconditionally from app startup and rendering nothing
 * until the extension host stops: `useLocalizedStrings` and `useIsPowerMode` both read from the
 * extension host, so they must have resolved while it was alive. {@link localizedOrEnglish} backs
 * that up for a stop before localization has answered at all.
 *
 * Stands down while the connection-lost state is shown: that overlay covers the whole window and
 * owns recovery then, and this window could not reach main to restart anything anyway.
 */
export function ExtensionHostStoppedBanner() {
  const notice = useExtensionHostNotice();
  const isConnectionLost = useIsConnectionLost();
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);
  const isPowerMode = useIsPowerMode();
  const phase = notice?.phase;

  // The fallback for a start announcement that never comes: armed on entering `restarting`,
  // disarmed on leaving it (the normal exit is `extension-host-stopped-service.ts` hearing
  // `platform.onDidStartExtensionHost`). `markExtensionHostRestarted` is a no-op outside
  // `restarting`, so a late timer cannot undo a later state.
  useEffect(() => {
    if (phase !== 'restarting') return undefined;
    const timer = setTimeout(markExtensionHostRestarted, RESTART_READY_FALLBACK_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  const handleRestartExtensions = useCallback(async () => {
    markExtensionHostRestarting();
    try {
      // Settles at fork time, not when the new process is up; the restarting phase outlives it.
      await sendCommand('platform.restartExtensionHost');
    } catch (error) {
      logger.error(
        `Restarting the extension host from the banner failed: ${getErrorMessage(error)}`,
      );
      revertExtensionHostRestart();
    }
  }, []);

  const handleRestartApp = useCallback(() => {
    sendCommand('platform.restart').catch((error) => {
      logger.error(`Restarting the app from the banner failed: ${getErrorMessage(error)}`);
    });
  }, []);

  const handleDismiss = useCallback(() => {
    dismissExtensionHostNotice();
  }, []);

  if (!notice || isConnectionLost) return undefined;

  const text = (key: ExtensionHostStoppedKey) => localizedOrEnglish(localizedStrings, key);

  let title: string;
  let message: string;
  if (notice.phase === 'restarted') {
    title = text(EXTENSION_HOST_STOPPED_RESTARTED_TITLE_KEY);
    message = text(EXTENSION_HOST_STOPPED_RESTARTED_MESSAGE_KEY);
  } else {
    title = text(EXTENSION_HOST_STOPPED_TITLE_KEY);
    message =
      notice.phase === 'restarting'
        ? text(EXTENSION_HOST_STOPPED_RESTARTING_KEY)
        : text(MESSAGE_KEY_BY_REASON[notice.reason]);
  }

  return (
    <ExtensionHostStoppedBannerPresentational
      phase={notice.phase}
      title={title}
      message={message}
      restartExtensionsLabel={text(EXTENSION_HOST_STOPPED_RESTART_EXTENSIONS_KEY)}
      restartAppLabel={text(EXTENSION_HOST_STOPPED_RESTART_APP_KEY)}
      dismissLabel={text(EXTENSION_HOST_STOPPED_DISMISS_KEY)}
      isPowerMode={isPowerMode}
      onRestartExtensions={handleRestartExtensions}
      onRestartApp={handleRestartApp}
      onDismiss={handleDismiss}
    />
  );
}

export default ExtensionHostStoppedBanner;
