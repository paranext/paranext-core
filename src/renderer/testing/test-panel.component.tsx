import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';

export const TAB_TYPE_TEST = 'tab';

type TestTabData = { content?: string } | undefined;

export function TestPanel({ content }: { content: string }) {
  return <div className="test-panel">{content}</div>;
}

export function loadTestTab(savedTabInfo: SavedTabInfo): TabInfo {
  if (!savedTabInfo.id) throw new Error('Tab creation "id" is missing');

  // We set this in `test-layout.data.ts`
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const data = savedTabInfo.data as TestTabData;

  const tabTitle = savedTabInfo.id || 'Unknown';
  const content = data?.content ?? (savedTabInfo.id ? `Content for ${tabTitle}` : 'Unknown');
  return {
    ...savedTabInfo,
    tabTitle,
    content: <TestPanel content={content} />,
  };
}

export default TestPanel;
