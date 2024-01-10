import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';
import usePromise, { Button, ScriptureReference, getChaptersForBook } from 'platform-bible-react';
import logger from '@shared/services/logger.service';
import { Typography } from '@mui/material';
import { useState, useMemo } from 'react';
import settingsService from '@shared/services/settings.service';
import BookSelector from '@renderer/components/run-basic-checks-dialog/book-selector.component';
import BasicChecks, {
  fetchChecks,
} from '@renderer/components/run-basic-checks-dialog/basic-checks.component';
import './run-basic-checks-tab.component.scss';
import useProjectDataProvider from '@renderer/hooks/papi-hooks/use-project-data-provider.hook';
import { VerseRef } from '@sillsdev/scripture';

export const TAB_TYPE_RUN_BASIC_CHECKS = 'run-basic-checks';

// Changing global scripture reference won't effect the dialog because reference is passed in once at the start.
type RunBasicChecksTabProps = {
  currentScriptureReference: ScriptureReference | undefined;
  currentProjectId: string | undefined;
};

export default function RunBasicChecksTab({
  currentScriptureReference,
  currentProjectId,
}: RunBasicChecksTabProps) {
  const currentBookNumber = currentScriptureReference?.bookNum ?? 1;
  const basicChecks = fetchChecks();

  // used within chapter-range-selector and won't change because current book doesn't change
  const chapterCount = getChaptersForBook(currentBookNumber);
  const [startChapter, setStartChapter] = useState(1);
  const [endChapter, setEndChapter] = useState(chapterCount);

  const handleSelectStart = (chapter: number) => {
    setStartChapter(chapter);
  };

  const handleSelectEnd = (chapter: number) => {
    setEndChapter(chapter);
  };

  const [selectedBooks, setSelectedBooks] = useState<number[]>([currentBookNumber]);
  const [selectedChecks, setSelectedChecks] = useState<string[]>([]);
  const [useCurrentBook, setUseCurrentBook] = useState<boolean>(true);

  const handleSelectBooks = (bookNumbers: number[]) => {
    setUseCurrentBook(false);
    bookNumbers.forEach((book) => {
      if (selectedBooks.includes(book))
        setSelectedBooks((prevSelectedBooks) =>
          prevSelectedBooks.filter((prevBook) => prevBook !== book),
        );
      else setSelectedBooks((prevSelectedBooks) => [...prevSelectedBooks, book]);
    });
  };

  const handleSelectCheck = (label: string) => {
    if (selectedChecks.includes(label))
      setSelectedChecks(selectedChecks.filter((check) => check !== label));
    else setSelectedChecks((prevSelectedChecks) => [...prevSelectedChecks, label]);
  };

  const toggleShouldUseCurrentBook = (newValue: boolean) => {
    setUseCurrentBook(newValue);
    // if we set useCurrentBook to true, then reset the list of selected books
    if (newValue) setSelectedBooks([currentBookNumber]);
    // if we set useCurrentBook to false, reset start/end chapter numbers
    else {
      setStartChapter(1);
      setEndChapter(chapterCount);
    }
  };

  const handleSubmit = () => {
    const joinedSelectedCheckNames = selectedChecks.join(', ');
    logger.info(
      `Selected checks: ${joinedSelectedCheckNames || 'NONE SELECTED'}\n Selected Books: ${
        selectedBooks.length === 1 && !useCurrentBook ? 'ALL BOOKS' : selectedBooks
      }\n start chapter: ${
        useCurrentBook ? startChapter : 'IRRELEVANT-Choose books selected'
      }\n end chapter: ${useCurrentBook ? endChapter : 'IRRELEVANT-Choose books selected'}`,
    );
  };

  const project = useProjectDataProvider('ParatextStandard', currentProjectId);

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
    <div className="run-basic-checks-dialog">
      <Typography variant="h5">{`Run basic checks: ${currentProjectId}, ${projectString}`}</Typography>
      {/* Should always be two columns? */}
      <fieldset className="run-basic-checks-check-names">
        <legend>Checks</legend>
        <BasicChecks
          checks={basicChecks}
          selectedChecks={selectedChecks}
          handleSelectCheck={handleSelectCheck}
        />
      </fieldset>
      <fieldset className="run-basic-checks-books">
        <BookSelector
          shouldUseCurrentBook={useCurrentBook}
          toggleShouldUseCurrentBook={toggleShouldUseCurrentBook}
          currentBookNumber={currentBookNumber}
          selectedBooks={selectedBooks}
          handleSelectBooks={handleSelectBooks}
          startChapter={startChapter}
          endChapter={endChapter}
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

export const loadRunBasicChecksTab = (savedTabInfo: SavedTabInfo): TabInfo => {
  return {
    ...savedTabInfo,
    tabTitle: 'Run Basic Checks',
    content: (
      <RunBasicChecksTab
        // #region Test a .NET data provider
        currentProjectId="32664dc3288a28df2e2bb75ded887fc8f17a15fb"
        currentScriptureReference={settingsService.get('platform.verseRef')}
      />
    ),
  };
};
