import { describe, expect, it, vi } from 'vitest';
import type PapiBackend from '@papi/backend';
import { finishOpenFromView } from './close-view-opened-from.util';

const EDITOR_ID = 'editor-1';
const HOME_ID = 'home-1';

/** Records, in order, the steps the open's finish takes that someone can see. */
function createMockPapi({
  closeWebView = async () => true,
}: { closeWebView?: (id: string) => Promise<boolean> } = {}) {
  const steps: string[] = [];
  const mockCloseWebView = vi.fn(async (id: string) => {
    steps.push(`close ${id}`);
    return closeWebView(id);
  });
  const mockRecordProjectOpened = vi.fn(async (projectId: string) => {
    steps.push(`record ${projectId}`);
  });
  const mockWarn = vi.fn();
  // Must cast since the mock only includes the papi properties finishOpenFromView uses.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const papi = {
    webViews: { closeWebView: mockCloseWebView },
    dataProviders: {
      get: vi.fn(async () => ({ recordProjectOpened: mockRecordProjectOpened })),
    },
    logger: { warn: mockWarn, debug: vi.fn() },
  } as unknown as typeof PapiBackend;
  const reveal = vi.fn(() => {
    steps.push('reveal');
  });
  return { papi, steps, reveal, mockCloseWebView, mockRecordProjectOpened, mockWarn };
}

describe('finishOpenFromView', () => {
  it('closes the view the project was opened from before the cover lifts', async () => {
    const { papi, steps, reveal } = createMockPapi();

    const result = await finishOpenFromView(papi, Promise.resolve(EDITOR_ID), {
      projectId: 'P1',
      webViewIdToClose: HOME_ID,
      reveal,
    });

    expect(result).toBe(EDITOR_ID);
    expect(steps.indexOf(`close ${HOME_ID}`)).toBeGreaterThanOrEqual(0);
    expect(steps.indexOf(`close ${HOME_ID}`)).toBeLessThan(steps.indexOf('reveal'));
  });

  it('records the project as recently opened after closing the view, which no longer can', async () => {
    const { papi, steps, reveal } = createMockPapi();

    await finishOpenFromView(papi, Promise.resolve(EDITOR_ID), {
      projectId: 'P1',
      webViewIdToClose: HOME_ID,
      reveal,
    });

    expect(steps).toContain('record P1');
    // Recording is invisible, so it must not hold the cover up.
    expect(steps.indexOf('reveal')).toBeLessThan(steps.indexOf('record P1'));
  });

  it('closes nothing, records nothing, and still lifts the cover when the open fails', async () => {
    const { papi, reveal, mockCloseWebView, mockRecordProjectOpened } = createMockPapi();
    const failure = new Error('could not open');

    await expect(
      finishOpenFromView(papi, Promise.reject(failure), {
        projectId: 'P1',
        webViewIdToClose: HOME_ID,
        reveal,
      }),
    ).rejects.toBe(failure);

    expect(mockCloseWebView).not.toHaveBeenCalled();
    expect(mockRecordProjectOpened).not.toHaveBeenCalled();
    expect(reveal).toHaveBeenCalledTimes(1);
  });

  it('closes nothing when the open answers with no web view', async () => {
    const { papi, reveal, mockCloseWebView, mockRecordProjectOpened } = createMockPapi();

    const result = await finishOpenFromView(papi, Promise.resolve(undefined), {
      projectId: 'P1',
      webViewIdToClose: HOME_ID,
      reveal,
    });

    expect(result).toBeUndefined();
    expect(mockCloseWebView).not.toHaveBeenCalled();
    expect(mockRecordProjectOpened).not.toHaveBeenCalled();
    expect(reveal).toHaveBeenCalledTimes(1);
  });

  it('closes and records nothing when no view was named', async () => {
    const { papi, reveal, mockCloseWebView, mockRecordProjectOpened } = createMockPapi();

    const result = await finishOpenFromView(papi, Promise.resolve(EDITOR_ID), {
      projectId: 'P1',
      webViewIdToClose: undefined,
      reveal,
    });

    expect(result).toBe(EDITOR_ID);
    expect(mockCloseWebView).not.toHaveBeenCalled();
    expect(mockRecordProjectOpened).not.toHaveBeenCalled();
    expect(reveal).toHaveBeenCalledTimes(1);
  });

  it('still lifts the cover and answers with the editor when the close fails', async () => {
    const { papi, reveal, mockRecordProjectOpened, mockWarn } = createMockPapi({
      closeWebView: async () => {
        throw new Error('no window answered');
      },
    });

    const result = await finishOpenFromView(papi, Promise.resolve(EDITOR_ID), {
      projectId: 'P1',
      webViewIdToClose: HOME_ID,
      reveal,
    });

    expect(result).toBe(EDITOR_ID);
    expect(reveal).toHaveBeenCalledTimes(1);
    expect(mockWarn).toHaveBeenCalledWith(expect.stringContaining('no window answered'));
    // The view is still open, so it records the project itself.
    expect(mockRecordProjectOpened).not.toHaveBeenCalled();
  });

  it('records nothing when the view was already gone', async () => {
    const { papi, reveal, mockRecordProjectOpened } = createMockPapi({
      closeWebView: async () => false,
    });

    const result = await finishOpenFromView(papi, Promise.resolve(EDITOR_ID), {
      projectId: 'P1',
      webViewIdToClose: HOME_ID,
      reveal,
    });

    expect(result).toBe(EDITOR_ID);
    expect(reveal).toHaveBeenCalledTimes(1);
    expect(mockRecordProjectOpened).not.toHaveBeenCalled();
  });

  it('answers with the editor even when recording the project fails', async () => {
    const { papi, reveal, mockWarn } = createMockPapi();
    vi.mocked(papi.dataProviders.get).mockRejectedValue(new Error('no recents provider'));

    const result = await finishOpenFromView(papi, Promise.resolve(EDITOR_ID), {
      projectId: 'P1',
      webViewIdToClose: HOME_ID,
      reveal,
    });

    expect(result).toBe(EDITOR_ID);
    expect(mockWarn).toHaveBeenCalledWith(expect.stringContaining('no recents provider'));
  });
});
