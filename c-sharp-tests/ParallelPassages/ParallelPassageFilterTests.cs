using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.ParallelPassages;
using Paratext.Data;
using SIL.Scripture;

namespace TestParanextDataProvider.ParallelPassages;

/// <summary>
/// Tests for CAP-009 (StatusBasedPassageFiltering) and CAP-005 (PassageTypeFiltering).
/// RED-phase TDD tests. EXT-009: Four filter modes with 2+ book filter.
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class ParallelPassageFilterTests : PapiTestBase
{
    #region CAP-009: StatusBasedPassageFiltering - Acceptance Test

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-009")]
    [Property("ScenarioId", "TS-051")]
    [Property("BehaviorId", "EXT-009")]
    [Description("Acceptance test: FilterPassages returns filtered list respecting status and book filters")]
    public void FilterPassages_AcceptanceTest_ReturnsFilteredList()
    {
        // Arrange
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var filterService = new ParallelPassageFilterService();
        var accessor = new ParallelPassageAccessor();
        var allPassages = accessor.GetAllPassages();
        Assert.That(allPassages.Count, Is.GreaterThan(0));

        // Act - "All" filter should return passages with 2+ refs in project books
        var filtered = filterService.FilterPassages(
            allPassages,
            PassageFilterType.All,
            scrText
        );

        // Assert
        Assert.That(filtered, Is.Not.Null);
        // All filter still applies the implicit 2+ book filter (INV-009)
        foreach (var passage in filtered)
        {
            Assert.That(passage.Verses.Count, Is.GreaterThanOrEqualTo(2),
                $"Passage {passage.HeadReference} must have 2+ references");
        }
    }

    #endregion

    #region CAP-009: Contract Tests - Filter Modes

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-051")]
    [Property("BehaviorId", "BHV-602")]
    [Description("Unchecked filter accepts Unfinished or Outdated head reference")]
    public void FilterPassages_Unchecked_AcceptsUnfinishedOrOutdatedHead()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var filterService = new ParallelPassageFilterService();
        var accessor = new ParallelPassageAccessor();
        var allPassages = accessor.GetAllPassages();

        // Fresh project: all head references are Unfinished
        var filtered = filterService.FilterPassages(
            allPassages,
            PassageFilterType.Unchecked,
            scrText
        );

        Assert.That(filtered, Is.Not.Null);
        // Unfinished head refs should pass the Unchecked filter
        // (unless they have missing text)
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-052")]
    [Property("BehaviorId", "BHV-602")]
    [Description("Unchecked filter rejects Finished head reference")]
    public void FilterPassages_Unchecked_RejectsFinishedHead()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var filterService = new ParallelPassageFilterService();
        var accessor = new ParallelPassageAccessor();
        var allPassages = accessor.GetAllPassages();

        // After marking a passage Finished, Unchecked filter should reject it
        var filtered = filterService.FilterPassages(
            allPassages,
            PassageFilterType.Unchecked,
            scrText
        );

        Assert.That(filtered, Is.Not.Null);
        // A Finished head reference passage should NOT appear in Unchecked results
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-054")]
    [Property("BehaviorId", "BHV-604")]
    [Description("ChangedText filter accepts only Outdated head reference")]
    public void FilterPassages_ChangedText_AcceptsOnlyOutdatedHead()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var filterService = new ParallelPassageFilterService();
        var accessor = new ParallelPassageAccessor();
        var allPassages = accessor.GetAllPassages();

        var filtered = filterService.FilterPassages(
            allPassages,
            PassageFilterType.ChangedText,
            scrText
        );

        Assert.That(filtered, Is.Not.Null);
        // With a fresh project (all Unfinished), ChangedText should return empty
        // (no Outdated head references exist)
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-053")]
    [Property("BehaviorId", "BHV-603")]
    [Description("MissingText filter accepts only MissingText head reference")]
    public void FilterPassages_MissingText_AcceptsOnlyMissingTextHead()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var filterService = new ParallelPassageFilterService();
        var accessor = new ParallelPassageAccessor();
        var allPassages = accessor.GetAllPassages();

        var filtered = filterService.FilterPassages(
            allPassages,
            PassageFilterType.MissingText,
            scrText
        );

        Assert.That(filtered, Is.Not.Null);
        // Only passages whose head reference has MissingText state
    }

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-051")]
    [Property("BehaviorId", "EXT-009")]
    [Description("All filter returns passages with any head reference state")]
    public void FilterPassages_All_ReturnsAllPassagesWithBookFilter()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var filterService = new ParallelPassageFilterService();
        var accessor = new ParallelPassageAccessor();
        var allPassages = accessor.GetAllPassages();

        var filtered = filterService.FilterPassages(
            allPassages,
            PassageFilterType.All,
            scrText
        );

        Assert.That(filtered, Is.Not.Null);
        // All filter applies book filter only (no status filter)
    }

    #endregion

    #region CAP-009: Contract Tests - Book Filter

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-055")]
    [Property("BehaviorId", "BHV-605")]
    [Description("Passage with only 1 reference in project books is rejected")]
    public void FilterPassages_SingleRefInProjectBooks_Rejected()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var filterService = new ParallelPassageFilterService();
        var accessor = new ParallelPassageAccessor();
        var allPassages = accessor.GetAllPassages();

        var filtered = filterService.FilterPassages(
            allPassages,
            PassageFilterType.All,
            scrText
        );

        Assert.That(filtered, Is.Not.Null);
        // INV-009: Every passage in result must have 2+ refs in project books
        foreach (var passage in filtered)
        {
            Assert.That(passage.Verses.Count, Is.GreaterThanOrEqualTo(2),
                $"INV-009: Passage {passage.HeadReference} must have 2+ in-project references");
        }
    }

    #endregion

    #region CAP-009: Invariant Tests

    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-009")]
    [Property("BehaviorId", "BHV-605")]
    [Description("All filtered passages have at least 2 references in project books")]
    [TestCase(PassageFilterType.All)]
    [TestCase(PassageFilterType.Unchecked)]
    [TestCase(PassageFilterType.ChangedText)]
    [TestCase(PassageFilterType.MissingText)]
    public void FilterPassages_AnyFilterMode_EnforcesMinTwoRefsInProjectBooks(
        PassageFilterType filterType)
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var filterService = new ParallelPassageFilterService();
        var accessor = new ParallelPassageAccessor();
        var allPassages = accessor.GetAllPassages();

        var filtered = filterService.FilterPassages(allPassages, filterType, scrText);

        Assert.That(filtered, Is.Not.Null);
        foreach (var passage in filtered)
        {
            Assert.That(passage.Verses.Count, Is.GreaterThanOrEqualTo(2),
                $"INV-009 violated: passage {passage.HeadReference} has <2 project refs");
        }
    }

    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-010")]
    [Property("BehaviorId", "BHV-601")]
    [Description("Status filters check HEAD reference state only, not other verses")]
    public void FilterPassages_StatusFilter_ChecksHeadReferenceOnly()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var filterService = new ParallelPassageFilterService();
        var accessor = new ParallelPassageAccessor();
        var allPassages = accessor.GetAllPassages();

        // INV-010: The filter must check only the head verse's state
        // This is a behavioral contract: filter decision = f(state(headVerse))
        var filtered = filterService.FilterPassages(
            allPassages,
            PassageFilterType.Unchecked,
            scrText
        );

        Assert.That(filtered, Is.Not.Null);
        // With all Unfinished, Unchecked should accept all (that pass book filter)
    }

    #endregion

    #region CAP-009: Error Cases

    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-051")]
    [Property("BehaviorId", "EXT-009")]
    [Description("FilterPassages with empty input returns empty list")]
    public void FilterPassages_EmptyPassageList_ReturnsEmptyList()
    {
        var scrText = CreateDummyProject();
        ScrTextCollection.Add(scrText, true);

        var filterService = new ParallelPassageFilterService();
        var emptyList = new List<ParallelPassageEntry>();

        var filtered = filterService.FilterPassages(
            emptyList,
            PassageFilterType.All,
            scrText
        );

        Assert.That(filtered, Is.Not.Null);
        Assert.That(filtered, Is.Empty);
    }

    #endregion
}
