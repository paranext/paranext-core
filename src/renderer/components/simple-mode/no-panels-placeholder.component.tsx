/** Shown when all panels are hidden in Simple Mode. Encourages the user to show a panel. */

import type { PanelVisibility } from './simple-mode-layout.component';

interface NoPanelsPlaceholderProps {
  visibility: PanelVisibility;
  onChange: (v: PanelVisibility) => void;
}

const PANEL_CARDS: { key: keyof PanelVisibility; label: string }[] = [
  { key: 'reference', label: 'Reference' },
  { key: 'editor', label: 'Editor' },
  { key: 'resources', label: 'Resources & Tools' },
];

export function NoPanelsPlaceholder({ visibility, onChange }: NoPanelsPlaceholderProps) {
  const togglePanel = (panel: keyof PanelVisibility) => {
    onChange({ ...visibility, [panel]: true });
  };

  return (
    <div className="tw-flex-1 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-6 tw-bg-background">
      <p className="tw-text-xs tw-text-muted-foreground tw-uppercase tw-tracking-widest tw-font-semibold">
        Select a panel to display
      </p>
      <div className="tw-flex tw-items-end tw-gap-3">
        {PANEL_CARDS.map((card) => (
          <button
            key={card.key}
            type="button"
            onClick={() => togglePanel(card.key)}
            className="tw-flex tw-flex-col tw-items-center tw-gap-2 tw-group tw-cursor-pointer"
          >
            <div className="tw-w-16 tw-h-24 tw-rounded-md tw-border-2 tw-transition-all tw-flex tw-items-center tw-justify-center tw-border-border group-hover:tw-border-foreground/40 group-hover:tw-bg-muted" />
            <span className="tw-text-[11px] tw-font-medium tw-transition-colors tw-text-muted-foreground group-hover:tw-text-foreground">
              {card.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
