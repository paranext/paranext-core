import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * A deferred promise whose resolution/rejection is controlled externally, so each test can decide
 * exactly when a space load settles relative to the timeouts.
 */
type Deferred = {
  promise: Promise<unknown>;
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
};

function createDeferred(): Deferred {
  // Starts empty; the Promise executor below fills in resolve/reject synchronously.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const deferred = {} as Deferred;
  deferred.promise = new Promise<unknown>((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
}

/** One deferred per call to the space loader, in call order */
const loads: Deferred[] = [];
const mockLoadSpace = vi.fn(() => {
  const load = createDeferred();
  loads.push(load);
  return load.promise;
});

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

vi.mock('@renderer/services/usersnap-space-loader.util', () => ({
  loadUsersnapSpace: () => mockLoadSpace(),
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

function resetLoads(): void {
  loads.length = 0;
}

/** Lets pending promise callbacks run */
async function flushPromises(): Promise<void> {
  await vi.advanceTimersByTimeAsync(0);
}

describe('initializeUsersnapApi load/init timeout/race logic', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
    resetLoads();
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

    loads[0].resolve(spaceApi);
    await initPromise;

    expect(spaceApi.init).toHaveBeenCalledTimes(1);
    expect(spaceApi.init).toHaveBeenCalledWith(
      expect.objectContaining({ nativeScreenshot: true, collectGeoLocation: 'none' }),
    );
    expect(spaceApi.destroy).not.toHaveBeenCalled();
  });

  it('resolves after the timeout: startup unblocked, and the late space is kept for the forms', async () => {
    const { initializeUsersnapApi, openUsersnapForm, USERSNAP_INIT_TIMEOUT_MS } =
      await importService();
    const { logger } = await import('@shared/services/logger.service');
    const spaceApi = createMockSpaceApi();
    const widgetApi = { open: vi.fn(), close: vi.fn() };
    spaceApi.show.mockResolvedValue(widgetApi);

    const initPromise = initializeUsersnapApi();
    await vi.advanceTimersByTimeAsync(USERSNAP_INIT_TIMEOUT_MS);
    await expect(initPromise).resolves.toBeUndefined();
    expect(logger.info).toHaveBeenCalledWith(
      `Usersnap is still loading after ${USERSNAP_INIT_TIMEOUT_MS}ms; startup carries on, and the feedback forms work once it finishes`,
    );

    loads[0].resolve(spaceApi);
    await flushPromises();
    await openUsersnapForm('test-report-issue-key');

    expect(spaceApi.destroy).not.toHaveBeenCalled();
    expect(mockLoadSpace).toHaveBeenCalledTimes(1);
    expect(spaceApi.show).toHaveBeenCalledWith('test-report-issue-key');
    expect(widgetApi.open).toHaveBeenCalledTimes(1);
  });

  it('rejects before the timeout: initialization resolves without throwing and logs why', async () => {
    const { initializeUsersnapApi } = await importService();
    const { logger } = await import('@shared/services/logger.service');
    const loadError = new Error('network down');

    const initPromise = initializeUsersnapApi();
    loads[0].reject(loadError);

    await expect(initPromise).resolves.toBeUndefined();
    expect(logger.warn).toHaveBeenCalledWith(
      'Usersnap load/init failed; opening a feedback form will try again. The main process logs the network error, if there was one:',
      loadError,
    );
  });

  it('rejects after the timeout: the late rejection is logged, not left unhandled', async () => {
    const { initializeUsersnapApi, USERSNAP_INIT_TIMEOUT_MS } = await importService();
    const { logger } = await import('@shared/services/logger.service');
    const loadError = new Error('network down');

    const initPromise = initializeUsersnapApi();
    await vi.advanceTimersByTimeAsync(USERSNAP_INIT_TIMEOUT_MS);
    await expect(initPromise).resolves.toBeUndefined();

    loads[0].reject(loadError);
    await flushPromises();

    expect(logger.warn).toHaveBeenCalledWith(
      'Usersnap load/init failed; opening a feedback form will try again. The main process logs the network error, if there was one:',
      loadError,
    );
  });

  it('init failing: the space that did not initialize is destroyed and not used', async () => {
    const { initializeUsersnapApi, openUsersnapForm } = await importService();
    const failedSpace = createMockSpaceApi();
    failedSpace.init = vi.fn().mockRejectedValue(new Error('init failed'));

    const initPromise = initializeUsersnapApi();
    loads[0].resolve(failedSpace);
    await initPromise;
    expect(failedSpace.destroy).toHaveBeenCalledTimes(1);

    const formPromise = openUsersnapForm('test-report-issue-key');
    await flushPromises();
    expect(mockLoadSpace).toHaveBeenCalledTimes(2);
    loads[1].resolve(createMockSpaceApi());
    await formPromise;
    expect(failedSpace.show).not.toHaveBeenCalled();
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
    loads[0].resolve(spaceApi);
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
    resetLoads();
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
    resetLoads();
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
    loads[0].resolve(spaceApi);
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

  describe('after startup could not load the space', () => {
    const REPORT_ISSUE_KEY = 'test-report-issue-key';
    const UNAVAILABLE_NOTIFICATION = {
      message: '%mainMenu_feedback_unavailable%',
      severity: 'warning',
    };

    /** Imports the service and runs a startup whose space load fails */
    async function importServiceAfterFailedStartup() {
      const service = await importService();
      const initPromise = service.initializeUsersnapApi();
      loads[0].reject(new Error('network down'));
      await initPromise;
      return service;
    }

    function createOpenableSpaceApi() {
      const spaceApi = createMockSpaceApi();
      const widgetApi = { open: vi.fn(), close: vi.fn() };
      spaceApi.show.mockResolvedValue(widgetApi);
      return { spaceApi, widgetApi };
    }

    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('loads the space again and opens the form', async () => {
      const { openUsersnapForm } = await importServiceAfterFailedStartup();
      const { notificationService } = await import('@shared/services/notification.service');
      const { spaceApi, widgetApi } = createOpenableSpaceApi();

      const formPromise = openUsersnapForm(REPORT_ISSUE_KEY);
      await flushPromises();
      expect(mockLoadSpace).toHaveBeenCalledTimes(2);
      loads[1].resolve(spaceApi);
      await formPromise;

      expect(spaceApi.init).toHaveBeenCalledTimes(1);
      expect(spaceApi.show).toHaveBeenCalledWith(REPORT_ISSUE_KEY);
      expect(widgetApi.open).toHaveBeenCalledTimes(1);
      expect(notificationService.send).not.toHaveBeenCalled();
    });

    it('tells the user the form is unavailable when loading fails again', async () => {
      const { openUsersnapForm } = await importServiceAfterFailedStartup();
      const { notificationService } = await import('@shared/services/notification.service');

      const formPromise = openUsersnapForm(REPORT_ISSUE_KEY);
      await flushPromises();
      loads[1].reject(new Error('network still down'));
      await formPromise;

      expect(notificationService.send).toHaveBeenCalledWith(UNAVAILABLE_NOTIFICATION);
    });

    it('tells the user the form is unavailable when loading takes too long, and uses the space once it arrives', async () => {
      const { openUsersnapForm, USERSNAP_OPEN_TIMEOUT_MS } =
        await importServiceAfterFailedStartup();
      const { notificationService } = await import('@shared/services/notification.service');
      const { spaceApi, widgetApi } = createOpenableSpaceApi();

      const formPromise = openUsersnapForm(REPORT_ISSUE_KEY);
      await vi.advanceTimersByTimeAsync(USERSNAP_OPEN_TIMEOUT_MS);
      await formPromise;
      expect(notificationService.send).toHaveBeenCalledWith(UNAVAILABLE_NOTIFICATION);
      expect(spaceApi.show).not.toHaveBeenCalled();

      loads[1].resolve(spaceApi);
      await flushPromises();
      await openUsersnapForm(REPORT_ISSUE_KEY);

      expect(mockLoadSpace).toHaveBeenCalledTimes(2);
      expect(widgetApi.open).toHaveBeenCalledTimes(1);
    });

    it('shares one load between requests made while it runs', async () => {
      const { openUsersnapForm } = await importServiceAfterFailedStartup();
      const { spaceApi, widgetApi } = createOpenableSpaceApi();

      const firstRequest = openUsersnapForm(REPORT_ISSUE_KEY);
      const secondRequest = openUsersnapForm('test-submit-idea-key');
      await flushPromises();
      expect(mockLoadSpace).toHaveBeenCalledTimes(2);
      loads[1].resolve(spaceApi);
      await Promise.all([firstRequest, secondRequest]);

      expect(spaceApi.init).toHaveBeenCalledTimes(1);
      expect(widgetApi.open).toHaveBeenCalledTimes(2);
    });
  });

  it('while startup is still loading the space: waits for that load instead of starting another', async () => {
    vi.useFakeTimers();
    try {
      const { initializeUsersnapApi, openUsersnapForm, USERSNAP_INIT_TIMEOUT_MS } =
        await importService();
      const spaceApi = createMockSpaceApi();
      const widgetApi = { open: vi.fn(), close: vi.fn() };
      spaceApi.show.mockResolvedValue(widgetApi);
      const initPromise = initializeUsersnapApi();
      await vi.advanceTimersByTimeAsync(USERSNAP_INIT_TIMEOUT_MS);
      await initPromise;

      const formPromise = openUsersnapForm('test-report-issue-key');
      await flushPromises();
      loads[0].resolve(spaceApi);
      await formPromise;

      expect(mockLoadSpace).toHaveBeenCalledTimes(1);
      expect(widgetApi.open).toHaveBeenCalledTimes(1);
    } finally {
      vi.useRealTimers();
    }
  });
});
