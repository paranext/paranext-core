import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  Spinner,
} from 'platform-bible-react';
import { AlertTriangle } from 'lucide-react';
import { ReactNode } from 'react';

/**
 * Full-panel loading state: a spinner beside a label saying what is being waited on. Shared by the
 * Model Text and Resource (Bible Texts / Commentaries) panels, which render an identical block and
 * differ only in the localized label they resolve.
 *
 * The label is required rather than optional on purpose. `Spinner` is a bare `LoaderCircle` SVG
 * with no `role` or accessible name, so an unlabelled spinner announces nothing to assistive tech
 * and tells a sighted user nothing either — and these panels can now wait through a whole resource
 * catalog fetch, so that silence is not brief.
 *
 * @param label Already-localized status text shown next to the spinner (e.g. "Installing
 *   resource…"). Doubles as the state's accessible name.
 */
export function LoadingView({ label }: { label: ReactNode }) {
  return (
    <div
      className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:gap-2 tw:p-8 tw:text-center"
      role="status"
    >
      <Spinner aria-hidden />
      <span>{label}</span>
    </div>
  );
}

/**
 * Full-panel error state with a retry action, for any failure a retry can actually act on — a
 * failed install, or a failed resource-catalog fetch. Shared by the Model Text and Resource panels,
 * which render an identical block and differ only in the localized strings they resolve. The inline
 * message is the single user-facing channel for these failures (no accompanying toast), so callers
 * own the recovery affordance here rather than duplicating it.
 *
 * The settings-read failure deliberately does NOT use this view: nothing in either panel can
 * re-drive that read, so it renders a message alone (see `PanelReadinessView`) rather than offering
 * an inert button.
 *
 * Composes the shadcn `Empty` primitive per ADR-0016 rather than hand-rolling a container, and
 * carries `role="alert"` so a screen-reader user sitting on the panel is told when it flips out of
 * the loading state, which announces through its own live region.
 *
 * The icon is the state's visual signature. Without one this and the pick prompt render as the same
 * centred text plus a button — two identical screens whose buttons do opposite things (retry vs.
 * reconfigure), which is the confusion AC-4 asks these states to avoid.
 *
 * @param message Already-localized failure message (callers vary it per failure and for offline).
 * @param retryLabel Already-localized label for the retry button.
 * @param onRetry Re-attempts whatever failed — the install, or the catalog fetch.
 * @param icon Overrides the default warning glyph so distinct failures stay distinguishable.
 */
export function RetryableErrorView({
  message,
  retryLabel,
  onRetry,
  icon,
}: {
  message: ReactNode;
  retryLabel: ReactNode;
  onRetry: () => void;
  icon?: ReactNode;
}) {
  return (
    <Empty className="tw:h-screen" role="alert">
      <EmptyHeader>
        <EmptyMedia variant="icon">{icon ?? <AlertTriangle />}</EmptyMedia>
        <EmptyDescription>{message}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={() => onRetry()}>{retryLabel}</Button>
      </EmptyContent>
    </Empty>
  );
}
