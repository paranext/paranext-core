using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ProjectCreation;

namespace TestParanextDataProvider.ProjectCreation;

/// <summary>
/// Tests for ProjectCreationService validation methods (CAP-017, CAP-018).
/// These are unit tests for file naming pattern validation and restore eligibility.
/// The service is stateless for these methods, so no base class or fixtures are required.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class ProjectCreationServiceTests
{
    #region CAP-017: ValidateFileNamingPattern Tests (EXT-B2-006)

    /// <summary>
    /// Acceptance test for CAP-017: ValidateFileNamingPattern must validate
    /// prefix/suffix characters and generate file name examples.
    /// CRITICAL: Must reject .ptx extension to prevent Windows data corruption.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-017")]
    [Property("ScenarioId", "TS-081")]
    [Property("BehaviorId", "BHV-254")]
    [Description("Acceptance test: File naming pattern validation with examples generation")]
    public void ValidateFileNamingPattern_AcceptanceTest()
    {
        // This test passes when CAP-017 is complete
        var request = new FileNamingPatternRequest
        {
            Prefix = "TEST",
            Scheme = FileNameForm.Form41MAT,
            Suffix = "",
            Extension = ".SFM"
        };

        var result = ProjectCreationService.ValidateFileNamingPattern(request);

        Assert.That(result.IsValid, Is.True);
        Assert.That(result.Examples, Is.Not.Null);
        Assert.That(result.Examples!.Genesis, Does.Contain("GEN"));
        Assert.That(result.Examples!.Matthew, Does.Contain("MAT"));
        Assert.That(result.Examples!.SongOfThree, Does.Contain("S3Y").Or.Contain("71"));
    }

    /// <summary>
    /// VAL-010: Prefix with invalid characters rejected.
    /// Only A-Z, 0-9, underscore allowed.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-051")]
    [Property("BehaviorId", "BHV-254")]
    [TestCase("Test@Name")]
    [TestCase("Test#")]
    [TestCase("Test!")]
    [TestCase("Test-Name")]
    [TestCase("Test.Name")]
    [TestCase("Test Name")]
    public void ValidateFileNamingPattern_InvalidPrefixChars_ReturnsError(string prefix)
    {
        var request = new FileNamingPatternRequest
        {
            Prefix = prefix,
            Scheme = FileNameForm.Form41MAT,
            Suffix = "",
            Extension = ".SFM"
        };

        var result = ProjectCreationService.ValidateFileNamingPattern(request);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.PrefixError, Does.Contain("letter").Or.Contain("A-Z").Or.Contain("digit").IgnoreCase);
    }

    /// <summary>
    /// VAL-010: Prefix cannot start with underscore.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-052")]
    [Property("BehaviorId", "BHV-254")]
    public void ValidateFileNamingPattern_PrefixStartsWithUnderscore_ReturnsError()
    {
        var request = new FileNamingPatternRequest
        {
            Prefix = "_Test",
            Scheme = FileNameForm.Form41MAT,
            Suffix = "",
            Extension = ".SFM"
        };

        var result = ProjectCreationService.ValidateFileNamingPattern(request);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.PrefixError, Does.Contain("underscore").IgnoreCase);
    }

    /// <summary>
    /// VAL-010: Underscore allowed in middle of prefix.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-051")]
    [Property("BehaviorId", "BHV-254")]
    public void ValidateFileNamingPattern_PrefixWithUnderscoreInMiddle_IsValid()
    {
        var request = new FileNamingPatternRequest
        {
            Prefix = "Test_Name",
            Scheme = FileNameForm.Form41MAT,
            Suffix = "",
            Extension = ".SFM"
        };

        var result = ProjectCreationService.ValidateFileNamingPattern(request);

        Assert.That(result.IsValid, Is.True);
        Assert.That(result.PrefixError, Is.Null);
    }

    /// <summary>
    /// VAL-011: Suffix with invalid characters rejected.
    /// Only A-Z, 0-9, underscore allowed.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-051")]
    [Property("BehaviorId", "BHV-254")]
    [TestCase("Suffix@")]
    [TestCase("Suffix#")]
    [TestCase("Suffix!")]
    [TestCase("Suffix-Name")]
    public void ValidateFileNamingPattern_InvalidSuffixChars_ReturnsError(string suffix)
    {
        var request = new FileNamingPatternRequest
        {
            Prefix = "",
            Scheme = FileNameForm.Form41MAT,
            Suffix = suffix,
            Extension = ".SFM"
        };

        var result = ProjectCreationService.ValidateFileNamingPattern(request);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.SuffixError, Does.Contain("letter").Or.Contain("A-Z").Or.Contain("digit").IgnoreCase);
    }

    /// <summary>
    /// VAL-012: CRITICAL - .ptx extension forbidden.
    /// Windows can corrupt project data with .ptx files.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-053")]
    [Property("BehaviorId", "BHV-254")]
    [TestCase(".ptx")]
    [TestCase(".PTX")]
    [TestCase(".Ptx")]
    [TestCase("ptx")]
    [TestCase("PTX")]
    public void ValidateFileNamingPattern_PtxExtension_ReturnsError(string extension)
    {
        var request = new FileNamingPatternRequest
        {
            Prefix = "",
            Scheme = FileNameForm.Form41MAT,
            Suffix = "",
            Extension = extension
        };

        var result = ProjectCreationService.ValidateFileNamingPattern(request);

        Assert.That(result.IsValid, Is.False);
        Assert.That(result.ExtensionError, Does.Contain("PTX").Or.Contain("corrupt").IgnoreCase);
    }

    /// <summary>
    /// Valid patterns generate file name examples.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-081")]
    [Property("BehaviorId", "BHV-254")]
    public void ValidateFileNamingPattern_ValidPattern_GeneratesExamples()
    {
        var request = new FileNamingPatternRequest
        {
            Prefix = "PRJ",
            Scheme = FileNameForm.Form41MAT,
            Suffix = "SFX",
            Extension = ".SFM"
        };

        var result = ProjectCreationService.ValidateFileNamingPattern(request);

        Assert.That(result.IsValid, Is.True);
        Assert.That(result.Examples, Is.Not.Null);

        // Verify examples contain expected components
        Assert.That(result.Examples!.Genesis, Does.StartWith("PRJ"));
        Assert.That(result.Examples!.Genesis, Does.EndWith("SFX.SFM"));
        Assert.That(result.Examples!.Matthew, Does.StartWith("PRJ"));
        Assert.That(result.Examples!.SongOfThree, Does.StartWith("PRJ"));
    }

    /// <summary>
    /// Form41MAT scheme includes both number and code.
    /// e.g., 01GEN, 41MAT
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-081")]
    [Property("BehaviorId", "BHV-254")]
    public void ValidateFileNamingPattern_Form41MAT_IncludesNumberAndCode()
    {
        var request = new FileNamingPatternRequest
        {
            Prefix = "",
            Scheme = FileNameForm.Form41MAT,
            Suffix = "",
            Extension = ".SFM"
        };

        var result = ProjectCreationService.ValidateFileNamingPattern(request);

        Assert.That(result.IsValid, Is.True);
        // Genesis is book 1, should show as 01GEN
        Assert.That(result.Examples!.Genesis, Does.Contain("01").And.Contain("GEN"));
        // Matthew is book 41, should show as 41MAT
        Assert.That(result.Examples!.Matthew, Does.Contain("41").And.Contain("MAT"));
    }

    /// <summary>
    /// FormMAT scheme includes code only.
    /// e.g., GEN, MAT
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-081")]
    [Property("BehaviorId", "BHV-360")]
    public void ValidateFileNamingPattern_FormMAT_IncludesCodeOnly()
    {
        var request = new FileNamingPatternRequest
        {
            Prefix = "",
            Scheme = FileNameForm.FormMAT,
            Suffix = "",
            Extension = ".SFM"
        };

        var result = ProjectCreationService.ValidateFileNamingPattern(request);

        Assert.That(result.IsValid, Is.True);
        Assert.That(result.Examples!.Genesis, Does.Contain("GEN"));
        Assert.That(result.Examples!.Genesis, Does.Not.StartWith("01"));
        Assert.That(result.Examples!.Matthew, Does.Contain("MAT"));
        Assert.That(result.Examples!.Matthew, Does.Not.StartWith("41"));
    }

    /// <summary>
    /// Form41 scheme includes number only.
    /// e.g., 01, 41
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-081")]
    [Property("BehaviorId", "BHV-360")]
    public void ValidateFileNamingPattern_Form41_IncludesNumberOnly()
    {
        var request = new FileNamingPatternRequest
        {
            Prefix = "",
            Scheme = FileNameForm.Form41,
            Suffix = "",
            Extension = ".SFM"
        };

        var result = ProjectCreationService.ValidateFileNamingPattern(request);

        Assert.That(result.IsValid, Is.True);
        Assert.That(result.Examples!.Genesis, Does.StartWith("01"));
        Assert.That(result.Examples!.Genesis, Does.Not.Contain("GEN"));
        Assert.That(result.Examples!.Matthew, Does.StartWith("41"));
        Assert.That(result.Examples!.Matthew, Does.Not.Contain("MAT"));
    }

    /// <summary>
    /// Empty prefix is valid.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-081")]
    [Property("BehaviorId", "BHV-254")]
    public void ValidateFileNamingPattern_EmptyPrefix_IsValid()
    {
        var request = new FileNamingPatternRequest
        {
            Prefix = "",
            Scheme = FileNameForm.Form41MAT,
            Suffix = "",
            Extension = ".SFM"
        };

        var result = ProjectCreationService.ValidateFileNamingPattern(request);

        Assert.That(result.IsValid, Is.True);
        Assert.That(result.PrefixError, Is.Null);
    }

    /// <summary>
    /// Empty suffix is valid.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-081")]
    [Property("BehaviorId", "BHV-254")]
    public void ValidateFileNamingPattern_EmptySuffix_IsValid()
    {
        var request = new FileNamingPatternRequest
        {
            Prefix = "",
            Scheme = FileNameForm.Form41MAT,
            Suffix = "",
            Extension = ".SFM"
        };

        var result = ProjectCreationService.ValidateFileNamingPattern(request);

        Assert.That(result.IsValid, Is.True);
        Assert.That(result.SuffixError, Is.Null);
    }

    /// <summary>
    /// Valid extension formats accepted.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-081")]
    [Property("BehaviorId", "BHV-254")]
    [TestCase(".SFM")]
    [TestCase(".sfm")]
    [TestCase(".usfm")]
    [TestCase(".txt")]
    public void ValidateFileNamingPattern_ValidExtension_IsAccepted(string extension)
    {
        var request = new FileNamingPatternRequest
        {
            Prefix = "",
            Scheme = FileNameForm.Form41MAT,
            Suffix = "",
            Extension = extension
        };

        var result = ProjectCreationService.ValidateFileNamingPattern(request);

        Assert.That(result.IsValid, Is.True);
        Assert.That(result.ExtensionError, Is.Null);
    }

    /// <summary>
    /// Song of Three Children (book 71/S3Y) example generated correctly.
    /// This is a deuterocanonical book that tests the full range.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-081")]
    [Property("BehaviorId", "BHV-254")]
    public void ValidateFileNamingPattern_SongOfThreeExample_Generated()
    {
        var request = new FileNamingPatternRequest
        {
            Prefix = "",
            Scheme = FileNameForm.Form41MAT,
            Suffix = "",
            Extension = ".SFM"
        };

        var result = ProjectCreationService.ValidateFileNamingPattern(request);

        Assert.That(result.IsValid, Is.True);
        // Song of Three is book 71, code S3Y
        Assert.That(result.Examples!.SongOfThree, Does.Contain("71").Or.Contain("S3Y"));
    }

    #endregion

    #region CAP-018: DetermineRestoreEligibility Tests (EXT-008)

    /// <summary>
    /// Acceptance test for CAP-018: DetermineRestoreEligibility must return
    /// correct defaultSelected and tooltip for each FileComparisonState.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-018")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-208")]
    [Description("Acceptance test: Restore eligibility returns correct selection and tooltip")]
    public void DetermineRestoreEligibility_AcceptanceTest()
    {
        // This test passes when CAP-018 is complete
        var request = new RestoreEligibilityRequest
        {
            ComparisonState = FileComparisonState.DestDoesNotExist
        };

        var result = ProjectCreationService.DetermineRestoreEligibility(request);

        Assert.That(result.DefaultSelected, Is.True);
        Assert.That(result.Tooltip, Is.Not.Null.And.Not.Empty);
    }

    /// <summary>
    /// DestDoesNotExist: File in backup but not on disk - should be selected.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-208")]
    public void DetermineRestoreEligibility_DestDoesNotExist_SelectedWithTooltip()
    {
        var request = new RestoreEligibilityRequest
        {
            ComparisonState = FileComparisonState.DestDoesNotExist
        };

        var result = ProjectCreationService.DetermineRestoreEligibility(request);

        Assert.That(result.DefaultSelected, Is.True);
        Assert.That(result.Tooltip, Does.Contain("not exist").Or.Contain("missing").IgnoreCase);
    }

    /// <summary>
    /// SourceDoesNotExist: File on disk but not in backup - should NOT be selected.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-208")]
    public void DetermineRestoreEligibility_SourceDoesNotExist_NotSelectedWithTooltip()
    {
        var request = new RestoreEligibilityRequest
        {
            ComparisonState = FileComparisonState.SourceDoesNotExist
        };

        var result = ProjectCreationService.DetermineRestoreEligibility(request);

        Assert.That(result.DefaultSelected, Is.False);
        Assert.That(result.Tooltip, Is.Not.Null.And.Not.Empty);
    }

    /// <summary>
    /// FilesAreSame: Files are identical - should NOT be selected.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-070")]
    [Property("BehaviorId", "BHV-208")]
    public void DetermineRestoreEligibility_FilesAreSame_NotSelectedWithTooltip()
    {
        var request = new RestoreEligibilityRequest
        {
            ComparisonState = FileComparisonState.FilesAreSame
        };

        var result = ProjectCreationService.DetermineRestoreEligibility(request);

        Assert.That(result.DefaultSelected, Is.False);
        Assert.That(result.Tooltip, Does.Contain("identical").Or.Contain("same").IgnoreCase);
    }

    /// <summary>
    /// FilesAreSameVersion: Same version number - should NOT be selected.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-070")]
    [Property("BehaviorId", "BHV-208")]
    public void DetermineRestoreEligibility_FilesAreSameVersion_NotSelectedWithTooltip()
    {
        var request = new RestoreEligibilityRequest
        {
            ComparisonState = FileComparisonState.FilesAreSameVersion
        };

        var result = ProjectCreationService.DetermineRestoreEligibility(request);

        Assert.That(result.DefaultSelected, Is.False);
        Assert.That(result.Tooltip, Does.Contain("version").IgnoreCase);
    }

    /// <summary>
    /// SourceIsHigherVersion: Backup has newer version - should be selected.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-208")]
    public void DetermineRestoreEligibility_SourceIsHigherVersion_SelectedWithTooltip()
    {
        var request = new RestoreEligibilityRequest
        {
            ComparisonState = FileComparisonState.SourceIsHigherVersion
        };

        var result = ProjectCreationService.DetermineRestoreEligibility(request);

        Assert.That(result.DefaultSelected, Is.True);
        Assert.That(result.Tooltip, Does.Contain("newer").Or.Contain("higher").IgnoreCase);
    }

    /// <summary>
    /// DestIsHigherVersion: Disk has newer version - should NOT be selected.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-070")]
    [Property("BehaviorId", "BHV-208")]
    public void DetermineRestoreEligibility_DestIsHigherVersion_NotSelectedWithTooltip()
    {
        var request = new RestoreEligibilityRequest
        {
            ComparisonState = FileComparisonState.DestIsHigherVersion
        };

        var result = ProjectCreationService.DetermineRestoreEligibility(request);

        Assert.That(result.DefaultSelected, Is.False);
        Assert.That(result.Tooltip, Does.Contain("newer").Or.Contain("higher").IgnoreCase);
    }

    /// <summary>
    /// SourceIsNewer: Backup file is newer by timestamp - should be selected.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-208")]
    public void DetermineRestoreEligibility_SourceIsNewer_SelectedWithTooltip()
    {
        var request = new RestoreEligibilityRequest
        {
            ComparisonState = FileComparisonState.SourceIsNewer
        };

        var result = ProjectCreationService.DetermineRestoreEligibility(request);

        Assert.That(result.DefaultSelected, Is.True);
        Assert.That(result.Tooltip, Does.Contain("newer").IgnoreCase);
    }

    /// <summary>
    /// SourceIsOlder: Disk file is newer - should NOT be selected.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-070")]
    [Property("BehaviorId", "BHV-208")]
    public void DetermineRestoreEligibility_SourceIsOlder_NotSelectedWithTooltip()
    {
        var request = new RestoreEligibilityRequest
        {
            ComparisonState = FileComparisonState.SourceIsOlder
        };

        var result = ProjectCreationService.DetermineRestoreEligibility(request);

        Assert.That(result.DefaultSelected, Is.False);
        Assert.That(result.Tooltip, Does.Contain("older").Or.Contain("newer").IgnoreCase);
    }

    /// <summary>
    /// All 8 FileComparisonState values produce valid results.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-069")]
    [Property("BehaviorId", "BHV-208")]
    [TestCase(FileComparisonState.DestDoesNotExist, true)]
    [TestCase(FileComparisonState.SourceDoesNotExist, false)]
    [TestCase(FileComparisonState.FilesAreSame, false)]
    [TestCase(FileComparisonState.FilesAreSameVersion, false)]
    [TestCase(FileComparisonState.SourceIsHigherVersion, true)]
    [TestCase(FileComparisonState.DestIsHigherVersion, false)]
    [TestCase(FileComparisonState.SourceIsNewer, true)]
    [TestCase(FileComparisonState.SourceIsOlder, false)]
    public void DetermineRestoreEligibility_AllStates_CorrectDefaultSelection(
        FileComparisonState state,
        bool expectedSelected)
    {
        var request = new RestoreEligibilityRequest
        {
            ComparisonState = state
        };

        var result = ProjectCreationService.DetermineRestoreEligibility(request);

        Assert.That(result.DefaultSelected, Is.EqualTo(expectedSelected),
            $"State {state} should have DefaultSelected = {expectedSelected}");
        Assert.That(result.Tooltip, Is.Not.Null.And.Not.Empty,
            $"State {state} should have a tooltip");
    }

    #endregion
}
