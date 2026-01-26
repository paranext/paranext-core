import { useCallback } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import {
  Button,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Checkbox,
} from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import { useProjectCreation } from '../../context/project-creation-context';

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%projectCreation_associations_lexicalProject%',
  '%projectCreation_associations_choose%',
  '%projectCreation_associations_useGlosses%',
  '%projectCreation_associations_paratextLexicon%',
  '%projectCreation_associations_lexicalProjectOption%',
  '%projectCreation_associations_both%',
  '%projectCreation_associations_biblicalTerms%',
  '%projectCreation_associations_matchStems%',
  '%projectCreation_associations_matchStemsHelp%',
  '%projectCreation_associations_moreHelp%',
];

/**
 * Associations Tab Component (part of CAP-UI-001)
 *
 * Allows users to configure external project associations including:
 *
 * - Associated lexical project (FLEx integration)
 * - Biblical terms list selection
 * - Stem-based rendering matching option
 */
export function AssociationsTab() {
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);
  const { state, dispatch } = useProjectCreation();

  // Handle flex integration change
  const handleFlexIntegrationChange = useCallback(
    (value: string) => {
      dispatch({
        type: 'SET_FLEX_INTEGRATION',
        integration: value as 'ParatextLexicon' | 'LexicalProject' | 'Both',
      });
    },
    [dispatch],
  );

  // Handle match based on stems checkbox
  const handleMatchStemsChange = useCallback(
    (checked: boolean) => {
      dispatch({ type: 'SET_MATCH_BASED_ON_STEMS', match: checked });
    },
    [dispatch],
  );

  // Handle choose lexical project
  const handleChooseLexicalProject = useCallback(() => {
    // This would open a dialog to choose a FLEx project
    // For now, this is a placeholder
  }, []);

  // Handle choose biblical terms
  const handleChooseBiblicalTerms = useCallback(() => {
    // This would open a dialog to choose biblical terms list
    // For now, this is a placeholder
  }, []);

  return (
    <div className="tw-flex tw-flex-col tw-gap-6 tw-p-4">
      {/* Associated Lexical Project */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <Label htmlFor="lexical-project">
          {localizedStrings['%projectCreation_associations_lexicalProject%'] ||
            'Associated lexical project:'}
        </Label>
        <div className="tw-flex tw-items-center tw-gap-4">
          <div className="tw-min-h-[36px] tw-flex-1 tw-rounded-md tw-bg-muted tw-px-3 tw-py-2">
            {state.associatedLexicalProject || '(None)'}
          </div>
          <Button variant="outline" size="sm" onClick={handleChooseLexicalProject}>
            {localizedStrings['%projectCreation_associations_choose%'] || 'Choose'}
          </Button>
        </div>
      </div>

      {/* FLEx Integration Mode */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <Label htmlFor="flex-usage">
          {localizedStrings['%projectCreation_associations_useGlosses%'] ||
            'Use glosses and analyses from:'}
        </Label>
        <Select
          value={state.flexIntegration}
          onValueChange={handleFlexIntegrationChange}
          disabled={!state.associatedLexicalProject}
        >
          <SelectTrigger id="flex-usage" className="tw-w-[300px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ParatextLexicon">
              {localizedStrings['%projectCreation_associations_paratextLexicon%'] ||
                'Paratext Lexicon'}
            </SelectItem>
            <SelectItem value="LexicalProject">
              {localizedStrings['%projectCreation_associations_lexicalProjectOption%'] ||
                'Lexical Project'}
            </SelectItem>
            <SelectItem value="Both">
              {localizedStrings['%projectCreation_associations_both%'] || 'Both'}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Biblical Terms */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <Label htmlFor="biblical-terms">
          {localizedStrings['%projectCreation_associations_biblicalTerms%'] || 'Biblical Terms:'}
        </Label>
        <div className="tw-flex tw-items-center tw-gap-4">
          <div className="tw-min-h-[36px] tw-flex-1 tw-rounded-md tw-bg-muted tw-px-3 tw-py-2">
            {state.biblicalTermsList || 'Major Biblical Terms (Greek and Hebrew)'}
          </div>
          <Button variant="outline" size="sm" onClick={handleChooseBiblicalTerms}>
            {localizedStrings['%projectCreation_associations_choose%'] || 'Choose'}
          </Button>
        </div>
      </div>

      {/* Match Renderings Based on Stems */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <div className="tw-flex tw-items-start tw-gap-3">
          <Checkbox
            id="match-stems"
            checked={state.matchBasedOnStems}
            onCheckedChange={handleMatchStemsChange}
          />
          <div className="tw-flex tw-flex-col tw-gap-1">
            <Label htmlFor="match-stems" className="tw-cursor-pointer">
              {localizedStrings['%projectCreation_associations_matchStems%'] ||
                'Match renderings based on word stems'}
            </Label>
            <p className="tw-text-sm tw-text-muted-foreground">
              {localizedStrings['%projectCreation_associations_matchStemsHelp%'] ||
                '(Requires user to specify morphology for parsing word forms)'}
            </p>
          </div>
        </div>
        <Button variant="link" className="tw-h-auto tw-w-fit tw-p-0">
          {localizedStrings['%projectCreation_associations_moreHelp%'] || 'More help...'}
        </Button>
      </div>
    </div>
  );
}

export default AssociationsTab;
