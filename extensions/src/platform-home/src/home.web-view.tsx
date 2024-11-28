import papi from '@papi/frontend';
import { useLocalizedStrings } from '@papi/frontend/react';
import { BookOpen, Home, Plus } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  // DropdownMenu,
  // DropdownMenuContent,
  // DropdownMenuItem,
  // DropdownMenuSeparator,
  // DropdownMenuTrigger,
  Label,
  LocalizeKey,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  usePromise,
} from 'platform-bible-react';
import { getErrorMessage } from 'platform-bible-utils';
import { useCallback } from 'react';

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%downloadResources_action%',
  '%downloadResources_dialog_subtitle%',
  '%downloadResources_dialog_title%',
  '%downloadResources_filterInput%',
  '%downloadResources_fullName%',
  '%downloadResources_get%',
  '%downloadResources_installed%',
  '%downloadResources_language%',
  '%downloadResources_languageFilter%',
  '%downloadResources_loadingResources%',
  '%downloadResources_noResults%',
  '%downloadResources_open%',
  '%downloadResources_remove%',
  '%downloadResources_size%',
  '%downloadResources_type%',
  '%downloadResources_typeFilter%',
  '%downloadResources_type_DBL%',
  '%downloadResources_type_ER%',
  '%downloadResources_type_SLR%',
  '%downloadResources_type_XR%',
  '%downloadResources_type_unknown%',
  '%downloadResources_update%',
  '%home_dialog_title%',
  '%home_name%',
];

// const getActionButtonContent = (
//   resource: DblResourceData,
//   buttonText: string,
//   installResource: (dblEntryUid: string, action: 'install' | 'remove') => void,
// ) => {
//   return (
//     <Button variant="outline" onClick={() => installResource(resource.dblEntryUid, 'install')}>
//       {buttonText}
//     </Button>
//   );
// };

// const getActionContent = (
//   resource: DblResourceData,
//   idsBeingHandled: string[],
//   getText: string,
//   updateText: string,
//   installedText: string,
//   installResource: (dblEntryUid: string, action: 'install' | 'remove') => void,
// ) => {
//   const isBeingHandled = idsBeingHandled.includes(resource.dblEntryUid);
//   if (isBeingHandled) {
//     return (
//       <Button variant="outline">
//         <Spinner className="tw-h-5 tw-py-[1px]" />
//       </Button>
//     );
//   }
//   if (!resource.installed) {
//     return getActionButtonContent(resource, getText, installResource);
//   }
//   if (resource.updateAvailable) {
//     return getActionButtonContent(resource, updateText, installResource);
//   }
//   return <Label className="tw-h-6 tw-my-2 tw-flex tw-items-center">{installedText}</Label>;
// };

globalThis.webViewComponent = function DownloadResourcesDialog() {
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);

  const actionText: string = localizedStrings['%downloadResources_action%'];
  const getResourcesText: string = localizedStrings['%downloadResources_dialog_title%'];
  // const getText: string = localizedStrings['%downloadResources_get%'];
  // const installedText: string = localizedStrings['%downloadResources_installed%'];
  const languageText: string = localizedStrings['%downloadResources_language%'];
  const loadingResourcesText: string = localizedStrings['%downloadResources_loadingResources%'];
  // const openText: string = localizedStrings['%downloadResources_open%'];
  // const removeText: string = localizedStrings['%downloadResources_remove%'];
  // const updateText: string = localizedStrings['%downloadResources_update%'];
  const dialogTitleText: string = localizedStrings['%home_dialog_title%'];
  const nameText: string = localizedStrings['%home_name%'];

  const [sharedProjectsInfo, isLoadingSharedProjectsInfo] = usePromise(
    useCallback(async () => {
      // Gather S/R-able projects
      try {
        const projectsInfo = await papi.commands.sendCommand(
          'paratextBibleSendReceive.getSharedProjects',
        );
        return projectsInfo;
      } catch (e) {
        console.log(getErrorMessage(e));
        return undefined;
      }
    }, []),
    undefined,
  );

  return (
    <Card className="tw-border-0 tw-rounded-none">
      <CardHeader>
        <div className="tw-flex tw-items-center">
          <Home size={36} className="tw-mr-2" />
          <div>
            <CardTitle>{dialogTitleText}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoadingSharedProjectsInfo || !sharedProjectsInfo ? (
          <div className="tw-flex tw-flex-col tw-items-center tw-gap-2">
            <Label>{loadingResourcesText}</Label>
            <Spinner />
          </div>
        ) : (
          <div>
            <Button className="tw-mb-2" variant="secondary">
              <Plus />
              {getResourcesText}
            </Button>

            <Table stickyHeader>
              <TableHeader className="tw-bg-none" stickyHeader>
                <TableRow>
                  <TableHead />
                  <TableHead>{nameText}</TableHead>
                  <TableHead />
                  <TableHead>{languageText}</TableHead>
                  <TableHead>{actionText}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.values(sharedProjectsInfo).map((resource) => (
                  <TableRow key={resource.id}>
                    <TableCell>
                      <BookOpen className="tw-pr-0" size={18} />
                    </TableCell>
                    <TableCell>{resource.fullName}</TableCell>
                    <TableCell className="tw-font-medium">{resource.fullName}</TableCell>
                    <TableCell>{resource.language}</TableCell>
                    <TableCell>
                      {/* <div className="tw-flex tw-justify-between">
                          {getActionContent(
                            resource,
                            installInfo.map((info) => info.dblEntryUid),
                            getText,
                            updateText,
                            installedText,
                            installOrRemoveResource,
                          )}
                          {resource.installed && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost">
                                  <Ellipsis className="tw-w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="start">
                                <DropdownMenuItem
                                  onClick={() =>
                                    papi.commands.sendCommand(
                                      'platformScriptureEditor.openResourceViewer',
                                      resource.projectId,
                                    )
                                  }
                                >
                                  <span>{openText}</span>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() =>
                                    installOrRemoveResource(resource.dblEntryUid, 'remove')
                                  }
                                >
                                  <span>{removeText}</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div> */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
