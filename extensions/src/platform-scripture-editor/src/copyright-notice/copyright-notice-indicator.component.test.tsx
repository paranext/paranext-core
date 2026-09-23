// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import type { CopyrightNotice } from 'platform-scripture';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CopyrightNoticeIndicator } from './copyright-notice-indicator.component';

const { settings } = vi.hoisted(() => ({ settings: new Map<string, unknown>() }));

vi.mock('@papi/frontend/react', () => ({
  useProjectSetting: (_projectId: string | undefined, key: string, fallback: unknown) => [
    settings.get(key) ?? fallback,
    vi.fn(),
    vi.fn(),
    false,
  ],
}));

vi.mock('@papi/frontend', () => ({
  default: { commands: { sendCommand: vi.fn(async () => undefined) } },
  logger: { warn: vi.fn() },
}));

const STRINGS = {
  '%platformScripture_copyrightNotice_restrictedLicense_banner%':
    '{label}: The {name} is for reference only.',
  '%platformScripture_copyrightNotice_restrictedLicense_details%':
    '{fullName}™ Bible copyright © {years} by Biblica, Inc. Ask at {permissionsLink}',
  '%platformScripture_copyrightNotice_notification_format%': '{name}: {notice}',
  '%platformScripture_copyrightNotice_details_title%': 'Copyright for {name}',
  '%platformScripture_copyrightNotice_details_close%': 'Close',
};

function setNotice(notice: CopyrightNotice) {
  settings.set('platformScripture.copyrightNotice', notice);
}

beforeEach(() => {
  settings.clear();
  settings.set('platform.name', 'NIV11');
  settings.set('platform.fullName', 'New International Version 2011');
});

describe('CopyrightNoticeIndicator', () => {
  it('names the notice for a restricted text', () => {
    setNotice({ kind: 'restrictedLicense', copyrightYears: '1973, 2011' });

    render(<CopyrightNoticeIndicator projectId="niv" localizedStrings={STRINGS} />);

    expect(
      screen.getByRole('button', {
        name: 'NIV11: The NIV11 is for reference only.',
      }),
    ).toBeInTheDocument();
  });

  it('shows nothing for a text that needs no notice', () => {
    setNotice({ kind: 'none' });

    render(<CopyrightNoticeIndicator projectId="web" localizedStrings={STRINGS} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('opens the full copyright without activating the cell around it', () => {
    setNotice({ kind: 'restrictedLicense', copyrightYears: '1973, 2011' });
    const onCellClick = vi.fn();

    render(
      // The grid opens a chapter view when a cell is clicked; the stand-in cell records that
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div onClick={onCellClick}>
        <CopyrightNoticeIndicator projectId="niv" localizedStrings={STRINGS} />
      </div>,
    );
    fireEvent.click(screen.getByRole('button', { name: /^NIV11:/ }));

    expect(screen.getByRole('dialog', { name: 'Copyright for NIV11' })).toHaveTextContent(
      'New International Version 2011™ Bible copyright © 1973, 2011 by Biblica, Inc.',
    );
    expect(onCellClick).not.toHaveBeenCalled();
  });
});
