import Spinner from '@/components/basics/spinner.component';

export default function SpinnerExamples() {
  return (
    <div>
      <Spinner /> Default
      <Spinner className="tw-text-red-600" /> Red
      <Spinner size={10} /> Size 10
    </div>
  );
}
