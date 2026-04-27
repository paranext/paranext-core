import { Alert, AlertDescription, AlertTitle, Button, cn } from 'platform-bible-react';
import { formatReplacementString } from 'platform-bible-utils';
import type { LocalizedStringValue } from 'platform-bible-utils';
import { Info, X } from 'lucide-react';

/** Object containing all keys used for localization in this component. */
export const WARNING_RIBBONS_STRING_KEYS = Object.freeze([
  '%enhancedResources_ribbon_missingBook_title%',
  '%enhancedResources_ribbon_missingBook_description%',
  '%enhancedResources_ribbon_reviewStatus_title%',
  '%enhancedResources_ribbon_reviewStatus_description%',
  '%enhancedResources_ribbon_imageWarning_title%',
  '%enhancedResources_ribbon_imageWarning_description%',
  '%enhancedResources_ribbon_copyright_title%',
  '%enhancedResources_ribbon_copyright_description%',
  '%enhancedResources_ribbon_copyright_moreInfo%',
  '%enhancedResources_ribbon_metadata_title%',
  '%enhancedResources_ribbon_metadata_description%',
  '%enhancedResources_ribbon_metadata_actionLink%',
  '%enhancedResources_ribbon_updateAvailable_title%',
  '%enhancedResources_ribbon_updateAvailable_description%',
  '%enhancedResources_ribbon_updateAvailable_downloadDisabled%',
  '%enhancedResources_ribbon_dismiss%',
] as const);

type WarningRibbonsLocalizedStringKey = (typeof WARNING_RIBBONS_STRING_KEYS)[number];
type WarningRibbonsLocalizedStrings = {
  [key in WarningRibbonsLocalizedStringKey]?: LocalizedStringValue;
};

/**
 * Mirror of `MarbleFormState.ribbons` from ui-state-contracts.md. Each flag drives one ribbon.
 * `dismissed` marks user-initiated dismissal; the ribbon remains hidden when `visible &&
 * dismissed`.
 */
export type RibbonStates = {
  missingBook: boolean;
  reviewStatus: { visible: boolean; dismissed: boolean };
  imageWarning: boolean;
  copyright: { visible: boolean; dismissed: boolean };
  updateRequiredData: boolean;
  updateAvailable: { visible: boolean; dismissed: boolean };
};

export type WarningRibbonsProps = {
  /** Conditional ribbon visibility/dismissed flags. */
  ribbons: RibbonStates;
  /** Resource display name; substituted into the missingBook ribbon. */
  resourceName?: string;
  /** Dismiss handler for the (dismissable) review-status ribbon. */
  onDismissReviewStatus?: () => void;
  /** Dismiss handler for the (dismissable) copyright ribbon. */
  onDismissCopyright?: () => void;
  /** Dismiss handler for the (dismissable) update-available ribbon. */
  onDismissUpdateAvailable?: () => void;
  /** Handler for the copyright ribbon "More info..." link (opens overlay). */
  onCopyrightMoreInfo?: () => void;
  /** Handler for the metadata ribbon "here" link (kicks off metadata update). */
  onMetadataUpdate?: () => void;
  localizedStringsWithLoadingState?: [WarningRibbonsLocalizedStrings, boolean];
};

type RibbonShellProps = {
  variant?: 'destructive' | 'default';
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  /** When true the action button is rendered as disabled. */
  actionDisabled?: boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
  dismissLabel?: string;
};

function RibbonShell({
  variant = 'default',
  title,
  description,
  actionLabel,
  onAction,
  actionDisabled,
  dismissible,
  onDismiss,
  dismissLabel,
}: RibbonShellProps) {
  return (
    <Alert
      role="alert"
      variant={variant}
      className={cn(
        'tw-relative tw-flex tw-flex-col tw-gap-1 tw-rounded-none tw-border-x-0',
        dismissible ? 'tw-pe-9' : 'tw-pe-3',
      )}
    >
      <Info className="tw-h-4 tw-w-4" />
      <AlertTitle className="tw-text-sm">{title}</AlertTitle>
      <AlertDescription className="tw-flex tw-flex-wrap tw-items-center tw-gap-x-2 tw-text-xs">
        <span>{description}</span>
        {actionLabel && (
          <Button
            variant="link"
            className="tw-h-auto tw-p-0 tw-text-xs"
            disabled={actionDisabled}
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        )}
      </AlertDescription>
      {dismissible && (
        <Button
          variant="ghost"
          size="icon"
          aria-label={dismissLabel}
          onClick={onDismiss}
          className="tw-absolute tw-end-1 tw-top-1 tw-h-7 tw-w-7"
        >
          <X className="tw-h-4 tw-w-4" />
        </Button>
      )}
    </Alert>
  );
}

/**
 * Pure presentational stack of warning/info ribbons that appear above the scripture pane in the
 * Enhanced Resource window. Visibility is driven entirely by the `ribbons` prop; dismiss handlers
 * are wired by the parent.
 */
export function WarningRibbons({
  ribbons,
  resourceName = '',
  onDismissReviewStatus = () => {},
  onDismissCopyright = () => {},
  onDismissUpdateAvailable = () => {},
  onCopyrightMoreInfo = () => {},
  onMetadataUpdate = () => {},
  localizedStringsWithLoadingState = [{}, false],
}: WarningRibbonsProps) {
  const getLocalizedString = (key: WarningRibbonsLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const dismissLabel = String(getLocalizedString('%enhancedResources_ribbon_dismiss%'));

  const showReview = ribbons.reviewStatus.visible && !ribbons.reviewStatus.dismissed;
  const showCopyright = ribbons.copyright.visible && !ribbons.copyright.dismissed;
  const showUpdateAvailable = ribbons.updateAvailable.visible && !ribbons.updateAvailable.dismissed;

  if (
    !ribbons.missingBook &&
    !showReview &&
    !ribbons.imageWarning &&
    !showCopyright &&
    !ribbons.updateRequiredData &&
    !showUpdateAvailable
  ) {
    return undefined;
  }

  return (
    <div className="tw-flex tw-flex-col">
      {ribbons.missingBook && (
        <RibbonShell
          variant="destructive"
          title={String(getLocalizedString('%enhancedResources_ribbon_missingBook_title%'))}
          description={formatReplacementString(
            String(getLocalizedString('%enhancedResources_ribbon_missingBook_description%')),
            { resourceName },
          )}
        />
      )}
      {showReview && (
        <RibbonShell
          title={String(getLocalizedString('%enhancedResources_ribbon_reviewStatus_title%'))}
          description={String(
            getLocalizedString('%enhancedResources_ribbon_reviewStatus_description%'),
          )}
          dismissible
          dismissLabel={dismissLabel}
          onDismiss={onDismissReviewStatus}
        />
      )}
      {ribbons.imageWarning && (
        <RibbonShell
          title={String(getLocalizedString('%enhancedResources_ribbon_imageWarning_title%'))}
          description={String(
            getLocalizedString('%enhancedResources_ribbon_imageWarning_description%'),
          )}
        />
      )}
      {showCopyright && (
        <RibbonShell
          title={String(getLocalizedString('%enhancedResources_ribbon_copyright_title%'))}
          description={String(
            getLocalizedString('%enhancedResources_ribbon_copyright_description%'),
          )}
          actionLabel={String(getLocalizedString('%enhancedResources_ribbon_copyright_moreInfo%'))}
          onAction={onCopyrightMoreInfo}
          dismissible
          dismissLabel={dismissLabel}
          onDismiss={onDismissCopyright}
        />
      )}
      {ribbons.updateRequiredData && (
        <RibbonShell
          variant="destructive"
          title={String(getLocalizedString('%enhancedResources_ribbon_metadata_title%'))}
          description={String(
            getLocalizedString('%enhancedResources_ribbon_metadata_description%'),
          )}
          actionLabel={String(getLocalizedString('%enhancedResources_ribbon_metadata_actionLink%'))}
          onAction={onMetadataUpdate}
        />
      )}
      {showUpdateAvailable && (
        <RibbonShell
          title={String(getLocalizedString('%enhancedResources_ribbon_updateAvailable_title%'))}
          description={String(
            getLocalizedString('%enhancedResources_ribbon_updateAvailable_description%'),
          )}
          actionLabel={String(
            getLocalizedString('%enhancedResources_ribbon_updateAvailable_downloadDisabled%'),
          )}
          actionDisabled
          dismissible
          dismissLabel={dismissLabel}
          onDismiss={onDismissUpdateAvailable}
        />
      )}
    </div>
  );
}

export default WarningRibbons;
