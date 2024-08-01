import { CircleHelp, Link as LucideLink, User } from 'lucide-react';

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
 * @param id Optional unique identifier
 * @param category The category of the extension
 * @param downloads The number of downloads for the extension
 * @param languages The languages supported by the extension
 * @param moreInfoUrl The URL to the more info page of the extension
 * @returns {JSX.Element} - Returns the more info component that displays the category, number of
 *   downloads, languages, and links to the website and support
 */
export default function MoreInfo({
  id,
  category,
  downloads,
  languages,
  moreInfoUrl,
}: MoreInfoProps) {
  const handleScrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <div
      id={id}
      className="pr-flex pr-flex-wrap pr-items-start pr-space-x-4 pr-border-b pr-border-t pr-bg-white pr-pb-4 pr-pt-4"
    >
      <div className="pr-flex pr-flex-col pr-items-center">
        <div className="pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1">
          <span className="pr-text-xs pr-font-semibold pr-text-gray-700">{category}</span>
        </div>
        <span className="pr-text-xs pr-text-gray-500">CATEGORY</span>
      </div>
      <div className="pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300" />
      <div className="pr-flex pr-flex-col pr-items-center">
        <div className="pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1">
          <User className="pr-mr-1 pr-h-4 pr-w-4" />
          <span className="pr-text-xs pr-font-semibold pr-text-gray-700">
            {Object.values(downloads).reduce((a: number, b: number) => a + b, 0)}
          </span>
        </div>
        <span className="pr-text-xs pr-text-gray-500">USERS</span>
      </div>
      <div className="pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300" />
      <div className="pr-flex pr-flex-col pr-items-center">
        <div className="pr-flex pr-items-center">
          {languages.slice(0, 3).map((locale) => (
            <span
              key={locale}
              className="pr-ml-1 pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1 pr-text-xs pr-font-semibold pr-text-gray-700"
            >
              {locale.toUpperCase()}
            </span>
          ))}
        </div>
        {languages.length > 3 && (
          <button
            type="button"
            onClick={() => handleScrollToBottom()}
            className="pr-text-xs pr-text-gray-500 pr-underline"
          >
            +{languages.length - 3} more languages
          </button>
        )}
      </div>
      <div className="pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300" />
      <div className="pr-ml-auto pr-flex pr-flex-col pr-space-y-2">
        <a
          href={moreInfoUrl}
          className="pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline"
        >
          Website
          <LucideLink className="pr-ml-1 pr-inline pr-h-4 pr-w-4" />
        </a>
        <a
          href="https://placeholder.com"
          className="pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline"
        >
          Support
          <CircleHelp className="pr-ml-1 pr-inline pr-h-4 pr-w-4" />
        </a>
      </div>
    </div>
  );
}
