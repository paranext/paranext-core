import ComboBox from '@/components/basics/combo-box.component';
import { HasDirection } from '@/preview/preview-components/direction-toggle.component';
import { BookOpen } from 'lucide-react';
import { useState } from 'react';

export default function ComboBoxExamples({ direction }: HasDirection) {
  const [comboBox1Value, setComboBox1Value] = useState<string | undefined>(undefined);
  const [comboBox2Value, setComboBox2Value] = useState<string | undefined>(undefined);
  const [comboBox3Value, setComboBox3Value] = useState<string | undefined>(undefined);
  const [comboBox4Value, setComboBox4Value] = useState<string[] | undefined>(undefined);

  const handleComboBox4Change = (newValue: string) => {
    setComboBox4Value((prevValue) => {
      if (!prevValue || prevValue.length === 0) {
        return [newValue];
      }

      return prevValue.includes(newValue)
        ? prevValue.filter((value) => value !== newValue)
        : [...prevValue, newValue];
    });
  };

  return (
    <div className="tw-space-y-4">
      <div>
        <p>Default Combobox</p>
        <ComboBox
          dir={direction}
          options={['Option1', 'Option2', 'Option3']}
          textPlaceholder="Text Placeholder"
          buttonPlaceholder="Button Placeholder"
          commandEmptyMessage="Empty Message"
          value={comboBox1Value}
          onChange={setComboBox1Value}
        />
      </div>
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
      <div>
        <p>Popover can stay open after selecting entry</p>
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
          value={comboBox3Value}
          onChange={setComboBox3Value}
          keepOpen
        />
      </div>
      <div>
        <p>Combobox with multi-select</p>
        <ComboBox
          className="tw-w-30"
          dir={direction}
          options={['Option1', 'Option2', 'Option3']}
          textPlaceholder="Text Placeholder"
          buttonPlaceholder="Select"
          buttonIcon={<BookOpen />}
          commandEmptyMessage="Empty Message"
          value={comboBox4Value}
          onChange={handleComboBox4Change}
          keepOpen
          hideChevrons
          alwaysShowPlaceholderOnButton
          alignMenu="start"
        />
      </div>
    </div>
  );
}
