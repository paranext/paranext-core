// @vitest-environment jsdom

import { describe, it, expect, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useDblResourceAutoInstall } from './use-dbl-resource-auto-install.hook';

/** A resolving install spy. */
const okInstall = () => vi.fn(async () => {});
/** A rejecting install spy. */
const failInstall = () =>
  vi.fn(async () => {
    throw new Error('install failed');
  });

describe('useDblResourceAutoInstall', () => {
  it('installs the uid and reports isInstalling while pending', async () => {
    const installResource = okInstall();
    const { result } = renderHook(() => useDblResourceAutoInstall('uid-a', installResource));

    expect(result.current.isInstalling).toBe(true);
    expect(result.current.installFailed).toBe(false);
    await waitFor(() => expect(installResource).toHaveBeenCalledWith('uid-a'));
  });

  it('does nothing when there is no uid to install', () => {
    const installResource = okInstall();
    const { result } = renderHook(() => useDblResourceAutoInstall(undefined, installResource));

    expect(installResource).not.toHaveBeenCalled();
    expect(result.current.isInstalling).toBe(false);
    expect(result.current.installFailed).toBe(false);
  });

  it('skips the auto-install when skipAutoInstall is true', () => {
    const installResource = okInstall();
    renderHook(() => useDblResourceAutoInstall('uid-a', installResource, true));

    expect(installResource).not.toHaveBeenCalled();
  });

  it('surfaces installFailed after a failed attempt and attempts only once', async () => {
    const installResource = failInstall();
    const { result } = renderHook(() => useDblResourceAutoInstall('uid-a', installResource));

    await waitFor(() => expect(result.current.installFailed).toBe(true));
    expect(result.current.isInstalling).toBe(false);
    expect(installResource).toHaveBeenCalledTimes(1);
  });

  it('does not re-attempt a failed uid across re-renders (no retry storm)', async () => {
    const installResource = failInstall();
    const { result, rerender } = renderHook(() =>
      useDblResourceAutoInstall('uid-a', installResource),
    );

    await waitFor(() => expect(result.current.installFailed).toBe(true));
    rerender();
    rerender();
    expect(installResource).toHaveBeenCalledTimes(1);
  });

  it('retryInstall re-attempts the same uid', async () => {
    const installResource = failInstall();
    const { result } = renderHook(() => useDblResourceAutoInstall('uid-a', installResource));

    await waitFor(() => expect(result.current.installFailed).toBe(true));
    act(() => result.current.retryInstall());
    await waitFor(() => expect(installResource).toHaveBeenCalledTimes(2));
  });

  it('attempts a newly-configured uid even while a previous uid is in the failed state', async () => {
    // Only uid-a fails; uid-b installs cleanly.
    const installResource = vi.fn(async (uid: string) => {
      if (uid === 'uid-a') throw new Error('install failed');
    });
    const { result, rerender } = renderHook(
      ({ uid }: { uid: string }) => useDblResourceAutoInstall(uid, installResource),
      { initialProps: { uid: 'uid-a' } },
    );

    await waitFor(() => expect(result.current.installFailed).toBe(true));
    rerender({ uid: 'uid-b' });
    await waitFor(() => expect(installResource).toHaveBeenCalledWith('uid-b'));
    // The new uid is attempted, not stuck in the previous uid's failed state.
    expect(result.current.installFailed).toBe(false);
  });
});
