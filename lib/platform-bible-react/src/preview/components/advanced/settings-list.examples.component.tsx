import {
  SettingsList,
  SettingsListHeader,
  SettingsListItem,
} from '@/components/advanced-components/settings-components/settings-list.component';
import { Input } from '@/components/shadcn-ui/input';

export default function SettingsListExamples() {
  const generateComponent = (placeholder: string) => {
    return (
      <>
        <Input placeholder={placeholder} />{' '}
      </>
    );
  };

  return (
    <SettingsList>
      <SettingsListHeader
        primary="Settings"
        secondary="User settings for styling the header"
        includeSeparator
      />
      <SettingsListItem
        primary="Header color"
        secondary="The color of the header"
        generateActionComponent={() => generateComponent('Red')}
        isLoading={false}
        loadingMessage="Loading setting"
      />
      <SettingsListItem
        primary="Header size"
        secondary="The size of the header"
        generateActionComponent={() => generateComponent('56')}
        isLoading
        loadingMessage="Loading setting"
      />
      <SettingsListItem
        primary="Header bold"
        secondary="Wether or not the header is bold"
        generateActionComponent={() => generateComponent('color')}
        isLoading={false}
        loadingMessage="Loading setting"
      />
    </SettingsList>
  );
}
