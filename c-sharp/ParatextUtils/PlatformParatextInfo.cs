using System.Text.RegularExpressions;
using Paratext.Data;

namespace Paranext.DataProvider.ParatextUtils;

/// <summary>
/// Decides where ParatextData keeps its per-user files (<c>RegistrationInfo.xml</c>,
/// <c>InternetSettings.xml</c>, Mercurial and feedback files). ParatextData's own implementation
/// names the folder after <see cref="ParatextInfo.ParatextVersion"/>, which Platform.Bible sets to
/// <c>10.&lt;app major&gt;.&lt;minor&gt;.&lt;patch&gt;</c>, and seeds a new folder by copying from the
/// highest-named <c>Paratext*</c> folder. That breaks three ways for Platform.Bible:
/// <list type="bullet">
/// <item>An app major version bump renames the folder (<c>Paratext100</c> → <c>Paratext101</c>),
/// and because ParatextData orders folder names as strings, <c>Paratext95</c> sorts above
/// <c>Paratext100</c> — so the new folder is re-seeded from Paratext 9 and every registration or
/// internet-settings change made in Platform.Bible is silently lost.</item>
/// <item>ParatextData caches the folder on first access, so anything that reads it before the
/// version is changed pins Platform.Bible to Paratext 9's own folder.</item>
/// <item>If copying is denied, ParatextData falls back to using the Paratext 9 folder directly.</item>
/// </list>
/// Platform.Bible must only ever READ Paratext 9's registration (once, to populate its own), never
/// write it. So this pins the folder to a fixed name and does the one-time seeding itself.
/// </summary>
internal sealed class PlatformParatextInfo : ParatextInfo
{
    /// <summary>
    /// Fixed name of Platform.Bible's ParatextData app-data folder. Never derive it from the app
    /// version. It stays <c>Paratext100</c> because every existing install already keeps its data
    /// there, so pinning it needs no migration.
    /// </summary>
    internal const string APP_DATA_FOLDER_NAME = "Paratext100";

    /// <summary>
    /// The files ParatextData itself carries over from an older Paratext app-data folder.
    /// </summary>
    internal static readonly string[] SEEDED_FILE_NAMES =
    [
        "RegistrationInfo.xml",
        "InternetSettings.xml",
        "ReleaseStage.txt",
        "PTXprintPath.txt",
    ];

    private const string REGISTRATION_FILE_NAME = "RegistrationInfo.xml";

    /// <summary>
    /// Written next to the seeded files, holding the name of the Paratext 9 folder they came from.
    /// Not one of <see cref="SEEDED_FILE_NAMES"/>, so it never stops a re-seed.
    /// </summary>
    private const string COPIED_FROM_PARATEXT9_MARKER_FILE_NAME = "CopiedFromParatext9.txt";

    /// <summary>
    /// Paratext 8.x and 9.x app-data folders (<c>Paratext80</c>–<c>Paratext99</c>). Only these are
    /// seeding sources; a <c>Paratext10x</c> folder is never read.
    /// </summary>
    private static readonly Regex s_paratext8Or9FolderRegex =
        new("^Paratext([89])([0-9])$", RegexOptions.CultureInvariant);

    private readonly Lazy<string> _appDataFolder;

    /// <param name="localAppDataRoot">
    /// Folder that holds the <c>Paratext*</c> app-data folders — the OS local application data
    /// folder in production, a temporary folder in tests.
    /// </param>
    internal PlatformParatextInfo(string localAppDataRoot)
    {
        LocalAppDataRoot = localAppDataRoot;
        AppDataFolderPath = Path.Combine(localAppDataRoot, APP_DATA_FOLDER_NAME);
        _appDataFolder = new Lazy<string>(ResolveAppDataFolder, isThreadSafe: true);
    }

    /// <summary>Folder that holds the <c>Paratext*</c> app-data folders.</summary>
    internal string LocalAppDataRoot { get; }

    /// <summary>Full path of Platform.Bible's pinned ParatextData app-data folder.</summary>
    internal string AppDataFolderPath { get; }

    /// <summary>
    /// Makes ParatextData use Platform.Bible's pinned app-data folder. Must run before anything
    /// reads <see cref="ParatextInfo.AppDataFolder"/>.
    /// </summary>
    /// <returns>The implementation that was installed before, so tests can restore it.</returns>
    internal static ParatextInfo Install(PlatformParatextInfo platformParatextInfo)
    {
        var previous = Default;
        Default = platformParatextInfo;
        return previous;
    }

    /// <summary>
    /// Restores an implementation returned by <see cref="Install"/>.
    ///
    /// WARNING: Test-only.
    /// </summary>
    internal static void Restore(ParatextInfo previous) => Default = previous;

    /// <summary>
    /// The pinned app-data folder, seeded from Paratext 9 on first use if it has none of the
    /// <see cref="SEEDED_FILE_NAMES"/>.
    /// </summary>
    internal string ResolvedAppDataFolder => _appDataFolder.Value;

    protected override string GetAppDataFolder() => _appDataFolder.Value;

    /// <summary>
    /// Whether the registration Platform.Bible has was copied from Paratext 9 by
    /// <see cref="PlatformParatextInfo"/> (as opposed to entered in Platform.Bible, or copied by an
    /// older version before this was recorded).
    /// </summary>
    internal bool IsRegistrationCopiedFromParatext9 =>
        File.Exists(Path.Combine(ResolvedAppDataFolder, COPIED_FROM_PARATEXT9_MARKER_FILE_NAME))
        && File.Exists(Path.Combine(ResolvedAppDataFolder, REGISTRATION_FILE_NAME));

    /// <summary>
    /// Forgets that the registration was copied from Paratext 9. Call whenever Platform.Bible
    /// changes or removes the registration, so a registration entered here is never described as
    /// copied.
    /// </summary>
    internal void ForgetCopiedFromParatext9()
    {
        var markerPath = Path.Combine(AppDataFolderPath, COPIED_FROM_PARATEXT9_MARKER_FILE_NAME);
        if (File.Exists(markerPath))
            // SR-write-gate: exempt — per-user ParatextData settings, not project data
            File.Delete(markerPath);
    }

    /// <summary>
    /// Deletes the files seeding copies from Paratext 9 (and their <c>.BAK</c> backups and the
    /// copied-from marker) so that the next startup seeds the folder again, the way a Paratext 9
    /// user's first launch does. Every other file in the folder — e.g. the user's auto-replace
    /// list — is kept.
    /// </summary>
    internal void DeleteSeededFiles()
    {
        var fileNames = SEEDED_FILE_NAMES
            .SelectMany(fileName => new[] { fileName, fileName + ".BAK" })
            .Append(COPIED_FROM_PARATEXT9_MARKER_FILE_NAME);
        foreach (var fileName in fileNames)
        {
            var path = Path.Combine(AppDataFolderPath, fileName);
            if (File.Exists(path))
                // SR-write-gate: exempt — per-user ParatextData settings, not project data
                File.Delete(path);
        }
    }

    /// <summary>
    /// Never throws: this runs inside <see cref="ParatextInfo.AppDataFolder"/>, which the data
    /// provider reads at startup before it can report anything, and a <see cref="Lazy{T}"/> would
    /// rethrow a failure on every later read. If the folder cannot be seeded or even created, the
    /// failure is logged and ParatextData's own reads and writes there fail later instead.
    /// </summary>
    private string ResolveAppDataFolder()
    {
        try
        {
            if (
                !SEEDED_FILE_NAMES.Any(fileName =>
                    File.Exists(Path.Combine(AppDataFolderPath, fileName))
                )
            )
                SeedFromParatext9();
            Directory.CreateDirectory(AppDataFolderPath);
        }
        catch (Exception e) when (IsFileSystemFailure(e))
        {
            Console.WriteLine(
                $"Could not prepare the ParatextData app-data folder {AppDataFolderPath}: {e.Message}"
            );
        }
        return AppDataFolderPath;
    }

    /// <summary>
    /// Copies the files ParatextData would carry over from the newest Paratext 8/9 app-data folder
    /// that has a registration, and records that it did. Only reads from that folder — there is
    /// deliberately no fallback to using the Paratext 9 folder itself.
    /// </summary>
    private void SeedFromParatext9()
    {
        var source = FindParatext9SeedFolder();
        if (source == null)
            return;

        Directory.CreateDirectory(AppDataFolderPath);
        foreach (var fileName in SEEDED_FILE_NAMES)
        {
            var sourcePath = Path.Combine(source, fileName);
            var destinationPath = Path.Combine(AppDataFolderPath, fileName);
            if (File.Exists(sourcePath) && !File.Exists(destinationPath))
                File.Copy(sourcePath, destinationPath);
        }
        File.WriteAllText(
            Path.Combine(AppDataFolderPath, COPIED_FROM_PARATEXT9_MARKER_FILE_NAME),
            Path.GetFileName(source)
        );
        Console.WriteLine(
            $"Copied Paratext registration and internet settings from {source} to {AppDataFolderPath}"
        );
    }

    private string? FindParatext9SeedFolder()
    {
        if (!Directory.Exists(LocalAppDataRoot))
            return null;

        return Directory
            .EnumerateDirectories(LocalAppDataRoot, "Paratext*", SearchOption.TopDirectoryOnly)
            .Select(directory =>
                (directory, match: s_paratext8Or9FolderRegex.Match(Path.GetFileName(directory)))
            )
            .Where(candidate =>
                candidate.match.Success
                && File.Exists(Path.Combine(candidate.directory, REGISTRATION_FILE_NAME))
            )
            // Newest Paratext version first.
            .OrderByDescending(candidate =>
                int.Parse(candidate.match.Groups[1].Value) * 10
                + int.Parse(candidate.match.Groups[2].Value)
            )
            .Select(candidate => candidate.directory)
            .FirstOrDefault();
    }

    private static bool IsFileSystemFailure(Exception e) =>
        e is IOException or UnauthorizedAccessException or System.Security.SecurityException;
}
