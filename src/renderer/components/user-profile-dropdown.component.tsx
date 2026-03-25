import { useSetting } from '@renderer/hooks/papi-hooks/use-setting.hook';
import { useData, useDataProvider } from '@renderer/hooks/papi-hooks';
import { localThemeService } from '@renderer/services/theme.service-host';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { themeServiceDataProviderName } from '@shared/services/theme.service-model';
import { CircleUserRound, Moon, Network, Sun, Monitor } from 'lucide-react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  ToggleGroup,
  ToggleGroupItem,
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
  /** Which side the dropdown should open on. Defaults to 'bottom'. */
  side?: 'bottom' | 'right';
};

/**
 * User Profile dropdown shared between Simple Mode (sidebar) and Power Mode (title bar).
 *
 * Contains: user info headline, registration, internet settings, mode switch toggle, theme toggle.
 */
export function UserProfileDropdown({ trigger, side = 'bottom' }: UserProfileDropdownProps) {
  // Interface mode
  const [interfaceMode, setInterfaceMode] = useSetting('platform.interfaceMode', 'simple');
  const isSimpleMode = interfaceMode !== 'power';

  // Registration data — loaded on mount, won't flash "Not registered"
  const [registrationData, isLoadingRegistration] = usePromise(
    useCallback(async () => {
      try {
        return await sendCommand('paratextRegistration.getParatextRegistrationData');
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

  const handleThemeChange = (value: string) => {
    if (!isThemeLoaded || !value) return;
    try {
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      setTheme?.({ type: value as 'light' | 'dark' });
    } catch (e) {
      logger.warn(`UserProfileDropdown: Error setting theme: ${getErrorMessage(e)}`);
    }
  };

  const handleModeChange = (value: string) => {
    if (!value) return;
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    setInterfaceMode(value as 'simple' | 'power');
  };

  // Extract display name
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger ?? defaultTrigger}</DropdownMenuTrigger>
      <DropdownMenuContent side={side} align="end" className="tw-w-56">
        {/* Username headline — shows nothing while loading */}
        <DropdownMenuLabel className="tw-text-base tw-font-semibold">
          {isLoadingRegistration ? '\u00A0' : (userName ?? 'Not registered')}
        </DropdownMenuLabel>

        {/* Registration & Internet Settings */}
        <DropdownMenuItem
          onClick={() => sendCommand('paratextRegistration.showParatextRegistration')}
        >
          <Monitor className="tw-h-4 tw-w-4 tw-mr-2" />
          Registration
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => sendCommand('paratextRegistration.showInternetSettings')}>
          <Network className="tw-h-4 tw-w-4 tw-mr-2" />
          Internet Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Mode switch — connected toggle buttons */}
        <div className="tw-px-2 tw-py-1.5">
          <p className="tw-text-xs tw-font-medium tw-text-muted-foreground tw-mb-1">
            Interface Mode
          </p>
          <ToggleGroup
            type="single"
            value={isSimpleMode ? 'simple' : 'power'}
            onValueChange={handleModeChange}
            className="tw-w-full"
          >
            <ToggleGroupItem value="simple" className="tw-flex-1 tw-h-8 tw-text-xs">
              Simple
            </ToggleGroupItem>
            <ToggleGroupItem value="power" className="tw-flex-1 tw-h-8 tw-text-xs">
              Power
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Theme toggle — connected toggle buttons */}
        <div className="tw-px-2 tw-py-1.5">
          <p className="tw-text-xs tw-font-medium tw-text-muted-foreground tw-mb-1">Theme</p>
          <ToggleGroup
            type="single"
            value={themeType}
            onValueChange={handleThemeChange}
            className="tw-w-full"
            disabled={!isThemeLoaded}
          >
            <ToggleGroupItem value="light" className="tw-flex-1 tw-h-8 tw-text-xs tw-gap-1">
              <Sun className="tw-h-3.5 tw-w-3.5" />
              Light
            </ToggleGroupItem>
            <ToggleGroupItem value="dark" className="tw-flex-1 tw-h-8 tw-text-xs tw-gap-1">
              <Moon className="tw-h-3.5 tw-w-3.5" />
              Dark
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserProfileDropdown;
