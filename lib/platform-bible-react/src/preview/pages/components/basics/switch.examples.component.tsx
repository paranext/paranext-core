import { Switch } from '@/components/shadcn-ui/switch';
import { HasDirection } from '@/preview/preview-components/direction-toggle.component';
import { useState } from 'react';

export default function SwitchExamples({ direction }: HasDirection) {
  const [value, setValue] = useState<boolean>(false);

  return (
    <div className="tw-flex tw-flex-col *:tw-m-4">
      <Switch direction={direction} checked={value} onCheckedChange={setValue} />
      <Switch direction={direction} disabled />
      <Switch direction={direction} checked disabled />
    </div>
  );
}
