import { Alert, AlertDescription, AlertTitle, Button } from 'platform-bible-react';
import { resolveLocalizedString } from 'platform-bible-react/experimental';
import { getErrorMessage, LocalizeKey } from 'platform-bible-utils';
import { CircleAlert, CircleCheck, TriangleAlert } from 'lucide-react';
import { FocusEvent, ReactElement, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { useExtensionHostNotice } from '@renderer/hooks/use-extension-host-notice.hook';
import { useIsConnectionLost } from '@renderer/hooks/use-is-connection-lost.hook';
import { BELOW_TOOLBAR_STRIP_HEIGHT_CSS_VARIABLE } from '@renderer/components/toolbar-height.util';
import {
  ALARM_STRIP_ACTIONS_CLASS_NAME,
  ALARM_STRIP_ALERT_CLASS_NAME,
} from '@renderer/components/alarm-strip.util';
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
export const EXTENSION_HOST_STOPPED_RESTART_UNCONFIRMED_TITLE_KEY =
  '%extensionHostStopped_restartUnconfirmedTitle%' satisfies LocalizeKey;
export const EXTENSION_HOST_STOPPED_DISMISS_KEY =
  '%extensionHostStopped_dismiss%' satisfies LocalizeKey;

const BANNER_TEST_ID = 'extension-host-stopped-banner';

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
  | typeof EXTENSION_HOST_STOPPED_RESTART_UNCONFIRMED_TITLE_KEY
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
  EXTENSION_HOST_STOPPED_RESTART_UNCONFIRMED_TITLE_KEY,
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
    'Extensions lost contact with the rest of the app. Editing and most tabs will not respond until extensions are restarted.',
  [EXTENSION_HOST_STOPPED_MESSAGE_CRASHED_KEY]:
    'Extensions stopped unexpectedly. Editing and most tabs will not respond until extensions are restarted.',
  [EXTENSION_HOST_STOPPED_RESTART_EXTENSIONS_KEY]: 'Restart extensions',
  [EXTENSION_HOST_STOPPED_RESTART_APP_KEY]: 'Restart app',
  [EXTENSION_HOST_STOPPED_RESTARTING_KEY]: 'Restarting extensions. This can take a moment…',
  [EXTENSION_HOST_STOPPED_RESTARTED_TITLE_KEY]: 'Extensions restarted',
  [EXTENSION_HOST_STOPPED_RESTARTED_MESSAGE_KEY]:
    'If anything still does not respond, restart the app.',
  [EXTENSION_HOST_STOPPED_RESTART_UNCONFIRMED_TITLE_KEY]: 'Extensions may not have restarted',
  [EXTENSION_HOST_STOPPED_DISMISS_KEY]: 'Dismiss',
};

/**
 * How long a restart may stay in the restarting phase without `platform.onDidStartExtensionHost`
 * arriving before the banner gives up waiting and shows the unconfirmed restarted state. A dev
 * build needs about a minute to transpile and activate extensions; a packaged build is faster.
 * Exported for the test.
 */
export const RESTART_READY_FALLBACK_MS = 90_000;

const MESSAGE_KEY_BY_REASON: { [R in ExtensionHostStopReason]: ExtensionHostStoppedKey } = {
  'lost-connection': EXTENSION_HOST_STOPPED_MESSAGE_LOST_CONNECTION_KEY,
  crashed: EXTENSION_HOST_STOPPED_MESSAGE_CRASHED_KEY,
};

type Props = {
  phase: ExtensionHostNotice['phase'];
  /**
   * In the `restarted` phase, whether the new extension host announced its start. Only changes the
   * icon; the caller picks the matching title. Defaults to `true`.
   */
  isRestartConfirmed?: boolean;
  title: string;
  message: string;
  restartExtensionsLabel: string;
  restartAppLabel: string;
  dismissLabel: string;
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
 * keeps the alarm tone with Restart extensions disabled while the new process comes up; Restart app
 * stays enabled, because an app restart is always safe and is the way out if the new extension host
 * never comes up. `restarted` stays up, calmer (default tone, Restart app + Dismiss): a restart
 * does not heal every part of a window, so a banner that vanished could leave things quietly dead,
 * which is the failure this notice exists to end.
 *
 * Positions nothing itself: {@link ExtensionHostStoppedBanner} places it in flow below the toolbar,
 * inside a persistent `role="status"` container, because a live region that is inserted together
 * with its content is generally not announced.
 */
export function ExtensionHostStoppedBannerPresentational({
  phase,
  isRestartConfirmed = true,
  title,
  message,
  restartExtensionsLabel,
  restartAppLabel,
  dismissLabel,
  onRestartExtensions,
  onRestartApp,
  onDismiss,
}: Props) {
  const isAlarm = phase !== 'restarted';
  const isRestarting = phase === 'restarting';
  const calmClassName =
    'tw:rounded-none tw:border-x-0 tw:bg-transparent tw:px-3 tw:has-[>svg]:grid-cols-[auto_1fr_auto]';
  let icon = <TriangleAlert aria-hidden="true" />;
  if (!isAlarm)
    icon = isRestartConfirmed ? (
      <CircleCheck aria-hidden="true" />
    ) : (
      <CircleAlert aria-hidden="true" />
    );
  // While extensions are down, restarting them is the primary action and restarting the app the
  // fallback; once they are back, Restart app is the only action left besides Dismiss.
  const restartExtensionsButton = isAlarm ? (
    <Button variant="default" size="sm" disabled={isRestarting} onClick={onRestartExtensions}>
      {restartExtensionsLabel}
    </Button>
  ) : undefined;
  const dismissButton = isAlarm ? undefined : (
    <Button variant="ghost" size="sm" onClick={onDismiss}>
      {dismissLabel}
    </Button>
  );
  return (
    <div className="pr-twp tw:bg-background">
      <Alert
        variant={isAlarm ? 'destructive' : 'default'}
        // Alert's own role="alert" would nest an assertive region inside the polite one; see
        // `overlay-connection-lost.component.tsx`.
        role={undefined}
        className={isAlarm ? ALARM_STRIP_ALERT_CLASS_NAME : calmClassName}
      >
        {icon}
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
        {/* Not a `ButtonGroup`: that renders a merged, segmented control for related toggles, and
            these are separate, alternative actions. */}
        <div className={`${ALARM_STRIP_ACTIONS_CLASS_NAME} tw:flex tw:gap-2`}>
          {restartExtensionsButton}
          <Button variant="outline" size="sm" onClick={onRestartApp}>
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
 * until the extension host stops: `useLocalizedStrings` reads from the extension host, so it must
 * have resolved while it was alive. {@link ENGLISH_FALLBACKS}, applied through
 * `resolveLocalizedString`, backs that up for a stop before localization has answered at all.
 *
 * Always renders one persistent `role="status"` container, empty when there is nothing to show, so
 * screen readers announce the strip's arrival as a change inside an existing live region.
 *
 * Stands down while the connection-lost state is shown: that overlay covers the whole window and
 * owns recovery then, and this window could not reach main to restart anything anyway.
 */
export function ExtensionHostStoppedBanner() {
  const notice = useExtensionHostNotice();
  const isConnectionLost = useIsConnectionLost();
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);
  const phase = notice?.phase;
  // React refs passed to DOM elements must be initialized with null, not undefined.
  // eslint-disable-next-line no-null/no-null
  const stripRef = useRef<HTMLDivElement>(null);
  const hasFocusWithinRef = useRef(false);
  const previousPhaseRef = useRef(phase);

  // The strip sits in flow between the toolbar and the dock, but the dock is absolutely positioned
  // below the toolbar, so flow alone cannot move it. The strip publishes its measured height on the
  // document root instead, and the dock's top inset adds it (`getDockLayoutOuterInset`): the dock
  // shrinks rather than being painted over, and the strip needs no z-index. An empty strip
  // publishes 0px.
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return undefined;
    const rootStyle = document.documentElement.style;
    const observer = new ResizeObserver(() => {
      rootStyle.setProperty(BELOW_TOOLBAR_STRIP_HEIGHT_CSS_VARIABLE, `${strip.offsetHeight}px`);
    });
    observer.observe(strip);
    return () => {
      observer.disconnect();
      rootStyle.removeProperty(BELOW_TOOLBAR_STRIP_HEIGHT_CSS_VARIABLE);
    };
  }, []);

  // The fallback for a start announcement that never comes: armed on entering `restarting`,
  // disarmed on leaving it (the normal exit is `extension-host-stopped-service.ts` hearing
  // `platform.onDidStartExtensionHost`), so a late timer cannot move a later state. It records the
  // restart as unconfirmed, so the banner does not claim a restart it never saw.
  useEffect(() => {
    if (phase !== 'restarting') return undefined;
    const timer = setTimeout(() => markExtensionHostRestarted(false), RESTART_READY_FALLBACK_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  // A phase change disables or removes buttons, and a focused button that goes drops keyboard focus
  // to the document body. Catch it on the strip itself, so a keyboard user stays where they were.
  // Only when focus was last inside the strip, so the strip never pulls focus away from elsewhere.
  // Keyed on the phase alone: when the connection-lost state empties the strip with the phase
  // unchanged, focus is deliberately left alone, because that overlay takes over the whole window
  // and manages focus itself.
  useLayoutEffect(() => {
    if (previousPhaseRef.current === phase) return;
    previousPhaseRef.current = phase;
    const strip = stripRef.current;
    if (!strip || !hasFocusWithinRef.current) return;
    const active = document.activeElement;
    const isFocusLost =
      !active ||
      active === document.body ||
      (strip.contains(active) && active !== strip && active.matches(':disabled'));
    if (isFocusLost) strip.focus();
  }, [phase]);

  const handleFocus = useCallback(() => {
    hasFocusWithinRef.current = true;
  }, []);

  // Focus leaving the strip ends "focus within", whether it moves to another element or drops to
  // the page because the user clicked elsewhere. Two blurs do not:
  // - the window itself losing focus (switching to another app), which is not the user leaving the
  //   strip;
  // - a button the browser blurs because a phase change disabled it, which the effect above
  //   rescues. A button a phase change removes needs no check here: React never delivers a blur
  //   from a node that is no longer in the document.
  const handleBlur = useCallback((event: FocusEvent<HTMLDivElement>) => {
    if (!document.hasFocus()) return;
    const next = event.relatedTarget;
    if (next instanceof Node && event.currentTarget.contains(next)) return;
    if (event.target.matches(':disabled')) return;
    hasFocusWithinRef.current = false;
  }, []);

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

  const text = (key: ExtensionHostStoppedKey) =>
    resolveLocalizedString(localizedStrings[key], ENGLISH_FALLBACKS[key]);

  let content: ReactElement | undefined;
  if (notice && !isConnectionLost) {
    let title: string;
    let message: string;
    let isRestartConfirmed = true;
    if (notice.phase === 'restarted') {
      isRestartConfirmed = notice.isConfirmed;
      title = text(
        notice.isConfirmed
          ? EXTENSION_HOST_STOPPED_RESTARTED_TITLE_KEY
          : EXTENSION_HOST_STOPPED_RESTART_UNCONFIRMED_TITLE_KEY,
      );
      message = text(EXTENSION_HOST_STOPPED_RESTARTED_MESSAGE_KEY);
    } else {
      title = text(EXTENSION_HOST_STOPPED_TITLE_KEY);
      message =
        notice.phase === 'restarting'
          ? text(EXTENSION_HOST_STOPPED_RESTARTING_KEY)
          : text(MESSAGE_KEY_BY_REASON[notice.reason]);
    }
    content = (
      <ExtensionHostStoppedBannerPresentational
        phase={notice.phase}
        isRestartConfirmed={isRestartConfirmed}
        title={title}
        message={message}
        restartExtensionsLabel={text(EXTENSION_HOST_STOPPED_RESTART_EXTENSIONS_KEY)}
        restartAppLabel={text(EXTENSION_HOST_STOPPED_RESTART_APP_KEY)}
        dismissLabel={text(EXTENSION_HOST_STOPPED_DISMISS_KEY)}
        onRestartExtensions={handleRestartExtensions}
        onRestartApp={handleRestartApp}
        onDismiss={handleDismiss}
      />
    );
  }

  return (
    <div
      ref={stripRef}
      data-testid={BANNER_TEST_ID}
      role="status"
      // Not in the tab order; focusable only so focus has somewhere to land when a phase change
      // takes away the button it was on.
      tabIndex={-1}
      className="tw:shrink-0"
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {content}
    </div>
  );
}

export default ExtensionHostStoppedBanner;
