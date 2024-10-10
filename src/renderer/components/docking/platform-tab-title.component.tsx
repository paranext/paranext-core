import { Tooltip } from '@mui/material';
import { CommandHandler, HamburgerMenuButton } from 'platform-bible-react';
import './platform-tab-title.component.scss';
import menuDataService from '@shared/services/menu-data.service';
import { useData, useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { useCallback, useRef } from 'react';
import { isLocalizeKey, LocalizeKey } from 'platform-bible-utils';
import { handleMenuCommand } from '../platform-bible-menu.commands';

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
  const [localizedStrings] = useLocalizedStrings(isLocalizeKey(text) ? [text, tabAria] : [tabAria]);
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

  const tooltipDiv = tooltip ? <div className="tooltip">{tooltip}</div> : '';

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
    <Tooltip title={tooltipDiv}>
      <div ref={containerRef} className="title">
        {isLoading || !webViewMenu?.topMenu ? (
          icon
        ) : (
          <HamburgerMenuButton
            commandHandler={commandHandler}
            normalMenu={webViewMenu?.topMenu}
            className="tab-menu-button"
            aria-label={tabLabel}
            containerRef={containerRef}
          >
            {icon}
          </HamburgerMenuButton>
        )}
        <span>{title}</span>
      </div>
    </Tooltip>
  );
}
