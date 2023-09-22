import { SavedTabInfo, TabInfo } from '@shared/data/web-view.model';
import { Button, ComboBox, ComboBoxLabelOption } from 'papi-components';
import logger from '@shared/services/logger.service';
import { useMemo, useState } from 'react';
import settingsService from '@shared/services/settings.service';
import { fetchProjects } from '../project-dialogs/open-project-tab.component';
import './run-basic-checks-tab.component.scss';
import BookSelection from './book-selection.component';
import BasicChecks from './basic-checks.component';

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

  const currentReference = useMemo(() => settingsService.get('platform.verseRef'), []);
  const currentBookNumber = currentReference?.bookNum ?? 1;
  const chapterCount = currentBookNumber === 1 ? 50 : 20;

  const [selectedBooks, setSelectedBooks] = useState<number[]>([currentBookNumber]);
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
    if (!useCurrentBook) {
      logger.info(
        `Selected Books: ${selectedBooks} start chapter: 'Choose books selected so irrelevant' end chapter: 'Choose books selected so irrelevant'`,
      );
    } else {
      logger.info(
        `Selected Books: ${selectedBooks} start chapter: ${startChapter} end chapter: ${endChapter}`,
      );
    }
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
        <BasicChecks />
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
