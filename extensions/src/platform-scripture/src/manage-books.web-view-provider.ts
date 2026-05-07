/**
 * === NEW IN PT10 === FN-008 (2026-05-01): Web view provider for the unified Manage Books dialog.
 * Mirrors the inventory web-view-provider shape — title resolved at open time from the active
 * project's display name, content + styles imported via webpack ?inline.
 */
import papi from '@papi/backend';
import {
  GetWebViewOptions,
  IWebViewProvider,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import { formatReplacementString, LocalizeKey } from 'platform-bible-utils';
import manageBooksWebView from './manage-books.web-view?inline';
// Reuse the inventory styles for now — Tailwind classes resolve at the
// platform-bible-react level; we mainly need the base body styles. If the
// dialog needs custom CSS later, switch to a dedicated SCSS file.
import manageBooksWebViewStyles from './inventory.web-view.scss?inline';

export const MANAGE_BOOKS_WEB_VIEW_TYPE = 'platformScripture.manageBooks';

/**
 * Options accepted when opening the Manage Books web view. The optional `projectId` lets a caller
 * (e.g. the openManageBooks command) pre-target a specific project; when omitted the dialog
 * defaults to whatever was last persisted in the saved web view state.
 */
export interface ManageBooksWebViewOptions extends GetWebViewOptions {
  projectId: string | undefined;
}

export class ManageBooksWebViewProvider implements IWebViewProvider {
  /**
   * Title key used for the localized dialog window title. Held on the instance so the lint rule
   * `class-methods-use-this` is satisfied; the value is fixed at construction time.
   */
  titleKey: LocalizeKey = '%manageBooks_dialog_title%';

  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: ManageBooksWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== MANAGE_BOOKS_WEB_VIEW_TYPE)
      throw new Error(
        `${MANAGE_BOOKS_WEB_VIEW_TYPE} provider received request to provide a ` +
          `${savedWebView.webViewType} web view`,
      );

    const projectId = getWebViewOptions.projectId || savedWebView.projectId || undefined;

    let projectName: string | undefined;
    if (projectId) {
      try {
        const pdp = await papi.projectDataProviders.get('platform.base', projectId);
        projectName = (await pdp.getSetting('platform.name')) ?? projectId;
      } catch {
        // Resolution failed (project may have been removed since the saved
        // state was persisted). Fall through with no projectName — the
        // dialog opens with a project picker the user can change.
      }
    }

    // Resolve the localized title; "{projectName}" is substituted when set so
    // tabs read "Manage Books — Greek NT" etc. When projectName is undefined
    // the substitution helper leaves the placeholder unrendered.
    const titleTemplate = await papi.localization.getLocalizedString({
      localizeKey: this.titleKey,
    });
    const title = projectName
      ? formatReplacementString(`${titleTemplate} — {projectName}`, { projectName })
      : titleTemplate;

    return {
      ...savedWebView,
      title,
      projectId,
      content: manageBooksWebView,
      styles: manageBooksWebViewStyles,
      state: {
        ...savedWebView.state,
        webViewType: MANAGE_BOOKS_WEB_VIEW_TYPE,
      },
      shouldShowToolbar: false,
    };
  }
}

export default ManageBooksWebViewProvider;
