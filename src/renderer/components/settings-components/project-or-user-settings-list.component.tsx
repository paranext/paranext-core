import { Localized, ProjectSettingProperties, SettingProperties } from 'platform-bible-utils';
import { SettingsList, SettingsListHeader } from 'platform-bible-react';
import { useMemo } from 'react';
import { ProjectSettingNames, SettingNames } from 'papi-shared-types';
import Setting, { SettingValues } from './setting.component';
import ProjectSetting, { ProjectSettingValues } from './project-setting.component';

type ProjectOrUserSettingsListProps = {
  settingProperties: Localized<ProjectSettingProperties> | Localized<SettingProperties>;
  projectId?: string;
  searchQuery: string;
  groupLabel: string;
  groupDescription?: string;
};

export default function ProjectOrUserSettingsList({
  settingProperties,
  projectId,
  searchQuery,
  groupLabel,
  groupDescription,
}: ProjectOrUserSettingsListProps) {
  const filteredSettingsProperties = useMemo(():
    | Localized<ProjectSettingProperties>
    | Localized<SettingProperties> => {
    const filteredProperties: Localized<ProjectSettingProperties> | Localized<SettingProperties> =
      Object.fromEntries(
        Object.entries(settingProperties).filter(
          ([, property]) =>
            property.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.description?.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );

    return filteredProperties;
  }, [searchQuery, settingProperties]);

  return (
    <SettingsList key={groupLabel}>
      {Object.keys(filteredSettingsProperties).length > 0 ? (
        <SettingsListHeader primary={groupLabel} secondary={groupDescription} includeSeparator />
      ) : undefined}
      <div>
        {Object.entries(filteredSettingsProperties).map(([key, property]) =>
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
            />
          ) : (
            <Setting
              key={key}
              // Key is a string technically, but it has to be a settingKey to access the setting
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              settingKey={key as SettingNames}
              label={property.label}
              description={property.description}
              // Default is unknown technically, but we know it has to be a setting value
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              defaultSetting={property.default as SettingValues}
            />
          ),
        )}
      </div>
    </SettingsList>
  );
}
