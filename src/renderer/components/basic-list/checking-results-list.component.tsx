import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';
import {
  Button,
  Label,
  ResultsSource,
  ScriptureRefKeyedList,
  ScriptureRefKeyedListProps,
} from 'platform-bible-react';
import { useEffect, useState } from 'react';

export const TAB_TYPE_CHECKING_RESULTS_LIST = 'checking-results-list';

export type CheckingResultsListProps = ScriptureRefKeyedListProps & {
  project?: string;

  onRerun?: () => void;
};

const getLabel = (
  project: string | undefined,
  datetime: string | undefined,
  sources: ResultsSource[],
): string => {
  let result = '';
  if (project) {
    result = project;
    if (sources.length > 0) result += '; ';
  }
  if (datetime) result += `${datetime}; `;
  result += sources
    .map((s) => (typeof s.src === 'object' ? s.src.displayName : s.src))
    .filter(Boolean)
    .join(', ');
  return result;
};

export default function CheckingResultsList(props: CheckingResultsListProps) {
  const { sources, project, onRerun } = props;
  const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState<string | undefined>(undefined);

  function handleResultsUpdated() {
    const currentTimestamp = new Date().toLocaleString();
    setLastUpdateTimestamp(currentTimestamp);
  }

  // Subscribe to resultsUpdated event for each source
  useEffect(() => {
    sources.map((source) => {
      return source.resultsUpdated.addEventListener('resultsUpdated', handleResultsUpdated);
    });

    // Clean up event listeners when component unmounts
    return () => {
      sources.forEach((s) => s.removeEventListener('resultsUpdated', handleResultsUpdated));
    };
  }, [sources]);

  const label = getLabel(project, lastUpdateTimestamp, sources);

  return (
    <div>
      {onRerun && <Button onClick={onRerun}>Rerun</Button>}
      {/* TODO: Find a way to truncate the text and display ellipsis using Tailwind. */}
      {label && <Label>{label}</Label>}
      <ScriptureRefKeyedList sources={sources} />
    </div>
  );
}

export function loadCheckingResultsListTab(savedTabInfo: SavedTabInfo): TabInfo {
  if (!savedTabInfo.id) throw new Error('Tab creation "id" is missing');

  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const data = savedTabInfo.data as CheckingResultsListProps;

  return {
    ...savedTabInfo,
    tabTitle: savedTabInfo.id || 'Checking Results List',
    content: (
      <CheckingResultsList sources={data.sources} project={data.project} onRerun={data.onRerun} />
    ),
  };
}
