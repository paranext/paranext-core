import './paranext-tab-title.component.css';
import logger from '@shared/services/logger.service';

/**
 * Custom tab title for all tabs in Paranext
 * @param text The text to show on the tab title
 */
export default function ParanextTabTitle({ text }: { text: string }) {
  const toggleDropdown = () => {
    logger.info('Pretend a menu was shown!');
  };

  return (
    <div className="title">
      <button
        type="button"
        className="tab-menu-button"
        aria-label="Tab Menu"
        onClick={toggleDropdown}
      />
      <span>{text}</span>
    </div>
  );
}
