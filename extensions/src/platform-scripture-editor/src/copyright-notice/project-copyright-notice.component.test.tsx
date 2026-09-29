// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { newPlatformError } from 'platform-bible-utils';
import type { CopyrightNotice } from 'platform-scripture';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ProjectCopyrightNotice } from './project-copyright-notice.component';

const { noticesByProject, loggerWarn } = vi.hoisted(() => ({
  /** Each project's notice; a project that is absent has not answered yet */
  noticesByProject: new Map<string, unknown>(),
  loggerWarn: vi.fn(),
}));

// Like the real hook, keeps serving the value it last had until the new project's value arrives
vi.mock('@papi/frontend/react', async () => {
  const { useRef } = await import('react');
  return {
    useProjectSetting: (projectId: string | undefined, key: string, fallback: unknown) => {
      const lastValue = useRef(fallback);
      if (key === 'platformScripture.copyrightNotice' && projectId) {
        const value = noticesByProject.get(projectId);
        if (value !== undefined) lastValue.current = value;
      }
      return [lastValue.current, vi.fn(), vi.fn(), false];
    },
  };
});

vi.mock('@papi/frontend', () => ({ logger: { warn: loggerWarn } }));

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
  '%platformScripture_copyrightNotice_dismiss%': 'Dismiss copyright notice',
  '%platformScripture_copyrightNotice_details_title%': 'Copyright for {name}',
  '%platformScripture_copyrightNotice_details_close%': 'Close',
};

function restricted(name: string, fullName: string): CopyrightNotice {
  return { kind: 'restrictedLicense', name, fullName, copyrightYears: '2011' };
}

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

function dismiss() {
  fireEvent.click(screen.getByRole('button', { name: 'Dismiss copyright notice' }));
}

beforeEach(() => {
  vi.stubGlobal('ResizeObserver', NoopResizeObserver);
  loggerWarn.mockClear();
  noticesByProject.clear();
  noticesByProject.set('niv', restricted('NIV11', 'New International Version 2011'));
  noticesByProject.set('nrt', restricted('NRT23', 'New Russian Translation 2023'));
  noticesByProject.set('web', { kind: 'none' });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('ProjectCopyrightNotice', () => {
  it("shows the project's notice using its names", () => {
    render(<Harness projectId="niv" useWebViewState={makeWebViewState()} />);

    expect(screen.getByRole('note')).toHaveTextContent('NIV11: The NIV11 is for reference only.');
  });

  it('shows nothing for a project that needs no notice', () => {
    render(<Harness projectId="web" useWebViewState={makeWebViewState()} />);

    expect(screen.queryByRole('note')).not.toBeInTheDocument();
  });

  it('shows nothing for a notice kind it does not know', () => {
    noticesByProject.set('niv', { kind: 'somethingNew' });

    render(<Harness projectId="niv" useWebViewState={makeWebViewState()} />);

    expect(screen.queryByRole('note')).not.toBeInTheDocument();
  });

  it('shows nothing when there is no project', () => {
    render(<Harness projectId={undefined} useWebViewState={makeWebViewState()} />);

    expect(screen.queryByRole('note')).not.toBeInTheDocument();
  });

  it('shows nothing, and says why in the log, when the notice cannot be read', () => {
    noticesByProject.set('niv', newPlatformError('no provider'));

    render(<Harness projectId="niv" useWebViewState={makeWebViewState()} />);

    expect(screen.queryByRole('note')).not.toBeInTheDocument();
    expect(loggerWarn).toHaveBeenCalledWith(expect.stringContaining('no provider'));
  });

  it('stays dismissed for the text it shows, including after the pane is reopened', () => {
    const useWebViewState = makeWebViewState();
    const { unmount } = render(<Harness projectId="niv" useWebViewState={useWebViewState} />);

    dismiss();
    expect(screen.queryByRole('note')).not.toBeInTheDocument();

    unmount();
    render(<Harness projectId="niv" useWebViewState={useWebViewState} />);
    expect(screen.queryByRole('note')).not.toBeInTheDocument();
  });

  it("shows the notice again once the pane has shown another text, as Paratext 9's window does", () => {
    const useWebViewState = makeWebViewState();
    const { rerender } = render(<Harness projectId="niv" useWebViewState={useWebViewState} />);
    dismiss();

    rerender(<Harness projectId="nrt" useWebViewState={useWebViewState} />);
    expect(screen.getByRole('note')).toHaveTextContent('NRT23:');

    rerender(<Harness projectId="niv" useWebViewState={useWebViewState} />);
    expect(screen.getByRole('note')).toHaveTextContent('NIV11:');
  });

  it('keeps the dismissal while the pane briefly has no text', () => {
    const useWebViewState = makeWebViewState();
    const { rerender } = render(<Harness projectId="niv" useWebViewState={useWebViewState} />);
    dismiss();

    rerender(<Harness projectId={undefined} useWebViewState={useWebViewState} />);
    rerender(<Harness projectId="niv" useWebViewState={useWebViewState} />);

    expect(screen.queryByRole('note')).not.toBeInTheDocument();
  });

  it("never shows the previous text's notice while the new text's notice is on its way", () => {
    noticesByProject.delete('nrt');
    const useWebViewState = makeWebViewState();
    const { rerender } = render(<Harness projectId="niv" useWebViewState={useWebViewState} />);
    expect(screen.getByRole('note')).toHaveTextContent('NIV11:');

    rerender(<Harness projectId="nrt" useWebViewState={useWebViewState} />);

    expect(screen.queryByRole('note')).not.toBeInTheDocument();
  });
});
