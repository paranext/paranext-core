import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { ProjectSettingLocks } from '@renderer/hooks/use-project-setting-locks.hook';
import { ProjectSettingNames, SettingNames } from 'papi-shared-types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'platform-bible-react';
import {
  Localized,
  LocalizeKey,
  ProjectSettingProperties,
  SettingProperties,
} from 'platform-bible-utils';
import { useMemo } from 'react';
import { OtherSetting } from './other-setting.component';
import './project-or-other-settings-list.component.scss';
import { ProjectSetting } from './project-setting.component';
import { getSettingLock, SETTING_LOCK_REASON_KEYS } from './setting-lock.util';
import { OtherSettingValues, ProjectSettingValues } from './setting.component';

const LOCALIZE_LOCK_REASON_KEYS: LocalizeKey[] = Object.values(SETTING_LOCK_REASON_KEYS);

/** Properties for a settings list component that displays either project or user settings */
type ProjectOrOtherSettingsListProps = {
  /**
   * Properties for either a project setting group or user setting group. Hidden settings are
   * already removed by SettingsTab when it loads the contributions.
   */
  settingProperties: Localized<ProjectSettingProperties> | Localized<SettingProperties>;
  /** Optional projectId, supplied if the list is for project settings */
  projectId?: string;
  /** Settings group label */
  groupLabel: string;
  /** Optional settings group description */
  groupDescription?: string;
  /** Additional css classes to help with unique styling of the ProjectOrOtherSettingsList */
  className?: string;
  /**
   * When true, each project setting's editor is rendered read-only. Only meaningful for project
   * settings (projectId defined). Computed once by the parent SettingsTab and passed down, so a
   * project's several setting groups don't each subscribe to the auto-sync-blocking store.
   */
  disabled?: boolean;
  /**
   * The project's locks, which make some or all of its settings read-only. Only meaningful for
   * project settings (projectId defined); `undefined` there means they are still loading, and every
   * setting stays read-only until they arrive. Read once by the parent SettingsTab, like
   * `disabled`.
   */
  projectSettingLocks?: ProjectSettingLocks;
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
  disabled = false,
  projectSettingLocks,
}: ProjectOrOtherSettingsListProps) {
  // Only project settings (projectId defined) can be edit-blocked. `disabled` is computed ONCE by
  // the parent SettingsTab (which also renders the single blocked notice above all of a project's
  // groups) and passed down, so a project's several setting groups don't each subscribe to the
  // auto-sync-blocking store. This component just forwards it to each project setting.

  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZE_LOCK_REASON_KEYS, []));

  if (Object.entries(settingProperties).length === 0) return undefined;

  const areProjectLocksLoading = !!projectId && !projectSettingLocks;

  return (
    <Card className={`card ${className}`}>
      <CardHeader>
        <CardTitle>{groupLabel}</CardTitle>
        {groupDescription && <CardDescription>{groupDescription}</CardDescription>}
      </CardHeader>
      <CardContent>
        {Object.entries(settingProperties).map(([key, property]) => {
          const { isLocked, reasonKey } = getSettingLock(
            key,
            property.isReadOnly,
            projectId ? projectSettingLocks : undefined,
          );
          const readOnly = areProjectLocksLoading || isLocked;
          const lockReason = reasonKey && localizedStrings[reasonKey];

          return projectId ? (
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
              disabled={disabled}
              readOnly={readOnly}
              lockReason={lockReason}
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
              readOnly={readOnly}
              lockReason={lockReason}
            />
          );
        })}
      </CardContent>
    </Card>
  );
}

export default ProjectOrOtherSettingsList;
