using System;
using System.Collections.Generic;

namespace Paranext.DataProvider.BackupRestore;

// === NEW IN PT10 ===
// Reason: CAP-004 inner contract — the payload `RestoreOrchestrator.ExecuteOverlay`
//   passes to `IRestorerHandle.PerformOverlayRestore`. This is the boundary
//   between the orchestrator (which owns lock acquisition, Theme-6 emission,
//   and result classification) and the handle (which owns the file-copy /
//   ScrText.Save mechanics ported from PT9's Restorer.PerformRestore body).
//
// Carries:
//   * SelectedFileIds        — post-shared-project-filter file ids to extract
//   * IsLegacyBackup         — drives the PTX-20538 fields-to-skip augmentation
//                              (INV-A13 / TS-020). The handle uses this when
//                              copying Settings.xml to decide whether to
//                              extend `paramsNotToCopyWhenOverwriting` with
//                              Language / LanguageIsoCode / TranslationInfo.
//   * AcknowledgedDowngradeFileIds — pre-validated downgrade acknowledgements;
//                              the orchestrator has already checked the request
//                              fulfils VAL-B07 before invoking the handle, but
//                              the field is passed through so the handle can
//                              cross-reference on its side if it chooses.
//
// Maps to: data-contracts.md §4.3 (M-003 postconditions); INV-A13 (PTX-20538);
//   strategic-plan-backend.md §CAP-004 ("PTX-20538 (INV-A13): CN preservation
//   — Language/IsoCode/TranslationInfo fields skipped only when
//   IsLegacyProjectBackup").

/// <summary>
/// Inner-orchestrator payload passed from
/// <see cref="RestoreOrchestrator"/>.ExecuteOverlay to
/// <see cref="IRestorerHandle.PerformOverlayRestore"/>. Captures the
/// minimum information the handle needs to extract the selected files,
/// honor the PTX-20538 legacy-skip-list augmentation, and stop at the
/// boundary the orchestrator owns (WriteLock, Theme-6 emission).
/// </summary>
internal sealed record RestoreOverlayRequest
{
    /// <summary>
    /// File ids (from <c>RestorerMetadata.AllFiles[].Id</c>) the handle must
    /// extract. Already filtered by
    /// <see cref="SharedProjectFilterService"/> when the caller acknowledged
    /// the shared-project warning — so this list never contains
    /// <c>ProjectUserAccess.xml</c> etc. on the acknowledged path.
    /// </summary>
    public IReadOnlyList<string> SelectedFileIds { get; init; } = Array.Empty<string>();

    /// <summary>
    /// Whether the backup ZIP is a legacy ParatextData backup
    /// (<see cref="RestorerMetadata.IsLegacyBackup"/>). When <c>true</c>, the
    /// handle MUST augment its fields-to-skip list with
    /// <c>Setting.Language</c>, <c>Setting.LanguageIsoCode</c>, and
    /// <c>Setting.TranslationInfo</c> per PTX-20538 / INV-A13 — preserving the
    /// destination's CN-type across the restore.
    /// </summary>
    public bool IsLegacyBackup { get; init; }

    /// <summary>
    /// File ids the caller acknowledged for downgrade (per
    /// <c>VAL-B07</c>). The orchestrator pre-validates the request to ensure
    /// every selected <see cref="ComparisonResult.DestIsHigherVersion"/> file
    /// is acknowledged before invoking the handle — but the field is passed
    /// through so the handle can cross-reference its own side if it chooses.
    /// </summary>
    public IReadOnlyList<string> AcknowledgedDowngradeFileIds { get; init; } =
        Array.Empty<string>();
}
