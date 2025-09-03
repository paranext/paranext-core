import { ReactComponent as InlineLogoAndName } from '@assets/Lockup Inline.svg';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { appService } from '@shared/services/app.service';
import { AppInfo } from '@shared/services/app.service-model';
import { usePromise } from 'platform-bible-react';
import {
  formatReplacementString,
  formatReplacementStringToArray,
  LocalizeKey,
} from 'platform-bible-utils';
import { Fragment, useCallback } from 'react';
import packageInfo from '../../../../release/app/package.json';
import './about-dialog.component.scss';
import { DIALOG_BASE } from './dialog-base.data';
import { ABOUT_DIALOG_TYPE, DialogDefinition } from './dialog-definition.model';

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

const defaultAppInfo: AppInfo = {
  name: 'ignore',
  version: '',
  uriScheme: 'ignore',
};

function AboutDialog() {
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

  // Ideally we would load everything from appService, but it doesn't provide information about the
  // license or description, so we have to load it from package.json at least for now.
  const [appInfo] = usePromise<AppInfo>(
    useCallback(async () => appService.getAppInfo(), []),
    defaultAppInfo,
  );
  if (appInfo.version) packageInfo.version = appInfo.version;

  return (
    <div className="about">
      <InlineLogoAndName className="about-logo" />
      <h1 className="about-title">{productName}</h1>
      <p className="about-description">{packageInfo.description}</p>
      <p className="about-version">{formatReplacementString(versionLabelFormat, packageInfo)}</p>
      <p className="about-license">{formatReplacementString(licenseLabelFormat, packageInfo)}</p>
      <p className="about-attribution">
        Copyright ©2017-2025 SIL Global and United Bible Societies
      </p>
      <p className="about-db-ip-attribution">
        {formatReplacementStringToArray(dbIpAttributionFormat, {
          intro: dbIpAttributionIntro,
          websiteLink: (
            <a target="_blank" rel="noreferrer" href={DB_IP_WEBSITE_LINK}>
              {DB_IP_WEBSITE_NAME}
            </a>
          ),
          license: DB_IP_LICENSE,
          terms: (
            <a target="_blank" rel="noreferrer" href={DB_IP_ATTRIBUTION_LINK}>
              {dbIpAttributionTerms}
            </a>
          ),
        }).map((contribution, index) => (
          // We can use index as key here because the array is static and will not change.
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={`key-${index}`}>{contribution}</Fragment>
        ))}
      </p>
    </div>
  );
}

export const ABOUT_DIALOG: DialogDefinition<typeof ABOUT_DIALOG_TYPE> = Object.freeze({
  ...DIALOG_BASE,
  tabType: ABOUT_DIALOG_TYPE,
  defaultTitle: '%mainMenu_about%',
  initialSize: {
    width: 800,
    height: 700,
  },
  Component: AboutDialog,
});

export default ABOUT_DIALOG;
