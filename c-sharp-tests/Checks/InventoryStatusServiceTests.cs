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

    // =========================================================================
    // CAP-005: ToggleSeparation
    //
    // Tests for EXT-004: verse/non-verse separation toggle logic.
    // Two methods tested:
    //   1. ComputeToggleSeparation - Toggles separation ON/OFF with destructive merge
    //   2. DetermineSetSeparatelyState - Auto-detects separation state
    //
    // Source: PT9/Paratext/Checking/InventoryForm.cs:2101-2112, 1229-1267, 1875-1901
    // Contract: Section 4.5 M-005 ToggleSeparation, Section 4.6 M-006 DetermineSetSeparatelyState
    // Behaviors: BHV-107, BHV-314
    // Invariant: INV-017 (non-verse validity falls back to verse validity)
    // Golden masters: gm-005 (toggle ON), gm-006 (round-trip)
    //
    // DESTRUCTIVE: When enabling separation, unknown non-verse items permanently
    // inherit verse status. This cannot be undone by toggling OFF.
    //
    // Test design: Tests call InventoryStatusService static methods with
    // SeparationSnapshot records (testable DTOs that capture the verse/non-verse
    // valid/invalid item state). The service returns SeparationToggleResult
    // records indicating the new state and whether rebuild is required.
    // =========================================================================

    #region CAP-005 Acceptance Test (gm-005, gm-006)

    /// <summary>
    /// Acceptance test: Verifies that toggling separation ON performs the destructive
    /// merge -- non-verse items that are Unknown inherit their verse status.
    /// '(' becomes valid in non-verse (was unknown), ')' becomes invalid in non-verse
    /// (was unknown). The setting is saved and rebuild is required.
    ///
    /// When this test passes along with the round-trip test, CAP-005 is complete.
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-005")]
    [Property("GoldenMasterId", "gm-005")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-098")]
    [Description(
        "Acceptance test: ToggleSeparation ON merges unknown non-verse items "
            + "from verse status (destructive merge, matches gm-005)"
    )]
    public void ToggleSeparation_EnableWithUnknownNonVerse_MergesFromVerseStatus()
    {
        // Arrange: Regular project, separation OFF, verse has '(' valid and ')' invalid,
        // non-verse has both as unknown (matches gm-005 input)
        var snapshot = new SeparationSnapshot
        {
            VerseValidItems = new HashSet<string> { "(" },
            VerseInvalidItems = new HashSet<string> { ")" },
            NonVerseValidItems = new HashSet<string>(),
            NonVerseInvalidItems = new HashSet<string>(),
            NonVerseUnknownItems = new HashSet<string> { "(", ")" },
        };

        // Act: Toggle ON
        var result = InventoryStatusService.ComputeToggleSeparation(
            enable: true,
            snapshot
        );

        // Assert: matches gm-005 expected output
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True);
            Assert.That(result.Enabled, Is.True);
            Assert.That(result.RebuildRequired, Is.True);
            Assert.That(
                result.MergedNonVerseValid,
                Does.Contain("("),
                "Non-verse '(' should inherit valid from verse"
            );
            Assert.That(
                result.MergedNonVerseInvalid,
                Does.Contain(")"),
                "Non-verse ')' should inherit invalid from verse"
            );
        });
    }

    /// <summary>
    /// Acceptance test: Round-trip toggle (ON -> set -> OFF -> ON) confirms that
    /// the destructive merge permanently changes non-verse statuses. Previously
    /// Unknown items that were manually changed to valid remain valid even after
    /// re-merge on second toggle ON (gm-006).
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-005")]
    [Property("GoldenMasterId", "gm-006")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-100")]
    [Description(
        "Acceptance test: Round-trip toggle permanently changes non-verse statuses "
            + "(destructive merge re-applied, matches gm-006)"
    )]
    public void ToggleSeparation_RoundTrip_PermanentlyChangesNonVerseStatuses()
    {
        // Arrange: Step 1 -- initial state, verse has '(' valid, non-verse unknown
        var initialSnapshot = new SeparationSnapshot
        {
            VerseValidItems = new HashSet<string> { "(" },
            VerseInvalidItems = new HashSet<string>(),
            NonVerseValidItems = new HashSet<string>(),
            NonVerseInvalidItems = new HashSet<string>(),
            NonVerseUnknownItems = new HashSet<string> { "(" },
        };

        // Act: Step 1 -- Toggle ON (first time)
        var firstToggle = InventoryStatusService.ComputeToggleSeparation(
            enable: true,
            initialSnapshot
        );

        // Assert: Step 1 -- '(' is now valid in non-verse
        Assert.That(
            firstToggle.MergedNonVerseValid,
            Does.Contain("("),
            "First toggle ON: '(' should inherit valid from verse"
        );

        // Arrange: Step 2 -- User manually sets '(' back to unknown in non-verse
        var afterManualChange = new SeparationSnapshot
        {
            VerseValidItems = new HashSet<string> { "(" },
            VerseInvalidItems = new HashSet<string>(),
            NonVerseValidItems = new HashSet<string>(),
            NonVerseInvalidItems = new HashSet<string>(),
            NonVerseUnknownItems = new HashSet<string> { "(" },
        };

        // Act: Step 2 -- Toggle OFF (just disables separation, no merge)
        var toggleOff = InventoryStatusService.ComputeToggleSeparation(
            enable: false,
            afterManualChange
        );

        Assert.That(toggleOff.Enabled, Is.False, "Separation should be disabled");

        // Act: Step 3 -- Toggle ON again (re-applies merge)
        var secondToggle = InventoryStatusService.ComputeToggleSeparation(
            enable: true,
            afterManualChange
        );

        // Assert: Step 3 -- '(' is valid again (merge re-applied from verse)
        Assert.Multiple(() =>
        {
            Assert.That(secondToggle.Success, Is.True);
            Assert.That(secondToggle.Enabled, Is.True);
            Assert.That(secondToggle.RebuildRequired, Is.True);
            Assert.That(
                secondToggle.MergedNonVerseValid,
                Does.Contain("("),
                "Round-trip: '(' should be valid again after re-merge (matches gm-006)"
            );
        });
    }

    #endregion

    #region CAP-005 Contract Tests - ToggleSeparation (TS-098, TS-099)

    /// <summary>
    /// Happy path: Toggle ON with multiple items -- verse valid items are inherited
    /// by non-verse unknowns, verse invalid items are inherited by non-verse unknowns.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-098")]
    [Description("Toggle ON: non-verse unknowns inherit verse status")]
    public void ComputeToggleSeparation_EnableOn_NonVerseUnknownsInheritVerseStatus()
    {
        // Arrange: verse has '(' valid, ')' invalid; non-verse has both unknown
        var snapshot = new SeparationSnapshot
        {
            VerseValidItems = new HashSet<string> { "(" },
            VerseInvalidItems = new HashSet<string> { ")" },
            NonVerseValidItems = new HashSet<string>(),
            NonVerseInvalidItems = new HashSet<string>(),
            NonVerseUnknownItems = new HashSet<string> { "(", ")" },
        };

        // Act
        var result = InventoryStatusService.ComputeToggleSeparation(
            enable: true,
            snapshot
        );

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True);
            Assert.That(result.Enabled, Is.True);
            Assert.That(result.MergedNonVerseValid, Does.Contain("("));
            Assert.That(result.MergedNonVerseInvalid, Does.Contain(")"));
        });
    }

    /// <summary>
    /// Happy path: Toggle OFF returns to combined view. No merge is performed.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-099")]
    [Description("Toggle OFF: combined view, no merge performed")]
    public void ComputeToggleSeparation_Disable_ReturnsCombinedView()
    {
        // Arrange: existing separated state with items
        var snapshot = new SeparationSnapshot
        {
            VerseValidItems = new HashSet<string> { "(" },
            VerseInvalidItems = new HashSet<string> { ")" },
            NonVerseValidItems = new HashSet<string> { "[" },
            NonVerseInvalidItems = new HashSet<string> { "]" },
            NonVerseUnknownItems = new HashSet<string>(),
        };

        // Act
        var result = InventoryStatusService.ComputeToggleSeparation(
            enable: false,
            snapshot
        );

        // Assert: No merge, just disables separation
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True);
            Assert.That(result.Enabled, Is.False);
            Assert.That(result.RebuildRequired, Is.True, "Rebuild always required after toggle");
        });
    }

    /// <summary>
    /// Toggle ON: items already categorized in non-verse are NOT overwritten.
    /// Only items that are Unknown in non-verse get changed.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-098")]
    [Description("Toggle ON preserves already-categorized non-verse items")]
    public void ComputeToggleSeparation_Enable_PreservesExistingNonVerseStatuses()
    {
        // Arrange: verse has '(' valid; non-verse has '(' already invalid (explicit)
        // and ')' as unknown
        var snapshot = new SeparationSnapshot
        {
            VerseValidItems = new HashSet<string> { "(", ")" },
            VerseInvalidItems = new HashSet<string>(),
            NonVerseValidItems = new HashSet<string>(),
            NonVerseInvalidItems = new HashSet<string> { "(" },
            NonVerseUnknownItems = new HashSet<string> { ")" },
        };

        // Act
        var result = InventoryStatusService.ComputeToggleSeparation(
            enable: true,
            snapshot
        );

        // Assert: '(' should NOT be overwritten (already categorized as invalid)
        // ')' should inherit valid from verse (was unknown)
        Assert.Multiple(() =>
        {
            Assert.That(
                result.MergedNonVerseInvalid,
                Does.Contain("("),
                "'(' was already invalid in non-verse -- must NOT be overwritten"
            );
            Assert.That(
                result.MergedNonVerseValid,
                Does.Not.Contain("("),
                "'(' must not appear in valid (it was explicitly invalid)"
            );
            Assert.That(
                result.MergedNonVerseValid,
                Does.Contain(")"),
                "')' was unknown, should inherit valid from verse"
            );
        });
    }

    /// <summary>
    /// Toggle ON with no unknown non-verse items: merge is a no-op but
    /// still succeeds and requires rebuild.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-098")]
    [Description("Toggle ON with no unknowns is a no-op merge")]
    public void ComputeToggleSeparation_Enable_NoUnknowns_StillSucceeds()
    {
        // Arrange: all non-verse items already categorized
        var snapshot = new SeparationSnapshot
        {
            VerseValidItems = new HashSet<string> { "(" },
            VerseInvalidItems = new HashSet<string> { ")" },
            NonVerseValidItems = new HashSet<string> { "(" },
            NonVerseInvalidItems = new HashSet<string> { ")" },
            NonVerseUnknownItems = new HashSet<string>(),
        };

        // Act
        var result = InventoryStatusService.ComputeToggleSeparation(
            enable: true,
            snapshot
        );

        // Assert: success, no changes needed but still requires rebuild
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True);
            Assert.That(result.Enabled, Is.True);
            Assert.That(result.RebuildRequired, Is.True);
            Assert.That(
                result.MergedNonVerseValid,
                Does.Contain("("),
                "Existing valid items preserved"
            );
            Assert.That(
                result.MergedNonVerseInvalid,
                Does.Contain(")"),
                "Existing invalid items preserved"
            );
        });
    }

    /// <summary>
    /// Toggle ON with empty inventories: no items to merge, still succeeds.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-098")]
    [Description("Toggle ON with empty inventories succeeds with no merge")]
    public void ComputeToggleSeparation_Enable_EmptyInventories_Succeeds()
    {
        // Arrange: completely empty inventories
        var snapshot = new SeparationSnapshot
        {
            VerseValidItems = new HashSet<string>(),
            VerseInvalidItems = new HashSet<string>(),
            NonVerseValidItems = new HashSet<string>(),
            NonVerseInvalidItems = new HashSet<string>(),
            NonVerseUnknownItems = new HashSet<string>(),
        };

        // Act
        var result = InventoryStatusService.ComputeToggleSeparation(
            enable: true,
            snapshot
        );

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True);
            Assert.That(result.Enabled, Is.True);
            Assert.That(result.RebuildRequired, Is.True);
            Assert.That(result.MergedNonVerseValid, Is.Empty);
            Assert.That(result.MergedNonVerseInvalid, Is.Empty);
        });
    }

    /// <summary>
    /// RebuildRequired is always true after a successful toggle (both ON and OFF).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-098")]
    [Description("RebuildRequired is always true after successful toggle")]
    public void ComputeToggleSeparation_AnyDirection_RebuildRequiredAlwaysTrue()
    {
        var snapshot = new SeparationSnapshot
        {
            VerseValidItems = new HashSet<string> { "(" },
            VerseInvalidItems = new HashSet<string>(),
            NonVerseValidItems = new HashSet<string>(),
            NonVerseInvalidItems = new HashSet<string>(),
            NonVerseUnknownItems = new HashSet<string>(),
        };

        // Act: Toggle ON
        var onResult = InventoryStatusService.ComputeToggleSeparation(
            enable: true,
            snapshot
        );
        // Act: Toggle OFF
        var offResult = InventoryStatusService.ComputeToggleSeparation(
            enable: false,
            snapshot
        );

        // Assert: Both directions require rebuild
        Assert.Multiple(() =>
        {
            Assert.That(
                onResult.RebuildRequired,
                Is.True,
                "Toggle ON always requires rebuild"
            );
            Assert.That(
                offResult.RebuildRequired,
                Is.True,
                "Toggle OFF always requires rebuild"
            );
        });
    }

    /// <summary>
    /// Toggle ON: only Unknown items in non-verse are modified. Items in the
    /// verse set that have no corresponding non-verse Unknown item are ignored.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-098")]
    [Description("Only non-verse unknowns that match verse items get merged")]
    public void ComputeToggleSeparation_Enable_OnlyMatchingUnknownsAreMerged()
    {
        // Arrange: verse has '(' valid; non-verse unknowns has ')' but not '('
        var snapshot = new SeparationSnapshot
        {
            VerseValidItems = new HashSet<string> { "(" },
            VerseInvalidItems = new HashSet<string>(),
            NonVerseValidItems = new HashSet<string>(),
            NonVerseInvalidItems = new HashSet<string>(),
            NonVerseUnknownItems = new HashSet<string> { ")" },
        };

        // Act
        var result = InventoryStatusService.ComputeToggleSeparation(
            enable: true,
            snapshot
        );

        // Assert: ')' is not in verse valid or invalid, so it stays unknown
        Assert.Multiple(() =>
        {
            Assert.That(
                result.MergedNonVerseValid,
                Does.Not.Contain(")"),
                "')' not in verse valid, should not become valid"
            );
            Assert.That(
                result.MergedNonVerseInvalid,
                Does.Not.Contain(")"),
                "')' not in verse invalid, should not become invalid"
            );
        });
    }

    #endregion

    #region CAP-005 DetermineSetSeparatelyState Tests (TS-026)

    /// <summary>
    /// DetermineSetSeparatelyState returns true when the project setting
    /// MatchedPairsCheckSetSeparately is "true".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-026")]
    [Description("DetermineSetSeparatelyState returns true when setting is true")]
    public void DetermineSetSeparatelyState_SettingTrue_ReturnsTrue()
    {
        // Arrange: setting value is true, no auto-detection needed
        string settingValue = "true";
        var nonVerseSnapshot = new SeparationDetectionSnapshot
        {
            NonVerseValidItems = new HashSet<string>(),
            NonVerseInvalidItems = new HashSet<string>(),
            VerseValidItems = new HashSet<string>(),
            VerseInvalidItems = new HashSet<string>(),
        };

        // Act
        bool result = InventoryStatusService.DetermineSetSeparatelyState(
            settingValue,
            nonVerseSnapshot
        );

        // Assert
        Assert.That(result, Is.True);
    }

    /// <summary>
    /// DetermineSetSeparatelyState returns false when the project setting
    /// is "false" and non-verse items match verse items (no auto-detection trigger).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-026")]
    [Description("DetermineSetSeparatelyState returns false when setting is false and no diff")]
    public void DetermineSetSeparatelyState_SettingFalseNoDiff_ReturnsFalse()
    {
        // Arrange: setting is false, non-verse matches verse
        string settingValue = "false";
        var nonVerseSnapshot = new SeparationDetectionSnapshot
        {
            NonVerseValidItems = new HashSet<string> { "(" },
            NonVerseInvalidItems = new HashSet<string> { ")" },
            VerseValidItems = new HashSet<string> { "(" },
            VerseInvalidItems = new HashSet<string> { ")" },
        };

        // Act
        bool result = InventoryStatusService.DetermineSetSeparatelyState(
            settingValue,
            nonVerseSnapshot
        );

        // Assert
        Assert.That(result, Is.False);
    }

    /// <summary>
    /// DetermineSetSeparatelyState auto-detects separation when non-verse items
    /// differ from verse items, even if the setting is "false".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-026")]
    [Description("DetermineSetSeparatelyState auto-detects when non-verse differs from verse")]
    public void DetermineSetSeparatelyState_SettingFalseButDiffDetected_ReturnsTrue()
    {
        // Arrange: setting is false, but non-verse valid differs from verse valid
        string settingValue = "false";
        var nonVerseSnapshot = new SeparationDetectionSnapshot
        {
            NonVerseValidItems = new HashSet<string> { "[" },
            NonVerseInvalidItems = new HashSet<string>(),
            VerseValidItems = new HashSet<string> { "(" },
            VerseInvalidItems = new HashSet<string> { ")" },
        };

        // Act
        bool result = InventoryStatusService.DetermineSetSeparatelyState(
            settingValue,
            nonVerseSnapshot
        );

        // Assert: auto-detects because non-verse settings differ
        Assert.That(
            result,
            Is.True,
            "Should auto-detect separation when non-verse differs from verse"
        );
    }

    /// <summary>
    /// DetermineSetSeparatelyState returns false for empty inventories
    /// with setting false (default for new projects).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-026")]
    [Description("Default for new projects: separation is false")]
    public void DetermineSetSeparatelyState_EmptyInventories_ReturnsFalse()
    {
        // Arrange: empty inventories, setting is false/empty
        string settingValue = "";
        var nonVerseSnapshot = new SeparationDetectionSnapshot
        {
            NonVerseValidItems = new HashSet<string>(),
            NonVerseInvalidItems = new HashSet<string>(),
            VerseValidItems = new HashSet<string>(),
            VerseInvalidItems = new HashSet<string>(),
        };

        // Act
        bool result = InventoryStatusService.DetermineSetSeparatelyState(
            settingValue,
            nonVerseSnapshot
        );

        // Assert
        Assert.That(result, Is.False);
    }

    /// <summary>
    /// DetermineSetSeparatelyState returns true when setting is null but
    /// non-verse has different items from verse (auto-detection).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-026")]
    [Description("Null setting with differing non-verse items auto-detects true")]
    public void DetermineSetSeparatelyState_NullSettingWithDiff_AutoDetectsTrue()
    {
        // Arrange: no explicit setting, but inventories differ
        string? settingValue = null;
        var nonVerseSnapshot = new SeparationDetectionSnapshot
        {
            NonVerseValidItems = new HashSet<string> { "[" },
            NonVerseInvalidItems = new HashSet<string> { "]" },
            VerseValidItems = new HashSet<string> { "(" },
            VerseInvalidItems = new HashSet<string> { ")" },
        };

        // Act
        bool result = InventoryStatusService.DetermineSetSeparatelyState(
            settingValue,
            nonVerseSnapshot
        );

        // Assert
        Assert.That(result, Is.True, "Auto-detection should trigger with differing inventories");
    }

    #endregion

    #region CAP-005 Permission/Precondition Tests (VAL-006)

    /// <summary>
    /// VAL-006: Only administrators can toggle separation.
    /// Non-admin users get a PERMISSION_DENIED error.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-098")]
    [Property("ValidationRule", "VAL-006")]
    [Description("Non-admin cannot toggle separation")]
    public void ToggleSeparationIfPermitted_NotAdmin_ReturnsPermissionDenied()
    {
        // Arrange
        bool isAdmin = false;

        // Act
        var result = InventoryStatusService.ToggleSeparationIfPermitted(
            isAdmin,
            () => new SeparationToggleResult
            {
                Success = true,
                Enabled = true,
                RebuildRequired = true,
            }
        );

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.False);
            Assert.That(
                result.Error,
                Does.Contain("administrator"),
                "Error message should mention administrator requirement"
            );
            Assert.That(result.RebuildRequired, Is.False, "No rebuild when permission denied");
        });
    }

    /// <summary>
    /// VAL-006: Administrators can toggle separation successfully.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ScenarioId", "TS-098")]
    [Property("ValidationRule", "VAL-006")]
    [Description("Admin can toggle separation")]
    public void ToggleSeparationIfPermitted_Admin_InvokesToggle()
    {
        // Arrange
        bool isAdmin = true;
        bool toggleWasCalled = false;

        // Act
        var result = InventoryStatusService.ToggleSeparationIfPermitted(
            isAdmin,
            () =>
            {
                toggleWasCalled = true;
                return new SeparationToggleResult
                {
                    Success = true,
                    Enabled = true,
                    RebuildRequired = true,
                };
            }
        );

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(toggleWasCalled, Is.True, "Toggle action must be invoked for admin");
            Assert.That(result.Success, Is.True);
            Assert.That(result.Enabled, Is.True);
            Assert.That(result.RebuildRequired, Is.True);
        });
    }

    /// <summary>
    /// BHV-107: Check must support separate inventories. If not supported,
    /// returns NOT_SUPPORTED error.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-098")]
    [Description("Check not supporting separation returns NOT_SUPPORTED error")]
    public void ToggleSeparationIfSupported_NotSupported_ReturnsNotSupportedError()
    {
        // Arrange
        bool supportsSeparateInventories = false;

        // Act
        var result = InventoryStatusService.ToggleSeparationIfSupported(
            supportsSeparateInventories,
            () => new SeparationToggleResult
            {
                Success = true,
                Enabled = true,
                RebuildRequired = true,
            }
        );

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.False);
            Assert.That(
                result.Error,
                Does.Contain("does not support"),
                "Error should mention lack of support"
            );
        });
    }

    /// <summary>
    /// BHV-107: Check supporting separation proceeds normally.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-098")]
    [Description("Check supporting separation invokes toggle")]
    public void ToggleSeparationIfSupported_Supported_InvokesToggle()
    {
        // Arrange
        bool supportsSeparateInventories = true;
        bool toggleWasCalled = false;

        // Act
        var result = InventoryStatusService.ToggleSeparationIfSupported(
            supportsSeparateInventories,
            () =>
            {
                toggleWasCalled = true;
                return new SeparationToggleResult
                {
                    Success = true,
                    Enabled = true,
                    RebuildRequired = true,
                };
            }
        );

        // Assert
        Assert.Multiple(() =>
        {
            Assert.That(toggleWasCalled, Is.True, "Toggle action must be invoked when supported");
            Assert.That(result.Success, Is.True);
        });
    }

    #endregion

    #region CAP-005 Golden Master Tests (gm-005, gm-006)

    /// <summary>
    /// Golden master gm-005: Toggle ON with verse ('(' valid, ')' invalid) and
    /// non-verse (both unknown) produces:
    ///   - non-verse '(' becomes valid
    ///   - non-verse ')' becomes invalid
    ///   - separationEnabled = true
    ///   - settingSaved = true (implied by success)
    ///   - inventoryRebuilt = true (RebuildRequired)
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-005")]
    [Property("GoldenMasterId", "gm-005")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-098")]
    [Description("gm-005: Toggle ON destructive merge matches expected output")]
    public void GoldenMaster_gm005_ToggleOn_MatchesExpectedOutput()
    {
        // Arrange: exact gm-005 input
        var snapshot = new SeparationSnapshot
        {
            VerseValidItems = new HashSet<string> { "(" },
            VerseInvalidItems = new HashSet<string> { ")" },
            NonVerseValidItems = new HashSet<string>(),
            NonVerseInvalidItems = new HashSet<string>(),
            NonVerseUnknownItems = new HashSet<string> { "(", ")" },
        };

        // Act
        var result = InventoryStatusService.ComputeToggleSeparation(
            enable: true,
            snapshot
        );

        // Assert: matches gm-005 expected-output.json
        Assert.Multiple(() =>
        {
            Assert.That(result.Success, Is.True, "gm-005: operation succeeds");
            Assert.That(result.Enabled, Is.True, "gm-005: separationEnabled = true");
            Assert.That(result.RebuildRequired, Is.True, "gm-005: inventoryRebuilt = true");
            // nonVerseStatus: { "(": "valid", ")": "invalid" }
            Assert.That(
                result.MergedNonVerseValid,
                Is.EquivalentTo(new[] { "(" }),
                "gm-005: non-verse '(' = valid"
            );
            Assert.That(
                result.MergedNonVerseInvalid,
                Is.EquivalentTo(new[] { ")" }),
                "gm-005: non-verse ')' = invalid"
            );
        });
    }

    /// <summary>
    /// Golden master gm-006: Round-trip toggle confirms destructive merge.
    /// After ON -> manual change -> OFF -> ON, previously unknown items that were
    /// made unknown again get re-merged from verse status.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-005")]
    [Property("GoldenMasterId", "gm-006")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-100")]
    [Description("gm-006: Round-trip toggle permanently changes statuses")]
    public void GoldenMaster_gm006_RoundTrip_PermanentlyChangesStatuses()
    {
        // Arrange: Start with verse '(' valid, non-verse '(' unknown
        var initialSnapshot = new SeparationSnapshot
        {
            VerseValidItems = new HashSet<string> { "(" },
            VerseInvalidItems = new HashSet<string>(),
            NonVerseValidItems = new HashSet<string>(),
            NonVerseInvalidItems = new HashSet<string>(),
            NonVerseUnknownItems = new HashSet<string> { "(" },
        };

        // Act 1: Toggle ON -- '(' becomes valid in non-verse
        var firstOn = InventoryStatusService.ComputeToggleSeparation(
            enable: true,
            initialSnapshot
        );
        Assert.That(firstOn.MergedNonVerseValid, Does.Contain("("), "Step 1: merge applies");

        // Simulate user putting '(' back to unknown
        var afterRevert = new SeparationSnapshot
        {
            VerseValidItems = new HashSet<string> { "(" },
            VerseInvalidItems = new HashSet<string>(),
            NonVerseValidItems = new HashSet<string>(),
            NonVerseInvalidItems = new HashSet<string>(),
            NonVerseUnknownItems = new HashSet<string> { "(" },
        };

        // Act 2: Toggle OFF
        var offResult = InventoryStatusService.ComputeToggleSeparation(
            enable: false,
            afterRevert
        );
        Assert.That(offResult.Enabled, Is.False, "Step 2: separation off");

        // Act 3: Toggle ON again -- merge re-applies
        var secondOn = InventoryStatusService.ComputeToggleSeparation(
            enable: true,
            afterRevert
        );

        // Assert: gm-006 confirms previously unknown now valid
        Assert.Multiple(() =>
        {
            Assert.That(
                secondOn.MergedNonVerseValid,
                Does.Contain("("),
                "gm-006: previously unknown now valid after round-trip"
            );
            Assert.That(secondOn.RebuildRequired, Is.True);
        });
    }

    #endregion

    #region CAP-005 Extraction Tests (EXT-004) - Toggle Logic

    /// <summary>
    /// EXT-004 merge algorithm: iterates verse valid items, sets unknown
    /// non-verse items to valid.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ExtractionId", "EXT-004")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-098")]
    [Description("EXT-004: Merge iterates verse valid, sets unknown non-verse to valid")]
    public void ComputeToggleSeparation_MergeAlgorithm_VerseValidSetsUnknownNonVerseValid()
    {
        // Arrange: three verse valid items, two are unknown in non-verse
        var snapshot = new SeparationSnapshot
        {
            VerseValidItems = new HashSet<string> { "(", "[", "{" },
            VerseInvalidItems = new HashSet<string>(),
            NonVerseValidItems = new HashSet<string> { "(" },
            NonVerseInvalidItems = new HashSet<string>(),
            NonVerseUnknownItems = new HashSet<string> { "[", "{" },
        };

        // Act
        var result = InventoryStatusService.ComputeToggleSeparation(
            enable: true,
            snapshot
        );

        // Assert: '[' and '{' inherit valid from verse; '(' already valid, preserved
        Assert.Multiple(() =>
        {
            Assert.That(result.MergedNonVerseValid, Does.Contain("("));
            Assert.That(result.MergedNonVerseValid, Does.Contain("["));
            Assert.That(result.MergedNonVerseValid, Does.Contain("{"));
        });
    }

    /// <summary>
    /// EXT-004 merge algorithm: iterates verse invalid items, sets unknown
    /// non-verse items to invalid.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ExtractionId", "EXT-004")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-098")]
    [Description("EXT-004: Merge iterates verse invalid, sets unknown non-verse to invalid")]
    public void ComputeToggleSeparation_MergeAlgorithm_VerseInvalidSetsUnknownNonVerseInvalid()
    {
        // Arrange: two verse invalid items, both unknown in non-verse
        var snapshot = new SeparationSnapshot
        {
            VerseValidItems = new HashSet<string>(),
            VerseInvalidItems = new HashSet<string> { ")", "]" },
            NonVerseValidItems = new HashSet<string>(),
            NonVerseInvalidItems = new HashSet<string>(),
            NonVerseUnknownItems = new HashSet<string> { ")", "]" },
        };

        // Act
        var result = InventoryStatusService.ComputeToggleSeparation(
            enable: true,
            snapshot
        );

        // Assert: ')' and ']' inherit invalid from verse
        Assert.Multiple(() =>
        {
            Assert.That(result.MergedNonVerseInvalid, Does.Contain(")"));
            Assert.That(result.MergedNonVerseInvalid, Does.Contain("]"));
        });
    }

    /// <summary>
    /// EXT-004: Toggle OFF does NOT perform merge. Non-verse items unchanged.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ExtractionId", "EXT-004")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-099")]
    [Description("EXT-004: Toggle OFF does not merge, just disables separation")]
    public void ComputeToggleSeparation_Disable_DoesNotMerge()
    {
        // Arrange: non-verse has unknown items
        var snapshot = new SeparationSnapshot
        {
            VerseValidItems = new HashSet<string> { "(" },
            VerseInvalidItems = new HashSet<string>(),
            NonVerseValidItems = new HashSet<string>(),
            NonVerseInvalidItems = new HashSet<string>(),
            NonVerseUnknownItems = new HashSet<string> { "(" },
        };

        // Act
        var result = InventoryStatusService.ComputeToggleSeparation(
            enable: false,
            snapshot
        );

        // Assert: no MergedNonVerse* fields populated (no merge for OFF)
        Assert.Multiple(() =>
        {
            Assert.That(result.Enabled, Is.False);
            Assert.That(result.RebuildRequired, Is.True, "Rebuild required even for OFF");
        });
    }

    /// <summary>
    /// EXT-004: mixed scenario -- some items valid in verse, some invalid,
    /// non-verse has a mix of categorized and unknown items.
    /// </summary>
    [Test]
    [Category("Extraction")]
    [Property("CapabilityId", "CAP-005")]
    [Property("ExtractionId", "EXT-004")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-098")]
    [Description("EXT-004: Mixed scenario with some categorized and some unknown non-verse items")]
    public void ComputeToggleSeparation_MixedScenario_CorrectlyMerges()
    {
        // Arrange: verse: '(' valid, ')' invalid, '[' valid
        // non-verse: '(' already valid, ')' unknown, '[' already invalid, ']' unknown
        var snapshot = new SeparationSnapshot
        {
            VerseValidItems = new HashSet<string> { "(", "[" },
            VerseInvalidItems = new HashSet<string> { ")" },
            NonVerseValidItems = new HashSet<string> { "(" },
            NonVerseInvalidItems = new HashSet<string> { "[" },
            NonVerseUnknownItems = new HashSet<string> { ")", "]" },
        };

        // Act
        var result = InventoryStatusService.ComputeToggleSeparation(
            enable: true,
            snapshot
        );

        // Assert:
        // '(' was already valid in non-verse -> stays valid
        // ')' was unknown, verse says invalid -> becomes invalid
        // '[' was already invalid in non-verse -> stays invalid (not overwritten)
        // ']' was unknown, not in verse valid or invalid -> stays unknown
        Assert.Multiple(() =>
        {
            Assert.That(result.MergedNonVerseValid, Does.Contain("("), "'(' already valid");
            Assert.That(
                result.MergedNonVerseInvalid,
                Does.Contain(")"),
                "')' unknown -> inherits invalid from verse"
            );
            Assert.That(
                result.MergedNonVerseInvalid,
                Does.Contain("["),
                "'[' was already invalid -> preserved"
            );
            Assert.That(
                result.MergedNonVerseValid,
                Does.Not.Contain("]"),
                "']' unknown but not in any verse set -> not merged to valid"
            );
            Assert.That(
                result.MergedNonVerseInvalid,
                Does.Not.Contain("]"),
                "']' unknown but not in any verse set -> not merged to invalid"
            );
        });
    }

    #endregion

    #region CAP-005 Invariant Tests (INV-017)

    /// <summary>
    /// INV-017: Non-verse validity falls back to verse validity. When checking
    /// non-verse text with separation enabled, if an item is not explicitly valid
    /// or invalid in the non-verse set, the system falls back to checking the
    /// main (verse text) valid set.
    ///
    /// After toggle ON, items that were unknown in non-verse and had a verse status
    /// should now explicitly have that status in non-verse (no longer relying on fallback).
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-005")]
    [Property("InvariantId", "INV-017")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-098")]
    [Description("INV-017: After toggle ON, previously-unknown non-verse items have explicit status")]
    public void ComputeToggleSeparation_Enable_EliminatesNeedForFallback()
    {
        // Arrange: '(' is valid in verse, unknown in non-verse
        // Before toggle: non-verse would fall back to verse for '(' validity
        // After toggle: '(' should be explicitly valid in non-verse
        var snapshot = new SeparationSnapshot
        {
            VerseValidItems = new HashSet<string> { "(" },
            VerseInvalidItems = new HashSet<string>(),
            NonVerseValidItems = new HashSet<string>(),
            NonVerseInvalidItems = new HashSet<string>(),
            NonVerseUnknownItems = new HashSet<string> { "(" },
        };

        // Act
        var result = InventoryStatusService.ComputeToggleSeparation(
            enable: true,
            snapshot
        );

        // Assert: '(' is now explicitly in MergedNonVerseValid (no fallback needed)
        Assert.That(
            result.MergedNonVerseValid,
            Does.Contain("("),
            "INV-017: After merge, '(' has explicit non-verse status (no fallback)"
        );
    }

    /// <summary>
    /// INV-017: Items unknown in both verse and non-verse remain unknown after merge.
    /// The merge only propagates verse VALID and verse INVALID to unknown non-verse items.
    /// Items that are unknown in verse stay unknown in non-verse too.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-005")]
    [Property("InvariantId", "INV-017")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-098")]
    [Description("INV-017: Items unknown in verse do not get merged into non-verse")]
    public void ComputeToggleSeparation_Enable_UnknownVerseItemsNotMerged()
    {
        // Arrange: '(' is not in verse valid or invalid (unknown in verse too)
        // '(' is unknown in non-verse
        var snapshot = new SeparationSnapshot
        {
            VerseValidItems = new HashSet<string>(),
            VerseInvalidItems = new HashSet<string>(),
            NonVerseValidItems = new HashSet<string>(),
            NonVerseInvalidItems = new HashSet<string>(),
            NonVerseUnknownItems = new HashSet<string> { "(" },
        };

        // Act
        var result = InventoryStatusService.ComputeToggleSeparation(
            enable: true,
            snapshot
        );

        // Assert: '(' stays unknown (not in valid or invalid)
        Assert.Multiple(() =>
        {
            Assert.That(
                result.MergedNonVerseValid,
                Does.Not.Contain("("),
                "INV-017: Unknown verse items do not propagate to non-verse valid"
            );
            Assert.That(
                result.MergedNonVerseInvalid,
                Does.Not.Contain("("),
                "INV-017: Unknown verse items do not propagate to non-verse invalid"
            );
        });
    }

    /// <summary>
    /// INV-017: Merge direction is one-way (verse -> non-verse). Non-verse
    /// categorized items do NOT flow back to verse.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("CapabilityId", "CAP-005")]
    [Property("InvariantId", "INV-017")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-098")]
    [Description("INV-017: Merge is one-way (verse -> non-verse), never reverse")]
    public void ComputeToggleSeparation_Enable_MergeIsOneWay()
    {
        // Arrange: verse has '(' as unknown (not in valid/invalid),
        // non-verse has '(' as valid
        var snapshot = new SeparationSnapshot
        {
            VerseValidItems = new HashSet<string>(),
            VerseInvalidItems = new HashSet<string>(),
            NonVerseValidItems = new HashSet<string> { "(" },
            NonVerseInvalidItems = new HashSet<string>(),
            NonVerseUnknownItems = new HashSet<string>(),
        };

        // Act
        var result = InventoryStatusService.ComputeToggleSeparation(
            enable: true,
            snapshot
        );

        // Assert: non-verse '(' stays valid (not affected by verse unknown)
        Assert.That(
            result.MergedNonVerseValid,
            Does.Contain("("),
            "INV-017: Non-verse valid '(' preserved -- merge is verse->non-verse only"
        );
    }

    #endregion

    #region CAP-005 Edge Case - Round-Trip Toggle (TS-100)

    /// <summary>
    /// TS-100 edge case: Toggle ON then OFF then ON permanently changes statuses.
    /// Each toggle ON re-applies the merge for items that are currently Unknown
    /// in non-verse, regardless of their previous history.
    /// </summary>
    [Test]
    [Category("EdgeCase")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-100")]
    [Description("TS-100: Multiple toggle cycles permanently change non-verse statuses")]
    public void ComputeToggleSeparation_MultipleToggleCycles_PermanentlyChangesStatuses()
    {
        // Setup: verse '(' valid, ')' invalid; non-verse both unknown
        var initial = new SeparationSnapshot
        {
            VerseValidItems = new HashSet<string> { "(" },
            VerseInvalidItems = new HashSet<string> { ")" },
            NonVerseValidItems = new HashSet<string>(),
            NonVerseInvalidItems = new HashSet<string>(),
            NonVerseUnknownItems = new HashSet<string> { "(", ")" },
        };

        // Cycle 1: Toggle ON -- both items get merged
        var cycle1 = InventoryStatusService.ComputeToggleSeparation(true, initial);
        Assert.That(cycle1.MergedNonVerseValid, Does.Contain("("), "Cycle 1: '(' merged to valid");
        Assert.That(
            cycle1.MergedNonVerseInvalid,
            Does.Contain(")"),
            "Cycle 1: ')' merged to invalid"
        );

        // Between cycles: simulate user sets '(' back to unknown in non-verse
        var afterUserChange = new SeparationSnapshot
        {
            VerseValidItems = new HashSet<string> { "(" },
            VerseInvalidItems = new HashSet<string> { ")" },
            NonVerseValidItems = new HashSet<string>(),
            NonVerseInvalidItems = new HashSet<string> { ")" },
            NonVerseUnknownItems = new HashSet<string> { "(" },
        };

        // Cycle 2: Toggle OFF
        var cycle2Off = InventoryStatusService.ComputeToggleSeparation(false, afterUserChange);
        Assert.That(cycle2Off.Enabled, Is.False, "Cycle 2: separation off");

        // Cycle 3: Toggle ON again -- '(' is unknown again, gets re-merged
        var cycle3 = InventoryStatusService.ComputeToggleSeparation(true, afterUserChange);

        Assert.Multiple(() =>
        {
            Assert.That(
                cycle3.MergedNonVerseValid,
                Does.Contain("("),
                "Cycle 3: '(' re-merged to valid (permanent change)"
            );
            Assert.That(
                cycle3.MergedNonVerseInvalid,
                Does.Contain(")"),
                "Cycle 3: ')' stays invalid (not reverted by OFF)"
            );
            Assert.That(cycle3.RebuildRequired, Is.True);
        });
    }

    /// <summary>
    /// TS-100 edge case: After toggle ON, items that were already categorized
    /// in non-verse (not unknown) are never affected by any toggle cycle.
    /// </summary>
    [Test]
    [Category("EdgeCase")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-100")]
    [Description("TS-100: Already-categorized non-verse items survive toggle cycles")]
    public void ComputeToggleSeparation_ToggleCycles_CategorizedItemsSurvive()
    {
        // Arrange: '(' valid in verse; '(' explicitly invalid in non-verse
        var snapshot = new SeparationSnapshot
        {
            VerseValidItems = new HashSet<string> { "(" },
            VerseInvalidItems = new HashSet<string>(),
            NonVerseValidItems = new HashSet<string>(),
            NonVerseInvalidItems = new HashSet<string> { "(" },
            NonVerseUnknownItems = new HashSet<string>(),
        };

        // Act: multiple toggle cycles should not overwrite explicit non-verse status
        var on1 = InventoryStatusService.ComputeToggleSeparation(true, snapshot);
        // '(' is not unknown in non-verse, so it must NOT be overwritten
        Assert.That(
            on1.MergedNonVerseInvalid,
            Does.Contain("("),
            "Categorized as invalid in non-verse survives toggle ON"
        );
        Assert.That(
            on1.MergedNonVerseValid,
            Does.Not.Contain("("),
            "'(' must NOT be moved to valid -- it was explicitly invalid"
        );
    }

    #endregion

    #region CAP-005 Return Value Tests

    /// <summary>
    /// SeparationToggleResult.Enabled matches the requested enable direction.
    /// </summary>
    [TestCase(true)]
    [TestCase(false)]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-098")]
    [Description("Enabled field matches requested direction")]
    public void ComputeToggleSeparation_EnabledMatchesDirection(bool enable)
    {
        var snapshot = new SeparationSnapshot
        {
            VerseValidItems = new HashSet<string>(),
            VerseInvalidItems = new HashSet<string>(),
            NonVerseValidItems = new HashSet<string>(),
            NonVerseInvalidItems = new HashSet<string>(),
            NonVerseUnknownItems = new HashSet<string>(),
        };

        var result = InventoryStatusService.ComputeToggleSeparation(enable, snapshot);

        Assert.That(result.Enabled, Is.EqualTo(enable));
    }

    /// <summary>
    /// SeparationToggleResult.Success is always true for the core computation
    /// (permission/support checks are handled by guard methods).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-005")]
    [Property("BehaviorId", "BHV-107")]
    [Property("ScenarioId", "TS-098")]
    [Description("ComputeToggleSeparation always succeeds (guards are separate)")]
    public void ComputeToggleSeparation_AlwaysSucceeds()
    {
        var snapshot = new SeparationSnapshot
        {
            VerseValidItems = new HashSet<string> { "(" },
            VerseInvalidItems = new HashSet<string> { ")" },
            NonVerseValidItems = new HashSet<string>(),
            NonVerseInvalidItems = new HashSet<string>(),
            NonVerseUnknownItems = new HashSet<string> { "(", ")" },
        };

        var result = InventoryStatusService.ComputeToggleSeparation(true, snapshot);

        Assert.That(result.Success, Is.True, "Core computation always succeeds");
    }

    #endregion
}
