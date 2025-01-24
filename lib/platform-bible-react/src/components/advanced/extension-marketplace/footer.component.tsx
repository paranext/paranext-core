import { useMemo } from 'react';
import { formatBytes } from 'platform-bible-utils';
import VersionHistory, { VersionHistoryType } from './version-history.component';

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
}

/**
 * Component to render the footer for the extension details which contains information on the
 * publisher, version history, languages, and file size.
 *
 * @param FooterProps
 * @returns The rendered Footer component
 */
export default function Footer({
  id,
  publisherDisplayName,
  fileSize,
  locales,
  versionHistory,
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
    const displayNames = new Intl.DisplayNames(navigator.language, { type: 'language' });
    return codes.map((code) => displayNames.of(code));
  };

  const languageNames = getLanguageNames(locales);

  return (
    <div id={id} className="tw-border-t tw-pb-4 tw-pt-4">
      <div className="tw-md:flex-row tw-md:space-x-8 tw-flex tw-flex-col tw-space-x-0">
        <VersionHistory versionHistory={versionHistory} />
        <div className="tw-md:border-t-0 tw-md:border-l tw-md-h-auto tw-md-ml-8 tw-mt-4 tw-border-t tw-border-gray-300" />
        <div className="tw-md:mt-0 tw-mt-4 tw-flex-1 tw-space-y-3">
          <h2 className="tw-text-md tw-font-semibold">Information</h2>
          <div className="tw-flex tw-items-start tw-justify-between tw-pr-4 tw-text-xs tw-text-gray-600">
            <p className="tw-flex tw-flex-col tw-justify-start">
              <span className="tw-mb-2">Publisher</span>
              <span className="tw-font-semibold">{publisherDisplayName}</span>
              <span className="tw-mb-2 tw-mt-4">Size</span>
              <span className="tw-font-semibold">{formattedFileSize}</span>
            </p>
            <div className="tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-gray-600">
              <p className="tw-flex tw-flex-col tw-justify-start">
                <span className="tw-mb-2">Languages</span>
                <span className="tw-font-semibold">{languageNames.join(', ')}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
