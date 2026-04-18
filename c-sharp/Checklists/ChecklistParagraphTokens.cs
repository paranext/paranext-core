using System;
using System.Collections.Generic;
using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.Checklists;

// === PORTED FROM PT9 (SKELETON — RED PHASE) ===
// Source: PT9/Paratext/Checklists/CLDataSource.cs:462-504 (class CLParagraphTokens)
// Maps to: EXT-012 / BHV-119
// Companion: emitted by ChecklistService.GetTokensForBook (EXT-008 — see
//   ChecklistService.cs in this directory).
//
// EXPLANATION:
// PT9's CLParagraphTokens was a mutable class with public fields. PT10 uses
// an immutable positional record. `IsHeading` is a new PT10 field (strategic
// plan CAP-003 contract: "VerseRefStart, Marker, IsHeading, and token
// collection"); PT9 re-checked headingMarkers membership on demand — the
// record flattens that derivation onto the data carrier so downstream cell
// building (CAP-004) can read the flag directly.
//
// RED-phase stub: the record shape and ReferenceInRange signature are pinned
// here to make the CAP-003 test suite compile. The method body throws
// NotImplementedException pointing at the PT9 source; the GREEN implementer
// ports the AllVerses()-based predicate.
/// <summary>
/// Paragraph-scoped USFM token bundle produced by
/// <see cref="ChecklistService.GetTokensForBook"/>. Carries the paragraph's
/// start verse reference, marker, heading-membership flag, and the ordered
/// USFM tokens that constitute the paragraph body. See data-contracts.md
/// §4.1 (BuildChecklistData internal types) and behavior-catalog.md
/// BHV-108 / BHV-119.
/// </summary>
internal sealed record ChecklistParagraphTokens(
    VerseRef VerseRefStart,
    string Marker,
    bool IsHeading,
    IReadOnlyList<UsfmToken> Tokens
)
{
    // === PORTED FROM PT9 (SKELETON) ===
    // Source: PT9/Paratext/Checklists/CLDataSource.cs:498-504 (ReferenceInRange)
    // Maps to: EXT-012 / BHV-119
    /// <summary>
    /// Returns true when any part of <see cref="VerseRefStart"/> falls within
    /// the inclusive range <paramref name="startRef"/>..<paramref name="endRef"/>.
    /// Expands verse bridges via <c>AllVerses()</c>; short-circuits when
    /// <paramref name="startRef"/> is the default <see cref="VerseRef"/>
    /// sentinel (unbounded lower).
    /// </summary>
    public bool ReferenceInRange(VerseRef startRef, VerseRef endRef)
    {
        throw new NotImplementedException(
            "CAP-003 GREEN phase: port CLParagraphTokens.ReferenceInRange "
                + "(PT9: CLDataSource.cs:498-504)."
        );
    }
}
