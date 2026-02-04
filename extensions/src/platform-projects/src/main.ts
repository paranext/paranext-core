import type { ProjectPropertiesWebViewOptions } from 'platform-projects';
import papi, { logger } from '@papi/backend';
import { ExecutionActivationContext } from '@papi/core';
import {
  ProjectPropertiesWebViewProvider,
  projectPropertiesWebViewType,
} from './project-properties.web-view-provider';

/**
 * Opens the Create Project dialog
 *
 * @returns The web view ID of the opened dialog, or undefined if failed
 */
async function openCreateProject(): Promise<string | undefined> {
  logger.debug('Opening Create Project dialog');

  const options: ProjectPropertiesWebViewOptions = {
    mode: 'create',
  };

  return papi.webViews.openWebView(
    projectPropertiesWebViewType,
    { type: 'float', floatSize: { width: 700, height: 600 } },
    options,
  );
}

/**
 * Opens the Edit Project dialog for a specific project
 *
 * @param projectGuid - The GUID of the project to edit
 * @returns The web view ID of the opened dialog, or undefined if failed
 */
async function openEditProject(projectGuid: string): Promise<string | undefined> {
  logger.debug(`Opening Edit Project dialog for project: ${projectGuid}`);

  const options: ProjectPropertiesWebViewOptions = {
    mode: 'edit',
    projectGuid,
  };

  return papi.webViews.openWebView(
    projectPropertiesWebViewType,
    { type: 'float', floatSize: { width: 700, height: 600 } },
    options,
  );
}

export async function activate(context: ExecutionActivationContext) {
  logger.debug('platform-projects extension is activating!');

  // Create the web view provider instance
  const projectPropertiesWebViewProvider = new ProjectPropertiesWebViewProvider();

  // Register the web view provider
  const projectPropertiesProviderPromise = papi.webViewProviders.registerWebViewProvider(
    projectPropertiesWebViewType,
    projectPropertiesWebViewProvider,
  );

  // Register the openCreateProject command
  const openCreateProjectCommandPromise = papi.commands.registerCommand(
    'platformProjects.openCreateProject',
    openCreateProject,
    {
      method: {
        summary: 'Open the Create Project dialog',
        params: [],
        result: {
          name: 'webViewId',
          summary: 'The ID of the opened web view, or undefined if failed',
          schema: { type: 'string' },
        },
      },
    },
  );

  // Register the openEditProject command
  const openEditProjectCommandPromise = papi.commands.registerCommand(
    'platformProjects.openEditProject',
    openEditProject,
    {
      method: {
        summary: 'Open the Edit Project dialog for a specific project',
        params: [
          {
            name: 'projectGuid',
            required: true,
            summary: 'The GUID of the project to edit',
            schema: { type: 'string' },
          },
        ],
        result: {
          name: 'webViewId',
          summary: 'The ID of the opened web view, or undefined if failed',
          schema: { type: 'string' },
        },
      },
    },
  );

  // Add all registrations to the context
  context.registrations.add(
    await projectPropertiesProviderPromise,
    await openCreateProjectCommandPromise,
    await openEditProjectCommandPromise,
  );

  logger.debug('platform-projects extension is finished activating!');
}

export async function deactivate() {
  logger.debug('platform-projects extension is deactivating!');
  return true;
}
