using System;
using System.Collections.Generic;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: data-contracts.md §2.3 — the wire-stable input record for M-003
//   performRestore (CAP-004). Replaces PT9's RestoreForm.cmdOK_Click implicit
//   state (the form holds the chosen destination, the selected file checkboxes,
//   and the user's prior Yes/No on the shared-project warning) with a typed
//   request the JSON-RPC layer can deserialize.
//
// Scope cut (Decision 24 / FN-010): DestinationProjectId is narrowed from
// `string?` (null meant restore-as-new) to required `string` (overlay only).
// New-project restore is deferred until PT10 gains a create-project primitive;
// the field-narrowing is captured in the §2.3 changelog.
//
// Maps to: data-contracts.md §2.3 (C# block).
// Behaviors: BHV-105 (PerformRestore overlay), BHV-323 (shared-project warning),
//            BHV-319 (per-file downgrade — VAL-B07).

/// <summary>
/// Wire-stable input for
/// <see cref="BackupRestoreDataProvider.PerformRestoreAsync"/> (M-003). One
/// instance per restore attempt — the caller re-invokes with this same shape
/// after acknowledging any <see cref="RestoreOperationResult.ConfirmationRequired"/>
/// the previous call returned (e.g., by flipping
/// <see cref="AcknowledgedSharedProjectWarning"/> from <c>false</c> to <c>true</c>
/// or appending file ids to <see cref="AcknowledgedDowngradeFileIds"/>).
/// </summary>
internal sealed record RestoreRequest
{
    /// <summary>
    /// Session id returned by <c>openRestoreSession</c> (M-002 / CAP-003). Must
    /// reference a live session in
    /// <see cref="BackupRestoreDataProvider.SessionRegistry"/>; otherwise the
    /// wire layer returns
    /// <see cref="RestoreOperationErrorCode.InvalidSession"/>.
    /// </summary>
    public string SessionId { get; init; } = string.Empty;

    /// <summary>
    /// Target project id (HexId form) — destination project must already exist
    /// locally per FN-010 scope cut. Must reference an editable, non-resource
    /// project, and the current user must be project Administrator per
    /// <c>VAL-B05</c> / <c>BHV-325</c> / <c>EXT-203</c> / <c>ALIGNMENT-005</c>.
    /// </summary>
    /// <remarks>
    /// [Updated 2026-05-19 — Decision 24 / FN-010: type narrowed from
    /// <c>string?</c> to required <c>string</c>. Original semantic preserved
    /// for re-add: "or null to restore as a NEW project (BHV-106 / EXT-202).
    /// When null, the backend creates a new project under
    /// <c>&lt;SettingsDirectory&gt;/&lt;projectNameFromBackup&gt;</c>."]
    /// </remarks>
    public string DestinationProjectId { get; init; } = string.Empty;

    /// <summary>
    /// File ids (from <c>RestorerMetadata.AllFiles[].Id</c>) the caller wants
    /// restored. Must be a subset of the session's file list. PT9 default is
    /// <c>IsNormallyRestored</c> per file (<c>BHV-319</c> / <c>EXT-200</c>);
    /// caller may override.
    /// </summary>
    public IReadOnlyList<string> SelectedFileIds { get; init; } = Array.Empty<string>();

    /// <summary>
    /// User-confirmation flag for the shared-project warning
    /// (<c>BHV-323</c> / <c>INV-B06</c> / <c>EXT-201</c>). If the session
    /// reported <c>SharedProjectMarkers == true</c> and the user opted to
    /// proceed, caller passes <c>true</c> here. Backend then strips permission
    /// files from the restore set. If the session reported shared markers and
    /// this flag is <c>false</c>, backend returns
    /// <see cref="RestoreOperationResult.ConfirmationRequired"/> with
    /// <see cref="ConfirmationKind.SharedProjectWarning"/>.
    /// </summary>
    public bool AcknowledgedSharedProjectWarning { get; init; }

    /// <summary>
    /// User-confirmation list for per-row "Downgrade" warnings (<c>VAL-B07</c> /
    /// <c>BHV-319</c> <c>OkToRestoreFile</c>). File ids the user confirmed they
    /// want to restore despite being older versions. Backend cross-checks
    /// against <see cref="SelectedFileIds"/>: any selected file whose
    /// <see cref="ComparisonResult"/> is
    /// <see cref="ComparisonResult.DestIsHigherVersion"/> must appear here.
    /// Otherwise the backend returns
    /// <see cref="RestoreOperationResult.ConfirmationRequired"/> with
    /// <see cref="ConfirmationKind.DowngradeFiles"/> and the missing ids in
    /// <c>RequiresDowngradeConfirmation</c>.
    /// </summary>
    public IReadOnlyList<string> AcknowledgedDowngradeFileIds { get; init; } =
        Array.Empty<string>();

    /// <summary>
    /// User-confirmation flag for the persist-current-changes prompt
    /// (<c>BHV-317</c> / <c>TS-072</c>). When the destination project has
    /// pending in-memory edits, PT9's <c>cmbScrTextDest_SelectedIndexChanged</c>
    /// asks the user whether to persist; declining cancels the restore. PT10
    /// surfaces this as a wire-level confirmation: when <c>false</c> and the
    /// destination is dirty, the backend returns
    /// <see cref="RestoreOperationResult.ConfirmationRequired"/> with
    /// <see cref="ConfirmationKind.PersistCurrentChanges"/>.
    /// </summary>
    public bool AcknowledgedPersistCurrentChanges { get; init; }
}
