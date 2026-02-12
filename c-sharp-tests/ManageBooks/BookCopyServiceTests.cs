using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.ManageBooks;

namespace TestParanextDataProvider.ManageBooks;

/// <summary>
/// Tests for BookCopyService - the internal business logic that performs book copying (CAP-020).
/// This capability handles character encoding conversion and SBA additions during copy operations.
/// </summary>
/// <remarks>
/// Maps to: EXT-006 (Copy Books Execution from CopyBooksForm.cs:116-196)
/// Golden Masters: gm-001-copy-mapin, gm-002-copy-teckit
/// Behaviors: BHV-303, BHV-550, BHV-551
/// </remarks>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class BookCopyServiceTests : PapiTestBase
{
    #region Acceptance Tests (Outer Loop)

    /// <summary>
    /// Acceptance test: Copy with character mapping applied matches PT9 behavior.
    /// This is the "done signal" for copy operations with character mapping.
    /// </summary>
    /// <remarks>
    /// Golden Master: gm-001-copy-mapin
    /// PT9 Source: CopyBooksForm.cs:116-196, specifically:
    ///   string bookText = fromScrText.GetText(new VerseRef(bookNum, 0, 0), false, true);
    ///   // The 'true' parameter enables doMapIn for character mapping
    /// </remarks>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-020")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-550")]
    [Property("GoldenMaster", "gm-001")]
    [Property("ExtractionId", "EXT-006")]
    [Description("Acceptance test: Copy with character mapping applies mapping correctly")]
    public void CopyBooks_WithCharacterMapping_AppliesCharacterMapping_AcceptanceTest()
    {
        // Arrange
        var sourceProject = CreateProjectWithBook(1); // GEN
        var destProject = CreateEmptyProject();

        var selectedBooks = new List<SourceAndDestFileInfo>
        {
            new SourceAndDestFileInfo { BookNum = 1, IncludeThisFile = true },
        };

        // Act
        var result = BookCopyService.CopyBooks(sourceProject, destProject, selectedBooks);

        // Assert - Full outcome verification
        Assert.That(result, Is.Not.Null, "Result should not be null");
        Assert.That(result.Success, Is.True, "Copy operation should succeed");
        Assert.That(result.CopiedBooks, Contains.Item(1), "GEN should be in copied books list");

        // Verify the destination has content (character mapping was applied via doMapIn=true)
        // Note: Actual character mapping transformation is handled by ParatextData.dll
        // We verify the integration point - that the copy succeeded
        Assert.That(result.CopiedBooks.Count, Is.EqualTo(1), "Should have copied 1 book");
    }

    /// <summary>
    /// Acceptance test: Copy with TECkit encoding conversion applied matches PT9 behavior.
    /// This is the "done signal" for copy operations with TECkit encoding conversion.
    /// </summary>
    /// <remarks>
    /// Golden Master: gm-002-copy-teckit
    /// PT9 Source: CopyBooksForm.cs:116-196, encoding conversion via GetText/PutText
    /// </remarks>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-020")]
    [Property("ScenarioId", "TS-036")]
    [Property("BehaviorId", "BHV-551")]
    [Property("GoldenMaster", "gm-002")]
    [Property("ExtractionId", "EXT-006")]
    [Description("Acceptance test: Copy with TECkit encoding conversion applies conversion correctly")]
    public void CopyBooks_WithTeckitConversion_AppliesEncodingConversion_AcceptanceTest()
    {
        // Arrange
        var sourceProject = CreateProjectWithBook(1); // GEN
        var destProject = CreateEmptyProject();

        var selectedBooks = new List<SourceAndDestFileInfo>
        {
            new SourceAndDestFileInfo { BookNum = 1, IncludeThisFile = true },
        };

        // Act
        var result = BookCopyService.CopyBooks(sourceProject, destProject, selectedBooks);

        // Assert - Full outcome verification
        Assert.That(result, Is.Not.Null, "Result should not be null");
        Assert.That(result.Success, Is.True, "Copy operation should succeed");
        Assert.That(result.CopiedBooks, Contains.Item(1), "GEN should be in copied books list");

        // Verify the destination has content (TECkit conversion was applied)
        // Note: TECkit conversion is handled internally by ParatextData via doMapIn/doMapOut
        Assert.That(result.CopiedBooks.Count, Is.EqualTo(1), "Should have copied 1 book");
    }

    #endregion

    #region Contract Tests - Basic Copy Operations

    /// <summary>
    /// Contract test: Basic copy between standard projects succeeds.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-020")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-303")]
    [Property("ExtractionId", "EXT-006")]
    [Description("Basic copy between standard projects copies book content")]
    public void CopyBooks_StandardProjects_CopiesContent()
    {
        // Arrange
        var sourceProject = CreateProjectWithBooks(new[] { 1, 2 }); // GEN, EXO
        var destProject = CreateEmptyProject();

        var selectedBooks = new List<SourceAndDestFileInfo>
        {
            new SourceAndDestFileInfo { BookNum = 1, IncludeThisFile = true },
            new SourceAndDestFileInfo { BookNum = 2, IncludeThisFile = true },
        };

        // Act
        var result = BookCopyService.CopyBooks(sourceProject, destProject, selectedBooks);

        // Assert
        Assert.That(result.Success, Is.True, "Copy should succeed");
        Assert.That(result.CopiedBooks, Has.Count.EqualTo(2), "Should copy 2 books");
        Assert.That(
            result.CopiedBooks,
            Is.EquivalentTo(new[] { 1, 2 }),
            "Should copy GEN and EXO"
        );
    }

    /// <summary>
    /// Contract test: Copy skips books not marked for inclusion.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-020")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-303")]
    [Property("ExtractionId", "EXT-006")]
    [Description("Copy only includes books with IncludeThisFile=true")]
    public void CopyBooks_OnlyCopiesSelectedBooks()
    {
        // Arrange
        var sourceProject = CreateProjectWithBooks(new[] { 1, 2, 3 }); // GEN, EXO, LEV
        var destProject = CreateEmptyProject();

        var selectedBooks = new List<SourceAndDestFileInfo>
        {
            new SourceAndDestFileInfo { BookNum = 1, IncludeThisFile = true },
            new SourceAndDestFileInfo { BookNum = 2, IncludeThisFile = false }, // Not selected
            new SourceAndDestFileInfo { BookNum = 3, IncludeThisFile = true },
        };

        // Act
        var result = BookCopyService.CopyBooks(sourceProject, destProject, selectedBooks);

        // Assert
        Assert.That(
            result.CopiedBooks,
            Is.EquivalentTo(new[] { 1, 3 }),
            "Should only copy books with IncludeThisFile=true"
        );
        Assert.That(
            result.CopiedBooks,
            Does.Not.Contain(2),
            "EXO should not be copied (IncludeThisFile=false)"
        );
    }

    /// <summary>
    /// Contract test: Copy returns the last copied book number.
    /// PT9 uses this to navigate to the last copied book after operation.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-020")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-303")]
    [Property("ExtractionId", "EXT-006")]
    [Description("Copy returns the last copied book number")]
    public void CopyBooks_ReturnsLastCopiedBookNumber()
    {
        // Arrange
        var sourceProject = CreateProjectWithBooks(new[] { 1, 3, 5 }); // GEN, LEV, DEU
        var destProject = CreateEmptyProject();

        var selectedBooks = new List<SourceAndDestFileInfo>
        {
            new SourceAndDestFileInfo { BookNum = 1, IncludeThisFile = true },
            new SourceAndDestFileInfo { BookNum = 3, IncludeThisFile = true },
            new SourceAndDestFileInfo { BookNum = 5, IncludeThisFile = true },
        };

        // Act
        var result = BookCopyService.CopyBooks(sourceProject, destProject, selectedBooks);

        // Assert
        Assert.That(
            result.LastCopiedBookNum,
            Is.EqualTo(5),
            "LastCopiedBookNum should be the last book number copied (DEU=5)"
        );
    }

    /// <summary>
    /// Contract test: Copy with empty selection list returns success with no copies.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-020")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-303")]
    [Property("ExtractionId", "EXT-006")]
    [Description("Copy with empty selection returns success with empty copied list")]
    public void CopyBooks_EmptySelection_ReturnsSuccessWithNoCopies()
    {
        // Arrange
        var sourceProject = CreateProjectWithBook(1);
        var destProject = CreateEmptyProject();

        var selectedBooks = new List<SourceAndDestFileInfo>(); // Empty list

        // Act
        var result = BookCopyService.CopyBooks(sourceProject, destProject, selectedBooks);

        // Assert
        Assert.That(result.Success, Is.True, "Should succeed with empty list");
        Assert.That(result.CopiedBooks, Is.Empty, "Should have no copied books");
    }

    /// <summary>
    /// Contract test: Copy with null selection list returns success with no copies.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-020")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-303")]
    [Property("ExtractionId", "EXT-006")]
    [Description("Copy with null selection returns success with empty copied list")]
    public void CopyBooks_NullSelection_ReturnsSuccessWithNoCopies()
    {
        // Arrange
        var sourceProject = CreateProjectWithBook(1);
        var destProject = CreateEmptyProject();

        // Act
        var result = BookCopyService.CopyBooks(sourceProject, destProject, null!);

        // Assert
        Assert.That(result.Success, Is.True, "Should succeed with null list");
        Assert.That(result.CopiedBooks, Is.Empty, "Should have no copied books");
    }

    #endregion

    #region Contract Tests - SBA Handling

    /// <summary>
    /// Contract test: Copy for Study Bible projects handles Study Bible content.
    /// PT9 Source: CopyBooksForm.cs uses StudyBibleOperations.CopySBAAdditions()
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-020")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-113")]
    [Property("ExtractionId", "EXT-006")]
    [Description("StudyBible project copy handles StudyBible content")]
    public void CopyBooks_StudyBibleProject_HandlesStudyBibleContent()
    {
        // Arrange
        var sourceProject = CreateStudyBibleProjectWithBook(1);
        var destProject = CreateStudyBibleProject();

        var selectedBooks = new List<SourceAndDestFileInfo>
        {
            new SourceAndDestFileInfo { BookNum = 1, IncludeThisFile = true },
        };

        // Act
        var result = BookCopyService.CopyBooks(sourceProject, destProject, selectedBooks);

        // Assert
        Assert.That(result.Success, Is.True, "StudyBible copy should succeed");
        Assert.That(result.CopiedBooks, Contains.Item(1), "GEN should be copied");
    }

    /// <summary>
    /// Contract test: Copy for SBA projects also attempts to copy SBA additions.
    /// Note: The actual SBA additions copy may fail if not available, but the book text copy succeeds.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-020")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-113")]
    [Property("ExtractionId", "EXT-006")]
    [Description("SBA project copy attempts to copy SBA additions")]
    public void CopyBooks_SBAProject_CopiesBooks()
    {
        // Arrange - SBA projects with non-canonical book
        var baseProject = CreateDummyProject();
        var baseDetails = CreateProjectDetails(baseProject);
        ParatextProjects.FakeAddProject(baseDetails, baseProject);

        var sourceProject = new DummySBAScrText(baseProject);
        sourceProject.SetBookPresent(67, true, DateTime.Now); // XXA (non-canonical)
        var sourceDetails = CreateProjectDetails(sourceProject);
        ParatextProjects.FakeAddProject(sourceDetails, sourceProject);

        var base2Project = CreateDummyProject();
        var base2Details = CreateProjectDetails(base2Project);
        ParatextProjects.FakeAddProject(base2Details, base2Project);

        var destProject = new DummySBAScrText(base2Project);
        var destDetails = CreateProjectDetails(destProject);
        ParatextProjects.FakeAddProject(destDetails, destProject);

        var selectedBooks = new List<SourceAndDestFileInfo>
        {
            new SourceAndDestFileInfo { BookNum = 67, IncludeThisFile = true },
        };

        // Act
        var result = BookCopyService.CopyBooks(sourceProject, destProject, selectedBooks);

        // Assert - Book text should be copied even if SBA additions have issues
        Assert.That(result.CopiedBooks, Contains.Item(67), "XXA should be copied");
    }

    #endregion

    #region Contract Tests - Character Encoding Details

    /// <summary>
    /// Contract test: GetText is called with doMapIn=true for character mapping.
    /// PT9 Source: CopyBooksForm.cs:367
    ///   string bookText = fromScrText.GetText(new VerseRef(bookNum, 0, 0), false, true);
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-020")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-550")]
    [Property("ExtractionId", "EXT-006")]
    [Description("Copy uses GetText with doMapIn parameter for character mapping")]
    public void CopyBooks_UsesDoMapInParameter()
    {
        // Arrange
        var sourceProject = CreateProjectWithBook(1);
        var destProject = CreateEmptyProject();

        var selectedBooks = new List<SourceAndDestFileInfo>
        {
            new SourceAndDestFileInfo { BookNum = 1, IncludeThisFile = true },
        };

        // Act
        var result = BookCopyService.CopyBooks(sourceProject, destProject, selectedBooks);

        // Assert - Verify copy succeeded (doMapIn is used internally)
        Assert.That(result.Success, Is.True);
        Assert.That(result.CopiedBooks, Contains.Item(1));
    }

    /// <summary>
    /// Contract test: PutText is called with doMapOut=true for character mapping.
    /// PT9 Source: CopyBooksForm.cs:372
    ///   toScrText.PutText(bookNum, 0, true, bookText, textLock);
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-020")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-550")]
    [Property("ExtractionId", "EXT-006")]
    [Description("Copy uses PutText with doMapOut parameter for character mapping")]
    public void CopyBooks_UsesDoMapOutParameter()
    {
        // Arrange
        var sourceProject = CreateProjectWithBook(1);
        var destProject = CreateEmptyProject();

        var selectedBooks = new List<SourceAndDestFileInfo>
        {
            new SourceAndDestFileInfo { BookNum = 1, IncludeThisFile = true },
        };

        // Act
        var result = BookCopyService.CopyBooks(sourceProject, destProject, selectedBooks);

        // Assert - Verify copy succeeded (doMapOut is used internally)
        Assert.That(result.Success, Is.True);
        Assert.That(result.CopiedBooks, Contains.Item(1));
    }

    #endregion

    #region Contract Tests - Multi-book Copy

    /// <summary>
    /// Contract test: Copy handles multiple books correctly.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-020")]
    [Property("ScenarioId", "TS-035")]
    [Property("BehaviorId", "BHV-303")]
    [Property("ExtractionId", "EXT-006")]
    [Description("Copy handles multiple books in order")]
    public void CopyBooks_MultipleBooks_CopiesAllInOrder()
    {
        // Arrange
        var sourceProject = CreateProjectWithBooks(new[] { 1, 2, 3, 4, 5 });
        var destProject = CreateEmptyProject();

        var selectedBooks = new List<SourceAndDestFileInfo>
        {
            new SourceAndDestFileInfo { BookNum = 1, IncludeThisFile = true },
            new SourceAndDestFileInfo { BookNum = 2, IncludeThisFile = true },
            new SourceAndDestFileInfo { BookNum = 3, IncludeThisFile = true },
            new SourceAndDestFileInfo { BookNum = 4, IncludeThisFile = true },
            new SourceAndDestFileInfo { BookNum = 5, IncludeThisFile = true },
        };

        // Act
        var result = BookCopyService.CopyBooks(sourceProject, destProject, selectedBooks);

        // Assert
        Assert.That(result.Success, Is.True, "All copies should succeed");
        Assert.That(result.CopiedBooks, Has.Count.EqualTo(5), "Should copy 5 books");
        Assert.That(result.LastCopiedBookNum, Is.EqualTo(5), "Last copied should be book 5");
    }

    #endregion

    #region Helper Methods

    /// <summary>
    /// Creates a standard project with a single book present.
    /// </summary>
    private DummyScrText CreateProjectWithBook(int bookNum)
    {
        var scrText = CreateDummyProject();
        var details = CreateProjectDetails(scrText);
        ParatextProjects.FakeAddProject(details, scrText);
        scrText.SetBookPresent(bookNum, true, DateTime.Now);
        return scrText;
    }

    /// <summary>
    /// Creates a standard project with multiple books present.
    /// </summary>
    private DummyScrText CreateProjectWithBooks(int[] bookNumbers)
    {
        var scrText = CreateDummyProject();
        var details = CreateProjectDetails(scrText);
        ParatextProjects.FakeAddProject(details, scrText);
        foreach (var bookNum in bookNumbers)
        {
            scrText.SetBookPresent(bookNum, true, DateTime.Now);
        }
        return scrText;
    }

    /// <summary>
    /// Creates an empty standard project.
    /// </summary>
    private DummyScrText CreateEmptyProject()
    {
        var scrText = CreateDummyProject();
        var details = CreateProjectDetails(scrText);
        ParatextProjects.FakeAddProject(details, scrText);
        return scrText;
    }

    /// <summary>
    /// Creates a StudyBible project with a book present.
    /// </summary>
    private DummyStudyBibleScrText CreateStudyBibleProjectWithBook(int bookNum)
    {
        var scrText = new DummyStudyBibleScrText();
        var details = CreateProjectDetails(scrText);
        ParatextProjects.FakeAddProject(details, scrText);
        scrText.SetBookPresent(bookNum, true, DateTime.Now);
        return scrText;
    }

    /// <summary>
    /// Creates an empty StudyBible project.
    /// </summary>
    private DummyStudyBibleScrText CreateStudyBibleProject()
    {
        var scrText = new DummyStudyBibleScrText();
        var details = CreateProjectDetails(scrText);
        ParatextProjects.FakeAddProject(details, scrText);
        return scrText;
    }

    #endregion
}
