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

  it('markInstallFailed surfaces installFailed for a uid without an auto-install attempt', () => {
    // Mirrors a manual pick: the caller installs the resource itself (skipAutoInstall) and reports
    // the failure via markInstallFailed.
    const installResource = okInstall();
    const { result } = renderHook(() => useDblResourceAutoInstall('uid-a', installResource, true));

    expect(result.current.installFailed).toBe(false);
    act(() => result.current.markInstallFailed('uid-a'));

    expect(result.current.installFailed).toBe(true);
    expect(result.current.isInstalling).toBe(false);
    // The hook never ran its own install — the caller already attempted it.
    expect(installResource).not.toHaveBeenCalled();
  });

  it('does not fire a duplicate auto-install after markInstallFailed when the pick finishes', async () => {
    // While the manual pick is in flight (skipAutoInstall = true) the failed uid is recorded; when
    // the pick finishes (skipAutoInstall = false) the failed-uid guard must suppress the auto-install.
    const installResource = okInstall();
    const { result, rerender } = renderHook(
      ({ skip }: { skip: boolean }) => useDblResourceAutoInstall('uid-a', installResource, skip),
      { initialProps: { skip: true } },
    );

    act(() => result.current.markInstallFailed('uid-a'));
    rerender({ skip: false });

    // The auto-install effect re-enabled, but the recorded failure keeps it from re-downloading.
    await waitFor(() => expect(result.current.installFailed).toBe(true));
    expect(installResource).not.toHaveBeenCalled();
  });

  it('reports failure instead of re-installing a uid whose install already succeeded', async () => {
    // Installing a resource that is already on disk succeeds as a no-op, so the catalog behind the
    // panel can hand the same uid straight back. Re-firing the install there is an endless loop —
    // every success asks the caller to re-read that catalog, which returns the same uid again.
    const installResource = okInstall();
    // Typed up front (rather than asserted at the call) so the uid can later be cleared to
    // `undefined`, which is how the catalog refetch between attempts presents itself.
    const initialProps: { uid: string | undefined } = { uid: 'uid-a' };
    const { result, rerender } = renderHook(
      ({ uid }: { uid: string | undefined }) => useDblResourceAutoInstall(uid, installResource),
      { initialProps },
    );

    await waitFor(() => expect(installResource).toHaveBeenCalledTimes(1));

    // The catalog refetch the install triggered: the uid drops out while the fetch is in flight and
    // comes back still uninstalled.
    rerender({ uid: undefined });
    rerender({ uid: 'uid-a' });

    await waitFor(() => expect(result.current.installFailed).toBe(true));
    expect(installResource).toHaveBeenCalledTimes(1);
  });

  it('retryInstall re-attempts a uid whose install already succeeded', async () => {
    // The retry is user-initiated and the caller re-reads its catalog alongside it, so it is a
    // genuinely fresh attempt rather than a replay of the state that produced the error.
    const installResource = okInstall();
    // Typed up front (rather than asserted at the call) so the uid can later be cleared to
    // `undefined`, which is how the catalog refetch between attempts presents itself.
    const initialProps: { uid: string | undefined } = { uid: 'uid-a' };
    const { result, rerender } = renderHook(
      ({ uid }: { uid: string | undefined }) => useDblResourceAutoInstall(uid, installResource),
      { initialProps },
    );

    await waitFor(() => expect(installResource).toHaveBeenCalledTimes(1));
    rerender({ uid: undefined });
    rerender({ uid: 'uid-a' });
    await waitFor(() => expect(result.current.installFailed).toBe(true));

    act(() => result.current.retryInstall());

    await waitFor(() => expect(installResource).toHaveBeenCalledTimes(2));
  });

  it('runs the real install after the no-op one that precedes the data provider', async () => {
    // `useInstallDblResource` returns a callback that resolves without installing until the DBL
    // provider resolves, and a new callback identity once it does. That first resolve must not
    // count as an attempt, or the resource is never installed at all.
    const noOpInstall = vi.fn(async () => {});
    const realInstall = vi.fn(async () => {});
    const { result, rerender } = renderHook(
      ({ install }: { install: (uid: string) => Promise<void> }) =>
        useDblResourceAutoInstall('uid-a', install),
      { initialProps: { install: noOpInstall } },
    );

    await waitFor(() => expect(noOpInstall).toHaveBeenCalledTimes(1));
    rerender({ install: realInstall });

    await waitFor(() => expect(realInstall).toHaveBeenCalledWith('uid-a'));
    expect(result.current.installFailed).toBe(false);
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
