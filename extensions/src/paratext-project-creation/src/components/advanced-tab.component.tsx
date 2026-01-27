import {
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
}: AdvancedTabProps) {
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
          disabled={!isNewProject}
        >
          <SelectTrigger id="usfm-version" className="tw-w-48">
            <SelectValue placeholder="Select USFM version" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">USFM 2</SelectItem>
            <SelectItem value="3">USFM 3</SelectItem>
          </SelectContent>
        </Select>
        {!isNewProject && (
          <p className="tw-text-sm tw-text-muted-foreground">
            USFM version cannot be changed for existing projects.
          </p>
        )}
      </div>
    </div>
  );
}

export default AdvancedTab;
