import Spinner from '@/components/basics/spinner.component';
import { HasDirection } from '@/preview/preview-components/direction-toggle.component';

export default function SpinnerExamples({ direction }: HasDirection) {
  return (
    <div>
      <Spinner direction={direction} /> Default
      <Spinner direction={direction} className="tw-text-red-600" /> Red
      <Spinner direction={direction} size={10} /> Size 10
    </div>
  );
}
