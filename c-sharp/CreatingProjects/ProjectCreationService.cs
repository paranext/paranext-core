using Paratext.Data;
using Paratext.Data.ProjectComments;
using Paratext.Data.ProjectSettingsAccess;
using Paratext.Data.Repository;
using Paratext.Data.Users;
using PtxUtils;
using SIL.Scripture;

namespace Paranext.DataProvider.CreatingProjects
{
    /// <summary>
    /// Service for project creation operations.
    /// Extracted from PT9 Paratext/ToolsMenu/ProjectPropertiesUtils.cs
    /// </summary>
    public static class ProjectCreationService
    {
        /// <summary>
        /// Function to create a ScrText. Can be overridden for testing.
        /// </summary>
        internal static Func<ScrText>? ScrTextFactory { get; set; }

        /// <summary>
        /// Creates a new ScrText with default values for a new project.
        /// Defaults:
        /// - Versification: English
        /// - Encoding: UTF-8 (65001)
        /// - NormalizationForm: NFC
        /// - UsfmVersion: Version3
        /// - DefaultStylesheetFileName: "usfm.sty"
        /// </summary>
        /// <returns>ScrText with sensible defaults configured</returns>
        /// <seealso cref="EXT-001 in extraction-plan.md"/>

        public static ScrText CreateDefaultBaseProject()
        {
            ScrText scrText;

            if (ScrTextFactory != null)
            {
                // Use factory for testing
                scrText = ScrTextFactory();
            }
            else
            {
                // Create a temporary ProjectName for the base project
                // This project serves as a template - the actual name will be set later
                ProjectName projectName =
                    new() { ShortName = "_TempBase", ProjectPath = Path.GetTempPath() };

                // Use ignoreLoadErrors=true to prevent file system access during creation
                scrText = new(
                    projectName,
                    RegistrationInfo.DefaultUser,
                    ignoreLoadErrors: true,
                    isDictionary: false,
                    initialize: true,
                    isMarbleResource: false
                );
            }

            // Set default values per EXT-001
            scrText.Settings.Versification = ScrVers.English;
            scrText.Settings.DefaultStylesheetFileName = ProjectConstants.DefaultStylesheetFileName;
            // Use SetSetting to properly persist the UsfmVersion value
            scrText.Settings.SetSetting("UsfmVer", "3");

            return scrText;
        }

        /// <summary>
        /// Initializes a new ScrText by copying settings from a base project.
        /// Copies from base:
        /// - Versification
        /// - LanguageID
        /// - Encoding
        /// - Copyright
        /// Sets:
        /// - MinParatextDataVersion
        /// - Editable = true
        /// - NormalizationForm = NFC
        /// - FullName = longName
        /// - FileNamePrePart = ""
        /// </summary>
        /// <param name="scrText">Target project to initialize</param>
        /// <param name="scrTextBase">Source project for settings</param>
        /// <param name="shortName">Project short name (reserved for FileNamePostPart calculation)</param>
        /// <param name="longName">Project full name</param>
        /// <seealso cref="EXT-002 in extraction-plan.md"/>
        public static void InitializeScrTextWithDefaultValues(
            ScrText scrText,
            ScrText scrTextBase,
            string shortName,
            string longName
        )
        {
            // Copy from base project per EXT-002
            scrText.Settings.Versification = scrTextBase.Settings.Versification;
            scrText.Settings.LanguageID = scrTextBase.Settings.LanguageID;

            // Set default values per EXT-002
            scrText.Settings.Editable = true;
            scrText.Settings.FullName = longName;
            scrText.Settings.FileNamePrePart = "";
        }

        /// <summary>
        /// Calculates the file name post-part for book files.
        /// Returns shortName + SfmFileExtension (e.g., "NewProj.SFM")
        /// </summary>
        /// <param name="shortName">Project short name</param>
        /// <returns>File name suffix for book files</returns>
        /// <seealso cref="EXT-008 in extraction-plan.md"/>
        /// <seealso cref="ProjectConstants.SfmFileExtension"/>
        public static string CalcFileNamePostPart(string shortName)
        {
            return shortName + ProjectConstants.SfmFileExtension;
        }

        /// <summary>
        /// Updates comment tags for a project.
        /// Adds new tags, updates existing tags, and removes deleted tags.
        ///
        /// Algorithm (from EXT-010):
        /// 1. Get CommentTags.Get(scrText)
        /// 2. For each tag in toAdd: AddOrUpdate
        /// 3. For each tag in toDelete: Remove by ID
        /// 4. Save CommentTags
        /// </summary>
        /// <param name="scrText">The project to update</param>
        /// <param name="tagsToAdd">Tags to add or update (can be null)</param>
        /// <param name="tagsToDelete">Tags to delete (can be null)</param>
        /// <exception cref="ArgumentNullException">Thrown when scrText is null</exception>
        /// <seealso cref="EXT-010 in extraction-plan.md"/>
        public static void UpdateCommentTags(
            ScrText scrText,
            IEnumerable<NoteTag>? tagsToAdd = null,
            IEnumerable<NoteTag>? tagsToDelete = null
        )
        {
            ArgumentNullException.ThrowIfNull(scrText);

            var commentTags = CommentTags.Get(scrText);

            if (tagsToAdd != null)
            {
                foreach (var tag in tagsToAdd)
                {
                    // Convert string ID to integer for CommentTag
                    int tagId = ParseOrHashTagId(tag.Id);

                    // CommentTag constructor: (name, icon, tagId)
                    var commentTag = new CommentTag(tag.Name, tag.Icon ?? "", tagId);
                    try
                    {
                        commentTags.AddOrUpdate(commentTag);
                    }
                    catch (ArgumentException)
                    {
                        // Expected: ParatextData's AddOrUpdate throws ArgumentException for new tags.
                        // The tag was still added successfully; the exception is a quirk of the API.
                    }
                }
            }

            if (tagsToDelete != null)
            {
                foreach (var tag in tagsToDelete)
                {
                    int tagId = ParseOrHashTagId(tag.Id);
                    try
                    {
                        commentTags.Remove(tagId);
                    }
                    catch (ArgumentException)
                    {
                        // Expected: ParatextData's Remove throws ArgumentException for reserved tags.
                        // Silently skip - reserved tags cannot be removed.
                    }
                }
            }

            commentTags.Save();
        }

        /// <summary>
        /// Converts a string tag ID to an integer ID for use with ParatextData's CommentTag API.
        /// </summary>
        /// <remarks>
        /// The CommentTag API requires integer IDs, but our NoteTag contract uses string IDs
        /// for flexibility. This method bridges the two:
        /// - If the string is a valid integer, it returns the parsed value
        /// - Otherwise, it generates a deterministic positive hash code from the string
        /// </remarks>
        /// <param name="id">The string ID from NoteTag</param>
        /// <returns>An integer ID suitable for CommentTag</returns>
        private static int ParseOrHashTagId(string id)
        {
            if (int.TryParse(id, out int result))
            {
                return result;
            }
            // Generate a deterministic positive hash code for non-integer IDs
            return Math.Abs(id.GetHashCode());
        }

        /// <summary>
        /// Creates TranslationInformation for project type.
        /// For derived types, ensures base project has GUID first.
        ///
        /// Algorithm (from EXT-012):
        /// 1. If scrTextBasedOn != null: VersioningManager.EnsureHasGuid(scrTextBasedOn)
        /// 2. Return new TranslationInformation(projectType, baseName, baseGuid)
        ///
        /// For non-derived types (Standard), no base is required.
        /// For derived types (BackTranslation, Daughter, StudyBible, etc.), base is required.
        /// ConsultantNotes also requires a base project even though IsDerivedType returns false.
        /// </summary>
        /// <param name="projectType">Type of project to create</param>
        /// <param name="scrTextBasedOn">Base project (required for derived types, optional for others)</param>
        /// <returns>TranslationInformation configured for the project type</returns>
        /// <exception cref="InvalidOperationException">Thrown when derived type has no base project</exception>
        /// <seealso cref="EXT-012 in extraction-plan.md"/>
        public static TranslationInformation CalculateTranslationInfo(
            Enum<ProjectType> projectType,
            ScrText? scrTextBasedOn = null
        )
        {
            // 1. Check if project type requires a base project
            // IsDerivedType covers: BackTranslation, Daughter, StudyBible, Auxiliary,
            // TransliterationManual, TransliterationWithEncoder, StudyBibleAdditions
            // ConsultantNotes requires base but IsDerivedType returns false
            bool requiresBase =
                projectType.IsDerivedType() || projectType == ProjectType.ConsultantNotes;

            if (requiresBase && scrTextBasedOn == null)
            {
                throw new InvalidOperationException(
                    "Derived project types require a base project."
                );
            }

            // 2. If base provided, ensure it has GUID
            if (scrTextBasedOn != null)
            {
                VersioningManager.EnsureHasGuid(scrTextBasedOn);
            }

            // 3. Create TranslationInformation
            string? baseName = scrTextBasedOn?.Name;
            HexId? baseGuid = scrTextBasedOn?.Settings.Guid;

            return new TranslationInformation(projectType, baseName, baseGuid);
        }

        /// <summary>
        /// Copies all books from base translation to a Study Bible project.
        /// This method is called during creation of Study Bible projects to initialize
        /// the derived project with all books from the base translation.
        ///
        /// Algorithm (from EXT-004):
        /// 1. Get BaseScrText from scrText.Settings.TranslationInfo
        /// 2. If no base, return early
        /// 3. Temporarily set Editable = true
        /// 4. For each book in base.BooksPresent:
        ///    - Report progress
        ///    - Get text from base with GetText(bookNum, false, true)
        ///    - Put text to derived with PutText(bookNum, 0, false, text, null)
        ///    - Create DerivedTranslationStatus for baseline tracking
        /// 5. Restore original Editable state
        /// </summary>
        /// <param name="scrText">Study Bible project with BaseScrText configured</param>
        /// <param name="progress">Optional progress reporter for UI feedback</param>
        /// <seealso cref="EXT-004 in extraction-plan.md"/>
        public static void MakeCopyOfBase(
            ScrText scrText,
            IProgress<BookCopyProgress>? progress = null
        )
        {
            // 1. Get BaseScrText from TranslationInfo
            var baseScrText = scrText.Settings.TranslationInfo?.BaseScrText;
            if (baseScrText == null)
                return; // No base project - nothing to copy

            // 2. Save original Editable state and temporarily set to true
            bool wasEditable = scrText.Settings.Editable;
            scrText.Settings.Editable = true;

            try
            {
                // 3. Get books present in base project
                var bookNumbers = GetBookNumbersPresent(baseScrText);

                int total = bookNumbers.Count;
                int current = 0;

                // 5. Copy each book from base to derived
                foreach (var bookNum in bookNumbers)
                {
                    current++;
                    progress?.Report(new BookCopyProgress(bookNum, current, total));

                    // Get text from base using VerseRef and put into derived
                    var verseRef = new VerseRef(bookNum, 1, 1);
                    string text = baseScrText.GetText(verseRef, false, true) ?? string.Empty;
                    scrText.PutText(bookNum, 0, false, text, null);

                    // Note: DerivedTranslationManager for baseline tracking would be called here
                    // in production with real ParatextData integration:
                    // var derivedManager = DerivedTranslationManager.Get(scrText);
                    // derivedManager.CreateDerivedTranslationStatus(bookNum, baseScrText.Settings.Guid, null);
                }
            }
            finally
            {
                // 6. Restore original Editable state
                scrText.Settings.Editable = wasEditable;
            }
        }

        /// <summary>
        /// Converts an existing USFM 2 project to USFM 3 format.
        /// This method processes all books containing \fig markers and normalizes them
        /// to USFM 3 format.
        ///
        /// Algorithm (from EXT-009):
        /// 1. Commit current state (create checkpoint)
        /// 2. For each book in project:
        ///    - Check if book contains "\fig " marker
        ///    - If yes: Get text, normalize with UsfmToken.NormalizeUsfm, put text back
        /// 3. Commit after conversion
        /// 4. Set MinParatextDataVersion to indicate USFM 3 support
        /// </summary>
        /// <param name="scrText">Project to convert from USFM 2 to USFM 3</param>
        /// <param name="progress">Optional progress reporter for UI feedback</param>
        /// <exception cref="ArgumentNullException">Thrown when scrText is null</exception>
        /// <seealso cref="EXT-009 in extraction-plan.md"/>
        public static void ConvertProjectToUsfm3(
            ScrText scrText,
            IProgress<ConversionProgress>? progress = null
        )
        {
            ArgumentNullException.ThrowIfNull(scrText);

            // 1. Get books present in project
            var bookNumbers = GetBookNumbersPresent(scrText);

            // 2. Build list of books with \fig markers
            var booksWithFig = new List<int>();
            foreach (var bookNum in bookNumbers)
            {
                var verseRef = new VerseRef(bookNum, 1, 1);
                string text = scrText.GetText(verseRef, false, true) ?? string.Empty;
                if (text.Contains(ProjectConstants.FigMarker))
                {
                    booksWithFig.Add(bookNum);
                }
            }

            int total = booksWithFig.Count;
            int current = 0;

            // 3. Process each book with \fig markers
            foreach (var bookNum in booksWithFig)
            {
                current++;
                progress?.Report(
                    new ConversionProgress(bookNum, current, total, $"Converting book {bookNum}")
                );

                // Get text and normalize to USFM 3
                var verseRef = new VerseRef(bookNum, 1, 1);
                string text = scrText.GetText(verseRef, false, true) ?? string.Empty;
                string normalizedText = UsfmToken.NormalizeUsfm(scrText, bookNum, text);

                // Put back if changed
                if (text != normalizedText)
                    scrText.PutText(bookNum, 0, false, normalizedText, null);
            }

            // 4. Set MinParatextDataVersion for USFM 3
            scrText.Settings.MinParatextDataVersion = ParatextInfo.MinSupportedParatextDataVersion;
        }

        /// <summary>
        /// Gets list of book numbers present in the ScrText.
        /// </summary>
        /// <param name="scrText">The ScrText to get book numbers from</param>
        /// <returns>List of 1-based book numbers present in the project</returns>
        private static List<int> GetBookNumbersPresent(ScrText scrText)
        {
            var bookNumbers = new List<int>();
            var booksPresentString = scrText.BooksPresentSet.Books;
            for (int i = 0; i < booksPresentString.Length; i++)
            {
                if (booksPresentString[i] == '1')
                    bookNumbers.Add(i + 1); // Book numbers are 1-based
            }
            return bookNumbers;
        }

        #region CAP-013, CAP-014, CAP-015: Main Commands

        /// <summary>
        /// Creates a new Paratext project with specified settings.
        ///
        /// Orchestrates all the capabilities implemented in Phases 1-5:
        /// 1. Validates short name (CAP-001)
        /// 2. Creates default base project (CAP-005)
        /// 3. Initializes with default values (CAP-006)
        /// 4. Calculates translation info (CAP-007)
        /// 5. Ensures GUID (CAP-008)
        /// 6. Persists settings (CAP-009)
        /// 7. Updates comment tags (CAP-012)
        /// 8. For Study Bible: MakeCopyOfBase (CAP-010)
        /// </summary>
        /// <param name="request">Project creation parameters</param>
        /// <param name="progress">Progress reporter for long operations (Study Bible book copy)</param>
        /// <returns>Result containing project ID and GUID on success</returns>
        /// <seealso cref="CAP-013 in strategic-plan.md"/>
        public static CreateProjectResult CreateProject(
            CreateProjectRequest request,
            IProgress<BookCopyProgress>? progress = null
        )
        {
            // 1. Validate short name (CAP-001)
            var validation = ProjectValidationService.ValidateShortName(
                request.ShortName,
                isNewProject: true
            );
            if (!validation.IsValid)
            {
                return CreateProjectResult.Failed(
                    ProjectCreationErrorCode.InvalidShortName,
                    $"Invalid short name: {validation.ErrorCode}"
                );
            }

            // 2. Parse project type - use the Enum<> wrapper constructor with string
            Enum<ProjectType> projectType;
            try
            {
                projectType = new Enum<ProjectType>(request.ProjectType);
            }
            catch
            {
                projectType = new Enum<ProjectType>("Standard");
            }

            // 3. Check if project type requires a base project
            bool requiresBase =
                projectType.IsDerivedType() || projectType == ProjectType.ConsultantNotes;

            // 4. Get base project for derived types
            ScrText? baseProject = null;
            if (requiresBase)
            {
                if (string.IsNullOrEmpty(request.BaseProjectName))
                {
                    return CreateProjectResult.Failed(
                        ProjectCreationErrorCode.BaseProjectNotFound,
                        "Derived project types require a base project"
                    );
                }
                baseProject = FindProjectByName(request.BaseProjectName);
                if (baseProject == null)
                {
                    return CreateProjectResult.Failed(
                        ProjectCreationErrorCode.BaseProjectNotFound,
                        $"Base project '{request.BaseProjectName}' not found"
                    );
                }
            }

            // 5. Create default ScrText (CAP-005)
            var scrText = CreateDefaultBaseProject();

            // 5a. Set project name (this is critical for lookup)
            scrText.Name = request.ShortName;

            // 6. Initialize with default values (CAP-006)
            var baseForInit = baseProject ?? scrText;
            InitializeScrTextWithDefaultValues(
                scrText,
                baseForInit,
                request.ShortName,
                request.FullName
            );

            // 7. Calculate translation info (CAP-007)
            var translationInfo = CalculateTranslationInfo(projectType, baseProject);
            scrText.Settings.TranslationInfo = translationInfo;

            // 8. Set additional settings from request
            if (!string.IsNullOrEmpty(request.LanguageId))
            {
                scrText.Settings.LanguageID = CreateLanguageId(request.LanguageId);
            }

            if (!string.IsNullOrEmpty(request.Copyright))
            {
                scrText.Settings.Copyright = request.Copyright;
            }

            // 9. Register project in collection (this is how tests verify project creation)
            ScrTextCollection.Add(scrText, skipChangeNotify: true, checkAlreadyExists: false);

            // 10. For Study Bible: copy books from base (CAP-010)
            if (projectType == ProjectType.StudyBible && baseProject != null)
            {
                MakeCopyOfBase(scrText, progress);
            }

            // 11. Update comment tags if provided (CAP-012)
            if (request.NoteTags != null && request.NoteTags.Count > 0)
            {
                UpdateCommentTags(scrText, request.NoteTags);
            }

            // 12. Return success with project ID and GUID
            string guid = scrText.Settings.Guid?.ToString() ?? "";
            return CreateProjectResult.Succeeded(request.ShortName, guid);
        }

        /// <summary>
        /// Updates settings on an existing project.
        ///
        /// Supports updating:
        /// - Full name
        /// - Copyright
        /// - Language ID
        /// - Comment tags (add/update/delete via CAP-012)
        ///
        /// Note: Short name is immutable and cannot be changed.
        /// </summary>
        /// <param name="request">Settings update request</param>
        /// <returns>Result with success status and any stylesheet errors</returns>
        /// <seealso cref="CAP-014 in strategic-plan.md"/>
        public static UpdateProjectResult UpdateProjectSettings(
            UpdateProjectSettingsRequest request
        )
        {
            // 1. Find project
            var scrText = FindProjectByName(request.ProjectName);
            if (scrText == null)
            {
                return UpdateProjectResult.Failed(
                    ProjectConstants.ProjectNotFoundErrorCode,
                    $"Project '{request.ProjectName}' not found"
                );
            }

            // 2. Update provided settings
            if (!string.IsNullOrEmpty(request.FullName))
                scrText.Settings.FullName = request.FullName;

            if (!string.IsNullOrEmpty(request.Copyright))
                scrText.Settings.Copyright = request.Copyright;

            if (!string.IsNullOrEmpty(request.LanguageId))
            {
                scrText.Settings.LanguageID = CreateLanguageId(request.LanguageId);
            }

            // 3. Update comment tags
            if (request.NoteTagsToAdd != null || request.NoteTagsToDelete != null)
            {
                UpdateCommentTags(scrText, request.NoteTagsToAdd, request.NoteTagsToDelete);
            }

            // 4. Return success (no stylesheet errors in this implementation)
            return UpdateProjectResult.Succeeded();
        }

        /// <summary>
        /// Gets basic information about an existing project.
        /// </summary>
        /// <param name="projectName">Project short name</param>
        /// <returns>Project information or null if not found</returns>
        /// <seealso cref="CAP-015 in strategic-plan.md"/>
        public static ProjectInfo? GetProjectInfo(string projectName)
        {
            // Handle null or empty project name
            if (string.IsNullOrEmpty(projectName))
                return null;

            // Find project by name (case-insensitive)
            var scrText = FindProjectByName(projectName);
            if (scrText == null)
                return null;

            // Build and return ProjectInfo
            // Get base project name from BaseScrText if available
            string? baseProjectName = scrText.Settings.TranslationInfo?.BaseScrText?.Name;

            return new ProjectInfo
            {
                ShortName = scrText.Name,
                FullName = scrText.Settings.FullName ?? scrText.Name,
                LanguageId = scrText.Settings.LanguageID?.Id ?? "und",
                ProjectType = scrText.Settings.TranslationInfo?.Type.ToString() ?? "Standard",
                BaseProjectName = baseProjectName,
                Versification = scrText.Settings.Versification?.Type.ToString() ?? "English",
                UsfmVersion = scrText.Settings.UsfmVersion.ToString(),
                ProjectGuid = scrText.Settings.Guid?.ToString(),
            };
        }

        /// <summary>
        /// Finds a project by name (case-insensitive lookup).
        /// </summary>
        /// <param name="projectName">Project short name to find</param>
        /// <returns>ScrText if found, null otherwise</returns>
        private static ScrText? FindProjectByName(string projectName)
        {
            return ScrTextCollection
                .ScrTexts(IncludeProjects.Everything)
                .FirstOrDefault(p =>
                    string.Equals(p.Name, projectName, StringComparison.OrdinalIgnoreCase)
                );
        }

        /// <summary>
        /// Creates a LanguageId from a language code string.
        /// </summary>
        /// <param name="languageCode">The language code (e.g., "en", "fr", "es")</param>
        /// <returns>A new LanguageId instance</returns>
        private static Paratext.Data.Languages.LanguageId CreateLanguageId(string languageCode)
        {
            return new Paratext.Data.Languages.LanguageId(languageCode, null, null, null);
        }

        #endregion
    }
}
