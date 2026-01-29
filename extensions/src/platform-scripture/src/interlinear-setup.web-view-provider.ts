import papi from '@papi/backend';
import {
  GetWebViewOptions,
  IWebViewProvider,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import interlinearSetupWebView from './interlinear-setup.web-view.tsx?inline';
import tailwindStyles from './tailwind.css?inline';
import type { InterlinearSetupInput } from './types/interlinear-setup.types';

/** The type identifier for the interlinear setup web view */
export const interlinearSetupWebViewType = 'platformScripture.interlinearSetup';

/** Options for opening the interlinear setup web view */
export interface InterlinearSetupWebViewOptions extends GetWebViewOptions {
  /** The project ID for which to configure interlinear tasks */
  projectId: string | undefined;
}

/**
 * Web view provider for the Interlinear Setup dialog. This dialog allows users to configure
 * interlinear tasks for a project.
 */
export class InterlinearSetupWebViewProvider implements IWebViewProvider {
  /** The web view type this provider handles */
  webViewType = interlinearSetupWebViewType;

  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: InterlinearSetupWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== this.webViewType)
      throw new Error(
        `${this.webViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );

    // Get project ID from options or saved state
    const projectId = getWebViewOptions.projectId || savedWebView.projectId || undefined;

    if (!projectId) {
      // Cannot open without a project
      return undefined;
    }

    // Get project name for the title
    let projectName: string | undefined;
    try {
      const pdp = await papi.projectDataProviders.get('platform.base', projectId);
      projectName = (await pdp.getSetting('platform.name')) ?? projectId;
    } catch {
      projectName = projectId;
    }

    // Build the title
    const title = `Choose interlinear: ${projectName}`;

    // Build input data for the web view
    // In production, this would load existing setups and available projects from PAPI
    const inputData: InterlinearSetupInput = {
      projectName: projectName ?? '',
      projectGuid: projectId,
      isRegistered: true, // TODO: Load actual registration status
      existingSetups: [], // TODO: Load from PAPI via platformScripture.getInterlinearSetups
      options: {
        availableProjects: [], // TODO: Load available projects
        availableLanguages: [], // TODO: Load available languages
      },
      userContext: {
        isRegistered: true,
        canRegisterProjects: true,
        isOnline: true,
        isGuest: false,
        isObserver: false,
      },
    };

    return {
      ...savedWebView,
      title,
      projectId,
      content: interlinearSetupWebView,
      styles: tailwindStyles,
      state: {
        ...savedWebView.state,
        inputData,
      },
    };
  }
}

export default InterlinearSetupWebViewProvider;
