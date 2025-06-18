import { useState } from 'react';

export type VersionInformation = {
  /** Date the version was published */
  date: string;
  /** Description of the changes in the version */
  description: string;
};

/** Type to store the version history information */
export type VersionHistoryType = Record<string, VersionInformation>;

/** Interface that stores the parameters passed to the Version History component */
interface VersionHistoryProps {
  /** Optional unique identifier */
  id?: string;
  /** Object containing the versions mapped with their information */
  versionHistory: VersionHistoryType;
}

/**
 * Component to render the version history information shown in the footer component. Lists the 5
 * most recent versions, with the options to show all versions by pressing a button.
 *
 * @param VersionHistoryProps
 * @returns Rendered version history for the Footer component
 */
export function VersionHistory({ id, versionHistory }: VersionHistoryProps) {
  const [showAllVersions, setShowAllVersions] = useState(false);
  const currentDate = new Date();

  /**
   * Function to format the time string for the version history in the form of 'X year(s) ago'.
   *
   * @param dateString ISO Date string to determine the time string from
   * @returns Formatted time string
   */
  function formatTimeString(dateString: string) {
    const date = new Date(dateString);
    const dateDiff = new Date(currentDate.getTime() - date.getTime());
    const yearDiff = dateDiff.getUTCFullYear() - 1970;
    const monthDiff = dateDiff.getUTCMonth();
    const dayDiff = dateDiff.getUTCDate() - 1;

    // Determines how long ago the version was published
    let timeString = '';
    if (yearDiff > 0) {
      timeString = `${yearDiff.toString()} year${yearDiff === 1 ? '' : 's'} ago`;
    } else if (monthDiff > 0) {
      timeString = `${monthDiff.toString()} month${monthDiff === 1 ? '' : 's'} ago`;
    } else if (dayDiff === 0) {
      timeString = 'today';
    } else {
      timeString = `${dayDiff.toString()} day${dayDiff === 1 ? '' : 's'} ago`;
    }

    return timeString;
  }

  // Sorts the version history by version number
  const sortedEntries = Object.entries(versionHistory).sort((a, b) => b[0].localeCompare(a[0]));

  return (
    <div id={id}>
      <h3 className="tw-text-md tw-font-semibold">What`s New</h3>
      <ul className="tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground">
        {(showAllVersions ? sortedEntries : sortedEntries.slice(0, 5)).map((entry) => (
          <div key={entry[0]} className="tw-mt-3 tw-flex tw-justify-between">
            <div className="tw-text-foreground">
              <li className="tw-prose tw-text-xs">
                <span>{entry[1].description}</span>
              </li>
            </div>
            <div className="tw-justify-end tw-text-right">
              <div>Version {entry[0]}</div>
              <div>{formatTimeString(entry[1].date)}</div>
            </div>
          </div>
        ))}
      </ul>
      {sortedEntries.length > 5 && (
        <button
          type="button"
          onClick={() => setShowAllVersions(!showAllVersions)}
          className="tw-text-xs tw-text-foreground tw-underline"
        >
          {showAllVersions ? 'Show Less Version History' : 'Show All Version History'}
        </button>
      )}
    </div>
  );
}

export default VersionHistory;
