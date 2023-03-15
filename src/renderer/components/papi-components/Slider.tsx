import { Slider as MuiSlider } from '@mui/material';
import classes from './slider.module.css';

type ButtonProps = {
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * The minimum allowed value of the slider.
   * Should not be equal to max.
   * @default 0
   */
  min?: number;
  /**
   * The maximum allowed value of the slider.
   * Should not be equal to min.
   * @default 100
   */
  max?: number;
  /**
   * The granularity with which the slider can step through values. (A "discrete" slider.)
   * The `min` prop serves as the origin for the valid values.
   * We recommend (max - min) to be evenly divisible by the step.
   * @default 1
   */
  step?: number;
  /**
   * Marks indicate predetermined values to which the user can move the slider.
   * If `true` the marks are spaced according the value of the `step` prop.
   * @default false
   */
  marks?: boolean;
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: number;
  /**
   * Controls when the value label is displayed:
   *
   * - `auto` the value label will display when the thumb is hovered or focused.
   * - `on` will display persistently.
   * - `off` will never display.
   * @default 'off'
   */
  valueLabelDisplay?: 'on' | 'auto' | 'off';
  /**
   * Additional css classes to help with unique styling of the button
   */
  className?: string[];
  /**
   * Optional click handler
   */
  onChange?: () => void;
  /**
   * Optional click release handler
   */
  onChangeCommitted?: () => void;
};

function Slider({
  disabled = false,
  orientation = 'horizontal',
  min = 0,
  max = 100,
  step = 1,
  marks = false,
  defaultValue,
  valueLabelDisplay = 'off',
  className,
  onChange,
  onChangeCommitted,
}: ButtonProps) {
  const orientationClass = `${
    orientation === 'vertical' ? classes.vertical : ''
  }`;
  const additionalClasses =
    className &&
    className
      .map((cssClass) => {
        return `${classes[cssClass]}`;
      })
      .join(' ');

  return (
    <MuiSlider
      disabled={disabled}
      orientation={orientation}
      min={min}
      max={max}
      step={step}
      marks={marks}
      defaultValue={defaultValue}
      valueLabelDisplay={valueLabelDisplay}
      className={[
        classes['papi-slider'],
        orientationClass,
        additionalClasses,
      ].join(' ')}
      onChange={(e) => {
        if (onChange) {
          e.preventDefault();
          onChange();
        }
      }}
      onChangeCommitted={(e) => {
        if (onChangeCommitted) {
          e.preventDefault();
          onChangeCommitted();
        }
      }}
    />
  );
}

export default Slider;
