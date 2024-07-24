import '@/components/mui/slider.component.css';
import { Slider as MuiSlider } from '@mui/material';
import { SyntheticEvent } from 'react';

export type SliderProps = {
  /** Optional unique identifier */
  id?: string;
  /**
   * If `true`, the component is disabled.
   *
   * @default false
   */
  isDisabled?: boolean;
  /**
   * The component orientation.
   *
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * The minimum allowed value of the slider. Should not be equal to max.
   *
   * @default 0
   */
  min?: number;
  /**
   * The maximum allowed value of the slider. Should not be equal to min.
   *
   * @default 100
   */
  max?: number;
  /**
   * The granularity with which the slider can step through values. (A "discrete" slider.) The `min`
   * prop serves as the origin for the valid values. We recommend (max - min) to be evenly divisible
   * by the step.
   *
   * @default 1
   */
  step?: number;
  /**
   * Marks indicate predetermined values to which the user can move the slider. If `true` the marks
   * are spaced according the value of the `step` prop.
   *
   * @default false
   */
  showMarks?: boolean;
  /** The default value. Use when the component is not controlled. */
  defaultValue?: number;
  /** The value of the slider. For ranged sliders, provide an array with two values. */
  value?: number | number[];
  /**
   * Controls when the value label is displayed:
   *
   * - `auto` the value label will display when the thumb is hovered or focused.
   * - `on` will display persistently.
   * - `off` will never display.
   *
   * @default 'off'
   */
  valueLabelDisplay?: 'on' | 'auto' | 'off';
  /** Additional css classes to help with unique styling of the button */
  className?: string;
  /**
   * Callback function that is fired when the slider's value changed.
   *
   * @param event The event source of the callback. You can pull out the new value by accessing
   *   event.target.value (any). Warning: This is a generic event not a change event.
   * @param value The new value.
   * @param activeThumb Index of the currently moved thumb.
   */
  onChange?: (event: Event, value: number | number[], activeThumb: number) => void;
  /**
   * Callback function that is fired when the mouseup is triggered.
   *
   * @param event The event source of the callback. Warning: This is a generic event not a change
   *   event.
   * @param value The new value.
   */
  onChangeCommitted?: (
    event: Event | SyntheticEvent<Element, Event>,
    value: number | number[],
  ) => void;
};

/**
 * Slider that allows selecting a value from a range
 *
 * Thanks to MUI for heavy inspiration and documentation
 * https://mui.com/material-ui/getting-started/overview/
 */
function Slider({
  id,
  isDisabled = false,
  orientation = 'horizontal',
  min = 0,
  max = 100,
  step = 1,
  showMarks = false,
  defaultValue,
  value,
  valueLabelDisplay = 'off',
  className,
  onChange,
  onChangeCommitted,
}: SliderProps) {
  return (
    <MuiSlider
      id={id}
      disabled={isDisabled}
      orientation={orientation}
      min={min}
      max={max}
      step={step}
      marks={showMarks}
      defaultValue={defaultValue}
      value={value}
      valueLabelDisplay={valueLabelDisplay}
      className={`papi-slider ${orientation} ${className ?? ''}`}
      onChange={onChange}
      onChangeCommitted={onChangeCommitted}
    />
  );
}

export default Slider;
