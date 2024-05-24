import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';
import { Button, ScriptureRefKeyedList, ScriptureRefKeyedListProps } from 'platform-bible-react';

export const TAB_TYPE_CHECKING_RESULTS_LIST = 'checking-results-list';

export default function CheckingResultsList(props: ScriptureRefKeyedListProps) {
  const { sources } = props;

  return (
    <div className="basic-list-table">
      <Button>Rerun</Button>
      <ScriptureRefKeyedList sources={sources} />
    </div>
  );
}

export function loadCheckingResultsListTab(savedTabInfo: SavedTabInfo): TabInfo {
  if (!savedTabInfo.id) throw new Error('Tab creation "id" is missing');

  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const data = savedTabInfo.data as ScriptureRefKeyedListProps;

  return {
    ...savedTabInfo,
    tabTitle: savedTabInfo.id || 'Checking Results List',
    content: <CheckingResultsList sources={data.sources} />,
  };
}
