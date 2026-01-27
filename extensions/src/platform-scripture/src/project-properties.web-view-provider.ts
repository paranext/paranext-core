import {
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import projectPropertiesWebView from './project-properties.web-view.tsx?inline';
import tailwindStyles from './tailwind.css?inline';

/** Options for opening the Project Properties web view */
export interface ProjectPropertiesWebViewOptions extends OpenWebViewOptions {
  /** Mode: 'new' for creating a project, 'edit' for modifying existing */
  mode?: 'new' | 'edit';
  /** Project ID (required for edit mode) */
  projectId?: string;
  /** Pre-selected project type (e.g., from Interlinear setup) */
  initialType?: string;
}

/** Web view type identifier for the Project Properties form */
export const PROJECT_PROPERTIES_WEB_VIEW_TYPE = 'platform-scripture.projectProperties';

/**
 * Web view provider for the Project Properties Form. Provides the primary dialog for creating new
 * projects and editing existing project settings.
 */
export class ProjectPropertiesWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    options: ProjectPropertiesWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    const mode = options?.mode ?? 'new';
    const title =
      mode === 'new' ? 'Project Properties: New Project' : 'Project Properties: Edit Project';

    return {
      ...savedWebView,
      title,
      content: projectPropertiesWebView,
      styles: tailwindStyles,
      state: {
        ...savedWebView.state,
        mode,
        projectId: options?.projectId,
        initialType: options?.initialType,
      },
    };
  }
}
