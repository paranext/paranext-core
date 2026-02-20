// === TEST FILE: CAP-012 GetProjectType + CAP-011 MatchesFilter ===
// TDD Phase: RED (CAP-011 tests should fail -- implementation throws NotImplementedException)
// Capabilities: CAP-012 (GetProjectType), CAP-011 (MatchesFilter)
// Micro-Phases: BE-1 (CAP-012), BE-2 (CAP-011)
// Source: EXT-013 (PT9/ParatextBase/CommonForms/SelectScrTextsForm.cs:717-730)
//         EXT-012 (PT9/ParatextBase/CommonForms/SelectScrTextsForm.cs:769-791)

using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.TextCollection;
using Paratext.Data;

namespace TestParanextDataProvider.TextCollection;

/// <summary>
/// Tests for ProjectFilterService: GetProjectType (CAP-012) and MatchesFilter (CAP-011).
///
/// GetProjectType categorizes a project into a user-visible type string
/// using a priority chain of ParatextData type checks:
///   1. If IsDictionary => "Dictionary"
///   2. If IsSourceLanguageText => "Source Language Text"
///   3. If IsResourceProject => resource type display string
///   4. Else => "Project ({TranslationInfo.Type})"
///
/// MatchesFilter determines project visibility based on filter button states,
/// TC-mode exclusions (VAL-010), and search text matching.
///
/// Source: EXT-013 (PT9/ParatextBase/CommonForms/SelectScrTextsForm.cs:717-730)
///         EXT-012 (PT9/ParatextBase/CommonForms/SelectScrTextsForm.cs:769-791)
/// Scenarios: TS-052..TS-059
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class ProjectFilterServiceTests : PapiTestBase
{
    #region Acceptance Test

    /// <summary>
    /// OUTER ACCEPTANCE TEST: Given a standard scripture project (not Dictionary,
    /// not Source Language, not Resource), GetProjectType returns a string
    /// starting with "Project (" that includes the translation type.
    ///
    /// This test also verifies the method signature accepts a projectId string
    /// and returns a non-empty string, confirming the contract defined in M-013.
    ///
    /// For Dictionary and SourceLanguage paths, see the individual contract tests below.
    /// Those paths depend on specific ScrText subclass behavior that DummyScrText
    /// cannot simulate; however, the priority chain logic is the implementation's
    /// responsibility and the acceptance test verifies the fallback path.
    ///
    /// This is the "done signal" for CAP-012. When ALL tests in this fixture pass,
    /// the capability is complete.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-058,TS-059")]
    [Property("BehaviorId", "EXT-013")]
    public void GetProjectType_AcceptanceTest_ReturnsCorrectTypeForStandardProject()
    {
        // Arrange: Create a standard scripture project (DummyScrText)
        // DummyScrText is not a Dictionary, SourceLanguage, or Resource project,
        // so it should fall through to the "Project ({type})" branch.
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        // Act
        string result = ProjectFilterService.GetProjectType(projectId);

        // Assert: For a standard project, the result should be "Project ({type})"
        // where {type} is the translation type from Settings.TranslationInfo.Type.
        Assert.That(result, Is.Not.Null.And.Not.Empty, "Type string must not be null or empty");
        Assert.That(
            result,
            Does.StartWith("Project ("),
            "Standard project type should start with 'Project ('"
        );
        Assert.That(result, Does.EndWith(")"), "Standard project type should end with ')'");
    }

    #endregion

    #region Contract Tests - Happy Path (Priority Chain)

    /// <summary>
    /// Dictionary projects must return "Dictionary".
    /// PT9 source: SelectScrTextsForm.cs:717-718: if (text.IsDictionary) return "Dictionary";
    /// TS-058: GetProjectType categorizes Dictionary correctly.
    ///
    /// Note: DummyScrText creates a standard project where IsDictionary is false.
    /// This test verifies that a standard project is NOT categorized as Dictionary.
    /// The positive Dictionary case requires a ScrText with IsDictionary == true,
    /// which is determined by ParatextData project settings (TranslationInfo.Type).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-058")]
    [Property("BehaviorId", "EXT-013")]
    [Property("ExtractionId", "EXT-013")]
    public void GetProjectType_WithStandardProject_DoesNotReturnDictionary()
    {
        // Arrange: Standard project (not a dictionary)
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        // Act
        string result = ProjectFilterService.GetProjectType(projectId);

        // Assert: A standard project should NOT be categorized as Dictionary
        Assert.That(
            result,
            Is.Not.EqualTo("Dictionary"),
            "Standard project should not be categorized as Dictionary"
        );
    }

    /// <summary>
    /// Source Language Text projects must return "Source Language Text".
    /// PT9 source: SelectScrTextsForm.cs:719-720: if (text.IsSourceLanguageText)
    ///     return "Source Language Text";
    /// TS-059: GetProjectType categorizes Source Language Text correctly.
    ///
    /// Note: DummyScrText creates a standard project where IsSourceLanguageText is false.
    /// This test verifies that a standard project is NOT categorized as Source Language Text.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-059")]
    [Property("BehaviorId", "EXT-013")]
    [Property("ExtractionId", "EXT-013")]
    public void GetProjectType_WithStandardProject_DoesNotReturnSourceLanguageText()
    {
        // Arrange: Standard project (not source language)
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        // Act
        string result = ProjectFilterService.GetProjectType(projectId);

        // Assert: A standard project should NOT be categorized as Source Language Text
        Assert.That(
            result,
            Is.Not.EqualTo("Source Language Text"),
            "Standard project should not be categorized as Source Language Text"
        );
    }

    /// <summary>
    /// Standard scripture projects (not Dictionary, not Source Language, not Resource)
    /// must return "Project ({type})" where {type} is the translation type.
    /// PT9 source: SelectScrTextsForm.cs:729: return "Project (" + type + ")";
    /// This is the fallback case at the end of the priority chain.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-058")]
    [Property("BehaviorId", "EXT-013")]
    [Property("ExtractionId", "EXT-013")]
    public void GetProjectType_WithStandardProject_ReturnsProjectWithTypeFormat()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        // Act
        string result = ProjectFilterService.GetProjectType(projectId);

        // Assert: Result should match "Project ({type})" format
        Assert.That(result, Is.Not.Null.And.Not.Empty);
        Assert.That(
            result,
            Does.Match(@"^Project \(.+\)$"),
            "Standard project should return 'Project ({type})' format"
        );
    }

    /// <summary>
    /// Resource projects (not Marble, not XML) must return a resource type string.
    /// PT9 source: SelectScrTextsForm.cs:721-728 handles resource type display.
    ///
    /// Note: DummyScrText creates a standard project where IsResourceProject is false.
    /// This test verifies that a standard project is NOT categorized as a resource.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-058")]
    [Property("BehaviorId", "EXT-013,BHV-105")]
    [Property("ExtractionId", "EXT-013")]
    public void GetProjectType_WithStandardProject_DoesNotReturnResourceString()
    {
        // Arrange: Standard project (not a resource)
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        // Act
        string result = ProjectFilterService.GetProjectType(projectId);

        // Assert: Should not be a bare resource category string
        // (Resource projects would return specific resource type strings,
        // not the "Project (...)" format)
        Assert.That(
            result,
            Does.StartWith("Project ("),
            "Standard (non-resource) project should use 'Project (...)' format, not a resource type string"
        );
    }

    #endregion

    #region Contract Tests - Return Value Properties

    /// <summary>
    /// GetProjectType must return a non-null, non-empty string for any valid project.
    /// This verifies the postcondition from M-013: "Returns one of: 'Dictionary',
    /// 'Source Language Text', resource type string, or 'Project ({type})'".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-058")]
    [Property("BehaviorId", "EXT-013")]
    public void GetProjectType_ValidProject_ReturnsNonEmptyString()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        // Act
        string result = ProjectFilterService.GetProjectType(projectId);

        // Assert
        Assert.That(result, Is.Not.Null, "GetProjectType must never return null");
        Assert.That(result, Is.Not.Empty, "GetProjectType must never return empty string");
    }

    /// <summary>
    /// GetProjectType must include the translation type in the "Project ({type})" format.
    /// The type string comes from Settings.TranslationInfo.Type.
    /// For a DummyScrText, this should be the default TranslationType.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-058")]
    [Property("BehaviorId", "EXT-013")]
    [Property("ExtractionId", "EXT-013")]
    public void GetProjectType_StandardProject_IncludesTranslationType()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        // Act
        string result = ProjectFilterService.GetProjectType(projectId);

        // Assert: The result should contain the type name between parentheses.
        // Extract the type from "Project (...)" and verify it is not empty.
        Assert.That(result, Does.StartWith("Project ("));
        Assert.That(result, Does.EndWith(")"));

        // Extract the type string between "Project (" and ")"
        string typeStr = result["Project (".Length..^1];
        Assert.That(
            typeStr,
            Is.Not.Empty,
            "The translation type inside 'Project (...)' must not be empty"
        );
    }

    #endregion

    #region Contract Tests - Error Conditions

    /// <summary>
    /// When a project ID cannot be resolved (not in ScrTextCollection),
    /// the method should throw an exception or return an error indication.
    /// Per M-013 error condition: PROJECT_NOT_FOUND "Project {id} not found".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-058")]
    [Property("BehaviorId", "EXT-013,BHV-103")]
    public void GetProjectType_UnresolvableProjectId_Throws()
    {
        // Arrange: Use a project ID that does not exist in ScrTextCollection
        string nonExistentId = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

        // Act & Assert: Should throw because the project cannot be found
        Assert.That(
            () => ProjectFilterService.GetProjectType(nonExistentId),
            Throws.Exception,
            "Unresolvable project ID should throw (PROJECT_NOT_FOUND)"
        );
    }

    #endregion

    #region Edge Case Tests

    /// <summary>
    /// Multiple calls with the same project ID should return the same result
    /// (the method is stateless and deterministic).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-058")]
    [Property("BehaviorId", "EXT-013")]
    public void GetProjectType_CalledTwice_ReturnsSameResult()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        // Act
        string result1 = ProjectFilterService.GetProjectType(projectId);
        string result2 = ProjectFilterService.GetProjectType(projectId);

        // Assert: Idempotent / deterministic
        Assert.That(
            result1,
            Is.EqualTo(result2),
            "GetProjectType must be deterministic -- same input produces same output"
        );
    }

    /// <summary>
    /// Two different projects should each return their own type string.
    /// This verifies that the method correctly resolves each project independently.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-058")]
    [Property("BehaviorId", "EXT-013")]
    public void GetProjectType_TwoDifferentProjects_EachReturnsValidType()
    {
        // Arrange
        DummyScrText projectA = CreateDummyProject();
        ScrTextCollection.Add(projectA, true);
        DummyScrText projectB = CreateDummyProject();
        ScrTextCollection.Add(projectB, true);

        // Act
        string resultA = ProjectFilterService.GetProjectType(projectA.Guid.ToString());
        string resultB = ProjectFilterService.GetProjectType(projectB.Guid.ToString());

        // Assert: Both should return valid type strings
        Assert.That(resultA, Is.Not.Null.And.Not.Empty);
        Assert.That(resultB, Is.Not.Null.And.Not.Empty);

        // Both are standard DummyScrText projects, so both should be "Project (...)"
        Assert.That(resultA, Does.StartWith("Project ("));
        Assert.That(resultB, Does.StartWith("Project ("));
    }

    #endregion

    // =====================================================================
    // CAP-011: MatchesFilter Tests
    // =====================================================================
    // TDD Phase: RED (tests should fail -- MatchesFilter throws NotImplementedException)
    // Source: EXT-012 (PT9/ParatextBase/CommonForms/SelectScrTextsForm.cs:769-791)
    // Scenarios: TS-052, TS-053, TS-054, TS-055, TS-056, TS-057
    // Golden Master: gm-006 (filter results for button combinations and TC-mode exclusions)
    // =====================================================================

    #region CAP-011 Helper: FilterButtonStates factory

    /// <summary>
    /// Creates a FilterButtonStates with all buttons OFF.
    /// This is the baseline for TC-mode tests where only specific buttons are toggled.
    /// </summary>
    private static FilterButtonStates AllButtonsOff()
    {
        return new FilterButtonStates(
            Projects: false,
            Resources: false,
            EnhancedResources: false,
            SourceLanguages: false,
            Dictionaries: false,
            ConsultantNotes: false
        );
    }

    /// <summary>
    /// Creates a FilterButtonStates with all buttons ON.
    /// </summary>
    private static FilterButtonStates AllButtonsOn()
    {
        return new FilterButtonStates(
            Projects: true,
            Resources: true,
            EnhancedResources: true,
            SourceLanguages: true,
            Dictionaries: true,
            ConsultantNotes: true
        );
    }

    /// <summary>
    /// Creates a FilterButtonStates with only the Projects button ON.
    /// </summary>
    private static FilterButtonStates ProjectsButtonOnly()
    {
        return new FilterButtonStates(
            Projects: true,
            Resources: false,
            EnhancedResources: false,
            SourceLanguages: false,
            Dictionaries: false,
            ConsultantNotes: false
        );
    }

    #endregion

    #region CAP-011 Acceptance Test

    /// <summary>
    /// OUTER ACCEPTANCE TEST for CAP-011 (MatchesFilter).
    ///
    /// Verifies core gm-006 behavior: a standard project with the Projects button ON
    /// and no search text returns true. This exercises the primary happy path:
    /// - Not in TC mode (no exclusions apply)
    /// - Projects button is ON
    /// - Standard project (not resource, not dictionary, not note type)
    /// - No search text filter
    ///
    /// When this test passes along with all other CAP-011 tests, the capability is complete.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-056")]
    [Property("BehaviorId", "EXT-012")]
    [Property("GoldenMasterId", "gm-006")]
    public void MatchesFilter_AcceptanceTest_StandardProjectWithProjectsButton_ReturnsTrue()
    {
        // Arrange: Create a standard scripture project (DummyScrText is not resource/dictionary/note)
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        // Projects button ON, all others OFF, no search text, not TC mode
        FilterButtonStates buttons = ProjectsButtonOnly();

        // Act
        bool result = ProjectFilterService.MatchesFilter(
            projectId,
            buttons,
            "",
            isTcMode: false
        );

        // Assert: Standard project matches when Projects button is ON
        Assert.That(
            result,
            Is.True,
            "Standard project should match when Projects button is ON (gm-006: projects-button-on)"
        );
    }

    #endregion

    #region CAP-011 TC-Mode Exclusion Tests (VAL-010)

    /// <summary>
    /// In TC mode, Enhanced Resources (MarbleResource) must be hidden.
    /// TS-052: MatchesFilter hides Enhanced Resources in TC mode.
    ///
    /// PT9 behavior: When OpenAs=TextCollection, the Enhanced Resources button
    /// is hidden from the UI, so no project of that type can match.
    /// PT10: isTcMode=true causes MatchesFilter to reject these projects internally.
    ///
    /// Note: DummyScrText is NOT a MarbleResource (IsMarbleResource=false).
    /// This test verifies that even with all buttons ON, a standard project
    /// in TC mode still passes (TC mode only hides specific categories, not standard projects).
    /// The negative test (marble project hidden) is tested conceptually by verifying
    /// the method signature and isTcMode parameter handling.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-052")]
    [Property("BehaviorId", "EXT-012,VAL-010")]
    [Property("ExtractionId", "EXT-012")]
    [Property("GoldenMasterId", "gm-006")]
    public void MatchesFilter_TcMode_StandardProjectStillVisible()
    {
        // Arrange: Standard project with all buttons ON in TC mode
        // Standard projects should still be visible in TC mode (only specific categories are hidden)
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        FilterButtonStates buttons = AllButtonsOn();

        // Act: TC mode should still allow standard projects through
        bool result = ProjectFilterService.MatchesFilter(
            projectId,
            buttons,
            "",
            isTcMode: true
        );

        // Assert: Standard project (not marble/SLT/dict/note) remains visible in TC mode
        Assert.That(
            result,
            Is.True,
            "Standard project should still be visible in TC mode (VAL-010 only hides specific categories)"
        );
    }

    /// <summary>
    /// In TC mode, MatchesFilter must return false for Enhanced Resources even when
    /// the Enhanced Resources button is ON. This test uses a standard project with
    /// the EnhancedResources button as the ONLY button ON.
    ///
    /// TS-052: MatchesFilter hides Enhanced Resources in TC mode.
    /// A standard DummyScrText is NOT a MarbleResource, so it would not match
    /// EnhancedResources button anyway. But with ONLY that button ON and
    /// isTcMode=true, the result must be false.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-052")]
    [Property("BehaviorId", "EXT-012,VAL-010")]
    [Property("ExtractionId", "EXT-012")]
    [Property("GoldenMasterId", "gm-006")]
    public void MatchesFilter_TcMode_EnhancedResourcesButtonOnly_ReturnsFalse()
    {
        // Arrange: Standard project, only EnhancedResources button ON, TC mode
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        FilterButtonStates buttons = new(
            Projects: false,
            Resources: false,
            EnhancedResources: true,
            SourceLanguages: false,
            Dictionaries: false,
            ConsultantNotes: false
        );

        // Act
        bool result = ProjectFilterService.MatchesFilter(
            projectId,
            buttons,
            "",
            isTcMode: true
        );

        // Assert: In TC mode, EnhancedResources is hidden (VAL-010),
        // and standard project does not match EnhancedResources anyway
        Assert.That(
            result,
            Is.False,
            "Enhanced Resources button should be ineffective in TC mode (VAL-010: tc-mode-marble)"
        );
    }

    /// <summary>
    /// In TC mode, MatchesFilter must return false when only the SourceLanguages
    /// button is ON (TS-053). Source Language Texts are hidden in TC mode.
    /// A standard project does not match Source Languages button anyway.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-053")]
    [Property("BehaviorId", "EXT-012,VAL-010")]
    [Property("ExtractionId", "EXT-012")]
    [Property("GoldenMasterId", "gm-006")]
    public void MatchesFilter_TcMode_SourceLanguagesButtonOnly_ReturnsFalse()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        FilterButtonStates buttons = new(
            Projects: false,
            Resources: false,
            EnhancedResources: false,
            SourceLanguages: true,
            Dictionaries: false,
            ConsultantNotes: false
        );

        // Act
        bool result = ProjectFilterService.MatchesFilter(
            projectId,
            buttons,
            "",
            isTcMode: true
        );

        // Assert
        Assert.That(
            result,
            Is.False,
            "Source Languages button should be ineffective in TC mode (VAL-010: tc-mode-source-lang)"
        );
    }

    /// <summary>
    /// In TC mode, MatchesFilter must return false when only the Dictionaries
    /// button is ON (TS-054). Dictionaries are hidden in TC mode.
    /// A standard project does not match Dictionaries button anyway.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-054")]
    [Property("BehaviorId", "EXT-012,VAL-010")]
    [Property("ExtractionId", "EXT-012")]
    [Property("GoldenMasterId", "gm-006")]
    public void MatchesFilter_TcMode_DictionariesButtonOnly_ReturnsFalse()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        FilterButtonStates buttons = new(
            Projects: false,
            Resources: false,
            EnhancedResources: false,
            SourceLanguages: false,
            Dictionaries: true,
            ConsultantNotes: false
        );

        // Act
        bool result = ProjectFilterService.MatchesFilter(
            projectId,
            buttons,
            "",
            isTcMode: true
        );

        // Assert
        Assert.That(
            result,
            Is.False,
            "Dictionaries button should be ineffective in TC mode (VAL-010: tc-mode-dictionary)"
        );
    }

    /// <summary>
    /// In TC mode, MatchesFilter must return false when only the ConsultantNotes
    /// button is ON (TS-055). Consultant Notes are hidden in TC mode.
    /// A standard project does not match ConsultantNotes button anyway.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-055")]
    [Property("BehaviorId", "EXT-012,VAL-010")]
    [Property("ExtractionId", "EXT-012")]
    [Property("GoldenMasterId", "gm-006")]
    public void MatchesFilter_TcMode_ConsultantNotesButtonOnly_ReturnsFalse()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        FilterButtonStates buttons = new(
            Projects: false,
            Resources: false,
            EnhancedResources: false,
            SourceLanguages: false,
            Dictionaries: false,
            ConsultantNotes: true
        );

        // Act
        bool result = ProjectFilterService.MatchesFilter(
            projectId,
            buttons,
            "",
            isTcMode: true
        );

        // Assert
        Assert.That(
            result,
            Is.False,
            "Consultant Notes button should be ineffective in TC mode (VAL-010: tc-mode-consultant-notes)"
        );
    }

    /// <summary>
    /// In TC mode with Projects + Resources buttons ON, a standard project
    /// should still match via the Projects button (only 4 specific categories hidden).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-052,TS-056")]
    [Property("BehaviorId", "EXT-012,VAL-010")]
    [Property("ExtractionId", "EXT-012")]
    public void MatchesFilter_TcMode_ProjectsAndResourcesOn_StandardProjectMatches()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        FilterButtonStates buttons = new(
            Projects: true,
            Resources: true,
            EnhancedResources: false,
            SourceLanguages: false,
            Dictionaries: false,
            ConsultantNotes: false
        );

        // Act
        bool result = ProjectFilterService.MatchesFilter(
            projectId,
            buttons,
            "",
            isTcMode: true
        );

        // Assert: Standard project matches via Projects button even in TC mode
        Assert.That(
            result,
            Is.True,
            "Standard project should match via Projects button in TC mode"
        );
    }

    #endregion

    #region CAP-011 Button State Filtering Tests

    /// <summary>
    /// TS-056: Projects button ON, standard project should match.
    /// PT9 source: line 772-773: IsChecked(btnProjects) && !scr.IsResourceProject &&
    ///     !scr.Settings.TranslationInfo.Type.IsNoteType()
    /// DummyScrText: IsResourceProject=false, IsNoteType=false -> matches.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-056")]
    [Property("BehaviorId", "EXT-012")]
    [Property("ExtractionId", "EXT-012")]
    [Property("GoldenMasterId", "gm-006")]
    public void MatchesFilter_ProjectsButtonOn_StandardProject_ReturnsTrue()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        FilterButtonStates buttons = ProjectsButtonOnly();

        // Act
        bool result = ProjectFilterService.MatchesFilter(
            projectId,
            buttons,
            "",
            isTcMode: false
        );

        // Assert
        Assert.That(
            result,
            Is.True,
            "Standard project should match when Projects button is ON"
        );
    }

    /// <summary>
    /// Resources button ON only, standard project should NOT match
    /// because standard projects are not resource projects.
    /// PT9: line 774-776: IsChecked(btnResources) && scr.IsResourceProject ...
    /// DummyScrText: IsResourceProject=false -> does not match Resources.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-056")]
    [Property("BehaviorId", "EXT-012")]
    [Property("ExtractionId", "EXT-012")]
    public void MatchesFilter_ResourcesButtonOnly_StandardProject_ReturnsFalse()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        FilterButtonStates buttons = new(
            Projects: false,
            Resources: true,
            EnhancedResources: false,
            SourceLanguages: false,
            Dictionaries: false,
            ConsultantNotes: false
        );

        // Act
        bool result = ProjectFilterService.MatchesFilter(
            projectId,
            buttons,
            "",
            isTcMode: false
        );

        // Assert: Standard (non-resource) project does not match Resources button
        Assert.That(
            result,
            Is.False,
            "Standard (non-resource) project should not match when only Resources button is ON"
        );
    }

    /// <summary>
    /// All buttons OFF means no project type matches -> returns false.
    /// PT9 source: line 782: if (!selectedProjectType) return false;
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-056")]
    [Property("BehaviorId", "EXT-012")]
    [Property("ExtractionId", "EXT-012")]
    public void MatchesFilter_AllButtonsOff_ReturnsFalse()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        FilterButtonStates buttons = AllButtonsOff();

        // Act
        bool result = ProjectFilterService.MatchesFilter(
            projectId,
            buttons,
            "",
            isTcMode: false
        );

        // Assert: No buttons selected -> nothing matches
        Assert.That(
            result,
            Is.False,
            "No buttons selected should return false for any project"
        );
    }

    /// <summary>
    /// All buttons ON (non-TC mode), standard project should match via Projects button.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-056")]
    [Property("BehaviorId", "EXT-012")]
    [Property("ExtractionId", "EXT-012")]
    public void MatchesFilter_AllButtonsOn_StandardProject_ReturnsTrue()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        FilterButtonStates buttons = AllButtonsOn();

        // Act
        bool result = ProjectFilterService.MatchesFilter(
            projectId,
            buttons,
            "",
            isTcMode: false
        );

        // Assert
        Assert.That(
            result,
            Is.True,
            "Standard project should match when all buttons are ON"
        );
    }

    /// <summary>
    /// EnhancedResources button ON only (non-TC mode), standard project
    /// does not match because DummyScrText.IsMarbleResource=false.
    /// PT9: line 777: IsChecked(btnEnhancedResources) && scr.IsMarbleResource
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-052")]
    [Property("BehaviorId", "EXT-012")]
    [Property("ExtractionId", "EXT-012")]
    public void MatchesFilter_EnhancedResourcesButtonOnly_StandardProject_ReturnsFalse()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        FilterButtonStates buttons = new(
            Projects: false,
            Resources: false,
            EnhancedResources: true,
            SourceLanguages: false,
            Dictionaries: false,
            ConsultantNotes: false
        );

        // Act
        bool result = ProjectFilterService.MatchesFilter(
            projectId,
            buttons,
            "",
            isTcMode: false
        );

        // Assert: Standard project is not a MarbleResource
        Assert.That(
            result,
            Is.False,
            "Standard project should not match EnhancedResources button (IsMarbleResource=false)"
        );
    }

    #endregion

    #region CAP-011 Search Text Tests

    /// <summary>
    /// TS-057: Text search matching by project name (case-insensitive).
    /// PT9 source: line 788: scr.Name.IndexOf(txtNameFilter.Text, OrdinalIgnoreCase) >= 0
    /// gm-006: text-search-match -- searchText "NIV", projectName "NIV84" -> true
    ///
    /// DummyScrText names include the project short name + GUID suffix.
    /// We use the project name to verify substring matching.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "EXT-012")]
    [Property("ExtractionId", "EXT-012")]
    [Property("GoldenMasterId", "gm-006")]
    public void MatchesFilter_SearchTextMatchesName_ReturnsTrue()
    {
        // Arrange: DummyScrText name contains "Dummy" + GUID
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        // Use a search string that matches part of the DummyScrText name
        string searchText = "Dummy";
        FilterButtonStates buttons = ProjectsButtonOnly();

        // Act
        bool result = ProjectFilterService.MatchesFilter(
            projectId,
            buttons,
            searchText,
            isTcMode: false
        );

        // Assert: Name contains "Dummy" so it should match
        Assert.That(
            result,
            Is.True,
            "Project should match when search text is a substring of the name (case-insensitive)"
        );
    }

    /// <summary>
    /// gm-006: text-search-no-match -- searchText "XYZ", projectName "NIV84" -> false.
    /// Search text that does not appear in the project name should return false.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "EXT-012")]
    [Property("ExtractionId", "EXT-012")]
    [Property("GoldenMasterId", "gm-006")]
    public void MatchesFilter_SearchTextNoMatch_ReturnsFalse()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        // Use a search string that does NOT match any part of the DummyScrText name
        string searchText = "ZZZZNONEXISTENT";
        FilterButtonStates buttons = ProjectsButtonOnly();

        // Act
        bool result = ProjectFilterService.MatchesFilter(
            projectId,
            buttons,
            searchText,
            isTcMode: false
        );

        // Assert: Name does not contain "ZZZZNONEXISTENT"
        Assert.That(
            result,
            Is.False,
            "Project should not match when search text is not found in name (gm-006: text-search-no-match)"
        );
    }

    /// <summary>
    /// Empty search text should not filter anything (all type-matched projects pass).
    /// PT9 source: line 785-786: if (txtNameFilter.Text == filterPrompt || text == "") return true;
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "EXT-012")]
    [Property("ExtractionId", "EXT-012")]
    public void MatchesFilter_EmptySearchText_ReturnsTrue()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        FilterButtonStates buttons = ProjectsButtonOnly();

        // Act
        bool result = ProjectFilterService.MatchesFilter(
            projectId,
            buttons,
            "",
            isTcMode: false
        );

        // Assert: Empty search text means no name filter applied
        Assert.That(
            result,
            Is.True,
            "Empty search text should not filter (all type-matched projects pass)"
        );
    }

    /// <summary>
    /// Search text matching should be case-insensitive.
    /// PT9: StringComparison.OrdinalIgnoreCase used in IndexOf.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "EXT-012")]
    [Property("ExtractionId", "EXT-012")]
    public void MatchesFilter_SearchTextCaseInsensitive_ReturnsTrue()
    {
        // Arrange: DummyScrText name contains "Dummy"
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        // Use lowercase version of part of the name
        string searchText = "dummy";
        FilterButtonStates buttons = ProjectsButtonOnly();

        // Act
        bool result = ProjectFilterService.MatchesFilter(
            projectId,
            buttons,
            searchText,
            isTcMode: false
        );

        // Assert: Case-insensitive match should succeed
        Assert.That(
            result,
            Is.True,
            "Search text matching should be case-insensitive"
        );
    }

    /// <summary>
    /// Search text filtering should only apply AFTER type filtering.
    /// Even if search text matches, if no button matches the project type,
    /// the result should be false.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-056,TS-057")]
    [Property("BehaviorId", "EXT-012")]
    [Property("ExtractionId", "EXT-012")]
    public void MatchesFilter_SearchTextMatchesButNoButtonMatch_ReturnsFalse()
    {
        // Arrange: Standard project, search matches name, but NO buttons ON
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        FilterButtonStates buttons = AllButtonsOff();
        string searchText = "Dummy"; // matches name

        // Act
        bool result = ProjectFilterService.MatchesFilter(
            projectId,
            buttons,
            searchText,
            isTcMode: false
        );

        // Assert: Type filter fails (no buttons ON) -> false, regardless of search match
        Assert.That(
            result,
            Is.False,
            "Search text match should not override type filter failure (all buttons OFF)"
        );
    }

    #endregion

    #region CAP-011 Error Condition Tests

    /// <summary>
    /// When a project ID cannot be resolved (not in ScrTextCollection),
    /// MatchesFilter should throw an exception.
    /// Per M-012 error condition: PROJECT_NOT_FOUND "Project {id} not found".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-056")]
    [Property("BehaviorId", "EXT-012,BHV-103")]
    public void MatchesFilter_UnresolvableProjectId_Throws()
    {
        // Arrange: Use a project ID that does not exist
        string nonExistentId = "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB";
        FilterButtonStates buttons = AllButtonsOn();

        // Act & Assert: Should throw because the project cannot be found
        Assert.That(
            () => ProjectFilterService.MatchesFilter(nonExistentId, buttons, "", false),
            Throws.Exception,
            "Unresolvable project ID should throw (PROJECT_NOT_FOUND)"
        );
    }

    #endregion

    #region CAP-011 Edge Case Tests

    /// <summary>
    /// MatchesFilter is stateless and deterministic: calling twice with the same
    /// inputs should return the same result.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-056")]
    [Property("BehaviorId", "EXT-012")]
    public void MatchesFilter_CalledTwice_ReturnsSameResult()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();
        FilterButtonStates buttons = ProjectsButtonOnly();

        // Act
        bool result1 = ProjectFilterService.MatchesFilter(projectId, buttons, "", false);
        bool result2 = ProjectFilterService.MatchesFilter(projectId, buttons, "", false);

        // Assert: Idempotent / deterministic
        Assert.That(
            result1,
            Is.EqualTo(result2),
            "MatchesFilter must be deterministic -- same inputs produce same output"
        );
    }

    /// <summary>
    /// Two different projects with Projects button ON should both match
    /// (method resolves each project independently).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-056")]
    [Property("BehaviorId", "EXT-012")]
    public void MatchesFilter_TwoDifferentProjects_BothMatch()
    {
        // Arrange
        DummyScrText projectA = CreateDummyProject();
        ScrTextCollection.Add(projectA, true);
        DummyScrText projectB = CreateDummyProject();
        ScrTextCollection.Add(projectB, true);

        FilterButtonStates buttons = ProjectsButtonOnly();

        // Act
        bool resultA = ProjectFilterService.MatchesFilter(
            projectA.Guid.ToString(),
            buttons,
            "",
            false
        );
        bool resultB = ProjectFilterService.MatchesFilter(
            projectB.Guid.ToString(),
            buttons,
            "",
            false
        );

        // Assert: Both standard projects should match
        Assert.That(resultA, Is.True, "Project A should match");
        Assert.That(resultB, Is.True, "Project B should match");
    }

    /// <summary>
    /// TC mode with only Projects and Resources buttons ON:
    /// The TC-hidden buttons (EnhancedResources, SourceLanguages, Dictionaries,
    /// ConsultantNotes) should be effectively disabled, but Projects and Resources
    /// buttons should still work normally.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-052,TS-053,TS-054,TS-055,TS-056")]
    [Property("BehaviorId", "EXT-012,VAL-010")]
    [Property("ExtractionId", "EXT-012")]
    public void MatchesFilter_TcMode_OnlyProjectsAndResourcesEffective()
    {
        // Arrange: Standard project
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        // All buttons ON in TC mode
        FilterButtonStates allOn = AllButtonsOn();

        // Only Projects button in TC mode
        FilterButtonStates projectsOnly = ProjectsButtonOnly();

        // Act
        bool resultAllOn = ProjectFilterService.MatchesFilter(
            projectId,
            allOn,
            "",
            isTcMode: true
        );
        bool resultProjectsOnly = ProjectFilterService.MatchesFilter(
            projectId,
            projectsOnly,
            "",
            isTcMode: true
        );

        // Assert: Both should return true for a standard project because
        // Projects button is ON in both cases
        Assert.That(
            resultAllOn,
            Is.True,
            "All buttons ON in TC mode: standard project matches via Projects button"
        );
        Assert.That(
            resultProjectsOnly,
            Is.True,
            "Projects only in TC mode: standard project matches"
        );
    }

    /// <summary>
    /// Non-TC mode with EnhancedResources button ON only:
    /// Standard project does NOT match because IsMarbleResource=false.
    /// But this should NOT throw (unlike TC mode, the button is allowed).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-052")]
    [Property("BehaviorId", "EXT-012")]
    [Property("ExtractionId", "EXT-012")]
    public void MatchesFilter_NonTcMode_EnhancedResourcesButtonOnly_StandardProjectFalse()
    {
        // Arrange
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        FilterButtonStates buttons = new(
            Projects: false,
            Resources: false,
            EnhancedResources: true,
            SourceLanguages: false,
            Dictionaries: false,
            ConsultantNotes: false
        );

        // Act
        bool result = ProjectFilterService.MatchesFilter(
            projectId,
            buttons,
            "",
            isTcMode: false
        );

        // Assert: Standard project (IsMarbleResource=false) does not match
        Assert.That(
            result,
            Is.False,
            "Standard project should not match EnhancedResources in non-TC mode"
        );
    }

    #endregion

    #region CAP-011 Golden Master Tests

    /// <summary>
    /// gm-006 scenario: "projects-button-on" -- Projects filter ON, standard project.
    /// Expected output from golden master: true.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-056")]
    [Property("BehaviorId", "EXT-012")]
    [Property("GoldenMasterId", "gm-006")]
    public void MatchesFilter_GoldenMaster_ProjectsButtonOn_MatchesExpected()
    {
        // Arrange: gm-006 scenario "projects-button-on"
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        FilterButtonStates buttons = ProjectsButtonOnly();

        // Act
        bool result = ProjectFilterService.MatchesFilter(projectId, buttons, "", false);

        // Assert: gm-006 expected: true
        Assert.That(result, Is.True, "gm-006 projects-button-on: expected true");
    }

    /// <summary>
    /// gm-006 scenario: "text-search-match" -- searchText "Dummy", projectName contains "Dummy".
    /// Expected output from golden master: true.
    /// (Note: gm-006 uses "NIV"/"NIV84" but DummyScrText name contains "Dummy")
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "EXT-012")]
    [Property("GoldenMasterId", "gm-006")]
    public void MatchesFilter_GoldenMaster_TextSearchMatch_MatchesExpected()
    {
        // Arrange: gm-006 scenario "text-search-match"
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        FilterButtonStates buttons = ProjectsButtonOnly();

        // Act: Search for "Dummy" which is part of the DummyScrText name
        bool result = ProjectFilterService.MatchesFilter(projectId, buttons, "Dummy", false);

        // Assert: gm-006 text-search-match: expected true
        Assert.That(result, Is.True, "gm-006 text-search-match: expected true");
    }

    /// <summary>
    /// gm-006 scenario: "text-search-no-match" -- searchText "XYZ", no match.
    /// Expected output from golden master: false.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-011")]
    [Property("ScenarioId", "TS-057")]
    [Property("BehaviorId", "EXT-012")]
    [Property("GoldenMasterId", "gm-006")]
    public void MatchesFilter_GoldenMaster_TextSearchNoMatch_MatchesExpected()
    {
        // Arrange: gm-006 scenario "text-search-no-match"
        DummyScrText project = CreateDummyProject();
        ScrTextCollection.Add(project, true);
        string projectId = project.Guid.ToString();

        FilterButtonStates buttons = ProjectsButtonOnly();

        // Act: Search for "XYZ" which is NOT in the project name
        bool result = ProjectFilterService.MatchesFilter(projectId, buttons, "XYZ", false);

        // Assert: gm-006 text-search-no-match: expected false
        Assert.That(result, Is.False, "gm-006 text-search-no-match: expected false");
    }

    #endregion
}
