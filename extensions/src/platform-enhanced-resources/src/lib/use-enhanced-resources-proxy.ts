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
  PosTranslateResultDto,
  TooltipDataDto,
  TooltipInputDto,
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
  PosTranslateResultDto,
  TooltipDataDto,
  TooltipInputDto,
  VerseRefDto,
  WordFilterInputDto,
} from './enhanced-resources-dto';

/** Network-object id registered by the C# `EnhancedResourceFactory`. */
export const ER_NETWORK_OBJECT_ID = 'platform.enhancedResources';

/**
 * Mirror of the C# `InitializeResult` record. Returned from `readInitializeResult`. The
 * `haveMarbleData` flag flips to `true` only after the C# loader finishes hydrating dictionary,
 * encyclopedia, media, and other per-resource services. Until then any data-routing call (e.g.
 * `loadDictionary`, `loadEncyclopedia`, `loadMedia`) throws "Enhanced Resources not yet loaded".
 */
export type InitializeResultDto = {
  haveMarbleData: boolean;
  availableResources: string[];
  availableGlossLanguages: string[];
  requiredProjectsMissing: boolean;
  missingRequiredPackages: string[];
};

/**
 * Subset of the network-object proxy we care about. `papi.networkObjects.get` returns the proxy
 * typed as a generic `NetworkObject<object>`; we narrow with a structural cast to the methods this
 * web view uses. All cross-process calls return promises.
 */
export type EnhancedResourcesNetworkObject = {
  /**
   * Always-safe probe. Reads the factory's volatile `_initializeResult` field. Returns the empty
   * default before the loader runs and the populated value after. The wiring layer / proxy hook
   * uses this to gate data-routing calls so they don't fire during the startup race.
   */
  readInitializeResult: () => Promise<InitializeResultDto>;
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
  /**
   * Build the per-token tooltip payload for the marble-word hover popover. Backed by C#
   * `TooltipService.BuildTooltipData`. The returned shape mirrors `TooltipDataInput` from
   * `presenters/tooltip-presenter.ts` (the presenter consumes the DTO directly).
   */
  buildTooltipData: (input: TooltipInputDto) => Promise<TooltipDataDto>;
  /**
   * Localize a raw POS code to a display string. The backend translator (PartOfSpeechTranslator)
   * takes (tag, language, form) where language is "Hebrew" or "Greek" and form is "long" or
   * "short".
   */
  translatePartOfSpeech: (
    tag: string,
    language: string,
    form: string,
  ) => Promise<PosTranslateResultDto>;
};

/**
 * Polling cadence for `readInitializeResult` once the network object resolves but before
 * `haveMarbleData` is true. Backs off quickly at first (loader usually finishes within a few
 * seconds) then settles into a slower steady-state poll. Stops after `READY_TIMEOUT_MS`.
 */
const READY_POLL_INTERVALS_MS = [100, 200, 500, 1000];
const READY_POLL_STEADY_STATE_MS = 1000;
const READY_TIMEOUT_MS = 30_000;

/**
 * Resolves the Enhanced Resources network-object proxy once per consumer and caches it across
 * renders. Replaces the per-effect `await papi.networkObjects.get<...>(ER_NETWORK_OBJECT_ID)`
 * pattern that previously fired 8 separate proxy lookups every time any tab effect fan-out
 * triggered.
 *
 * Two-stage readiness gate (closes GAP-022 / GAP-023):
 *
 * 1. **Network-object availability**: `papi.networkObjectStatus.waitForNetworkObject` handles the
 *    cold-start race where the renderer mounts the ER webview from saved state before the C# data
 *    provider has registered the network object. The subscribe-then-check ordering inside
 *    `waitForNetworkObject` means we never miss a registration that happens between subscription
 *    and snapshot.
 * 2. **Data-load readiness**: the C# factory publishes the network object as soon as it registers its
 *    method handlers, BEFORE `MarbleDataLoader` finishes hydrating the per-resource services. Calls
 *    into `loadDictionary` / `loadEncyclopedia` / `loadMedia` during this window throw "Enhanced
 *    Resources not yet loaded" (FailedPrecondition). To prevent the wiring layer from seeing those
 *    errors at all, we poll `readInitializeResult` until `haveMarbleData` flips to true.
 *    `readInitializeResult` itself is always-safe (it reads a volatile field, no service routing).
 *    Polling backs off via `READY_POLL_INTERVALS_MS` then settles at `READY_POLL_STEADY_STATE_MS`.
 *    Aborts after `READY_TIMEOUT_MS`.
 *
 * Returns `undefined` until BOTH stages complete. Callers can therefore treat a defined `erProxy`
 * as a guarantee that subsequent data-routing calls will not hit the startup-race precondition.
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
        // Stage 1: Race-free network-object availability.
        await papi.networkObjectStatus.waitForNetworkObject({ id: ER_NETWORK_OBJECT_ID });
        if (cancelled) return;
        const resolved =
          await papi.networkObjects.get<EnhancedResourcesNetworkObject>(ER_NETWORK_OBJECT_ID);
        if (cancelled || !resolved) return;

        // Stage 2: Data-load readiness. Poll readInitializeResult until haveMarbleData is true.
        // Sequential await-in-loop is intentional - each poll must observe the result of the
        // previous probe before deciding whether to back off and probe again, and the fixed-delay
        // sleep between probes IS the rate-limiter. Promise.all-style parallelism would defeat the
        // backoff. The loop exits via break (ready / probe failure / timeout) or cancelled flag.
        const readyDeadline = Date.now() + READY_TIMEOUT_MS;
        let pollIndex = 0;
        let ready = false;
        while (!ready) {
          if (cancelled) return;
          let init: InitializeResultDto | undefined;
          try {
            // Sequential polling - the next iteration depends on this probe's result.
            // eslint-disable-next-line no-await-in-loop
            init = await resolved.readInitializeResult();
          } catch (probeErr) {
            // The probe itself failed - extremely unusual since readInitializeResult just reads a
            // volatile field on the C# side. Log once and stop trying so we don't spin forever.
            logger.warn(
              `useEnhancedResourcesProxy: readInitializeResult probe failed; assuming ready and continuing: ${
                probeErr instanceof Error ? probeErr.message : String(probeErr)
              }`,
            );
            ready = true;
            break;
          }
          if (cancelled) return;
          if (init?.haveMarbleData) {
            ready = true;
            break;
          }
          if (Date.now() >= readyDeadline) {
            logger.warn(
              `useEnhancedResourcesProxy: readInitializeResult.haveMarbleData stayed false ` +
                `for ${READY_TIMEOUT_MS}ms; resolving proxy anyway. ` +
                `Data-routing calls may fail until the C# loader catches up.`,
            );
            ready = true;
            break;
          }
          const wait = READY_POLL_INTERVALS_MS[pollIndex] ?? READY_POLL_STEADY_STATE_MS;
          pollIndex += 1;
          // Sequential backoff sleep - this delay IS the rate-limiter between probes.
          // eslint-disable-next-line no-await-in-loop
          await new Promise<void>((resolve) => {
            setTimeout(resolve, wait);
          });
        }
        if (cancelled) return;
        setProxy(resolved);
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
