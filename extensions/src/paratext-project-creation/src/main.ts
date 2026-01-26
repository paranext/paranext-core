import papi, { logger } from '@papi/backend';
import { ExecutionActivationContext } from '@papi/core';
import {
  ProjectPropertiesWebViewProvider,
  projectPropertiesWebViewType,
} from './project-properties.web-view-provider';

/** Opens the Project Properties web view for creating a new project. */
async function showNewProject(): Promise<string | undefined> {
  return papi.webViews.openWebView(
    projectPropertiesWebViewType,
    { type: 'float', position: 'center', floatSize: { width: 800, height: 700 } },
    { existingId: '?' },
  );
}

/**
 * Opens the Project Properties web view for editing an existing project. The projectGuid is passed
 * through a separate mechanism since OpenWebViewOptions doesn't support custom properties.
 */
async function showProjectProperties(projectGuid: string): Promise<string | undefined> {
  // Store the project guid temporarily so the provider can access it
  // The provider will read this when creating the web view
  (globalThis as Record<string, unknown>).__pendingProjectGuid = projectGuid;
  try {
    return await papi.webViews.openWebView(
      projectPropertiesWebViewType,
      { type: 'float', position: 'center', floatSize: { width: 800, height: 700 } },
      { existingId: '?' },
    );
  } finally {
    delete (globalThis as Record<string, unknown>).__pendingProjectGuid;
  }
}

/**
 * Paratext Project Creation Extension
 *
 * This extension provides UI components and services for creating new Paratext projects.
 *
 * Components provided:
 *
 * - EncodingDialog (CAP-UI-004): Select text encoding for project files
 * - ProjectNameDialog (CAP-UI-002): Edit project names with validation
 * - LanguageSelectionDialog (CAP-UI-003): Select language with BCP-47 support
 * - RegistrationSelectionControl (CAP-UI-005): Display and manage registration status
 * - ProjectPropertiesForm (CAP-UI-001): Main project properties dialog with tabs
 *
 * Commands provided:
 *
 * - ParatextProjectCreation.showNewProject: Opens the new project dialog
 * - ParatextProjectCreation.showProjectProperties: Opens the project properties dialog
 */
export async function activate(context: ExecutionActivationContext) {
  logger.debug('Paratext Project Creation is activating!');

  // Create web view provider
  const projectPropertiesWebViewProvider = new ProjectPropertiesWebViewProvider();

  // Register web view provider
  const webViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    projectPropertiesWebViewType,
    projectPropertiesWebViewProvider,
  );

  // Register command to show new project dialog
  const showNewProjectCommandPromise = papi.commands.registerCommand(
    'paratextProjectCreation.showNewProject',
    showNewProject,
  );

  // Register command to show project properties dialog
  const showProjectPropertiesCommandPromise = papi.commands.registerCommand(
    'paratextProjectCreation.showProjectProperties',
    showProjectProperties,
  );

  // Add all registrations to context
  context.registrations.add(
    await webViewProviderPromise,
    await showNewProjectCommandPromise,
    await showProjectPropertiesCommandPromise,
  );

  logger.debug('Paratext Project Creation activated successfully!');
}

export async function deactivate() {
  logger.debug('Paratext Project Creation is deactivating!');
  return true;
}
