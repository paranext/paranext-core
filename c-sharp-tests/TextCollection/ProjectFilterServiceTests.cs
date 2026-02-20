// === TEST FILE: CAP-012 GetProjectType ===
// TDD Phase: RED (tests should fail -- implementation throws NotImplementedException)
// Capability: CAP-012 (GetProjectType)
// Micro-Phase: BE-1 (Foundation: Simple Predicates)
// Source: EXT-013 (PT9/ParatextBase/CommonForms/SelectScrTextsForm.cs:717-730)

using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.TextCollection;
using Paratext.Data;

namespace TestParanextDataProvider.TextCollection;

/// <summary>
/// Tests for ProjectFilterService.GetProjectType (CAP-012).
///
/// GetProjectType categorizes a project into a user-visible type string
/// using a priority chain of ParatextData type checks:
///   1. If IsDictionary => "Dictionary"
///   2. If IsSourceLanguageText => "Source Language Text"
///   3. If IsResourceProject => resource type display string
///   4. Else => "Project ({TranslationInfo.Type})"
///
/// Source: EXT-013 (PT9/ParatextBase/CommonForms/SelectScrTextsForm.cs:717-730)
/// Scenarios: TS-058 (Dictionary categorization), TS-059 (Source Language categorization)
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
}
