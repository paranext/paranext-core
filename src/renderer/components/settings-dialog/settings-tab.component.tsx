import {
  Box,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { SavedTabInfo, TabInfo } from '@shared/models/docking-framework.model';
import {
  SyntheticEvent,
  useState,
  createElement,
  FunctionComponent,
  useCallback,
  useMemo,
} from 'react';
import { Checkbox, SearchBar, TextField } from 'papi-components';
import TabPanel from '@renderer/components/tab-panel.component';
import './settings-tab.component.scss';
import logger from '@shared/services/logger.service';

export const TAB_TYPE_SETTINGS_DIALOG = 'settings-dialog';

type SettingsProperties = {
  label: string;
  description?: string;
  default: unknown;
};

// Each settings group maps to a tab
type SettingsGroup = {
  label: string;
  description?: string;
  properties: { [settingId: string]: SettingsProperties };
};

type SettingProps<T> = {
  setting: T;
  setSetting: (value: T) => void;
};

type SettingsContribution = { [extensionId: string]: SettingsGroup[] };
type SettingsValues = { [settingId: string]: unknown };
type SettingsComponents = {
  // When adding unknown here the components in fetchSettingsComponents all error because unknown doesn't match well in generics
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [settingId: string]: FunctionComponent<SettingProps<any>>;
};

// Returns mock data
// Issue #502 makes collection of this data possible
function fetchSettingsContributions(): SettingsContribution {
  return {
    'platform.coreSettings': [
      {
        label: 'Display',
        description: 'Platform.Bible display settings',
        properties: {
          'platform.interfaceLanguage': {
            label: 'Interface Language',
            description: 'Language for all menus, dialogs, buttons, etc',
            default: 'English',
          },
          'platform.highlightCurrentVerse': {
            label: 'Highlight Current Verse',
            description: 'Allows you to easily see the current verse in all windows',
            default: true,
          },
          'platform.brightnessOfHighlight': {
            label: 'Brightness of word or verse highlights',
            description:
              'Affects all highlights (e.g. current verse, biblical terms, parallel passages)',
            default: 'Light',
          },
          'platform.displayFloatingWindows': {
            label: 'Display floating windows "always on top"',
            description: 'Prevents floating windows from becoming hidden',
            default: true,
          },
          'platform.hardwareAcceleration': {
            label: 'Enable hardware acceleration',
            description: 'Disable if you have display problems (e.g. text areas are black)',
            default: true,
          },
        },
      },
      {
        label: 'Behavior',
        description: 'Platform.Bible behavior settings',
        properties: {
          'platform.scrollScripture': {
            label: 'Scroll scripture with any compatible applications',
            description: 'Compatible applications include Logos and BART',
            default: true,
          },
          'platform.useMarker': {
            label: 'Use marker pop-up',
            description: 'Suggest USFM markers when typing',
            default: true,
          },
          'platform.dragAndDrop': {
            label: 'Enable Drag-and-Drop in Text Windows',
            description: 'Use to add biblical terms renderings or to cut and paste text',
            default: true,
          },
          'platform.autoAssignProjectNotes': {
            label: 'Auto-assign project notes when replying',
            description: 'Automatically assign a note to the teammate who assigned it to you',
            default: true,
          },
          'platform.autosave': {
            label: 'Autosave',
            description:
              'Save scripture book without asking when moving to a different book or chapter',
            default: true,
          },
          'platform.khmerOnly': {
            label: 'Khmer only: Support complex line breaks',
            description: 'Only needed for Khmer projects that use spaces',
            default: true,
          },
        },
      },
      {
        label: 'Internet',
        description: 'Platform.Bible internet settings',
        properties: {
          'platform.internetUse': {
            label: 'Internet usage',
            description:
              'Enable unrestricted usage, adjust usage to support sensitive projects, or disable usage',
            default: 'Allow unrestricted internet use',
          },
          'platform.proxySettings': {
            label: 'Proxy Settings',
            description:
              'Normally leave empty; network administrator can fill this out if you need a proxy server',
            default: undefined,
          },
          'platform.shareParatextData': {
            label: 'Share Paratext Data',
            description:
              'Let Paratext developers know how I use Paratext to help with future development',
            default: true,
          },
        },
      },
    ],

    'extension1.settings': [
      {
        label: 'extension1 Test',
        description: 'extension1 settings',
        properties: {
          'extension1.color': {
            label: 'Select color',
            description: 'This makes everything for extension1 the color you choose',
            default: 'blue',
          },
        },
      },
    ],
  };
}

// Returns mock data
// Issue #502 makes collection of this data possible
function fetchSettingsValues(): SettingsValues {
  return {
    'platform.interfaceLanguage': 'English',
    'platform.highlightCurrentVerse': true,
    'platform.brightnessOfHighlight': 'Light',
    'platform.displayFloatingWindows': true,
    'platform.hardwareAcceleration': true,
    'platform.scrollScripture': true,
    'platform.useMarker': true,
    'platform.dragAndDrop': true,
    'platform.autoAssignProjectNotes': true,
    'platform.autosave': true,
    'platform.khmerOnly': true,
    'platform.internetUse': 'Allow unrestricted internet use',
    'platform.shareParatextData': true,
    'platform.proxySettings': { Host: '', Port: 0, Username: '', Password: '' },
  };
}

const options = ['English', 'Spanish', 'French'];

// Example component of a platform setting - shows how SettingProps would be used
function InterfaceLanguageSetting({ setting, setSetting }: SettingProps<string>) {
  return (
    <Select value={setting} onChange={(e) => setSetting(e.target.value)} sx={{ width: 200 }}>
      {options.map((option) => (
        <MenuItem value={option}>{option}</MenuItem>
      ))}
    </Select>
  );
}

// Example component of a platform setting
function ProxySettings({
  setting,
  setSetting,
}: SettingProps<{
  Host: string;
  Port: number;
  Username: string;
  Password: string;
}>) {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
    >
      <div>
        <TextField
          label="Host"
          placeholder="Example Here"
          value={setting.Host}
          onChange={(e) => setSetting({ ...setting, Host: e.target.value })}
        />
        <TextField
          label="Port"
          placeholder="0"
          value={setting.Port}
          // This is a mock component- But BUG here because this TextField can take strings but we are forcing it as a number
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          onChange={(e) => setSetting({ ...setting, Port: e.target.value as unknown as number })}
        />
        <TextField
          label="Username"
          placeholder="Placeholder"
          value={setting.Username}
          onChange={(e) => setSetting({ ...setting, Username: e.target.value })}
        />
        <TextField
          label="Password"
          placeholder="Placeholder"
          value={setting.Password}
          onChange={(e) => setSetting({ ...setting, Password: e.target.value })}
        />
      </div>
    </Box>
  );
}

// Example component of a platform setting
function CheckboxSetting({ setting, setSetting }: SettingProps<boolean>) {
  return <Checkbox isChecked={setting} onChange={(e) => setSetting(e.target.checked)} />;
}

// Example component of a platform setting
// Since this is a blanket component for all settings that need a Select, the only option included is the default value of the setting
// Settings components will look more like InterfaceLanguageSetting, with appropriate options
function SelectSetting({ setting, setSetting }: SettingProps<string>) {
  return (
    <Select value={setting} onChange={(e) => setSetting(e.target.value)} sx={{ width: 200 }}>
      <MenuItem value={setting}>{setting}</MenuItem>
    </Select>
  );
}

// Returns mock data
// Issue #503 makes collection of this data possible
function fetchSettingsComponents(): SettingsComponents {
  return {
    'platform.interfaceLanguage': InterfaceLanguageSetting,
    'platform.highlightCurrentVerse': CheckboxSetting,
    'platform.brightnessOfHighlight': SelectSetting,
    'platform.displayFloatingWindows': CheckboxSetting,
    'platform.hardwareAcceleration': CheckboxSetting,
    'platform.scrollScripture': CheckboxSetting,
    'platform.useMarker': CheckboxSetting,
    'platform.dragAndDrop': CheckboxSetting,
    'platform.autoAssignProjectNotes': CheckboxSetting,
    'platform.autosave': CheckboxSetting,
    'platform.khmerOnly': CheckboxSetting,
    'platform.internetUse': SelectSetting,
    'platform.shareParatextData': CheckboxSetting,
    'platform.proxySettings': ProxySettings,
  };
}

type SettingsDialogProps = {
  /** Settings "metadata" */
  contributions: SettingsContribution;

  /** Object that stores the current value of the setting with specific settingId */
  settingValues: SettingsValues;

  /** Object that stores the components of the setting with specific settingId */
  components: SettingsComponents;
};

export default function SettingsDialog({
  contributions,
  settingValues,
  components,
}: SettingsDialogProps) {
  const fetchSettingsGroups = useCallback(() => {
    const contributionEntries = Object.entries(contributions); // entries = [extensionId, SettingsGroup[]][]
    const groups: SettingsGroup[] = [];
    contributionEntries.map((entry) => entry[1].map((group) => groups.push(group))); // entry = [extensionId, SettingsGroup[]]
    return groups;
  }, [contributions]);

  const settingsGroups: SettingsGroup[] = useMemo(
    () => fetchSettingsGroups(),
    [fetchSettingsGroups],
  );

  const [tabValue, setTabValue] = useState(settingsGroups[0].label);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchSettings = useCallback(
    (group: SettingsGroup) => {
      const settingKeys: string[] = [];
      Object.keys(group.properties).map((settingKey) =>
        group.properties[settingKey].label.includes(searchQuery) ||
        group.properties[settingKey].description?.includes(searchQuery)
          ? settingKeys.push(settingKey)
          : undefined,
      );
      return settingKeys;
    },
    [searchQuery],
  );

  const handleTabChange = (_event: SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const handleSearchInput = (newSearchTerm: string) => {
    setSearchQuery(newSearchTerm);
  };

  const setSettingValue = useCallback((settingKey: string, value: unknown) => {
    return logger.info(`Set setting ${settingKey} to ${value}`);
  }, []);

  return (
    <div className="settings-dialog">
      <div className="settings-search-bar">
        <SearchBar onSearch={handleSearchInput} placeholder="Search Settings..." isFullWidth />
      </div>
      <div className="settings-tab-group">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          orientation="vertical"
          className="settings-tabs"
        >
          {settingsGroups.map((group) => (
            <Tab
              key={group.label}
              label={group.label}
              value={group.label}
              sx={{ alignItems: 'start' }}
            />
          ))}
        </Tabs>
        <span className="settings-tab-panels">
          {settingsGroups.map((group) => (
            <TabPanel key={group.label} value={tabValue} index={group.label} name={group.label}>
              <List>
                {fetchSettings(group).map((settingKey) => (
                  <span key={group.properties[settingKey].label} className="settings-list-item">
                    <ListItem divider key={settingKey}>
                      <ListItemText
                        primary={group.properties[settingKey].label}
                        secondary={group.properties[settingKey].description}
                      />
                      {components[settingKey] ? (
                        createElement(components[settingKey], {
                          setting: settingValues[settingKey],
                          setSetting: (value: unknown) => setSettingValue(settingKey, value),
                        })
                      ) : (
                        <Typography component="span" alignSelf="center" variant="caption">
                          Setting Action Missing
                        </Typography>
                      )}
                    </ListItem>
                  </span>
                ))}
              </List>
            </TabPanel>
          ))}
        </span>
      </div>
    </div>
  );
}

export const loadSettingsDialog = (savedTabInfo: SavedTabInfo): TabInfo => {
  const settingsContributions = fetchSettingsContributions();
  const settingsKeysValues = fetchSettingsValues();
  const settingsComponents = fetchSettingsComponents();

  return {
    ...savedTabInfo,
    tabTitle: 'Settings',
    content: (
      <SettingsDialog
        contributions={settingsContributions}
        settingValues={settingsKeysValues}
        components={settingsComponents}
      />
    ),
  };
};
