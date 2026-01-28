import papi, { logger } from '@papi/backend';
import { ExecutionActivationContext } from '@papi/core';
import {
  ProjectPropertiesWebViewProvider,
  projectPropertiesWebViewType,
} from './project-properties.web-view-provider';

async function showNewProject(): Promise<string | undefined> {
  return papi.webViews.openWebView(
    projectPropertiesWebViewType,
    { type: 'float', position: 'center', floatSize: { width: 700, height: 600 } },
    {
      existingId: '?',
      webViewState: { mode: 'new' },
    },
  );
}

async function showProjectProperties(projectGuid: string): Promise<string | undefined> {
  return papi.webViews.openWebView(
    projectPropertiesWebViewType,
    { type: 'float', position: 'center', floatSize: { width: 700, height: 600 } },
    {
      existingId: '?',
      webViewState: { mode: 'edit', projectId: projectGuid },
    },
  );
}

export async function activate(context: ExecutionActivationContext) {
  logger.debug('Paratext Project Creation is activating!');

  const projectPropertiesWebViewProvider = new ProjectPropertiesWebViewProvider();

  const webViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    projectPropertiesWebViewType,
    projectPropertiesWebViewProvider,
  );

  const showNewProjectPromise = papi.commands.registerCommand(
    'paratextProjectCreation.showNewProject',
    showNewProject,
  );

  const showProjectPropertiesPromise = papi.commands.registerCommand(
    'paratextProjectCreation.showProjectProperties',
    showProjectProperties,
  );

  context.registrations.add(
    await webViewProviderPromise,
    await showNewProjectPromise,
    await showProjectPropertiesPromise,
  );
}

export async function deactivate() {
  logger.debug('Paratext Project Creation is deactivating!');
  return true;
}
