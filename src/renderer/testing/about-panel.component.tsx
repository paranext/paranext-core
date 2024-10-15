import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';
import { ReactComponent as InlineLogoAndName } from '@assets/Lockup Inline.svg';
import { formatReplacementString, LocalizeKey } from 'platform-bible-utils';
import { useMemo } from 'react';
import PackageInfo from '../../../release/app/package.json';

export const TAB_TYPE_ABOUT = 'about';

const STRING_KEYS: LocalizeKey[] = [
  '%product_name%',
  '%about_versionLabel_format%',
  '%about_licenseLabel_format%',
];

export default function AboutPanel() {
  const [
    {
      '%product_name%': productName,
      '%about_versionLabel_format%': versionLabelFormat,
      '%about_licenseLabel_format%': licenseLabelFormat,
    },
  ] = useLocalizedStrings(useMemo(() => STRING_KEYS, []));

  // logger.info());

  return (
    <div className="about-panel dark">
      <div className="about">
        <InlineLogoAndName width="80%" />
        <h1>{productName}</h1>
        <p>Copyright © 2022-2024 SIL International</p>
        <p>{formatReplacementString(versionLabelFormat, PackageInfo)}</p>
        <p>{formatReplacementString(licenseLabelFormat, PackageInfo)}</p>
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
