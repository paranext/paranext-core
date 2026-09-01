// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { usePublishFocusedResourceProjectId } from './use-publish-focused-resource.hook';

interface PublishProps {
  published: string | undefined;
  focused: string | undefined;
}

describe('usePublishFocusedResourceProjectId', () => {
  it('publishes the focused resource when nothing is published yet', () => {
    const setPublished = vi.fn();
    renderHook(() => usePublishFocusedResourceProjectId(undefined, setPublished, 'RES-1'));
    expect(setPublished).toHaveBeenCalledExactlyOnceWith('RES-1');
  });

  it('does not republish a value that is already published', () => {
    // Every publish writes web view state, which updates the web view definition and fans out an
    // onDidUpdateWebView event to every subscriber. Re-writing an unchanged value would loop.
    const setPublished = vi.fn();
    renderHook(() => usePublishFocusedResourceProjectId('RES-1', setPublished, 'RES-1'));
    expect(setPublished).not.toHaveBeenCalled();
  });

  it('publishes the new resource when the panel switches resources', () => {
    const setPublished = vi.fn();
    const { rerender } = renderHook(
      ({ published, focused }: PublishProps) =>
        usePublishFocusedResourceProjectId(published, setPublished, focused),
      { initialProps: { published: 'RES-1', focused: 'RES-1' } },
    );
    expect(setPublished).not.toHaveBeenCalled();
    rerender({ published: 'RES-1', focused: 'RES-2' });
    expect(setPublished).toHaveBeenCalledExactlyOnceWith('RES-2');
  });

  it('clears the published value when the panel resolves no resource', () => {
    // A panel still loading, or showing an uninstalled DBL resource, has no searchable project.
    // Leaving a stale id published would keep offering it in Find's picker.
    const setPublished = vi.fn();
    renderHook(() => usePublishFocusedResourceProjectId('RES-1', setPublished, undefined));
    expect(setPublished).toHaveBeenCalledExactlyOnceWith(undefined);
  });
});
