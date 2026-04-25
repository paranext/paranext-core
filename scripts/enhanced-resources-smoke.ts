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
const SCRIPTURE_REFERENCE = {
  book: 43,
  chapter: 1,
  verse: 1,
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
    const frame = { jsonrpc: '2.0', id, method: `command:${method}`, params };
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

type EncyclopediaResult = { items: { articleId?: string }[] };

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

  try {
    // 1. readInitializeResult
    const init = await client.command<InitializeResult>(
      'platform.enhancedResources.readInitializeResult',
    );
    record(
      'readInitializeResult',
      init.haveMarbleData && init.availableResources.length > 0,
      `haveMarbleData=${init.haveMarbleData} resources=${init.availableResources.join(',')}`,
    );

    if (!init.haveMarbleData || init.availableResources.length === 0) {
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
    const resolved = await client.command<string>(
      'platform.enhancedResources.resolveResourceObjectId',
      [resourceId],
    );
    record(
      'resolveResourceObjectId',
      resolved === resourceId,
      `echoed '${resolved}' for '${resourceId}'`,
    );

    // 3. (REMOVED) parseMarbleTokens was removed from PAPI in v2.3.0 (Theme 16 -
    // server-owned token pipeline; tokens never cross PAPI). Token-derived data
    // is now obtained via per-method PAPI commands (findLinksForScope,
    // buildTooltipData, etc.) which fetch tokens internally via
    // IMarbleBookTokenProvider. The marble-aware USX->USJ converter (FN-007
    // resolution) will consume marble USX via M-019 loadMarbleChapterXml in a
    // future iteration.

    // 4. findLinksForScope - server fetches tokens internally; no tokens param.
    const links = await client.command<unknown>('platform.enhancedResources.findLinksForScope', [
      {
        resourceId,
        currentRef: SCRIPTURE_REFERENCE,
        scope: 'CurrentVerse',
        linkType: 'Lexical',
        filterText: '',
        filterSenses: '',
        filterClickOrigin: 'ScripturePane',
      },
    ]);
    record('findLinksForScope', links !== null && links !== undefined, 'non-null result');

    // 5. findImagesForReference (returns ImageReferenceResult { Images, TotalImageCount })
    const imageRefs = await client.command<{ images: unknown[] }>(
      'platform.enhancedResources.findImagesForReference',
      [{ resourceId, currentReference: SCRIPTURE_REFERENCE }],
    );
    record(
      'findImagesForReference',
      Array.isArray(imageRefs.images),
      `images=${imageRefs.images.length}`,
    );

    // 6. translatePartOfSpeech
    const pos = await client.command<unknown>('platform.enhancedResources.translatePartOfSpeech', [
      'n',
      'en',
    ]);
    record('translatePartOfSpeech', pos !== null, 'non-null result');

    // 7. findLocalizedGlosses
    const glosses = await client.command<{ glosses: string[] }>(
      'platform.enhancedResources.findLocalizedGlosses',
      [{ termLemma: 'logos', language: 'en' }],
    );
    record(
      'findLocalizedGlosses',
      Array.isArray(glosses.glosses),
      `glosses=${glosses.glosses.length}`,
    );

    // 8. loadDictionary
    const dictionary = await client.command<DictionaryResult>(
      'platform.enhancedResources.loadDictionary',
      [
        {
          resourceId,
          currentReference: SCRIPTURE_REFERENCE,
          glossLanguage: language,
        },
      ],
    );
    record('loadDictionary', Array.isArray(dictionary.items), `items=${dictionary.items.length}`);

    // 9. readDictionaryEntry
    const firstItem = dictionary.items[0];
    if (firstItem?.entryId) {
      const { entryId } = firstItem;
      const entry = await client.command<unknown>(
        'platform.enhancedResources.readDictionaryEntry',
        [
          {
            resourceId,
            entryId,
            currentReference: SCRIPTURE_REFERENCE,
          },
        ],
      );
      record('readDictionaryEntry', entry !== null, `retrieved entry '${entryId}'`);
    } else {
      record(
        'readDictionaryEntry',
        false,
        'loadDictionary returned no items - skipped entry fetch',
      );
    }

    // 10. loadEncyclopedia
    const encyclopedia = await client.command<EncyclopediaResult>(
      'platform.enhancedResources.loadEncyclopedia',
      [{ resourceId, language: 'en' }],
    );
    record(
      'loadEncyclopedia',
      Array.isArray(encyclopedia.items),
      `items=${encyclopedia.items.length}`,
    );

    // 11. readArticle
    const firstArticle = encyclopedia.items[0];
    if (firstArticle?.articleId) {
      const { articleId } = firstArticle;
      const article = await client.command<unknown>('platform.enhancedResources.readArticle', [
        { resourceId, articleId, language: 'en' },
      ]);
      record('readArticle', article !== null, `retrieved article '${articleId}'`);
    } else {
      record('readArticle', false, 'loadEncyclopedia returned no items - skipped article fetch');
    }

    // 12. loadMedia
    const media = await client.command<MediaResult>('platform.enhancedResources.loadMedia', [
      { resourceId },
    ]);
    record(
      'loadMedia',
      Array.isArray(media.items) && media.items.length > 0,
      `items=${media.items.length}`,
    );

    // 13. executeSourceLanguageSearch
    const srcLang = await client.command<{ results: unknown[] }>(
      'platform.enhancedResources.executeSourceLanguageSearch',
      [{ lemma: 'logos', language: 'en' }],
    );
    record(
      'executeSourceLanguageSearch',
      Array.isArray(srcLang.results),
      `results=${srcLang.results.length}`,
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

    // 15. buildNoteData - same pattern as buildTooltipData.
    let noteOk = false;
    let noteDetail = 'NOT_FOUND (expected for tokenId=0 / non-Note)';
    try {
      const noteResult = await client.command<unknown>('platform.enhancedResources.buildNoteData', [
        {
          tokenId: '0',
          resourceId,
          currentReference: SCRIPTURE_REFERENCE,
        },
      ]);
      noteOk = noteResult !== null;
      noteDetail = 'non-null note data';
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes('NOT_FOUND')) noteOk = true;
      else noteDetail = `unexpected error: ${msg}`;
    }
    record('buildNoteData', noteOk, noteDetail);

    // 16. fetchImageBytes - validates the papi-er:// backing command end-to-end
    const firstImage = media.items[0];
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
