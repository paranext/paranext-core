import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  isRunningInWebView,
  shouldSuppressFocusReturn,
} from 'platform-bible-react';
import { LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { MouseEvent, useRef } from 'react';
import { SKIPPED_MATCH_MESSAGE_KEYS } from './find.utils';
import { MatchedUsfmText } from './matched-usfm-text.component';
import { MarkerReplaceAction } from './structure-protection.util';

export const REPLACE_MARKERS_PROMPT_STRING_KEYS: LocalizeKey[] = [
  '%general_cancel%',
  '%general_ok%',
  '%webView_find_replace_markersPrompt_confirm%',
  '%webView_find_replace_markersPrompt_deletedMarker%',
  '%webView_find_replace_markersPrompt_message%',
  '%webView_find_replace_markersPrompt_title%',
  // Taken from the list the messages are built from, so a new reason to skip cannot leave its
  // message unloaded.
  ...Object.values(SKIPPED_MATCH_MESSAGE_KEYS),
  '%webView_find_replace_skipped_title%',
];

/** Every {@link MarkerReplaceAction} that stops a Replace to ask or tell the user something. */
export type MarkerPromptAction = Exclude<MarkerReplaceAction, 'replace'>;

export type ReplaceMarkersPromptProps = {
  /** What the Replace in question has to ask or tell. When `undefined`, the prompt is closed. */
  action: MarkerPromptAction | undefined;
  /** The USFM of the match, shown with its markers when asking. */
  matchedUsfm: string;
  /**
   * What the Replace would write in place of the match, after any preserve-case change. The markers
   * it does not put back are the ones marked as deleted.
   */
  replacementUsfm: string;
  /** What to tell the user when `action` skips the match, from `buildSkippedMatchMessage`. */
  skippedMessage: string;
  /**
   * Where focus goes back to when the prompt closes, from {@link getFocusReturnCandidates}. Take it
   * when Replace opens the prompt, before anything inside the prompt has taken focus.
   */
  focusReturnCandidates: HTMLElement[];
  localizedStrings: LanguageStrings;
  /** Called when the user dismisses the prompt. Nothing has been written. */
  onDismiss: () => void;
  /** Called when the user agrees to replace the match, markers included. */
  onConfirm: () => void;
};

/**
 * Where focus can go back to when the prompt closes, nearest first: the element that had it when
 * the prompt opened, then each focusable element around it. A new search can remove the result the
 * prompt was opened from while it is open, and the results list around it is what keeps the arrow
 * keys working.
 */
export function getFocusReturnCandidates(focusedElement: Element | null): HTMLElement[] {
  const candidates: HTMLElement[] = [];
  let element = focusedElement instanceof HTMLElement ? focusedElement : undefined;
  while (element && element !== element.ownerDocument.body) {
    if (element.tabIndex >= 0) candidates.push(element);
    element = element.parentElement ?? undefined;
  }
  return candidates;
}

/**
 * True for the second or later click of a multi-click. The press that opened the prompt can be the
 * first of a double-click, and the second must not answer a prompt the user has not read. Keyboard
 * activation reports a click count of 0.
 */
function isRepeatClick(event: MouseEvent): boolean {
  return event.detail > 1;
}

/**
 * Stands between a single Replace and a match that includes markers. Either asks whether to delete
 * them, showing them, or says that the match is skipped, with only OK.
 */
export function ReplaceMarkersPrompt({
  action,
  matchedUsfm,
  replacementUsfm,
  skippedMessage,
  focusReturnCandidates,
  localizedStrings,
  onDismiss,
  onConfirm,
}: ReplaceMarkersPromptProps) {
  // Dialogs animate out, so the content has to outlast the `action` that opened it. Without this
  // the prompt shows the wrong title and no match for its last moments on screen, and has nowhere
  // to hand focus back to once it has closed.
  const shownRef = useRef({
    action,
    matchedUsfm,
    replacementUsfm,
    skippedMessage,
    focusReturnCandidates,
  });
  if (action)
    shownRef.current = {
      action,
      matchedUsfm,
      replacementUsfm,
      skippedMessage,
      focusReturnCandidates,
    };
  const shown = shownRef.current;
  const isAsking = shown.action === 'confirm';

  return (
    <Dialog
      open={!!action}
      onOpenChange={(isOpen) => {
        if (!isOpen) onDismiss();
      }}
    >
      {/* No taller than the panel: a match that swallows a footnote or runs over several verses
          makes a long message, so the body scrolls and the title and buttons stay in view. In a
          panel too short even for those, the whole dialog scrolls rather than spilling out. */}
      <DialogContent
        className="tw:flex tw:max-h-[calc(100%-2rem)] tw:flex-col tw:overflow-y-auto tw:sm:max-w-md"
        role="alertdialog"
        showCloseButton={false}
        // An alert dialog is answered only with its buttons or Escape, as Radix's `AlertDialog`
        // is. A press outside it is most often the second press of a double-click on the Replace
        // that opened it, which would otherwise dismiss the prompt before it could be read.
        onPointerDownOutside={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
        // The dialog has no trigger, so Radix would hand focus back to nothing, leaving the arrow
        // keys of the results list dead and Tab starting over at the search box. Focus stays put
        // when the user has moved it to another frame, as `.claude/rules/focus-return-on-close.md`
        // requires.
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          if (shouldSuppressFocusReturn(document, isRunningInWebView())) return;
          shownRef.current.focusReturnCandidates.some((candidate) => {
            if (!candidate.isConnected) return false;
            candidate.focus();
            // A disabled control, such as the toolbar's Replace while a replace runs, refuses focus.
            return candidate.ownerDocument.activeElement === candidate;
          });
        }}
      >
        <DialogHeader className="tw:shrink-0">
          <DialogTitle>
            {
              localizedStrings[
                isAsking
                  ? '%webView_find_replace_markersPrompt_title%'
                  : '%webView_find_replace_skipped_title%'
              ]
            }
          </DialogTitle>
        </DialogHeader>
        {/* The match is part of the description, so a screen reader announces the markers it
            would delete along with the message. */}
        <DialogDescription asChild>
          <div className="tw:flex tw:min-h-0 tw:flex-col tw:gap-4 tw:overflow-y-auto">
            <p>
              {isAsking
                ? localizedStrings['%webView_find_replace_markersPrompt_message%']
                : shown.skippedMessage}
            </p>
            {isAsking && (
              <div className="scripture-font tw:break-words tw:rounded tw:border tw:p-2 tw:text-sm tw:text-popover-foreground">
                <MatchedUsfmText
                  matchedUsfm={shown.matchedUsfm}
                  replacementUsfm={shown.replacementUsfm}
                  deletedMarkerLabel={
                    localizedStrings['%webView_find_replace_markersPrompt_deletedMarker%']
                  }
                />
              </div>
            )}
          </div>
        </DialogDescription>
        <DialogFooter className="tw:shrink-0">
          {isAsking ? (
            <>
              <Button variant="secondary" autoFocus onClick={onDismiss}>
                {localizedStrings['%general_cancel%']}
              </Button>
              <Button
                variant="destructive"
                onClick={(event) => {
                  if (!isRepeatClick(event)) onConfirm();
                }}
              >
                {localizedStrings['%webView_find_replace_markersPrompt_confirm%']}
              </Button>
            </>
          ) : (
            // A bare OK on purpose: the guideline against it targets decision dialogs, and this
            // one-button acknowledgment decides nothing. UX specified it; see
            // adr-find-replace-confirms-marker-deletion.
            <Button
              autoFocus
              onClick={(event) => {
                if (!isRepeatClick(event)) onDismiss();
              }}
            >
              {localizedStrings['%general_ok%']}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
