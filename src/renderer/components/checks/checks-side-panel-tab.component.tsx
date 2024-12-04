import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';
import CheckCard from './check-card.component';

export const TAB_TYPE_CHECKS_SIDE_PANEL = 'checks-side-panel';

export default function ChecksSidePanelTab() {
  return (
    <div style={{ overflowY: 'auto', padding: '2px' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '0px',
          gap: '12px',
        }}
      >
        <CheckCard isFailed />
        <CheckCard isSelected isFailed />
        <CheckCard isWaiting />
        <CheckCard isSelected isWaiting />
        <CheckCard isFixed />
        <CheckCard isSelected isFixed />
      </div>
    </div>
  );
}

export type ChecksSidePanelTabData = {
  webViewId: string;
};

export const loadChecksSidePanelTab = (savedTabInfo: SavedTabInfo): TabInfo => {
  return {
    ...savedTabInfo,
    tabTitle: 'Checks',
    content: <ChecksSidePanelTab />,
  };
};
