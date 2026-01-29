import { useCallback, useEffect, useRef, FormEvent, KeyboardEvent } from 'react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Input,
  Label,
  Textarea,
  cn,
} from 'platform-bible-react';
import { AlertTriangle } from 'lucide-react';
import {
  ProjectNameFormInput,
  ProjectNameFormOutput,
  useProjectNameForm,
} from '../hooks/use-project-name-form';

// =============================================================================
// PROPS
// =============================================================================

export interface ProjectNameDialogProps {
  /** Input values and mode settings for the form */
  input: ProjectNameFormInput;

  /** Callback when user submits the form */
  onSubmit: (output: ProjectNameFormOutput) => void;

  /** Callback when user cancels the form */
  onCancel: () => void;
}

// =============================================================================
// HELPERS
// =============================================================================

/** Compute aria-describedby value for short name input Extracted to avoid nested ternary */
function getShortNameAriaDescribedBy(
  hasError: string | undefined,
  isEditMode: boolean,
): string | undefined {
  if (hasError) return 'short-name-error';
  if (isEditMode) return 'short-name-hint';
  return undefined;
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * ProjectNameDialog - Modal dialog for entering/editing project name information
 *
 * Features:
 *
 * - Full Name, Short Name, and Copyright fields
 * - Auto-generates short name from full name (BHV-200)
 * - Stops auto-generation when user types in short name field (BHV-203)
 * - Replaces backslash with forward slash in full name (BHV-202)
 * - Validates short name: 3-8 chars, alphanumeric, no reserved Windows names (BHV-201)
 * - Short name read-only in edit mode
 * - Warning banner for restricted projects
 * - OK button disabled until validation passes
 *
 * @param props - Component props
 */
export function ProjectNameDialog({ input, onSubmit, onCancel }: ProjectNameDialogProps) {
  // eslint-disable-next-line no-null/no-null
  const fullNameInputRef = useRef<HTMLInputElement>(null);

  const {
    // Form values
    fullName,
    shortName,
    copyright,

    // Validation state
    validationErrors,
    isValid,

    // UI state
    isSubmitting,
    isShortNameEditable,
    showWarningBanner,

    // Handlers
    handleFullNameChange,
    handleShortNameChange,
    handleShortNameKeyPress,
    handleCopyrightChange,
    handleSubmit,
    handleCancel,
  } = useProjectNameForm(input);

  // Focus full name input on mount
  useEffect(() => {
    if (!input.isRestricted) {
      fullNameInputRef.current?.focus();
    }
  }, [input.isRestricted]);

  // Handle form submission
  const onFormSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const output = handleSubmit();
      if (output.action === 'submit') {
        onSubmit(output);
      }
    },
    [handleSubmit, onSubmit],
  );

  // Handle cancel action
  const onCancelClick = useCallback(() => {
    handleCancel();
    onCancel();
  }, [handleCancel, onCancel]);

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancelClick();
      }
    },
    [onCancelClick],
  );

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="pr-twp tw-flex tw-flex-col tw-gap-4 tw-p-4" onKeyDown={handleKeyDown}>
      {/* Warning Banner for Restricted Projects */}
      {showWarningBanner && (
        <Alert variant="destructive">
          <AlertTriangle className="tw-h-4 tw-w-4" />
          <AlertTitle>Restricted Project</AlertTitle>
          <AlertDescription>
            This project has registry restrictions. Editing is not allowed.
          </AlertDescription>
        </Alert>
      )}

      {/* Form Fields */}
      <form onSubmit={onFormSubmit} className="tw-flex tw-flex-col tw-gap-4">
        {/* Full Name Field */}
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="project-full-name">
            Full Name <span className="tw-text-destructive">*</span>
          </Label>
          <Input
            ref={fullNameInputRef}
            id="project-full-name"
            value={fullName}
            onChange={(e) => handleFullNameChange(e.target.value)}
            disabled={input.isRestricted}
            aria-required="true"
            aria-invalid={!!validationErrors.fullName}
            aria-describedby={validationErrors.fullName ? 'full-name-error' : undefined}
            placeholder="Enter project full name"
          />
          {validationErrors.fullName && (
            <span
              id="full-name-error"
              className="tw-text-sm tw-text-destructive"
              role="alert"
              aria-live="polite"
            >
              {validationErrors.fullName}
            </span>
          )}
        </div>

        {/* Short Name Field */}
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="project-short-name">
            Short Name <span className="tw-text-destructive">*</span>
          </Label>
          <Input
            id="project-short-name"
            value={shortName}
            onChange={(e) => handleShortNameChange(e.target.value)}
            onKeyDown={handleShortNameKeyPress}
            disabled={input.isRestricted || !isShortNameEditable}
            readOnly={input.mode === 'edit'}
            className={cn(
              'tw-max-w-[200px]',
              input.mode === 'edit' && 'tw-bg-muted tw-cursor-not-allowed',
            )}
            aria-required="true"
            aria-invalid={!!validationErrors.shortName}
            aria-describedby={getShortNameAriaDescribedBy(
              validationErrors.shortName,
              input.mode === 'edit',
            )}
            placeholder="e.g., MYT"
            maxLength={8}
          />
          {validationErrors.shortName && (
            <span
              id="short-name-error"
              className="tw-text-sm tw-text-destructive"
              role="alert"
              aria-live="polite"
            >
              {validationErrors.shortName}
            </span>
          )}
          {input.mode === 'edit' && !validationErrors.shortName && (
            <span id="short-name-hint" className="tw-text-sm tw-text-muted-foreground">
              Short name cannot be changed after project creation
            </span>
          )}
          {input.mode === 'create' && !validationErrors.shortName && (
            <span className="tw-text-sm tw-text-muted-foreground">
              3-8 characters, letters and numbers only
            </span>
          )}
        </div>

        {/* Copyright Field */}
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="project-copyright">Copyright</Label>
          <Textarea
            id="project-copyright"
            value={copyright}
            onChange={(e) => handleCopyrightChange(e.target.value)}
            disabled={input.isRestricted}
            placeholder="Enter copyright information (optional)"
            rows={3}
            className="tw-resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="tw-flex tw-justify-end tw-gap-2 tw-pt-4 tw-border-t tw-border-border">
          <Button type="button" variant="outline" onClick={onCancelClick}>
            Cancel
          </Button>
          <Button type="submit" disabled={!isValid || isSubmitting || input.isRestricted}>
            {isSubmitting ? 'Saving...' : 'OK'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProjectNameDialog;
