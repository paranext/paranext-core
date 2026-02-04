import { useLocalizedStrings } from '@papi/frontend/react';
import { Label } from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import type { ProjectPropertiesFormState } from 'platform-projects';

// #region Localized Strings

const ADDITIONS_TAB_LOCALIZED_KEYS: LocalizeKey[] = [
  '%webView_projectProperties_additionsTab_header%',
  '%webView_projectProperties_additionsTab_placeholder%',
];

// #endregion

// #region Types

interface AdditionsTabProps {
  formState: ProjectPropertiesFormState;
  onFieldChange: (field: keyof ProjectPropertiesFormState, value: unknown) => void;
  validationErrors: Record<string, string>;
  isDisabled: boolean;
}

// #endregion

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function AdditionsTab(_props: AdditionsTabProps) {
  const [localizedStrings] = useLocalizedStrings(ADDITIONS_TAB_LOCALIZED_KEYS);

  return (
    <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
      {/* Header */}
      <div className="tw-border-b tw-border-border tw-pb-2">
        <Label className="tw-text-base tw-font-semibold">
          {localizedStrings['%webView_projectProperties_additionsTab_header%']}
        </Label>
      </div>

      {/* Placeholder Content */}
      <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-py-12">
        <div className="tw-rounded-lg tw-border tw-border-dashed tw-border-border tw-bg-muted/30 tw-p-8 tw-text-center">
          <p className="tw-text-muted-foreground">
            {localizedStrings['%webView_projectProperties_additionsTab_placeholder%']}
          </p>
        </div>
      </div>

      {/* Info text */}
      <div className="tw-mt-4 tw-text-sm tw-text-muted-foreground">
        <p>
          The Additions tab allows configuration of additional project files such as supplementary
          materials, front matter templates, and other project resources.
        </p>
      </div>
    </div>
  );
}

export default AdditionsTab;
