import { MarkdownRenderer } from '@/components/advanced/extension-marketplace/markdown-renderer.component';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { Label } from '@/components/shadcn-ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { Textarea } from '@/components/shadcn-ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/shadcn-ui/toggle-group';
import { IconHelpCircle } from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import { computeTranslationStatus } from './localization-status-utils';
import { usePlanEditorAdmin } from './plan-editor-admin-context';
import { TranslationStatusPill } from './translation-status-pill.component';
import type { ProjectPlanData } from './types';

export interface NameAndDescriptionEditorProps {
  /** The full plan — needed to resolve source-language and staleness watermark. */
  plan: ProjectPlanData;
  /**
   * The item being edited. Either a stage or a task. Identified by `itemId`; the editor reads the
   * names + descriptions maps and emits patches back through `onChange`.
   */
  item: {
    id: string;
    names: Record<string, string>;
    descriptions: Record<string, string>;
    sourceUpdatedAt: number;
  };
  /** Languages available in the editor's language picker. */
  languages: Array<{ id: string; displayName: string }>;
  onChange: (patch: {
    names: Record<string, string>;
    descriptions: Record<string, string>;
    sourceUpdatedAt: number;
  }) => void;
}

const MARKDOWN_HELP = `**Markdown** is a lightweight way to add formatting:

- \`**bold**\` for **bold**
- \`*italics*\` for *italics*
- \`\` \`code\` \`\` for \`inline code\`
- Two newlines for a new paragraph
- \`-\` at the start of a line for a list item

Markdown renders in the **Preview** tab. Links open in a new tab.`;

export function NameAndDescriptionEditor({
  plan,
  item,
  languages,
  onChange,
}: NameAndDescriptionEditorProps) {
  const isAdmin = usePlanEditorAdmin();
  const [currentLanguageId, setCurrentLanguageId] = useState<string>(plan.sourceLanguageId);
  const [descriptionMode, setDescriptionMode] = useState<'edit' | 'preview'>('edit');

  const status = useMemo(
    () =>
      computeTranslationStatus(
        item,
        plan.sourceLanguageId,
        currentLanguageId,
        plan.translationsStaleAfter,
      ),
    [item, plan.sourceLanguageId, currentLanguageId, plan.translationsStaleAfter],
  );

  const sourceName = item.names[plan.sourceLanguageId] ?? '';
  const sourceDescription = item.descriptions[plan.sourceLanguageId] ?? '';
  const currentName = item.names[currentLanguageId] ?? '';
  const currentDescription = item.descriptions[currentLanguageId] ?? '';

  const handleNameChange = (next: string) => {
    const isSource = currentLanguageId === plan.sourceLanguageId;
    onChange({
      names: { ...item.names, [currentLanguageId]: next },
      descriptions: item.descriptions,
      sourceUpdatedAt: isSource ? Date.now() : item.sourceUpdatedAt,
    });
  };
  const handleDescriptionChange = (next: string) => {
    const isSource = currentLanguageId === plan.sourceLanguageId;
    onChange({
      names: item.names,
      descriptions: { ...item.descriptions, [currentLanguageId]: next },
      sourceUpdatedAt: isSource ? Date.now() : item.sourceUpdatedAt,
    });
  };

  const isReadOnly = !isAdmin;
  const isSourceLanguage = currentLanguageId === plan.sourceLanguageId;
  const previewBody =
    currentDescription.trim().length > 0
      ? currentDescription
      : '_Nothing to preview yet — switch to **Edit** and add a description._';

  return (
    <div className="tw:flex tw:flex-col tw:gap-3">
      <div className="tw:flex tw:flex-row tw:items-end tw:gap-3">
        <div className="tw:flex tw:flex-col tw:gap-1 tw:flex-1">
          <Label htmlFor="nad-name">Name</Label>
          <Input
            id="nad-name"
            value={currentName}
            maxLength={60}
            disabled={isReadOnly}
            placeholder={
              isSourceLanguage
                ? 'Enter a name'
                : `Translate "${sourceName}" into the target language`
            }
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </div>
        <div className="tw:flex tw:flex-col tw:gap-1 tw:w-44">
          <Label htmlFor="nad-language">Language</Label>
          <Select value={currentLanguageId} onValueChange={setCurrentLanguageId}>
            <SelectTrigger id="nad-language">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.id} value={language.id}>
                  {language.displayName}
                  {language.id === plan.sourceLanguageId ? ' (source)' : ''}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="tw:flex tw:flex-col tw:gap-1 tw:items-start">
          <Label className="tw:invisible">Status</Label>
          <TranslationStatusPill
            status={status}
            sourcePreview={isSourceLanguage ? undefined : sourceName || undefined}
          />
        </div>
      </div>

      <div className="tw:flex tw:flex-row tw:items-center tw:justify-between">
        <Label>Description</Label>
        <div className="tw:flex tw:flex-row tw:items-center tw:gap-2">
          <ToggleGroup
            type="single"
            value={descriptionMode}
            onValueChange={(next) => {
              if (next === 'edit' || next === 'preview') setDescriptionMode(next);
            }}
            variant="outline"
            size="sm"
            aria-label="Description editor mode"
          >
            <ToggleGroupItem value="edit">Edit</ToggleGroupItem>
            <ToggleGroupItem value="preview">Preview</ToggleGroupItem>
          </ToggleGroup>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Markdown help"
                title="Markdown help"
              >
                <IconHelpCircle />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="tw:w-80">
              <MarkdownRenderer markdown={MARKDOWN_HELP} />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {descriptionMode === 'edit' ? (
        <Textarea
          rows={6}
          value={currentDescription}
          disabled={isReadOnly}
          placeholder={
            isSourceLanguage
              ? 'Describe what this stage or task is for. Markdown is supported.'
              : 'Translate the source description. Markdown is supported.'
          }
          onChange={(e) => handleDescriptionChange(e.target.value)}
        />
      ) : (
        <div className="tw:rounded-lg tw:border tw:border-border tw:bg-card tw:p-3 tw:min-h-32">
          <MarkdownRenderer markdown={previewBody} />
        </div>
      )}

      {!isSourceLanguage && sourceDescription && (
        <details className="tw:rounded-md tw:border tw:border-dashed tw:border-border tw:p-2 tw:text-xs">
          <summary className="tw:cursor-pointer tw:text-muted-foreground">
            Source ({plan.sourceLanguageId})
          </summary>
          <div className="tw:mt-2">
            <MarkdownRenderer markdown={sourceDescription} />
          </div>
        </details>
      )}
    </div>
  );
}
