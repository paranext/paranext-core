import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  Z_INDEX_CONNECTION_LOST,
} from 'platform-bible-react';
import { formatReplacementString, LocalizeKey } from 'platform-bible-utils';
import { TriangleAlert } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { useIsPowerMode } from '@renderer/hooks/use-is-power-mode.hook';
import { getToolbarHeight } from '@renderer/components/toolbar-height.util';
import {
  getIsConnectionLost,
  subscribeToConnectionLost,
} from '@renderer/services/connection-lost-store';

// Declared without a `LocalizeKey` annotation so each keeps its literal type, which is what makes
// `ConnectionLostKey` below a union of these exact keys rather than plain `string`.
export const CONNECTION_LOST_TITLE_KEY = '%overlay_connectionLostTitle%' satisfies LocalizeKey;
export const CONNECTION_LOST_MESSAGE_KEY = '%overlay_connectionLost%' satisfies LocalizeKey;
/**
 * Deliberately "Reload anyway" rather than a bare "Reload". Reloading discards whatever the message
 * just warned may be unsaved, and the scrim means the user cannot even copy that text out first, so
 * the label has to carry the consequence — a control that discards work must state or confirm that
 * (see the `Guidelines/Applying Changes` Storybook page). A confirm step was the alternative and
 * was rejected: a second dialog in a state where nothing else works is one more thing to get stuck
 * in.
 */
export const CONNECTION_LOST_RELOAD_KEY = '%overlay_connectionLostReload%' satisfies LocalizeKey;
/**
 * Referenced as `{%product_name%}` inside the message, and expanded by `formatReplacementString`,
 * so the app name lives in one place and swaps cleanly for Paratext 10 Studio. Fetched alongside
 * the message rather than hardcoded for the same reason every other product-named string is.
 */
export const PRODUCT_NAME_KEY = '%product_name%' satisfies LocalizeKey;

/** Every localization key this component requests. */
export type ConnectionLostKey =
  | typeof CONNECTION_LOST_TITLE_KEY
  | typeof CONNECTION_LOST_MESSAGE_KEY
  | typeof CONNECTION_LOST_RELOAD_KEY
  | typeof PRODUCT_NAME_KEY;

/**
 * Every key this component renders. Exported so the localization-parity test asserts against the
 * list the component actually reads, rather than a hand-copied duplicate that silently stops
 * matching the moment a key is added here.
 */
export const LOCALIZED_STRING_KEYS: ConnectionLostKey[] = [
  CONNECTION_LOST_MESSAGE_KEY,
  CONNECTION_LOST_RELOAD_KEY,
  CONNECTION_LOST_TITLE_KEY,
  PRODUCT_NAME_KEY,
];

/**
 * English text shown when a key has no resolved translation, matching the `en.json` entries. This
 * component is the one place in the app where an unresolved string cannot simply be waited out:
 * `useLocalizedStrings` fetches over PAPI and returns the raw key both while loading and on any
 * error, and PAPI is unreachable exactly when this component matters — so a socket that dies before
 * localization has resolved would otherwise show the user a literal `%overlay_connectionLost%`.
 *
 * Keyed by `ConnectionLostKey` rather than `string`, so a key added above without a fallback here
 * is a compile error instead of an `undefined` rendered to the user. Exported so
 * `overlay-connection-lost.localization.test.ts` can assert these match `en.json` — this is the
 * copy the user actually sees in the failure case, so it must not drift from the shipped English.
 */
export const ENGLISH_FALLBACKS: { [K in ConnectionLostKey]: string } = {
  [CONNECTION_LOST_TITLE_KEY]: 'Connection lost',
  [CONNECTION_LOST_MESSAGE_KEY]:
    "{%product_name%} can't reach the rest of the app. Anything you changed just now may not be saved.",
  [CONNECTION_LOST_RELOAD_KEY]: 'Reload anyway',
  [PRODUCT_NAME_KEY]: 'Platform.Bible',
};

/**
 * The localization service returns the key itself when a string is unresolved, and every key is
 * `%`-wrapped, so a value that still looks like its own key has not resolved.
 */
function localizedOrEnglish(key: ConnectionLostKey, value: string | undefined) {
  if (!value || value === key) return ENGLISH_FALLBACKS[key];
  return value;
}

type Props = {
  title: string;
  message: string;
  reloadLabel: string;
  isPowerMode: boolean;
  onReload: () => void;
};

/**
 * Overrides `DialogContent`'s centered rounded card into a full-viewport translucent scrim.
 *
 * `Z_INDEX_CONNECTION_LOST` (800) is above every other layer, but `DialogContent`'s own backdrop
 * renders at `Z_INDEX_MODAL_BACKDROP` (450) and takes no `style`, so it cannot be raised to match.
 * The content itself therefore has to be the scrim: full-viewport and translucent rather than a
 * card, with the banner positioned inside it. `FirstRunOverlay` overrides the same card the same
 * way, for the same reason.
 */
const FULL_SCREEN_SCRIM_CONTENT =
  'tw:fixed tw:inset-0 tw:top-0 tw:start-0 tw:block tw:h-screen tw:w-screen tw:max-w-none tw:sm:max-w-none tw:translate-x-0 tw:rtl:translate-x-0 tw:translate-y-0 tw:gap-0 tw:rounded-none tw:bg-background/70 tw:p-0 tw:ring-0';

/**
 * The connection-lost state: a banner naming the problem, over a scrim that covers the whole
 * window.
 *
 * The scrim covers the toolbar as well as the dock, because every toolbar control reaches the rest
 * of the app over the websocket that just died — leaving them clickable would let the user go on
 * pressing controls that silently do nothing, which is the failure this state exists to end. A
 * scrim stops pointers but not keyboards, so this is a Radix modal dialog: it supplies the focus
 * trap that keeps Tab on Reload, and focuses Reload on open. Escape and interact-outside are
 * prevented, since nothing behind this state works.
 *
 * The alternatives considered and rejected — a hand-rolled `document` keydown trap (blind to
 * keydowns inside a web view's iframe), and letting content behind the scrim stay selectable — are
 * recorded in `adr-connection-lost-is-renderer-local` in
 * `.context/standards/Architecture-Decisions.md`.
 */
export function ConnectionLostOverlayPresentational({
  title,
  message,
  reloadLabel,
  isPowerMode,
  onReload,
}: Props) {
  return (
    <Dialog open onOpenChange={() => {}}>
      <DialogContent
        data-testid="connection-lost-dialog"
        // `alertdialog` rather than `dialog`: this interrupts the user with an error they did not
        // ask about, rather than presenting a task they chose to start.
        role="alertdialog"
        showCloseButton={false}
        className={FULL_SCREEN_SCRIM_CONTENT}
        style={{ zIndex: Z_INDEX_CONNECTION_LOST }}
        onEscapeKeyDown={(event) => event.preventDefault()}
        onPointerDownOutside={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
      >
        <div
          data-testid="connection-lost-banner"
          // The banner sits directly over the editor's own toolbar row, so the destructive tint
          // alone would let that row show through and collide with the banner's text.
          // `tw:bg-background` here gives the tint an opaque ground to composite over, so the banner
          // reads as solid while still carrying the destructive tone on top of it — rather than
          // reaching for a fully saturated `tw:bg-destructive`, which would flatten the text
          // contrast this tint is tuned for.
          className="tw:absolute tw:inset-x-0 tw:bg-background"
          style={{ top: getToolbarHeight(isPowerMode) }}
        >
          <Alert
            variant="destructive"
            // `Alert` sets `role="alert"` for standalone use. Here the enclosing `alertdialog`
            // already announces this text through the title and description below, so leaving the
            // live region in place would announce it twice. Spread last, so this wins.
            role={undefined}
            // A full-width strip below the toolbar rather than a floating card: no rounding, and
            // borders only where the strip meets the content above and below it. The tint replaces
            // the variant's `tw:bg-card` so the destructive tone reads across the whole strip.
            className="tw:rounded-none tw:border-x-0 tw:border-destructive/40 tw:bg-destructive/10 tw:px-3"
          >
            <TriangleAlert aria-hidden="true" />
            {/* `asChild` so the dialog's accessible name and description ARE the banner's own title
                and message, rather than a visually-hidden second copy that could drift from them. */}
            <DialogTitle asChild>
              <AlertTitle>{title}</AlertTitle>
            </DialogTitle>
            <DialogDescription asChild>
              <AlertDescription>{message}</AlertDescription>
            </DialogDescription>
            <AlertAction>
              <Button variant="outline" size="sm" onClick={onReload}>
                {reloadLabel}
              </Button>
            </AlertAction>
          </Alert>
        </div>
      </DialogContent>
    </Dialog>
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
 * the wrong toolbar height. {@link localizedOrEnglish} backs that up for the case where the socket
 * dies before localization has answered at all.
 *
 * Why this whole path uses no PAPI is recorded in `adr-connection-lost-is-renderer-local` in
 * `.context/standards/Architecture-Decisions.md`.
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
      title={localizedOrEnglish(
        CONNECTION_LOST_TITLE_KEY,
        localizedStrings[CONNECTION_LOST_TITLE_KEY],
      )}
      // The message carries `{%product_name%}`; expanding it here means the app name comes from
      // localization in the resolved case and from the English fallback otherwise, so neither path
      // renders a raw placeholder.
      message={formatReplacementString(
        localizedOrEnglish(
          CONNECTION_LOST_MESSAGE_KEY,
          localizedStrings[CONNECTION_LOST_MESSAGE_KEY],
        ),
        {
          [PRODUCT_NAME_KEY]: localizedOrEnglish(
            PRODUCT_NAME_KEY,
            localizedStrings[PRODUCT_NAME_KEY],
          ),
        },
      )}
      reloadLabel={localizedOrEnglish(
        CONNECTION_LOST_RELOAD_KEY,
        localizedStrings[CONNECTION_LOST_RELOAD_KEY],
      )}
      isPowerMode={isPowerMode}
      onReload={handleReload}
    />,
    document.body,
  );
}

export default ConnectionLostOverlay;
