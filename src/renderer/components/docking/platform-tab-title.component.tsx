import { Tooltip } from '@mui/material';
import './platform-tab-title.component.scss';
import logger from '@shared/services/logger.service';

type PlatformTabTitleProps = {
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
export default function PlatformTabTitle({ iconUrl, text, tooltip }: PlatformTabTitleProps) {
  const toggleDropdown = () => {
    logger.info('Pretend a menu was shown!');
  };

  const tooltipDiv = tooltip ? <div className="tooltip">{tooltip}</div> : '';

  return (
    <Tooltip title={tooltipDiv}>
      <div className="title">
        <button
          type="button"
          className="tab-menu-button"
          style={
            iconUrl
              ? {
                  backgroundImage: `url(${iconUrl})`,
                }
              : undefined
          }
          aria-label="Tab Menu"
          onClick={toggleDropdown}
        />
        <span>{text}</span>
      </div>
    </Tooltip>
  );
}
