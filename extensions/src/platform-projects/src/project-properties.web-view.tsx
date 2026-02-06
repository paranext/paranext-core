import { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { formatReplacementString, getErrorMessage } from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import GeneralTab from './components/general-tab.component';
import BooksTab from './components/books-tab.component';
import {
  createInitialState,
  formReducer,
  validateForm,
  buildCreateRequest,
  LOCALIZED_STRINGS,
  TAB_GENERAL,
  TAB_BOOKS,
  TAB_ASSOCIATIONS,
  TAB_NOTES,
  TAB_ADVANCED,
  TAB_ADDITIONS,
  TAB_STUDY_BIBLE,
  NORMALIZATION_OPTIONS,
  LanguageOption,
  ProjectReference,
  EncoderOption,
} from './project-properties.utils';

/** Fallback languages used when PAPI options are not available */
const FALLBACK_LANGUAGES: LanguageOption[] = [
  { id: 'eng', name: 'English', isRightToLeft: false },
  { id: 'fra', name: 'French', isRightToLeft: false },
  { id: 'spa', name: 'Spanish', isRightToLeft: false },
  { id: 'deu', name: 'German', isRightToLeft: false },
  { id: 'arb', name: 'Arabic', isRightToLeft: true },
];

/** Options state loaded from PAPI or fallbacks */
interface ProjectFormOptions {
  languages: LanguageOption[];
  baseProjects: ProjectReference[];
  encoders: EncoderOption[];
  isLoading: boolean;
}

/** Load project options from backend, falling back to defaults if unavailable */
async function loadProjectOptions(): Promise<Omit<ProjectFormOptions, 'isLoading'>> {
  try {
    const response = await papi.commands.sendCommand('platformProjects.getProjectOptions');
    return {
      languages: response.languages ?? FALLBACK_LANGUAGES,
      baseProjects: response.baseProjects ?? [],
      encoders: response.encoders ?? [],
    };
  } catch (error) {
    logger.warn(`Failed to load project options from backend: ${getErrorMessage(error)}`);
    return {
      languages: FALLBACK_LANGUAGES,
      baseProjects: [],
      encoders: [],
    };
  }
}

global.webViewComponent = function ProjectPropertiesWebView({ useWebViewState }: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRINGS, []));
  const [state, dispatch] = useReducer(formReducer, undefined, createInitialState);
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);

  // Options loaded from PAPI backend
  const [options, setOptions] = useState<ProjectFormOptions>({
    languages: FALLBACK_LANGUAGES,
    baseProjects: [],
    encoders: [],
    isLoading: true,
  });

  // Load project options from backend on mount
  useEffect(() => {
    let cancelled = false;
    loadProjectOptions()
      .then((loaded) => {
        if (!cancelled) {
          setOptions({
            ...loaded,
            isLoading: false,
          });
        }
      })
      .catch((error: unknown) => {
        logger.error(`Unexpected error loading project options: ${getErrorMessage(error)}`);
        if (!cancelled) {
          setOptions((prev) => ({ ...prev, isLoading: false }));
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Retrieve mode from web view state (default to 'create')
  const [mode] = useWebViewState<string>('mode', 'create');

  const title =
    mode === 'create'
      ? localizedStrings['%webView_projectProperties_title_create%']
      : localizedStrings['%webView_projectProperties_title_edit%'];

  const handleTabChange = useCallback(
    (tab: string) => {
      dispatch({ type: 'SET_ACTIVE_TAB', tab });
    },
    [dispatch],
  );

  const handleBooksChange = useCallback(
    (books: string[]) => {
      dispatch({ type: 'SET_BOOKS', selectedBooks: books });
    },
    [dispatch],
  );

  const handleSubmit = useCallback(async () => {
    setSubmitError(undefined);

    const result = validateForm(state);
    if (result.tabsWithErrors.length > 0) {
      dispatch({
        type: 'SET_VALIDATION_ERRORS',
        errors: result.errors,
        tabsWithErrors: result.tabsWithErrors,
      });
      // Switch to first tab with errors
      dispatch({ type: 'SET_ACTIVE_TAB', tab: result.tabsWithErrors[0] });
      return;
    }

    dispatch({ type: 'SET_SUBMITTING', isSubmitting: true });

    try {
      const request = buildCreateRequest(state);
      await papi.commands.sendCommand('platformProjects.createProject', request);
      logger.info(`Project created successfully: ${state.shortName}`);
      // Project created successfully - the web view can be closed
      dispatch({ type: 'SET_SUBMITTING', isSubmitting: false });
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      logger.error(`Failed to create project: ${errorMessage}`);
      setSubmitError(errorMessage);
      dispatch({ type: 'SET_SUBMITTING', isSubmitting: false });
    }
  }, [state, dispatch]);

  const handleCancel = useCallback(() => {
    // Close the web view by dispatching a reset (the provider manages web view lifecycle)
    dispatch({ type: 'RESET' });
  }, [dispatch]);

  const handleFileNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'SET_FIELD', field: 'fileNameForm', value: e.target.value });
    },
    [dispatch],
  );

  const handleNormalizationChange = useCallback(
    (value: string) => {
      dispatch({ type: 'SET_FIELD', field: 'normalization', value });
    },
    [dispatch],
  );

  const errorRibbon =
    state.tabsWithErrors.length > 0
      ? formatReplacementString(
          localizedStrings['%webView_projectProperties_error_incompleteTabs%'] ??
            'Incomplete tab(s): {tabNames}',
          { tabNames: state.tabsWithErrors.join(', ') },
        )
      : (submitError ?? undefined);

  const notImplementedTooltip =
    localizedStrings['%webView_projectProperties_tooltip_notImplemented%'] ??
    'This feature is not yet implemented';

  return (
    <div
      className="pr-twp tw-flex tw-flex-col tw-h-full tw-bg-background"
      data-testid="project-properties-form"
    >
      {/* Title */}
      <div className="tw-px-4 tw-pt-4 tw-pb-2">
        <h2 className="tw-text-lg tw-font-semibold tw-text-foreground">{title}</h2>
      </div>

      {/* Error Ribbon */}
      {errorRibbon ? (
        <div
          className="tw-mx-4 tw-mb-2 tw-px-3 tw-py-2 tw-border tw-border-destructive tw-rounded tw-bg-background"
          role="alert"
        >
          <Label className="tw-text-sm tw-text-destructive">{errorRibbon}</Label>
        </div>
      ) : undefined}

      {/* Tab Container */}
      <div className="tw-flex-1 tw-overflow-hidden tw-px-4">
        <Tabs value={state.activeTab} onValueChange={handleTabChange}>
          <TabsList className="tw-w-full tw-justify-start">
            <TabsTrigger value={TAB_GENERAL}>
              {localizedStrings['%webView_projectProperties_tab_general%']}
              {state.tabsWithErrors.includes(TAB_GENERAL) ? (
                <span className="tw-text-destructive tw-ml-1" aria-label="has errors">
                  !
                </span>
              ) : undefined}
            </TabsTrigger>
            <TabsTrigger value={TAB_BOOKS}>
              {localizedStrings['%webView_projectProperties_tab_books%']}
              {state.tabsWithErrors.includes(TAB_BOOKS) ? (
                <span className="tw-text-destructive tw-ml-1" aria-label="has errors">
                  !
                </span>
              ) : undefined}
            </TabsTrigger>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <TabsTrigger value={TAB_ASSOCIATIONS} disabled>
                      {localizedStrings['%webView_projectProperties_tab_associations%']}
                    </TabsTrigger>
                  </span>
                </TooltipTrigger>
                <TooltipContent>{notImplementedTooltip}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <TabsTrigger value={TAB_NOTES} disabled>
                      {localizedStrings['%webView_projectProperties_tab_notes%']}
                    </TabsTrigger>
                  </span>
                </TooltipTrigger>
                <TooltipContent>{notImplementedTooltip}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TabsTrigger value={TAB_ADVANCED}>
              {localizedStrings['%webView_projectProperties_tab_advanced%']}
              {state.tabsWithErrors.includes(TAB_ADVANCED) ? (
                <span className="tw-text-destructive tw-ml-1" aria-label="has errors">
                  !
                </span>
              ) : undefined}
            </TabsTrigger>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <TabsTrigger value={TAB_ADDITIONS} disabled>
                      {localizedStrings['%webView_projectProperties_tab_additions%']}
                    </TabsTrigger>
                  </span>
                </TooltipTrigger>
                <TooltipContent>{notImplementedTooltip}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {state.showStudyBibleTab ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <TabsTrigger value={TAB_STUDY_BIBLE} disabled>
                        {localizedStrings['%webView_projectProperties_tab_studyBible%']}
                      </TabsTrigger>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>{notImplementedTooltip}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : undefined}
          </TabsList>

          <div
            className="tw-overflow-y-auto tw-flex-1"
            style={{ maxHeight: 'calc(100vh - 200px)' }}
          >
            <TabsContent value={TAB_GENERAL}>
              {options.isLoading ? (
                <div className="tw-flex tw-justify-center tw-p-8">
                  <Spinner />
                </div>
              ) : (
                <GeneralTab
                  state={state}
                  dispatch={dispatch}
                  languages={options.languages}
                  baseProjects={options.baseProjects}
                  encoders={options.encoders}
                  localizedStrings={localizedStrings}
                />
              )}
            </TabsContent>

            <TabsContent value={TAB_BOOKS}>
              <BooksTab
                selectedBooks={state.selectedBooks}
                onChange={handleBooksChange}
                error={state.validationErrors.selectedBooks}
                localizedStrings={localizedStrings}
              />
            </TabsContent>

            <TabsContent value={TAB_ADVANCED}>
              <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
                {/* File Name Pattern */}
                <div className="tw-flex tw-flex-col tw-gap-1">
                  <Label htmlFor="fileNameForm">
                    {localizedStrings['%webView_projectProperties_field_fileNamePattern%']}
                    <span className="tw-text-destructive" aria-hidden="true">
                      {' '}
                      *
                    </span>
                  </Label>
                  <Input
                    id="fileNameForm"
                    value={state.fileNameForm}
                    onChange={handleFileNameChange}
                    aria-invalid={!!state.validationErrors.fileNameForm}
                    aria-describedby={
                      state.validationErrors.fileNameForm ? 'fileNameForm-error' : undefined
                    }
                  />
                  {state.validationErrors.fileNameForm ? (
                    <Label
                      id="fileNameForm-error"
                      className="tw-text-sm tw-text-destructive"
                      role="alert"
                    >
                      {state.validationErrors.fileNameForm}
                    </Label>
                  ) : undefined}
                </div>

                {/* Normalization */}
                <div className="tw-flex tw-flex-col tw-gap-1">
                  <Label htmlFor="normalization">
                    {localizedStrings['%webView_projectProperties_field_normalization%']}
                  </Label>
                  <Select value={state.normalization} onValueChange={handleNormalizationChange}>
                    <SelectTrigger id="normalization">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {NORMALIZATION_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Dialog Actions */}
      <div className="tw-flex tw-justify-end tw-gap-2 tw-p-4 tw-border-t tw-border-border">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={state.isSubmitting}
        >
          {localizedStrings['%webView_projectProperties_button_cancel%']}
        </Button>
        <Button type="button" onClick={handleSubmit} disabled={state.isSubmitting}>
          {state.isSubmitting ? (
            <Spinner />
          ) : (
            localizedStrings['%webView_projectProperties_button_ok%']
          )}
        </Button>
      </div>
    </div>
  );
};
