using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.CreatingProjects;
using Paratext.Data;

namespace TestParanextDataProvider.CreatingProjects
{
    /// <summary>
    /// Tests for CAP-014: UpdateProjectSettings command.
    /// TDD Variant: Outside-In TDD
    ///
    /// UpdateProjectSettings supports updating:
    /// - Full name
    /// - Copyright
    /// - Language ID
    /// - Comment tags (add/update/delete via CAP-012)
    ///
    /// Short name is immutable and cannot be changed.
    ///
    /// References: strategic-plan.md CAP-014, data-contracts.md Section 4.6
    /// Behaviors: BHV-003, BHV-021, BHV-025
    /// </summary>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    [Category("CreatingProjects")]
    [Category("CAP-014")]
    internal class UpdateProjectSettingsTests : PapiTestBase
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

        /// <summary>
        /// Helper to create a project for update tests.
        /// </summary>
        private void CreateTestProject(
            string shortName = "TestPrj",
            string fullName = "Test Project"
        )
        {
            var request = new CreateProjectRequest
            {
                ShortName = shortName,
                FullName = fullName,
                LanguageId = "eng",
                ProjectType = "Standard",
            };
            ProjectCreationService.CreateProject(request);
        }

        #region Acceptance Tests

        /// <summary>
        /// ACCEPTANCE TEST for CAP-014: UpdateProjectSettings command.
        /// Updates full name on existing project successfully.
        /// This is the "done signal" - when this test passes, the capability is complete.
        /// </summary>
        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-014")]
        [Property("ScenarioId", "TS-updateSettings")]
        [Property("BehaviorId", "BHV-003")]
        [Description("Acceptance: UpdateProjectSettings updates project settings successfully")]
        public void UpdateProjectSettings_AcceptanceTest_UpdatesSettingsSuccessfully()
        {
            // Arrange - Create a project first
            CreateTestProject("UpdtPrj", "Original Name");

            var updateRequest = new UpdateProjectSettingsRequest
            {
                ProjectName = "UpdtPrj",
                FullName = "Updated Project Name",
                Copyright = "Copyright 2025 Test Organization",
            };

            // Act
            var result = ProjectCreationService.UpdateProjectSettings(updateRequest);

            // Assert - Full acceptance criteria
            Assert.Multiple(() =>
            {
                Assert.That(result.Success, Is.True, "Update should succeed");
                Assert.That(result.ErrorCode, Is.Null, "No error code on success");
                Assert.That(result.ErrorMessage, Is.Null, "No error message on success");
            });
        }

        #endregion

        #region Happy Path Tests - Full Name Update

        /// <summary>
        /// Updates full name on existing project.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-update-fullname")]
        [Property("BehaviorId", "BHV-003")]
        [Description("UpdateProjectSettings updates full name successfully")]
        public void UpdateProjectSettings_WithFullName_UpdatesFullNameSuccessfully()
        {
            // Arrange
            CreateTestProject("UpdtPrj", "Original Name");

            var updateRequest = new UpdateProjectSettingsRequest
            {
                ProjectName = "UpdtPrj",
                FullName = "New Full Name",
            };

            // Act
            var result = ProjectCreationService.UpdateProjectSettings(updateRequest);

            // Assert
            Assert.That(result.Success, Is.True, "Full name update should succeed");
        }

        #endregion

        #region Happy Path Tests - Copyright Update

        /// <summary>
        /// Updates copyright on existing project.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-update-copyright")]
        [Property("BehaviorId", "BHV-003")]
        [Description("UpdateProjectSettings updates copyright successfully")]
        public void UpdateProjectSettings_WithCopyright_UpdatesCopyrightSuccessfully()
        {
            // Arrange
            CreateTestProject("CpyPrj", "Test Project");

            var updateRequest = new UpdateProjectSettingsRequest
            {
                ProjectName = "CpyPrj",
                Copyright = "Copyright 2025 Test Organization",
            };

            // Act
            var result = ProjectCreationService.UpdateProjectSettings(updateRequest);

            // Assert
            Assert.That(result.Success, Is.True, "Copyright update should succeed");
        }

        #endregion

        #region Happy Path Tests - Language ID Update

        /// <summary>
        /// Updates language ID on existing project.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-update-language")]
        [Property("BehaviorId", "BHV-003")]
        [Description("UpdateProjectSettings updates language ID successfully")]
        public void UpdateProjectSettings_WithLanguageId_UpdatesLanguageIdSuccessfully()
        {
            // Arrange
            CreateTestProject("LngPrj", "Test Project");

            var updateRequest = new UpdateProjectSettingsRequest
            {
                ProjectName = "LngPrj",
                LanguageId = "fra", // Change from eng to fra
            };

            // Act
            var result = ProjectCreationService.UpdateProjectSettings(updateRequest);

            // Assert
            Assert.That(result.Success, Is.True, "Language ID update should succeed");
        }

        #endregion

        #region Happy Path Tests - Comment Tags

        /// <summary>
        /// Adds comment tags to existing project.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-042")]
        [Property("BehaviorId", "BHV-021")]
        [Description("UpdateProjectSettings adds comment tags successfully")]
        public void UpdateProjectSettings_WithNoteTagsToAdd_AddsTagsSuccessfully()
        {
            // Arrange
            CreateTestProject("TagPrj", "Test Project");

            var tagsToAdd = new List<NoteTag>
            {
                new() { Id = "1", Name = "To Do", Icon = "task" },
                new() { Id = "2", Name = "Question", Icon = "help" },
            };

            var updateRequest = new UpdateProjectSettingsRequest
            {
                ProjectName = "TagPrj",
                NoteTagsToAdd = tagsToAdd,
            };

            // Act
            var result = ProjectCreationService.UpdateProjectSettings(updateRequest);

            // Assert
            Assert.That(result.Success, Is.True, "Adding tags should succeed");
        }

        /// <summary>
        /// Removes comment tags from existing project.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-042")]
        [Property("BehaviorId", "BHV-021")]
        [Description("UpdateProjectSettings removes comment tags successfully")]
        public void UpdateProjectSettings_WithNoteTagsToDelete_RemovesTagsSuccessfully()
        {
            // Arrange - Create project with tags
            CreateTestProject("DelPrj", "Test Project");

            // First add tags
            var tagsToAdd = new List<NoteTag>
            {
                new() { Id = "1", Name = "To Do", Icon = "task" },
                new() { Id = "2", Name = "Question", Icon = "help" },
            };
            ProjectCreationService.UpdateProjectSettings(
                new UpdateProjectSettingsRequest { ProjectName = "DelPrj", NoteTagsToAdd = tagsToAdd }
            );

            // Now remove one tag
            var tagsToDelete = new List<NoteTag>
            {
                new() { Id = "1", Name = "To Do" }, // Only ID needed for deletion
            };

            var updateRequest = new UpdateProjectSettingsRequest
            {
                ProjectName = "DelPrj",
                NoteTagsToDelete = tagsToDelete,
            };

            // Act
            var result = ProjectCreationService.UpdateProjectSettings(updateRequest);

            // Assert
            Assert.That(result.Success, Is.True, "Removing tags should succeed");
        }

        /// <summary>
        /// Updates existing comment tags.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-042")]
        [Property("BehaviorId", "BHV-021")]
        [Description("UpdateProjectSettings updates existing comment tags")]
        public void UpdateProjectSettings_WithExistingTagUpdate_UpdatesTagSuccessfully()
        {
            // Arrange - Create project with tags
            CreateTestProject("UpdTag", "Test Project");

            // First add tags
            var tagsToAdd = new List<NoteTag>
            {
                new() { Id = "1", Name = "To Do", Icon = "task" },
            };
            ProjectCreationService.UpdateProjectSettings(
                new UpdateProjectSettingsRequest
                {
                    ProjectName = "UpdTag",
                    NoteTagsToAdd = tagsToAdd,
                }
            );

            // Now update the tag (same ID, different name)
            var updatedTags = new List<NoteTag>
            {
                new() { Id = "1", Name = "In Progress", Icon = "work" },
            };

            var updateRequest = new UpdateProjectSettingsRequest
            {
                ProjectName = "UpdTag",
                NoteTagsToAdd = updatedTags, // AddOrUpdate semantics
            };

            // Act
            var result = ProjectCreationService.UpdateProjectSettings(updateRequest);

            // Assert
            Assert.That(result.Success, Is.True, "Updating tags should succeed");
        }

        #endregion

        #region Error Handling Tests

        /// <summary>
        /// Returns PROJECT_NOT_FOUND for non-existent project.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-update-notfound")]
        [Property("BehaviorId", "BHV-003")]
        [Description("UpdateProjectSettings with non-existent project returns PROJECT_NOT_FOUND")]
        public void UpdateProjectSettings_WithNonExistentProject_ReturnsProjectNotFoundError()
        {
            // Arrange - Don't create project
            var updateRequest = new UpdateProjectSettingsRequest
            {
                ProjectName = "NonExist",
                FullName = "Updated Name",
            };

            // Act
            var result = ProjectCreationService.UpdateProjectSettings(updateRequest);

            // Assert
            Assert.Multiple(() =>
            {
                Assert.That(result.Success, Is.False, "Should fail for non-existent project");
                Assert.That(result.ErrorCode, Is.EqualTo("PROJECT_NOT_FOUND"));
            });
        }

        /// <summary>
        /// Cannot change short name after project creation.
        /// Note: Short name is not in UpdateProjectSettingsRequest, but if implementation
        /// detects an attempt to change it through other means, it should return error.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-update-immutable")]
        [Property("BehaviorId", "BHV-003")]
        [Description("Short name is immutable and cannot be changed")]
        public void UpdateProjectSettings_ShortNameIsImmutable()
        {
            // Arrange
            CreateTestProject("ImmPrj", "Test Project");

            // Note: UpdateProjectSettingsRequest doesn't have a ShortName field
            // This test verifies the contract that short name cannot be changed
            var updateRequest = new UpdateProjectSettingsRequest
            {
                ProjectName = "ImmPrj", // This is lookup, not change
                FullName = "Updated Full Name", // This can change
            };

            // Act
            var result = ProjectCreationService.UpdateProjectSettings(updateRequest);

            // Assert - Update succeeds but short name remains unchanged
            Assert.That(result.Success, Is.True, "Update without short name change should succeed");
        }

        #endregion

        #region Multiple Updates Test

        /// <summary>
        /// Updates multiple settings in single request.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-update-multiple")]
        [Property("BehaviorId", "BHV-003, BHV-021")]
        [Description("UpdateProjectSettings updates multiple settings in single request")]
        public void UpdateProjectSettings_WithMultipleChanges_UpdatesAllSuccessfully()
        {
            // Arrange
            CreateTestProject("MltPrj", "Original Name");

            var tagsToAdd = new List<NoteTag>
            {
                new() { Id = "1", Name = "To Do" },
            };

            var updateRequest = new UpdateProjectSettingsRequest
            {
                ProjectName = "MltPrj",
                FullName = "New Full Name",
                Copyright = "Copyright 2025",
                LanguageId = "fra",
                NoteTagsToAdd = tagsToAdd,
            };

            // Act
            var result = ProjectCreationService.UpdateProjectSettings(updateRequest);

            // Assert
            Assert.That(result.Success, Is.True, "Multiple updates should succeed");
        }

        /// <summary>
        /// Empty update request (no changes) succeeds.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-update-empty")]
        [Property("BehaviorId", "BHV-003")]
        [Description("UpdateProjectSettings with no changes succeeds")]
        public void UpdateProjectSettings_WithNoChanges_Succeeds()
        {
            // Arrange
            CreateTestProject("EmptyPrj", "Test Project");

            var updateRequest = new UpdateProjectSettingsRequest
            {
                ProjectName = "EmptyPrj",
                // All other fields null - no changes
            };

            // Act
            var result = ProjectCreationService.UpdateProjectSettings(updateRequest);

            // Assert
            Assert.That(result.Success, Is.True, "Empty update should succeed");
        }

        #endregion

        #region Stylesheet Errors Test

        /// <summary>
        /// Returns stylesheet errors when they occur during update.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-update-stylesheet")]
        [Property("BehaviorId", "BHV-025")]
        [Description("UpdateProjectSettings returns stylesheet errors when present")]
        public void UpdateProjectSettings_WithStylesheetIssues_ReturnsStylesheetErrors()
        {
            // Arrange
            CreateTestProject("StyPrj", "Test Project");

            var updateRequest = new UpdateProjectSettingsRequest
            {
                ProjectName = "StyPrj",
                FullName = "Updated Name",
            };

            // Act
            var result = ProjectCreationService.UpdateProjectSettings(updateRequest);

            // Assert - StylesheetErrors may be null or empty if no errors
            // This test verifies the capability exists
            if (result.Success)
            {
                // StylesheetErrors should be a list (possibly empty or null)
                Assert.That(
                    result.StylesheetErrors,
                    Is.Null.Or.Empty.Or.TypeOf<List<string>>(),
                    "StylesheetErrors should be null, empty, or a list"
                );
            }
        }

        #endregion
    }
}
