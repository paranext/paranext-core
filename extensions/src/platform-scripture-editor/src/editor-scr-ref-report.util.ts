import { SerializedVerseRef } from '@sillsdev/scripture';

/**
 * What the Scripture editor web view does with a reference the engine reports through its
 * `onScrRefChange`: hands the report to `useScrollToRange`, then moves the web view's own reference
 * to it without scrolling.
 *
 * Every report goes to the hook, unfiltered. The hook tells a caret move — which cancels a pending
 * range jump — from the engine's book correction on mount — which does not — by comparing the
 * report with the reference the web view is rendering; `setScrRef` only changes that on a later
 * render, so the comparison sees the reference the report arrived against.
 *
 * @param reported The reference the engine reported
 * @param currentVersificationStr The web view's current versification, kept when the report carries
 *   none. Against platform-editor 0.8.15 every report carries the host's own, so this is cheap
 *   insurance in case that contract changes — versions before 0.8.15 reported positions without
 *   it.
 * @param onEditorScrRefChange `useScrollToRange`'s handler for the report
 * @param setScrRef Moves the web view's reference without scrolling the editor to it
 * @returns The reference the web view moved to
 */
export function applyEditorScrRefReport(
  reported: SerializedVerseRef,
  {
    currentVersificationStr,
    onEditorScrRefChange,
    setScrRef,
  }: {
    currentVersificationStr: string | undefined;
    onEditorScrRefChange: (reported: SerializedVerseRef) => void;
    setScrRef: (scrRef: SerializedVerseRef) => void;
  },
): SerializedVerseRef {
  onEditorScrRefChange(reported);
  const preserved: SerializedVerseRef = {
    ...reported,
    versificationStr: reported.versificationStr ?? currentVersificationStr,
  };
  setScrRef(preserved);
  return preserved;
}
