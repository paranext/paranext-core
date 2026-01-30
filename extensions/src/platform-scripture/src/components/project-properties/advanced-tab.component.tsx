/** AdvancedTab - Advanced settings tab for Project Properties dialog */

import {
  Button,
  Checkbox,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  cn,
} from 'platform-bible-react';
import { HelpCircle } from 'lucide-react';
import type { NormalizationOption, EncodingOption } from '../../types/project-properties.types';

// =============================================================================
// PROPS
// =============================================================================

export interface AdvancedTabProps {
  // File naming
  fileNamePattern: string;
  typicalFileName?: string;

  // USFM
  usfmVersion: string;
  stylesheetName?: string;
  isStylesheetCustomized?: boolean;

  // Encoding
  textEncoding?: string;
  normalization: string;
  silEncoding: string | undefined;

  // Options
  editable: boolean;
  allowWhitespaceAndInvisible: boolean;
  sharingPermission: boolean;
  shareWithSldr: boolean;
  allowDerivedProjectRegistration: boolean;

  // Available options
  normalizationOptions: NormalizationOption[];
  encodingOptions: EncodingOption[];

  // Callbacks
  onUsfmVersionChange: (value: string) => void;
  onNormalizationChange: (value: string) => void;
  onSilEncodingChange: (value: string | undefined) => void;
  onEditableChange: (value: boolean) => void;
  onAllowWhitespaceChange: (value: boolean) => void;
  onSharingPermissionChange: (value: boolean) => void;
  onShareWithSldrChange: (value: boolean) => void;
  onAllowDerivedRegistrationChange: (value: boolean) => void;

  // Actions
  onEditFilingPattern?: () => void;
  onChooseEncoding?: () => void;
  onWhyShareClick?: () => void;

  /** Optional className */
  className?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * AdvancedTab - Fifth tab in Project Properties dialog
 *
 * Configures file naming, encoding, USFM version, and sharing options.
 */
export function AdvancedTab({
  fileNamePattern,
  typicalFileName,
  usfmVersion,
  stylesheetName,
  isStylesheetCustomized,
  textEncoding = 'UTF-8',
  normalization,
  silEncoding,
  editable,
  allowWhitespaceAndInvisible,
  sharingPermission,
  shareWithSldr,
  allowDerivedProjectRegistration,
  normalizationOptions,
  encodingOptions,
  onUsfmVersionChange,
  onNormalizationChange,
  onSilEncodingChange,
  onEditableChange,
  onAllowWhitespaceChange,
  onSharingPermissionChange,
  onShareWithSldrChange,
  onAllowDerivedRegistrationChange,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Button disabled until feature is implemented
  onEditFilingPattern: _onEditFilingPattern,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Button disabled until feature is implemented
  onChooseEncoding: _onChooseEncoding,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Button disabled until feature is implemented
  onWhyShareClick: _onWhyShareClick,
  className,
}: AdvancedTabProps) {
  return (
    <div className={cn('pr-twp tw-flex tw-flex-col tw-gap-4', className)}>
      {/* File Naming Section */}
      <div className="tw-flex tw-flex-col tw-gap-2">
        <Label className="tw-font-medium">File Naming</Label>

        <div className="tw-flex tw-items-center tw-gap-2">
          <Input
            value={fileNamePattern}
            readOnly
            className="tw-flex-1 tw-bg-muted"
            placeholder="(default)"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <Button variant="outline" size="sm" disabled>
                    Edit...
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent>File naming pattern editing is not yet available</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {typicalFileName && (
          <div className="tw-text-sm tw-text-muted-foreground">
            Typical filename:{' '}
            <code className="tw-bg-muted tw-px-1 tw-rounded">{typicalFileName}</code>
          </div>
        )}
      </div>

      {/* USFM Version */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="usfm-version-select">USFM Version</Label>
        <Select value={usfmVersion} onValueChange={onUsfmVersionChange}>
          <SelectTrigger id="usfm-version-select" className="tw-w-[200px]">
            <SelectValue placeholder="Select version..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">USFM 2.x</SelectItem>
            <SelectItem value="3">USFM 3.0</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stylesheet */}
      {stylesheetName && (
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label>Stylesheet</Label>
          <div className="tw-text-sm tw-text-foreground">
            {stylesheetName}
            {isStylesheetCustomized && (
              <span className="tw-text-muted-foreground tw-ml-1">(customized)</span>
            )}
          </div>
        </div>
      )}

      {/* Encoding Section */}
      <div className="tw-flex tw-flex-col tw-gap-2 tw-border-t tw-border-border tw-pt-4">
        <Label className="tw-font-medium">Encoding</Label>

        <div className="tw-grid tw-grid-cols-2 tw-gap-4">
          <div className="tw-flex tw-flex-col tw-gap-1">
            <Label className="tw-text-sm tw-text-muted-foreground">Text Encoding</Label>
            <div className="tw-flex tw-items-center tw-gap-2">
              <Input value={textEncoding} readOnly className="tw-flex-1 tw-bg-muted" />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <Button variant="outline" size="sm" disabled>
                        Choose...
                      </Button>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>Encoding selection is not yet available</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="tw-flex tw-flex-col tw-gap-1">
            <Label htmlFor="normalization-select">Normalization</Label>
            <Select value={normalization} onValueChange={onNormalizationChange}>
              <SelectTrigger id="normalization-select">
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent>
                {normalizationOptions.map((opt) => (
                  <SelectItem key={opt.id} value={opt.id}>
                    {opt.displayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="sil-encoding-select">SIL Encoding</Label>
          <Select
            value={silEncoding || '__none__'}
            onValueChange={(value) => onSilEncodingChange(value === '__none__' ? undefined : value)}
          >
            <SelectTrigger id="sil-encoding-select" className="tw-w-[300px]">
              <SelectValue placeholder="(none)" />
            </SelectTrigger>
            <SelectContent>
              {/* Use special value instead of empty string - empty strings crash Select */}
              <SelectItem value="__none__">(none)</SelectItem>
              {encodingOptions.map((opt) => (
                <SelectItem key={opt.id} value={opt.id}>
                  {opt.displayName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Options Section */}
      <div className="tw-flex tw-flex-col tw-gap-2 tw-border-t tw-border-border tw-pt-4">
        <Label className="tw-font-medium">Options</Label>

        <div className="tw-flex tw-items-center tw-gap-2">
          <Checkbox
            id="editable-check"
            checked={editable}
            onCheckedChange={(checked) => onEditableChange(checked === true)}
          />
          <Label htmlFor="editable-check" className="tw-font-normal tw-cursor-pointer">
            Editable
          </Label>
        </div>

        <div className="tw-flex tw-items-center tw-gap-2">
          <Checkbox
            id="whitespace-check"
            checked={allowWhitespaceAndInvisible}
            onCheckedChange={(checked) => onAllowWhitespaceChange(checked === true)}
          />
          <Label htmlFor="whitespace-check" className="tw-font-normal tw-cursor-pointer">
            Allow whitespace and invisible characters
          </Label>
        </div>
      </div>

      {/* Sharing Section */}
      <div className="tw-flex tw-flex-col tw-gap-2 tw-border-t tw-border-border tw-pt-4">
        <div className="tw-flex tw-items-center tw-gap-2">
          <Label className="tw-font-medium">Sharing</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span>
                  <Button
                    variant="link"
                    size="sm"
                    disabled
                    className="tw-h-auto tw-p-0 tw-text-muted-foreground"
                  >
                    <HelpCircle className="tw-h-3 tw-w-3 tw-mr-1" />
                    Why?
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent>Sharing information is not yet available</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="tw-flex tw-items-center tw-gap-2">
          <Checkbox
            id="sharing-permission-check"
            checked={sharingPermission}
            onCheckedChange={(checked) => onSharingPermissionChange(checked === true)}
          />
          <Label htmlFor="sharing-permission-check" className="tw-font-normal tw-cursor-pointer">
            Grant sharing permission
          </Label>
        </div>

        <div className="tw-flex tw-items-center tw-gap-2">
          <Checkbox
            id="sldr-check"
            checked={shareWithSldr}
            onCheckedChange={(checked) => onShareWithSldrChange(checked === true)}
          />
          <Label htmlFor="sldr-check" className="tw-font-normal tw-cursor-pointer">
            Share with SLDR
          </Label>
        </div>

        <div className="tw-flex tw-items-center tw-gap-2">
          <Checkbox
            id="derived-registration-check"
            checked={allowDerivedProjectRegistration}
            onCheckedChange={(checked) => onAllowDerivedRegistrationChange(checked === true)}
          />
          <Label htmlFor="derived-registration-check" className="tw-font-normal tw-cursor-pointer">
            Allow derived project registration
          </Label>
        </div>
      </div>
    </div>
  );
}

export default AdvancedTab;
