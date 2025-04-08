// #region shared with https://github.com/paranext/paranext-multi-extension-template/blob/main/webpack/web-view-resolve-webpack-plugin.ts

import { Resolver } from 'webpack';
import { getWebViewTempPath, webViewTempDir, webViewTsxRegex } from './webpack.util';

// Webpack resolve plugins are enhanced-resolve plugins, which use tapable under the hood.
// Unfortunately, most of this api is very scantly documented, so I pretty much went off of examples
// and trial-and-error. I added lots of documentation here so there is at least some documentation.
// enhanced-resolve https://github.com/webpack/enhanced-resolve
// tapable https://github.com/webpack/tapable
// enhanced-resolve plugin examples https://github.com/webpack/enhanced-resolve/blob/main/lib/ExtensionAliasPlugin.js
// DirectoryNamedWebpackPlugin https://github.com/shaketbaby/directory-named-webpack-plugin/blob/master/index.js
/** Webpack resolution plugin that redirects WebView imports to their compiled version */
export default class WebViewResolveWebpackPlugin {
  // I didn't find much on what the hooks are called, but maybe at least some of them are the keys
  // of KnownHooks: https://github.com/webpack/enhanced-resolve/blob/a998c7d218b7a9ec2461fc4fddd1ad5dd7687485/types.d.ts#L240
  // Also https://github.com/webpack/webpack/issues/6817#issuecomment-542448438 shows how to add
  // path alias functionality with this plugin syntax.
  // However, it seems the mystery of available hooks is not solved as DirectoryNamedWebpackPlugin
  // uses hook names that are not in KnownHooks.
  /** Tap into the enhanced-resolve "resolve" hook with our resolve logic. */
  readonly source = 'resolve';
  /** Feed into the enhanced-resolve "resolve" hook from our resolve logic */
  readonly target = 'resolve';

  /**
   * Function that applies this plugin to webpack resolving. Use the resolver to "tap into" webpack
   * resolving with our own logic
   *
   * @param resolver
   */
  apply(resolver: Resolver) {
    // Get the resolve hook for performing a new resolve for some reason.
    // Just following what is in examples - not sure why do this instead of using the same hook
    // in both places and why use `ensureHook` here and `getHook` below.
    const target = resolver.ensureHook(this.target);
    resolver
      // Get the resolve hook
      .getHook(this.source)
      // Add our plugin to the list of resolvers to run
      .tapAsync(
        // Internally note that this is our plugin
        'WebViewResolveWebpackPlugin',
        /**
         * The logic to add to webpack resolving so it will look in the temp dir for built code.
         *
         * @param request Information about the resolve request
         * @param resolveContext Information about the process the hook has taken to get here
         * @param callback Function to run to continue the resolution process
         *
         *   - Call with no parameters to continue resolving like this plugin did nothing
         *   - Call with first parameter null and second parameter a fully resolved `{ path,
         *       relativePath }` (including file extension) to conclude resolving at that file
         *   - Call with first parameter `string` or `Error` or something (not sure) to indicate error
         *   - Note: another option is to call `resolver.doResolve` to start the resolution process over
         *       with a new `path` and `relativePath` that do not need to be fully resolved. Just
         *       make sure that second call can't come into your hook again and cause another
         *       `resolver.doResolve`, or you will have an infinite loop. We pass this `callback`
         *       param into `resolver.doResolve`, and it calls it automatically
         *
         * @returns Seems it doesn't matter if or what you return. Just return to quit early
         */
        (request, resolveContext, callback) => {
          // If the request is somehow not defined (not sure how - just part of the type definition)
          // or already has the temp dir in the path (meaning we have already modified the path),
          // continue resolving without this plugin so we do not edit the request a second time
          if (
            // If somehow it isn't a request, do not edit it. Not sure when this would happen
            !request.request ||
            request.request.includes(`/${webViewTempDir}/`)
          )
            // Continue resolving without changing anything with this plugin
            return callback();

          // Get the <file>?stuff aka the resource query on the request path (includes the ?)
          let resourceQuery = request.query;
          let requestPath = request.request;
          // request.query sometimes doesn't have the ?stuff in it for some reason, so get it
          // manually from the request path if it isn't already in request.query
          if (!request.query) {
            const queryInd = requestPath.lastIndexOf('?');
            // If there is a ? and something after it in the request path, use that as the resource
            // query
            if (queryInd >= 0 && queryInd < requestPath.length - 1) {
              resourceQuery = requestPath.substring(queryInd);
              requestPath = requestPath.substring(0, queryInd);
            }
          }

          // If it isn't calling for a webView, continue resolving without changing anything here
          if (!webViewTsxRegex.test(requestPath)) return callback();

          // Get the path to the relevant file in the temp dir
          // Note: this path must keep the ./ at the start, or webpack won't resolve it correctly
          let tempViewPath = getWebViewTempPath(requestPath, resolver.join);
          // Add the query back onto the request path if it was originally there
          if (!request.query) tempViewPath += resourceQuery;

          // Resolve this file but in the temp dir
          resolver.doResolve(
            target,
            {
              ...request,
              request: tempViewPath,
            },
            `Added temp dir to resolve request path: ${tempViewPath}`,
            resolveContext,
            callback,
          );
          return undefined;
        },
      );
  }
}

// #endregion
