import {
  Button,
  cn,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  Skeleton,
  ToggleGroup,
  ToggleGroupItem,
} from 'platform-bible-react';
import { CircleUserRound, User, Wifi } from 'lucide-react';
import { useLocalizedStrings, useSetting } from '@renderer/hooks/papi-hooks';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage, isPlatformError, LocalizeKey } from 'platform-bible-utils';
import { useEffect, useState } from 'react';

type RegistrationData = {
  name: string;
  code: string;
  email: string;
  supporterName: string;
};

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%toolbar_userProfile_label%',
  '%userProfile_header_defaultName%',
  '%userProfile_header_notRegistered%',
  '%userProfile_interfaceMode_simple_label%',
  '%userProfile_interfaceMode_simple_description%',
  '%userProfile_interfaceMode_power_label%',
  '%userProfile_interfaceMode_power_description%',
  '%userProfile_profileAndRegistration%',
  '%userProfile_networkSettings%',
];

/**
 * Popover triggered from the top-right of the toolbar that surfaces the user's profile (name,
 * email), interface mode, registration / network settings shortcuts, language, and appearance
 * (theme) controls. Replaces the previous standalone theme-toggle, internet-settings, and
 * Paratext-registration buttons in the toolbar.
 */
export function UserProfilePopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [registrationData, setRegistrationData] = useState<RegistrationData | undefined>(undefined);
  const [isRegistrationLoading, setIsRegistrationLoading] = useState(false);
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);

  const [interfaceMode, setInterfaceMode] = useSetting('platform.interfaceMode', 'simple');
  const safeInterfaceMode = isPlatformError(interfaceMode) ? 'simple' : interfaceMode;

  const handleInterfaceModeChange = (value: string) => {
    if (value === '') return;
    if (value !== 'simple' && value !== 'power') return;
    try {
      setInterfaceMode(value);
    } catch (e: unknown) {
      logger.warn(`UserProfilePopover: failed to set interface mode: ${getErrorMessage(e)}`);
    }
  };

  const handleProfileAndRegistration = () => {
    sendCommand('paratextRegistration.showParatextRegistration').catch((e: unknown) => {
      logger.warn(`UserProfilePopover: failed to open registration: ${getErrorMessage(e)}`);
    });
    setIsOpen(false);
  };

  const handleNetworkSettings = () => {
    sendCommand('paratextRegistration.showInternetSettings').catch((e: unknown) => {
      logger.warn(`UserProfilePopover: failed to open internet settings: ${getErrorMessage(e)}`);
    });
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return undefined;
    let cancelled = false;
    setIsRegistrationLoading(true);
    (async () => {
      try {
        const data = await sendCommand('paratextRegistration.getParatextRegistrationData');
        if (!cancelled) setRegistrationData(data);
      } catch (e: unknown) {
        logger.warn(`UserProfilePopover: failed to fetch registration data: ${getErrorMessage(e)}`);
      } finally {
        if (!cancelled) setIsRegistrationLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  const nameText =
    registrationData?.name && registrationData.name.length > 0
      ? registrationData.name
      : localizedStrings['%userProfile_header_defaultName%'];
  const emailText =
    registrationData?.email && registrationData.email.length > 0
      ? registrationData.email
      : localizedStrings['%userProfile_header_notRegistered%'];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="pr-twp tw:h-8 tw:shrink-0"
          aria-label={localizedStrings['%toolbar_userProfile_label%']}
          data-testid="user-profile-popover-trigger"
        >
          <CircleUserRound />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className={cn('tw:w-[340px]')}>
        <PopoverHeader className="tw:border-b tw:pb-2">
          {isRegistrationLoading ? (
            <>
              <Skeleton data-testid="user-profile-name-skeleton" className="tw:h-4 tw:w-32" />
              <Skeleton
                data-testid="user-profile-email-skeleton"
                className="tw:mt-1 tw:h-3 tw:w-40"
              />
            </>
          ) : (
            <>
              <PopoverTitle data-testid="user-profile-name">{nameText}</PopoverTitle>
              <PopoverDescription data-testid="user-profile-email">{emailText}</PopoverDescription>
            </>
          )}
        </PopoverHeader>
        <ToggleGroup
          type="single"
          value={safeInterfaceMode}
          onValueChange={handleInterfaceModeChange}
          spacing={2}
          className="tw:w-full"
        >
          <ToggleGroupItem
            value="simple"
            data-testid="user-profile-interface-mode-simple"
            variant="outline"
            className="tw:h-auto tw:flex-1 tw:flex-col tw:items-start tw:gap-1 tw:p-3 tw:text-left tw:whitespace-normal tw:data-[state=on]:border-primary tw:data-[state=on]:bg-primary/5 tw:data-[state=on]:text-primary"
          >
            <span className="tw:text-xs tw:font-semibold">
              {localizedStrings['%userProfile_interfaceMode_simple_label%']}
            </span>
            <span className="tw:text-[10px] tw:leading-tight tw:text-muted-foreground">
              {localizedStrings['%userProfile_interfaceMode_simple_description%']}
            </span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="power"
            data-testid="user-profile-interface-mode-power"
            variant="outline"
            className="tw:h-auto tw:flex-1 tw:flex-col tw:items-start tw:gap-1 tw:p-3 tw:text-left tw:whitespace-normal tw:data-[state=on]:border-primary tw:data-[state=on]:bg-primary/5 tw:data-[state=on]:text-primary"
          >
            <span className="tw:text-xs tw:font-semibold">
              {localizedStrings['%userProfile_interfaceMode_power_label%']}
            </span>
            <span className="tw:text-[10px] tw:leading-tight tw:text-muted-foreground">
              {localizedStrings['%userProfile_interfaceMode_power_description%']}
            </span>
          </ToggleGroupItem>
        </ToggleGroup>
        <div className="tw:flex tw:flex-col tw:gap-1 tw:border-t tw:pt-2">
          <Button
            variant="ghost"
            size="sm"
            className="tw:w-full tw:justify-start tw:gap-2 tw:px-2 tw:font-normal"
            onClick={handleProfileAndRegistration}
            data-testid="user-profile-action-registration"
          >
            <User className="tw:h-3.5 tw:w-3.5" />
            {localizedStrings['%userProfile_profileAndRegistration%']}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="tw:w-full tw:justify-start tw:gap-2 tw:px-2 tw:font-normal"
            onClick={handleNetworkSettings}
            data-testid="user-profile-action-network"
          >
            <Wifi className="tw:h-3.5 tw:w-3.5" />
            {localizedStrings['%userProfile_networkSettings%']}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default UserProfilePopover;
