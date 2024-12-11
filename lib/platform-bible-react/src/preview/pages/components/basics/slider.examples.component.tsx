import { Slider } from '@/components/shadcn-ui/slider';
import { HasDirection } from '@/preview/preview-components/direction-toggle.component';
import { useState } from 'react';

export default function SliderExamples({ direction }: HasDirection) {
  const [sliderValue, setSlider] = useState<number[]>([33]);
  return (
    <>
      <Slider
        className="tw-h-10"
        min={0}
        max={100}
        step={1}
        value={sliderValue}
        onValueChange={setSlider}
        dir={direction}
      />
      {sliderValue}

      <Slider className="tw-h-10" disabled min={0} max={100} step={1} defaultValue={[50]} />
    </>
  );
}
