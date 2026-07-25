namespace Paranext.DataProvider.Projects;

/// <summary>
/// One project's persisted metadata in a <see cref="ProjectMetadataSnapshot"/>. Captures exactly
/// what is needed to (a) serve the project lists before the full scan
/// (the display fields, mirroring <c>ScrTextExtensions.GetProjectDetails</c>) and (b) construct
/// the project's <c>ScrText</c> on a targeted pre-scan load (the path/partition fields).
/// ProjectInterfaces are deliberately NOT persisted; they are re-derived at load via
/// <see cref="LocalParatextProjects.GetParatextProjectInterfaces"/> so interface-list changes
/// never require a snapshot invalidation.
/// </summary>
/// <param name="Name">Short project name (<c>ScrText.Name</c>).</param>
/// <param name="HomeDirectory">
/// The project's directory (<c>ScrText.Directory</c>). For resources this is the container
/// directory, not the resource file - which is why <paramref name="FullPath"/> is also required.
/// </param>
/// <param name="FullPath">
/// The <c>ProjectName.ProjectPath</c> (<c>ScrText.FullPath</c>): the project folder for
/// folder-backed projects, or the <c>.p8z</c>/<c>.xml1z</c> file for resources. Used for the
/// liveness check and to reconstruct the <c>ProjectName</c> on a targeted load.
/// </param>
/// <param name="IsResource">
/// Whether the project is a published resource (<c>ScrText.IsResourceProject</c>). Drives the
/// published/unpublished partition, the serve-time registration filter, and interface
/// re-derivation.
/// </param>
/// <param name="IsXmlResource">Whether the backing file is an XML resource
/// (<c>.xml1z</c>).</param>
/// <param name="IsJoined">
/// Whether the entry was captured from a <c>JoinedScrText</c> (e.g. joined HEB/GRK). Joined texts
/// are assembled by the full scan and are never targeted-loaded from a snapshot entry.
/// </param>
/// <param name="FullName">The <c>FullName</c> Paratext setting, if present.</param>
/// <param name="Language">The <c>Language</c> Paratext setting, if present.</param>
/// <param name="LanguageTag">BCP-47 language tag (see
/// <c>ScrTextExtensions.GetLanguageTag</c>).</param>
/// <param name="IsEditable">Whether the project's primary content is editable.</param>
/// <param name="Id">Project ID (uppercase hex, matching <c>ProjectMetadata.Id</c>).</param>
internal record ProjectMetadataSnapshotEntry(
    string Name,
    string HomeDirectory,
    string FullPath,
    bool IsResource,
    bool IsXmlResource,
    bool IsJoined,
    string? FullName,
    string? Language,
    string LanguageTag,
    bool IsEditable,
    string Id
);
