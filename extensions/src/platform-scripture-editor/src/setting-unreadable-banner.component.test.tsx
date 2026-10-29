// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  SETTING_UNREADABLE_BANNER_STRING_KEYS,
  SettingUnreadableBanner,
} from './setting-unreadable-banner.component';

describe('SettingUnreadableBanner', () => {
  it('announces the localized reason the editor is read-only', () => {
    const [key] = SETTING_UNREADABLE_BANNER_STRING_KEYS;
    render(<SettingUnreadableBanner localizedStrings={{ [key]: 'Read-only: settings unread' }} />);

    expect(screen.getByRole('status')).toHaveTextContent('Read-only: settings unread');
  });
});
