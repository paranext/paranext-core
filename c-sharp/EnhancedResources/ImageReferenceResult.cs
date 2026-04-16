// === STUB FOR TDD RED PHASE ===
// Source: Section 3.4, EXT-009, BHV-612
// Will be replaced during GREEN phase implementation.

using SIL.Scripture;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Result of image reference range matching. Images grouped by
/// StartRef, EndRef, and ImageData. Matching at book, chapter,
/// and verse levels.
/// Source: EXT-009, BHV-612
/// </summary>
internal record ImageReferenceResult(IList<ImageEntry> Images, int TotalImageCount);

/// <summary>
/// Single image entry in the reference result.
/// </summary>
internal record ImageEntry(
    string ImageId,
    string ImageSource,
    string Title,
    VerseRef StartRef,
    VerseRef EndRef,
    string Collection,
    string LanguageCode
);
