import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { Plus } from 'lucide-react';
import { Button } from 'platform-bible-react';
import { PanelData } from 'rc-dock';
import './panel-extra-content.component.scss';

interface PanelExtraContentProps {
  panelData: PanelData;
}

/**
 * Component that renders the extra content in the panel header, including the maximize/minimize
 * button and the new tab button
 */
export function PanelExtraContent({ panelData }: PanelExtraContentProps) {
  const handleOpenNewTab = async (tabGroupId?: string) => {
    try {
      await sendCommand('platformGetResources.openNewTab', tabGroupId);
    } catch (error) {
      logger.error('Error sending command to open new tab:', error);
    }
  };

  return (
    <Button
      variant="ghost"
      className="new-tab-button"
      onClick={() => handleOpenNewTab(panelData.id)}
    >
      <Plus />
    </Button>
  );
}

export default PanelExtraContent;
