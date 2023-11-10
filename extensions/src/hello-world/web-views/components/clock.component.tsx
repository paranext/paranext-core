import { useData } from 'papi-frontend/react';

export default function Clock() {
  const [currentTime] = useData('current-time').Time(undefined, 'Loading current time');

  return <div>{currentTime}</div>;
}
