import { ComboBox } from '@/components/basics/combo-box.component';
import { BookOpen } from 'lucide-react';
import { useState } from 'react';

export function ComboBoxExamples() {
  const [comboBox1Value, setComboBox1Value] = useState<string | undefined>(undefined);
  const [comboBox2Value, setComboBox2Value] = useState<string | undefined>(undefined);
  const [comboBox3Value, setComboBox3Value] = useState<string | undefined>(undefined);
  const [comboBox4Value, setComboBox4Value] = useState<string | undefined>(undefined);

  return (
    <div className="tw-space-y-4">
      <div>
        <p>Default Combobox</p>
        <ComboBox
          options={['Option1', 'Option2', 'Option3']}
          textPlaceholder="Text Placeholder"
          buttonPlaceholder="Button Placeholder"
          commandEmptyMessage="Empty Message"
          value={comboBox1Value}
          onChange={setComboBox1Value}
        />
      </div>
      <div>
        <p>Combobox with long text for options will truncate - using ghost variant here</p>
        <ComboBox
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
          buttonVariant="ghost"
        />
      </div>
      <div>
        <p>An icon can be shown on the trigger button</p>
        <ComboBox
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
          icon={<BookOpen />}
          buttonVariant={comboBox3Value ? 'outline' : 'ghost'}
        />
      </div>
      <div>
        <p>Alignment of dropdown menu can be controlled</p>
        <ComboBox
          options={[
            '08/24/24 05:50PM - Revision author',
            '08/24/24 05:30PM - Revision author',
            '08/24/24 05:45PM - Revision author',
          ]}
          textPlaceholder="Select revision ..."
          buttonPlaceholder="Select revision ..."
          commandEmptyMessage="Empty Message"
          value={comboBox4Value}
          onChange={setComboBox4Value}
          className="tw-w-[400px]"
          alignDropDown="end"
        />
      </div>
    </div>
  );
}

export default ComboBoxExamples;
