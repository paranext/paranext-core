import papi from '@papi/backend';
import {
  GetWebViewOptions,
  IWebViewProvider,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import { formatReplacementString } from 'platform-bible-utils';
import checklistWebView from './checklist.web-view?inline';
import tailwindStyles from './tailwind.css?inline';
// USFM character-style classes (UX-2 finding #19). Mirrors the character-style
// subset of `_usj-nodes.scss` from platform-scripture-editor so the checklist
// renders `\nd`, `\wj`, `\em`, `\w`, etc. as styled text rather than literal
// `(\nd Lord)`. See the SCSS file for the rationale and TODO-promote note.
import checklistUsfmStyles from './components/checklist-usfm-styles.scss?inline';

export const markersChecklistWebViewType = 'platformScripture.markersChecklist';

export interface ChecklistWebViewOptions extends GetWebViewOptions {
  projectId: string | undefined;
}

/**
 * Web view provider for the Markers Checklist tool. Resolves the project short-name via the
 * platform base PDP and formats the tab title from the `%markersChecklist_windowTitle%` localize
 * key. Mirrors `InventoryWebViewProvider` (`inventory.web-view-provider.ts`) with the same
 * project-name-formatted title pattern.
 */
export class ChecklistWebViewProvider implements IWebViewProvider {
  // getWebView doesn't use instance state but cannot be static because it implements the
  // IWebViewProvider interface
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: ChecklistWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== markersChecklistWebViewType)
      throw new Error(
        `${markersChecklistWebViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

    const projectId = getWebViewOptions.projectId || savedWebView.projectId || undefined;

    let projectName: string | undefined;
    if (projectId) {
      const pdp = await papi.projectDataProviders.get('platform.base', projectId);
      projectName = (await pdp.getSetting('platform.name')) ?? projectId;
    }

    const title = formatReplacementString(
      await papi.localization.getLocalizedString({
        localizeKey: '%markersChecklist_windowTitle%',
      }),
      {
        projectName: projectName ?? '',
      },
    );

    return {
      ...savedWebView,
      title,
      projectId,
      content: checklistWebView,
      styles: `${tailwindStyles}\n${checklistUsfmStyles}`,
      state: {
        ...savedWebView.state,
        webViewType: markersChecklistWebViewType,
      },
      // The outer Platform.Bible tab chrome is suppressed for the markers checklist —
      // its hamburger/BCV/scroll-group controls now live on the inner TabToolbar inside
      // ChecklistTool, so we don't want a duplicate chrome above the inner toolbar.
      shouldShowToolbar: false,
    };
  }
}

export default ChecklistWebViewProvider;
