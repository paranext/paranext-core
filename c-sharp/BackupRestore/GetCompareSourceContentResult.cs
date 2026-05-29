namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: data-contracts.md §3.12 — the wire-stable return envelope for M-011
//   getCompareSourceContent. Discriminated union of two cases:
//     * Success(string Text) — the chapter or whole-book text the caller
//       requested. Empty string is a VALID Success result (chapter absent in
//       the source — the DifferencesToolView renders a blank pane).
//     * Error(GetCompareSourceContentErrorCode, string) — wire-stable error
//       envelope per the §4.7 error matrix. No exceptions cross the wire
//       boundary.
//
// PT9 anchor: none direct — PT9 returned `string` from IGetText.GetText and
//   relied on the in-process caller to handle empty/null. The wire envelope is
//   PT10-only because the React UI is process-separate.
//
// Maps to: data-contracts.md §3.12 (C# block).
// Behaviors: BHV-500 / BHV-501 / BHV-502 (closes the chain transitively).

/// <summary>
/// Return envelope for
/// <see cref="BackupRestoreDataProvider.GetCompareSourceContentAsync"/>.
/// Discriminated union of two cases — see <see cref="Success"/> and
/// <see cref="Error"/>. No exceptions cross the wire boundary per
/// data-contracts.md §3.12.
/// </summary>
internal abstract record GetCompareSourceContentResult
{
    /// <summary>
    /// The text was read successfully. <paramref name="Text"/> is the raw
    /// USFM at the requested granularity (chapter when
    /// <see cref="GetCompareSourceContentRequest.SingleChapter"/> is
    /// <c>true</c>; whole book when <c>false</c>). Empty string is valid —
    /// the caller (DifferencesToolView) renders it as a blank pane rather
    /// than an error per data-contracts.md §4.7.
    /// </summary>
    /// <param name="Text">The raw USFM content (may be empty).</param>
    public sealed record Success(string Text) : GetCompareSourceContentResult;

    /// <summary>
    /// The wire layer (or the resolver) rejected the request — see
    /// <see cref="GetCompareSourceContentErrorCode"/> for the discrete codes
    /// and data-contracts.md §4.7 for the localize-key matrix.
    /// </summary>
    /// <param name="ErrorCode">Discrete error code per
    /// <see cref="GetCompareSourceContentErrorCode"/>.</param>
    /// <param name="ErrorKey">Wire-stable localize key (e.g.
    /// <c>%restore_invalidSession%</c> /
    /// <c>%compare_invalidSourceToken%</c>) the React UI resolves via the
    /// localization service.</param>
    public sealed record Error(GetCompareSourceContentErrorCode ErrorCode, string ErrorKey)
        : GetCompareSourceContentResult;
}
