import { CircleHelp, Link as LucideLink, User } from 'lucide-react';

interface MoreInfoProps {
  category: string;
  downloads: Record<string, number>;
  languages: string[];
  moreInfoUrl: string;
}
/**
 * This component displays the more info section of the extension which includes the category,
 * number of downloads, languages, and links to the website and support
 *
 * @param extension The extension object that contains the details of the extension
 * @returns {JSX.Element} - Returns the more info component that displays the category, number of
 *   downloads, languages, and links to the website and support
 */
export default function MoreInfo({ category, downloads, languages, moreInfoUrl }: MoreInfoProps) {
  const handleScrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <div className="pr-flex pr-flex-wrap pr-items-start pr-space-x-4 pr-bg-white pr-border-t pr-border-b pr-pt-4 pr-pb-4">
      <div className="pr-flex pr-flex-col pr-items-center ">
        <div className="pr-flex pr-items-center pr-bg-gray-100 pr-py-1 pr-px-2 pr-rounded-md">
          <span className="pr-text-gray-700 pr-text-xs pr-font-semibold">{category}</span>
        </div>
        <span className="pr-text-gray-500 pr-text-xs">CATEGORY</span>
      </div>
      <div className="pr-border-l pr-border-gray-300 pr-h-10 pr-mx-2" />
      <div className="pr-flex pr-flex-col pr-items-center ">
        <div className="pr-flex pr-items-center pr-bg-gray-100 pr-py-1 pr-px-2 pr-rounded-md">
          <User className="pr-w-4 pr-h-4 pr-mr-1" />
          <span className="pr-text-gray-700 pr-text-xs pr-font-semibold">
            {Object.values(downloads).reduce((a: number, b: number) => a + b, 0)}
          </span>
        </div>
        <span className="pr-text-gray-500 pr-text-xs">USERS</span>
      </div>
      <div className="pr-border-l pr-border-gray-300 pr-h-10 pr-mx-2" />
      <div className="pr-flex pr-flex-col pr-items-center ">
        <div className="pr-flex pr-items-center ">
          {languages.slice(0, 3).map((locale) => (
            <span
              key={locale}
              className="pr-bg-gray-100 pr-py-1 pr-px-2 pr-rounded-md pr-text-xs pr-text-gray-700 pr-font-semibold pr-ml-1"
            >
              {locale.toUpperCase()}
            </span>
          ))}
        </div>
        {languages.length > 3 && (
          <button
            type="button"
            onClick={() => handleScrollToBottom()}
            className="pr-text-gray-500 pr-text-xs pr-underline"
          >
            +{languages.length - 3} more languages
          </button>
        )}
      </div>
      <div className="pr-border-l pr-border-gray-300 pr-h-10 pr-mx-2" />
      <div className="pr-flex pr-flex-col pr-space-y-2 pr-ml-auto">
        <a
          href={moreInfoUrl}
          className="pr-text-gray-500 pr-text-xs pr-flex pr-items-center pr-underline pr-font-semibold"
        >
          Website
          <LucideLink className="pr-inline pr-w-4 pr-h-4 pr-ml-1" />
        </a>
        <a
          href="https://placeholder.com"
          className="pr-text-gray-500 pr-text-xs pr-flex pr-items-center pr-underline pr-font-semibold"
        >
          Support
          <CircleHelp className="pr-inline pr-w-4 pr-h-4 pr-ml-1" />
        </a>
      </div>
    </div>
  );
}
