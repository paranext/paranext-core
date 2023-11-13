import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';

export const TAB_TYPE_TEST = 'tab';

export default function TestPanel({ content }: { content: string }) {
  return <div className="test-panel">{content}</div>;
}

export function loadTestTab(savedTabInfo: SavedTabInfo): TabInfo {
  if (!savedTabInfo.id) throw new Error('Tab creation "id" is missing');

  const tabTitle = savedTabInfo.id || 'Unknown';
  const content = savedTabInfo.id ? `Content for ${tabTitle}` : 'Unknown';
  return {
    ...savedTabInfo,
    tabTitle,
    content: <TestPanel content={content} />,
  };
}
