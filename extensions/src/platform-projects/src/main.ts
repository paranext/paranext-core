import papi, { logger } from '@papi/backend';
import { ExecutionActivationContext } from '@papi/core';
import {
  ProjectPropertiesWebViewProvider,
  ProjectPropertiesWebViewOptions,
  projectPropertiesWebViewType,
} from './project-properties.web-view-provider';
import {
  ProjectNameWebViewProvider,
  ProjectNameWebViewOptions,
  projectNameWebViewType,
} from './project-name.web-view-provider';
import {
  LanguageSettingsWebViewProvider,
  LanguageSettingsWebViewOptions,
  languageSettingsWebViewType,
} from './language-settings.web-view-provider';
import {
  ChooseEncodingWebViewProvider,
  ChooseEncodingWebViewOptions,
  chooseEncodingWebViewType,
} from './choose-encoding.web-view-provider';

async function openCreateProject(): Promise<string | undefined> {
  const options: ProjectPropertiesWebViewOptions = { mode: 'create' };
  return papi.webViews.openWebView(
    projectPropertiesWebViewType,
    { type: 'float', floatSize: { width: 800, height: 600 } },
    options,
  );
}

async function openProjectName(): Promise<string | undefined> {
  const options: ProjectNameWebViewOptions = {};
  return papi.webViews.openWebView(
    projectNameWebViewType,
    { type: 'float', floatSize: { width: 500, height: 400 } },
    options,
  );
}

async function openLanguageSettings(): Promise<string | undefined> {
  const options: LanguageSettingsWebViewOptions = {};
  return papi.webViews.openWebView(
    languageSettingsWebViewType,
    { type: 'float', floatSize: { width: 700, height: 550 } },
    options,
  );
}

async function openChooseEncoding(): Promise<string | undefined> {
  const options: ChooseEncodingWebViewOptions = {};
  return papi.webViews.openWebView(
    chooseEncodingWebViewType,
    { type: 'float', floatSize: { width: 450, height: 300 } },
    options,
  );
}

export async function activate(context: ExecutionActivationContext): Promise<void> {
  logger.debug('platform-projects is activating!');

  const projectPropertiesWebViewProvider = new ProjectPropertiesWebViewProvider();
  const projectNameWebViewProvider = new ProjectNameWebViewProvider();
  const languageSettingsWebViewProvider = new LanguageSettingsWebViewProvider();
  const chooseEncodingWebViewProvider = new ChooseEncodingWebViewProvider();

  const projectPropertiesProviderPromise = papi.webViewProviders.registerWebViewProvider(
    projectPropertiesWebViewType,
    projectPropertiesWebViewProvider,
  );

  const projectNameProviderPromise = papi.webViewProviders.registerWebViewProvider(
    projectNameWebViewType,
    projectNameWebViewProvider,
  );

  const languageSettingsProviderPromise = papi.webViewProviders.registerWebViewProvider(
    languageSettingsWebViewType,
    languageSettingsWebViewProvider,
  );

  const chooseEncodingProviderPromise = papi.webViewProviders.registerWebViewProvider(
    chooseEncodingWebViewType,
    chooseEncodingWebViewProvider,
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

  const openProjectNamePromise = papi.commands.registerCommand(
    'platformProjects.openProjectName',
    openProjectName,
    {
      method: {
        summary: 'Open the Project Name dialog',
        params: [],
        result: {
          name: 'return value',
          summary: 'The ID of the opened project name web view',
          schema: { type: 'string' },
        },
      },
    },
  );

  const openLanguageSettingsPromise = papi.commands.registerCommand(
    'platformProjects.openLanguageSettings',
    openLanguageSettings,
    {
      method: {
        summary: 'Open the Language Settings dialog',
        params: [],
        result: {
          name: 'return value',
          summary: 'The ID of the opened language settings web view',
          schema: { type: 'string' },
        },
      },
    },
  );

  const openChooseEncodingPromise = papi.commands.registerCommand(
    'platformProjects.openChooseEncoding',
    openChooseEncoding,
    {
      method: {
        summary: 'Open the Choose Encoding dialog',
        params: [],
        result: {
          name: 'return value',
          summary: 'The ID of the opened choose encoding web view',
          schema: { type: 'string' },
        },
      },
    },
  );

  context.registrations.add(
    await projectPropertiesProviderPromise,
    await projectNameProviderPromise,
    await languageSettingsProviderPromise,
    await openCreateProjectPromise,
    await openProjectNamePromise,
    await openLanguageSettingsPromise,
    await chooseEncodingProviderPromise,
    await openChooseEncodingPromise,
  );

  logger.debug('platform-projects is activated!');
}

export async function deactivate(): Promise<boolean> {
  logger.debug('platform-projects is deactivating!');
  return true;
}
