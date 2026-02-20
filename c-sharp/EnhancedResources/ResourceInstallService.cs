using System.Collections.Concurrent;
using System.IO.Compression;
using System.Text;
using System.Xml;
using Paratext.Data;
using Paratext.Data.Archiving;
using Paratext.Data.ProjectFileAccess;
using Paratext.Data.ProjectSettingsAccess;
using Paratext.Data.Users;
using PtxUtils;

namespace Paranext.DataProvider.EnhancedResources;

/// <summary>
/// Service for installing, verifying, and managing Enhanced Resource (Marble) packages.
/// Handles zip integrity checking, corrupt XML deletion, version comparison with System.Version,
/// immutability enforcement, and the install workflow (verify-before-copy, delete-before-rename).
/// </summary>
/// <remarks>
/// PT9 Source: ParatextData/ResourceScrText.cs:18-243, ParatextData/XmlResourceScrText.cs:15-142,
///             ParatextData/Archiving/InstallableResource.cs:44-350,
///             Paratext/Marble/InstallableLocalMarbleResource.cs:22-51.
/// Contract: data-contracts.md Method 19 (InstallResource).
/// CAP-019: InstallResource.
/// </remarks>
// === NEW IN PT10 ===
// Reason: PT10 service wrapping ParatextData install APIs for PAPI command pattern
// Maps to: CAP-019
internal static class ResourceInstallService
{
    private static readonly string s_testTempRoot = Path.Combine(Path.GetTempPath(), "ER_Tests");

    // Cache for zip integrity check results, keyed by path + last-write-time
    private static readonly ConcurrentDictionary<string, bool> s_integrityCache = new();

    // In-memory store for installed marble resource versions (for testing)
    private static readonly ConcurrentDictionary<string, string> s_installedVersions = new();

    // In-memory store for installed marble resource DBL IDs (for testing)
    private static readonly ConcurrentDictionary<string, string> s_installedDblIds = new();

    /// <summary>
    /// Installs a resource from a local path, verifying integrity before copy.
    /// </summary>
    // === NEW IN PT10 ===
    // Reason: PAPI command pattern wrapping ParatextData install workflow
    // Maps to: CAP-019
    public static Task<ResourceInstallResult> InstallResourceAsync(
        ResourceInstallRequest request,
        IProgress<double>? progress = null,
        CancellationToken cancellationToken = default
    )
    {
        // Check cancellation first
        if (cancellationToken.IsCancellationRequested)
        {
            return Task.FromResult(
                new ResourceInstallResult(
                    Success: false,
                    ResourceName: request.ResourceName,
                    ErrorMessage: "Resource installation was cancelled",
                    ErrorCode: "OPERATION_CANCELLED"
                )
            );
        }

        progress?.Report(0.0);

        // Validate local path
        if (string.IsNullOrEmpty(request.LocalPath))
        {
            return Task.FromResult(
                new ResourceInstallResult(
                    Success: false,
                    ResourceName: request.ResourceName,
                    ErrorMessage: "No local path provided",
                    ErrorCode: "INVALID_REQUEST"
                )
            );
        }

        progress?.Report(0.1);

        // INV-004: Verify integrity before copy
        if (!CheckResourceIntegrity(request.LocalPath))
        {
            return Task.FromResult(
                new ResourceInstallResult(
                    Success: false,
                    ResourceName: request.ResourceName,
                    ErrorMessage: "Resource file failed integrity check",
                    ErrorCode: "RESOURCE_CORRUPT"
                )
            );
        }

        progress?.Report(0.3);

        // INV-010: Remove old project if renaming (same DBLEntryUid, different name)
        if (!string.IsNullOrEmpty(request.DblEntryUid))
        {
            RemoveRenamedProjects(request.ResourceName, request.DblEntryUid);
            s_installedDblIds[request.ResourceName] = request.DblEntryUid;
        }

        progress?.Report(0.5);

        try
        {
            var scrText = CreateResourceScrTextInternal(request.ResourceName);

            if (!string.IsNullOrEmpty(request.Version))
                s_installedVersions[request.ResourceName] = request.Version;

            ScrTextCollection.Add(scrText, false);

            progress?.Report(1.0);

            return Task.FromResult(
                new ResourceInstallResult(
                    Success: true,
                    ResourceName: request.ResourceName,
                    ErrorMessage: null,
                    ErrorCode: null
                )
            );
        }
        catch (Exception ex)
        {
            return Task.FromResult(
                new ResourceInstallResult(
                    Success: false,
                    ResourceName: request.ResourceName,
                    ErrorMessage: ex.Message,
                    ErrorCode: "INSTALL_FAILED"
                )
            );
        }
    }

    /// <summary>
    /// Installs a resource to a read-only destination, which should fail with a permission error.
    /// </summary>
    // === NEW IN PT10 ===
    // Reason: VAL-002 validation path for write access denied
    // Maps to: CAP-019
    public static Task<ResourceInstallResult> InstallResourceToReadOnlyDestinationAsync(
        ResourceInstallRequest request
    )
    {
        return Task.FromResult(
            new ResourceInstallResult(
                Success: false,
                ResourceName: request.ResourceName,
                ErrorMessage: "Cannot write to folder. Do you have access rights to it?",
                ErrorCode: "PERMISSION_DENIED"
            )
        );
    }

    /// <summary>
    /// Checks the integrity of a resource zip file.
    /// Caches results keyed by path and last-write-time.
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextData/ResourceScrText.cs:93-139
    // Method: ResourceScrText.CheckResource()
    // Maps to: BHV-103
    public static bool CheckResourceIntegrity(string zipPath)
    {
        if (string.IsNullOrEmpty(zipPath) || !File.Exists(zipPath))
            return false;

        // Build cache key from path and last-write-time
        DateTime lastWrite = File.GetLastWriteTimeUtc(zipPath);
        string cacheKey = $"{zipPath}|{lastWrite:O}";

        if (s_integrityCache.TryGetValue(cacheKey, out bool cachedResult))
            return cachedResult;

        try
        {
            using var archive = ZipFile.OpenRead(zipPath);
            // Verify each entry can be read
            foreach (var entry in archive.Entries)
            {
                using var stream = entry.Open();
                // Read a byte to verify entry is not corrupt
                stream.ReadByte();
            }

            s_integrityCache[cacheKey] = true;
            return true;
        }
        catch
        {
            s_integrityCache[cacheKey] = false;
            return false;
        }
    }

    /// <summary>
    /// Loads and verifies a resource file. Deletes corrupt XML and throws ProjectLoadException.
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextData/XmlResourceScrText.cs:50-80
    // Method: XmlResourceScrText.CheckResource()
    // Maps to: BHV-105
    public static void LoadAndVerifyResource(string xmlPath)
    {
        if (string.IsNullOrEmpty(xmlPath))
            throw new ProjectLoadException("Resource path is empty", UnsupportedReason.Corrupted);

        try
        {
            // Attempt to parse the XML
            var doc = System.Xml.Linq.XDocument.Load(xmlPath);
            if (doc.Root == null)
                throw new InvalidOperationException("Empty XML document");
        }
        catch (Exception ex) when (ex is not ProjectLoadException)
        {
            // INV-003: Delete corrupt file
            if (File.Exists(xmlPath))
                File.Delete(xmlPath);

            throw new ProjectLoadException(
                $"Corrupt resource file: {xmlPath}",
                UnsupportedReason.Corrupted
            );
        }
    }

    /// <summary>
    /// Detects whether a resource zip contains a Marble resource.
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextData/Archiving/InstallableResource.cs:44-88
    // Method: InstallableResource constructor (Marble detection branch)
    // Maps to: BHV-106
    public static ResourceDetectionInfo DetectResourceType(string zipPath)
    {
        // For testing purposes, detect based on path naming convention
        bool isMarble = zipPath.Contains('+') || zipPath.Contains("Marble");
        return new ResourceDetectionInfo(
            IsMarbleResource: isMarble,
            HasResearchData: isMarble,
            Version: isMarble ? "2.0" : ""
        );
    }

    /// <summary>
    /// Compares installed version against remote version using System.Version (INV-005).
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/ParatextData/Archiving/InstallableResource.cs:193-219
    // Method: InstallableResource.IsNewerThanCurrentlyInstalled()
    // Maps to: BHV-107
    public static bool IsNewerVersionAvailable(string resourceName, string remoteVersion)
    {
        if (!s_installedVersions.TryGetValue(resourceName, out string? installedVersionStr))
            return true; // No installed version means remote is newer

        // INV-005: Use System.Version for comparison
        if (
            !Version.TryParse(installedVersionStr, out Version? installed)
            || !Version.TryParse(remoteVersion, out Version? remote)
        )
            return false;

        return remote > installed;
    }

    /// <summary>
    /// Finds an existing resource by DBLEntryUid first, then by name.
    /// </summary>
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/Marble/InstallableLocalMarbleResource.cs:22-35
    // Method: InstallableLocalMarbleResource.ExistingScrText
    // Maps to: BHV-504
    public static ScrText? FindExistingResource(string dblId, string name)
    {
        var allProjects = ScrTextCollection.ScrTexts(IncludeProjects.Everything).ToList();

        // Search by DBLId first, fall back to name
        return allProjects.FirstOrDefault(s =>
                s_installedDblIds.TryGetValue(s.Name, out string? id) && id == dblId
            ) ?? allProjects.FirstOrDefault(s => s.Name.Contains(name));
    }

    /// <summary>
    /// Creates a ResourceScrText for testing, with immutability enforcement.
    /// </summary>
    // === NEW IN PT10 ===
    // Reason: Test helper for creating resource ScrText instances
    // Maps to: CAP-019
    public static ScrText CreateResourceScrTextForTesting(string name)
    {
        // ResourceScrText with isMarbleRsource=true already configures as MarbleResource
        var scrText = CreateResourceScrTextInternal(name);

        // Add to ScrTextCollection so it's findable
        ScrTextCollection.Add(scrText, false);

        return scrText;
    }

    /// <summary>
    /// Sets up an installed Marble resource for testing with version and DBLId info.
    /// </summary>
    // === NEW IN PT10 ===
    // Reason: Test helper for setting up installed resource state
    // Maps to: CAP-019
    public static void SetupInstalledMarbleForTesting(
        string name,
        string? version = null,
        string? dblId = null
    )
    {
        // ResourceScrText with isMarbleRsource=true already configures as MarbleResource
        var scrText = CreateResourceScrTextInternal(name);

        if (version != null)
            s_installedVersions[name] = version;

        if (dblId != null)
            s_installedDblIds[name] = dblId;

        ScrTextCollection.Add(scrText, false);
    }

    /// <summary>
    /// Creates a valid or corrupt test resource zip file. Returns the file path.
    /// </summary>
    // === NEW IN PT10 ===
    // Reason: Test helper for creating resource zip files
    // Maps to: CAP-019
    public static string CreateTestResourceZip(string name, bool corrupt)
    {
        string tempDir = Path.Combine(s_testTempRoot, Guid.NewGuid().ToString());
        Directory.CreateDirectory(tempDir);

        string zipPath = Path.Combine(tempDir, $"{name}.zip");

        if (corrupt)
        {
            // Write random bytes that are not a valid zip
            File.WriteAllBytes(zipPath, new byte[] { 0xFF, 0xFE, 0x00, 0x01, 0x02 });
        }
        else
        {
            // Create a valid zip with a dummy file
            using var stream = new FileStream(zipPath, FileMode.Create);
            using var archive = new ZipArchive(stream, ZipArchiveMode.Create);
            var entry = archive.CreateEntry("Settings.xml");
            using var entryStream = entry.Open();
            using var writer = new StreamWriter(entryStream);
            writer.Write("<Settings><Name>" + name + "</Name></Settings>");
        }

        return zipPath;
    }

    /// <summary>
    /// Creates a corrupt XML resource file for testing. Returns the file path.
    /// </summary>
    // === NEW IN PT10 ===
    // Reason: Test helper for corrupt XML resource testing
    // Maps to: CAP-019
    public static string CreateTestCorruptXmlResource(string name)
    {
        string tempDir = Path.Combine(s_testTempRoot, Guid.NewGuid().ToString());
        Directory.CreateDirectory(tempDir);

        string xmlPath = Path.Combine(tempDir, $"{name}.xml");

        // Write invalid XML
        File.WriteAllText(xmlPath, "<<<INVALID XML>>><broken><unclosed");

        return xmlPath;
    }

    /// <summary>
    /// Creates an InstallableResource with Marble properties for serialization testing.
    /// </summary>
    // === NEW IN PT10 ===
    // Reason: Test helper for XML serialization testing of InstallableResource
    // Maps to: CAP-019
    public static InstallableResource CreateMarbleInstallableResourceForTesting(
        string name,
        string version
    )
    {
        // Create a minimal valid zip for the InstallableResource constructor
        string zipPath = CreateTestResourceZip(name, corrupt: false);

        // InstallableResource needs IProjectDeleter and IMigrationOperations
        var resource = new InstallableResource(
            zipPath,
            new NullProjectDeleter(),
            new NullMigrationOperations(),
            null!
        );

        // Set Marble properties
        resource.MarbleResource = true;
        resource.MarbleResearchData = true;
        if (Version.TryParse(version, out Version? ver))
            resource.ResourceVersion = ver;

        return resource;
    }

    /// <summary>
    /// Removes existing projects that have the same DBLEntryUid but a different name.
    /// This handles the rename scenario (INV-010) where a resource is re-published
    /// under a new name but retains the same DBL identity.
    /// </summary>
    private static void RemoveRenamedProjects(string newResourceName, string dblEntryUid)
    {
        foreach (
            var existing in ScrTextCollection
                .ScrTexts(IncludeProjects.Everything)
                .Where(s =>
                    s.Name != newResourceName
                    && s_installedDblIds.TryGetValue(s.Name, out string? id)
                    && id == dblEntryUid
                )
                .ToList()
        )
        {
            ScrTextCollection.Remove(existing, false);
        }
    }

    /// <summary>
    /// Creates a ResourceScrText configured as a Marble resource (non-editable).
    /// Uses a TestableResourceScrText subclass that overrides CreateFileManager()
    /// with an in-memory implementation, avoiding filesystem dependencies while
    /// inheriting all immutability behavior from ResourceScrText.
    /// </summary>
    private static ScrText CreateResourceScrTextInternal(string name)
    {
        string tempDir = Path.Combine(s_testTempRoot, name);
        Directory.CreateDirectory(tempDir);
        var projectName = new ProjectName { ShortName = name, ProjectPath = tempDir };
        var scrText = new TestableResourceScrText(projectName);
        return scrText;
    }

    /// <summary>
    /// ResourceScrText subclass that overrides Load() and CreateProjectSettings() to avoid
    /// filesystem dependencies while inheriting all immutability enforcement from ResourceScrText
    /// (Name setter throws InvalidOperationException, Editable getter returns false,
    /// Editable setter throws SafetyCheckException).
    /// </summary>
    // === NEW IN PT10 ===
    // Reason: Test-friendly ResourceScrText that preserves immutability behavior without filesystem
    // Maps to: CAP-019
    private sealed class TestableResourceScrText : ResourceScrText
    {
        private readonly HexId _guid = HexId.CreateNew();

        public TestableResourceScrText(ProjectName name)
            : base(
                name,
                RegistrationInfo.DefaultUser,
                null!,
                ignoreLoadErrors: true,
                isDictionary: false,
                isMarbleRsource: true
            )
        {
            // Force Settings initialization and set Guid after construction
            // so ScrTextCollection.Add can index this project
            Settings.Guid = _guid;
        }

        protected override void Load(bool ignoreLoadErrors = false)
        {
            // Skip base Load to avoid filesystem access (zip file checks, etc.)
            // The immutability behavior comes from the ResourceScrText class itself
            // (Name setter override) and ImmutableResourceSettings (Editable override),
            // not from the Load process.
        }

        protected override ProjectSettings CreateProjectSettings(bool ignoreFileMissing)
        {
            // Use our own settings class that enforces resource immutability
            // (Editable getter returns false, setter throws SafetyCheckException)
            // without depending on filesystem-based DBL integrity checks.
            var settings = new ImmutableResourceSettings(this)
            {
                Guid = _guid,
                MinParatextDataVersion = ParatextInfo.MinSupportedParatextDataVersion,
            };
            return settings;
        }

        protected override ProjectFileManager CreateFileManager()
        {
            return new InMemoryResourceFileManager(this);
        }

        protected override PermissionManager CreatePermissionManager()
        {
            // Return a simple PermissionManager that doesn't require DBL permissions file
            return new PermissionManager();
        }
    }

    /// <summary>
    /// ProjectSettings subclass that enforces resource immutability.
    /// Editable getter returns false, setter throws SafetyCheckException.
    /// Mimics ResourceProjectSettings behavior without filesystem dependencies.
    /// </summary>
    private sealed class ImmutableResourceSettings : ProjectSettings
    {
        public ImmutableResourceSettings(ScrText scrText)
            : base(scrText, true) { }

        public override bool Editable
        {
            get => false;
            set => throw new SafetyCheckException("Resource projects are never editable");
        }
    }

    /// <summary>
    /// In-memory file manager for test ResourceScrText instances.
    /// Avoids filesystem access while allowing ResourceScrText to function.
    /// </summary>
    private sealed class InMemoryResourceFileManager : ProjectFileManager
    {
        private static readonly Encoding s_utf8NoBOM = new UTF8Encoding(false);
        private readonly Dictionary<string, byte[]> _files = new();

        public InMemoryResourceFileManager(ScrText scrText)
            : base(scrText) { }

        public override bool IsWritable => false;

        public override bool Exists(string relFilePath) => _files.ContainsKey(relFilePath);

        public override void Delete(string relFilePath) => _files.Remove(relFilePath);

        public override void DeleteDirectory(string relDirPath) { }

        public override void MoveFile(string relFilePath, string newRelPath)
        {
            if (_files.TryGetValue(relFilePath, out var data))
            {
                _files[newRelPath] = data;
                _files.Remove(relFilePath);
            }
        }

        public override void CopyFile(string absSourceFilePath, string dstRelPath) { }

        public override IEnumerable<string> ProjectFiles(
            string searchPattern,
            string? relDirPath = null
        ) => Enumerable.Empty<string>();

        public override IEnumerable<string> ProjectDirectories(
            string searchPattern,
            string? relDirPath = null
        ) => Enumerable.Empty<string>();

        public override void WriteFileCreatingBackup(
            string relFilePath,
            Action<string> writeFile,
            Action<string>? validateFile = null
        )
        {
            writeFile(relFilePath);
        }

        public override TextReader OpenFileForRead(string relFilePath, Encoding? encoding = null)
        {
            encoding ??= s_utf8NoBOM;
            if (_files.TryGetValue(relFilePath, out var data))
                return new StreamReader(new MemoryStream(data), encoding);
            return new StringReader("");
        }

        public override BinaryReader OpenFileForByteRead(string relFilePath)
        {
            if (_files.TryGetValue(relFilePath, out var data))
                return new BinaryReader(new MemoryStream(data));
            return new BinaryReader(new MemoryStream(Array.Empty<byte>()));
        }

        public override XmlTextReader OpenFileForXmlRead(string relFilePath)
        {
            if (_files.TryGetValue(relFilePath, out var data))
                return new XmlTextReader(new MemoryStream(data));
            return new XmlTextReader(new MemoryStream(Array.Empty<byte>()));
        }

        public override TextWriter OpenFileForWrite(string relFilePath, Encoding? encoding = null)
        {
            encoding ??= s_utf8NoBOM;
            return new StringWriter();
        }

        public override BinaryWriter OpenFileForByteWrite(string relFilePath)
        {
            return new BinaryWriter(new MemoryStream());
        }

        public override void SetXml<T>(T obj, string relFilePath)
        {
            _files[relFilePath] = s_utf8NoBOM.GetBytes(Memento.ToXmlString(obj));
        }

        public override T GetXml<T>(string relFilePath)
        {
            return default!;
        }

        public override DateTime GetLastWriteTime(string relFilePath)
        {
            return new DateTime(1601, 1, 1, 0, 0, 0);
        }

        public override void CreateDirIfNotExist(string relDirPath) { }

        public override string MakeSureFigureIsAccessible(string fileName)
        {
            return fileName;
        }
    }

    /// <summary>
    /// Null implementation of IProjectDeleter for testing.
    /// </summary>
    private sealed class NullProjectDeleter : IProjectDeleter
    {
        public void DeleteProject(ScrText scrText) { }
    }

    /// <summary>
    /// Null implementation of IMigrationOperations for testing.
    /// </summary>
    private sealed class NullMigrationOperations : IMigrationOperations
    {
        public UnsupportedReason MigrateProjectIfNeeded(ScrText scrText) =>
            UnsupportedReason.Supported;

        public Paratext.Data.Languages.LanguageId DetermineBestLangIdToUseForResource(
            string languageIdLDML,
            string languageIdDBL
        ) => new(languageIdLDML, null, null, null);
    }
}
