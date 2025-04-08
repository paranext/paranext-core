import { Switch } from '@/components/shadcn-ui/switch';

import { useState } from 'react';

export function SwitchExamples() {
  const [value, setValue] = useState<boolean>(false);

  return (
    <div className="tw-flex tw-flex-col *:tw-m-4">
      <Switch checked={value} onCheckedChange={setValue} />
      <Switch disabled />
      <Switch checked disabled />
    </div>
  );
}

export default SwitchExamples;
