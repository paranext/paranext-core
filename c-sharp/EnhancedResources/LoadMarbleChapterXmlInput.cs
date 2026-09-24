// === NEW IN PT10 === Reason: M-019 input for chapter-scoped marble XML loading.
// Section 4.19 (data-contracts.md), FN-014 (forward-notes.md).
namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Input for <c>loadMarbleChapterXml</c>. Identifies a (resource, book, chapter)
/// triple. The factory delegates to <see cref="MarbleChapterXmlExtractor"/>, which
/// returns a chapter-scoped USX subtree with <c>id</c> attributes pre-injected on
/// each <c>&lt;wg&gt;</c> and <c>&lt;note&gt;</c> element. The TS-side marble
/// converter consumes this XML directly; the IDs round-trip back to the backend
/// via <c>buildTooltipData</c> / <c>buildNoteData</c> via the existing token-index
/// scheme used by <see cref="TooltipService"/>.
/// </summary>
internal sealed record LoadMarbleChapterXmlInput(string ResourceId, int BookNum, int ChapterNumber);
