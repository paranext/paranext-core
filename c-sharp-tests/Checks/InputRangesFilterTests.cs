using Paranext.DataProvider.Checks;
using Paratext.Data.Filters;
using SIL.Scripture;

namespace TestParanextDataProvider.Checks;

public class InputRangesFilterTests
{
    // Simple test item class for generic filter tests
    private class TestItem
    {
        public VerseRef[] References { get; set; } = [];
    }

    private static VerseRef[] GetReferences(TestItem item) => item.References;

    [Test]
    public void Constructor_SingleRange_CreatesFilter()
    {
        var inputRanges = new[]
        {
            new InputRange("project1", new VerseRef("GEN 1:1"), new VerseRef("GEN 5:10"))
        };
        var filter = new InputRangesFilter<TestItem>(inputRanges, GetReferences);

        Assert.Multiple(() =>
        {
            Assert.That(filter, Is.Not.Null);
            Assert.That(filter.IsFactoryFilter, Is.False);
            Assert.That(filter.RangeCount, Is.EqualTo(1));
        });
    }

    [Test]
    public void Constructor_MultipleRanges_CreatesFilter()
    {
        var inputRanges = new[]
        {
            new InputRange("project1", new VerseRef("GEN 1:1"), new VerseRef("GEN 5:10")),
            new InputRange("project1", new VerseRef("EXO 1:1"), new VerseRef("EXO 10:5"))
        };
        var filter = new InputRangesFilter<TestItem>(inputRanges, GetReferences);

        Assert.Multiple(() =>
        {
            Assert.That(filter, Is.Not.Null);
            Assert.That(filter.RangeCount, Is.EqualTo(2));
        });
    }

    [Test]
    public void Constructor_RangeWithoutEnd_CreatesFilterForWholeBook()
    {
        var inputRanges = new[] { new InputRange("project1", new VerseRef("GEN 1:1"), null) };
        var filter = new InputRangesFilter<TestItem>(inputRanges, GetReferences);

        Assert.Multiple(() =>
        {
            // Should accept any verse in Genesis
            Assert.That(filter.AcceptReference(new VerseRef("GEN 1:1")), Is.True);
            Assert.That(filter.AcceptReference(new VerseRef("GEN 50:26")), Is.True);

            // Should not accept other books
            Assert.That(filter.AcceptReference(new VerseRef("EXO 1:1")), Is.False);

            Assert.That(filter.RangeCount, Is.EqualTo(1));
        });
    }

    [Test]
    public void Constructor_OverlappingRanges_MergesRanges()
    {
        // These ranges overlap and should be merged
        var inputRanges = new[]
        {
            new InputRange("project1", new VerseRef("GEN 1:1"), new VerseRef("GEN 5:10")),
            new InputRange("project1", new VerseRef("GEN 3:1"), new VerseRef("GEN 8:20"))
        };
        var filter = new InputRangesFilter<TestItem>(inputRanges, GetReferences);

        Assert.Multiple(() =>
        {
            // Verses in the merged range should be accepted
            Assert.That(filter.AcceptReference(new VerseRef("GEN 1:1")), Is.True);
            Assert.That(filter.AcceptReference(new VerseRef("GEN 5:10")), Is.True);
            Assert.That(filter.AcceptReference(new VerseRef("GEN 8:20")), Is.True);

            Assert.That(filter.RangeCount, Is.EqualTo(1));
        });
    }

    [Test]
    public void Constructor_WholeBookRanges_MergesContiguousBooks()
    {
        // GEN 1:0 (whole book) and EXO 1:0 (whole book) are contiguous and should be merged
        var inputRanges = new[]
        {
            new InputRange("project1", new VerseRef("GEN 1:0"), null),
            new InputRange("project1", new VerseRef("EXO 1:0"), null)
        };
        var filter = new InputRangesFilter<TestItem>(inputRanges, GetReferences);

        Assert.Multiple(() =>
        {
            // Should accept verses in both Genesis and Exodus
            Assert.That(filter.AcceptReference(new VerseRef("GEN 25:1")), Is.True);
            Assert.That(filter.AcceptReference(new VerseRef("EXO 20:1")), Is.True);

            // Should not accept verses in Leviticus
            Assert.That(filter.AcceptReference(new VerseRef("LEV 1:1")), Is.False);

            Assert.That(filter.RangeCount, Is.EqualTo(1));
        });
    }

    [Test]
    public void Constructor_PartialBookRanges_DoesNotMerge()
    {
        // Two partial book ranges that should not merge
        var inputRanges = new[]
        {
            new InputRange("project1", new VerseRef("GEN 3:1"), null),
            // Not verse 0, so no merging
            new InputRange("project1", new VerseRef("EXO 1:1"), null)
        };
        var filter = new InputRangesFilter<TestItem>(inputRanges, GetReferences);

        Assert.Multiple(() =>
        {
            // Should accept verses in the specified ranges
            Assert.That(filter.AcceptReference(new VerseRef("GEN 25:1")), Is.True);
            Assert.That(filter.AcceptReference(new VerseRef("EXO 20:1")), Is.True);

            // Should not accept verses outside the specified ranges
            Assert.That(filter.AcceptReference(new VerseRef("GEN 1:1")), Is.False);
            Assert.That(filter.AcceptReference(new VerseRef("EXO 1:0")), Is.False);

            Assert.That(filter.RangeCount, Is.EqualTo(2));
        });
    }

    [Test]
    public void Constructor_ContiguousRanges_MergesRanges()
    {
        // GEN 2:10 and GEN 2:11 are contiguous and should be merged
        var inputRanges = new[]
        {
            new InputRange("project1", new VerseRef("GEN 1:0"), new VerseRef("GEN 2:10")),
            new InputRange("project1", new VerseRef("GEN 2:11"), new VerseRef("GEN 5:20"))
        };
        var filter = new InputRangesFilter<TestItem>(inputRanges, GetReferences);

        Assert.Multiple(() =>
        {
            // Verses across both ranges should be accepted
            Assert.That(filter.AcceptReference(new VerseRef("GEN 1:1")), Is.True);
            Assert.That(filter.AcceptReference(new VerseRef("GEN 2:10")), Is.True);
            Assert.That(filter.AcceptReference(new VerseRef("GEN 2:11")), Is.True);
            Assert.That(filter.AcceptReference(new VerseRef("GEN 5:20")), Is.True);

            Assert.That(filter.RangeCount, Is.EqualTo(1));
        });
    }

    [Test]
    public void Constructor_NonOverlappingRanges_KeepsRangesSeparate()
    {
        var inputRanges = new[]
        {
            new InputRange("project1", new VerseRef("GEN 1:1"), new VerseRef("GEN 5:10")),
            new InputRange("project1", new VerseRef("EXO 1:1"), new VerseRef("EXO 10:5"))
        };
        var filter = new InputRangesFilter<TestItem>(inputRanges, GetReferences);

        Assert.Multiple(() =>
        {
            // Verses in first range
            Assert.That(filter.AcceptReference(new VerseRef("GEN 1:1")), Is.True);
            Assert.That(filter.AcceptReference(new VerseRef("GEN 5:10")), Is.True);

            // Verses in second range
            Assert.That(filter.AcceptReference(new VerseRef("EXO 1:1")), Is.True);
            Assert.That(filter.AcceptReference(new VerseRef("EXO 10:5")), Is.True);

            // Verses outside both ranges
            Assert.That(filter.AcceptReference(new VerseRef("GEN 6:1")), Is.False);
            Assert.That(filter.AcceptReference(new VerseRef("LEV 1:1")), Is.False);

            Assert.That(filter.RangeCount, Is.EqualTo(2));
        });
    }

    [Test]
    public void Constructor_ManyRanges_MergesAndKeepsSeparateAsAppropriate()
    {
        var inputRanges = new[]
        {
            new InputRange("project1", new VerseRef("GEN 1:1"), new VerseRef("GEN 5:10")),
            new InputRange("project1", new VerseRef("GEN 3:1"), new VerseRef("GEN 8:20")),
            new InputRange("project1", new VerseRef("EXO 1:0"), null),
            new InputRange("project1", new VerseRef("LEV 1:1"), null)
        };
        var filter = new InputRangesFilter<TestItem>(inputRanges, GetReferences);

        Assert.Multiple(() =>
        {
            // Verses in GEN
            Assert.That(filter.AcceptReference(new VerseRef("GEN 1:1")), Is.True);
            Assert.That(filter.AcceptReference(new VerseRef("GEN 5:10")), Is.True);
            Assert.That(filter.AcceptReference(new VerseRef("GEN 8:20")), Is.True);
            Assert.That(filter.AcceptReference(new VerseRef("GEN 15:1")), Is.False);

            // Verses in EXO whole book range
            Assert.That(filter.AcceptReference(new VerseRef("EXO 1:0")), Is.True);
            Assert.That(filter.AcceptReference(new VerseRef("EXO 1:1")), Is.True);
            Assert.That(filter.AcceptReference(new VerseRef("EXO 40:38")), Is.True);

            // Verses in LEV
            Assert.That(filter.AcceptReference(new VerseRef("LEV 1:0")), Is.False);
            Assert.That(filter.AcceptReference(new VerseRef("LEV 1:1")), Is.True);
            Assert.That(filter.AcceptReference(new VerseRef("LEV 27:34")), Is.True);

            // Verses outside all ranges
            Assert.That(filter.AcceptReference(new VerseRef("NUM 1:1")), Is.False);

            Assert.That(filter.RangeCount, Is.EqualTo(3));
        });
    }

    [Test]
    public void AcceptReference_VerseInRange_ReturnsTrue()
    {
        var inputRanges = new[]
        {
            new InputRange("project1", new VerseRef("GEN 1:1"), new VerseRef("GEN 5:10"))
        };
        var filter = new InputRangesFilter<TestItem>(inputRanges, GetReferences);

        Assert.Multiple(() =>
        {
            Assert.That(filter.AcceptReference(new VerseRef("GEN 1:1")), Is.True);
            Assert.That(filter.AcceptReference(new VerseRef("GEN 3:5")), Is.True);
            Assert.That(filter.AcceptReference(new VerseRef("GEN 5:10")), Is.True);

            Assert.That(filter.RangeCount, Is.EqualTo(1));
        });
    }

    [Test]
    public void AcceptReference_VerseBeforeRange_ReturnsFalse()
    {
        var inputRanges = new[]
        {
            new InputRange("project1", new VerseRef("GEN 5:1"), new VerseRef("GEN 10:10"))
        };
        var filter = new InputRangesFilter<TestItem>(inputRanges, GetReferences);

        Assert.That(filter.AcceptReference(new VerseRef("GEN 4:26")), Is.False);
    }

    [Test]
    public void AcceptReference_VerseAfterRange_ReturnsFalse()
    {
        var inputRanges = new[]
        {
            new InputRange("project1", new VerseRef("GEN 1:1"), new VerseRef("GEN 5:10"))
        };
        var filter = new InputRangesFilter<TestItem>(inputRanges, GetReferences);

        Assert.That(filter.AcceptReference(new VerseRef("GEN 5:11")), Is.False);
    }

    [Test]
    public void Accept_ItemWithReferenceInRange_ReturnsTrue()
    {
        var inputRanges = new[]
        {
            new InputRange("project1", new VerseRef("GEN 1:1"), new VerseRef("GEN 5:10"))
        };
        var filter = new InputRangesFilter<TestItem>(inputRanges, GetReferences);
        var item = new TestItem { References = [new VerseRef("GEN 3:5")] };

        Assert.That(filter.Accept(item), Is.True);
    }

    [Test]
    public void Accept_ItemWithReferenceOutsideRange_ReturnsFalse()
    {
        var inputRanges = new[]
        {
            new InputRange("project1", new VerseRef("GEN 1:1"), new VerseRef("GEN 5:10"))
        };
        var filter = new InputRangesFilter<TestItem>(inputRanges, GetReferences);
        var item = new TestItem { References = [new VerseRef("EXO 1:1")] };

        Assert.That(filter.Accept(item), Is.False);
    }

    [Test]
    public void Accept_ItemWithMultipleReferences_OneInRange_ReturnsTrue()
    {
        var inputRanges = new[]
        {
            new InputRange("project1", new VerseRef("GEN 1:1"), new VerseRef("GEN 5:10"))
        };
        var filter = new InputRangesFilter<TestItem>(inputRanges, GetReferences);
        var item = new TestItem
        {
            References = [new VerseRef("EXO 1:1"), new VerseRef("GEN 3:5"), new VerseRef("LEV 1:1")]
        };

        Assert.That(filter.Accept(item), Is.True);
    }

    [Test]
    public void Accept_ItemWithMultipleReferences_NoneInRange_ReturnsFalse()
    {
        var inputRanges = new[]
        {
            new InputRange("project1", new VerseRef("GEN 1:1"), new VerseRef("GEN 5:10"))
        };
        var filter = new InputRangesFilter<TestItem>(inputRanges, GetReferences);
        var item = new TestItem { References = [new VerseRef("EXO 1:1"), new VerseRef("LEV 1:1")] };

        Assert.That(filter.Accept(item), Is.False);
    }

    [Test]
    public void Accept_ItemWithNoReferences_ReturnsFalse()
    {
        var inputRanges = new[]
        {
            new InputRange("project1", new VerseRef("GEN 1:1"), new VerseRef("GEN 5:10"))
        };
        var filter = new InputRangesFilter<TestItem>(inputRanges, GetReferences);
        var item = new TestItem { References = [] };

        Assert.That(filter.Accept(item), Is.False);
    }

    [Test]
    public void Clone_CreatesIndependentCopy()
    {
        var inputRanges = new[]
        {
            new InputRange("project1", new VerseRef("GEN 1:1"), new VerseRef("GEN 5:10"))
        };
        var filter = new InputRangesFilter<TestItem>(inputRanges, GetReferences);
        var clonedFilter = (InputRangesFilter<TestItem>)filter.Clone();

        Assert.That(clonedFilter, Is.Not.Null);
        Assert.That(clonedFilter, Is.Not.SameAs(filter));
        Assert.That(clonedFilter.AcceptReference(new VerseRef("GEN 3:5")), Is.True);
        Assert.That(clonedFilter.AcceptReference(new VerseRef("EXO 1:1")), Is.False);
    }

    [Test]
    public void Equals_SameRanges_ReturnsTrue()
    {
        var inputRanges1 = new[]
        {
            new InputRange("project1", new VerseRef("GEN 1:1"), new VerseRef("GEN 5:10"))
        };
        var filter1 = new InputRangesFilter<TestItem>(inputRanges1, GetReferences);

        var inputRanges2 = new[]
        {
            new InputRange("project1", new VerseRef("GEN 1:1"), new VerseRef("GEN 5:10"))
        };
        var filter2 = new InputRangesFilter<TestItem>(inputRanges2, GetReferences);

        Assert.That(filter1, Is.EqualTo(filter2));
    }

    [Test]
    public void Equals_DifferentRanges_ReturnsFalse()
    {
        var inputRanges1 = new[]
        {
            new InputRange("project1", new VerseRef("GEN 1:1"), new VerseRef("GEN 5:10"))
        };
        var filter1 = new InputRangesFilter<TestItem>(inputRanges1, GetReferences);

        var inputRanges2 = new[]
        {
            new InputRange("project1", new VerseRef("EXO 1:1"), new VerseRef("EXO 10:5"))
        };
        var filter2 = new InputRangesFilter<TestItem>(inputRanges2, GetReferences);

        Assert.That(filter1, Is.Not.EqualTo(filter2));
    }

    [Test]
    public void Equals_DifferentNumberOfRanges_ReturnsFalse()
    {
        var inputRanges1 = new[]
        {
            new InputRange("project1", new VerseRef("GEN 1:1"), new VerseRef("GEN 5:10"))
        };
        var filter1 = new InputRangesFilter<TestItem>(inputRanges1, GetReferences);

        var inputRanges2 = new[]
        {
            new InputRange("project1", new VerseRef("GEN 1:1"), new VerseRef("GEN 5:10")),
            new InputRange("project1", new VerseRef("EXO 1:1"), new VerseRef("EXO 10:5"))
        };
        var filter2 = new InputRangesFilter<TestItem>(inputRanges2, GetReferences);

        Assert.That(filter1, Is.Not.EqualTo(filter2));
    }

    [Test]
    public void Equals_DifferentFilterType_ReturnsFalse()
    {
        var inputRanges = new[]
        {
            new InputRange("project1", new VerseRef("GEN 1:1"), new VerseRef("GEN 5:10"))
        };
        var filter = new InputRangesFilter<TestItem>(inputRanges, GetReferences);

        // Create a different type of filter (using null as a simple example)
        LocationFilter<TestItem>? otherFilter = null;

        Assert.That(filter, Is.Not.EqualTo(otherFilter));
    }

    [Test]
    public void RefChangesFilteredItems_Always_ReturnsFalse()
    {
        var inputRanges = new[]
        {
            new InputRange("project1", new VerseRef("GEN 1:1"), new VerseRef("GEN 5:10"))
        };
        var filter = new InputRangesFilter<TestItem>(inputRanges, GetReferences);

        Assert.That(filter.RefChangesFilteredItems(new VerseRef("GEN 1:1"), true), Is.False);
        Assert.That(filter.RefChangesFilteredItems(new VerseRef("EXO 1:1"), false), Is.False);
    }

    [Test]
    public void Update_DoesNotThrow()
    {
        var inputRanges = new[]
        {
            new InputRange("project1", new VerseRef("GEN 1:1"), new VerseRef("GEN 5:10"))
        };
        var filter = new InputRangesFilter<TestItem>(inputRanges, GetReferences);

        Assert.DoesNotThrow(() => filter.Update(new VerseRef("GEN 1:1"), true));
        Assert.DoesNotThrow(() => filter.Update(new VerseRef("EXO 1:1"), false));
    }

    [Test]
    public void FilterState_Throws_NotImplementedException()
    {
        var inputRanges = new[]
        {
            new InputRange("project1", new VerseRef("GEN 1:1"), new VerseRef("GEN 5:10"))
        };
        var filter = new InputRangesFilter<TestItem>(inputRanges, GetReferences);

        Assert.Throws<NotImplementedException>(() =>
        {
            var _ = filter.FilterState;
        });
    }

    [Test]
    public void Description_Throws_NotImplementedException()
    {
        var inputRanges = new[]
        {
            new InputRange("project1", new VerseRef("GEN 1:1"), new VerseRef("GEN 5:10"))
        };
        var filter = new InputRangesFilter<TestItem>(inputRanges, GetReferences);

        Assert.Throws<NotImplementedException>(() =>
        {
            var _ = filter.Description;
        });
    }

    [Test]
    public void Tooltip_Throws_NotImplementedException()
    {
        var inputRanges = new[]
        {
            new InputRange("project1", new VerseRef("GEN 1:1"), new VerseRef("GEN 5:10"))
        };
        var filter = new InputRangesFilter<TestItem>(inputRanges, GetReferences);

        Assert.Throws<NotImplementedException>(() =>
        {
            var _ = filter.Tooltip;
        });
    }

    [Test]
    public void AcceptReference_BoundaryConditions_WorksCorrectly()
    {
        var inputRanges = new[]
        {
            new InputRange("project1", new VerseRef("GEN 1:1"), new VerseRef("GEN 1:31"))
        };
        var filter = new InputRangesFilter<TestItem>(inputRanges, GetReferences);

        Assert.Multiple(() =>
        {
            // Exactly at start boundary
            Assert.That(filter.AcceptReference(new VerseRef("GEN 1:1")), Is.True);

            // Exactly at end boundary
            Assert.That(filter.AcceptReference(new VerseRef("GEN 1:31")), Is.True);

            // Just before start
            Assert.That(filter.AcceptReference(new VerseRef("GEN 1:0")), Is.False);

            // Just after end
            Assert.That(filter.AcceptReference(new VerseRef("GEN 1:32")), Is.False);
        });
    }
}
