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
 * Uses `papi.networkObjectStatus.waitForNetworkObject` to handle the cold-start race: at app
 * startup the renderer can mount the ER webview from saved state before the C# data provider has
 * registered the network object. `waitForNetworkObject` subscribes to creation events FIRST, then
 * checks the current snapshot, so it never misses a registration that happens between subscription
 * and check (a race that bare `get` + `onDidCreateNetworkObject` would lose).
 *
 * Returns `undefined` until the network object exists and `get` returns its proxy.
 *
 * Known limitation: does not handle backend hot-restart after first successful resolution. If the
 * C# data provider is unregistered after this hook resolves, the cached proxy goes stale until the
 * webview remounts. Acceptable for the UI Performance Fix scope.
 */
export function useEnhancedResourcesProxy(): EnhancedResourcesNetworkObject | undefined {
  const [proxy, setProxy] = useState<EnhancedResourcesNetworkObject | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        // Race-free: subscribe-then-check inside waitForNetworkObject.
        await papi.networkObjectStatus.waitForNetworkObject({ id: ER_NETWORK_OBJECT_ID });
        if (cancelled) return;
        const resolved =
          await papi.networkObjects.get<EnhancedResourcesNetworkObject>(ER_NETWORK_OBJECT_ID);
        if (!cancelled && resolved) {
          setProxy(resolved);
        }
      } catch (err) {
        if (!cancelled) {
          logger.warn(
            `useEnhancedResourcesProxy: failed to resolve ${ER_NETWORK_OBJECT_ID}: ${
              err instanceof Error ? err.message : String(err)
            }`,
          );
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return proxy;
}
