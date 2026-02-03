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
        var knownTypes = new[]
        {
            "Standard",
            "BackTranslation",
            "Daughter",
            "Auxiliary",
            "StudyBible",
            "StudyBibleAdditions",
            "TransliterationManual",
            "TransliterationWithEncoder",
            "Transliteration",
            "ConsultantNotes",
            "Resource",
            "XmlResource",
        };

        foreach (var known in knownTypes)
        {
            if (typeStr.Equals(known, StringComparison.OrdinalIgnoreCase))
            {
                return new PtxUtils.Enum<ProjectType>(known);
            }
        }

        // Handle numeric values (project type enum ordinals)
        if (int.TryParse(typeStr, out var numericValue))
        {
            // Try to get the name for this numeric value
            var typeName = numericValue switch
            {
                0 => "Standard",
                1 => "BackTranslation",
                2 => "Daughter",
                3 => "Auxiliary",
                4 => "StudyBible",
                5 => "StudyBibleAdditions",
                6 => "TransliterationManual",
                7 => "TransliterationWithEncoder",
                8 => "ConsultantNotes",
                _ => "Standard",
            };
            return new PtxUtils.Enum<ProjectType>(typeName);
        }

        // Default to Standard
        return new PtxUtils.Enum<ProjectType>("Standard");
    }

    private static string? ExtractBookIdFromFileName(string fileName)
    {
        // Extract book ID from USFM file names like "01GEN.SFM" or "GEN.usfm"
        if (
            fileName.EndsWith(".sfm", StringComparison.OrdinalIgnoreCase)
            || fileName.EndsWith(".usfm", StringComparison.OrdinalIgnoreCase)
        )
        {
            var nameWithoutExtension = Path.GetFileNameWithoutExtension(fileName);

            // Try to extract 3-letter book code
            // Format: "##BBB" (e.g., "01GEN") or "BBB" (e.g., "GEN")
            if (nameWithoutExtension.Length >= 3)
            {
                // Check if starts with 2 digits
                if (
                    nameWithoutExtension.Length >= 5
                    && char.IsDigit(nameWithoutExtension[0])
                    && char.IsDigit(nameWithoutExtension[1])
                )
                {
                    return nameWithoutExtension.Substring(2, 3).ToUpperInvariant();
                }

                // Otherwise take first 3 characters
                return nameWithoutExtension.Substring(0, 3).ToUpperInvariant();
            }
        }

        return null;
    }
}
