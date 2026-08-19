import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { PanelReadinessView } from './panel-readiness-view.component';

/**
 * The front of a resource panel's state machine — everything shown before the panel has content to
 * display. The Resource (Bible Texts / Commentaries) panel lives entirely in a web view, so these
 * stories are the only place its loading, error, and empty copy can be reviewed without running the
 * app; the Model Text panel renders the same states through this view too.
 *
 * The two failure states deliberately differ in whether they offer a control. A catalog fetch can
 * genuinely be re-driven, so it gets a working retry. An unreadable configured-resource setting
 * cannot be re-driven from the panel, so it shows a message alone rather than an inert button — the
 * setting stays watched and the panel recovers on its own.
 */
const meta: Meta<typeof PanelReadinessView> = {
  title: 'Bundled Extensions/platform-scripture-editor/PanelReadinessView',
  component: PanelReadinessView,
  tags: ['autodocs'],
  args: {
    errorMessage: "Couldn't load your resources. They will appear once they're available.",
    catalogErrorMessage: "Couldn't load the list of available resources.",
    loadingLabel: 'Loading…',
    emptyPrompt:
      'No Bible text selected. Pick one to display a reference translation alongside your project.',
    pickLabel: 'Pick Bible text…',
    retryLabel: 'Try again',
  },
};
export default meta;

type Story = StoryObj<typeof PanelReadinessView>;

/** Either source is still resolving — the panel must not guess at an empty state. */
export const Loading: Story = { args: { readiness: 'loading' } };

/**
 * The configured-resource setting could not be read. No control: nothing here can re-drive that
 * read, so the message carries the recovery expectation instead.
 */
export const SettingsError: Story = { args: { readiness: 'error' } };

/** The resource catalog could not be loaded. Recoverable, so this one does offer a retry. */
export const CatalogError: Story = { args: { readiness: 'catalogError' } };

/** Nothing is configured — now known rather than assumed, so the pick prompt is correct. */
export const Empty: Story = { args: { readiness: 'empty' } };
