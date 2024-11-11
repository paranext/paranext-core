/* eslint-disable import/prefer-default-export */
import { WebViewControllers, WebViewControllerTypes } from 'papi-shared-types';
import type { IWebViewProvider } from '@shared/models/web-view-provider.model';
import {
  SavedWebViewDefinition,
  GetWebViewOptions,
  WebViewDefinition,
} from '@shared/models/web-view.model';
import { MutexMap, UnsubscriberAsyncList } from 'platform-bible-utils';
import { DisposableNetworkObject } from '@shared/models/network-object.model';
import webViewProviderService from '@shared/services/web-view-provider.service';
import logger from '@shared/services/logger.service';
import { overrideDispose } from '@shared/services/network-object.service';

/**
 * JSDOC SOURCE WebViewFactory
 *
 * A partial implementation of {@link IWebViewProvider} that includes creating
 * {@link WebViewControllers} for each web view served by the web view provider. This class handles
 * registering, disposing, and making sure there is only one web view controller for each web view
 * for you.
 *
 * You can create a new class extending this abstract class to create a web view provider that
 * serves web views and web view controllers of a specific `webViewType` to facilitate interaction
 * between those web views and other extensions. You can register it with the PAPI using
 * `papi.webViewProviders.register`.
 *
 * If you want to change your existing `IWebViewProvider` from a plain object to extending this
 * class, you will need to change your object's existing method named `getWebView`
 * ({@link IWebViewProvider.getWebView}) to be named `getWebViewDefinition`
 * ({@link WebViewFactory.getWebViewDefinition}), which is a drop-in replacement. You likely do NOT
 * want to overwrite this class's `getWebView` because that will eliminate most of the benefits
 * associated with using this class.
 *
 * @see {@link IWebViewProvider} for more information on extending this class.
 */
export abstract class WebViewFactory<WebViewType extends WebViewControllerTypes>
  implements IWebViewProvider
{
  private readonly webViewControllersMutexMap = new MutexMap();
  private readonly webViewControllersCleanupList: UnsubscriberAsyncList;
  private readonly webViewControllersById = new Map<
    string,
    DisposableNetworkObject<WebViewControllers[WebViewType]>
  >();

  constructor(readonly webViewType: WebViewType) {
    this.webViewControllersCleanupList = new UnsubscriberAsyncList(
      `WebViewFactory for webViewType ${webViewType}`,
    );
  }

  /**
   * Receives a {@link SavedWebViewDefinition} and fills it out into a full {@link WebViewDefinition},
   * providing the contents of the web view and other properties that are important for displaying
   * the web view.
   *
   * WARNING: This method must NOT be overridden if you want any of the benefits of this class. You
   * are probably looking for {@link WebViewFactory.getWebViewDefinition}.
   *
   * If you are transferring a web view provider using a plain object to extending this class, you
   * should rename your existing `getWebView` to `getWebViewDefinition`.
   */
  async getWebView(
    savedWebViewDefinition: SavedWebViewDefinition,
    getWebViewOptions: GetWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    const webViewId = savedWebViewDefinition.id;
    // Don't allow simultaneous gets to run for the same web view id as an easy way to make sure we
    // don't create multiple of the same web view controller. Not really expecting this to happen,
    // but it's good to be sure.
    const lock = this.webViewControllersMutexMap.get(webViewId);
    return lock.runExclusive(async () => {
      if (this.webViewType !== savedWebViewDefinition.webViewType)
        throw new Error(
          `${this.webViewType} WebViewFactory received request to provide a ${savedWebViewDefinition.webViewType} web view`,
        );

      const webViewDefinition = await this.getWebViewDefinition(
        savedWebViewDefinition,
        getWebViewOptions,
      );

      // If the web view provider doesn't want to create a web view right now, don't create a web view
      // controller
      if (!webViewDefinition) return webViewDefinition;

      if (webViewDefinition.id !== webViewId)
        logger.warn(
          `${this.webViewType} WebViewFactory changed web view id from ${webViewId} to ${webViewDefinition.id} while in getWebViewDefinition. This is not expected and could cause problems. Attempting to continue with new id.`,
        );

      // If there is already a web view controller for this web view (so the web view is reloading),
      // return instead of creating a new web view controller
      const existingWebViewController = this.webViewControllersById.get(webViewDefinition.id);
      if (existingWebViewController) return webViewDefinition;

      // Create the web view controller (implementation-dependent)
      const unregisteredWebViewController = await this.createWebViewController(webViewDefinition);

      // Make sure the web view controller gets removed from this provider's map so we can create a
      // new one later if needed for some reason
      overrideDispose(unregisteredWebViewController, async () => {
        if (!this.webViewControllersById.delete(webViewDefinition.id))
          logger.warn(
            `${this.webViewType} web view controller with id ${webViewDefinition.id} was not found in its WebViewFactory in order to remove from the map. This could cause issues with not creating a new web view controller if needed. Attempting to continue.`,
          );
        return true;
      });

      // Register the web view controller
      const webViewController = await webViewProviderService.registerWebViewController(
        this.webViewType,
        webViewDefinition.id,
        unregisteredWebViewController,
      );

      this.webViewControllersCleanupList.add(webViewController);
      this.webViewControllersById.set(webViewDefinition.id, webViewController);

      return webViewDefinition;
    });
  }

  /** Disposes of all WVCs that were created by this provider */
  async dispose(): Promise<boolean> {
    return this.webViewControllersCleanupList.runAllUnsubscribers();
  }

  /**
   * Receives a {@link SavedWebViewDefinition} and fills it out into a full {@link WebViewDefinition},
   * providing the contents of the web view and other properties that are important for displaying
   * the web view.
   *
   * {@link WebViewFactory} calls this as part of its {@link getWebView}, which is called by the PAPI
   * as part of opening a new web view. It will also create a web view controller after running this
   * if applicable.
   *
   * See {@link IWebViewProvider.getWebView} for more information on how this method works.
   *
   * @param savedWebViewDefinition The saved web view information from which to build a complete web
   *   view definition. Filled out with all {@link SavedWebViewDefinition} properties of the existing
   *   web view if an existing webview is being called for (matched by ID). Just provides the
   *   minimal properties required on {@link SavedWebViewDefinition} if this is a new request or if
   *   the web view with the existing ID was not found.
   * @param getWebViewOptions Various options that affect what calling `papi.webViews.openWebView`
   *   should do. When options are passed to `papi.webViews.openWebView`, some defaults are set up
   *   on the options, then those options are passed directly through to this method. That way, if
   *   you want to adjust what this method does based on the contents of the options passed to
   *   `papi.WebViews.openWebView`, you can. You can even read other properties on these options if
   *   someone passes options with other properties to `papi.webViews.openWebView`.
   */
  abstract getWebViewDefinition(
    savedWebViewDefinition: SavedWebViewDefinition,
    getWebViewOptions: GetWebViewOptions,
  ): Promise<WebViewDefinition | undefined>;

  /**
   * Creates a {@link WebViewController} that corresponds to the {@link WebViewDefinition} provided.
   * {@link WebViewFactory} calls this as part of its {@link getWebView}. {@link WebViewFactory} will
   * automatically register this controller with the web view provider service
   * (`papi.webViewProviders.registerWebViewController`), run its `dispose` when the web view is
   * closed or this `WebViewFactory` is disposed, and make sure just one web view controller is
   * created for each web view.
   *
   * Alternatively, if you do not want to create web view controllers (or a controller for a
   * specific web view), feel free to return `undefined` from this method.
   *
   * @param webViewDefinition The definition for the web view for which to create a web view
   *   controller
   * @returns Web view controller for the web view with the `webViewDefinition` provided. Or
   *   `undefined` if you do not want to create a web view controller for this web view.
   */
  abstract createWebViewController(
    webViewDefinition: WebViewDefinition,
  ): Promise<WebViewControllers[WebViewType]>;
}
