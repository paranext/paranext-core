// === NEW IN PT10 ===
// Reason: Service for project backup analysis and restore operations
// Maps to: CAP-012 (RestoreProject), CAP-013 (AnalyzeBackup)

using System.IO.Compression;
using System.Xml.Linq;
using Paratext.Data;

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Service for project backup analysis and restore operations.
/// PT9 Provenance: RestoreForm, Restorer
/// Maps to: CAP-012 (RestoreProject), CAP-013 (AnalyzeBackup)
/// </summary>
internal static class ProjectRestoreService
{
    // === PORTED FROM PT9 ===
    // Source: PT9/RestoreForm.cs - backup analysis logic
    // Maps to: CAP-013

    private const string SettingsFileName = "Settings.xml";
    private const string UniqueIdFileName = "unique.id";

    /// <summary>
    /// Known project type names for case-insensitive lookup.
    /// Keys are lowercase for O(1) lookup.
    /// </summary>
    private static readonly Dictionary<string, string> s_projectTypeNames =
        new(StringComparer.OrdinalIgnoreCase)
        {
            ["Standard"] = "Standard",
            ["BackTranslation"] = "BackTranslation",
            ["Daughter"] = "Daughter",
            ["Auxiliary"] = "Auxiliary",
            ["StudyBible"] = "StudyBible",
            ["StudyBibleAdditions"] = "StudyBibleAdditions",
            ["TransliterationManual"] = "TransliterationManual",
            ["TransliterationWithEncoder"] = "TransliterationWithEncoder",
            ["Transliteration"] = "Transliteration",
            ["ConsultantNotes"] = "ConsultantNotes",
            ["Resource"] = "Resource",
            ["XmlResource"] = "XmlResource",
        };

    /// <summary>
    /// Mapping from numeric enum ordinals to project type names.
    /// </summary>
    private static readonly Dictionary<int, string> s_projectTypeOrdinals =
        new()
        {
            [0] = "Standard",
            [1] = "BackTranslation",
            [2] = "Daughter",
            [3] = "Auxiliary",
            [4] = "StudyBible",
            [5] = "StudyBibleAdditions",
            [6] = "TransliterationManual",
            [7] = "TransliterationWithEncoder",
            [8] = "ConsultantNotes",
        };

    /// <summary>
    /// Analyzes a backup file.
    /// PT9 Provenance: RestoreForm logic
    /// Maps to: CAP-013, EXT-301
    /// </summary>
    /// <param name="backupFilePath">Path to the backup ZIP file</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Analysis result with project info and file list</returns>
    public static Task<RestoreAnalysisResult> AnalyzeBackupAsync(
        string backupFilePath,
        CancellationToken cancellationToken = default
    )
    {
        // EXPLANATION:
        // This method analyzes a Paratext backup ZIP file by:
        // 1. Validating input and file existence
        // 2. Opening the ZIP and reading Settings.xml
        // 3. Extracting project info (name, GUID, type)
        // 4. Checking for unique.id file to detect shared projects
        // 5. Building a list of all files in the backup

        // Validate input
        ArgumentNullException.ThrowIfNull(backupFilePath);
        if (string.IsNullOrWhiteSpace(backupFilePath))
            throw new ArgumentException("Backup file path cannot be empty", nameof(backupFilePath));

        if (!File.Exists(backupFilePath))
            throw new FileNotFoundException("Backup file not found", backupFilePath);

        try
        {
            using var archive = ZipFile.OpenRead(backupFilePath);

            // Find and read Settings.xml
            var settingsEntry = archive.GetEntry(SettingsFileName);
            if (settingsEntry == null)
                throw new InvalidDataException($"Backup does not contain {SettingsFileName}");

            BackupProjectInfo projectInfo;
            using (var stream = settingsEntry.Open())
            {
                var doc = XDocument.Load(stream);
                projectInfo = ParseSettingsXml(doc);
            }

            // Check for unique.id file (indicates shared project)
            var uniqueIdEntry = archive.GetEntry(UniqueIdFileName);
            bool isSharedProjectBackup = uniqueIdEntry != null;

            // Build files list
            var files = new List<RestoreFileInfo>();
            foreach (var entry in archive.Entries)
            {
                if (string.IsNullOrEmpty(entry.Name))
                    continue; // Skip directories

                files.Add(
                    new RestoreFileInfo(
                        FileName: entry.FullName,
                        BookId: ExtractBookIdFromFileName(entry.Name),
                        SourceVersion: "1.0", // Version info not in simple backups
                        ComparisonState: FileComparisonState.DestDoesNotExist
                    )
                );
            }

            var result = new RestoreAnalysisResult(
                ProjectInfo: projectInfo,
                Files: files,
                IsSharedProjectBackup: isSharedProjectBackup,
                WarningMessage: null
            );

            return Task.FromResult(result);
        }
        catch (InvalidDataException)
        {
            throw; // Re-throw our own InvalidDataException
        }
        catch (Exception ex)
            when (ex
                    is not FileNotFoundException
                        and not ArgumentException
                        and not ArgumentNullException
            )
        {
            throw new InvalidDataException("Invalid or corrupted backup file", ex);
        }
    }

    private static BackupProjectInfo ParseSettingsXml(XDocument doc)
    {
        var root = doc.Root ?? throw new InvalidDataException("Invalid Settings.xml format");

        var shortName =
            root.Element("Name")?.Value
            ?? throw new InvalidDataException("Settings.xml missing Name element");

        var fullName = root.Element("FullName")?.Value ?? shortName;

        var guidStr =
            root.Element("Guid")?.Value
            ?? throw new InvalidDataException("Settings.xml missing Guid element");

        // Parse project type from TranslationInfo/Type
        var typeStr = root.Element("TranslationInfo")?.Element("Type")?.Value ?? "Standard";
        var projectType = ParseProjectType(typeStr);

        return new BackupProjectInfo(
            ShortName: shortName,
            FullName: fullName,
            Guid: HexId.FromStr(guidStr),
            ProjectType: projectType
        );
    }

    private static PtxUtils.Enum<ProjectType> ParseProjectType(string typeStr)
    {
        // Handle string names like "Standard", "BackTranslation", etc.
        // PtxUtils.Enum<T> constructor accepts the string name directly
        if (s_projectTypeNames.TryGetValue(typeStr, out var typeName))
        {
            return new PtxUtils.Enum<ProjectType>(typeName);
        }

        // Handle numeric values (project type enum ordinals)
        if (
            int.TryParse(typeStr, out var numericValue)
            && s_projectTypeOrdinals.TryGetValue(numericValue, out var ordinalTypeName)
        )
        {
            return new PtxUtils.Enum<ProjectType>(ordinalTypeName);
        }

        // Default to Standard for unknown types
        return new PtxUtils.Enum<ProjectType>("Standard");
    }

    private static string? ExtractBookIdFromFileName(string fileName)
    {
        // Extract book ID from USFM file names like "01GEN.SFM" or "GEN.usfm"
        bool isUsfmFile =
            fileName.EndsWith(".sfm", StringComparison.OrdinalIgnoreCase)
            || fileName.EndsWith(".usfm", StringComparison.OrdinalIgnoreCase);

        if (!isUsfmFile)
            return null;

        var nameWithoutExtension = Path.GetFileNameWithoutExtension(fileName);

        // Need at least 3 characters for a book code
        if (nameWithoutExtension.Length < 3)
            return null;

        // Format: "##BBB" (e.g., "01GEN") - extract after 2-digit prefix
        bool hasNumericPrefix =
            nameWithoutExtension.Length >= 5
            && char.IsDigit(nameWithoutExtension[0])
            && char.IsDigit(nameWithoutExtension[1]);

        int startIndex = hasNumericPrefix ? 2 : 0;
        return nameWithoutExtension.Substring(startIndex, 3).ToUpperInvariant();
    }
}
