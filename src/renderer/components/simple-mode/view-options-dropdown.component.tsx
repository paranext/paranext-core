/** View options dropdown for Simple Mode toolbar. Contains editor and general view option toggles. */

import { Settings2, ChevronDown } from 'lucide-react';
import { Button, Popover, PopoverTrigger, PopoverContent } from 'platform-bible-react';
import { useState, useCallback } from 'react';

export type ToolbarPosition = 'hidden' | 'floating' | 'right';

export interface ViewOptions {
  showMarkers: boolean;
  showGhostText: boolean;
  showFootnotes: boolean;
  highlightTerms: boolean;
  toolbarPosition: ToolbarPosition;
  verseNumberMode: 'superscript' | 'full-height';
}

export const DEFAULT_VIEW_OPTIONS: ViewOptions = {
  showMarkers: true,
  showGhostText: true,
  showFootnotes: true,
  highlightTerms: false,
  toolbarPosition: 'right',
  verseNumberMode: 'superscript',
};

interface ViewOptionsDropdownProps {
  options: ViewOptions;
  onChange: (options: ViewOptions) => void;
}

function ToggleRow({
  label,
  description,
  value,
  onToggle,
}: {
  label: string;
  description?: string;
  value: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="tw-w-full tw-flex tw-items-center tw-justify-between tw-px-3 tw-py-2 tw-text-left hover:tw-bg-muted tw-cursor-pointer tw-transition-colors"
    >
      <div className="tw-flex tw-flex-col tw-items-start">
        <span className="tw-text-xs tw-font-medium">{label}</span>
        {description && (
          <span className="tw-text-[10px] tw-text-muted-foreground tw-leading-tight">
            {description}
          </span>
        )}
      </div>
      <div
        className={`tw-relative tw-w-7 tw-h-4 tw-rounded-full tw-flex-shrink-0 tw-ml-3 tw-transition-colors tw-duration-200 ${value ? 'tw-bg-primary' : 'tw-bg-muted-foreground/30'}`}
      >
        <div
          className={`tw-absolute tw-top-0.5 tw-w-3 tw-h-3 tw-rounded-full tw-bg-background tw-shadow-sm tw-transition-all tw-duration-200 ${value ? 'tw-left-[14px]' : 'tw-left-[2px]'}`}
        />
      </div>
    </button>
  );
}

function ThreeWayToggle({
  label,
  options: toggleOptions,
  value,
  onChange,
}: {
  label: string;
  options: { id: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="tw-px-3 tw-py-2">
      <div className="tw-text-xs tw-font-medium tw-mb-1.5">{label}</div>
      <div className="tw-flex tw-rounded-lg tw-border tw-border-border tw-overflow-hidden">
        {toggleOptions.map((opt, i) => {
          const isActive = value === opt.id;
          return (
            <button
              type="button"
              key={opt.id}
              onClick={() => onChange(opt.id)}
              className={`tw-flex-1 tw-py-1.5 tw-text-[10px] tw-font-semibold tw-transition-all tw-duration-150 ${i > 0 ? 'tw-border-l tw-border-border' : ''} ${isActive ? 'tw-bg-primary tw-text-primary-foreground' : 'tw-bg-background tw-text-muted-foreground hover:tw-bg-muted tw-cursor-pointer'}`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ViewOptionsDropdown({ options, onChange }: ViewOptionsDropdownProps) {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(
    (key: keyof Omit<ViewOptions, 'toolbarPosition' | 'verseNumberMode'>) => {
      onChange({ ...options, [key]: !options[key] });
    },
    [options, onChange],
  );

  const handleToolbarPositionChange = useCallback(
    (v: string) => {
      onChange({ ...options, toolbarPosition: v as ToolbarPosition });
    },
    [options, onChange],
  );

  const handleMarkerPlaceholderChange = useCallback(
    (mode: string) => {
      if (mode === 'both') onChange({ ...options, showMarkers: true, showGhostText: true });
      else if (mode === 'markers')
        onChange({ ...options, showMarkers: true, showGhostText: false });
      else if (mode === 'placeholder')
        onChange({ ...options, showMarkers: false, showGhostText: true });
    },
    [options, onChange],
  );

  const markerPlaceholderValue =
    options.showMarkers && options.showGhostText
      ? 'both'
      : options.showMarkers
        ? 'markers'
        : 'placeholder';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="tw-h-7 tw-gap-1.5 tw-text-xs tw-font-medium">
          <Settings2 className="tw-w-3.5 tw-h-3.5" />
          <span>View</span>
          <ChevronDown className="tw-w-3 tw-h-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="tw-w-[260px] tw-p-0" align="end">
        {/* Editor section */}
        <div className="tw-px-3 tw-py-1.5 tw-mb-0.5">
          <span className="tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-text-muted-foreground">
            Editor
          </span>
        </div>

        <ThreeWayToggle
          label="Toolbar Position"
          options={[
            { id: 'hidden', label: 'Fixed' },
            { id: 'floating', label: 'Floating' },
            { id: 'right', label: 'Side' },
          ]}
          value={options.toolbarPosition}
          onChange={handleToolbarPositionChange}
        />

        <ToggleRow
          label="Key Terms (not implemented)"
          description="Highlight key biblical terms in the editor"
          value={options.highlightTerms}
          onToggle={() => toggle('highlightTerms')}
        />

        <div className="tw-mx-3 tw-my-1.5 tw-border-t tw-border-border" />

        {/* General View Options */}
        <div className="tw-px-3 tw-py-1.5 tw-mb-0.5">
          <span className="tw-text-[10px] tw-font-bold tw-uppercase tw-tracking-widest tw-text-muted-foreground">
            General View Options
          </span>
        </div>

        <ThreeWayToggle
          label="Show"
          options={[
            { id: 'markers', label: 'Markers' },
            { id: 'both', label: 'Markers & Placeholder' },
            { id: 'placeholder', label: 'Placeholder' },
          ]}
          value={markerPlaceholderValue}
          onChange={handleMarkerPlaceholderChange}
        />

        <ToggleRow
          label="Superscript verse numbers"
          description="Use smaller superscript numbers instead of full-height"
          value={options.verseNumberMode === 'superscript'}
          onToggle={() =>
            onChange({
              ...options,
              verseNumberMode:
                options.verseNumberMode === 'superscript' ? 'full-height' : 'superscript',
            })
          }
        />

        <ToggleRow
          label="Footnotes"
          description="Show footnote panel below text"
          value={options.showFootnotes}
          onToggle={() => toggle('showFootnotes')}
        />
      </PopoverContent>
    </Popover>
  );
}
