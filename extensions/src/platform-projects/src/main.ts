import type {
  ProjectPropertiesWebViewOptions,
  ProjectNameWebViewOptions,
  LanguageSettingsWebViewOptions,
  ChooseEncodingWebViewOptions,
  EditFilingPatternWebViewOptions,
  CopyBooksWebViewOptions,
  DeleteBooksWebViewOptions,
} from 'platform-projects';
import papi, { logger } from '@papi/backend';
import { ExecutionActivationContext, OpenWebViewOptions } from '@papi/core';
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
import { CopyBooksWebViewProvider, copyBooksWebViewType } from './copy-books.web-view-provider';
import {
  DeleteBooksWebViewProvider,
  deleteBooksWebViewType,
} from './delete-books.web-view-provider';

// #region Internal options interfaces extending OpenWebViewOptions for openWebView calls
// These interfaces allow passing custom options to openWebView without type assertions

interface ProjectPropertiesOpenOptions
  extends OpenWebViewOptions,
    Partial<ProjectPropertiesWebViewOptions> {}

interface ProjectNameOpenOptions extends OpenWebViewOptions, Partial<ProjectNameWebViewOptions> {}

interface LanguageSettingsOpenOptions
  extends OpenWebViewOptions,
    Partial<LanguageSettingsWebViewOptions> {}

interface ChooseEncodingOpenOptions
  extends OpenWebViewOptions,
    Partial<ChooseEncodingWebViewOptions> {}

interface EditFilingPatternOpenOptions
  extends OpenWebViewOptions,
    Partial<EditFilingPatternWebViewOptions> {}

interface CopyBooksOpenOptions extends OpenWebViewOptions, Partial<CopyBooksWebViewOptions> {}

interface DeleteBooksOpenOptions extends OpenWebViewOptions, Partial<DeleteBooksWebViewOptions> {}

// #endregion

/**
 * Opens the Create Project dialog
 *
 * @returns The web view ID of the opened dialog, or undefined if failed
 */
async function openCreateProject(): Promise<string | undefined> {
  logger.debug('Opening Create Project dialog');

  const options: ProjectPropertiesOpenOptions = {
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

  const options: ProjectPropertiesOpenOptions = {
    mode: 'edit',
    projectGuid,
  };

  return papi.webViews.openWebView(
    projectPropertiesWebViewType,
    { type: 'float', floatSize: { width: 700, height: 600 } },
    options,
  );
}

/**
 * Opens the Project Name dialog for editing project identification fields
 *
 * @param options - Configuration for the dialog including initial values
 * @returns The web view ID of the opened dialog, or undefined if failed
 */
async function openProjectNameDialog(
  options?: ProjectNameWebViewOptions,
): Promise<string | undefined> {
  logger.debug('Opening Project Name dialog');

  const openOptions: ProjectNameOpenOptions = options ?? {};

  return papi.webViews.openWebView(
    projectNameWebViewType,
    { type: 'float', floatSize: { width: 450, height: 400 } },
    openOptions,
  );
}

/**
 * Opens the Language Settings dialog for a project
 *
 * @param options - Configuration including project GUID and permissions
 * @returns The web view ID of the opened dialog, or undefined if failed
 */
async function openLanguageSettings(
  options: LanguageSettingsWebViewOptions,
): Promise<string | undefined> {
  logger.debug(`Opening Language Settings dialog for project: ${options.projectGuid}`);

  const openOptions: LanguageSettingsOpenOptions = options;

  return papi.webViews.openWebView(
    languageSettingsWebViewType,
    { type: 'float', floatSize: { width: 600, height: 550 } },
    openOptions,
  );
}

/**
 * Opens the Choose Encoding dialog for selecting an encoding converter Maps to: UI-PKG-004,
 * SCR-004, BHV-109
 *
 * @param options - Configuration including available encoders
 * @returns The web view ID of the opened dialog, or undefined if failed
 */
async function openChooseEncoding(
  options: ChooseEncodingWebViewOptions,
): Promise<string | undefined> {
  logger.debug('Opening Choose Encoding dialog');

  const openOptions: ChooseEncodingOpenOptions = options;

  return papi.webViews.openWebView(
    chooseEncodingWebViewType,
    { type: 'float', floatSize: { width: 400, height: 250 } },
    openOptions,
  );
}

/**
 * Opens the Edit Filing Pattern dialog for customizing book file naming Maps to: UI-PKG-005,
 * SCR-005, BHV-514, VAL-006
 *
 * @param options - Configuration including initial pattern and preview context
 * @returns The web view ID of the opened dialog, or undefined if failed
 */
async function openEditFilingPattern(
  options: EditFilingPatternWebViewOptions,
): Promise<string | undefined> {
  logger.debug('Opening Edit Filing Pattern dialog');

  const openOptions: EditFilingPatternOpenOptions = options;

  return papi.webViews.openWebView(
    editFilingPatternWebViewType,
    { type: 'float', floatSize: { width: 450, height: 380 } },
    openOptions,
  );
}

/**
 * Opens the Copy Books dialog for copying books between projects Maps to: UI-PKG-006, SCR-006,
 * BHV-166, BHV-167, BHV-168, BHV-606, EXT-008
 *
 * @param options - Configuration including optional pre-selected projects
 * @returns The web view ID of the opened dialog, or undefined if failed
 */
async function openCopyBooks(options?: CopyBooksWebViewOptions): Promise<string | undefined> {
  logger.debug('Opening Copy Books dialog');

  const openOptions: CopyBooksOpenOptions = options ?? {};

  return papi.webViews.openWebView(
    copyBooksWebViewType,
    { type: 'float', floatSize: { width: 650, height: 550 } },
    openOptions,
  );
}

/**
 * Opens the Delete Books dialog for deleting books from a project Maps to: UI-PKG-007, SCR-007
 *
 * @param options - Configuration including project GUID and name
 * @returns The web view ID of the opened dialog, or undefined if failed
 */
async function openDeleteBooks(options: DeleteBooksWebViewOptions): Promise<string | undefined> {
  logger.debug(`Opening Delete Books dialog for project: ${options.projectGuid}`);

  const openOptions: DeleteBooksOpenOptions = options;

  return papi.webViews.openWebView(
    deleteBooksWebViewType,
    { type: 'float', floatSize: { width: 550, height: 500 } },
    openOptions,
  );
}

export async function activate(context: ExecutionActivationContext) {
  logger.debug('platform-projects extension is activating!');

  // Create the web view provider instances
  const projectPropertiesWebViewProvider = new ProjectPropertiesWebViewProvider();
  const projectNameWebViewProvider = new ProjectNameWebViewProvider();
  const languageSettingsWebViewProvider = new LanguageSettingsWebViewProvider();
  const chooseEncodingWebViewProvider = new ChooseEncodingWebViewProvider();
  const editFilingPatternWebViewProvider = new EditFilingPatternWebViewProvider();
  const copyBooksWebViewProvider = new CopyBooksWebViewProvider();
  const deleteBooksWebViewProvider = new DeleteBooksWebViewProvider();

  // Register the web view providers
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

  const editFilingPatternProviderPromise = papi.webViewProviders.registerWebViewProvider(
    editFilingPatternWebViewType,
    editFilingPatternWebViewProvider,
  );

  const copyBooksProviderPromise = papi.webViewProviders.registerWebViewProvider(
    copyBooksWebViewType,
    copyBooksWebViewProvider,
  );

  const deleteBooksProviderPromise = papi.webViewProviders.registerWebViewProvider(
    deleteBooksWebViewType,
    deleteBooksWebViewProvider,
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

  // Register the openProjectNameDialog command
  const openProjectNameDialogCommandPromise = papi.commands.registerCommand(
    'platformProjects.openProjectNameDialog',
    openProjectNameDialog,
    {
      method: {
        summary: 'Open the Project Name dialog for editing project identification fields',
        params: [
          {
            name: 'options',
            required: false,
            summary: 'Configuration including initial values and edit permissions',
            schema: { type: 'object' },
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

  // Register the openLanguageSettings command
  const openLanguageSettingsCommandPromise = papi.commands.registerCommand(
    'platformProjects.openLanguageSettings',
    openLanguageSettings,
    {
      method: {
        summary: 'Open the Language Settings dialog for a project',
        params: [
          {
            name: 'options',
            required: true,
            summary: 'Configuration including project GUID and permissions',
            schema: { type: 'object' },
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

  // Register the openChooseEncoding command
  const openChooseEncodingCommandPromise = papi.commands.registerCommand(
    'platformProjects.openChooseEncoding',
    openChooseEncoding,
    {
      method: {
        summary: 'Open the Choose Encoding dialog for selecting an encoding converter',
        params: [
          {
            name: 'options',
            required: true,
            summary: 'Configuration including available encoders',
            schema: { type: 'object' },
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

  // Register the openEditFilingPattern command
  const openEditFilingPatternCommandPromise = papi.commands.registerCommand(
    'platformProjects.openEditFilingPattern',
    openEditFilingPattern,
    {
      method: {
        summary: 'Open the Edit Filing Pattern dialog for customizing book file naming',
        params: [
          {
            name: 'options',
            required: true,
            summary: 'Configuration including initial pattern and preview context',
            schema: { type: 'object' },
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

  // Register the openCopyBooks command
  const openCopyBooksCommandPromise = papi.commands.registerCommand(
    'platformProjects.openCopyBooks',
    openCopyBooks,
    {
      method: {
        summary: 'Open the Copy Books dialog for copying books between projects',
        params: [
          {
            name: 'options',
            required: false,
            summary: 'Configuration including optional pre-selected projects',
            schema: { type: 'object' },
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

  // Register the openDeleteBooks command
  const openDeleteBooksCommandPromise = papi.commands.registerCommand(
    'platformProjects.openDeleteBooks',
    openDeleteBooks,
    {
      method: {
        summary: 'Open the Delete Books dialog for deleting books from a project',
        params: [
          {
            name: 'options',
            required: true,
            summary: 'Configuration including project GUID and name',
            schema: { type: 'object' },
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
    await projectNameProviderPromise,
    await languageSettingsProviderPromise,
    await chooseEncodingProviderPromise,
    await editFilingPatternProviderPromise,
    await copyBooksProviderPromise,
    await openCreateProjectCommandPromise,
    await openEditProjectCommandPromise,
    await openProjectNameDialogCommandPromise,
    await openLanguageSettingsCommandPromise,
    await openChooseEncodingCommandPromise,
    await openEditFilingPatternCommandPromise,
    await openCopyBooksCommandPromise,
    await deleteBooksProviderPromise,
    await openDeleteBooksCommandPromise,
  );

  logger.debug('platform-projects extension is finished activating!');
}

export async function deactivate() {
  logger.debug('platform-projects extension is deactivating!');
  return true;
}
