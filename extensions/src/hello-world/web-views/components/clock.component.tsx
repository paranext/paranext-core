import papi from 'papi-frontend';

const {
  react: {
    hooks: { useData },
  },
} = papi;

export default function Clock() {
  const [currentTime] = useData('current-time').Time(undefined, 'Loading current time');

  return <div>{currentTime}</div>;
}
