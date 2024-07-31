import VersionHistory from './version-history.component';

/** Interface to store the parameters passed to the Footer component */
interface FooterProps {
  publisherDisplayName: string;
  fileSize: number;
  locales: string[];
  versionHistory: Record<string, { date: string; description: string }>;
}

/**
 * Component to render the footer for the extension details which contains information on the
 * publisher, version history, languages, and file size.
 *
 * @param extension Instance of the current Extension being shown
 * @returns The rendered Footer component
 */
export default function Footer({
  publisherDisplayName,
  fileSize,
  locales,
  versionHistory,
}: FooterProps) {
  const getLanguageNames = (codes: string[]) => {
    const displayNames = new Intl.DisplayNames(navigator.language, { type: 'language' });
    return codes.map((code) => displayNames.of(code));
  };

  const languageNames = getLanguageNames(locales);

  return (
    <div className="pr-border-t pr-pt-4 pr-pb-4">
      <div className="pr-flex pr-flex-col pr-md:flex-row pr-space-x-0 pr-md:space-x-8">
        <VersionHistory versionHistory={versionHistory} />
        <div className="pr-border-t pr-border-gray-300 pr-mt-4 pr-md:border-t-0 pr-md:border-l pr-md-h-auto pr-md-ml-8" />
        <div className="pr-flex-1 pr-mt-4 pr-md:mt-0 pr-space-y-3">
          <h2 className="pr-font-semibold pr-text-md">Information</h2>
          <div className="pr-flex pr-justify-between pr-items-start pr-text-xs pr-text-gray-600 pr-pr-4">
            <p className="pr-flex pr-flex-col pr-justify-start">
              <span className="pr-mb-2">Publisher</span>
              <span className="pr-font-semibold">{publisherDisplayName}</span>
              <span className="pr-mb-2 pr-mt-4">Size</span>
              <span className="pr-font-semibold">{(fileSize / 1000000).toPrecision(3)} MB</span>
            </p>
            <div className="pr-flex pr-justify-between pr-items-center pr-text-xs pr-text-gray-600 pr-w-3/4">
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
