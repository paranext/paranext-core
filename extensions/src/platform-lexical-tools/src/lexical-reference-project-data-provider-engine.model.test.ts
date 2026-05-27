import { describe, expect, it, vi } from 'vitest';
import type { LexicalReferenceText } from 'platform-lexical-tools';

// Mock @papi/backend so the engine doesn't try to reach the real PAPI runtime. Both the default
// export (used as `papi.projectSettings.getDefault(...)`) and the named `BaseProjectDataProviderEngine`
// class need stand-ins; the engine extends the class and calls `super()` in its constructor.
vi.mock('@papi/backend', () => ({
  default: {
    projectSettings: {
      getDefault: vi.fn(),
    },
  },
  BaseProjectDataProviderEngine: class {
    // Provided so subclasses can call `this.notifyUpdate(...)` without crashing if a test ever
    // exercises that path. The current tests don't fire change events, but keeping the stub
    // matches the runtime contract.
    notifyUpdate() {}
  },
}));

// Imports must come after vi.mock so the mock is applied to the module under test.
// eslint-disable-next-line import/first
import { LexicalReferenceProjectDataProviderEngine } from './lexical-reference-project-data-provider-engine.model';
// eslint-disable-next-line import/first
import type { LexicalReferenceTextManager } from './lexical-reference-text-manager.model';

function createEngine() {
  // Minimal LexicalReferenceText — only `id` and `localizedInfoByBCP47Code` are read by the
  // settings paths exercised here.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const mockLexicalReferenceText = {
    id: 'test-lex-ref',
    localizedInfoByBCP47Code: { en: {} },
  } as unknown as LexicalReferenceText;

  // The constructor subscribes via `onDidChangeLexicalReferenceTexts` and stores the returned
  // unsubscriber. Returning a no-op unsubscriber keeps the constructor happy without firing the
  // change callback (which would call `notifyUpdate`).
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const mockManager = {
    onDidChangeLexicalReferenceTexts: vi.fn(() => () => {}),
    getLexicalReferenceTextsById: vi.fn(),
  } as unknown as LexicalReferenceTextManager;

  return new LexicalReferenceProjectDataProviderEngine(mockLexicalReferenceText, mockManager);
}

describe('LexicalReferenceProjectDataProviderEngine.getSetting', () => {
  it("returns false for 'platform.isEditable'", async () => {
    // Lexical reference texts are read-only published references — their primary content cannot
    // be edited, so platform.isEditable is `false`.
    const engine = createEngine();
    expect(await engine.getSetting('platform.isEditable')).toBe(false);
  });

  it("returns true for 'platform.isPublished'", async () => {
    // Lexical reference texts are published reference materials, so platform.isPublished is
    // `true`. This pairs with the platform.isEditable=false case above to preserve the
    // documented invariant that a published project is not editable.
    const engine = createEngine();
    expect(await engine.getSetting('platform.isPublished')).toBe(true);
  });
});
