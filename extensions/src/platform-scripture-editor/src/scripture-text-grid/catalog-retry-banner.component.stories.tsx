import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import { CatalogRetryBanner } from './catalog-retry-banner.component';

const CATALOG_ERROR_KEY = '%webView_scriptureTextGrid_catalogUnavailable%';
const CATALOG_RETRY_KEY = '%webView_scriptureTextGrid_retry%';

/**
 * The inline notice shown above the Text Collection grid's rows when the DBL catalog could not be
 * loaded: some cells cannot say whether their text is installed, but the rows that did resolve stay
 * visible, so this is a notice rather than a replacement for the grid.
 */
const meta: Meta<typeof CatalogRetryBanner> = {
  title: 'Bundled Extensions/platform-scripture-editor/CatalogRetryBanner',
  component: CatalogRetryBanner,
  tags: ['autodocs', 'test'],
};
export default meta;

type Story = StoryObj<typeof CatalogRetryBanner>;

const localizedStrings = getLocalizedStrings([CATALOG_ERROR_KEY, CATALOG_RETRY_KEY]);

const noop = () => {};

/** Bounds the banner to a pane-sized box, as it would sit above the grid in the real web view. */
const PANE_BOX_STYLE: React.CSSProperties = {
  width: '640px',
  border: '1px solid var(--border)',
  borderRadius: '4px',
};

function PaneBox({ children, width }: { children: React.ReactNode; width?: string }) {
  return <div style={{ ...PANE_BOX_STYLE, ...(width ? { width } : {}) }}>{children}</div>;
}

/** The banner at its usual pane width. */
export const Default: Story = {
  render: () => (
    <PaneBox>
      <CatalogRetryBanner
        message={localizedStrings[CATALOG_ERROR_KEY]}
        retryLabel={localizedStrings[CATALOG_RETRY_KEY]}
        onRetry={noop}
      />
    </PaneBox>
  ),
};

/**
 * A narrow pane: the message and the retry button wrap onto separate lines instead of the button
 * overflowing or the row scrolling horizontally.
 */
export const NarrowPane: Story = {
  render: () => (
    <PaneBox width="260px">
      <CatalogRetryBanner
        message={localizedStrings[CATALOG_ERROR_KEY]}
        retryLabel={localizedStrings[CATALOG_RETRY_KEY]}
        onRetry={noop}
      />
    </PaneBox>
  ),
};

/** Spanish copy: longer than the English source, exercising the same wrapping as `NarrowPane`. */
export const Spanish: Story = {
  render: () => (
    <PaneBox>
      <CatalogRetryBanner
        message="No se pudo cargar la lista de recursos disponibles."
        retryLabel="Reintentar"
        onRetry={noop}
      />
    </PaneBox>
  ),
};

/** Right-to-left: the icon and button mirror to the other edge, independent of the UI locale. */
export const RightToLeft: Story = {
  render: () => (
    <div dir="rtl">
      <PaneBox>
        <CatalogRetryBanner
          message="تعذر تحميل قائمة الموارد المتاحة."
          retryLabel="إعادة المحاولة"
          onRetry={noop}
        />
      </PaneBox>
    </div>
  ),
};
