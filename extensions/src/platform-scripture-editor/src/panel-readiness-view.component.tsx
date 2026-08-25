import {
  Button,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
} from 'platform-bible-react';
import { AlertTriangle, BookOpen, CloudOff } from 'lucide-react';
import { ReactNode } from 'react';
import type { ResourcePanelReadiness } from './resource-panel-readiness.utils';
import { RetryableErrorView, LoadingView } from './panel-state-views.component';

/**
 * Renders the front of a resource panel's state machine — everything before it has something to
 * display — from a single `readiness` value.
 *
 * Used by BOTH the Resource (Bible Texts / Commentaries) and Model Text panels, so neither can
 * drift from the other on the question that caused this bug. Keeping the states here also gives the
 * Resource panel its only testable seam for them: it lives entirely in a web view with no extracted
 * component.
 *
 * Deciding these states inline is what went wrong in both panels: an empty prompt was rendered from
 * a value that was only meaningful once the data had arrived. Taking one `readiness` value makes
 * "which state is this?" answerable without re-deriving it from whatever is in scope.
 *
 * Each state carries its own icon, which is what makes them distinguishable at a glance (AC-4). The
 * pick prompt and the catalog error are otherwise the same shape — text plus a button — but their
 * buttons do opposite things, so telling them apart matters more than it looks.
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
 * @param moreInfo Optional disclosure rendered between the empty prompt and the pick button, for
 *   panels whose prompt alone does not explain what the user is being asked to choose. Omitted
 *   where the prompt is self-explanatory, so the empty state stays as short as it can be.
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
  moreInfo,
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
  moreInfo?: ReactNode;
  pickLabel: ReactNode;
  retryLabel: ReactNode;
  onPick: () => void;
  onRetryCatalog: () => void;
}): ReactNode {
  // An unreadable setting is its own answer — never the empty prompt, which would invite the user
  // to replace a resource that may already be configured.
  if (readiness === 'error') {
    return (
      <Empty className="tw:h-screen" role="alert">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <AlertTriangle />
          </EmptyMedia>
          <EmptyDescription>{errorMessage}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  // A failed catalog fetch, unlike an unreadable setting, can genuinely be re-driven — so this
  // state gets a control and the settings error does not.
  if (readiness === 'catalogError') {
    return (
      <RetryableErrorView
        message={catalogErrorMessage}
        retryLabel={retryLabel}
        onRetry={onRetryCatalog}
        icon={<CloudOff />}
      />
    );
  }

  if (readiness === 'loading') return <LoadingView label={loadingLabel} />;

  if (readiness === 'empty') {
    return (
      <Empty className="tw:h-screen">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <BookOpen />
          </EmptyMedia>
          <EmptyDescription>{emptyPrompt}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          {moreInfo}
          <Button onClick={() => onPick()}>{pickLabel}</Button>
        </EmptyContent>
      </Empty>
    );
  }

  return undefined;
}

export default PanelReadinessView;
