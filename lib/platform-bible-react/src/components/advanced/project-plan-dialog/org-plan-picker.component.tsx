import { useState } from 'react';
import { Button } from '@/components/shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn-ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import type { OrgProvidedPlan } from '@/components/advanced/project-plan-dialog/types';

const CUSTOM_VALUE = '__custom__';

interface OrgPlanPickerProps {
  orgProvidedPlans: OrgProvidedPlan[];
  currentBasePlanRef?: string;
  isDirty: boolean;
  onReplaceWith: (plan: OrgProvidedPlan) => void;
}

export function OrgPlanPicker({
  orgProvidedPlans,
  currentBasePlanRef,
  isDirty,
  onReplaceWith,
}: OrgPlanPickerProps) {
  const [pendingPlan, setPendingPlan] = useState<OrgProvidedPlan | null>(null);

  const value = currentBasePlanRef ?? CUSTOM_VALUE;
  const currentIsKnown = orgProvidedPlans.some((p) => p.id === currentBasePlanRef);

  const handleChange = (next: string) => {
    if (next === CUSTOM_VALUE) return;
    if (next === currentBasePlanRef) return;
    const candidate = orgProvidedPlans.find((p) => p.id === next);
    if (!candidate) return;

    if (isDirty) {
      setPendingPlan(candidate);
    } else {
      onReplaceWith(candidate);
    }
  };

  const confirmReplace = () => {
    if (pendingPlan) onReplaceWith(pendingPlan);
    setPendingPlan(null);
  };

  return (
    <div className="tw:flex tw:items-center tw:gap-2">
      <label className="tw:text-sm tw:text-muted-foreground">Based on:</label>
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger className="tw:w-64">
          <SelectValue placeholder="Select a plan template" />
        </SelectTrigger>
        <SelectContent>
          {!currentIsKnown && (
            <SelectItem value={CUSTOM_VALUE}>Custom (not from a template)</SelectItem>
          )}
          {orgProvidedPlans.map((p) => (
            <SelectItem key={p.id} value={p.id}>
              {p.name} ({p.version})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Dialog open={pendingPlan !== null} onOpenChange={(o) => !o && setPendingPlan(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Replace plan?</DialogTitle>
            <DialogDescription>
              You have unsaved changes. Replacing the current plan with{' '}
              <span className="tw:font-medium">{pendingPlan?.name}</span> will discard those
              changes. Continue?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPendingPlan(null)}>
              Cancel
            </Button>
            <Button onClick={confirmReplace}>Replace plan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default OrgPlanPicker;
