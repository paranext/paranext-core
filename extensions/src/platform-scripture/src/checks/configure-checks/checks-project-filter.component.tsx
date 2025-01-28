import papi, { projectDataProviders } from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { usePromise, RadioGroupItem, Label, RadioGroup } from 'platform-bible-react';
import { formatReplacementStringToArray, LocalizeKey } from 'platform-bible-utils';
import { useCallback, useMemo, useState } from 'react';
import FilterPopover from './filter-popover.component';

/** Props for ChecksProjectFilter component */
type ChecksProjectFilterProps = {
  /** Callback function to handle the selection of a project. */
  handleSelectProject: (projectId: string) => void;
  /** The currently selected project ID. */
  selectedProjectId: string;
};

/** Object containing strings for the project full and short names */
type ProjectOption = {
  fullName: string;
  shortName: string;
};

/**
 * Gets the short and full names of a project from its ID.
 *
 * @param projectIdToGetName The ID of the project to get the names of.
 * @returns An object with the short and full names of the project, or undefined if the project is
 *   not editable.
 */
async function getProjectNames(projectIdToGetName: string): Promise<ProjectOption | undefined> {
  const pdp = await projectDataProviders.get('platform.base', projectIdToGetName);

  if (!(await pdp.getSetting('platform.isEditable'))) return undefined;

  const projectShortName = await pdp.getSetting('platform.name');
  const projectFullName = await pdp.getSetting('platform.fullName');

  return { shortName: projectShortName, fullName: projectFullName };
}

const LOCALIZED_STRINGS: LocalizeKey[] = [
  '%webView_checksSidePanel_projectFilter_noProjectSelected%',
  '%webView_checksSidePanel_projectFilter_noProjectsFound%',
  '%webView_checksSidePanel_projectFilter_label%',
  '%webView_checksSidePanel_projectFilter_projectName_format%',
];

/** Dropdown component to select a project to run checks for */
export default function ChecksProjectFilter({
  handleSelectProject,
  selectedProjectId: selectedProjectIdFromWebView,
}: ChecksProjectFilterProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(selectedProjectIdFromWebView);
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZED_STRINGS, []));

  const [projectIdsAndNames]: [{ [projectId: string]: ProjectOption }, boolean] = usePromise(
    useCallback(async () => {
      const projectDict: { [projectId: string]: ProjectOption } = {};

      // Fetch projects metadata to get ids
      const allMetadata = await papi.projectLookup.getMetadataForAllProjects();

      // Map through all metadata to get ids and names
      await Promise.all(
        allMetadata.map(async (metadata) => {
          const names = await getProjectNames(metadata.id);
          if (!names) return;
          projectDict[metadata.id] = names;
        }),
      );

      return projectDict;
    }, []),
    useMemo(() => ({}), []),
  );

  const onProjectChange = useCallback(
    (projectId: string) => {
      setSelectedProjectId(projectId);
      handleSelectProject(projectId);
    },
    [handleSelectProject],
  );

  const writeProjectName = useCallback(
    (fullName: string, shortName: string) => {
      // return `${fullName} (${shortName})`;
      return formatReplacementStringToArray(
        localizedStrings['%webView_checksSidePanel_projectFilter_projectName_format%'],
        { fullName, shortName },
      );
    },
    [localizedStrings],
  );

  const getProjectShortNameLabel = useCallback(() => {
    return (
      projectIdsAndNames[selectedProjectId]?.shortName ??
      localizedStrings['%webView_checksSidePanel_projectFilter_noProjectSelected%']
    );
  }, [localizedStrings, projectIdsAndNames, selectedProjectId]);

  return (
    <FilterPopover
      selectedValue={selectedProjectId}
      radioGroupLabel={localizedStrings['%webView_checksSidePanel_projectFilter_label%']}
      getSelectedValueLabel={getProjectShortNameLabel}
    >
      <RadioGroup value={selectedProjectId} onValueChange={onProjectChange} className="tw-p-3">
        {Object.entries(projectIdsAndNames).length === 0
          ? localizedStrings['%webView_checksSidePanel_projectFilter_noProjectsFound%']
          : Object.entries(projectIdsAndNames).map(([projectId, project]) => (
              <div key={projectId} className="tw-flex tw-items-start tw-gap-2">
                <RadioGroupItem value={projectId} id={projectId} className="tw-mt-0.5" />
                <Label
                  htmlFor={projectId}
                  className="tw-flex-1 tw-text-sm tw-font-normal tw-leading-5"
                >
                  {writeProjectName(project.fullName, project.shortName)}
                </Label>
              </div>
            ))}
      </RadioGroup>
    </FilterPopover>
  );
}
