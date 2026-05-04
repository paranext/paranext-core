import { useEffect, useId, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Label,
  RadioGroup,
  RadioGroupItem,
} from 'platform-bible-react';

/**
 * Pure presentational component for the Greek Esther template chooser. WP-002 in the manage-books
 * port plan; corresponds to PT9 `ParatextBase/CreateESGForm.cs` (47 LOC). Invoked from the
 * `ManageBooksDialog` Create flow when ESG is among the selected books and the create method is
 * `'fromTemplate'` / `'referenceText'`.
 *
 * No PAPI imports. Data flows in via props and out via `onSelect` / `onCancel`. The wiring layer
 * (phase-3-ui) is responsible for instantiating the picker, controlling its `open` state, and
 * resolving the result back to the parent dialog's `onOpenEstherPicker` promise.
 */

/**
 * Greek Esther template the user can choose. Mirrors `EstherTemplate` in
 * `manage-books-dialog.types.ts`.
 */
export type GreekEstherTemplate = 'lxx' | 'vulgate' | 'modern_scholars';

/**
 * Type-guard for the `GreekEstherTemplate` union. Used to avoid a type assertion at the radio
 * change site.
 */
function isGreekEstherTemplate(value: string): value is GreekEstherTemplate {
  return value === 'lxx' || value === 'vulgate' || value === 'modern_scholars';
}

/**
 * All localization keys consumed by `GreekEstherTemplatePicker`. Pass to `useLocalizedStrings` to
 * obtain a string map and forward it via the `localizedStrings` prop.
 */
export const GREEK_ESTHER_TEMPLATE_PICKER_STRING_KEYS = Object.freeze([
  '%manageBooks_createEsther_dialogTitle%',
  '%manageBooks_createEsther_dialogDescription%',
  '%manageBooks_createEsther_lxx%',
  '%manageBooks_createEsther_vulgate%',
  '%manageBooks_createEsther_modernScholars%',
  '%manageBooks_createEsther_okButton%',
  '%manageBooks_createEsther_cancelButton%',
  '%manageBooks_createEsther_radioGroupAriaLabel%',
] as const);

/** Localized-string key type accepted by the `localizedStrings` prop. */
export type GreekEstherTemplatePickerLocalizedStringKey =
  (typeof GREEK_ESTHER_TEMPLATE_PICKER_STRING_KEYS)[number];

/** Localized-strings map shape accepted by the `localizedStrings` prop. */
export type GreekEstherTemplatePickerLocalizedStrings = Partial<
  Record<GreekEstherTemplatePickerLocalizedStringKey, string>
>;

/** Props accepted by `GreekEstherTemplatePicker`. */
export type GreekEstherTemplatePickerProps = {
  /** Whether the dialog is open. */
  open: boolean;
  /** Called when the user picks OK. Receives the chosen template. */
  onSelect: (template: GreekEstherTemplate) => void;
  /** Called when the user picks Cancel, presses Escape, or clicks the overlay. */
  onCancel: () => void;
  /**
   * Optional default selection. Defaults to `'lxx'` per PT9 parity (RF-UI-006 closed 2026-05-01 —
   * `ParatextBase/CreateESGForm.Designer.cs:49` sets `optLXX.Checked = true`, and
   * `CreateESGForm.cs:12` initializes `TemplateFile = "ESG_lxx.sfm"`).
   */
  defaultTemplate?: GreekEstherTemplate;
  /**
   * Localization map (key → translated string). Component falls back to English when a key is
   * missing.
   */
  localizedStrings?: GreekEstherTemplatePickerLocalizedStrings;
};

const ENGLISH_FALLBACKS: Record<GreekEstherTemplatePickerLocalizedStringKey, string> = {
  '%manageBooks_createEsther_dialogTitle%': 'Greek Esther: Choose template',
  '%manageBooks_createEsther_dialogDescription%':
    'ESG contains material from the Hebrew text and additional material from the Greek LXX text. ' +
    'Projects usually follow one of three models. Please select the model you wish to use.',
  '%manageBooks_createEsther_lxx%': 'Septuagint (LXX) — verse subdivisions: 1a, 1b, 1c…',
  '%manageBooks_createEsther_vulgate%': 'Vulgate — additional chapters 11 through 16',
  '%manageBooks_createEsther_modernScholars%': 'Modern Scholars — additional chapters A through F',
  '%manageBooks_createEsther_okButton%': 'Choose',
  '%manageBooks_createEsther_cancelButton%': 'Cancel',
  '%manageBooks_createEsther_radioGroupAriaLabel%': 'Greek Esther template options',
};

/**
 * Modal dialog that lets the user pick one of three Greek Esther chapter/verse-numbering templates
 * (LXX, Vulgate, Modern Scholars). Pure presentational — no PAPI access, all data via props.
 */
export function GreekEstherTemplatePicker({
  open,
  onSelect,
  onCancel,
  defaultTemplate = 'lxx',
  localizedStrings = {},
}: GreekEstherTemplatePickerProps) {
  const t = (key: GreekEstherTemplatePickerLocalizedStringKey) =>
    localizedStrings[key] ?? ENGLISH_FALLBACKS[key];

  const [selected, setSelected] = useState<GreekEstherTemplate>(defaultTemplate);

  // Reset the radio to `defaultTemplate` whenever the dialog (re-)opens, so a re-opened
  // picker doesn't surface stale selection state from the previous session.
  useEffect(() => {
    if (open) setSelected(defaultTemplate);
  }, [open, defaultTemplate]);

  const lxxId = useId();
  const vulgateId = useId();
  const modernScholarsId = useId();

  const handleOpenChange = (next: boolean) => {
    if (!next) onCancel();
  };

  const handleOk = () => {
    onSelect(selected);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="tw-max-w-md">
        <DialogHeader>
          <DialogTitle>{t('%manageBooks_createEsther_dialogTitle%')}</DialogTitle>
          <DialogDescription>{t('%manageBooks_createEsther_dialogDescription%')}</DialogDescription>
        </DialogHeader>

        <RadioGroup
          value={selected}
          onValueChange={(value) => {
            if (isGreekEstherTemplate(value)) setSelected(value);
          }}
          aria-label={t('%manageBooks_createEsther_radioGroupAriaLabel%')}
          className="tw-py-2"
        >
          <div className="tw-flex tw-items-start tw-gap-3">
            <RadioGroupItem value="lxx" id={lxxId} className="tw-mt-1" />
            <Label htmlFor={lxxId} className="tw-cursor-pointer tw-leading-snug">
              {t('%manageBooks_createEsther_lxx%')}
            </Label>
          </div>
          <div className="tw-flex tw-items-start tw-gap-3">
            <RadioGroupItem value="vulgate" id={vulgateId} className="tw-mt-1" />
            <Label htmlFor={vulgateId} className="tw-cursor-pointer tw-leading-snug">
              {t('%manageBooks_createEsther_vulgate%')}
            </Label>
          </div>
          <div className="tw-flex tw-items-start tw-gap-3">
            <RadioGroupItem value="modern_scholars" id={modernScholarsId} className="tw-mt-1" />
            <Label htmlFor={modernScholarsId} className="tw-cursor-pointer tw-leading-snug">
              {t('%manageBooks_createEsther_modernScholars%')}
            </Label>
          </div>
        </RadioGroup>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            {t('%manageBooks_createEsther_cancelButton%')}
          </Button>
          <Button onClick={handleOk}>{t('%manageBooks_createEsther_okButton%')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
