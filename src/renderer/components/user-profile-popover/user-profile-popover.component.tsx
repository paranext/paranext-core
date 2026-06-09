import { Button, cn, Popover, PopoverContent, PopoverTrigger } from 'platform-bible-react';
import { CircleUserRound } from 'lucide-react';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { LocalizeKey } from 'platform-bible-utils';
import { useState } from 'react';

const LOCALIZED_STRING_KEYS: LocalizeKey[] = ['%toolbar_userProfile_label%'];

/**
 * Popover triggered from the top-right of the toolbar that surfaces the user's profile (name,
 * email), interface mode, registration / network settings shortcuts, language, and appearance
 * (theme) controls. Replaces the previous standalone theme-toggle, internet-settings, and
 * Paratext-registration buttons in the toolbar.
 */
export function UserProfilePopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);

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
        {/* Sections wired in subsequent commits */}
      </PopoverContent>
    </Popover>
  );
}

export default UserProfilePopover;
