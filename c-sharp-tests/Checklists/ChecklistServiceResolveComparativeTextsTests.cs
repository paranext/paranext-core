using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using Paranext.DataProvider.Checklists;
using Paratext.Data;
using PtxUtils;

namespace TestParanextDataProvider.Checklists;

/// <summary>
/// RED-phase contract and outer-acceptance tests for CAP-009
/// (<c>ChecklistService.ResolveComparativeTexts</c> — GUID-first / name-fallback /
/// active-project-exclusion resolution).
///
/// <para>
/// These tests will NOT compile until the implementer adds
/// <c>Paranext.DataProvider.Checklists.ChecklistService.ResolveComparativeTexts(
/// string activeProjectId, IReadOnlyList&lt;ComparativeTextRef&gt; requestedTexts,
/// CancellationToken ct)</c> AND the supporting output records
/// <c>ResolvedComparativeText</c> and <c>ResolvedComparativeTexts</c> (per
/// data-contracts.md §3.10 / §3.11). The compile error is the first layer of
/// the RED signal; the test-assertion failures (after a stub body lands)
/// are the second. Matches the CAP-006 / CAP-012 RED precedents.
/// </para>
///
/// <para>
/// Per strategic-plan-backend.md §CAP-009, this capability uses
/// <b>Outside-In TDD</b>: the outer acceptance test (<see
/// cref="ResolveComparativeTexts_MixedResolutionPaths_PreservesOrderAndCorrectlyFlagsAvailability"/>)
/// drives the full INV-014 contract; focused tests pin individual cases
/// (TS-047 name-fallback, TS-048 / PTX-23529 duplicate short names,
/// active-project exclusion).
/// </para>
///
/// <para>
/// <b>Real-infrastructure note.</b> Tests register <see
/// cref="DummyScrText"/> instances into the shared <see
/// cref="ScrTextCollection"/> via <c>DummyLocalParatextProjects.FakeAddProject</c>
/// — the SAME collection the production
/// <c>LocalParatextProjects.GetParatextProject</c> and the INV-014-named
/// <c>ScrTextCollection.FindById</c> / <c>ScrTextCollection.Find</c> APIs
/// consult. This is the established real-infrastructure pattern for this
/// codebase (see CAP-006 tests for precedent); it directly exercises the
/// production resolution APIs without on-disk USFM / Settings.xml scaffolding.
/// Trade-off documented in
/// <c>implementation/plans/test-writer-CAP-009.md</c>. An end-to-end pass
/// against real projects is covered by P3B.7 smoke tests.
/// </para>
///
/// <para>
/// <b>Signature note.</b> data-contracts.md §4.5 lists the async shape
/// <c>Task&lt;ResolvedComparativeTexts&gt; ResolveComparativeTextsAsync(...)</c>;
/// strategic-plan-backend.md §CAP-009 lists the synchronous
/// <c>ResolvedComparativeTexts ResolveComparativeTexts(...)</c>. These tests
/// follow the strategic-plan signature (matching the CAP-006 precedent);
/// if GREEN adopts the async shape the tests trivially adapt with
/// <c>await</c>. The compile-fail RED signal is robust to either choice.
/// </para>
///
/// Traceability:
///   - Capability: CAP-009
///   - Behaviors: BHV-310 (Comparative Texts button — backend resolution slice),
///     BHV-605 (settings-restoration resolution — primary)
///   - Invariants: INV-014 (GUID-first, name-fallback, self-exclusion)
///   - Scenarios: TS-047 (GUID not found → name fallback),
///     TS-048 / PTX-23529 (duplicate short names resolved by GUID)
///   - Contract: data-contracts.md §2.4 (ComparativeTextRef),
///     §3.10 (ResolvedComparativeText), §3.11 (ResolvedComparativeTexts),
///     §4.5 (ResolveComparativeTexts)
///   - PT9 source: Paratext/Checklists/ChecklistsTool.cs:132-148 (Initialize
///     comparative-text resolution slice)
/// </summary>
[TestFixture]
internal class ChecklistServiceResolveComparativeTextsTests : PapiTestBase
{
    // ---------------------------------------------------------------------
    // Shared helpers — reuse DummyScrText + FakeAddProject pattern.
    // ---------------------------------------------------------------------

    /// <summary>
    /// Registers a <see cref="DummyScrText"/> with a caller-chosen short-name
    /// (via <see cref="ProjectDetails.Name"/>) into the shared
    /// <see cref="ScrTextCollection"/> so <c>ScrTextCollection.FindById</c>
    /// and <c>ScrTextCollection.Find</c> can resolve it. DummyScrText
    /// appends the HexId to <c>projectName.ShortName</c> internally;
    /// <see cref="ScrText.Name"/> is the authoritative stored short-name and
    /// is the value <c>ScrTextCollection.Find</c> matches against.
    /// </summary>
    private DummyScrText RegisterProject(string shortName, out string storedName)
    {
        var details = CreateProjectDetails(HexId.CreateNew().ToString(), shortName);
        var scrText = new DummyScrText(details);
        ParatextProjects.FakeAddProject(details, scrText);
        storedName = scrText.Name;
        return scrText;
    }

    /// <summary>
    /// Convenience overload when the caller does not need the stored name
    /// (e.g. when the test references <c>scrText.Name</c> directly later).
    /// </summary>
    private DummyScrText RegisterProject(string shortName) => RegisterProject(shortName, out _);

    // =====================================================================
    // Group A — Outer Acceptance (Outside-In)
    //   The "done signal" — when this passes, the full INV-014 contract
    //   holds for mixed resolution paths, order preservation, and
    //   self-exclusion.
    // =====================================================================

    [Test]
    [Category("Integration")]
    [Property("CapabilityId", "CAP-009")]
    [Property("Contract", "ResolveComparativeTexts")]
    [Property("ScenarioId", "TS-047")]
    [Property("BehaviorId", "BHV-605")]
    [Property("Invariant", "INV-014")]
    public void ResolveComparativeTexts_MixedResolutionPaths_PreservesOrderAndCorrectlyFlagsAvailability()
    {
        // Arrange: register 4 projects in the shared ScrTextCollection.
        //   - active  : the "active" project (self-reference target)
        //   - alpha   : GUID-resolvable comparative
        //   - bravo   : name-resolvable comparative (invalid GUID in request)
        //   - charlie : NOT registered (unresolvable)
        //
        // Active project is intentionally registered LAST to rule out any
        // ordering bias in the implementation.
        DummyScrText alpha = RegisterProject("ALPHA");
        DummyScrText bravo = RegisterProject("BRAVO");
        // charlie is never registered — acts as the unresolvable entry.
        string charlieMissingGuid = HexId.CreateNew().ToString();
        DummyScrText active = RegisterProject("ACTIVE");

        var requestedTexts = new List<ComparativeTextRef>
        {
            // (1) ALPHA — valid GUID + valid name; should resolve via FindById.
            new(alpha.Guid.ToString(), alpha.Name),
            // (2) ACTIVE — GUID matches the active project; MUST be excluded.
            new(active.Guid.ToString(), active.Name),
            // (3) BRAVO — invalid GUID, but name matches a real project; FindById returns
            //     null, so fall back to Find(name).
            new(HexId.CreateNew().ToString(), bravo.Name),
            // (4) CHARLIE — neither GUID nor name resolves; Available=false.
            new(charlieMissingGuid, "CHARLIE_UNKNOWN"),
        };

        // Act
        ResolvedComparativeTexts result = ChecklistService.ResolveComparativeTexts(
            activeProjectId: active.Guid.ToString(),
            requestedTexts: requestedTexts,
            ct: CancellationToken.None
        );

        // Assert — INV-014 composite invariant holds.
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Texts, Is.Not.Null);

        // Active project entry dropped entirely; remaining 3 preserve input order.
        Assert.That(
            result.Texts.Count,
            Is.EqualTo(3),
            "INV-014 — active project must be excluded; unresolvable entries remain with Available=false"
        );

        // (1) ALPHA — resolved by GUID.
        ResolvedComparativeText r0 = result.Texts[0];
        Assert.That(r0.Id, Is.EqualTo(alpha.Guid.ToString()), "entry 0 Id preserved");
        Assert.That(r0.Available, Is.True, "ALPHA must be Available (GUID resolved)");

        // (2) BRAVO — resolved by name after GUID miss.
        ResolvedComparativeText r1 = result.Texts[1];
        Assert.That(r1.Available, Is.True, "BRAVO must be Available (name fallback)");
        Assert.That(
            r1.Name,
            Is.EqualTo(bravo.Name),
            "BRAVO Name matches the resolved ScrText's Name"
        );

        // (3) CHARLIE — neither GUID nor name matches anything.
        ResolvedComparativeText r2 = result.Texts[2];
        Assert.That(r2.Available, Is.False, "CHARLIE cannot be resolved → Available=false");
        Assert.That(
            r2.Id,
            Is.EqualTo(charlieMissingGuid),
            "CHARLIE Id preserved verbatim (no silent rewrite)"
        );
        Assert.That(
            r2.Name,
            Is.EqualTo("CHARLIE_UNKNOWN"),
            "CHARLIE Name preserved verbatim (no silent rewrite)"
        );
    }

    // =====================================================================
    // Group B — GUID resolution (INV-014 "GUID-first")
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("Contract", "ResolveComparativeTexts")]
    [Property("BehaviorId", "BHV-605")]
    [Property("Invariant", "INV-014")]
    public void ResolveComparativeTexts_ValidGuid_ResolvesByFindById()
    {
        // Arrange
        DummyScrText active = RegisterProject("ACTIVE_P");
        DummyScrText target = RegisterProject("TARGET_P");

        var requestedTexts = new List<ComparativeTextRef>
        {
            new(target.Guid.ToString(), target.Name),
        };

        // Act
        ResolvedComparativeTexts result = ChecklistService.ResolveComparativeTexts(
            activeProjectId: active.Guid.ToString(),
            requestedTexts: requestedTexts,
            ct: CancellationToken.None
        );

        // Assert
        Assert.That(result.Texts.Count, Is.EqualTo(1));
        ResolvedComparativeText entry = result.Texts[0];
        Assert.That(entry.Available, Is.True);
        Assert.That(entry.Id, Is.EqualTo(target.Guid.ToString()));
        Assert.That(entry.Name, Is.EqualTo(target.Name));
        // FullName mirrors the resolved ScrText's FullName (data-contracts.md §3.10
        // — FullName = human-readable project full name). Observe, don't pin a
        // hard-coded value; the DummyScrText's FullName is populated by its
        // ProjectSettings ctor to "Test ScrText" but we compare against the
        // ScrText itself to remain observational.
        Assert.That(
            entry.FullName,
            Is.EqualTo(target.FullName),
            "FullName must mirror the resolved ScrText.FullName (data-contracts.md §3.10)"
        );
    }

    // =====================================================================
    // Group C — Name fallback (INV-014 "name-fallback" when GUID miss)
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("Contract", "ResolveComparativeTexts")]
    [Property("ScenarioId", "TS-047")]
    [Property("BehaviorId", "BHV-605")]
    [Property("Invariant", "INV-014")]
    public void ResolveComparativeTexts_InvalidGuidValidName_FallsBackToFindByName()
    {
        // TS-047: ComparativeTextIds contains an invalid GUID; ComparativeTextNames
        // resolves it. PT9 source: ChecklistsTool.cs:132-148.
        //
        // In the PT10 contract (§2.4), a SINGLE ComparativeTextRef carries both
        // fields — if FindById returns null, the implementation must try
        // Find(Name).
        DummyScrText active = RegisterProject("ACTIVE_Q");
        DummyScrText bravo = RegisterProject("BRAVO_NAMED");

        string invalidGuid = HexId.CreateNew().ToString();
        var requestedTexts = new List<ComparativeTextRef> { new(invalidGuid, bravo.Name) };

        // Act
        ResolvedComparativeTexts result = ChecklistService.ResolveComparativeTexts(
            activeProjectId: active.Guid.ToString(),
            requestedTexts: requestedTexts,
            ct: CancellationToken.None
        );

        // Assert
        Assert.That(result.Texts.Count, Is.EqualTo(1));
        ResolvedComparativeText entry = result.Texts[0];
        Assert.That(
            entry.Available,
            Is.True,
            "TS-047 — invalid GUID must fall back to name-based resolution"
        );
        // Per data-contracts.md §3.10 validation rule: "Id preserves the
        // originally-requested GUID even when resolution fell back to name."
        Assert.That(
            entry.Id,
            Is.EqualTo(invalidGuid),
            "Id preserves the originally-requested (invalid) GUID per §3.10"
        );
        Assert.That(entry.Name, Is.EqualTo(bravo.Name));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("Contract", "ResolveComparativeTexts")]
    [Property("BehaviorId", "BHV-605")]
    [Property("Invariant", "INV-014")]
    public void ResolveComparativeTexts_InvalidGuidInvalidName_MarkedUnavailable()
    {
        // Neither FindById nor Find(Name) turns up a project.
        // Per data-contracts.md §3.11 validation rule: "Unresolvable entries
        // appear with available=false rather than being omitted."
        DummyScrText active = RegisterProject("ACTIVE_R");

        string missingGuid = HexId.CreateNew().ToString();
        const string missingName = "DOES_NOT_EXIST";
        var requestedTexts = new List<ComparativeTextRef> { new(missingGuid, missingName) };

        // Act
        ResolvedComparativeTexts result = ChecklistService.ResolveComparativeTexts(
            activeProjectId: active.Guid.ToString(),
            requestedTexts: requestedTexts,
            ct: CancellationToken.None
        );

        // Assert
        Assert.That(result.Texts.Count, Is.EqualTo(1), "unresolvable entry retained");
        ResolvedComparativeText entry = result.Texts[0];
        Assert.That(entry.Available, Is.False);
        Assert.That(entry.Id, Is.EqualTo(missingGuid));
        Assert.That(entry.Name, Is.EqualTo(missingName));
    }

    // =====================================================================
    // Group D — Self-exclusion (INV-014 "active project excluded")
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("Contract", "ResolveComparativeTexts")]
    [Property("BehaviorId", "BHV-605")]
    [Property("Invariant", "INV-014")]
    public void ResolveComparativeTexts_ComparativeRefIsActiveProjectGuid_Excluded()
    {
        // INV-014: active project is excluded from the resolved list. PT9
        // pattern: `Where(p => p != null && p != scrText).ToList()`.
        DummyScrText active = RegisterProject("ACTIVE_S");
        DummyScrText other = RegisterProject("OTHER_S");

        var requestedTexts = new List<ComparativeTextRef>
        {
            // Active project referenced by its GUID — MUST be filtered out.
            new(active.Guid.ToString(), active.Name),
            // A real comparative target so we can assert the result length.
            new(other.Guid.ToString(), other.Name),
        };

        // Act
        ResolvedComparativeTexts result = ChecklistService.ResolveComparativeTexts(
            activeProjectId: active.Guid.ToString(),
            requestedTexts: requestedTexts,
            ct: CancellationToken.None
        );

        // Assert — only OTHER_S survives.
        Assert.That(
            result.Texts.Count,
            Is.EqualTo(1),
            "INV-014 — active-project self-reference must be excluded from results"
        );
        Assert.That(
            result.Texts.Any(t => t.Id == active.Guid.ToString()),
            Is.False,
            "no result entry may carry the active project's GUID (INV-014)"
        );
        Assert.That(result.Texts[0].Id, Is.EqualTo(other.Guid.ToString()));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("Contract", "ResolveComparativeTexts")]
    [Property("BehaviorId", "BHV-605")]
    [Property("Invariant", "INV-014")]
    public void ResolveComparativeTexts_ComparativeRefIsActiveProjectByName_Excluded()
    {
        // Even when reached via name-fallback (invalid GUID), a resolved
        // reference that IS the active project must still be excluded.
        DummyScrText active = RegisterProject("ACTIVE_T");
        DummyScrText other = RegisterProject("OTHER_T");

        string bogusGuid = HexId.CreateNew().ToString();
        var requestedTexts = new List<ComparativeTextRef>
        {
            // Bogus GUID forces name-fallback; the name resolves to the active
            // project. Result must still exclude it.
            new(bogusGuid, active.Name),
            new(other.Guid.ToString(), other.Name),
        };

        // Act
        ResolvedComparativeTexts result = ChecklistService.ResolveComparativeTexts(
            activeProjectId: active.Guid.ToString(),
            requestedTexts: requestedTexts,
            ct: CancellationToken.None
        );

        // Assert — only OTHER_T survives; the self-referencing entry (reached
        // via name-fallback) is excluded.
        Assert.That(
            result.Texts.Count,
            Is.EqualTo(1),
            "INV-014 — self-reference detected via name-fallback must be excluded"
        );
        Assert.That(result.Texts[0].Name, Is.EqualTo(other.Name));
    }

    // =====================================================================
    // Group E — Duplicate short names (TS-048 / PTX-23529)
    //   GUID-first must win over name-based ambiguity.
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("Contract", "ResolveComparativeTexts")]
    [Property("ScenarioId", "TS-048")]
    [Property("BehaviorId", "BHV-605")]
    [Property("Invariant", "INV-014")]
    public void ResolveComparativeTexts_DuplicateShortName_ResolvedByGuidNotName()
    {
        // TS-048 / PTX-23529: two registered projects share the same short
        // name ("CEVUK" in the source scenario). A comparative-text request
        // carrying a specific GUID must resolve to THAT SPECIFIC GUID's
        // project, not to whichever one Find(shortName) happens to return.
        //
        // NOTE: DummyScrText appends a HexId to the ShortName internally, so
        // the two instances won't have LITERALLY identical Name values. We
        // register them and request resolution by GUID; the assertion is
        // that the resolved entry carries the TARGETED GUID — if the
        // implementation had short-circuited to Find(Name), it might have
        // returned EITHER project.
        //
        // To make the short-name collision realistic, we also confirm the
        // requested ComparativeTextRef's Name is a substring shared between
        // both registered projects' Names (the ShortName we passed to
        // CreateProjectDetails).
        const string sharedShortName = "CEVUK";
        DummyScrText active = RegisterProject("ACTIVE_U");
        DummyScrText projectCevuk = RegisterProject(sharedShortName);
        DummyScrText resourceCevuk = RegisterProject(sharedShortName);

        // Precondition sanity: both registered projects share the same
        // ShortName prefix — this is the PTX-23529 scenario.
        Assume.That(
            projectCevuk.Name.StartsWith(sharedShortName, StringComparison.Ordinal),
            "precondition — project CEVUK stored Name starts with the shared short name"
        );
        Assume.That(
            resourceCevuk.Name.StartsWith(sharedShortName, StringComparison.Ordinal),
            "precondition — resource CEVUK stored Name starts with the shared short name"
        );

        // The request targets the RESOURCE by GUID.
        var requestedTexts = new List<ComparativeTextRef>
        {
            new(resourceCevuk.Guid.ToString(), sharedShortName),
        };

        // Act
        ResolvedComparativeTexts result = ChecklistService.ResolveComparativeTexts(
            activeProjectId: active.Guid.ToString(),
            requestedTexts: requestedTexts,
            ct: CancellationToken.None
        );

        // Assert — resolution returned the RESOURCE CEVUK (by GUID),
        // not whichever project happens to come up first on short-name lookup.
        Assert.That(result.Texts.Count, Is.EqualTo(1));
        ResolvedComparativeText entry = result.Texts[0];
        Assert.That(
            entry.Available,
            Is.True,
            "TS-048 — GUID-based resolution must succeed even with duplicate short names"
        );
        Assert.That(
            entry.Name,
            Is.EqualTo(resourceCevuk.Name),
            "TS-048 — resolved Name mirrors the GUID-targeted ScrText, not the other same-short-name entry"
        );
        Assert.That(
            entry.FullName,
            Is.EqualTo(resourceCevuk.FullName),
            "TS-048 — resolved FullName mirrors the GUID-targeted ScrText"
        );
    }

    // =====================================================================
    // Group F — Input order preservation (data-contracts.md §3.11 validation rule)
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("Contract", "ResolveComparativeTexts")]
    [Property("BehaviorId", "BHV-605")]
    public void ResolveComparativeTexts_PreservesInputOrder()
    {
        // Data-contracts.md §3.11: "Texts preserves the order of the input
        // requestedTexts argument (minus the active project)."
        DummyScrText active = RegisterProject("ACTIVE_V");
        DummyScrText projA = RegisterProject("AAAA");
        DummyScrText projB = RegisterProject("BBBB");
        DummyScrText projC = RegisterProject("CCCC");

        // Deliberately request them in REVERSE alphabetic order so an
        // alphabetic-sort implementation bug would surface.
        var requestedTexts = new List<ComparativeTextRef>
        {
            new(projC.Guid.ToString(), projC.Name),
            new(projA.Guid.ToString(), projA.Name),
            new(projB.Guid.ToString(), projB.Name),
        };

        // Act
        ResolvedComparativeTexts result = ChecklistService.ResolveComparativeTexts(
            activeProjectId: active.Guid.ToString(),
            requestedTexts: requestedTexts,
            ct: CancellationToken.None
        );

        // Assert — order preserved exactly.
        Assert.That(result.Texts.Count, Is.EqualTo(3));
        Assert.That(result.Texts[0].Id, Is.EqualTo(projC.Guid.ToString()));
        Assert.That(result.Texts[1].Id, Is.EqualTo(projA.Guid.ToString()));
        Assert.That(result.Texts[2].Id, Is.EqualTo(projB.Guid.ToString()));
    }

    // =====================================================================
    // Group G — Edge cases
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("Contract", "ResolveComparativeTexts")]
    [Property("BehaviorId", "BHV-605")]
    public void ResolveComparativeTexts_EmptyRequest_ReturnsEmptyList()
    {
        DummyScrText active = RegisterProject("ACTIVE_W");

        // Act
        ResolvedComparativeTexts result = ChecklistService.ResolveComparativeTexts(
            activeProjectId: active.Guid.ToString(),
            requestedTexts: Array.Empty<ComparativeTextRef>(),
            ct: CancellationToken.None
        );

        // Assert
        Assert.That(result, Is.Not.Null);
        Assert.That(result.Texts, Is.Not.Null);
        Assert.That(result.Texts.Count, Is.EqualTo(0));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("Contract", "ResolveComparativeTexts")]
    [Property("BehaviorId", "BHV-605")]
    public void ResolveComparativeTexts_ActiveProjectIdNotFound_ThrowsStructuredError()
    {
        // Per data-contracts.md §4.5 Error Conditions:
        //   "Active project ID does not resolve → PROJECT_NOT_FOUND"
        //
        // This test pins the OBSERVABLE fact that an unregistered active
        // project ID does not silently return an (arbitrary) empty result —
        // it surfaces an error. The specific exception type is left to GREEN
        // (data-contracts.md names an error CODE, not a specific exception
        // class), matching the CAP-006 precedent for analogous error paths
        // (see BuildChecklistData TS-070 treatment).
        string unregisteredActiveProjectId = HexId.CreateNew().ToString();
        var requestedTexts = new List<ComparativeTextRef>
        {
            new(HexId.CreateNew().ToString(), "ANY"),
        };

        // Act + Assert — the method throws. Test does NOT pin exception type
        // or message (would be implementation-mirroring); it pins the
        // observable behavior that resolution fails loudly.
        //
        // False-green guard: explicitly exclude NotImplementedException so
        // the RED stub (which throws NIE) cannot satisfy this assertion —
        // same tightening applied to CAP-006's equivalent error-path test
        // (see git commit 90facbea0e false-green audit note).
        //
        // Pattern: catch-then-assert (matches CAP-006
        // BuildChecklistData_ProjectIdNotRegistered_SurfacesResolutionError).
        // An earlier revision used the fluent form
        // `Throws.Exception.And.Not.InstanceOf<NIE>()` but that NUnit 4.x
        // fluent composition throws "Stack empty" at constraint-resolve time
        // when a non-NIE exception is actually thrown — so we fall back to
        // the canonical try/catch + two Assert.That calls.
        Exception? caught = null;
        try
        {
            ChecklistService.ResolveComparativeTexts(
                activeProjectId: unregisteredActiveProjectId,
                requestedTexts: requestedTexts,
                ct: CancellationToken.None
            );
        }
        catch (Exception ex)
        {
            caught = ex;
        }

        Assert.That(
            caught,
            Is.Not.Null,
            "§4.5 Error Conditions — missing active project must surface as an error"
        );
        Assert.That(
            caught,
            Is.Not.InstanceOf<NotImplementedException>(),
            "§4.5 Error Conditions — NotImplementedException is a RED-stub artifact, not the expected resolution error"
        );
    }
}
