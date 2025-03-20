import { ProjectSettingNames, SettingNames } from 'papi-shared-types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'platform-bible-react';
import { Localized, ProjectSettingProperties, SettingProperties } from 'platform-bible-utils';
import OtherSetting from './other-setting.component';
import './project-or-other-settings-list.component.scss';
import ProjectSetting from './project-setting.component';
import { OtherSettingValues, ProjectSettingValues } from './setting.component';

/** Properties for a settings list component that displays either project or user settings */
type ProjectOrOtherSettingsListProps = {
  /** Properties for either a project setting group or user setting group */
  settingProperties: Localized<ProjectSettingProperties> | Localized<SettingProperties>;
  /** Optional projectId, supplied if the list is for project settings */
  projectId?: string;
  /** Settings group label */
  groupLabel: string;
  /** Optional settings group description */
  groupDescription?: string;
  /** Additional css classes to help with unique styling of the ProjectOrOtherSettingsList */
  className?: string;
};

/**
 * Filters and displays a list of settings based on a search query and whether it's for project or
 * user settings, rendering either `ProjectSetting` or `UserSetting` components accordingly.
 */
export function ProjectOrOtherSettingsList({
  settingProperties,
  projectId,
  groupLabel,
  groupDescription,
  className,
}: ProjectOrOtherSettingsListProps) {
  if (Object.entries(settingProperties).length === 0) return undefined;

  return (
    <Card className={`card ${className}`}>
      <CardHeader>
        <CardTitle>{groupLabel}</CardTitle>
        {groupDescription && <CardDescription>{groupDescription}</CardDescription>}
      </CardHeader>
      <CardContent>
        {Object.entries(settingProperties).map(([key, property]) =>
          projectId ? (
            <ProjectSetting
              key={key}
              // Key is a string technically, but it has to be a settingKey to access the setting
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              settingKey={key as ProjectSettingNames}
              description={property.description}
              label={property.label}
              projectId={projectId}
              // Default is unknown technically but we know it has to be a project setting value
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              defaultSetting={property.default as ProjectSettingValues}
              className="card-content"
            />
          ) : (
            <OtherSetting
              key={key}
              // Key is a string technically, but it has to be a settingKey to access the setting
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              settingKey={key as SettingNames}
              label={property.label}
              description={property.description}
              // Default is unknown technically, but we know it has to be a setting value
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              defaultSetting={property.default as OtherSettingValues}
              className="card-content"
            />
          ),
        )}
      </CardContent>
    </Card>
  );
}

export default ProjectOrOtherSettingsList;
