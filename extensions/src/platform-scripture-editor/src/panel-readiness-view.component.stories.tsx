import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../.storybook/localization.utils';
import { PanelReadinessView } from './panel-readiness-view.component';
import { RESOURCE_PANEL_STRING_KEYS } from './resource-text-panel.const';

/**
 * Resolved from the extension's real `localizedStrings.json` rather than hardcoded, so this story
 * cannot drift from the copy that ships.
 *
 * Driven off the Resource panel's own key list rather than a copy of the handful this view reads,
 * so a renamed key surfaces here as an unresolved `%...%` token instead of a stale hardcoded
 * sentence. The list is a leaf module, so importing it costs nothing beyond the string array. The
 * args below pick the Bible Texts wording; the Commentaries tab and the Model Text panel render the
 * same view with their own equivalents.
 */
const localizedStrings = getLocalizedStrings([...RESOURCE_PANEL_STRING_KEYS]);

/**
 * The front of a resource panel's state machine — everything shown before the panel has content to
 * display. Nothing renders the Resource (Bible Texts / Commentaries) panel itself in Storybook, so
 * these stories are the only place its loading, error, and empty copy can be reviewed without
 * running the app; the Model Text panel renders the same states through this view too.
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
    errorMessage: localizedStrings['%webView_resourcePanel_settingsUnavailable%'],
    catalogErrorMessage: localizedStrings['%webView_resourcePanel_catalogUnavailable%'],
    loadingLabel: localizedStrings['%webView_resourcePanel_loading%'],
    emptyPrompt: localizedStrings['%webView_resourcePanel_bibleTexts_emptyState_prompt%'],
    pickLabel: localizedStrings['%webView_resourcePanel_bibleTexts_pick%'],
    retryLabel: localizedStrings['%webView_resourcePanel_retry%'],
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
