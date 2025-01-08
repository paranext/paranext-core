import papi, { projectDataProviders } from '@papi/frontend';
import {
  Label,
  RadioGroup,
  RadioGroupItem,
  Popover,
  Separator,
  usePromise,
  Spinner,
} from 'platform-bible-react';
import { useCallback, useMemo, useState } from 'react';

/** Props for ChecksProjectFilter component */
type ChecksProjectFilterProps = {
  /** Callback function to handle the selection of a project. */
  handleSelectProject: (projectId: string) => void;
};

type ProjectOption = {
  id: string;
  fullName: string;
  shortName: string;
};

async function getProjectNames(projectIdToGetName: string) {
  const pdp = await projectDataProviders.get('platform.base', projectIdToGetName);
  const projectShortName = await pdp.getSetting('platform.name');
  const projectFullName = await pdp.getSetting('platform.fullName');

  return { projectShortName, projectFullName };
}

/** Dropdown component to select a project to run checks for */
export default function ChecksProjectFilter({ handleSelectProject }: ChecksProjectFilterProps) {
  const [selectedProject, setSelectedProject] = useState<string>();

  const [projectIdsAndNames, isLoadingProjectIdsAndNames] = usePromise(
    useCallback(async () => {
      const ProjectMap: ProjectOption[] = [];

      // Fetch projects metadata to get ids
      const allMetadata = await papi.projectLookup.getMetadataForAllProjects();

      // Map through all metadata to get ids and names
      allMetadata.map(async (metadata) => {
        const names = await getProjectNames(metadata.id);
        ProjectMap.push({
          id: metadata.id,
          fullName: names.projectFullName,
          shortName: names.projectShortName,
        });
      });

      return ProjectMap;
    }, []),
    useMemo(() => [], []),
  );

  const onProjectChange = useCallback(
    (projectId: string) => {
      setSelectedProject(projectId);
      handleSelectProject(projectId);
    },
    [handleSelectProject],
  );

  const writeProjectName = useCallback((fullName: string, shortName: string) => {
    return `${fullName} (${shortName})`;
  }, []);

  return (
    <Popover>
      <Label>Project</Label>
      <Separator />
      <RadioGroup value={selectedProject} onValueChange={onProjectChange}>
        {isLoadingProjectIdsAndNames ? (
          <Spinner />
        ) : (
          projectIdsAndNames.map((project) => (
            <div>
              <RadioGroupItem key={project.id} value={project.shortName} />
              <Label htmlFor={project.id}>
                {writeProjectName(project.fullName, project.shortName)}
              </Label>
            </div>
          ))
        )}
      </RadioGroup>
    </Popover>
  );
}
