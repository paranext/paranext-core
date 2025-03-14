import { useData, useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import menuDataService from '@shared/services/menu-data.service';
import {
  CommandHandler,
  HamburgerMenuButton,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { isLocalizeKey, isPlatformError, LocalizeKey } from 'platform-bible-utils';
import { useCallback, useMemo, useRef } from 'react';
import { handleMenuCommand } from '../platform-bible-menu.commands';
import './platform-tab-title.component.scss';

type PlatformTabTitleProps = {
  /** What type of WebView this is. Unique to all other WebView definitions */
  webViewType?: `${string}.${string}`;
  /** Id of the tab this title is on */
  tabId: string;
  /** Url to image to show on the tab. Defaults to the software's standard logo. */
  iconUrl?: string;
  /** Text to show on the tab */
  text: string | LocalizeKey;
  /** Text to show when hovering over the tab. Defaults to empty string */
  tooltip?: string;
};

/**
 * Custom tab title for all tabs in Platform
 *
 * @param iconUrl Url to image to show on the tab. Defaults to the software's standard logo.
 * @param text The text to show on the tab title
 * @param tooltip Text to show when hovering over the tab. Defaults to empty string
 */
export default function PlatformTabTitle({
  webViewType,
  tabId,
  iconUrl,
  text,
  tooltip,
}: PlatformTabTitleProps) {
  const menuSelector = webViewType ?? 'invalid.invalid';

  const tabAria: LocalizeKey = '%tab_aria_tab%';
  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => (isLocalizeKey(text) ? [text, tabAria] : [tabAria]), [text]),
  );
  const title = isLocalizeKey(text) ? localizedStrings[text] : text;
  const tabLabel = localizedStrings[tabAria];

  const menuInfo = useData(webViewType ? menuDataService.dataProviderName : undefined).WebViewMenu(
    menuSelector,
    {
      topMenu: undefined,
      includeDefaults: true,
      contextMenu: undefined,
    },
  );

  const [webViewMenu, , isLoading] = menuInfo;

  const icon = (
    <div
      className="tab-menu-icon"
      style={
        iconUrl
          ? {
              backgroundImage: `url(${iconUrl})`,
            }
          : undefined
      }
    />
  );

  // This ref will always be defined
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const containerRef = useRef<HTMLDivElement>(undefined!);

  const commandHandler = useCallback<CommandHandler>(
    (command) => {
      handleMenuCommand(command, tabId);
    },
    [tabId],
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div ref={containerRef} className="title">
            {isLoading || isPlatformError(webViewMenu) || !webViewMenu?.topMenu ? (
              icon
            ) : (
              <HamburgerMenuButton
                commandHandler={commandHandler}
                normalMenu={isPlatformError(webViewMenu) ? undefined : webViewMenu?.topMenu}
                className="tab-menu-button"
                aria-label={tabLabel}
                containerRef={containerRef}
              >
                {icon}
              </HamburgerMenuButton>
            )}
            <span>{title}</span>
          </div>
        </TooltipTrigger>
        {tooltip && (
          <TooltipContent className="tooltip" side="right">
            <p>{tooltip}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
