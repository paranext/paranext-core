import { useCallback } from 'react';
import papi, { logger } from '@papi/frontend';
import { getErrorMessage } from 'platform-bible-utils';
import type {
  ProjectType,
  ProjectTypeConfiguration,
  CreateProjectRequest,
  CreateProjectResult,
  UpdateProjectRequest,
  UpdateProjectResult,
  ValidationResult,
  LanguageSelection,
} from 'paratext-project-creation';
import { useProjectCreation } from '../context/project-creation-context';

/**
 * Custom hook that provides PAPI command integration for project creation. Handles loading type
 * configurations, validating fields, and creating projects.
 */
export function useProjectCreationCommands() {
  const { state, dispatch, canSubmit } = useProjectCreation();

  // Load type configuration when project type changes
  const loadTypeConfiguration = useCallback(
    async (projectType: ProjectType) => {
      if (projectType === 'NotSelected') {
        dispatch({
          type: 'SET_TYPE_CONFIGURATION',
          configuration: null as unknown as ProjectTypeConfiguration,
        });
        return;
      }

      try {
        dispatch({ type: 'SET_LOADING', isLoading: true });
        const config = await papi.commands.sendCommand(
          'paratextProjectCreation.getTypeConfiguration',
          projectType,
        );
        dispatch({ type: 'SET_PROJECT_TYPE', projectType, configuration: config });
      } catch (error) {
        logger.warn(`Failed to load type configuration: ${getErrorMessage(error)}`);
      } finally {
        dispatch({ type: 'SET_LOADING', isLoading: false });
      }
    },
    [dispatch],
  );

  // Load valid base projects for the current type
  const loadValidBaseProjects = useCallback(
    async (creatingType: ProjectType) => {
      if (creatingType === 'NotSelected') {
        dispatch({ type: 'SET_AVAILABLE_BASE_PROJECTS', projects: [] });
        return;
      }

      try {
        const projects = await papi.commands.sendCommand(
          'paratextProjectCreation.getValidBaseProjects',
          creatingType,
        );
        dispatch({ type: 'SET_AVAILABLE_BASE_PROJECTS', projects });
      } catch (error) {
        logger.warn(`Failed to load valid base projects: ${getErrorMessage(error)}`);
        dispatch({ type: 'SET_AVAILABLE_BASE_PROJECTS', projects: [] });
      }
    },
    [dispatch],
  );

  // Load registration state
  const loadRegistrationState = useCallback(
    async (
      projectGuid: string | undefined,
      baseProjectGuid: string | undefined,
      projectType: ProjectType,
    ) => {
      if (projectType === 'NotSelected') {
        return;
      }

      try {
        const regState = await papi.commands.sendCommand(
          'paratextProjectCreation.getRegistrationState',
          projectGuid,
          baseProjectGuid,
          projectType,
        );
        dispatch({ type: 'SET_REGISTRATION_STATE', state: regState });
      } catch (error) {
        logger.warn(`Failed to load registration state: ${getErrorMessage(error)}`);
      }
    },
    [dispatch],
  );

  // Validate short name
  const validateShortName = useCallback(
    async (shortName: string): Promise<ValidationResult> => {
      try {
        const result = await papi.commands.sendCommand(
          'paratextProjectCreation.validateShortName',
          shortName,
          state.mode === 'new',
          state.mode === 'edit' ? state.shortName : undefined,
        );

        if (!result.isValid && result.errorCode) {
          dispatch({ type: 'SET_VALIDATION_ERROR', field: 'shortName', error: result.errorCode });
        } else {
          dispatch({ type: 'SET_VALIDATION_ERROR', field: 'shortName', error: null });
        }

        return result;
      } catch (error) {
        logger.warn(`Failed to validate short name: ${getErrorMessage(error)}`);
        return { isValid: true };
      }
    },
    [dispatch, state.mode, state.shortName],
  );

  // Generate short name from full name
  const generateShortName = useCallback(async (fullName: string): Promise<string> => {
    if (!fullName.trim()) return '';

    try {
      return await papi.commands.sendCommand('paratextProjectCreation.generateShortName', fullName);
    } catch (error) {
      logger.warn(`Failed to generate short name: ${getErrorMessage(error)}`);
      return '';
    }
  }, []);

  // Generate unique name
  const generateUniqueName = useCallback(
    async (
      baseShortName: string,
      baseLongName: string,
      forceNumbered?: boolean,
    ): Promise<{ shortName: string; longName: string }> => {
      try {
        return await papi.commands.sendCommand(
          'paratextProjectCreation.generateUniqueName',
          baseShortName,
          baseLongName,
          forceNumbered,
        );
      } catch (error) {
        logger.warn(`Failed to generate unique name: ${getErrorMessage(error)}`);
        return { shortName: baseShortName, longName: baseLongName };
      }
    },
    [],
  );

  // Validate language selection
  const validateLanguage = useCallback(
    async (
      languageId: string,
      languageName: string,
      initialLanguageName?: string,
    ): Promise<ValidationResult> => {
      try {
        const result = await papi.commands.sendCommand(
          'paratextProjectCreation.validateLanguage',
          languageId,
          languageName,
          initialLanguageName,
        );

        if (!result.isValid && result.errorCode) {
          dispatch({ type: 'SET_VALIDATION_ERROR', field: 'languageId', error: result.errorCode });
        } else {
          dispatch({ type: 'SET_VALIDATION_ERROR', field: 'languageId', error: null });
        }

        return result;
      } catch (error) {
        logger.warn(`Failed to validate language: ${getErrorMessage(error)}`);
        return { isValid: true };
      }
    },
    [dispatch],
  );

  // Get available languages
  const getAvailableLanguages = useCallback(
    async (searchQuery?: string): Promise<LanguageSelection[]> => {
      try {
        return await papi.commands.sendCommand(
          'paratextProjectCreation.getAvailableLanguages',
          searchQuery,
        );
      } catch (error) {
        logger.warn(`Failed to get available languages: ${getErrorMessage(error)}`);
        return [];
      }
    },
    [],
  );

  // Create project
  const createProject = useCallback(async (): Promise<CreateProjectResult> => {
    if (!canSubmit) {
      return {
        success: false,
        errorCode: 'VALIDATION_FAILED',
        errorMessage: 'Form validation failed',
      };
    }

    dispatch({ type: 'SET_SAVING', isSaving: true });

    try {
      const request: CreateProjectRequest = {
        shortName: state.shortName,
        fullName: state.fullName,
        languageId: state.languageId,
        versification: state.versification,
        projectType: state.projectType,
        baseProjectGuid: state.baseProjectGuid || undefined,
        copyright: state.copyright || undefined,
        normalization: state.normalization,
        usfmVersion: state.usfmVersion,
        editable: state.editable,
        encodingConverter: state.encodingConverter || undefined,
        encoderReverseDirection: state.encoderReverseDirection,
      };

      const result = await papi.commands.sendCommand(
        'paratextProjectCreation.createProject',
        request,
      );

      if (result.success) {
        dispatch({ type: 'SET_MODE', mode: 'edit', projectGuid: result.projectGuid });
      }

      return result;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      logger.error(`Failed to create project: ${errorMessage}`);
      return {
        success: false,
        errorCode: 'CREATION_FAILED',
        errorMessage,
      };
    } finally {
      dispatch({ type: 'SET_SAVING', isSaving: false });
    }
  }, [canSubmit, dispatch, state]);

  // Update existing project
  const updateProject = useCallback(async (): Promise<UpdateProjectResult> => {
    if (!state.projectGuid) {
      return {
        success: false,
        errorCode: 'NO_PROJECT_GUID',
        errorMessage: 'No project GUID available',
      };
    }

    dispatch({ type: 'SET_SAVING', isSaving: true });

    try {
      // Build request with only dirty fields
      const request: UpdateProjectRequest = {
        projectGuid: state.projectGuid,
      };

      // Only include fields that have been modified
      if (state.dirtyFields.has('fullName')) request.fullName = state.fullName;
      if (state.dirtyFields.has('languageId')) request.languageId = state.languageId;
      if (state.dirtyFields.has('versification')) request.versification = state.versification;
      if (state.dirtyFields.has('normalization')) request.normalization = state.normalization;
      if (state.dirtyFields.has('editable')) request.editable = state.editable;
      if (state.dirtyFields.has('usfmVersion')) request.usfmVersion = state.usfmVersion;
      if (state.dirtyFields.has('copyright')) request.copyright = state.copyright;
      if (state.dirtyFields.has('plannedBooks')) request.plannedBooks = state.plannedBooks;
      if (state.dirtyFields.has('encodingConverter'))
        request.encodingConverter = state.encodingConverter || undefined;

      const result = await papi.commands.sendCommand(
        'paratextProjectCreation.updateProject',
        request,
      );

      return result;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      logger.error(`Failed to update project: ${errorMessage}`);
      return {
        success: false,
        errorCode: 'UPDATE_FAILED',
        errorMessage,
      };
    } finally {
      dispatch({ type: 'SET_SAVING', isSaving: false });
    }
  }, [dispatch, state]);

  // Cleanup project on cancel
  const cleanupProject = useCallback(
    async (projectGuid: string, wasRegistered: boolean): Promise<void> => {
      try {
        await papi.commands.sendCommand(
          'paratextProjectCreation.cleanupProject',
          projectGuid,
          wasRegistered,
        );
      } catch (error) {
        logger.warn(`Failed to cleanup project: ${getErrorMessage(error)}`);
      }
    },
    [],
  );

  // Handle project type change
  const handleProjectTypeChange = useCallback(
    async (projectType: ProjectType) => {
      await loadTypeConfiguration(projectType);
      await loadValidBaseProjects(projectType);
      await loadRegistrationState(
        state.projectGuid || undefined,
        state.baseProjectGuid || undefined,
        projectType,
      );
    },
    [
      loadTypeConfiguration,
      loadValidBaseProjects,
      loadRegistrationState,
      state.projectGuid,
      state.baseProjectGuid,
    ],
  );

  // Handle base project change
  const handleBaseProjectChange = useCallback(
    async (baseProjectGuid: string | null) => {
      const baseProject =
        state.availableBaseProjects.find((p) => p.guid === baseProjectGuid) || null;
      dispatch({ type: 'SET_BASE_PROJECT', baseProjectGuid, baseProject });

      if (state.projectType !== 'NotSelected') {
        await loadRegistrationState(
          state.projectGuid || undefined,
          baseProjectGuid || undefined,
          state.projectType,
        );
      }
    },
    [
      dispatch,
      loadRegistrationState,
      state.availableBaseProjects,
      state.projectGuid,
      state.projectType,
    ],
  );

  // Handle name change from dialog
  const handleNameChange = useCallback(
    (result: { fullName: string; shortName: string; copyright: string }) => {
      dispatch({ type: 'SET_FULL_NAME', fullName: result.fullName });
      dispatch({ type: 'SET_SHORT_NAME', shortName: result.shortName });
      dispatch({ type: 'SET_COPYRIGHT', copyright: result.copyright });
      dispatch({ type: 'SHOW_NAME_DIALOG', show: false });
    },
    [dispatch],
  );

  // Handle language change from dialog
  const handleLanguageChange = useCallback(
    (result: { languageId: string; languageName: string }) => {
      dispatch({
        type: 'SET_LANGUAGE',
        languageId: result.languageId,
        languageName: result.languageName,
      });
      dispatch({ type: 'SHOW_LANGUAGE_DIALOG', show: false });
    },
    [dispatch],
  );

  // Handle encoding change from dialog
  const handleEncodingChange = useCallback(
    (encoding: { codePage: number; name: string; displayName: string }) => {
      dispatch({ type: 'SET_SELECTED_ENCODING', encoding });
      dispatch({ type: 'SHOW_ENCODING_DIALOG', show: false });
    },
    [dispatch],
  );

  return {
    // Actions
    loadTypeConfiguration,
    loadValidBaseProjects,
    loadRegistrationState,
    validateShortName,
    generateShortName,
    generateUniqueName,
    validateLanguage,
    getAvailableLanguages,
    createProject,
    updateProject,
    cleanupProject,

    // Event handlers
    handleProjectTypeChange,
    handleBaseProjectChange,
    handleNameChange,
    handleLanguageChange,
    handleEncodingChange,
  };
}
