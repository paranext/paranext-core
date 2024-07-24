import { useState } from 'react';
import { ComboBox } from '../../..';

export default function ComboBoxExamples() {
  const [comboBoxValue, setComboBox] = useState<string | undefined>(undefined);
  return (
    <ComboBox
      options={['Option1', 'Option2', 'Option3']}
      textPlaceholder="Text Placeholder"
      buttonPlaceholder="Button Placeholder"
      commandEmptyMessage="Empty Message"
      value={comboBoxValue}
      onChange={setComboBox}
    />
  );
}
