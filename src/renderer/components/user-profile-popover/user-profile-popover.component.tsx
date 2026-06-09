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
import { CircleUserRound, Globe, Monitor, Moon, Sun, User, Wifi } from 'lucide-react';
import {
  useData,
  useDataProvider,
  useLocalizedStrings,
  useSetting,
} from '@renderer/hooks/papi-hooks';
import { sendCommand } from '@shared/services/command.service';
import { localizationService } from '@shared/services/localization.service';
import { logger } from '@shared/services/logger.service';
import { themeServiceDataProviderName } from '@shared/services/theme.service-model';
import {
  getErrorMessage,
  isPlatformError,
  LocalizeKey,
  type ThemeDefinitionExpanded,
} from 'platform-bible-utils';
import type { LanguageInfo } from 'platform-bible-react';
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
  '%userProfile_language%',
  '%userProfile_appearance%',
  '%userProfile_appearance_light%',
  '%userProfile_appearance_dark%',
  '%userProfile_appearance_system%',
];

const DEFAULT_AVAILABLE_LANGUAGES: Record<string, LanguageInfo> = {
  en: { autonym: 'English' },
};

/**
 * Sentinel placeholder used as the default while CurrentTheme loads. The label is never displayed —
 * it just satisfies the `\`%${string}%`` shape required by ThemeDefinitionExpanded. Reusing an
 * existing key avoids introducing a bogus i18n entry, mirroring the pattern in
 * `platform-bible-toolbar.tsx`.
 */
const DEFAULT_THEME_VALUE: ThemeDefinitionExpanded = {
  themeFamilyId: '',
  type: 'light',
  id: 'light',
  label: '%toolbar_theme_loading%',
  cssVariables: {},
};

/** Sort entries so 'en' is first, then everything else alphabetically by BCP-47 tag. */
function sortLanguageEntries<T>(entries: [string, T][]): [string, T][] {
  return [...entries].sort(([a], [b]) => {
    if (a === 'en' && b !== 'en') return -1;
    if (b === 'en' && a !== 'en') return 1;
    return a.localeCompare(b);
  });
}

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

  const [interfaceLanguage, setInterfaceLanguage] = useSetting('platform.interfaceLanguage', [
    'en',
  ]);
  const safeInterfaceLanguage =
    isPlatformError(interfaceLanguage) || interfaceLanguage.length === 0
      ? ['en']
      : interfaceLanguage;
  const primaryLanguage = safeInterfaceLanguage[0] ?? 'en';

  const [availableLanguagesPossiblyError] = useData(
    localizationService.dataProviderName,
  ).AvailableInterfaceLanguages(undefined, DEFAULT_AVAILABLE_LANGUAGES);
  const availableLanguages: Record<string, LanguageInfo> = isPlatformError(
    availableLanguagesPossiblyError,
  )
    ? DEFAULT_AVAILABLE_LANGUAGES
    : availableLanguagesPossiblyError;
  const sortedLanguageEntries = sortLanguageEntries(Object.entries(availableLanguages));

  const handleLanguageChange = (value: string) => {
    if (value === '') return;
    if (value === primaryLanguage) return;
    const next = [value, ...safeInterfaceLanguage.filter((l) => l !== value)];
    try {
      setInterfaceLanguage(next);
    } catch (e: unknown) {
      logger.warn(`UserProfilePopover: failed to set interface language: ${getErrorMessage(e)}`);
    }
  };

  const themeDataProvider = useDataProvider(themeServiceDataProviderName);
  const [theme, setTheme] = useData(themeDataProvider).CurrentTheme(undefined, DEFAULT_THEME_VALUE);
  const [shouldMatchSystem, setShouldMatchSystem] = useData(themeDataProvider).ShouldMatchSystem(
    undefined,
    false,
  );

  const themeUsable = !isPlatformError(theme);
  const shouldMatchSystemUsable = !isPlatformError(shouldMatchSystem);

  let appearanceValue: '' | 'light' | 'dark' | 'system' = '';
  if (themeUsable && shouldMatchSystemUsable) {
    if (shouldMatchSystem) appearanceValue = 'system';
    else appearanceValue = theme.type === 'dark' ? 'dark' : 'light';
  }

  const handleAppearanceChange = (value: string) => {
    if (value === '') return;
    if (value !== 'light' && value !== 'dark' && value !== 'system') return;
    try {
      if (value === 'system') {
        if (shouldMatchSystemUsable && shouldMatchSystem) return;
        setShouldMatchSystem?.(true);
        return;
      }
      if (shouldMatchSystemUsable && shouldMatchSystem) {
        setShouldMatchSystem?.(false);
      }
      setTheme?.({ type: value });
    } catch (e: unknown) {
      logger.warn(`UserProfilePopover: failed to set appearance: ${getErrorMessage(e)}`);
    }
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

  // "Not registered" is a state of the whole header — show it only when neither the name nor the
  // email are populated. When the user has a name but no email, the email line is omitted entirely
  // so we don't imply the user is unregistered just because the email field happens to be blank.
  const registeredName = registrationData?.name ?? '';
  const registeredEmail = registrationData?.email ?? '';
  const isRegistered = registeredName.length > 0 || registeredEmail.length > 0;
  const nameText =
    registeredName.length > 0
      ? registeredName
      : localizedStrings['%userProfile_header_defaultName%'];
  let emailText: string | undefined;
  if (registeredEmail.length > 0) emailText = registeredEmail;
  else if (!isRegistered) emailText = localizedStrings['%userProfile_header_notRegistered%'];
  else emailText = undefined;

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
      <PopoverContent align="end" className={cn('tw:w-80 tw:gap-1.5')}>
        <PopoverHeader className="tw:gap-0 tw:border-b tw:px-2 tw:pb-1.5">
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
              <PopoverTitle
                data-testid="user-profile-name"
                className="tw:text-xs tw:leading-tight tw:font-bold"
              >
                {nameText}
              </PopoverTitle>
              {emailText !== undefined && (
                <PopoverDescription
                  data-testid="user-profile-email"
                  // Inline style: arbitrary tw:text-[11px] is not picked up by this build's
                  // Tailwind setup; use raw CSS to hit the design's 11px body size.
                  style={{ fontSize: '11px' }}
                  className="tw:leading-tight"
                >
                  {emailText}
                </PopoverDescription>
              )}
            </>
          )}
        </PopoverHeader>
        <ToggleGroup
          type="single"
          value={safeInterfaceMode}
          onValueChange={handleInterfaceModeChange}
          spacing={2}
          className="tw:w-full tw:items-stretch tw:px-2"
        >
          {/* Selected styling is applied via direct conditional className rather than the
              `tw:data-[state=on]:` variant — utilities with that variant + opacity modifiers
              (e.g. tw:bg-primary/10) are not reliably generated by this build's Tailwind setup,
              so the variant ends up as dead markup and the card looks identical when selected. */}
          <ToggleGroupItem
            value="simple"
            data-testid="user-profile-interface-mode-simple"
            variant="outline"
            className={cn(
              'tw:h-auto tw:flex-1 tw:flex-col tw:items-start tw:gap-0.5 tw:p-2 tw:text-left tw:whitespace-normal',
              safeInterfaceMode === 'simple' &&
                'tw:border-2 tw:border-primary tw:bg-accent tw:text-primary tw:shadow-sm',
            )}
          >
            {/* Inline font sizes: arbitrary tw:text-[Npx] utilities are not picked up by this
                build's Tailwind setup, so raw CSS is used to hit the design's exact pixel sizes. */}
            <span
              className={cn(
                'tw:leading-tight tw:font-semibold',
                safeInterfaceMode === 'simple' && 'tw:text-primary',
              )}
              style={{ fontSize: '11px' }}
            >
              {localizedStrings['%userProfile_interfaceMode_simple_label%']}
            </span>
            <span className="tw:leading-tight tw:text-muted-foreground" style={{ fontSize: '9px' }}>
              {localizedStrings['%userProfile_interfaceMode_simple_description%']}
            </span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="power"
            data-testid="user-profile-interface-mode-power"
            variant="outline"
            className={cn(
              'tw:h-auto tw:flex-1 tw:flex-col tw:items-start tw:gap-0.5 tw:p-2 tw:text-left tw:whitespace-normal',
              safeInterfaceMode === 'power' &&
                'tw:border-2 tw:border-primary tw:bg-accent tw:text-primary tw:shadow-sm',
            )}
          >
            <span
              className={cn(
                'tw:leading-tight tw:font-semibold',
                safeInterfaceMode === 'power' && 'tw:text-primary',
              )}
              style={{ fontSize: '11px' }}
            >
              {localizedStrings['%userProfile_interfaceMode_power_label%']}
            </span>
            <span className="tw:leading-tight tw:text-muted-foreground" style={{ fontSize: '9px' }}>
              {localizedStrings['%userProfile_interfaceMode_power_description%']}
            </span>
          </ToggleGroupItem>
        </ToggleGroup>
        <div className="tw:flex tw:flex-col tw:gap-0 tw:border-t tw:pt-1">
          <Button
            variant="ghost"
            size="sm"
            className="tw:w-full tw:justify-start tw:gap-2 tw:px-2 tw:font-normal"
            onClick={handleProfileAndRegistration}
            data-testid="user-profile-action-registration"
          >
            <User className="tw:size-3.5" />
            {localizedStrings['%userProfile_profileAndRegistration%']}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="tw:w-full tw:justify-start tw:gap-2 tw:px-2 tw:font-normal"
            onClick={handleNetworkSettings}
            data-testid="user-profile-action-network"
          >
            <Wifi className="tw:size-3.5" />
            {localizedStrings['%userProfile_networkSettings%']}
          </Button>
        </div>
        <div className="tw:flex tw:items-start tw:justify-between tw:gap-2 tw:px-2">
          <span className="tw:flex tw:shrink-0 tw:items-center tw:gap-1.5 tw:pt-1 tw:text-xs tw:text-muted-foreground">
            <Globe className="tw:size-3.5" />
            {localizedStrings['%userProfile_language%']}
          </span>
          <ToggleGroup
            type="single"
            value={primaryLanguage}
            onValueChange={handleLanguageChange}
            size="sm"
            spacing={2}
            className="tw:min-w-0 tw:flex-1 tw:flex-wrap tw:justify-end"
          >
            {sortedLanguageEntries.map(([tag, info]) => (
              <ToggleGroupItem
                key={tag}
                value={tag}
                variant="outline"
                data-testid={`user-profile-language-${tag}`}
                aria-label={info.autonym ?? tag}
                className="tw:h-6 tw:min-w-0 tw:px-2"
                // Inline font size: see comment on the mode toggle items above.
                style={{ fontSize: '10px' }}
              >
                {tag.toUpperCase()}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div className="tw:flex tw:items-center tw:justify-between tw:gap-2 tw:px-2">
          <span className="tw:text-xs tw:text-muted-foreground">
            {localizedStrings['%userProfile_appearance%']}
          </span>
          <ToggleGroup
            type="single"
            value={appearanceValue}
            onValueChange={handleAppearanceChange}
            size="sm"
            spacing={2}
          >
            <ToggleGroupItem
              value="light"
              variant="outline"
              data-testid="user-profile-appearance-light"
              aria-label={localizedStrings['%userProfile_appearance_light%']}
              className="tw:h-6 tw:min-w-0 tw:px-1.5"
            >
              <Sun className="tw:size-3" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="dark"
              variant="outline"
              data-testid="user-profile-appearance-dark"
              aria-label={localizedStrings['%userProfile_appearance_dark%']}
              className="tw:h-6 tw:min-w-0 tw:px-1.5"
            >
              <Moon className="tw:size-3" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="system"
              variant="outline"
              data-testid="user-profile-appearance-system"
              aria-label={localizedStrings['%userProfile_appearance_system%']}
              className="tw:h-6 tw:min-w-0 tw:px-1.5"
            >
              <Monitor className="tw:size-3" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default UserProfilePopover;
