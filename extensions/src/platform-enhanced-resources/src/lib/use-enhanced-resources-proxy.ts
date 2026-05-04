import { useEffect, useState } from 'react';
import papi, { logger } from '@papi/frontend';
import type {
  ArticleDataDto,
  ArticleInputDto,
  DictionaryEntryDataDto,
  DictionaryEntryInputDto,
  DictionaryLoadInputDto,
  DictionaryLoadResultDto,
  EncyclopediaLoadInputDto,
  EncyclopediaLoadResultDto,
  LoadMarbleChapterXmlInput,
  MediaLoadInputDto,
  MediaLoadResultDto,
} from './enhanced-resources-dto';

// Re-export the DTO catalog so existing wiring-layer imports
// (`import { ... } from '../lib/use-enhanced-resources-proxy'`) continue to resolve. The DTO
// definitions themselves live in `./enhanced-resources-dto` so this module stays focused on the
// proxy contract and resolution hook.
export type {
  ArticleAbbreviationDto,
  ArticleCrossRefDto,
  ArticleDataDto,
  ArticleInputDto,
  ArticleParagraphDto,
  ArticleVerseLinkDto,
  DictionaryDisplayItemDto,
  DictionaryEntryDataDto,
  DictionaryEntryInputDto,
  DictionaryLoadInputDto,
  DictionaryLoadResultDto,
  EncyclopediaDisplayItemDto,
  EncyclopediaEntryRefDto,
  EncyclopediaLoadInputDto,
  EncyclopediaLoadResultDto,
  LoadMarbleChapterXmlInput,
  MediaDisplayItemDto,
  MediaLoadInputDto,
  MediaLoadResultDto,
  VerseRefDto,
  WordFilterInputDto,
} from './enhanced-resources-dto';

/** Network-object id registered by the C# `EnhancedResourceFactory`. */
export const ER_NETWORK_OBJECT_ID = 'platform.enhancedResources';

/**
 * Subset of the network-object proxy we care about. `papi.networkObjects.get` returns the proxy
 * typed as a generic `NetworkObject<object>`; we narrow with a structural cast to the methods this
 * web view uses. All cross-process calls return promises.
 */
export type EnhancedResourcesNetworkObject = {
  loadMarbleChapterXml: (input: LoadMarbleChapterXmlInput) => Promise<string>;
  loadDictionary: (input: DictionaryLoadInputDto) => Promise<DictionaryLoadResultDto>;
  readDictionaryEntry: (input: DictionaryEntryInputDto) => Promise<DictionaryEntryDataDto>;
  loadEncyclopedia: (input: EncyclopediaLoadInputDto) => Promise<EncyclopediaLoadResultDto>;
  readArticle: (input: ArticleInputDto) => Promise<ArticleDataDto>;
  /**
   * Backend method registered as `"loadMedia"` (NOT `"loadMediaResources"`) in
   * `EnhancedResourceFactory.BuildFunctionList`. The factory routes to
   * `MediaService.LoadResources(input)` which applies the SBA filter server-side per `tabType`.
   */
  loadMedia: (input: MediaLoadInputDto) => Promise<MediaLoadResultDto>;
};

/**
 * Resolves the Enhanced Resources network-object proxy once per consumer and caches it across
 * renders. Replaces the per-effect `await papi.networkObjects.get<...>(ER_NETWORK_OBJECT_ID)`
 * pattern that previously fired 8 separate proxy lookups every time any tab effect fan-out
 * triggered.
 *
 * Returns `undefined` while pending, after a rejection, or until the backend registers the network
 * object. Consumers should `if (!proxy) return` inside their effects (mirroring the existing
 * per-call guard).
 *
 * Cold-start race handling: `papi.networkObjects.get` returns `undefined` immediately when the
 * target network object is not yet registered (it does not wait). At app startup the renderer can
 * mount this hook from saved web-view state before the C# data provider has registered the ER
 * network object, so the first `get` returns `undefined`. To recover, when the initial `get`
 * resolves to `undefined` the hook subscribes to `papi.networkObjects.onDidCreateNetworkObject` and
 * re-attempts resolution on creation events whose `id` matches `ER_NETWORK_OBJECT_ID`. The
 * subscription is removed once a re-attempt succeeds, and on unmount.
 *
 * Known limitation: if the backend is unregistered or restarted after the first successful
 * resolution, the hook keeps returning the stale proxy reference until the web view remounts.
 * Revisit if/when ER needs hot-restart resilience.
 */
export function useEnhancedResourcesProxy(): EnhancedResourcesNetworkObject | undefined {
  const [proxy, setProxy] = useState<EnhancedResourcesNetworkObject | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    let unsubscribe: (() => void) | undefined;

    const tryResolve = async (): Promise<boolean> => {
      try {
        const resolved =
          await papi.networkObjects.get<EnhancedResourcesNetworkObject>(ER_NETWORK_OBJECT_ID);
        if (cancelled) return false;
        if (resolved) {
          setProxy(resolved);
          return true;
        }
        return false;
      } catch (err) {
        if (!cancelled) {
          logger.warn(
            `useEnhancedResourcesProxy: failed to resolve ${ER_NETWORK_OBJECT_ID}: ${
              err instanceof Error ? err.message : String(err)
            }`,
          );
        }
        return false;
      }
    };

    (async () => {
      const resolved = await tryResolve();
      if (resolved || cancelled) return;

      // Initial get returned undefined (cold-start race) - subscribe and retry on creation.
      unsubscribe = papi.networkObjects.onDidCreateNetworkObject((details) => {
        if (cancelled) return;
        if (details.id !== ER_NETWORK_OBJECT_ID) return;
        // Don't await inside the listener; fire-and-forget the re-resolve.
        tryResolve().then((ok) => {
          if (ok && unsubscribe) {
            unsubscribe();
            unsubscribe = undefined;
          }
        });
      });
    })();

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, []);

  return proxy;
}
