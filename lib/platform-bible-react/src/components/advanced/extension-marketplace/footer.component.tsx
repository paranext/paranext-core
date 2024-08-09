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
 * @param id Optional unique identifier
 * @param publisherDisplayName Name of the publisher
 * @param fileSize Size of the extension file in bytes
 * @param locales List of language codes supported by the extension
 * @param versionHistory Object containing the version history mapped with their information
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
    <div id={id} className="pr-border-t pr-pb-4 pr-pt-4">
      <div className="pr-md:flex-row pr-md:space-x-8 pr-flex pr-flex-col pr-space-x-0">
        <VersionHistory versionHistory={versionHistory} />
        <div className="pr-md:border-t-0 pr-md:border-l pr-md-h-auto pr-md-ml-8 pr-mt-4 pr-border-t pr-border-gray-300" />
        <div className="pr-md:mt-0 pr-mt-4 pr-flex-1 pr-space-y-3">
          <h2 className="pr-text-md pr-font-semibold">Information</h2>
          <div className="pr-flex pr-items-start pr-justify-between pr-pr-4 pr-text-xs pr-text-gray-600">
            <p className="pr-flex pr-flex-col pr-justify-start">
              <span className="pr-mb-2">Publisher</span>
              <span className="pr-font-semibold">{publisherDisplayName}</span>
              <span className="pr-mb-2 pr-mt-4">Size</span>
              <span className="pr-font-semibold">{formattedFileSize}</span>
            </p>
            <div className="pr-flex pr-w-3/4 pr-items-center pr-justify-between pr-text-xs pr-text-gray-600">
              <p className="pr-flex pr-flex-col pr-justify-start">
                <span className="pr-mb-2">Languages</span>
                <span className="pr-font-semibold">{languageNames.join(', ')}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
