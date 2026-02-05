/**
 * === NEW IN PT10 === Reason: Extension entry point for Platform.Bible. Maps to: UI-PKG-001,
 * UI-PKG-002, UI-PKG-003
 */

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

export async function activate(context: ExecutionActivationContext): Promise<void> {
  logger.info('Platform Projects extension is activating!');

  // Register the Project Properties web view provider
  const projectPropertiesProviderPromise = papi.webViewProviders.register(
    projectPropertiesWebViewType,
    new ProjectPropertiesWebViewProvider(),
  );

  // Register the Project Name web view provider
  const projectNameProviderPromise = papi.webViewProviders.register(
    projectNameWebViewType,
    new ProjectNameWebViewProvider(),
  );

  // Register the Language Settings web view provider
  const languageSettingsProviderPromise = papi.webViewProviders.register(
    languageSettingsWebViewType,
    new LanguageSettingsWebViewProvider(),
  );

  // Register command to open Create Project dialog
  const openCreateProjectCommandPromise = papi.commands.registerCommand(
    'platformProjects.openCreateProject',
    async () => {
      logger.info('Opening Create Project dialog');
      const options: ProjectPropertiesWebViewOptions = {
        mode: 'create',
      };
      return papi.webViews.openWebView(
        projectPropertiesWebViewType,
        {
          type: 'float',
          floatSize: { width: 700, height: 600 },
        },
        options,
      );
    },
  );

  // Register command to open Edit Project dialog
  const openEditProjectCommandPromise = papi.commands.registerCommand(
    'platformProjects.openEditProject',
    async (projectGuid: string) => {
      logger.info(`Opening Edit Project dialog for project: ${projectGuid}`);
      const options: ProjectPropertiesWebViewOptions = {
        mode: 'edit',
        projectGuid,
      };
      return papi.webViews.openWebView(
        projectPropertiesWebViewType,
        {
          type: 'float',
          floatSize: { width: 700, height: 600 },
        },
        options,
      );
    },
  );

  // Register command to open Project Name dialog (standalone or from parent form)
  const openProjectNameCommandPromise = papi.commands.registerCommand(
    'platformProjects.openProjectName',
    async (options?: ProjectNameWebViewOptions) => {
      logger.info('Opening Project Name dialog');
      return papi.webViews.openWebView(
        projectNameWebViewType,
        {
          type: 'float',
          floatSize: { width: 450, height: 400 },
        },
        options || {},
      );
    },
  );

  // Register command to open Language Settings dialog
  const openLanguageSettingsCommandPromise = papi.commands.registerCommand(
    'platformProjects.openLanguageSettings',
    async (options?: LanguageSettingsWebViewOptions) => {
      logger.info('Opening Language Settings dialog');
      return papi.webViews.openWebView(
        languageSettingsWebViewType,
        {
          type: 'float',
          floatSize: { width: 550, height: 500 },
        },
        options || {},
      );
    },
  );

  // Wait for all registrations
  context.registrations.add(
    await projectPropertiesProviderPromise,
    await projectNameProviderPromise,
    await languageSettingsProviderPromise,
    await openCreateProjectCommandPromise,
    await openEditProjectCommandPromise,
    await openProjectNameCommandPromise,
    await openLanguageSettingsCommandPromise,
  );

  logger.info('Platform Projects extension activated successfully');
}

export async function deactivate(): Promise<boolean> {
  logger.info('Platform Projects extension is deactivating!');
  return true;
}
