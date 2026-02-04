import { useLocalizedStrings } from '@papi/frontend/react';
import { Button, ComboBox, Label } from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import { useCallback, useMemo } from 'react';
import type { ProjectOptionsResponse, ProjectPropertiesFormState } from 'platform-projects';

// #region Localized Strings

const ASSOCIATIONS_TAB_LOCALIZED_KEYS: LocalizeKey[] = [
  '%webView_projectProperties_associationsTab_biblicalTerms_label%',
  '%webView_projectProperties_associationsTab_biblicalTerms_placeholder%',
  '%webView_projectProperties_associationsTab_lexicalProject_label%',
  '%webView_projectProperties_associationsTab_lexicalProject_placeholder%',
  '%webView_projectProperties_associationsTab_lexicalProject_none%',
  '%webView_projectProperties_associationsTab_choose%',
];

// #endregion

// #region Types

interface AssociationsTabProps {
  formState: ProjectPropertiesFormState;
  projectOptions: ProjectOptionsResponse;
  onFieldChange: (field: keyof ProjectPropertiesFormState, value: unknown) => void;
  validationErrors: Record<string, string>;
  isDisabled: boolean;
}

/** ComboBox option type for Biblical Terms lists */
type BiblicalTermsEntry = {
  id: string;
  name: string;
  label: string;
};

/** ComboBox option type for lexical projects */
type LexicalProjectEntry = {
  guid: string;
  shortName: string;
  fullName: string;
  label: string;
  secondaryLabel?: string;
};

// #endregion

export function AssociationsTab({
  formState,
  projectOptions,
  onFieldChange,
  validationErrors,
  isDisabled,
}: AssociationsTabProps) {
  const [localizedStrings] = useLocalizedStrings(ASSOCIATIONS_TAB_LOCALIZED_KEYS);

  // Convert Biblical Terms lists to ComboBox entries
  const biblicalTermsOptions: BiblicalTermsEntry[] = useMemo(
    () =>
      projectOptions.biblicalTermsLists.map((list) => ({
        id: list.id,
        name: list.name,
        label: list.name,
      })),
    [projectOptions.biblicalTermsLists],
  );

  // Convert lexical projects to ComboBox entries
  const lexicalProjectOptions: LexicalProjectEntry[] = useMemo(
    () =>
      projectOptions.lexicalProjects.map((proj) => ({
        guid: proj.guid,
        shortName: proj.shortName,
        fullName: proj.fullName,
        label: proj.shortName,
        secondaryLabel: proj.fullName,
      })),
    [projectOptions.lexicalProjects],
  );

  // Get selected options
  const selectedBiblicalTerms = useMemo(
    () => biblicalTermsOptions.find((opt) => opt.id === formState.biblicalTermsListId),
    [biblicalTermsOptions, formState.biblicalTermsListId],
  );

  const selectedLexicalProject = useMemo(
    () => lexicalProjectOptions.find((opt) => opt.guid === formState.associatedLexicalProjectGuid),
    [lexicalProjectOptions, formState.associatedLexicalProjectGuid],
  );

  // Handle Biblical Terms change
  const handleBiblicalTermsChange = useCallback(
    (option: BiblicalTermsEntry) => {
      onFieldChange('biblicalTermsListId', option.id);
    },
    [onFieldChange],
  );

  // Handle Lexical Project change
  const handleLexicalProjectChange = useCallback(
    (option: LexicalProjectEntry) => {
      onFieldChange('associatedLexicalProjectGuid', option.guid);
    },
    [onFieldChange],
  );

  // Handle clear lexical project
  const handleClearLexicalProject = useCallback(() => {
    onFieldChange('associatedLexicalProjectGuid', undefined);
  }, [onFieldChange]);

  return (
    <div className="tw-flex tw-flex-col tw-gap-6 tw-p-4">
      {/* Biblical Terms Section */}
      <div className="tw-flex tw-flex-col tw-gap-4">
        <div className="tw-border-b tw-border-border tw-pb-2">
          <Label className="tw-text-base tw-font-semibold">
            {localizedStrings['%webView_projectProperties_associationsTab_biblicalTerms_label%']}
          </Label>
        </div>

        <div className="tw-flex tw-flex-col tw-gap-1.5">
          <ComboBox<BiblicalTermsEntry>
            options={biblicalTermsOptions}
            value={selectedBiblicalTerms}
            onChange={handleBiblicalTermsChange}
            buttonPlaceholder={
              localizedStrings[
                '%webView_projectProperties_associationsTab_biblicalTerms_placeholder%'
              ]
            }
            isDisabled={isDisabled}
            buttonClassName="tw-max-w-[400px]"
          />
          {validationErrors.biblicalTermsListId && (
            <Label className="tw-text-sm tw-text-destructive" role="alert">
              {validationErrors.biblicalTermsListId}
            </Label>
          )}
        </div>
      </div>

      {/* Lexical Project Section */}
      <div className="tw-flex tw-flex-col tw-gap-4">
        <div className="tw-border-b tw-border-border tw-pb-2">
          <Label className="tw-text-base tw-font-semibold">
            {localizedStrings['%webView_projectProperties_associationsTab_lexicalProject_label%']}
          </Label>
        </div>

        <div className="tw-flex tw-flex-col tw-gap-1.5">
          <div className="tw-flex tw-items-center tw-gap-2">
            <ComboBox<LexicalProjectEntry>
              options={lexicalProjectOptions}
              value={selectedLexicalProject}
              onChange={handleLexicalProjectChange}
              buttonPlaceholder={
                localizedStrings[
                  '%webView_projectProperties_associationsTab_lexicalProject_placeholder%'
                ]
              }
              isDisabled={isDisabled}
              buttonClassName="tw-max-w-[400px]"
            />
            {selectedLexicalProject && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearLexicalProject}
                disabled={isDisabled}
              >
                {
                  localizedStrings[
                    '%webView_projectProperties_associationsTab_lexicalProject_none%'
                  ]
                }
              </Button>
            )}
          </div>
          {validationErrors.associatedLexicalProjectGuid && (
            <Label className="tw-text-sm tw-text-destructive" role="alert">
              {validationErrors.associatedLexicalProjectGuid}
            </Label>
          )}
        </div>
      </div>

      {/* Info text */}
      <div className="tw-mt-4 tw-text-sm tw-text-muted-foreground">
        <p>
          Biblical Terms lists help ensure consistent translation of key theological terms.
          Associating a lexical project allows sharing of glossary and dictionary data.
        </p>
      </div>
    </div>
  );
}

export default AssociationsTab;
