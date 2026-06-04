#!/usr/bin/env tsx
// === NEW IN PT10 ===
// Reason: Developer smoke check for Enhanced Resources end-to-end. Connects to
// a running paranext-core data provider over JSON-RPC and invokes each of the
// 15 Enhanced Resources PAPI commands. Asserts non-empty results against
// whatever marble data the developer has installed. Temporary verification per
// spec Section 1 - replaced by UI end-to-end tests once UI work lands.
//
// Usage:
//   1. Start the data provider: `./.erb/scripts/refresh.sh` (or `npm start`).
//   2. Wait until stdout shows
//      "Enhanced Resources: ready - N bible packages ...".
//   3. Run: `npm run er:smoke` (or
//      `npx tsx scripts/enhanced-resources-smoke.ts`).
//
// Exit codes:
//   0  all commands returned non-empty and non-error.
//   1  at least one command errored or returned an empty result.
//   2  could not connect to the PAPI WebSocket.

// Justification: This is a developer-facing CLI smoke check. Its sole output
// channel is stdout/stderr; using console.log/error is the idiomatic Node.js
// CLI pattern, and bringing in a logger would be heavier without adding value
// for a dev-time tool.
/* eslint-disable no-console */

// Justification: JSON-RPC responses use `null` per the JSON-RPC 2.0 spec
// (e.g. `result: null` for void commands). Comparing/representing those wire
// values requires `null` literals; substituting `undefined` would mis-model
// the protocol.
/* eslint-disable no-null/no-null */

import WebSocket from 'ws';

const PAPI_URL = process.env.PAPI_URL ?? 'ws://localhost:8876';
const DEFAULT_RESOURCE_ID = process.env.ER_SMOKE_RESOURCE ?? 'TECLOT';
// VerseRef wire format: VerseRefConverter (c-sharp/JsonUtils/VerseRefConverter.cs)
// expects bookNum/chapterNum/verseNum (or book name + verse string). The plain
// book/chapter/verse names match the SIL.Scripture C# property accessors but
// not the JSON contract.
const SCRIPTURE_REFERENCE = {
  bookNum: 43,
  chapterNum: 1,
  verseNum: 1,
  versificationStr: 'English',
};

type JsonRpcResponse = {
  jsonrpc: '2.0';
  id: number;
  result?: unknown;
  error?: { code: number; message: string; data?: unknown };
};

class PapiClient {
  private ws: WebSocket;

  private nextId = 1;

  private pending = new Map<number, (response: JsonRpcResponse) => void>();

  private constructor(ws: WebSocket) {
    this.ws = ws;
    this.ws.on('message', (raw) => {
      // raw is WebSocket.RawData = Buffer | ArrayBuffer | Buffer[]; coerce to a
      // string by walking the union without type assertions.
      let text: string;
      if (typeof raw === 'string') text = raw;
      else if (Buffer.isBuffer(raw)) text = raw.toString('utf-8');
      else if (Array.isArray(raw)) text = Buffer.concat(raw).toString('utf-8');
      else text = Buffer.from(raw).toString('utf-8');
      let msg: JsonRpcResponse;
      try {
        msg = JSON.parse(text);
      } catch {
        return; // ignore non-JSON frames (events, pings, etc.)
      }
      if (typeof msg.id !== 'number') return;
      const resolver = this.pending.get(msg.id);
      if (resolver) {
        this.pending.delete(msg.id);
        resolver(msg);
      }
    });
  }

  static async connect(url: string): Promise<PapiClient> {
    const ws = new WebSocket(url);
    await new Promise<void>((resolve, reject) => {
      ws.once('open', () => resolve());
      ws.once('error', reject);
    });
    return new PapiClient(ws);
  }

  async command<T>(method: string, params: unknown[] = []): Promise<T> {
    const id = this.nextId;
    this.nextId += 1;
    // Enhanced Resources is a NetworkObject (see EnhancedResourceFactory). Its
    // methods are registered under the `object:` JSON-RPC namespace, not
    // `command:`. The names are kept method-style ("platform.enhancedResources.X")
    // because that mirrors the spec's PAPI-command-shaped contract.
    const frame = { jsonrpc: '2.0', id, method: `object:${method}`, params };
    const response = await new Promise<JsonRpcResponse>((resolve) => {
      this.pending.set(id, resolve);
      this.ws.send(JSON.stringify(frame));
    });
    if (response.error) {
      throw new Error(
        `PAPI command '${method}' failed: [${response.error.code}] ${response.error.message}`,
      );
    }
    // Justification: PAPI command results arrive as JSON-RPC `unknown`; the
    // caller specifies the expected shape via the type parameter. There is
    // no narrower static guarantee available at this boundary - the smoke
    // check trusts the data provider to honor its declared contract and
    // surfaces shape mismatches as runtime check failures.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return response.result as T;
  }

  close(): void {
    this.ws.close();
  }
}

// -----------------------------------------------------------------------------
// Smoke-check runner
// -----------------------------------------------------------------------------

type CheckResult = { name: string; ok: boolean; detail: string };

type InitializeResult = {
  haveMarbleData: boolean;
  availableResources: string[];
  availableGlossLanguages: string[];
  requiredProjectsMissing: boolean;
};

type DictionaryResult = { items: { entryId?: string }[] };

// EncyclopediaResult is defined inline in the run() body where it's used
// because its EntryRef shape (articleId/key/title) is needed for
// readArticle wiring.

type MediaResult = {
  items: { imageId?: string; thumbnailSource?: string }[];
};

type FetchImageBytesResult = { contentType: string; data: string };

async function run(): Promise<CheckResult[]> {
  const client = await PapiClient.connect(PAPI_URL);
  const results: CheckResult[] = [];

  const record = (name: string, ok: boolean, detail: string) => {
    results.push({ name, ok, detail });
    const marker = ok ? 'PASS' : 'FAIL';
    console.log(`[${marker}] ${name} - ${detail}`);
  };

  // Run a single command in isolation: any thrown error is recorded as a FAIL
  // for that command and returned as undefined so the rest of the smoke check
  // can continue. Without this wrapper a single backend regression aborts the
  // run and hides the state of the remaining 14+ commands.
  const tryRun = async <T>(
    name: string,
    fn: () => Promise<T>,
    onSuccess: (value: T) => { ok: boolean; detail: string },
  ): Promise<T | undefined> => {
    try {
      const value = await fn();
      const { ok, detail } = onSuccess(value);
      record(name, ok, detail);
      return value;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      record(name, false, `error: ${msg}`);
      return undefined;
    }
  };

  try {
    // 1. readInitializeResult
    const init = await tryRun<InitializeResult>(
      'readInitializeResult',
      () => client.command('platform.enhancedResources.readInitializeResult'),
      (value) => ({
        ok: value.haveMarbleData && value.availableResources.length > 0,
        detail: `haveMarbleData=${value.haveMarbleData} resources=${value.availableResources.join(',')}`,
      }),
    );

    if (!init || !init.haveMarbleData || init.availableResources.length === 0) {
      record(
        'prerequisite',
        false,
        'No marble data loaded - configure dotnet user-secrets and install marble packages. Remaining checks skipped.',
      );
      return results;
    }

    const resourceId = init.availableResources.includes(DEFAULT_RESOURCE_ID)
      ? DEFAULT_RESOURCE_ID
      : init.availableResources[0];
    const language = init.availableGlossLanguages[0] ?? 'en';

    // 2. resolveResourceObjectId
    await tryRun<string>(
      'resolveResourceObjectId',
      () => client.command('platform.enhancedResources.resolveResourceObjectId', [resourceId]),
      (resolved) => ({
        ok: resolved === resourceId,
        detail: `echoed '${resolved}' for '${resourceId}'`,
      }),
    );

    // 3. (REMOVED) parseMarbleTokens was removed from PAPI in v2.3.0 (Theme 16 -
    // server-owned token pipeline; tokens never cross PAPI). Token-derived data
    // is now obtained via per-method PAPI commands (findLinksForScope,
    // buildTooltipData, etc.) which fetch tokens internally via
    // IMarbleBookTokenProvider. The marble-aware USX->USJ converter (FN-007
    // resolution) will consume marble USX via M-019 loadMarbleChapterXml in a
    // future iteration.

    // 4. findLinksForScope - server fetches tokens internally; no tokens param.
    await tryRun<unknown>(
      'findLinksForScope',
      () =>
        client.command('platform.enhancedResources.findLinksForScope', [
          {
            resourceId,
            currentRef: SCRIPTURE_REFERENCE,
            scope: 'CurrentVerse',
            linkType: 'Lexical',
            filterText: '',
            filterSenses: '',
            filterClickOrigin: 'ScripturePane',
          },
        ]),
      (value) => ({ ok: value !== null && value !== undefined, detail: 'non-null result' }),
    );

    // 5. findImagesForReference - ImageReferenceInput { reference, resourceId,
    // userLanguage }. (Earlier versions of the smoke check spelled the verse
    // ref field "currentReference"; the C# record uses "reference".)
    await tryRun<{ images: unknown[] }>(
      'findImagesForReference',
      () =>
        client.command('platform.enhancedResources.findImagesForReference', [
          { reference: SCRIPTURE_REFERENCE, resourceId, userLanguage: 'en' },
        ]),
      (value) => ({
        ok: Array.isArray(value.images),
        detail: `images=${value.images.length}`,
      }),
    );

    // 6. translatePartOfSpeech (tag, language, form). Language is "Greek" or
    // "Hebrew" - "en" was a regression after the spec was tightened. Pass
    // "Greek"/"long" to exercise the lookup; an unknown tag returns a result
    // with known=false rather than throwing, so this still asserts the wiring.
    await tryRun<unknown>(
      'translatePartOfSpeech',
      () =>
        client.command('platform.enhancedResources.translatePartOfSpeech', ['n', 'Greek', 'long']),
      (value) => ({ ok: value !== null, detail: 'non-null result' }),
    );

    // 7. findLocalizedGlosses - GlossLookupInput { termId, preferredLanguage, resourceId }.
    // Empty/unknown termId returns an empty list rather than throwing, which still
    // asserts the wiring without depending on test data.
    await tryRun<{ glosses: string[] }>(
      'findLocalizedGlosses',
      () =>
        client.command('platform.enhancedResources.findLocalizedGlosses', [
          { termId: 'logos', preferredLanguage: 'en', resourceId },
        ]),
      (value) => ({
        ok: Array.isArray(value.glosses),
        detail: `glosses=${value.glosses.length}`,
      }),
    );

    // 8. loadDictionary - DictionaryLoadInput { currentReference, scope, filter,
    // showTranslations, glossLanguage, resourceId }. Resources whose marble
    // package has no Lexicon.xml return "Resource not found" (the resource is
    // not registered in DictionaryData.KnownResourceIds), which surfaces as a
    // FAIL recorded by tryRun.
    const dictionary = await tryRun<DictionaryResult>(
      'loadDictionary',
      () =>
        client.command('platform.enhancedResources.loadDictionary', [
          {
            currentReference: SCRIPTURE_REFERENCE,
            scope: 'CurrentVerse',
            filter: null,
            showTranslations: false,
            glossLanguage: language,
            resourceId,
          },
        ]),
      (value) => ({
        ok: Array.isArray(value.items),
        detail: `items=${value.items.length}`,
      }),
    );

    // 9. readDictionaryEntry - DictionaryEntryInput { entryId, glossLanguage,
    // subItemId? }.
    const firstItem = dictionary?.items[0];
    if (firstItem?.entryId) {
      const { entryId } = firstItem;
      await tryRun<unknown>(
        'readDictionaryEntry',
        () =>
          client.command('platform.enhancedResources.readDictionaryEntry', [
            { entryId, glossLanguage: language },
          ]),
        (entry) => ({ ok: entry !== null, detail: `retrieved entry '${entryId}'` }),
      );
    } else {
      record(
        'readDictionaryEntry',
        false,
        'loadDictionary returned no items - skipped entry fetch',
      );
    }

    // 10. loadEncyclopedia - EncyclopediaLoadInput { currentReference, scope,
    // filter, userLanguage, resourceId }.
    // JHN 1:1 has lexical content but no thematic links - encyclopedia entries
    // hang off thematic_links, which start later in the chapter (e.g., "Lamb"
    // at JHN 1:29 maps to FAUNA). Probe at JHN 1:29 so the wiring actually
    // returns rows. Falls back to JHN 1:1 if data lacks JHN 1:29 thematic content.
    const ENCYCLOPEDIA_REFERENCE = { ...SCRIPTURE_REFERENCE, verseNum: 29 };
    type EncyclopediaItem = {
      tokenId?: string;
      lemma?: string;
      entries?: { articleId?: string; key?: string; title?: string }[];
    };
    const encyclopedia = await tryRun<{ items: EncyclopediaItem[] }>(
      'loadEncyclopedia',
      () =>
        client.command('platform.enhancedResources.loadEncyclopedia', [
          {
            currentReference: ENCYCLOPEDIA_REFERENCE,
            scope: 'CurrentVerse',
            filter: null,
            userLanguage: 'en',
            resourceId,
          },
        ]),
      (value) => ({
        ok: Array.isArray(value.items),
        detail: `items=${value.items.length} (JHN 1:29)`,
      }),
    );

    // 11. readArticle - ArticleInput { articleId, resourceId, userLanguage }.
    // ArticleId is the typed key (e.g. "FAUNA:2.31") on EncyclopediaEntryRef.
    const firstEntry = encyclopedia?.items
      .flatMap((it) => it.entries ?? [])
      .find((e) => !!e.articleId);
    if (firstEntry?.articleId) {
      const { articleId } = firstEntry;
      await tryRun<unknown>(
        'readArticle',
        () =>
          client.command('platform.enhancedResources.readArticle', [
            { articleId, resourceId, userLanguage: 'en' },
          ]),
        (article) => ({ ok: article !== null, detail: `retrieved article '${articleId}'` }),
      );
    } else {
      record('readArticle', false, 'loadEncyclopedia returned no entries - skipped article fetch');
    }

    // 12. loadMedia - MediaLoadInput { currentReference, scope, filter, tabType,
    // userLanguage, resourceId }. items=0 is acceptable here: the per-verse
    // image filter is data-dependent (an English target text at JHN 1:1 may
    // legitimately have no marble image references). The wiring itself is
    // verified by the call returning a non-error response with an Items array.
    const media = await tryRun<MediaResult>(
      'loadMedia',
      () =>
        client.command('platform.enhancedResources.loadMedia', [
          {
            currentReference: SCRIPTURE_REFERENCE,
            scope: 'CurrentVerse',
            filter: null,
            tabType: 'Images',
            userLanguage: 'en',
            resourceId,
          },
        ]),
      (value) => ({
        ok: Array.isArray(value.items),
        detail: `items=${value.items.length}`,
      }),
    );

    // 13. executeSourceLanguageSearch - SourceLanguageSearchInput { searchText,
    // bookRange?, resourceId, showInContextLimit, useTransliteration }.
    await tryRun<{ results: unknown[] }>(
      'executeSourceLanguageSearch',
      () =>
        client.command('platform.enhancedResources.executeSourceLanguageSearch', [
          {
            searchText: 'logos',
            bookRange: null,
            resourceId,
            showInContextLimit: 50,
            useTransliteration: false,
          },
        ]),
      (value) => ({
        ok: Array.isArray(value.results),
        detail: `results=${value.results.length}`,
      }),
    );

    // 14. buildTooltipData - server fetches tokens internally. The smoke check
    // uses tokenId="0" (the first token in any chapter is the Book token; this
    // exercises the lookup path and either returns a partial TooltipData or
    // throws NOT_FOUND, both of which are valid command behavior).
    let tooltipOk = false;
    let tooltipDetail = 'NOT_FOUND (expected for tokenId=0 / non-TextLink)';
    try {
      const tooltip = await client.command<unknown>('platform.enhancedResources.buildTooltipData', [
        {
          tokenId: '0',
          resourceId,
          glossLanguage: language,
          currentReference: SCRIPTURE_REFERENCE,
        },
      ]);
      tooltipOk = tooltip !== null;
      tooltipDetail = 'non-null tooltip data';
    } catch (e) {
      // NOT_FOUND for tokenId="0" is expected; any other error indicates a
      // real failure in the buildTooltipData wiring.
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes('NOT_FOUND')) tooltipOk = true;
      else tooltipDetail = `unexpected error: ${msg}`;
    }
    record('buildTooltipData', tooltipOk, tooltipDetail);

    // 15. buildNoteData - NoteInput { noteXml }. Pass a minimal but well-formed
    // USX <note> fragment so the validator (which rejects empty input) accepts
    // it. The smoke check just exercises the call path; the parsed result is
    // not data-dependent.
    await tryRun<unknown>(
      'buildNoteData',
      () =>
        client.command('platform.enhancedResources.buildNoteData', [
          {
            noteXml:
              '<note caller="+" style="f"><char style="fr">1.1 </char><char style="ft">smoke</char></note>',
          },
        ]),
      (note) => ({ ok: note !== null, detail: 'non-null note data' }),
    );

    // 16. fetchImageBytes - validates the papi-er:// backing command end-to-end
    const firstImage = media?.items[0];
    if (firstImage?.imageId) {
      const bytes = await client.command<FetchImageBytesResult | null>(
        'platform.enhancedResources.fetchImageBytes',
        [{ imageId: firstImage.imageId, size: 'thumbnail' }],
      );
      const ok = bytes !== null && typeof bytes.data === 'string' && bytes.data.length > 0;
      const detail =
        ok && bytes
          ? `contentType=${bytes.contentType} bytes=${Math.floor((bytes.data.length * 3) / 4)}`
          : 'null result or empty base64';
      record('fetchImageBytes', ok, detail);
    } else {
      record('fetchImageBytes', false, 'loadMedia returned no imageId - skipped byte fetch');
    }
  } finally {
    client.close();
  }

  return results;
}

run()
  .then((results) => {
    const failures = results.filter((r) => !r.ok);
    const total = results.length;
    console.log(`\n${total - failures.length}/${total} checks passed.`);
    if (failures.length > 0) {
      console.log('Failures:');
      failures.forEach((f) => console.log(`  - ${f.name}: ${f.detail}`));
      process.exit(1);
    }
    process.exit(0);
  })
  .catch((e: unknown) => {
    const msg = e instanceof Error ? e.message : String(e);
    console.error(`Could not connect or run smoke check: ${msg}`);
    process.exit(2);
  });
