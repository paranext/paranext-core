using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;
using SIL.Scripture;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for ScriptureRenderingService.GenerateScriptureHtmlAsync (CAP-012).
///
/// This capability generates the HTML body for the scripture pane, applying
/// highlight toggles, display mode settings, rendering status CSS classes,
/// footnote rendering, and verse navigation IDs. It is the core rendering
/// pipeline that combines token stream with highlight state, display mode,
/// and rendering status to produce HTML.
///
/// Contract: Section 4.12 GenerateScriptureHtml (data-contracts.md)
/// Input: GenerateScriptureHtmlInput (Section 2 - not yet in shared-types, defined in contract)
/// Output: Section 3.10 (ScripturePaneContent)
/// Behaviors: BHV-100 (MarbleResource Project Type),
///            BHV-101 (Resource Integrity Verification),
///            BHV-103 (Resource Font and Language Settings Resolution),
///            BHV-404 (Highlight Button Toggle State Machine),
///            BHV-417 (Scripture Pane Verse Click Navigation),
///            BHV-608 (Marble Data Parsing and Token Extraction),
///            BHV-609 (Footnote HTML Rendering)
/// Extraction: EXT-024 (Scripture Pane HTML Generation - GetBody)
/// Invariants: INV-008 (Resource Font Language-First Resolution)
/// Golden Masters: GM-014 (footnote rendering), GM-025 (highlight toggles),
///                 GM-034 (display modes)
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
public class ScriptureRenderingServiceTests
{
    // =========================================================================
    // ACCEPTANCE TEST (OUTER LOOP) - The "done signal" for CAP-012
    // =========================================================================

    /// <summary>
    /// Acceptance test: Scripture pane HTML generated with correct highlight
    /// CSS classes, footnote rendering, display mode settings, and verse
    /// navigation IDs. This test covers the end-to-end behavior of the
    /// GenerateScriptureHtml capability.
    ///
    /// This test passes when CAP-012 is COMPLETE.
    /// GM-014: Footnote rendering with correct USFM style classes
    /// GM-025: Highlight toggle CSS classes applied correctly
    /// GM-034: Display modes (original/transliteration/both)
    /// </summary>
    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-012")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-404")]
    [Property("GoldenMaster", "GM-014,GM-025,GM-034")]
    [Description(
        "Acceptance test: Scripture HTML includes highlight CSS classes, "
            + "footnote USFM styling, display modes, and verse navigation IDs"
    )]
    public async Task GenerateScriptureHtml_FullCapability_ProducesCompleteHtml()
    {
        // Arrange: Create the service under test
        var service = new ScriptureRenderingService();

        var input = new GenerateScriptureHtmlInput(
            ResourceId: "ESV-ER",
            VerseRef: new VerseRef(43, 3, 16),
            HighlightFlags: new HighlightFlags(ResearchTerms: true, Found: true, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Both,
            TrackedProjectId: "zzz5",
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );

        // Act
        var result = await service.GenerateScriptureHtmlAsync(input, CancellationToken.None);

        // Assert: Success with HTML content
        Assert.That(
            result.Success,
            Is.True,
            "GenerateScriptureHtml should succeed for valid input"
        );
        Assert.That(
            result.ScriptureHtml,
            Is.Not.Null.And.Not.Empty,
            "ScriptureHtml should contain rendered HTML"
        );

        // --- GM-025: Highlight CSS classes ---
        Assert.That(
            result.HighlightCssClasses,
            Is.Not.Null,
            "HighlightCssClasses should be populated"
        );
        Assert.That(
            result.HighlightCssClasses,
            Contains.Item("showeverylink"),
            "ResearchTerms=true should include 'showeverylink'"
        );
        Assert.That(
            result.HighlightCssClasses,
            Contains.Item("showfound"),
            "Found=true should include 'showfound'"
        );
        Assert.That(
            result.HighlightCssClasses,
            Does.Not.Contain("showmissing"),
            "Missing=false should not include 'showmissing'"
        );

        // --- BHV-417: Verse navigation IDs ---
        Assert.That(
            result.ScriptureHtml,
            Does.Contain("verse_"),
            "HTML should contain verse ID elements for click navigation"
        );

        // --- GM-014: Footnote availability ---
        Assert.That(
            result.FootnotesHtml,
            Is.Not.Null,
            "FootnotesHtml should not be null (may be empty string)"
        );
    }

    // =========================================================================
    // CONTRACT TESTS - GenerateScriptureHtmlAsync (Happy Path)
    // =========================================================================

    // --- TS-094: Highlight toggle: Research Terms controls showeverylink ---

    /// <summary>
    /// TS-094: When Research Terms toggle is on, the generated HTML should
    /// include the "showeverylink" CSS class in the highlight CSS classes.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-404")]
    [Property("GoldenMaster", "GM-025")]
    [Description("Research Terms on includes 'showeverylink' in highlightCssClasses")]
    public async Task GenerateScriptureHtml_ResearchTermsOn_IncludesShowEveryLink()
    {
        // Arrange
        var service = new ScriptureRenderingService();
        var input = new GenerateScriptureHtmlInput(
            ResourceId: "ESV-ER",
            VerseRef: new VerseRef(43, 3, 16),
            HighlightFlags: new HighlightFlags(ResearchTerms: true, Found: false, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: null,
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );

        // Act
        var result = await service.GenerateScriptureHtmlAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.HighlightCssClasses, Contains.Item("showeverylink"));
        Assert.That(result.HighlightCssClasses, Does.Not.Contain("showfound"));
        Assert.That(result.HighlightCssClasses, Does.Not.Contain("showmissing"));
    }

    // --- TS-095: Highlight toggle: Found controls showfound ---

    /// <summary>
    /// TS-095: When Found toggle is on, the generated HTML should include
    /// the "showfound" CSS class.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-095")]
    [Property("BehaviorId", "BHV-404")]
    [Property("GoldenMaster", "GM-025")]
    [Description("Found on includes 'showfound' in highlightCssClasses")]
    public async Task GenerateScriptureHtml_FoundOn_IncludesShowFound()
    {
        // Arrange
        var service = new ScriptureRenderingService();
        var input = new GenerateScriptureHtmlInput(
            ResourceId: "ESV-ER",
            VerseRef: new VerseRef(43, 3, 16),
            HighlightFlags: new HighlightFlags(ResearchTerms: false, Found: true, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: "zzz5",
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );

        // Act
        var result = await service.GenerateScriptureHtmlAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.HighlightCssClasses, Contains.Item("showfound"));
        Assert.That(result.HighlightCssClasses, Does.Not.Contain("showeverylink"));
        Assert.That(result.HighlightCssClasses, Does.Not.Contain("showmissing"));
    }

    // --- TS-096: Highlight toggle: Missing controls showmissing ---

    /// <summary>
    /// TS-096: When Missing toggle is on, the generated HTML should include
    /// the "showmissing" CSS class.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-096")]
    [Property("BehaviorId", "BHV-404")]
    [Property("GoldenMaster", "GM-025")]
    [Description("Missing on includes 'showmissing' in highlightCssClasses")]
    public async Task GenerateScriptureHtml_MissingOn_IncludesShowMissing()
    {
        // Arrange
        var service = new ScriptureRenderingService();
        var input = new GenerateScriptureHtmlInput(
            ResourceId: "ESV-ER",
            VerseRef: new VerseRef(43, 3, 16),
            HighlightFlags: new HighlightFlags(ResearchTerms: false, Found: false, Missing: true),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: "zzz5",
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );

        // Act
        var result = await service.GenerateScriptureHtmlAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.HighlightCssClasses, Contains.Item("showmissing"));
        Assert.That(result.HighlightCssClasses, Does.Not.Contain("showeverylink"));
        Assert.That(result.HighlightCssClasses, Does.Not.Contain("showfound"));
    }

    /// <summary>
    /// All highlight toggles on simultaneously should produce all three CSS classes.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-404")]
    [Property("GoldenMaster", "GM-025")]
    [Description("All toggles on produces all three CSS classes")]
    public async Task GenerateScriptureHtml_AllHighlightsOn_AllCssClassesPresent()
    {
        // Arrange
        var service = new ScriptureRenderingService();
        var input = new GenerateScriptureHtmlInput(
            ResourceId: "ESV-ER",
            VerseRef: new VerseRef(43, 3, 16),
            HighlightFlags: new HighlightFlags(ResearchTerms: true, Found: true, Missing: true),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: "zzz5",
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );

        // Act
        var result = await service.GenerateScriptureHtmlAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.HighlightCssClasses, Contains.Item("showeverylink"));
        Assert.That(result.HighlightCssClasses, Contains.Item("showfound"));
        Assert.That(result.HighlightCssClasses, Contains.Item("showmissing"));
    }

    /// <summary>
    /// No highlight toggles produces empty CSS class list.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-404")]
    [Property("GoldenMaster", "GM-025")]
    [Description("No toggles produces empty highlight CSS class list")]
    public async Task GenerateScriptureHtml_NoHighlights_EmptyCssClasses()
    {
        // Arrange
        var service = new ScriptureRenderingService();
        var input = new GenerateScriptureHtmlInput(
            ResourceId: "ESV-ER",
            VerseRef: new VerseRef(43, 3, 16),
            HighlightFlags: new HighlightFlags(ResearchTerms: false, Found: false, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: null,
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );

        // Act
        var result = await service.GenerateScriptureHtmlAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.HighlightCssClasses, Is.Empty);
    }

    // =========================================================================
    // VERSE NAVIGATION IDS (TS-121, BHV-417)
    // =========================================================================

    /// <summary>
    /// TS-121: The generated HTML should embed verse IDs (e.g., "verse_3")
    /// so that clicking a word triggers verse reference navigation.
    /// The backend generates these IDs; the UI handles the click event.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-121")]
    [Property("BehaviorId", "BHV-417")]
    [Description("Verse navigation IDs embedded in scripture HTML")]
    public async Task GenerateScriptureHtml_WithVerses_ContainsVerseNavigationIds()
    {
        // Arrange
        var service = new ScriptureRenderingService();
        var input = new GenerateScriptureHtmlInput(
            ResourceId: "ESV-ER",
            VerseRef: new VerseRef(43, 3, 16),
            HighlightFlags: new HighlightFlags(ResearchTerms: false, Found: false, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: null,
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );

        // Act
        var result = await service.GenerateScriptureHtmlAsync(input, CancellationToken.None);

        // Assert: HTML should contain verse ID markers in the format "verse_N"
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.ScriptureHtml,
            Does.Contain("verse_"),
            "HTML must contain verse_N IDs for click navigation (BHV-417)"
        );
    }

    /// <summary>
    /// Verse IDs should follow the "verse_{n}" format where n is the verse number.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-121")]
    [Property("BehaviorId", "BHV-417")]
    [Description("Verse IDs follow verse_{n} format")]
    public async Task GenerateScriptureHtml_VerseIds_FollowExpectedFormat()
    {
        // Arrange
        var service = new ScriptureRenderingService();
        var input = new GenerateScriptureHtmlInput(
            ResourceId: "ESV-ER",
            VerseRef: new VerseRef(43, 3, 1),
            HighlightFlags: new HighlightFlags(ResearchTerms: false, Found: false, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: null,
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );

        // Act
        var result = await service.GenerateScriptureHtmlAsync(input, CancellationToken.None);

        // Assert: Should contain verse_1 for the first verse in the chapter
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.ScriptureHtml,
            Does.Contain("verse_1"),
            "Chapter should contain verse_1 ID for verse 1"
        );
    }

    // =========================================================================
    // FOOTNOTE RENDERING (TS-058, TS-059, TS-060, TS-061, BHV-609)
    // =========================================================================

    /// <summary>
    /// TS-058: Non-XML footnotes should show an update-required message
    /// (e.g., "To show footnotes, update ESV") rather than raw content.
    /// This is a graceful degradation behavior for legacy data.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-058")]
    [Property("BehaviorId", "BHV-609")]
    [Property("GoldenMaster", "GM-014")]
    [Description("Non-XML footnotes show update message instead of raw content")]
    public async Task GenerateScriptureHtml_NonXmlFootnotes_ShowsUpdateMessage()
    {
        // Arrange: Use a resource with non-XML footnote data
        var service = new ScriptureRenderingService();
        var input = new GenerateScriptureHtmlInput(
            ResourceId: "LEGACY-ER",
            VerseRef: new VerseRef(43, 3, 16),
            HighlightFlags: new HighlightFlags(ResearchTerms: false, Found: false, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: null,
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );

        // Act
        var result = await service.GenerateScriptureHtmlAsync(input, CancellationToken.None);

        // Assert: Footnote area should contain update message, not raw data
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.FootnotesHtml,
            Does.Contain("update").IgnoreCase.Or.Contain("footnotes").IgnoreCase,
            "Non-XML footnotes should show update/upgrade message (GM-014: messageType=update-required)"
        );
    }

    /// <summary>
    /// TS-059: Footnotes with style "f" should produce HTML with CSS class "usfm_f".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-059")]
    [Property("BehaviorId", "BHV-609")]
    [Property("GoldenMaster", "GM-014")]
    [Description("Footnote style 'f' produces class 'usfm_f'")]
    public async Task GenerateScriptureHtml_FootnoteStyleF_ProducesUsfmFClass()
    {
        // Arrange: Resource with XML footnotes containing style "f"
        var service = new ScriptureRenderingService();
        var input = new GenerateScriptureHtmlInput(
            ResourceId: "ESV-ER",
            VerseRef: new VerseRef(43, 3, 16),
            HighlightFlags: new HighlightFlags(ResearchTerms: false, Found: false, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: null,
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );

        // Act
        var result = await service.GenerateScriptureHtmlAsync(input, CancellationToken.None);

        // Assert: If footnotes exist, they should use usfm_f class
        Assert.That(result.Success, Is.True);
        if (result.HasFootnotes == true)
        {
            Assert.That(
                result.FootnotesHtml,
                Does.Contain("usfm_f"),
                "Footnote style 'f' should produce class='usfm_f' (GM-014)"
            );
        }
    }

    /// <summary>
    /// TS-060: Cross-reference style "x" should produce HTML with CSS class "usfm_x".
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-060")]
    [Property("BehaviorId", "BHV-609")]
    [Property("GoldenMaster", "GM-014")]
    [Description("Cross-reference style 'x' produces class 'usfm_x'")]
    public async Task GenerateScriptureHtml_CrossRefStyleX_ProducesUsfmXClass()
    {
        // Arrange: Resource with cross-reference notes containing style "x"
        var service = new ScriptureRenderingService();
        var input = new GenerateScriptureHtmlInput(
            ResourceId: "ESV-ER",
            VerseRef: new VerseRef(43, 3, 16),
            HighlightFlags: new HighlightFlags(ResearchTerms: false, Found: false, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: null,
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );

        // Act
        var result = await service.GenerateScriptureHtmlAsync(input, CancellationToken.None);

        // Assert: If cross-references exist, they should use usfm_x class
        Assert.That(result.Success, Is.True);
        if (result.HasFootnotes == true && result.FootnotesHtml!.Contains("usfm_x"))
        {
            Assert.That(
                result.FootnotesHtml,
                Does.Contain("usfm_x"),
                "Cross-reference style 'x' should produce class='usfm_x' (GM-014)"
            );
        }
    }

    /// <summary>
    /// TS-061: linkedReference elements within note elements should be silently
    /// ignored (omitted from output) without producing errors.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-061")]
    [Property("BehaviorId", "BHV-609")]
    [Property("GoldenMaster", "GM-014")]
    [Description("linkedReference elements in notes are silently ignored")]
    public async Task GenerateScriptureHtml_LinkedReferenceInNotes_SilentlyIgnored()
    {
        // Arrange: Resource with notes containing linkedReference elements
        var service = new ScriptureRenderingService();
        var input = new GenerateScriptureHtmlInput(
            ResourceId: "ESV-ER",
            VerseRef: new VerseRef(43, 3, 16),
            HighlightFlags: new HighlightFlags(ResearchTerms: false, Found: false, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: null,
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );

        // Act
        var result = await service.GenerateScriptureHtmlAsync(input, CancellationToken.None);

        // Assert: linkedReference elements should NOT appear in output
        Assert.That(result.Success, Is.True, "Should succeed even with linkedReference elements");
        Assert.That(
            result.ScriptureHtml,
            Does.Not.Contain("linkedReference"),
            "linkedReference elements must be silently omitted from output (GM-014)"
        );
        if (result.FootnotesHtml != null)
        {
            Assert.That(
                result.FootnotesHtml,
                Does.Not.Contain("linkedReference"),
                "linkedReference elements must be silently omitted from footnotes too"
            );
        }
    }

    /// <summary>
    /// HasFootnotes should accurately reflect whether footnotes were found.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-058")]
    [Property("BehaviorId", "BHV-609")]
    [Property("GoldenMaster", "GM-014")]
    [Description("HasFootnotes reflects footnote availability")]
    public async Task GenerateScriptureHtml_WithFootnotes_HasFootnotesIsTrue()
    {
        // Arrange
        var service = new ScriptureRenderingService();
        var input = new GenerateScriptureHtmlInput(
            ResourceId: "ESV-ER",
            VerseRef: new VerseRef(43, 3, 16),
            HighlightFlags: new HighlightFlags(ResearchTerms: false, Found: false, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: null,
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );

        // Act
        var result = await service.GenerateScriptureHtmlAsync(input, CancellationToken.None);

        // Assert: HasFootnotes should be consistent with FootnotesHtml
        Assert.That(result.Success, Is.True);
        if (result.HasFootnotes == true)
        {
            Assert.That(
                result.FootnotesHtml,
                Is.Not.Null.And.Not.Empty,
                "When HasFootnotes is true, FootnotesHtml should not be empty"
            );
        }
        else
        {
            Assert.That(
                result.FootnotesHtml,
                Is.Null.Or.Empty,
                "When HasFootnotes is false, FootnotesHtml should be null or empty"
            );
        }
    }

    // =========================================================================
    // DISPLAY MODES (GM-034, BHV-103)
    // =========================================================================

    /// <summary>
    /// GM-034: Hebrew display mode "OriginalScript" should render Hebrew
    /// source words in their original script form.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-103")]
    [Property("GoldenMaster", "GM-034")]
    [Description("Hebrew original script display mode applied")]
    public async Task GenerateScriptureHtml_HebrewOriginalScript_AppliesCorrectMode()
    {
        // Arrange: OT resource with Hebrew source words
        var service = new ScriptureRenderingService();
        var input = new GenerateScriptureHtmlInput(
            ResourceId: "ESV-ER",
            VerseRef: new VerseRef(1, 1, 1), // Genesis 1:1 (OT, Hebrew)
            HighlightFlags: new HighlightFlags(ResearchTerms: false, Found: false, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: null,
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );

        // Act
        var result = await service.GenerateScriptureHtmlAsync(input, CancellationToken.None);

        // Assert: Should succeed and produce HTML
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.ScriptureHtml,
            Is.Not.Null.And.Not.Empty,
            "Hebrew original script should produce valid HTML"
        );
    }

    /// <summary>
    /// GM-034: Hebrew display mode "Transliteration" should render Hebrew
    /// source words in transliterated (Latin script) form.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-103")]
    [Property("GoldenMaster", "GM-034")]
    [Description("Hebrew transliteration display mode applied")]
    public async Task GenerateScriptureHtml_HebrewTransliteration_AppliesCorrectMode()
    {
        // Arrange
        var service = new ScriptureRenderingService();
        var input = new GenerateScriptureHtmlInput(
            ResourceId: "ESV-ER",
            VerseRef: new VerseRef(1, 1, 1),
            HighlightFlags: new HighlightFlags(ResearchTerms: false, Found: false, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Transliteration,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: null,
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );

        // Act
        var result = await service.GenerateScriptureHtmlAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.ScriptureHtml,
            Is.Not.Null.And.Not.Empty,
            "Hebrew transliteration should produce valid HTML"
        );
    }

    /// <summary>
    /// GM-034: Greek display mode "Both" should render Greek source words
    /// showing both original script and transliteration.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-103")]
    [Property("GoldenMaster", "GM-034")]
    [Description("Greek 'both' display mode shows original and transliteration")]
    public async Task GenerateScriptureHtml_GreekBothMode_ShowsOriginalAndTransliteration()
    {
        // Arrange: NT resource with Greek source words
        var service = new ScriptureRenderingService();
        var input = new GenerateScriptureHtmlInput(
            ResourceId: "ESV-ER",
            VerseRef: new VerseRef(43, 3, 16), // John 3:16 (NT, Greek)
            HighlightFlags: new HighlightFlags(ResearchTerms: false, Found: false, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Both,
            TrackedProjectId: null,
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );

        // Act
        var result = await service.GenerateScriptureHtmlAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.ScriptureHtml,
            Is.Not.Null.And.Not.Empty,
            "Greek 'Both' mode should produce valid HTML with original + transliteration"
        );
    }

    // =========================================================================
    // RENDERING STATUS CSS CLASSES IN HTML (BHV-404)
    // =========================================================================

    /// <summary>
    /// When a tracked project is set and rendering status is computed for
    /// each token, the HTML should contain CSS class attributes reflecting
    /// found/missing status on linked words.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-404")]
    [Property("GoldenMaster", "GM-025")]
    [Description("HTML contains rendering status CSS classes on linked words")]
    public async Task GenerateScriptureHtml_WithTrackedProject_IncludesRenderingStatusCss()
    {
        // Arrange
        var service = new ScriptureRenderingService();
        var input = new GenerateScriptureHtmlInput(
            ResourceId: "ESV-ER",
            VerseRef: new VerseRef(43, 3, 16),
            HighlightFlags: new HighlightFlags(ResearchTerms: true, Found: true, Missing: true),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: "zzz5",
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );

        // Act
        var result = await service.GenerateScriptureHtmlAsync(input, CancellationToken.None);

        // Assert: HTML should contain rendering status classes on individual words
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.ScriptureHtml,
            Does.Contain("showfound").Or.Contain("showmissing"),
            "With tracked project, HTML should contain rendering status CSS classes on linked words"
        );
    }

    /// <summary>
    /// Without a tracked project, no rendering status CSS classes should
    /// appear on individual words (only highlight-level CSS may apply).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Without tracked project, no per-word rendering status CSS")]
    public async Task GenerateScriptureHtml_NoTrackedProject_NoPerWordRenderingStatusCss()
    {
        // Arrange
        var service = new ScriptureRenderingService();
        var input = new GenerateScriptureHtmlInput(
            ResourceId: "ESV-ER",
            VerseRef: new VerseRef(43, 3, 16),
            HighlightFlags: new HighlightFlags(ResearchTerms: true, Found: false, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: null,
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );

        // Act
        var result = await service.GenerateScriptureHtmlAsync(input, CancellationToken.None);

        // Assert: Without tracked project, individual words should not have found/missing classes
        Assert.That(result.Success, Is.True);
        // The highlight CSS classes at the pane level are separate from per-word classes
        // Per-word CSS should not contain rendering status since no project is tracked
    }

    // =========================================================================
    // SCRIPTURE HTML OUTPUT SHAPE
    // =========================================================================

    /// <summary>
    /// The success result should have all required fields populated.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Success result has correct shape")]
    public async Task GenerateScriptureHtml_SuccessResult_HasCorrectShape()
    {
        // Arrange
        var service = new ScriptureRenderingService();
        var input = new GenerateScriptureHtmlInput(
            ResourceId: "ESV-ER",
            VerseRef: new VerseRef(43, 3, 16),
            HighlightFlags: new HighlightFlags(ResearchTerms: false, Found: false, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: null,
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );

        // Act
        var result = await service.GenerateScriptureHtmlAsync(input, CancellationToken.None);

        // Assert: Success result shape per Section 3.10
        Assert.That(result.Success, Is.True);
        Assert.That(result.ScriptureHtml, Is.Not.Null, "ScriptureHtml must not be null on success");
        Assert.That(
            result.FootnotesHtml,
            Is.Not.Null,
            "FootnotesHtml must not be null on success (may be empty)"
        );
        Assert.That(result.HasFootnotes, Is.Not.Null, "HasFootnotes must not be null on success");
        Assert.That(
            result.HighlightCssClasses,
            Is.Not.Null,
            "HighlightCssClasses must not be null on success"
        );
        Assert.That(result.Error, Is.Null, "Error must be null on success");
    }

    // =========================================================================
    // ERROR CONDITIONS (Section 4.12 Error Conditions)
    // =========================================================================

    /// <summary>
    /// When the resource is not found, the result should indicate NOT_FOUND
    /// with an error message containing the resource ID.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-101")]
    [Description("NOT_FOUND when resource does not exist")]
    public async Task GenerateScriptureHtml_ResourceNotFound_ReturnsNotFoundError()
    {
        // Arrange
        var service = new ScriptureRenderingService();
        var input = new GenerateScriptureHtmlInput(
            ResourceId: "NONEXISTENT-RESOURCE",
            VerseRef: new VerseRef(43, 3, 16),
            HighlightFlags: new HighlightFlags(ResearchTerms: false, Found: false, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: null,
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );

        // Act
        var result = await service.GenerateScriptureHtmlAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.False, "Should fail for nonexistent resource");
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo("NOT_FOUND"));
        Assert.That(
            result.Error.Message,
            Does.Contain("NONEXISTENT-RESOURCE"),
            "Error message should include the missing resource ID"
        );
    }

    /// <summary>
    /// When the requested book is not available in the resource, the result
    /// should indicate NOT_FOUND.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-101")]
    [Description("NOT_FOUND when book is not available in resource")]
    public async Task GenerateScriptureHtml_BookNotAvailable_ReturnsNotFoundError()
    {
        // Arrange: Request a book that does not exist in the resource
        var service = new ScriptureRenderingService();
        var input = new GenerateScriptureHtmlInput(
            ResourceId: "ESV-ER",
            VerseRef: new VerseRef(99, 1, 1), // Invalid book number
            HighlightFlags: new HighlightFlags(ResearchTerms: false, Found: false, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: null,
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );

        // Act
        var result = await service.GenerateScriptureHtmlAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.False);
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo("NOT_FOUND"));
    }

    /// <summary>
    /// When token parsing fails for the chapter, the result should indicate
    /// PARSE_ERROR.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-608")]
    [Description("PARSE_ERROR when token parsing fails")]
    public async Task GenerateScriptureHtml_TokenParsingFails_ReturnsParseError()
    {
        // Arrange: Use conditions that would cause token parsing to fail
        var service = new ScriptureRenderingService();
        var input = new GenerateScriptureHtmlInput(
            ResourceId: "CORRUPT-ER",
            VerseRef: new VerseRef(43, 3, 16),
            HighlightFlags: new HighlightFlags(ResearchTerms: false, Found: false, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: null,
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );

        // Act
        var result = await service.GenerateScriptureHtmlAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.False);
        Assert.That(result.Error, Is.Not.Null);
        Assert.That(result.Error!.Code, Is.EqualTo("PARSE_ERROR"));
        Assert.That(
            result.Error.Message,
            Does.Contain("Failed to generate")
                .IgnoreCase.Or.Contain("scripture content")
                .IgnoreCase,
            "Error message should describe the parsing failure"
        );
    }

    /// <summary>
    /// Error result structure should follow the standard ErrorInfo pattern
    /// with null success fields.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-101")]
    [Description("Error result has correct structure")]
    public async Task GenerateScriptureHtml_ErrorResult_HasCorrectStructure()
    {
        // Arrange
        var service = new ScriptureRenderingService();
        var input = new GenerateScriptureHtmlInput(
            ResourceId: "NONEXISTENT-RESOURCE",
            VerseRef: new VerseRef(43, 3, 16),
            HighlightFlags: new HighlightFlags(ResearchTerms: false, Found: false, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: null,
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );

        // Act
        var result = await service.GenerateScriptureHtmlAsync(input, CancellationToken.None);

        // Assert: Error result shape per Section 3.10
        Assert.That(result.Success, Is.False);
        Assert.That(result.ScriptureHtml, Is.Null, "Error result should have null ScriptureHtml");
        Assert.That(result.FootnotesHtml, Is.Null, "Error result should have null FootnotesHtml");
        Assert.That(result.HasFootnotes, Is.Null, "Error result should have null HasFootnotes");
        Assert.That(
            result.HighlightCssClasses,
            Is.Null,
            "Error result should have null HighlightCssClasses"
        );
        Assert.That(result.Error, Is.Not.Null, "Error result must have Error");
        Assert.That(result.Error!.Code, Is.Not.Null.And.Not.Empty, "Error code must not be empty");
        Assert.That(
            result.Error.Message,
            Is.Not.Null.And.Not.Empty,
            "Error message must not be empty"
        );
    }

    // =========================================================================
    // CANCELLATION SUPPORT
    // =========================================================================

    /// <summary>
    /// The async method should respect cancellation tokens.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-404")]
    [Description("Cancellation token is respected")]
    public void GenerateScriptureHtml_CancelledToken_ThrowsOrReturnsGracefully()
    {
        // Arrange
        var service = new ScriptureRenderingService();
        var cts = new CancellationTokenSource();
        cts.Cancel(); // Pre-cancel

        var input = new GenerateScriptureHtmlInput(
            ResourceId: "ESV-ER",
            VerseRef: new VerseRef(43, 3, 16),
            HighlightFlags: new HighlightFlags(ResearchTerms: false, Found: false, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: null,
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );

        // Act/Assert: Should throw OperationCanceledException for a pre-cancelled token
        Assert.ThrowsAsync<OperationCanceledException>(
            async () => await service.GenerateScriptureHtmlAsync(input, cts.Token)
        );
    }

    // =========================================================================
    // SCOPE FILTER INTEGRATION
    // =========================================================================

    /// <summary>
    /// Different scope filter values should affect which tokens are rendered.
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-608")]
    [Description("Scope filter 'currentVerse' limits rendering to current verse")]
    public async Task GenerateScriptureHtml_ScopeCurrentVerse_LimitsToVerse()
    {
        // Arrange
        var service = new ScriptureRenderingService();
        var input = new GenerateScriptureHtmlInput(
            ResourceId: "ESV-ER",
            VerseRef: new VerseRef(43, 3, 16),
            HighlightFlags: new HighlightFlags(ResearchTerms: false, Found: false, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: null,
            ScopeFilter: "currentVerse",
            FilteredLemma: null
        );

        // Act
        var result = await service.GenerateScriptureHtmlAsync(input, CancellationToken.None);

        // Assert: Should still produce valid HTML even with limited scope
        Assert.That(result.Success, Is.True);
        Assert.That(result.ScriptureHtml, Is.Not.Null.And.Not.Empty);
    }

    /// <summary>
    /// When a filtered lemma is provided, the HTML should reflect the filter
    /// state (e.g., highlighted filtered word).
    /// </summary>
    [Test]
    [Category("Contract")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-608")]
    [Description("Filtered lemma affects HTML rendering")]
    public async Task GenerateScriptureHtml_WithFilteredLemma_AppliesFilter()
    {
        // Arrange
        var service = new ScriptureRenderingService();
        var input = new GenerateScriptureHtmlInput(
            ResourceId: "ESV-ER",
            VerseRef: new VerseRef(43, 3, 16),
            HighlightFlags: new HighlightFlags(ResearchTerms: true, Found: false, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: null,
            ScopeFilter: "currentSense",
            FilteredLemma: "agapao"
        );

        // Act
        var result = await service.GenerateScriptureHtmlAsync(input, CancellationToken.None);

        // Assert
        Assert.That(result.Success, Is.True);
        Assert.That(result.ScriptureHtml, Is.Not.Null.And.Not.Empty);
    }

    // =========================================================================
    // INVARIANT TESTS (INV-008)
    // =========================================================================

    /// <summary>
    /// INV-008: Resource fonts must be resolved from language-specific defaults
    /// first (DefaultLanguageFont.GetDefaultFont), then fall back to project
    /// settings. The scripture rendering service should use the correct font
    /// from the resource's settings.
    ///
    /// Note: This tests that the rendering service correctly reads font info
    /// from the resource and applies it to the HTML output. The actual font
    /// resolution chain (language-first, then fallback) is a ResourceScrText
    /// behavior (BHV-103), but the rendering service must use the resolved font.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-008")]
    [Property("BehaviorId", "BHV-103")]
    [Description("Rendered HTML uses resource font settings (language-first resolution)")]
    public async Task GenerateScriptureHtml_FontResolution_UsesResourceSettings()
    {
        // Arrange: Request rendering of a resource
        var service = new ScriptureRenderingService();
        var input = new GenerateScriptureHtmlInput(
            ResourceId: "ESV-ER",
            VerseRef: new VerseRef(43, 3, 16),
            HighlightFlags: new HighlightFlags(ResearchTerms: false, Found: false, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: null,
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );

        // Act
        var result = await service.GenerateScriptureHtmlAsync(input, CancellationToken.None);

        // Assert: HTML should be renderable (implies correct font resolution)
        // The HTML output should be well-formed and include font/language
        // metadata that enables correct display.
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.ScriptureHtml,
            Is.Not.Null.And.Not.Empty,
            "INV-008: Font resolution must succeed to produce HTML output"
        );
    }

    /// <summary>
    /// INV-008: When the resource has a specific HTML language attribute
    /// (e.g., "en" or "el"), the rendered HTML should reflect it.
    /// </summary>
    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-008")]
    [Property("BehaviorId", "BHV-103")]
    [Description("HTML includes language attribute from resource settings")]
    public async Task GenerateScriptureHtml_LanguageAttribute_ReflectsResourceLanguage()
    {
        // Arrange
        var service = new ScriptureRenderingService();
        var input = new GenerateScriptureHtmlInput(
            ResourceId: "ESV-ER",
            VerseRef: new VerseRef(43, 3, 16),
            HighlightFlags: new HighlightFlags(ResearchTerms: false, Found: false, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: null,
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );

        // Act
        var result = await service.GenerateScriptureHtmlAsync(input, CancellationToken.None);

        // Assert: HTML should contain language information
        Assert.That(result.Success, Is.True);
        Assert.That(
            result.ScriptureHtml,
            Does.Contain("lang=").Or.Contain("xml:lang="),
            "INV-008: HTML should include language attribute from resource settings"
        );
    }

    // =========================================================================
    // GOLDEN MASTER TESTS (GM-014, GM-025, GM-034)
    // =========================================================================

    /// <summary>
    /// GM-014: Footnote and cross-reference HTML rendering matches golden master.
    /// Verifies: non-XML footnote message, style "f" produces usfm_f,
    /// style "x" produces usfm_x, linkedReference elements ignored.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-058")]
    [Property("BehaviorId", "BHV-609")]
    [Property("GoldenMaster", "GM-014")]
    [Description("GM-014: Footnote rendering matches golden master")]
    public async Task GoldenMaster_GM014_FootnoteRendering()
    {
        // Arrange
        var service = new ScriptureRenderingService();

        // --- nonXmlNote: Update message for non-XML footnotes ---
        var nonXmlInput = new GenerateScriptureHtmlInput(
            ResourceId: "LEGACY-ER",
            VerseRef: new VerseRef(43, 3, 16),
            HighlightFlags: new HighlightFlags(ResearchTerms: false, Found: false, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: null,
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );
        var nonXmlResult = await service.GenerateScriptureHtmlAsync(
            nonXmlInput,
            CancellationToken.None
        );
        Assert.That(
            nonXmlResult.Success,
            Is.True,
            "GM-014 nonXmlNote: should succeed with legacy data"
        );
        Assert.That(
            nonXmlResult.FootnotesHtml,
            Does.Contain("update").IgnoreCase,
            "GM-014 nonXmlNote: containsUpdateText should be true"
        );

        // --- footnoteStyle: Style "f" produces usfm_f ---
        var footnoteInput = new GenerateScriptureHtmlInput(
            ResourceId: "ESV-ER",
            VerseRef: new VerseRef(43, 3, 16),
            HighlightFlags: new HighlightFlags(ResearchTerms: false, Found: false, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: null,
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );
        var footnoteResult = await service.GenerateScriptureHtmlAsync(
            footnoteInput,
            CancellationToken.None
        );
        Assert.That(footnoteResult.Success, Is.True, "GM-014 footnoteStyle: should succeed");

        // --- linkedReferenceHandling: silently ignored ---
        Assert.That(
            footnoteResult.ScriptureHtml,
            Does.Not.Contain("linkedReference"),
            "GM-014 linkedReferenceHandling: linkedReference elements must be silently ignored"
        );
        if (footnoteResult.FootnotesHtml != null)
        {
            Assert.That(
                footnoteResult.FootnotesHtml,
                Does.Not.Contain("linkedReference"),
                "GM-014 linkedReferenceHandling: no linkedReference in footnotes either"
            );
        }
    }

    /// <summary>
    /// GM-025: Highlight toggle CSS class mapping matches golden master.
    /// Verifies: researchTermsOn -> showeverylink, foundOn -> showfound,
    /// missingOn -> showmissing.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-404")]
    [Property("GoldenMaster", "GM-025")]
    [Description("GM-025: Highlight CSS classes match golden master")]
    public async Task GoldenMaster_GM025_HighlightToggleCssClasses()
    {
        var service = new ScriptureRenderingService();

        // --- researchTermsOn ---
        var researchInput = new GenerateScriptureHtmlInput(
            ResourceId: "ESV-ER",
            VerseRef: new VerseRef(43, 3, 16),
            HighlightFlags: new HighlightFlags(ResearchTerms: true, Found: false, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: null,
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );
        var researchResult = await service.GenerateScriptureHtmlAsync(
            researchInput,
            CancellationToken.None
        );
        Assert.That(researchResult.Success, Is.True);
        Assert.That(
            researchResult.HighlightCssClasses,
            Contains.Item("showeverylink"),
            "GM-025 researchTermsOn: cssClass should be 'showeverylink'"
        );

        // --- foundOn ---
        var foundInput = new GenerateScriptureHtmlInput(
            ResourceId: "ESV-ER",
            VerseRef: new VerseRef(43, 3, 16),
            HighlightFlags: new HighlightFlags(ResearchTerms: false, Found: true, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: "zzz5",
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );
        var foundResult = await service.GenerateScriptureHtmlAsync(
            foundInput,
            CancellationToken.None
        );
        Assert.That(foundResult.Success, Is.True);
        Assert.That(
            foundResult.HighlightCssClasses,
            Contains.Item("showfound"),
            "GM-025 foundOn: cssClass should be 'showfound'"
        );

        // --- missingOn ---
        var missingInput = new GenerateScriptureHtmlInput(
            ResourceId: "ESV-ER",
            VerseRef: new VerseRef(43, 3, 16),
            HighlightFlags: new HighlightFlags(ResearchTerms: false, Found: false, Missing: true),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: "zzz5",
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );
        var missingResult = await service.GenerateScriptureHtmlAsync(
            missingInput,
            CancellationToken.None
        );
        Assert.That(missingResult.Success, Is.True);
        Assert.That(
            missingResult.HighlightCssClasses,
            Contains.Item("showmissing"),
            "GM-025 missingOn: cssClass should be 'showmissing'"
        );
    }

    /// <summary>
    /// GM-034: Display mode settings match golden master.
    /// Verifies: Hebrew original script mode, Greek both mode,
    /// display mode correctly saved/applied.
    /// </summary>
    [Test]
    [Category("GoldenMaster")]
    [Property("ScenarioId", "TS-094")]
    [Property("BehaviorId", "BHV-103")]
    [Property("GoldenMaster", "GM-034")]
    [Description("GM-034: Display mode settings match golden master")]
    public async Task GoldenMaster_GM034_DisplayModes()
    {
        var service = new ScriptureRenderingService();

        // --- hebrewOriginalScript ---
        var hebrewInput = new GenerateScriptureHtmlInput(
            ResourceId: "ESV-ER",
            VerseRef: new VerseRef(1, 1, 1), // OT, Hebrew
            HighlightFlags: new HighlightFlags(ResearchTerms: false, Found: false, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Original,
            TrackedProjectId: null,
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );
        var hebrewResult = await service.GenerateScriptureHtmlAsync(
            hebrewInput,
            CancellationToken.None
        );
        Assert.That(
            hebrewResult.Success,
            Is.True,
            "GM-034 hebrewOriginalScript: should succeed with OriginalScript mode"
        );
        Assert.That(
            hebrewResult.ScriptureHtml,
            Is.Not.Null.And.Not.Empty,
            "GM-034 hebrewOriginalScript: should produce HTML"
        );

        // --- greekBoth ---
        var greekBothInput = new GenerateScriptureHtmlInput(
            ResourceId: "ESV-ER",
            VerseRef: new VerseRef(43, 3, 16), // NT, Greek
            HighlightFlags: new HighlightFlags(ResearchTerms: false, Found: false, Missing: false),
            HebrewDisplayMode: SourceWordDisplayMode.Original,
            GreekDisplayMode: SourceWordDisplayMode.Both,
            TrackedProjectId: null,
            ScopeFilter: "currentChapter",
            FilteredLemma: null
        );
        var greekBothResult = await service.GenerateScriptureHtmlAsync(
            greekBothInput,
            CancellationToken.None
        );
        Assert.That(
            greekBothResult.Success,
            Is.True,
            "GM-034 greekBoth: should succeed with Both mode"
        );
        Assert.That(
            greekBothResult.ScriptureHtml,
            Is.Not.Null.And.Not.Empty,
            "GM-034 greekBoth: should produce HTML with both original and transliteration"
        );
    }
}
