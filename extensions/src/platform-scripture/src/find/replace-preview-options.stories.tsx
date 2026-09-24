import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import {
  ReplacePreviewOptions,
  REPLACE_PREVIEW_OPTIONS_STRING_KEYS,
  type ReplacePreviewOptionsStrings,
} from './replace-preview-options.component';
import { DEFAULT_REPLACE_PREVIEW_OPTIONS, type PreviewOptions } from './replace-preview-types';

/**
 * `ReplacePreviewOptions` is a Radix Popover triggered by a "View" + Eye-icon button. Its content
 * is a picker that lets the user configure how the find/replace preview is rendered: layout (arrow
 * / inline / block toggle-group), highlight shape (bar / rounded / plain radio group with
 * swatches), color scheme (red-cyan / red-green / grey-blue radio group with swatches), and
 * monospace + show-invisible switches.
 *
 * The stories open the popover by default (`open={true}`) so the full picker is immediately
 * visible. Toggling controls updates the swatches live.
 */

const rawStrings = getLocalizedStrings([...REPLACE_PREVIEW_OPTIONS_STRING_KEYS]);

/** Map the flat localized-string bag into the shape the picker expects. */
const previewOptionsStrings: ReplacePreviewOptionsStrings = {
  togglePreviewOptions: rawStrings['%webView_find_previewOptions_toggle%'],
  layout: rawStrings['%webView_find_previewOptions_layout%'],
  layoutArrow: rawStrings['%webView_find_previewOptions_layout_arrow%'],
  layoutInline: rawStrings['%webView_find_previewOptions_layout_inline%'],
  layoutBlock: rawStrings['%webView_find_previewOptions_layout_block%'],
  highlightShape: rawStrings['%webView_find_previewOptions_shape%'],
  highlightShapeBar: rawStrings['%webView_find_previewOptions_shape_bar%'],
  highlightShapeRounded: rawStrings['%webView_find_previewOptions_shape_rounded%'],
  highlightShapePlain: rawStrings['%webView_find_previewOptions_shape_plain%'],
  color: rawStrings['%webView_find_previewOptions_color%'],
  colorRedCyan: rawStrings['%webView_find_previewOptions_color_redCyan%'],
  colorRedGreen: rawStrings['%webView_find_previewOptions_color_redGreen%'],
  colorGreyBlue: rawStrings['%webView_find_previewOptions_color_greyBlue%'],
  monospace: rawStrings['%webView_find_previewOptions_monospace%'],
  monospaceDescription: rawStrings['%webView_find_previewOptions_monospaceDescription%'],
  showInvisible: rawStrings['%webView_find_previewOptions_showInvisible%'],
  showInvisibleDescription: rawStrings['%webView_find_previewOptions_showInvisibleDescription%'],
  swatchOld: rawStrings['%webView_find_previewOptions_swatchOld%'],
  swatchNew: rawStrings['%webView_find_previewOptions_swatchNew%'],
};

type HarnessConfig = {
  initialOptions?: PreviewOptions;
};

/** Stateful harness that holds previewOptions and popover open state. */
function ReplacePreviewOptionsHarness({ config }: { config: HarnessConfig }) {
  const [previewOptions, setPreviewOptions] = useState<PreviewOptions>(
    config.initialOptions ?? DEFAULT_REPLACE_PREVIEW_OPTIONS,
  );
  const [open, setOpen] = useState(true);

  return (
    <ReplacePreviewOptions
      previewOptions={previewOptions}
      setPreviewOptions={setPreviewOptions}
      localizedStrings={previewOptionsStrings}
      open={open}
      onOpenChange={setOpen}
    />
  );
}

const meta: Meta<typeof ReplacePreviewOptionsHarness> = {
  title: 'Bundled Extensions/platform-scripture/Find/Replace Preview Options',
  component: ReplacePreviewOptionsHarness,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ReplacePreviewOptionsHarness>;

function createDecorator(config: HarnessConfig) {
  return function ReplacePreviewOptionsDecorator() {
    return <ReplacePreviewOptionsHarness config={config} />;
  };
}

/**
 * The picker open with the default replace-mode options (block layout, bar shape, red/green color).
 * Changing any control updates the swatches live.
 */
export const Default: Story = {
  decorators: [createDecorator({})],
};

/**
 * The picker open with an alternative starting configuration: inline layout, grey-blue color
 * scheme, and monospace enabled.
 */
export const InlineGreyBlueMonospace: Story = {
  decorators: [
    createDecorator({
      initialOptions: {
        layout: 'inline',
        highlightShape: 'rounded',
        color: 'grey-blue',
        monospace: true,
        showInvisible: false,
      },
    }),
  ],
};
