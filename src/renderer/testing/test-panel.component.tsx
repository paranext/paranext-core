import { SavedTabInfo, TabInfo } from '@shared/data/web-view.model';
import { deserializeTabId } from '@shared/utils/papi-util';

function TestPanel({ content }: { content: string }) {
  return <div className="test-panel">{content}</div>;
}

export default function createTabPanel(tabInfo: SavedTabInfo): TabInfo {
  if (!tabInfo.id) throw new Error('Tab creation "id" is missing');

  const { typeId } = deserializeTabId(tabInfo.id);
  const title = typeId || 'Unknown';
  const content = typeId ? `Content for ${title}` : 'Unknown';
  return {
    title,
    content: <TestPanel content={content} />,
  };
}
