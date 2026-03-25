import { Button, Popover, PopoverContent, PopoverTrigger, Separator } from 'platform-bible-react';
import { EllipsisVertical, Plus, ArrowRight, ArrowLeft } from 'lucide-react';
import { SimpleTabDefinition } from './simple-mode-tab-config';

export type TabMoveDropdownProps = {
  /** Tabs currently in the tools panel that can be moved to the extra panel */
  toolsTabs: SimpleTabDefinition[];
  /** Tabs currently in the extra panel that can be moved back to tools */
  extraTabs: SimpleTabDefinition[];
  /** Whether the extra panel is currently visible */
  isExtraPanelOpen: boolean;
  /** Called when a tab should be moved to the extra panel */
  onMoveToExtra: (tabId: string) => void;
  /** Called when a tab should be moved back to the tools panel */
  onMoveToTools: (tabId: string) => void;
  /** The trigger element variant */
  variant?: 'plus' | 'ellipsis';
};

/**
 * Reusable dropdown for moving tabs between the tools panel and the extra panel.
 *
 * Used in three places:
 *
 * 1. Toolbar plus (+) button — lists tools tabs to move to a new extra panel
 * 2. Extra panel toolbar ellipsis button — bidirectional move
 * 3. Tools panel toolbar ellipsis button — bidirectional move when extra panel is open
 */
export function TabMoveDropdown({
  toolsTabs,
  extraTabs,
  isExtraPanelOpen,
  onMoveToExtra,
  onMoveToTools,
  variant = 'ellipsis',
}: TabMoveDropdownProps) {
  const TriggerIcon = variant === 'plus' ? Plus : EllipsisVertical;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="tw-h-8 tw-w-8">
          <TriggerIcon className="tw-h-4 tw-w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end" className="tw-w-56 tw-p-2">
        {/* Move to extra panel */}
        {toolsTabs.length > 0 && (
          <>
            <p className="tw-text-xs tw-font-medium tw-text-muted-foreground tw-px-2 tw-py-1">
              Move to extra panel
            </p>
            {toolsTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant="ghost"
                  className="tw-w-full tw-justify-start tw-gap-2 tw-h-8 tw-text-sm"
                  onClick={() => onMoveToExtra(tab.id)}
                >
                  <Icon className="tw-h-4 tw-w-4" />
                  {tab.label}
                  <ArrowRight className="tw-h-3 tw-w-3 tw-ml-auto tw-text-muted-foreground" />
                </Button>
              );
            })}
          </>
        )}

        {/* Move back to tools panel */}
        {isExtraPanelOpen && extraTabs.length > 0 && (
          <>
            {toolsTabs.length > 0 && <Separator className="tw-my-1" />}
            <p className="tw-text-xs tw-font-medium tw-text-muted-foreground tw-px-2 tw-py-1">
              Move to tools panel
            </p>
            {extraTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant="ghost"
                  className="tw-w-full tw-justify-start tw-gap-2 tw-h-8 tw-text-sm"
                  onClick={() => onMoveToTools(tab.id)}
                >
                  <Icon className="tw-h-4 tw-w-4" />
                  {tab.label}
                  <ArrowLeft className="tw-h-3 tw-w-3 tw-ml-auto tw-text-muted-foreground" />
                </Button>
              );
            })}
          </>
        )}

        {toolsTabs.length === 0 && extraTabs.length === 0 && (
          <p className="tw-text-xs tw-text-muted-foreground tw-px-2 tw-py-2">No tabs to move</p>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default TabMoveDropdown;
