import Button from './button.component';
import Checkbox from './checkbox.component';
import ComboBox from './combo-box.component';
import Slider from './slider.component';
import Switch from './switch.component';
import TextField from './text-field.component';

/** All React components to be exposed on the papi */
export const papiComponents = {
  Button,
  Checkbox,
  ComboBox,
  Slider,
  Switch,
  TextField,
};

export type PapiComponents = typeof papiComponents;

export { default as Button } from './button.component';
export { default as Checkbox } from './checkbox.component';
export { default as ComboBox } from './combo-box.component';
export { default as RefSelector } from './ref-selector.component';
export type { ScrRefSelectorProps } from './ref-selector.component';
export { default as Slider } from './slider.component';
export { default as Switch } from './switch.component';
export { default as TextField } from './text-field.component';
