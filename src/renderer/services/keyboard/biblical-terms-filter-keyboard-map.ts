// === NEW IN PT10 === (keyboard-switching CAP-013)
// Reason: PT9's only callsite that picks between vernacular/notes/default keyboards from a domain
// enum (BiblicalTerms/Internal/Filters/BiblicalTermsTextFilterAdapter.cs:63-73 GotFocus lambda —
// BHV-356 / EXT-153) becomes a renderer-hosted pure resolver. PT10 has no Biblical Terms feature
// yet — this module is the stable placeholder surface the future Biblical Terms port consumes
// (alignment-decision #29 §A; data-contracts §9 EXT-153 row; backend-alignment §Extraction
// Mapping EXT-153).
// Maps to: CAP-013

import type { KeyboardSurfaceType, ProjectId } from '@shared/services/keyboard.service-model';

/**
 * Result of resolving a Biblical Terms text-filter type to a keyboard target (strategic-plan
 * CAP-013 contract):
 *
 * - `{ projectId, surfaceType }` — activate the project's keyboard for that surface (the caller
 *   routes through `papi.keyboard`).
 * - `{ systemDefault: true }` — fall back to the system default keyboard. The INV-B1-05 gate ("only
 *   restore if the project HAS a vernacular keyboard") is the CALLER's job (CAP-010 / CAP-014) —
 *   this instruction is unconditional.
 */
export type BiblicalTermsKeyboardResolution =
  | { projectId: ProjectId; surfaceType: KeyboardSurfaceType }
  | { systemDefault: true };

/**
 * Pure FilterType → keyboard-target resolver for the Biblical Terms text-filter input (BHV-356 /
 * EXT-153). PT9 mapping, ported faithfully:
 *
 * - `Glossary`, `Renderings` → the project's `'vernacular'` surface
 * - `Notes` → the project's `'comments'` surface (PT9 "notes" ≙ PT10 'comments' — data-contracts §2.5
 *   naming note)
 * - Anything else (other PT9 `TextFilterType` members, unknown/future strings) → system default
 *
 * Stateless and side-effect free — `resolve` is static (the strategic-plan contract's
 * `BiblicalTermsFilterKeyboardMap.resolve(filterType, projectId)` form; plan D1).
 */
export class BiblicalTermsFilterKeyboardMap {
  /**
   * Resolve a Biblical Terms filter type to the keyboard target the caller should activate.
   *
   * @param filterType PT9 `TextFilterType` member NAME (the names are the stable identity — they
   *   are saved in PT9 filter files). Matched case-sensitively; unknown values fall back to the
   *   system default (forward-compat).
   * @param projectId The project whose Biblical Terms filter input gained focus.
   * @returns The keyboard target — see {@link BiblicalTermsKeyboardResolution}.
   */
  // === PORTED FROM PT9 ===
  // Source: PT9/Paratext/BiblicalTerms/Internal/Filters/BiblicalTermsTextFilterAdapter.cs:63-73
  // Method: BiblicalTermsTextFilterAdapter..ctor (GotFocus lambda)
  // Maps to: EXT-153 / BHV-356
  static resolve(filterType: string, projectId: ProjectId): BiblicalTermsKeyboardResolution {
    // PT9: `filterType == Glossary || filterType == Renderings → GetKeyboard(scrText, false)`
    if (filterType === 'Glossary' || filterType === 'Renderings')
      return { projectId, surfaceType: 'vernacular' };
    // PT9: `filterType == Notes → GetKeyboard(scrText, true)` — PT9 "notes" ≙ PT10 'comments'
    // (data-contracts §2.5 naming note)
    if (filterType === 'Notes') return { projectId, surfaceType: 'comments' };
    // PT9: `else → ActivateDefaultKeyboard(scrText)` — also the unknown/future-string fallback
    return { systemDefault: true };
  }
}
