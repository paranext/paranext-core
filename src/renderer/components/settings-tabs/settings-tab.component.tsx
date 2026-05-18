import { ReactNode, useCallback, useMemo, useState } from 'react';
import {
  SettingsLayout,
  type DynamicSettingsSidebarItem,
  type SettingsLayoutItem,
  type SettingsLayoutLabels,
  type SettingsLayoutSelection,
  usePromise,
} from 'platform-bible-react';
import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';
import {
  filterProjectSettingsContributionsByProjectInterfaces,
  projectSettingsService,
} from '@shared/services/project-settings.service';
import { settingsService } from '@shared/services/settings.service';
import './settings-tab.component.scss';
import { projectLookupService } from '@shared/services/project-lookup.service';
import { projectDataProviders } from '@renderer/services/papi-frontend.service';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { formatReplacementString, Localized, LocalizeKey } from 'platform-bible-utils';
import { SettingsContributionInfo } from '@shared/utils/settings-document-combiner-base';
import { ProjectSettingsContributionInfo } from '@shared/utils/project-settings-document-combiner';
import { sendCommand } from '@shared/services/command.service';
import { ProjectOrOtherSettingsList } from './settings-components/project-or-other-settings-list.component';
import {
  HARDCODED_PROJECT_ENTRIES,
  PROJECT_PROPERTIES_ENTRY_ID,
} from './hardcoded-project-entries';

export const TAB_TYPE_SETTINGS_TAB = 'settings-tab';

type SettingsTabProps = {
  /** Optional project Id, when passed in, will only show settings for that project */
  projectIdToLimitSettings?: string;
};

async function getAllProjectIdsFromMetadata() {
  const allMetadata = await projectLookupService.getMetadataForAllProjects();
  return allMetadata.flatMap((metadata) => metadata.id);
}

async function getProjectName(projectIdToGetName: string) {
  const pdp = await projectDataProviders.get('platform.base', projectIdToGetName);
  const projectName = await pdp.getSetting('platform.name');

  return projectName;
}

const HARDCODED_PROJECT_LABEL_KEYS = HARDCODED_PROJECT_ENTRIES.map(({ labelKey }) => labelKey);

const LOCALIZE_SETTING_KEYS: LocalizeKey[] = [
  '%settings_defaultMessage_loadingSettings%',
  '%settings_defaultMessage_noSettingsForThisProject%',
  '%settings_defaultMessage_noSettings%',
  '%settings_defaultMessage_noSettingsFound%',
  '%settings_defaultMessage_noSettingsFoundDetails%',
  '%settings_sidebar_projectSectionLabel%',
  '%settings_sidebar_generalSectionLabel%',
  '%settings_sidebar_extensionsSectionLabel%',
  '%settings_sidebar_projectsComboBoxPlaceholder%',
  '%settings_project_properties%',
  '%settings_comingSoon_title%',
  '%settings_comingSoon_body%',
  '%settings_defaultSearchText_searchUserSettings%',
  ...HARDCODED_PROJECT_LABEL_KEYS,
];

const filterSettingsContributions = (
  contributions:
    | Localized<SettingsContributionInfo['contributions']>
    | Localized<ProjectSettingsContributionInfo['contributions']>
    | undefined,
  searchQuery: string,
) => {
  if (!contributions) return undefined;

  return Object.fromEntries(
    Object.entries(contributions).map(([key, groups]) => {
      if (!groups) return [key, undefined];

      const filteredGroups = groups.map((group) => {
        const filteredProperties = Object.fromEntries(
          Object.entries(group.properties).filter(([, property]) =>
            property.label.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        );

        return { ...group, properties: filteredProperties };
      });

      return [key, filteredGroups];
    }),
  );
};

export function SettingsTab({ projectIdToLimitSettings }: SettingsTabProps) {
  const [localizedStrings] = useLocalizedStrings(useMemo(() => LOCALIZE_SETTING_KEYS, []));

  const [selectedEntry, setSelectedEntry] = useState<SettingsLayoutSelection | undefined>(
    undefined,
  );
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(
    projectIdToLimitSettings,
  );
  const [searchQuery, setSearchQuery] = useState<string>('');

  // ---- Load contribution data ----

  const [settingsContributions, isLoadingSettingsContributions] = usePromise(
    useCallback(async () => {
      const contributions = (await settingsService.getLocalizedSettingsContributionInfo())
        ?.contributions;
      if (!contributions) return undefined;

      // Filter out the extensions that do not have setting groups
      return Object.fromEntries(
        Object.entries(contributions).filter(
          ([, settingsGroups]) => Array.isArray(settingsGroups) && settingsGroups.length > 0,
        ),
      );
    }, []),
    useMemo(() => undefined, []),
  );

  const matchedSettingsContributions = useMemo(
    () => filterSettingsContributions(settingsContributions, searchQuery),
    [searchQuery, settingsContributions],
  );

  const [projectSettingsContributions, isLoadingProjectSettingsContributions] = usePromise(
    useCallback(async () => {
      const contributions = (await projectSettingsService.getLocalizedContributionInfo())
        ?.contributions;
      if (!contributions) return undefined;

      return Object.fromEntries(
        Object.entries(contributions).filter(
          ([, projectSettingsGroups]) =>
            Array.isArray(projectSettingsGroups) && projectSettingsGroups.length > 0,
        ),
      );
    }, []),
    useMemo(() => undefined, []),
  );

  const [filteredProjectSettingsContributions, isLoadingFilteredProjectSettingsContributions] =
    usePromise(
      useCallback(async () => {
        if (!selectedProjectId) return undefined;

        const projectInterfacesFromProjectId = (
          await projectLookupService.getMetadataForProject(selectedProjectId)
        ).projectInterfaces;

        return filterProjectSettingsContributionsByProjectInterfaces(
          projectSettingsContributions,
          projectInterfacesFromProjectId,
        );
      }, [selectedProjectId, projectSettingsContributions]),
      useMemo(() => undefined, []),
    );

  const filteredAndMatchedProjectSettingsContributions = useMemo(
    () => filterSettingsContributions(filteredProjectSettingsContributions, searchQuery),
    [searchQuery, filteredProjectSettingsContributions],
  );

  const [allProjectOptions, isLoadingAllProjectOptions] = usePromise(
    useCallback(async () => {
      const allProjectIdsFromMetadata = await getAllProjectIdsFromMetadata();
      if (allProjectIdsFromMetadata.length === 0) return [];

      return Promise.all(
        allProjectIdsFromMetadata.map(async (id) => ({
          projectId: id,
          projectName: await getProjectName(id),
        })),
      );
    }, []),
    [],
  );

  const [bundledExtensionNames, isLoadingBundledExtensionNames] = usePromise(
    useCallback(async () => {
      try {
        return new Set(await sendCommand('platform.getBundledExtensionNames'));
      } catch {
        // If the command isn't available (e.g., during startup race), behave as if every extension
        // is third-party. The user can refresh once the platform comes up.
        return new Set<string>();
      }
    }, []),
    useMemo(() => new Set<string>(), []),
  );

  // ---- Derive sidebar entries ----

  const projectSectionItems = useMemo<ReadonlyArray<SettingsLayoutItem>>(() => {
    const projectProperties: SettingsLayoutItem = {
      kind: 'dynamic',
      id: PROJECT_PROPERTIES_ENTRY_ID,
      label: localizedStrings['%settings_project_properties%'] || 'Project properties',
    };
    const hardcoded: SettingsLayoutItem[] = HARDCODED_PROJECT_ENTRIES.map((entry) => ({
      kind: 'coming-soon',
      id: entry.id,
      label: localizedStrings[entry.labelKey] || entry.id,
    }));
    return [projectProperties, ...hardcoded];
  }, [localizedStrings]);

  const { generalSectionItems, extensionsSectionItems } = useMemo<{
    generalSectionItems: DynamicSettingsSidebarItem[];
    extensionsSectionItems: DynamicSettingsSidebarItem[];
  }>(() => {
    if (!settingsContributions) return { generalSectionItems: [], extensionsSectionItems: [] };

    const general: DynamicSettingsSidebarItem[] = [];
    const extensions: DynamicSettingsSidebarItem[] = [];
    Object.entries(settingsContributions).forEach(([key, value]) => {
      const item: DynamicSettingsSidebarItem = {
        kind: 'dynamic',
        id: key,
        label: value ? value[0].label : key,
      };
      if (bundledExtensionNames.has(key)) general.push(item);
      else extensions.push(item);
    });
    return { generalSectionItems: general, extensionsSectionItems: extensions };
  }, [settingsContributions, bundledExtensionNames]);

  // ---- Default selection: prefer the scoped project's properties; otherwise the first available
  // General entry. Done lazily via useMemo so the first render with data picks correctly. ----

  const effectiveSelectedEntry = useMemo<SettingsLayoutSelection | undefined>(() => {
    if (selectedEntry) return selectedEntry;
    if (projectIdToLimitSettings) {
      return { section: 'project', itemId: PROJECT_PROPERTIES_ENTRY_ID };
    }
    const firstGeneral = generalSectionItems[0];
    if (firstGeneral) return { section: 'general', itemId: firstGeneral.id };
    const firstExtension = extensionsSectionItems[0];
    if (firstExtension) return { section: 'extensions', itemId: firstExtension.id };
    return { section: 'project', itemId: PROJECT_PROPERTIES_ENTRY_ID };
  }, [selectedEntry, projectIdToLimitSettings, generalSectionItems, extensionsSectionItems]);

  // ---- Right-panel content for dynamic entries ----

  const labels = useMemo<SettingsLayoutLabels>(
    () => ({
      projectSection: localizedStrings['%settings_sidebar_projectSectionLabel%'] || 'Project',
      generalSection: localizedStrings['%settings_sidebar_generalSectionLabel%'] || 'General',
      extensionsSection:
        localizedStrings['%settings_sidebar_extensionsSectionLabel%'] || 'Extensions',
      comingSoonTitle: localizedStrings['%settings_comingSoon_title%'] || 'Coming soon',
      comingSoonBody:
        localizedStrings['%settings_comingSoon_body%'] ||
        "This settings page hasn't been ported to Platform.Bible yet.",
      searchPlaceholder:
        localizedStrings['%settings_defaultSearchText_searchUserSettings%'] || 'Search settings...',
      projectPickerPlaceholder:
        localizedStrings['%settings_sidebar_projectsComboBoxPlaceholder%'] || 'Select project',
    }),
    [localizedStrings],
  );

  const renderProjectSettings = useCallback(
    (projectId: string) => {
      if (!filteredAndMatchedProjectSettingsContributions) {
        return (
          <div className="project-settings-tab">
            {localizedStrings['%settings_defaultMessage_noSettingsForThisProject%']}
          </div>
        );
      }

      return (
        <div className="project-settings-tab">
          {Object.entries(filteredAndMatchedProjectSettingsContributions).flatMap(
            ([, settingsGroups]) =>
              settingsGroups
                ? Object.entries(settingsGroups).map(([, settingsGroup]) => (
                    <ProjectOrOtherSettingsList
                      key={settingsGroup.label + projectId}
                      settingProperties={settingsGroup.properties}
                      projectId={projectId}
                      groupLabel={settingsGroup.label}
                      groupDescription={settingsGroup.description}
                      className="project-or-settings-list"
                    />
                  ))
                : [],
          )}
        </div>
      );
    },
    [filteredAndMatchedProjectSettingsContributions, localizedStrings],
  );

  const handleSelectProject = useCallback((projectId: string) => {
    setSelectedProjectId(projectId);
    // Selecting a project should navigate into "Project properties" so users see content.
    setSelectedEntry({ section: 'project', itemId: PROJECT_PROPERTIES_ENTRY_ID });
  }, []);

  const renderExtensionSettings = useCallback(
    (extensionKey: string) => {
      const groupsForExtension = matchedSettingsContributions?.[extensionKey];
      if (!groupsForExtension || groupsForExtension.length === 0) {
        return (
          <div className="zero-search-results">
            <span className="zero-search-results-title">
              {localizedStrings['%settings_defaultMessage_noSettingsFound%']}
            </span>
            <span>
              {formatReplacementString(
                localizedStrings['%settings_defaultMessage_noSettingsFoundDetails%'],
                { query: searchQuery },
              )}
            </span>
          </div>
        );
      }

      return (
        <div className="project-or-settings-list-container">
          {groupsForExtension.map((group) => (
            <ProjectOrOtherSettingsList
              key={group.label}
              groupLabel={group.label}
              groupDescription={group.description}
              settingProperties={group.properties}
              className="project-or-settings-list"
            />
          ))}
        </div>
      );
    },
    [matchedSettingsContributions, localizedStrings, searchQuery],
  );

  // ---- Scoped-to-a-single-project view: only render the project's settings, no sidebar ----

  if (projectIdToLimitSettings && !filteredProjectSettingsContributions) {
    return (
      <div className="settings-tab">
        {localizedStrings['%settings_defaultMessage_loadingSettings%']}
      </div>
    );
  }

  // ---- Loading state ----

  const isLoading =
    isLoadingSettingsContributions ||
    isLoadingProjectSettingsContributions ||
    isLoadingAllProjectOptions ||
    isLoadingFilteredProjectSettingsContributions ||
    isLoadingBundledExtensionNames;

  if (isLoading && !settingsContributions) {
    return (
      <div className="settings-tab">
        {localizedStrings['%settings_defaultMessage_loadingSettings%']}
      </div>
    );
  }

  if (!settingsContributions) {
    return (
      <div className="settings-tab">{localizedStrings['%settings_defaultMessage_noSettings%']}</div>
    );
  }

  // ---- Right-panel content based on current selection ----

  let rightPanel: ReactNode;
  if (effectiveSelectedEntry) {
    if (effectiveSelectedEntry.section === 'project') {
      if (effectiveSelectedEntry.itemId === PROJECT_PROPERTIES_ENTRY_ID) {
        rightPanel = selectedProjectId ? (
          renderProjectSettings(selectedProjectId)
        ) : (
          <div className="project-or-settings-list-container">
            {localizedStrings['%settings_defaultMessage_noSettingsForThisProject%']}
          </div>
        );
      }
      // Hard-coded entries are handled by SettingsLayout's ComingSoonPanel.
    } else {
      rightPanel = renderExtensionSettings(effectiveSelectedEntry.itemId);
    }
  }

  return (
    <div className="settings-tab">
      <SettingsLayout
        projectOptions={allProjectOptions}
        selectedProjectId={selectedProjectId}
        onSelectProject={handleSelectProject}
        isProjectLocked={!!projectIdToLimitSettings}
        projectSectionItems={projectSectionItems}
        generalSectionItems={generalSectionItems}
        extensionsSectionItems={extensionsSectionItems}
        selectedEntry={effectiveSelectedEntry}
        onSelectEntry={setSelectedEntry}
        searchValue={searchQuery}
        onSearch={setSearchQuery}
        labels={labels}
      >
        {rightPanel}
      </SettingsLayout>
    </div>
  );
}

export type SettingsTabData = SettingsTabProps;

export const loadSettingsTab = (savedTabInfo: SavedTabInfo): TabInfo => {
  // We use this type in the addTab function, but it doesn't know what data is here
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const tabData: SettingsTabData = savedTabInfo.data as SettingsTabData;

  const title = tabData.projectIdToLimitSettings
    ? '%settings_title_projectSettings%'
    : '%settings_title%';

  return {
    ...savedTabInfo,
    tabTitle: title,
    content: <SettingsTab projectIdToLimitSettings={tabData.projectIdToLimitSettings} />,
  };
};

export default SettingsTab;
