import { Button, Spinner } from 'platform-bible-react';
import { ReactNode } from 'react';
import type { ResourcePanelReadiness } from './resource-panel-readiness.utils';
import { ErrorRetryView } from './install-state-views.component';

/**
 * Renders the front of a resource panel's state machine — everything before it has something to
 * display — from a single `readiness` value.
 *
 * Used by the Resource (Bible Texts / Commentaries) panel, which lives entirely in a web view with
 * no extracted component and so has no other seam these states can be tested through. The Model
 * Text panel renders the equivalent states inline; it is already a component with its own tests, so
 * it was left alone rather than churned. It could adopt this view if its props ever carry the list
 * status instead of separate loading/error booleans.
 *
 * Deciding these states inline is what went wrong in both panels: an empty prompt was rendered from
 * a value that was only meaningful once the data had arrived. Taking one `readiness` value makes
 * "which state is this?" answerable without re-deriving it from whatever is in scope.
 *
 * @param readiness Which front state to show; `configured` renders nothing so the caller continues
 *   to its own downstream branches.
 * @param errorMessage Already-localized message for an unreadable configured-resource setting.
 * @param emptyPrompt Already-localized prompt shown when nothing is configured.
 * @param pickLabel Already-localized label for the resource picker button.
 * @param retryLabel Already-localized label for the retry button.
 * @param onRetry Re-attempts reading the configured-resource setting.
 * @param onPick Opens the resource picker.
 */
export function PanelReadinessView({
  readiness,
  errorMessage,
  emptyPrompt,
  pickLabel,
  retryLabel,
  onRetry,
  onPick,
}: {
  readiness: ResourcePanelReadiness;
  errorMessage: ReactNode;
  emptyPrompt: ReactNode;
  pickLabel: ReactNode;
  retryLabel: ReactNode;
  onRetry: () => void;
  onPick: () => void;
}): ReactNode {
  // An unreadable setting is its own answer — never the empty prompt, which would invite the user
  // to replace a resource that may already be configured.
  if (readiness === 'error') {
    return <ErrorRetryView message={errorMessage} retryLabel={retryLabel} onRetry={onRetry} />;
  }

  if (readiness === 'loading') {
    return (
      <div className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:p-8 tw:text-center">
        <Spinner />
      </div>
    );
  }

  if (readiness === 'empty') {
    return (
      <div className="tw:flex tw:h-screen tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:p-8 tw:text-center">
        <p>{emptyPrompt}</p>
        <Button onClick={() => onPick()}>{pickLabel}</Button>
      </div>
    );
  }

  return undefined;
}

export default PanelReadinessView;
