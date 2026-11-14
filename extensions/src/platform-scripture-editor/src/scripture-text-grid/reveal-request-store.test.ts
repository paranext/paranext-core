// @vitest-environment jsdom
import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  installRevealRequestListener,
  resetRevealRequestStoreForTesting,
  REVEAL_REQUEST_MAX_AGE_MS,
  useRevealRequest,
} from './reveal-request-store';

function requireRequestId(request: { requestId: number } | undefined): number {
  if (!request) throw new Error('Expected a reveal request');
  return request.requestId;
}

function post(data: unknown) {
  act(() => {
    window.dispatchEvent(new MessageEvent('message', { data }));
  });
}

describe('reveal request store', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    resetRevealRequestStoreForTesting();
    installRevealRequestListener(window);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('delivers a request posted before the hook mounted', () => {
    post({ method: 'revealResource', projectId: 'P1' });
    const { result } = renderHook(() => useRevealRequest(true));
    expect(result.current.revealRequest?.projectId).toBe('P1');
  });

  it('delivers at once while visible', () => {
    const { result } = renderHook(() => useRevealRequest(true));
    expect(result.current.revealRequest).toBeUndefined();
    post({ method: 'revealResource', projectId: 'P1' });
    expect(result.current.revealRequest?.projectId).toBe('P1');
  });

  it('defers a request made while hidden and delivers it once shown', () => {
    const { result, rerender } = renderHook(({ visible }) => useRevealRequest(visible), {
      initialProps: { visible: false },
    });
    post({ method: 'revealResource', projectId: 'P1' });
    expect(result.current.revealRequest).toBeUndefined();
    rerender({ visible: true });
    expect(result.current.revealRequest?.projectId).toBe('P1');
  });

  it('keeps only the last of several hidden requests', () => {
    const { result, rerender } = renderHook(({ visible }) => useRevealRequest(visible), {
      initialProps: { visible: false },
    });
    post({ method: 'revealResource', projectId: 'P1' });
    post({ method: 'revealResource', projectId: 'P2' });
    rerender({ visible: true });
    expect(result.current.revealRequest?.projectId).toBe('P2');
  });

  it('drops a request older than the max age', () => {
    const { result, rerender } = renderHook(({ visible }) => useRevealRequest(visible), {
      initialProps: { visible: false },
    });
    post({ method: 'revealResource', projectId: 'P1' });
    act(() => {
      vi.advanceTimersByTime(REVEAL_REQUEST_MAX_AGE_MS + 1);
    });
    rerender({ visible: true });
    expect(result.current.revealRequest).toBeUndefined();
  });

  it('clears the request once handled', () => {
    post({ method: 'revealResource', projectId: 'P1' });
    const { result, unmount } = renderHook(() => useRevealRequest(true));
    const requestId = requireRequestId(result.current.revealRequest);
    act(() => result.current.onRevealHandled(requestId));
    expect(result.current.revealRequest).toBeUndefined();
    unmount();
    const remounted = renderHook(() => useRevealRequest(true));
    expect(remounted.result.current.revealRequest).toBeUndefined();
  });

  it('gives a repeated request for the same resource a new request id', () => {
    const { result } = renderHook(() => useRevealRequest(true));
    post({ method: 'revealResource', projectId: 'P1' });
    const first = requireRequestId(result.current.revealRequest);
    act(() => result.current.onRevealHandled(first));
    post({ method: 'revealResource', projectId: 'P1' });
    expect(result.current.revealRequest?.requestId).not.toBe(first);
  });

  it('ignores messages that are not reveal requests', () => {
    const { result } = renderHook(() => useRevealRequest(true));
    post({ method: 'other', projectId: 'P1' });
    post({ method: 'revealResource' });
    post({ method: 'revealResource', projectId: 42 });
    post(JSON.parse('null'));
    expect(result.current.revealRequest).toBeUndefined();
  });

  it('registers one message listener however often install is called', async () => {
    vi.resetModules();
    const freshStore = await import('./reveal-request-store');
    const addListener = vi.spyOn(window, 'addEventListener');
    freshStore.installRevealRequestListener(window);
    freshStore.installRevealRequestListener(window);
    const messageRegistrations = addListener.mock.calls.filter(([type]) => type === 'message');
    addListener.mockRestore();
    expect(messageRegistrations).toHaveLength(1);
  });
});
