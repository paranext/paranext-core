using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 (RED STUB) ===
// Source: PT9/Paratext/ToolsMenu/CreateBooksForm.cs:116-316
// Maps to: EXT-002 (BHV-305, BHV-306, BHV-407),
//          EXT-003 (BHV-305, BHV-306),
//          EXT-004 (BHV-305)
//
// STUB — Test Writer RED skeleton for CAP-004. All methods throw
// NotImplementedException; the TDD Implementer will replace each
// body with the ported logic to turn the tests GREEN.
//
// Scope deferrals (per strategic plan and PT9 source):
// - Alert.Show(...) UI calls → replaced with ValidationResult returns
//   and PlatformErrorCodes throws in the service layer.
// - ConfirmedBasePeripheralBooks (delegated-project banner suppression)
//   → deferred; SBA out of scope (P1.6 consolidation review).
// - ChangeBooksInProjectPlan (progress-plan integration) → deferred;
//   tracked in deferred-functionality.md.

/// <summary>
/// Orchestrates book creation: per-book delegation to
/// <see cref="ScriptureTemplateService.CreateOneBook"/>, plus pre-flight
/// validation (CheckModelBooks, CheckVersification) and the
/// available-book-set filter used by the Create Books dialog.
///
/// <para>See data-contracts.md Sections 2.2 / 3.2 / 3.7 / 4.3 / 4.4 / 4.5
/// for the formal contracts and implementation/extraction-plan.md
/// EXT-002/3/4 for the extraction spec.</para>
/// </summary>
public static class CreateBooksOrchestrator
{
    /// <summary>
    /// Creates the requested books in <paramref name="scrText"/> using
    /// <paramref name="creationMethod"/>. Delegates per-book work to
    /// <see cref="ScriptureTemplateService.CreateOneBook"/>.
    /// </summary>
    /// <param name="scrText">Target project.</param>
    /// <param name="selectedBooks">Books to create (canonical ordering
    /// via <see cref="BookSet"/>, Theme 5).</param>
    /// <param name="creationMethod">Empty / ChapterVerse / FromTemplate.</param>
    /// <param name="modelScrText">Required when
    /// <paramref name="creationMethod"/> is <see cref="CreationMethod.FromTemplate"/>.</param>
    public static CreateBooksResult CreateBooks(
        ScrText scrText,
        BookSet selectedBooks,
        CreationMethod creationMethod,
        ScrText? modelScrText = null
    )
    {
        throw new NotImplementedException(
            "CreateBooksOrchestrator.CreateBooks — RED stub pending CAP-004 implementer"
        );
    }

    /// <summary>
    /// Returns the set of books available for creation in
    /// <paramref name="scrText"/> (all versification-defined books minus
    /// books already present). Maps to EXT-004, gm-005, TS-050.
    /// </summary>
    public static int[] GetAvailableBooksForCreation(ScrText scrText)
    {
        throw new NotImplementedException(
            "CreateBooksOrchestrator.GetAvailableBooksForCreation — RED stub pending CAP-004 implementer"
        );
    }

    /// <summary>
    /// Verifies that <paramref name="modelScrText"/> contains every
    /// book in <paramref name="selectedBooks"/>. Some missing → Warning
    /// with AffectedBooks listing the missing books. All missing → Error.
    /// Maps to EXT-003, TS-054.
    /// </summary>
    public static ValidationResult CheckModelBooks(BookSet selectedBooks, ScrText modelScrText)
    {
        throw new NotImplementedException(
            "CreateBooksOrchestrator.CheckModelBooks — RED stub pending CAP-004 implementer"
        );
    }

    /// <summary>
    /// Warns when <paramref name="projectScrText"/> and
    /// <paramref name="modelScrText"/> use different versifications.
    /// Maps to EXT-003, TS-053, INV-023.
    /// </summary>
    public static ValidationResult CheckVersification(ScrText projectScrText, ScrText modelScrText)
    {
        throw new NotImplementedException(
            "CreateBooksOrchestrator.CheckVersification — RED stub pending CAP-004 implementer"
        );
    }

    /// <summary>
    /// Composes CheckModelBooks + CheckVersification for a single
    /// <see cref="ValidateCreateBooksRequest"/>. VAL-009 (model project
    /// required for FromTemplate) returns Error severity at this layer.
    /// Maps to Section 4.5.
    /// </summary>
    public static ValidationResult ValidateCreateBooks(
        ScrText scrText,
        BookSet selectedBooks,
        CreationMethod creationMethod,
        ScrText? modelScrText
    )
    {
        throw new NotImplementedException(
            "CreateBooksOrchestrator.ValidateCreateBooks — RED stub pending CAP-004 implementer"
        );
    }
}
