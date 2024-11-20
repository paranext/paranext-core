import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';
import { ReactComponent as InlineLogoAndName } from '@assets/Lockup Inline.svg';
import { formatReplacementString, LocalizeKey } from 'platform-bible-utils';
import { ReactElement } from 'react';
import PackageInfo from '../../../release/app/package.json';

export const TAB_TYPE_ABOUT = 'about';

const DB_IP_WEBSITE_LINK = 'https://db-ip.com';
const DB_IP_WEBSITE_NAME = 'DB-IP';
const DB_IP_LICENSE = 'CC BY 4.0';
const DB_IP_ATTRIBUTION_LINK = 'https://creativecommons.org/licenses/by/4.0/';

const STRING_KEYS: LocalizeKey[] = [
  '%product_name%',
  '%about_versionLabel_format%',
  '%about_licenseLabel_format%',
  '%about_db_ip_attribution_format%',
  '%about_db_ip_attribution_intro%',
  '%about_db_ip_attribution_terms%',
];

export default function AboutPanel() {
  const [
    {
      '%product_name%': productName,
      '%about_versionLabel_format%': versionLabelFormat,
      '%about_licenseLabel_format%': licenseLabelFormat,
      '%about_db_ip_attribution_format%': dbIpAttributionFormat,
      '%about_db_ip_attribution_intro%': dbIpAttributionIntro,
      '%about_db_ip_attribution_terms%': dbIpAttributionTerms,
    },
  ] = useLocalizedStrings(STRING_KEYS);

  const attributionLinkElements: { [linkName: string]: ReactElement } = {
    websiteLink: (
      <a target="_blank" rel="noreferrer" href={DB_IP_WEBSITE_LINK}>
        {DB_IP_WEBSITE_NAME}
      </a>
    ),
    terms: (
      <a target="_blank" rel="noreferrer" href={DB_IP_ATTRIBUTION_LINK}>
        {dbIpAttributionTerms}
      </a>
    ),
  };

  return (
    <div className="about-panel dark">
      <div className="about">
        <InlineLogoAndName width="80%" />
        <h1>{productName}</h1>
        <p>Copyright © 2022-2024 SIL International</p>
        <p>{formatReplacementString(versionLabelFormat, PackageInfo)}</p>
        <p>{formatReplacementString(licenseLabelFormat, PackageInfo)}</p>
        <p>{PackageInfo.description}</p>
        <p>
          {formatReplacementString(dbIpAttributionFormat, {
            intro: dbIpAttributionIntro,
            websiteLink: '{websiteLink}',
            license: DB_IP_LICENSE,
            terms: '{terms}',
          })
            .split('{')
            .flatMap((attributionPart) => {
              const closingBraceIndex = attributionPart.indexOf('}');
              if (closingBraceIndex < 0) return attributionPart;
              const linkName = attributionPart.substring(0, closingBraceIndex);
              return [
                attributionLinkElements[linkName],
                attributionPart.substring(closingBraceIndex + 1),
              ];
            })}
        </p>
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
