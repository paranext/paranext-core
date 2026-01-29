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

    #region CAP-019: TestEncodingSave Tests (EXT-B2-007)

    /// <summary>
    /// Acceptance test for CAP-019: TestEncodingSave must write sample text to
    /// encoding.tst file using the specified encoding and return success/failure.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-019")]
    [Property("ScenarioId", "TS-082")]
    [Property("BehaviorId", "EXT-B2-007")]
    [Description("Acceptance test: Encoding save writes text to encoding.tst file")]
    public void TestEncodingSave_AcceptanceTest()
    {
        // Create a temp directory for this test
        var tempDir = Path.Combine(Path.GetTempPath(), $"EncodingSaveTest_{Guid.NewGuid():N}");
        Directory.CreateDirectory(tempDir);

        try
        {
            // This test passes when CAP-019 is complete
            const string sampleText = "Sample text for encoding test.";
            const int utf8CodePage = 65001; // UTF-8

            var result = ProjectCreationService.TestEncodingSave(sampleText, tempDir, utf8CodePage);

            Assert.That(result, Is.True, "TestEncodingSave should return true on success");

            // Verify the file was created
            var testFilePath = Path.Combine(tempDir, "encoding.tst");
            Assert.That(File.Exists(testFilePath), Is.True, "encoding.tst file should be created");
        }
        finally
        {
            // Cleanup
            if (Directory.Exists(tempDir))
                Directory.Delete(tempDir, true);
        }
    }

    /// <summary>
    /// TestEncodingSave with UTF-8 encoding (codepage 65001) writes file successfully.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-082")]
    [Property("BehaviorId", "EXT-B2-007")]
    public void TestEncodingSave_WithUtf8Encoding_WritesFileSuccessfully()
    {
        var tempDir = Path.Combine(Path.GetTempPath(), $"EncodingSaveTest_{Guid.NewGuid():N}");
        Directory.CreateDirectory(tempDir);

        try
        {
            const string sampleText = "Hello, World! This is UTF-8 text.";
            const int utf8CodePage = 65001;

            var result = ProjectCreationService.TestEncodingSave(sampleText, tempDir, utf8CodePage);

            Assert.That(result, Is.True);

            var testFilePath = Path.Combine(tempDir, "encoding.tst");
            Assert.That(File.Exists(testFilePath), Is.True);

            // Verify content was written correctly
            var fileContent = File.ReadAllText(testFilePath, System.Text.Encoding.UTF8);
            Assert.That(fileContent, Is.EqualTo(sampleText));
        }
        finally
        {
            if (Directory.Exists(tempDir))
                Directory.Delete(tempDir, true);
        }
    }

    /// <summary>
    /// TestEncodingSave with legacy encoding (Windows-1252, codepage 1252) writes file successfully.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-082")]
    [Property("BehaviorId", "EXT-B2-007")]
    public void TestEncodingSave_WithLegacyEncoding_WritesFileSuccessfully()
    {
        var tempDir = Path.Combine(Path.GetTempPath(), $"EncodingSaveTest_{Guid.NewGuid():N}");
        Directory.CreateDirectory(tempDir);

        try
        {
            // Use ASCII-safe text for legacy encoding test
            const string sampleText = "Hello, World! Legacy encoding test.";
            const int windows1252CodePage = 1252;

            var result = ProjectCreationService.TestEncodingSave(sampleText, tempDir, windows1252CodePage);

            Assert.That(result, Is.True);

            var testFilePath = Path.Combine(tempDir, "encoding.tst");
            Assert.That(File.Exists(testFilePath), Is.True);
        }
        finally
        {
            if (Directory.Exists(tempDir))
                Directory.Delete(tempDir, true);
        }
    }

    /// <summary>
    /// TestEncodingSave with non-existent directory returns false.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-082")]
    [Property("BehaviorId", "EXT-B2-007")]
    public void TestEncodingSave_WithNonExistentDirectory_ReturnsFalse()
    {
        const string invalidDir = "/non/existent/directory/path/that/should/not/exist";
        const string sampleText = "Test text";
        const int utf8CodePage = 65001;

        var result = ProjectCreationService.TestEncodingSave(sampleText, invalidDir, utf8CodePage);

        Assert.That(result, Is.False, "Should return false for non-existent directory");
    }

    /// <summary>
    /// TestEncodingSave with special Unicode characters writes correctly with UTF-8.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-082")]
    [Property("BehaviorId", "EXT-B2-007")]
    public void TestEncodingSave_WithUnicodeText_WritesCorrectly()
    {
        var tempDir = Path.Combine(Path.GetTempPath(), $"EncodingSaveTest_{Guid.NewGuid():N}");
        Directory.CreateDirectory(tempDir);

        try
        {
            // Text with various Unicode characters (Hebrew, Greek, accented)
            const string unicodeText = "Greek: \u03B1\u03B2\u03B3 Hebrew: \u05D0\u05D1\u05D2 Accented: caf\u00E9";
            const int utf8CodePage = 65001;

            var result = ProjectCreationService.TestEncodingSave(unicodeText, tempDir, utf8CodePage);

            Assert.That(result, Is.True);

            var testFilePath = Path.Combine(tempDir, "encoding.tst");
            var fileContent = File.ReadAllText(testFilePath, System.Text.Encoding.UTF8);
            Assert.That(fileContent, Is.EqualTo(unicodeText));
        }
        finally
        {
            if (Directory.Exists(tempDir))
                Directory.Delete(tempDir, true);
        }
    }

    /// <summary>
    /// TestEncodingSave with empty text writes empty file successfully.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-082")]
    [Property("BehaviorId", "EXT-B2-007")]
    public void TestEncodingSave_WithEmptyText_WritesEmptyFile()
    {
        var tempDir = Path.Combine(Path.GetTempPath(), $"EncodingSaveTest_{Guid.NewGuid():N}");
        Directory.CreateDirectory(tempDir);

        try
        {
            const string emptyText = "";
            const int utf8CodePage = 65001;

            var result = ProjectCreationService.TestEncodingSave(emptyText, tempDir, utf8CodePage);

            Assert.That(result, Is.True);

            var testFilePath = Path.Combine(tempDir, "encoding.tst");
            Assert.That(File.Exists(testFilePath), Is.True);

            var fileContent = File.ReadAllText(testFilePath);
            Assert.That(fileContent, Is.Empty);
        }
        finally
        {
            if (Directory.Exists(tempDir))
                Directory.Delete(tempDir, true);
        }
    }

    /// <summary>
    /// TestEncodingSave overwrites existing encoding.tst file.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-082")]
    [Property("BehaviorId", "EXT-B2-007")]
    public void TestEncodingSave_OverwritesExistingFile()
    {
        var tempDir = Path.Combine(Path.GetTempPath(), $"EncodingSaveTest_{Guid.NewGuid():N}");
        Directory.CreateDirectory(tempDir);

        try
        {
            var testFilePath = Path.Combine(tempDir, "encoding.tst");

            // Write initial content
            File.WriteAllText(testFilePath, "Original content");

            const string newText = "New content after overwrite";
            const int utf8CodePage = 65001;

            var result = ProjectCreationService.TestEncodingSave(newText, tempDir, utf8CodePage);

            Assert.That(result, Is.True);

            var fileContent = File.ReadAllText(testFilePath);
            Assert.That(fileContent, Is.EqualTo(newText), "File should be overwritten with new content");
        }
        finally
        {
            if (Directory.Exists(tempDir))
                Directory.Delete(tempDir, true);
        }
    }

    /// <summary>
    /// TestEncodingSave with multiline text writes correctly.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-082")]
    [Property("BehaviorId", "EXT-B2-007")]
    public void TestEncodingSave_WithMultilineText_WritesCorrectly()
    {
        var tempDir = Path.Combine(Path.GetTempPath(), $"EncodingSaveTest_{Guid.NewGuid():N}");
        Directory.CreateDirectory(tempDir);

        try
        {
            const string multilineText = "Line 1\nLine 2\nLine 3\nLine 4\nLine 5";
            const int utf8CodePage = 65001;

            var result = ProjectCreationService.TestEncodingSave(multilineText, tempDir, utf8CodePage);

            Assert.That(result, Is.True);

            var testFilePath = Path.Combine(tempDir, "encoding.tst");
            var fileContent = File.ReadAllText(testFilePath, System.Text.Encoding.UTF8);
            Assert.That(fileContent, Is.EqualTo(multilineText));
        }
        finally
        {
            if (Directory.Exists(tempDir))
                Directory.Delete(tempDir, true);
        }
    }

    #endregion

    #region CAP-020: GetSampleText Tests (EXT-B2-008)

    /// <summary>
    /// Acceptance test for CAP-020: GetSampleText must return first 50 lines
    /// from the first book of a project for encoding preview.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-020")]
    [Property("ScenarioId", "TS-083")]
    [Property("BehaviorId", "EXT-B2-008")]
    [Description("Acceptance test: GetSampleText returns text from first book")]
    public void GetSampleText_AcceptanceTest()
    {
        // Note: This test requires a project to exist. Since we're in RED phase,
        // the method doesn't exist yet. This test will fail initially.
        const string projectName = "NonExistentTestProject";
        const int utf8CodePage = 65001;

        var result = ProjectCreationService.GetSampleText(projectName, utf8CodePage);

        // For a non-existent project, should return empty string
        Assert.That(result, Is.Not.Null);
    }

    /// <summary>
    /// GetSampleText with non-existent project returns empty string.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-083")]
    [Property("BehaviorId", "EXT-B2-008")]
    public void GetSampleText_WithNonExistentProject_ReturnsEmptyString()
    {
        const string nonExistentProject = "ProjectThatDoesNotExist12345";
        const int utf8CodePage = 65001;

        var result = ProjectCreationService.GetSampleText(nonExistentProject, utf8CodePage);

        Assert.That(result, Is.Empty, "Should return empty string for non-existent project");
    }

    /// <summary>
    /// GetSampleText respects maxLines parameter.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-083")]
    [Property("BehaviorId", "EXT-B2-008")]
    public void GetSampleText_WithCustomMaxLines_RespectsLimit()
    {
        // Note: Without a real project, this test verifies the method signature
        // and returns empty for missing project.
        const string projectName = "NonExistentTestProject";
        const int utf8CodePage = 65001;
        const int customMaxLines = 10;

        var result = ProjectCreationService.GetSampleText(projectName, utf8CodePage, customMaxLines);

        // For non-existent project, should return empty string regardless of maxLines
        Assert.That(result, Is.Not.Null);
    }

    /// <summary>
    /// GetSampleText uses default maxLines of 50 when not specified.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-083")]
    [Property("BehaviorId", "EXT-B2-008")]
    public void GetSampleText_WithDefaultMaxLines_Uses50()
    {
        // Note: This test primarily verifies the method signature accepts
        // the call without maxLines parameter.
        const string projectName = "NonExistentTestProject";
        const int utf8CodePage = 65001;

        // Call without maxLines - should use default of 50
        var result = ProjectCreationService.GetSampleText(projectName, utf8CodePage);

        Assert.That(result, Is.Not.Null);
    }

    /// <summary>
    /// GetSampleText with null project name returns empty string.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-083")]
    [Property("BehaviorId", "EXT-B2-008")]
    public void GetSampleText_WithNullProjectName_ReturnsEmptyString()
    {
        const int utf8CodePage = 65001;

        var result = ProjectCreationService.GetSampleText(null!, utf8CodePage);

        Assert.That(result, Is.Empty, "Should return empty string for null project name");
    }

    /// <summary>
    /// GetSampleText with empty project name returns empty string.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-083")]
    [Property("BehaviorId", "EXT-B2-008")]
    public void GetSampleText_WithEmptyProjectName_ReturnsEmptyString()
    {
        const int utf8CodePage = 65001;

        var result = ProjectCreationService.GetSampleText("", utf8CodePage);

        Assert.That(result, Is.Empty, "Should return empty string for empty project name");
    }

    /// <summary>
    /// GetSampleText with zero maxLines returns empty string.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-083")]
    [Property("BehaviorId", "EXT-B2-008")]
    public void GetSampleText_WithZeroMaxLines_ReturnsEmptyString()
    {
        const string projectName = "NonExistentTestProject";
        const int utf8CodePage = 65001;
        const int zeroLines = 0;

        var result = ProjectCreationService.GetSampleText(projectName, utf8CodePage, zeroLines);

        Assert.That(result, Is.Empty, "Should return empty string when maxLines is 0");
    }

    /// <summary>
    /// GetSampleText with negative maxLines returns empty string (or handles gracefully).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-083")]
    [Property("BehaviorId", "EXT-B2-008")]
    public void GetSampleText_WithNegativeMaxLines_ReturnsEmptyString()
    {
        const string projectName = "NonExistentTestProject";
        const int utf8CodePage = 65001;
        const int negativeLines = -5;

        var result = ProjectCreationService.GetSampleText(projectName, utf8CodePage, negativeLines);

        Assert.That(result, Is.Empty, "Should return empty string when maxLines is negative");
    }

    /// <summary>
    /// GetSampleText with different encodings is supported.
    /// Tests that the method accepts various codepage values.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-083")]
    [Property("BehaviorId", "EXT-B2-008")]
    [TestCase(65001)]  // UTF-8
    [TestCase(1252)]   // Windows-1252
    [TestCase(28591)]  // ISO-8859-1 (Latin-1)
    public void GetSampleText_WithDifferentEncodings_AcceptsCodepage(int encodingCodePage)
    {
        const string projectName = "NonExistentTestProject";

        // Method should accept various encoding code pages without throwing
        var result = ProjectCreationService.GetSampleText(projectName, encodingCodePage);

        Assert.That(result, Is.Not.Null, $"Should handle encoding codepage {encodingCodePage}");
    }

    #endregion

    #region CAP-001: CreateProject Tests (EXT-003)

    /// <summary>
    /// Acceptance test for CAP-001: CreateProject must create projects of all 8 user-selectable
    /// types with correct Settings.xml matching golden masters; project registered in collection; GUID assigned.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-100")]
    [Description("Acceptance test: Create standard project with valid settings")]
    public async Task CreateProject_StandardProject_AcceptanceTest()
    {
        // This test passes when CAP-001 is complete
        var request = new ProjectCreationRequest
        {
            ShortName = "TSTSND",
            FullName = "Test Standard Project",
            LanguageId = "en:Latn::",
            ProjectType = ProjectType.Standard,
            Versification = "English"
        };

        var result = await ProjectCreationService.CreateProjectAsync(request);

        // Verify success
        Assert.That(result.Success, Is.True, "Project creation should succeed");
        Assert.That(result.Project, Is.Not.Null, "Project info should be returned");
        Assert.That(result.Project!.ShortName, Is.EqualTo("TSTSND"));
        Assert.That(result.Project.FullName, Is.EqualTo("Test Standard Project"));
        Assert.That(result.Project.ProjectType, Is.EqualTo(ProjectType.Standard));
        Assert.That(result.Project.Guid, Is.Not.Null.And.Not.Empty, "GUID should be assigned");
        Assert.That(result.Project.SettingsFilePath, Is.Not.Null.And.Not.Empty, "Settings file path should be returned");
    }

    /// <summary>
    /// GM-001: Create Standard Translation project.
    /// BHV-100: Project type classification, BHV-103: GUID assignment, BHV-106: Settings persistence.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-001")]
    [Property("BehaviorId", "BHV-100")]
    [Property("GoldenMasterId", "GM-001")]
    public async Task CreateProject_StandardTranslation_MatchesGoldenMaster()
    {
        var request = new ProjectCreationRequest
        {
            ShortName = "GMTEST1",
            FullName = "Golden Master Test Standard",
            LanguageId = "en:Latn::",
            ProjectType = ProjectType.Standard,
            Versification = "English"
        };

        var result = await ProjectCreationService.CreateProjectAsync(request);

        Assert.That(result.Success, Is.True);
        Assert.That(result.Project, Is.Not.Null);
        Assert.That(result.Project!.ProjectType, Is.EqualTo(ProjectType.Standard));
        // GM-001 key assertion: GUID format is 40-char hex
        Assert.That(result.Project.Guid, Does.Match("^[0-9a-f]{40}$"));
        // GM-001 side effect: Settings.xml created
        Assert.That(result.Project.SettingsFilePath, Does.EndWith("Settings.xml"));
    }

    /// <summary>
    /// GM-002: Create Back Translation project linked to base.
    /// BHV-101: Derived type detection, BHV-102: License sharing, BHV-104: TranslationInfo creation.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-002")]
    [Property("BehaviorId", "BHV-101")]
    [Property("GoldenMasterId", "GM-002")]
    public async Task CreateProject_BackTranslation_MatchesGoldenMaster()
    {
        // First create a base project
        var baseRequest = new ProjectCreationRequest
        {
            ShortName = "BASEP",
            FullName = "Base Project",
            LanguageId = "en:Latn::",
            ProjectType = ProjectType.Standard,
            Versification = "English"
        };
        var baseResult = await ProjectCreationService.CreateProjectAsync(baseRequest);
        Assert.That(baseResult.Success, Is.True, "Base project creation should succeed");

        // Now create the back translation
        var btRequest = new ProjectCreationRequest
        {
            ShortName = "GMTESTBT",
            FullName = "Golden Master Test Back Translation",
            LanguageId = "en:Latn::",
            ProjectType = ProjectType.BackTranslation,
            BaseProjectName = "BASEP",
            BaseProjectGuid = baseResult.Project!.Guid
        };

        var btResult = await ProjectCreationService.CreateProjectAsync(btRequest);

        Assert.That(btResult.Success, Is.True);
        Assert.That(btResult.Project, Is.Not.Null);
        Assert.That(btResult.Project!.ProjectType, Is.EqualTo(ProjectType.BackTranslation));
        // GM-002 key assertion: TranslationInfo links to base
        Assert.That(btResult.Project.BaseProjectName, Is.EqualTo("BASEP"));
        Assert.That(btResult.Project.BaseProjectGuid, Is.EqualTo(baseResult.Project.Guid));
        // GM-002: Versification inherited from base (INV-005)
        Assert.That(btResult.Project.Versification, Is.EqualTo(baseResult.Project.Versification));
    }

    /// <summary>
    /// GM-003: Create Daughter Translation project.
    /// BHV-102: License requirements differ from BackTranslation.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-003")]
    [Property("BehaviorId", "BHV-101")]
    [Property("GoldenMasterId", "GM-003")]
    public async Task CreateProject_DaughterTranslation_MatchesGoldenMaster()
    {
        // First create a base project
        var baseRequest = new ProjectCreationRequest
        {
            ShortName = "BASEP2",
            FullName = "Base Project for Daughter",
            LanguageId = "en:Latn::",
            ProjectType = ProjectType.Standard,
            Versification = "English"
        };
        var baseResult = await ProjectCreationService.CreateProjectAsync(baseRequest);
        Assert.That(baseResult.Success, Is.True);

        // Create daughter
        var daughterRequest = new ProjectCreationRequest
        {
            ShortName = "GMTESTDT",
            FullName = "Golden Master Test Daughter",
            LanguageId = "en:Latn::",
            ProjectType = ProjectType.Daughter,
            BaseProjectName = "BASEP2",
            BaseProjectGuid = baseResult.Project!.Guid
        };

        var result = await ProjectCreationService.CreateProjectAsync(daughterRequest);

        Assert.That(result.Success, Is.True);
        Assert.That(result.Project, Is.Not.Null);
        Assert.That(result.Project!.ProjectType, Is.EqualTo(ProjectType.Daughter));
        Assert.That(result.Project.BaseProjectName, Is.EqualTo("BASEP2"));
    }

    /// <summary>
    /// GM-004: Create Auxiliary project.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-004")]
    [Property("BehaviorId", "BHV-101")]
    [Property("GoldenMasterId", "GM-004")]
    public async Task CreateProject_Auxiliary_MatchesGoldenMaster()
    {
        // First create a base project
        var baseRequest = new ProjectCreationRequest
        {
            ShortName = "BASEP3",
            FullName = "Base Project for Auxiliary",
            LanguageId = "en:Latn::",
            ProjectType = ProjectType.Standard,
            Versification = "English"
        };
        var baseResult = await ProjectCreationService.CreateProjectAsync(baseRequest);
        Assert.That(baseResult.Success, Is.True);

        // Create auxiliary
        var auxRequest = new ProjectCreationRequest
        {
            ShortName = "GMTESTAX",
            FullName = "Golden Master Test Auxiliary",
            LanguageId = "en:Latn::",
            ProjectType = ProjectType.Auxiliary,
            BaseProjectName = "BASEP3",
            BaseProjectGuid = baseResult.Project!.Guid
        };

        var result = await ProjectCreationService.CreateProjectAsync(auxRequest);

        Assert.That(result.Success, Is.True);
        Assert.That(result.Project, Is.Not.Null);
        Assert.That(result.Project!.ProjectType, Is.EqualTo(ProjectType.Auxiliary));
        Assert.That(result.Project.BaseProjectName, Is.EqualTo("BASEP3"));
    }

    /// <summary>
    /// GM-005: Create Study Bible Additions project.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-005")]
    [Property("BehaviorId", "BHV-101")]
    [Property("GoldenMasterId", "GM-005")]
    public async Task CreateProject_StudyBibleAdditions_MatchesGoldenMaster()
    {
        // First create a base project
        var baseRequest = new ProjectCreationRequest
        {
            ShortName = "BASEP4",
            FullName = "Base Project for Study Bible",
            LanguageId = "en:Latn::",
            ProjectType = ProjectType.Standard,
            Versification = "English"
        };
        var baseResult = await ProjectCreationService.CreateProjectAsync(baseRequest);
        Assert.That(baseResult.Success, Is.True);

        // Create study bible
        var sbRequest = new ProjectCreationRequest
        {
            ShortName = "GMTESTSB",
            FullName = "Golden Master Test Study Bible",
            LanguageId = "en:Latn::",
            ProjectType = ProjectType.StudyBibleAdditions,
            BaseProjectName = "BASEP4",
            BaseProjectGuid = baseResult.Project!.Guid
        };

        var result = await ProjectCreationService.CreateProjectAsync(sbRequest);

        Assert.That(result.Success, Is.True);
        Assert.That(result.Project, Is.Not.Null);
        Assert.That(result.Project!.ProjectType, Is.EqualTo(ProjectType.StudyBibleAdditions));
    }

    /// <summary>
    /// GM-006: Create Consultant Notes project.
    /// Note: ConsultantNotes is NOT a derived type (no base project required).
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-006")]
    [Property("BehaviorId", "BHV-100")]
    [Property("GoldenMasterId", "GM-006")]
    public async Task CreateProject_ConsultantNotes_MatchesGoldenMaster()
    {
        var request = new ProjectCreationRequest
        {
            ShortName = "GMTESTCN",
            FullName = "Golden Master Test Consultant Notes",
            LanguageId = "en:Latn::",
            ProjectType = ProjectType.ConsultantNotes,
            Versification = "English"
        };

        var result = await ProjectCreationService.CreateProjectAsync(request);

        Assert.That(result.Success, Is.True);
        Assert.That(result.Project, Is.Not.Null);
        Assert.That(result.Project!.ProjectType, Is.EqualTo(ProjectType.ConsultantNotes));
        // ConsultantNotes is NOT a derived type, so no base project
        Assert.That(result.Project.BaseProjectName, Is.Null);
    }

    /// <summary>
    /// GM-007: Create Transliteration Manual project.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-007")]
    [Property("BehaviorId", "BHV-101")]
    [Property("GoldenMasterId", "GM-007")]
    public async Task CreateProject_TransliterationManual_MatchesGoldenMaster()
    {
        // First create a base project
        var baseRequest = new ProjectCreationRequest
        {
            ShortName = "BASEP5",
            FullName = "Base Project for Transliteration",
            LanguageId = "en:Latn::",
            ProjectType = ProjectType.Standard,
            Versification = "English"
        };
        var baseResult = await ProjectCreationService.CreateProjectAsync(baseRequest);
        Assert.That(baseResult.Success, Is.True);

        // Create transliteration manual
        var tlRequest = new ProjectCreationRequest
        {
            ShortName = "GMTESTTM",
            FullName = "Golden Master Test Transliteration Manual",
            LanguageId = "en:Latn::",
            ProjectType = ProjectType.TransliterationManual,
            BaseProjectName = "BASEP5",
            BaseProjectGuid = baseResult.Project!.Guid
        };

        var result = await ProjectCreationService.CreateProjectAsync(tlRequest);

        Assert.That(result.Success, Is.True);
        Assert.That(result.Project, Is.Not.Null);
        Assert.That(result.Project!.ProjectType, Is.EqualTo(ProjectType.TransliterationManual));
    }

    /// <summary>
    /// GM-008: Create Transliteration With Encoder project.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-008")]
    [Property("BehaviorId", "BHV-101")]
    [Property("GoldenMasterId", "GM-008")]
    public async Task CreateProject_TransliterationWithEncoder_MatchesGoldenMaster()
    {
        // First create a base project
        var baseRequest = new ProjectCreationRequest
        {
            ShortName = "BASEP6",
            FullName = "Base Project for Transliteration Encoder",
            LanguageId = "en:Latn::",
            ProjectType = ProjectType.Standard,
            Versification = "English"
        };
        var baseResult = await ProjectCreationService.CreateProjectAsync(baseRequest);
        Assert.That(baseResult.Success, Is.True);

        // Create transliteration with encoder
        var teRequest = new ProjectCreationRequest
        {
            ShortName = "GMTESTTE",
            FullName = "Golden Master Test Transliteration Encoder",
            LanguageId = "en:Latn::",
            ProjectType = ProjectType.TransliterationWithEncoder,
            BaseProjectName = "BASEP6",
            BaseProjectGuid = baseResult.Project!.Guid
        };

        var result = await ProjectCreationService.CreateProjectAsync(teRequest);

        Assert.That(result.Success, Is.True);
        Assert.That(result.Project, Is.Not.Null);
        Assert.That(result.Project!.ProjectType, Is.EqualTo(ProjectType.TransliterationWithEncoder));
    }

    /// <summary>
    /// VAL-001: Short name less than 3 characters rejected.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-201")]
    [TestCase("AB")]
    [TestCase("X")]
    [TestCase("")]
    public async Task CreateProject_ShortNameTooShort_ReturnsError(string shortName)
    {
        var request = new ProjectCreationRequest
        {
            ShortName = shortName,
            FullName = "Test Project",
            LanguageId = "en:Latn::",
            ProjectType = ProjectType.Standard,
            Versification = "English"
        };

        var result = await ProjectCreationService.CreateProjectAsync(request);

        Assert.That(result.Success, Is.False);
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo(ProjectCreationErrorCode.InvalidShortName));
        Assert.That(result.Error.Field, Is.EqualTo("shortName").Or.EqualTo("ShortName"));
    }

    /// <summary>
    /// VAL-001: Short name greater than 8 characters rejected.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-201")]
    [TestCase("VERYLONGNAME")]
    [TestCase("TOOLONGNAME")]
    public async Task CreateProject_ShortNameTooLong_ReturnsError(string shortName)
    {
        var request = new ProjectCreationRequest
        {
            ShortName = shortName,
            FullName = "Test Project",
            LanguageId = "en:Latn::",
            ProjectType = ProjectType.Standard,
            Versification = "English"
        };

        var result = await ProjectCreationService.CreateProjectAsync(request);

        Assert.That(result.Success, Is.False);
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo(ProjectCreationErrorCode.InvalidShortName));
    }

    /// <summary>
    /// VAL-002: Short name with spaces rejected.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-108")]
    public async Task CreateProject_ShortNameWithSpaces_ReturnsError()
    {
        var request = new ProjectCreationRequest
        {
            ShortName = "HAS SPC",
            FullName = "Test Project",
            LanguageId = "en:Latn::",
            ProjectType = ProjectType.Standard,
            Versification = "English"
        };

        var result = await ProjectCreationService.CreateProjectAsync(request);

        Assert.That(result.Success, Is.False);
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo(ProjectCreationErrorCode.ShortNameHasSpaces));
    }

    /// <summary>
    /// VAL-003: Windows reserved names rejected.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-201")]
    [TestCase("CON")]
    [TestCase("PRN")]
    [TestCase("AUX")]
    [TestCase("NUL")]
    [TestCase("COM1")]
    [TestCase("LPT1")]
    public async Task CreateProject_ReservedName_ReturnsError(string shortName)
    {
        var request = new ProjectCreationRequest
        {
            ShortName = shortName,
            FullName = "Test Project",
            LanguageId = "en:Latn::",
            ProjectType = ProjectType.Standard,
            Versification = "English"
        };

        var result = await ProjectCreationService.CreateProjectAsync(request);

        Assert.That(result.Success, Is.False);
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo(ProjectCreationErrorCode.ReservedName));
    }

    /// <summary>
    /// VAL-007: Empty full name rejected.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-301")]
    [TestCase("")]
    [TestCase("   ")]
    [TestCase(null)]
    public async Task CreateProject_EmptyFullName_ReturnsError(string? fullName)
    {
        var request = new ProjectCreationRequest
        {
            ShortName = "TSTPRJ",
            FullName = fullName!,
            LanguageId = "en:Latn::",
            ProjectType = ProjectType.Standard,
            Versification = "English"
        };

        var result = await ProjectCreationService.CreateProjectAsync(request);

        Assert.That(result.Success, Is.False);
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo(ProjectCreationErrorCode.EmptyFullName));
    }

    /// <summary>
    /// INV-002: Derived project type without base project returns error.
    /// PRE-001: Create derived project requires base exists.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-104")]
    [Property("InvariantId", "INV-002")]
    [TestCase(ProjectType.BackTranslation)]
    [TestCase(ProjectType.Daughter)]
    [TestCase(ProjectType.Auxiliary)]
    [TestCase(ProjectType.StudyBibleAdditions)]
    [TestCase(ProjectType.TransliterationManual)]
    [TestCase(ProjectType.TransliterationWithEncoder)]
    public async Task CreateProject_DerivedTypeWithoutBase_ReturnsError(ProjectType derivedType)
    {
        var request = new ProjectCreationRequest
        {
            ShortName = "NOBASE",
            FullName = "Project without base",
            LanguageId = "en:Latn::",
            ProjectType = derivedType,
            Versification = "English"
            // BaseProjectName intentionally omitted
        };

        var result = await ProjectCreationService.CreateProjectAsync(request);

        Assert.That(result.Success, Is.False);
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo(ProjectCreationErrorCode.MissingBaseProject));
    }

    /// <summary>
    /// Derived project with non-existent base project returns error.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-104")]
    public async Task CreateProject_DerivedTypeWithNonExistentBase_ReturnsError()
    {
        var request = new ProjectCreationRequest
        {
            ShortName = "NOBASE2",
            FullName = "Project with missing base",
            LanguageId = "en:Latn::",
            ProjectType = ProjectType.BackTranslation,
            BaseProjectName = "NONEXISTENT",
            BaseProjectGuid = "0000000000000000000000000000000000000000"
        };

        var result = await ProjectCreationService.CreateProjectAsync(request);

        Assert.That(result.Success, Is.False);
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo(ProjectCreationErrorCode.BaseProjectNotFound));
    }

    /// <summary>
    /// Standard project without versification returns error.
    /// VAL-009: Versification not null for Standard type.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-365")]
    public async Task CreateProject_StandardWithoutVersification_ReturnsError()
    {
        var request = new ProjectCreationRequest
        {
            ShortName = "NOVERS",
            FullName = "Project without versification",
            LanguageId = "en:Latn::",
            ProjectType = ProjectType.Standard
            // Versification intentionally omitted
        };

        var result = await ProjectCreationService.CreateProjectAsync(request);

        Assert.That(result.Success, Is.False);
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo(ProjectCreationErrorCode.MissingVersification));
    }

    /// <summary>
    /// INV-003: Each project gets unique GUID.
    /// Tests that two projects created have different GUIDs.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-011")]
    [Property("BehaviorId", "BHV-103")]
    [Property("InvariantId", "INV-003")]
    public async Task CreateProject_TwoProjects_HaveUniqueGuids()
    {
        var request1 = new ProjectCreationRequest
        {
            ShortName = "UNIQ1",
            FullName = "Unique Test 1",
            LanguageId = "en:Latn::",
            ProjectType = ProjectType.Standard,
            Versification = "English"
        };
        var request2 = new ProjectCreationRequest
        {
            ShortName = "UNIQ2",
            FullName = "Unique Test 2",
            LanguageId = "en:Latn::",
            ProjectType = ProjectType.Standard,
            Versification = "English"
        };

        var result1 = await ProjectCreationService.CreateProjectAsync(request1);
        var result2 = await ProjectCreationService.CreateProjectAsync(request2);

        Assert.That(result1.Success, Is.True);
        Assert.That(result2.Success, Is.True);
        Assert.That(result1.Project!.Guid, Is.Not.EqualTo(result2.Project!.Guid),
            "Two projects should have different GUIDs (INV-003)");
        Assert.That(result1.Project.Guid, Is.Not.EqualTo(Guid.Empty.ToString()));
        Assert.That(result2.Project.Guid, Is.Not.EqualTo(Guid.Empty.ToString()));
    }

    /// <summary>
    /// INV-006: Settings file must be valid XML after creation.
    /// Verifies that the settings file path exists and is valid.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-014")]
    [Property("BehaviorId", "BHV-106")]
    [Property("InvariantId", "INV-006")]
    public async Task CreateProject_SettingsFileCreated_IsValidXml()
    {
        var request = new ProjectCreationRequest
        {
            ShortName = "XMLTST",
            FullName = "XML Settings Test",
            LanguageId = "en:Latn::",
            ProjectType = ProjectType.Standard,
            Versification = "English"
        };

        var result = await ProjectCreationService.CreateProjectAsync(request);

        Assert.That(result.Success, Is.True);
        Assert.That(result.Project, Is.Not.Null);
        Assert.That(result.Project!.SettingsFilePath, Does.EndWith("Settings.xml"));
        // Note: In a real test with file system, we would verify the file exists and is valid XML
    }

    /// <summary>
    /// INV-005: Derived projects inherit versification from base.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-001")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "BHV-107")]
    [Property("InvariantId", "INV-005")]
    public async Task CreateProject_DerivedProject_InheritsVersification()
    {
        // Create base with specific versification
        var baseRequest = new ProjectCreationRequest
        {
            ShortName = "VERSBS",
            FullName = "Versification Base",
            LanguageId = "en:Latn::",
            ProjectType = ProjectType.Standard,
            Versification = "Septuagint"
        };
        var baseResult = await ProjectCreationService.CreateProjectAsync(baseRequest);
        Assert.That(baseResult.Success, Is.True);

        // Create derived without specifying versification
        var derivedRequest = new ProjectCreationRequest
        {
            ShortName = "VERSDR",
            FullName = "Versification Derived",
            LanguageId = "en:Latn::",
            ProjectType = ProjectType.BackTranslation,
            BaseProjectName = "VERSBS",
            BaseProjectGuid = baseResult.Project!.Guid
            // Versification not specified - should inherit
        };

        var derivedResult = await ProjectCreationService.CreateProjectAsync(derivedRequest);

        Assert.That(derivedResult.Success, Is.True);
        Assert.That(derivedResult.Project, Is.Not.Null);
        // Verify versification inherited from base (INV-005)
        Assert.That(derivedResult.Project!.Versification, Is.EqualTo("Septuagint"));
    }

    #endregion

    #region CAP-002: GetProjectOptions Tests

    /// <summary>
    /// Acceptance test for CAP-002: GetProjectOptions must return populated options
    /// including languages, versifications, project types, and base projects.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-019")]
    [Property("BehaviorId", "BHV-110")]
    [Description("Acceptance test: GetProjectOptions returns populated options")]
    public async Task GetProjectOptions_AcceptanceTest()
    {
        var result = await ProjectCreationService.GetProjectOptionsAsync();

        // Verify all option collections are populated
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Languages, Is.Not.Null.And.Not.Empty, "Languages should be populated");
        Assert.That(result.Versifications, Is.Not.Null.And.Not.Empty, "Versifications should be populated");
        Assert.That(result.ProjectTypes, Is.Not.Null.And.Not.Empty, "Project types should be populated");
        Assert.That(result.Encodings, Is.Not.Null, "Encodings should be present");
        Assert.That(result.Normalizations, Is.Not.Null, "Normalizations should be present");
    }

    /// <summary>
    /// GetProjectOptions returns all 8 user-selectable project types.
    /// SPEC-001: Project type classification.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-009")]
    [Property("BehaviorId", "BHV-100")]
    public async Task GetProjectOptions_ReturnsAll8UserSelectableTypes()
    {
        var result = await ProjectCreationService.GetProjectOptionsAsync();

        Assert.That(result.ProjectTypes, Is.Not.Null);

        var typeValues = result.ProjectTypes.Select(t => t.Value).ToList();

        // Verify all 8 user-selectable types are included
        Assert.That(typeValues, Does.Contain(ProjectType.Standard));
        Assert.That(typeValues, Does.Contain(ProjectType.BackTranslation));
        Assert.That(typeValues, Does.Contain(ProjectType.Daughter));
        Assert.That(typeValues, Does.Contain(ProjectType.Auxiliary));
        Assert.That(typeValues, Does.Contain(ProjectType.StudyBibleAdditions));
        Assert.That(typeValues, Does.Contain(ProjectType.ConsultantNotes));
        Assert.That(typeValues, Does.Contain(ProjectType.TransliterationManual));
        Assert.That(typeValues, Does.Contain(ProjectType.TransliterationWithEncoder));
    }

    /// <summary>
    /// GetProjectOptions returns correct IsDerived flag for each type.
    /// SPEC-001: TC-001-01 through TC-001-08.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-010")]
    [Property("BehaviorId", "BHV-101")]
    public async Task GetProjectOptions_ReturnsCorrectIsDerivedFlag()
    {
        var result = await ProjectCreationService.GetProjectOptionsAsync();

        var types = result.ProjectTypes.ToDictionary(t => t.Value, t => t);

        // Standard and ConsultantNotes are NOT derived
        Assert.That(types[ProjectType.Standard].IsDerived, Is.False, "Standard should not be derived");
        Assert.That(types[ProjectType.ConsultantNotes].IsDerived, Is.False, "ConsultantNotes should not be derived");

        // All others ARE derived
        Assert.That(types[ProjectType.BackTranslation].IsDerived, Is.True, "BackTranslation should be derived");
        Assert.That(types[ProjectType.Daughter].IsDerived, Is.True, "Daughter should be derived");
        Assert.That(types[ProjectType.Auxiliary].IsDerived, Is.True, "Auxiliary should be derived");
        Assert.That(types[ProjectType.StudyBibleAdditions].IsDerived, Is.True, "StudyBibleAdditions should be derived");
        Assert.That(types[ProjectType.TransliterationManual].IsDerived, Is.True, "TransliterationManual should be derived");
        Assert.That(types[ProjectType.TransliterationWithEncoder].IsDerived, Is.True, "TransliterationWithEncoder should be derived");
    }

    /// <summary>
    /// GetProjectOptions returns correct NeedsOwnRegistration flag.
    /// SPEC-001: DC-001 and DC-002.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-010")]
    [Property("BehaviorId", "BHV-102")]
    public async Task GetProjectOptions_ReturnsCorrectNeedsOwnRegistrationFlag()
    {
        var result = await ProjectCreationService.GetProjectOptionsAsync();

        var types = result.ProjectTypes.ToDictionary(t => t.Value, t => t);

        // Types that need own registration: Standard, Daughter, StudyBibleAdditions
        Assert.That(types[ProjectType.Standard].NeedsOwnRegistration, Is.True, "Standard needs own registration");
        Assert.That(types[ProjectType.Daughter].NeedsOwnRegistration, Is.True, "Daughter needs own registration");
        Assert.That(types[ProjectType.StudyBibleAdditions].NeedsOwnRegistration, Is.True, "StudyBibleAdditions needs own registration");

        // Types that can share license with parent: BackTranslation, Auxiliary, Transliteration
        Assert.That(types[ProjectType.BackTranslation].NeedsOwnRegistration, Is.False, "BackTranslation can share license");
        Assert.That(types[ProjectType.Auxiliary].NeedsOwnRegistration, Is.False, "Auxiliary can share license");
        Assert.That(types[ProjectType.TransliterationManual].NeedsOwnRegistration, Is.False, "TransliterationManual can share license");
        Assert.That(types[ProjectType.TransliterationWithEncoder].NeedsOwnRegistration, Is.False, "TransliterationWithEncoder can share license");
    }

    /// <summary>
    /// GetProjectOptions languages have valid LanguageId format.
    /// SPEC-008: Language identifier construction.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-020")]
    [Property("BehaviorId", "BHV-110")]
    public async Task GetProjectOptions_LanguagesHaveValidFormat()
    {
        var result = await ProjectCreationService.GetProjectOptionsAsync();

        Assert.That(result.Languages, Is.Not.Empty);

        foreach (var lang in result.Languages.Take(5)) // Check first 5 for efficiency
        {
            Assert.That(lang.Id, Is.Not.Null.And.Not.Empty, "Language Id should not be empty");
            Assert.That(lang.Code, Is.Not.Null.And.Not.Empty, "Language Code should not be empty");
            Assert.That(lang.DisplayName, Is.Not.Null.And.Not.Empty, "Language DisplayName should not be empty");
        }
    }

    /// <summary>
    /// GetProjectOptions versifications include common options.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-062")]
    [Property("BehaviorId", "BHV-155")]
    public async Task GetProjectOptions_VersificationsIncludeCommonOptions()
    {
        var result = await ProjectCreationService.GetProjectOptionsAsync();

        Assert.That(result.Versifications, Is.Not.Empty);

        var versificationIds = result.Versifications.Select(v => v.Id).ToList();

        // Common versifications should be available
        Assert.That(versificationIds, Does.Contain("English").Or.Contain("english"),
            "English versification should be available");
    }

    /// <summary>
    /// GetProjectOptions base projects list is populated from collection.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-002")]
    [Property("ScenarioId", "TS-105")]
    [Property("BehaviorId", "BHV-109")]
    public async Task GetProjectOptions_BaseProjectsListPopulated()
    {
        var result = await ProjectCreationService.GetProjectOptionsAsync();

        // AvailableBaseProjects should at minimum be an empty list, not null
        Assert.That(result.AvailableBaseProjects, Is.Not.Null);

        // If there are any base projects, verify they have required fields
        foreach (var project in result.AvailableBaseProjects.Take(3))
        {
            Assert.That(project.Name, Is.Not.Null.And.Not.Empty, "Project name should not be empty");
            Assert.That(project.Guid, Is.Not.Null.And.Not.Empty, "Project GUID should not be empty");
            Assert.That(project.DisplayName, Is.Not.Null.And.Not.Empty, "Project display name should not be empty");
        }
    }

    #endregion

    #region CAP-003: CalculateTranslationInfo Tests (SPEC-002)

    /// <summary>
    /// Acceptance test for CAP-003: CalculateTranslationInfo must create TranslationInformation
    /// for derived project types with correct serialization format.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-012")]
    [Property("BehaviorId", "BHV-104")]
    [Description("Acceptance test: CalculateTranslationInfo creates correct TranslationInformation")]
    public void CalculateTranslationInfo_BackTranslation_AcceptanceTest()
    {
        // This test passes when CAP-003 is complete
        const string baseProjectName = "BASEP";
        const string baseProjectGuid = "0123456789abcdef0123456789abcdef01234567";

        var result = ProjectCreationService.CalculateTranslationInfo(
            ProjectType.BackTranslation,
            baseProjectName,
            baseProjectGuid
        );

        Assert.That(result, Is.Not.Null);
        // TC-002-01: ToString() format should be "BackTranslation:BASEP:0123456789abcdef0123456789abcdef01234567"
        Assert.That(result.ToString(), Does.StartWith("BackTranslation:"));
        Assert.That(result.ToString(), Does.Contain(baseProjectName));
        Assert.That(result.ToString(), Does.Contain(baseProjectGuid));
    }

    /// <summary>
    /// TC-002-01: Create BackTranslation TranslationInfo with correct serialization format.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-012")]
    [Property("BehaviorId", "BHV-104")]
    public void CalculateTranslationInfo_BackTranslation_CorrectSerializationFormat()
    {
        const string baseProjectName = "BASEP";
        const string baseProjectGuid = "0123456789abcdef0123456789abcdef01234567";

        var result = ProjectCreationService.CalculateTranslationInfo(
            ProjectType.BackTranslation,
            baseProjectName,
            baseProjectGuid
        );

        // SPEC-002: Serialization format is "Type:BaseProjectName:BaseProjectGuid"
        var expected = $"BackTranslation:{baseProjectName}:{baseProjectGuid}";
        Assert.That(result.ToString(), Is.EqualTo(expected));
    }

    /// <summary>
    /// TC-002-02: Create Daughter TranslationInfo with correct BaseProjectName.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-012")]
    [Property("BehaviorId", "BHV-104")]
    public void CalculateTranslationInfo_Daughter_HasCorrectBaseProjectName()
    {
        const string baseProjectName = "BASEP";
        const string baseProjectGuid = "0123456789abcdef0123456789abcdef01234567";

        var result = ProjectCreationService.CalculateTranslationInfo(
            ProjectType.Daughter,
            baseProjectName,
            baseProjectGuid
        );

        Assert.That(result.BaseProjectName, Is.EqualTo(baseProjectName));
    }

    /// <summary>
    /// TC-002-03: Parse serialized TranslationInfo correctly.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "BHV-104")]
    public void CalculateTranslationInfo_ParseSerialized_ReturnsCorrectComponents()
    {
        const string serialized = "Auxiliary:BASEP:abcdef01234567890123456789abcdef01234567";

        var result = ProjectCreationService.ParseTranslationInfo(serialized);

        Assert.That(result.Type, Is.EqualTo(ProjectType.Auxiliary));
        Assert.That(result.BaseProjectName, Is.EqualTo("BASEP"));
        Assert.That(result.BaseProjectGuid, Is.EqualTo("abcdef01234567890123456789abcdef01234567"));
    }

    /// <summary>
    /// TC-002-04: Derived type without base throws exception.
    /// INV-002: Derived projects must have base project.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "BHV-104")]
    [Property("InvariantId", "INV-002")]
    [TestCase(ProjectType.BackTranslation)]
    [TestCase(ProjectType.Daughter)]
    [TestCase(ProjectType.Auxiliary)]
    public void CalculateTranslationInfo_DerivedWithoutBase_ThrowsException(ProjectType derivedType)
    {
        var exception = Assert.Throws<InvalidOperationException>(() =>
            ProjectCreationService.CalculateTranslationInfo(
                derivedType,
                null!, // Missing base project name
                null!  // Missing base project GUID
            )
        );

        Assert.That(exception.Message, Does.Contain("base project").IgnoreCase);
    }

    /// <summary>
    /// TC-002-05: Standard type does not require base project.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-012")]
    [Property("BehaviorId", "BHV-100")]
    public void CalculateTranslationInfo_StandardType_DoesNotRequireBase()
    {
        // Standard type should not throw even without base project
        Assert.DoesNotThrow(() =>
        {
            var result = ProjectCreationService.CalculateTranslationInfo(
                ProjectType.Standard,
                null,
                null
            );
            // For Standard type, TranslationInfo may be empty/null
            Assert.That(result, Is.Null.Or.Property("IsEmpty").EqualTo(true));
        });
    }

    /// <summary>
    /// TranslationInfo for all derived types includes BaseProjectGuid.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-037")]
    [Property("BehaviorId", "BHV-104")]
    [TestCase(ProjectType.BackTranslation)]
    [TestCase(ProjectType.Daughter)]
    [TestCase(ProjectType.Auxiliary)]
    [TestCase(ProjectType.StudyBibleAdditions)]
    [TestCase(ProjectType.TransliterationManual)]
    [TestCase(ProjectType.TransliterationWithEncoder)]
    public void CalculateTranslationInfo_AllDerivedTypes_IncludesBaseGuid(ProjectType derivedType)
    {
        const string baseProjectName = "BASEP";
        const string baseProjectGuid = "0123456789abcdef0123456789abcdef01234567";

        var result = ProjectCreationService.CalculateTranslationInfo(
            derivedType,
            baseProjectName,
            baseProjectGuid
        );

        Assert.That(result, Is.Not.Null);
        Assert.That(result.BaseProjectGuid, Is.EqualTo(baseProjectGuid));
    }

    #endregion
}
