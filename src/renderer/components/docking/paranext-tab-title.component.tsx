import './paranext-tab-title.component.css';
import logger from '@shared/services/logger.service';

type ParanextTabTitleProps = {
  /** Url to image to show on the tab. Defaults to Platform.Bible logo */
  iconUrl?: string;
  /** Text to show on the tab */
  text: string;
};

/**
 * Custom tab title for all tabs in Paranext
 * @param text The text to show on the tab title
 */
export default function ParanextTabTitle({ iconUrl, text }: ParanextTabTitleProps) {
  const toggleDropdown = () => {
    logger.info('Pretend a menu was shown!');
  };

  return (
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
  );
}
