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
}
