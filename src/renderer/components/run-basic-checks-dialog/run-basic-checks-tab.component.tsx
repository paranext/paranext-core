import { SavedTabInfo, TabInfo } from '@shared/data/web-view.model';
import {
  Button,
  ComboBox,
  ComboBoxLabelOption,
  ScriptureReference,
  getChaptersForBook,
} from 'papi-components';
import logger from '@shared/services/logger.service';
import { useMemo, useState } from 'react';
import settingsService from '@shared/services/settings.service';
import { fetchProjects } from '../project-dialogs/open-project-tab.component';
import './run-basic-checks-tab.component.scss';
import BookSelection from './book-selection.component';
import BasicChecks, { fetchChecks } from './basic-checks.component';

export const TAB_TYPE_RUN_BASIC_CHECKS = 'run-basic-checks';

interface ProjectNameOption extends ComboBoxLabelOption {
  projectId: string;
}

// Changing global scripture reference won't effect the dialog because reference is passed in once at the start.
type RunBasicChecksTabProps = {
  currentScriptureReference: ScriptureReference | null;
};

export default function RunBasicChecksTab({ currentScriptureReference }: RunBasicChecksTabProps) {
  // In future, should not be a dropdown with multiple options but only the current project
  const projectNameOptions: ProjectNameOption[] = useMemo(
    () =>
      fetchProjects()
        .filter((project) => project.isDownloaded)
        .map((project) => ({
          projectId: project.id,
          label: project.name,
        })),
    [],
  );

  const currentBookNumber = currentScriptureReference?.bookNum ?? 1;
  // used within chapter-range-selection
  const chapterCount = getChaptersForBook(currentBookNumber);
  const basicChecks = fetchChecks();

  const [selectedBooks, setSelectedBooks] = useState<number[]>([currentBookNumber]);
  const [selectedChecks, setSelectedChecks] = useState<{ [key: string]: boolean }>(() => {
    const initialState: { [key: string]: boolean } = {};
    basicChecks.forEach((check) => {
      initialState[check.name] = false;
    });
    return initialState;
  });
  const [startChapter, setStartChapter] = useState(1);
  const [endChapter, setEndChapter] = useState(chapterCount);
  const [useCurrentBook, setUseCurrentBook] = useState<boolean>(true);

  const handleSelectBooks = (bookNumber: number) => {
    setUseCurrentBook(false);
    if (selectedBooks.includes(bookNumber)) {
      setSelectedBooks(selectedBooks.filter((number) => number !== bookNumber));
    } else {
      setSelectedBooks([...selectedBooks, bookNumber]);
    }
  };

  const handleSelectChecks = (label: string) => {
    setSelectedChecks((prevCheckboxes) => ({
      ...prevCheckboxes,
      [label]: !prevCheckboxes[label],
    }));
  };

  const toggleCurrentBook = () => {
    setUseCurrentBook((prev) => {
      return !prev;
    });
  };

  const handleSelectStartChapter = (newStart: number) => {
    setStartChapter(newStart);
    if (newStart > endChapter) setEndChapter(newStart);
  };

  const handleSelectEndChapter = (newEnd: number) => {
    setEndChapter(newEnd);
    if (newEnd < startChapter) setStartChapter(newEnd);
  };

  const handleSubmit = () => {
    const checkKeys = Object.keys(selectedChecks)
      .filter((checkTrue) => selectedChecks[checkTrue])
      .join(', ');
    logger.info(
      `Selected checks: ${checkKeys || 'NONE SELECTED'}\n Selected Books: ${
        selectedBooks.length === 1 && !useCurrentBook ? 'ALL BOOKS' : selectedBooks
      }\n start chapter: ${
        useCurrentBook ? startChapter : 'IRRELEVANT-Choose books selected'
      }\n end chapter: ${useCurrentBook ? endChapter : 'IRRELEVANT-Choose books selected'}`,
    );
  };

  return (
    <div className="run-basic-checks-dialog">
      {/* Ideally, pass in a project and make it the initial selection for the box,
      or eliminate ability to select project other than the current */}
      <ComboBox
        className="project-dropdown"
        isFullWidth
        title="Project"
        options={projectNameOptions}
      />
      {/* Should always be two columns? */}
      <fieldset className="run-basic-checks-check-names">
        <legend>Checks</legend>
        <BasicChecks
          checks={basicChecks}
          selectedChecks={selectedChecks}
          handleSelectChecks={handleSelectChecks}
        />
      </fieldset>
      <fieldset className="run-basic-checks-books">
        <BookSelection
          useCurrentBook={useCurrentBook}
          toggleCurrentBook={toggleCurrentBook}
          currentBookNumber={currentBookNumber}
          selectedBooks={selectedBooks}
          handleSelectBooks={handleSelectBooks}
          startChapter={startChapter}
          handleSelectStartChapter={handleSelectStartChapter}
          endChapter={endChapter}
          handleSelectEndChapter={handleSelectEndChapter}
          chapterCount={chapterCount}
        />
      </fieldset>
      <div className="basic-checks-dialog-actions">
        <Button onClick={() => handleSubmit()}>OK</Button>
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
      <RunBasicChecksTab currentScriptureReference={settingsService.get('platform.verseRef')} />
    ),
  };
};
