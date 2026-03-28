import React from 'react';
import { ArrowRight, Eye } from 'lucide-react';
import {
  Button,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  Separator,
  Switch,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import {
  getFindHighlightClasses,
  getGoldFindHighlightClasses,
  getReplaceHighlightClasses,
} from './replace-preview-styles';
import {
  DEFAULT_PREVIEW_OPTIONS,
  PreviewOptions,
  ReplacePreviewColor,
  ReplacePreviewHighlightShape,
  ReplacePreviewLayout,
} from './replace-preview-types';

export type ReplacePreviewOptionsStrings = {
  togglePreviewOptions: string;
  layout: string;
  layoutArrow: string;
  layoutInline: string;
  layoutBlock: string;
  highlightShape: string;
  highlightShapeBar: string;
  highlightShapeRounded: string;
  highlightShapePlain: string;
  color: string;
  colorRedCyan: string;
  colorRedGreen: string;
  colorGreyBlue: string;
  monospace: string;
  monospaceDescription: string;
  showInvisible: string;
  showInvisibleDescription: string;
};

export const REPLACE_PREVIEW_OPTIONS_STRING_KEYS = [
  '%webView_find_previewOptions_toggle%',
  '%webView_find_previewOptions_layout%',
  '%webView_find_previewOptions_layout_arrow%',
  '%webView_find_previewOptions_layout_inline%',
  '%webView_find_previewOptions_layout_block%',
  '%webView_find_previewOptions_shape%',
  '%webView_find_previewOptions_shape_bar%',
  '%webView_find_previewOptions_shape_rounded%',
  '%webView_find_previewOptions_shape_plain%',
  '%webView_find_previewOptions_color%',
  '%webView_find_previewOptions_color_redCyan%',
  '%webView_find_previewOptions_color_redGreen%',
  '%webView_find_previewOptions_color_greyBlue%',
  '%webView_find_previewOptions_monospace%',
  '%webView_find_previewOptions_monospaceDescription%',
  '%webView_find_previewOptions_showInvisible%',
  '%webView_find_previewOptions_showInvisibleDescription%',
] as const;

type ReplacePreviewOptionsProps = {
  previewOptions: PreviewOptions;
  setPreviewOptions: (value: PreviewOptions) => void;
  localizedStrings: ReplacePreviewOptionsStrings;
};

function InlineLayoutIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="3" y1="8" x2="21" y2="8" />
      <line x1="3" y1="14" x2="14" y2="14" />
      <line x1="3" y1="20" x2="14" y2="20" />
    </svg>
  );
}

function BlockLayoutIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <line x1="3" y1="12" x2="21" y2="12" />
    </svg>
  );
}

const LAYOUT_ICONS: Record<ReplacePreviewLayout, React.ReactNode> = {
  arrow: <ArrowRight className="tw-h-4 tw-w-4" />,
  inline: <InlineLayoutIcon className="tw-h-4 tw-w-4" />,
  block: <BlockLayoutIcon className="tw-h-4 tw-w-4" />,
};

/** Small styled swatch used to preview highlight shapes and colors inside the picker */
function Swatch({
  findClass,
  replaceClass,
  showReplace = false,
}: {
  findClass: string;
  replaceClass?: string;
  showReplace?: boolean;
}) {
  return (
    <span className="tw-inline-flex tw-items-center tw-gap-0.5 tw-text-xs">
      <span className={findClass}>old</span>
      {showReplace && replaceClass && <span className={replaceClass}>new</span>}
    </span>
  );
}

export function ReplacePreviewOptions({
  previewOptions,
  setPreviewOptions,
  localizedStrings,
}: ReplacePreviewOptionsProps) {
  const areOptionsNonDefault =
    previewOptions.layout !== DEFAULT_PREVIEW_OPTIONS.layout ||
    previewOptions.highlightShape !== DEFAULT_PREVIEW_OPTIONS.highlightShape ||
    previewOptions.color !== DEFAULT_PREVIEW_OPTIONS.color ||
    previewOptions.monospace !== DEFAULT_PREVIEW_OPTIONS.monospace ||
    previewOptions.showInvisible !== DEFAULT_PREVIEW_OPTIONS.showInvisible;

  const { layout, highlightShape, color, monospace, showInvisible } = previewOptions;

  const set = <K extends keyof PreviewOptions>(key: K, value: PreviewOptions[K]) =>
    setPreviewOptions({ ...previewOptions, [key]: value });

  return (
    <Popover>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                aria-label={localizedStrings.togglePreviewOptions}
                className={`tw-gap-1.5 ${areOptionsNonDefault ? 'tw-bg-muted' : ''}`}
              >
                <Eye className="tw-h-4 tw-w-4" />
                {localizedStrings.togglePreviewOptions}
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>{localizedStrings.togglePreviewOptions}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <PopoverContent align="end" className="tw-w-72 tw-p-4">
        {/* 1. Layout */}
        <div className="tw-mb-4">
          <p className="tw-mb-2 tw-text-xs tw-font-semibold tw-uppercase tw-tracking-wide tw-text-muted-foreground">
            {localizedStrings.layout}
          </p>
          <ToggleGroup
            type="single"
            value={layout}
            onValueChange={(value) => {
              if (value === 'arrow' || value === 'inline' || value === 'block')
                // eslint-disable-next-line no-type-assertion/no-type-assertion
                set('layout', value as ReplacePreviewLayout);
            }}
            className="tw-w-full"
          >
            {(
              [
                ['arrow', localizedStrings.layoutArrow],
                ['inline', localizedStrings.layoutInline],
                ['block', localizedStrings.layoutBlock],
              ] as const
            ).map(([value, label]) => (
              <ToggleGroupItem
                key={value}
                value={value}
                className="tw-flex tw-flex-1 tw-flex-col tw-gap-1 tw-h-auto tw-py-2"
              >
                {LAYOUT_ICONS[value]}
                <span className="tw-text-xs">{label}</span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* 2. Highlight shape */}
        <div className="tw-mb-4">
          <p className="tw-mb-1.5 tw-text-xs tw-font-semibold tw-uppercase tw-tracking-wide tw-text-muted-foreground">
            {localizedStrings.highlightShape}
          </p>
          <RadioGroup
            value={highlightShape}
            // eslint-disable-next-line no-type-assertion/no-type-assertion
            onValueChange={(value) => set('highlightShape', value as ReplacePreviewHighlightShape)}
            className="tw-gap-1"
          >
            {(
              [
                ['bar', localizedStrings.highlightShapeBar],
                ['rounded', localizedStrings.highlightShapeRounded],
                ['plain', localizedStrings.highlightShapePlain],
              ] as const
            ).map(([value, label]) => (
              <div key={value} className="tw-flex tw-min-h-8 tw-items-center tw-gap-2">
                <RadioGroupItem value={value} id={`highlightShape-${value}`} />
                <Label
                  htmlFor={`highlightShape-${value}`}
                  className="tw-flex tw-flex-1 tw-cursor-pointer tw-items-center tw-justify-between tw-text-sm tw-font-normal"
                >
                  {label}
                  <Swatch findClass={getGoldFindHighlightClasses(value)} />
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* 3. Color */}
        <div className="tw-mb-4">
          <p className="tw-mb-1.5 tw-text-xs tw-font-semibold tw-uppercase tw-tracking-wide tw-text-muted-foreground">
            {localizedStrings.color}
          </p>
          <RadioGroup
            value={color}
            // eslint-disable-next-line no-type-assertion/no-type-assertion
            onValueChange={(value) => set('color', value as ReplacePreviewColor)}
            className="tw-gap-1"
          >
            {(
              [
                ['red-cyan', localizedStrings.colorRedCyan],
                ['red-green', localizedStrings.colorRedGreen],
                ['grey-blue', localizedStrings.colorGreyBlue],
              ] as const
            ).map(([value, label]) => (
              <div key={value} className="tw-flex tw-min-h-8 tw-items-center tw-gap-2">
                <RadioGroupItem value={value} id={`color-${value}`} />
                <Label
                  htmlFor={`color-${value}`}
                  className="tw-flex tw-flex-1 tw-cursor-pointer tw-items-center tw-justify-between tw-text-sm tw-font-normal"
                >
                  {label}
                  <Swatch
                    findClass={getFindHighlightClasses(value, highlightShape)}
                    replaceClass={getReplaceHighlightClasses(value, highlightShape)}
                    showReplace
                  />
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Separator className="tw-mb-4" />

        {/* 4. Monospace toggle */}
        <div className="tw-mb-3 tw-flex tw-items-center tw-justify-between tw-gap-3">
          <div>
            <Label
              htmlFor="previewMonospace"
              className="tw-cursor-pointer tw-text-sm tw-font-medium"
            >
              {localizedStrings.monospace}
            </Label>
            <p className="tw-text-xs tw-text-muted-foreground">
              {localizedStrings.monospaceDescription}
            </p>
          </div>
          <Switch
            id="previewMonospace"
            checked={monospace}
            onCheckedChange={(checked) => set('monospace', checked)}
          />
        </div>

        {/* 5. Show invisible toggle */}
        <div className="tw-flex tw-items-center tw-justify-between tw-gap-3">
          <div>
            <Label
              htmlFor="previewShowInvisible"
              className="tw-cursor-pointer tw-text-sm tw-font-medium"
            >
              {localizedStrings.showInvisible}
            </Label>
            <p className="tw-text-xs tw-text-muted-foreground">
              {localizedStrings.showInvisibleDescription}
            </p>
          </div>
          <Switch
            id="previewShowInvisible"
            checked={showInvisible}
            onCheckedChange={(checked) => set('showInvisible', checked)}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
