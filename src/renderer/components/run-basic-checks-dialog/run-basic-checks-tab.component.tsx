import { SavedTabInfo, TabInfo } from '@shared/data/web-view.model';
import { Button, ComboBox, ComboBoxLabelOption } from 'papi-components';
import logger from '@shared/services/logger.service';
import { useMemo } from 'react';
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

  return (
    <div className="run-basic-checks-dialog">
      {/* Ideally, pass in a project and make it the initial selection for the box */}
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
        <BookSelection />
      </fieldset>
      <div className="basic-checks-dialog-actions">
        <Button onClick={() => logger.info(`Submitted`)}>OK</Button>
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
