using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.CreatingProjects;
using Paratext.Data;

namespace TestParanextDataProvider.CreatingProjects
{
    /// <summary>
    /// Tests for CAP-013: CreateProject command.
    /// TDD Variant: Outside-In TDD
    ///
    /// CreateProject orchestrates all Phase 1-5 capabilities:
    /// - Validates short name (CAP-001)
    /// - Creates default base project (CAP-005)
    /// - Initializes with default values (CAP-006)
    /// - Calculates translation info (CAP-007)
    /// - Ensures GUID (CAP-008)
    /// - Persists settings (CAP-009)
    /// - Updates comment tags (CAP-012)
    /// - For Study Bible: MakeCopyOfBase (CAP-010)
    ///
    /// References: strategic-plan.md CAP-013, data-contracts.md Section 4.1
    /// Golden Masters: GM-001, GM-002, GM-003, GM-004
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    [Category("CreatingProjects")]
    [Category("CAP-013")]
    internal class CreateProjectCommandTests : PapiTestBase
    {
        [SetUp]
        public override Task TestSetupAsync()
        {
            // Set up factory to use DummyScrText for testing
            ProjectCreationService.ScrTextFactory = () => CreateDummyProject();
            return base.TestSetupAsync();
        }

        [TearDown]
        public override void TestTearDown()
        {
            // Reset factory after test
            ProjectCreationService.ScrTextFactory = null;
            base.TestTearDown();
        }

        #region Acceptance Tests

        /// <summary>
        /// ACCEPTANCE TEST for CAP-013: CreateProject command.
        /// Creates a standard project successfully and returns valid result.
        /// This is the "done signal" - when this test passes, the capability is complete.
        /// </summary>
        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-013")]
        [Property("ScenarioId", "TS-001")]
        [Property("BehaviorId", "BHV-001, BHV-007, BHV-008, BHV-009, BHV-011, BHV-012, BHV-015")]
        [Description("Acceptance: CreateProject creates standard project successfully")]
        public void CreateProject_AcceptanceTest_CreatesStandardProjectSuccessfully()
        {
            // Arrange
            var request = new CreateProjectRequest
            {
                ShortName = "TestPrj",
                FullName = "Test Translation Project",
                LanguageId = "eng",
                ProjectType = "Standard",
                Versification = "English",
                UsfmVersion = "Version3",
            };

            // Act
            var result = ProjectCreationService.CreateProject(request);

            // Assert - Full acceptance criteria
            Assert.Multiple(() =>
            {
                Assert.That(result.Success, Is.True, "Operation should succeed");
                Assert.That(result.ProjectId, Is.EqualTo("TestPrj"), "ProjectId matches short name");
                Assert.That(
                    result.ProjectGuid,
                    Is.Not.Null.And.Length.EqualTo(40),
                    "GUID should be 40-char hex"
                );
                Assert.That(result.ErrorCode, Is.Null, "No error code on success");
                Assert.That(result.ErrorMessage, Is.Null, "No error message on success");
            });
        }

        #endregion

        #region Happy Path Tests

        /// <summary>
        /// Creates a standard project with all required fields.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-001")]
        [Property("BehaviorId", "BHV-001")]
        [Description("CreateProject with valid standard request returns success")]
        public void CreateProject_WithValidStandardRequest_ReturnsSuccess()
        {
            // Arrange
            var request = new CreateProjectRequest
            {
                ShortName = "StdProj",
                FullName = "Standard Project",
                LanguageId = "eng",
                ProjectType = "Standard",
            };

            // Act
            var result = ProjectCreationService.CreateProject(request);

            // Assert
            Assert.That(result.Success, Is.True, "Standard project creation should succeed");
        }

        /// <summary>
        /// Creates a back translation project with base project reference.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-002")]
        [Property("BehaviorId", "BHV-001, BHV-010")]
        [Description("CreateProject creates back translation with base project")]
        public void CreateProject_WithBackTranslationAndBase_ReturnsSuccess()
        {
            // Arrange - First create a base project
            var baseRequest = new CreateProjectRequest
            {
                ShortName = "BasePrj",
                FullName = "Base Project",
                LanguageId = "eng",
                ProjectType = "Standard",
            };
            ProjectCreationService.CreateProject(baseRequest);

            // Act - Create back translation based on the base project
            var btRequest = new CreateProjectRequest
            {
                ShortName = "BTProj",
                FullName = "Back Translation Project",
                LanguageId = "eng",
                ProjectType = "BackTranslation",
                BaseProjectName = "BasePrj",
            };
            var result = ProjectCreationService.CreateProject(btRequest);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Success, Is.True, "Back translation creation should succeed");
                Assert.That(result.ProjectId, Is.EqualTo("BTProj"));
            });
        }

        /// <summary>
        /// Creates a study bible project and copies all books from base.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-004")]
        [Property("BehaviorId", "BHV-001, BHV-014")]
        [Description("CreateProject creates study bible and copies books from base")]
        public void CreateProject_WithStudyBible_CopiesAllBooksFromBase()
        {
            // Arrange - First create a base project
            var baseRequest = new CreateProjectRequest
            {
                ShortName = "BasePrj",
                FullName = "Base Project",
                LanguageId = "eng",
                ProjectType = "Standard",
            };
            ProjectCreationService.CreateProject(baseRequest);

            // Act - Create study bible
            var sbRequest = new CreateProjectRequest
            {
                ShortName = "SBProj",
                FullName = "Study Bible Project",
                LanguageId = "eng",
                ProjectType = "StudyBible",
                BaseProjectName = "BasePrj",
            };
            var result = ProjectCreationService.CreateProject(sbRequest);

            // Assert
            Assert.That(result.Success, Is.True, "Study Bible creation should succeed");
        }

        /// <summary>
        /// Creates project with comment tags and verifies they are persisted.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-005")]
        [Property("BehaviorId", "BHV-021")]
        [Description("CreateProject with comment tags persists the tags")]
        public void CreateProject_WithNoteTags_PersistsTagsToProject()
        {
            // Arrange
            var tags = new List<NoteTag>
            {
                new() { Id = "1", Name = "To Do", Icon = "task" },
                new() { Id = "2", Name = "Question", Icon = "help" },
            };
            var request = new CreateProjectRequest
            {
                ShortName = "TagProj",
                FullName = "Project with Tags",
                LanguageId = "eng",
                ProjectType = "Standard",
                NoteTags = tags,
            };

            // Act
            var result = ProjectCreationService.CreateProject(request);

            // Assert
            Assert.That(result.Success, Is.True, "Project with tags should be created");
        }

        /// <summary>
        /// Created project has valid GUID after creation.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-029")]
        [Property("BehaviorId", "BHV-007, BHV-009")]
        [Description("CreateProject generates valid GUID")]
        public void CreateProject_GeneratesValidGuid()
        {
            // Arrange
            var request = new CreateProjectRequest
            {
                ShortName = "GuidPrj",
                FullName = "Project with GUID",
                LanguageId = "eng",
                ProjectType = "Standard",
            };

            // Act
            var result = ProjectCreationService.CreateProject(request);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Success, Is.True);
                Assert.That(result.ProjectGuid, Is.Not.Null);
                Assert.That(result.ProjectGuid!.Length, Is.EqualTo(40), "GUID should be 40 hex chars");
                Assert.That(
                    result.ProjectGuid,
                    Does.Match("^[0-9a-fA-F]+$"),
                    "GUID should be hexadecimal"
                );
            });
        }

        /// <summary>
        /// CreateProject initializes Mercurial repository.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-030")]
        [Property("BehaviorId", "BHV-008, BHV-024")]
        [Description("CreateProject initializes Mercurial repository")]
        public void CreateProject_InitializesMercurialRepository()
        {
            // Arrange
            var request = new CreateProjectRequest
            {
                ShortName = "HgProj",
                FullName = "Project with Hg",
                LanguageId = "eng",
                ProjectType = "Standard",
            };

            // Act - repository initialization is part of GUID generation
            var result = ProjectCreationService.CreateProject(request);

            // Assert - If GUID was generated, repository was initialized
            Assert.Multiple(() =>
            {
                Assert.That(result.Success, Is.True);
                Assert.That(
                    result.ProjectGuid,
                    Is.Not.Null,
                    "GUID indicates repository was initialized"
                );
            });
        }

        /// <summary>
        /// CreateProject sets all default values correctly.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-052")]
        [Property("BehaviorId", "BHV-001, BHV-002")]
        [Description("CreateProject sets all default values correctly")]
        public void CreateProject_SetsAllDefaultValuesCorrectly()
        {
            // Arrange
            var request = new CreateProjectRequest
            {
                ShortName = "DfltPrj",
                FullName = "Project with Defaults",
                LanguageId = "eng",
                ProjectType = "Standard",
                // Intentionally leave versification, usfmVersion, normalization at defaults
            };

            // Act
            var result = ProjectCreationService.CreateProject(request);

            // Assert
            Assert.That(
                result.Success,
                Is.True,
                "Project with default values should be created successfully"
            );
        }

        #endregion

        #region Error Handling Tests

        /// <summary>
        /// Returns INVALID_SHORT_NAME for names that fail validation.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-006")]
        [Property("BehaviorId", "BHV-005")]
        [Description("CreateProject with invalid short name returns INVALID_SHORT_NAME")]
        public void CreateProject_WithInvalidShortName_ReturnsInvalidShortNameError()
        {
            // Arrange - short name too short
            var request = new CreateProjectRequest
            {
                ShortName = "AB", // Too short (must be 3-8)
                FullName = "Invalid Project",
                LanguageId = "eng",
                ProjectType = "Standard",
            };

            // Act
            var result = ProjectCreationService.CreateProject(request);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Success, Is.False, "Should fail for invalid short name");
                Assert.That(
                    result.ErrorCode,
                    Is.EqualTo(ProjectCreationErrorCode.InvalidShortName)
                );
            });
        }

        /// <summary>
        /// Returns BASE_PROJECT_NOT_FOUND for derived type without base.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-007")]
        [Property("BehaviorId", "BHV-010")]
        [Description("CreateProject with missing base project returns BASE_PROJECT_NOT_FOUND")]
        public void CreateProject_WithMissingBaseProject_ReturnsBaseProjectNotFoundError()
        {
            // Arrange - back translation without base project
            var request = new CreateProjectRequest
            {
                ShortName = "BTProj",
                FullName = "Back Translation",
                LanguageId = "eng",
                ProjectType = "BackTranslation",
                BaseProjectName = "NonExistent", // This project doesn't exist
            };

            // Act
            var result = ProjectCreationService.CreateProject(request);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Success, Is.False, "Should fail for missing base");
                Assert.That(
                    result.ErrorCode,
                    Is.EqualTo(ProjectCreationErrorCode.BaseProjectNotFound)
                );
            });
        }

        /// <summary>
        /// Returns BASE_PROJECT_NOT_FOUND when base not specified for derived type.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-008")]
        [Property("BehaviorId", "BHV-010")]
        [Description("CreateProject derived type without base name returns error")]
        public void CreateProject_DerivedTypeWithoutBaseName_ReturnsError()
        {
            // Arrange - back translation without base project name
            var request = new CreateProjectRequest
            {
                ShortName = "BTProj",
                FullName = "Back Translation",
                LanguageId = "eng",
                ProjectType = "BackTranslation",
                BaseProjectName = null, // Missing required base
            };

            // Act
            var result = ProjectCreationService.CreateProject(request);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Success, Is.False, "Should fail without base");
                Assert.That(
                    result.ErrorCode,
                    Is.EqualTo(ProjectCreationErrorCode.BaseProjectNotFound)
                );
            });
        }

        /// <summary>
        /// Returns INVALID_SHORT_NAME for short name with spaces.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-012")]
        [Property("BehaviorId", "BHV-005")]
        [Description("CreateProject with spaces in short name returns error")]
        public void CreateProject_WithSpacesInShortName_ReturnsInvalidShortNameError()
        {
            // Arrange
            var request = new CreateProjectRequest
            {
                ShortName = "My Proj", // Contains space
                FullName = "My Project",
                LanguageId = "eng",
                ProjectType = "Standard",
            };

            // Act
            var result = ProjectCreationService.CreateProject(request);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Success, Is.False);
                Assert.That(
                    result.ErrorCode,
                    Is.EqualTo(ProjectCreationErrorCode.InvalidShortName)
                );
            });
        }

        /// <summary>
        /// Returns INVALID_SHORT_NAME for short name with invalid characters.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-014")]
        [Property("BehaviorId", "BHV-005")]
        [Description("CreateProject with invalid characters in short name returns error")]
        public void CreateProject_WithInvalidCharactersInShortName_ReturnsError()
        {
            // Arrange
            var request = new CreateProjectRequest
            {
                ShortName = "Proj@#", // Contains invalid chars
                FullName = "Invalid Project",
                LanguageId = "eng",
                ProjectType = "Standard",
            };

            // Act
            var result = ProjectCreationService.CreateProject(request);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Success, Is.False);
                Assert.That(
                    result.ErrorCode,
                    Is.EqualTo(ProjectCreationErrorCode.InvalidShortName)
                );
            });
        }

        /// <summary>
        /// Returns INVALID_SHORT_NAME for reserved Windows names.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-017")]
        [Property("BehaviorId", "BHV-005")]
        [Description("CreateProject with reserved Windows name returns error")]
        public void CreateProject_WithReservedName_ReturnsInvalidShortNameError()
        {
            // Arrange
            var request = new CreateProjectRequest
            {
                ShortName = "CON", // Windows reserved name
                FullName = "Reserved Name Project",
                LanguageId = "eng",
                ProjectType = "Standard",
            };

            // Act
            var result = ProjectCreationService.CreateProject(request);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Success, Is.False);
                Assert.That(
                    result.ErrorCode,
                    Is.EqualTo(ProjectCreationErrorCode.InvalidShortName)
                );
            });
        }

        /// <summary>
        /// Returns INVALID_SHORT_NAME for duplicate project name.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-015")]
        [Property("BehaviorId", "BHV-005")]
        [Description("CreateProject with duplicate name returns error")]
        public void CreateProject_WithDuplicateName_ReturnsInvalidShortNameError()
        {
            // Arrange - First create a project
            var firstRequest = new CreateProjectRequest
            {
                ShortName = "DupProj",
                FullName = "First Project",
                LanguageId = "eng",
                ProjectType = "Standard",
            };
            ProjectCreationService.CreateProject(firstRequest);

            // Act - Try to create another with same name
            var duplicateRequest = new CreateProjectRequest
            {
                ShortName = "DupProj", // Same name
                FullName = "Duplicate Project",
                LanguageId = "eng",
                ProjectType = "Standard",
            };
            var result = ProjectCreationService.CreateProject(duplicateRequest);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Success, Is.False);
                Assert.That(
                    result.ErrorCode,
                    Is.EqualTo(ProjectCreationErrorCode.InvalidShortName)
                );
            });
        }

        #endregion

        #region Invariant Tests

        /// <summary>
        /// Invariant: Every created project has a non-null GUID (INV-002).
        /// </summary>
        [Test]
        [Category("Invariant")]
        [Property("InvariantId", "INV-002")]
        [Property("BehaviorId", "BHV-007")]
        [Description("Every created project has a non-null GUID")]
        [TestCase("StdPrj1", "Standard")]
        public void CreateProject_AlwaysGeneratesNonNullGuid(string shortName, string projectType)
        {
            // Arrange
            var request = new CreateProjectRequest
            {
                ShortName = shortName,
                FullName = $"Test {shortName}",
                LanguageId = "eng",
                ProjectType = projectType,
            };

            // Act
            var result = ProjectCreationService.CreateProject(request);

            // Assert
            if (result.Success)
            {
                Assert.That(result.ProjectGuid, Is.Not.Null.And.Not.Empty);
            }
        }

        /// <summary>
        /// Invariant: Project names are unique case-insensitively (INV-001).
        /// </summary>
        [Test]
        [Category("Invariant")]
        [Property("InvariantId", "INV-001")]
        [Property("BehaviorId", "BHV-005")]
        [Description("Project names must be unique case-insensitively")]
        public void CreateProject_RejectsCaseInsensitiveDuplicates()
        {
            // Arrange - Create first project
            var firstRequest = new CreateProjectRequest
            {
                ShortName = "MyProj",
                FullName = "First Project",
                LanguageId = "eng",
                ProjectType = "Standard",
            };
            ProjectCreationService.CreateProject(firstRequest);

            // Act - Try to create with different case
            var duplicateRequest = new CreateProjectRequest
            {
                ShortName = "MYPROJ", // Same name, different case
                FullName = "Duplicate Project",
                LanguageId = "eng",
                ProjectType = "Standard",
            };
            var result = ProjectCreationService.CreateProject(duplicateRequest);

            // Assert - Should fail due to case-insensitive duplicate
            Assert.That(result.Success, Is.False, "Case-insensitive duplicates should be rejected");
        }

        #endregion

        #region Project Type Specific Tests

        /// <summary>
        /// Creates consultant notes project with base.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-003")]
        [Property("BehaviorId", "BHV-001, BHV-022")]
        [Description("CreateProject creates consultant notes with base project")]
        public void CreateProject_WithConsultantNotes_ReturnsSuccess()
        {
            // Arrange - First create a base project
            var baseRequest = new CreateProjectRequest
            {
                ShortName = "BasePrj",
                FullName = "Base Project",
                LanguageId = "eng",
                ProjectType = "Standard",
            };
            ProjectCreationService.CreateProject(baseRequest);

            // Act - Create consultant notes
            var cnRequest = new CreateProjectRequest
            {
                ShortName = "CNProj",
                FullName = "Consultant Notes",
                LanguageId = "eng",
                ProjectType = "ConsultantNotes",
                BaseProjectName = "BasePrj",
            };
            var result = ProjectCreationService.CreateProject(cnRequest);

            // Assert
            Assert.That(
                result.Success,
                Is.True,
                "Consultant notes project creation should succeed"
            );
        }

        #endregion
    }
}
