import { SavedTabInfo, TabInfo } from '@shared/data/web-view.model';
import { Button, ComboBox, ComboBoxLabelOption } from 'papi-components';
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

export default function RunBasicChecksTab() {
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

  /**
   * Current assumption is that the project's current book will be passed in. So changing the global
   * scripture reference won't change the current book in the dialog. So here we only get the scripture
   * reference once.
   */
  const currentReference = useMemo(() => settingsService.get('platform.verseRef'), []);
  const currentBookNumber = currentReference?.bookNum ?? 1;
  /*
   * Currently stub the chapter count because we cannot use the Scripture util functions in PAPI here
   * If book is Genesis - chapters are 1-50, else chapters are 1-20
   */
  const chapterCount = currentBookNumber === 1 ? 50 : 20;
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
      {/* Should always be two columns? Is it okay that we use fieldset- not MUI? */}
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
    content: <RunBasicChecksTab />,
  };
};
