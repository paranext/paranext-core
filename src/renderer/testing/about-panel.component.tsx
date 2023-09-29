import icon from '@assets/icon.png';
import { SavedTabInfo, TabInfo } from '@shared/data/web-view.model';

export const TAB_TYPE_ABOUT = 'about';

export default function AboutPanel() {
  return (
    <div className="about-panel">
      <div className="hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <div className="hello">
        <h1>Platform.Bible</h1>
      </div>
    </div>
  );
}

export function loadAboutTab(savedTabInfo: SavedTabInfo): TabInfo {
  return {
    ...savedTabInfo,
    tabTitle: 'About',
    content: <AboutPanel />,
    minWidth: 230,
    minHeight: 230,
  };
}
