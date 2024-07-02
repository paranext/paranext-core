import icon from '@assets/icon.png';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';
import { LocalizeKey } from 'platform-bible-utils';

export const TAB_TYPE_ABOUT = 'about';

const STRING_KEYS: LocalizeKey[] = ['%product_name%'];

export default function AboutPanel() {
  const [{ '%product_name%': productName }] = useLocalizedStrings(STRING_KEYS);

  return (
    <div className="about-panel">
      <div className="hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <div className="hello">
        <h1>{productName}</h1>
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
