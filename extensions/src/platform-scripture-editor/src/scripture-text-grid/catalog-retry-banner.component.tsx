import { CloudOff } from 'lucide-react';
import { Alert, AlertDescription, Button, Spinner } from 'platform-bible-react';

/** Props for {@link CatalogRetryBanner}. */
export type CatalogRetryBannerProps = {
  /** Localized explanation of what failed. */
  message: string | undefined;
  /** Localized retry button label. */
  retryLabel: string | undefined;
  /** Re-runs the failed fetches. */
  onRetry: () => void;
  /** Whether a retry is in flight; the button is inert (but stays focusable) meanwhile. */
  isRetrying?: boolean;
};

/**
 * A non-blocking notice above the grid rows when some cells could not check whether their text is
 * installed. Unlike `RetryableErrorView`, which replaces the whole body, it leaves the resolved
 * rows visible.
 *
 * Not a live region itself: render it inside one that stays mounted, so its appearance is
 * announced.
 */
export function CatalogRetryBanner({
  message,
  retryLabel,
  onRetry,
  isRetrying = false,
}: CatalogRetryBannerProps) {
  return (
    // `Alert` sets its own assertive `role`, which would nest a second live region in the caller's.
    <Alert role={undefined} className="tw:m-2 tw:w-auto">
      <CloudOff />
      <AlertDescription className="tw:flex tw:flex-wrap tw:items-center tw:gap-x-2">
        <span>{message}</span>
        {/* `aria-disabled` instead of `disabled`: a focused, truly-disabled button loses focus to
        the document body the instant it becomes disabled, which would drop keyboard focus off
        Retry mid-click. The click is a no-op instead, and the dimming below mirrors `disabled`'s
        look since Button has no built-in `aria-disabled:` styling. */}
        <Button
          onClick={() => {
            if (!isRetrying) onRetry();
          }}
          aria-disabled={isRetrying}
          className="tw:aria-disabled:pointer-events-none tw:aria-disabled:opacity-50"
        >
          {isRetrying && <Spinner aria-hidden />}
          {retryLabel}
        </Button>
      </AlertDescription>
    </Alert>
  );
}

export default CatalogRetryBanner;
