import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { newPlatformError } from 'platform-bible-utils';
import { FindJobStatusReport } from 'platform-scripture';
import {
  applyPreserveCase,
  armBoundedWait,
  buildFindOptions,
  buildSearchRegex,
  callControllerSafely,
  CharacterCategorizer,
  classifyPollAttempt,
  gateStartSearch,
  isDifferentProjectSelection,
  isFindQueryValid,
  isSimpleInterfaceMode,
  MAX_CONSECUTIVE_POLL_MISSES,
  nextPollMissState,
  OpenScrollGroupTab,
  prunePresentBookIds,
  resolveScrollGroupForPickedProject,
  resolveSelectedProjectScrollGroup,
  shouldClearResultsForInvalidQuery,
} from './find.utils';

/** Default character categorizer matching the project-settings defaults used in production */
const DEFAULT_CATEGORIZER: CharacterCategorizer = {
  baseCharacterClassRegex: '\\p{Lu}\\p{Ll}\\p{Lt}\\p{Lo}\\p{Cn}',
  diacriticCharacterClassRegex: '\\p{Mn}\\p{Mc}\\p{Lm}',
  wordMedialCharacterRegex: '',
  wordBreakRegex: '\\s+',
  allowInvisibleCharacters: false,
};

function matchAll(regex: RegExp, text: string): string[] {
  return [...text.matchAll(regex)].map((m) => m[0]);
}

describe('applyPreserveCase', () => {
  it('returns ALL CAPS replacement when matched text is all-caps', () => {
    expect(applyPreserveCase('HELLO', 'world')).toBe('WORLD');
  });

  it('returns Title Case replacement when matched text starts with a capital', () => {
    expect(applyPreserveCase('Hello', 'world')).toBe('World');
  });

  it('returns replacement as-is when matched text is lowercase', () => {
    expect(applyPreserveCase('hello', 'world')).toBe('world');
  });

  it('returns replacement as-is when matched text is mixed case (neither all-caps nor title-case)', () => {
    expect(applyPreserveCase('hEllo', 'world')).toBe('world');
  });

  it('returns replacement unchanged when replacementText is empty', () => {
    expect(applyPreserveCase('HELLO', '')).toBe('');
  });

  it('returns replacement unchanged when matchedText is empty', () => {
    expect(applyPreserveCase('', 'world')).toBe('world');
  });

  it('does not treat a string of digits as all-caps (no case distinction)', () => {
    // "123" toUpperCase === "123" and toLowerCase === "123", so the all-caps branch
    // requires matchedText !== matchedText.toLowerCase() — digits should pass through
    expect(applyPreserveCase('123', 'replacement')).toBe('replacement');
  });

  it('does not treat a punctuation-only match as all-caps', () => {
    expect(applyPreserveCase('!!!', 'world')).toBe('world');
  });

  it('title-cases a multi-word replacement when match starts with a capital', () => {
    expect(applyPreserveCase('Hello', 'foo bar')).toBe('Foo bar');
  });

  it('upper-cases a multi-word replacement when match is all-caps', () => {
    expect(applyPreserveCase('FOO BAR', 'hello world')).toBe('HELLO WORLD');
  });
});

describe('isSimpleInterfaceMode', () => {
  it('returns false for the definitive power mode so replace stays available', () => {
    expect(isSimpleInterfaceMode('power')).toBe(false);
  });

  it('returns true for simple mode so the replace toggle is hidden', () => {
    expect(isSimpleInterfaceMode('simple')).toBe(true);
  });

  it('fails safe to simple (true) when the setting is a PlatformError (loading/errored)', () => {
    expect(isSimpleInterfaceMode(newPlatformError('interface mode unavailable'))).toBe(true);
  });
});

describe('buildSearchRegex – regex mode (useRegex)', () => {
  it('passes special characters through as-is without escaping them', () => {
    const regex = buildSearchRegex(
      { searchString: '[aeiou]+', caseInsensitive: false, wordRestriction: 'none', useRegex: true },
      DEFAULT_CATEGORIZER,
    );
    expect(matchAll(regex, 'hello world')).toEqual(['e', 'o', 'o']);
  });

  it('applies the case-insensitive flag in regex mode when caseInsensitive is true', () => {
    const regex = buildSearchRegex(
      { searchString: 'hello', caseInsensitive: true, wordRestriction: 'none', useRegex: true },
      DEFAULT_CATEGORIZER,
    );
    expect(matchAll(regex, 'Hello HELLO hello')).toEqual(['Hello', 'HELLO', 'hello']);
  });

  it('does not apply ignoreDiacritics when useRegex is true (user pattern used as-is)', () => {
    const regex = buildSearchRegex(
      {
        searchString: 'e',
        caseInsensitive: false,
        wordRestriction: 'none',
        useRegex: true,
        ignoreDiacritics: true,
      },
      DEFAULT_CATEGORIZER,
    );
    // In regex mode, ignoreDiacritics is not applied — only the base 'e' is matched,
    // not the full NFD sequence 'e\u0301'. Use 'abc' as surrounding text to avoid a
    // second 'e' that would inflate the match count.
    expect(matchAll(regex, 'e\u0301 abc')).toEqual(['e']);
  });

  it('supports regex groups and alternation in the search string', () => {
    const regex = buildSearchRegex(
      {
        searchString: 'son (of|the)',
        caseInsensitive: false,
        wordRestriction: 'none',
        useRegex: true,
      },
      DEFAULT_CATEGORIZER,
    );
    expect(matchAll(regex, 'son of David son the father')).toEqual(['son of', 'son the']);
  });
});

describe('buildSearchRegex – ignoreDiacritics', () => {
  it('extends the match to include a combining diacritic after the base character', () => {
    const regex = buildSearchRegex(
      {
        searchString: 'e',
        caseInsensitive: false,
        wordRestriction: 'none',
        ignoreDiacritics: true,
      },
      DEFAULT_CATEGORIZER,
    );
    // 'e\u0301' is the NFD-encoded form of 'é' — the regex should consume the combining mark
    expect(matchAll(regex, 'e\u0301')).toEqual(['e\u0301']);
  });

  it('does not extend the match to a combining diacritic when ignoreDiacritics is false', () => {
    const regex = buildSearchRegex(
      {
        searchString: 'e',
        caseInsensitive: false,
        wordRestriction: 'none',
        ignoreDiacritics: false,
      },
      DEFAULT_CATEGORIZER,
    );
    // Without ignoreDiacritics, the match is exactly 'e' — the combining mark is left over
    expect(matchAll(regex, 'e\u0301')).toEqual(['e']);
  });

  it('skips diacritics in the search string so an accented search term matches plain text', () => {
    // NFC 'é' (U+00E9) decomposes to 'e' + combining acute in NFD; the combining mark is
    // stripped from the search pattern, leaving a pattern that matches bare 'cafe'
    const regex = buildSearchRegex(
      {
        searchString: 'caf\u00e9',
        caseInsensitive: false,
        wordRestriction: 'none',
        ignoreDiacritics: true,
      },
      DEFAULT_CATEGORIZER,
    );
    expect(matchAll(regex, 'cafe')).toEqual(['cafe']);
  });
});

describe('buildSearchRegex – ignoreWhitespaceDifferences', () => {
  it('matches when the search has more spaces than the text', () => {
    const regex = buildSearchRegex(
      {
        searchString: 'hello  world',
        caseInsensitive: false,
        wordRestriction: 'none',
        ignoreWhitespaceDifferences: true,
      },
      DEFAULT_CATEGORIZER,
    );
    expect(matchAll(regex, 'hello world')).toEqual(['hello world']);
  });

  it('matches a non-breaking space in the text when the search term has a regular space', () => {
    const regex = buildSearchRegex(
      {
        searchString: 'hello world',
        caseInsensitive: false,
        wordRestriction: 'none',
        ignoreWhitespaceDifferences: true,
      },
      DEFAULT_CATEGORIZER,
    );
    // \u00a0 is NBSP, which is in the selectable whitespace character class
    expect(matchAll(regex, 'hello\u00a0world')).toEqual(['hello\u00a0world']);
  });

  it('requires an exact space match when ignoreWhitespaceDifferences is false', () => {
    const regex = buildSearchRegex(
      {
        searchString: 'hello world',
        caseInsensitive: false,
        wordRestriction: 'none',
        ignoreWhitespaceDifferences: false,
      },
      DEFAULT_CATEGORIZER,
    );
    // 'hello  world' has two spaces, but the pattern is 'hello world' (one space) — no match
    expect(matchAll(regex, 'hello  world')).toEqual([]);
  });
});

describe('buildSearchRegex – CJK single-character words', () => {
  it('matches a CJK character inside a word even with wholeWord restriction', () => {
    const regex = buildSearchRegex(
      {
        searchString: '\u4e2d', // '中', code point 0x4E2D — in single-char-word range
        caseInsensitive: false,
        wordRestriction: 'wholeWord',
      },
      DEFAULT_CATEGORIZER,
    );
    // Single-character-word scripts bypass word-boundary assertions entirely
    expect(matchAll(regex, 'test\u4e2dtest')).toEqual(['\u4e2d']);
  });

  it('matches a Hiragana character inside a word even with startOfWord restriction', () => {
    const regex = buildSearchRegex(
      {
        searchString: '\u3042', // 'あ', Hiragana — in single-char-word range
        caseInsensitive: false,
        wordRestriction: 'startOfWord',
      },
      DEFAULT_CATEGORIZER,
    );
    expect(matchAll(regex, 'test\u3042test')).toEqual(['\u3042']);
  });
});

describe('buildSearchRegex – word restrictions', () => {
  it('does not match a substring embedded inside a longer word when wholeWord is set', () => {
    const regex = buildSearchRegex(
      { searchString: 'he', caseInsensitive: false, wordRestriction: 'wholeWord' },
      DEFAULT_CATEGORIZER,
    );
    // 'he' inside 'them' (he-m) and inside 'the' (t-he) must not match
    expect(matchAll(regex, 'them the')).toEqual([]);
  });

  it('matches a standalone word when wholeWord is set', () => {
    const regex = buildSearchRegex(
      { searchString: 'he', caseInsensitive: false, wordRestriction: 'wholeWord' },
      DEFAULT_CATEGORIZER,
    );
    expect(matchAll(regex, 'he said he would')).toEqual(['he', 'he']);
  });

  it('matches the term at the start of a word when startOfWord is set', () => {
    const regex = buildSearchRegex(
      { searchString: 'pre', caseInsensitive: false, wordRestriction: 'startOfWord' },
      DEFAULT_CATEGORIZER,
    );
    expect(matchAll(regex, 'preview preview')).toEqual(['pre', 'pre']);
  });

  it('does not match when the term appears only at the end of a word and startOfWord is set', () => {
    const regex = buildSearchRegex(
      { searchString: 'ting', caseInsensitive: false, wordRestriction: 'startOfWord' },
      DEFAULT_CATEGORIZER,
    );
    // 'ting' is at the end of 'testing', not the start
    expect(matchAll(regex, 'testing')).toEqual([]);
  });

  it('matches the term at the end of a word when endOfWord is set', () => {
    const regex = buildSearchRegex(
      { searchString: 'ing', caseInsensitive: false, wordRestriction: 'endOfWord' },
      DEFAULT_CATEGORIZER,
    );
    expect(matchAll(regex, 'testing running')).toEqual(['ing', 'ing']);
  });

  it('does not match when the term appears only at the start of a word and endOfWord is set', () => {
    const regex = buildSearchRegex(
      { searchString: 'pre', caseInsensitive: false, wordRestriction: 'endOfWord' },
      DEFAULT_CATEGORIZER,
    );
    // 'pre' is at the start of 'preview', not the end
    expect(matchAll(regex, 'preview')).toEqual([]);
  });
});

describe('buildSearchRegex – trailing space', () => {
  it('matches a word followed by a space', () => {
    const regex = buildSearchRegex(
      { searchString: 'the ', caseInsensitive: true, wordRestriction: 'none' },
      DEFAULT_CATEGORIZER,
    );
    expect(matchAll(regex, 'the book of the genealogy')).toEqual(['the ', 'the ']);
  });

  it('does not match a word followed by punctuation instead of a space', () => {
    const regex = buildSearchRegex(
      { searchString: 'word ', caseInsensitive: false, wordRestriction: 'none' },
      DEFAULT_CATEGORIZER,
    );
    // "word," has a comma, not a space — must not match
    expect(matchAll(regex, 'This is a word, and another word.')).toEqual([]);
  });

  it('does not match a word at the end of text when trailing space is required', () => {
    const regex = buildSearchRegex(
      { searchString: 'word ', caseInsensitive: false, wordRestriction: 'none' },
      DEFAULT_CATEGORIZER,
    );
    expect(matchAll(regex, 'the last word')).toEqual([]);
  });

  it('matches the word only at positions actually followed by a space', () => {
    const regex = buildSearchRegex(
      { searchString: 'son ', caseInsensitive: false, wordRestriction: 'none' },
      DEFAULT_CATEGORIZER,
    );
    // "son of David" → "son " matches; "son of Abraham." → "son " matches;
    // "son." never appears so only space-followed occurrences should appear
    const matches = matchAll(regex, 'the son of David, the son of Abraham.');
    expect(matches).toEqual(['son ', 'son ']);
  });

  it('does not match a word followed by a comma even when that word also appears with a space elsewhere', () => {
    const regex = buildSearchRegex(
      { searchString: 'father ', caseInsensitive: false, wordRestriction: 'none' },
      DEFAULT_CATEGORIZER,
    );
    // "father," should not be matched; "father of" should be matched
    const text = 'the father of Isaac, and the father, said';
    const matches = matchAll(regex, text);
    expect(matches).toEqual(['father ']);
    expect(matches).not.toContain('father,');
  });

  it('is case-insensitive when requested and still requires the trailing space', () => {
    const regex = buildSearchRegex(
      { searchString: 'The ', caseInsensitive: true, wordRestriction: 'none' },
      DEFAULT_CATEGORIZER,
    );
    const matches = matchAll(regex, 'the book of The genealogy');
    expect(matches.length).toBe(2);
    matches.forEach((m) => expect(m).toMatch(/ $/));
  });

  it('trailing space does not match a trailing period', () => {
    const regex = buildSearchRegex(
      { searchString: 'Abraham ', caseInsensitive: false, wordRestriction: 'none' },
      DEFAULT_CATEGORIZER,
    );
    // "Abraham." ends the sentence — no space follows
    expect(matchAll(regex, 'the son of Abraham.')).toEqual([]);
  });
});

describe('nextPollMissState', () => {
  it('does not exceed the retry limit on the first miss', () => {
    const result = nextPollMissState(0);
    expect(result).toEqual({ consecutiveMisses: 1, hasExceededRetryLimit: false });
  });

  it('increments the miss count on each successive call', () => {
    expect(nextPollMissState(1)).toEqual({ consecutiveMisses: 2, hasExceededRetryLimit: false });
    expect(nextPollMissState(2)).toEqual({ consecutiveMisses: 3, hasExceededRetryLimit: false });
  });

  it('has not exceeded the retry limit one miss below the threshold', () => {
    const result = nextPollMissState(MAX_CONSECUTIVE_POLL_MISSES - 2);
    expect(result.consecutiveMisses).toBe(MAX_CONSECUTIVE_POLL_MISSES - 1);
    expect(result.hasExceededRetryLimit).toBe(false);
  });

  it('exceeds the retry limit once the miss count reaches the threshold', () => {
    const result = nextPollMissState(MAX_CONSECUTIVE_POLL_MISSES - 1);
    expect(result.consecutiveMisses).toBe(MAX_CONSECUTIVE_POLL_MISSES);
    expect(result.hasExceededRetryLimit).toBe(true);
  });
});

const FAKE_UPDATE: FindJobStatusReport = {
  jobId: 'job-1',
  status: 'running',
  percentComplete: 50,
  totalResultsCount: 3,
  totalExecutionTimeMs: 100,
};

describe('classifyPollAttempt', () => {
  it('classifies as noActiveJob without calling getUpdate, regardless of what it would return', async () => {
    const getUpdate = vi.fn(async () => FAKE_UPDATE);
    const outcome = await classifyPollAttempt({
      hasActiveJob: false,
      getUpdate,
      consecutiveMisses: 0,
    });
    expect(outcome).toEqual({ kind: 'noActiveJob' });
    expect(getUpdate).not.toHaveBeenCalled();
  });

  it('classifies as update when there is an active job and getUpdate resolves a report', async () => {
    const outcome = await classifyPollAttempt({
      hasActiveJob: true,
      getUpdate: async () => FAKE_UPDATE,
      consecutiveMisses: 3,
    });
    expect(outcome).toEqual({ kind: 'update', update: FAKE_UPDATE });
  });

  it('classifies as a miss — not noActiveJob — when there IS an active job but getUpdate resolves undefined', async () => {
    // Regression: a prior version conflated "no job to poll for" with "have a job, couldn't get an
    // update", which caused a false "search interrupted" error on every ordinary new search.
    const outcome = await classifyPollAttempt({
      hasActiveJob: true,
      getUpdate: async () => undefined,
      consecutiveMisses: 0,
    });
    expect(outcome).toEqual({ kind: 'miss', consecutiveMisses: 1, hasExceededRetryLimit: false });
  });

  it('reports hasExceededRetryLimit once consecutiveMisses reaches the threshold', async () => {
    const outcome = await classifyPollAttempt({
      hasActiveJob: true,
      getUpdate: async () => undefined,
      consecutiveMisses: MAX_CONSECUTIVE_POLL_MISSES - 1,
    });
    expect(outcome).toEqual({
      kind: 'miss',
      consecutiveMisses: MAX_CONSECUTIVE_POLL_MISSES,
      hasExceededRetryLimit: true,
    });
  });
});

describe('armBoundedWait', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('fires the callback once the delay elapses', () => {
    const onTimeout = vi.fn();
    armBoundedWait(onTimeout, 5000);
    expect(onTimeout).not.toHaveBeenCalled();
    vi.advanceTimersByTime(5000);
    expect(onTimeout).toHaveBeenCalledOnce();
  });

  it('does not fire the callback if cleared before the delay elapses', () => {
    const onTimeout = vi.fn();
    const { clear } = armBoundedWait(onTimeout, 5000);
    vi.advanceTimersByTime(4000);
    clear();
    vi.advanceTimersByTime(10_000);
    expect(onTimeout).not.toHaveBeenCalled();
  });
});

describe('isFindQueryValid', () => {
  it('is false for an empty (or whitespace-only) search term regardless of scope', () => {
    expect(isFindQueryValid({ searchTerm: '', scope: 'book', selectedBookIds: [] })).toBe(false);
    expect(isFindQueryValid({ searchTerm: '   ', scope: 'chapter', selectedBookIds: [] })).toBe(
      false,
    );
  });

  it('is true for a non-empty term in the chapter/book scopes, which need no book selection', () => {
    expect(isFindQueryValid({ searchTerm: 'God', scope: 'chapter', selectedBookIds: [] })).toBe(
      true,
    );
    expect(isFindQueryValid({ searchTerm: 'God', scope: 'book', selectedBookIds: [] })).toBe(true);
  });

  it('is false for the selectedBooks scope with no books selected, even with a non-empty term', () => {
    expect(
      isFindQueryValid({ searchTerm: 'God', scope: 'selectedBooks', selectedBookIds: [] }),
    ).toBe(false);
  });

  it('is true for the selectedBooks scope once at least one book is selected', () => {
    expect(
      isFindQueryValid({ searchTerm: 'God', scope: 'selectedBooks', selectedBookIds: ['GEN'] }),
    ).toBe(true);
  });
});

describe('gateStartSearch', () => {
  it('runs the search when the query is valid, the PDP is ready, and nothing else is starting', () => {
    expect(
      gateStartSearch({ isSearchQueryValid: true, hasPdp: true, isAlreadyStarting: false }),
    ).toEqual({ action: 'run' });
  });

  it('skips without retry when the query itself is invalid, regardless of PDP readiness', () => {
    expect(
      gateStartSearch({ isSearchQueryValid: false, hasPdp: true, isAlreadyStarting: false }),
    ).toEqual({ action: 'skip', shouldRetryWhenPdpReady: false });
    expect(
      gateStartSearch({ isSearchQueryValid: false, hasPdp: false, isAlreadyStarting: false }),
    ).toEqual({ action: 'skip', shouldRetryWhenPdpReady: false });
  });

  it('skips without retry when a search is already starting', () => {
    expect(
      gateStartSearch({ isSearchQueryValid: true, hasPdp: true, isAlreadyStarting: true }),
    ).toEqual({ action: 'skip', shouldRetryWhenPdpReady: false });
  });

  it('skips WITH retry when the query is valid but the data provider is not ready yet', () => {
    expect(
      gateStartSearch({ isSearchQueryValid: true, hasPdp: false, isAlreadyStarting: false }),
    ).toEqual({ action: 'skip', shouldRetryWhenPdpReady: true });
  });
});

describe('shouldClearResultsForInvalidQuery', () => {
  // THE REGRESSION THIS EXISTS FOR. Emptying the box with the keyboard (select-all + delete, or
  // backspacing) only changes the term: the auto-search that follows is gated off as an invalid
  // query, so the previous search's results stayed on screen with nothing in the box.
  it('clears when the query goes invalid while results are still showing', () => {
    expect(
      shouldClearResultsForInvalidQuery({
        isSearchQueryValid: false,
        hasResults: true,
        searchStatus: 'completed',
      }),
    ).toBe(true);
  });

  it('clears a search still in flight when the query goes invalid', () => {
    expect(
      shouldClearResultsForInvalidQuery({
        isSearchQueryValid: false,
        hasResults: false,
        searchStatus: 'running',
      }),
    ).toBe(true);
  });

  it('does nothing on an invalid query with nothing to clear, so mount does not fire it', () => {
    expect(
      shouldClearResultsForInvalidQuery({
        isSearchQueryValid: false,
        hasResults: false,
        searchStatus: undefined,
      }),
    ).toBe(false);
  });

  it('leaves results alone while the query is still valid', () => {
    expect(
      shouldClearResultsForInvalidQuery({
        isSearchQueryValid: true,
        hasResults: true,
        searchStatus: 'completed',
      }),
    ).toBe(false);
  });
});

describe('resolveSelectedProjectScrollGroup', () => {
  const tab = (
    projectId: string,
    scrollGroupId: number,
    webViewId: string,
  ): OpenScrollGroupTab => ({ projectId, scrollGroupId, webViewId });

  it('keeps the current selection unchanged when its tab is still open', () => {
    const openTabs = [tab('PROJ-A', 0, 'wv-1'), tab('PROJ-B', 1, 'wv-2')];
    expect(resolveSelectedProjectScrollGroup('PROJ-A', 0, openTabs, undefined)).toEqual({
      projectId: 'PROJ-A',
      scrollGroupId: 0,
    });
  });

  it('matches the open tab case-insensitively against the current project id', () => {
    const openTabs = [tab('proj-a', 0, 'wv-1')];
    expect(resolveSelectedProjectScrollGroup('PROJ-A', 0, openTabs, undefined)).toEqual({
      projectId: 'PROJ-A',
      scrollGroupId: 0,
    });
  });

  it('falls back to another open tab of the same project when the current pair closed', () => {
    const openTabs = [tab('PROJ-A', 1, 'wv-2')];
    expect(resolveSelectedProjectScrollGroup('PROJ-A', 0, openTabs, undefined)).toEqual({
      projectId: 'PROJ-A',
      scrollGroupId: 1,
    });
  });

  it('prefers the tab matching preferredWebViewId over other tabs of the same project', () => {
    const openTabs = [tab('PROJ-A', 1, 'wv-2'), tab('PROJ-A', 2, 'wv-3')];
    expect(resolveSelectedProjectScrollGroup('PROJ-A', 0, openTabs, 'wv-3')).toEqual({
      projectId: 'PROJ-A',
      scrollGroupId: 2,
    });
  });

  it('ignores preferredWebViewId when it belongs to a different project', () => {
    const openTabs = [tab('PROJ-A', 1, 'wv-2'), tab('PROJ-B', 2, 'wv-3')];
    expect(resolveSelectedProjectScrollGroup('PROJ-A', 0, openTabs, 'wv-3')).toEqual({
      projectId: 'PROJ-A',
      scrollGroupId: 1,
    });
  });

  it('resolves an initial (undefined) scroll group by preferring preferredWebViewId', () => {
    const openTabs = [tab('PROJ-A', 0, 'wv-1'), tab('PROJ-A', 1, 'wv-2')];
    expect(resolveSelectedProjectScrollGroup('PROJ-A', undefined, openTabs, 'wv-2')).toEqual({
      projectId: 'PROJ-A',
      scrollGroupId: 1,
    });
  });

  it('falls back to a different project entirely once the current project has no open tabs', () => {
    const openTabs = [tab('PROJ-B', 3, 'wv-9')];
    expect(resolveSelectedProjectScrollGroup('PROJ-A', 0, openTabs, undefined)).toEqual({
      projectId: 'PROJ-B',
      scrollGroupId: 3,
    });
  });

  it('returns undefined when no tabs are open anywhere', () => {
    expect(resolveSelectedProjectScrollGroup('PROJ-A', 0, [], undefined)).toBeUndefined();
  });

  // `openTabs` arrives in web-view-event arrival order (`[...tabsMap.values()]`), so picking
  // `openTabs[0]` made which project Find fell back to depend on event timing — two sessions with the
  // same tabs open could land on different projects. The fallback is ordered so it cannot drift.
  it('picks the SAME cross-project fallback regardless of the order tabs arrived in', () => {
    const tabs = [tab('PROJ-C', 2, 'wv-c'), tab('PROJ-B', 1, 'wv-b'), tab('PROJ-D', 1, 'wv-d')];
    const expected = { projectId: 'PROJ-B', scrollGroupId: 1 };

    expect(resolveSelectedProjectScrollGroup('PROJ-A', 0, tabs, undefined)).toEqual(expected);
    expect(resolveSelectedProjectScrollGroup('PROJ-A', 0, [...tabs].reverse(), undefined)).toEqual(
      expected,
    );
    expect(
      resolveSelectedProjectScrollGroup('PROJ-A', 0, [tabs[2], tabs[0], tabs[1]], undefined),
    ).toEqual(expected);
  });
});

describe('isDifferentProjectSelection', () => {
  it('reports a genuinely different project as a switch', () => {
    expect(isDifferentProjectSelection('PROJ-B', 'PROJ-A')).toBe(true);
  });

  it('reports the same project as NOT a switch', () => {
    expect(isDifferentProjectSelection('PROJ-A', 'PROJ-A')).toBe(false);
  });

  // The regression this guards: `useOpenProjectTabs` reports lowercased ids while canonical ids are
  // UPPERCASE, so the reassignment effect can hand back the same project in different casing. A
  // case-sensitive comparison treated that as a switch, which abandoned the running job, cleared the
  // results the user was reading, and started a second identical search.
  it('does NOT treat a casing-only correction of the same project as a switch', () => {
    expect(isDifferentProjectSelection('WEB', 'web')).toBe(false);
    expect(isDifferentProjectSelection('web', 'WEB')).toBe(false);
    expect(isDifferentProjectSelection('WeB', 'wEb')).toBe(false);
  });

  it('treats the initial selection (no current project) as a switch', () => {
    expect(isDifferentProjectSelection('PROJ-A', undefined)).toBe(true);
  });

  it('treats an empty current project id as a switch', () => {
    expect(isDifferentProjectSelection('PROJ-A', '')).toBe(true);
  });

  it('still distinguishes projects whose ids differ by more than casing', () => {
    expect(isDifferentProjectSelection('web', 'WEBBT')).toBe(true);
  });
});

describe('prunePresentBookIds', () => {
  it('removes books the project does not have', () => {
    expect(prunePresentBookIds(['GEN', 'EXO'], ['GEN', 'LEV', 'EXO'])).toEqual(['GEN', 'EXO']);
  });

  it('returns the ORIGINAL array reference when nothing needs removing', () => {
    // Identity, not just equality: the caller skips its state write on `!==`, which is what stops the
    // effect from re-triggering itself.
    const selectedBookIds = ['GEN', 'EXO'];
    expect(prunePresentBookIds(['GEN', 'EXO', 'LEV'], selectedBookIds)).toBe(selectedBookIds);
  });

  // The regression this guards: the project setting is still resolving after a switch, so the book
  // list is not known. Pruning against it would wipe the user's entire book selection rather than
  // narrowing it. "Not known yet" != "no books".
  it('leaves the selection untouched when the available books are not known yet', () => {
    const selectedBookIds = ['GEN', 'EXO'];
    expect(prunePresentBookIds(undefined, selectedBookIds)).toBe(selectedBookIds);
  });

  // The other half of that distinction: Find excludes extra material, so a project holding
  // nothing else has a genuinely empty searchable book list. Treating that as "not known yet" would
  // leave a stale selection live and searchable.
  it('empties the selection when the project has no searchable books at all', () => {
    expect(prunePresentBookIds([], ['GLO', 'FRT'])).toEqual([]);
  });

  it('empties the selection when the project genuinely shares no books with it', () => {
    expect(prunePresentBookIds(['MAT', 'MRK'], ['GEN', 'EXO'])).toEqual([]);
  });

  it('preserves the selection order rather than the available-books order', () => {
    expect(prunePresentBookIds(['GEN', 'EXO', 'LEV'], ['LEV', 'GEN'])).toEqual(['LEV', 'GEN']);
  });

  it('handles an empty selection', () => {
    const selectedBookIds: string[] = [];
    expect(prunePresentBookIds(['GEN'], selectedBookIds)).toBe(selectedBookIds);
  });

  it('is case-sensitive on book ids, which are canonical uppercase', () => {
    expect(prunePresentBookIds(['GEN'], ['gen'])).toEqual([]);
  });
});

describe('callControllerSafely', () => {
  it('invokes the call and reports nothing when the controller is healthy', async () => {
    const call = vi.fn(async () => 'ok');
    const onError = vi.fn();
    callControllerSafely(call, onError);
    await vi.waitFor(() => expect(call).toHaveBeenCalledTimes(1));
    expect(onError).not.toHaveBeenCalled();
  });

  it('swallows a rejected call and reports the reason', async () => {
    const reason = new Error('network gone');
    const onError = vi.fn();
    expect(() => callControllerSafely(() => Promise.reject(reason), onError)).not.toThrow();
    await vi.waitFor(() => expect(onError).toHaveBeenCalledWith(reason));
  });

  // The regression this guards, reproduced with a REAL revoked proxy — exactly what disposing a
  // network object does to a web-view controller. Reading the method off it throws SYNCHRONOUSLY, so
  // the previous `controller?.method(...).catch(() => {})` shape could not contain it: `.catch` only
  // sees rejections. That uncaught TypeError crashed the Find web view whenever the selected
  // project's editor tab closed and the annotation-cleanup effect fired on the disposed controller.
  it('swallows the SYNCHRONOUS throw from reading a method off a revoked proxy', () => {
    const { proxy, revoke } = Proxy.revocable<{ runAnnotationAction: () => Promise<void> }>(
      { runAnnotationAction: async () => {} },
      {},
    );
    revoke();
    const onError = vi.fn();

    expect(() => callControllerSafely(() => proxy.runAnnotationAction(), onError)).not.toThrow();
    expect(onError).toHaveBeenCalledTimes(1);
    expect(String(onError.mock.calls[0][0])).toContain('revoked');
  });

  it('does not throw on a revoked proxy even with no error handler supplied', () => {
    const { proxy, revoke } = Proxy.revocable<{ runAnnotationAction: () => Promise<void> }>(
      { runAnnotationAction: async () => {} },
      {},
    );
    revoke();

    expect(() => callControllerSafely(() => proxy.runAnnotationAction())).not.toThrow();
  });

  it('tolerates a call that returns undefined rather than a promise', () => {
    const onError = vi.fn();
    expect(() => callControllerSafely(() => undefined, onError)).not.toThrow();
    expect(onError).not.toHaveBeenCalled();
  });
});

describe('resolveScrollGroupForPickedProject', () => {
  const tab = (
    projectId: string,
    scrollGroupId: number,
    webViewId: string,
  ): OpenScrollGroupTab => ({ projectId, scrollGroupId, webViewId });

  // The regression this pins: the simple-mode picker reports only a project id, so re-picking the
  // project Find is ALREADY on must not move which of its tabs Find targets. Resolving with an
  // undefined current group skipped straight to "the project's first tab" and silently moved
  // Find from group 1 to group 0.
  it('keeps the tab Find already targets when the same project is picked again', () => {
    const openTabs = [tab('PROJ-A', 0, 'wv-1'), tab('PROJ-A', 1, 'wv-2')];
    expect(resolveScrollGroupForPickedProject('PROJ-A', 1, openTabs, undefined)).toEqual({
      projectId: 'PROJ-A',
      scrollGroupId: 1,
    });
  });

  // `openTabs` arrives as `[...tabsMap.values()]` — web-view-event arrival order. Two sessions with
  // the same tabs open must resolve identically, so the result cannot depend on that order.
  it('resolves identically no matter what order the open tabs arrive in', () => {
    const tabs = [tab('PROJ-A', 0, 'wv-1'), tab('PROJ-A', 1, 'wv-2'), tab('PROJ-B', 2, 'wv-3')];
    const expected = { projectId: 'PROJ-A', scrollGroupId: 1 };
    expect(resolveScrollGroupForPickedProject('PROJ-A', 1, tabs, undefined)).toEqual(expected);
    expect(resolveScrollGroupForPickedProject('PROJ-A', 1, [...tabs].reverse(), undefined)).toEqual(
      expected,
    );
  });

  // Matches what `projectScrollGroup` mode does for a not-open-project row: the newly picked
  // project lands in the group the user was already reading in.
  it('inherits the current scroll group when the newly picked project has a tab there', () => {
    const openTabs = [tab('PROJ-A', 2, 'wv-1'), tab('PROJ-B', 2, 'wv-2'), tab('PROJ-B', 5, 'wv-3')];
    expect(resolveScrollGroupForPickedProject('PROJ-B', 2, openTabs, undefined)).toEqual({
      projectId: 'PROJ-B',
      scrollGroupId: 2,
    });
  });

  it('prefers the tab shown in the triggering editor when the current group has none', () => {
    const openTabs = [tab('PROJ-A', 0, 'wv-1'), tab('PROJ-B', 4, 'wv-2'), tab('PROJ-B', 7, 'wv-3')];
    expect(resolveScrollGroupForPickedProject('PROJ-B', 0, openTabs, 'wv-3')).toEqual({
      projectId: 'PROJ-B',
      scrollGroupId: 7,
    });
  });

  it('falls back to the picked project’s own tab when neither the group nor the editor matches', () => {
    const openTabs = [tab('PROJ-A', 0, 'wv-1'), tab('PROJ-B', 4, 'wv-2')];
    expect(resolveScrollGroupForPickedProject('PROJ-B', 0, openTabs, 'wv-1')).toEqual({
      projectId: 'PROJ-B',
      scrollGroupId: 4,
    });
  });

  it('matches the picked project case-insensitively', () => {
    const openTabs = [tab('proj-a', 3, 'wv-1')];
    expect(resolveScrollGroupForPickedProject('PROJ-A', undefined, openTabs, undefined)).toEqual({
      projectId: 'PROJ-A',
      scrollGroupId: 3,
    });
  });

  // The wrapped resolver falls back to ANOTHER open project when the picked one has no tab left.
  // That is right for the reassignment effect but wrong for a click: it would retarget Find at a
  // project the user did not pick. Rejecting it here leaves the reassignment effect to choose.
  it('returns undefined rather than retargeting a project the user did not pick', () => {
    const openTabs = [tab('PROJ-B', 3, 'wv-9')];
    expect(resolveScrollGroupForPickedProject('PROJ-A', 0, openTabs, undefined)).toBeUndefined();
  });

  it('returns undefined when no tabs are open anywhere', () => {
    expect(resolveScrollGroupForPickedProject('PROJ-A', 0, [], undefined)).toBeUndefined();
  });
});

describe('buildFindOptions', () => {
  const BASE_ARGS = {
    searchTerm: 'beginning',
    findScope: [{ bookId: 'MAT', chapter: 1 }],
    shouldMatchCase: false,
    isRegexAllowed: false,
    searchTextType: 'all',
    wordRestriction: 'none',
  } as const;

  // Saved USFM can never contain consecutive spaces — ParatextData regularizes runs of whitespace
  // to a single space on every write — so a query typed with extra spaces would otherwise be
  // unsatisfiable. Find always forgives whitespace differences to keep such queries meaningful.
  it('always ignores whitespace differences', () => {
    expect(buildFindOptions(BASE_ARGS).ignoreWhitespaceDifferences).toBe(true);
  });

  it('ignores whitespace differences even in regex mode, where the engine treats it as a no-op', () => {
    expect(
      buildFindOptions({ ...BASE_ARGS, isRegexAllowed: true }).ignoreWhitespaceDifferences,
    ).toBe(true);
  });

  it('passes the search term and scope through unchanged', () => {
    const options = buildFindOptions({ ...BASE_ARGS, searchTerm: '   beginning    ' });
    expect(options.searchString).toBe('   beginning    ');
    expect(options.scope).toEqual([{ bookId: 'MAT', chapter: 1 }]);
  });

  it('inverts shouldMatchCase into caseInsensitive', () => {
    expect(buildFindOptions({ ...BASE_ARGS, shouldMatchCase: true }).caseInsensitive).toBe(false);
    expect(buildFindOptions({ ...BASE_ARGS, shouldMatchCase: false }).caseInsensitive).toBe(true);
  });

  it('maps searchTextType to verseTextOnly', () => {
    expect(buildFindOptions({ ...BASE_ARGS, searchTextType: 'verseOnly' }).verseTextOnly).toBe(
      true,
    );
    expect(buildFindOptions({ ...BASE_ARGS, searchTextType: 'all' }).verseTextOnly).toBe(false);
  });

  it('passes useRegex and wordRestriction through', () => {
    const options = buildFindOptions({
      ...BASE_ARGS,
      isRegexAllowed: true,
      wordRestriction: 'wholeWord',
    });
    expect(options.useRegex).toBe(true);
    expect(options.wordRestriction).toBe('wholeWord');
  });
});
