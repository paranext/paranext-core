using Paratext.Data;

namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 === (RED STUB)
// Source: PT9/ParatextBase/ScriptureTemplate.cs:24-349
// Maps to: EXT-001 (BHV-407) — Book Creation Engine
//
// This file is a placeholder to satisfy compilation for the Test Writer's
// RED-phase tests. The real implementation is produced by the TDD Implementer
// agent in the GREEN phase. All entry points throw NotImplementedException.

/// <summary>
/// Book creation engine. Exposes <see cref="CreateOneBook"/> which writes a
/// USFM book file using one of three methods: empty (id line only),
/// chapter/verse from the project's versification, or markers extracted from
/// a model project.
///
/// <para>See <c>data-contracts.md</c> Section 4.4 and
/// <c>implementation/extraction-plan.md</c> EXT-001 for the formal contract.</para>
/// </summary>
public static class ScriptureTemplateService
{
    /// <summary>
    /// Creates a single book in <paramref name="scrText"/> using one of three methods:
    /// <list type="number">
    ///   <item><description><c>CreateIdLineOnly</c> — empty book with only the \id line and headers.</description></item>
    ///   <item><description><c>CreateCV</c> — book with chapter/verse markers from versification (when <paramref name="createCV"/> is true and the book is canonical).</description></item>
    ///   <item><description><c>CreateFromTemplate</c> — book with markers extracted from <paramref name="modelScrText"/> (when <paramref name="createUsingModelTextAsTemplate"/> is true).</description></item>
    /// </list>
    /// </summary>
    /// <param name="scrText">Target project to write the new book into.</param>
    /// <param name="bookNum">Book number (canonical 1–66 plus deuterocanon / ESG / front-matter).</param>
    /// <param name="createCV">If true and the book is canonical, emit \c and \v markers for all chapters/verses in the project's versification.</param>
    /// <param name="createUsingModelTextAsTemplate">If true, copy markers from <paramref name="modelScrText"/>.</param>
    /// <param name="modelScrText">Required when <paramref name="createUsingModelTextAsTemplate"/> is true; otherwise may be null.</param>
    /// <returns>true if the book was created (or was already present); false if creation was declined.</returns>
    public static bool CreateOneBook(
        ScrText scrText,
        int bookNum,
        bool createCV,
        bool createUsingModelTextAsTemplate,
        ScrText? modelScrText = null
    )
    {
        throw new NotImplementedException(
            "ScriptureTemplateService.CreateOneBook: RED stub — awaiting GREEN-phase implementation (CAP-003)."
        );
    }
}
