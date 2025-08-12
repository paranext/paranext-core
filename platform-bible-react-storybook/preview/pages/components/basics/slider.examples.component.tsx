import { Slider } from '@/components/shadcn-ui/slider';

import { useState } from 'react';

export function SliderExamples() {
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
      />
      {sliderValue}

      <Slider className="tw-h-10" disabled min={0} max={100} step={1} defaultValue={[50]} />
    </>
  );
}

export default SliderExamples;
