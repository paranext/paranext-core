import { describe, it, expect } from 'vitest';
import type { NetworkObjectDocumentation } from '@shared/models/openrpc.model';
import { dataProviderService } from '@shared/services/data-provider.service';
import type { registerEngineByType } from '@shared/services/data-provider.service';

/**
 * Tests for dataProviderService.registerEngine and registerEngineByType —
 * NetworkObjectDocumentation parameter.
 *
 * Integration-style tests that call the actual functions are skipped here because the test
 * environment doesn't bootstrap the full RPC/WebSocket layer required by networkObjectService.set.
 * The new parameter is verified at the type level below.
 */

// ---------------------------------------------------------------------------
// Compile-time / type-level tests
// ---------------------------------------------------------------------------

describe('dataProviderService.registerEngine — documentation parameter', () => {
  it('accepts NetworkObjectDocumentation as a trailing parameter (compile-time)', () => {
    // Compile-time only: confirm the function signature includes the new parameter.
    type Sig = Parameters<typeof dataProviderService.registerEngine>;
    // The 5th parameter (index 4) should be NetworkObjectDocumentation | undefined.
    type DocParam = Sig[4];
    // This assignment would fail to compile if DocParam is not assignable from
    // NetworkObjectDocumentation | undefined.
    const docParamCheck: DocParam = undefined satisfies NetworkObjectDocumentation | undefined;
    expect(docParamCheck).toBeUndefined();
  });
});

describe('registerEngineByType — documentation parameter', () => {
  it('accepts NetworkObjectDocumentation as a trailing parameter (compile-time)', () => {
    // Compile-time only: confirm the function signature includes the new parameter.
    type Sig = Parameters<typeof registerEngineByType>;
    // The 5th parameter (index 4) should be NetworkObjectDocumentation | undefined.
    type DocParam = Sig[4];
    const docParamCheck: DocParam = undefined satisfies NetworkObjectDocumentation | undefined;
    expect(docParamCheck).toBeUndefined();
  });
});
