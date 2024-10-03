import { Switch } from '@/components/shadcn-ui/switch';
import { useState } from 'react';

export default function SwitchExamples() {
  const [value, setValue] = useState<boolean>(false);

  return (
    <div className="pr-flex pr-flex-col *:pr-m-4">
      <Switch checked={value} onCheckedChange={setValue} />
      <Switch disabled />
      <Switch checked disabled />
    </div>
  );
}
