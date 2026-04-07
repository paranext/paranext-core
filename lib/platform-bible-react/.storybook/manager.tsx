import React from 'react';
import { PaintBrushIcon } from '@storybook/icons';
import { addons, types } from 'storybook/manager-api';
import { IconButton, WithTooltip, TooltipLinkList } from 'storybook/internal/components';
import { styled } from 'storybook/theming';

import {
  PLATFORM_BIBLE_THEME_CHANNEL,
  persistStorybookTheme,
  readStoredStorybookThemeId,
  updatePreviewIframeTheme,
} from './theme-apply';
import {
  STORYBOOK_THEME_IDS,
  STORYBOOK_THEME_LABELS,
  type StorybookThemeId,
} from './theme-constants';

const IconButtonLabel = styled.div(({ theme }) => ({
  fontSize: theme.typography.size.s2 - 1,
}));

const REGISTER_ID = 'platform-bible/storybook-theme';
const TOOL_ID = `${REGISTER_ID}/tool`;

function ThemeTool() {
  const [current, setCurrent] = React.useState<StorybookThemeId>(() =>
    readStoredStorybookThemeId(),
  );

  const setTheme = (themeId: StorybookThemeId) => {
    persistStorybookTheme(themeId);
    setCurrent(themeId);
    updatePreviewIframeTheme(themeId);
    addons.getChannel().emit(PLATFORM_BIBLE_THEME_CHANNEL, themeId);
  };

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      closeOnOutsideClick
      tooltip={({ onHide }) => (
        <TooltipLinkList
          links={STORYBOOK_THEME_IDS.map((theme) => ({
            id: theme,
            title: STORYBOOK_THEME_LABELS[theme],
            active: current === theme,
            onClick: () => {
              setTheme(theme);
              onHide();
            },
          }))}
        />
      )}
    >
      {/* `active` = Storybook toolbar selected styling; mirror theme selection instead of always true. */}
      <IconButton key={TOOL_ID} title="Theme" active={!!current}>
        <PaintBrushIcon />
        {current ? (
          <IconButtonLabel>{`${STORYBOOK_THEME_LABELS[current]} theme`}</IconButtonLabel>
        ) : null}
      </IconButton>
    </WithTooltip>
  );
}

addons.register(REGISTER_ID, () => {
  addons.add(TOOL_ID, {
    title: 'Theme',
    type: types.TOOL,
    match: ({ viewMode, tabId }) => !!(viewMode && viewMode.match(/^(story|docs)$/)) && !tabId,
    render: ThemeTool,
  });
});
