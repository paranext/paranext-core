import type { LanguageStrings } from 'platform-bible-utils';
import type { ReplaceOptions } from 'platform-scripture';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { LocalizedBookData } from './find-types';
import { buildSkippedMatchMessage } from './find.utils';
import {
  getFocusReturnCandidates,
  MarkerPromptAction,
  ReplaceMarkersPromptProps,
} from './replace-markers-prompt.component';
import type { HidableFindResult } from './search-result.component';
import { getMarkerReplaceAction } from './structure-protection.util';

/** A single Replace waiting on the prompt because its match includes markers. */
type PendingMarkerReplace = {
  action: MarkerPromptAction;
  resultIndex: number;
  /** The result itself as well as its index, so a list that changed under the prompt is noticed */
  result: HidableFindResult;
  /** What a confirm writes: the text `action` was decided on */
  usfmToInsert: string;
  /** Where focus goes back to when the prompt closes, taken when Replace opened it */
  focusReturnCandidates: HTMLElement[];
};

export type UseMarkerReplacePromptOptions = {
  /** The results Replace acts on, as rendered */
  results: HidableFindResult[];
  /** The latest results, which a confirm checks against: they can be newer than `results` */
  resultsRef: { readonly current: HidableFindResult[] };
  /** Whether structure protection is in effect for the project */
  isStructureProtected: boolean;
  /**
   * Whether Replace is on offer: the panel is in replace mode and the project is editable. The
   * prompt closes when it is not.
   */
  canReplace: boolean;
  /** Writes one replacement. Called with `allowMarkerDeletion` once the user confirms. */
  runReplace: (
    resultIndex: number,
    result: HidableFindResult,
    usfmToInsert: string,
    options?: ReplaceOptions,
  ) => Promise<void>;
  localizedStrings: LanguageStrings;
  localizedBookData: Map<string, Pick<LocalizedBookData, 'localizedId' | 'localizedName'>>;
};

export type MarkerReplacePrompt = {
  /**
   * Replaces the result at once when doing so deletes no marker, and otherwise opens the prompt to
   * ask the user, or to tell them the match is skipped.
   */
  replaceOrAsk: (
    resultIndex: number,
    result: HidableFindResult,
    usfmToInsert: string,
  ) => Promise<void>;
  /** True while the prompt is open */
  isPromptOpen: boolean;
  /** Everything `ReplaceMarkersPrompt` needs to render */
  promptProps: ReplaceMarkersPromptProps;
};

/**
 * Stands between a single Replace and a match that includes markers: decides whether the Replace
 * can go ahead, has to ask first, or is skipped, and holds the prompt's state until it is
 * answered.
 */
export function useMarkerReplacePrompt({
  results,
  resultsRef,
  isStructureProtected,
  canReplace,
  runReplace,
  localizedStrings,
  localizedBookData,
}: UseMarkerReplacePromptOptions): MarkerReplacePrompt {
  const [pending, setPending] = useState<PendingMarkerReplace | undefined>(undefined);

  const replaceOrAsk = useCallback(
    async (resultIndex: number, result: HidableFindResult, usfmToInsert: string) => {
      const action = getMarkerReplaceAction(result, usfmToInsert, isStructureProtected);
      if (action === 'replace') {
        await runReplace(resultIndex, result, usfmToInsert);
        return;
      }
      setPending({
        action,
        resultIndex,
        result,
        usfmToInsert,
        // Taken now, before anything inside the prompt can take focus: its buttons' `autoFocus`
        // takes it as soon as they mount.
        focusReturnCandidates: getFocusReturnCandidates(document.activeElement),
      });
    },
    [isStructureProtected, runReplace],
  );

  const handleDismiss = useCallback(() => setPending(undefined), []);

  const handleConfirm = useCallback(async () => {
    setPending(undefined);
    // Only a prompt that asked can be agreed to; a skipped match is never written.
    if (pending?.action !== 'confirm') return;
    const { resultIndex, result, usfmToInsert } = pending;
    if (resultsRef.current[resultIndex] !== result) return;
    await runReplace(resultIndex, result, usfmToInsert, { allowMarkerDeletion: true });
  }, [pending, resultsRef, runReplace]);

  // What the prompt shows has to still be what Replace would act on, so it closes once that result
  // is gone from the list or Replace is no longer on offer, including when the project becomes
  // read-only. A new search empties the list, so one started while the prompt is open (by the scope
  // moving with the editor, for example) closes it. An edit to the text does not: the web view holds
  // the re-search it calls for until the prompt closes (see `isPromptOpen`).
  //
  // Hidden case: runs while the tab is inactive, deliberately. The project can become read-only
  // while the tab is hidden, and answering a prompt about a list that no longer holds the match, or
  // a Replace that is no longer on offer, means nothing. Nothing is written, so the user finds the
  // prompt gone and the result, if it still matches, ready to Replace again.
  useEffect(() => {
    if (!pending) return;
    if (!canReplace || results[pending.resultIndex] !== pending.result) setPending(undefined);
  }, [canReplace, pending, results]);

  const promptProps = useMemo<ReplaceMarkersPromptProps>(
    () => ({
      action: pending?.action,
      matchedUsfm: pending?.result.matchedUsfm ?? '',
      replacementUsfm: pending?.usfmToInsert ?? '',
      skippedMessage:
        pending && pending.action !== 'confirm'
          ? buildSkippedMatchMessage(
              pending.action,
              pending.result,
              localizedStrings,
              localizedBookData,
            )
          : '',
      focusReturnCandidates: pending?.focusReturnCandidates ?? [],
      localizedStrings,
      onDismiss: handleDismiss,
      onConfirm: handleConfirm,
    }),
    [handleConfirm, handleDismiss, localizedBookData, localizedStrings, pending],
  );

  return { replaceOrAsk, isPromptOpen: pending !== undefined, promptProps };
}
