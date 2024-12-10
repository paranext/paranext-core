import {
  Badge,
  Button,
  Card,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'platform-bible-react';
import { Check, MoreHorizontal, Settings, X } from 'lucide-react';
import { useMemo } from 'react';
// import { LocalizeKey } from 'platform-bible-utils';
import papi from '@papi/frontend';

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

// TODO Fix width and background color (inheriting from Card)
/** The FixedBadge component displays a badge indicating the "Fixed" state. */
export function FixedBadge() {
  const [localizedString] = papi.react.useLocalizedStrings([
    '%webView_checksSidePanel_fixedBadge_title%',
  ]);

  return (
    <Badge
      style={{ backgroundColor: '#FFFFFF' }}
      variant="outline"
      className="tw-flex tw-items-center tw-justify-between tw-w-20 tw-h-5 tw-shadow-sm tw-rounded-md"
    >
      <Check size={12} />
      <span className="tw-text-muted-foreground tw-text-xs tw-font-medium">
        {localizedString['%webView_checksSidePanel_fixedBadge_title%']}
      </span>
    </Badge>
  );
}

// TODO Fix width and background color (inheriting from Card)
/** The DeniedBadge component displays a badge indicating the "Denied" state. */
export function DeniedBadge() {
  const [localizedString] = papi.react.useLocalizedStrings([
    '%webView_checksSidePanel_deniedBadge_title%',
  ]);

  return (
    <Badge
      style={{ backgroundColor: '#FFFFFF' }}
      variant="outline"
      className="tw-flex tw-items-center tw-justify-between tw-w-20 tw-h-5 tw-shadow-sm tw-rounded-md"
    >
      <X size={12} />
      <span className="tw-text-muted-foreground tw-text-xs tw-font-medium">
        {localizedString['%webView_checksSidePanel_deniedBadge_title%']}
      </span>
    </Badge>
  );
}

// TODO Check height, weight, shadow strength
/** The CheckingBadge component displays a badge indicating the "Checking" state. */
export function CheckingBadge() {
  const [localizedString] = papi.react.useLocalizedStrings([
    '%webView_checksSidePanel_checkingBadge_title%',
  ]);

  return (
    <Badge className="tw-flex tw-items-center tw-justify-center tw-w-20 tw-h-5 tw-shadow-sm tw-rounded-md">
      <span className="tw-text-xs tw-font-medium">
        {localizedString['%webView_checksSidePanel_checkingBadge_title%']}
      </span>
    </Badge>
  );
}

/** Props for the FocusedCheckDropdown component. */
type FocusedCheckDropdownProps = {
  /** Callback for denying a check */
  handleDenyCheck: (checkTitle: string) => void;
  /** Callback for opening settings and inventories */
  handleOpenSettingsAndInventories: () => void;
};

/** Dropdown menu component for actions on a focused check. */
function FocusedCheckDropdown({
  handleDenyCheck,
  handleOpenSettingsAndInventories,
}: FocusedCheckDropdownProps) {
  const [localizedStrings] = papi.react.useLocalizedStrings([
    '%webView_checksSidePanel_focusedCheckDropdown_denyItem%',
    '%webView_checksSidePanel_focusedCheckDropdown_settingsItem%',
  ]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="tw-h-4 tw-w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem className="tw-flex tw-flex-row" onClick={() => handleDenyCheck}>
          <X className="tw-mr-2 tw-h-4 tw-w-4" />
          <span>{localizedStrings['%webView_checksSidePanel_focusedCheckDropdown_denyItem%']}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="tw-flex tw-flex-row"
          onClick={() => handleOpenSettingsAndInventories}
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
type CheckNotificationProps = {
  /** Indicates whether the check notification should be appear muted */
  isMuted?: boolean;
  /** The type of the check */
  checkType: string;
};

// TODO Change to tw blue
/**
 * CheckNotification component displays a notification for a check, with different styles based on
 * whether it is muted or not
 */
function CheckNotification({ isMuted, checkType }: CheckNotificationProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div
        style={{
          width: '15px',
          height: '15px',
          padding: '5px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            background: isMuted ? '#A1A1AA' : '#60A5FA',
            borderRadius: '50%',
            width: '5px',
            height: '5px',
          }}
        />
      </div>
      <span className="tw-text-xs tw-text-gray-500">{checkType}</span>
    </div>
  );
}

/** Props for the CheckCard component */
export type CheckCardProps = {
  checkId: string;
  /** Indicates if the check is currently selected in the list */
  isSelected: boolean;
  /** The current state of the check. */
  checkState: CheckStates;
  /** Callback function triggered when the check is selected */
  handleSelectCheck: (checkTitle: string) => void;
  /** Callback function triggered when the check is denied */
  handleDenyCheck: (checkTitle: string) => void;
  /**
   * The title of the check
   *
   * @example 'MIC 4:1 Charge Charge'
   */
  checkTitle: string;
  /**
   * The type of the check.
   *
   * @example 'repeatedWords' | 'versification'
   */
  checkType: string;
  /** A brief description of the check result. Optional. */
  checkDescription?: string;
  /** Callback function triggered to open the configure checks webview */
  handleOpenSettingsAndInventories: () => void;
};

/**
 * The CheckCard component displays a singe check with options to select, deny, or view settings.
 * The card styling changes based on the current check and selection status.
 */
export default function CheckCard({
  checkId,
  isSelected,
  checkState,
  handleSelectCheck,
  handleDenyCheck,
  checkTitle,
  checkType,
  checkDescription,
  handleOpenSettingsAndInventories,
}: CheckCardProps) {
  const isFixedOrDenied = useMemo(
    () => checkState === CheckStates.Fixed || checkState === CheckStates.Denied,
    [checkState],
  );

  return (
    <Card
      key={checkId}
      onClick={() => handleSelectCheck(checkTitle)}
      className={`tw-w-full tw-flex tw-flex-col tw-items-flex-start tw-gap-3 tw-p-4 tw-rounded-lg ${isSelected && 'tw-shadow-md'}`}
      style={
        !isSelected
          ? {
              backgroundColor: '#F1F5F9',
              borderColor: '#F1F5F9',
            }
          : {}
      }
    >
      <div className="tw-flex tw-justify-between">
        <div className="tw-gap-1 tw-flex tw-flex-col">
          {checkState === CheckStates.Fixed && <FixedBadge />}
          {checkState === CheckStates.Denied && <DeniedBadge />}
          {checkState === CheckStates.Checking && <CheckingBadge />}
          <span
            className={`tw-text-xs tw-font-medium ${isFixedOrDenied && 'tw-text-muted-foreground'}`}
          >
            {checkTitle}
          </span>
          <CheckNotification checkType={checkType} isMuted={isFixedOrDenied} />
        </div>
        {isSelected && (
          <FocusedCheckDropdown
            handleOpenSettingsAndInventories={handleOpenSettingsAndInventories}
            handleDenyCheck={handleDenyCheck}
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
