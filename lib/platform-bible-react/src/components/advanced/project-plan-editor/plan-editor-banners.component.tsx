import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/components/shadcn-ui/alert';
import { Button } from '@/components/shadcn-ui/button';
import { IconAlertTriangle, IconInfoCircle, IconX } from '@tabler/icons-react';
import type { ReactNode } from 'react';

export interface BannerSlotProps {
  taskChanged?: { message: string; onDismiss: () => void };
  newPlanVersion?: { message: string; isAdminVariant: boolean; onUpdate?: () => void };
  undoUpdate?: ReactNode;
}

export function PlanEditorBanners({ taskChanged, newPlanVersion, undoUpdate }: BannerSlotProps) {
  const anyVisible = !!(taskChanged || newPlanVersion || undoUpdate);
  if (!anyVisible) return undefined;
  return (
    <div className="tw:flex tw:flex-col tw:gap-2">
      {taskChanged && (
        <Alert>
          <IconInfoCircle />
          <AlertTitle>Task availability updated</AlertTitle>
          <AlertDescription>{taskChanged.message}</AlertDescription>
          <AlertAction>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Dismiss task-availability-changed banner"
              onClick={taskChanged.onDismiss}
            >
              <IconX />
            </Button>
          </AlertAction>
        </Alert>
      )}
      {newPlanVersion && (
        <Alert>
          <IconAlertTriangle />
          <AlertTitle>
            {newPlanVersion.isAdminVariant
              ? 'A newer version of this base plan is available.'
              : 'A newer version is available — ask your project administrator to update.'}
          </AlertTitle>
          <AlertDescription>{newPlanVersion.message}</AlertDescription>
          {newPlanVersion.isAdminVariant && newPlanVersion.onUpdate && (
            <AlertAction>
              <Button variant="outline" size="sm" onClick={newPlanVersion.onUpdate}>
                Update plan
              </Button>
            </AlertAction>
          )}
        </Alert>
      )}
      {undoUpdate}
    </div>
  );
}
