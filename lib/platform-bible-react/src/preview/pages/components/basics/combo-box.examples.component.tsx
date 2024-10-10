import { useState } from 'react';
import ComboBox from '@/components/basics/combo-box.component';
import { HasDirection } from '@/preview/preview-components/direction-toggle.component';

export default function ComboBoxExamples({ direction }: HasDirection) {
  const [comboBox1Value, setComboBox1Value] = useState<string | undefined>(undefined);
  const [comboBox2Value, setComboBox2Value] = useState<string | undefined>(undefined);

  return (
    <div className="tw-space-y-4">
      <ComboBox
        dir={direction}
        options={['Option1', 'Option2', 'Option3']}
        textPlaceholder="Text Placeholder"
        buttonPlaceholder="Button Placeholder"
        commandEmptyMessage="Empty Message"
        value={comboBox1Value}
        onChange={setComboBox1Value}
      />
      <div>
        <p>Combobox with long text for options will truncate</p>
        <ComboBox
          dir={direction}
          options={[
            '08/24/24 05:50PM - Revision author',
            '08/24/24 05:30PM - Revision author',
            '08/24/24 05:45PM - Revision author',
          ]}
          textPlaceholder="Select revision ..."
          buttonPlaceholder="Select revision ..."
          commandEmptyMessage="Empty Message"
          value={comboBox2Value}
          onChange={setComboBox2Value}
        />
      </div>
    </div>
  );
}
