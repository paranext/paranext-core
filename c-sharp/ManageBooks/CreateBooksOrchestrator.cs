using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 ===
// Source: PT9/Paratext/ToolsMenu/CreateBooksForm.cs:116-316
// Maps to: EXT-002 (BHV-305, BHV-306, BHV-407),
//          EXT-003 (BHV-305, BHV-306),
//          EXT-004 (BHV-305)
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
    // VAL-009 user-facing message for the "FromTemplate without model"
    // precondition. Shared with ManageBooksService.CreateBooksAsync so the
    // validator layer and the wire guard cannot drift.
    internal const string SelectModelTextMessage = "Please select model text";

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/ToolsMenu/CreateBooksForm.cs:152, 169-183
    // Method: CreateBooksForm.cmdOK_Click — the per-book create loop.
    // Maps to: EXT-002 (BHV-407 — per-book delegation)
    //
    // EXPLANATION:
    // Maps CreationMethod → the two boolean flags accepted by
    // ScriptureTemplateService.CreateOneBook (CAP-003):
    //   Empty        → (createCV=false, useModel=false)
    //   ChapterVerse → (createCV=true,  useModel=false)
    //   FromTemplate → (createCV=false, useModel=true)
    // and loops over selectedBooks in canonical order. Tracks the most
    // recently created book number (INV-C13 / INV-026); the loop breaks
    // if CreateOneBook returns false (e.g., could not obtain lock) — same
    // semantics as PT9 line 172's `break;`. Already-present books flow
    // through as idempotent no-ops (CreateOneBook returns true without
    // increment) per PT9 ScriptureTemplate.cs:50-51.
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
        bool createCV = creationMethod == CreationMethod.ChapterVerse;
        bool useModel = creationMethod == CreationMethod.FromTemplate;

        int createdCount = 0;
        int? lastCreatedBookNum = null;

        foreach (int bookNum in selectedBooks.SelectedBookNumbers)
        {
            // Snapshot presence BEFORE delegating so we don't double-count
            // idempotent no-ops. ScriptureTemplateService.CreateOneBook
            // returns true for already-present books (per PT9
            // ScriptureTemplate.cs:50-51); we don't want to inflate
            // CreatedCount or bump LastCreatedBookNum in that case.
            bool wasAlreadyPresent = scrText.BookPresent(bookNum, true);

            bool success = ScriptureTemplateService.CreateOneBook(
                scrText,
                bookNum,
                createCV,
                useModel,
                modelScrText
            );

            if (!success)
                break;

            if (!wasAlreadyPresent)
            {
                createdCount++;
                lastCreatedBookNum = bookNum;
            }
        }

        return new CreateBooksResult(
            Success: true,
            LastCreatedBookNum: lastCreatedBookNum,
            Warnings: [],
            Errors: [],
            CreatedCount: createdCount
        );
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/ToolsMenu/CreateBooksForm.cs:225-239
    // Method: CreateBooksForm.CreateAvailableBookSet (private)
    // Maps to: EXT-004 (BHV-305 — available-book-set filter)
    //
    // EXPLANATION:
    // A book is "available for creation" iff:
    //   (a) it is not already in the project's BooksPresentSet, AND
    //   (b) it is either (non-canonical) or (canonical with more than one
    //       chapter/verse in the project's versification).
    //
    // Condition (b) is PT9's line-233 predicate, written as:
    //   (vers.GetLastChapter(b) != 1 || vers.GetLastVerse(b, 1) != 1
    //    || !Canon.IsCanonical(b))
    // which filters out canonical books whose versification declares only
    // chapter 1, verse 1 (placeholder entries). Non-canonical books are
    // unconditionally kept.
    //
    // PT9 selects the full-set source based on IsStudyBibleAdditions:
    // Study Bible projects restrict to non-canonical books. Non-SBA
    // projects iterate all books via Canon.AllBooks (equivalently: every
    // bookNum from 1 to Canon.LastBook). CAP-004 does not carry SBA
    // semantics (tracked in deferred-functionality.md), so we iterate
    // the full range and filter purely by the presence + (b) predicate.
    /// <summary>
    /// Returns the set of books available for creation in
    /// <paramref name="scrText"/> (all versification-defined books minus
    /// books already present). Maps to EXT-004, gm-005, TS-050.
    /// </summary>
    public static int[] GetAvailableBooksForCreation(ScrText scrText)
    {
        ScrVers vers = scrText.Settings.Versification;
        BookSet projectBooks = scrText.Settings.LocalBooksPresentSet;

        var result = new List<int>();
        for (int bookNum = 1; bookNum <= Canon.LastBook; bookNum++)
        {
            if (projectBooks.IsSelected(bookNum))
                continue;

            // PT9 line 233: canonical book with only a 1:1 versification
            // entry is treated as a placeholder and excluded; non-canonical
            // books are always kept (subject to the presence filter above).
            bool isCanonicalPlaceholder =
                Canon.IsCanonical(bookNum)
                && vers.GetLastChapter(bookNum) == 1
                && vers.GetLastVerse(bookNum, 1) == 1;
            if (isCanonicalPlaceholder)
                continue;

            result.Add(bookNum);
        }

        return [.. result];
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/ToolsMenu/CreateBooksForm.cs:248-288
    // Method: CreateBooksForm.CheckModelBooks (private)
    // Maps to: EXT-003 (BHV-306 — validation: model-book membership)
    //
    // EXPLANATION:
    // Collects the bookNums in selectedBooks that are NOT present in the
    // model project. Three outcomes:
    //   - no missing books      → Ok
    //   - all books missing     → Error (user cannot proceed; PT9 line 262)
    //   - some books missing    → Warning with AffectedBooks = missing list
    //                             (PT9 line 268-276; PT10 surfaces the list
    //                             to the UI so the user can confirm).
    //
    // An empty selection yields no missing books and therefore Ok —
    // empty-set enforcement (VAL-010) is the caller's responsibility.
    /// <summary>
    /// Verifies that <paramref name="modelScrText"/> contains every
    /// book in <paramref name="selectedBooks"/>. Some missing → Warning
    /// with AffectedBooks listing the missing books. All missing → Error.
    /// Maps to EXT-003, TS-054.
    /// </summary>
    public static ValidationResult CheckModelBooks(BookSet selectedBooks, ScrText modelScrText)
    {
        var selected = selectedBooks.SelectedBookNumbers.ToList();
        var missing = selected.Where(bookNum => !modelScrText.BookPresent(bookNum)).ToList();

        if (missing.Count == 0)
            return ValidationResult.Ok();

        if (missing.Count == selected.Count)
            return ValidationResult.Error(
                $"Unable to create book(s) because these book(s) are not in the model project {modelScrText.Name}.",
                [.. missing]
            );

        return ValidationResult.Warning(
            $"The model project {modelScrText.Name} does not have {missing.Count} of the selected book(s).",
            [.. missing]
        );
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/ToolsMenu/CreateBooksForm.cs:298-316
    // Method: CreateBooksForm.CheckVersification (private)
    // Maps to: EXT-003 (BHV-306, INV-023 — versification mismatch warning)
    //
    // PT10 simplification (vs PT9 line 301):
    // PT9 suppresses the warning unless the project already has at least
    // one canonical book present:
    //   scrText.Settings.LocalBooksPresentSet.SelectedBookNumbers
    //          .Any(Canon.IsCanonical)
    // That suppression is a UX nicety for projects containing only
    // non-canonical books. For PT10, INV-023 is stated in business-rules.md
    // as a pure "project.vers != model.vers → warning" invariant, and
    // the service/wire layer tests exercise the mismatch path with no
    // canonical books seeded. Dropping the secondary guard keeps the
    // orchestrator's behaviour deterministic and matches the invariant.
    /// <summary>
    /// Warns when <paramref name="projectScrText"/> and
    /// <paramref name="modelScrText"/> use different versifications.
    /// Maps to EXT-003, TS-053, INV-023.
    /// </summary>
    public static ValidationResult CheckVersification(ScrText projectScrText, ScrText modelScrText)
    {
        if (projectScrText.Settings.Versification.Name != modelScrText.Settings.Versification.Name)
            return ValidationResult.Warning(
                $"{projectScrText.Name} uses {projectScrText.Settings.Versification.Name} versification. "
                    + $"Model {modelScrText.Name} uses {modelScrText.Settings.Versification.Name} versification."
            );

        return ValidationResult.Ok();
    }

    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/ToolsMenu/CreateBooksForm.cs:116-124 (VAL-009 guard)
    //   + CreateBooksForm.cs:154-163 (composite CheckModelBooks + CheckVersification)
    // Method: CreateBooksForm.cmdOK_Click (pre-flight validation branch)
    // Maps to: EXT-003 (BHV-306, VAL-009)
    //
    // EXPLANATION:
    // Composite pre-flight:
    //   1. FromTemplate + modelScrText == null → Error ("Please select
    //      model text") — VAL-009; PT9 line 120-123.
    //   2. FromTemplate + model present → CheckModelBooks first (PT9
    //      line 156); if that fails (Warning or Error) return it;
    //      otherwise run CheckVersification (PT9 line 160).
    //   3. Any other method (Empty / ChapterVerse) → Ok.
    //
    // The orchestrator does not short-circuit on Warning from
    // CheckModelBooks (PT9 surfaces the confirmation dialog to the user);
    // we return the first non-Ok result so the caller can decide.
    /// <summary>
    /// Composes CheckModelBooks + CheckVersification for a single
    /// validate-create-books request. VAL-009 (model project required
    /// for FromTemplate) returns Error severity at this layer.
    /// Maps to Section 4.5.
    /// </summary>
    public static ValidationResult ValidateCreateBooks(
        ScrText scrText,
        BookSet selectedBooks,
        CreationMethod creationMethod,
        ScrText? modelScrText
    )
    {
        if (creationMethod != CreationMethod.FromTemplate)
            return ValidationResult.Ok();

        if (modelScrText == null)
            return ValidationResult.Error(SelectModelTextMessage);

        ValidationResult modelCheck = CheckModelBooks(selectedBooks, modelScrText);
        if (modelCheck.Severity != ValidationSeverity.Ok)
            return modelCheck;

        return CheckVersification(scrText, modelScrText);
    }
}
