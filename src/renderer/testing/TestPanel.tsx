import { SavedTabInfo, TabInfo } from '@shared/data/WebviewTypes';

export type TabData = {
  title: string;
  content: string;
};

const TestPanel = ({ content }: { content: string }) => {
  return <div className="test-panel">{content}</div>;
};

const createTabPanel = (tabInfo: SavedTabInfo): TabInfo => {
  if (!tabInfo.data) throw Error('Tab creation data is missing');

  // We need to make sure that the data is of the correct type
  const data = tabInfo.data as TabData;
  const title = data.title ? data.title : 'Unknown';
  const content = data.content ? data.content : 'Unknown';
  return {
    type: 'tab',
    title: `Tab ${title}`,
    content: <TestPanel content={content} />,
  };
};

export default createTabPanel;
