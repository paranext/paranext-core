import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { ArrowRight, Minus, Plus } from 'lucide-react';
import { ReplacePreviewOptions } from './replace-preview-options.component';
import {
  DEFAULT_REPLACE_PREVIEW_OPTIONS,
  PreviewOptions,
  ReplacePreviewColor,
  ReplacePreviewHighlightShape,
} from './replace-preview-types';
import {
  getFindHighlightClasses,
  getFindHighlightStyle,
  getGoldFindHighlightClasses,
  getReplaceHighlightClasses,
  getReplaceHighlightStyle,
  renderWithInvisibleChars,
} from './replace-preview-styles';

// ─── Picker Story ────────────────────────────────────────────────────────────

function ReplacePreviewOptionsDemo() {
  const [previewOptions, setPreviewOptions] = useState<PreviewOptions>(
    DEFAULT_REPLACE_PREVIEW_OPTIONS,
  );

  return (
    <div className="tw-flex tw-items-center tw-gap-4">
      <ReplacePreviewOptions
        previewOptions={previewOptions}
        setPreviewOptions={setPreviewOptions}
        localizedStrings={{
          togglePreviewOptions: 'View',
          layout: 'Layout',
          layoutArrow: 'Arrow',
          layoutInline: 'Inline',
          layoutBlock: 'Block',
          highlightShape: 'Highlight Shape',
          highlightShapeBar: 'Bar border',
          highlightShapeRounded: 'Rounded',
          highlightShapePlain: 'Plain',
          color: 'Color',
          colorRedCyan: 'Red / Cyan',
          colorRedGreen: 'Red / Green',
          colorGreyBlue: 'Grey / Blue',
          monospace: 'Monospace',
          monospaceDescription: 'Use fixed-width font',
          showInvisible: 'Show invisible',
          showInvisibleDescription: 'Show symbols for whitespace',
        }}
      />
      <pre className="tw-text-xs tw-text-muted-foreground">
        {JSON.stringify(previewOptions, undefined, 2)}
      </pre>
    </div>
  );
}

// ─── Preview Swatch Story ─────────────────────────────────────────────────────

const SAMPLE_BEFORE = 'In the beginning ';
const SAMPLE_FIND = 'God';
const SAMPLE_REPLACE = 'Lord';
const SAMPLE_AFTER = ' created the heavens.';
const SAMPLE_INVISIBLE = 'In\u00a0the\u200bbeginning\u0020God\u00a0created.';

function PreviewSwatchRow({
  label,
  previewOptions,
}: {
  label: string;
  previewOptions: PreviewOptions;
}) {
  const { layout, highlightShape, color, monospace, showInvisible } = previewOptions;
  const fontClass = monospace ? 'tw-font-mono' : 'scripture-font';
  const findClass = getFindHighlightClasses(color, highlightShape);
  const findStyle = getFindHighlightStyle(color);
  const replaceClass = getReplaceHighlightClasses(color, highlightShape);
  const replaceStyle = getReplaceHighlightStyle(color);
  const findGoldClass = `${fontClass} ${getGoldFindHighlightClasses(highlightShape)}`;
  // Inline layout: only round the outer corners so the two adjacent spans look like one unified rectangle
  const findClassInline = getFindHighlightClasses(color, highlightShape, true, 'left');
  const replaceClassInline = getReplaceHighlightClasses(color, highlightShape, 'right');

  const display = (text: string) => (showInvisible ? renderWithInvisibleChars(text) : text);

  const before = display(SAMPLE_BEFORE);
  const find = display(SAMPLE_FIND);
  const replace = display(SAMPLE_REPLACE);
  const after = display(SAMPLE_AFTER);

  const renderPreview = () => {
    if (layout === 'find') {
      return (
        <div className={`tw-text-xs tw-text-muted-foreground ${fontClass}`}>
          {before}
          <span className={findGoldClass}>{find}</span>
          {after}
        </div>
      );
    }

    if (layout === 'inline') {
      return (
        <div className={`tw-text-xs tw-text-muted-foreground ${fontClass}`}>
          {before}
          <span className={`${fontClass} ${findClassInline}`} style={findStyle}>
            {find}
          </span>
          <span className={`${fontClass} ${replaceClassInline}`} style={replaceStyle}>
            {replace}
          </span>
          {after}
        </div>
      );
    }

    if (layout === 'block') {
      return (
        <div className="tw-space-y-0.5 tw-text-xs">
          <div className="tw-flex tw-items-baseline tw-gap-1">
            <Minus className="tw-h-3 tw-w-3 tw-shrink-0 tw-text-red-500" />
            <span className={`tw-text-muted-foreground ${fontClass}`}>
              {before}
              <span className={`${fontClass} ${findClass}`} style={findStyle}>
                {find}
              </span>
              {after}
            </span>
          </div>
          <div className="tw-flex tw-items-baseline tw-gap-1">
            <Plus className="tw-h-3 tw-w-3 tw-shrink-0 tw-text-green-500" />
            <span className={`tw-text-muted-foreground ${fontClass}`}>
              {before}
              <span className={`${fontClass} ${replaceClass}`} style={replaceStyle}>
                {replace}
              </span>
              {after}
            </span>
          </div>
        </div>
      );
    }

    // arrow
    return (
      <div className="tw-flex tw-items-center tw-gap-1.5 tw-text-xs">
        <span className={`${fontClass} ${findClass}`} style={findStyle}>
          {find}
        </span>
        <ArrowRight className="tw-h-3 tw-w-3 tw-shrink-0" />
        <span className={`${fontClass} ${replaceClass}`} style={replaceStyle}>
          {replace}
        </span>
      </div>
    );
  };

  return (
    <div className="tw-rounded-lg tw-border tw-p-3">
      <p className="tw-mb-2 tw-text-xs tw-font-semibold tw-text-muted-foreground">{label}</p>
      {renderPreview()}
    </div>
  );
}

function AllPreviewVariants() {
  const shapes: ReplacePreviewHighlightShape[] = ['bar', 'rounded', 'plain'];
  const colors: ReplacePreviewColor[] = ['red-cyan', 'red-green', 'grey-blue'];

  return (
    <div className="tw-space-y-6 tw-p-4">
      <section>
        <h3 className="tw-mb-3 tw-text-sm tw-font-semibold">Find Layout (no replace preview)</h3>
        <div className="tw-grid tw-grid-cols-3 tw-gap-3">
          {shapes.map((shape) => (
            <PreviewSwatchRow
              key={`find-${shape}`}
              label={`${shape}`}
              previewOptions={{
                ...DEFAULT_REPLACE_PREVIEW_OPTIONS,
                layout: 'find',
                highlightShape: shape,
                color: 'red-cyan',
              }}
            />
          ))}
        </div>
      </section>

      <section>
        <h3 className="tw-mb-3 tw-text-sm tw-font-semibold">Arrow Layout</h3>
        <div className="tw-grid tw-grid-cols-3 tw-gap-3">
          {shapes.map((shape) =>
            colors.map((color) => (
              <PreviewSwatchRow
                key={`arrow-${shape}-${color}`}
                label={`${shape} · ${color}`}
                previewOptions={{
                  ...DEFAULT_REPLACE_PREVIEW_OPTIONS,
                  layout: 'arrow',
                  highlightShape: shape,
                  color,
                }}
              />
            )),
          )}
        </div>
      </section>

      <section>
        <h3 className="tw-mb-3 tw-text-sm tw-font-semibold">Inline Layout</h3>
        <div className="tw-grid tw-grid-cols-3 tw-gap-3">
          {shapes.map((shape) =>
            colors.map((color) => (
              <PreviewSwatchRow
                key={`inline-${shape}-${color}`}
                label={`${shape} · ${color}`}
                previewOptions={{
                  ...DEFAULT_REPLACE_PREVIEW_OPTIONS,
                  layout: 'inline',
                  highlightShape: shape,
                  color,
                }}
              />
            )),
          )}
        </div>
      </section>

      <section>
        <h3 className="tw-mb-3 tw-text-sm tw-font-semibold">Block Layout</h3>
        <div className="tw-grid tw-grid-cols-3 tw-gap-3">
          {shapes.map((shape) =>
            colors.map((color) => (
              <PreviewSwatchRow
                key={`block-${shape}-${color}`}
                label={`${shape} · ${color}`}
                previewOptions={{
                  ...DEFAULT_REPLACE_PREVIEW_OPTIONS,
                  layout: 'block',
                  highlightShape: shape,
                  color,
                }}
              />
            )),
          )}
        </div>
      </section>

      <section>
        <h3 className="tw-mb-3 tw-text-sm tw-font-semibold">Monospace + Show Invisible</h3>
        <div className="tw-grid tw-grid-cols-2 tw-gap-3">
          <PreviewSwatchRow
            label="Monospace ON"
            previewOptions={{
              ...DEFAULT_REPLACE_PREVIEW_OPTIONS,
              layout: 'arrow',
              monospace: true,
            }}
          />
          <PreviewSwatchRow
            label="Show Invisible ON"
            previewOptions={{
              ...DEFAULT_REPLACE_PREVIEW_OPTIONS,
              layout: 'inline',
              showInvisible: true,
            }}
          />
          <PreviewSwatchRow
            label="Both ON"
            previewOptions={{
              ...DEFAULT_REPLACE_PREVIEW_OPTIONS,
              layout: 'block',
              monospace: true,
              showInvisible: true,
            }}
          />
        </div>
        <div className="tw-mt-3 tw-rounded-lg tw-border tw-p-3">
          <p className="tw-mb-2 tw-text-xs tw-font-semibold tw-text-muted-foreground">
            Show Invisible — sample with NBSP, ZWS and regular space
          </p>
          <p className="tw-font-mono tw-text-xs">{renderWithInvisibleChars(SAMPLE_INVISIBLE)}</p>
        </div>
      </section>
    </div>
  );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Bundled Extensions/find/ReplacePreviewOptions',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const PickerLight: Story = {
  render: () => <ReplacePreviewOptionsDemo />,
  decorators: [
    (Story) => (
      <div className="pr-twp tw-p-4">
        <Story />
      </div>
    ),
  ],
};

export const AllVariantsLight: Story = {
  render: () => <AllPreviewVariants />,
  decorators: [
    (Story) => (
      <div className="pr-twp">
        <Story />
      </div>
    ),
  ],
};
