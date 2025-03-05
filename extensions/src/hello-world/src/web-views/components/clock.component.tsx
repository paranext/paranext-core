import { useData } from '@papi/frontend/react';
import { isPlatformError } from 'platform-bible-utils';

export default function Clock() {
  const [currentTime] = useData('current-time').Time(undefined, 'Loading current time');

  return <div>{isPlatformError(currentTime) ? currentTime.message : currentTime}</div>;
}
