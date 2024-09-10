import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';
import { ReactComponent as InlineLogoAndName } from '@assets/Lockup Inline.svg';
import { LocalizeKey } from 'platform-bible-utils';
import PackageInfo from '../../../release/app/package.json';

export const TAB_TYPE_ABOUT = 'about';

const STRING_KEYS: LocalizeKey[] = ['%product_name%'];

export default function AboutPanel() {
  const [{ '%product_name%': productName }] = useLocalizedStrings(STRING_KEYS);
  const [{ '%about_versionLabel%': versionLabel }] = useLocalizedStrings(STRING_KEYS);
  const [{ '%about_licenseLabel%': licenseLabel }] = useLocalizedStrings(STRING_KEYS);
  return (
    <div className="about-panel">
      <div className="hello">
        <InlineLogoAndName />
        <h1>{productName}</h1>
        <p>License: {PackageInfo.license}</p>
        <p>Copyright © 2022-2024 SIL International</p>
        <p>
          {versionLabel}
          {PackageInfo.version}
        </p>
        <p>
          {licenseLabel}
          {PackageInfo.license}
        </p>
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
