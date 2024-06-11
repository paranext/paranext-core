import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';
import {
  Button,
  Label,
  ResultsSource,
  ScriptureRefKeyedList,
  ScriptureRefKeyedListProps,
} from 'platform-bible-react';

export const TAB_TYPE_CHECKING_RESULTS_LIST = 'checking-results-list';

export type CheckingResultsListProps = ScriptureRefKeyedListProps & {
  project?: string;

  onRerun?: () => void;
};

const getLabel = (project: string | undefined, sources: ResultsSource[]): string => {
  let result = '';
  if (project) {
    result = project;
    if (sources.length > 0) result += '; ';
  }
  result += sources
    .map((s) => s.checkDefinition?.displayName ?? s.id)
    .filter(Boolean)
    .join(', ');
  return result;
};

export default function CheckingResultsList(props: CheckingResultsListProps) {
  const { sources, project, onRerun } = props;

  const label = getLabel(project, sources);

  return (
    <div className="basic-list-table">
      {onRerun && <Button onClick={onRerun}>Rerun</Button>}
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
    content: <CheckingResultsList sources={data.sources} project={data.project} />,
  };
}
