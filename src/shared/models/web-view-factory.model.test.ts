import { beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the model resolves against the stubs below
import { WebViewFactory } from '@shared/models/web-view-factory.model';
import type { SavedWebViewDefinition, WebViewDefinition } from '@shared/models/web-view.model';
import { webViewProviderService } from '@shared/services/web-view-provider.service';

vi.mock('@shared/services/web-view-provider.service', () => ({
  webViewProviderService: { registerWebViewController: vi.fn() },
}));
// The real `overrideDispose` layers the factory's bookkeeping onto the controller's own dispose,
// which is not what these tests are about — and importing it for real pulls the whole RPC stack in
vi.mock('@shared/services/network-object.service', () => ({ overrideDispose: vi.fn() }));
vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

/**
 * The minimal saved definition the factory reads: its id and the type it checks against its own.
 * The real definition carries far more, none of which this reaches.
 */
// eslint-disable-next-line no-type-assertion/no-type-assertion
const savedWebViewDefinition = {
  id: 'web-view-id',
  webViewType: 'platform.stuffWebView',
} as SavedWebViewDefinition;

/**
 * A factory whose controller creation this test can hold open, so a `dispose` can land while a
 * `getWebView` is in flight — the race the disposed check exists for.
 */
function makeFactoryWithHeldControllerCreation() {
  let releaseControllerCreation = () => {};
  const controllerCreationReleased = new Promise<void>((resolve) => {
    releaseControllerCreation = resolve;
  });
  let signalControllerCreationStarted = () => {};
  const controllerCreationStarted = new Promise<void>((resolve) => {
    signalControllerCreationStarted = resolve;
  });

  class TestWebViewFactory extends WebViewFactory<'platform.stuffWebView'> {
    async getWebViewDefinition(
      definitionToFillOut: SavedWebViewDefinition,
    ): Promise<WebViewDefinition | undefined> {
      // Only the id has to survive; the display properties the real definition carries are
      // irrelevant to the lifetime question under test
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return { ...definitionToFillOut, webViewType: this.webViewType, content: '' } as
        | WebViewDefinition
        | undefined;
    }

    async createWebViewController() {
      signalControllerCreationStarted();
      await controllerCreationReleased;
      // A stand-in controller: only its lifetime is under test, never its surface
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return { webViewType: this.webViewType } as never;
    }
  }

  return {
    factory: new TestWebViewFactory('platform.stuffWebView'),
    releaseControllerCreation,
    controllerCreationStarted,
  };
}

/** `getWebView` with the arguments the web view service passes it */
function getWebView(factory: WebViewFactory<'platform.stuffWebView'>) {
  return factory.getWebView(savedWebViewDefinition, {}, 'nonce');
}

describe('WebViewFactory — disposal while a web view controller is being created', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('declines the web view rather than serving one whose controller is already dead', async () => {
    // `dispose` cannot take the per-web-view locks, so a creation already in flight finishes after
    // it — onto a cleanup list that has already been drained, which tears the controller down on
    // arrival. Handing back a definition then opens a web view nothing can interact with.
    const controllerDispose = vi.fn(async () => true);
    vi.mocked(webViewProviderService.registerWebViewController).mockResolvedValue(
      // A minimal disposable standing in for the full registered controller network object
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      { dispose: controllerDispose } as never,
    );
    const { factory, releaseControllerCreation, controllerCreationStarted } =
      makeFactoryWithHeldControllerCreation();

    const pendingWebView = getWebView(factory);
    await controllerCreationStarted;
    await factory.dispose();
    releaseControllerCreation();

    await expect(pendingWebView).resolves.toBeUndefined();
    expect(controllerDispose).toHaveBeenCalledTimes(1);
  });

  test('serves the web view normally when the factory is still alive', async () => {
    vi.mocked(webViewProviderService.registerWebViewController).mockResolvedValue(
      // A minimal disposable standing in for the full registered controller network object
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      { dispose: vi.fn(async () => true) } as never,
    );
    const { factory, releaseControllerCreation } = makeFactoryWithHeldControllerCreation();
    releaseControllerCreation();

    const webViewDefinition = await getWebView(factory);

    expect(webViewDefinition?.id).toBe('web-view-id');
  });
});
