import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * A deferred promise whose resolution/rejection is controlled externally, so each test can decide
 * exactly when `loadSpace` settles relative to the AsyncVariable timeout.
 */
type Deferred = {
  promise: Promise<unknown>;
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
};

// `loadSpace` mock; reassigned per test to a fresh deferred.
let loadSpaceDeferred: Deferred;
const mockLoadSpace = vi.fn(() => loadSpaceDeferred.promise);

vi.mock('@shared/services/app.service', () => ({
  appService: { getAppInfo: vi.fn().mockResolvedValue({ name: 'test' }) },
}));

vi.mock('@shared/services/command.service', () => ({
  sendCommand: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), error: vi.fn(), info: vi.fn(), warn: vi.fn() },
}));

vi.mock('@shared/services/notification.service', () => ({
  notificationService: { send: vi.fn() },
}));

vi.mock('@usersnap/browser', () => ({
  loadSpace: () => mockLoadSpace(),
}));

/** Builds a mock SpaceApi with spy-able methods. */
function createMockSpaceApi() {
  return {
    destroy: vi.fn().mockResolvedValue(undefined),
    hide: vi.fn(),
    init: vi.fn().mockResolvedValue(undefined),
    logEvent: vi.fn(),
    on: vi.fn(),
    show: vi.fn(),
  };
}

/**
 * Mocks the build-time Usersnap space key for the next `importService()`. Core ships it empty; a
 * product built on core sets it, so most cases here run with a non-empty key.
 */
function mockSpaceApiKey(spaceApiKey: string): void {
  vi.doMock('@shared/data/platform.data', async (importOriginal) => ({
    ...(await importOriginal<typeof import('@shared/data/platform.data')>()),
    USERSNAP_SPACE_API_KEY: spaceApiKey,
  }));
}

async function importService() {
  vi.resetModules();
  return import('@renderer/services/usersnap.service');
}

function resetLoadSpaceDeferred(): void {
  // Starts empty; the Promise executor below fills in resolve/reject synchronously.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  loadSpaceDeferred = {} as Deferred;
  loadSpaceDeferred.promise = new Promise<unknown>((resolve, reject) => {
    loadSpaceDeferred.resolve = resolve;
    loadSpaceDeferred.reject = reject;
  });
}

describe('initializeUsersnapApi load/init timeout/race logic', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    resetLoadSpaceDeferred();
    mockSpaceApiKey('test-space-key');
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.doUnmock('@shared/data/platform.data');
  });

  it('without a space key: resolves without loading the space or starting the timeout', async () => {
    mockSpaceApiKey('');
    const { initializeUsersnapApi } = await importService();
    const { logger } = await import('@shared/services/logger.service');

    await expect(initializeUsersnapApi()).resolves.toBeUndefined();

    expect(mockLoadSpace).not.toHaveBeenCalled();
    expect(vi.getTimerCount()).toBe(0);
    expect(logger.info).toHaveBeenCalledWith(
      'Usersnap is not configured (no space API key); feedback forms are unavailable',
    );
  });

  it('resolves before the timeout: api.init called, no destroy', async () => {
    const { initializeUsersnapApi } = await importService();
    const spaceApi = createMockSpaceApi();

    const initPromise = initializeUsersnapApi();

    loadSpaceDeferred.resolve(spaceApi);
    await initPromise;

    expect(spaceApi.init).toHaveBeenCalledTimes(1);
    expect(spaceApi.init).toHaveBeenCalledWith(
      expect.objectContaining({ nativeScreenshot: true, collectGeoLocation: 'none' }),
    );
    expect(spaceApi.destroy).not.toHaveBeenCalled();
  });

  it('resolves after the timeout: startup unblocked, late space destroyed', async () => {
    const { initializeUsersnapApi, USERSNAP_INIT_TIMEOUT_MS } = await importService();
    const spaceApi = createMockSpaceApi();

    const initPromise = initializeUsersnapApi();

    // Fire the timeout first; this rejects initVar.promise so startup settles via the outer catch
    // rather than waiting on the load.
    await vi.advanceTimersByTimeAsync(USERSNAP_INIT_TIMEOUT_MS);
    await expect(initPromise).resolves.toBeUndefined();

    // load + init completes late: the orphan is destroyed in the fire-and-forget IIFE, so wait for
    // that side effect. `vi.waitFor` polls on a timer, hence real timers.
    loadSpaceDeferred.resolve(spaceApi);
    vi.useRealTimers();
    await vi.waitFor(() => expect(spaceApi.destroy).toHaveBeenCalledTimes(1));
  });

  it('rejects before the timeout: initialization resolves without throwing', async () => {
    const { initializeUsersnapApi } = await importService();

    const initPromise = initializeUsersnapApi();

    loadSpaceDeferred.reject(new Error('network down'));

    // The rejection flows into the outer catch, so startup settles gracefully rather than throwing.
    await expect(initPromise).resolves.toBeUndefined();
  });

  it('rejects after the timeout: late rejection is swallowed, startup still resolves', async () => {
    const { initializeUsersnapApi, USERSNAP_INIT_TIMEOUT_MS } = await importService();
    const { logger } = await import('@shared/services/logger.service');

    const initPromise = initializeUsersnapApi();

    // Timeout fires first, so startup has already settled via the outer catch.
    await vi.advanceTimersByTimeAsync(USERSNAP_INIT_TIMEOUT_MS);
    await expect(initPromise).resolves.toBeUndefined();

    // loadSpace rejects late: the IIFE catch logs it at debug rather than letting it surface as an
    // unhandled rejection that could crash startup.
    loadSpaceDeferred.reject(new Error('network down'));
    vi.useRealTimers();
    await vi.waitFor(() =>
      expect(logger.debug).toHaveBeenCalledWith(
        'Usersnap load/init failed (or cleanup failed) after timeout:',
        expect.any(Error),
      ),
    );
  });

  it('destroy rejecting after the timeout is swallowed, startup still resolves', async () => {
    const { initializeUsersnapApi, USERSNAP_INIT_TIMEOUT_MS } = await importService();
    const { logger } = await import('@shared/services/logger.service');
    const spaceApi = createMockSpaceApi();
    // Cleanup of the late orphan itself fails.
    spaceApi.destroy = vi.fn().mockRejectedValue(new Error('destroy failed'));

    const initPromise = initializeUsersnapApi();

    await vi.advanceTimersByTimeAsync(USERSNAP_INIT_TIMEOUT_MS);
    await expect(initPromise).resolves.toBeUndefined();

    // load + init completes late; destroying the orphan throws, but the same IIFE catch keeps it
    // from becoming an unhandled rejection.
    loadSpaceDeferred.resolve(spaceApi);
    vi.useRealTimers();
    await vi.waitFor(() =>
      expect(logger.debug).toHaveBeenCalledWith(
        'Usersnap load/init failed (or cleanup failed) after timeout:',
        expect.any(Error),
      ),
    );
    expect(spaceApi.destroy).toHaveBeenCalledTimes(1);
  });
});

describe('close-button styling of the open form', () => {
  const REPORT_ISSUE_KEY = 'test-report-issue-key';
  const SUBMIT_IDEA_KEY = 'test-submit-idea-key';

  type FormEventHandler = (event?: { apiKey: string }) => void;

  /** Initializes the service and returns the handlers it registered for `open` and `close`. */
  async function initializeAndGetFormHandlers() {
    const { initializeUsersnapApi } = await importService();
    const spaceApi = createMockSpaceApi();
    const initPromise = initializeUsersnapApi();
    loadSpaceDeferred.resolve(spaceApi);
    await initPromise;

    const getHandler = (eventName: string): FormEventHandler => {
      const call = spaceApi.on.mock.calls.find(([name]) => name === eventName);
      if (!call) throw new Error(`No '${eventName}' handler registered`);
      return call[1];
    };
    return { open: getHandler('open'), close: getHandler('close'), spaceApi };
  }

  /**
   * Adds a `<us-widget>` whose shadow root holds the form's header buttons, as Usersnap renders it.
   * The idea form renders no annotation close button until the user starts a screenshot.
   */
  function addUsersnapWidget({ withAnnotationCloseButton = true } = {}): ShadowRoot {
    const widget = document.createElement('us-widget');
    const shadowRoot = widget.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <div class="header">
        <button aria-label="Collapse form">-</button>
        ${withAnnotationCloseButton ? '<button title="Close annotation">x</button>' : ''}
      </div>`;
    document.body.appendChild(widget);
    return shadowRoot;
  }

  /** Adds the annotation close button the widget renders when the user starts a screenshot. */
  function addAnnotationCloseButton(shadowRoot: ShadowRoot): HTMLButtonElement {
    const button = document.createElement('button');
    button.title = 'Close annotation';
    button.textContent = 'x';
    shadowRoot.appendChild(button);
    return button;
  }

  /** Lets pending MutationObserver callbacks, which are delivered as microtasks, run. */
  async function flushMutationObservers(): Promise<void> {
    await vi.advanceTimersByTimeAsync(0);
  }

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    resetLoadSpaceDeferred();
    vi.doMock('@shared/data/platform.data', async (importOriginal) => ({
      ...(await importOriginal<typeof import('@shared/data/platform.data')>()),
      USERSNAP_SPACE_API_KEY: 'test-space-key',
      USERSNAP_PROJECT_REPORT_ISSUE_API_KEY: REPORT_ISSUE_KEY,
      USERSNAP_PROJECT_SUBMIT_IDEA_API_KEY: SUBMIT_IDEA_KEY,
    }));
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.useRealTimers();
    vi.doUnmock('@shared/data/platform.data');
  });

  it('report form: replaces the annotation close button with a close button after collapse', async () => {
    const { open, close } = await initializeAndGetFormHandlers();
    // The widget and its shadow root exist before the form opens, so nothing new is added on open.
    const shadowRoot = addUsersnapWidget();

    open({ apiKey: REPORT_ISSUE_KEY });
    await vi.advanceTimersByTimeAsync(200);

    expect(shadowRoot.querySelector('button[title="Close annotation"]')).toBeNull();
    const collapseButton = shadowRoot.querySelector('button[aria-label="Collapse form"]');
    const newCloseButton = shadowRoot.querySelector('button[aria-label="Close feedback form"]');
    expect(newCloseButton).not.toBeNull();
    expect(collapseButton?.nextElementSibling).toBe(newCloseButton);
    expect(vi.getTimerCount()).toBe(0);

    close();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('idea form: moves the annotation close button to the bottom of the form', async () => {
    const { open } = await initializeAndGetFormHandlers();
    const shadowRoot = addUsersnapWidget();

    open({ apiKey: SUBMIT_IDEA_KEY });
    await vi.advanceTimersByTimeAsync(200);

    const closeButton = shadowRoot.querySelector<HTMLButtonElement>(
      'button[title="Close annotation"]',
    );
    expect(closeButton).not.toBeNull();
    // `top: unset` is not asserted: jsdom's style parser drops the `unset` keyword.
    expect(closeButton?.style.right).toBe('22ch');
    expect(closeButton?.style.height).toBe('54px');
    expect(closeButton?.style.bottom).toBe('0px');
    expect(shadowRoot.querySelector('button[aria-label="Close feedback form"]')).toBeNull();
  });

  it('idea form: styles an annotation close button that appears after the form opened', async () => {
    const { open } = await initializeAndGetFormHandlers();
    const shadowRoot = addUsersnapWidget({ withAnnotationCloseButton: false });

    open({ apiKey: SUBMIT_IDEA_KEY });
    // The user may take any amount of time before starting a screenshot.
    await vi.advanceTimersByTimeAsync(15_000);

    const closeButton = addAnnotationCloseButton(shadowRoot);
    await flushMutationObservers();

    expect(closeButton.style.right).toBe('22ch');
    expect(closeButton.style.bottom).toBe('0px');
    expect(closeButton.style.height).toBe('54px');
  });

  it('idea form: leaves an annotation close button alone once the form has closed', async () => {
    const { open, close } = await initializeAndGetFormHandlers();
    const shadowRoot = addUsersnapWidget({ withAnnotationCloseButton: false });
    const disconnectSpy = vi.spyOn(MutationObserver.prototype, 'disconnect');

    open({ apiKey: SUBMIT_IDEA_KEY });
    await vi.advanceTimersByTimeAsync(200);
    close();

    const closeButton = addAnnotationCloseButton(shadowRoot);
    await flushMutationObservers();

    expect(closeButton.style.right).toBe('');
    expect(closeButton.style.bottom).toBe('');
    expect(closeButton.style.height).toBe('');
    // Styling after close is also ruled out by the cleared form key, so check the observer itself
    // stops too rather than living on for the rest of the session.
    const disconnectCallCount = disconnectSpy.mock.calls.length;
    disconnectSpy.mockRestore();
    expect(disconnectCallCount).toBe(1);
  });

  it('report form: the added close button closes the open form', async () => {
    const { open, spaceApi } = await initializeAndGetFormHandlers();
    const widgetApi = { open: vi.fn(), close: vi.fn() };
    spaceApi.show.mockResolvedValue(widgetApi);
    const shadowRoot = addUsersnapWidget();

    open({ apiKey: REPORT_ISSUE_KEY });
    await vi.advanceTimersByTimeAsync(200);
    shadowRoot
      .querySelector<HTMLButtonElement>('button[aria-label="Close feedback form"]')
      ?.dispatchEvent(new MouseEvent('click'));
    await vi.advanceTimersByTimeAsync(0);

    expect(spaceApi.show).toHaveBeenCalledWith(REPORT_ISSUE_KEY);
    expect(widgetApi.close).toHaveBeenCalledTimes(1);
  });

  it('report form: adds only one close button when the widget re-renders after styling', async () => {
    const { open } = await initializeAndGetFormHandlers();
    const shadowRoot = addUsersnapWidget();

    open({ apiKey: REPORT_ISSUE_KEY });
    await vi.advanceTimersByTimeAsync(200);
    expect(shadowRoot.querySelectorAll('button[aria-label="Close feedback form"]')).toHaveLength(1);

    shadowRoot.appendChild(document.createElement('div'));
    await flushMutationObservers();
    shadowRoot.appendChild(document.createElement('div'));
    await flushMutationObservers();

    expect(shadowRoot.querySelectorAll('button[aria-label="Close feedback form"]')).toHaveLength(1);
  });

  it('report form: removes an annotation close button the widget renders later', async () => {
    const { open } = await initializeAndGetFormHandlers();
    const shadowRoot = addUsersnapWidget();

    open({ apiKey: REPORT_ISSUE_KEY });
    await vi.advanceTimersByTimeAsync(200);

    addAnnotationCloseButton(shadowRoot);
    await flushMutationObservers();

    expect(shadowRoot.querySelector('button[title="Close annotation"]')).toBeNull();
    expect(shadowRoot.querySelectorAll('button[aria-label="Close feedback form"]')).toHaveLength(1);
  });

  it('keeps polling until the widget appears', async () => {
    const { open } = await initializeAndGetFormHandlers();

    open({ apiKey: REPORT_ISSUE_KEY });
    await vi.advanceTimersByTimeAsync(1000);
    expect(vi.getTimerCount()).toBe(1);

    const shadowRoot = addUsersnapWidget();
    await vi.advanceTimersByTimeAsync(200);

    expect(shadowRoot.querySelector('button[title="Close annotation"]')).toBeNull();
    expect(shadowRoot.querySelector('button[aria-label="Close feedback form"]')).not.toBeNull();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('stops polling on close before the widget appears', async () => {
    const { open, close } = await initializeAndGetFormHandlers();

    open({ apiKey: REPORT_ISSUE_KEY });
    await vi.advanceTimersByTimeAsync(300);
    expect(vi.getTimerCount()).toBe(1);

    close();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('gives up polling after 10 seconds when the widget never appears', async () => {
    const { open } = await initializeAndGetFormHandlers();
    const { logger } = await import('@shared/services/logger.service');

    open({ apiKey: REPORT_ISSUE_KEY });
    await vi.advanceTimersByTimeAsync(10_000);

    expect(vi.getTimerCount()).toBe(0);
    expect(logger.warn).toHaveBeenCalledWith(
      'Timeout reached while waiting for the Usersnap widget to appear',
    );
  });
});

describe('openUsersnapForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetLoadSpaceDeferred();
    mockSpaceApiKey('test-space-key');
  });

  afterEach(() => {
    vi.doUnmock('@shared/data/platform.data');
  });

  it('without a project key: tells the user the forms are not configured instead of opening one', async () => {
    const { initializeUsersnapApi, openUsersnapForm } = await importService();
    const { notificationService } = await import('@shared/services/notification.service');
    const spaceApi = createMockSpaceApi();
    const initPromise = initializeUsersnapApi();
    loadSpaceDeferred.resolve(spaceApi);
    await initPromise;

    await openUsersnapForm('');

    expect(spaceApi.show).not.toHaveBeenCalled();
    expect(notificationService.send).toHaveBeenCalledWith({
      message: '%mainMenu_feedback_notConfigured%',
      severity: 'warning',
    });
  });

  it('without a space key: tells the user the forms are not configured', async () => {
    mockSpaceApiKey('');
    const { initializeUsersnapApi, openUsersnapForm } = await importService();
    const { notificationService } = await import('@shared/services/notification.service');
    await initializeUsersnapApi();

    await openUsersnapForm('test-report-issue-key');

    expect(mockLoadSpace).not.toHaveBeenCalled();
    expect(notificationService.send).toHaveBeenCalledWith({
      message: '%mainMenu_feedback_notConfigured%',
      severity: 'warning',
    });
  });
});
