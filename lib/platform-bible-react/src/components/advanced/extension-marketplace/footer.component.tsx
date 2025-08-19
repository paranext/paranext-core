import { useMemo } from 'react';
import { formatBytes, getCurrentLocale } from 'platform-bible-utils';
import { VersionHistory, VersionHistoryType } from './version-history.component';

/** Interface to store the parameters passed to the Footer component */
interface FooterProps {
  /** Optional unique identifier */
  id?: string;
  /** Name of the publisher */
  publisherDisplayName: string;
  /** Size of the extension file in bytes */
  fileSize: number;
  /** List of language codes supported by the extension */
  locales: string[];
  /** Object containing the version history mapped with their information */
  versionHistory: VersionHistoryType;
  /** Current version of the extension */
  currentVersion: string;
}

/**
 * Component to render the footer for the extension details which contains information on the
 * publisher, version history, languages, and file size.
 *
 * @param FooterProps
 * @returns The rendered Footer component
 */
export function Footer({
  id,
  publisherDisplayName,
  fileSize,
  locales,
  versionHistory,
  currentVersion,
}: FooterProps) {
  /** Formats the file size into a human-readable format */
  const formattedFileSize = useMemo(() => formatBytes(fileSize), [fileSize]);

  /**
   * This function gets the display names of the languages based on the language codes.
   *
   * @param codes The list of language codes
   * @returns The list of language names
   */
  const getLanguageNames = (codes: string[]) => {
    const displayNames = new Intl.DisplayNames(getCurrentLocale(), { type: 'language' });
    return codes.map((code) => displayNames.of(code));
  };

  const languageNames = getLanguageNames(locales);

  return (
    <div id={id} className="tw-border-t tw-py-2">
      <div className="tw-flex tw-flex-col tw-gap-2 tw-divide-y">
        {Object.entries(versionHistory).length > 0 && (
          <VersionHistory versionHistory={versionHistory} />
        )}
        <div className="tw-flex tw-flex-col tw-gap-2 tw-py-2">
          <h2 className="tw-text-md tw-font-semibold">Information</h2>
          <div className="tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground">
            <p className="tw-flex tw-flex-col tw-justify-start tw-gap-1">
              <span>Publisher</span>
              <span className="tw-font-semibold">{publisherDisplayName}</span>
              <span>Size</span>
              <span className="tw-font-semibold">{formattedFileSize}</span>
            </p>
            <div className="tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground">
              <p className="tw-flex tw-flex-col tw-justify-start tw-gap-1">
                <span>Version</span>
                <span className="tw-font-semibold">{currentVersion}</span>
                <span>Languages</span>
                <span className="tw-font-semibold">{languageNames.join(', ')}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
