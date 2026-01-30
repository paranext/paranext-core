/** ProjectPropertiesWebViewProvider - Provider for Project Properties web view */

import papi, { logger } from '@papi/backend';
import type {
  GetWebViewOptions,
  IWebViewProvider,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import { LocalizeKey } from 'platform-bible-utils';
import projectPropertiesWebView from './project-properties.web-view.tsx?inline';
import projectPropertiesStyles from './tailwind.css?inline';
import type {
  ProjectPropertiesInput,
  ProjectPropertiesOptions,
  ProjectUserContext,
  InterlinearContext,
  LanguageOption,
  VersificationOption,
  ProjectTypeOption,
  ProjectOption,
} from './types/project-properties.types';

// =============================================================================
// WEB VIEW OPTIONS
// =============================================================================

export interface ProjectPropertiesWebViewOptions extends GetWebViewOptions {
  /** Mode: create new project or edit existing */
  mode?: 'create' | 'edit';

  /** Project ID for edit mode */
  projectId?: string;

  /** Interlinear context when opened from Interlinearizer */
  interlinearContext?: InterlinearContext;
}

// =============================================================================
// CONSTANTS
// =============================================================================

export const PROJECT_PROPERTIES_WEB_VIEW_TYPE = 'platformScripture.projectProperties';

/** Localization key for the web view title */
export const PROJECT_PROPERTIES_TITLE_KEY: LocalizeKey = '%projectProperties_title%';

// =============================================================================
// DEFAULT OPTIONS (fallback if PAPI calls fail)
// =============================================================================

const DEFAULT_OPTIONS: ProjectPropertiesOptions = {
  languages: [
    { id: 'en:Latn::', code: 'en', displayName: 'English', isRTL: false },
    { id: 'es:Latn::', code: 'es', displayName: 'Spanish', isRTL: false },
    { id: 'fr:Latn::', code: 'fr', displayName: 'French', isRTL: false },
  ],
  versifications: [
    { id: 'English', displayName: 'English', isCustomized: false },
    { id: 'Septuagint', displayName: 'Septuagint', isCustomized: false },
    { id: 'Original', displayName: 'Original', isCustomized: false },
    { id: 'Vulgate', displayName: 'Vulgate', isCustomized: false },
  ],
  projectTypes: [
    { value: 'Standard', label: 'Standard Translation' },
    { value: 'BackTranslation', label: 'Back Translation' },
    { value: 'Daughter', label: 'Daughter Translation' },
    { value: 'Auxiliary', label: 'Auxiliary' },
    { value: 'StudyBibleAdditions', label: 'Study Bible Additions' },
    { value: 'ConsultantNotes', label: 'Consultant Notes' },
    { value: 'TransliterationManual', label: 'Transliteration (Manual)' },
    { value: 'TransliterationWithEncoder', label: 'Transliteration (With Encoder)' },
  ],
  availableBaseProjects: [],
  biblicalTermsLists: [{ id: 'default', displayName: 'Major Biblical Terms (UBS/SIL)' }],
  encodingConverters: [],
  encodings: [
    { id: 'UTF-8', displayName: 'UTF-8 (Unicode)' },
    { id: 'UTF-16', displayName: 'UTF-16 (Unicode)' },
  ],
  normalizations: [
    { id: 'NFC', displayName: 'NFC (Composed)' },
    { id: 'NFD', displayName: 'NFD (Decomposed)' },
    { id: 'None', displayName: 'None' },
  ],
  flexUsageModes: [
    { id: 'import', displayName: 'Import from FLEx' },
    { id: 'export', displayName: 'Export to FLEx' },
    { id: 'bidirectional', displayName: 'Bidirectional Sync' },
  ],
};

const DEFAULT_USER_CONTEXT: ProjectUserContext = {
  isRegistered: false,
  canRegisterProjects: false,
  isOnline: false,
};

// =============================================================================
// DATA FETCHING
// =============================================================================

/** Fetch project options from PAPI Falls back to defaults if the call fails */
async function fetchProjectOptions(): Promise<ProjectPropertiesOptions> {
  try {
    // Command is now properly typed in CommandHandlers
    const data = await papi.commands.sendCommand('platformScripture.getProjectOptions');

    // Map C# response to TypeScript types
    const languages: LanguageOption[] = data.languages.map((lang) => ({
      id: lang.id,
      code: lang.code,
      displayName: lang.displayName,
      script: lang.script,
      isRTL: lang.isRTL,
    }));

    const versifications: VersificationOption[] = data.versifications.map((vers) => ({
      id: vers.id,
      displayName: vers.displayName,
      isCustomized: vers.isCustomized,
    }));

    const projectTypes: ProjectTypeOption[] = data.projectTypes.map((pt) => ({
      value: pt.value,
      label: pt.label,
    }));

    const availableBaseProjects: ProjectOption[] = data.availableBaseProjects.map((proj) => ({
      name: proj.name,
      guid: proj.guid,
      displayName: proj.displayName,
    }));

    return {
      languages: languages.length > 0 ? languages : DEFAULT_OPTIONS.languages,
      versifications: versifications.length > 0 ? versifications : DEFAULT_OPTIONS.versifications,
      projectTypes: projectTypes.length > 0 ? projectTypes : DEFAULT_OPTIONS.projectTypes,
      availableBaseProjects,
      biblicalTermsLists:
        data.biblicalTermsLists.length > 0
          ? data.biblicalTermsLists
          : DEFAULT_OPTIONS.biblicalTermsLists,
      encodingConverters: DEFAULT_OPTIONS.encodingConverters, // Not provided by C# yet
      encodings:
        data.encodings.length > 0
          ? data.encodings.map((e) => ({ id: e.id, displayName: e.displayName }))
          : DEFAULT_OPTIONS.encodings,
      normalizations:
        data.normalizations.length > 0
          ? data.normalizations.map((n) => ({ id: n.id, displayName: n.displayName }))
          : DEFAULT_OPTIONS.normalizations,
      flexUsageModes: DEFAULT_OPTIONS.flexUsageModes, // Not provided by C# yet
    };
  } catch (error) {
    logger.warn(`Failed to fetch project options from PAPI: ${error}. Using defaults.`);
    return DEFAULT_OPTIONS;
  }
}

/** Fetch user context (registration status) from PAPI Falls back to defaults if the call fails */
async function fetchUserContext(): Promise<ProjectUserContext> {
  try {
    // Check if user has valid Paratext registration
    // Use type assertion since this command isn't in CommandHandlers yet
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-type-assertion/no-type-assertion
    const isRegistered = await (papi.commands.sendCommand as any)(
      'paratextRegistration.doesUserHaveValidRegistration',
    );

    return {
      isRegistered: Boolean(isRegistered),
      canRegisterProjects: Boolean(isRegistered), // Registered users can register projects
      isOnline: true, // Assume online if we got this far
    };
  } catch (error) {
    logger.warn(`Failed to fetch user registration status: ${error}. Using defaults.`);
    return DEFAULT_USER_CONTEXT;
  }
}

// =============================================================================
// PROVIDER
// =============================================================================

/**
 * Web view provider for Project Properties dialog
 *
 * This provider creates web views for creating new projects or editing existing project properties.
 * The dialog includes 5-7 tabs depending on project type:
 *
 * - General: Name, language, versification, project type, base project, registration
 * - Books: Book selection
 * - Associations: Lexical project associations
 * - Notes: Comment tag configuration
 * - Advanced: File naming, encoding, sharing options
 * - Additions (SBA only): Study Bible base text configuration
 * - Study Bible (SBA only): Category configuration
 *
 * Entry point: Paratext > New Project or project context menu (EP-001)
 */
export class ProjectPropertiesWebViewProvider implements IWebViewProvider {
  /** The web view type this provider handles */
  readonly webViewType = PROJECT_PROPERTIES_WEB_VIEW_TYPE;

  /** Localization key for the title */
  readonly titleKey = PROJECT_PROPERTIES_TITLE_KEY;

  /** Get the web view definition */
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: ProjectPropertiesWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== this.webViewType) {
      throw new Error(
        `ProjectPropertiesWebViewProvider received request to provide a ${savedWebView.webViewType} web view`,
      );
    }

    // Extract state safely
    const savedState = savedWebView.state ?? {};
    const stateMode =
      typeof savedState === 'object' && 'mode' in savedState
        ? String(savedState.mode ?? 'create')
        : 'create';
    const stateProjectId =
      typeof savedState === 'object' && 'projectId' in savedState
        ? String(savedState.projectId ?? '')
        : '';

    // Get options from request or saved state
    const mode: 'create' | 'edit' =
      getWebViewOptions.mode || (stateMode === 'edit' ? 'edit' : 'create');
    const projectId = getWebViewOptions.projectId || stateProjectId;
    const { interlinearContext } = getWebViewOptions;

    // Fetch real data from PAPI in parallel
    const [options, userContext] = await Promise.all([fetchProjectOptions(), fetchUserContext()]);

    // Build complete input data for the web view
    const inputData: ProjectPropertiesInput = {
      mode,
      interlinearContext,
      options,
      userContext,
      // TODO: Fetch existing project data if mode === 'edit'
    };

    // Get localized title
    let displayTitle: string;
    try {
      const title = await papi.localization.getLocalizedString({
        localizeKey: this.titleKey,
      });
      // Determine default title based on mode
      const defaultTitle = mode === 'create' ? 'New Project' : 'Project Properties';
      displayTitle = title !== this.titleKey ? title : defaultTitle;
    } catch {
      displayTitle = mode === 'create' ? 'New Project' : 'Project Properties';
    }

    // Append project name for edit mode
    if (mode === 'edit' && projectId) {
      displayTitle = `${displayTitle} - ${projectId}`;
    }

    return {
      ...savedWebView,
      title: displayTitle,
      content: projectPropertiesWebView,
      styles: projectPropertiesStyles,
      state: {
        ...savedState,
        mode,
        projectId,
        inputData,
      },
    };
  }
}

// =============================================================================
// FACTORY
// =============================================================================

/** Create and register the Project Properties web view provider */
export async function registerProjectPropertiesWebViewProvider(): Promise<void> {
  const provider = new ProjectPropertiesWebViewProvider();

  await papi.webViewProviders.register(PROJECT_PROPERTIES_WEB_VIEW_TYPE, provider);
}

export default ProjectPropertiesWebViewProvider;
