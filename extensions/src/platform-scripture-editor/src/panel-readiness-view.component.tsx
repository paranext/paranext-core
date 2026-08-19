import { Button } from 'platform-bible-react';
import { ReactNode } from 'react';
import type { ResourcePanelReadiness } from './resource-panel-readiness.utils';
import { InstallFailedView, LoadingView } from './panel-state-views.component';

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
 *   Carries the recovery expectation itself, because this state offers no control: nothing here can
 *   re-drive the project-setting read, so a retry button would be inert. The setting stays watched
 *   and the panel recovers on its own once it becomes readable.
 * @param catalogErrorMessage Already-localized message for a failed resource-catalog fetch. Unlike
 *   the settings error this one IS recoverable, so it is paired with a working retry.
 * @param loadingLabel Already-localized status text shown beside the loading spinner.
 * @param emptyPrompt Already-localized prompt shown when nothing is configured.
 * @param pickLabel Already-localized label for the resource picker button.
 * @param retryLabel Already-localized label for the catalog retry button.
 * @param onPick Opens the resource picker.
 * @param onRetryCatalog Re-runs the resource-catalog fetch.
 */
export function PanelReadinessView({
  readiness,
  errorMessage,
  catalogErrorMessage,
  loadingLabel,
  emptyPrompt,
  pickLabel,
  retryLabel,
  onPick,
  onRetryCatalog,
}: {
  readiness: ResourcePanelReadiness;
  errorMessage: ReactNode;
  catalogErrorMessage: ReactNode;
  loadingLabel: ReactNode;
  emptyPrompt: ReactNode;
  pickLabel: ReactNode;
  retryLabel: ReactNode;
  onPick: () => void;
  onRetryCatalog: () => void;
}): ReactNode {
  // An unreadable setting is its own answer — never the empty prompt, which would invite the user
  // to replace a resource that may already be configured.
  if (readiness === 'error') {
    return (
      <div className="tw:flex tw:h-screen tw:items-center tw:justify-center tw:p-8 tw:text-center">
        <p>{errorMessage}</p>
      </div>
    );
  }

  // A failed catalog fetch, unlike an unreadable setting, can genuinely be re-driven — so this
  // state gets a control and the settings error does not.
  if (readiness === 'catalogError') {
    return (
      <InstallFailedView
        message={catalogErrorMessage}
        retryLabel={retryLabel}
        onRetry={onRetryCatalog}
      />
    );
  }

  if (readiness === 'loading') return <LoadingView label={loadingLabel} />;

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
