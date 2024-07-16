import Switch from '@/components/switch.component';

export default function SwitchExamples() {
  return (
    <>
      Default Shadcn switches are not themed and always blue 🥺
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
