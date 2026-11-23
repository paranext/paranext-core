// @vitest-environment jsdom

import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { HidableFindResult } from './search-result.component';
import {
  useMarkerReplacePrompt,
  UseMarkerReplacePromptOptions,
} from './use-marker-replace-prompt.hook';

function makeResult(matchedUsfm: string, removedMarkers?: string[]): HidableFindResult {
  const verseRef = { book: 'GEN', chapterNum: 1, verseNum: 3 };
  return {
    start: { verseRef, offset: 0 },
    end: { verseRef, offset: 10 },
    text: 'the Lord God',
    matchedUsfm,
    removedMarkers,
  };
}

/** A match holding a whole `\nd` span, which a replacement of `X` deletes. */
const WHOLE_SPAN = makeResult('the \\nd Lord\\nd* God', ['nd', 'nd*']);
/** A match holding only the closer of a `\nd` span. */
const ONE_ENDED = makeResult('Lord\\nd* God', ['nd*']);
/** A match with no markers in it. */
const PLAIN = makeResult('the Lord God');

const SKIPPED_ONE_ENDED = '{reference}: only part of a marker';
const STRINGS = { '%webView_find_replace_skippedOneEndedMarker%': SKIPPED_ONE_ENDED };

type Props = Pick<UseMarkerReplacePromptOptions, 'results' | 'canReplace'>;

function renderPrompt(initialProps: Props) {
  const runReplace = vi.fn<UseMarkerReplacePromptOptions['runReplace']>(async () => {});
  const resultsRef = { current: initialProps.results };
  const { result, rerender } = renderHook(
    ({ results, canReplace }: Props) => {
      resultsRef.current = results;
      return useMarkerReplacePrompt({
        results,
        resultsRef,
        isStructureProtected: false,
        canReplace,
        runReplace,
        localizedStrings: STRINGS,
        localizedBookData: new Map(),
      });
    },
    { initialProps },
  );
  return { runReplace, result, setProps: (props: Props) => rerender(props) };
}

afterEach(() => {
  document.body.innerHTML = '';
});

describe('useMarkerReplacePrompt', () => {
  it('replaces at once, without asking, when the match deletes no marker', async () => {
    const { result, runReplace } = renderPrompt({ results: [PLAIN], canReplace: true });

    await act(() => result.current.replaceOrAsk(0, PLAIN, 'X'));

    expect(runReplace).toHaveBeenCalledWith(0, PLAIN, 'X');
    expect(result.current.isPromptOpen).toBe(false);
  });

  it('asks before deleting markers, and writes nothing until the user confirms', async () => {
    const { result, runReplace } = renderPrompt({ results: [WHOLE_SPAN], canReplace: true });

    await act(() => result.current.replaceOrAsk(0, WHOLE_SPAN, 'X'));

    expect(runReplace).not.toHaveBeenCalled();
    expect(result.current.isPromptOpen).toBe(true);
    expect(result.current.promptProps).toMatchObject({
      action: 'confirm',
      matchedUsfm: WHOLE_SPAN.matchedUsfm,
      replacementUsfm: 'X',
    });

    await act(async () => result.current.promptProps.onConfirm());

    expect(runReplace).toHaveBeenCalledWith(0, WHOLE_SPAN, 'X', { allowMarkerDeletion: true });
    expect(result.current.isPromptOpen).toBe(false);
  });

  it('writes nothing when the user dismisses the prompt', async () => {
    const { result, runReplace } = renderPrompt({ results: [WHOLE_SPAN], canReplace: true });
    await act(() => result.current.replaceOrAsk(0, WHOLE_SPAN, 'X'));

    act(() => result.current.promptProps.onDismiss());

    expect(result.current.isPromptOpen).toBe(false);
    expect(runReplace).not.toHaveBeenCalled();
  });

  it('tells the user a one-ended match is skipped, and never writes it', async () => {
    const { result, runReplace } = renderPrompt({ results: [ONE_ENDED], canReplace: true });

    await act(() => result.current.replaceOrAsk(0, ONE_ENDED, 'X'));

    expect(result.current.promptProps.action).toBe('oneEndedMarker');
    expect(result.current.promptProps.skippedMessage).toBe('GEN 1:3: only part of a marker');
    await act(async () => result.current.promptProps.onConfirm());
    expect(runReplace).not.toHaveBeenCalled();
  });

  it('takes where focus goes back to when Replace opens the prompt', async () => {
    const opener = document.createElement('button');
    document.body.appendChild(opener);
    opener.focus();
    const { result } = renderPrompt({ results: [WHOLE_SPAN], canReplace: true });

    await act(() => result.current.replaceOrAsk(0, WHOLE_SPAN, 'X'));

    expect(result.current.promptProps.focusReturnCandidates[0]).toBe(opener);
  });

  it('writes nothing on a confirm once the result is no longer the one the user saw', async () => {
    const { result, runReplace, setProps } = renderPrompt({
      results: [WHOLE_SPAN],
      canReplace: true,
    });
    await act(() => result.current.replaceOrAsk(0, WHOLE_SPAN, 'X'));
    const { onConfirm } = result.current.promptProps;

    // A new search lands between the prompt's last render and the click.
    setProps({ results: [{ ...WHOLE_SPAN }], canReplace: true });
    await act(async () => onConfirm());

    expect(runReplace).not.toHaveBeenCalled();
  });

  it.each([
    ['its result leaves the list', { results: [], canReplace: true }],
    ['Replace is no longer on offer', { results: [WHOLE_SPAN], canReplace: false }],
  ])('closes when %s', async (_case, nextProps: Props) => {
    const { result, setProps } = renderPrompt({ results: [WHOLE_SPAN], canReplace: true });
    await act(() => result.current.replaceOrAsk(0, WHOLE_SPAN, 'X'));

    setProps(nextProps);

    expect(result.current.isPromptOpen).toBe(false);
  });

  it('stays open while its result is still in the list and Replace is on offer', async () => {
    const { result, setProps } = renderPrompt({ results: [WHOLE_SPAN], canReplace: true });
    await act(() => result.current.replaceOrAsk(0, WHOLE_SPAN, 'X'));

    setProps({ results: [WHOLE_SPAN, PLAIN], canReplace: true });

    expect(result.current.isPromptOpen).toBe(true);
  });
});
