// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import type { CopyrightNotice } from 'platform-scripture';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ProjectCopyrightNotice } from './project-copyright-notice.component';

type ProjectSettings = {
  'platformScripture.copyrightNotice': CopyrightNotice | Error;
  'platform.name': string;
  'platform.fullName': string;
};

const { settingsByProject } = vi.hoisted(() => ({
  settingsByProject: new Map<string, Partial<ProjectSettings>>(),
}));

vi.mock('@papi/frontend/react', () => ({
  useProjectSetting: (
    projectId: string | undefined,
    key: keyof ProjectSettings,
    fallback: unknown,
  ) => [
    (projectId && settingsByProject.get(projectId)?.[key]) ?? fallback,
    vi.fn(),
    vi.fn(),
    false,
  ],
}));

vi.mock('@papi/frontend', () => ({
  default: { commands: { sendCommand: vi.fn(async () => undefined) } },
  logger: { warn: vi.fn() },
}));

vi.mock('platform-bible-utils', async (importOriginal) => {
  const original = await importOriginal<typeof import('platform-bible-utils')>();
  return { ...original, isPlatformError: (value: unknown) => value instanceof Error };
});

const STRINGS = {
  '%platformScripture_copyrightNotice_restrictedLicense_banner%':
    '{label}: The {name} is for reference only.',
  '%platformScripture_copyrightNotice_restrictedLicense_details%':
    '{fullName}™ Bible copyright © {years}. Ask at {permissionsLink}',
  '%platformScripture_copyrightNotice_restrictedLicense_details_noYears%':
    '{fullName}™ Bible copyright. Ask at {permissionsLink}',
  '%platformScripture_copyrightNotice_notification_format%': '{name}: {notice}',
  '%platformScripture_copyrightNotice_moreInfo%': 'More Info…',
  '%platformScripture_copyrightNotice_showMore%': 'Show more',
  '%platformScripture_copyrightNotice_showLess%': 'Show less',
  '%platformScripture_copyrightNotice_dismiss%': 'Dismiss',
  '%platformScripture_copyrightNotice_details_title%': 'Copyright for {name}',
  '%platformScripture_copyrightNotice_details_close%': 'Close',
};

/** Web view state that outlives the component, as the real web view's state does */
function makeWebViewState() {
  const store = new Map<string, unknown>();
  return function useFakeWebViewState<T>(
    key: string,
    defaultValue: T,
  ): [T, (next: T) => void, () => void] {
    // The store only ever holds values this hook wrote for the same key
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const [value, setValue] = useState<T>(() => (store.get(key) as T | undefined) ?? defaultValue);
    return [
      value,
      (next: T) => {
        store.set(key, next);
        setValue(next);
      },
      () => {
        store.delete(key);
        setValue(defaultValue);
      },
    ];
  };
}

function Harness({
  projectId,
  useWebViewState,
}: {
  projectId: string | undefined;
  useWebViewState: ReturnType<typeof makeWebViewState>;
}) {
  return (
    <ProjectCopyrightNotice
      projectId={projectId}
      localizedStrings={STRINGS}
      useWebViewState={useWebViewState}
    />
  );
}

// jsdom ships no ResizeObserver; the banner's clamping has its own tests, so a no-op is enough
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
  settingsByProject.clear();
  settingsByProject.set('niv', {
    'platformScripture.copyrightNotice': { kind: 'restrictedLicense', copyrightYears: '2011' },
    'platform.name': 'NIV11',
    'platform.fullName': 'New International Version 2011',
  });
  settingsByProject.set('nrt', {
    'platformScripture.copyrightNotice': { kind: 'restrictedLicense', copyrightYears: '2011' },
    'platform.name': 'NRT23',
    'platform.fullName': 'New Russian Translation 2023',
  });
  settingsByProject.set('web', {
    'platformScripture.copyrightNotice': { kind: 'none' },
    'platform.name': 'WEB',
    'platform.fullName': 'World English Bible',
  });
});

describe('ProjectCopyrightNotice', () => {
  it("shows the project's notice using its names", () => {
    render(<Harness projectId="niv" useWebViewState={makeWebViewState()} />);

    expect(screen.getByRole('status')).toHaveTextContent('NIV11: The NIV11 is for reference only.');
  });

  it('shows nothing for a project that needs no notice', () => {
    render(<Harness projectId="web" useWebViewState={makeWebViewState()} />);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('shows nothing for a notice kind it does not know', () => {
    settingsByProject.set('niv', {
      ...settingsByProject.get('niv'),
      // A kind a newer backend might send
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      'platformScripture.copyrightNotice': { kind: 'somethingNew' } as unknown as CopyrightNotice,
    });

    render(<Harness projectId="niv" useWebViewState={makeWebViewState()} />);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('shows nothing when there is no project', () => {
    render(<Harness projectId={undefined} useWebViewState={makeWebViewState()} />);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('shows nothing when the notice cannot be read', () => {
    settingsByProject.set('niv', {
      ...settingsByProject.get('niv'),
      'platformScripture.copyrightNotice': new Error('no provider'),
    });

    render(<Harness projectId="niv" useWebViewState={makeWebViewState()} />);

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('stays dismissed for that text, including after the pane is reopened', () => {
    const useWebViewState = makeWebViewState();
    const { unmount } = render(<Harness projectId="niv" useWebViewState={useWebViewState} />);

    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();

    unmount();
    render(<Harness projectId="niv" useWebViewState={useWebViewState} />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('shows the notice again when the pane switches to another restricted text', () => {
    const useWebViewState = makeWebViewState();
    const { rerender } = render(<Harness projectId="niv" useWebViewState={useWebViewState} />);
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));

    rerender(<Harness projectId="nrt" useWebViewState={useWebViewState} />);
    expect(screen.getByRole('status')).toHaveTextContent('NRT23:');

    // Switching back keeps the first text's dismissal
    rerender(<Harness projectId="niv" useWebViewState={useWebViewState} />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
