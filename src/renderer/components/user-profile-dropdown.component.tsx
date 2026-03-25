import { useSetting } from '@renderer/hooks/papi-hooks/use-setting.hook';
import { useData, useDataProvider } from '@renderer/hooks/papi-hooks';
import { localThemeService } from '@renderer/services/theme.service-host';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { themeServiceDataProviderName } from '@shared/services/theme.service-model';
import { CircleUserRound, Moon, Network, Sun, Monitor, ArrowRightLeft } from 'lucide-react';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  usePromise,
} from 'platform-bible-react';
import { getErrorMessage, isPlatformError, ThemeDefinitionExpanded } from 'platform-bible-utils';
import { ReactNode, useCallback, useEffect, useMemo } from 'react';

/** Placeholder theme to detect when we are loading */
const DEFAULT_THEME_VALUE: ThemeDefinitionExpanded = {
  themeFamilyId: '',
  type: 'light',
  id: 'light',
  label: '%unused%',
  cssVariables: {},
};

export type UserProfileDropdownProps = {
  /** The trigger element. If not provided, a default CircleUserRound icon button is used. */
  trigger?: ReactNode;
};

/**
 * User Profile dropdown shared between Simple Mode (sidebar) and Power Mode (title bar).
 *
 * Contains: user info, mode switch, theme toggle, network settings, registration, language
 * selector.
 */
export function UserProfileDropdown({ trigger }: UserProfileDropdownProps) {
  // Interface mode
  const [interfaceMode, setInterfaceMode] = useSetting('platform.interfaceMode', 'simple');
  const isSimpleMode = interfaceMode !== 'power';

  // Registration data
  const [registrationData] = usePromise(
    useCallback(async () => {
      try {
        const data = await sendCommand('paratextRegistration.getParatextRegistrationData');
        return data;
      } catch {
        return undefined;
      }
    }, []),
    undefined,
  );

  // Theme
  const themeDataProvider = useDataProvider(themeServiceDataProviderName);
  const themeOnFirstLoad = useMemo(() => localThemeService.getCurrentThemeSync(), []);
  const [theme, setTheme] = useData<typeof themeServiceDataProviderName>(
    themeDataProvider,
  ).CurrentTheme(undefined, DEFAULT_THEME_VALUE);

  useEffect(() => {
    if (isPlatformError(theme))
      logger.warn(`UserProfileDropdown: Error getting theme. ${getErrorMessage(theme)}`);
  }, [theme]);

  const isThemeLoaded = theme !== DEFAULT_THEME_VALUE && !isPlatformError(theme);
  const themeType = isThemeLoaded ? theme.type : themeOnFirstLoad.type;

  const toggleTheme = () => {
    if (!isThemeLoaded) return;
    const newType = theme.type === 'dark' ? 'light' : 'dark';
    try {
      setTheme?.({ type: newType });
    } catch (e) {
      logger.warn(`UserProfileDropdown: Error setting theme to ${newType}: ${getErrorMessage(e)}`);
    }
  };

  // Extract display name from registration data
  const userName =
    registrationData && typeof registrationData === 'object' && 'name' in registrationData
      ? String(registrationData.name)
      : undefined;

  const defaultTrigger = (
    <Button variant="ghost" size="icon" className="tw-h-8 tw-w-8 tw-flex-shrink-0">
      <CircleUserRound className="tw-h-5 tw-w-5" />
    </Button>
  );

  return (
    <Popover>
      <PopoverTrigger asChild>{trigger ?? defaultTrigger}</PopoverTrigger>
      <PopoverContent side="right" align="end" className="tw-w-64">
        {/* User info */}
        <div className="tw-mb-3">
          <div className="tw-flex tw-items-center tw-gap-2">
            <CircleUserRound className="tw-h-8 tw-w-8 tw-text-muted-foreground" />
            <div className="tw-flex-1 tw-min-w-0">
              <p className="tw-text-sm tw-font-medium tw-truncate">
                {userName ?? 'Not registered'}
              </p>
            </div>
          </div>
        </div>
        <Separator className="tw-mb-2" />

        {/* Mode switch */}
        <Button
          variant="ghost"
          className="tw-w-full tw-justify-start tw-gap-2 tw-h-9"
          onClick={() => setInterfaceMode(isSimpleMode ? 'power' : 'simple')}
        >
          <ArrowRightLeft className="tw-h-4 tw-w-4" />
          Switch to {isSimpleMode ? 'Power' : 'Simple'} Mode
        </Button>

        {/* Theme toggle */}
        <Button
          variant="ghost"
          className="tw-w-full tw-justify-start tw-gap-2 tw-h-9"
          onClick={toggleTheme}
          disabled={!isThemeLoaded}
        >
          {themeType === 'dark' ? (
            <Sun className="tw-h-4 tw-w-4" />
          ) : (
            <Moon className="tw-h-4 tw-w-4" />
          )}
          {themeType === 'dark' ? 'Light theme' : 'Dark theme'}
        </Button>

        <Separator className="tw-my-2" />

        {/* Network settings */}
        <Button
          variant="ghost"
          className="tw-w-full tw-justify-start tw-gap-2 tw-h-9"
          onClick={() => sendCommand('paratextRegistration.showInternetSettings')}
        >
          <Network className="tw-h-4 tw-w-4" />
          Internet Settings
        </Button>

        {/* Registration */}
        <Button
          variant="ghost"
          className="tw-w-full tw-justify-start tw-gap-2 tw-h-9"
          onClick={() => sendCommand('paratextRegistration.showParatextRegistration')}
        >
          <Monitor className="tw-h-4 tw-w-4" />
          Registration
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export default UserProfileDropdown;
