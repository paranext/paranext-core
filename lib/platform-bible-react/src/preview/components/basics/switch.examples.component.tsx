import Switch from '@/components/switch.component';

export default function SwitchExamples() {
  return (
    <>
      Wrongly using MUI switch right now 😬
      <div>
        <Switch />
        <Switch isDisabled />
        <Switch isChecked />
        <Switch isChecked isDisabled />
        <Switch hasError />
      </div>
    </>
  );
}
