// === NEW IN PT10 ===
// Reason: URL parser and MIME-type lookup for the papi-er:// Electron custom
// protocol. Lives in src/shared so both the main-process handler and any future
// renderer-side URL builders can import from the same module. Spec Section 10.
import { startsWith, stringLength, substring } from 'platform-bible-utils';

/** Protocol scheme for Enhanced Resources binary assets. */
export const ENHANCED_RESOURCE_PROTOCOL_NAME = 'papi-er';

/** Image size variant requested by the renderer. */
export type EnhancedResourceImageSize = 'thumbnail' | 'full';

/**
 * Result of parsing a `papi-er://` URL. `pathType` localizes future extensions (e.g.
 * `papi-er://audio/...`) to their own branch of the handler without disturbing the image path.
 * Today the only `pathType` is `images`.
 */
export type EnhancedResourceUriInfo = {
  pathType: 'images';
  imageId: string;
  size: EnhancedResourceImageSize;
};

/**
 * Parses a papi-er:// URL into its components. Throws on malformed input so the handler's try/catch
 * can map to a 400 response.
 *
 * Valid forms:
 *
 *     papi-er://images/{imageId}              -> size=thumbnail (default)
 *     papi-er://images/{imageId}?size=full    -> size=full
 *
 * @param uri The URI to parse
 * @returns Parsed components: pathType, imageId, and size variant
 * @throws Error if the URI is malformed or uses an unsupported pathType / size
 */
export function parseEnhancedResourceUri(uri: string): EnhancedResourceUriInfo {
  if (!startsWith(uri, `${ENHANCED_RESOURCE_PROTOCOL_NAME}://`))
    throw new Error(
      `Invalid papi-er URI - needs to start with "${ENHANCED_RESOURCE_PROTOCOL_NAME}://"`,
    );

  const withoutScheme = substring(uri, stringLength(`${ENHANCED_RESOURCE_PROTOCOL_NAME}://`));

  const firstSlash = withoutScheme.indexOf('/');
  if (firstSlash <= 0)
    throw new Error(
      `Invalid papi-er URI - expected "${ENHANCED_RESOURCE_PROTOCOL_NAME}://{pathType}/{id}"`,
    );

  const pathType = withoutScheme.substring(0, firstSlash);
  const afterFirstSlash = withoutScheme.substring(firstSlash + 1);

  if (pathType !== 'images') {
    throw new Error(`Invalid papi-er URI - unsupported pathType '${pathType}'`);
  }

  const questionMark = afterFirstSlash.indexOf('?');
  const imageId = questionMark >= 0 ? afterFirstSlash.substring(0, questionMark) : afterFirstSlash;
  const query = questionMark >= 0 ? afterFirstSlash.substring(questionMark + 1) : '';

  if (!imageId) throw new Error(`Invalid papi-er URI - empty imageId in "${uri}"`);

  const size = parseSizeQuery(query);
  return { pathType: 'images', imageId, size };
}

function parseSizeQuery(query: string): EnhancedResourceImageSize {
  if (!query) return 'thumbnail';
  // Accept either `size=full` or `size=thumbnail`; anything else is invalid.
  const params = new URLSearchParams(query);
  // URLSearchParams.get returns string | null; the `?? ''` collapses both
  // missing-param and explicit empty-value paths to the default branch.
  const size = params.get('size') ?? '';
  if (size === '' || size === 'thumbnail') return 'thumbnail';
  if (size === 'full') return 'full';
  throw new Error(`Invalid papi-er URI - unknown size '${size}' (expected 'thumbnail' or 'full')`);
}

/**
 * Looks up the MIME type for a given imageId. Mirrors the lookup in
 * extension-asset-protocol.service.ts. Returns application/octet-stream if the extension is
 * unknown.
 */
const knownMimeTypes = {
  '.bmp': 'image/bmp',
  '.gif': 'image/gif',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
} as const;

/**
 * Looks up the MIME type for a given imageId based on its file extension. Returns
 * `application/octet-stream` if the extension is unknown.
 *
 * @param imageId The opaque image ID, possibly including an extension (e.g. `Dromedary.jpg`)
 * @returns The MIME type to use for the response's `Content-Type` header
 */
export function getMimeTypeForImageId(imageId: string): string {
  const dotIndex = imageId.lastIndexOf('.');
  if (dotIndex > 0) {
    const ext = imageId.substring(dotIndex).toLowerCase();
    // Assert key type confirmed in check.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    if (ext in knownMimeTypes) return knownMimeTypes[ext as keyof typeof knownMimeTypes];
  }
  return 'application/octet-stream';
}
