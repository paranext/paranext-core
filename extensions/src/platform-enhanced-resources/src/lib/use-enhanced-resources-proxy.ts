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
 * Returns `undefined` while pending, after a rejection, or when the backend has not registered the
 * network object yet. Consumers should `if (!proxy) return` inside their effects (mirroring the
 * existing per-call guard).
 *
 * Known limitation: this hook does not subscribe to network-object lifecycle events. If the backend
 * is unregistered or restarted after the first successful resolution, the hook keeps returning the
 * stale proxy reference until the web view remounts. Likewise, if the first
 * `papi.networkObjects.get` call rejects, the hook does not retry - `proxy` stays `undefined` for
 * the lifetime of the web view. Both behaviors are acceptable for the UI Performance Fix scope: the
 * prior per-effect pattern had an implicit retry loop via every BCV-driven effect re-run, but in
 * practice the rejection cases are operational fixtures (backend unavailable at first launch, or
 * persistent failure). Revisit if/when ER needs hot-restart resilience.
 */
export function useEnhancedResourcesProxy(): EnhancedResourcesNetworkObject | undefined {
  const [proxy, setProxy] = useState<EnhancedResourcesNetworkObject | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const resolved =
          await papi.networkObjects.get<EnhancedResourcesNetworkObject>(ER_NETWORK_OBJECT_ID);
        if (!cancelled && resolved) {
          setProxy(resolved);
        }
      } catch (err) {
        logger.warn(
          `useEnhancedResourcesProxy: failed to resolve ${ER_NETWORK_OBJECT_ID}: ${
            err instanceof Error ? err.message : String(err)
          }`,
        );
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return proxy;
}
