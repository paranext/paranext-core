import { Tooltip } from '@mui/material';
import { HamburgerMenuButton, HamburgerMenuButtonProps } from 'platform-bible-react';
import './platform-tab-title.component.scss';

type PlatformTabTitleProps = {
  /**
   * Optional information about the menu to display. If provided, the "hamburger" menu icon will be
   * shown on the leading side of the icon and/or text label.
   */
  menuInfo?: HamburgerMenuButtonProps;
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
  menuInfo,
  iconUrl,
  text,
  tooltip,
}: PlatformTabTitleProps) {
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

  return (
    <Tooltip title={tooltipDiv}>
      <div className="title">
        {menuInfo ? (
          <HamburgerMenuButton className="tab-menu-button" aria-label="Tab" {...menuInfo}>
            {icon}
          </HamburgerMenuButton>
        ) : (
          icon
        )}
        <span>{text}</span>
      </div>
    </Tooltip>
  );
}
