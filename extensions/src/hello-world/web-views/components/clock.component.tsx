import type { TimeDataTypes } from 'c-sharp-provider-test';
import papi from 'papi-frontend';

const {
  react: {
    hooks: { useData },
  },
} = papi;

export default function Clock() {
  const [currentTime] = useData.Time<TimeDataTypes, 'TimeData'>(
    'current-time',
    undefined,
    'Loading current time',
  );

  return <div>{currentTime}</div>;
}
