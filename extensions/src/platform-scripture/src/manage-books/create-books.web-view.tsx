/**
 * === NEW IN PT10 === Reason: React component pattern - CreateBooks dialog for creating scripture
 * books Maps to: UI-PKG-004 (CAP-UI-001)
 *
 * Behaviors implemented:
 *
 * - BHV-300: Dialog display with three creation modes (empty, CV, model)
 * - BHV-301: Last selected option saved to user settings
 * - BHV-302: OK button enabled state based on book selection
 * - INV-004: SBA project restrictions (CV disabled, banner shown)
 * - EXT-003: Model book validation on submit
 * - EXT-004: Versification compatibility check on submit
 */
import { WebViewProps } from '@papi/core';
import { useLocalizedStrings } from '@papi/frontend/react';
import { Canon } from '@sillsdev/scripture';
import {
  Alert,
  AlertDescription,
  Button,
  ComboBox,
  Label,
  RadioGroup,
  RadioGroupItem,
  Separator,
} from 'platform-bible-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  type BookCreationMode,
  type CreateBooksInput,
  type CreateBooksOutput,
  type ModelProjectOption,
  CREATE_BOOKS_LOCALIZED_STRINGS,
  getInitialCreationMode,
  getSelectedBooksDisplayText,
  isSBAProject,
} from './create-books.utils';

/** Default input for development/testing */
const DEFAULT_INPUT: CreateBooksInput = {
  projectId: '',
  projectType: 'Standard',
  existingBooks: [],
  modelProjects: [],
};

/**
 * CreateBooks web view component for creating scripture books in a project
 *
 * Features:
 *
 * - Three creation modes: empty, with chapter/verse markers, based on model
 * - Book selection via BookChooser dialog
 * - SBA project restrictions and warning banner
 * - Model project validation and versification compatibility check
 * - User settings persistence for last selected options
 */
global.webViewComponent = function CreateBooksWebView({
  useWebViewState,
}: WebViewProps): JSX.Element {
  // Get localized strings
  const [localizedStrings] = useLocalizedStrings(useMemo(() => CREATE_BOOKS_LOCALIZED_STRINGS, []));

  // Get input from web view state (passed by provider)
  const [inputState] = useWebViewState<CreateBooksInput>('input', DEFAULT_INPUT);
  const {
    projectId,
    projectType,
    existingBooks,
    modelProjects,
    lastSelectedOption,
    lastModelProjectId,
    currentBookNum,
  } = inputState;

  // Derived state
  const showSbaBanner = useMemo(() => isSBAProject(projectType), [projectType]);
  const cvOptionEnabled = useMemo(() => !isSBAProject(projectType), [projectType]);

  // Form state
  const [selectedBooks, setSelectedBooks] = useState<number[]>(() => {
    // Preselect current book if it is not already in the project
    if (currentBookNum && !existingBooks.includes(currentBookNum)) {
      return [currentBookNum];
    }
    return [];
  });

  const [creationMode, setCreationMode] = useState<BookCreationMode>(() =>
    getInitialCreationMode(inputState),
  );

  const [selectedModelId, setSelectedModelId] = useState<string | null>(() => {
    if (lastModelProjectId && creationMode === 'model') {
      // Verify model project still exists
      const modelExists = modelProjects.some((m) => m.id === lastModelProjectId);
      return modelExists ? lastModelProjectId : null;
    }
    return null;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Generate display text for selected books
  const selectedBooksDisplay = useMemo(
    () =>
      getSelectedBooksDisplayText(selectedBooks, (bookNum) =>
        Canon.bookNumberToEnglishName(bookNum),
      ),
    [selectedBooks],
  );

  // Output state for parent to read
  const [, setOutput] = useWebViewState<CreateBooksOutput | undefined>('output', undefined);

  // Settings state for persistence (BHV-301)
  const [, setSettingsOutput] = useWebViewState<{
    lastOption: BookCreationMode;
    lastModelId: string | null;
  } | null>('settingsOutput', null);

  // Selected model project object for ComboBox
  const selectedModel = useMemo(() => {
    if (!selectedModelId) return undefined;
    return modelProjects.find((m) => m.id === selectedModelId);
  }, [selectedModelId, modelProjects]);

  // Handle creation mode change
  const handleCreationModeChange = useCallback((value: string) => {
    const newMode = value as BookCreationMode;
    setCreationMode(newMode);
    setValidationError(null);

    // Clear model selection when switching away from model mode
    if (newMode !== 'model') {
      setSelectedModelId(null);
    }
  }, []);

  // Handle model project selection
  const handleModelChange = useCallback((newValue: ModelProjectOption) => {
    setSelectedModelId(newValue.id);
    setValidationError(null);
  }, []);

  // Handle Choose button - signals parent to open BookChooser
  const [, setBookChooserRequest] = useWebViewState<{
    open: boolean;
    availableBooks: number[];
    selectedBooks: number[];
  } | null>('bookChooserRequest', null);

  const handleChooseBooks = useCallback(() => {
    // Calculate available books: all books minus existing ones
    // For SBA, the available books will already be filtered by the backend
    const allBooks = Array.from({ length: 124 }, (_, i) => i + 1);
    const availableBooks = allBooks.filter((b) => !existingBooks.includes(b));

    setBookChooserRequest({
      open: true,
      availableBooks,
      selectedBooks,
    });
  }, [existingBooks, selectedBooks, setBookChooserRequest]);

  // Listen for BookChooser result
  const [bookChooserResult] = useWebViewState<{
    action: 'submit' | 'cancel';
    selectedBooks?: number[];
  } | null>('bookChooserResult', null);

  useEffect(() => {
    if (bookChooserResult?.action === 'submit' && bookChooserResult.selectedBooks) {
      setSelectedBooks(bookChooserResult.selectedBooks);
    }
  }, [bookChooserResult]);

  // Save settings on any mode/model change (BHV-301)
  useEffect(() => {
    setSettingsOutput({
      lastOption: creationMode,
      lastModelId: selectedModelId,
    });
  }, [creationMode, selectedModelId, setSettingsOutput]);

  // Handle OK (submit)
  const handleOk = useCallback(async () => {
    // VAL-001: Validate model selection when in model mode
    if (creationMode === 'model' && !selectedModelId) {
      setValidationError(
        localizedStrings['%webView_createBooks_validationModelRequired%'] ||
          'Please select a model text',
      );
      return;
    }

    setIsSubmitting(true);
    setValidationError(null);

    try {
      // For model mode, signal parent to run validations (EXT-003, EXT-004)
      // The provider will handle the actual PAPI calls
      setOutput({
        action: 'submit',
        createdBooks: selectedBooks,
        lastCreatedBookNum:
          selectedBooks.length > 0 ? selectedBooks[selectedBooks.length - 1] : undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [creationMode, selectedModelId, selectedBooks, localizedStrings, setOutput]);

  // Handle Cancel
  const handleCancel = useCallback(() => {
    setOutput({
      action: 'cancel',
    });
  }, [setOutput]);

  // Keyboard handler for Escape and Enter
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCancel();
      } else if (event.key === 'Enter' && selectedBooks.length > 0 && !isSubmitting) {
        handleOk();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleCancel, handleOk, selectedBooks.length, isSubmitting]);

  // OK button disabled state (BHV-302)
  const isOkDisabled = selectedBooks.length === 0 || isSubmitting;

  return (
    <div
      className="pr-twp tw-flex tw-flex-col tw-h-full tw-p-4 tw-gap-4"
      data-testid="CreateBooksForm"
    >
      {/* Dialog Title */}
      <h2 className="tw-text-lg tw-font-semibold tw-text-foreground">
        {localizedStrings['%webView_createBooks_title%'] || 'Create Book(s)'}
      </h2>

      {/* SBA Banner (INV-004) */}
      {showSbaBanner && (
        <Alert variant="destructive" role="alert">
          <AlertDescription>
            {localizedStrings['%webView_createBooks_sbaBanner%'] ||
              'You can only add non-canonical books to a Study Bible Additions project.'}
          </AlertDescription>
        </Alert>
      )}

      {/* Book Selection Zone */}
      <div className="tw-flex tw-items-center tw-gap-3">
        <Label htmlFor="books-display" className="tw-font-medium tw-min-w-fit">
          {localizedStrings['%webView_createBooks_booksLabel%'] || 'Books:'}
        </Label>
        <div
          id="books-display"
          className="tw-flex-1 tw-px-3 tw-py-2 tw-border tw-rounded tw-bg-muted tw-text-sm tw-min-h-[2.25rem]"
          aria-label={
            localizedStrings['%webView_createBooks_noBooksSelected%'] || 'No books selected'
          }
          aria-live="polite"
        >
          {selectedBooksDisplay ||
            localizedStrings['%webView_createBooks_noBooksSelected%'] ||
            'No books selected'}
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={handleChooseBooks}
          disabled={isSubmitting}
          aria-label={localizedStrings['%webView_createBooks_chooseButton%'] || 'Choose...'}
        >
          {localizedStrings['%webView_createBooks_chooseButton%'] || 'Choose...'}
        </Button>
      </div>

      <Separator />

      {/* Creation Options Zone (Radio Group) */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <RadioGroup
          value={creationMode}
          onValueChange={handleCreationModeChange}
          aria-label={localizedStrings['%webView_createBooks_title%'] || 'Creation mode'}
        >
          {/* Empty book option */}
          <div className="tw-flex tw-items-center tw-gap-2">
            <RadioGroupItem value="empty" id="option-empty" />
            <Label htmlFor="option-empty" className="tw-cursor-pointer">
              {localizedStrings['%webView_createBooks_optionEmpty%'] || 'Create empty book'}
            </Label>
          </div>

          {/* Chapter/Verse option (disabled for SBA - INV-004) */}
          <div className="tw-flex tw-items-center tw-gap-2">
            <RadioGroupItem value="cv" id="option-cv" disabled={!cvOptionEnabled} />
            <Label
              htmlFor="option-cv"
              className={`tw-cursor-pointer ${!cvOptionEnabled ? 'tw-text-muted-foreground tw-cursor-not-allowed' : ''}`}
            >
              {localizedStrings['%webView_createBooks_optionCV%'] ||
                'Create with all chapter and verse numbers'}
            </Label>
          </div>

          {/* Model-based option */}
          <div className="tw-flex tw-items-center tw-gap-2">
            <RadioGroupItem value="model" id="option-model" />
            <Label htmlFor="option-model" className="tw-cursor-pointer">
              {localizedStrings['%webView_createBooks_optionModel%'] || 'Create based on:'}
            </Label>
            <div className="tw-flex-1 tw-max-w-xs">
              <ComboBox<ModelProjectOption>
                options={modelProjects}
                value={selectedModel}
                onChange={handleModelChange}
                getOptionLabel={(option) => option.name}
                isDisabled={creationMode !== 'model' || isSubmitting}
                buttonPlaceholder={
                  localizedStrings['%webView_createBooks_modelPlaceholder%'] ||
                  'Select model project...'
                }
                ariaLabel={localizedStrings['%webView_createBooks_optionModel%'] || 'Model project'}
              />
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* Validation Error */}
      {validationError && (
        <Alert variant="destructive" role="alert">
          <AlertDescription>{validationError}</AlertDescription>
        </Alert>
      )}

      {/* Help Text */}
      <div className="tw-text-sm tw-text-muted-foreground tw-p-3 tw-bg-muted tw-rounded">
        {localizedStrings['%webView_createBooks_helpText%'] ||
          'Use this dialog to create one or more empty books in the current project. Select the books you want to create and choose a creation mode.'}
      </div>

      <div className="tw-flex-1" />

      <Separator />

      {/* Action Buttons */}
      <div className="tw-flex tw-justify-end tw-gap-2">
        <Button type="button" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
          {localizedStrings['%general_cancel%'] || 'Cancel'}
        </Button>
        <span
          title={
            selectedBooks.length === 0
              ? localizedStrings['%webView_createBooks_noBooksSelected%'] || 'No books selected'
              : undefined
          }
        >
          <Button
            type="button"
            onClick={handleOk}
            disabled={isOkDisabled}
            aria-label={localizedStrings['%general_ok%'] || 'OK'}
          >
            {isSubmitting
              ? localizedStrings['%webView_createBooks_creating%'] || 'Creating...'
              : localizedStrings['%general_ok%'] || 'OK'}
          </Button>
        </span>
      </div>
    </div>
  );
};
