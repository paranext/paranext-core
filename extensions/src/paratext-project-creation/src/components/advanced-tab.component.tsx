import { useState } from 'react';
import {
  Alert,
  AlertDescription,
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  cn,
} from 'platform-bible-react';
import type { ProjectNormalization } from 'paratext-project-creation';

// =====================================================
// Props
// =====================================================

export interface AdvancedTabProps {
  normalization: ProjectNormalization;
  onNormalizationChange: (value: ProjectNormalization) => void;
  usfmVersion: number;
  onUsfmVersionChange: (value: number) => void;
  /** In edit mode, normalization and USFM version are read-only */
  isNewProject: boolean;
  // GAP-006: Read-only display fields for edit mode
  /** Current file name pattern (display only) */
  typicalFileName?: string;
  /** Current stylesheet name (display only) */
  stylesheetName?: string;
  /** Current text encoding name (display only) */
  textEncodingName?: string;
}

// =====================================================
// Component
// =====================================================

export function AdvancedTab({
  normalization,
  onNormalizationChange,
  usfmVersion,
  onUsfmVersionChange,
  isNewProject,
  typicalFileName,
  stylesheetName,
  textEncodingName,
}: AdvancedTabProps) {
  // GAP-005: Track whether USFM version was upgraded from 2 to 3 in edit mode
  const [initialUsfmVersion] = useState(usfmVersion);
  const showUsfmUpgradeWarning = !isNewProject && initialUsfmVersion === 2 && usfmVersion === 3;

  return (
    <div className={cn('tw-flex tw-flex-col tw-gap-6')}>
      {/* ---- Normalization ---- */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <Label className="tw-font-medium">Normalization</Label>
        <RadioGroup
          value={normalization}
          onValueChange={(val) => onNormalizationChange(val as ProjectNormalization)}
          disabled={!isNewProject}
          className="tw-flex tw-flex-col tw-gap-1"
        >
          <div className="tw-flex tw-items-center tw-gap-2">
            <RadioGroupItem value="Undefined" id="norm-off" />
            <Label htmlFor="norm-off">Off</Label>
          </div>
          <div className="tw-flex tw-items-center tw-gap-2">
            <RadioGroupItem value="NFC" id="norm-nfc" />
            <Label htmlFor="norm-nfc">Composed characters (NFC)</Label>
          </div>
          <div className="tw-flex tw-items-center tw-gap-2">
            <RadioGroupItem value="NFD" id="norm-nfd" />
            <Label htmlFor="norm-nfd">Decomposed characters (NFD)</Label>
          </div>
        </RadioGroup>
        {!isNewProject && (
          <p className="tw-text-sm tw-text-muted-foreground">
            Normalization cannot be changed for existing projects.
          </p>
        )}
      </div>

      {/* ---- USFM Version ---- */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <Label htmlFor="usfm-version" className="tw-font-medium">
          USFM Version
        </Label>
        <Select
          value={String(usfmVersion)}
          onValueChange={(val) => onUsfmVersionChange(Number(val))}
          disabled={!isNewProject && usfmVersion === 3}
        >
          <SelectTrigger id="usfm-version" className="tw-w-48">
            <SelectValue placeholder="Select USFM version" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">USFM 2</SelectItem>
            <SelectItem value="3">USFM 3</SelectItem>
          </SelectContent>
        </Select>
        {!isNewProject && usfmVersion !== 3 && (
          <p className="tw-text-sm tw-text-muted-foreground">
            USFM version can only be upgraded from 2 to 3.
          </p>
        )}
        {!isNewProject && usfmVersion === 3 && initialUsfmVersion === 3 && (
          <p className="tw-text-sm tw-text-muted-foreground">
            USFM version cannot be changed for existing projects.
          </p>
        )}
        {/* GAP-005: Warning when upgrading USFM 2 to 3 */}
        {showUsfmUpgradeWarning && (
          <Alert variant="destructive" className="tw-mt-1">
            <AlertDescription>
              Upgrading to USFM 3 is a one-way change and may affect compatibility with older
              versions of Paratext. This cannot be undone.
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* ---- GAP-006: Read-only display fields ---- */}
      {!isNewProject && (
        <>
          {typicalFileName && (
            <div className="tw-flex tw-flex-col tw-gap-1">
              <Label className="tw-font-medium">File Name Form</Label>
              <p className="tw-text-sm tw-text-muted-foreground">{typicalFileName}</p>
            </div>
          )}
          {stylesheetName && (
            <div className="tw-flex tw-flex-col tw-gap-1">
              <Label className="tw-font-medium">Stylesheet Name</Label>
              <p className="tw-text-sm tw-text-muted-foreground">{stylesheetName}</p>
            </div>
          )}
          {textEncodingName && (
            <div className="tw-flex tw-flex-col tw-gap-1">
              <Label className="tw-font-medium">Text Encoding</Label>
              <p className="tw-text-sm tw-text-muted-foreground">{textEncodingName}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AdvancedTab;
