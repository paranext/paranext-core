import { badLeftoversCheck, engineProblemsCheck } from '@renderer/testing/test-layout.data';
import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';
import {
  Button,
  Label,
  ResultsSource,
  ScriptureResultsViewer,
  ScriptureResultsViewerProps,
} from 'platform-bible-react';
import { useState, useCallback, useEffect } from 'react';

export type CheckingResultsListProps = ScriptureResultsViewerProps & {
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
  const [currentSources, setCurrentSources] = useState(sources);

  useEffect(() => {
    setCurrentSources(sources);
  }, [sources]);

  const handleResultsUpdated = useCallback(() => {
    const currentTimestamp = new Date().toLocaleString();
    setLastUpdateTimestamp(currentTimestamp);
  }, []);

  const reRunChecks = useCallback(() => {
    if (onRerun) {
      onRerun();
      // Since onRerun modifies the sources directly, we need to trigger a state update
      setCurrentSources([...sources]);
      handleResultsUpdated();
    }
  }, [onRerun, sources, handleResultsUpdated]);

  const label = getLabel(project, lastUpdateTimestamp, sources);

  return (
    <div>
      {onRerun && <Button onClick={reRunChecks}>Rerun</Button>}
      {label && <Label>{label}</Label>}
      <ScriptureResultsViewer sources={currentSources} />
    </div>
  );
}

export function loadCheckingResultsListTab(savedTabInfo: SavedTabInfo): TabInfo {
  if (!savedTabInfo.id) throw new Error('Tab creation "id" is missing');

  // This is stub code to get some dummy checking results.
  // TODO (#994): Replace this with calls to get actual check results and subscribe to updates.
  const data = {
    sources: [badLeftoversCheck, engineProblemsCheck],
    // TODO (#993): Get real project name.
    project: 'Dummy project',
    onRerun: () => {
      badLeftoversCheck.reRun();
      engineProblemsCheck.reRun();
    },
  };

  return {
    ...savedTabInfo,
    tabTitle: savedTabInfo.id || 'Checking Results List',
    content: (
      <CheckingResultsList sources={data.sources} project={data.project} onRerun={data.onRerun} />
    ),
  };
}
