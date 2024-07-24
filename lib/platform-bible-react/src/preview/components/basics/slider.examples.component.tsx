import Slider from '@/components/mui/slider.component';
import { useState } from 'react';

export default function SliderExamples() {
  const [sliderValue, setSlider] = useState(3);
  return (
    <>
      Wrongly using MUI slider right now 😬
      <Slider />
      <Slider isDisabled />
      <Slider
        min={0}
        max={5}
        value={sliderValue}
        onChange={(_e, value) => setSlider(Array.isArray(value) ? value?.[0] : value)}
      />
      {/* Wondering in which case the slider would output a number[] as its value 🤷 */}
      {sliderValue}
    </>
  );
}
