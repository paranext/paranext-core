/**
 * === NEW IN PT10 === Reason: React component pattern - DeleteBooks dialog for deleting scripture
 * books Maps to: UI-PKG-003 (CAP-UI-003)
 *
 * Behaviors implemented:
 *
 * - BHV-100: Delete books from project with confirmation
 * - BHV-101: Confirmation dialog for shared projects
 * - BHV-308: Project dropdown selection (admin projects only)
 * - BHV-309: OK button enabled state based on book selection
 * - EXT-009: Confirmation dialogs (shared/non-shared)
 *
 * @see ui-spec-delete-books.md for full specification
 */
import { WebViewProps } from '@papi/core';
import papi from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import {
  Alert,
  AlertDescription,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'platform-bible-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  type DeleteBooksFormState,
  type DeleteBooksInput,
  type DeleteBooksOutput,
  type DeleteProjectOption,
  DELETE_BOOKS_LOCALIZED_STRINGS,
  formatBooksDisplay,
  formatString,
} from './delete-books.utils';

/** Default input for development/testing */
const DEFAULT_INPUT: DeleteBooksInput = {
  currentProjectId: '',
  adminProjects: [],
  projectType: 'Standard',
};

/** Confirmation dialog state */
interface ConfirmDialogState {
  isOpen: boolean;
  title: string;
  message: string;
  isWarning: boolean;
  showAllBooksInfo: boolean;
  allBooksMessage: string;
}

/**
 * DeleteBooks web view component for deleting scripture books from a project
 *
 * Features:
 *
 * - Project dropdown limited to admin projects
 * - Book selection via BookChooser dialog
 * - SBA project restrictions and warning banner
 * - Confirmation dialog before deletion (shared project warning)
 * - Keyboard navigation support
 */
global.webViewComponent = function DeleteBooksWebView({
  useWebViewState,
}: WebViewProps): JSX.Element {
  // ========================================================================
  // Localization
  // ========================================================================

  const [localizedStrings] = useLocalizedStrings(useMemo(() => DELETE_BOOKS_LOCALIZED_STRINGS, []));

  // ========================================================================
  // Input State
  // ========================================================================

  const [inputState] = useWebViewState<DeleteBooksInput>('input', DEFAULT_INPUT);
  const { adminProjects, currentProjectId } = inputState;

  // ========================================================================
  // Output State
  // ========================================================================

  const [, setOutput] = useWebViewState<DeleteBooksOutput | undefined>('output', undefined);

  // ========================================================================
  // Form State (BHV-308, BHV-309)
  // ========================================================================

  const [formState, setFormState] = useState<DeleteBooksFormState>(() => {
    const initialProject =
      adminProjects.find((p) => p.id === currentProjectId) || adminProjects[0] || null;

    return {
      selectedProjectId: initialProject?.id || null,
      selectedProject: initialProject || null,
      selectedBooks: [],
      selectedBooksDisplay: '',
      showSbaBanner: initialProject?.projectType === 'StudyBibleAdditions',
      isAdminOfSelected: !!initialProject,
      isDirty: false,
      isSubmitting: false,
      validationErrors: [],
    };
  });

  // Confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState>({
    isOpen: false,
    title: '',
    message: '',
    isWarning: false,
    showAllBooksInfo: false,
    allBooksMessage: '',
  });

  // Computed values
  const isOkEnabled = formState.selectedBooks.length > 0 && !formState.isSubmitting;
  const isChooseEnabled = formState.isAdminOfSelected && !formState.isSubmitting;

  // ========================================================================
  // Event Handlers
  // ========================================================================

  /** Handle project selection change (BHV-308) */
  const handleProjectChange = useCallback(
    (projectId: string) => {
      const project = adminProjects.find((p) => p.id === projectId) || null;

      setFormState((prev) => ({
        ...prev,
        selectedProjectId: projectId,
        selectedProject: project,
        selectedBooks: [],
        selectedBooksDisplay: '',
        showSbaBanner: project?.projectType === 'StudyBibleAdditions',
        isAdminOfSelected: !!project,
        isDirty: true,
      }));
    },
    [adminProjects],
  );

  /** Open BookChooserForm to select books */
  const handleChooseBooks = useCallback(async () => {
    if (!formState.selectedProject) return;

    try {
      const result = await papi.commands.sendCommand<{
        action: string;
        selectedBooks?: number[];
      }>('platformScripture.openBookChooser', {
        caption: localizedStrings['%webView_deleteBooks_chooserCaption%'] || 'Books to Delete',
        availableBooks: formState.selectedProject.existingBooks,
        selectedBooks: formState.selectedBooks,
        requireSelectedBook: true,
        helpText:
          localizedStrings['%webView_deleteBooks_chooserHelpText%'] ||
          'Select the books you want to delete from the project.',
      });

      if (result && result.action === 'submit' && result.selectedBooks) {
        const { selectedBooks } = result;
        const selectedBooksDisplay = formatBooksDisplay(selectedBooks);

        // Check if all books are selected
        const allBooksSelected =
          selectedBooks.length === formState.selectedProject.existingBooks.length;

        if (allBooksSelected) {
          const allBooksMessage = formatString(
            localizedStrings['%webView_deleteBooks_allBooksWarning%'] ||
              'All books in {projectName} will be deleted, but the project itself will not be deleted. To delete the project, use File > Delete Project.',
            { projectName: formState.selectedProject.name },
          );

          setConfirmDialog({
            isOpen: true,
            title: localizedStrings['%webView_deleteBooks_confirmTitle%'] || 'Delete Books',
            message: '',
            isWarning: false,
            showAllBooksInfo: true,
            allBooksMessage,
          });
        }

        setFormState((prev) => ({
          ...prev,
          selectedBooks,
          selectedBooksDisplay,
          isDirty: true,
        }));
      }
    } catch (error) {
      console.error('DeleteBooksWebView: Error opening book chooser:', error);
    }
  }, [formState.selectedProject, formState.selectedBooks, localizedStrings]);

  /** Handle OK button click - show confirmation dialog (EXT-009) */
  const handleOkClick = useCallback(async () => {
    if (!formState.selectedProject || formState.selectedBooks.length === 0) return;

    try {
      const confirmResult = await papi.commands.sendCommand<{
        message: string;
        isShared: boolean;
      }>('platformScripture.getDeleteConfirmation', {
        projectId: formState.selectedProject.id,
        bookCount: formState.selectedBooks.length,
      });

      const isShared = confirmResult?.isShared ?? formState.selectedProject.isShared;
      const messageTemplate = isShared
        ? localizedStrings['%webView_deleteBooks_confirmShared%'] ||
          'Project {projectName} is shared with multiple users. If you delete these books, they will be deleted for everyone. Delete {count} books?'
        : localizedStrings['%webView_deleteBooks_confirmNonShared%'] || 'Delete {count} books?';

      const message = formatString(messageTemplate, {
        projectName: formState.selectedProject.name,
        count: formState.selectedBooks.length,
      });

      setConfirmDialog({
        isOpen: true,
        title: localizedStrings['%webView_deleteBooks_confirmTitle%'] || 'Delete Books',
        message,
        isWarning: true,
        showAllBooksInfo: false,
        allBooksMessage: '',
      });
    } catch (error) {
      console.error('DeleteBooksWebView: Error getting confirmation:', error);
      const message = formatString(
        localizedStrings['%webView_deleteBooks_confirmNonShared%'] || 'Delete {count} books?',
        { count: formState.selectedBooks.length },
      );

      setConfirmDialog({
        isOpen: true,
        title: localizedStrings['%webView_deleteBooks_confirmTitle%'] || 'Delete Books',
        message,
        isWarning: true,
        showAllBooksInfo: false,
        allBooksMessage: '',
      });
    }
  }, [formState.selectedProject, formState.selectedBooks, localizedStrings]);

  /** Handle confirmation dialog Yes button - perform deletion (BHV-100) */
  const handleConfirmYes = useCallback(async () => {
    if (!formState.selectedProject) return;

    setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
    setFormState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      const result = await papi.commands.sendCommand<{
        success: boolean;
        deletedCount: number;
      }>('platformScripture.deleteBooks', {
        projectId: formState.selectedProject.id,
        books: formState.selectedBooks,
      });

      setOutput({
        action: 'submit',
        deletedCount: result?.deletedCount ?? formState.selectedBooks.length,
      });
    } catch (error) {
      console.error('DeleteBooksWebView: Error deleting books:', error);
      setFormState((prev) => ({ ...prev, isSubmitting: false }));
    }
  }, [formState.selectedProject, formState.selectedBooks, setOutput]);

  /** Handle confirmation dialog No button */
  const handleConfirmNo = useCallback(() => {
    setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
  }, []);

  /** Handle info dialog OK button */
  const handleInfoOk = useCallback(() => {
    setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
  }, []);

  /** Handle Cancel button */
  const handleCancel = useCallback(() => {
    setOutput({ action: 'cancel' });
  }, [setOutput]);

  /** Keyboard handler for Escape and Enter */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !confirmDialog.isOpen) {
        handleCancel();
      } else if (event.key === 'Enter' && !confirmDialog.isOpen && isOkEnabled) {
        handleOkClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleCancel, handleOkClick, confirmDialog.isOpen, isOkEnabled]);

  // ========================================================================
  // Render
  // ========================================================================

  return (
    <div
      className="pr-twp tw-flex tw-flex-col tw-h-full tw-p-4 tw-gap-4"
      data-testid="DeleteBooksForm"
    >
      {/* Dialog Title */}
      <h2 className="tw-text-lg tw-font-semibold tw-text-foreground">
        {localizedStrings['%webView_deleteBooks_title%'] || 'Delete Books'}
      </h2>

      {/* SBA Warning Banner (conditional) */}
      {formState.showSbaBanner && (
        <Alert variant="default" className="tw-mb-2">
          <AlertDescription>
            {localizedStrings['%webView_deleteBooks_sbaBanner%'] ||
              'You can only delete non-canonical books from Study Bible Additions projects.'}
          </AlertDescription>
        </Alert>
      )}

      {/* Project Selection (BHV-308) */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <Label htmlFor="project-select">
          {localizedStrings['%webView_deleteBooks_projectLabel%'] || 'Project:'}
        </Label>
        <Select
          value={formState.selectedProjectId || undefined}
          onValueChange={handleProjectChange}
          disabled={formState.isSubmitting}
        >
          <SelectTrigger
            id="project-select"
            aria-label={
              localizedStrings['%webView_deleteBooks_projectDropdown_ariaLabel%'] ||
              'Select project to delete books from'
            }
          >
            <SelectValue placeholder="Select a project" />
          </SelectTrigger>
          <SelectContent>
            {adminProjects.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Book Selection */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <Label htmlFor="books-display">
          {localizedStrings['%webView_deleteBooks_booksLabel%'] || 'Books:'}
        </Label>
        <div className="tw-flex tw-gap-2">
          <Input
            id="books-display"
            type="text"
            value={formState.selectedBooksDisplay}
            readOnly
            className="tw-flex-1"
            aria-label={
              localizedStrings['%webView_deleteBooks_booksField_ariaLabel%'] ||
              'Selected books to delete'
            }
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleChooseBooks}
            disabled={!isChooseEnabled}
            aria-label={
              localizedStrings['%webView_deleteBooks_chooseButton_ariaLabel%'] ||
              'Choose books to delete'
            }
          >
            {localizedStrings['%webView_deleteBooks_chooseButton%'] || 'Choose...'}
          </Button>
        </div>
      </div>

      {/* Help Text */}
      <div className="tw-text-sm tw-text-muted-foreground tw-p-3 tw-bg-muted tw-rounded tw-mt-2">
        {localizedStrings['%webView_deleteBooks_helpText%'] ||
          'This action removes books from your project and deletes them from your hard disk.'}
      </div>

      {/* Spacer */}
      <div className="tw-flex-1" />

      {/* Action Buttons */}
      <div className="tw-flex tw-justify-end tw-gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={formState.isSubmitting}
        >
          {localizedStrings['%general_cancel%'] || 'Cancel'}
        </Button>
        <Button type="button" onClick={handleOkClick} disabled={!isOkEnabled}>
          {localizedStrings['%general_ok%'] || 'OK'}
        </Button>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialog.isOpen} onOpenChange={(open) => !open && handleConfirmNo()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{confirmDialog.title}</DialogTitle>
          </DialogHeader>
          <div className="tw-py-4">
            {confirmDialog.showAllBooksInfo ? (
              <p>{confirmDialog.allBooksMessage}</p>
            ) : (
              <p>{confirmDialog.message}</p>
            )}
          </div>
          <DialogFooter>
            {confirmDialog.showAllBooksInfo ? (
              <Button type="button" onClick={handleInfoOk}>
                {localizedStrings['%general_ok%'] || 'OK'}
              </Button>
            ) : (
              <>
                <Button type="button" variant="outline" onClick={handleConfirmYes}>
                  {localizedStrings['%general_yes%'] || 'Yes'}
                </Button>
                <Button type="button" variant="default" onClick={handleConfirmNo} autoFocus>
                  {localizedStrings['%general_no%'] || 'No'}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
