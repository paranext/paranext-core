import { useLocalizedStrings } from '@papi/frontend/react';
import { BookOpen, Home, Plus } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Label,
  LocalizeKey,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'platform-bible-react';

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%home_action%',
  '%home_dialogTitle%',
  '%home_getResources%',
  '%home_language%',
  '%home_loadingProjectsAndResources%',
  '%home_name%',
];

globalThis.webViewComponent = function DownloadResourcesDialog() {
  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);

  const actionText: string = localizedStrings['%home_action%'];
  const dialogTitleText: string = localizedStrings['%home_dialogTitle%'];
  const getResourcesText: string = localizedStrings['%home_getResources%'];
  const languageText: string = localizedStrings['%home_language%'];
  const loadingProjectsAndResourcesText: string =
    localizedStrings['%home_loadingProjectsAndResources%'];
  const nameText: string = localizedStrings['%home_name%'];

  const projects: unknown[] = [];
  const isLoading: boolean = false;

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
        {isLoading ? (
          <div className="tw-flex tw-flex-col tw-items-center tw-gap-2">
            <Label>{loadingProjectsAndResourcesText}</Label>
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
                {projects.map(() => (
                  <TableRow>
                    <TableCell>
                      <BookOpen className="tw-pr-0" size={18} />
                    </TableCell>
                    <TableCell>A</TableCell>
                    <TableCell className="tw-font-medium">B</TableCell>
                    <TableCell>C</TableCell>
                    <TableCell>D </TableCell>
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
