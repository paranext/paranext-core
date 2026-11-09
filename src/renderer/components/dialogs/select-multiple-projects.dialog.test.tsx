import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ProjectMetadata } from '@shared/models/project-metadata.model';
import { papiFrontendProjectDataProviderService } from '@shared/services/project-data-provider.service';
import { projectLookupService } from '@shared/services/project-lookup.service';
import { SELECT_MULTIPLE_PROJECTS_DIALOG } from '@renderer/components/dialogs/select-multiple-projects.dialog';

/** Display name each project's `platform.base` data provider reports for `platform.name`. */
const NAMES_BY_ID: { [projectId: string]: string } = {
  P1: 'Openable Project',
  P2: 'Study Bible Additions Project',
};

vi.mock('@shared/services/project-lookup.service', () => ({
  projectLookupService: {
    getMetadataForAllProjects: vi.fn(async (): Promise<ProjectMetadata[]> => []),
  },
}));

vi.mock('@shared/services/project-data-provider.service', () => ({
  papiFrontendProjectDataProviderService: {
    get: vi.fn(async (_projectInterface: string, projectId: string) => ({
      getSetting: async () => NAMES_BY_ID[projectId],
    })),
  },
}));

const { Component: SelectMultipleProjectsDialog } = SELECT_MULTIPLE_PROJECTS_DIALOG;

describe('SelectMultipleProjectsDialog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(projectLookupService.getMetadataForAllProjects).mockResolvedValue([
      { id: 'P1', projectInterfaces: [], pdpFactoryInfo: {} },
      {
        id: 'P2',
        projectInterfaces: [],
        pdpFactoryInfo: {},
        unsupportedReason: '%project_unsupported_studyBibleAdditions%',
      },
    ]);
  });

  it('lists only the project that can be opened', async () => {
    render(
      <SelectMultipleProjectsDialog
        isDialog
        prompt="Choose projects"
        submitDialog={vi.fn()}
        cancelDialog={vi.fn()}
        rejectDialog={vi.fn()}
      />,
    );

    expect(await screen.findByText('Openable Project')).toBeInTheDocument();
    expect(screen.queryByText('Study Bible Additions Project')).not.toBeInTheDocument();
    // The name lookup is per project, so a project that is left out costs no lookup either.
    expect(papiFrontendProjectDataProviderService.get).not.toHaveBeenCalledWith(
      expect.anything(),
      'P2',
    );
  });
});
