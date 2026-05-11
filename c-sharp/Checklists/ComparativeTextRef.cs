using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Checklists;

// === NEW IN PT10 ===
// Reason: PT9 represents comparative texts via in-memory ScrText references; PT10
// needs a serializable id over the PAPI boundary.
//
// History: an earlier shape paired Id with a Name field to preserve PT9's
// name-fallback resolver. PT10 is greenfield — every project carries a canonical
// GUID — so the Name fallback was dropped (markers-checklist PR #2254 review,
// TJ Couch). Resolution is GUID-only.
/// <summary>
/// Identifier of a comparative text (reference text, back translation, etc.)
/// as carried across the PAPI boundary. The id is a project GUID — resolution
/// is GUID-only (no name fallback).
/// </summary>
[method: JsonConstructor]
public record ComparativeTextRef(string Id);
