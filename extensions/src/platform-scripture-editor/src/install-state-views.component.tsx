import { Button, Spinner } from 'platform-bible-react';
import { ReactNode } from 'react';

/**
 * Full-panel "installing/selecting a resource" spinner state. Shared by the Model Text and Resource
 * (Bible Texts / Commentaries) panels, which render an identical block and differ only in the
 * localized label they resolve. The caller resolves and passes the label so this stays free of any
 * panel-specific string keys.
 *
 * @param label Already-localized status text shown next to the spinner (e.g. "Installing
 *   resource…").
 */
export function InstallingView({ label }: { label: ReactNode }) {
  return (
    <div className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:gap-2 tw:p-8 tw:text-center">
      <Spinner />
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
