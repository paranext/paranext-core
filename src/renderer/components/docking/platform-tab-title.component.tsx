import { Tooltip } from '@mui/material';
import { HamburgerMenuButton } from 'platform-bible-react';
import './platform-tab-title.component.scss';
import menuDataService from '@shared/services/menu-data.service';
import { useData } from '@renderer/hooks/papi-hooks';
import { useRef } from 'react';
import { handleMenuCommand } from '../platform-bible-menu.commands';

type PlatformTabTitleProps = {
  /** What type of WebView this is. Unique to all other WebView definitions */
  webViewType?: `${string}.${string}`;
  /** Url to image to show on the tab. Defaults to Platform.Bible logo */
  iconUrl?: string;
  /** Text to show on the tab */
  text: string;
  /** Text to show when hovering over the tab. Defaults to empty string */
  tooltip?: string;
};

/**
 * Custom tab title for all tabs in Platform
 *
 * @param iconUrl Url to image to show on the tab. Defaults to Platform.Bible logo
 * @param text The text to show on the tab title
 * @param tooltip Text to show when hovering over the tab. Defaults to empty string
 */
export default function PlatformTabTitle({
  webViewType,
  iconUrl,
  text,
  tooltip,
}: PlatformTabTitleProps) {
  const menuSelector = webViewType ?? 'invalid.invalid';

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

  return (
    <Tooltip title={tooltipDiv}>
      <div ref={containerRef} className="title">
        {isLoading || !webViewMenu?.topMenu ? (
          icon
        ) : (
          <HamburgerMenuButton
            commandHandler={handleMenuCommand}
            normalMenu={webViewMenu?.topMenu}
            className="tab-menu-button"
            aria-label="Tab"
            containerRef={containerRef}
          >
            {icon}
          </HamburgerMenuButton>
        )}
        <span>{text}</span>
      </div>
    </Tooltip>
  );
}
