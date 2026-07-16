import { ProjectSettingNames, SettingNames } from 'papi-shared-types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'platform-bible-react';
import {
  Localized,
  LocalizeKey,
  ProjectSettingProperties,
  SettingProperties,
} from 'platform-bible-utils';
import { useMemo } from 'react';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { useIsProjectAutoSyncBlocked } from '@renderer/hooks/use-is-project-auto-sync-blocked.hook';
import { OtherSetting } from './other-setting.component';
import './project-or-other-settings-list.component.scss';
import { ProjectSetting } from './project-setting.component';
import { OtherSettingValues, ProjectSettingValues } from './setting.component';

/**
 * Slim notice shown per project settings list while that project's automatic Send/Receive blocks
 * edits.
 */
const SYNC_BLOCKED_NOTICE_KEY: LocalizeKey = '%settings_projectSyncBlocked_notice%';
const LOCALIZE_KEYS: LocalizeKey[] = [SYNC_BLOCKED_NOTICE_KEY];

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
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZE_KEYS, []));
  // Only project settings (projectId defined) can be edit-blocked; user/general settings never are
  // (the hook treats an undefined project id as never blocked).
  const isSyncBlocked = useIsProjectAutoSyncBlocked(projectId);

  if (Object.entries(settingProperties).length === 0) return undefined;

  return (
    <Card className={`card ${className}`}>
      <CardHeader>
        <CardTitle>{groupLabel}</CardTitle>
        {groupDescription && <CardDescription>{groupDescription}</CardDescription>}
      </CardHeader>
      <CardContent>
        {/* One slim, non-covering notice per project settings list while this project's automatic
            Send/Receive is blocking edits. The individual setting editors are disabled below. */}
        {isSyncBlocked && (
          <div role="status" className="sync-blocked-notice">
            {localizedStrings[SYNC_BLOCKED_NOTICE_KEY]}
          </div>
        )}
        {Object.entries(settingProperties)
          .filter(([, property]) => !property.isHidden)
          .map(([key, property]) =>
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
                disabled={isSyncBlocked}
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
