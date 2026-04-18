using Paranext.DataProvider.Checklists.Markers;

namespace TestParanextDataProvider.Checklists.Markers;

/// <summary>
/// RED-phase contract tests for CAP-007 (Marker Settings Validation — leaf logic).
///
/// <para>
/// These tests exercise a new public static method on the existing
/// <c>MarkersDataSource</c> class:
/// <c>ValidateMarkerSettings(string) -> MarkerSettingsValidationResult</c>.
/// The method exists as a <c>NotImplementedException</c> stub at commit time, so
/// <c>dotnet build</c> succeeds and all 22 tests run and fail deterministically
/// with a clear pointer to PT9's <c>MarkerSettingsForm.btnOk_Click</c>. The
/// GREEN implementer replaces the stub body with the PT9 port. This matches
/// the CAP-002 RED-commit shape — see <c>MarkersDataSourceTests.cs:11-18</c>
/// and commit <c>b0699d7830</c>.
/// </para>
///
/// <para>
/// Scope: port of PT9 <c>MarkerSettingsForm.btnOk_Click</c> (at
/// <c>Paratext/Checklists/MarkerSettingsForm.cs:28-49</c>) as a pure-function validator.
/// <c>ValidateMarkerSettings</c> accepts an equivalent-markers string from the Settings
/// UI and returns structured success/failure metadata. This is a **separate entry point**
/// from CAP-002's <c>InitializeMarkerMappings</c> (which silently skips invalid pairs
/// per VAL-005 to preserve runtime robustness); the validator surfaces invalid input
/// per VAL-002 so the UI can keep the dialog open and show the error (BHV-312).
/// </para>
///
/// <para>
/// Design note (see <c>implementation/plans/test-writer-CAP-007.md</c> Decision 1):
/// these tests specify a **static synchronous** method on <c>MarkersDataSource</c>.
/// The async facade shown in <c>data-contracts.md §4.2</c>
/// (<c>ValidateMarkerSettingsAsync(string, CancellationToken)</c>) is the PAPI
/// NetworkObject wrapping, which is a CAP-011 concern, not CAP-007 logic. The
/// validator is pure string processing; <c>Task.FromResult(...)</c> is the entire
/// wrapper body.
/// </para>
///
/// Traceability:
///   - Capability: CAP-007
///   - Contract: data-contracts.md §4.2 (ValidateMarkerSettings)
///   - Types: data-contracts.md §3.13 (MarkerSettingsValidationResult), §3.14 (MarkerPair)
///   - Behaviors: BHV-105 (parsing), BHV-312 (Settings dialog — backend validate call)
///   - Extractions: EXT-019 (MarkerSettingsForm.btnOk_Click)
///   - Invariants / Validations: VAL-002 (format), §3.13 mutex invariants
///   - Golden Masters: gm-007, gm-008 (inputs reused as acceptance inputs here)
/// </summary>
[TestFixture]
internal class MarkerSettingsValidationTests
{
    /// <summary>
    /// PT9's localized user-facing error. Source:
    /// <c>Paratext/Checklists/MarkerSettingsForm.cs:39</c>, localization key
    /// <c>MarkerSettingsForm_1</c>. Captured as a byte-exact literal per VAL-002 and
    /// plan Decision 4 (localization is a UI-layer concern; the validator returns the
    /// English source string so the UI can localize via the message key).
    /// </summary>
    private const string Pt9ErrorMessage = "Equivalent markers need to be entered in the form: p/q";

    // =====================================================================
    // Happy-path scenarios — valid input returns Valid=true with parsed pairs
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("Contract", "ValidateMarkerSettings")]
    [Property("ScenarioId", "TS-VAL-002-01")]
    [Property("BehaviorId", "BHV-105")]
    [Property("ValidationRule", "VAL-002")]
    public void ValidateMarkerSettings_SinglePair_ReturnsValidWithOnePair()
    {
        // TS-VAL-002-01: Basic valid format "p/q" parses to one MarkerPair.
        var result = MarkersDataSource.ValidateMarkerSettings("p/q");

        Assert.That(result, Is.Not.Null);
        Assert.That(result.Valid, Is.True);
        Assert.That(result.ParsedPairs, Is.Not.Null);
        Assert.That(result.ParsedPairs, Has.Count.EqualTo(1));
        Assert.That(result.ParsedPairs![0].Marker1, Is.EqualTo("p"));
        Assert.That(result.ParsedPairs[0].Marker2, Is.EqualTo("q"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("Contract", "ValidateMarkerSettings")]
    [Property("ScenarioId", "TS-VAL-002-02")]
    [Property("BehaviorId", "BHV-105")]
    [Property("ValidationRule", "VAL-002")]
    public void ValidateMarkerSettings_MultiplePairs_ReturnsValidWithAllPairs()
    {
        // TS-VAL-002-02: "p/q q1/q2" parses to TWO pairs in source order.
        var result = MarkersDataSource.ValidateMarkerSettings("p/q q1/q2");

        Assert.That(result.Valid, Is.True);
        Assert.That(result.ParsedPairs, Is.Not.Null);
        Assert.That(result.ParsedPairs, Has.Count.EqualTo(2));
        Assert.That(result.ParsedPairs![0].Marker1, Is.EqualTo("p"));
        Assert.That(result.ParsedPairs[0].Marker2, Is.EqualTo("q"));
        Assert.That(result.ParsedPairs[1].Marker1, Is.EqualTo("q1"));
        Assert.That(result.ParsedPairs[1].Marker2, Is.EqualTo("q2"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("Contract", "ValidateMarkerSettings")]
    [Property("ScenarioId", "TS-VAL-002-07")]
    [Property("BehaviorId", "BHV-105")]
    [Property("ValidationRule", "VAL-002")]
    public void ValidateMarkerSettings_EmptyString_ReturnsValidWithEmptyPairs()
    {
        // TS-VAL-002-07: Empty string is VALID (no mappings configured). PT9
        // MarkerSettingsForm.btnOk_Click:32 skips the pair-validation loop when
        // equivalents=="" and proceeds to DialogResult.OK.
        var result = MarkersDataSource.ValidateMarkerSettings("");

        Assert.That(result.Valid, Is.True);
        Assert.That(result.ParsedPairs, Is.Not.Null, "§3.13: Valid=true ⇒ ParsedPairs populated");
        Assert.That(result.ParsedPairs, Is.Empty);
        Assert.That(result.ErrorMessage, Is.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("Contract", "ValidateMarkerSettings")]
    [Property("ScenarioId", "TS-VAL-002-07")]
    [Property("BehaviorId", "BHV-105")]
    [Property("ValidationRule", "VAL-002")]
    public void ValidateMarkerSettings_Null_ReturnsValidWithEmptyPairs()
    {
        // Derived from PT9 line 30: `string equivalents = EquivalentMarkers ?? "";`
        // Null coerces to empty, which then takes the valid-empty branch.
        var result = MarkersDataSource.ValidateMarkerSettings(null!);

        Assert.That(result.Valid, Is.True);
        Assert.That(result.ParsedPairs, Is.Not.Null);
        Assert.That(result.ParsedPairs, Is.Empty);
        Assert.That(result.ErrorMessage, Is.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("Contract", "ValidateMarkerSettings")]
    [Property("ScenarioId", "TS-VAL-002-07")]
    [Property("BehaviorId", "BHV-105")]
    [Property("ValidationRule", "VAL-002")]
    public void ValidateMarkerSettings_WhitespaceOnly_ReturnsValidWithEmptyPairs()
    {
        // Derived from PT9 line 31: `Regex.Replace(equivalents.Trim(), " +", " ");`
        // After trim+collapse, "   " becomes "", which takes the valid-empty branch.
        var result = MarkersDataSource.ValidateMarkerSettings("   ");

        Assert.That(result.Valid, Is.True);
        Assert.That(result.ParsedPairs, Is.Not.Null);
        Assert.That(result.ParsedPairs, Is.Empty);
        Assert.That(result.ErrorMessage, Is.Null);
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("Contract", "ValidateMarkerSettings")]
    [Property("ScenarioId", "TS-VAL-002-06")]
    [Property("BehaviorId", "BHV-105")]
    [Property("ValidationRule", "VAL-002")]
    public void ValidateMarkerSettings_MultipleSpacesBetweenPairs_NormalizesAndValidates()
    {
        // TS-VAL-002-06: Multiple spaces between pairs are collapsed (PT9
        // Regex.Replace(" +", " ")) before splitting. "p/q   q1/q2" ⇒ 2 pairs.
        var result = MarkersDataSource.ValidateMarkerSettings("p/q   q1/q2");

        Assert.That(result.Valid, Is.True);
        Assert.That(result.ParsedPairs, Is.Not.Null);
        Assert.That(result.ParsedPairs, Has.Count.EqualTo(2));
        Assert.That(result.ParsedPairs![0].Marker1, Is.EqualTo("p"));
        Assert.That(result.ParsedPairs[0].Marker2, Is.EqualTo("q"));
        Assert.That(result.ParsedPairs[1].Marker1, Is.EqualTo("q1"));
        Assert.That(result.ParsedPairs[1].Marker2, Is.EqualTo("q2"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("Contract", "ValidateMarkerSettings")]
    [Property("BehaviorId", "BHV-105")]
    [Property("ValidationRule", "VAL-002")]
    public void ValidateMarkerSettings_LeadingTrailingWhitespace_Trimmed()
    {
        // Derived from PT9 line 31: outer trim applied before pair-splitting.
        // "  p/q  " ⇒ valid, single pair (p, q).
        var result = MarkersDataSource.ValidateMarkerSettings("  p/q  ");

        Assert.That(result.Valid, Is.True);
        Assert.That(result.ParsedPairs, Is.Not.Null);
        Assert.That(result.ParsedPairs, Has.Count.EqualTo(1));
        Assert.That(result.ParsedPairs![0].Marker1, Is.EqualTo("p"));
        Assert.That(result.ParsedPairs[0].Marker2, Is.EqualTo("q"));
    }

    // =====================================================================
    // Error scenarios — malformed input returns Valid=false with PT9 error
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("Contract", "ValidateMarkerSettings")]
    [Property("ScenarioId", "TS-VAL-002-03")]
    [Property("BehaviorId", "BHV-105")]
    [Property("ValidationRule", "VAL-002")]
    public void ValidateMarkerSettings_SingleMarkerNoSlash_ReturnsInvalid()
    {
        // TS-VAL-002-03: "p" has zero slashes ⇒ Split('/').Length == 1 ≠ 2.
        var result = MarkersDataSource.ValidateMarkerSettings("p");

        Assert.That(result.Valid, Is.False);
        Assert.That(result.ErrorMessage, Is.EqualTo(Pt9ErrorMessage));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("Contract", "ValidateMarkerSettings")]
    [Property("ScenarioId", "TS-VAL-002-04")]
    [Property("BehaviorId", "BHV-105")]
    [Property("ValidationRule", "VAL-002")]
    public void ValidateMarkerSettings_TripleSlash_ReturnsInvalid()
    {
        // TS-VAL-002-04: "p/q/r" has two slashes ⇒ Split('/').Length == 3 ≠ 2.
        var result = MarkersDataSource.ValidateMarkerSettings("p/q/r");

        Assert.That(result.Valid, Is.False);
        Assert.That(result.ErrorMessage, Is.EqualTo(Pt9ErrorMessage));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("Contract", "ValidateMarkerSettings")]
    [Property("ScenarioId", "TS-VAL-002-05")]
    [Property("BehaviorId", "BHV-105")]
    [Property("ValidationRule", "VAL-002")]
    public void ValidateMarkerSettings_EmptyLeftSide_ReturnsInvalid()
    {
        // TS-VAL-002-05: "/q" has an empty left side ⇒ items[0].Trim().Length == 0.
        var result = MarkersDataSource.ValidateMarkerSettings("/q");

        Assert.That(result.Valid, Is.False);
        Assert.That(result.ErrorMessage, Is.EqualTo(Pt9ErrorMessage));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("Contract", "ValidateMarkerSettings")]
    [Property("BehaviorId", "BHV-105")]
    [Property("ValidationRule", "VAL-002")]
    public void ValidateMarkerSettings_EmptyRightSide_ReturnsInvalid()
    {
        // Symmetric to TS-VAL-002-05: "p/" has an empty right side.
        // PT9 line 37: items[1].Trim().Length == 0 triggers the alert.
        var result = MarkersDataSource.ValidateMarkerSettings("p/");

        Assert.That(result.Valid, Is.False);
        Assert.That(result.ErrorMessage, Is.EqualTo(Pt9ErrorMessage));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("Contract", "ValidateMarkerSettings")]
    [Property("BehaviorId", "BHV-105")]
    [Property("ValidationRule", "VAL-002")]
    public void ValidateMarkerSettings_BothSidesEmpty_ReturnsInvalid()
    {
        // Edge derived from VAL-002: "/" alone → both sides empty.
        var result = MarkersDataSource.ValidateMarkerSettings("/");

        Assert.That(result.Valid, Is.False);
        Assert.That(result.ErrorMessage, Is.EqualTo(Pt9ErrorMessage));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("Contract", "ValidateMarkerSettings")]
    [Property("BehaviorId", "BHV-105")]
    [Property("ValidationRule", "VAL-002")]
    public void ValidateMarkerSettings_WhitespaceOnlySides_ReturnsInvalid()
    {
        // VAL-002 requires BOTH sides non-empty **after trim**. PT9 line 37:
        // `items[0].Trim().Length == 0 || items[1].Trim().Length == 0`.
        // Note: " / " — after the outer Regex.Replace(" +", " ").Trim() this
        // becomes "/", but a pair like "a/ " inside a multi-pair string would
        // exercise the per-side trim. We test the clearer explicit case.
        var result = MarkersDataSource.ValidateMarkerSettings("p/q  a/ ");
        //                                                        ^^ second pair has
        //                                                 empty-after-trim right side

        Assert.That(result.Valid, Is.False);
        Assert.That(result.ErrorMessage, Is.EqualTo(Pt9ErrorMessage));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("Contract", "ValidateMarkerSettings")]
    [Property("BehaviorId", "BHV-105")]
    [Property("ValidationRule", "VAL-002")]
    public void ValidateMarkerSettings_MixedValidAndInvalid_FailsOnFirstInvalidPair()
    {
        // PT9 line 41 uses `return;` inside the foreach loop — on the FIRST invalid
        // pair, validation aborts with the error. This distinguishes CAP-007 (fail-
        // fast for UI) from CAP-002 InitializeMarkerMappings (silently skip, VAL-005).
        // Here "invalid" (no slash) causes the whole string to be rejected even
        // though "p/q" alone would pass.
        var result = MarkersDataSource.ValidateMarkerSettings("p/q invalid good/bad");

        Assert.That(result.Valid, Is.False);
        Assert.That(result.ErrorMessage, Is.EqualTo(Pt9ErrorMessage));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("Contract", "ValidateMarkerSettings")]
    [Property("ScenarioId", "TS-VAL-002-03")]
    [Property("BehaviorId", "BHV-105")]
    [Property("ValidationRule", "VAL-002")]
    public void ValidateMarkerSettings_Invalid_ErrorMessageMatchesPT9Exactly()
    {
        // VAL-002 / Plan Decision 4: byte-exact PT9 English literal. Any whitespace,
        // punctuation, or wording drift would break UI display and localization lookup
        // (the message key MarkerSettingsForm_1 is the localizer lookup key).
        var result = MarkersDataSource.ValidateMarkerSettings("p");

        Assert.That(
            result.ErrorMessage,
            Is.EqualTo("Equivalent markers need to be entered in the form: p/q"),
            "VAL-002: PT9 MarkerSettingsForm_1 literal must match byte-for-byte"
        );
    }

    // =====================================================================
    // §3.13 structural invariants — ParsedPairs ⊕ ErrorMessage (mutually exclusive)
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("Contract", "ValidateMarkerSettings")]
    [Property("BehaviorId", "BHV-105")]
    [Property("ValidationRule", "VAL-002")]
    [Property("InvariantId", "Section-3.13-mutex")]
    public void ValidateMarkerSettings_Invalid_ParsedPairsIsNull()
    {
        // §3.13: "When Valid is false, ErrorMessage is populated and ParsedPairs is
        // undefined." No partial-parse leakage — even if "p/q" parsed before
        // "invalid" failed, ParsedPairs must be null (not [p/q]).
        var result = MarkersDataSource.ValidateMarkerSettings("p/q invalid");

        Assert.That(result.Valid, Is.False);
        Assert.That(result.ParsedPairs, Is.Null, "§3.13: Valid=false ⇒ ParsedPairs null");
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("Contract", "ValidateMarkerSettings")]
    [Property("BehaviorId", "BHV-105")]
    [Property("ValidationRule", "VAL-002")]
    [Property("InvariantId", "Section-3.13-mutex")]
    public void ValidateMarkerSettings_Valid_ErrorMessageIsNull()
    {
        // §3.13: "When Valid is true, ParsedPairs is populated and ErrorMessage is
        // undefined." No leaking of stale or informational strings on success.
        var result = MarkersDataSource.ValidateMarkerSettings("p/q q1/q2");

        Assert.That(result.Valid, Is.True);
        Assert.That(result.ErrorMessage, Is.Null, "§3.13: Valid=true ⇒ ErrorMessage null");
    }

    // =====================================================================
    // Golden-master-derived scenarios — inputs used in PT9 capture harness runs
    // =====================================================================

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-007")]
    [Property("Contract", "ValidateMarkerSettings")]
    [Property("ScenarioId", "gm-007")]
    [Property("BehaviorId", "BHV-105")]
    [Property("ValidationRule", "VAL-002")]
    public void ValidateMarkerSettings_GoldenMaster_gm007_BidirectionalInputParsesToTwoPairs()
    {
        // gm-007 input: markerMapping="p/q q1/q2". The golden master captures
        // InitializeMarkerMappings' bidirectional dictionary output; CAP-007's
        // contract is instead to return the source pairs in order. The validator
        // must ACCEPT this input as valid — CAP-002 can then expand the two pairs
        // into the four-edge bidirectional dictionary.
        var result = MarkersDataSource.ValidateMarkerSettings("p/q q1/q2");

        Assert.That(result.Valid, Is.True, "gm-007 input must be valid");
        Assert.That(result.ParsedPairs, Has.Count.EqualTo(2));
        Assert.That(result.ParsedPairs![0], Is.EqualTo(new MarkerPair("p", "q")));
        Assert.That(result.ParsedPairs[1], Is.EqualTo(new MarkerPair("q1", "q2")));
    }

    [Test]
    [Category("GoldenMaster")]
    [Property("CapabilityId", "CAP-007")]
    [Property("Contract", "ValidateMarkerSettings")]
    [Property("ScenarioId", "gm-008")]
    [Property("BehaviorId", "BHV-105")]
    [Property("ValidationRule", "VAL-002")]
    public void ValidateMarkerSettings_GoldenMaster_gm008_AccumulatedPairsPreservedInOrder()
    {
        // gm-008 input: markerMapping="q/q1 q/q2" (same left-hand marker twice).
        // InitializeMarkerMappings accumulates [q1, q2] under "q"; the validator
        // preserves the two source pairs independently. Both are accepted as valid
        // (the same left-hand marker in two pairs is not a format violation).
        var result = MarkersDataSource.ValidateMarkerSettings("q/q1 q/q2");

        Assert.That(result.Valid, Is.True, "gm-008 input must be valid");
        Assert.That(result.ParsedPairs, Has.Count.EqualTo(2));
        Assert.That(result.ParsedPairs![0], Is.EqualTo(new MarkerPair("q", "q1")));
        Assert.That(result.ParsedPairs[1], Is.EqualTo(new MarkerPair("q", "q2")));
    }

    // =====================================================================
    // CAP-002 cross-reference — scenarios shared with InitializeMarkerMappings
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("Contract", "ValidateMarkerSettings")]
    [Property("ScenarioId", "TS-016")]
    [Property("BehaviorId", "BHV-105")]
    public void ValidateMarkerSettings_TS016_ParsesBidirectionalInputAsPairs()
    {
        // TS-016 (CAP-002 scenario reused): verifies that the validator treats
        // "p/q q1/q2" as TWO source pairs — it does not conflate or expand them.
        // Bidirectional storage (INV-005) is CAP-002's concern; CAP-007 only
        // parses and validates.
        var result = MarkersDataSource.ValidateMarkerSettings("p/q q1/q2");

        Assert.That(result.Valid, Is.True);
        Assert.That(result.ParsedPairs, Has.Count.EqualTo(2));
        Assert.That(result.ParsedPairs![0].Marker1, Is.EqualTo("p"));
        Assert.That(result.ParsedPairs[0].Marker2, Is.EqualTo("q"));
        Assert.That(result.ParsedPairs[1].Marker1, Is.EqualTo("q1"));
        Assert.That(result.ParsedPairs[1].Marker2, Is.EqualTo("q2"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("Contract", "ValidateMarkerSettings")]
    [Property("ScenarioId", "TS-017")]
    [Property("BehaviorId", "BHV-105")]
    public void ValidateMarkerSettings_TS017_AccumulatedPairsPreservedInOrder()
    {
        // TS-017 (CAP-002 scenario reused): "q/q1 q/q2" is two distinct pairs
        // sharing a left-hand marker. The validator keeps them as two pairs in
        // source order; the accumulation-into-a-list behavior is CAP-002's
        // InitializeMarkerMappings concern.
        var result = MarkersDataSource.ValidateMarkerSettings("q/q1 q/q2");

        Assert.That(result.Valid, Is.True);
        Assert.That(result.ParsedPairs, Has.Count.EqualTo(2));
        Assert.That(result.ParsedPairs![0].Marker1, Is.EqualTo("q"));
        Assert.That(result.ParsedPairs[0].Marker2, Is.EqualTo("q1"));
        Assert.That(result.ParsedPairs[1].Marker1, Is.EqualTo("q"));
        Assert.That(result.ParsedPairs[1].Marker2, Is.EqualTo("q2"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-007")]
    [Property("Contract", "ValidateMarkerSettings")]
    [Property("ScenarioId", "TS-018")]
    [Property("BehaviorId", "BHV-105")]
    [Property("ValidationRule", "VAL-002")]
    public void ValidateMarkerSettings_TS018_InvalidPairsRejectedNotSilentlySkipped()
    {
        // TS-018 (CAP-002 scenario reused, CONTRASTING contract): CAP-002's
        // InitializeMarkerMappings silently skips invalid pairs per VAL-005 to
        // preserve runtime robustness. CAP-007's ValidateMarkerSettings is the
        // user-facing pre-commit validation path (VAL-002) and REJECTS the same
        // input so the UI can keep the dialog open. This test pins the contract
        // divergence between the two entry points.
        var input = "p/q invalid p/q1/q2 good/bad";

        var result = MarkersDataSource.ValidateMarkerSettings(input);

        Assert.That(result.Valid, Is.False, "VAL-002 rejects 'invalid' (zero slashes)");
        Assert.That(result.ErrorMessage, Is.EqualTo(Pt9ErrorMessage));
    }

    // NOTE on scope: TS-019 and TS-072 concern the separate **markerFilter** input
    // (second PT9 form field: txtMarkerFilter). ValidateMarkerSettings does not
    // accept a filter parameter — filter parsing is already covered by CAP-002's
    // MarkersDataSourceTests. Including tests for those scenarios here would
    // duplicate coverage and blur CAP-007's single-responsibility boundary.
}
