/**
 * User Profile Dropdown — shared between Simple Mode (sidebar) and Power Mode (title bar).
 *
 * Contains: user info, mode switch, profile/registration, network settings, language, theme toggle.
 * In Power Mode, this replaces the individual theme, network, and registration buttons.
 */

import { useData, useDataProvider } from '@renderer/hooks/papi-hooks';
import useSetting from '@renderer/hooks/papi-hooks/use-setting.hook';
import { localThemeService } from '@renderer/services/theme.service-host';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { themeServiceDataProviderName } from '@shared/services/theme.service-model';
import {
  BookOpen,
  CircleUser,
  Globe,
  LayoutGrid,
  Monitor,
  Moon,
  Network,
  Sun,
  User,
} from 'lucide-react';
import { Button, Popover, PopoverContent, PopoverTrigger, usePromise } from 'platform-bible-react';
import { getErrorMessage, isPlatformError, ThemeDefinitionExpanded } from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useState } from 'react';

const DEFAULT_THEME_VALUE: ThemeDefinitionExpanded = {
  themeFamilyId: '',
  type: 'light',
  id: 'light',
  label: '%unused%',
  cssVariables: {},
};

interface UserProfileDropdownProps {
  /** Where the dropdown trigger renders. Affects trigger button style. */
  context?: 'sidebar' | 'toolbar';
}

export function UserProfileDropdown({ context = 'toolbar' }: UserProfileDropdownProps) {
  const [open, setOpen] = useState(false);

  // User registration data
  const [registrationData] = usePromise(
    useCallback(async () => sendCommand('paratextRegistration.getParatextRegistrationData'), []),
    undefined,
  );

  // Interface mode
  const [interfaceMode, setInterfaceMode] = useSetting('platform.interfaceMode', 'simple');

  // Interface language
  const [interfaceLanguage, setInterfaceLanguage] = useSetting('platform.interfaceLanguage', [
    'en',
  ]);

  // Theme
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

  const handleThemeChange = useCallback(
    (type: 'light' | 'dark') => {
      try {
        setTheme?.({ type });
      } catch (e) {
        logger.warn(`Profile dropdown error setting theme to ${type}: ${getErrorMessage(e)}`);
      }
    },
    [setTheme],
  );

  // Display name from registration data
  const userName =
    registrationData && !isPlatformError(registrationData)
      ? registrationData.name || 'User'
      : 'User';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {context === 'sidebar' ? (
          <button type="button" className="simple-mode-sidebar-btn" aria-label="User Profile">
            <CircleUser className="tw-w-5 tw-h-5" />
          </button>
        ) : (
          <Button variant="ghost" size="icon" className="pr-twp tw-h-8 tw-flex-shrink-0">
            <CircleUser />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent
        className="tw-w-[280px] tw-p-0"
        side={context === 'sidebar' ? 'right' : 'bottom'}
        align={context === 'sidebar' ? 'end' : 'end'}
      >
        {/* User info */}
        <div className="tw-px-4 tw-py-3 tw-border-b tw-border-border">
          <div className="tw-flex tw-items-center tw-gap-3">
            <div className="tw-p-2 tw-rounded-full tw-bg-muted">
              <User className="tw-w-5 tw-h-5 tw-text-muted-foreground" />
            </div>
            <div>
              <div className="tw-text-sm tw-font-medium">{userName}</div>
            </div>
          </div>
        </div>

        {/* Mode switch */}
        <div className="tw-p-2 tw-border-b tw-border-border">
          <div className="tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-text-muted-foreground tw-px-2 tw-mb-2">
            Interface Mode
          </div>
          <div className="tw-flex tw-gap-2">
            <button
              type="button"
              onClick={() => setInterfaceMode('simple')}
              className={`tw-flex-1 tw-flex tw-items-center tw-gap-2 tw-p-2.5 tw-rounded-lg tw-border tw-transition-all ${interfaceMode === 'simple' ? 'tw-border-primary tw-bg-primary/5' : 'tw-border-border hover:tw-border-foreground/30 hover:tw-bg-muted'}`}
            >
              <BookOpen
                className={`tw-w-4 tw-h-4 ${interfaceMode === 'simple' ? 'tw-text-primary' : 'tw-text-muted-foreground'}`}
              />
              <div className="tw-text-left">
                <div
                  className={`tw-text-xs tw-font-semibold ${interfaceMode === 'simple' ? 'tw-text-primary' : ''}`}
                >
                  Simple
                </div>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setInterfaceMode('power')}
              className={`tw-flex-1 tw-flex tw-items-center tw-gap-2 tw-p-2.5 tw-rounded-lg tw-border tw-transition-all ${interfaceMode === 'power' ? 'tw-border-primary tw-bg-primary/5' : 'tw-border-border hover:tw-border-foreground/30 hover:tw-bg-muted'}`}
            >
              <LayoutGrid
                className={`tw-w-4 tw-h-4 ${interfaceMode === 'power' ? 'tw-text-primary' : 'tw-text-muted-foreground'}`}
              />
              <div className="tw-text-left">
                <div
                  className={`tw-text-xs tw-font-semibold ${interfaceMode === 'power' ? 'tw-text-primary' : ''}`}
                >
                  Power
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="tw-p-1 tw-border-b tw-border-border">
          <Button
            variant="ghost"
            size="sm"
            className="tw-w-full tw-justify-start tw-gap-2 tw-text-xs tw-h-8"
            onClick={() => {
              sendCommand('paratextRegistration.showParatextRegistration');
              setOpen(false);
            }}
          >
            <User className="tw-w-4 tw-h-4" />
            Profile &amp; Registration
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="tw-w-full tw-justify-start tw-gap-2 tw-text-xs tw-h-8"
            onClick={() => {
              sendCommand('paratextRegistration.showInternetSettings');
              setOpen(false);
            }}
          >
            <Network className="tw-w-4 tw-h-4" />
            Network Settings
          </Button>
        </div>

        {/* Language selector */}
        <div className="tw-px-4 tw-py-2 tw-flex tw-items-center tw-justify-between tw-border-b tw-border-border">
          <span className="tw-text-sm tw-flex tw-items-center tw-gap-2">
            <Globe className="tw-w-4 tw-h-4 tw-text-muted-foreground" /> Language
          </span>
          <div className="tw-flex tw-items-center tw-bg-muted tw-rounded-lg tw-p-0.5 tw-gap-0.5">
            {[
              { id: 'en', label: 'EN' },
              { id: 'fr', label: 'FR' },
              { id: 'es', label: 'ES' },
            ].map(({ id, label }) => {
              const isActive = Array.isArray(interfaceLanguage) && interfaceLanguage[0] === id;
              return (
                <button
                  type="button"
                  key={id}
                  onClick={() => setInterfaceLanguage([id])}
                  className={`tw-px-2 tw-py-1 tw-rounded-md tw-text-xs tw-font-medium tw-transition-all ${isActive ? 'tw-bg-background tw-shadow-sm' : 'tw-text-muted-foreground hover:tw-text-foreground hover:tw-bg-background/50'}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Appearance / Theme toggle */}
        <div className="tw-px-4 tw-py-2 tw-flex tw-items-center tw-justify-between">
          <span className="tw-text-sm">Appearance</span>
          <div className="tw-flex tw-items-center tw-bg-muted tw-rounded-lg tw-p-0.5 tw-gap-0.5">
            {[
              { id: 'light', Icon: Sun, label: 'Light' },
              { id: 'dark', Icon: Moon, label: 'Dark' },
            ].map(({ id, Icon, label }) => {
              const isActive = themeTypeEffective === id;
              return (
                <button
                  type="button"
                  key={id}
                  onClick={() => handleThemeChange(id as 'light' | 'dark')}
                  disabled={!isThemeLoadedNotError}
                  title={label}
                  className={`tw-p-1.5 tw-rounded-md tw-transition-all ${isActive ? 'tw-bg-background tw-shadow-sm' : 'tw-text-muted-foreground hover:tw-text-foreground hover:tw-bg-background/50'}`}
                >
                  <Icon className="tw-w-3.5 tw-h-3.5" />
                </button>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
