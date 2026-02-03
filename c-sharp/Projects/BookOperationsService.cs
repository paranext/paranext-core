// === NEW IN PT10 ===
// Reason: Service for book operations - getting compatible destinations and copying books
// Maps to: CAP-008, CAP-009, EXT-008
// PT9 Provenance: Paratext/ToolsMenu/CopyBooksForm.cs:533-610

using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Service for book copy operations between projects.
/// Maps to: CAP-008 (GetCompatibleDestinations), CAP-009 (CopyBooks)
/// </summary>
internal static class BookOperationsService
{
    // === PORTED FROM PT9 ===
    // Source: Standard scripture book number mappings from PT9 Canon
    // Maps to: CAP-008, CAP-009
    private static readonly Dictionary<string, int> s_bookIdToNumber =
        new(StringComparer.OrdinalIgnoreCase)
        {
            { "GEN", 1 },
            { "EXO", 2 },
            { "LEV", 3 },
            { "NUM", 4 },
            { "DEU", 5 },
            { "JOS", 6 },
            { "JDG", 7 },
            { "RUT", 8 },
            { "1SA", 9 },
            { "2SA", 10 },
            { "1KI", 11 },
            { "2KI", 12 },
            { "1CH", 13 },
            { "2CH", 14 },
            { "EZR", 15 },
            { "NEH", 16 },
            { "EST", 17 },
            { "JOB", 18 },
            { "PSA", 19 },
            { "PRO", 20 },
            { "ECC", 21 },
            { "SNG", 22 },
            { "ISA", 23 },
            { "JER", 24 },
            { "LAM", 25 },
            { "EZK", 26 },
            { "DAN", 27 },
            { "HOS", 28 },
            { "JOL", 29 },
            { "AMO", 30 },
            { "OBA", 31 },
            { "JON", 32 },
            { "MIC", 33 },
            { "NAM", 34 },
            { "HAB", 35 },
            { "ZEP", 36 },
            { "HAG", 37 },
            { "ZEC", 38 },
            { "MAL", 39 },
            { "MAT", 40 },
            { "MRK", 41 },
            { "LUK", 42 },
            { "JHN", 43 },
            { "ACT", 44 },
            { "ROM", 45 },
            { "1CO", 46 },
            { "2CO", 47 },
            { "GAL", 48 },
            { "EPH", 49 },
            { "PHP", 50 },
            { "COL", 51 },
            { "1TH", 52 },
            { "2TH", 53 },
            { "1TI", 54 },
            { "2TI", 55 },
            { "TIT", 56 },
            { "PHM", 57 },
            { "HEB", 58 },
            { "JAS", 59 },
            { "1PE", 60 },
            { "2PE", 61 },
            { "1JN", 62 },
            { "2JN", 63 },
            { "3JN", 64 },
            { "JUD", 65 },
            { "REV", 66 },
        };

    /// <summary>
    /// Gets projects that are compatible as copy destinations for the source project.
    /// PT9 Provenance: CopyBooksForm.LoadToComboboxOptions()
    /// Maps to: CAP-008, EXT-008
    /// </summary>
    /// <param name="sourceProjectGuid">GUID of the source project</param>
    /// <returns>Enumerable of compatible destination projects</returns>
    /// <remarks>
    /// Type compatibility rules:
    /// - StudyBibleAdditions: only to StudyBibleAdditions
    /// - StudyBible: only to StudyBible
    /// - ConsultantNotes: only to ConsultantNotes
    /// - All others: Standard, Auxiliary, BackTranslation, Daughter, StudyBible, TransliterationManual
    /// </remarks>
    public static IEnumerable<ProjectReference> GetCompatibleDestinations(HexId sourceProjectGuid)
    {
        var sourceProject = TryGetScrTextByGuid(sourceProjectGuid);
        if (sourceProject == null)
        {
            return [];
        }

        var sourceType = sourceProject.Settings.TranslationInfo.Type;

        // Get all projects and filter by compatibility
        var allProjects = ScrTextCollection.ScrTexts(IncludeProjects.Everything);

        return allProjects
            .Where(scrText =>
                scrText.Settings.Guid != sourceProjectGuid
                && IsCompatibleDestination(sourceType, scrText.Settings.TranslationInfo.Type)
            )
            .Select(scrText => new ProjectReference(
                scrText.Settings.Guid,
                scrText.Name,
                scrText.Settings.FullName ?? scrText.Name,
                scrText.Settings.TranslationInfo.Type,
                null,
                scrText.Settings.Editable
            ));
    }

    /// <summary>
    /// Attempts to get a ScrText by GUID, returning null if not found or on error.
    /// </summary>
    private static ScrText? TryGetScrTextByGuid(HexId guid)
    {
        try
        {
            return ScrTextCollection.GetById(guid);
        }
        catch
        {
            return null;
        }
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/ToolsMenu/CopyBooksForm.cs:533-610
    // Maps to: CAP-008, EXT-008
    // EXPLANATION:
    // Type compatibility rules determine which project types can receive books from which sources.
    // BHV-606: Study Bible copy restrictions - special types can only copy to same type.
    private static bool IsCompatibleDestination(
        PtxUtils.Enum<ProjectType> sourceType,
        PtxUtils.Enum<ProjectType> destType
    )
    {
        // BHV-606: Study Bible copy restrictions
        // StudyBibleAdditions can only copy to StudyBibleAdditions
        if (sourceType == ProjectType.StudyBibleAdditions)
        {
            return destType == ProjectType.StudyBibleAdditions;
        }

        // StudyBible can only copy to StudyBible
        if (sourceType == ProjectType.StudyBible)
        {
            return destType == ProjectType.StudyBible;
        }

        // ConsultantNotes can only copy to ConsultantNotes
        if (sourceType == ProjectType.ConsultantNotes)
        {
            return destType == ProjectType.ConsultantNotes;
        }

        // All other types can copy to: Standard, Auxiliary, BackTranslation, Daughter, StudyBible, TransliterationManual
        // They CANNOT copy to: StudyBibleAdditions, ConsultantNotes
        return destType == ProjectType.Standard
            || destType == ProjectType.Auxiliary
            || destType == ProjectType.BackTranslation
            || destType == ProjectType.Daughter
            || destType == ProjectType.StudyBible
            || destType == ProjectType.TransliterationManual;
    }

    /// <summary>
    /// Copies books from source project to destination project.
    /// PT9 Provenance: ImportSfmText.ImportBooks()
    /// Maps to: CAP-009, spec-014
    /// </summary>
    /// <param name="request">Copy request with source, destination, and book list</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Result indicating success/failure and list of copied books</returns>
    /// <remarks>
    /// - Validates destination compatibility using GetCompatibleDestinations
    /// - Uses ScrText.GetText/PutText for book content transfer
    /// - INV-018: Administrator gets edit permission for imported books
    /// </remarks>
    public static Task<CopyBooksResult> CopyBooksAsync(
        CopyBooksRequest request,
        CancellationToken cancellationToken = default
    )
    {
        // Handle empty book list - return success with no books copied
        if (request.BookIds.Count == 0)
        {
            return Task.FromResult(CopyBooksResult.Succeeded([]));
        }

        // Get source project
        var sourceProject = TryGetScrTextByGuid(request.FromProjectGuid);
        if (sourceProject == null)
        {
            return Task.FromResult(
                CopyBooksResult.Failed([new CopyBookError("", "Source project not found")])
            );
        }

        // Get destination project
        var destProject = TryGetScrTextByGuid(request.ToProjectGuid);
        if (destProject == null)
        {
            return Task.FromResult(
                CopyBooksResult.Failed([new CopyBookError("", "Destination project not found")])
            );
        }

        // Check destination compatibility using direct type comparison (more efficient than querying all projects)
        var sourceType = sourceProject.Settings.TranslationInfo.Type;
        var destType = destProject.Settings.TranslationInfo.Type;
        if (!IsCompatibleDestination(sourceType, destType))
        {
            return Task.FromResult(
                CopyBooksResult.Failed(
                    [new CopyBookError("", "Destination project type is not compatible")]
                )
            );
        }

        // Copy each book
        var copiedBooks = new List<string>();
        var errors = new List<CopyBookError>();

        foreach (var bookId in request.BookIds)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (!s_bookIdToNumber.TryGetValue(bookId, out int bookNum))
            {
                errors.Add(new CopyBookError(bookId, $"Unknown book ID: {bookId}"));
                continue;
            }

            // Check if book exists in source (BHV-167)
            if (!sourceProject.BookPresent(bookNum))
            {
                errors.Add(new CopyBookError(bookId, $"Book not present in source project"));
                continue;
            }

            try
            {
                // Get content from source
                var verseRef = new VerseRef(bookNum, 0, 0, sourceProject.Settings.Versification);
                string content = sourceProject.GetText(verseRef, false, false) ?? string.Empty;

                // Put content to destination (BHV-168: overwrites existing)
                // INV-018: Admin gets edit permission for imported books
                destProject.PutText(bookNum, 0, false, content, null);

                copiedBooks.Add(bookId);
            }
            catch (Exception ex)
            {
                errors.Add(new CopyBookError(bookId, ex.Message));
            }
        }

        // Return result
        if (errors.Count > 0 && copiedBooks.Count == 0)
        {
            return Task.FromResult(CopyBooksResult.Failed(errors));
        }
        else if (errors.Count > 0)
        {
            return Task.FromResult(CopyBooksResult.PartialSuccess(copiedBooks, errors));
        }
        else
        {
            return Task.FromResult(CopyBooksResult.Succeeded(copiedBooks));
        }
    }
}
