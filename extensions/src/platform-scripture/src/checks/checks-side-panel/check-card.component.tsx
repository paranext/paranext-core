import { Badge, cn, DropdownMenuItem, ResultsCard } from 'platform-bible-react';
import { Check, Settings, X } from 'lucide-react';
import { useMemo } from 'react';
import { CheckRunResult } from 'platform-scripture';
import { useLocalizedStrings } from '@papi/frontend/react';

/** Enum representing the possible states of a check */
export enum CheckStates {
  /** Text does not match inventory/setting rules */
  DefaultFailed = 'DefaultFailed',
  /** Relevant text range or checking criteria have changed */
  Checking = 'Checking',
  /** Text now matches inventory/setting rules */
  Fixed = 'Fixed',
  /** Check has been denied/ignored by the user */
  Denied = 'Denied',
}

/** Props for CheckStateBadge component */
type CheckStateBadgeProps = {
  /** The check state to display */
  state: CheckStates.Fixed | CheckStates.Denied | CheckStates.Checking;
};

/** Generic badge component for displaying check states */
function CheckStateBadge({ state }: CheckStateBadgeProps) {
  const localizationKeys = useMemo(
    () => ({
      [CheckStates.Fixed]: '%webView_checksSidePanel_fixedBadge_title%' as const,
      [CheckStates.Denied]: '%webView_checksSidePanel_deniedBadge_title%' as const,
      [CheckStates.Checking]: '%webView_checksSidePanel_checkingBadge_title%' as const,
    }),
    [],
  );

  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => [localizationKeys[state]], [localizationKeys, state]),
  );

  const isOutlineVariant = state === CheckStates.Fixed || state === CheckStates.Denied;

  return (
    <Badge variant={isOutlineVariant ? 'outline' : undefined} className="tw-rounded-md">
      <span
        className={`tw-text-xs tw-font-medium ${isOutlineVariant ? 'tw-text-muted-foreground' : ''}`}
      >
        {localizedStrings[localizationKeys[state]]}
      </span>
    </Badge>
  );
}

/** Props for the CheckCard component */
export type CheckCardProps = {
  /** Object containing the check result details */
  checkResult: CheckRunResult;
  /** Unique identifier of the check */
  checkId: string;
  /** Indicates if the check is currently selected in the list */
  isSelected: boolean;
  /** The current state of the check. */
  checkState: CheckStates;
  /** Callback function triggered when the check is selected */
  handleSelectCheck: (checkTitle: string) => void;
  /** Callback for denying a check */
  handleAllowCheck: (result: CheckRunResult) => Promise<boolean>;
  /** Callback function triggered when the check is denied */
  handleDenyCheck: (result: CheckRunResult) => Promise<boolean>;
  /** The title of the card */
  checkCardTitle: string;
  /** A brief description of the check result. Optional. */
  checkCardDescription?: string;
  /** Callback function triggered to open the configure checks webview */
  handleOpenSettingsAndInventories: () => void;
  /** Whether or not to show the relevant badge */
  showBadge?: boolean;
  /** Description or LocalizeKey of the description of the check to display in UI */
  checkName: string;
  /** Whether the check is fully set up or not */
  isCheckSetup?: boolean;
  /** Additional class names for custom styling */
  className?: string;
};

/**
 * The CheckCard component displays a singe check with options to select, deny, or view settings.
 * The card styling changes based on the current check and selection status.
 */
export function CheckCard({
  checkResult,
  checkId,
  isSelected,
  checkState,
  handleSelectCheck,
  handleAllowCheck,
  handleDenyCheck,
  checkCardTitle,
  checkCardDescription,
  handleOpenSettingsAndInventories,
  showBadge = false,
  checkName,
  isCheckSetup = true,
  className,
}: CheckCardProps) {
  const [localizedStrings] = useLocalizedStrings(
    useMemo(
      () => [
        '%webView_checksSidePanel_checkRequiresSetup%',
        '%webView_checksSidePanel_focusedCheckDropdown_allowItem%',
        '%webView_checksSidePanel_focusedCheckDropdown_denyItem%',
        '%webView_checksSidePanel_focusedCheckDropdown_settingsItem%',
      ],
      [],
    ),
  );

  const isFixedOrDenied = useMemo(
    () => checkState === CheckStates.Fixed || checkState === CheckStates.Denied,
    [checkState],
  );

  const dropdownContent = (
    <>
      <DropdownMenuItem
        className="tw-flex tw-flex-row"
        onClick={(event) => {
          event.stopPropagation();
          if (checkResult.isDenied) handleAllowCheck(checkResult);
          else handleDenyCheck(checkResult);
        }}
      >
        {checkResult.isDenied ? (
          <Check className="tw-mr-2 tw-h-4 tw-w-4" />
        ) : (
          <X className="tw-mr-2 tw-h-4 tw-w-4" />
        )}
        <span>
          {
            localizedStrings[
              checkResult.isDenied
                ? '%webView_checksSidePanel_focusedCheckDropdown_allowItem%'
                : '%webView_checksSidePanel_focusedCheckDropdown_denyItem%'
            ]
          }
        </span>
      </DropdownMenuItem>
      <DropdownMenuItem
        /**
         * This menu item is hidden until https://paratextstudio.atlassian.net/browse/PT-3309 gets
         * implemented
         */
        className="tw-hidden"
        onClick={(event) => {
          event.stopPropagation();
          handleOpenSettingsAndInventories();
        }}
      >
        <Settings className="tw-mr-2 tw-h-4 tw-w-4" />
        <span>
          {localizedStrings['%webView_checksSidePanel_focusedCheckDropdown_settingsItem%']}
        </span>
      </DropdownMenuItem>
    </>
  );

  const additionalSelectedContent = useMemo(
    () => (
      <Badge className="tw-block tw-min-w-0 tw-max-w-full tw-truncate tw-rounded-md tw-bg-blue-500">
        {checkName}
      </Badge>
    ),
    [checkName],
  );

  const cardContent = (
    <div className={cn('tw-flex tw-flex-col tw-gap-2', className)}>
      <div className="tw-flex tw-items-center tw-gap-2 tw-overflow-hidden">
        <span className="tw-shrink-0 tw-text-nowrap tw-text-xs tw-font-medium">
          {checkCardTitle}
        </span>
        {showBadge &&
          (checkState === CheckStates.Fixed ||
            checkState === CheckStates.Denied ||
            checkState === CheckStates.Checking) && <CheckStateBadge state={checkState} />}
        {isCheckSetup && (
          <Badge
            key={`${checkId}-requires-setup-badge`}
            className="tw-block tw-min-w-0 tw-max-w-full tw-truncate tw-rounded-md"
            variant="secondary"
          >
            {localizedStrings['%webView_checksSidePanel_checkRequiresSetup%']}
          </Badge>
        )}
      </div>
      <span className="tw-font-regular tw-overflow-hidden tw-text-ellipsis tw-text-xs tw-text-muted-foreground">
        {checkCardDescription}
      </span>
    </div>
  );

  return (
    <ResultsCard
      cardKey={checkId}
      isSelected={isSelected}
      onSelect={() => handleSelectCheck(checkId)}
      isDenied={isFixedOrDenied}
      dropdownContent={dropdownContent}
      additionalSelectedContent={additionalSelectedContent}
    >
      {cardContent}
    </ResultsCard>
  );
}

export default CheckCard;
