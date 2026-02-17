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
import {
  LanguageSettingsWebViewProvider,
  languageSettingsWebViewType,
} from './language-settings.web-view-provider';
import {
  ChooseEncodingWebViewProvider,
  chooseEncodingWebViewType,
} from './choose-encoding.web-view-provider';
import {
  EditFilingPatternWebViewProvider,
  editFilingPatternWebViewType,
} from './edit-filing-pattern.web-view-provider';

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

  // Language Settings Form (sub-dialog)
  const languageSettingsWebViewProvider = new LanguageSettingsWebViewProvider();

  const languageSettingsWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    languageSettingsWebViewType,
    languageSettingsWebViewProvider,
  );

  const openLanguageSettingsPromise = papi.commands.registerCommand(
    'platformProjects.openLanguageSettings',
    async () => {
      const webViewId = await papi.webViews.openWebView(
        languageSettingsWebViewType,
        { type: 'float', floatSize: { width: 700, height: 600 } },
        { existingId: '?' },
      );
      return webViewId;
    },
    {
      method: {
        summary: 'Open the Language Settings dialog to configure language-specific settings',
        params: [],
        result: {
          name: 'return value',
          summary: 'The ID of the opened language settings web view',
          schema: { type: 'string' },
        },
      },
    },
  );

  // Choose Encoding Form (sub-dialog)
  const chooseEncodingWebViewProvider = new ChooseEncodingWebViewProvider();

  const chooseEncodingWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    chooseEncodingWebViewType,
    chooseEncodingWebViewProvider,
  );

  const openChooseEncodingPromise = papi.commands.registerCommand(
    'platformProjects.openChooseEncoding',
    async () => {
      const webViewId = await papi.webViews.openWebView(
        chooseEncodingWebViewType,
        { type: 'float', floatSize: { width: 500, height: 400 } },
        { existingId: '?' },
      );
      return webViewId;
    },
    {
      method: {
        summary: 'Open the Choose Encoding dialog to select an encoding converter',
        params: [],
        result: {
          name: 'return value',
          summary: 'The ID of the opened choose encoding web view',
          schema: { type: 'string' },
        },
      },
    },
  );

  // Edit Filing Pattern Form (sub-dialog)
  const editFilingPatternWebViewProvider = new EditFilingPatternWebViewProvider();

  const editFilingPatternWebViewProviderPromise = papi.webViewProviders.registerWebViewProvider(
    editFilingPatternWebViewType,
    editFilingPatternWebViewProvider,
  );

  const openEditFilingPatternPromise = papi.commands.registerCommand(
    'platformProjects.openEditFilingPattern',
    async () => {
      const webViewId = await papi.webViews.openWebView(
        editFilingPatternWebViewType,
        { type: 'float', floatSize: { width: 500, height: 500 } },
        { existingId: '?' },
      );
      return webViewId;
    },
    {
      method: {
        summary: 'Open the Edit Filing Pattern dialog to customize book file naming',
        params: [],
        result: {
          name: 'return value',
          summary: 'The ID of the opened edit filing pattern web view',
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
    await languageSettingsWebViewProviderPromise,
    await openLanguageSettingsPromise,
    await chooseEncodingWebViewProviderPromise,
    await openChooseEncodingPromise,
    await editFilingPatternWebViewProviderPromise,
    await openEditFilingPatternPromise,
  );

  logger.debug('platform-projects is activated!');
}

export async function deactivate() {
  logger.debug('platform-projects is deactivating!');
  return true;
}
