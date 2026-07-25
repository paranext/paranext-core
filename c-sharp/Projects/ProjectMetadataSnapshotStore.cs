using System.Text.Json;
using Paratext.Data;
using SIL.Scripture;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Loads and writes the persisted project-metadata snapshot
/// (<c>&lt;ProjectRootFolder&gt;/platformBibleProjectMetadataCache.json</c>) that lets
/// <see cref="LocalParatextProjects"/> serve project lists (and targeted project loads) before the
/// full ParatextData scan completes at startup.
///
/// Invalidation is strict: a missing file, unparseable JSON, a
/// <see cref="SCHEMA_VERSION"/> mismatch, or an app-version mismatch all load as null so the
/// caller falls back to today's scan-first flow. Registration state is deliberately NOT an
/// invalidation key - it is applied as a serve-time filter by the caller (mirroring
/// <c>LocalParatextProjects.GetVisibleScrTexts</c>).
///
/// Thread safety: writes are serialized by an instance lock and performed atomically (serialize to
/// a sibling <c>.tmp</c> file, then move over the target with overwrite), so a reader never
/// observes a partially-written snapshot and a crash mid-write leaves the previous snapshot
/// intact. Neither <see cref="TryLoad"/> nor <see cref="WriteSnapshot"/> ever throws to callers.
/// </summary>
internal sealed class ProjectMetadataSnapshotStore(string projectRootFolder)
{
    /// <summary>
    /// Snapshot format version. Bump whenever <see cref="ProjectMetadataSnapshot"/> or
    /// <see cref="ProjectMetadataSnapshotEntry"/> changes shape/semantics so older snapshots are
    /// discarded instead of misread. History: 2 = joined entries persist the OT member's path as
    /// <c>FullPath</c> (v1 persisted null there, which could never pass the liveness check).
    /// </summary>
    public const int SCHEMA_VERSION = 2;

    /// <summary>Snapshot file name inside the project root folder.</summary>
    public const string SNAPSHOT_FILE_NAME = "platformBibleProjectMetadataCache.json";

    private readonly string _snapshotFilePath = Path.Combine(projectRootFolder, SNAPSHOT_FILE_NAME);
    private readonly object _writeLock = new();

    /// <summary>
    /// Loads the snapshot if it exists and is valid for <paramref name="appVersion"/>. Returns
    /// null on ANY invalidity (missing file, parse failure, schema or app-version mismatch) and
    /// never throws, so a bad snapshot degrades to the normal scan-first startup.
    /// </summary>
    public ProjectMetadataSnapshot? TryLoad(string appVersion)
    {
        try
        {
            if (!File.Exists(_snapshotFilePath))
                return null;

            var snapshot = JsonSerializer.Deserialize<ProjectMetadataSnapshot>(
                File.ReadAllText(_snapshotFilePath)
            );
            if (snapshot == null)
                return null;
            if (snapshot.SchemaVersion != SCHEMA_VERSION)
                return null;
            if (snapshot.AppVersion != appVersion)
                return null;
            // A hand-edited/partial file can deserialize with a missing Projects array; treat it
            // as invalid rather than serving an empty project list.
            if (snapshot.Projects == null)
                return null;
            return snapshot;
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(
                $"Could not load project metadata snapshot '{_snapshotFilePath}'; "
                    + $"falling back to a full project scan: {ex}"
            );
            return null;
        }
    }

    /// <summary>
    /// Atomically replaces the snapshot with <paramref name="entries"/> for
    /// <paramref name="appVersion"/>. Lock-serialized; failures are logged and swallowed (a
    /// missing/stale snapshot only costs the next startup its head start, and must never fail the
    /// operation that triggered the write).
    /// </summary>
    public void WriteSnapshot(List<ProjectMetadataSnapshotEntry> entries, string appVersion)
    {
        try
        {
            lock (_writeLock)
            {
                var snapshot = new ProjectMetadataSnapshot(
                    SCHEMA_VERSION,
                    appVersion,
                    DateTimeOffset.UtcNow,
                    entries
                );
                string temporaryPath = _snapshotFilePath + ".tmp";
                File.WriteAllText(temporaryPath, JsonSerializer.Serialize(snapshot));
                File.Move(temporaryPath, _snapshotFilePath, overwrite: true);
            }
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine(
                $"Could not write project metadata snapshot '{_snapshotFilePath}': {ex}"
            );
        }
    }

    /// <summary>
    /// Captures snapshot entries from live <see cref="ScrText"/>s. Reuses
    /// <see cref="ScrTextExtensions.GetProjectDetails"/> for the display fields so the snapshot
    /// serves exactly what live enumeration would. A per-project failure is logged and skipped
    /// (mirroring live enumeration's per-project isolation) rather than failing the whole capture.
    /// </summary>
    public static List<ProjectMetadataSnapshotEntry> BuildEntries(IEnumerable<ScrText> scrTexts)
    {
        List<ProjectMetadataSnapshotEntry> entries = [];
        foreach (ScrText scrText in scrTexts)
        {
            try
            {
                ProjectDetails details = scrText.GetProjectDetails();
                // A JoinedScrText (e.g. joined HEB/GRK) is assembled from member texts and has no
                // ProjectName path of its own (ScrText.FullPath is null). Persist the OT member's
                // path instead - the joined text already delegates FileManager/Settings to the OT
                // text - so the liveness check has a real file/folder to verify. GetJoinedText
                // with an OT book number returns the OT member (NT and DC books route to the
                // other members; everything else is the OT text).
                string fullPath = scrText is JoinedScrText joinedScrText
                    ? joinedScrText.GetJoinedText(Canon.FirstBook).FullPath
                    : scrText.FullPath;
                entries.Add(
                    new ProjectMetadataSnapshotEntry(
                        Name: scrText.Name,
                        HomeDirectory: scrText.Directory,
                        FullPath: fullPath,
                        IsResource: scrText.IsResourceProject,
                        IsXmlResource: scrText.IsXmlResource,
                        IsJoined: scrText is JoinedScrText,
                        FullName: details.Metadata.FullName,
                        Language: details.Metadata.Language,
                        // GetProjectDetails always populates these two; the fallbacks only guard
                        // the nullable metadata contract.
                        LanguageTag: details.Metadata.LanguageTag ?? "en",
                        IsEditable: details.Metadata.IsEditable ?? false,
                        Id: details.Metadata.Id
                    )
                );
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine(
                    $"Skipping project '{scrText.Name}' in the metadata snapshot; could not read "
                        + $"its details: {ex}"
                );
            }
        }
        return entries;
    }
}
