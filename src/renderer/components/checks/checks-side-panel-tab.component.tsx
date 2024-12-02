import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';
import CheckCard from './check-card.component';

export const TAB_TYPE_CHECKS_SIDE_PANEL = 'checks-side-panel';

export default function ChecksSidePanelTab() {
  return (
    // Project dropdown
    // Chapter filter
    // Checks filter
    // Filter button
    // Sort button
    <div className="tw-p-4">
      <CheckCard />
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
