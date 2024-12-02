import {
  Button,
  Card,
  CardContent,
  CardHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'platform-bible-react';
import { MoreHorizontal, Settings, X } from 'lucide-react';

export default function CheckCard() {
  return (
    <Card>
      <CardHeader>
        <div className="tw-flex tw-wrap tw-justify-between">
          <div>
            <p className="tw-text-xs tw-leading-4 tw-font-medium tw-text-trueGray-900">
              MIC 4:1 Charge Charge
            </p>
            <div
              key="repeated-words-01"
              className="tw-mb-4 tw-grid tw-grid-cols-[25px_1fr] tw-items-start tw-pb-4 tw-last:mb-0 tw-last:pb-0"
            >
              <span className="tw-flex tw-h-2 tw-w-2 tw-translate-y-1 tw-rounded-full tw-bg-sky-500" />
              <div className="tw-space-y-1">
                <p className="tw-text-sm tw-font-medium tw-leading-none">Repeated Words</p>
              </div>
            </div>
          </div>
          {/* TODO: Only rendered on focused check */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="tw-h-4 tw-w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>
                <X className="tw-mr-2 tw-h-4 tw-w-4" />
                <span>Deny</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="tw-mr-2 tw-h-4 tw-w-4" />
                <span>Open settings and inventories</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <p className="tw-text-xs tw-text-gray-500 tw-font-normal">
          Focused state: If application, this is space where the user receives more details and
          suggestions when they click on the default listed check.
        </p>
      </CardContent>
    </Card>
  );
}
