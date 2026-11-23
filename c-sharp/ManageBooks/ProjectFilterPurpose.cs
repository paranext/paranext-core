namespace Paranext.DataProvider.ManageBooks;

// === PORTED FROM PT9 CONTRACT ===
// Source: .context/features/manage-books/data-contracts.md Section 2.8
// Maps to: EXT-014 (BHV-411)
//
// STUB — Test Writer RED skeleton for CAP-011.
// Enum is pure data; implementer may keep this file as-is.

/// <summary>
/// Identifies the intended use of a project filter request. The
/// <see cref="ProjectFilterService"/> dispatches on this value.
/// </summary>
public enum ProjectFilterPurpose
{
    /// <summary>Destination project for Copy Books; applies BHV-603/606 source-type rules (delegates to CAP-008).</summary>
    CopyDestination,

    /// <summary>Source project for Delete Books; editable scripture projects only.</summary>
    DeleteSource,

    /// <summary>Model project for Create Books; all scripture projects (read-only access sufficient).</summary>
    ModelProject,

    /// <summary>All scripture projects regardless of editability.</summary>
    AllScripture,

    /// <summary>Scripture projects where <c>IsEditable</c> is true.</summary>
    EditableTexts,
}
