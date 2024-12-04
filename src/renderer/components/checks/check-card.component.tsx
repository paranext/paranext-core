import {
  Badge,
  Button,
  Card,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'platform-bible-react';
import { Check, MoreHorizontal, Settings, X } from 'lucide-react';

// TODO Fix width and background color (inheriting from Card)
export function FixedBadge() {
  return (
    <Badge
      style={{ backgroundColor: '#FFFFFF' }}
      variant="outline"
      className="tw-flex tw-items-center tw-justify-between tw-w-20 tw-h-5 tw-shadow-sm tw-rounded-md"
    >
      <Check size={12} />
      <span className="tw-text-muted-foreground tw-text-xs tw-font-medium">Fixed</span>
    </Badge>
  );
}

// TODO Fix width and background color (inheriting from Card)
export function DeniedBadge() {
  return (
    <Badge
      style={{ backgroundColor: '#FFFFFF' }}
      variant="outline"
      className="tw-flex tw-items-center tw-justify-between tw-w-20 tw-h-5 tw-shadow-sm tw-rounded-md"
    >
      <X size={12} />
      <span className="tw-text-muted-foreground tw-text-xs tw-font-medium">Denied</span>
    </Badge>
  );
}

// TODO Check height, weight, shadow strength
export function CheckingBadge() {
  return (
    <Badge className="tw-flex tw-items-center tw-justify-center tw-w-20 tw-h-5 tw-shadow-sm tw-rounded-md">
      <span className="tw-text-xs tw-font-medium">Checking...</span>
    </Badge>
  );
}

function FocusedCheckDropdown() {
  return (
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
  );
}

type CheckNotificationProps = {
  isMuted?: boolean;
};

// TODO Move to PBR, change to tw blue
function CheckNotification({ isMuted }: CheckNotificationProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div
        style={{
          width: '15px',
          height: '15px',
          padding: '5px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            background: isMuted ? '#A1A1AA' : '#60A5FA',
            borderRadius: '50%',
            width: '5px',
            height: '5px',
          }}
        />
      </div>
      <span className="tw-text-xs tw-text-gray-500">Repeated Word</span>
    </div>
  );
}

export type CheckCardProps = {
  isSelected?: boolean;
  isWaiting?: boolean;
  isFailed?: boolean;
  isFixed?: boolean;
};

export default function CheckCard({ isSelected, isFailed, isWaiting, isFixed }: CheckCardProps) {
  if (isFailed && !isSelected)
    return (
      <Card
        style={{ backgroundColor: '#F1F5F9', borderColor: '#F1F5F9' }}
        // TODO tw-bg-slate-100 is not working in className- won't overwrite card className
        className="tw-w-full tw-flex tw-flex-col tw-items-flex-start tw-gap-1 tw-p-4 tw-rounded-lg tw-shadow-none"
      >
        <span className="tw-text-xs tw-font-medium">MIC 4:1 Charge Charge</span>
        <CheckNotification />
      </Card>
    );

  if (isFailed && isSelected)
    return (
      <Card className="tw-w-full tw-flex tw-flex-col tw-items-flex-start tw-gap-1 tw-p-4 tw-rounded-lg">
        <div className="tw-flex tw-justify-between">
          <div className="tw-gap-1 tw-flex tw-flex-col">
            <span className="tw-text-xs tw-font-medium">MIC 4:1 Charge Charge</span>
            <CheckNotification />
          </div>
          <FocusedCheckDropdown />
        </div>
        <span className="tw-text-xs tw-font-regular tw-text-gray-500">
          Focused state: If application, this is space where the user receives more details and
          suggestions when they click on the default listed check.
        </span>
      </Card>
    );

  if (isWaiting && !isSelected)
    return (
      <Card
        style={{ backgroundColor: '#F1F5F9', borderColor: '#F1F5F9' }}
        // TODO tw-bg-slate-100 is not working in className- won't overwrite card className
        className="tw-w-full tw-flex tw-flex-col tw-items-flex-start tw-gap-1 tw-p-4 tw-rounded-lg tw-shadow-none"
      >
        <CheckingBadge />
        <span className="tw-text-xs tw-font-medium">MIC 4:1 Charge Charge</span>
        <CheckNotification />
      </Card>
    );

  if (isWaiting && isSelected)
    return (
      <Card className="tw-w-full tw-flex tw-flex-col tw-items-flex-start tw-gap-3 tw-p-4 tw-rounded-lg">
        <div className="tw-flex tw-justify-between">
          <div className="tw-gap-1 tw-flex tw-flex-col">
            <CheckingBadge />
            <span className="tw-text-xs tw-font-medium">MIC 4:1 Charge Charge</span>
            <CheckNotification />
          </div>
          <FocusedCheckDropdown />
        </div>
        <span className="tw-text-xs tw-font-regular tw-text-muted-foreground">
          Focused state: If application, this is space where the user receives more details and
          suggestions when they click on the default listed check.
        </span>
      </Card>
    );

  if (isFixed && !isSelected)
    return (
      <Card
        style={{ backgroundColor: '#F1F5F9', borderColor: '#F1F5F9' }}
        // TODO tw-bg-slate-100 is not working in className- won't overwrite card className
        className="tw-w-full tw-flex tw-text-muted-foreground tw-flex-col tw-items-flex-start tw-gap-1 tw-p-4 tw-rounded-lg tw-shadow-none"
      >
        <FixedBadge />
        <span className="tw-text-muted-foreground tw-text-xs tw-font-medium">
          MIC 4:1 Charge Charge
        </span>
        <CheckNotification isMuted />
      </Card>
    );

  if (isFixed && isSelected)
    return (
      <Card className="tw-w-full tw-flex tw-flex-col tw-items-flex-start tw-gap-3 tw-p-4 tw-rounded-lg">
        <div className="tw-flex tw-justify-between">
          <div className="tw-gap-1 tw-flex tw-flex-col">
            <FixedBadge />
            <span className="tw-text-muted-foreground tw-text-xs tw-font-medium">
              MIC 4:1 Charge Charge
            </span>
            <CheckNotification isMuted />
          </div>
          <FocusedCheckDropdown />
        </div>
        <span className="tw-text-muted-foreground tw-text-xs tw-font-regular">
          Focused state: If application, this is space where the user receives more details and
          suggestions when they click on the default listed check.
        </span>
      </Card>
    );

  return 'No cards';
}
