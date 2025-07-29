import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { Maximize2, Minimize2, Plus } from 'lucide-react';
import { Button } from 'platform-bible-react';
import { DockContext, PanelData } from 'rc-dock';
import React from 'react';
import './panel-extra-content.component.scss';

interface PanelExtraContentProps {
  panelData: PanelData;
  context: DockContext;
}

/**
 * Component that renders the extra content in the panel header, including the maximize/minimize
 * button and the new tab button
 */
export function PanelExtraContent({ panelData, context }: PanelExtraContentProps) {
  const handleMaximize = (e: React.MouseEvent) => {
    // RC Dock needs null here
    // eslint-disable-next-line no-null/no-null
    context.dockMove(panelData, null, 'maximize');
    e.stopPropagation();
  };

  const handleOpenNewTab = async (tabGroupId?: string) => {
    try {
      await sendCommand('platformGetResources.openNewTab', tabGroupId);
    } catch (error) {
      logger.error('Error sending command to open new tab:', error);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        className="new-tab-button"
        onClick={() => handleOpenNewTab(panelData.id)}
      >
        <Plus />
      </Button>

      {panelData.parent && panelData.parent.mode !== 'window' && (
        <Button variant="ghost" className="maximize-button" onClick={handleMaximize}>
          {panelData.parent.mode === 'maximize' ? <Minimize2 /> : <Maximize2 />}
        </Button>
      )}
    </>
  );
}

export default PanelExtraContent;
