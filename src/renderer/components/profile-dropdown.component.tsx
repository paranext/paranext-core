import { useData, useDataProvider } from '@renderer/hooks/papi-hooks';
import useSetting from '@renderer/hooks/papi-hooks/use-setting.hook';
import { localThemeService } from '@renderer/services/theme.service-host';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { themeServiceDataProviderName } from '@shared/services/theme.service-model';
import { CircleUserRound, Globe, KeyRound, Moon, PanelLeft, Sun, Zap } from 'lucide-react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  usePromise,
} from 'platform-bible-react';
import { getErrorMessage, isPlatformError, ThemeDefinitionExpanded } from 'platform-bible-utils';
import { useCallback, useEffect, useMemo } from 'react';

const DEFAULT_THEME_VALUE: ThemeDefinitionExpanded = {
  themeFamilyId: '',
  type: 'light',
  id: 'light',
  label: '%unused%',
  cssVariables: {},
};

interface ProfileDropdownProps {
  /** Which side the dropdown opens to. Use "right" when in sidebar. Defaults to undefined (auto). */
  side?: 'right' | 'bottom' | 'left' | 'top';
}

export default function ProfileDropdown({ side }: ProfileDropdownProps = {}) {
  const [registrationData] = usePromise(
    useCallback(() => sendCommand('paratextRegistration.getParatextRegistrationData'), []),
    undefined,
  );

  const [interfaceMode, setInterfaceMode] = useSetting('platform.interfaceMode', 'simple');

  const themeDataProvider = useDataProvider(themeServiceDataProviderName);
  const themeOnFirstLoad = useMemo(() => localThemeService.getCurrentThemeSync(), []);
  const [theme, setTheme] = useData<typeof themeServiceDataProviderName>(
    themeDataProvider,
  ).CurrentTheme(undefined, DEFAULT_THEME_VALUE);

  useEffect(() => {
    if (isPlatformError(theme))
      logger.warn(`Error getting theme for profile dropdown. ${getErrorMessage(theme)}`);
  }, [theme]);

  const isThemeLoadedNotError = theme !== DEFAULT_THEME_VALUE && !isPlatformError(theme);
  const themeTypeEffective = isThemeLoadedNotError ? theme.type : themeOnFirstLoad.type;

  const setThemeType = useCallback(
    (value: string) => {
      if (!isThemeLoadedNotError) return;
      if (value !== 'light' && value !== 'dark') return;
      try {
        setTheme?.({ type: value });
      } catch (e) {
        logger.warn(`Error setting theme to ${value}: ${getErrorMessage(e)}`);
      }
    },
    [isThemeLoadedNotError, setTheme],
  );

  const effectiveMode = isPlatformError(interfaceMode) ? 'simple' : interfaceMode;

  const userName =
    registrationData && !isPlatformError(registrationData) ? registrationData.name : undefined;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="pr-twp tw-h-8 tw-w-8 tw-flex-shrink-0">
          <CircleUserRound />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={side ? undefined : 'end'} side={side} className="pr-twp tw-w-56">
        {userName && (
          <>
            <DropdownMenuLabel>{userName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem
          onClick={() => sendCommand('paratextRegistration.showParatextRegistration')}
        >
          <KeyRound className="tw-mr-2 tw-h-4 tw-w-4" />
          Paratext Registration
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => sendCommand('paratextRegistration.showInternetSettings')}>
          <Globe className="tw-mr-2 tw-h-4 tw-w-4" />
          Internet Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={themeTypeEffective} onValueChange={setThemeType}>
          <DropdownMenuRadioItem value="light" disabled={!isThemeLoadedNotError}>
            <Sun className="tw-mr-2 tw-h-4 tw-w-4" />
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark" disabled={!isThemeLoadedNotError}>
            <Moon className="tw-mr-2 tw-h-4 tw-w-4" />
            Dark
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={effectiveMode}
          onValueChange={(value) => {
            if (value === 'simple' || value === 'power') setInterfaceMode?.(value);
          }}
        >
          <DropdownMenuRadioItem value="simple">
            <PanelLeft className="tw-mr-2 tw-h-4 tw-w-4" />
            Simple
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="power">
            <Zap className="tw-mr-2 tw-h-4 tw-w-4" />
            Power
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
