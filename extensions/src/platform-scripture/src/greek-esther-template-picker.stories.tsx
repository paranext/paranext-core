import { useState, type ReactElement } from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Button } from 'platform-bible-react';
import {
  GreekEstherTemplate,
  GreekEstherTemplatePicker,
  GreekEstherTemplatePickerLocalizedStrings,
  GreekEstherTemplatePickerProps,
} from './greek-esther-template-picker.component';

const meta: Meta<typeof GreekEstherTemplatePicker> = {
  title: 'Bundled Extensions/platform-scripture/GreekEstherTemplatePicker',
  component: GreekEstherTemplatePicker,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof GreekEstherTemplatePicker>;

type LogEntry = {
  /** Unique sequence id, monotonically increasing per harness instance. Stable key for React. */
  id: number;
  ts: string;
  kind: 'select' | 'cancel';
  template?: GreekEstherTemplate;
};

/**
 * Shared stateful render helper. Owns the picker's `open` state and a running result log so the
 * reviewer can re-open the dialog repeatedly and see every callback fire end-to-end. Consumers pass
 * the static portion of the args (e.g. `defaultTemplate`, `localizedStrings`); `open`, `onSelect`,
 * and `onCancel` are wired internally.
 */
function StatefulPickerHarness({
  initialOpen = true,
  staticArgs = {},
}: {
  initialOpen?: boolean;
  staticArgs?: Partial<Omit<GreekEstherTemplatePickerProps, 'open' | 'onSelect' | 'onCancel'>>;
}): ReactElement {
  const [open, setOpen] = useState(initialOpen);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [nextId, setNextId] = useState(0);

  const appendLogEntry = (entry: Omit<LogEntry, 'id' | 'ts'>) => {
    setNextId((n) => n + 1);
    setLog((prev) => [{ id: nextId, ts: new Date().toLocaleTimeString(), ...entry }, ...prev]);
  };

  const handleSelect = (template: GreekEstherTemplate) => {
    appendLogEntry({ kind: 'select', template });
    setOpen(false);
  };

  const handleCancel = () => {
    appendLogEntry({ kind: 'cancel' });
    setOpen(false);
  };

  return (
    <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
      <div className="tw-flex tw-items-center tw-gap-2">
        <Button onClick={() => setOpen(true)}>Open picker</Button>
        <Button variant="outline" onClick={() => setLog([])} disabled={log.length === 0}>
          Clear log
        </Button>
        <span className="tw-text-sm tw-text-muted-foreground">
          The dialog closes after each OK / Cancel; click &ldquo;Open picker&rdquo; to re-open.
        </span>
      </div>

      <GreekEstherTemplatePicker
        {...staticArgs}
        open={open}
        onSelect={handleSelect}
        onCancel={handleCancel}
      />

      <div className="tw-rounded tw-border tw-p-3">
        <div className="tw-mb-2 tw-text-sm tw-font-semibold">Result log</div>
        {log.length === 0 ? (
          <div className="tw-text-sm tw-text-muted-foreground">
            (no events yet — open the picker and click OK or Cancel)
          </div>
        ) : (
          <ul className="tw-space-y-1 tw-text-sm tw-font-mono">
            {log.map((entry) => (
              <li key={entry.id}>
                [{entry.ts}]{' '}
                {entry.kind === 'select' ? `onSelect('${entry.template}')` : `onCancel()`}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/**
 * Default story: open dialog, default radio = `'lxx'` (Septuagint) per PT9 parity (RF-UI-006 closed
 * 2026-05-01 — verified against `CreateESGForm.Designer.cs`'s `optLXX.Checked = true`). Clicking OK
 * fires `onSelect` and appends to the visible result log; Escape, Cancel, or overlay-click fire
 * `onCancel`. Click "Open picker" to re-open and try a different option.
 */
export const Default: Story = {
  render: () => <StatefulPickerHarness />,
};

/**
 * Pre-selected to `'modern_scholars'` via the `defaultTemplate` prop, demonstrating that the API
 * default is overridable. Clicking OK without changing the radio fires
 * `onSelect('modern_scholars')`.
 */
export const PreSelectedModernScholars: Story = {
  render: () => <StatefulPickerHarness staticArgs={{ defaultTemplate: 'modern_scholars' }} />,
};

/** Pre-selected to `'vulgate'`. */
export const PreSelectedVulgate: Story = {
  render: () => <StatefulPickerHarness staticArgs={{ defaultTemplate: 'vulgate' }} />,
};

/**
 * Custom localization map (sample French translations) covering all 8 keys _except_ `okButton`,
 * which is intentionally omitted to demonstrate the English-fallback path. Open the picker and
 * observe French radio labels + title + description, but an English “OK” on the primary action
 * button.
 */
const SAMPLE_FRENCH_STRINGS: GreekEstherTemplatePickerLocalizedStrings = {
  '%manageBooks_createEsther_dialogTitle%': 'Esther grec : choisir un modèle',
  '%manageBooks_createEsther_dialogDescription%':
    'ESG contient du matériel du texte hébreu et du matériel supplémentaire du texte grec de la LXX. ' +
    'Les projets suivent généralement l’un des trois modèles. Veuillez sélectionner le modèle que vous souhaitez utiliser.',
  '%manageBooks_createEsther_lxx%': 'Septante (LXX) — subdivisions de versets : 1a, 1b, 1c...',
  '%manageBooks_createEsther_vulgate%': 'Vulgate — chapitres supplémentaires 11 à 16',
  '%manageBooks_createEsther_modernScholars%': 'Érudits modernes — chapitres supplémentaires A à F',
  // okButton intentionally omitted to prove English fallback works.
  '%manageBooks_createEsther_cancelButton%': 'Annuler',
  '%manageBooks_createEsther_radioGroupAriaLabel%': 'Options de modèle Esther grec',
};

export const CustomLocalization: Story = {
  render: () => <StatefulPickerHarness staticArgs={{ localizedStrings: SAMPLE_FRENCH_STRINGS }} />,
};

/**
 * Callback-spy variant: identical to Default, but starts closed so the reviewer drives the
 * lifecycle manually (open → pick → re-open → cancel → re-open → pick different template). All
 * three callback-shape outcomes (select+template, cancel, re-open) are exercised in a single story
 * session with full state visible in the running log.
 */
export const CallbackSpy: Story = {
  render: () => <StatefulPickerHarness initialOpen={false} />,
};
