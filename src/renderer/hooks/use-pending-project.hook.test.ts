import { renderHook, act } from '@testing-library/react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { type ProjectItem } from '@renderer/components/projects/project-picker.component';
import { readFileSync } from 'fs';
import path from 'path';
import {
  PENDING_PROJECT_TIMEOUT_MS,
  PROJECT_OPEN_FAILED_MESSAGE_KEY,
  PROJECT_OPEN_FAILED_NOTIFICATION_ID,
  usePendingProject,
} from './use-pending-project.hook';

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn(), debug: vi.fn() },
}));

// Wrapped rather than passed straight in: `vi.mock` is hoisted above this declaration, so the
// factory can only reach the spy through a reference resolved when it is called.
const mockSendNotification = vi.fn<(notification: unknown) => Promise<void>>(async () => {});
vi.mock('@shared/services/notification.service', () => ({
  notificationService: {
    send: (notification: unknown) => mockSendNotification(notification),
  },
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
const THIRD_PROJECT: ProjectItem = {
  id: 'third',
  shortName: 'THIRD',
  fullName: 'Third Project',
  isEditable: true,
};

function doNothing() {}

// Spy isolation as a property of the file rather than of each author: tests outside the reporting
// block reject an open too, which now flows into the notification path, so a later assertion that
// forgets its own `mockClear()` would otherwise see calls from earlier tests.
afterEach(() => {
  mockSendNotification.mockClear();
});

/**
 * Mounts the hook over a caller-supplied `openProject`, and records the project it names on every
 * render so a name that only appears for a frame is still visible to assertions.
 *
 * `displayedProject` is derived here rather than returned by the hook, using the same
 * `pendingProject ?? currentProject` rule the consuming component applies (`ToolbarProjectSelector`
 * in `platform-bible-toolbar.tsx`). Asserting on it therefore pins what a user actually sees, while
 * leaving the hook's own surface to the two values production reads.
 */
function renderPendingProject(
  currentProject: ProjectItem | undefined,
  openProject: (projectId: string) => Promise<void> = async () => {},
) {
  const displayedIds: (string | undefined)[] = [];
  const rendered = renderHook(
    ({ current }: { current: ProjectItem | undefined }) => {
      const state = usePendingProject(current, openProject);
      const displayedProject = state.pendingProject ?? current;
      displayedIds.push(displayedProject?.id);
      return { ...state, displayedProject };
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
      result.current.beginOpenProject(NEW_PROJECT.id, NEW_PROJECT);
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
      result.current.beginOpenProject(NEW_PROJECT.id, NEW_PROJECT);
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
      result.current.beginOpenProject(projectA.id, projectA);
    });
    act(() => {
      result.current.beginOpenProject(projectB.id, projectB);
    });
    await act(async () => {
      rejectOpeningA(new Error('boom'));
    });

    expect(result.current.displayedProject?.id).toBe('b');
  });

  it('does not clear a newer pick of the SAME project when an earlier open of it fails', async () => {
    let rejectFirstOpen: (error: Error) => void = doNothing;
    let openCount = 0;
    const projectA: ProjectItem = { id: 'a', shortName: 'A', fullName: 'A Project' };
    const { result } = renderPendingProject(undefined, async () => {
      openCount += 1;
      // Only the first attempt hangs and then fails; the second is still outstanding.
      if (openCount === 1)
        await new Promise<void>((_resolve, reject) => {
          rejectFirstOpen = reject;
        });
      else await new Promise<void>(doNothing);
    });

    act(() => {
      result.current.beginOpenProject(projectA.id, projectA);
    });
    act(() => {
      result.current.beginOpenProject(projectA.id, projectA);
    });
    await act(async () => {
      rejectFirstOpen(new Error('boom'));
    });

    // Latest-wins has to key on the attempt, not the project: both picks name `a`, so comparing
    // ids would let the first attempt's rejection retire the second attempt's pick.
    expect(result.current.pendingProject).toEqual(projectA);
  });

  it('stops naming a pick once the editor settles on a different project instead', () => {
    const projectA: ProjectItem = { id: 'a', shortName: 'A', fullName: 'A Project' };
    const projectB: ProjectItem = { id: 'b', shortName: 'B', fullName: 'B Project' };
    const { result, rerender } = renderPendingProject(OLD_PROJECT);

    act(() => {
      result.current.beginOpenProject(projectA.id, projectA);
    });
    act(() => {
      result.current.beginOpenProject(projectB.id, projectB);
    });
    // A resolves last: the editor lands on A while B is the outstanding pick. Holding B until the
    // bound expires would have the trigger contradict the editor for up to 15 seconds.
    rerender({ current: projectA });

    expect(result.current.pendingProject).toBeUndefined();
    expect(result.current.displayedProject?.id).toBe('a');
  });

  it('keeps naming a pick while the editor still reports what it did when the pick was made', () => {
    const { result, rerender } = renderPendingProject(OLD_PROJECT);

    act(() => {
      result.current.beginOpenProject(NEW_PROJECT.id, NEW_PROJECT);
    });
    // The same project the editor already reported — it has not moved, so the bridge stands. This
    // is the case a bare "current is not the pick" exit would retire instantly.
    rerender({ current: { ...OLD_PROJECT } });

    expect(result.current.pendingProject).toEqual(NEW_PROJECT);
  });

  it('opens an unnamed pick without bridging, so no fabricated name reaches the surface', () => {
    const openProject = vi.fn(async () => {});
    const { result } = renderPendingProject(OLD_PROJECT, openProject);

    act(() => {
      result.current.beginOpenProject('dialog-only');
    });

    // A project reachable only through the dialog has no row to take display fields from. Standing
    // its raw id in for them would put `dialog-only (dialog-only)` in the trigger for the whole
    // bound; naming nothing leaves the open project's name up until the editor reports the change.
    expect(openProject).toHaveBeenCalledWith('dialog-only');
    expect(result.current.pendingProject).toBeUndefined();
    expect(result.current.displayedProject).toEqual(OLD_PROJECT);
  });

  it('falls back to the current project when the editor never reports the selection', () => {
    vi.useFakeTimers();
    try {
      const ghost: ProjectItem = { id: 'ghost', shortName: 'GHOST', fullName: 'Ghost Project' };
      const { result } = renderPendingProject(OLD_PROJECT);

      act(() => {
        result.current.beginOpenProject(ghost.id, ghost);
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

  it('keeps naming a project whose editor opened in another window, until the bound expires', () => {
    // The scenario the bound exists for, modelled end to end rather than left to prose. The open
    // SUCCEEDS — it neither throws nor is corrected — but the editor lands in a different window,
    // and `useProjectPickerData` reads only THIS window's web views on purpose, so `currentProject`
    // keeps reporting the project that was already here. No match, no rejection: the timeout is the
    // only exit, and until it fires the trigger must still name what the user picked.
    vi.useFakeTimers();
    try {
      const otherWindowProject: ProjectItem = {
        id: 'other-window',
        shortName: 'OTHER',
        fullName: 'Other Window Project',
      };
      const { result, rerender } = renderPendingProject(OLD_PROJECT);

      act(() => {
        result.current.beginOpenProject(otherWindowProject.id, otherWindowProject);
      });

      // This window's editor never changes, so re-rendering with the same current project is what
      // really happens while the other window opens.
      rerender({ current: OLD_PROJECT });
      act(() => {
        vi.advanceTimersByTime(PENDING_PROJECT_TIMEOUT_MS - 1);
      });
      expect(result.current.displayedProject?.id).toBe('other-window');

      act(() => {
        vi.advanceTimersByTime(1);
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
        result.current.beginOpenProject(NEW_PROJECT.id, NEW_PROJECT);
      });
      act(() => {
        vi.advanceTimersByTime(PENDING_PROJECT_TIMEOUT_MS - 1);
      });
      act(() => {
        result.current.beginOpenProject(later.id, later);
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
      result.current.beginOpenProject('open', {
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
      result.current.beginOpenProject(NEW_PROJECT.id, NEW_PROJECT);
    });
    expect(result.current.displayedProject?.id).toBe('new');

    act(() => {
      result.current.beginOpenProject(OLD_PROJECT.id, OLD_PROJECT);
    });

    expect(result.current.pendingProject).toBeUndefined();
    expect(result.current.displayedProject?.id).toBe('old');
  });

  it('cancels the pending fallback when the consumer unmounts', () => {
    vi.useFakeTimers();
    try {
      const { result, unmount } = renderPendingProject(OLD_PROJECT);

      act(() => {
        result.current.beginOpenProject(NEW_PROJECT.id, NEW_PROJECT);
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

describe('usePendingProject — reporting a failed open', () => {
  // Clearing the pending name drops the trigger back to whatever is open, undoing the user's pick
  // on screen. The Applying Changes guideline requires a failure to say so rather than just revert:
  // "Failure — Always — an error toast or inline message. Never fail silently."
  it('tells the user when the open rejects', async () => {
    mockSendNotification.mockClear();
    const { result } = renderPendingProject(OLD_PROJECT, async () => {
      throw new Error('boom');
    });

    await act(async () => {
      result.current.beginOpenProject(NEW_PROJECT);
    });

    expect(mockSendNotification).toHaveBeenCalledWith(
      // The id is what makes a retry replace the toast instead of stacking one per attempt, which
      // is the entire reason the constant exists.
      expect.objectContaining({
        message: PROJECT_OPEN_FAILED_MESSAGE_KEY,
        severity: 'warning',
        notificationId: PROJECT_OPEN_FAILED_NOTIFICATION_ID,
      }),
    );
  });

  // The toast names no project, so one fired for an abandoned pick reads as the pick the user is
  // now looking at having failed. Latest-wins, matching the state update beside it.
  it('stays quiet when a superseded pick fails after a newer one succeeded', async () => {
    let rejectOld: ((reason: Error) => void) | undefined;
    const openProject = vi.fn(async (projectId: string) => {
      if (projectId === NEW_PROJECT.id)
        await new Promise<void>((_resolve, reject) => {
          rejectOld = reject;
        });
    });
    const { result } = renderPendingProject(OLD_PROJECT, openProject);

    // Pick the slow-to-fail project, then pick another one that opens.
    act(() => {
      result.current.beginOpenProject(NEW_PROJECT);
    });
    await act(async () => {
      result.current.beginOpenProject(THIRD_PROJECT);
    });
    // Without this the optional call below is a no-op when the mock never captured a rejecter, and
    // "no notification" would hold for the wrong reason.
    expect(rejectOld).toBeDefined();
    await act(async () => {
      rejectOld?.(new Error('boom'));
    });

    expect(mockSendNotification).not.toHaveBeenCalled();
  });

  // An editor can legitimately open in another window and never report here, which is the whole
  // reason the timeout exists — so the timeout is not a failure and must not manufacture an error.
  it('stays quiet when the pending name expires instead of failing', () => {
    vi.useFakeTimers();
    try {
      mockSendNotification.mockClear();
      const { result } = renderPendingProject(OLD_PROJECT);

      act(() => {
        result.current.beginOpenProject(NEW_PROJECT);
      });
      act(() => {
        vi.advanceTimersByTime(PENDING_PROJECT_TIMEOUT_MS);
      });

      expect(result.current.pendingProject).toBeUndefined();
      expect(mockSendNotification).not.toHaveBeenCalled();
    } finally {
      vi.useRealTimers();
    }
  });
});

describe('usePendingProject — localization', () => {
  // `PlatformNotification.message` is typed `string | LocalizeKey`, so a typo or a key later renamed
  // in en.json type-checks fine and reaches the user as literal `%key%` text in a toast.
  it('uses a message key that actually exists in the localization file', () => {
    const englishStrings: Record<string, string> = JSON.parse(
      readFileSync(path.join(__dirname, '../../../assets/localization/en.json'), 'utf8'),
    );

    // `toHaveProperty` alone is satisfied by an empty string, which ships an empty toast. Both
    // arms assert the same thing, so neither locale can be the weaker guard.
    expect(englishStrings[PROJECT_OPEN_FAILED_MESSAGE_KEY]).toBeTruthy();
    expect(englishStrings[PROJECT_OPEN_FAILED_MESSAGE_KEY]).not.toBe(
      PROJECT_OPEN_FAILED_MESSAGE_KEY,
    );
  });

  // en and es are both maintained in this repo, and nothing in the build enforces parity — so a key
  // added to English only ships a Spanish user an English toast while every neighbouring toolbar
  // failure message is translated.
  it('has a Spanish translation too', () => {
    const spanishStrings: Record<string, string> = JSON.parse(
      readFileSync(path.join(__dirname, '../../../assets/localization/es.json'), 'utf8'),
    );

    expect(spanishStrings[PROJECT_OPEN_FAILED_MESSAGE_KEY]).toBeTruthy();
    expect(spanishStrings[PROJECT_OPEN_FAILED_MESSAGE_KEY]).not.toBe(
      PROJECT_OPEN_FAILED_MESSAGE_KEY,
    );
  });
});
