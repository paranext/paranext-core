import { Button, Spinner } from 'platform-bible-react';
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
 * Full-panel "install failed" recovery state with a retry action. Shared by the Model Text and
 * Resource panels, which render an identical block and differ only in the localized strings they
 * resolve. The inline message is the single user-facing channel for an install failure (no
 * accompanying toast), so callers own the recovery affordance here rather than duplicating it.
 *
 * Only for failures a retry can actually act on. The settings-read failure deliberately does NOT
 * use this view: nothing in either panel can re-drive that read, so it renders a message alone (see
 * `PanelReadinessView`) rather than an inert button.
 *
 * @param message Already-localized failure message (callers vary it for the offline case).
 * @param retryLabel Already-localized label for the retry button.
 * @param onRetry Re-attempts the install for the same resource.
 */
export function InstallFailedView({
  message,
  retryLabel,
  onRetry,
}: {
  message: ReactNode;
  retryLabel: ReactNode;
  onRetry: () => void;
}) {
  return (
    <div className="tw:flex tw:h-screen tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:p-8 tw:text-center">
      <p>{message}</p>
      <Button onClick={() => onRetry()}>{retryLabel}</Button>
    </div>
  );
}
