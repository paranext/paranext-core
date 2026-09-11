import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { type ProjectItem } from '@renderer/components/projects/project-picker.component';
import { PENDING_PROJECT_TIMEOUT_MS, usePendingProject } from './use-pending-project.hook';

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

const OLD_PROJECT: ProjectItem = {
  id: 'old',
  shortName: 'OLD',
  fullName: 'Old Project',
  isEditable: true,
};
const NEW_PROJECT: ProjectItem = {
  id: 'new',
  shortName: 'NEW',
  fullName: 'New Project',
  isEditable: true,
};

function doNothing() {}

/**
 * Mounts the hook over a caller-supplied `openProject`, and records the project it names on every
 * render so a name that only appears for a frame is still visible to assertions.
 */
function renderPendingProject(
  currentProject: ProjectItem | undefined,
  openProject: (projectId: string) => Promise<void> = async () => {},
) {
  const displayedIds: (string | undefined)[] = [];
  const rendered = renderHook(
    ({ current }: { current: ProjectItem | undefined }) => {
      const state = usePendingProject(current, openProject);
      displayedIds.push(state.displayedProject?.id);
      return state;
    },
    { initialProps: { current: currentProject } },
  );
  return { ...rendered, displayedIds };
}

describe('usePendingProject', () => {
  it('names the newly selected project before the editor reports it', () => {
    const { result } = renderPendingProject(OLD_PROJECT);
    expect(result.current.displayedProject?.id).toBe('old');

    act(() => {
      result.current.beginOpenProject(NEW_PROJECT);
    });

    // The editor still reports `old`; the hook must already name `new`.
    expect(result.current.pendingProject).toEqual(NEW_PROJECT);
    expect(result.current.displayedProject).toEqual(NEW_PROJECT);
  });

  it('stops naming the pending project once the editor reports it', () => {
    // The editor reports the id in its own casing, so a `===` comparison would never see the match
    // and the bridge would stay up until it timed out.
    const openedProject: ProjectItem = { id: 'NEW', shortName: 'NEW', fullName: 'New Project' };
    const { result, rerender } = renderPendingProject(OLD_PROJECT);

    act(() => {
      result.current.beginOpenProject(NEW_PROJECT);
    });
    expect(result.current.displayedProject?.id).toBe('new');

    rerender({ current: openedProject });

    // Back on what the editor reports, rather than still on the pending copy.
    expect(result.current.pendingProject).toBeUndefined();
    expect(result.current.displayedProject).toEqual(openedProject);
  });

  it('does not revert to an earlier project when its open fails after a newer selection', async () => {
    let rejectOpeningA: (error: Error) => void = doNothing;
    const projectA: ProjectItem = { id: 'a', shortName: 'A', fullName: 'A Project' };
    const projectB: ProjectItem = { id: 'b', shortName: 'B', fullName: 'B Project' };
    const { result } = renderPendingProject(undefined, async (projectId) => {
      if (projectId === 'a')
        await new Promise<void>((_resolve, reject) => {
          rejectOpeningA = reject;
        });
    });

    act(() => {
      result.current.beginOpenProject(projectA);
    });
    act(() => {
      result.current.beginOpenProject(projectB);
    });
    await act(async () => {
      rejectOpeningA(new Error('boom'));
    });

    expect(result.current.displayedProject?.id).toBe('b');
  });

  it('falls back to the current project when the editor never reports the selection', () => {
    vi.useFakeTimers();
    try {
      const ghost: ProjectItem = { id: 'ghost', shortName: 'GHOST', fullName: 'Ghost Project' };
      const { result } = renderPendingProject(OLD_PROJECT);

      act(() => {
        result.current.beginOpenProject(ghost);
      });
      expect(result.current.displayedProject?.id).toBe('ghost');

      act(() => {
        vi.advanceTimersByTime(PENDING_PROJECT_TIMEOUT_MS + 1);
      });

      expect(result.current.pendingProject).toBeUndefined();
      expect(result.current.displayedProject?.id).toBe('old');
    } finally {
      vi.useRealTimers();
    }
  });

  it('re-arms the fallback for the newest selection rather than letting the earlier one expire', () => {
    vi.useFakeTimers();
    try {
      const later: ProjectItem = { id: 'later', shortName: 'LTR', fullName: 'Later Project' };
      const { result } = renderPendingProject(OLD_PROJECT);

      act(() => {
        result.current.beginOpenProject(NEW_PROJECT);
      });
      act(() => {
        vi.advanceTimersByTime(PENDING_PROJECT_TIMEOUT_MS - 1);
      });
      act(() => {
        result.current.beginOpenProject(later);
      });
      // Past the first pick's deadline, nowhere near the second's.
      act(() => {
        vi.advanceTimersByTime(2);
      });

      expect(result.current.displayedProject?.id).toBe('later');
    } finally {
      vi.useRealTimers();
    }
  });

  it('never arms the pending fallback for the project that is already open', () => {
    // The list and the editor can spell the same id differently, so a bridge armed for a project
    // that never changed is visible as the named project flickering onto the list's spelling for a
    // frame before the match check retires it again.
    const openProjectItem: ProjectItem = { id: 'OPEN', shortName: 'OP', fullName: 'Open Project' };
    const { result, displayedIds } = renderPendingProject(openProjectItem);
    displayedIds.length = 0;

    act(() => {
      result.current.beginOpenProject({
        id: 'open',
        shortName: 'OP',
        fullName: 'Open Project',
        isEditable: true,
      });
    });

    expect(displayedIds).not.toContain('open');
    expect(result.current.pendingProject).toBeUndefined();
    expect(result.current.displayedProject?.id).toBe('OPEN');
  });

  it('retires an outstanding pending project when the open one is picked again', () => {
    // The bridge for `new` can outlive its usefulness — its editor may open in another window, so
    // neither the match check nor a rejection ever retires it. Picking the open project is the
    // user stating what is open, and must correct the named project at once rather than in 15
    // seconds.
    const { result } = renderPendingProject(OLD_PROJECT);

    act(() => {
      result.current.beginOpenProject(NEW_PROJECT);
    });
    expect(result.current.displayedProject?.id).toBe('new');

    act(() => {
      result.current.beginOpenProject(OLD_PROJECT);
    });

    expect(result.current.pendingProject).toBeUndefined();
    expect(result.current.displayedProject?.id).toBe('old');
  });

  it('cancels the pending fallback when the consumer unmounts', () => {
    vi.useFakeTimers();
    try {
      const { result, unmount } = renderPendingProject(OLD_PROJECT);

      act(() => {
        result.current.beginOpenProject(NEW_PROJECT);
      });
      const armedTimerCount = vi.getTimerCount();

      unmount();

      // Left running, the bound would fire against a component that is gone.
      expect(vi.getTimerCount()).toBeLessThan(armedTimerCount);
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      vi.useRealTimers();
    }
  });
});
