import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'platform-bible-react';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { useRef } from 'react';
import { MatchedUsfmText } from './matched-usfm-text.component';
import { MarkerReplaceAction } from './structure-protection.util';

export const REPLACE_MARKERS_PROMPT_STRING_KEYS: LocalizeKey[] = [
  '%general_cancel%',
  '%general_ok%',
  '%webView_find_replace_markersPrompt_confirm%',
  '%webView_find_replace_markersPrompt_message%',
  '%webView_find_replace_markersPrompt_title%',
  '%webView_find_replace_skippedChapterMarker%',
  '%webView_find_replace_skippedOneEndedMarker%',
  '%webView_find_replace_skippedStructureProtected%',
  '%webView_find_replace_skipped_title%',
];

/** Every {@link MarkerReplaceAction} that stops a Replace to ask or tell the user something. */
export type MarkerPromptAction = Exclude<MarkerReplaceAction, 'replace'>;

export type ReplaceMarkersPromptProps = {
  /** What the Replace in question has to ask or tell. When `undefined`, the prompt is closed. */
  action: MarkerPromptAction | undefined;
  /** The USFM of the match, shown with its markers when asking. */
  matchedUsfm: string;
  /** What to tell the user when `action` skips the match, from `buildSkippedMatchMessage`. */
  skippedMessage: string;
  localizedStrings: LanguageStrings;
  /** Called when the user dismisses the prompt. Nothing has been written. */
  onDismiss: () => void;
  /** Called when the user agrees to replace the match, markers included. */
  onConfirm: () => void;
};

/**
 * Stands between a single Replace and a match that includes markers. Either asks whether to delete
 * them, showing them, or says that the match is skipped, with only OK.
 */
export function ReplaceMarkersPrompt({
  action,
  matchedUsfm,
  skippedMessage,
  localizedStrings,
  onDismiss,
  onConfirm,
}: ReplaceMarkersPromptProps) {
  // Dialogs animate out, so the content has to outlast the `action` that opened it. Without this
  // the prompt shows the wrong title and no match for its last moments on screen.
  const shownRef = useRef({ action, matchedUsfm, skippedMessage });
  if (action) shownRef.current = { action, matchedUsfm, skippedMessage };
  const shown = shownRef.current;
  const isAsking = shown.action === 'confirm';

  return (
    <Dialog
      open={!!action}
      onOpenChange={(isOpen) => {
        if (!isOpen) onDismiss();
      }}
    >
      <DialogContent className="tw:max-w-md" role="alertdialog" showCloseButton={false}>
        <div className="tw:flex tw:flex-col tw:gap-4">
          <DialogHeader>
            <DialogTitle>
              {
                localizedStrings[
                  isAsking
                    ? '%webView_find_replace_markersPrompt_title%'
                    : '%webView_find_replace_skipped_title%'
                ]
              }
            </DialogTitle>
            <DialogDescription>
              {isAsking
                ? localizedStrings['%webView_find_replace_markersPrompt_message%']
                : shown.skippedMessage}
            </DialogDescription>
          </DialogHeader>
          {isAsking && (
            // A match that swallows a footnote can be long, and the buttons must stay reachable.
            <div className="scripture-font tw:max-h-40 tw:overflow-y-auto tw:break-words tw:rounded tw:border tw:p-2 tw:text-sm">
              <MatchedUsfmText matchedUsfm={shown.matchedUsfm} />
            </div>
          )}
          <div className="tw:flex tw:flex-col tw:gap-2 tw:sm:flex-row tw:sm:justify-end">
            {isAsking ? (
              <>
                <Button variant="outline" autoFocus onClick={onDismiss}>
                  {localizedStrings['%general_cancel%']}
                </Button>
                <Button variant="destructive" onClick={onConfirm}>
                  {localizedStrings['%webView_find_replace_markersPrompt_confirm%']}
                </Button>
              </>
            ) : (
              <Button autoFocus onClick={onDismiss}>
                {localizedStrings['%general_ok%']}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
