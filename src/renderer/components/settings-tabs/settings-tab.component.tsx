import { ReactNode, useCallback, useMemo, useState } from 'react';
import {
  type SelectedSidebarEntry,
  type SettingsSidebarItem,
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
import {
  SettingsLayout,
  SETTINGS_PROJECT_SECTION_ID as PROJECT_SECTION_ID,
  SETTINGS_GENERAL_SECTION_ID as GENERAL_SECTION_ID,
  SETTINGS_EXTENSIONS_SECTION_ID as EXTENSIONS_SECTION_ID,
  type SettingsLayoutLabels,
} from './settings-components/settings-layout.component';

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
  '%settings_sidebar_projectSettingsLabel%',
  '%settings_sidebar_generalSettingsLabel%',
  '%settings_sidebar_extensionsSettingsLabel%',
  '%settings_sidebar_projectsComboBoxPlaceholder%',
  '%settings_searchBar_placeholder%',
  '%settings_project_properties%',
  '%settings_comingSoon_title%',
  '%settings_comingSoon_body%',
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

  const [selectedEntry, setSelectedEntry] = useState<SelectedSidebarEntry | undefined>(undefined);
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

  const [packagedExtensionNames, isLoadingPackagedExtensionNames] = usePromise(
    useCallback(async () => {
      try {
        return new Set(await sendCommand('platform.getPackagedExtensionNames'));
      } catch {
        // If the command isn't available (e.g., during startup race), behave as if every extension
        // is third-party. The user can refresh once the platform comes up.
        return new Set<string>();
      }
    }, []),
    useMemo(() => new Set<string>(), []),
  );

  // ---- Derive sidebar entries ----

  /**
   * Project-section items are disabled until the user picks a project (or the dialog is opened
   * scoped to one). Without a project, there's nothing meaningful to show.
   */
  const isProjectSectionInteractive = !!selectedProjectId;

  const projectSectionItems = useMemo<ReadonlyArray<SettingsSidebarItem>>(() => {
    const projectProperties: SettingsSidebarItem = {
      id: PROJECT_PROPERTIES_ENTRY_ID,
      label: localizedStrings['%settings_project_properties%'] || 'Project properties',
      disabled: !isProjectSectionInteractive,
    };
    const hardcoded: SettingsSidebarItem[] = HARDCODED_PROJECT_ENTRIES.map((entry) => ({
      id: entry.id,
      label: localizedStrings[entry.labelKey] || entry.id,
      isComingSoon: true,
      disabled: !isProjectSectionInteractive,
    }));
    return [projectProperties, ...hardcoded];
  }, [localizedStrings, isProjectSectionInteractive]);

  const { generalSectionItems, extensionsSectionItems } = useMemo<{
    generalSectionItems: SettingsSidebarItem[];
    extensionsSectionItems: SettingsSidebarItem[];
  }>(() => {
    if (!settingsContributions) return { generalSectionItems: [], extensionsSectionItems: [] };

    const general: SettingsSidebarItem[] = [];
    const extensions: SettingsSidebarItem[] = [];
    Object.entries(settingsContributions).forEach(([key, value]) => {
      const item: SettingsSidebarItem = {
        id: key,
        label: value ? value[0].label : key,
      };
      // The platform's own settings (key 'platform') belong under General Settings — they're part
      // of the core platform, not a third-party extension. Other in-repo extensions are surfaced
      // via the `platform.getPackagedExtensionNames` command.
      if (key === 'platform' || packagedExtensionNames.has(key)) general.push(item);
      else extensions.push(item);
    });
    return { generalSectionItems: general, extensionsSectionItems: extensions };
  }, [settingsContributions, packagedExtensionNames]);

  // ---- Default selection: prefer the scoped project's properties; otherwise the first available
  // General entry. Done lazily via useMemo so the first render with data picks correctly. ----

  const effectiveSelectedEntry = useMemo<SelectedSidebarEntry | undefined>(() => {
    if (selectedEntry) return selectedEntry;
    if (projectIdToLimitSettings) {
      return { sectionId: PROJECT_SECTION_ID, itemId: PROJECT_PROPERTIES_ENTRY_ID };
    }
    const firstGeneral = generalSectionItems[0];
    if (firstGeneral) return { sectionId: GENERAL_SECTION_ID, itemId: firstGeneral.id };
    const firstExtension = extensionsSectionItems[0];
    if (firstExtension) return { sectionId: EXTENSIONS_SECTION_ID, itemId: firstExtension.id };
    return { sectionId: PROJECT_SECTION_ID, itemId: PROJECT_PROPERTIES_ENTRY_ID };
  }, [selectedEntry, projectIdToLimitSettings, generalSectionItems, extensionsSectionItems]);

  // ---- Project selection + labels handed to the presentational layout ----

  const handleSelectProject = useCallback((projectId: string) => {
    setSelectedProjectId(projectId);
    // Selecting a project should navigate into "Project properties" so users see content.
    setSelectedEntry({ sectionId: PROJECT_SECTION_ID, itemId: PROJECT_PROPERTIES_ENTRY_ID });
  }, []);

  const labels = useMemo<SettingsLayoutLabels>(
    () => ({
      projectSection: localizedStrings['%settings_sidebar_projectSettingsLabel%'] || 'Project',
      generalSection: localizedStrings['%settings_sidebar_generalSettingsLabel%'] || 'General',
      extensionsSection:
        localizedStrings['%settings_sidebar_extensionsSettingsLabel%'] || 'Extensions',
      comingSoonTitle: localizedStrings['%settings_comingSoon_title%'] || 'Coming soon',
      comingSoonBody:
        localizedStrings['%settings_comingSoon_body%'] ||
        "This settings page hasn't been ported to Platform.Bible yet.",
      searchPlaceholder:
        localizedStrings['%settings_searchBar_placeholder%'] ||
        'Search app settings, extension settings, and project settings',
      projectPickerPlaceholder:
        localizedStrings['%settings_sidebar_projectsComboBoxPlaceholder%'] || 'Select project',
    }),
    [localizedStrings],
  );

  // ---- Right-panel content for dynamic entries ----

  const renderProjectSettings = useCallback(
    (projectId: string) => {
      if (!filteredAndMatchedProjectSettingsContributions) {
        return (
          <div className="project-settings-tab">
            {localizedStrings['%settings_defaultMessage_noSettingsForThisProject%']}
          </div>
        );
      }

      // The platform-contributed project group has the same label as the "Project properties"
      // sidebar entry. Suppress its inner header so users don't see the title twice.
      const projectPropertiesLabel =
        localizedStrings['%settings_project_properties%'] || 'Project properties';

      return (
        <div className="project-settings-tab">
          {Object.entries(filteredAndMatchedProjectSettingsContributions).flatMap(
            ([, settingsGroups]) =>
              settingsGroups
                ? Object.entries(settingsGroups).map(([, settingsGroup]) => {
                    const isDuplicateOfSidebar = settingsGroup.label === projectPropertiesLabel;
                    return (
                      <ProjectOrOtherSettingsList
                        key={settingsGroup.label + projectId}
                        settingProperties={settingsGroup.properties}
                        projectId={projectId}
                        groupLabel={isDuplicateOfSidebar ? '' : settingsGroup.label}
                        groupDescription={
                          isDuplicateOfSidebar ? undefined : settingsGroup.description
                        }
                        className="project-or-settings-list"
                      />
                    );
                  })
                : [],
          )}
        </div>
      );
    },
    [filteredAndMatchedProjectSettingsContributions, localizedStrings],
  );

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
    isLoadingPackagedExtensionNames;

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
    if (effectiveSelectedEntry.sectionId === PROJECT_SECTION_ID) {
      if (effectiveSelectedEntry.itemId === PROJECT_PROPERTIES_ENTRY_ID) {
        rightPanel = selectedProjectId ? (
          renderProjectSettings(selectedProjectId)
        ) : (
          <div className="project-or-settings-list-container">
            {localizedStrings['%settings_defaultMessage_noSettingsForThisProject%']}
          </div>
        );
      }
      // Coming-soon project entries are left undefined here — SettingsLayout substitutes the
      // ComingSoonPanel for items flagged `isComingSoon`.
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
