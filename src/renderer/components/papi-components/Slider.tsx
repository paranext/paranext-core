import { Slider as MuiSlider } from '@mui/material';
import classes from './slider.module.css';

type ButtonProps = {
  /**
   * Is this the principal component on the page?
   */
  primary?: boolean;
  /**
   * Enabled status of slider
   */
  disabled?: boolean;
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

  // To be added:
  // orientation?: 'horizontal' | 'vertical';
  // marks
  // min
  // max
  // defaultValue
  // step
  // size
  // value
  // valueLabelDisplay
  // see this file: https://github.com/mui/material-ui/blob/master/packages/mui-material/src/Slider/Slider.d.ts
  // How do we really control any of this, without using MUI props?
};

const Slider = ({
  primary = true,
  disabled,
  className,
  onChange,
  onChangeCommitted,
}: ButtonProps) => {
  const primaryClass = `${primary ? classes.primary : classes.secondary}`;
  const enabledClass = `${disabled ? classes.disabled : classes.enabled}`;
  const additionalClasses =
    className &&
    className
      .map((cssClass) => {
        return `${classes[cssClass]}`;
      })
      .join(' ');

  return (
    <MuiSlider
      className={[
        classes['papi-slider'],
        primaryClass,
        enabledClass,
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
};

export default Slider;
