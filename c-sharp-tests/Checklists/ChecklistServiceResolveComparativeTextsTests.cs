using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using Paranext.DataProvider.Checklists;
using Paratext.Data;
using PtxUtils;

namespace TestParanextDataProvider.Checklists;

/// <summary>
/// Contract and outer-acceptance tests for CAP-009
/// (<c>ChecklistService.ResolveComparativeTexts</c> — GUID-only resolution
/// with active-project exclusion).
///
/// <para>
/// Per strategic-plan-backend.md §CAP-009, this capability uses
/// <b>Outside-In TDD</b>: the outer acceptance test
/// (<see cref="ResolveComparativeTexts_MixedAvailability_PreservesOrderAndCorrectlyFlagsAvailability"/>)
/// drives the full INV-014 contract; focused tests pin individual cases
/// (TS-048 / PTX-23529 duplicate short names resolved by GUID,
/// active-project exclusion).
/// </para>
///
/// <para>
/// <b>Real-infrastructure note.</b> Tests register <see cref="DummyScrText"/>
/// instances into the shared <see cref="ScrTextCollection"/> via
/// <c>DummyLocalParatextProjects.FakeAddProject</c> — the SAME collection the
/// production <c>LocalParatextProjects.GetParatextProject</c> and the
/// <c>ScrTextCollection.FindById</c> API consult. This is the established
/// real-infrastructure pattern for this codebase (see CAP-006 tests for
/// precedent); it directly exercises the production resolution APIs without
/// on-disk USFM / Settings.xml scaffolding. An end-to-end pass against real
/// projects is covered by P3B.7 smoke tests.
/// </para>
///
/// <para>
/// <b>Signature note.</b> data-contracts.md §4.5 lists the async shape
/// <c>Task&lt;ResolvedComparativeTexts&gt; ResolveComparativeTextsAsync(...)</c>;
/// strategic-plan-backend.md §CAP-009 lists the synchronous
/// <c>ResolvedComparativeTexts ResolveComparativeTexts(...)</c>. These tests
/// follow the strategic-plan signature (matching the CAP-006 precedent).
/// </para>
///
/// <para>
/// <b>Resolution history.</b> An earlier shape paired Id with a Name field so
/// PT9's name-fallback resolver could be carried forward. PT10 is greenfield —
/// every project has a canonical GUID — so the Name fallback was dropped (PR
/// #2254 review, TJ Couch). Tests that exercised the name-fallback path
/// (legacy TS-047 / name-based self-exclusion) were removed; the structural
/// guarantees (GUID-first, order preservation, self-exclusion, retain-with-
/// unavailable) are still covered.
/// </para>
///
/// Traceability:
///   - Capability: CAP-009
///   - Behaviors: BHV-310 (Comparative Texts button — backend resolution slice),
///     BHV-605 (settings-restoration resolution — primary)
///   - Invariants: INV-014 (GUID resolution + self-exclusion)
///   - Scenarios: TS-048 / PTX-23529 (duplicate short names resolved by GUID)
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
    /// can resolve it.
    /// </summary>
    private DummyScrText RegisterProject(string shortName)
    {
        var details = CreateProjectDetails(HexId.CreateNew().ToString(), shortName);
        var scrText = new DummyScrText(details);
        ParatextProjects.FakeAddProject(details, scrText);
        return scrText;
    }

    // =====================================================================
    // Group A — Outer Acceptance (Outside-In)
    //   The "done signal" — when this passes, the full INV-014 contract
    //   holds for GUID resolution, order preservation, and self-exclusion.
    // =====================================================================

    [Test]
    [Category("Integration")]
    [Property("CapabilityId", "CAP-009")]
    [Property("Contract", "ResolveComparativeTexts")]
    [Property("BehaviorId", "BHV-605")]
    [Property("Invariant", "INV-014")]
    public void ResolveComparativeTexts_MixedAvailability_PreservesOrderAndCorrectlyFlagsAvailability()
    {
        // Arrange: register 3 projects in the shared ScrTextCollection.
        //   - active  : the "active" project (self-reference target)
        //   - alpha   : GUID-resolvable comparative
        //   - charlie : NOT registered (unresolvable; entry retained with Available=false)
        //
        // Active project is intentionally registered LAST to rule out any
        // ordering bias in the implementation.
        DummyScrText alpha = RegisterProject("ALPHA");
        // charlie is never registered — acts as the unresolvable entry.
        string charlieMissingGuid = HexId.CreateNew().ToString();
        DummyScrText active = RegisterProject("ACTIVE");

        var requestedTexts = new List<ComparativeTextRef>
        {
            // (1) ALPHA — valid GUID; should resolve via FindById.
            new(alpha.Guid.ToString()),
            // (2) ACTIVE — GUID matches the active project; MUST be excluded.
            new(active.Guid.ToString()),
            // (3) CHARLIE — GUID does not resolve; Available=false.
            new(charlieMissingGuid),
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

        // Active project entry dropped entirely; remaining 2 preserve input order.
        Assert.That(
            result.Texts.Count,
            Is.EqualTo(2),
            "INV-014 — active project must be excluded; unresolvable entries remain with Available=false"
        );

        // (1) ALPHA — resolved by GUID.
        ResolvedComparativeText r0 = result.Texts[0];
        Assert.That(r0.Id, Is.EqualTo(alpha.Guid.ToString()), "entry 0 Id preserved");
        Assert.That(r0.Available, Is.True, "ALPHA must be Available (GUID resolved)");
        Assert.That(r0.Name, Is.EqualTo(alpha.Name), "ALPHA Name mirrors the resolved ScrText");

        // (2) CHARLIE — GUID does not resolve.
        ResolvedComparativeText r1 = result.Texts[1];
        Assert.That(r1.Available, Is.False, "CHARLIE cannot be resolved → Available=false");
        Assert.That(
            r1.Id,
            Is.EqualTo(charlieMissingGuid),
            "CHARLIE Id preserved verbatim (no silent rewrite)"
        );
        Assert.That(
            r1.Name,
            Is.EqualTo(string.Empty),
            "CHARLIE Name is empty when GUID does not resolve (no source of truth)"
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

        var requestedTexts = new List<ComparativeTextRef> { new(target.Guid.ToString()) };

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
    // Group C — Unresolvable GUID (data-contracts.md §3.11 — retain with Available=false)
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("Contract", "ResolveComparativeTexts")]
    [Property("BehaviorId", "BHV-605")]
    [Property("Invariant", "INV-014")]
    public void ResolveComparativeTexts_UnresolvableGuid_MarkedUnavailable()
    {
        // Per data-contracts.md §3.11 validation rule: "Unresolvable entries
        // appear with available=false rather than being omitted."
        DummyScrText active = RegisterProject("ACTIVE_R");

        string missingGuid = HexId.CreateNew().ToString();
        var requestedTexts = new List<ComparativeTextRef> { new(missingGuid) };

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
        Assert.That(entry.Name, Is.EqualTo(string.Empty));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("Contract", "ResolveComparativeTexts")]
    [Property("BehaviorId", "BHV-605")]
    [Property("Invariant", "INV-014")]
    public void ResolveComparativeTexts_MalformedGuid_MarkedUnavailable()
    {
        // HexId.FromStrSafe returns null on malformed input. The resolver must
        // treat that the same as a well-formed-but-not-found GUID: retained
        // with Available=false, no exception.
        DummyScrText active = RegisterProject("ACTIVE_M");

        const string malformedGuid = "not-a-valid-hex-id";
        var requestedTexts = new List<ComparativeTextRef> { new(malformedGuid) };

        // Act
        ResolvedComparativeTexts result = ChecklistService.ResolveComparativeTexts(
            activeProjectId: active.Guid.ToString(),
            requestedTexts: requestedTexts,
            ct: CancellationToken.None
        );

        // Assert
        Assert.That(result.Texts.Count, Is.EqualTo(1), "malformed-GUID entry retained");
        ResolvedComparativeText entry = result.Texts[0];
        Assert.That(entry.Available, Is.False);
        Assert.That(
            entry.Id,
            Is.EqualTo(malformedGuid),
            "Id preserved verbatim (no silent rewrite, even for malformed input)"
        );
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
            new(active.Guid.ToString()),
            // A real comparative target so we can assert the result length.
            new(other.Guid.ToString()),
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

    // =====================================================================
    // Group E — Duplicate short names (TS-048 / PTX-23529)
    //   GUID-based resolution disambiguates projects that happen to share
    //   the same short name.
    // =====================================================================

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-009")]
    [Property("Contract", "ResolveComparativeTexts")]
    [Property("ScenarioId", "TS-048")]
    [Property("BehaviorId", "BHV-605")]
    [Property("Invariant", "INV-014")]
    public void ResolveComparativeTexts_DuplicateShortName_ResolvedByGuid()
    {
        // TS-048 / PTX-23529: two registered projects share the same short
        // name ("CEVUK" in the source scenario). A comparative-text request
        // carrying a specific GUID must resolve to THAT SPECIFIC GUID's
        // project, not to whichever one a short-name lookup happens to return.
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
        var requestedTexts = new List<ComparativeTextRef> { new(resourceCevuk.Guid.ToString()) };

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
            new(projC.Guid.ToString()),
            new(projA.Guid.ToString()),
            new(projB.Guid.ToString()),
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
        var requestedTexts = new List<ComparativeTextRef> { new(HexId.CreateNew().ToString()) };

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
        Assert.That(
            caught!.Message,
            Does.Contain(unregisteredActiveProjectId),
            "§4.5 Error Conditions — the exception message must reference the invalid "
                + "activeProjectId so the failure is self-diagnosing."
        );
    }
}
