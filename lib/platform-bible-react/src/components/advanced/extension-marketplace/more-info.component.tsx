import { CircleHelp, Link as LucideLink, User } from 'lucide-react';
import { NumberFormat } from 'platform-bible-utils';

/** Interface that stores the parameters passed to the More Info component */
interface MoreInfoProps {
  /** Optional unique identifier */
  id?: string;
  /** The category of the extension */
  category: string;
  /** The number of downloads for the extension */
  downloads: Record<string, number>;
  /** The languages supported by the extension */
  languages: string[];
  /** The URL to the more info page of the extension */
  moreInfoUrl: string;
}
/**
 * This component displays the more info section of the extension which includes the category,
 * number of downloads, languages, and links to the website and support
 *
 * @param MoreInfoProps
 * @returns {JSX.Element} - Returns the more info component that displays the category, number of
 *   downloads, languages, and links to the website and support
 */
export function MoreInfo({ id, category, downloads, languages, moreInfoUrl }: MoreInfoProps) {
  /**
   * This constant formats the number of downloads into a more readable format.
   *
   * @example 1000 -> 1K
   *
   * @example 1000000 -> 1M
   *
   * @returns The formatted number of downloads
   */
  const numberFormatted = new NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(Object.values(downloads).reduce((a: number, b: number) => a + b, 0));

  /** This function scrolls the window to the bottom of the page. */
  const handleScrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <div
      id={id}
      className="tw-flex tw-flex-wrap tw-items-start tw-space-x-4 tw-border-b tw-border-t tw-bg-white tw-pb-4 tw-pt-4"
    >
      <div className="tw-flex tw-flex-col tw-items-center">
        <div className="tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1">
          <span className="tw-text-xs tw-font-semibold tw-text-gray-700">{category}</span>
        </div>
        <span className="tw-text-xs tw-text-gray-500">CATEGORY</span>
      </div>
      <div className="tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" />
      <div className="tw-flex tw-flex-col tw-items-center">
        <div className="tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1">
          <User className="tw-mr-1 tw-h-4 tw-w-4" />
          <span className="tw-text-xs tw-font-semibold tw-text-gray-700">{numberFormatted}</span>
        </div>
        <span className="tw-text-xs tw-text-gray-500">USERS</span>
      </div>
      <div className="tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" />
      <div className="tw-flex tw-flex-col tw-items-center">
        <div className="tw-flex tw-items-center">
          {languages.slice(0, 3).map((locale) => (
            <span
              key={locale}
              className="tw-ml-1 tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-gray-700"
            >
              {locale.toUpperCase()}
            </span>
          ))}
        </div>
        {languages.length > 3 && (
          <button
            type="button"
            onClick={() => handleScrollToBottom()}
            className="tw-text-xs tw-text-gray-500 tw-underline"
          >
            +{languages.length - 3} more languages
          </button>
        )}
      </div>
      <div className="tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" />
      <div className="tw-ml-auto tw-flex tw-flex-col tw-space-y-2">
        <a
          href={moreInfoUrl}
          target="_blank"
          rel="noreferrer"
          className="tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline"
        >
          Website
          <LucideLink className="tw-ml-1 tw-inline tw-h-4 tw-w-4" />
        </a>
        <a
          href="https://example.com"
          target="_blank"
          rel="noreferrer"
          className="tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline"
        >
          Support
          <CircleHelp className="tw-ml-1 tw-inline tw-h-4 tw-w-4" />
        </a>
      </div>
    </div>
  );
}

export default MoreInfo;
