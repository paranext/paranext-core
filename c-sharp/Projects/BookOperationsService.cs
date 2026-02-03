// === NEW IN PT10 ===
// Reason: Service for book operations - getting compatible destinations and copying books
// Maps to: CAP-008, CAP-009, EXT-008
// PT9 Provenance: Paratext/ToolsMenu/CopyBooksForm.cs:533-610

using Paratext.Data;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Service for book copy operations between projects.
/// Maps to: CAP-008 (GetCompatibleDestinations), CAP-009 (CopyBooks)
/// </summary>
internal static class BookOperationsService
{
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
        // TODO: Implement in TDD GREEN phase
        // This stub returns empty to make tests compile (RED phase)
        throw new NotImplementedException(
            "CAP-008: GetCompatibleDestinations - awaiting implementation"
        );
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
    /// - Uses ImportSfmText.ImportBooks() from ParatextData.dll
    /// - Uses ParatextProjectDataProvider.RunWithinLock() for write lock
    /// - INV-018: Administrator gets edit permission for imported books
    /// </remarks>
    public static Task<CopyBooksResult> CopyBooksAsync(
        CopyBooksRequest request,
        CancellationToken cancellationToken = default
    )
    {
        // TODO: Implement in TDD GREEN phase
        // This stub throws to make tests compile (RED phase)
        throw new NotImplementedException("CAP-009: CopyBooksAsync - awaiting implementation");
    }
}
