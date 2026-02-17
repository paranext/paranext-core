import papi, { logger } from '@papi/backend';
import { ExecutionActivationContext } from '@papi/core';
import {
  ProjectPropertiesWebViewProvider,
  projectPropertiesWebViewType,
} from './project-properties.web-view-provider';
import {
  ProjectNameWebViewProvider,
  projectNameWebViewType,
} from './project-name.web-view-provider';

export async function activate(context: ExecutionActivationContext) {
  logger.debug('platform-projects is activating!');

  const projectPropertiesWebViewProvider = new ProjectPropertiesWebViewProvider();

  const projectPropertiesWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    projectPropertiesWebViewType,
    projectPropertiesWebViewProvider,
  );

  const openProjectPropertiesPromise = papi.commands.registerCommand(
    'platformProjects.openProjectProperties',
    async () => {
      const webViewId = await papi.webViews.openWebView(projectPropertiesWebViewType, undefined, {
        existingId: '?',
      });
      return webViewId;
    },
    {
      method: {
        summary: 'Open the Project Properties dialog',
        params: [],
        result: {
          name: 'return value',
          summary: 'The ID of the opened project properties web view',
          schema: { type: 'string' },
        },
      },
    },
  );

  // Project Name Form (sub-dialog)
  const projectNameWebViewProvider = new ProjectNameWebViewProvider();

  const projectNameWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    projectNameWebViewType,
    projectNameWebViewProvider,
  );

  const openProjectNamePromise = papi.commands.registerCommand(
    'platformProjects.openProjectName',
    async () => {
      const webViewId = await papi.webViews.openWebView(
        projectNameWebViewType,
        { type: 'float', floatSize: { width: 500, height: 500 } },
        { existingId: '?' },
      );
      return webViewId;
    },
    {
      method: {
        summary: 'Open the Project Name form to edit project identification fields',
        params: [],
        result: {
          name: 'return value',
          summary: 'The ID of the opened project name web view',
          schema: { type: 'string' },
        },
      },
    },
  );

  context.registrations.add(
    await projectPropertiesWebViewProviderPromise,
    await openProjectPropertiesPromise,
    await projectNameWebViewProviderPromise,
    await openProjectNamePromise,
  );

  logger.debug('platform-projects is activated!');
}

export async function deactivate() {
  logger.debug('platform-projects is deactivating!');
  return true;
}
