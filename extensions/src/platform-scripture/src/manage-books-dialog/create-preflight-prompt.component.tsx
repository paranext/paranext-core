import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'platform-bible-react';
import type { ManageBooksDialogLocalizedStrings } from './manage-books-dialog.types';
import { fmtTemplate } from './manage-books-dialog.utils';

/**
 * Two-kind discriminated union describing the pre-flight prompt the Create flow may surface before
 * running the actual mutation:
 *
 * - `missing-model`: some selected books are not in the model project; the user can proceed with the
 *   available subset.
 * - `versification`: the destination project's versification differs from the model project's; the
 *   user must confirm before continuing.
 */
export type CreatePromptState =
  | { kind: 'missing-model'; missing: string[]; available: string[] }
  | { kind: 'versification'; destVrs: string; modelVrs: string; books: string[] };

/**
 * A4 — Create pre-flight prompts (missing model books / versification mismatch).
 *
 * The orchestrator funnels the prompt through both kinds in sequence: if a missing-model prompt is
 * acknowledged, the orchestrator may then surface a versification prompt as a follow-up.
 */
export type CreatePreflightPromptProps = {
  /** Pending prompt state. When `undefined`, the dialog is closed. */
  prompt: CreatePromptState | undefined;
  /** Source project's short name (used in the versification body). */
  projectShortName: string;
  /** Selected reference (model) project, when one is chosen. */
  referenceProject?: { shortName: string; name: string } | undefined;
  /** Localized-strings lookup helper from the parent. */
  t: (key: keyof ManageBooksDialogLocalizedStrings, fallback: string) => string;
  /** Called when the user dismisses the prompt without continuing. */
  onCancel: () => void;
  /** Called when the user clicks Continue; the parent decides what happens next. */
  onContinue: (prompt: CreatePromptState) => void;
};

export function CreatePreflightPrompt({
  prompt,
  projectShortName,
  referenceProject,
  t,
  onCancel,
  onContinue,
}: CreatePreflightPromptProps) {
  return (
    <Dialog
      open={!!prompt}
      onOpenChange={(v) => {
        if (!v) onCancel();
      }}
    >
      <DialogContent className="tw-max-w-md" role="alertdialog">
        <div className="tw-flex tw-flex-col tw-gap-4">
          <DialogHeader>
            <DialogTitle>
              {prompt?.kind === 'missing-model'
                ? t(
                    '%manageBooks_create_missingModelBooksTitle%',
                    'Some books are not in the model project',
                  )
                : t('%manageBooks_create_versificationMismatchTitle%', 'Versification mismatch')}
            </DialogTitle>
            <DialogDescription>
              {(() => {
                if (prompt?.kind === 'missing-model')
                  return fmtTemplate(
                    t(
                      '%manageBooks_create_missingModelBooksBody%',
                      '{0} of the selected books are not in the model project {1}. Proceed with the {2} book(s) that are available?',
                    ),
                    prompt.missing.length,
                    referenceProject?.name ?? '',
                    prompt.available.length,
                  );
                if (prompt?.kind === 'versification')
                  return fmtTemplate(
                    t(
                      '%manageBooks_create_versificationMismatchBody%',
                      '{0} uses {1} versification but the model project {2} uses {3}. Continue?',
                    ),
                    projectShortName,
                    prompt.destVrs,
                    referenceProject?.shortName ?? '',
                    prompt.modelVrs,
                  );
                return '';
              })()}
            </DialogDescription>
          </DialogHeader>
          <div className="tw-flex tw-flex-col tw-gap-2 sm:tw-flex-row sm:tw-justify-end">
            <Button variant="outline" autoFocus onClick={onCancel}>
              {t('%manageBooks_prompt_cancel%', 'Cancel')}
            </Button>
            <Button
              onClick={() => {
                if (!prompt) return;
                onContinue(prompt);
              }}
            >
              {t('%manageBooks_prompt_continue%', 'Continue')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
