// === NEW IN PT10 ===
// Reason: Electron custom protocol handler for papi-er:// URLs. Routes
// papi-er://images/{imageId}[?size=full] to the platform.enhancedResources
// .fetchImageBytes PAPI command and returns an HTTP Response with the
// decoded bytes. Modeled on extension-asset-protocol.service.ts.
// Spec Section 10.
import { protocol } from 'electron';
import { StatusCodes } from 'http-status-codes';
import { getErrorMessage } from 'platform-bible-utils';
import {
  ENHANCED_RESOURCE_PROTOCOL_NAME,
  EnhancedResourceImageSize,
  getMimeTypeForImageId,
  parseEnhancedResourceUri,
} from '@shared/utils/enhanced-resource.utils';
import * as networkService from '@shared/services/network.service';
import { logger } from '@shared/services/logger.service';

/** Shape returned by the platform.enhancedResources.fetchImageBytes PAPI command. */
type FetchImageBytesResult = {
  contentType: string;
  /** Base64-encoded bytes. */
  data: string;
};

/** Input shape for the platform.enhancedResources.fetchImageBytes PAPI command. */
type FetchImageBytesInput = {
  imageId: string;
  size: EnhancedResourceImageSize;
};

/** Function shape used to call the fetchImageBytes PAPI command. */
type FetchImageBytesInvoker = (
  input: FetchImageBytesInput,
) => Promise<FetchImageBytesResult | undefined>;

/** Create an HTTP error response to pass back to the renderer */
function errorResponse(url: string, httpErrorNumber: number): Response {
  return new Response(`Failed to load resource: ${url}`, {
    status: httpErrorNumber,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}

/**
 * Network-object request type for the C# `EnhancedResourceFactory.fetchImageBytes` method. The
 * factory registers `fetchImageBytes` on the `platform.enhancedResources` NetworkObject (see
 * `c-sharp/EnhancedResources/EnhancedResourceFactory.cs:168-173`), so the dispatch prefix is
 * `object:` (not `command:`). The renderer reaches this method via
 * `papi.networkObjects.get('platform.enhancedResources').fetchImageBytes(...)`; from the main
 * process we send the same JSON-RPC method name directly. Format matches
 * `getNetworkObjectRequestType` in `network-object.service.ts`.
 */
const FETCH_IMAGE_BYTES_REQUEST_TYPE = 'object:platform.enhancedResources.fetchImageBytes' as const;

/**
 * Default implementation of the fetchImageBytes invoker. Sends a JSON-RPC request to the
 * `platform.enhancedResources` NetworkObject's `fetchImageBytes` method registered by the C#
 * `EnhancedResourceFactory`. We use `networkService.request` (the same primitive that the renderer
 * proxy uses internally) instead of `commandService.sendCommand` because the handler is registered
 * as a network-object method, not a command - sending with the `command:` prefix produces a "No
 * handler found" error and the `<img>` tag renders as a broken placeholder.
 */
const defaultFetchImageBytesInvoker: FetchImageBytesInvoker = (input) =>
  networkService.request<[FetchImageBytesInput], FetchImageBytesResult | undefined>(
    FETCH_IMAGE_BYTES_REQUEST_TYPE,
    input,
  );

/** Currently-active invoker; swappable via `setFetchImageBytesInvokerForTest`. */
let activeFetchImageBytesInvoker: FetchImageBytesInvoker = defaultFetchImageBytesInvoker;

/**
 * Test seam: replaces the PAPI invoker with a fake implementation. Returns a function that restores
 * the previous invoker. Intended for unit tests only.
 */
export function setFetchImageBytesInvokerForTest(invoker: FetchImageBytesInvoker): () => void {
  const previous = activeFetchImageBytesInvoker;
  activeFetchImageBytesInvoker = invoker;
  return () => {
    activeFetchImageBytesInvoker = previous;
  };
}

/**
 * Handles a single papi-er:// request. Exported for unit testing; not called directly outside this
 * module's `protocol.handle` registration.
 */
export async function handleEnhancedResourceRequest(request: { url: string }): Promise<Response> {
  try {
    const parsed = parseEnhancedResourceUri(request.url);

    // pathType is narrowed to 'images' by the parser today; the switch keeps
    // adding 'audio' etc. as a localized future change.
    switch (parsed.pathType) {
      case 'images':
        return await handleImageRequest(parsed.imageId, parsed.size);
      default: {
        // Unreachable: parseEnhancedResourceUri throws for unknown pathTypes.
        // Kept for exhaustiveness so adding a new pathType causes a compile error.
        const exhaustive: never = parsed.pathType;
        logger.warn(
          `Enhanced Resources: unhandled pathType '${String(exhaustive)}' for ${request.url}`,
        );
        return errorResponse(request.url, StatusCodes.NOT_FOUND);
      }
    }
  } catch (e) {
    logger.warn(`Enhanced Resources: papi-er error for ${request.url}: ${getErrorMessage(e)}`);
    return errorResponse(request.url, StatusCodes.BAD_REQUEST);
  }
}

async function handleImageRequest(
  imageId: string,
  size: EnhancedResourceImageSize,
): Promise<Response> {
  const result = await activeFetchImageBytesInvoker({ imageId, size });
  if (!result) {
    return errorResponse(
      `papi-er://images/${imageId}${size === 'full' ? '?size=full' : ''}`,
      StatusCodes.NOT_FOUND,
    );
  }
  try {
    return new Response(Buffer.from(result.data, 'base64'), {
      status: StatusCodes.OK,
      headers: {
        'Content-Type': result.contentType || getMimeTypeForImageId(imageId),
      },
    });
  } catch (e) {
    logger.warn(
      `Enhanced Resources: error building response for image '${imageId}': ${getErrorMessage(e)}`,
    );
    return errorResponse(`papi-er://images/${imageId}`, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

/** Promise that resolves when this service is finished initializing */
let initializePromise: Promise<void> | undefined;

/** Register the protocol handler for Enhanced Resources binary assets. */
const initialize = (): Promise<void> => {
  if (initializePromise) return initializePromise;
  initializePromise = (async (): Promise<void> => {
    protocol.handle(ENHANCED_RESOURCE_PROTOCOL_NAME, handleEnhancedResourceRequest);
  })();
  return initializePromise;
};

/**
 * Initialize the Electron handler for papi-er:// URLs.
 *
 * URL forms supported:
 *
 *     papi-er://images/{imageId}             -> thumbnail (IMG_THMB search order)
 *     papi-er://images/{imageId}?size=full   -> full image (IMG_HD -> IMG_SD -> IMG_LD -> IMG_THMB)
 *
 * `imageId` is the opaque ID from `IMG_INDX` (e.g. `Dromedary`). Callers should not construct URLs
 * by hand - they come pre-built in `MediaDisplayItem.ImageSource` and `ThumbnailSource` from the C#
 * side.
 */
export const enhancedResourceProtocolService = {
  initialize,
};

export default enhancedResourceProtocolService;
