import { Progress } from '@/components/shadcn-ui/progress';

export function ProgressExamples() {
  return (
    <div className="tw-flex tw-flex-col tw-gap-4">
      <Progress value={0} /> 0%
      <Progress value={60} /> 60%
      <Progress value={100} /> 100%
    </div>
  );
}

export default ProgressExamples;
