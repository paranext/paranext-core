namespace Paranext.DataProvider.BackupRestore;

/// <summary>
/// Pure-function validators for the BackupForm OK-gate (EXT-102 + EXT-103 / BHV-308).
/// </summary>
/// <remarks>
/// <para>
/// CAP-014 capability. Two stateless, side-effect-free rule chains:
/// </para>
/// <list type="bullet">
///   <item><see cref="ValidateData"/> (EXT-102) — the 3-rule chain over project type,
///   user-name, and destination-spec; returns a <see cref="BackupValidationResult"/>
///   carrying the first failure (or success).</item>
///   <item><see cref="IsOkGateOpen"/> (EXT-103) — the composite cmdOK gate combining
///   <see cref="ValidateData"/>'s output with the book-count rule (with Notes-type
///   bypass per INV-B03) and the non-empty destination requirement.</item>
/// </list>
///
/// <para>
/// PT9 origin:
/// </para>
/// <list type="bullet">
///   <item><c>Paratext/BackupRestore/BackupForm.cs:220-249</c> —
///   <c>BackupForm.ValidateData()</c></item>
///   <item><c>Paratext/BackupRestore/BackupForm.cs:98-115</c> —
///   <c>BackupForm.EnableDisableControls()</c> (specifically the gate at lines 112-114)</item>
/// </list>
///
/// <para>
/// PT10 deltas vs PT9: rule semantics are byte-for-byte identical. The PT9 code uses
/// <c>ErrorProvider.SetError(control, message)</c> side-effects to surface errors; the
/// PT10 port returns the first failing rule as a <see cref="BackupValidationResult"/>
/// so the validation is pure / testable. <c>ErrorKey</c> values become
/// localize-key placeholders (<c>%backup_*%</c>) instead of pre-localized English —
/// the wire-boundary <c>Loc</c> helper in <c>BackupRestoreDataProvider</c> resolves
/// them on the way out. Notes-bypass logic is unchanged (INV-B03).
/// </para>
/// </remarks>
internal static class BackupValidationService
{
    // Windows invalid path characters used by IsFileSpecValid — the union returned by
    // Path.GetInvalidPathChars() on Windows, minus the C0 control-char range (\0..\x1F),
    // which IsFileSpecValid checks separately as a range. Hard-coded so the file-spec
    // validator is consistent across host OS (PT9 was Windows-only; macOS / Linux's
    // Path.GetInvalidPathChars() returns only {'\0', '/'} and would otherwise diverge).
    private static readonly char[] WindowsInvalidPathChars = { '<', '>', ':', '"', '|', '?', '*' };

    // === PORTED FROM PT9 ===
    // Source: Paratext/BackupRestore/BackupForm.cs:220-249 (ValidateData)
    // Maps to: EXT-102 / BHV-308 / INV-B01 / INV-B02 / INV-B04 / VAL-B01 / VAL-B02 / VAL-B03
    /// <summary>
    /// Runs the 3-rule validation chain over the BackupForm input state. The first
    /// failing rule short-circuits — later rules are not evaluated. All-pass returns
    /// a sentinel <see cref="BackupValidationResult"/> with <c>IsValid=true</c> and
    /// empty <c>ErrorKey</c> / <c>ErrorField</c>.
    /// </summary>
    /// <remarks>
    /// <para>The rules, in evaluation order:</para>
    /// <list type="number">
    ///   <item>If <paramref name="isProtectedText"/> is <c>true</c> (resource project)
    ///   → <c>(false, "%backup_resourceProjectNotBackupable%", "projectId")</c>
    ///   (INV-B01 / VAL-B01).</item>
    ///   <item>If <paramref name="userName"/> is empty
    ///   → <c>(false, "%backup_userNameRequired%", "userName")</c>
    ///   (INV-B02 / VAL-B02 / BHV-T003).</item>
    ///   <item>If <paramref name="destFileSpec"/> fails the file-spec validity check
    ///   → <c>(false, "%backup_invalidDestPath%", "destinationPath")</c>
    ///   (INV-B04 / VAL-B03).</item>
    /// </list>
    /// <para>
    /// PT9 file-spec check (<c>FileUtils.FileSpecIsValid</c>) is a path-character
    /// validator — it does NOT touch the filesystem. PT10 port must preserve that
    /// purity (no I/O).
    /// </para>
    /// </remarks>
    /// <param name="isProtectedText">
    /// Whether the project is a resource (<c>ScrText.IsProtectedText</c>) — resources
    /// cannot be backed up.
    /// </param>
    /// <param name="userName">
    /// The "Your name" field. Any non-empty string passes rule 2 (no format check —
    /// <c>"."</c> is accepted per TS-059 / BHV-T003).
    /// </param>
    /// <param name="destFileSpec">
    /// The destination ZIP path. Must satisfy the file-spec character validator.
    /// </param>
    /// <returns>
    /// A <see cref="BackupValidationResult"/> carrying either the first failure or the
    /// all-pass sentinel.
    /// </returns>
    public static BackupValidationResult ValidateData(
        bool isProtectedText,
        string userName,
        string destFileSpec
    )
    {
        // EXPLANATION:
        // PT9's three independent `if/return false` blocks become three short-circuit
        // checks here. Order matters: rule 1 (resource project) wins over rule 2
        // (empty userName) wins over rule 3 (invalid path), matching the precedence
        // implied by PT9's `return false;` after each ErrorProvider.SetError call.
        // Test cases 2 + 4 + the first-failure tests pin this ordering.
        if (isProtectedText)
            return new BackupValidationResult(
                false,
                "%backup_resourceProjectNotBackupable%",
                "projectId"
            );

        if (string.IsNullOrEmpty(userName))
            return new BackupValidationResult(false, "%backup_userNameRequired%", "userName");

        if (!IsFileSpecValid(destFileSpec))
            return new BackupValidationResult(false, "%backup_invalidDestPath%", "destinationPath");

        // All-pass sentinel: IsValid=true, both error fields empty strings (not null).
        return new BackupValidationResult(true, "", "");
    }

    // === PORTED FROM PT9 ===
    // Source: Paratext/BackupRestore/BackupForm.cs:98-115 (EnableDisableControls), lines 112-114
    // Maps to: EXT-103 / BHV-308 / INV-B03 / VAL-B04
    /// <summary>
    /// Returns whether the BackupForm's cmdOK button should be enabled, given a
    /// pre-computed <see cref="ValidateData"/> result plus the book-count, project
    /// kind, and destination-non-empty inputs.
    /// </summary>
    /// <remarks>
    /// <para>
    /// The composite gate is:
    /// </para>
    /// <code>
    /// result.IsValid
    ///   AND (selectedBookCount &gt; 0 OR isNoteType)   // INV-B03 Notes-bypass
    ///   AND destFileSpec is non-empty                  // VAL-B04 (gate only, no message)
    /// </code>
    /// <para>
    /// Notes-type projects (Translation type's <c>IsNoteType()</c> returns true)
    /// bypass the book-count rule (INV-B03) — they can be backed up with 0 selected
    /// books. The empty-dest case (TS-061 / VAL-B04) disables the OK button without
    /// producing an <c>ErrorKey</c>: the gate alone communicates the disabled state.
    /// </para>
    /// </remarks>
    /// <param name="result">
    /// The output of <see cref="ValidateData"/>. If <c>result.IsValid == false</c>
    /// the gate short-circuits to <c>false</c>.
    /// </param>
    /// <param name="selectedBookCount">
    /// Number of books selected in the BookChooser. Must be &gt; 0 unless
    /// <paramref name="isNoteType"/> is <c>true</c>.
    /// </param>
    /// <param name="isNoteType">
    /// Whether the project is a CN-type / Notes-type
    /// (<c>scrText.Settings.TranslationInfo.Type.IsNoteType()</c>).
    /// </param>
    /// <param name="destFileSpec">
    /// The destination ZIP path. Must be non-empty (but its character validity is
    /// already covered by <see cref="ValidateData"/>'s rule 3).
    /// </param>
    /// <returns>
    /// <c>true</c> when all three composite conditions hold; <c>false</c> otherwise.
    /// </returns>
    public static bool IsOkGateOpen(
        BackupValidationResult result,
        int selectedBookCount,
        bool isNoteType,
        string destFileSpec
    )
    {
        // Composite gate (PT9 BackupForm.cs:112-114):
        //   cmdOK.Enabled = ValidateData()
        //                && (selectedBooks.Count > 0 || isNoteType)     // INV-B03 Notes-bypass
        //                && txtTo.Text != "";                            // VAL-B04 gate-only
        return result.IsValid
            && (selectedBookCount > 0 || isNoteType)
            && !string.IsNullOrEmpty(destFileSpec);
    }

    // === NEW IN PT10 ===
    // Reason: PT9 used FileUtils.FileSpecIsValid (a Windows-targeted character validator
    // that ships with the WinForms-era Paratext codebase). That helper is not present in
    // paranext-core. This is a minimal port preserving PT9's intent: reject paths
    // containing characters that are illegal on the Windows file system. We hard-code
    // the Windows invalid-char set rather than calling Path.GetInvalidPathChars(), since
    // the latter is platform-dependent (macOS returns only '\0' and '/', which would
    // accept Windows-invalid strings like "<illegal:chars>" — diverging from PT9's
    // Windows-only behaviour). PT9 was Windows-only, so its validator effectively used
    // the Windows set on every install; we replicate that here regardless of host OS.
    // Maps to: EXT-102 (rule 3 — `!FileUtils.FileSpecIsValid(txtTo.Text)`)
    /// <summary>
    /// Returns whether <paramref name="fileSpec"/> contains only characters that are
    /// legal in a Windows path. A minimal port of PT9's <c>FileUtils.FileSpecIsValid</c>
    /// preserving its Windows-set semantics on every host OS.
    /// </summary>
    /// <remarks>
    /// Empty strings are treated as valid here — the empty-dest case is handled
    /// separately by <see cref="IsOkGateOpen"/>'s non-empty check (VAL-B04 is a
    /// gate-only failure, not a <see cref="ValidateData"/> error). Null is treated
    /// as invalid (defensive — PT9's <c>txtTo.Text</c> can never be null but the
    /// PT10 contract doesn't enforce that).
    /// </remarks>
    private static bool IsFileSpecValid(string fileSpec)
    {
        if (fileSpec == null)
            return false;

        // EXPLANATION:
        // Two-part rejection: (a) any C0 control char (\0..\x1F) — a contiguous range,
        // so a single comparison is more compact than enumerating 32 chars in a set; and
        // (b) any character in WindowsInvalidPathChars — the fixed Windows path-illegal
        // set declared at the top of the class. Empty strings pass here — the empty-dest
        // case is gate-only and handled by IsOkGateOpen (VAL-B04).
        foreach (char c in fileSpec)
        {
            if (c < 32)
                return false;
            if (Array.IndexOf(WindowsInvalidPathChars, c) >= 0)
                return false;
        }

        return true;
    }
}
