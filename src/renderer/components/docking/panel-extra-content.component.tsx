import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { Maximize2, Minimize2, Plus, X } from 'lucide-react';
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
  const handleMaximize = () => {
    // RC Dock needs null here
    // eslint-disable-next-line no-null/no-null
    context.dockMove(panelData, null, 'maximize');
  };

  const handleMaximizeClick = (e: React.MouseEvent) => {
    handleMaximize();
    e.stopPropagation();
  };

  const handleOpenNewTab = async (tabGroupId?: string) => {
    try {
      await sendCommand('platformGetResources.openNewTab', tabGroupId);
    } catch (error) {
      logger.error('Error sending command to open new tab:', error);
    }
  };

  const handleCloseTabGroup = () => {
    // RC Dock needs null here
    // eslint-disable-next-line no-null/no-null
    context.dockMove(panelData, null, 'remove');
  };

  const handleCloseTabGroupClick = (e: React.MouseEvent) => {
    handleCloseTabGroup();
    e.stopPropagation();
  };

  const handleCloseTabGroupKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCloseTabGroup();
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
        <Button variant="ghost" className="maximize-button" onClick={handleMaximizeClick}>
          {panelData.parent.mode === 'maximize' ? <Minimize2 /> : <Maximize2 />}
        </Button>
      )}

      <Button
        variant="ghost"
        className="close-tab-group-button"
        onClick={handleCloseTabGroupClick}
        onKeyDown={handleCloseTabGroupKeyDown}
      >
        <X />
      </Button>
    </>
  );
}

export default PanelExtraContent;
