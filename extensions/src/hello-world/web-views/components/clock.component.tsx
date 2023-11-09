import type { TimeDataTypes } from 'c-sharp-provider-test';
import { useData } from 'papi-frontend/react';

export default function Clock() {
  const [currentTime] = useData.Time<TimeDataTypes, 'TimeData'>(
    'current-time',
    undefined,
    'Loading current time',
  );

  return <div>{currentTime}</div>;
}
