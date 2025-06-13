import {
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from 'platform-bible-react';
import { ProjectOption } from 'platform-lexical-tools';
import { useMemo } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { DICTIONARY_LOCALIZED_STRING_KEYS } from '../../utils/dictionary.util';

/** Props for the TrackProjectDropdown component */
type TrackProjectDropdownProps = {
  /** The project id of project to track */
  projectToTrack: string | undefined;
  /** Callback to handle project change */
  handleTrackProjectChange: (project: string) => void;
  /** Options for the track biblical terms dropdown */
  projectOptions: ProjectOption[];
};

/**
 * A dropdown to select a project to track for dictionary entries.
 *
 * This component expects that the parent component has already fetched the project options. It will
 * not fetch them itself. If you want it to fetch the options, you should call the `useDataProvider`
 * hook and pass the `dataProvider` to the `projectOptions` prop.
 */
export function TrackProjectDropdown({
  projectToTrack,
  handleTrackProjectChange,
  projectOptions,
}: TrackProjectDropdownProps) {
  const [localizedStrings] = useLocalizedStrings(DICTIONARY_LOCALIZED_STRING_KEYS);
  const projectOptionsEdited: ProjectOption[] = useMemo(
    () => [{ projectId: 'no-project', projectShortName: 'No Project' }, ...projectOptions],
    [projectOptions],
  );

  return (
    <div className="tw-flex tw-items-center tw-gap-2">
      <Label htmlFor="track-project" className="tw-text-xs tw-whitespace-nowrap">
        {localizedStrings['%platformLexicalTools_dictionary_trackProjectDropdownLabel%']}
      </Label>
      <Select value={projectToTrack ?? 'no-project'} onValueChange={handleTrackProjectChange}>
        <SelectTrigger className="tw-w-36 tw-h-8" id="track-project">
          <SelectValue placeholder="Project to track" />
        </SelectTrigger>
        <SelectContent>
          {projectOptionsEdited.map(({ projectId, projectShortName }) => (
            <SelectItem key={projectId ?? 'no-project'} value={projectId ?? 'no-project'}>
              {projectShortName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
