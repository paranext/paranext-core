/**
 * === NEW IN PT10 === Reason: Extension entry point for Platform.Bible. Maps to: UI-PKG-001,
 * UI-PKG-002, UI-PKG-003, UI-PKG-004, UI-PKG-005, UI-PKG-006, UI-PKG-007
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
import {
  ChooseEncodingWebViewProvider,
  ChooseEncodingWebViewOptions,
  chooseEncodingWebViewType,
} from './choose-encoding.web-view-provider';
import {
  EditFilingPatternWebViewProvider,
  EditFilingPatternWebViewOptions,
  editFilingPatternWebViewType,
} from './edit-filing-pattern.web-view-provider';
import {
  CopyBooksWebViewProvider,
  CopyBooksWebViewOptions,
  copyBooksWebViewType,
} from './copy-books.web-view-provider';
import {
  DeleteBooksWebViewProvider,
  DeleteBooksWebViewOptions,
  deleteBooksWebViewType,
} from './delete-books.web-view-provider';

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

  // Register the Choose Encoding web view provider
  const chooseEncodingProviderPromise = papi.webViewProviders.register(
    chooseEncodingWebViewType,
    new ChooseEncodingWebViewProvider(),
  );

  // Register the Edit Filing Pattern web view provider
  const editFilingPatternProviderPromise = papi.webViewProviders.register(
    editFilingPatternWebViewType,
    new EditFilingPatternWebViewProvider(),
  );

  // Register the Copy Books web view provider
  const copyBooksProviderPromise = papi.webViewProviders.register(
    copyBooksWebViewType,
    new CopyBooksWebViewProvider(),
  );

  // Register the Delete Books web view provider
  const deleteBooksProviderPromise = papi.webViewProviders.register(
    deleteBooksWebViewType,
    new DeleteBooksWebViewProvider(),
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

  // Register command to open Choose Encoding dialog
  const openChooseEncodingCommandPromise = papi.commands.registerCommand(
    'platformProjects.openChooseEncoding',
    async (options?: ChooseEncodingWebViewOptions) => {
      logger.info('Opening Choose Encoding dialog');
      return papi.webViews.openWebView(
        chooseEncodingWebViewType,
        {
          type: 'float',
          floatSize: { width: 400, height: 250 },
        },
        options || {},
      );
    },
  );

  // Register command to open Edit Filing Pattern dialog
  const openEditFilingPatternCommandPromise = papi.commands.registerCommand(
    'platformProjects.openEditFilingPattern',
    async (options?: EditFilingPatternWebViewOptions) => {
      logger.info('Opening Edit Filing Pattern dialog');
      return papi.webViews.openWebView(
        editFilingPatternWebViewType,
        {
          type: 'float',
          floatSize: { width: 450, height: 350 },
        },
        options || {},
      );
    },
  );

  // Register command to open Copy Books dialog
  const openCopyBooksCommandPromise = papi.commands.registerCommand(
    'platformProjects.openCopyBooks',
    async (options?: CopyBooksWebViewOptions) => {
      logger.info('Opening Copy Books dialog');
      return papi.webViews.openWebView(
        copyBooksWebViewType,
        {
          type: 'float',
          floatSize: { width: 600, height: 500 },
        },
        options || {},
      );
    },
  );

  // Register command to open Delete Books dialog
  const openDeleteBooksCommandPromise = papi.commands.registerCommand(
    'platformProjects.openDeleteBooks',
    async (options?: DeleteBooksWebViewOptions) => {
      logger.info('Opening Delete Books dialog');
      return papi.webViews.openWebView(
        deleteBooksWebViewType,
        {
          type: 'float',
          floatSize: { width: 500, height: 450 },
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
    await chooseEncodingProviderPromise,
    await editFilingPatternProviderPromise,
    await copyBooksProviderPromise,
    await deleteBooksProviderPromise,
    await openCreateProjectCommandPromise,
    await openEditProjectCommandPromise,
    await openProjectNameCommandPromise,
    await openLanguageSettingsCommandPromise,
    await openChooseEncodingCommandPromise,
    await openEditFilingPatternCommandPromise,
    await openCopyBooksCommandPromise,
    await openDeleteBooksCommandPromise,
  );

  logger.info('Platform Projects extension activated successfully');
}

export async function deactivate(): Promise<boolean> {
  logger.info('Platform Projects extension is deactivating!');
  return true;
}
