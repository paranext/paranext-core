import { useEffect, useState, type ReactNode } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn-ui/dialog';
import { Input } from '@/components/shadcn-ui/input';
import { Label } from '@/components/shadcn-ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import { Textarea } from '@/components/shadcn-ui/textarea';
import { cn } from '@/utils/shadcn-ui/utils';
import {
  getLocalized,
  langDisplayName,
  type LangCode,
} from '@/components/advanced/project-plan-dialog/localized.utils';

export interface LocalizeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Languages to show in both dropdowns; matches the main Language switcher's list. */
  availableLangs: LangCode[];
  /** Initial Source language; defaults to the wrapper's current displayLang. */
  defaultSourceLang: LangCode;
  /** Read-only source content lookups. */
  nameMap: Record<string, string>;
  descriptionMap: Record<string, string>;
  onSave: (targetLang: LangCode, name: string, description: string) => void;
}

export function LocalizeDialog({
  open,
  onOpenChange,
  availableLangs,
  defaultSourceLang,
  nameMap,
  descriptionMap,
  onSave,
}: LocalizeDialogProps) {
  const [sourceLang, setSourceLang] = useState<LangCode>(defaultSourceLang);
  const [targetLang, setTargetLang] = useState<LangCode | undefined>(undefined);
  const [targetName, setTargetName] = useState('');
  const [targetDescription, setTargetDescription] = useState('');
  // Languages the user added via "+ Add language…" during this dialog session.
  const [extraLangs, setExtraLangs] = useState<LangCode[]>([]);

  useEffect(() => {
    if (open) {
      setSourceLang(defaultSourceLang);
      setTargetLang(undefined);
      setTargetName('');
      setTargetDescription('');
      setExtraLangs([]);
    }
  }, [open, defaultSourceLang]);

  // Prefill the editable target fields when the user picks/changes the target language.
  useEffect(() => {
    if (targetLang === undefined) return;
    setTargetName(nameMap[targetLang] ?? '');
    setTargetDescription(descriptionMap[targetLang] ?? '');
  }, [targetLang, nameMap, descriptionMap]);

  const sourceName = getLocalized(nameMap, sourceLang);
  const sourceDescription = getLocalized(descriptionMap, sourceLang);

  const langOptions = Array.from(new Set([...availableLangs, ...extraLangs])).sort();

  const handleAddLanguage = (code: LangCode) => {
    if (!langOptions.includes(code)) setExtraLangs((prev) => [...prev, code]);
    setTargetLang(code);
  };

  const handleSubmit = () => {
    if (targetLang === undefined) return;
    onSave(targetLang, targetName, targetDescription);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Nested above the full-screen plan dialog (Z_INDEX_MODAL = 500). */}
      <DialogContent style={{ zIndex: 650 }} className="tw:sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>Localize Name and Description</DialogTitle>
        </DialogHeader>

        <div className="tw:grid tw:grid-cols-2 tw:gap-6">
          {/* Source column */}
          <div className="tw:flex tw:flex-col tw:gap-3">
            <FieldRow label="Source Language:">
              <LangPicker lang={sourceLang} options={langOptions} onChange={setSourceLang} />
            </FieldRow>
            <FieldRow label="Name:">
              <Input value={sourceName} readOnly className="tw:flex-1" />
            </FieldRow>
            <FieldRow label="Description:" alignTop>
              <Textarea value={sourceDescription} readOnly rows={10} className="tw:flex-1" />
            </FieldRow>
          </div>

          {/* Target column */}
          <div className="tw:flex tw:flex-col tw:gap-3">
            <FieldRow label="Target Language:">
              <LangPicker
                lang={targetLang}
                options={langOptions}
                onChange={setTargetLang}
                onAddLanguage={handleAddLanguage}
                placeholder="Select a language…"
              />
            </FieldRow>
            <FieldRow label="Name:">
              <Input
                value={targetName}
                onChange={(e) => setTargetName(e.target.value)}
                className="tw:flex-1 tw:bg-white"
              />
            </FieldRow>
            <FieldRow label="Description:" alignTop>
              <Textarea
                value={targetDescription}
                onChange={(e) => setTargetDescription(e.target.value)}
                rows={10}
                className="tw:flex-1 tw:bg-white"
              />
            </FieldRow>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={targetLang === undefined}>
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface FieldRowProps {
  label: string;
  alignTop?: boolean;
  children: ReactNode;
}

function FieldRow({ label, alignTop, children }: FieldRowProps) {
  return (
    <div className={cn('tw:flex tw:gap-2', alignTop ? 'tw:items-start' : 'tw:items-center')}>
      <Label className={cn('tw:w-28 tw:shrink-0', alignTop && 'tw:mt-2')}>{label}</Label>
      {children}
    </div>
  );
}

interface LangPickerProps {
  lang: LangCode | undefined;
  options: LangCode[];
  onChange: (next: LangCode) => void;
  onAddLanguage?: (code: LangCode) => void;
  placeholder?: string;
}

function LangPicker({ lang, options, onChange, onAddLanguage, placeholder }: LangPickerProps) {
  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [newCode, setNewCode] = useState('');

  useEffect(() => {
    if (!open) {
      setAddOpen(false);
      setNewCode('');
    }
  }, [open]);

  const submitNewCode = () => {
    const code = newCode.trim();
    if (!code || !onAddLanguage) return;
    onAddLanguage(code);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="tw:h-9 tw:flex-1 tw:justify-between tw:gap-1.5"
        >
          <span className={cn(lang === undefined && 'tw:text-muted-foreground')}>
            {lang === undefined ? (placeholder ?? 'Select…') : langDisplayName(lang)}
          </span>
          <ChevronDown className="tw:h-4 tw:w-4 tw:opacity-50" />
        </Button>
      </PopoverTrigger>
      {/* Above the nested dialog content (z 650). */}
      <PopoverContent align="start" style={{ zIndex: 700 }} className="tw:w-64 tw:p-1">
        <ul className="tw:flex tw:flex-col">
          {options.map((code) => (
            <li key={code}>
              <button
                type="button"
                onClick={() => {
                  onChange(code);
                  setOpen(false);
                }}
                className={cn(
                  'tw:flex tw:w-full tw:items-center tw:justify-between tw:rounded tw:px-2 tw:py-1 tw:text-start tw:text-sm tw:hover:bg-accent',
                  lang === code && 'tw:bg-accent',
                )}
              >
                <span>{langDisplayName(code)}</span>
                <span className="tw:text-[10px] tw:uppercase tw:text-muted-foreground">{code}</span>
              </button>
            </li>
          ))}
          {onAddLanguage && (
            <>
              <li className="tw:my-1 tw:border-t" />
              <li>
                {addOpen ? (
                  <div className="tw:flex tw:items-center tw:gap-1 tw:px-2 tw:py-1">
                    <Input
                      autoFocus
                      placeholder="e.g. de, id, zh-Hant"
                      value={newCode}
                      onChange={(e) => setNewCode(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          submitNewCode();
                        }
                        if (e.key === 'Escape') {
                          e.preventDefault();
                          setAddOpen(false);
                          setNewCode('');
                        }
                      }}
                      className="tw:h-7 tw:text-xs"
                    />
                    <Button size="sm" className="tw:h-7" onClick={submitNewCode}>
                      Add
                    </Button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setAddOpen(true)}
                    className="tw:flex tw:w-full tw:items-center tw:gap-1 tw:rounded tw:px-2 tw:py-1 tw:text-start tw:text-sm tw:text-muted-foreground tw:hover:bg-accent"
                  >
                    <Plus className="tw:h-3.5 tw:w-3.5" />
                    Add language…
                  </button>
                )}
              </li>
            </>
          )}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

export default LocalizeDialog;
