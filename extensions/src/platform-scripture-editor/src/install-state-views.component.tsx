import { Button, Spinner } from 'platform-bible-react';
import { ReactNode, useId, useState } from 'react';

/**
 * Toggle button + collapsible body for empty-state "More info / Less info" disclosures. Shared by
 * the Model Text and Resource (Bible Texts) panels, which render an identical block and differ only
 * in the localized labels and body text they resolve. Uses `Button variant="link"` rather than a
 * raw `<button>` so it stays on the component system.
 *
 * @param moreLabel Already-localized label shown when the body is collapsed (e.g. "More info").
 * @param lessLabel Already-localized label shown when the body is expanded (e.g. "Less info").
 * @param body Already-localized body text revealed when expanded.
 */
export function ExpandableInfo({
  moreLabel,
  lessLabel,
  body,
}: {
  moreLabel: ReactNode;
  lessLabel: ReactNode;
  body: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const bodyId = useId();

  return (
    <>
      <Button
        variant="link"
        className="tw:h-auto tw:p-0 tw:text-sm"
        aria-expanded={isOpen}
        aria-controls={bodyId}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? lessLabel : moreLabel}
      </Button>
      <p id={bodyId} hidden={!isOpen} className="tw:text-sm tw:text-muted-foreground tw:max-w-xs">
        {body}
      </p>
    </>
  );
}

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
