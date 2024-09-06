import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';
import { ReactComponent as LockupInlinePlatformIcon } from '@assets/Lockup Inline Platform 240.svg';
import PackageInfo from '../../../release/app/package.json';

export const TAB_TYPE_ABOUT = 'about';

export default function AboutPanel() {
  return (
    <div className="about-panel">
      <div className="hello">
        <LockupInlinePlatformIcon />
        <p>Copyright © 2022-2024 SIL</p>
        <p>Version: {PackageInfo.version}</p>
        <p>License: {PackageInfo.license}</p>
        <p>{PackageInfo.description}</p>
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
