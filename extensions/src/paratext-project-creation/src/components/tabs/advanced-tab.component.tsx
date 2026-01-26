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
import type { ProjectNormalization } from 'paratext-project-creation';
import { useProjectCreation } from '../../context/project-creation-context';

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%projectCreation_advanced_fileName%',
  '%projectCreation_advanced_edit%',
  '%projectCreation_advanced_stylesheet%',
  '%projectCreation_advanced_customized%',
  '%projectCreation_advanced_encoding%',
  '%projectCreation_advanced_choose%',
  '%projectCreation_advanced_normalization%',
  '%projectCreation_advanced_nfc%',
  '%projectCreation_advanced_nfd%',
  '%projectCreation_advanced_off%',
  '%projectCreation_advanced_usfmVersion%',
  '%projectCreation_advanced_usfm2%',
  '%projectCreation_advanced_usfm3%',
  '%projectCreation_advanced_editable%',
  '%projectCreation_advanced_allowWhitespace%',
  '%projectCreation_advanced_grantAccess%',
  '%projectCreation_advanced_shareSLDR%',
  '%projectCreation_advanced_whyShare%',
];

/**
 * Advanced Tab Component (part of CAP-UI-001)
 *
 * Allows users to configure advanced project settings including:
 *
 * - File naming pattern
 * - Stylesheet
 * - Text encoding
 * - Unicode normalization form
 * - USFM version
 * - Editability and sharing options
 */
export function AdvancedTab() {
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);
  const { state, dispatch } = useProjectCreation();

  // Handle normalization change
  const handleNormalizationChange = useCallback(
    (value: string) => {
      dispatch({
        type: 'SET_NORMALIZATION',
        normalization: value as ProjectNormalization,
      });
    },
    [dispatch],
  );

  // Handle USFM version change
  const handleUsfmVersionChange = useCallback(
    (value: string) => {
      dispatch({ type: 'SET_USFM_VERSION', version: parseInt(value, 10) as 2 | 3 });
    },
    [dispatch],
  );

  // Handle editable checkbox
  const handleEditableChange = useCallback(
    (checked: boolean) => {
      dispatch({ type: 'SET_EDITABLE', editable: checked });
    },
    [dispatch],
  );

  // Handle allow invisible chars checkbox
  const handleAllowInvisibleChange = useCallback(
    (checked: boolean) => {
      dispatch({ type: 'SET_ALLOW_INVISIBLE_CHARS', allow: checked });
    },
    [dispatch],
  );

  // Handle allow read access checkbox
  const handleAllowReadAccessChange = useCallback(
    (checked: boolean) => {
      dispatch({ type: 'SET_ALLOW_READ_ACCESS', allow: checked });
    },
    [dispatch],
  );

  // Handle share with SLDR checkbox
  const handleShareSLDRChange = useCallback(
    (checked: boolean) => {
      dispatch({ type: 'SET_ALLOW_SHARING_SLDR', allow: checked });
    },
    [dispatch],
  );

  // Handle choose encoding button
  const handleChooseEncoding = useCallback(() => {
    dispatch({ type: 'SHOW_ENCODING_DIALOG', show: true });
  }, [dispatch]);

  // Handle edit file pattern button
  const handleEditFilePattern = useCallback(() => {
    // This would open a dialog to edit the file naming pattern
    // For now, this is a placeholder
  }, []);

  return (
    <div className="tw-flex tw-flex-col tw-gap-6 tw-p-4">
      {/* Typical Book File Name */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <Label htmlFor="file-name">
          {localizedStrings['%projectCreation_advanced_fileName%'] || 'Typical book file name:'}
        </Label>
        <div className="tw-flex tw-items-center tw-gap-4">
          <div className="tw-flex-1 tw-rounded-md tw-bg-muted tw-px-3 tw-py-2 tw-font-mono tw-text-sm">
            {state.typicalFileName}
          </div>
          <Button variant="outline" size="sm" onClick={handleEditFilePattern}>
            {localizedStrings['%projectCreation_advanced_edit%'] || 'Edit'}
          </Button>
        </div>
      </div>

      {/* Stylesheet */}
      <div className="tw-flex tw-items-center tw-gap-4">
        <Label>{localizedStrings['%projectCreation_advanced_stylesheet%'] || 'Stylesheet:'}</Label>
        <span className="tw-text-sm">
          {state.stylesheetName}
          {state.stylesheetName.includes('custom') && (
            <span className="tw-ml-2 tw-text-muted-foreground">
              {localizedStrings['%projectCreation_advanced_customized%'] || '(Customized)'}
            </span>
          )}
        </span>
      </div>

      {/* Text Encoding */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <Label htmlFor="encoding">
          {localizedStrings['%projectCreation_advanced_encoding%'] || 'Text encoding:'}
        </Label>
        <div className="tw-flex tw-items-center tw-gap-4">
          <div className="tw-flex-1 tw-rounded-md tw-bg-muted tw-px-3 tw-py-2">
            {state.selectedEncoding?.displayName || state.encodingName}
          </div>
          <Button variant="outline" size="sm" onClick={handleChooseEncoding}>
            {localizedStrings['%projectCreation_advanced_choose%'] || 'Choose'}
          </Button>
        </div>
      </div>

      {/* Normalization */}
      <div className="tw-flex tw-items-center tw-gap-4">
        <Label htmlFor="normalization">
          {localizedStrings['%projectCreation_advanced_normalization%'] || 'Normalization:'}
        </Label>
        <Select value={state.normalization} onValueChange={handleNormalizationChange}>
          <SelectTrigger id="normalization" className="tw-w-[300px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="NFC">
              {localizedStrings['%projectCreation_advanced_nfc%'] || 'Composed characters (NFC)'}
            </SelectItem>
            <SelectItem value="NFD">
              {localizedStrings['%projectCreation_advanced_nfd%'] || 'Decomposed characters (NFD)'}
            </SelectItem>
            <SelectItem value="Undefined">
              {localizedStrings['%projectCreation_advanced_off%'] || 'Off'}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* USFM Version */}
      <div className="tw-flex tw-items-center tw-gap-4">
        <Label htmlFor="usfm-version">
          {localizedStrings['%projectCreation_advanced_usfmVersion%'] || 'USFM version:'}
        </Label>
        <Select value={state.usfmVersion.toString()} onValueChange={handleUsfmVersionChange}>
          <SelectTrigger id="usfm-version" className="tw-w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">
              {localizedStrings['%projectCreation_advanced_usfm2%'] || 'USFM 2'}
            </SelectItem>
            <SelectItem value="3">
              {localizedStrings['%projectCreation_advanced_usfm3%'] || 'USFM 3'}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Checkboxes Section */}
      <div className="tw-flex tw-flex-col tw-gap-3">
        {/* Make project editable */}
        <div className="tw-flex tw-items-center tw-gap-3">
          <Checkbox id="editable" checked={state.editable} onCheckedChange={handleEditableChange} />
          <Label htmlFor="editable" className="tw-cursor-pointer">
            {localizedStrings['%projectCreation_advanced_editable%'] || 'Make project editable'}
          </Label>
        </div>

        {/* Allow whitespace and invisible characters */}
        <div className="tw-flex tw-items-center tw-gap-3">
          <Checkbox
            id="allow-invisible"
            checked={state.allowInvisibleChars}
            onCheckedChange={handleAllowInvisibleChange}
          />
          <Label htmlFor="allow-invisible" className="tw-cursor-pointer">
            {localizedStrings['%projectCreation_advanced_allowWhitespace%'] ||
              'Allow whitespace and invisible characters'}
          </Label>
        </div>

        {/* Grant access to non-publishable resources */}
        <div className="tw-flex tw-items-center tw-gap-3">
          <Checkbox
            id="grant-access"
            checked={state.allowReadAccess}
            onCheckedChange={handleAllowReadAccessChange}
          />
          <Label htmlFor="grant-access" className="tw-cursor-pointer">
            {localizedStrings['%projectCreation_advanced_grantAccess%'] ||
              'Grant access to non-publishable resources'}
          </Label>
        </div>

        {/* Contribute to SIL SLDR */}
        <div className="tw-flex tw-items-center tw-gap-3">
          <Checkbox
            id="share-sldr"
            checked={state.allowSharingWithSLDR}
            onCheckedChange={handleShareSLDRChange}
          />
          <Label htmlFor="share-sldr" className="tw-cursor-pointer">
            {localizedStrings['%projectCreation_advanced_shareSLDR%'] ||
              'Contribute to SIL Locale Data Repository'}
          </Label>
          <Button variant="link" className="tw-h-auto tw-p-0">
            {localizedStrings['%projectCreation_advanced_whyShare%'] || 'Why share?'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AdvancedTab;
