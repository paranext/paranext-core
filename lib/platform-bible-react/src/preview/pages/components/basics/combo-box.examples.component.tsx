import { useState } from 'react';
import ComboBox from '@/components/basics/combo-box.component';
import { HasDirection } from '@/preview/preview-components/direction-toggle.component';

export default function ComboBoxExamples({ direction }: HasDirection) {
  const [comboBoxValue, setComboBox] = useState<string | undefined>(undefined);
  return (
    <ComboBox
      dir={direction}
      options={['Option1', 'Option2', 'Option3']}
      textPlaceholder="Text Placeholder"
      buttonPlaceholder="Button Placeholder"
      commandEmptyMessage="Empty Message"
      value={comboBoxValue}
      onChange={setComboBox}
    />
  );
}
