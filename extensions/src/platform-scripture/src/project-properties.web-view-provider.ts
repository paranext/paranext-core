/** ProjectPropertiesWebViewProvider - Provider for Project Properties web view */

import papi from '@papi/backend';
import type {
  GetWebViewOptions,
  IWebViewProvider,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import { LocalizeKey } from 'platform-bible-utils';
import projectPropertiesWebView from './project-properties.web-view.tsx?inline';
import projectPropertiesStyles from './tailwind.css?inline';
import type { ProjectPropertiesInput, InterlinearContext } from './types/project-properties.types';

// =============================================================================
// WEB VIEW OPTIONS
// =============================================================================

export interface ProjectPropertiesWebViewOptions extends GetWebViewOptions {
  /** Mode: create new project or edit existing */
  mode?: 'create' | 'edit';

  /** Project ID for edit mode */
  projectId?: string;

  /** Interlinear context when opened from Interlinearizer */
  interlinearContext?: InterlinearContext;
}

// =============================================================================
// CONSTANTS
// =============================================================================

export const PROJECT_PROPERTIES_WEB_VIEW_TYPE = 'platformScripture.projectProperties';

/** Localization key for the web view title */
export const PROJECT_PROPERTIES_TITLE_KEY: LocalizeKey = '%projectProperties_title%';

// =============================================================================
// PROVIDER
// =============================================================================

/**
 * Web view provider for Project Properties dialog
 *
 * This provider creates web views for creating new projects or editing existing project properties.
 * The dialog includes 5-7 tabs depending on project type:
 *
 * - General: Name, language, versification, project type, base project, registration
 * - Books: Book selection
 * - Associations: Lexical project associations
 * - Notes: Comment tag configuration
 * - Advanced: File naming, encoding, sharing options
 * - Additions (SBA only): Study Bible base text configuration
 * - Study Bible (SBA only): Category configuration
 *
 * Entry point: Paratext > New Project or project context menu (EP-001)
 */
export class ProjectPropertiesWebViewProvider implements IWebViewProvider {
  /** The web view type this provider handles */
  readonly webViewType = PROJECT_PROPERTIES_WEB_VIEW_TYPE;

  /** Localization key for the title */
  readonly titleKey = PROJECT_PROPERTIES_TITLE_KEY;

  /** Get the web view definition */
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: ProjectPropertiesWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== this.webViewType) {
      throw new Error(
        `ProjectPropertiesWebViewProvider received request to provide a ${savedWebView.webViewType} web view`,
      );
    }

    // Extract state safely
    const savedState = savedWebView.state ?? {};
    const stateMode =
      typeof savedState === 'object' && 'mode' in savedState
        ? String(savedState.mode ?? 'create')
        : 'create';
    const stateProjectId =
      typeof savedState === 'object' && 'projectId' in savedState
        ? String(savedState.projectId ?? '')
        : '';

    // Get options from request or saved state
    const mode: 'create' | 'edit' =
      getWebViewOptions.mode || (stateMode === 'edit' ? 'edit' : 'create');
    const projectId = getWebViewOptions.projectId || stateProjectId;
    const { interlinearContext } = getWebViewOptions;

    // Build input data for the web view
    // In production, this would fetch from PAPI
    const inputData: Partial<ProjectPropertiesInput> = {
      mode,
      interlinearContext,
    };

    // TODO: In production, fetch existing project data if mode === 'edit'
    // TODO: In production, fetch option lists from PAPI

    // Get localized title
    let displayTitle: string;
    try {
      const title = await papi.localization.getLocalizedString({
        localizeKey: this.titleKey,
      });
      // Determine default title based on mode
      const defaultTitle = mode === 'create' ? 'New Project' : 'Project Properties';
      displayTitle = title !== this.titleKey ? title : defaultTitle;
    } catch {
      displayTitle = mode === 'create' ? 'New Project' : 'Project Properties';
    }

    // Append project name for edit mode
    if (mode === 'edit' && projectId) {
      displayTitle = `${displayTitle} - ${projectId}`;
    }

    return {
      ...savedWebView,
      title: displayTitle,
      content: projectPropertiesWebView,
      styles: projectPropertiesStyles,
      state: {
        ...savedState,
        mode,
        projectId,
        inputData,
      },
    };
  }
}

// =============================================================================
// FACTORY
// =============================================================================

/** Create and register the Project Properties web view provider */
export async function registerProjectPropertiesWebViewProvider(): Promise<void> {
  const provider = new ProjectPropertiesWebViewProvider();

  await papi.webViewProviders.register(PROJECT_PROPERTIES_WEB_VIEW_TYPE, provider);
}

export default ProjectPropertiesWebViewProvider;
