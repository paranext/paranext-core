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
      className="tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center"
    >
      <div className="tw-flex tw-flex-col tw-items-center tw-gap-1">
        <div className="tw-flex">
          <span className="tw-text-xs tw-font-semibold tw-text-foreground">{category}</span>
        </div>
        <span className="tw-text-xs tw-text-foreground">CATEGORY</span>
      </div>
      <div className="tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4">
        <div className="tw-flex tw-gap-1">
          <User className="tw-h-4 tw-w-4" />
          <span className="tw-text-xs tw-font-semibold tw-text-foreground">{numberFormatted}</span>
        </div>
        <span className="tw-text-xs tw-text-foreground">USERS</span>
      </div>
      <div className="tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4">
        <div className="tw-flex tw-gap-2">
          {languages.slice(0, 3).map((locale) => (
            <span key={locale} className="tw-text-xs tw-font-semibold tw-text-foreground">
              {locale.toUpperCase()}
            </span>
          ))}
        </div>
        {languages.length > 3 && (
          <button
            type="button"
            onClick={() => handleScrollToBottom()}
            className="tw-text-xs tw-text-foreground tw-underline"
          >
            +{languages.length - 3} more languages
          </button>
        )}
      </div>
      <div className="tw-flex tw-flex-col tw-gap-1 tw-ps-4">
        <div className="tw-flex tw-gap-1">
          <a
            href={moreInfoUrl}
            target="_blank"
            rel="noreferrer"
            className="tw-flex tw-text-xs tw-font-semibold tw-text-foreground tw-underline"
          >
            Website
          </a>
          <LucideLink className="tw-h-4 tw-w-4" />
        </div>
        <div className="tw-flex tw-gap-1">
          <a
            href="https://example.com"
            target="_blank"
            rel="noreferrer"
            className="tw-flex tw-text-xs tw-font-semibold tw-text-foreground tw-underline"
          >
            Support
          </a>
          <CircleHelp className="tw-h-4 tw-w-4" />
        </div>
      </div>
    </div>
  );
}

export default MoreInfo;
