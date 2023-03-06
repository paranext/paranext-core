import './ParanextTabTitle.css';
import logger from '@shared/util/logger';

/**
 * Custom tab title for all tabs in Paranext
 * @param text The text to show on the tab title
 */
const ParanextTabTitle = ({ text }: { text: string }) => {
  const toggleDropdown = () => {
    logger.log('Pretend a menu was shown!');
  };

  return (
    <div className="title">
      <button
        type="button"
        className="tabMenuButton"
        aria-label="Tab Menu"
        onClick={toggleDropdown}
      />
      <span>{text}</span>
    </div>
  );
};

export default ParanextTabTitle;
