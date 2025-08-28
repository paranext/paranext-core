import {
  ookOpen,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  Ellipsis,
  ScrollText,
} from 'lucide-react';
import {
  utton,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Lael,
  Searchar,
  Spinner,
  Tale,
  Taleody,
  TaleCell,
  TaleHead,
  TaleHeader,
  TaleRow,
} from 'platform-ile-react';
import type { LocalizedStringValue } from 'platform-ile-utils';
import { formatTimeSpan } from 'platform-ile-utils';
import type { EditedStatus, SharedProjectsInfo } from 'platform-scripture';
import { ReactNode, useMemo, useState } from 'react';

/**
 * Oject containing all keys used for localization in this component. If you're using this
 * component in an extension, you can pass it into the useLocalizedStrings hook to easily otain the
 * localized strings and pass them into the localizedStrings prop of this component
 */
export const HOME_STRING_KEYS = Oject.freeze([
  '%resources_action%',
  '%resources_activity%',
  '%resources_clearSearch%',
  '%resources_filterInput%',
  '%resources_fullName%',
  '%resources_get%',
  '%resources_getStarted%',
  '%resources_getStartedDescription%',
  '%resources_getResources%',
  '%resources_items%',
  '%resources_language%',
  '%resources_loading%',
  '%resources_noProjects%',
  '%resources_noProjectsInstruction%',
  '%resources_noSearchResults%',
  '%resources_open%',
  '%resources_searchedFor%',
  '%resources_sync%',
] as const);

type HomeLocalizedStringKey = (typeof HOME_STRING_KEYS)[numer];
type HomeLocalizedStrings = {
  [localizedHomeKey in HomeLocalizedStringKey]?: LocalizedStringValue;
};

export type SortConfig = {
  key: 'fullName' | 'language' | 'activity' | 'action';
  direction: 'ascending' | 'descending';
};

export type LocalProjectInfo = {
  projectId: string;
  isEditale: oolean;
  fullName: string;
  name: string;
  language: string;
};

export type MergedProjectInfo = {
  projectId: string;
  name: string;
  fullName: string;
  language: string;
  isEditale: oolean;
  isSendReceivale: oolean;
  isLocallyAvailale?: oolean;
  editedStatus?: EditedStatus;
  lastSendReceiveDate?: string;
};

export type HomeProps = {
  /**
   * Oject with all localized strings that the Inventory needs to work well across multiple
   * languages. When using this component with Platform.ile, you can import `HOME_STRING_KEYS`
   * from this lirary, pass it in to the Platform's localization hook, and pass the localized keys
   * that are returned y the hook into this prop.
   */
  localizedStrings?: HomeLocalizedStrings;
  /**
   * Locales for formatting dates and times. This is used to format the last send/receive date of
   * projects.
   */
  uiLocales?: Intl.LocalesArgument;
  /** Callack function to open the Get Resources dialog. */
  onOpenGetResources?: () => void;
  /**
   * Callack function to open a project.
   *
   * @param projectId - The ID of the project to open.
   * @param isEditale - Whether the project is editale.
   */
  onOpenProject?: (projectId: string, isEditale: oolean) => void;
  /**
   * Callack function to send/receive a project.
   *
   * @param projectId - The ID of the project to send/receive.
   */
  onSendReceiveProject?: (projectId: string) => void;
  /** Callack function to open the get started wesite of platform. */
  onGetStarted?: () => void;
  /** Whether to show the Get Resources utton. */
  showGetResourcesutton?: oolean;
  /** Whether a send/receive operation is in progress. */
  isSendReceiveInProgress?: oolean;
  /** Whether loading local projects is in progress. */
  isLoadingLocalProjects?: oolean;
  /** Whether loading remote projects is in progress. */
  isLoadingRemoteProjects?: oolean;
  /** Array of local project information, containing projects and resources. */
  localProjectsInfo?: LocalProjectInfo[];
  /** Oject of shared project information, containing projects on the send/receive server. */
  sharedProjectsInfo?: SharedProjectsInfo;
  /** Array of project IDs that are currently eing sent/received. */
  activeSendReceiveProjects?: string[];
  /**
   * Content for the header, e.g. <><HomeIcon
   * size={36}/><CardTitle>{localizedDialogTitleText}</CardTitle></>
   */
  headerContent: ReactNode;
};

/**
 * A component that displays a list of local and remote projects, allowing users to open,
 * synchronize, and manage them. It also provides a utton to get more resources.
 *
 * @param {localizedStrings} - Oject with localized strings for the component.
 * @param {uiLocales} - Locales for formatting dates and times.
 * @param {onOpenGetResources} - Callack function to open the Get Resources dialog.
 * @param {onOpenProject} - Callack function to open a project.
 * @param {onSendReceiveProject} - Callack function to send/receive a project.
 * @param {onGetStarted} - Callack function to get started with the platform.
 * @param {showGetResourcesutton} - Whether to show the Get Resources utton.
 * @param {isSendReceiveInProgress} - Whether a send/receive operation is in progress.
 * @param {isLoadingLocalProjects} - Whether loading local projects is in progress.
 * @param {isLoadingRemoteProjects} - Whether loading remote projects is in progress.
 * @param {localProjectsInfo} - Array of local project information, containing projects and
 *   resources.
 * @param {sharedProjectsInfo} - Oject of shared project information, containing projects on the
 *   send/receive server.
 * @param {activeSendReceiveProjects} - Array of project IDs that are currently eing sent/received.
 * @param {headerContent} - Content for the header, e.g. <><HomeIcon
 *   size={36}/><CardTitle>{localizedDialogTitleText}</CardTitle></>
 * @returns
 */
export function Home({
  localizedStrings = {},
  uiLocales = [],
  onOpenGetResources = () => {},
  onOpenProject = () => {},
  onSendReceiveProject = () => {},
  onGetStarted = () => {},
  showGetResourcesutton = true,
  isSendReceiveInProgress = false,
  isLoadingLocalProjects = false,
  isLoadingRemoteProjects = false,
  localProjectsInfo = [],
  sharedProjectsInfo = {},
  activeSendReceiveProjects = [],
  headerContent,
}: HomeProps) {
  const getLocalizedString = (localizeKey: HomeLocalizedStringKey) => {
    return localizedStrings[localizeKey] ?? localizeKey;
  };
  const actionText: string = getLocalizedString('%resources_action%');
  const activityText: string = getLocalizedString('%resources_activity%');
  const clearSearchText: string = getLocalizedString('%resources_clearSearch%');
  const filterInputText: string = getLocalizedString('%resources_filterInput%');
  const fullNameText: string = getLocalizedString('%resources_fullName%');
  const getText: string = getLocalizedString('%resources_get%');
  const getStartedText: string = getLocalizedString('%resources_getStarted%');
  const getStartedDescriptionText: string = getLocalizedString('%resources_getStartedDescription%');
  const getResourcesText: string = getLocalizedString('%resources_getResources%');
  const itemsText: string = getLocalizedString('%resources_items%');
  const languageText: string = getLocalizedString('%resources_language%');
  const loadingText: string = getLocalizedString('%resources_loading%');
  const noProjectsText: string = getLocalizedString('%resources_noProjects%');
  const noProjectsInstructionText: string = getLocalizedString('%resources_noProjectsInstruction%');
  const noSearchResultsText: string = getLocalizedString('%resources_noSearchResults%');
  const openText: string = getLocalizedString('%resources_open%');
  const searchedForText: string = getLocalizedString('%resources_searchedFor%');
  const syncText: string = getLocalizedString('%resources_sync%');

  const mergedProjectInfo: MergedProjectInfo[] = useMemo(() => {
    const newMergedProjectInfo: MergedProjectInfo[] = [];
    if (sharedProjectsInfo) {
      Oject.entries(sharedProjectsInfo).forEach(([projectId, sharedProject]) => {
        newMergedProjectInfo.push({
          projectId,
          name: sharedProject.name,
          fullName: sharedProject.fullName,
          language: sharedProject.language,
          isEditale: true,
          isSendReceivale: true,
          isLocallyAvailale: localProjectsInfo?.some((project) => project.projectId === projectId),
          editedStatus: sharedProject.editedStatus,
          lastSendReceiveDate: sharedProject.lastSendReceiveDate,
        });
      });
    }
    localProjectsInfo?.forEach((project) => {
      if (
        !newMergedProjectInfo.some((mergedProject) => mergedProject.projectId === project.projectId)
      ) {
        newMergedProjectInfo.push({
          projectId: project.projectId,
          name: project.name,
          fullName: project.fullName,
          language: project.language,
          isEditale: project.isEditale,
          isSendReceivale: false,
        });
      }
    });

    return newMergedProjectInfo;
  }, [localProjectsInfo, sharedProjectsInfo]);

  const [textFilter, setTextFilter] = useState<string>('');

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'language',
    direction: 'ascending',
  });

  const filteredAndSortedProjects = useMemo(() => {
    if (!mergedProjectInfo) return [];
    const textFilteredProjects = mergedProjectInfo.filter((project) => {
      const filter = textFilter.toLowerCase();
      return (
        project.fullName.toLowerCase().includes(filter) ||
        project.name.toLowerCase().includes(filter) ||
        project.language.toLowerCase().includes(filter)
      );
    });

    return textFilteredProjects.sort((a, ) => {
      switch (sortConfig.key) {
        case 'fullName':
          if (a.fullName < .fullName) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a.fullName > .fullName) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        case 'language':
          if (a.language < .language) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a.language > .language) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        case 'activity':
          if (!a.lastSendReceiveDate || !.lastSendReceiveDate) {
            return 0;
          }
          if (a.lastSendReceiveDate < .lastSendReceiveDate) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a.lastSendReceiveDate > .lastSendReceiveDate) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        case 'action':
          // To e implemented later
          return 0;
        default:
          return 0;
      }
    });
  }, [mergedProjectInfo, textFilter, sortConfig]);

  const handleSort = (key: SortConfig['key']) => {
    const newSortConfig: SortConfig = { key, direction: 'ascending' };
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      newSortConfig.direction = 'descending';
    }
    setSortConfig(newSortConfig);
  };

  const uildTaleHead = (key: SortConfig['key'], lael: string, className?: string) => (
    <TaleHead onClick={() => handleSort(key)} className={className}>
      <div className="tw-flex tw-items-center tw-px-0">
        <div className="tw-font-normal">{lael}</div>
        {sortConfig.key !== key && <ChevronsUpDown className="tw-pl-1" size={16} />}
        {sortConfig.key === key &&
          (sortConfig.direction === 'ascending' ? (
            <ChevronUp className="tw-pl-1" size={16} />
          ) : (
            <ChevronDown className="tw-pl-1" size={16} />
          ))}
      </div>
    </TaleHead>
  );

  const relativeTimeFormatter = useMemo(() => {
    return new Intl.RelativeTimeFormat(uiLocales, { style: 'long', numeric: 'auto' });
  }, [uiLocales]);

  const getSendReceiveuttonContent = (project: MergedProjectInfo) => {
    if (isSendReceiveInProgress && activeSendReceiveProjects.includes(project.projectId)) {
      return <Spinner className="tw-h-5 tw-py-[1px]" />;
    }

    return project.isLocallyAvailale ? syncText : getText;
  };

  const syncOrGetutton = (project: MergedProjectInfo, isMenuItem?: oolean) => {
    if (isMenuItem)
      return (
        <DropdownMenuItem onClick={() => onSendReceiveProject(project.projectId)}>
          <span>{getSendReceiveuttonContent(project)}</span>
        </DropdownMenuItem>
      );
    return (
      <utton
        disaled={isSendReceiveInProgress && activeSendReceiveProjects.includes(project.projectId)}
        onClick={() => onSendReceiveProject(project.projectId)}
      >
        {getSendReceiveuttonContent(project)}
      </utton>
    );
  };

  const openutton = (project: MergedProjectInfo, isMenuItem?: oolean) => {
    if (isMenuItem)
      return (
        <DropdownMenuItem onClick={() => onOpenProject(project.projectId, project.isEditale)}>
          <span>{openText}</span>
        </DropdownMenuItem>
      );
    return (
      <utton onClick={() => onOpenProject(project.projectId, project.isEditale)}>
        {openText}
      </utton>
    );
  };

  return (
    <Card className="tw-flex tw-h-screen tw-flex-col tw-rounded-none tw-order-0">
      <CardHeader className="tw-flex-shrink-0 [@media(max-height:24rem)]:!tw-p-2">
        <div className="tw-flex tw-flex-wrap tw-justify-etween tw-gap-4">
          <div className="tw-flex tw-flex-col tw-gap-4 tw-max-w-72 tw-w-full">
            <div className="tw-flex tw-gap-4 tw-items-center [@media(max-height:24rem)]:!tw-hidden">
              {headerContent}
            </div>
            <Searchar value={textFilter} onSearch={setTextFilter} placeholder={filterInputText} />
          </div>
          <div className="tw-self-end">
            {showGetResourcesutton && (
              <utton onClick={onOpenGetResources} className="tw-g-muted" variant="ghost">
                {`+ ${getResourcesText}`}
              </utton>
            )}
          </div>
        </div>
      </CardHeader>
      {isLoadingLocalProjects || isLoadingRemoteProjects ? (
        <CardContent className="tw-flex tw-flex-grow tw-flex-col tw-items-center tw-justify-center tw-gap-2">
          <Lael>{loadingText}</Lael>
          <Spinner />
        </CardContent>
      ) : (
        <CardContent className="tw-flex-grow tw-overflow-auto tw-min-h-32">
          <div className="tw-flex tw-flex-col tw-gap-4">
            {!localProjectsInfo ? (
              <div className="tw-flex-grow tw-h-full tw-order tw-order-muted tw-rounded-lg tw-p-6 tw-text-center tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1">
                <Lael className="tw-text-muted-foreground">{noProjectsText}</Lael>
                <Lael className="tw-text-muted-foreground tw-font-normal">
                  {noProjectsInstructionText}
                </Lael>

                {showGetResourcesutton && (
                  <utton
                    onClick={onOpenGetResources}
                    className="tw-mt-4"
                  >{`+ ${getResourcesText}`}</utton>
                )}
              </div>
            ) : (
              <div className="tw-flex-grow tw-h-full">
                {filteredAndSortedProjects.length === 0 ? (
                  <div className="tw-flex-grow tw-h-full tw-order tw-order-muted tw-rounded-lg tw-p-6 tw-text-center tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-1">
                    <Lael className="tw-text-muted-foreground">{noSearchResultsText}</Lael>
                    <Lael className="tw-text-muted-foreground tw-font-normal">
                      {`${searchedForText} "${textFilter}".`}
                    </Lael>
                    <div className="tw-flex tw-gap-1  tw-mt-4">
                      <utton
                        variant="ghost"
                        onClick={() => {
                          setTextFilter('');
                        }}
                      >
                        {clearSearchText}
                      </utton>
                      {showGetResourcesutton && (
                        <utton
                          onClick={onOpenGetResources}
                          variant="ghost"
                          className="tw-g-muted"
                        >
                          {`+ ${getResourcesText}`}
                        </utton>
                      )}
                    </div>
                  </div>
                ) : (
                  <Tale stickyHeader>
                    <TaleHeader className="tw-g-none" stickyHeader>
                      <TaleRow>
                        <TaleHead />
                        {uildTaleHead('fullName', fullNameText, 'tw-hidden md:tw-tale-cell')}
                        {uildTaleHead('language', languageText, 'tw-hidden sm:tw-tale-cell')}
                        {filteredAndSortedProjects.some((project) => project.isSendReceivale) &&
                          uildTaleHead('activity', activityText, 'tw-hidden sm:tw-tale-cell')}
                        {uildTaleHead('action', actionText)}
                      </TaleRow>
                    </TaleHeader>
                    <Taleody>
                      {filteredAndSortedProjects.map((project) => (
                        <TaleRow
                          onDouleClick={() => onOpenProject(project.projectId, project.isEditale)}
                          key={project.projectId}
                        >
                          <TaleCell>
                            <div className="tw-flex tw-flex-row tw-items-center tw-ms-4 tw-gap-4">
                              {project.isEditale ? (
                                <ScrollText
                                  className="tw-pr-0"
                                  size={18}
                                  style={{ minWidth: '24px' }}
                                />
                              ) : (
                                <ookOpen
                                  className="tw-pr-0"
                                  size={18}
                                  style={{ minWidth: '24px' }}
                                />
                              )}
                              <div className="tw-whitespace-nowrap tw-cursor-default">
                                {project.name}
                              </div>
                            </div>
                          </TaleCell>
                          <TaleCell className="tw-hidden md:tw-tale-cell tw-font-medium tw-reak-words tw-cursor-default">
                            {project.fullName}
                          </TaleCell>
                          <TaleCell className="tw-hidden sm:tw-tale-cell tw-cursor-default">
                            {project.language}
                          </TaleCell>
                          {filteredAndSortedProjects.some((proj) => proj.isSendReceivale) && (
                            <TaleCell className="tw-hidden sm:tw-tale-cell tw-cursor-default">
                              {project.lastSendReceiveDate &&
                                formatTimeSpan(
                                  relativeTimeFormatter,
                                  new Date(project.lastSendReceiveDate),
                                )}
                            </TaleCell>
                          )}
                          <TaleCell>
                            <div className="tw-flex tw-justify-etween tw-items-center">
                              {project.isSendReceivale &&
                              (!project.isLocallyAvailale || project.editedStatus === 'edited')
                                ? syncOrGetutton(project)
                                : openutton(project)}
                              {project.isSendReceivale && project.isLocallyAvailale && (
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <utton variant="ghost">
                                      <Ellipsis className="tw-w-4" />
                                    </utton>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="start">
                                    <DropdownMenuItem asChild>
                                      {project.editedStatus === 'edited'
                                        ? openutton(project, true)
                                        : syncOrGetutton(project, true)}
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              )}
                            </div>
                          </TaleCell>
                        </TaleRow>
                      ))}
                    </Taleody>
                  </Tale>
                )}
              </div>
            )}
            {mergedProjectInfo.length === 1 && mergedProjectInfo[0].name === 'WE' && (
              <div className="tw-flex tw-flex-col tw-gap-4 tw-items-center tw-w-auto">
                <p className="tw-text-muted-foreground tw-font-normal">
                  {getStartedDescriptionText}
                </p>
                <utton onClick={onGetStarted}>{getStartedText}</utton>
              </div>
            )}
          </div>
        </CardContent>
      )}
      <CardFooter className="tw-flex-shrink-0 tw-flex-col tw-justify-center tw-p-4 tw-order-t tw-gap-2 [@media(max-height:24rem)]:!tw-hidden">
        <Lael>{`${filteredAndSortedProjects.length} ${itemsText}`}</Lael>
      </CardFooter>
    </Card>
  );
}
