// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import type { CopyrightNotice } from 'platform-scripture';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CopyrightNoticeIndicator } from './copyright-notice-indicator.component';

const { noticesByProject, hook } = vi.hoisted(() => ({
  /** Each project's notice; a project that is absent has not answered yet */
  noticesByProject: new Map<string, unknown>(),
  /** Set to answer `undefined` whatever the default, as Storybook's stand-in for the hook does */
  hook: { ignoresDefault: false },
}));

// Like the real hook, keeps serving the value it last had until the new project's value arrives
vi.mock('@papi/frontend/react', async () => {
  const { useRef } = await import('react');
  return {
    useProjectSetting: (projectId: string | undefined, key: string, fallback: unknown) => {
      const lastValue = useRef(hook.ignoresDefault ? undefined : fallback);
      if (key === 'platformScripture.copyrightNotice' && projectId) {
        const value = noticesByProject.get(projectId);
        if (value !== undefined) lastValue.current = value;
      }
      return [lastValue.current, vi.fn(), vi.fn(), false];
    },
  };
});

vi.mock('@papi/frontend', () => ({ logger: { warn: vi.fn() } }));

const STRINGS = {
  '%platformScripture_copyrightNotice_restrictedLicense_banner%':
    '{label}: The {name} is for reference only.',
  '%platformScripture_copyrightNotice_restrictedLicense_details%':
    '{fullName}™ Bible copyright © {years} by Biblica, Inc. Ask at {permissionsLink}',
  '%platformScripture_copyrightNotice_notification_format%': '{name}: {notice}',
  '%platformScripture_copyrightNotice_details_title%': 'Copyright for {name}',
  '%platformScripture_copyrightNotice_details_close%': 'Close',
  '%platformScripture_copyrightNotice_indicator_label%': 'Copyright notice for {name}',
};

const NIV: CopyrightNotice = {
  kind: 'restrictedLicense',
  name: 'NIV11',
  fullName: 'New International Version 2011',
  copyrightYears: '1973, 2011',
};

// jsdom ships no ResizeObserver, which the tooltip measures itself with
class NoopResizeObserver {
  private readonly targets = new Set<Element>();

  observe(target: Element) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
  }
}

beforeEach(() => {
  vi.stubGlobal('ResizeObserver', NoopResizeObserver);
  hook.ignoresDefault = false;
  noticesByProject.clear();
  noticesByProject.set('niv', NIV);
  noticesByProject.set('web', { kind: 'none' });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('CopyrightNoticeIndicator', () => {
  it('names the notice of the text it is for, briefly', () => {
    render(<CopyrightNoticeIndicator projectId="niv" localizedStrings={STRINGS} />);

    expect(screen.getByRole('button', { name: 'Copyright notice for NIV11' })).toBeInTheDocument();
  });

  it('shows the whole notice as one paragraph in its tooltip', async () => {
    render(<CopyrightNoticeIndicator projectId="niv" localizedStrings={STRINGS} />);

    fireEvent.focus(screen.getByRole('button', { name: 'Copyright notice for NIV11' }));

    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).toHaveTextContent('NIV11: The NIV11 is for reference only.');
    const visibleContent = document.querySelector('[data-slot="tooltip-content"]');
    expect(visibleContent?.querySelector(':scope > p')).toHaveTextContent(
      'NIV11: The NIV11 is for reference only.',
    );
  });

  it('shows nothing for a text that needs no notice', () => {
    render(<CopyrightNoticeIndicator projectId="web" localizedStrings={STRINGS} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('shows nothing when the notice has not been read at all', () => {
    hook.ignoresDefault = true;
    noticesByProject.clear();

    render(<CopyrightNoticeIndicator projectId="niv" localizedStrings={STRINGS} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it("never shows the previous text's notice while the new text's notice is on its way", () => {
    const { rerender } = render(
      <CopyrightNoticeIndicator projectId="niv" localizedStrings={STRINGS} />,
    );
    expect(screen.getByRole('button', { name: 'Copyright notice for NIV11' })).toBeInTheDocument();

    rerender(<CopyrightNoticeIndicator projectId="nrt" localizedStrings={STRINGS} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it("opens what the banner's More info opens, without activating the cell around it", () => {
    const onCellClick = vi.fn();

    render(
      // The grid opens a chapter view when a cell is clicked; the stand-in cell records that
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div onClick={onCellClick}>
        <CopyrightNoticeIndicator projectId="niv" localizedStrings={STRINGS} />
      </div>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Copyright notice for NIV11' }));

    expect(screen.getByRole('dialog', { name: 'Copyright for NIV11' })).toHaveTextContent(
      'New International Version 2011™ Bible copyright © 1973, 2011 by Biblica, Inc.',
    );
    expect(onCellClick).not.toHaveBeenCalled();
  });
});
