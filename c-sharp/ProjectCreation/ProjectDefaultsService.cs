using System.Collections.Concurrent;
using Paratext.Data;
using PtxUtils;

namespace Paranext.DataProvider.ProjectCreation;

/// <summary>
/// Service for creating projects with default values (CAP-009).
/// Behaviors: BHV-001, BHV-034
/// </summary>
internal static class ProjectDefaultsService
{
    /// <summary>
    /// Tracks project types for created projects (for test environment).
    /// In production, this would be persisted in Settings.xml TranslationInfo.
    /// </summary>
    private static readonly ConcurrentDictionary<string, string> s_projectTypes = new();

    /// <summary>
    /// Gets the project type for a given GUID.
    /// </summary>
    internal static string GetProjectType(string projectGuid)
    {
        return s_projectTypes.TryGetValue(projectGuid.ToUpperInvariant(), out var type)
            ? type
            : "Standard";
    }

    /// <summary>
    /// Creates a new project with the specified settings.
    /// </summary>
    /// <param name="request">Project creation request.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    /// <returns>Result with project GUID if successful.</returns>
    public static Task<CreateProjectResult> CreateProjectAsync(
        CreateProjectRequest request,
        CancellationToken cancellationToken = default
    )
    {
        // 1. Validate short name using ProjectNameService (CAP-004)
        var nameValidation = ProjectNameService.ValidateShortName(
            request.ShortName,
            isNewProject: true
        );
        if (!nameValidation.IsValid)
        {
            return Task.FromResult(
                new CreateProjectResult
                {
                    Success = false,
                    ErrorCode = "INVALID_SHORT_NAME",
                    ErrorMessage = nameValidation.ErrorCode,
                }
            );
        }

        // 2. Get type configuration (CAP-001)
        var typeConfig = ProjectTypeService.GetTypeConfiguration(request.ProjectType);

        // 3. Validate base project for derived types
        if (typeConfig.BaseProjectRequired && string.IsNullOrEmpty(request.BaseProjectGuid))
        {
            return Task.FromResult(
                new CreateProjectResult
                {
                    Success = false,
                    ErrorCode = "BASE_PROJECT_REQUIRED",
                    ErrorMessage = "Derived project types require a base project",
                }
            );
        }

        // 4-7. Create project with unique GUID
        var projectGuid = HexId.CreateNew();

        // Track the project type for later lookups
        s_projectTypes[projectGuid.ToString().ToUpperInvariant()] = request.ProjectType;

        // Create in-memory project settings
        var scrText = CreateScrTextForProject(request, projectGuid, typeConfig);

        // Force Settings to be populated (triggers CreateProjectSettings)
        _ = scrText.Settings.Guid;

        // 8. Add to ScrTextCollection
        ScrTextCollection.Add(scrText, true);

        return Task.FromResult(
            new CreateProjectResult { Success = true, ProjectGuid = projectGuid.ToString() }
        );
    }

    /// <summary>
    /// Gets the default settings for a project type.
    /// </summary>
    /// <param name="projectType">Project type identifier.</param>
    /// <param name="baseProjectGuid">Base project GUID if derived type.</param>
    /// <returns>Default project settings.</returns>
    public static CreateProjectRequest GetDefaultSettings(
        string projectType,
        string? baseProjectGuid = null
    )
    {
        var typeConfig = ProjectTypeService.GetTypeConfiguration(projectType);

        return new CreateProjectRequest
        {
            ShortName = string.Empty,
            FullName = string.Empty,
            LanguageId = "eng",
            Versification = "English",
            ProjectType = projectType,
            BaseProjectGuid = baseProjectGuid,
            Normalization = typeConfig.NormalizationDefault,
            UsfmVersion = 3,
            Editable = typeConfig.EditableDefault,
        };
    }

    /// <summary>
    /// Creates an in-memory ScrText instance for testing.
    /// </summary>
    private static ScrText CreateScrTextForProject(
        CreateProjectRequest request,
        HexId projectGuid,
        ProjectTypeConfiguration typeConfig
    )
    {
        var projectName = new ProjectName { ShortName = request.ShortName, ProjectPath = "" };

        var scrText = new InMemoryScrText(projectName, projectGuid, request, typeConfig);
        return scrText;
    }

    /// <summary>
    /// In-memory ScrText implementation for project creation.
    /// </summary>
    private sealed class InMemoryScrText : ScrText
    {
        private readonly HexId _guid;
        private readonly CreateProjectRequest _request;
        private readonly ProjectTypeConfiguration _typeConfig;

        public InMemoryScrText(
            ProjectName projectName,
            HexId guid,
            CreateProjectRequest request,
            ProjectTypeConfiguration typeConfig
        )
            : base(projectName, Paratext.Data.Users.RegistrationInfo.DefaultUser)
        {
            _guid = guid;
            _request = request;
            _typeConfig = typeConfig;
        }

        protected override void Load(bool ignoreLoadErrors = false)
        {
            // Nothing to load for in-memory project
        }

        protected override Paratext.Data.ProjectFileAccess.ProjectFileManager CreateFileManager()
        {
            return new InMemoryProjectFileManager(this);
        }

        protected override Paratext.Data.ProjectSettingsAccess.ProjectSettings CreateProjectSettings(
            bool ignoreFileMissing
        )
        {
            var settings = new Paratext.Data.ProjectSettingsAccess.ProjectSettings(this, true)
            {
                FullName = _request.FullName,
                Guid = _guid,
                MinParatextDataVersion = Paratext.Data.ParatextInfo.MinSupportedParatextDataVersion,
            };

            settings.Editable = _request.Editable ?? _typeConfig.EditableDefault;

            return settings;
        }

        /// <summary>
        /// Minimal in-memory file manager.
        /// </summary>
        private sealed class InMemoryProjectFileManager
            : Paratext.Data.ProjectFileAccess.ProjectFileManager
        {
            private readonly Dictionary<string, byte[]> _files = new();

            public InMemoryProjectFileManager(ScrText scrText)
                : base(scrText) { }

            public override bool IsWritable => true;

            public override bool Exists(string relFilePath) => _files.ContainsKey(relFilePath);

            public override void Delete(string relFilePath) => _files.Remove(relFilePath);

            public override void DeleteDirectory(string relDirPath)
            {
                var toRemove = _files.Keys.Where(k => k.StartsWith(relDirPath)).ToList();
                foreach (var key in toRemove)
                    _files.Remove(key);
            }

            public override void MoveFile(string relFilePath, string newRelPath)
            {
                if (_files.TryGetValue(relFilePath, out var data))
                {
                    _files[newRelPath] = data;
                    _files.Remove(relFilePath);
                }
            }

            public override void CopyFile(string absSourceFilePath, string dstRelPath)
            {
                // Not needed for tests
            }

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
            ) => writeFile(relFilePath);

            public override TextReader OpenFileForRead(
                string relFilePath,
                System.Text.Encoding? encoding = null
            )
            {
                if (_files.TryGetValue(relFilePath, out var data))
                    return new StreamReader(new MemoryStream(data));
                throw new FileNotFoundException(relFilePath);
            }

            public override BinaryReader OpenFileForByteRead(string relFilePath)
            {
                if (_files.TryGetValue(relFilePath, out var data))
                    return new BinaryReader(new MemoryStream(data));
                throw new FileNotFoundException(relFilePath);
            }

            public override System.Xml.XmlTextReader OpenFileForXmlRead(string relFilePath)
            {
                if (_files.TryGetValue(relFilePath, out var data))
                    return new System.Xml.XmlTextReader(new MemoryStream(data));
                throw new FileNotFoundException(relFilePath);
            }

            public override TextWriter OpenFileForWrite(
                string relFilePath,
                System.Text.Encoding? encoding = null
            )
            {
                return new InMemoryStreamWriter(this, relFilePath);
            }

            public override BinaryWriter OpenFileForByteWrite(string relFilePath)
            {
                return new InMemoryBinaryWriter(this, relFilePath);
            }

            public override void SetXml<T>(T obj, string relFilePath)
            {
                _files[relFilePath] = System.Text.Encoding.UTF8.GetBytes(
                    PtxUtils.Memento.ToXmlString(obj)
                );
            }

            public override T GetXml<T>(string relFilePath)
            {
                if (_files.TryGetValue(relFilePath, out var data))
                    return PtxUtils.Memento.FromXmlString<T>(
                        System.Text.Encoding.UTF8.GetString(data)
                    );
                return default!;
            }

            public override DateTime GetLastWriteTime(string relFilePath) =>
                _files.ContainsKey(relFilePath) ? DateTime.Now : new DateTime(1601, 1, 1);

            public override void CreateDirIfNotExist(string relDirPath)
            {
                _files[relDirPath] = Array.Empty<byte>();
            }

            public override string MakeSureFigureIsAccessible(string fileName) =>
                Path.Combine(figuresFolder, fileName);

            private void StoreFile(string relFilePath, byte[] data) => _files[relFilePath] = data;

            private sealed class InMemoryStreamWriter : StreamWriter
            {
                private readonly InMemoryProjectFileManager _owner;
                private readonly string _path;

                public InMemoryStreamWriter(InMemoryProjectFileManager owner, string path)
                    : base(new MemoryStream())
                {
                    _owner = owner;
                    _path = path;
                }

                protected override void Dispose(bool disposing)
                {
                    Flush();
                    _owner.StoreFile(_path, ((MemoryStream)BaseStream).ToArray());
                    base.Dispose(disposing);
                }
            }

            private sealed class InMemoryBinaryWriter : BinaryWriter
            {
                private readonly InMemoryProjectFileManager _owner;
                private readonly string _path;

                public InMemoryBinaryWriter(InMemoryProjectFileManager owner, string path)
                    : base(new MemoryStream())
                {
                    _owner = owner;
                    _path = path;
                }

                protected override void Dispose(bool disposing)
                {
                    base.Dispose(disposing);
                    _owner.StoreFile(_path, ((MemoryStream)BaseStream).ToArray());
                }
            }
        }
    }
}
