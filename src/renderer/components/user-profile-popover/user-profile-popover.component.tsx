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
} from 'platform-bible-react';
import { CircleUserRound } from 'lucide-react';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage, LocalizeKey } from 'platform-bible-utils';
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
      </PopoverContent>
    </Popover>
  );
}

export default UserProfilePopover;
