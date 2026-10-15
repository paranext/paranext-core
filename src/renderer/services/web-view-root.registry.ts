import type { RefObject } from 'react';
import type { RegisteredWebViewRoot } from '@shared/models/web-view.model';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage, type Unsubscriber } from 'platform-bible-utils';

/** One mounted `WebView` component that wants the roots its iframe's documents create */
type WebViewRootOwner = {
  iframeRef: RefObject<HTMLIFrameElement | null>;
  onRootRegistered: (root: RegisteredWebViewRoot) => void;
};

/**
 * Owners by web view id. A set per id because two components can briefly carry the same id (a tab
 * remounted by the dock while its predecessor is still unmounting), and a root belongs to only the
 * one whose iframe shows its document.
 */
const ownersByWebViewId = new Map<string, Set<WebViewRootOwner>>();

/** The document an iframe is showing now, or `undefined` if it has none or it is cross-origin */
function getShownDocument(iframe: HTMLIFrameElement | null): Document | undefined {
  try {
    return iframe?.contentDocument ?? undefined;
  } catch {
    return undefined;
  }
}

/**
 * Claims the roots that React web view bootstraps register for `webViewId` from the document shown
 * in the owner's iframe. Claim before the iframe's document can parse, so a bootstrap that
 * registers during parse already finds its owner.
 *
 * @param webViewId Id of the web view the owner renders
 * @param iframeRef Ref to the owner's iframe; a registered root goes to the owner whose iframe is
 *   showing the root's document
 * @param onRootRegistered Called with each root registered for the document in the owner's iframe
 * @returns Unsubscriber that releases the claim
 */
export function claimWebViewRoots(
  webViewId: string,
  iframeRef: RefObject<HTMLIFrameElement | null>,
  onRootRegistered: (root: RegisteredWebViewRoot) => void,
): Unsubscriber {
  const owner: WebViewRootOwner = { iframeRef, onRootRegistered };
  let owners = ownersByWebViewId.get(webViewId);
  if (!owners) {
    owners = new Set();
    ownersByWebViewId.set(webViewId, owners);
  }
  owners.add(owner);

  return () => {
    const currentOwners = ownersByWebViewId.get(webViewId);
    if (!currentOwners?.delete(owner)) return false;
    if (currentOwners.size === 0) ownersByWebViewId.delete(webViewId);
    return true;
  };
}

/**
 * Hands a root that a web view's bootstrap created to the owner whose iframe is showing the root's
 * document. A root no owner claims is logged at debug level and left alone: its web view is gone or
 * its document has already been replaced, and neither has anything to unmount it for.
 *
 * Assigned to `globalThis.registerWebViewRootById` for the bootstrap to call. The bootstrap sits in
 * the iframe's realm, so this never throws back into it.
 */
export function registerWebViewRoot(webViewId: string, root: RegisteredWebViewRoot): void {
  try {
    const owner = [...(ownersByWebViewId.get(webViewId) ?? [])].find(
      ({ iframeRef }) => getShownDocument(iframeRef.current) === root.document,
    );
    if (!owner) {
      logger.debug(
        `No WebView component shows the document that registered a React root for WebView ${webViewId}; leaving the root alone`,
      );
      return;
    }
    owner.onRootRegistered(root);
  } catch (error) {
    logger.warn(
      `Failed to register React root for WebView ${webViewId}: ${getErrorMessage(error)}`,
    );
  }
}
