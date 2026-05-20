import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/components/shadcn-ui/alert';
import { Button } from '@/components/shadcn-ui/button';
import { IconAlertTriangle, IconInfoCircle, IconX } from '@tabler/icons-react';

export interface UndoPlanUpdateBannerProps {
  basePlanName: string;
  /** When true, the destructive "Restore plan and reset progress" wording is used. */
  progressMadeSinceUpgrade: boolean;
  onClose: () => void;
  onViewPrevious: () => void;
  onUndo: () => void;
}

export function UndoPlanUpdateBanner({
  basePlanName,
  progressMadeSinceUpgrade,
  onClose,
  onViewPrevious,
  onUndo,
}: UndoPlanUpdateBannerProps) {
  return (
    <Alert variant={progressMadeSinceUpgrade ? 'destructive' : 'default'}>
      {progressMadeSinceUpgrade ? <IconAlertTriangle /> : <IconInfoCircle />}
      <AlertTitle>You have updated to a new version of &ldquo;{basePlanName}&rdquo;.</AlertTitle>
      <AlertDescription>
        <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-2">
          <Button variant="link" size="sm" onClick={onViewPrevious}>
            View progress in previous version
          </Button>
          <span aria-hidden className="tw:text-muted-foreground">
            |
          </span>
          <Button
            variant="link"
            size="sm"
            className={progressMadeSinceUpgrade ? 'tw:text-destructive' : undefined}
            onClick={onUndo}
          >
            {progressMadeSinceUpgrade
              ? 'Undo base-plan update (resets recorded progress)'
              : 'Undo base-plan update'}
          </Button>
        </div>
      </AlertDescription>
      <AlertAction>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Dismiss plan-update banner"
          onClick={onClose}
        >
          <IconX />
        </Button>
      </AlertAction>
    </Alert>
  );
}
