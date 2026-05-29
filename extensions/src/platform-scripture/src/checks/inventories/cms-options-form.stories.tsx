import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { Button } from 'platform-bible-react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  CmsOptionDescriptor,
  CmsOptionsForm,
  CmsOptionsFormProps,
} from './cms-options-form.component';

// Resolve the option names from the repo's English locale so the Storybook review reads naturally.
const localized = getLocalizedStrings([
  '%inventoryOptionName_MixexCapitalization_UncapitalizedPrefixes%',
  '%inventoryOptionName_MixexCapitalization_CapitalizedSuffixes%',
  '%inventoryOptionName_MixexCapitalization_CapitalizedPrefixes%',
]);

/**
 * Story-only localized-strings helper. The production component receives this via the `t` prop; in
 * Storybook we resolve option names from the locale files and fall back to English for the dialog
 * chrome keys (which Phase 3 will add to localizedStrings.json when wiring).
 */
const t = (key: string, fallback: string): string => localized[key] ?? fallback;

/**
 * The three Mixed Capitalization options (BHV-605). `parmName` values are the literal settings keys
 * and round-trip verbatim. All three are free-text options (no yes/no or project-pointer modes).
 */
const MIXED_CAP_OPTIONS: CmsOptionDescriptor[] = [
  {
    parmName: 'UncapitalizedPrefixes',
    localizedName: t(
      '%inventoryOptionName_MixexCapitalization_UncapitalizedPrefixes%',
      'Uncapitalized Prefixes',
    ),
    localizedDescription:
      'Enter a list of prefixes separated by spaces which are allowed to occur uncapitalized before the first capital letter in a word. Leave blank if none.',
    defaultValue: '',
    hide: false,
  },
  {
    parmName: 'CapitalizedSuffixes',
    localizedName: t(
      '%inventoryOptionName_MixexCapitalization_CapitalizedSuffixes%',
      'Capitalized Suffixes',
    ),
    localizedDescription:
      "Enter a list of suffixes separated by spaces which are allowed to occur capitalized at the end of a word. Leave blank if none. Example: if 'seaCan' is a valid word because the 'Can' suffix must be capitalized, enter 'Can' in this list.",
    defaultValue: '',
    hide: false,
  },
  {
    parmName: 'CapitalizedPrefixes',
    localizedName: t(
      '%inventoryOptionName_MixexCapitalization_CapitalizedPrefixes%',
      'Capitalized Prefixes',
    ),
    localizedDescription:
      'Enter a list of prefixes separated by spaces which are allowed to occur capitalized before the first uppercase letter in a word. Leave blank if none.',
    defaultValue: '',
    hide: false,
  },
];

const SAMPLE_SUGGESTIONS: Record<string, string[]> = {
  UncapitalizedPrefixes: ['a', 'b', 'c', 'i', 'x', '*ben'],
  CapitalizedSuffixes: ['Can', 'ER', 'son'],
  CapitalizedPrefixes: ['Mc', 'Mac', "O'"],
};

/**
 * Stateful decorator: owns the persisted-value sample state and last submit/cancel outcome so a
 * reviewer can navigate options, edit the value, click suggestions, and confirm/cancel while
 * observing real state transitions. Sample data lives here, never in the production component.
 */
function InteractiveCmsOptionsForm({ initialValues: seedValues, ...rest }: CmsOptionsFormProps) {
  const [open, setOpen] = useState(true);
  const [persisted, setPersisted] = useState<Record<string, string>>(seedValues);
  const [lastOutcome, setLastOutcome] = useState<string>('(none)');

  return (
    <div>
      {!open && (
        <Button variant="outline" onClick={() => setOpen(true)}>
          Reopen dialog
        </Button>
      )}
      <CmsOptionsForm
        {...rest}
        open={open}
        initialValues={persisted}
        onSubmit={(changedValues) => {
          setPersisted((prev) => ({ ...prev, ...changedValues }));
          setLastOutcome(`submit: ${JSON.stringify(changedValues)}`);
          setOpen(false);
        }}
        onCancel={() => {
          setLastOutcome('cancel');
          setOpen(false);
        }}
      />
      <div className="tw:p-2 tw:text-xs tw:text-muted-foreground" aria-live="polite">
        persisted: {JSON.stringify(persisted)} · lastOutcome: {lastOutcome}
      </div>
    </div>
  );
}

const meta: Meta<typeof CmsOptionsForm> = {
  title: 'Bundled Extensions/platform-scripture/CmsOptionsForm',
  component: CmsOptionsForm,
  tags: ['autodocs'],
  args: {
    open: true,
    options: MIXED_CAP_OPTIONS,
    initialValues: { UncapitalizedPrefixes: 'i x' },
    autocompleteSuggestions: SAMPLE_SUGGESTIONS,
    canPersist: true,
    t,
    onSubmit: () => {},
    onCancel: () => {},
  },
};
export default meta;

type Story = StoryObj<typeof CmsOptionsForm>;

/**
 * Default — first option (Uncapitalized Prefixes) pre-selected with its persisted value populated.
 * Fully interactive: `onSubmit` and `onCancel` are wired to state-mutating handlers in the
 * decorator, so navigating options, editing the value, clicking suggestions, and confirming all
 * produce observable state changes.
 */
export const Default: Story = {
  args: {
    initialValues: { UncapitalizedPrefixes: 'i x' },
  },
  render: (args) => <InteractiveCmsOptionsForm {...args} />,
};

/**
 * SuffixSelected — the dialog as it appears after the user selects "Capitalized Suffixes": the
 * description pane and value field update for that option. Interactive so the reviewer can continue
 * the flow.
 */
export const SuffixSelected: Story = {
  args: {
    initialValues: { UncapitalizedPrefixes: 'i x', CapitalizedSuffixes: 'Can' },
  },
  render: (args) => <InteractiveCmsOptionsForm {...args} />,
};

/**
 * EmptyValue — the selected option has no persisted value yet, so the value field shows its
 * placeholder while autocomplete suggestions remain available. (Stub callbacks are acceptable for
 * non-Default stories.)
 */
export const EmptyValue: Story = {
  args: {
    initialValues: {},
  },
};

/**
 * PersistDisabled — `canPersist` is false (the user lacks write permission). The OK button is
 * disabled / aria-disabled; Cancel still works. Defensive state per the centralized permission
 * gate.
 */
export const PersistDisabled: Story = {
  args: {
    canPersist: false,
    initialValues: { UncapitalizedPrefixes: 'i x' },
  },
};
