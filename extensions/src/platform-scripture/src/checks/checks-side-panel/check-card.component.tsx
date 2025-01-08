import {
  Badge,
  Button,
  Card,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'platform-bible-react';
import { Check, MoreHorizontal, Settings, X } from 'lucide-react';
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

/** The FixedBadge component displays a badge indicating the "Fixed" state. */
export function FixedBadge() {
  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => ['%webView_checksSidePanel_fixedBadge_title%'], []),
  );

  return (
    <Badge
      variant="outline"
      className="tw-flex tw-items-center tw-justify-between tw-bg-white tw-w-20 tw-h-5 tw-shadow-sm tw-rounded-md"
    >
      <Check size={12} />
      <span className="tw-text-muted-foreground tw-text-xs tw-font-medium">
        {localizedStrings['%webView_checksSidePanel_fixedBadge_title%']}
      </span>
    </Badge>
  );
}

/** The DeniedBadge component displays a badge indicating the "Denied" state. */
export function DeniedBadge() {
  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => ['%webView_checksSidePanel_deniedBadge_title%'], []),
  );

  return (
    <Badge
      variant="outline"
      className="tw-flex tw-items-center tw-justify-between tw-bg-white tw-w-20 tw-h-5 tw-shadow-sm tw-rounded-md"
    >
      <X size={12} />
      <span className="tw-text-muted-foreground tw-text-xs tw-font-medium">
        {localizedStrings['%webView_checksSidePanel_deniedBadge_title%']}
      </span>
    </Badge>
  );
}

/** The CheckingBadge component displays a badge indicating the "Checking" state. */
export function CheckingBadge() {
  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => ['%webView_checksSidePanel_checkingBadge_title%'], []),
  );

  return (
    <Badge className="tw-flex tw-items-center tw-justify-center tw-bg-white tw-w-20 tw-h-5 tw-shadow-sm tw-rounded-md">
      <span className="tw-text-xs tw-font-medium">
        {localizedStrings['%webView_checksSidePanel_checkingBadge_title%']}
      </span>
    </Badge>
  );
}

/** Props for the FocusedCheckDropdown component. */
type FocusedCheckDropdownProps = {
  /** Callback for denying a check */
  handleAllowCheck: (result: CheckRunResult) => Promise<boolean>;
  /** Callback for denying a check */
  handleDenyCheck: (result: CheckRunResult) => Promise<boolean>;
  /** Callback for opening settings and inventories */
  handleOpenSettingsAndInventories: () => void;
  /** The result object containing check run details */
  checkResult: CheckRunResult;
};

/** Dropdown menu component for actions on a focused check. */
function FocusedCheckDropdown({
  handleAllowCheck,
  handleDenyCheck,
  handleOpenSettingsAndInventories,
  checkResult,
}: FocusedCheckDropdownProps) {
  const [localizedStrings] = useLocalizedStrings(
    useMemo(
      () => [
        '%webView_checksSidePanel_focusedCheckDropdown_allowItem%',
        '%webView_checksSidePanel_focusedCheckDropdown_denyItem%',
        '%webView_checksSidePanel_focusedCheckDropdown_settingsItem%',
      ],
      [],
    ),
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="tw-h-4 tw-w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {checkResult.isDenied ? (
          <DropdownMenuItem
            className="tw-flex tw-flex-row"
            onClick={(e) => {
              e.stopPropagation();
              handleAllowCheck(checkResult);
            }}
          >
            <X className="tw-mr-2 tw-h-4 tw-w-4" />
            <span>
              {localizedStrings['%webView_checksSidePanel_focusedCheckDropdown_allowItem%']}
            </span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            className="tw-flex tw-flex-row"
            onClick={(e) => {
              e.stopPropagation();
              handleDenyCheck(checkResult);
            }}
          >
            <X className="tw-mr-2 tw-h-4 tw-w-4" />
            <span>
              {localizedStrings['%webView_checksSidePanel_focusedCheckDropdown_denyItem%']}
            </span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          className="tw-flex tw-flex-row"
          onClick={(e) => {
            e.stopPropagation();
            handleOpenSettingsAndInventories();
          }}
        >
          <Settings className="tw-mr-2 tw-h-4 tw-w-4" />
          <span>
            {localizedStrings['%webView_checksSidePanel_focusedCheckDropdown_settingsItem%']}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/** Props for the CheckNotification component. */
type CheckTypeIndicatorProps = {
  /** Indicates whether the check notification should be appear muted */
  isMuted?: boolean;
  /** The type of the check to display */
  checkType: string;
};

/**
 * CheckNotification component displays a notification for a check, with different styles based on
 * whether it is muted or not
 */
function CheckTypeIndicator({ isMuted, checkType }: CheckTypeIndicatorProps) {
  return (
    <div className="pr-twp tw-flex tw-flex-row tw-items-center tw-gap-2">
      <Badge variant={isMuted ? 'mutedIndicator' : 'blueIndicator'} />
      <span className="tw-text-xs tw-text-gray-500">{checkType}</span>
    </div>
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
  /**
   * The title of the check
   *
   * @example 'MIC 4:1 Charge Charge'
   */
  checkTitle: string;
  /** A brief description of the check result. Optional. */
  checkDescription?: string;
  /** Callback function triggered to open the configure checks webview */
  handleOpenSettingsAndInventories: () => void;
  /** Whether or not to show the relevant badge */
  showBadge?: boolean;
};

/**
 * The CheckCard component displays a singe check with options to select, deny, or view settings.
 * The card styling changes based on the current check and selection status.
 */
export default function CheckCard({
  checkResult,
  checkId,
  isSelected,
  checkState,
  handleSelectCheck,
  handleAllowCheck,
  handleDenyCheck,
  checkTitle,
  checkDescription,
  handleOpenSettingsAndInventories,
  showBadge = false,
}: CheckCardProps) {
  const isFixedOrDenied = useMemo(
    () => checkState === CheckStates.Fixed || checkState === CheckStates.Denied,
    [checkState],
  );

  return (
    <Card
      onClick={() => handleSelectCheck(checkId)}
      className={cn(
        'pr-twp tw-w-full tw-flex tw-cursor-pointer tw-flex-col tw-items-flex-start tw-gap-3 tw-p-4 tw-rounded-lg hover:tw-shadow-xl tw-border-0',
        { 'tw-shadow-md': isSelected },
        { 'tw-bg-slate-100 tw-border-slate-100': !isSelected },
      )}
    >
      <div className="tw-flex tw-justify-between">
        <div className="tw-gap-1 tw-flex tw-flex-col">
          {checkState === CheckStates.Fixed && showBadge && <FixedBadge />}
          {checkState === CheckStates.Denied && showBadge && <DeniedBadge />}
          {checkState === CheckStates.Checking && showBadge && <CheckingBadge />}
          <span
            className={`tw-text-xs tw-font-medium ${isFixedOrDenied && 'tw-text-muted-foreground'}`}
          >
            {checkTitle}
          </span>
          <CheckTypeIndicator checkType={checkResult.checkResultType} isMuted={isFixedOrDenied} />
        </div>
        {isSelected && (
          <FocusedCheckDropdown
            handleOpenSettingsAndInventories={handleOpenSettingsAndInventories}
            handleDenyCheck={handleDenyCheck}
            handleAllowCheck={handleAllowCheck}
            checkResult={checkResult}
          />
        )}
      </div>
      {isSelected && checkDescription && (
        <span className="tw-text-xs tw-font-regular tw-text-muted-foreground">
          {checkDescription}
        </span>
      )}
    </Card>
  );
}
