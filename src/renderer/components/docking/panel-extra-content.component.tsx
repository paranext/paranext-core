import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { Plus } from 'lucide-react';
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { PanelData } from 'rc-dock';
import './panel-extra-content.component.scss';
import { getErrorMessage, LocalizeKey } from 'platform-bible-utils';

const NEW_TAB_KEY = '%tab_newTab%';
/** Stable across renders, as `useLocalizedStrings` requires */
const STRING_KEYS: LocalizeKey[] = [NEW_TAB_KEY];

interface PanelExtraContentProps {
  panelData: PanelData;
}

/**
 * Component that renders the extra content in the panel header, formerly including the
 * maximize/minimize button and the new tab button
 */
export function PanelExtraContent({ panelData }: PanelExtraContentProps) {
  const handleOpenNewTab = async (tabGroupId?: string) => {
    try {
      await sendCommand('platformGetResources.openNewTab', tabGroupId);
    } catch (error) {
      logger.error(`Error sending command to open new tab: ${getErrorMessage(error)}`);
    }
  };

  const [localizedStrings] = useLocalizedStrings(STRING_KEYS);
  const newTabLabel = localizedStrings[NEW_TAB_KEY];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="new-tab-button"
            aria-label={newTabLabel}
            onClick={() => handleOpenNewTab(panelData.id)}
          >
            <Plus />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{newTabLabel}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default PanelExtraContent;
