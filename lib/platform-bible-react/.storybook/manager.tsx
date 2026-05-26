import React from 'react';
import { PaintBrushIcon, SunIcon } from '@storybook/icons';
import { addons, types } from 'storybook/manager-api';
import { IconButton, WithTooltip, TooltipLinkList } from 'storybook/internal/components';
import { styled } from 'storybook/theming';

import {
  PLATFORM_BIBLE_THEME_CHANNEL,
  isStorybookThemeState,
  persistStorybookThemeState,
  readStoredStorybookThemeState,
  updatePreviewIframeThemeState,
} from './theme-apply';
import {
  STORYBOOK_COLOR_SCHEMES,
  STORYBOOK_COLOR_SCHEME_LABELS,
  STORYBOOK_THEME_FAMILIES,
  STORYBOOK_THEME_FAMILY_LABELS,
  type StorybookColorScheme,
  type StorybookThemeFamily,
  type StorybookThemeState,
} from './theme-constants';

const IconButtonLabel = styled.div(({ theme }) => ({
  fontSize: theme.typography.size.s2 - 1,
}));

const REGISTER_ID = 'platform-bible/storybook-theme';

function publishThemeState(next: StorybookThemeState): void {
  persistStorybookThemeState(next);
  updatePreviewIframeThemeState(next);
  addons.getChannel().emit(PLATFORM_BIBLE_THEME_CHANNEL, next);
}

function useSyncedToolbarState(): readonly [
  StorybookThemeState,
  React.Dispatch<React.SetStateAction<StorybookThemeState>>,
] {
  const [toolbarThemeState, setToolbarThemeState] = React.useState<StorybookThemeState>(() =>
    readStoredStorybookThemeState(),
  );

  React.useEffect(() => {
    const channel = addons.getChannel();
    const onTheme = (payload: unknown) => {
      if (isStorybookThemeState(payload)) setToolbarThemeState(payload);
    };
    channel.on(PLATFORM_BIBLE_THEME_CHANNEL, onTheme);
    return () => channel.off(PLATFORM_BIBLE_THEME_CHANNEL, onTheme);
  }, []);

  return [toolbarThemeState, setToolbarThemeState];
}

function ColorSchemeTool() {
  const [toolbarThemeState, setToolbarThemeState] = useSyncedToolbarState();

  const setColorScheme = (colorScheme: StorybookColorScheme) => {
    const next: StorybookThemeState = { ...readStoredStorybookThemeState(), colorScheme };
    publishThemeState(next);
    setToolbarThemeState(next);
  };

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      closeOnOutsideClick
      tooltip={({ onHide }) => (
        <TooltipLinkList
          links={STORYBOOK_COLOR_SCHEMES.map((scheme) => ({
            id: scheme,
            title: STORYBOOK_COLOR_SCHEME_LABELS[scheme],
            active: toolbarThemeState.colorScheme === scheme,
            onClick: () => {
              setColorScheme(scheme);
              onHide();
            },
          }))}
        />
      )}
    >
      <IconButton
        key={`${REGISTER_ID}/color-scheme`}
        title="Appearance"
        active={false}
      >
        <SunIcon />
        <IconButtonLabel>
          {STORYBOOK_COLOR_SCHEME_LABELS[toolbarThemeState.colorScheme]}
        </IconButtonLabel>
      </IconButton>
    </WithTooltip>
  );
}

function ThemeFamilyTool() {
  const [toolbarThemeState, setToolbarThemeState] = useSyncedToolbarState();

  const setFamily = (family: StorybookThemeFamily) => {
    const next: StorybookThemeState = { ...readStoredStorybookThemeState(), family };
    publishThemeState(next);
    setToolbarThemeState(next);
  };

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      closeOnOutsideClick
      tooltip={({ onHide }) => (
        <TooltipLinkList
          links={STORYBOOK_THEME_FAMILIES.map((family) => ({
            id: family,
            title: STORYBOOK_THEME_FAMILY_LABELS[family],
            active: toolbarThemeState.family === family,
            onClick: () => {
              setFamily(family);
              onHide();
            },
          }))}
        />
      )}
    >
      <IconButton
        key={`${REGISTER_ID}/theme-family`}
        title="Theme"
        active={false}
      >
        <PaintBrushIcon />
        <IconButtonLabel>{STORYBOOK_THEME_FAMILY_LABELS[toolbarThemeState.family]}</IconButtonLabel>
      </IconButton>
    </WithTooltip>
  );
}

const matchStoryDocs = ({ viewMode, tabId }: { viewMode?: string; tabId?: string }) =>
  !!(viewMode && viewMode.match(/^(story|docs)$/)) && !tabId;

addons.register(REGISTER_ID, () => {
  addons.add(`${REGISTER_ID}/color-scheme`, {
    title: 'Appearance',
    type: types.TOOL,
    match: matchStoryDocs,
    render: ColorSchemeTool,
  });
  addons.add(`${REGISTER_ID}/theme-family`, {
    title: 'Theme',
    type: types.TOOL,
    match: matchStoryDocs,
    render: ThemeFamilyTool,
  });
});
