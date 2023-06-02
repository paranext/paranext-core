import { SavedTabInfo, TabInfo } from '@shared/data/web-view.model';

export const TAB_TYPE_TEST = 'tab';

function TestPanel({ content }: { content: string }) {
  return <div className="test-panel">{content}</div>;
}

export default function loadTestPanel(savedTabInfo: SavedTabInfo): TabInfo {
  if (!savedTabInfo.id) throw new Error('Tab creation "id" is missing');

  const title = savedTabInfo.id || 'Unknown';
  const content = savedTabInfo.id ? `Content for ${title}` : 'Unknown';
  return {
    ...savedTabInfo,
    title,
    content: <TestPanel content={content} />,
  };
}
