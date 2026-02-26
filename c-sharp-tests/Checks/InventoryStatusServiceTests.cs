using Paranext.DataProvider.Checks;

namespace TestParanextDataProvider.Checks;

/// <summary>
/// Tests for CAP-004 SaveInventoryStatus: persists inventory valid/invalid items to
/// project settings. Branches by project type (SBA vs Regular) and separation state to
/// determine which settings keys to write.
///
/// Source: EXT-003 (InventoryForm.SaveInventoryStatus, PT9 InventoryForm.cs:753-782)
/// Contract: Section 4.4 M-004 SaveInventoryStatus
/// Behavior: BHV-110 (Inventory Save with Write Lock Notification)
/// Golden master: gm-007 (regular separated save)
///
/// The PT9 save logic branches:
///   - SBA projects: save only _StudyBible suffixed valid/invalid
///   - Regular separated: save main valid/invalid + _NonText suffixed valid/invalid (4 keys)
///   - Regular unseparated: save only main valid/invalid (2 keys)
///
/// After save, a change notification is sent (PT10 equivalent of WriteLock on
/// "InventorySettings").
///
/// Permission check (VAL-004): Save silently skips if user lacks
/// AmAdministratorOrTeamMember permission or project is not Editable.
///
/// Test design: Tests call InventoryStatusService static methods with
/// InventoryStatusSnapshot records (testable DTOs that capture the valid/invalid item
/// state from TextInventory objects). The service returns SaveResult records indicating
/// which parameter keys were saved. This design separates the testable business logic
/// from ParatextData infrastructure (ScriptureInventoryBase, TextInventory, ChecksDataSource).
/// </summary>
[TestFixture]
public class InventoryStatusServiceTests
{
    #region Acceptance Test (gm-007)

    /// <summary>
    /// Acceptance test: Verifies that SaveInventoryStatus for a regular separated project
    /// returns a result indicating 4 settings keys were saved:
    ///   - MatchedPairingCharacters (verse valid)
    ///   - UnmatchedPairingCharacters (verse invalid)
    ///   - MatchedPairingCharacters_NonText (non-verse valid)
    ///   - UnmatchedPairingCharacters_NonText (non-verse invalid)
    ///
    /// When this test passes, CAP-004 is complete.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-004")]
    [Property("GoldenMasterId", "gm-007")]
    [Property("BehaviorId", "BHV-110")]
    [Property("ScenarioId", "TS-096")]
    [Description(
        "Acceptance test: SaveInventoryStatus for regular separated project saves "
            + "verse + non-verse valid/invalid to 4 settings keys"
    )]
    public void SaveInventoryStatus_RegularSeparated_SavesFourSettingsKeys()
    {
        // Arrange: Regular separated project with items in both verse and non-verse
        var snapshot = new InventoryStatusSnapshot
        {
            VerseValidItems = "(",
            VerseInvalidItems = ")",
            NonVerseValidItems = "[",
            NonVerseInvalidItems = "]",
        };

        // Act
        var result = InventoryStatusService.DetermineSaveOperations(
            snapshot,
            isSba: false,
            isSeparated: true
        );

        // Assert: All 4 settings keys are present (matches gm-007 expected output)
        Assert.Multiple(() =>
        {
            Assert.That(result.Operations, Has.Count.EqualTo(4), "Should have 4 save operations");
            Assert.That(
                result.Operations.Select(o => o.ParameterName).ToArray(),
                Is.EquivalentTo(
                    new[]
                    {
                        "MatchedPairingCharacters",
                        "UnmatchedPairingCharacters",
                        "MatchedPairingCharacters_NonText",
                        "UnmatchedPairingCharacters_NonText",
                    }
                ),
                "Parameter names must match gm-007 expected output"
            );
        });
    }

    #endregion

    #region Contract Tests - Regular Separated (TS-096)

    /// <summary>
    /// TS-096: Regular separated project maps verse valid items to MatchedPairingCharacters.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-096")]
    [Property("BehaviorId", "BHV-110")]
    [Property("ExtractionId", "EXT-003")]
    [Description("Regular separated: verse valid -> MatchedPairingCharacters")]
    public void SaveInventoryStatus_RegularSeparated_MapsVerseValidToMainParameter()
    {
        var snapshot = new InventoryStatusSnapshot
        {
            VerseValidItems = "( {",
            VerseInvalidItems = "",
            NonVerseValidItems = "",
            NonVerseInvalidItems = "",
        };

        var result = InventoryStatusService.DetermineSaveOperations(
            snapshot,
            isSba: false,
            isSeparated: true
        );

        var validOp = result.Operations.FirstOrDefault(o =>
            o.ParameterName == "MatchedPairingCharacters"
        );
        Assert.That(validOp, Is.Not.Null, "Must include MatchedPairingCharacters operation");
        Assert.That(
            validOp!.Value,
            Is.EqualTo("( {"),
            "MatchedPairingCharacters value must match verse valid items"
        );
    }

    /// <summary>
    /// TS-096: Regular separated project maps verse invalid items to UnmatchedPairingCharacters.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-096")]
    [Property("BehaviorId", "BHV-110")]
    [Property("ExtractionId", "EXT-003")]
    [Description("Regular separated: verse invalid -> UnmatchedPairingCharacters")]
    public void SaveInventoryStatus_RegularSeparated_MapsVerseInvalidToMainParameter()
    {
        var snapshot = new InventoryStatusSnapshot
        {
            VerseValidItems = "",
            VerseInvalidItems = ") }",
            NonVerseValidItems = "",
            NonVerseInvalidItems = "",
        };

        var result = InventoryStatusService.DetermineSaveOperations(
            snapshot,
            isSba: false,
            isSeparated: true
        );

        var invalidOp = result.Operations.FirstOrDefault(o =>
            o.ParameterName == "UnmatchedPairingCharacters"
        );
        Assert.That(invalidOp, Is.Not.Null, "Must include UnmatchedPairingCharacters operation");
        Assert.That(
            invalidOp!.Value,
            Is.EqualTo(") }"),
            "UnmatchedPairingCharacters value must match verse invalid items"
        );
    }

    /// <summary>
    /// TS-096: Regular separated project maps non-verse valid items to
    /// MatchedPairingCharacters_NonText.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-096")]
    [Property("BehaviorId", "BHV-110")]
    [Property("ExtractionId", "EXT-003")]
    [Description("Regular separated: non-verse valid -> MatchedPairingCharacters_NonText")]
    public void SaveInventoryStatus_RegularSeparated_MapsNonVerseValidToNonTextParameter()
    {
        var snapshot = new InventoryStatusSnapshot
        {
            VerseValidItems = "",
            VerseInvalidItems = "",
            NonVerseValidItems = "[ <",
            NonVerseInvalidItems = "",
        };

        var result = InventoryStatusService.DetermineSaveOperations(
            snapshot,
            isSba: false,
            isSeparated: true
        );

        var nvValidOp = result.Operations.FirstOrDefault(o =>
            o.ParameterName == "MatchedPairingCharacters_NonText"
        );
        Assert.That(
            nvValidOp,
            Is.Not.Null,
            "Must include MatchedPairingCharacters_NonText operation"
        );
        Assert.That(
            nvValidOp!.Value,
            Is.EqualTo("[ <"),
            "NonText valid value must match non-verse valid items"
        );
    }

    /// <summary>
    /// TS-096: Regular separated project maps non-verse invalid items to
    /// UnmatchedPairingCharacters_NonText.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-096")]
    [Property("BehaviorId", "BHV-110")]
    [Property("ExtractionId", "EXT-003")]
    [Description("Regular separated: non-verse invalid -> UnmatchedPairingCharacters_NonText")]
    public void SaveInventoryStatus_RegularSeparated_MapsNonVerseInvalidToNonTextParameter()
    {
        var snapshot = new InventoryStatusSnapshot
        {
            VerseValidItems = "",
            VerseInvalidItems = "",
            NonVerseValidItems = "",
            NonVerseInvalidItems = "] >",
        };

        var result = InventoryStatusService.DetermineSaveOperations(
            snapshot,
            isSba: false,
            isSeparated: true
        );

        var nvInvalidOp = result.Operations.FirstOrDefault(o =>
            o.ParameterName == "UnmatchedPairingCharacters_NonText"
        );
        Assert.That(
            nvInvalidOp,
            Is.Not.Null,
            "Must include UnmatchedPairingCharacters_NonText operation"
        );
        Assert.That(
            nvInvalidOp!.Value,
            Is.EqualTo("] >"),
            "NonText invalid value must match non-verse invalid items"
        );
    }

    /// <summary>
    /// TS-096: All 4 operations carry correct values from a fully populated snapshot.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-096")]
    [Property("BehaviorId", "BHV-110")]
    [Property("ExtractionId", "EXT-003")]
    [Description("Regular separated: all 4 operations carry correct values")]
    public void SaveInventoryStatus_RegularSeparated_AllValuesCorrect()
    {
        var snapshot = new InventoryStatusSnapshot
        {
            VerseValidItems = "( [",
            VerseInvalidItems = ") ]",
            NonVerseValidItems = "{ <",
            NonVerseInvalidItems = "} >",
        };

        var result = InventoryStatusService.DetermineSaveOperations(
            snapshot,
            isSba: false,
            isSeparated: true
        );

        var ops = result.Operations.ToDictionary(o => o.ParameterName, o => o.Value);
        Assert.Multiple(() =>
        {
            Assert.That(ops["MatchedPairingCharacters"], Is.EqualTo("( ["));
            Assert.That(ops["UnmatchedPairingCharacters"], Is.EqualTo(") ]"));
            Assert.That(ops["MatchedPairingCharacters_NonText"], Is.EqualTo("{ <"));
            Assert.That(ops["UnmatchedPairingCharacters_NonText"], Is.EqualTo("} >"));
        });
    }

    #endregion

    #region Contract Tests - Regular Unseparated (TS-034)

    /// <summary>
    /// TS-034: Regular unseparated project saves combined valid/invalid items (2 keys only).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-110")]
    [Property("ExtractionId", "EXT-003")]
    [Description("Regular unseparated: saves only main valid/invalid (2 settings keys)")]
    public void SaveInventoryStatus_RegularUnseparated_SavesTwoKeys()
    {
        var snapshot = new InventoryStatusSnapshot
        {
            VerseValidItems = "( [",
            VerseInvalidItems = ") ]",
        };

        var result = InventoryStatusService.DetermineSaveOperations(
            snapshot,
            isSba: false,
            isSeparated: false
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Operations, Has.Count.EqualTo(2), "Should have 2 save operations");
            Assert.That(
                result.Operations.Select(o => o.ParameterName).ToArray(),
                Is.EquivalentTo(
                    new[] { "MatchedPairingCharacters", "UnmatchedPairingCharacters" }
                ),
                "Only main parameters should be saved for unseparated"
            );
        });
    }

    /// <summary>
    /// TS-034: Regular unseparated maps combined valid to MatchedPairingCharacters.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-110")]
    [Property("ExtractionId", "EXT-003")]
    [Description("Regular unseparated: maps combined valid items to MatchedPairingCharacters")]
    public void SaveInventoryStatus_RegularUnseparated_MapsValidToMainParameter()
    {
        var snapshot = new InventoryStatusSnapshot
        {
            VerseValidItems = "( { [",
            VerseInvalidItems = "",
        };

        var result = InventoryStatusService.DetermineSaveOperations(
            snapshot,
            isSba: false,
            isSeparated: false
        );

        var validOp = result.Operations.First(o =>
            o.ParameterName == "MatchedPairingCharacters"
        );
        Assert.That(
            validOp.Value,
            Is.EqualTo("( { ["),
            "MatchedPairingCharacters must carry combined valid items"
        );
    }

    /// <summary>
    /// TS-034: Regular unseparated maps combined invalid to UnmatchedPairingCharacters.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-110")]
    [Property("ExtractionId", "EXT-003")]
    [Description("Regular unseparated: maps combined invalid to UnmatchedPairingCharacters")]
    public void SaveInventoryStatus_RegularUnseparated_MapsInvalidToMainParameter()
    {
        var snapshot = new InventoryStatusSnapshot
        {
            VerseValidItems = "",
            VerseInvalidItems = ") } ]",
        };

        var result = InventoryStatusService.DetermineSaveOperations(
            snapshot,
            isSba: false,
            isSeparated: false
        );

        var invalidOp = result.Operations.First(o =>
            o.ParameterName == "UnmatchedPairingCharacters"
        );
        Assert.That(
            invalidOp.Value,
            Is.EqualTo(") } ]"),
            "UnmatchedPairingCharacters must carry combined invalid items"
        );
    }

    /// <summary>
    /// TS-034: Regular unseparated does NOT include _NonText or _StudyBible keys.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-110")]
    [Property("ExtractionId", "EXT-003")]
    [Description("Regular unseparated: no _NonText or _StudyBible operations")]
    public void SaveInventoryStatus_RegularUnseparated_NoSuffixedKeys()
    {
        var snapshot = new InventoryStatusSnapshot
        {
            VerseValidItems = "(",
            VerseInvalidItems = ")",
        };

        var result = InventoryStatusService.DetermineSaveOperations(
            snapshot,
            isSba: false,
            isSeparated: false
        );

        Assert.Multiple(() =>
        {
            Assert.That(
                result.Operations.Select(o => o.ParameterName),
                Has.None.Contain("_NonText"),
                "Unseparated should not include _NonText keys"
            );
            Assert.That(
                result.Operations.Select(o => o.ParameterName),
                Has.None.Contain("_StudyBible"),
                "Unseparated should not include _StudyBible keys"
            );
        });
    }

    #endregion

    #region Contract Tests - SBA Project (TS-035, TS-097)

    /// <summary>
    /// TS-035: SBA project saves only _StudyBible suffixed valid/invalid items.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-110")]
    [Property("ExtractionId", "EXT-003")]
    [Description("SBA: saves only _StudyBible suffixed valid/invalid")]
    public void SaveInventoryStatus_SbaProject_SavesStudyBibleSuffix()
    {
        var snapshot = new InventoryStatusSnapshot
        {
            StudyBibleValidItems = "( [",
            StudyBibleInvalidItems = ") ]",
        };

        var result = InventoryStatusService.DetermineSaveOperations(
            snapshot,
            isSba: true,
            isSeparated: false
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Operations, Has.Count.EqualTo(2), "SBA should have 2 operations");
            Assert.That(
                result.Operations.Select(o => o.ParameterName).ToArray(),
                Is.EquivalentTo(
                    new[]
                    {
                        "MatchedPairingCharacters_StudyBible",
                        "UnmatchedPairingCharacters_StudyBible",
                    }
                ),
                "SBA should only save _StudyBible suffixed parameters"
            );
        });
    }

    /// <summary>
    /// TS-035: SBA valid items map to MatchedPairingCharacters_StudyBible.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-110")]
    [Property("ExtractionId", "EXT-003")]
    [Description("SBA: valid items -> MatchedPairingCharacters_StudyBible")]
    public void SaveInventoryStatus_SbaProject_MapsValidToStudyBibleParameter()
    {
        var snapshot = new InventoryStatusSnapshot
        {
            StudyBibleValidItems = "( { [",
            StudyBibleInvalidItems = "",
        };

        var result = InventoryStatusService.DetermineSaveOperations(
            snapshot,
            isSba: true,
            isSeparated: false
        );

        var validOp = result.Operations.First(o =>
            o.ParameterName == "MatchedPairingCharacters_StudyBible"
        );
        Assert.That(
            validOp.Value,
            Is.EqualTo("( { ["),
            "StudyBible valid value must match study Bible valid items"
        );
    }

    /// <summary>
    /// TS-035: SBA invalid items map to UnmatchedPairingCharacters_StudyBible.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-110")]
    [Property("ExtractionId", "EXT-003")]
    [Description("SBA: invalid items -> UnmatchedPairingCharacters_StudyBible")]
    public void SaveInventoryStatus_SbaProject_MapsInvalidToStudyBibleParameter()
    {
        var snapshot = new InventoryStatusSnapshot
        {
            StudyBibleValidItems = "",
            StudyBibleInvalidItems = ") } ]",
        };

        var result = InventoryStatusService.DetermineSaveOperations(
            snapshot,
            isSba: true,
            isSeparated: false
        );

        var invalidOp = result.Operations.First(o =>
            o.ParameterName == "UnmatchedPairingCharacters_StudyBible"
        );
        Assert.That(
            invalidOp.Value,
            Is.EqualTo(") } ]"),
            "StudyBible invalid value must match study Bible invalid items"
        );
    }

    /// <summary>
    /// TS-097: SBA project does NOT save main or _NonText keys.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-097")]
    [Property("BehaviorId", "BHV-110")]
    [Property("ExtractionId", "EXT-003")]
    [Description("SBA: does NOT include main or _NonText operations")]
    public void SaveInventoryStatus_SbaProject_NoMainOrNonTextKeys()
    {
        var snapshot = new InventoryStatusSnapshot
        {
            StudyBibleValidItems = "(",
            StudyBibleInvalidItems = ")",
        };

        var result = InventoryStatusService.DetermineSaveOperations(
            snapshot,
            isSba: true,
            isSeparated: false
        );

        var paramNames = result.Operations.Select(o => o.ParameterName).ToList();
        Assert.Multiple(() =>
        {
            Assert.That(
                paramNames,
                Has.None.EqualTo("MatchedPairingCharacters"),
                "SBA should not save unsuffixed MatchedPairingCharacters"
            );
            Assert.That(
                paramNames,
                Has.None.EqualTo("UnmatchedPairingCharacters"),
                "SBA should not save unsuffixed UnmatchedPairingCharacters"
            );
            Assert.That(
                paramNames,
                Has.None.Contain("_NonText"),
                "SBA should not include _NonText keys"
            );
        });
    }

    /// <summary>
    /// TS-035/TS-097: SBA with separation enabled still only saves _StudyBible suffix.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-110")]
    [Property("ExtractionId", "EXT-003")]
    [Description("SBA with separation: still only saves _StudyBible suffix")]
    public void SaveInventoryStatus_SbaSeparated_OnlySavesStudyBibleSuffix()
    {
        var snapshot = new InventoryStatusSnapshot
        {
            StudyBibleValidItems = "( {",
            StudyBibleInvalidItems = ") }",
        };

        var result = InventoryStatusService.DetermineSaveOperations(
            snapshot,
            isSba: true,
            isSeparated: true
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Operations, Has.Count.EqualTo(2), "SBA separated: 2 operations");
            Assert.That(
                result.Operations.Select(o => o.ParameterName),
                Has.All.Contain("_StudyBible"),
                "SBA separated: all operations should be _StudyBible"
            );
        });
    }

    #endregion

    #region Permission Check Tests (TS-116, VAL-004)

    /// <summary>
    /// TS-116: Save silently skips when user lacks permissions.
    /// VAL-004: Only administrators or team members with editable projects can save.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-116")]
    [Property("BehaviorId", "BHV-110")]
    [Property("ValidationRule", "VAL-004")]
    [Description("Save silently skips when user lacks permissions (VAL-004)")]
    public void SaveInventoryStatusIfPermitted_NoPermissions_ReturnsFalse()
    {
        var result = InventoryStatusService.SaveInventoryStatusIfPermitted(
            canMakeChanges: false,
            saveAction: () =>
            {
                Assert.Fail("Save action should not be invoked when canMakeChanges is false");
            }
        );

        Assert.That(result, Is.False, "Should return false when permission denied");
    }

    /// <summary>
    /// TS-116: Save proceeds when user has permissions (VAL-004 satisfied).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-116")]
    [Property("BehaviorId", "BHV-110")]
    [Property("ValidationRule", "VAL-004")]
    [Description("Save proceeds when user has permissions (VAL-004 satisfied)")]
    public void SaveInventoryStatusIfPermitted_WithPermissions_InvokesSaveAction()
    {
        var saveWasCalled = false;
        var result = InventoryStatusService.SaveInventoryStatusIfPermitted(
            canMakeChanges: true,
            saveAction: () =>
            {
                saveWasCalled = true;
            }
        );

        Assert.Multiple(() =>
        {
            Assert.That(result, Is.True, "Should return true when save succeeds");
            Assert.That(saveWasCalled, Is.True, "Save action must be invoked when permitted");
        });
    }

    /// <summary>
    /// TS-116: No error thrown when save silently skips (no exception, just returns false).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-116")]
    [Property("BehaviorId", "BHV-110")]
    [Property("ValidationRule", "VAL-004")]
    [Description("No exception thrown when save silently skips")]
    public void SaveInventoryStatusIfPermitted_NoPermissions_NoException()
    {
        Assert.DoesNotThrow(
            () =>
                InventoryStatusService.SaveInventoryStatusIfPermitted(
                    canMakeChanges: false,
                    saveAction: () => { }
                ),
            "Save should silently skip without throwing (VAL-004)"
        );
    }

    #endregion

    #region Golden Master Tests (gm-007)

    /// <summary>
    /// gm-007: Regular separated project saves to exactly 4 parameter names matching
    /// the golden master expected output.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-004")]
    [Property("GoldenMasterId", "gm-007")]
    [Property("ScenarioId", "TS-096")]
    [Property("BehaviorId", "BHV-110")]
    [Description("Golden master gm-007: regular separated saves to 4 settings keys")]
    public void SaveInventoryStatus_RegularSeparated_MatchesGoldenMasterParameterNames()
    {
        var snapshot = new InventoryStatusSnapshot
        {
            VerseValidItems = "( [",
            VerseInvalidItems = ") ]",
            NonVerseValidItems = "{ <",
            NonVerseInvalidItems = "} >",
        };

        var result = InventoryStatusService.DetermineSaveOperations(
            snapshot,
            isSba: false,
            isSeparated: true
        );

        // gm-007 expected: ["MatchedPairingCharacters", "UnmatchedPairingCharacters",
        //   "MatchedPairingCharacters_NonText", "UnmatchedPairingCharacters_NonText"]
        var expectedKeys = new[]
        {
            "MatchedPairingCharacters",
            "UnmatchedPairingCharacters",
            "MatchedPairingCharacters_NonText",
            "UnmatchedPairingCharacters_NonText",
        };

        Assert.That(
            result.Operations.Select(o => o.ParameterName).ToArray(),
            Is.EquivalentTo(expectedKeys),
            "Saved parameter names must match gm-007 expected output exactly"
        );
    }

    /// <summary>
    /// gm-007: verseItemsSaved=true and nonVerseItemsSaved=true in golden master.
    /// Both verse and non-verse items must appear in the save operations.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-004")]
    [Property("GoldenMasterId", "gm-007")]
    [Property("ScenarioId", "TS-096")]
    [Property("BehaviorId", "BHV-110")]
    [Description("Golden master gm-007: both verse and non-verse items saved")]
    public void SaveInventoryStatus_RegularSeparated_IncludesVerseAndNonVerseOperations()
    {
        var snapshot = new InventoryStatusSnapshot
        {
            VerseValidItems = "(",
            VerseInvalidItems = ")",
            NonVerseValidItems = "[",
            NonVerseInvalidItems = "]",
        };

        var result = InventoryStatusService.DetermineSaveOperations(
            snapshot,
            isSba: false,
            isSeparated: true
        );

        var paramNames = result.Operations.Select(o => o.ParameterName).ToList();
        Assert.Multiple(() =>
        {
            // Verse items (main parameters)
            Assert.That(
                paramNames,
                Has.Some.EqualTo("MatchedPairingCharacters"),
                "Must include verse valid (verseItemsSaved=true)"
            );
            Assert.That(
                paramNames,
                Has.Some.EqualTo("UnmatchedPairingCharacters"),
                "Must include verse invalid (verseItemsSaved=true)"
            );
            // Non-verse items (_NonText parameters)
            Assert.That(
                paramNames,
                Has.Some.EqualTo("MatchedPairingCharacters_NonText"),
                "Must include non-verse valid (nonVerseItemsSaved=true)"
            );
            Assert.That(
                paramNames,
                Has.Some.EqualTo("UnmatchedPairingCharacters_NonText"),
                "Must include non-verse invalid (nonVerseItemsSaved=true)"
            );
        });
    }

    #endregion

    #region Extraction Tests (EXT-003) - Branching Logic

    /// <summary>
    /// EXT-003: The 3 branching paths produce distinct settings key sets.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ExtractionId", "EXT-003")]
    [Property("BehaviorId", "BHV-110")]
    [Property("ScenarioId", "TS-096")]
    [Description("EXT-003: Three branching paths produce different settings key sets")]
    public void DetermineSaveOperations_ThreePaths_ProduceDifferentKeySets()
    {
        // Path 1: Regular unseparated
        var result1 = InventoryStatusService.DetermineSaveOperations(
            new InventoryStatusSnapshot { VerseValidItems = "(", VerseInvalidItems = ")" },
            isSba: false,
            isSeparated: false
        );

        // Path 2: Regular separated
        var result2 = InventoryStatusService.DetermineSaveOperations(
            new InventoryStatusSnapshot
            {
                VerseValidItems = "(",
                VerseInvalidItems = ")",
                NonVerseValidItems = "[",
                NonVerseInvalidItems = "]",
            },
            isSba: false,
            isSeparated: true
        );

        // Path 3: SBA
        var result3 = InventoryStatusService.DetermineSaveOperations(
            new InventoryStatusSnapshot
            {
                StudyBibleValidItems = "(",
                StudyBibleInvalidItems = ")",
            },
            isSba: true,
            isSeparated: false
        );

        Assert.Multiple(() =>
        {
            Assert.That(result1.Operations, Has.Count.EqualTo(2), "Unseparated: 2 operations");
            Assert.That(result2.Operations, Has.Count.EqualTo(4), "Separated: 4 operations");
            Assert.That(result3.Operations, Has.Count.EqualTo(2), "SBA: 2 operations");

            // Verify key sets are distinct
            var keys1 = result1.Operations.Select(o => o.ParameterName).ToHashSet();
            var keys2 = result2.Operations.Select(o => o.ParameterName).ToHashSet();
            var keys3 = result3.Operations.Select(o => o.ParameterName).ToHashSet();

            Assert.That(
                keys1.SetEquals(keys3),
                Is.False,
                "Unseparated and SBA should have different key sets"
            );
            Assert.That(
                keys2.IsSupersetOf(keys1),
                Is.True,
                "Separated keys should be superset of unseparated keys"
            );
        });
    }

    /// <summary>
    /// EXT-003: Save with empty valid/invalid items produces operations with empty values.
    /// Clearing all statuses is valid behavior.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ExtractionId", "EXT-003")]
    [Property("BehaviorId", "BHV-110")]
    [Property("ScenarioId", "TS-034")]
    [Description("Empty items produce operations with empty string values")]
    public void DetermineSaveOperations_EmptyItems_ProducesEmptyValues()
    {
        var result = InventoryStatusService.DetermineSaveOperations(
            new InventoryStatusSnapshot
            {
                VerseValidItems = "",
                VerseInvalidItems = "",
            },
            isSba: false,
            isSeparated: false
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Operations, Has.Count.EqualTo(2), "Still produces 2 operations");
            Assert.That(
                result.Operations.All(o => o.Value == ""),
                Is.True,
                "All values should be empty strings"
            );
        });
    }

    /// <summary>
    /// EXT-003: Multiple space-separated items are passed through correctly.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ExtractionId", "EXT-003")]
    [Property("BehaviorId", "BHV-110")]
    [Property("ScenarioId", "TS-034")]
    [Description("Multiple items preserved as space-separated strings")]
    public void DetermineSaveOperations_MultipleItems_PreservedInValue()
    {
        var result = InventoryStatusService.DetermineSaveOperations(
            new InventoryStatusSnapshot
            {
                VerseValidItems = "( [ {",
                VerseInvalidItems = ") ] }",
            },
            isSba: false,
            isSeparated: false
        );

        var ops = result.Operations.ToDictionary(o => o.ParameterName, o => o.Value);
        Assert.Multiple(() =>
        {
            Assert.That(ops["MatchedPairingCharacters"], Is.EqualTo("( [ {"));
            Assert.That(ops["UnmatchedPairingCharacters"], Is.EqualTo(") ] }"));
        });
    }

    #endregion

    #region Change Notification Tests (BHV-110)

    /// <summary>
    /// BHV-110: After saving, a change notification must be sent.
    /// PT10 equivalent of PT9 WriteLock on "InventorySettings".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("BehaviorId", "BHV-110")]
    [Property("ScenarioId", "TS-034")]
    [Description("Save triggers change notification (BHV-110)")]
    public void SaveInventoryStatusIfPermitted_AfterSave_ReturnsTrue()
    {
        // When save succeeds, return true signals that change notification should be sent.
        // The PAPI integration layer is responsible for calling SendDataUpdateEvent
        // when the return value is true.
        var result = InventoryStatusService.SaveInventoryStatusIfPermitted(
            canMakeChanges: true,
            saveAction: () => { }
        );

        Assert.That(
            result,
            Is.True,
            "True return value signals change notification should be sent (BHV-110)"
        );
    }

    /// <summary>
    /// BHV-110: No change notification when permission denied (return false).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("BehaviorId", "BHV-110")]
    [Property("ScenarioId", "TS-116")]
    [Property("ValidationRule", "VAL-004")]
    [Description("No change notification when save is silently skipped")]
    public void SaveInventoryStatusIfPermitted_NoPermissions_ReturnsFalse_NoNotification()
    {
        // When save is skipped, return false signals NO change notification.
        var result = InventoryStatusService.SaveInventoryStatusIfPermitted(
            canMakeChanges: false,
            saveAction: () => { }
        );

        Assert.That(
            result,
            Is.False,
            "False return value signals no change notification (BHV-110 + VAL-004)"
        );
    }

    #endregion

    #region Return Value Tests

    /// <summary>
    /// M-004: SaveInventoryStatusAsync returns true on successful save.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-034")]
    [Property("BehaviorId", "BHV-110")]
    [Description("SaveInventoryStatusIfPermitted returns true on successful save")]
    public void SaveInventoryStatusIfPermitted_Success_ReturnsTrue()
    {
        var result = InventoryStatusService.SaveInventoryStatusIfPermitted(
            canMakeChanges: true,
            saveAction: () => { }
        );

        Assert.That(result, Is.True);
    }

    /// <summary>
    /// M-004: SaveInventoryStatusAsync returns false when permission denied.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-004")]
    [Property("ScenarioId", "TS-116")]
    [Property("BehaviorId", "BHV-110")]
    [Property("ValidationRule", "VAL-004")]
    [Description("SaveInventoryStatusIfPermitted returns false when permission denied")]
    public void SaveInventoryStatusIfPermitted_PermissionDenied_ReturnsFalse()
    {
        var result = InventoryStatusService.SaveInventoryStatusIfPermitted(
            canMakeChanges: false,
            saveAction: () => Assert.Fail("Should not reach save")
        );

        Assert.That(result, Is.False);
    }

    #endregion

    // ============================================================================
    // CAP-003: SetSelectedStatus
    // ============================================================================
    //
    // Tests for EXT-002 (SetSelectedStatus with always-valid protection).
    // Source: PT9/Paratext/Checking/InventoryForm.cs:784-859
    // Contract: Section 4.3 M-003 SetSelectedStatus
    // Behaviors: BHV-114 (TextInventory Status Management), BHV-305 (Keyboard Shortcuts)
    // Invariants: INV-007 (Mutual Exclusion), INV-016 (Status Persistence)
    // Validation: VAL-004 (Save Permission), VAL-007 (Always-Valid Protection)
    //
    // The PT9 SetSelectedStatus logic:
    //   1. Maps category string to the correct TextInventory
    //   2. For each selected item, checks IsAlwaysValid protection
    //   3. If not always-valid (or desired status is "good"), calls SetStatus
    //   4. Returns StatusChangeResult with skipped count and warning
    //
    // Test design: Tests call InventoryStatusService static methods with
    // testable inputs (Func<string, bool> isAlwaysValid predicate) to separate
    // the business logic from ParatextData infrastructure. The method
    // ComputeStatusChanges returns a StatusChangeResult indicating which items
    // were changed and which were skipped. A separate ResolveInventoryCategory
    // method handles the category-to-InventoryTextType mapping.

    #region CAP-003 Acceptance Test (gm-010)

    /// <summary>
    /// Acceptance test: Verifies that SetSelectedStatus correctly protects always-valid
    /// items. When an always-valid item is set to invalid, it is skipped with a warning.
    /// The result reports allChanged=false and a non-empty warningMessage.
    ///
    /// When this test passes, CAP-003 is complete.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-003")]
    [Property("GoldenMasterId", "gm-010")]
    [Property("BehaviorId", "BHV-114")]
    [Property("ScenarioId", "TS-094")]
    [Property("ValidationRule", "VAL-007")]
    [Description(
        "Acceptance test: SetSelectedStatus skips always-valid item with warning (gm-010)"
    )]
    public void SetSelectedStatus_AlwaysValidItem_SkippedWithWarning()
    {
        // Arrange: "(", is always-valid; try to set to Invalid
        var selectedItems = new[] { "(" };
        Func<string, bool> isAlwaysValid = item => item == "(";

        // Act
        var result = InventoryStatusService.ComputeStatusChanges(
            ItemStatus.Invalid,
            selectedItems,
            isAlwaysValid
        );

        // Assert: matches gm-010 expected output
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True, "Operation itself succeeds");
            Assert.That(
                result.AllChanged,
                Is.False,
                "Not all items changed (gm-010: allChanged=false)"
            );
            Assert.That(result.SkippedCount, Is.EqualTo(1), "One item was skipped");
            Assert.That(
                result.WarningMessage,
                Is.Not.Null.And.Not.Empty,
                "Warning message must be set (gm-010: warningShown=true)"
            );
            Assert.That(result.StatusChanged, Is.False, "No items were actually changed");
        });
    }

    #endregion

    #region CAP-003 Contract Tests - Happy Path (TS-038, TS-039, TS-040)

    /// <summary>
    /// TS-038: Setting status to Valid adds item to valid set.
    /// ComputeStatusChanges returns statusChanged=true, allChanged=true for non-protected item.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-114")]
    [Property("InvariantId", "INV-007")]
    [Description("Set status to Valid: item changed, statusChanged=true (TS-038)")]
    public void ComputeStatusChanges_SetToValid_ReturnsStatusChanged()
    {
        var selectedItems = new[] { "(" };
        Func<string, bool> isAlwaysValid = _ => false;

        var result = InventoryStatusService.ComputeStatusChanges(
            ItemStatus.Valid,
            selectedItems,
            isAlwaysValid
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True);
            Assert.That(result.StatusChanged, Is.True, "Status must be changed");
            Assert.That(result.AllChanged, Is.True, "All items must be changed");
            Assert.That(result.SkippedCount, Is.EqualTo(0), "No items skipped");
            Assert.That(result.WarningMessage, Is.Null, "No warning when all changed");
        });
    }

    /// <summary>
    /// TS-039: Setting status to Invalid adds item to invalid set.
    /// ComputeStatusChanges returns statusChanged=true for non-protected item.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-039")]
    [Property("BehaviorId", "BHV-114")]
    [Property("InvariantId", "INV-007")]
    [Description("Set status to Invalid: item changed, statusChanged=true (TS-039)")]
    public void ComputeStatusChanges_SetToInvalid_ReturnsStatusChanged()
    {
        var selectedItems = new[] { "(" };
        Func<string, bool> isAlwaysValid = _ => false;

        var result = InventoryStatusService.ComputeStatusChanges(
            ItemStatus.Invalid,
            selectedItems,
            isAlwaysValid
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True);
            Assert.That(result.StatusChanged, Is.True, "Status must be changed");
            Assert.That(result.AllChanged, Is.True, "All items must be changed");
            Assert.That(result.SkippedCount, Is.EqualTo(0), "No items skipped");
        });
    }

    /// <summary>
    /// TS-040: Setting status to Unknown removes item from both valid and invalid sets.
    /// ComputeStatusChanges returns statusChanged=true for non-protected item.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-114")]
    [Property("InvariantId", "INV-007")]
    [Description("Set status to Unknown: item changed, statusChanged=true (TS-040)")]
    public void ComputeStatusChanges_SetToUnknown_ReturnsStatusChanged()
    {
        var selectedItems = new[] { "(" };
        Func<string, bool> isAlwaysValid = _ => false;

        var result = InventoryStatusService.ComputeStatusChanges(
            ItemStatus.Unknown,
            selectedItems,
            isAlwaysValid
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True);
            Assert.That(result.StatusChanged, Is.True, "Status must be changed");
            Assert.That(result.AllChanged, Is.True, "All items must be changed");
            Assert.That(result.SkippedCount, Is.EqualTo(0), "No items skipped");
        });
    }

    /// <summary>
    /// TS-038: Multiple items all set to valid -- all changed.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-114")]
    [Description("Multiple items set to valid: all changed")]
    public void ComputeStatusChanges_MultipleItemsToValid_AllChanged()
    {
        var selectedItems = new[] { "(", ")", "[", "]" };
        Func<string, bool> isAlwaysValid = _ => false;

        var result = InventoryStatusService.ComputeStatusChanges(
            ItemStatus.Valid,
            selectedItems,
            isAlwaysValid
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.StatusChanged, Is.True);
            Assert.That(result.AllChanged, Is.True);
            Assert.That(result.SkippedCount, Is.EqualTo(0));
        });
    }

    #endregion

    #region CAP-003 Always-Valid Protection Tests (TS-094, VAL-007)

    /// <summary>
    /// TS-094: Always-valid item cannot be set to Invalid. Item is skipped.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-114")]
    [Property("ExtractionId", "EXT-002")]
    [Property("ValidationRule", "VAL-007")]
    [Description("Always-valid item skipped when set to Invalid (TS-094, VAL-007)")]
    public void ComputeStatusChanges_AlwaysValidToInvalid_Skipped()
    {
        var selectedItems = new[] { "(" };
        Func<string, bool> isAlwaysValid = item => item == "(";

        var result = InventoryStatusService.ComputeStatusChanges(
            ItemStatus.Invalid,
            selectedItems,
            isAlwaysValid
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True, "Operation succeeds even with skipped items");
            Assert.That(result.StatusChanged, Is.False, "No status changes made");
            Assert.That(result.AllChanged, Is.False, "Not all items changed");
            Assert.That(result.SkippedCount, Is.EqualTo(1), "One item skipped");
            Assert.That(
                result.WarningMessage,
                Is.Not.Null.And.Not.Empty,
                "Warning message required for skipped items (VAL-007)"
            );
        });
    }

    /// <summary>
    /// TS-094/VAL-007: Always-valid item cannot be set to Unknown. Item is skipped.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-114")]
    [Property("ExtractionId", "EXT-002")]
    [Property("ValidationRule", "VAL-007")]
    [Description("Always-valid item skipped when set to Unknown (VAL-007)")]
    public void ComputeStatusChanges_AlwaysValidToUnknown_Skipped()
    {
        var selectedItems = new[] { "(" };
        Func<string, bool> isAlwaysValid = item => item == "(";

        var result = InventoryStatusService.ComputeStatusChanges(
            ItemStatus.Unknown,
            selectedItems,
            isAlwaysValid
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.StatusChanged, Is.False, "No status changes made");
            Assert.That(result.AllChanged, Is.False, "Not all items changed");
            Assert.That(result.SkippedCount, Is.EqualTo(1), "One item skipped");
            Assert.That(
                result.WarningMessage,
                Is.Not.Null.And.Not.Empty,
                "Warning message required (VAL-007)"
            );
        });
    }

    /// <summary>
    /// VAL-007: Always-valid item CAN be set to Valid. This is explicitly allowed by PT9.
    /// PT9 source: (!updatedInventory.IsAlwaysValid(selectedText) || desiredStatus == good)
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-114")]
    [Property("ExtractionId", "EXT-002")]
    [Property("ValidationRule", "VAL-007")]
    [Description("Always-valid item CAN be set to Valid (VAL-007 exception)")]
    public void ComputeStatusChanges_AlwaysValidToValid_NotSkipped()
    {
        var selectedItems = new[] { "(" };
        Func<string, bool> isAlwaysValid = item => item == "(";

        var result = InventoryStatusService.ComputeStatusChanges(
            ItemStatus.Valid,
            selectedItems,
            isAlwaysValid
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.StatusChanged, Is.True, "Status change made");
            Assert.That(result.AllChanged, Is.True, "All items changed (valid is allowed)");
            Assert.That(result.SkippedCount, Is.EqualTo(0), "No items skipped");
            Assert.That(result.WarningMessage, Is.Null, "No warning for valid status");
        });
    }

    /// <summary>
    /// VAL-007: Mixed selection: some always-valid, some not. Partial change.
    /// PT9 behavior: iterates all items; skips always-valid for non-good; changes the rest.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-114")]
    [Property("ExtractionId", "EXT-002")]
    [Property("ValidationRule", "VAL-007")]
    [Description("Mixed always-valid and regular items: partial change with warning")]
    public void ComputeStatusChanges_MixedAlwaysValidAndRegular_PartialChange()
    {
        // "(" is always-valid, ")" is not
        var selectedItems = new[] { "(", ")" };
        Func<string, bool> isAlwaysValid = item => item == "(";

        var result = InventoryStatusService.ComputeStatusChanges(
            ItemStatus.Invalid,
            selectedItems,
            isAlwaysValid
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True);
            Assert.That(
                result.StatusChanged,
                Is.True,
                "At least one item changed (the non-protected one)"
            );
            Assert.That(result.AllChanged, Is.False, "Not all items changed (one was protected)");
            Assert.That(result.SkippedCount, Is.EqualTo(1), "One item skipped");
            Assert.That(
                result.WarningMessage,
                Is.Not.Null.And.Not.Empty,
                "Warning message for the skipped item"
            );
        });
    }

    /// <summary>
    /// VAL-007: Multiple always-valid items skipped. SkippedCount reflects all skips.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-114")]
    [Property("ExtractionId", "EXT-002")]
    [Property("ValidationRule", "VAL-007")]
    [Description("Multiple always-valid items: skippedCount reflects total skipped")]
    public void ComputeStatusChanges_MultipleAlwaysValid_CountsAllSkipped()
    {
        var selectedItems = new[] { "(", "[", "{" };
        Func<string, bool> isAlwaysValid = _ => true; // all are always-valid

        var result = InventoryStatusService.ComputeStatusChanges(
            ItemStatus.Invalid,
            selectedItems,
            isAlwaysValid
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.StatusChanged, Is.False, "No status changes made");
            Assert.That(result.AllChanged, Is.False);
            Assert.That(result.SkippedCount, Is.EqualTo(3), "All 3 items skipped");
            Assert.That(result.WarningMessage, Is.Not.Null.And.Not.Empty);
        });
    }

    /// <summary>
    /// VAL-007: When desiredStatus is Valid, always-valid protection does NOT apply.
    /// All always-valid items can be set to valid. No warning, no skips.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-114")]
    [Property("ExtractionId", "EXT-002")]
    [Property("ValidationRule", "VAL-007")]
    [Description("All always-valid items set to Valid: no skips (VAL-007 exception)")]
    public void ComputeStatusChanges_AllAlwaysValidToValid_NoSkips()
    {
        var selectedItems = new[] { "(", "[", "{" };
        Func<string, bool> isAlwaysValid = _ => true;

        var result = InventoryStatusService.ComputeStatusChanges(
            ItemStatus.Valid,
            selectedItems,
            isAlwaysValid
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.StatusChanged, Is.True, "All items changed");
            Assert.That(result.AllChanged, Is.True, "All items changed");
            Assert.That(result.SkippedCount, Is.EqualTo(0), "No items skipped");
            Assert.That(result.WarningMessage, Is.Null, "No warning");
        });
    }

    #endregion

    #region CAP-003 Category Mapping Tests (TS-095)

    /// <summary>
    /// TS-095: "nonversetext" category maps to NonVerseText inventory.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-095")]
    [Property("BehaviorId", "BHV-114")]
    [Property("ExtractionId", "EXT-002")]
    [Description("Category 'nonversetext' resolves to NonVerseText inventory (TS-095)")]
    public void ResolveInventoryCategory_NonVerseText_ReturnsNonVerseText()
    {
        var result = InventoryStatusService.ResolveInventoryCategory(
            "nonversetext",
            supportsSeparateInventories: true
        );

        Assert.That(
            result,
            Is.EqualTo(InventoryTextType.NonVerseText),
            "Category 'nonversetext' must map to NonVerseText"
        );
    }

    /// <summary>
    /// TS-095: "studycontenttext" category maps to StudyBibleContent inventory.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-095")]
    [Property("BehaviorId", "BHV-114")]
    [Property("ExtractionId", "EXT-002")]
    [Description("Category 'studycontenttext' resolves to StudyBibleContent inventory")]
    public void ResolveInventoryCategory_StudyContentText_ReturnsStudyBibleContent()
    {
        var result = InventoryStatusService.ResolveInventoryCategory(
            "studycontenttext",
            supportsSeparateInventories: true
        );

        Assert.That(
            result,
            Is.EqualTo(InventoryTextType.StudyBibleContent),
            "Category 'studycontenttext' must map to StudyBibleContent"
        );
    }

    /// <summary>
    /// TS-095: "versetext" (default) maps to VerseText when separation supported.
    /// PT9 source: default case -> supportsSeparateInventories ? verseTextInventory : combinedTextInventory
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-095")]
    [Property("BehaviorId", "BHV-114")]
    [Property("ExtractionId", "EXT-002")]
    [Description("Category 'versetext' with separation -> VerseText")]
    public void ResolveInventoryCategory_VerseTextWithSeparation_ReturnsVerseText()
    {
        var result = InventoryStatusService.ResolveInventoryCategory(
            "versetext",
            supportsSeparateInventories: true
        );

        Assert.That(
            result,
            Is.EqualTo(InventoryTextType.VerseText),
            "Category 'versetext' with separation must map to VerseText"
        );
    }

    /// <summary>
    /// TS-095: Default category without separation maps to AllText (combined inventory).
    /// PT9 source: default case -> !supportsSeparateInventories -> combinedTextInventory
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-095")]
    [Property("BehaviorId", "BHV-114")]
    [Property("ExtractionId", "EXT-002")]
    [Description("Default category without separation -> AllText (combined)")]
    public void ResolveInventoryCategory_DefaultNoSeparation_ReturnsAllText()
    {
        var result = InventoryStatusService.ResolveInventoryCategory(
            "versetext",
            supportsSeparateInventories: false
        );

        Assert.That(
            result,
            Is.EqualTo(InventoryTextType.AllText),
            "Default category without separation must map to AllText (combined inventory)"
        );
    }

    /// <summary>
    /// TS-095: Any unrecognized category string falls through to default (verse/combined).
    /// PT9 source: switch default case handles all non-matching strings.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-095")]
    [Property("BehaviorId", "BHV-114")]
    [Property("ExtractionId", "EXT-002")]
    [Description("Unknown category falls through to default (verse/combined)")]
    public void ResolveInventoryCategory_UnknownCategory_FallsToDefault()
    {
        var result = InventoryStatusService.ResolveInventoryCategory(
            "somethingelse",
            supportsSeparateInventories: true
        );

        Assert.That(
            result,
            Is.EqualTo(InventoryTextType.VerseText),
            "Unknown category should fall through to default (verse text when separation supported)"
        );
    }

    #endregion

    #region CAP-003 Invariant Tests (INV-007)

    /// <summary>
    /// INV-007: Mutual exclusion -- setting to Valid means only Valid.
    /// The ComputeStatusChanges method should indicate that the item's status was changed.
    /// The actual mutual exclusion (removing from invalid set) is enforced by
    /// TextInventory.SetStatus in ParatextData.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-003")]
    [Property("InvariantId", "INV-007")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-114")]
    [Description("INV-007: Setting valid returns changed=true (mutual exclusion enforced)")]
    public void ComputeStatusChanges_ValidStatus_ReturnsChanged()
    {
        var result = InventoryStatusService.ComputeStatusChanges(
            ItemStatus.Valid,
            new[] { "(" },
            _ => false
        );

        Assert.That(
            result.StatusChanged,
            Is.True,
            "INV-007: Status must be changed to enforce mutual exclusion"
        );
    }

    /// <summary>
    /// INV-007: Mutual exclusion -- setting to Invalid means only Invalid.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-003")]
    [Property("InvariantId", "INV-007")]
    [Property("ScenarioId", "TS-039")]
    [Property("BehaviorId", "BHV-114")]
    [Description("INV-007: Setting invalid returns changed=true (mutual exclusion enforced)")]
    public void ComputeStatusChanges_InvalidStatus_ReturnsChanged()
    {
        var result = InventoryStatusService.ComputeStatusChanges(
            ItemStatus.Invalid,
            new[] { "(" },
            _ => false
        );

        Assert.That(
            result.StatusChanged,
            Is.True,
            "INV-007: Status must be changed to enforce mutual exclusion"
        );
    }

    /// <summary>
    /// INV-007: Mutual exclusion -- setting to Unknown removes from both sets.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-003")]
    [Property("InvariantId", "INV-007")]
    [Property("ScenarioId", "TS-040")]
    [Property("BehaviorId", "BHV-114")]
    [Description("INV-007: Setting unknown returns changed=true (removes from both sets)")]
    public void ComputeStatusChanges_UnknownStatus_ReturnsChanged()
    {
        var result = InventoryStatusService.ComputeStatusChanges(
            ItemStatus.Unknown,
            new[] { "(" },
            _ => false
        );

        Assert.That(
            result.StatusChanged,
            Is.True,
            "INV-007: Status must be changed (removes from both valid and invalid sets)"
        );
    }

    /// <summary>
    /// INV-007: Each of the three statuses produces a successful result (mutual exclusion).
    /// </summary>
    [TestCase(ItemStatus.Valid)]
    [TestCase(ItemStatus.Invalid)]
    [TestCase(ItemStatus.Unknown)]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-003")]
    [Property("InvariantId", "INV-007")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-114")]
    [Description("INV-007: All three status values produce successful result")]
    public void ComputeStatusChanges_AllStatusValues_SuccessTrue(ItemStatus status)
    {
        var result = InventoryStatusService.ComputeStatusChanges(
            status,
            new[] { "(" },
            _ => false
        );

        Assert.That(result.Success, Is.True, $"Status {status} should produce successful result");
    }

    #endregion

    #region CAP-003 Edge Case - Status Persistence (TS-041, INV-016)

    /// <summary>
    /// TS-041/INV-016: Status persists after item removed from text.
    /// The ComputeStatusChanges method operates on selected items regardless of whether
    /// those items currently exist in the inventory. Status dictionaries are independent
    /// of inventory entries. Setting status on an item that was removed and re-added
    /// still works correctly.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-041")]
    [Property("BehaviorId", "BHV-114")]
    [Property("InvariantId", "INV-016")]
    [Description("TS-041/INV-016: Status change works for items not currently in inventory")]
    public void ComputeStatusChanges_ItemNotInInventory_StillChangesStatus()
    {
        // An item that was previously marked valid, removed from text, then re-added.
        // ComputeStatusChanges does not check if item is in inventory -- it just processes
        // the requested status change. INV-016 says status is independent of inventory entries.
        var selectedItems = new[] { "(" };
        Func<string, bool> isAlwaysValid = _ => false;

        var result = InventoryStatusService.ComputeStatusChanges(
            ItemStatus.Valid,
            selectedItems,
            isAlwaysValid
        );

        Assert.Multiple(() =>
        {
            Assert.That(
                result.StatusChanged,
                Is.True,
                "INV-016: Status change works regardless of inventory membership"
            );
            Assert.That(result.AllChanged, Is.True);
            Assert.That(result.SkippedCount, Is.EqualTo(0));
        });
    }

    #endregion

    #region CAP-003 Error Condition Tests (M-003)

    /// <summary>
    /// M-003: Empty selectedItems array should produce a result with no changes.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-114")]
    [Description("Empty selectedItems: statusChanged=false, allChanged=true (vacuously)")]
    public void ComputeStatusChanges_EmptyItems_NoChanges()
    {
        var selectedItems = Array.Empty<string>();
        Func<string, bool> isAlwaysValid = _ => false;

        var result = InventoryStatusService.ComputeStatusChanges(
            ItemStatus.Valid,
            selectedItems,
            isAlwaysValid
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True, "Operation succeeds even with empty input");
            Assert.That(result.StatusChanged, Is.False, "No items to change");
            Assert.That(
                result.AllChanged,
                Is.True,
                "Vacuously true: all 0 items were changed"
            );
            Assert.That(result.SkippedCount, Is.EqualTo(0));
            Assert.That(result.WarningMessage, Is.Null);
        });
    }

    /// <summary>
    /// M-003 Error: Invalid category should resolve to default (not throw).
    /// Per PT9 source, the switch has a default case that falls through.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-095")]
    [Property("BehaviorId", "BHV-114")]
    [Property("ExtractionId", "EXT-002")]
    [Description("Invalid category resolves to default (no exception)")]
    public void ResolveInventoryCategory_EmptyString_FallsToDefault()
    {
        // Per PT9 switch statement, unrecognized categories fall to default case
        var result = InventoryStatusService.ResolveInventoryCategory(
            "",
            supportsSeparateInventories: true
        );

        Assert.That(
            result,
            Is.EqualTo(InventoryTextType.VerseText),
            "Empty category should fall through to default"
        );
    }

    #endregion

    #region CAP-003 Golden Master Tests (gm-010)

    /// <summary>
    /// gm-010: When all selected items are always-valid and desiredStatus is not Valid,
    /// the result indicates no changes, all skipped, and warning present.
    /// Matches gm-010 expected output: allChanged=false, warningShown=true.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-003")]
    [Property("GoldenMasterId", "gm-010")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-114")]
    [Property("ValidationRule", "VAL-007")]
    [Description("gm-010: All always-valid items to Invalid -> no changes + warning")]
    public void ComputeStatusChanges_GoldenMaster_AlwaysValidProtection()
    {
        // gm-010 input: item="(", isAlwaysValid=true, desiredStatus=bad
        var selectedItems = new[] { "(" };
        Func<string, bool> isAlwaysValid = _ => true;

        var result = InventoryStatusService.ComputeStatusChanges(
            ItemStatus.Invalid,
            selectedItems,
            isAlwaysValid
        );

        // gm-010 expected: allChanged=false, warningShown=true, warningMessage="Item is in Language Settings"
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True);
            Assert.That(result.AllChanged, Is.False, "gm-010: allChanged must be false");
            Assert.That(result.StatusChanged, Is.False, "gm-010: no items were changed");
            Assert.That(result.SkippedCount, Is.GreaterThan(0), "gm-010: items were skipped");
            Assert.That(
                result.WarningMessage,
                Is.Not.Null.And.Not.Empty,
                "gm-010: warningShown=true requires non-empty warningMessage"
            );
        });
    }

    /// <summary>
    /// gm-010: The warning message should reference Language Settings.
    /// gm-010 expected warningMessage: "Item is in Language Settings"
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-003")]
    [Property("GoldenMasterId", "gm-010")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-114")]
    [Property("ValidationRule", "VAL-007")]
    [Description("gm-010: Warning message references Language Settings")]
    public void ComputeStatusChanges_GoldenMaster_WarningReferencesLanguageSettings()
    {
        var selectedItems = new[] { "(" };
        Func<string, bool> isAlwaysValid = _ => true;

        var result = InventoryStatusService.ComputeStatusChanges(
            ItemStatus.Invalid,
            selectedItems,
            isAlwaysValid
        );

        Assert.That(
            result.WarningMessage,
            Does.Contain("Language Settings").IgnoreCase,
            "gm-010: Warning must reference Language Settings"
        );
    }

    #endregion

    #region CAP-003 Extraction Tests (EXT-002) - Core Logic

    /// <summary>
    /// EXT-002: When no items are always-valid, all items are changed.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ExtractionId", "EXT-002")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-114")]
    [Description("EXT-002: No always-valid items -> all changed")]
    public void ComputeStatusChanges_NoAlwaysValid_AllChanged()
    {
        var selectedItems = new[] { "(", ")", "[", "]" };
        Func<string, bool> isAlwaysValid = _ => false;

        var result = InventoryStatusService.ComputeStatusChanges(
            ItemStatus.Invalid,
            selectedItems,
            isAlwaysValid
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.StatusChanged, Is.True);
            Assert.That(result.AllChanged, Is.True);
            Assert.That(result.SkippedCount, Is.EqualTo(0));
            Assert.That(result.WarningMessage, Is.Null);
        });
    }

    /// <summary>
    /// EXT-002: Mixed selection with 2 always-valid and 2 regular, set to Invalid.
    /// Only 2 items should be changed, 2 skipped.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ExtractionId", "EXT-002")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-114")]
    [Property("ValidationRule", "VAL-007")]
    [Description("EXT-002: Mixed always-valid: 2 changed, 2 skipped")]
    public void ComputeStatusChanges_TwoAlwaysValidTwoRegular_PartialChange()
    {
        var selectedItems = new[] { "(", ")", "[", "]" };
        Func<string, bool> isAlwaysValid = item => item == "(" || item == "[";

        var result = InventoryStatusService.ComputeStatusChanges(
            ItemStatus.Invalid,
            selectedItems,
            isAlwaysValid
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.StatusChanged, Is.True, "Two items were changed");
            Assert.That(result.AllChanged, Is.False, "Not all changed (2 were protected)");
            Assert.That(result.SkippedCount, Is.EqualTo(2), "Two items skipped");
            Assert.That(result.WarningMessage, Is.Not.Null.And.Not.Empty, "Warning for skipped");
        });
    }

    /// <summary>
    /// EXT-002: Single non-protected item set to each status -- all should succeed.
    /// </summary>
    [TestCase(ItemStatus.Valid)]
    [TestCase(ItemStatus.Invalid)]
    [TestCase(ItemStatus.Unknown)]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ExtractionId", "EXT-002")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-114")]
    [Description("EXT-002: Single non-protected item succeeds for all statuses")]
    public void ComputeStatusChanges_SingleNonProtected_AllStatusesSucceed(ItemStatus status)
    {
        var result = InventoryStatusService.ComputeStatusChanges(
            status,
            new[] { ")" },
            _ => false
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True);
            Assert.That(result.StatusChanged, Is.True);
            Assert.That(result.AllChanged, Is.True);
            Assert.That(result.SkippedCount, Is.EqualTo(0));
        });
    }

    #endregion

    #region CAP-003 Permission Precondition Tests (VAL-004)

    /// <summary>
    /// M-003 Precondition: canMakeChanges must be true (VAL-004).
    /// When canMakeChanges is false, the operation returns an error.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-114")]
    [Property("ValidationRule", "VAL-004")]
    [Description("M-003: Operation returns error when canMakeChanges is false (VAL-004)")]
    public void SetSelectedStatus_NoPermission_ReturnsError()
    {
        // The SetSelectedStatusIfPermitted method guards the entire operation.
        // When canMakeChanges is false, it returns a failure StatusChangeResult.
        var result = InventoryStatusService.SetSelectedStatusIfPermitted(
            canMakeChanges: false,
            computeAction: () =>
            {
                Assert.Fail("Compute action should not be invoked without permission");
                return new StatusChangeResult();
            }
        );

        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.False, "Operation fails without permission");
            Assert.That(
                result.Error,
                Is.Not.Null.And.Not.Empty,
                "Error message must be set (VAL-004)"
            );
            Assert.That(result.StatusChanged, Is.False, "No status changes without permission");
        });
    }

    /// <summary>
    /// M-003: canMakeChanges=true allows operation to proceed.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-003")]
    [Property("ScenarioId", "TS-038")]
    [Property("BehaviorId", "BHV-114")]
    [Property("ValidationRule", "VAL-004")]
    [Description("M-003: Operation proceeds when canMakeChanges is true (VAL-004)")]
    public void SetSelectedStatusIfPermitted_WithPermission_InvokesCompute()
    {
        var computeWasCalled = false;
        var expectedResult = new StatusChangeResult
        {
            Success = true,
            StatusChanged = true,
            AllChanged = true,
            SkippedCount = 0,
        };

        var result = InventoryStatusService.SetSelectedStatusIfPermitted(
            canMakeChanges: true,
            computeAction: () =>
            {
                computeWasCalled = true;
                return expectedResult;
            }
        );

        Assert.Multiple(() =>
        {
            Assert.That(computeWasCalled, Is.True, "Compute action must be invoked");
            Assert.That(result.Success, Is.True, "Result from compute action is returned");
            Assert.That(result.StatusChanged, Is.True);
        });
    }

    #endregion
}
