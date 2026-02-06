import papi, { logger } from '@papi/backend';
import { ExecutionActivationContext } from '@papi/core';
import {
  ProjectPropertiesWebViewProvider,
  ProjectPropertiesWebViewOptions,
  projectPropertiesWebViewType,
} from './project-properties.web-view-provider';

async function openCreateProject(): Promise<string | undefined> {
  const options: ProjectPropertiesWebViewOptions = { mode: 'create' };
  return papi.webViews.openWebView(
    projectPropertiesWebViewType,
    { type: 'float', floatSize: { width: 800, height: 600 } },
    options,
  );
}

export async function activate(context: ExecutionActivationContext): Promise<void> {
  logger.debug('platform-projects is activating!');

  const projectPropertiesWebViewProvider = new ProjectPropertiesWebViewProvider();

  const projectPropertiesProviderPromise = papi.webViewProviders.registerWebViewProvider(
    projectPropertiesWebViewType,
    projectPropertiesWebViewProvider,
  );

  const openCreateProjectPromise = papi.commands.registerCommand(
    'platformProjects.openCreateProject',
    openCreateProject,
    {
      method: {
        summary: 'Open the Create Project dialog',
        params: [],
        result: {
          name: 'return value',
          summary: 'The ID of the opened project properties web view',
          schema: { type: 'string' },
        },
      },
    },
  );

  context.registrations.add(await projectPropertiesProviderPromise, await openCreateProjectPromise);

  logger.debug('platform-projects is activated!');
}

export async function deactivate(): Promise<boolean> {
  logger.debug('platform-projects is deactivating!');
  return true;
}
