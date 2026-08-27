import { ReactComponent as InlineLogoAndName } from '@assets/Lockup Inline.svg';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { appService } from '@shared/services/app.service';
import { AppInfo } from '@shared/services/app.service-model';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { ExternalLink } from 'lucide-react';
import { Button, usePromise } from 'platform-bible-react';
import {
  formatReplacementString,
  formatReplacementStringToArray,
  LocalizeKey,
} from 'platform-bible-utils';
import { Fragment, ReactNode, useCallback, useId } from 'react';
import packageInfo from '../../../../release/app/package.json';
import { resolveLicenseDisplay } from './about-dialog.data';
import './about-dialog.component.scss';
import { DIALOG_BASE } from './dialog-base.data';
import { ABOUT_DIALOG_TYPE, DialogDefinition } from './dialog-definition.model';

export const TAB_TYPE_ABOUT = 'about';

const DB_IP_WEBSITE_LINK = 'https://db-ip.com';
const DB_IP_WEBSITE_NAME = 'DB-IP';
const DB_IP_LICENSE = 'CC BY 4.0';
const DB_IP_ATTRIBUTION_LINK = 'https://creativecommons.org/licenses/by/4.0/';

/**
 * Years the application's copyright covers. Kept out of the localized string so advancing the range
 * does not need a new key in every language. Canonical statement: LICENSING.md's Copyright section,
 * which README.md repeats.
 */
const COPYRIGHT_YEARS = '2017-2026';

const STRING_KEYS: LocalizeKey[] = [
  '%product_name%',
  '%about_versionLabel_format%',
  '%about_licenseLabel_format%',
  '%about_licenseLabel_termsOfService%',
  '%about_copyright_format%',
  '%about_db_ip_attribution_format%',
  '%about_db_ip_attribution_intro%',
  '%about_db_ip_attribution_terms%',
  '%ariaLabel_opensInBrowser%',
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
      '%about_licenseLabel_termsOfService%': termsOfService,
      '%about_copyright_format%': copyrightFormat,
      '%about_db_ip_attribution_format%': dbIpAttributionFormat,
      '%about_db_ip_attribution_intro%': dbIpAttributionIntro,
      '%about_db_ip_attribution_terms%': dbIpAttributionTerms,
      '%ariaLabel_opensInBrowser%': opensExternallyLabel,
    },
  ] = useLocalizedStrings(STRING_KEYS);

  // Ideally we would load everything from appService, but it doesn't provide information about the
  // license or description, so we have to load it from package.json at least for now.
  const [appInfo] = usePromise<AppInfo>(
    useCallback(async () => appService.getAppInfo(), []),
    defaultAppInfo,
  );
  if (appInfo.version) packageInfo.version = appInfo.version;

  const opensExternallyId = useId();

  const openTermsOfService = useCallback(() => {
    sendCommand('platform.openTermsOfService').catch((e) => {
      logger.warn(`About dialog could not open the Terms of Service. ${e}`);
    });
  }, []);

  const licenseDisplay = resolveLicenseDisplay(packageInfo.license, termsOfService);
  // The Terms of Service ship beside the application rather than at a URL, so this opens the
  // installed document through the operating system instead of navigating anywhere.
  //
  // A button is named from its contents, which folds in every descendant's accessible name - so a
  // label on the icon becomes part of the button's name ("Terms of Service Opens externally in a
  // browser window") rather than staying beside it. It is carried as a DESCRIPTION instead, on a
  // visually-hidden sibling outside the button so name-from-contents cannot reach it, leaving the
  // visible text as the whole accessible name (WCAG 2.5.3). The icon is decorative and hidden:
  // lucide adds `aria-hidden` only when no accessibility prop is passed, so passing one is exactly
  // what exposes the icon.
  const licenseContent: ReactNode = licenseDisplay.isTermsOfService ? (
    <>
      <Button
        variant="link"
        className="tw:h-auto tw:p-0"
        onClick={openTermsOfService}
        aria-describedby={opensExternallyId}
      >
        {licenseDisplay.name}
        <ExternalLink aria-hidden="true" />
      </Button>
      <span id={opensExternallyId} className="tw:sr-only">
        {opensExternallyLabel}
      </span>
    </>
  ) : (
    licenseDisplay.name
  );

  return (
    <div className="about-scroll-container">
      <div className="about-content">
        <InlineLogoAndName className="about-logo" />
        <h1 className="about-title">{productName}</h1>
        <p className="about-description">{packageInfo.description}</p>
        <p className="about-version">{formatReplacementString(versionLabelFormat, packageInfo)}</p>
        <p className="about-license">
          {/* The explicit type argument keeps `packageInfo`'s non-string fields (`author`, `scripts`)
              from widening what the array is inferred to hold. */}
          {formatReplacementStringToArray<ReactNode>(licenseLabelFormat, {
            ...packageInfo,
            license: licenseContent,
          }).map((contribution, index) => (
            // We can use index as key here because the array is static and will not change.
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={`key-${index}`}>{contribution}</Fragment>
          ))}
        </p>
        <p className="about-attribution">
          {formatReplacementString(copyrightFormat, { years: COPYRIGHT_YEARS })}
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
