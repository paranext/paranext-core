import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';
import { Button, ScriptureReference, usePromise, Checklist } from 'platform-bible-react';
import { getChaptersForBook, isLocalizeKey, LocalizeKey } from 'platform-bible-utils';
import logger from '@shared/services/logger.service';
import { Typography } from '@mui/material';
import { useState, useMemo, useCallback, useEffect } from 'react';
import BookSelector, {
  BookSelectionMode,
} from '@renderer/components/run-basic-checks-dialog/book-selector.component';
import './run-basic-checks-tab.component.scss';
import useProjectDataProvider from '@renderer/hooks/papi-hooks/use-project-data-provider.hook';
import { Canon, VerseRef } from '@sillsdev/scripture';
import useSetting from '@renderer/hooks/papi-hooks/use-setting.hook';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';

export const TAB_TYPE_RUN_BASIC_CHECKS = 'run-basic-checks';

type RunBasicChecksTabProps = {
  currentProjectId: string | undefined;
};

const defaultScrRef: ScriptureReference = {
  bookNum: 1,
  chapterNum: 1,
  verseNum: 1,
};

export type BookSelectionStatus = {
  [bookId: string]: boolean;
};

type BasicCheck = {
  name: string | LocalizeKey;
};

export function fetchChecks(): BasicCheck[] {
  const chapterVerseNumbersKey = '%checks_checkName_chapterSlashVerseNumbers%';
  const markersKey = '%checks_checkName_markers%';
  const charactersCombinationsKey = '%checks_checkName_charactersParenthesesCombinations%';
  const punctuationSequencesKey = '%checks_checkName_punctuationParenthesesSequences%';
  const referencesKey = '%checks_checkName_references%';
  const footnoteQuotesKey = '%checks_checkName_footnoteQuotes%';
  const capitalizationKey = '%checks_checkName_capitalization%';
  const repeatedWordsKey = '%checks_checkName_repeatedWords%';
  const unmatchedPairsOfPunctuationKey = '%checks_checkName_unmatchedPairsOfPunctuation%';
  const quotationsKey = '%checks_checkName_quotations%';
  const quotationTypes = '%checks_checkName_quotationTypes%';
  const numbersKey = '%checks_checkName_numbers%';
  return [
    {
      name: chapterVerseNumbersKey,
    },
    {
      name: markersKey,
    },
    {
      name: charactersCombinationsKey,
    },
    {
      name: punctuationSequencesKey,
    },
    {
      name: referencesKey,
    },
    {
      name: footnoteQuotesKey,
    },
    {
      name: capitalizationKey,
    },
    {
      name: repeatedWordsKey,
    },
    {
      name: unmatchedPairsOfPunctuationKey,
    },
    {
      name: quotationsKey,
    },
    {
      name: quotationTypes,
    },
    {
      name: numbersKey,
    },
    {
      name: 'Another Example 1',
    },
    {
      name: 'Another Example 2',
    },
    {
      name: 'Another Example 3',
    },
    {
      name: 'Another Example 4',
    },
    {
      name: 'Another Example 5',
    },
    {
      name: 'Another Example 6',
    },
  ];
}

export default function RunBasicChecksTab({ currentProjectId }: RunBasicChecksTabProps) {
  const basicChecks = fetchChecks();
  const localizationKeys: LocalizeKey[] = [];
  basicChecks.forEach((c) => {
    if (isLocalizeKey(c.name)) {
      localizationKeys.push(c.name);
    }
  });
  const [scrRef] = useSetting('platform.verseRef', defaultScrRef);

  const [selectedChecks, setSelectedChecks] = useState<string[]>([]);
  const [useCurrentBook, setUseCurrentBook] = useState<boolean>(true);
  const chapterCount = useMemo(() => getChaptersForBook(scrRef.bookNum), [scrRef]);
  const [startChapter, setStartChapter] = useState<number>(1);
  const [endChapter, setEndChapter] = useState<number>(chapterCount);
  const currentBookId = useMemo(() => Canon.bookNumberToId(scrRef.bookNum), [scrRef]);

  const noCurrentProjectKey = '%checks_defaultNoProject_noCurrentProject%';
  const loadingKey = '%general_loading%';
  const checksKey = '%checks_checkName_checks%';
  const runKey = '%general_run%';
  const cancelKey = '%general_cancel%';
  const [localizedStrings] = useLocalizedStrings([
    ...localizationKeys,
    noCurrentProjectKey,
    loadingKey,
    checksKey,
    runKey,
    cancelKey,
  ]);
  const localizedBasicChecks = basicChecks.map((c) => ({
    name: isLocalizeKey(c.name) ? localizedStrings[c.name] : c.name,
  }));
  const localizedNoCurrentProject = localizedStrings[noCurrentProjectKey];
  const localizedLoading = localizedStrings[loadingKey];
  const localizedChecks = localizedStrings[checksKey];
  const localizedRun = localizedStrings[runKey];
  const localizedCancel = localizedStrings[cancelKey];

  // Current book true, rest of the books false
  const getInitialBookSelectionStatus = useCallback(() => {
    return Canon.allBookIds.reduce<BookSelectionStatus>((acc, bookId) => {
      if (bookId === currentBookId) acc[bookId] = true;
      else acc[bookId] = false;
      return acc;
    }, {});
  }, [currentBookId]);

  const [bookIdsSelectionStatus, setBookIdsSelectionStatus] = useState<BookSelectionStatus>(
    getInitialBookSelectionStatus(),
  );

  // Needed so that the currentBook is correct and not the default.
  useEffect(() => {
    setBookIdsSelectionStatus(getInitialBookSelectionStatus());
  }, [getInitialBookSelectionStatus]);

  // Only used in handleSubmit
  const selectedBookIds = useMemo(
    () => Object.keys(bookIdsSelectionStatus).filter((bookId) => bookIdsSelectionStatus[bookId]),
    [bookIdsSelectionStatus],
  );

  const toggleShouldUseCurrentBook = (newMode: string) => {
    if (newMode === BookSelectionMode.CURRENT_BOOK) {
      setUseCurrentBook(true);
    } else {
      setUseCurrentBook(false);
    }
  };

  const handleSelectStart = (chapter: number) => {
    setStartChapter(chapter);
  };

  const handleSelectEnd = (chapter: number) => {
    setEndChapter(chapter);
  };

  const handleSelectBooks = (bookIds: string[]) => {
    setBookIdsSelectionStatus((prevStatus) => {
      const newStatus = { ...prevStatus };
      Object.keys(newStatus).forEach((bookId) => {
        newStatus[bookId] = false;
      });
      bookIds.forEach((bookId) => {
        newStatus[bookId] = true;
      });
      return newStatus;
    });
  };

  const handleSelectCheck = (label: string) => {
    if (selectedChecks.includes(label))
      setSelectedChecks(selectedChecks.filter((check) => check !== label));
    else setSelectedChecks((prevSelectedChecks) => [...prevSelectedChecks, label]);
  };

  const handleSubmit = () => {
    const joinedSelectedCheckNames = selectedChecks.join(', ');
    logger.info(
      `Selected checks: ${joinedSelectedCheckNames || 'NONE SELECTED'}\n Selected Books: ${selectedBookIds}\n start chapter: ${
        useCurrentBook ? startChapter : 'IRRELEVANT-Choose books selected'
      }\n end chapter: ${useCurrentBook ? endChapter : 'IRRELEVANT-Choose books selected'}`,
    );
  };

  const project = useProjectDataProvider('platformScripture.USFM_Verse', currentProjectId);

  const [projectString] = usePromise(
    useMemo(() => {
      return async () =>
        project === undefined
          ? { localizedNoCurrentProject }
          : project.getVerseUSFM(new VerseRef('MAT 4:1'));
    }, [project, localizedNoCurrentProject]),
    { localizedLoading },
  );

  return (
    <div className="run-basic-checks-dialog">
      <Typography variant="h5">{`Run basic checks: ${currentProjectId}, ${projectString}`}</Typography>
      <Checklist
        className="run-basic-checks-check-names"
        legend={localizedChecks}
        listItems={localizedBasicChecks.map((check) => check.name)}
        selectedListItems={selectedChecks}
        handleSelectListItem={handleSelectCheck}
      />
      <fieldset className="run-basic-checks-books">
        <BookSelector
          handleBookSelectionModeChange={toggleShouldUseCurrentBook}
          currentBookName={Canon.bookIdToEnglishName(currentBookId)}
          selectedBookIds={selectedBookIds}
          handleSelectBooks={handleSelectBooks}
          chapterCount={chapterCount}
          handleSelectStartChapter={handleSelectStart}
          handleSelectEndChapter={handleSelectEnd}
        />
      </fieldset>
      <div className="basic-checks-dialog-actions">
        <Button onClick={() => handleSubmit()}>{localizedRun}</Button>
        <Button onClick={() => logger.info(`Canceled`)}>{localizedCancel}</Button>
      </div>
    </div>
  );
}

export const loadRunBasicChecksTab = (savedTabInfo: SavedTabInfo): TabInfo => {
  return {
    ...savedTabInfo,
    tabTitle: '%checks_title_runBasicChecks%',
    content: (
      <RunBasicChecksTab
        // #region Test a .NET data provider
        currentProjectId="32664dc3288a28df2e2bb75ded887fc8f17a15fb"
      />
    ),
  };
};
