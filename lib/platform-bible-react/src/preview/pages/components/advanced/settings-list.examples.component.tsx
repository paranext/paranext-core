import {
  SettingsList,
  SettingsListHeader,
  SettingsListItem,
} from '@/components/advanced/settings-components/settings-list.component';
import { Input } from '@/components/shadcn-ui/input';

export function SettingsListExamples() {
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
        isLoading={false}
        loadingMessage="Loading setting"
      >
        {generateComponent('Red')}
      </SettingsListItem>
      <SettingsListItem
        primary="Header size"
        secondary="The size of the header"
        isLoading
        loadingMessage="Loading setting"
      >
        {generateComponent('56')}
      </SettingsListItem>
      <SettingsListItem
        primary="Header bold"
        secondary="Wether or not the header is bold"
        isLoading={false}
        loadingMessage="Loading setting"
      >
        {generateComponent('color')}
      </SettingsListItem>
    </SettingsList>
  );
}

export default SettingsListExamples;
