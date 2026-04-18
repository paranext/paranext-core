using System.Text.Json.Serialization;

namespace Paranext.DataProvider.Checklists;

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/Checklists (CLText/CLVerse/CLEditLink/CLLink/CLError/CLMessage
// content-item hierarchy)
// Method: ChecklistContentItem (base type only; concrete subtypes in sibling files)
// Maps to: EXT-010 (data models)
//
// EXPLANATION:
// Polymorphic hierarchy over the PAPI boundary. The TypeScript side (data-contracts.md
// §3.5) models these as a discriminated union with a lowercase `type` field literal
// per subtype (`'text'`, `'verse'`, `'editLink'`, `'link'`, `'error'`, `'message'`).
// On the C# side we mirror that wire shape with [JsonPolymorphic] +
// [JsonDerivedType(...)] so System.Text.Json emits a `type` discriminator property on
// serialize and routes to the correct subtype on deserialize.
//
// The explicit BE-1 early-verification test lives in
// c-sharp-tests/Checklists/ChecklistContentItemPolymorphismTests.cs. If that suite
// ever regresses, fall back to an explicit JsonConverter<ChecklistContentItem> and
// escalate before BE-2 starts (per strategic-plan risk RF-SP).
/// <summary>
/// Abstract base type for polymorphic checklist content items. Each concrete subtype
/// lives in its own file alongside this base (per PNX004 one-type-per-file rule,
/// with the exception that the base + subtype file colocation is still isolated
/// across files here).
/// </summary>
[JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
[JsonDerivedType(typeof(TextItem), "text")]
[JsonDerivedType(typeof(VerseItem), "verse")]
[JsonDerivedType(typeof(EditLinkItem), "editLink")]
[JsonDerivedType(typeof(LinkItem), "link")]
[JsonDerivedType(typeof(ErrorItem), "error")]
[JsonDerivedType(typeof(MessageItem), "message")]
public abstract record ChecklistContentItem;
