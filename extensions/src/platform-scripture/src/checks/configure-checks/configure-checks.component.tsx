import { Button, ScriptureReference, usePromise, Checklist } from 'platform-bible-react';
import { getChaptersForBook } from 'platform-bible-utils';
import { Typography } from '@mui/material';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { Canon, VerseRef } from '@sillsdev/scripture';
import { useProjectDataProvider, useSetting } from '@papi/frontend/react';
import { logger } from '@papi/frontend';
import { CheckRunnerCheckDetails } from 'platform-scripture';
import BookSelector, { BookSelectionMode } from './book-selector.component';

type ConfigureChecksProps = {
  projectId: string | undefined;
  projectName: string | undefined;
  availableChecks: CheckRunnerCheckDetails[];
};

const defaultScrRef: ScriptureReference = {
  bookNum: 1,
  chapterNum: 1,
  verseNum: 1,
};

export type BookSelectionStatus = {
  [bookId: string]: boolean;
};

export default function ConfigureChecks({
  projectId,
  projectName,
  availableChecks,
}: ConfigureChecksProps) {
  const [scrRef] = useSetting('platform.verseRef', defaultScrRef);

  const [selectedChecks, setSelectedChecks] = useState<string[]>([]);
  const [useCurrentBook, setUseCurrentBook] = useState<boolean>(true);
  const chapterCount = useMemo(() => getChaptersForBook(scrRef.bookNum), [scrRef]);
  const [startChapter, setStartChapter] = useState<number>(1);
  const [endChapter, setEndChapter] = useState<number>(chapterCount);
  const currentBookId = useMemo(() => Canon.bookNumberToId(scrRef.bookNum), [scrRef]);

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

  const project = useProjectDataProvider('platformScripture.USFM_Verse', projectId);

  const [projectString] = usePromise(
    useMemo(() => {
      return async () =>
        project === undefined
          ? 'No current project'
          : project.getVerseUSFM(new VerseRef('MAT 4:1'));
    }, [project]),
    'Loading',
  );

  return (
    <div className="configure-checks-dialog">
      <Typography variant="h5">{`Run basic checks: ${projectName}`}</Typography>
      {projectString}
      <Checklist
        className="configure-checks-check-names"
        legend="Checks"
        listItems={availableChecks.map((check) => check.checkDescription)}
        selectedListItems={selectedChecks}
        handleSelectListItem={handleSelectCheck}
      />
      <fieldset className="configure-checks-books">
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
        <Button onClick={() => handleSubmit()}>Run</Button>
        <Button onClick={() => logger.info(`Canceled`)}>Cancel</Button>
      </div>
    </div>
  );
}
