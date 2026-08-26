import { beforeEach, describe, expect, test, vi } from 'vitest';
import { isPlatformError, serialize } from 'platform-bible-utils';
import { startDialogServiceShard } from './dialog.service-shard';
import { clearAllOverlays, getOverlays } from './overlays/overlay-store';
import { resetDebounceState } from './overlays/overlay.service-host';

// This file drives the REAL dialog service shard over the REAL overlay service host and overlay
// store. A modal dialog's promise is handed out by `showModalDialogOverlay` and lives nowhere else,
// so mocking either of them out would replace the very promise whose fate is under test with one
// the test itself controls.
const mocks = vi.hoisted(() => {
  const publishedShards: Record<string, unknown>[] = [];
  return {
    publishedShards,
    dialogs: {
      'platform.alert': {
        tabType: 'platform.alert',
        dialogRole: 'alertdialog',
        Component: vi.fn(),
      },
    },
  };
});

// Everything the dialog shard reaches that is not the overlay path. This window is not closing and
// has no layout load in flight — the two conditions a dialog is already refused for, and neither is
// what happens here: the dialog is shown, and only then does the window go away.
vi.mock('@renderer/services/web-view.service-shard', () => ({
  initialize: vi.fn(async () => {}),
  addTab: vi.fn(async () => undefined),
  closeTab: vi.fn(async () => true),
  throwIfWindowIsClosing: vi.fn(),
  waitForLayoutLoadToSettle: vi.fn(async () => {}),
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));
vi.mock('@shared/services/localization.service', () => ({
  localizationService: { getLocalizedStrings: vi.fn(async () => ({})) },
}));
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: {
    set: vi.fn(async (_name: string, objectToShare: Record<string, unknown>) => {
      mocks.publishedShards.push(objectToShare);
      return { dispose: vi.fn(async () => true) };
    }),
  },
}));
vi.mock('@renderer/components/dialogs/dialog-base.data', () => ({ hookUpDialogService: vi.fn() }));
vi.mock('@renderer/components/dialogs/about-dialog.component', () => ({
  ABOUT_DIALOG: { tabType: 'platform.about' },
}));
vi.mock('@renderer/components/dialogs/select-project.dialog', () => ({
  SELECT_PROJECT_DIALOG: { tabType: 'platform.selectProject' },
}));
vi.mock('@renderer/components/dialogs/index', () => ({
  DIALOGS: mocks.dialogs,
  default: mocks.dialogs,
}));

// The overlay host's own dependencies, which the modal path touches on its way to the store
vi.mock('@shared/services/command.service', () => ({
  registerCommand: vi.fn(async () => vi.fn()),
  sendCommand: vi.fn(async () => undefined),
}));
vi.mock('@shared/services/menu-data.service', () => ({
  menuDataService: { getWebViewMenu: vi.fn() },
}));
vi.mock('@shared/services/window.service', () => ({
  windowService: {
    getFocus: vi.fn(async () => undefined),
    setFocus: vi.fn(async () => {}),
    subscribeFocus: vi.fn(async () => vi.fn()),
  },
}));

/** The dialog type these tests open */
const ALERT_DIALOG_TYPE = 'platform.alert';

/** Narrow view of the published dialog shard covering only what these tests drive */
type DialogShard = {
  showDialog(dialogType: string, options?: Record<string, unknown>): Promise<unknown>;
};

/**
 * What a promise did, as a sentence — including having done nothing at all.
 *
 * A modal dialog whose window is destroyed without settling it never settles, and awaiting one
 * directly reports only this test's own timeout, which names neither the promise nor what was
 * expected of it. Racing it against a short timer turns that silence into an answer an assertion
 * can fail on by name.
 */
async function describeSettlement(promise: Promise<unknown>): Promise<string> {
  return Promise.race([
    promise.then(
      (value) => `resolved: ${serialize(value)}`,
      (reason: unknown) =>
        `rejected: ${isPlatformError(reason) ? reason.message : serialize(reason)}`,
    ),
    new Promise<string>((resolve) => {
      setTimeout(() => resolve('never settled'), 50);
    }),
  ]);
}

/**
 * The unload handler the shard registers, captured rather than dispatched for real: every test in
 * this file starts the shard against the one `window` they share, so a real `beforeunload` would
 * run every earlier test's handler too.
 */
let handleBeforeUnload: (() => Promise<void> | void) | undefined;

beforeEach(async () => {
  vi.clearAllMocks();
  mocks.publishedShards.length = 0;
  handleBeforeUnload = undefined;
  globalThis.windowId = 1;
  clearAllOverlays();
  resetDebounceState();
  vi.spyOn(window, 'addEventListener').mockImplementation((type, listener) => {
    // The listener is typed for every event name at once; the shard registers a plain handler
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    if (type === 'beforeunload') handleBeforeUnload = listener as () => Promise<void> | void;
  });
  await startDialogServiceShard();
});

describe('a modal dialog still on screen when this window unloads', () => {
  test('is settled, so its requestor is not left waiting on a window that no longer exists', async () => {
    // A modal is the one thing routed to this window that nothing else can settle. Its promise
    // lives in the overlay and never in `dialogRequests`, so the rejection that fails this window's
    // docked dialogs does not reach it; the router lifts the request timeout for `showDialog`, so
    // it never expires; and a modal is an overlay rather than a dock add, so the arrival record
    // that would have kept this window alive never counted it. Unload is the last moment anyone
    // can answer for it.
    const shard = mocks.publishedShards.find(
      (published) => typeof published.showDialog === 'function',
    );
    if (!shard) throw new Error('no published shard answers for showDialog');
    // The shard is read back off an untyped `networkObjectService.set`; its own type is checked
    // where it is declared
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const dialogShard = shard as unknown as DialogShard;

    const showing = dialogShard.showDialog(ALERT_DIALOG_TYPE, {
      prompt: 'Alert message',
      isModal: true,
    });
    // Marked handled from the start so the settlement below cannot be reported as an unhandled
    // rejection in the turn before the assertion attaches its own handler
    showing.catch(() => {});

    await vi.waitFor(() =>
      expect(getOverlays().filter((overlay) => overlay.type === 'modalDialog')).toHaveLength(1),
    );

    if (!handleBeforeUnload) throw new Error('the dialog shard registered no unload handler');
    await handleBeforeUnload();

    expect(await describeSettlement(showing)).toBe('rejected: DialogService is shutting down');
    // And the overlay is gone with it, so nothing is left holding a promise that has already been
    // answered
    expect(getOverlays()).toHaveLength(0);
  });
});
