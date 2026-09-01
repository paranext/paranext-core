// @vitest-environment jsdom
import { afterEach, describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { Usj } from '@eten-tech-foundation/scripture-utilities';
import { Canon } from '@sillsdev/scripture';
import type { DblResourceData } from 'platform-bible-utils';
import type { EffectiveResourceReferenceList } from 'platform-scripture';
import type { EffectiveResourceReferenceListState } from './use-effective-resource-reference-list.hook';
import {
  RESOURCE_TEXT_EDITOR_CONTAINER_TEST_ID,
  ResourceTextPanel,
  ResourceTextPanelProps,
} from './resource-text-panel.component';

/**
 * Records every `setUsj` the panel pushes into the editor, across editor instances.
 *
 * Shared rather than created per instance because the panel UNMOUNTS `Editorial` to show a message
 * and remounts it on the way back to content — a fresh editor holds nothing, so what the tests
 * below need to see is whether the panel re-fed it. A per-instance spy nobody captures makes "the
 * editor is on screen" the only observable fact, which a permanently blank editor also satisfies.
 */
const setUsjSpy = vi.fn();

vi.mock('@eten-tech-foundation/platform-editor', () => ({
  Editorial: React.forwardRef((_props: Record<string, unknown>, ref: React.Ref<unknown>) => {
    React.useImperativeHandle(ref, () => ({ setUsj: setUsjSpy }));
    return <div data-testid="editorial" />;
  }),
}));
vi.mock('platform-bible-react', async (importOriginal) => {
  const original = await importOriginal<typeof import('platform-bible-react')>();
  return {
    ...original,
    useExtraValidMarkers: () => [],
  };
});

const BIBLE_TEXT_MISSING_BOOK = 'This book does not exist in this Bible text.';
const COMMENTARY_MISSING_BOOK = 'This book does not exist in this commentary.';
const BLANK_CHAPTER = 'This chapter is empty in this resource.';
const TEXT_UNAVAILABLE = 'This text could not be loaded.';

const STRINGS = {
  '%webView_platformScriptureEditor_emptyChapter_messageResource%': BLANK_CHAPTER,
  '%webView_resourcePanel_noProject%': 'No project.',
  '%webView_resourcePanel_installing%': 'Installing resource…',
  '%webView_resourcePanel_selecting%': 'Selecting resource…',
  '%webView_resourcePanel_installFailed%': "The resource couldn't be installed.",
  '%webView_resourcePanel_installFailedOffline%':
    "The resource couldn't be installed. Check your connection and try again.",
  '%webView_resourcePanel_retry%': 'Try again',
  '%webView_resourcePanel_settingsUnavailable%': "Couldn't load your resources.",
  '%webView_resourcePanel_loading%': 'Loading…',
  '%webView_resourcePanel_catalogUnavailable%': "Couldn't load the list of available resources.",
  '%webView_resourcePanel_downloadResources%': 'Download resources…',
  '%webView_resourcePanel_textUnavailable%': TEXT_UNAVAILABLE,
  '%webView_resourcePanel_bibleTexts_bookNotAvailable%': BIBLE_TEXT_MISSING_BOOK,
  '%webView_resourcePanel_commentaries_bookNotAvailable%': COMMENTARY_MISSING_BOOK,
};

const RESOURCE_PROJECT_ID = 'project-web';

const INSTALLED_RESOURCE: DblResourceData = {
  dblEntryUid: 'uid-web',
  displayName: 'WEB',
  fullName: 'World English Bible',
  bestLanguageName: 'English',
  type: 'ScriptureResource',
  size: 1200,
  installed: true,
  updateAvailable: false,
  projectId: RESOURCE_PROJECT_ID,
};

const INSTALLED_COMMENTARY: DblResourceData = {
  ...INSTALLED_RESOURCE,
  dblEntryUid: 'uid-hbk',
  displayName: 'HBKENG',
  type: 'EnhancedResource',
};

/**
 * A chapter with content. It carries a chapter marker and a verse because the panel distinguishes a
 * populated chapter from a blank one by those nodes — USJ with an empty `content` array is a
 * _blank_ chapter, not a generic stand-in.
 */
const SAMPLE_USJ: Usj = {
  type: 'USJ',
  version: '3.1',
  content: [
    { type: 'chapter', marker: 'c', number: '1' },
    {
      type: 'para',
      marker: 'p',
      content: [{ type: 'verse', marker: 'v', number: '1' }, 'In the beginning'],
    },
  ],
};

/** A chapter the resource has, but with nothing in it — no chapter marker and no verses. */
const BLANK_USJ: Usj = { type: 'USJ', version: '3.1', content: [] };

/**
 * The exact message the C# `MissingBookException` produces. `parseMissingBookError` reads the book
 * number and project id back out of it positionally, so a differently-worded rejection lands on the
 * generic failure state instead — build the fixture from the real shape, never an approximation.
 */
function missingBookError(book: string, projectId = RESOURCE_PROJECT_ID) {
  return {
    platformErrorVersion: 1,
    message: `Book number ${Canon.bookIdToNumber(book)} not found in project ${projectId}.`,
  };
}

function readyState(list: EffectiveResourceReferenceList): EffectiveResourceReferenceListState {
  return { status: 'ready', list };
}

/** An effective list holding one configured dblResource pointing at `dblEntryUid`. */
function configuredResource(dblEntryUid: string, name: string): EffectiveResourceReferenceList {
  return {
    dataVersion: '1.0.0',
    items: [{ type: 'dblResource', id: dblEntryUid, name, source: 'admin' }],
  };
}

const MAT_1_1 = { book: 'MAT', chapterNum: 1, verseNum: 1 };

function makeProps(overrides: Partial<ResourceTextPanelProps> = {}): ResourceTextPanelProps {
  return {
    localizedStrings: STRINGS,
    hasProject: true,
    resourceType: 'ScriptureResource',
    effectiveResourcesState: readyState(configuredResource('uid-web', 'WEB')),
    dblResources: [INSTALLED_RESOURCE],
    isCatalogReady: true,
    hasCatalogError: false,
    onRetryCatalog: vi.fn(),
    scrRef: MAT_1_1,
    onScrRefChange: vi.fn(),
    selectedResourceId: 'uid-web',
    onSelectResource: vi.fn(),
    usjPossiblyError: SAMPLE_USJ,
    isUsjLoading: false,
    textDirection: 'ltr',
    installResource: vi.fn(async () => {}),
    getUserResourceTexts: async () => undefined,
    setUserResourceTexts: vi.fn(async () => {}),
    showResourcePicker: vi.fn(async () => undefined),
    ...overrides,
  };
}

function renderPanel(overrides: Partial<ResourceTextPanelProps> = {}) {
  const props = makeProps(overrides);
  const utils = render(<ResourceTextPanel {...props} />);
  return {
    ...utils,
    rerenderWith: (next: Partial<ResourceTextPanelProps> = {}) =>
      utils.rerender(<ResourceTextPanel {...makeProps({ ...overrides, ...next })} />),
  };
}

/** The editor is on screen AND holding scripture — the two halves of "the reader can read". */
function expectEditorShowing() {
  expect(screen.getByTestId(RESOURCE_TEXT_EDITOR_CONTAINER_TEST_ID)).toBeInTheDocument();
  expect(screen.getByTestId('editorial')).toBeInTheDocument();
}

/**
 * Everything the content area can put on screen. Asserted as one object so that "the panel is
 * waiting" is a claim about ALL of them at once — checking only the message the test has in mind
 * would pass just as happily on a panel showing a different one.
 */
function contentOnScreen() {
  return {
    editor: !!screen.queryByTestId('editorial'),
    missingBook: !!screen.queryByText(BIBLE_TEXT_MISSING_BOOK),
    blankChapter: !!screen.queryByText(BLANK_CHAPTER),
    unavailable: !!screen.queryByText(TEXT_UNAVAILABLE),
  };
}

/** No message and no editor — the panel is waiting. */
const NOTHING_ON_SCREEN = {
  editor: false,
  missingBook: false,
  blankChapter: false,
  unavailable: false,
};

afterEach(() => {
  vi.restoreAllMocks();
  // Module-scoped, so it outlives `restoreAllMocks` and has to be cleared explicitly.
  setUsjSpy.mockClear();
});

describe('ResourceTextPanel book not in this resource', () => {
  it('explains that the Bible text does not contain the book, instead of showing a blank editor', () => {
    renderPanel({ usjPossiblyError: missingBookError('MAT') });

    expect(screen.getByText(BIBLE_TEXT_MISSING_BOOK)).toBeInTheDocument();
    expect(screen.queryByTestId('editorial')).not.toBeInTheDocument();
  });

  it('uses the commentary wording when the panel is showing a commentary', () => {
    renderPanel({
      resourceType: 'EnhancedResource',
      effectiveResourcesState: readyState(configuredResource('uid-hbk', 'HBKENG')),
      dblResources: [INSTALLED_COMMENTARY],
      selectedResourceId: 'uid-hbk',
      usjPossiblyError: missingBookError('MAT'),
    });

    expect(screen.getByText(COMMENTARY_MISSING_BOOK)).toBeInTheDocument();
    expect(screen.queryByText(BIBLE_TEXT_MISSING_BOOK)).not.toBeInTheDocument();
  });

  it('keeps the resource selector on screen, because switching texts is the only remedy', () => {
    renderPanel({ usjPossiblyError: missingBookError('MAT') });

    expect(screen.getByText(BIBLE_TEXT_MISSING_BOOK)).toBeInTheDocument();
    // The selector renders the resolved resource's label; losing it would strip the one control
    // that can get the reader to a text containing this book.
    expect(screen.getByRole('button', { name: /WEB/ })).toBeInTheDocument();
  });

  it('re-feeds the editor when the user navigates to a book the resource does contain', () => {
    const { rerenderWith } = renderPanel({ usjPossiblyError: missingBookError('MAT') });
    expect(screen.getByText(BIBLE_TEXT_MISSING_BOOK)).toBeInTheDocument();

    rerenderWith({
      scrRef: { book: 'GEN', chapterNum: 1, verseNum: 1 },
      usjPossiblyError: SAMPLE_USJ,
    });

    expect(screen.queryByText(BIBLE_TEXT_MISSING_BOOK)).not.toBeInTheDocument();
    expectEditorShowing();
    // The message arm unmounted the editor, so the remount holds nothing until this effect refills
    // it. Without the feed the reader gets Lexical's "Enter some Scripture…" placeholder — an edit
    // invitation in a text they cannot edit.
    expect(setUsjSpy).toHaveBeenCalledWith(SAMPLE_USJ);
  });

  it('keeps waiting when the failure names the book the user just left', () => {
    renderPanel({ scrRef: MAT_1_1, usjPossiblyError: missingBookError('GEN') });

    expect(contentOnScreen()).toEqual(NOTHING_ON_SCREEN);
  });

  it('keeps waiting when the failure names a resource the panel has switched away from', () => {
    renderPanel({ usjPossiblyError: missingBookError('MAT', 'some-other-project') });

    expect(contentOnScreen()).toEqual(NOTHING_ON_SCREEN);
  });
});

describe('ResourceTextPanel blank chapter', () => {
  it('says the chapter is empty when the resource has the book but nothing in the chapter', () => {
    renderPanel({ usjPossiblyError: BLANK_USJ });

    expect(screen.getByText(BLANK_CHAPTER)).toBeInTheDocument();
    expect(screen.queryByTestId('editorial')).not.toBeInTheDocument();
  });

  it('does not call a chapter empty while it is still arriving', () => {
    // The data layer keeps serving the previous reference's USJ until the new subscription's first
    // update lands, and its default is itself blank — so a blank value in hand means nothing until
    // the read has settled. This is the state every navigation passes through.
    renderPanel({ usjPossiblyError: BLANK_USJ, isUsjLoading: true });

    expect(screen.queryByText(BLANK_CHAPTER)).not.toBeInTheDocument();
  });

  it('re-feeds the editor when the message gives way to it with the same chapter in hand', () => {
    const { rerenderWith } = renderPanel({ usjPossiblyError: BLANK_USJ, isUsjLoading: false });
    expect(screen.getByText(BLANK_CHAPTER)).toBeInTheDocument();
    setUsjSpy.mockClear();

    // A new read starts, so the blank USJ in hand is no longer a trustworthy "empty": the message
    // goes and the editor returns — holding the very same USJ object, which is exactly why the feed
    // cannot be keyed on the USJ alone.
    rerenderWith({ usjPossiblyError: BLANK_USJ, isUsjLoading: true });

    expectEditorShowing();
    expect(setUsjSpy).toHaveBeenCalledWith(BLANK_USJ);
  });

  it('calls a book the resource lacks missing, not empty', () => {
    // Both conditions hold at once: the read failed AND the USJ in hand is blank. The missing book
    // is the more specific claim, so it wins.
    renderPanel({ usjPossiblyError: missingBookError('MAT') });

    expect(screen.getByText(BIBLE_TEXT_MISSING_BOOK)).toBeInTheDocument();
    expect(screen.queryByText(BLANK_CHAPTER)).not.toBeInTheDocument();
  });
});

describe('ResourceTextPanel content that cannot be shown', () => {
  it('names an unrelated failure instead of spinning forever', () => {
    // Terminal: the value in hand is an error rather than USJ, and nothing re-emits until the data
    // provider does — so a spinner here would claim progress that never arrives.
    renderPanel({
      usjPossiblyError: { platformErrorVersion: 1, message: 'The disk caught fire.' },
    });

    expect(screen.getByText(TEXT_UNAVAILABLE)).toBeInTheDocument();
    expect(screen.queryByTestId('editorial')).not.toBeInTheDocument();
  });

  it('waits while the chapter is still on its way, rather than mounting an empty editor', () => {
    // `Editorial` with nothing set paints its "Enter some Scripture…" placeholder, which invites an
    // edit in a text the reader cannot edit.
    renderPanel({ usjPossiblyError: undefined });

    expect(contentOnScreen()).toEqual(NOTHING_ON_SCREEN);
  });
});

describe('ResourceTextPanel logging', () => {
  it('logs a missing book at debug and any other failure at error', () => {
    // A named, terminal message looks the same whatever went wrong, so the log is the only place
    // the cause survives. A missing book is ordinary navigation rather than a fault, so it goes to
    // `debug`, which packaged builds drop.
    const logger = { debug: vi.fn(), error: vi.fn(), warn: vi.fn(), info: vi.fn() };
    const { rerenderWith } = renderPanel({ usjPossiblyError: missingBookError('MAT'), logger });

    expect(logger.debug).toHaveBeenCalledTimes(1);
    expect(logger.error).not.toHaveBeenCalled();

    rerenderWith({
      usjPossiblyError: { platformErrorVersion: 1, message: 'The disk caught fire.' },
      logger,
    });

    expect(logger.error).toHaveBeenCalledTimes(1);
  });
});
