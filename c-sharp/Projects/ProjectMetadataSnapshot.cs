namespace Paranext.DataProvider.Projects;

/// <summary>
/// Persisted snapshot of cheap per-project display metadata, written at the end of each full
/// project scan and loaded at the next startup so project lists can be served before that run's
/// scan completes (see <see cref="ProjectMetadataSnapshotStore"/>).
/// </summary>
/// <param name="SchemaVersion">
/// Snapshot format version (<see cref="ProjectMetadataSnapshotStore.SCHEMA_VERSION"/>). A mismatch
/// invalidates the whole snapshot.
/// </param>
/// <param name="AppVersion">
/// Application version that wrote the snapshot. A mismatch invalidates the whole snapshot so a
/// version upgrade always starts from a fresh scan.
/// </param>
/// <param name="WrittenAt">When the snapshot was written (diagnostics only, not an invalidation
/// key).</param>
/// <param name="Projects">The per-project entries captured at the end of the last full scan.</param>
internal record ProjectMetadataSnapshot(
    int SchemaVersion,
    string AppVersion,
    DateTimeOffset WrittenAt,
    List<ProjectMetadataSnapshotEntry> Projects
);
