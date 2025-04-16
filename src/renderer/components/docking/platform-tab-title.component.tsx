import { useData, useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { menuDataService } from '@shared/services/menu-data.service';
import {
  CommandHandler,
  TabDropdownMenu,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { isLocalizeKey, isPlatformError, LocalizeKey } from 'platform-bible-utils';
import { useCallback, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { handleMenuCommand } from '@shared/data/platform-bible-menu.commands';
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
export function PlatformTabTitle({
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
              <div className="tw-p-1 tw-cursor-default">{icon}</div>
            ) : (
              <TabDropdownMenu
                variant="muted"
                commandHandler={commandHandler}
                menuData={webViewMenu.topMenu}
                tabLabel={tabLabel}
                icon={icon}
              />
            )}
            <span>{title}</span>
          </div>
        </TooltipTrigger>
        {tooltip &&
          createPortal(
            <TooltipContent className="tooltip" side="bottom">
              <p>{tooltip}</p>
            </TooltipContent>,
            document.body,
          )}
      </Tooltip>
    </TooltipProvider>
  );
}

export default PlatformTabTitle;
