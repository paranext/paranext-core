// Source: Section 2.4, EXT-009, BHV-612

using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Input for image reference range matching.
/// Source: EXT-009, BHV-612
/// </summary>
internal record ImageReferenceInput(VerseRef Reference, string ResourceId, string UserLanguage);
