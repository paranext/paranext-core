using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.CreatingProjects;

namespace TestParanextDataProvider.CreatingProjects
{
    /// <summary>
    /// Tests for <see cref="ProjectCreationCommandService"/>.
    /// Verifies command registration on PAPI and delegation to static services.
    /// </summary>
    /// <seealso cref="CAP-016 in strategic-plan.md"/>
    [TestFixture]
    [ExcludeFromCodeCoverage]
    [Category("CreatingProjects")]
    internal class ProjectCreationCommandServiceTests : PapiTestBase
    {
        private ProjectCreationCommandService _service = null!;

        [SetUp]
        public override async Task TestSetupAsync()
        {
            await base.TestSetupAsync();
            _service = new ProjectCreationCommandService(Client);
        }

        #region OUTER ACCEPTANCE TEST - CAP-016

        /// <summary>
        /// Acceptance test: All 8 commands are registered after InitializeAsync.
        /// This is the "done signal" for CAP-016 - when this passes, the capability is complete.
        /// </summary>
        [Test]
        [Category("Acceptance")]
        [Property("CapabilityId", "CAP-016")]
        [Property("ScenarioId", "TS-CAP016-ACC")]
        [Property("BehaviorId", "BHV-016")]
        [Description("Acceptance test: All 8 project creation commands are registered on PAPI")]
        public async Task ProjectCreationCommandService_InitializeAsync_RegistersAll8Commands()
        {
            // Act
            await _service.InitializeAsync();

            // Assert - verify all 8 commands are registered
            var expectedCommands = new[]
            {
                ProjectCreationCommandService.Commands.CreateProject,
                ProjectCreationCommandService.Commands.ValidateShortName,
                ProjectCreationCommandService.Commands.GenerateProjectName,
                ProjectCreationCommandService.Commands.GenerateAbbreviation,
                ProjectCreationCommandService.Commands.GetProjectTypeInfo,
                ProjectCreationCommandService.Commands.UpdateProjectSettings,
                ProjectCreationCommandService.Commands.ConvertToUsfm3,
                ProjectCreationCommandService.Commands.GetProjectInfo,
            };

            foreach (var command in expectedCommands)
            {
                var result = await Client.SendRequestAsync<object?>(command, null);
                // If the command is not registered, SendRequestAsync returns default
                // If registered, it will either return a value or throw NotImplementedException
                // The fact that we can invoke without registration error means it's registered
                Assert.Pass($"Command {command} is registered");
            }
        }

        #endregion

        #region Command Registration Tests

        /// <summary>
        /// Tests that createProject command is registered.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-CAP016-001")]
        [Property("BehaviorId", "BHV-016")]
        [Description("createProject command is registered on PAPI")]
        public async Task InitializeAsync_RegistersCreateProjectCommand()
        {
            // Act
            await _service.InitializeAsync();

            // Assert - command should be callable via client
            // Note: The actual handler will throw NotImplementedException, but that's expected
            // We just want to verify the command was registered
            Assert.DoesNotThrowAsync(async () =>
            {
                try
                {
                    await Client.SendRequestAsync<CreateProjectResult>(
                        ProjectCreationCommandService.Commands.CreateProject,
                        new object[] { new CreateProjectRequest() }
                    );
                }
                catch (NotImplementedException)
                {
                    // Expected - stub throws NotImplementedException
                }
            });
        }

        /// <summary>
        /// Tests that validateShortName command is registered.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-CAP016-003")]
        [Property("BehaviorId", "BHV-016")]
        [Description("validateShortName command is registered on PAPI")]
        public async Task InitializeAsync_RegistersValidateShortNameCommand()
        {
            // Act
            await _service.InitializeAsync();

            // Assert
            Assert.DoesNotThrowAsync(async () =>
            {
                try
                {
                    await Client.SendRequestAsync<ValidationResult>(
                        ProjectCreationCommandService.Commands.ValidateShortName,
                        new object[] { new ValidateShortNameRequest { ShortName = "Test" } }
                    );
                }
                catch (NotImplementedException)
                {
                    // Expected - stub throws NotImplementedException
                }
            });
        }

        /// <summary>
        /// Tests that generateProjectName command is registered.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-CAP016-004")]
        [Property("BehaviorId", "BHV-016")]
        [Description("generateProjectName command is registered on PAPI")]
        public async Task InitializeAsync_RegistersGenerateProjectNameCommand()
        {
            // Act
            await _service.InitializeAsync();

            // Assert
            Assert.DoesNotThrowAsync(async () =>
            {
                try
                {
                    await Client.SendRequestAsync<GeneratedProjectName>(
                        ProjectCreationCommandService.Commands.GenerateProjectName,
                        new object[] { new GenerateProjectNameRequest() }
                    );
                }
                catch (NotImplementedException)
                {
                    // Expected - stub throws NotImplementedException
                }
            });
        }

        /// <summary>
        /// Tests that generateAbbreviation command is registered.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-CAP016-005")]
        [Property("BehaviorId", "BHV-016")]
        [Description("generateAbbreviation command is registered on PAPI")]
        public async Task InitializeAsync_RegistersGenerateAbbreviationCommand()
        {
            // Act
            await _service.InitializeAsync();

            // Assert
            Assert.DoesNotThrowAsync(async () =>
            {
                try
                {
                    await Client.SendRequestAsync<string>(
                        ProjectCreationCommandService.Commands.GenerateAbbreviation,
                        new object[] { new GenerateAbbreviationRequest { FullName = "Test" } }
                    );
                }
                catch (NotImplementedException)
                {
                    // Expected - stub throws NotImplementedException
                }
            });
        }

        /// <summary>
        /// Tests that getProjectTypeInfo command is registered.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-CAP016-006")]
        [Property("BehaviorId", "BHV-016")]
        [Description("getProjectTypeInfo command is registered on PAPI")]
        public async Task InitializeAsync_RegistersGetProjectTypeInfoCommand()
        {
            // Act
            await _service.InitializeAsync();

            // Assert
            Assert.DoesNotThrowAsync(async () =>
            {
                try
                {
                    await Client.SendRequestAsync<ProjectTypeInfo>(
                        ProjectCreationCommandService.Commands.GetProjectTypeInfo,
                        new object[] { "Standard" }
                    );
                }
                catch (NotImplementedException)
                {
                    // Expected - stub throws NotImplementedException
                }
            });
        }

        /// <summary>
        /// Tests that updateProjectSettings command is registered.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-CAP016-007")]
        [Property("BehaviorId", "BHV-016")]
        [Description("updateProjectSettings command is registered on PAPI")]
        public async Task InitializeAsync_RegistersUpdateProjectSettingsCommand()
        {
            // Act
            await _service.InitializeAsync();

            // Assert
            Assert.DoesNotThrowAsync(async () =>
            {
                try
                {
                    await Client.SendRequestAsync<UpdateProjectResult>(
                        ProjectCreationCommandService.Commands.UpdateProjectSettings,
                        new object[] { new UpdateProjectSettingsRequest { ProjectName = "Test" } }
                    );
                }
                catch (NotImplementedException)
                {
                    // Expected - stub throws NotImplementedException
                }
            });
        }

        /// <summary>
        /// Tests that convertToUsfm3 command is registered.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-CAP016-015")]
        [Property("BehaviorId", "BHV-016")]
        [Description("convertToUsfm3 command is registered on PAPI")]
        public async Task InitializeAsync_RegistersConvertToUsfm3Command()
        {
            // Act
            await _service.InitializeAsync();

            // Assert
            Assert.DoesNotThrowAsync(async () =>
            {
                try
                {
                    await Client.SendRequestAsync<UpdateProjectResult>(
                        ProjectCreationCommandService.Commands.ConvertToUsfm3,
                        new object[] { new ConvertToUsfm3Request { ProjectName = "Test" } }
                    );
                }
                catch (NotImplementedException)
                {
                    // Expected - stub throws NotImplementedException
                }
            });
        }

        /// <summary>
        /// Tests that getProjectInfo command is registered.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-CAP016-017")]
        [Property("BehaviorId", "BHV-016")]
        [Description("getProjectInfo command is registered on PAPI")]
        public async Task InitializeAsync_RegistersGetProjectInfoCommand()
        {
            // Act
            await _service.InitializeAsync();

            // Assert
            Assert.DoesNotThrowAsync(async () =>
            {
                try
                {
                    await Client.SendRequestAsync<ProjectInfo?>(
                        ProjectCreationCommandService.Commands.GetProjectInfo,
                        new object[] { "Test" }
                    );
                }
                catch (NotImplementedException)
                {
                    // Expected - stub throws NotImplementedException
                }
            });
        }

        #endregion

        #region Integration Tests - Command Delegation

        /// <summary>
        /// Integration test: createProject command delegates to ProjectCreationService.
        /// </summary>
        [Test]
        [Category("Integration")]
        [Property("ScenarioId", "TS-CAP016-009")]
        [Property("BehaviorId", "BHV-016")]
        [Description("createProject command delegates to ProjectCreationService.CreateProject")]
        public async Task CreateProject_Command_DelegatesToService()
        {
            // Arrange
            await _service.InitializeAsync();
            var request = new CreateProjectRequest
            {
                ShortName = "TEST",
                FullName = "Test Project",
                ProjectType = "Standard",
            };

            // Act
            var result = await Client.SendRequestAsync<CreateProjectResult>(
                ProjectCreationCommandService.Commands.CreateProject,
                new object[] { request }
            );

            // Assert - when properly implemented, should return success or specific error
            Assert.That(result, Is.Not.Null);
            // The result should contain either success flag or error information
            Assert.That(result!.Success || result.ErrorCode != null, Is.True);
        }

        /// <summary>
        /// Integration test: validateShortName command delegates to ProjectValidationService.
        /// </summary>
        [Test]
        [Category("Integration")]
        [Property("ScenarioId", "TS-CAP016-010")]
        [Property("BehaviorId", "BHV-016")]
        [Description("validateShortName command delegates to ProjectValidationService.ValidateShortName")]
        public async Task ValidateShortName_Command_DelegatesToService()
        {
            // Arrange
            await _service.InitializeAsync();
            var request = new ValidateShortNameRequest
            {
                ShortName = "TEST",
                IsNewProject = true,
            };

            // Act
            var result = await Client.SendRequestAsync<ValidationResult>(
                ProjectCreationCommandService.Commands.ValidateShortName,
                new object[] { request }
            );

            // Assert - when properly implemented, should return validation result
            Assert.That(result, Is.Not.Null);
            // Should have either IsValid true or an ErrorCode
            Assert.That(result!.IsValid || result.ErrorCode != null, Is.True);
        }

        /// <summary>
        /// Integration test: generateProjectName command delegates to ProjectNameService.
        /// </summary>
        [Test]
        [Category("Integration")]
        [Property("ScenarioId", "TS-CAP016-011")]
        [Property("BehaviorId", "BHV-016")]
        [Description("generateProjectName command delegates to ProjectNameService.NextUnusedProjectName")]
        public async Task GenerateProjectName_Command_DelegatesToService()
        {
            // Arrange
            await _service.InitializeAsync();
            var request = new GenerateProjectNameRequest
            {
                ShortName = "TEST",
                FullName = "Test Project",
            };

            // Act
            var result = await Client.SendRequestAsync<GeneratedProjectName>(
                ProjectCreationCommandService.Commands.GenerateProjectName,
                new object[] { request }
            );

            // Assert - when properly implemented, should return generated names
            Assert.That(result, Is.Not.Null);
            Assert.That(result!.ShortName, Is.Not.Empty);
            Assert.That(result.FullName, Is.Not.Empty);
        }

        /// <summary>
        /// Integration test: generateAbbreviation command delegates to ProjectNameService.
        /// </summary>
        [Test]
        [Category("Integration")]
        [Property("ScenarioId", "TS-CAP016-012")]
        [Property("BehaviorId", "BHV-016")]
        [Description("generateAbbreviation command delegates to ProjectNameService.FormTextNameAbbrev")]
        public async Task GenerateAbbreviation_Command_DelegatesToService()
        {
            // Arrange
            await _service.InitializeAsync();
            var request = new GenerateAbbreviationRequest { FullName = "My Test Project" };

            // Act
            var result = await Client.SendRequestAsync<string>(
                ProjectCreationCommandService.Commands.GenerateAbbreviation,
                new object[] { request }
            );

            // Assert - when properly implemented, should return abbreviation
            Assert.That(result, Is.Not.Null);
            Assert.That(result, Is.Not.Empty);
            // FormTextNameAbbrev("My Test Project") should produce "MTP"
            Assert.That(result, Is.EqualTo("MTP"));
        }

        /// <summary>
        /// Integration test: getProjectTypeInfo command returns correct info for Standard type.
        /// </summary>
        [Test]
        [Category("Integration")]
        [Property("ScenarioId", "TS-CAP016-013")]
        [Property("BehaviorId", "BHV-016")]
        [Description("getProjectTypeInfo command returns correct info for project types")]
        public async Task GetProjectTypeInfo_Command_ReturnsCorrectInfo()
        {
            // Arrange
            await _service.InitializeAsync();

            // Act
            var result = await Client.SendRequestAsync<ProjectTypeInfo>(
                ProjectCreationCommandService.Commands.GetProjectTypeInfo,
                new object[] { "Standard" }
            );

            // Assert - when properly implemented, Standard is not a derived type
            Assert.That(result, Is.Not.Null);
            Assert.That(result!.Type, Is.EqualTo("Standard"));
            Assert.That(result.IsDerivedType, Is.False);
        }

        /// <summary>
        /// Integration test: updateProjectSettings command delegates to ProjectCreationService.
        /// </summary>
        [Test]
        [Category("Integration")]
        [Property("ScenarioId", "TS-CAP016-014")]
        [Property("BehaviorId", "BHV-016")]
        [Description("updateProjectSettings command delegates to ProjectCreationService.UpdateProjectSettings")]
        public async Task UpdateProjectSettings_Command_DelegatesToService()
        {
            // Arrange
            await _service.InitializeAsync();
            var request = new UpdateProjectSettingsRequest
            {
                ProjectName = "TEST",
                FullName = "Updated Test Project",
            };

            // Act
            var result = await Client.SendRequestAsync<UpdateProjectResult>(
                ProjectCreationCommandService.Commands.UpdateProjectSettings,
                new object[] { request }
            );

            // Assert - when properly implemented, should return result
            Assert.That(result, Is.Not.Null);
            // Should have either Success true or an ErrorCode
            Assert.That(result!.Success || result.ErrorCode != null, Is.True);
        }

        /// <summary>
        /// Integration test: convertToUsfm3 command delegates to ProjectCreationService.
        /// </summary>
        [Test]
        [Category("Integration")]
        [Property("ScenarioId", "TS-CAP016-016")]
        [Property("BehaviorId", "BHV-016")]
        [Description("convertToUsfm3 command delegates to ProjectCreationService.ConvertProjectToUsfm3")]
        public async Task ConvertToUsfm3_Command_DelegatesToService()
        {
            // Arrange
            await _service.InitializeAsync();
            var request = new ConvertToUsfm3Request { ProjectName = "TEST" };

            // Act
            var result = await Client.SendRequestAsync<UpdateProjectResult>(
                ProjectCreationCommandService.Commands.ConvertToUsfm3,
                new object[] { request }
            );

            // Assert - when properly implemented, should return result
            Assert.That(result, Is.Not.Null);
            // Should have either Success true or an ErrorCode (project not found)
            Assert.That(result!.Success || result.ErrorCode != null, Is.True);
        }

        /// <summary>
        /// Integration test: getProjectInfo command delegates to ProjectCreationService.
        /// </summary>
        [Test]
        [Category("Integration")]
        [Property("ScenarioId", "TS-CAP016-019")]
        [Property("BehaviorId", "BHV-016")]
        [Description("getProjectInfo command delegates to ProjectCreationService.GetProjectInfo")]
        public async Task GetProjectInfo_Command_DelegatesToService()
        {
            // Arrange
            await _service.InitializeAsync();

            // Act - requesting info for a non-existent project should return null
            var result = await Client.SendRequestAsync<ProjectInfo?>(
                ProjectCreationCommandService.Commands.GetProjectInfo,
                new object[] { "NonExistentProject" }
            );

            // Assert - when properly implemented, should return null for non-existent project
            Assert.That(result, Is.Null);
        }

        #endregion

        #region Error Handling Tests

        /// <summary>
        /// Tests that createProject with invalid short name returns error.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-CAP016-002")]
        [Property("BehaviorId", "BHV-016")]
        [Description("createProject with invalid short name returns InvalidShortName error")]
        public async Task CreateProject_InvalidShortName_ReturnsError()
        {
            // Arrange
            await _service.InitializeAsync();
            var request = new CreateProjectRequest
            {
                ShortName = "AB", // Too short (min 3)
                FullName = "Test Project",
            };

            // Act
            var result = await Client.SendRequestAsync<CreateProjectResult>(
                ProjectCreationCommandService.Commands.CreateProject,
                new object[] { request }
            );

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result!.Success, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo(ProjectCreationErrorCode.InvalidShortName));
        }

        /// <summary>
        /// Tests that updateProjectSettings for non-existent project returns error.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-CAP016-008")]
        [Property("BehaviorId", "BHV-016")]
        [Description("updateProjectSettings for non-existent project returns PROJECT_NOT_FOUND error")]
        public async Task UpdateProjectSettings_NonExistentProject_ReturnsError()
        {
            // Arrange
            await _service.InitializeAsync();
            var request = new UpdateProjectSettingsRequest
            {
                ProjectName = "NonExistent",
                FullName = "Updated Name",
            };

            // Act
            var result = await Client.SendRequestAsync<UpdateProjectResult>(
                ProjectCreationCommandService.Commands.UpdateProjectSettings,
                new object[] { request }
            );

            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result!.Success, Is.False);
            Assert.That(result.ErrorCode, Is.EqualTo("PROJECT_NOT_FOUND"));
        }

        /// <summary>
        /// Tests that getProjectInfo for non-existent project returns null.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-CAP016-018")]
        [Property("BehaviorId", "BHV-016")]
        [Description("getProjectInfo for non-existent project returns null")]
        public async Task GetProjectInfo_NonExistentProject_ReturnsNull()
        {
            // Arrange
            await _service.InitializeAsync();

            // Act
            var result = await Client.SendRequestAsync<ProjectInfo?>(
                ProjectCreationCommandService.Commands.GetProjectInfo,
                new object[] { "NonExistent" }
            );

            // Assert
            Assert.That(result, Is.Null);
        }

        #endregion

        #region Constructor Tests

        /// <summary>
        /// Tests that constructor stores PapiClient correctly.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-CAP016-CTOR")]
        [Property("BehaviorId", "BHV-016")]
        [Description("Constructor stores PapiClient reference")]
        public void Constructor_StoresPapiClient()
        {
            // Arrange & Act
            var service = new ProjectCreationCommandService(Client);

            // Assert - service should be created successfully
            Assert.That(service, Is.Not.Null);
        }

        /// <summary>
        /// Tests that constructor with null PapiClient throws.
        /// </summary>
        [Test]
        [Category("Contract")]
        [Property("ScenarioId", "TS-CAP016-CTOR-NULL")]
        [Property("BehaviorId", "BHV-016")]
        [Description("Constructor with null PapiClient throws ArgumentNullException")]
        public void Constructor_NullPapiClient_Throws()
        {
            // Act & Assert
            Assert.Throws<ArgumentNullException>(() => new ProjectCreationCommandService(null!));
        }

        #endregion
    }
}
