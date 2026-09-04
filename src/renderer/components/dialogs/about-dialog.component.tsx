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
import { Fragment, ReactNode, useCallback, useId, useMemo, useState } from 'react';
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
  '%about_ariaLabel_opensTermsOfService%',
  '%about_error_couldNotOpenTermsOfService%',
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
      '%about_ariaLabel_opensTermsOfService%': opensTermsOfServiceLabel,
      '%about_error_couldNotOpenTermsOfService%': couldNotOpenTermsOfService,
    },
  ] = useLocalizedStrings(STRING_KEYS);

  // Ideally we would load everything from appService, but it doesn't provide information about the
  // license or description, so we have to load it from package.json at least for now.
  const [appInfo] = usePromise<AppInfo>(
    useCallback(async () => appService.getAppInfo(), []),
    defaultAppInfo,
  );
  // Derived, never written back onto `packageInfo`. That object is the shared
  // `release/app/package.json` module instance, and assigning to it during render mutates something
  // outside the component - the pattern React disallows, and the one StrictMode double-rendering
  // and concurrent features expose. It matters more here than it reads: this same object now feeds
  // the license display below, so the legal statement the dialog makes would be resolved off an
  // object patched in place on whichever render `usePromise` happened to settle on.
  //
  // The value is worth keeping. `APP_VERSION` appends SemVer build metadata, so the dialog shows
  // `0.6.0-alpha.0+github.20260831142233.18234567890` rather than a bare `0.6.0-alpha.0` - the
  // difference between a bug report that can be pinned to a build and one that cannot.
  const displayInfo = useMemo(
    () => ({ ...packageInfo, version: appInfo.version || packageInfo.version }),
    [appInfo.version],
  );

  const opensTermsOfServiceId = useId();
  const [didOpenTermsOfServiceFail, setDidOpenTermsOfServiceFail] = useState(false);

  // The command reports an open it could not perform, and this is the only place a user can be told
  // about it: the main process reveals the document in the file manager as a fallback, but on a
  // stock Windows machine with no Markdown handler that leaves the user looking at a file manager
  // they did not ask for, and inside the snap - whose confinement does not reach
  // `org.freedesktop.FileManager1` - the button appears to do nothing at all.
  const openTermsOfService = useCallback(() => {
    setDidOpenTermsOfServiceFail(false);
    sendCommand('platform.openTermsOfService').catch((e) => {
      logger.warn(`About dialog could not open the Terms of Service. ${e}`);
      setDidOpenTermsOfServiceFail(true);
    });
  }, []);

  const licenseDisplay = resolveLicenseDisplay(displayInfo.license, termsOfService);
  // The Terms of Service ship beside the application rather than at a URL, so this opens the
  // installed document through the operating system instead of navigating anywhere.
  //
  // The description says "your default application for Markdown files", not "a browser window":
  // the Terms of Service ship as an installed file and `platform.openTermsOfService` hands the path
  // to the operating system, so whatever opens Markdown there is what appears - often not a browser.
  //
  // A button is named from its contents, which folds in every descendant's accessible name - so a
  // label on the icon becomes part of the button's name rather than staying beside it. It is
  // carried as a DESCRIPTION instead, on a
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
        aria-describedby={opensTermsOfServiceId}
      >
        {licenseDisplay.name}
        <ExternalLink aria-hidden="true" />
      </Button>
      <span id={opensTermsOfServiceId} className="tw:sr-only">
        {opensTermsOfServiceLabel}
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
        <p className="about-description">{displayInfo.description}</p>
        <p className="about-version">{formatReplacementString(versionLabelFormat, displayInfo)}</p>
        <p className="about-license">
          {/* The explicit type argument keeps `displayInfo`'s non-string fields (`author`, `scripts`)
              from widening what the array is inferred to hold. */}
          {formatReplacementStringToArray<ReactNode>(licenseLabelFormat, {
            ...displayInfo,
            license: licenseContent,
          }).map((contribution, index) => (
            // We can use index as key here because the array is static and will not change.
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={`key-${index}`}>{contribution}</Fragment>
          ))}
        </p>
        {didOpenTermsOfServiceFail && (
          <p className="about-license-error" role="alert">
            {couldNotOpenTermsOfService}
          </p>
        )}
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
