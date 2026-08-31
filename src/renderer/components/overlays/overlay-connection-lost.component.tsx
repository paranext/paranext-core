import { Button, Z_INDEX_CONNECTION_LOST } from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import { AlertTriangle } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { useIsPowerMode } from '@renderer/hooks/use-is-power-mode.hook';
import {
  getIsConnectionLost,
  subscribeToConnectionLost,
} from '@renderer/services/connection-lost-store';

export const CONNECTION_LOST_TITLE_KEY: LocalizeKey = '%overlay_connectionLostTitle%';
export const CONNECTION_LOST_MESSAGE_KEY: LocalizeKey = '%overlay_connectionLost%';
export const CONNECTION_LOST_RELOAD_KEY: LocalizeKey = '%overlay_connectionLostReload%';

/**
 * Every key this component renders. Exported so the localization-parity test asserts against the
 * list the component actually reads, rather than a hand-copied duplicate that silently stops
 * matching the moment a key is added here.
 */
export const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  CONNECTION_LOST_MESSAGE_KEY,
  CONNECTION_LOST_RELOAD_KEY,
  CONNECTION_LOST_TITLE_KEY,
];

/** Toolbar heights the banner sits below — `tw:h-12` in Power mode, `tw:h-14` in Simple. */
const POWER_MODE_TOOLBAR_HEIGHT = 48;
const SIMPLE_MODE_TOOLBAR_HEIGHT = 56;

type Props = {
  title: string;
  message: string;
  reloadLabel: string;
  isPowerMode: boolean;
  onReload: () => void;
};

/**
 * The connection-lost state: a banner naming the problem, over a scrim that covers the whole
 * window.
 *
 * The scrim deliberately covers the toolbar as well as the dock. Every toolbar control — project
 * selector, reference, sync, menus — reaches the rest of the app over the websocket that just died,
 * so leaving them clickable would let the user go on pressing controls that silently do nothing,
 * which is the failure this state exists to end. Content behind the scrim stays readable but is not
 * selectable; that is the accepted cost of blocking interaction with a single layer.
 */
export function ConnectionLostOverlayPresentational({
  title,
  message,
  reloadLabel,
  isPowerMode,
  onReload,
}: Props) {
  // React refs passed to DOM elements must be initialized with null, not undefined.
  // eslint-disable-next-line no-null/no-null
  const reloadRef = useRef<HTMLButtonElement>(null);

  // Reload is the only control that still works, so it is where focus belongs. This component
  // mounts at the moment the connection drops, so focusing on mount is focusing on appearance.
  useEffect(() => {
    reloadRef.current?.focus();
  }, []);

  return (
    <div className="pr-twp">
      <div className="tw:fixed tw:inset-0" style={{ zIndex: Z_INDEX_CONNECTION_LOST }}>
        <div
          aria-hidden="true"
          data-testid="connection-lost-scrim"
          className="tw:absolute tw:inset-0 tw:bg-background/70"
        />
        <div
          role="alert"
          className="tw:absolute tw:inset-x-0 tw:flex tw:items-center tw:gap-3 tw:border-y tw:border-destructive/40 tw:bg-destructive/10 tw:px-3 tw:py-2 tw:text-sm tw:text-destructive"
          style={{ top: isPowerMode ? POWER_MODE_TOOLBAR_HEIGHT : SIMPLE_MODE_TOOLBAR_HEIGHT }}
        >
          <AlertTriangle aria-hidden="true" className="tw:shrink-0" />
          <span className="tw:font-medium">{title}</span>
          <span className="tw:min-w-0">{message}</span>
          <div className="tw:grow" />
          <Button ref={reloadRef} variant="outline" size="sm" onClick={onReload}>
            {reloadLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * The connection-lost state, wired to the store.
 *
 * Mounted unconditionally from app startup and rendering nothing until the connection drops. That
 * is load-bearing, not stylistic: `useLocalizedStrings` and `useIsPowerMode` both read over PAPI,
 * and PAPI is exactly what has broken by the time this state is needed. Mounted from startup, both
 * resolve while the connection is alive and their values persist afterwards. Mounted on the
 * disconnect, both would fail — showing the user a raw `%overlay_connectionLost%`, positioned for
 * the wrong toolbar height.
 */
export function ConnectionLostOverlay() {
  const [isConnectionLost, setIsConnectionLost] = useState(getIsConnectionLost);

  const syncState = useCallback(() => {
    setIsConnectionLost(getIsConnectionLost());
  }, []);

  useEffect(() => {
    syncState();
    return subscribeToConnectionLost(syncState);
  }, [syncState]);

  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);
  const isPowerMode = useIsPowerMode();

  const handleReload = useCallback(() => {
    // Straight to the browser: a command or a main-process round trip would travel over the socket
    // that just died. A page load also reruns every method registration this renderer made, which
    // is what makes a reload a real recovery rather than a cosmetic one.
    window.location.reload();
  }, []);

  if (!isConnectionLost) return undefined;

  // Bypasses OverlayHost intentionally, as WorkspaceUpdatingOverlay does: this state must cover the
  // whole window rather than take its place in the overlay stack.
  return createPortal(
    <ConnectionLostOverlayPresentational
      title={localizedStrings[CONNECTION_LOST_TITLE_KEY]}
      message={localizedStrings[CONNECTION_LOST_MESSAGE_KEY]}
      reloadLabel={localizedStrings[CONNECTION_LOST_RELOAD_KEY]}
      isPowerMode={isPowerMode}
      onReload={handleReload}
    />,
    document.body,
  );
}

export default ConnectionLostOverlay;
