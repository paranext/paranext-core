/** AssociationsTab - Associated projects tab for Project Properties dialog */

import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  cn,
} from 'platform-bible-react';
import type { FlexUsageOption } from '../../types/project-properties.types';

// =============================================================================
// PROPS
// =============================================================================

export interface AssociationsTabProps {
  /** Associated lexical project name/GUID */
  associatedLexicalProject: string | undefined;

  /** FLEx usage mode */
  flexUsage: string | undefined;

  /** Available FLEx usage options */
  flexUsageOptions: FlexUsageOption[];

  /** Callback when FLEx usage changes */
  onFlexUsageChange: (value: string | undefined) => void;

  /** Callback to open project association dialog */
  onAssociateClick?: () => void;

  /** Optional className */
  className?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * AssociationsTab - Third tab in Project Properties dialog
 *
 * Handles lexical project associations and FLEx integration settings.
 */
export function AssociationsTab({
  associatedLexicalProject,
  flexUsage,
  flexUsageOptions,
  onFlexUsageChange,
  onAssociateClick,
  className,
}: AssociationsTabProps) {
  return (
    <div className={cn('pr-twp tw-flex tw-flex-col tw-gap-4', className)}>
      {/* Associated Lexical Project */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label>Associated Lexical Project</Label>
        <div className="tw-flex tw-items-center tw-gap-2">
          <Input
            value={associatedLexicalProject || ''}
            readOnly
            className="tw-flex-1 tw-bg-muted"
            placeholder="(none)"
          />
          <Button variant="outline" size="sm" onClick={onAssociateClick}>
            Associate...
          </Button>
        </div>
        <p className="tw-text-sm tw-text-muted-foreground">
          Link this project to a lexical database for word-level analysis and concordance features.
        </p>
      </div>

      {/* FLEx Usage */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="flex-usage-select">FLEx Usage</Label>
        <Select
          value={flexUsage || ''}
          onValueChange={(value) => onFlexUsageChange(value || undefined)}
        >
          <SelectTrigger id="flex-usage-select" className="tw-w-full">
            <SelectValue placeholder="Select FLEx usage mode..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">(None)</SelectItem>
            {flexUsageOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.displayName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="tw-text-sm tw-text-muted-foreground">
          Configure how this project integrates with FieldWorks Language Explorer (FLEx).
        </p>
      </div>
    </div>
  );
}

export default AssociationsTab;
