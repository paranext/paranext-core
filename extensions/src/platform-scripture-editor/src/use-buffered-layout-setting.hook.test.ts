// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import {
  newPlatformError,
  type PlatformError,
  type PlatformEventHandler,
} from 'platform-bible-utils';
import { logger } from '@papi/frontend';
import { useProjectSetting } from '@papi/frontend/react';
import { useEvent } from 'platform-bible-react';
import { useBufferedLayoutSetting } from './use-buffered-layout-setting.hook';
import { CURRENT_DATA_VERSION } from './resource-reference-list.const';

vi.mock('@papi/frontend/react', () => ({ useProjectSetting: vi.fn() }));
vi.mock('@papi/frontend', () => ({
  // The token names the event it was requested for, so a test can pin which event is subscribed.
  default: { network: { getNetworkEvent: vi.fn((eventType: string) => `event:${eventType}`) } },
  logger: { warn: vi.fn() },
}));

// Capture the useEvent handler so the test can fire the re-arm event on demand.
let capturedHandler: PlatformEventHandler<{ projectId: string }> | undefined;
vi.mock('platform-bible-react', () => ({
  useEvent: vi.fn((_event, handler) => {
    capturedHandler = handler;
  }),
}));

const mockUseProjectSetting = vi.mocked(useProjectSetting);

// This hook never inspects the setting's contents, so these fixtures only need to be distinguishable
// from one another. They use the production data version so they cannot drift from what the app
// writes.
const emptyList = { dataVersion: CURRENT_DATA_VERSION, items: [] };

/** A settings value holding one entry, for distinguishing one project's value from another's. */
const oneProjectList = (name: string, id: string) => ({
  dataVersion: CURRENT_DATA_VERSION,
  items: [{ type: 'project', name, id }],
});

/**
 * Set the value the mocked `useProjectSetting` returns. `isLoading` defaults to `false` (the
 * settled state); pass `true` to simulate the initial loading phase before the real value arrives.
 */
const setRaw = (value: unknown, isLoading = false) =>
  // `useProjectSetting`'s real return type is a specific setting-typed tuple; the mock only needs
  // to satisfy the hook's destructuring shape `[setting, setSetting, resetSetting, isLoading]`, so
  // cast the test-only tuple to `never` rather than reconstructing the full generic setter types.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  mockUseProjectSetting.mockReturnValue([value, undefined, undefined, isLoading] as never);

/**
 * Renders the hook bound to `initialProjectId`. `rerender` keeps the current project;
 * `switchProject` changes `projectId` in place.
 */
const renderBuffered = (initialProjectId: string | undefined) => {
  let currentProjectId = initialProjectId;
  const rendered = renderHook(
    ({ projectId }: { projectId: string | undefined }) =>
      useBufferedLayoutSetting(projectId, 'platformScripture.modelTexts', emptyList),
    { initialProps: { projectId: initialProjectId } },
  );
  return {
    result: rendered.result,
    rerender: () => rendered.rerender({ projectId: currentProjectId }),
    switchProject: (projectId: string | undefined) => {
      currentProjectId = projectId;
      rendered.rerender({ projectId });
    },
  };
};

/** Fires the shared-layout apply event for `projectId`. */
const fireSharedLayoutApply = (projectId: string) => {
  // Fail here if nothing was captured, rather than letting the event become a silent no-op.
  expect(capturedHandler).toBeDefined();
  act(() => capturedHandler?.({ projectId }));
};

describe('useBufferedLayoutSetting', () => {
  beforeEach(() => {
    // Reset rather than clear: `clearAllMocks` leaves `mockReturnValue` in place, so a test that
    // forgot `setRaw` would silently inherit the previous test's raw value. `mockReset` restores
    // the implementations passed to `vi.fn(impl)` above, so the handler capture survives.
    vi.resetAllMocks();
    capturedHandler = undefined;
  });

  it('applies a value that is already settled at mount', () => {
    const first = oneProjectList('A', '1');
    setRaw(first);
    const { result } = renderBuffered('proj-1');
    expect(result.current[0]).toEqual(first);
  });

  it('does not lock in the loading placeholder — applies the value once it finishes loading', () => {
    const real = oneProjectList('A', '1');
    // Initial mount: still loading, so `useProjectSetting` returns the default placeholder.
    setRaw(emptyList, true);
    const { result, rerender } = renderBuffered('proj-1');
    // The subscription resolves: the real value arrives and loading finishes.
    setRaw(real, false);
    rerender();
    expect(result.current[0]).toEqual(real);
  });

  it('reports loading again on a later read while still serving the held value', () => {
    const real = oneProjectList('A', '1');
    setRaw(emptyList, true);
    const { result, rerender } = renderBuffered('proj-1');
    expect(result.current[1]).toBe(true);

    setRaw(real, false);
    rerender();
    expect(result.current[1]).toBe(false);

    setRaw(emptyList, true);
    rerender();
    const [held, isLoading] = result.current;
    expect(isLoading).toBe(true);
    expect(held).toEqual(real);
  });

  it('holds a later raw change until re-armed', () => {
    const first = oneProjectList('A', '1');
    const second = oneProjectList('B', '2');
    setRaw(first);
    const { result, rerender } = renderBuffered('proj-1');
    setRaw(second);
    rerender();
    expect(result.current[0]).toEqual(first);
  });

  it('applies the raw value when the shared-layout apply event fires for the matching project', () => {
    const first = oneProjectList('A', '1');
    const second = oneProjectList('B', '2');
    setRaw(first);
    const { result, rerender } = renderBuffered('proj-1');
    expect(vi.mocked(useEvent)).toHaveBeenCalledWith(
      'event:platformScriptureEditor.onSharedLayoutApply',
      expect.any(Function),
    );
    setRaw(second);
    rerender();
    fireSharedLayoutApply('proj-1');
    expect(result.current[0]).toEqual(second);
  });

  it('ignores the shared-layout apply event for a different project', () => {
    const first = oneProjectList('A', '1');
    const second = oneProjectList('B', '2');
    setRaw(first);
    const { result, rerender } = renderBuffered('proj-1');
    setRaw(second);
    rerender();
    fireSharedLayoutApply('other-proj');
    expect(result.current[0]).toEqual(first);
  });

  it('passes a held PlatformError value through unchanged', () => {
    const error: PlatformError = newPlatformError('boom');
    setRaw(error);
    const { result } = renderBuffered('proj-1');
    expect(result.current[0]).toBe(error);
  });

  it('stays armed through a read error so a later real value still lands', () => {
    const error: PlatformError = newPlatformError('boom');
    const real = oneProjectList('A', '1');

    // Mount while the setting is still loading, so nothing is latched yet.
    setRaw(emptyList, true);
    const { result, rerender } = renderBuffered('proj-1');

    // The setting resolves to a read error. Applying it and disarming here is what made the
    // failure permanent: only an unrelated `onSharedLayoutApply` could ever re-arm the hook.
    setRaw(error);
    rerender();

    // The setting becomes readable. The real value must land on its own — no re-arm event.
    setRaw(real);
    rerender();

    expect(result.current[0]).toEqual(real);
  });

  it('reports the error while the setting is unreadable and nothing has been applied yet', () => {
    const error: PlatformError = newPlatformError('boom');

    setRaw(emptyList, true);
    const { result, rerender } = renderBuffered('proj-1');

    setRaw(error);
    rerender();

    // The held copy is still the placeholder here, so this channel is the ONLY way a consumer can
    // tell "unreadable" from "configured with nothing" — `useTextCollectionSources` and
    // `useEffectiveResourceReferenceList` both depend on it.
    expect(result.current[2]).toBe(error);
  });

  it('keeps an applied value and reports no error when a later read fails', () => {
    const real = oneProjectList('A', '1');
    const error: PlatformError = newPlatformError('boom');

    setRaw(emptyList, true);
    const { result, rerender } = renderBuffered('proj-1');

    setRaw(real);
    rerender();
    expect(result.current[0]).toEqual(real);

    // A read fails AFTER a real value was applied. Holding a good value across a failed re-read is
    // the whole point of the buffer, so the panel must keep showing it rather than swap working
    // content for an error message.
    setRaw(error);
    rerender();

    const [held, , settingError] = result.current;
    expect(held).toEqual(real);
    expect(settingError).toBeUndefined();
  });

  // An unbound consumer has no data provider, so `isLoading` stays true until a project arrives
  // (`create-use-data-hook.util.ts`; supplied by the mock here). That keeps the hook armed, which is
  // what makes it safe to supply a project after mount.
  it('stays armed while unbound so a projectId arriving later still applies', () => {
    const arrived = oneProjectList('A', '1');
    setRaw(emptyList, true);
    const { result, switchProject } = renderBuffered(undefined);
    expect(result.current[0]).toEqual(emptyList);

    setRaw(arrived, false);
    switchProject('proj-1');

    expect(result.current[0]).toEqual(arrived);
  });

  // TODO(PT-4316): if the hook stops warning on an in-place project change, delete this block.
  describe('in-place projectId tripwire', () => {
    it('warns when projectId moves in place between two projects', () => {
      setRaw(emptyList);
      const { switchProject } = renderBuffered('proj-1');
      expect(vi.mocked(logger.warn)).not.toHaveBeenCalled();
      switchProject('proj-2');
      expect(vi.mocked(logger.warn)).toHaveBeenCalledTimes(1);
    });

    it('does not warn on a stable projectId across rerenders', () => {
      setRaw(emptyList);
      const { rerender } = renderBuffered('proj-1');
      rerender();
      rerender();
      expect(vi.mocked(logger.warn)).not.toHaveBeenCalled();
    });

    it('stays silent when an unbound consumer binds, then warns when it moves on', () => {
      setRaw(emptyList, true);
      const { switchProject } = renderBuffered(undefined);
      switchProject('proj-1');
      expect(vi.mocked(logger.warn)).not.toHaveBeenCalled();
      switchProject('proj-2');
      expect(vi.mocked(logger.warn)).toHaveBeenCalledTimes(1);
    });
  });

  // TODO(PT-4316): if this hook resets on an in-place project change, invert these cases rather
  // than deleting them. Each drives the switch the way the real stack delivers it — the outgoing
  // project's settled value is still served on the switching commit — which a reset keyed on
  // `projectId` alone does not survive.
  describe('in-place project change without a remount', () => {
    it('holds the outgoing project value until the incoming project re-arms', () => {
      const first = oneProjectList('A', '1');
      const second = oneProjectList('B', '2');
      setRaw(first);
      const { result, rerender, switchProject } = renderBuffered('proj-1');

      switchProject('proj-2');
      setRaw(emptyList, true);
      rerender();
      setRaw(second, false);
      rerender();
      expect(result.current[0]).toEqual(first);

      fireSharedLayoutApply('proj-2');
      expect(result.current[0]).toEqual(second);
    });

    it('reports no error for the incoming project', () => {
      const first = oneProjectList('A', '1');
      setRaw(first);
      const { result, rerender, switchProject } = renderBuffered('proj-1');

      switchProject('proj-2');
      setRaw(newPlatformError('boom'));
      rerender();

      // The hook did read the incoming project's setting; it just does not report the error.
      expect(mockUseProjectSetting).toHaveBeenLastCalledWith(
        'proj-2',
        'platformScripture.modelTexts',
        emptyList,
      );
      const [held, , settingError] = result.current;
      expect(held).toEqual(first);
      expect(settingError).toBeUndefined();
    });

    it('latches the outgoing project value when the switch lands while still armed', () => {
      const first = oneProjectList('A', '1');
      const second = oneProjectList('B', '2');
      setRaw(emptyList, true);
      const { result, rerender, switchProject } = renderBuffered('proj-1');

      // The outgoing project's read settles after the switch, then the incoming project's does.
      switchProject('proj-2');
      setRaw(first, false);
      rerender();
      setRaw(second, false);
      rerender();

      expect(result.current[0]).toEqual(first);
    });
  });
});
