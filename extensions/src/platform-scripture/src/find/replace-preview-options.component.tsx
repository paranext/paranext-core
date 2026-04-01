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
import { PreviewOptions } from './replace-preview-types';

export type ReplacePreviewOptionsStrings = {
  togglePreviewOptions: string;
  layout: string;
  layoutFind: string;
  layoutArrow: string;
  layoutInline: string;
  layoutBlock: string;
  highlightShape: string;
  highlightShapeBar: string;
  highlightShapeRounded: string;
  highlightShapePlain: string;
  color: string;
  colorGold: string;
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
  '%webView_find_previewOptions_layout_find%',
  '%webView_find_previewOptions_layout_arrow%',
  '%webView_find_previewOptions_layout_inline%',
  '%webView_find_previewOptions_layout_block%',
  '%webView_find_previewOptions_shape%',
  '%webView_find_previewOptions_shape_bar%',
  '%webView_find_previewOptions_shape_rounded%',
  '%webView_find_previewOptions_shape_plain%',
  '%webView_find_previewOptions_color%',
  '%webView_find_previewOptions_color_gold%',
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
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
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

function FindLayoutIcon({
  highlightShape,
}: {
  highlightShape: Parameters<typeof getGoldFindHighlightClasses>[0];
}) {
  return <Swatch findClass={getGoldFindHighlightClasses(highlightShape)} />;
}

const LAYOUT_ICONS = {
  find: (highlightShape: Parameters<typeof getGoldFindHighlightClasses>[0]) => (
    <FindLayoutIcon highlightShape={highlightShape} />
  ),
  arrow: () => <ArrowRight className="tw-h-4 tw-w-4" />,
  inline: () => <InlineLayoutIcon className="tw-h-4 tw-w-4" />,
  block: () => <BlockLayoutIcon className="tw-h-4 tw-w-4" />,
} as const;

export function ReplacePreviewOptions({
  previewOptions,
  setPreviewOptions,
  localizedStrings,
  open,
  onOpenChange,
}: ReplacePreviewOptionsProps) {
  const { layout, highlightShape, color, monospace, showInvisible } = previewOptions;

  const set = <K extends keyof PreviewOptions>(key: K, value: PreviewOptions[K]) =>
    setPreviewOptions({ ...previewOptions, [key]: value });

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                variant="subtle"
                size="sm"
                aria-label={localizedStrings.togglePreviewOptions}
                className="tw-h-auto tw-gap-1.5 tw-px-2 tw-py-0.5"
              >
                <Eye className="tw-h-4 tw-w-4" />
                {localizedStrings.togglePreviewOptions}
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>{localizedStrings.togglePreviewOptions}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <PopoverContent align="start" className="tw-w-72 tw-p-4">
        {/* 1. Layout */}
        <fieldset className="tw-mb-4">
          <legend className="tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold">
            {localizedStrings.layout}
          </legend>

          <ToggleGroup
            type="single"
            value={layout}
            onValueChange={(value) => {
              if (
                value === 'find' ||
                value === 'arrow' ||
                value === 'inline' ||
                value === 'block'
              ) {
                set('layout', value);
              } else if (value === '') {
                set('layout', layout);
              }
            }}
            className="tw-w-full"
          >
            {(
              [
                ['find', localizedStrings.layoutFind],
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
                {LAYOUT_ICONS[value](highlightShape)}
                <span className="tw-text-xs">{label}</span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </fieldset>

        {/* 2. Highlight shape */}
        <fieldset className="tw-mb-4">
          <legend className="tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold">
            {localizedStrings.highlightShape}
          </legend>

          <RadioGroup
            value={highlightShape}
            onValueChange={(value) => {
              if (value === 'bar' || value === 'rounded' || value === 'plain') {
                set('highlightShape', value);
              }
            }}
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
        </fieldset>

        {/* 3. Color */}
        <fieldset className="tw-mb-4">
          <legend className="tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold">
            {localizedStrings.color}
          </legend>

          <RadioGroup
            value={color}
            onValueChange={(value) => {
              if (
                value === 'gold' ||
                value === 'red-cyan' ||
                value === 'red-green' ||
                value === 'grey-blue'
              ) {
                set('color', value);
              }
            }}
            className="tw-gap-1"
          >
            {(
              [
                ['gold', localizedStrings.colorGold],
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
        </fieldset>

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
