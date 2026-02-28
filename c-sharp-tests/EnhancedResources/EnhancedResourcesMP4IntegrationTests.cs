using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider.EnhancedResources;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Integration tests for Micro-Phase 4 (BE-4: Content) capability chains.
///
/// These tests verify cross-capability interactions between:
/// - CAP-005 (GetEncyclopediaEntry): Retrieves encyclopedia entries with V1/V2 formats and language fallback
/// - CAP-006 (GetImageMetadata): Retrieves image/video metadata with reference ranges and collection classification
/// - CAP-007 (GetImageData): Retrieves actual image bytes as base64 with quality tiers and MIME type
/// - CAP-011 (GetSemanticDomains): Retrieves semantic domain hierarchy with breadcrumbs and code ranges
///
/// Integration Touchpoints:
/// 1. CAP-005 -> CAP-006: Encyclopedia entry imageIds feed into image metadata lookup
/// 2. CAP-005 -> CAP-007: Encyclopedia entry imageIds feed into image data retrieval
/// 3. CAP-005 -> CAP-011: Encyclopedia entries reference thematic/domain content
/// 4. CAP-006 -> CAP-007: Image metadata (imageId) feeds into image data retrieval
/// 5. Full pipeline: CAP-005 -> CAP-006 -> CAP-007 -> CAP-011
/// 6. Error isolation: failure in one capability does not crash another
///
/// These tests override the static test seams to create a consistent cross-capability
/// data layer where encyclopedia imageIds resolve correctly in ImageService, and
/// encyclopedia domain references resolve in LexiconService's semantic domain data.
/// </summary>
[TestFixture]
[Category("Integration")]
[ExcludeFromCodeCoverage]
public class EnhancedResourcesMP4IntegrationTests
{
    // =========================================================================
    // TEST SETUP - Save/restore test seams for cross-capability integration
    // =========================================================================

    private Func<bool>? _savedIsEncyclopediaLoaded;
    private Func<string, string, EncyclopediaEntry?>? _savedEntryLookup;
    private Func<string, EncyclopediaParagraph?>? _savedFormatParagraph;
    private Func<bool>? _savedIsImageMetadataLoaded;
    private Func<string, List<ImageMetadata>>? _savedImageLookupByRef;
    private Func<string, ImageMetadata?>? _savedImageLookupById;
    private Func<
        string,
        string,
        (byte[] Bytes, string MimeType, int Width, int Height)?
    >? _savedImageDataRetriever;
    private Func<string, bool>? _savedIsSemanticDomainDataLoaded;
    private Func<
        string,
        string,
        string,
        (SemanticDomainNode Root, IReadOnlyList<SemanticDomainBreadcrumb> Breadcrumbs)?
    >? _savedSemanticDomainLookup;

    [SetUp]
    public void SetUp()
    {
        // Save existing seams
        _savedIsEncyclopediaLoaded = EncyclopediaService.TestIsEncyclopediaLoaded;
        _savedEntryLookup = EncyclopediaService.TestEntryLookup;
        _savedFormatParagraph = EncyclopediaService.TestFormatParagraph;
        _savedIsImageMetadataLoaded = ImageService.TestIsImageMetadataLoaded;
        _savedImageLookupByRef = ImageService.TestImageLookupByRef;
        _savedImageLookupById = ImageService.TestImageLookupById;
        _savedImageDataRetriever = ImageService.TestImageDataRetriever;
        _savedIsSemanticDomainDataLoaded = LexiconService.TestIsSemanticDomainDataLoaded;
        _savedSemanticDomainLookup = LexiconService.TestSemanticDomainLookup;

        // Configure integration test seams that create a consistent cross-capability data layer

        // CAP-005: Encyclopedia loaded and entries available
        EncyclopediaService.TestIsEncyclopediaLoaded = () => true;

        EncyclopediaService.TestEntryLookup = (entryId, languageId) =>
        {
            return BuildIntegrationEncyclopediaEntry(entryId, languageId);
        };

        EncyclopediaService.TestFormatParagraph = (rawXml) =>
            new EncyclopediaParagraph(
                Html: $"<p>{rawXml}</p>",
                Text: rawXml,
                InlineElements: new List<InlineElement>()
            );

        // CAP-006: Image metadata loaded and lookup by ID works for encyclopedia imageIds
        ImageService.TestIsImageMetadataLoaded = () => true;

        ImageService.TestImageLookupById = (imageId) =>
        {
            return BuildIntegrationImageById(imageId);
        };

        ImageService.TestImageLookupByRef = (verseRef) =>
        {
            return BuildIntegrationImagesByRef(verseRef);
        };

        // CAP-007: Image data retriever returns bytes for known images
        ImageService.TestImageDataRetriever = (imageId, quality) =>
        {
            return BuildIntegrationImageData(imageId, quality);
        };

        // CAP-011: Semantic domain data loaded and lookup available
        LexiconService.TestIsSemanticDomainDataLoaded = (_) => true;

        LexiconService.TestSemanticDomainLookup = (dictionary, domainId, resourceId) =>
        {
            return BuildIntegrationSemanticDomain(dictionary, domainId);
        };
    }

    [TearDown]
    public void TearDown()
    {
        // Restore all seams to their pre-test state
        EncyclopediaService.TestIsEncyclopediaLoaded = _savedIsEncyclopediaLoaded;
        EncyclopediaService.TestEntryLookup = _savedEntryLookup;
        EncyclopediaService.TestFormatParagraph = _savedFormatParagraph;
        ImageService.TestIsImageMetadataLoaded = _savedIsImageMetadataLoaded;
        ImageService.TestImageLookupByRef = _savedImageLookupByRef;
        ImageService.TestImageLookupById = _savedImageLookupById;
        ImageService.TestImageDataRetriever = _savedImageDataRetriever;
        LexiconService.TestIsSemanticDomainDataLoaded = _savedIsSemanticDomainDataLoaded;
        LexiconService.TestSemanticDomainLookup = _savedSemanticDomainLookup;
    }

    // =========================================================================
    // CHAIN 1: CAP-005 -> CAP-006
    // Encyclopedia entry imageIds -> Image metadata lookup
    // =========================================================================

    /// <summary>
    /// Integration: GetEncyclopediaEntry (CAP-005) returns an EncyclopediaEntry with
    /// imageIds referencing associated images. GetImageMetadata (CAP-006) uses those
    /// imageIds to retrieve image metadata (collection, format, reference range).
    ///
    /// This verifies the data flow: encyclopedia entries carry imageIds that can be
    /// resolved to full image metadata via CAP-006's ID-based lookup path.
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-005 -> CAP-006")]
    [Property("CapabilityId", "CAP-005,CAP-006")]
    [Property("ScenarioId", "TS-038,TS-042")]
    [Property("BehaviorId", "BHV-304,BHV-305")]
    [Property("GoldenMaster", "GM-009,GM-010")]
    [Description(
        "Encyclopedia entry imageIds resolve to valid image metadata via GetImageMetadata"
    )]
    public async Task EncyclopediaEntryThenImageMetadata_ImageIdsResolvable_MetadataReturned()
    {
        // Step 1: CAP-005 - Retrieve encyclopedia entry with associated images
        var encyclopediaInput = new EncyclopediaLookupInput(
            EntryId: "LION",
            ResourceLanguageId: "en",
            UiLanguageId: "en"
        );
        var encyclopediaResult = await EncyclopediaService.GetEncyclopediaEntryAsync(
            encyclopediaInput,
            CancellationToken.None
        );

        Assert.That(
            encyclopediaResult.Success,
            Is.True,
            "CAP-005: Encyclopedia entry lookup should succeed"
        );
        var entry = encyclopediaResult.Entries![0];
        Assert.That(
            entry.ImageIds,
            Is.Not.Null.And.Not.Empty,
            "CAP-005: Encyclopedia entry should have associated imageIds"
        );

        // Step 2: CAP-006 - Use each imageId from the encyclopedia entry to look up metadata
        foreach (var imageId in entry.ImageIds)
        {
            var imageInput = new ImageRetrievalInput(
                ImageId: imageId,
                VerseRef: null,
                Collection: null,
                Quality: "standardDef",
                LanguageId: "en",
                TabType: null
            );
            var imageResult = await ImageService.GetImageMetadataAsync(
                imageInput,
                CancellationToken.None
            );

            Assert.That(
                imageResult.Success,
                Is.True,
                $"CAP-006: Image metadata for '{imageId}' from encyclopedia entry should be found"
            );
            Assert.That(
                imageResult.Images,
                Is.Not.Null.And.Not.Empty,
                $"CAP-006: Image '{imageId}' should have metadata"
            );

            var image = imageResult.Images![0];
            Assert.That(
                image.ImageId,
                Is.Not.Null.And.Not.Empty,
                "CAP-006: Image metadata should have an ID"
            );
            Assert.That(
                image.Collection,
                Is.Not.Null.And.Not.Empty,
                "CAP-006: Image metadata should have a collection"
            );
            Assert.That(
                image.Format,
                Is.Not.Null.And.Not.Empty,
                "CAP-006: Image metadata should have a format"
            );
        }
    }

    // =========================================================================
    // CHAIN 2: CAP-005 -> CAP-007
    // Encyclopedia entry imageIds -> Image data (base64 bytes)
    // =========================================================================

    /// <summary>
    /// Integration: GetEncyclopediaEntry (CAP-005) returns imageIds associated with
    /// the article. GetImageData (CAP-007) retrieves the actual image bytes (base64)
    /// for each imageId, ready for inline display in the article viewer.
    ///
    /// This verifies the complete image display pipeline: encyclopedia article
    /// identifies needed images -> image data retrieval produces displayable content.
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-005 -> CAP-007")]
    [Property("CapabilityId", "CAP-005,CAP-007")]
    [Property("ScenarioId", "TS-038,TS-085")]
    [Property("BehaviorId", "BHV-304,BHV-305")]
    [Property("GoldenMaster", "GM-009,GM-010")]
    [Description(
        "Encyclopedia entry imageIds resolve to displayable base64 image data via GetImageData"
    )]
    public async Task EncyclopediaEntryThenImageData_ImageIdsRetrievable_Base64DataReturned()
    {
        // Step 1: CAP-005 - Retrieve encyclopedia entry
        var encyclopediaInput = new EncyclopediaLookupInput(
            EntryId: "LION",
            ResourceLanguageId: "en",
            UiLanguageId: "en"
        );
        var encyclopediaResult = await EncyclopediaService.GetEncyclopediaEntryAsync(
            encyclopediaInput,
            CancellationToken.None
        );

        Assert.That(encyclopediaResult.Success, Is.True, "CAP-005: Entry lookup should succeed");
        var entry = encyclopediaResult.Entries![0];
        Assert.That(entry.ImageIds, Is.Not.Null.And.Not.Empty, "CAP-005: Entry has imageIds");

        // Step 2: CAP-007 - Retrieve image data for each imageId from the encyclopedia entry
        foreach (var imageId in entry.ImageIds)
        {
            var imageDataInput = new ImageRetrievalInput(
                ImageId: imageId,
                VerseRef: null,
                Collection: null,
                Quality: "standardDef",
                LanguageId: "en",
                TabType: null
            );
            var imageDataResult = await ImageService.GetImageDataAsync(
                imageDataInput,
                CancellationToken.None
            );

            Assert.That(
                imageDataResult.Success,
                Is.True,
                $"CAP-007: Image data for '{imageId}' from encyclopedia should be retrievable"
            );
            Assert.That(
                imageDataResult.ImageBase64,
                Is.Not.Null.And.Not.Empty,
                $"CAP-007: Image '{imageId}' should have base64 data"
            );
            Assert.That(
                imageDataResult.MimeType,
                Does.StartWith("image/"),
                $"CAP-007: Image '{imageId}' should have a valid MIME type"
            );
            Assert.That(
                imageDataResult.Width,
                Is.GreaterThan(0),
                $"CAP-007: Image '{imageId}' should have positive width"
            );
            Assert.That(
                imageDataResult.Height,
                Is.GreaterThan(0),
                $"CAP-007: Image '{imageId}' should have positive height"
            );
        }
    }

    // =========================================================================
    // CHAIN 3: CAP-005 -> CAP-011
    // Encyclopedia thematic content -> Semantic domain hierarchy
    // =========================================================================

    /// <summary>
    /// Integration: Encyclopedia entries relate to semantic domains through the
    /// encyclopedia's thematic content structure. When an encyclopedia entry about
    /// a topic (e.g., "LION" / FAUNA) is retrieved, the semantic domain system
    /// should be able to look up related domain hierarchies.
    ///
    /// This tests the conceptual relationship: encyclopedia content and semantic
    /// domains share thematic organization. A user viewing an encyclopedia article
    /// about fauna can navigate to related semantic domains.
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-005 -> CAP-011")]
    [Property("CapabilityId", "CAP-005,CAP-011")]
    [Property("ScenarioId", "TS-038,TS-088")]
    [Property("BehaviorId", "BHV-304,BHV-309")]
    [Property("GoldenMaster", "GM-009,GM-022")]
    [Description(
        "Encyclopedia entry thematic content relates to semantic domain hierarchy; "
            + "both capabilities provide consistent content navigation"
    )]
    public async Task EncyclopediaThenSemanticDomains_ThematicContent_BothReturnValidContent()
    {
        // Step 1: CAP-005 - Retrieve encyclopedia entry for a thematic topic (FAUNA)
        var encyclopediaInput = new EncyclopediaLookupInput(
            EntryId: "LION",
            ResourceLanguageId: "en",
            UiLanguageId: "en"
        );
        var encyclopediaResult = await EncyclopediaService.GetEncyclopediaEntryAsync(
            encyclopediaInput,
            CancellationToken.None
        );

        Assert.That(
            encyclopediaResult.Success,
            Is.True,
            "Step 1 (CAP-005): Encyclopedia entry should succeed"
        );
        var entry = encyclopediaResult.Entries![0];
        Assert.That(
            entry.SectionType,
            Is.EqualTo("FAUNA"),
            "Step 1 (CAP-005): LION entry should be FAUNA section type"
        );

        // Step 2: CAP-011 - Look up a semantic domain that relates to fauna/animals
        // Semantic domain "001" in SDBG contains top-level domains including animals
        var domainInput = new SemanticDomainInput(
            DomainId: "004",
            Dictionary: "SDBG",
            ResourceId: "test-resource"
        );
        var domainResult = await LexiconService.GetSemanticDomainsAsync(
            domainInput,
            CancellationToken.None
        );

        Assert.That(
            domainResult.Success,
            Is.True,
            "Step 2 (CAP-011): Semantic domain lookup should succeed"
        );
        Assert.That(
            domainResult.RootDomain,
            Is.Not.Null,
            "Step 2 (CAP-011): Root domain should be present"
        );
        Assert.That(
            domainResult.Breadcrumbs,
            Is.Not.Null.And.Not.Empty,
            "Step 2 (CAP-011): Breadcrumbs should trace path from root"
        );

        // Both capabilities return structured, navigable content
        // The encyclopedia provides human-readable articles, while semantic domains
        // provide hierarchical categorization of the same conceptual space
        Assert.That(
            entry.Paragraphs,
            Is.Not.Null.And.Not.Empty,
            "CAP-005: Encyclopedia has paragraph content"
        );
        Assert.That(
            domainResult.RootDomain!.DisplayName,
            Is.Not.Null.And.Not.Empty,
            "CAP-011: Semantic domain has display name"
        );
    }

    // =========================================================================
    // CHAIN 4: CAP-006 -> CAP-007
    // Image metadata -> Image data retrieval
    // =========================================================================

    /// <summary>
    /// Integration: GetImageMetadata (CAP-006) returns ImageMetadata objects with
    /// imageId fields. GetImageData (CAP-007) uses those imageIds to retrieve the
    /// actual image bytes. This is the core image display pipeline.
    ///
    /// This verifies that metadata imageIds produced by CAP-006 are consumable
    /// by CAP-007's data retrieval path.
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-006 -> CAP-007")]
    [Property("CapabilityId", "CAP-006,CAP-007")]
    [Property("ScenarioId", "TS-042,TS-085")]
    [Property("BehaviorId", "BHV-305")]
    [Property("GoldenMaster", "GM-010")]
    [Description("Image metadata imageIds from CAP-006 resolve to image data via CAP-007")]
    public async Task ImageMetadataThenImageData_MetadataIdsResolve_DataRetrieved()
    {
        // Step 1: CAP-006 - Get image metadata by verse reference
        var metadataInput = new ImageRetrievalInput(
            ImageId: null,
            VerseRef: "MAT 1:1",
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: "images"
        );
        var metadataResult = await ImageService.GetImageMetadataAsync(
            metadataInput,
            CancellationToken.None
        );

        Assert.That(
            metadataResult.Success,
            Is.True,
            "Step 1 (CAP-006): Image metadata retrieval should succeed"
        );
        Assert.That(
            metadataResult.Images,
            Is.Not.Null.And.Not.Empty,
            "Step 1 (CAP-006): Should have images for MAT 1:1"
        );

        // Step 2: CAP-007 - For each image from metadata, retrieve the actual data
        var nonOnlineImages = metadataResult.Images!.Where(img => !img.IsOnline).ToList();
        Assert.That(
            nonOnlineImages,
            Is.Not.Empty,
            "Should have at least one non-online (local) image for data retrieval"
        );

        foreach (var image in nonOnlineImages)
        {
            var dataInput = new ImageRetrievalInput(
                ImageId: image.ImageId,
                VerseRef: null,
                Collection: null,
                Quality: "standardDef",
                LanguageId: "en",
                TabType: null
            );
            var dataResult = await ImageService.GetImageDataAsync(
                dataInput,
                CancellationToken.None
            );

            Assert.That(
                dataResult.Success,
                Is.True,
                $"Step 2 (CAP-007): Image data for metadata ID '{image.ImageId}' should succeed"
            );
            Assert.That(
                dataResult.ImageBase64,
                Is.Not.Null.And.Not.Empty,
                $"Step 2 (CAP-007): Image '{image.ImageId}' should have base64 data"
            );
            Assert.That(
                dataResult.MimeType,
                Does.StartWith("image/"),
                $"Step 2 (CAP-007): Image '{image.ImageId}' should have valid MIME type"
            );
        }
    }

    // =========================================================================
    // CHAIN 5: Full Content Pipeline
    // CAP-005 -> CAP-006 -> CAP-007 -> CAP-011
    // =========================================================================

    /// <summary>
    /// Integration: Full content pipeline test - encyclopedia entry (CAP-005) provides
    /// imageIds and thematic content. Image metadata (CAP-006) provides format/collection
    /// info for those images. Image data (CAP-007) provides displayable base64 bytes.
    /// Semantic domains (CAP-011) provide the hierarchical domain navigation.
    ///
    /// This tests the complete user experience: viewing an encyclopedia article with
    /// associated images and domain navigation.
    ///
    /// Step 1: CAP-005 - Load encyclopedia article with imageIds
    /// Step 2: CAP-006 - Get image metadata for each imageId
    /// Step 3: CAP-007 - Get image data (base64) for displayable images
    /// Step 4: CAP-011 - Load semantic domain hierarchy for domain navigation
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-005 -> CAP-006 -> CAP-007 -> CAP-011")]
    [Property("CapabilityId", "CAP-005,CAP-006,CAP-007,CAP-011")]
    [Property("ScenarioId", "TS-038,TS-042,TS-085,TS-088")]
    [Property("BehaviorId", "BHV-304,BHV-305,BHV-309")]
    [Property("GoldenMaster", "GM-009,GM-010,GM-022")]
    [Description(
        "Full content pipeline: encyclopedia -> image metadata -> image data -> semantic domains"
    )]
    public async Task FullContentPipeline_EncyclopediaToDomainsWithImages_AllCapabilitiesSucceed()
    {
        // Step 1: CAP-005 - Retrieve encyclopedia article
        var encyclopediaInput = new EncyclopediaLookupInput(
            EntryId: "LION",
            ResourceLanguageId: "en",
            UiLanguageId: "en"
        );
        var encyclopediaResult = await EncyclopediaService.GetEncyclopediaEntryAsync(
            encyclopediaInput,
            CancellationToken.None
        );

        Assert.That(
            encyclopediaResult.Success,
            Is.True,
            "Step 1 (CAP-005): Encyclopedia article should load"
        );
        var article = encyclopediaResult.Entries![0];
        Assert.That(article.Paragraphs, Is.Not.Null.And.Not.Empty, "Step 1: Article has content");
        Assert.That(article.ImageIds, Is.Not.Null.And.Not.Empty, "Step 1: Article has imageIds");

        // Step 2: CAP-006 - Get metadata for the first image from the encyclopedia
        var firstImageId = article.ImageIds[0];
        var metadataInput = new ImageRetrievalInput(
            ImageId: firstImageId,
            VerseRef: null,
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: null
        );
        var metadataResult = await ImageService.GetImageMetadataAsync(
            metadataInput,
            CancellationToken.None
        );

        Assert.That(
            metadataResult.Success,
            Is.True,
            $"Step 2 (CAP-006): Image metadata for '{firstImageId}' should be available"
        );
        var imageMetadata = metadataResult.Images![0];
        Assert.That(
            imageMetadata.Format,
            Is.Not.Null.And.Not.Empty,
            "Step 2: Image format populated"
        );

        // Step 3: CAP-007 - Get the actual image data (base64) for display
        var dataInput = new ImageRetrievalInput(
            ImageId: firstImageId,
            VerseRef: null,
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: null
        );
        var dataResult = await ImageService.GetImageDataAsync(dataInput, CancellationToken.None);

        Assert.That(
            dataResult.Success,
            Is.True,
            $"Step 3 (CAP-007): Image data for '{firstImageId}' should be retrievable"
        );
        Assert.That(
            dataResult.ImageBase64,
            Is.Not.Null.And.Not.Empty,
            "Step 3: Base64 image data present"
        );
        Assert.That(dataResult.MimeType, Does.StartWith("image/"), "Step 3: Valid MIME type");

        // Step 4: CAP-011 - Load semantic domain hierarchy (thematic navigation)
        var domainInput = new SemanticDomainInput(
            DomainId: "001",
            Dictionary: "SDBG",
            ResourceId: "test-resource"
        );
        var domainResult = await LexiconService.GetSemanticDomainsAsync(
            domainInput,
            CancellationToken.None
        );

        Assert.That(
            domainResult.Success,
            Is.True,
            "Step 4 (CAP-011): Semantic domain hierarchy should load"
        );
        Assert.That(domainResult.RootDomain, Is.Not.Null, "Step 4: Root domain present");
        Assert.That(
            domainResult.Breadcrumbs,
            Is.Not.Null.And.Not.Empty,
            "Step 4: Breadcrumbs present"
        );

        // Cross-capability consistency: All four capabilities return valid content
        // that together form a complete research view for the user
        Assert.That(article.EntryId, Is.EqualTo("LION"), "Article identity preserved");
        Assert.That(
            imageMetadata.ImageId,
            Is.Not.Null.And.Not.Empty,
            "Image metadata identity preserved"
        );
        Assert.That(dataResult.Width, Is.GreaterThan(0), "Image data has valid dimensions");
        Assert.That(
            domainResult.RootDomain!.Id,
            Is.Not.Null.And.Not.Empty,
            "Domain identity preserved"
        );
    }

    // =========================================================================
    // CHAIN 6: Error Isolation
    // Encyclopedia failure does NOT crash image or domain lookup
    // =========================================================================

    /// <summary>
    /// Integration: When GetEncyclopediaEntry (CAP-005) fails (entry not found),
    /// GetImageMetadata (CAP-006) and GetSemanticDomains (CAP-011) should still
    /// work independently. Failure in one content capability must not cascade.
    ///
    /// This tests the error isolation contract: capabilities share the same
    /// resource infrastructure but have independent failure modes.
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-005 (fail) + CAP-006 + CAP-011")]
    [Property("CapabilityId", "CAP-005,CAP-006,CAP-011")]
    [Property("ScenarioId", "TS-038,TS-042,TS-088")]
    [Property("BehaviorId", "BHV-304,BHV-305,BHV-309")]
    [Description("Encyclopedia failure does not prevent image metadata or semantic domain lookups")]
    public async Task ErrorIsolation_EncyclopediaFails_ImageAndDomainStillWork()
    {
        // Act: CAP-005 - Request a non-existent encyclopedia entry (will fail)
        var encyclopediaInput = new EncyclopediaLookupInput(
            EntryId: "NONEXISTENT_ENTRY",
            ResourceLanguageId: "en",
            UiLanguageId: "en"
        );
        var encyclopediaResult = await EncyclopediaService.GetEncyclopediaEntryAsync(
            encyclopediaInput,
            CancellationToken.None
        );

        // Assert: CAP-005 fails with NOT_FOUND
        Assert.That(
            encyclopediaResult.Success,
            Is.False,
            "CAP-005: Non-existent entry should fail"
        );
        Assert.That(
            encyclopediaResult.Error!.Code,
            Is.EqualTo("NOT_FOUND"),
            "CAP-005: Error should be NOT_FOUND"
        );

        // Act: CAP-006 - Image metadata lookup should still work (independent)
        var imageInput = new ImageRetrievalInput(
            ImageId: "lion_01.jpg",
            VerseRef: null,
            Collection: null,
            Quality: "standardDef",
            LanguageId: "en",
            TabType: null
        );
        var imageResult = await ImageService.GetImageMetadataAsync(
            imageInput,
            CancellationToken.None
        );

        Assert.That(
            imageResult.Success,
            Is.True,
            "CAP-006: Image metadata should succeed despite encyclopedia failure"
        );
        Assert.That(
            imageResult.Images,
            Is.Not.Null.And.Not.Empty,
            "CAP-006: Image metadata returned independently"
        );

        // Act: CAP-011 - Semantic domain lookup should still work (independent)
        var domainInput = new SemanticDomainInput(
            DomainId: "001",
            Dictionary: "SDBG",
            ResourceId: "test-resource"
        );
        var domainResult = await LexiconService.GetSemanticDomainsAsync(
            domainInput,
            CancellationToken.None
        );

        Assert.That(
            domainResult.Success,
            Is.True,
            "CAP-011: Semantic domain should succeed despite encyclopedia failure"
        );
        Assert.That(
            domainResult.RootDomain,
            Is.Not.Null,
            "CAP-011: Domain hierarchy returned independently"
        );
    }

    // =========================================================================
    // CHAIN 7: Consistent Error Patterns Across MP4 Capabilities
    // =========================================================================

    /// <summary>
    /// Integration: When items are not found, all MP4 capabilities return NOT_FOUND
    /// error codes with consistent error structure (Success=false, Error.Code, Error.Message).
    ///
    /// This verifies the shared error factory infrastructure produces consistent
    /// error structures across all content capability boundaries.
    /// </summary>
    [Test]
    [Property("IntegrationChain", "CAP-005 + CAP-006 + CAP-007 + CAP-011")]
    [Property("CapabilityId", "CAP-005,CAP-006,CAP-007,CAP-011")]
    [Property("ScenarioId", "TS-038,TS-042,TS-085,TS-088")]
    [Property("BehaviorId", "BHV-304,BHV-305,BHV-309")]
    [Description("NOT_FOUND error codes are consistent across all MP4 capabilities")]
    public async Task SharedErrorPatterns_NotFoundErrors_ConsistentAcrossMP4Capabilities()
    {
        // CAP-005: Encyclopedia entry not found
        var encyclopediaResult = await EncyclopediaService.GetEncyclopediaEntryAsync(
            new EncyclopediaLookupInput("NONEXISTENT", "en", "en"),
            CancellationToken.None
        );

        // CAP-006: Image not found by ID
        // Override the lookup temporarily to return empty for an unknown image
        var savedById = ImageService.TestImageLookupById;
        ImageService.TestImageLookupById = (id) =>
            id == "UNKNOWN_IMG" ? null : savedById?.Invoke(id);
        var imageMetadataResult = await ImageService.GetImageMetadataAsync(
            new ImageRetrievalInput("UNKNOWN_IMG", null, null, "standardDef", "en", null),
            CancellationToken.None
        );
        ImageService.TestImageLookupById = savedById;

        // CAP-007: Image data not found
        var savedDataRetriever = ImageService.TestImageDataRetriever;
        ImageService.TestImageDataRetriever = (id, q) =>
            id == "UNKNOWN_IMG" ? null : savedDataRetriever?.Invoke(id, q);
        var imageDataResult = await ImageService.GetImageDataAsync(
            new ImageRetrievalInput("UNKNOWN_IMG", null, null, "standardDef", "en", null),
            CancellationToken.None
        );
        ImageService.TestImageDataRetriever = savedDataRetriever;

        // CAP-011: Semantic domain not found
        var savedDomainLookup = LexiconService.TestSemanticDomainLookup;
        LexiconService.TestSemanticDomainLookup = (dict, id, res) =>
            id == "NONEXISTENT" ? null : savedDomainLookup?.Invoke(dict, id, res);
        var domainResult = await LexiconService.GetSemanticDomainsAsync(
            new SemanticDomainInput("NONEXISTENT", "SDBG", "test-resource"),
            CancellationToken.None
        );
        LexiconService.TestSemanticDomainLookup = savedDomainLookup;

        // Assert: All return NOT_FOUND with consistent error structure
        Assert.That(encyclopediaResult.Success, Is.False, "CAP-005: NOT_FOUND means Success=false");
        Assert.That(
            encyclopediaResult.Error!.Code,
            Is.EqualTo("NOT_FOUND"),
            "CAP-005: NOT_FOUND error code"
        );
        Assert.That(
            encyclopediaResult.Error.Message,
            Is.Not.Null.And.Not.Empty,
            "CAP-005: Error message should be present"
        );

        Assert.That(
            imageMetadataResult.Success,
            Is.False,
            "CAP-006: NOT_FOUND means Success=false"
        );
        Assert.That(
            imageMetadataResult.Error!.Code,
            Is.EqualTo("NOT_FOUND"),
            "CAP-006: NOT_FOUND error code"
        );
        Assert.That(
            imageMetadataResult.Error.Message,
            Is.Not.Null.And.Not.Empty,
            "CAP-006: Error message should be present"
        );

        Assert.That(imageDataResult.Success, Is.False, "CAP-007: NOT_FOUND means Success=false");
        Assert.That(
            imageDataResult.Error!.Code,
            Is.EqualTo("NOT_FOUND"),
            "CAP-007: NOT_FOUND error code"
        );
        Assert.That(
            imageDataResult.Error.Message,
            Is.Not.Null.And.Not.Empty,
            "CAP-007: Error message should be present"
        );

        Assert.That(domainResult.Success, Is.False, "CAP-011: NOT_FOUND means Success=false");
        Assert.That(
            domainResult.Error!.Code,
            Is.EqualTo("NOT_FOUND"),
            "CAP-011: NOT_FOUND error code"
        );
        Assert.That(
            domainResult.Error.Message,
            Is.Not.Null.And.Not.Empty,
            "CAP-011: Error message should be present"
        );
    }

    // =========================================================================
    // INTEGRATION DATA BUILDERS
    // Create a consistent cross-capability data layer for integration tests
    // =========================================================================

    /// <summary>
    /// Builds encyclopedia entries for integration testing.
    /// ImageIds in the entries match imageIds that ImageService can resolve.
    /// </summary>
    private static EncyclopediaEntry? BuildIntegrationEncyclopediaEntry(
        string entryId,
        string languageId
    )
    {
        if (entryId == "LION" && (languageId == "en" || languageId == "fr"))
        {
            return new EncyclopediaEntry(
                EntryId: "LION",
                Title: languageId == "fr" ? "Lion" : "Lion",
                FormatVersion: "V1",
                SectionType: "FAUNA",
                Paragraphs: new List<EncyclopediaParagraph>
                {
                    new(
                        Html: "<p>Lions were once common in Palestine. See also Leopard.</p>",
                        Text: "Lions were once common in Palestine. See also Leopard.",
                        InlineElements: new List<InlineElement>
                        {
                            new SeeAlsoElement(EntryId: "LEOPARD", DisplayText: "Leopard"),
                            new ScriptureRefElement(
                                VerseRef: "JDG 14:5",
                                DisplayText: "Judges 14:5"
                            ),
                        }
                    ),
                    new(
                        Html: "<p>The OT mentions lions frequently.</p>",
                        Text: "The OT mentions lions frequently.",
                        InlineElements: new List<InlineElement>
                        {
                            new AbbreviationElement(Key: "OT", Definition: "Old Testament"),
                        }
                    ),
                },
                LanguageId: languageId,
                // CRITICAL: These imageIds must match what BuildIntegrationImageById can resolve
                ImageIds: new List<string> { "lion_01.jpg", "lion_habitat_02.jpg" }
            );
        }

        if (entryId == "SACRIFICE" && languageId == "en")
        {
            return new EncyclopediaEntry(
                EntryId: "SACRIFICE",
                Title: "Sacrifice",
                FormatVersion: "V2",
                SectionType: "REALIA",
                Paragraphs: new List<EncyclopediaParagraph>
                {
                    new(
                        Html: "<p>Sacrifices were central to ancient worship.</p>",
                        Text: "Sacrifices were central to ancient worship.",
                        InlineElements: new List<InlineElement>
                        {
                            new ScriptureRefElement("LEV 1:1", "Leviticus 1:1"),
                        }
                    ),
                },
                LanguageId: "en",
                ImageIds: new List<string> { "sacrifice_altar.jpg" }
            );
        }

        return null; // NOT_FOUND
    }

    /// <summary>
    /// Builds image metadata by ID for integration testing.
    /// Supports the imageIds referenced by encyclopedia entries: lion_01.jpg, lion_habitat_02.jpg,
    /// sacrifice_altar.jpg, as well as standard test IDs (IMG001, IMG002).
    /// </summary>
    private static ImageMetadata? BuildIntegrationImageById(string imageId)
    {
        return imageId switch
        {
            "lion_01.jpg"
                => new ImageMetadata(
                    ImageId: "lion_01.jpg",
                    Collection: "Bible Photos",
                    Path: "images/encyclopedia",
                    FileName: "lion_01.jpg",
                    Format: "jpg",
                    IsOnline: false,
                    StartRef: "00700001400500000",
                    EndRef: "00700001400500000",
                    Title: "Lion in the wild",
                    Copyright: "(c) Bible Encyclopedia Photos",
                    VideoUrl: null,
                    VideoFormat: null
                ),
            "lion_habitat_02.jpg"
                => new ImageMetadata(
                    ImageId: "lion_habitat_02.jpg",
                    Collection: "Bible Photos",
                    Path: "images/encyclopedia",
                    FileName: "lion_habitat_02.jpg",
                    Format: "jpg",
                    IsOnline: false,
                    StartRef: "00700001400500000",
                    EndRef: "00700001400500000",
                    Title: "Lion habitat in Palestine",
                    Copyright: "(c) Bible Encyclopedia Photos",
                    VideoUrl: null,
                    VideoFormat: null
                ),
            "sacrifice_altar.jpg"
                => new ImageMetadata(
                    ImageId: "sacrifice_altar.jpg",
                    Collection: "Bible Photos",
                    Path: "images/encyclopedia",
                    FileName: "sacrifice_altar.jpg",
                    Format: "jpg",
                    IsOnline: false,
                    StartRef: "00300000100100000",
                    EndRef: "00300000100100000",
                    Title: "Ancient altar for sacrifice",
                    Copyright: "(c) Bible Encyclopedia Photos",
                    VideoUrl: null,
                    VideoFormat: null
                ),
            "IMG001"
                => new ImageMetadata(
                    ImageId: "IMG001",
                    Collection: "Bible Photos",
                    Path: "images/bible_photos",
                    FileName: "nativity_scene.jpg",
                    Format: "jpg",
                    IsOnline: false,
                    StartRef: "04100100100000",
                    EndRef: "04100102500000",
                    Title: "Nativity Scene",
                    Copyright: "(c) Bible Photos Collection",
                    VideoUrl: null,
                    VideoFormat: null
                ),
            "IMG002"
                => new ImageMetadata(
                    ImageId: "IMG002",
                    Collection: "Bible Photos",
                    Path: "images/bible_photos",
                    FileName: "bethlehem_star.jpg",
                    Format: "jpg",
                    IsOnline: false,
                    StartRef: "04100100100000",
                    EndRef: "04100102500000",
                    Title: "Star of Bethlehem",
                    Copyright: "(c) Bible Photos Collection",
                    VideoUrl: null,
                    VideoFormat: null
                ),
            _ => null,
        };
    }

    /// <summary>
    /// Builds image metadata by verse reference for integration testing.
    /// Returns images for MAT references that can be used with CAP-007.
    /// </summary>
    private static List<ImageMetadata> BuildIntegrationImagesByRef(string verseRef)
    {
        if (verseRef.StartsWith("MAT", StringComparison.OrdinalIgnoreCase))
        {
            return new List<ImageMetadata>
            {
                new(
                    ImageId: "IMG001",
                    Collection: "Bible Photos",
                    Path: "images/bible_photos",
                    FileName: "nativity_scene.jpg",
                    Format: "jpg",
                    IsOnline: false,
                    StartRef: "04100100100000",
                    EndRef: "04100102500000",
                    Title: "Nativity Scene",
                    Copyright: "(c) Bible Photos Collection",
                    VideoUrl: null,
                    VideoFormat: null
                ),
                new(
                    ImageId: "IMG002",
                    Collection: "Bible Photos",
                    Path: "images/bible_photos",
                    FileName: "bethlehem_star.jpg",
                    Format: "jpg",
                    IsOnline: false,
                    StartRef: "04100100100000",
                    EndRef: "04100102500000",
                    Title: "Star of Bethlehem",
                    Copyright: "(c) Bible Photos Collection",
                    VideoUrl: null,
                    VideoFormat: null
                ),
            };
        }

        return new List<ImageMetadata>();
    }

    /// <summary>
    /// Builds synthetic image data for integration testing.
    /// Supports all imageIds used in encyclopedia and image metadata tests.
    /// </summary>
    private static (
        byte[] Bytes,
        string MimeType,
        int Width,
        int Height
    )? BuildIntegrationImageData(string imageId, string quality)
    {
        // Determine dimensions from quality tier
        var dims = quality switch
        {
            "thumbnail" => (Width: 90, Height: 60),
            "lowDef" => (Width: 480, Height: 320),
            "highDef" => (Width: 1080, Height: 720),
            _ => (Width: 720, Height: 480), // standardDef default
        };

        // Known images: return synthetic JPEG data
        return imageId switch
        {
            "lion_01.jpg"
            or "lion_habitat_02.jpg"
            or "sacrifice_altar.jpg"
            or "IMG001"
            or "IMG002"
                => (
                    GenerateTestBytes(dims.Width, dims.Height),
                    "image/jpeg",
                    dims.Width,
                    dims.Height
                ),
            _ => null, // NOT_FOUND
        };
    }

    /// <summary>
    /// Builds semantic domain hierarchy data for integration testing.
    /// Supports SDBG domains "001" (top-level) and "004" (animals/fauna).
    /// </summary>
    private static (
        SemanticDomainNode Root,
        IReadOnlyList<SemanticDomainBreadcrumb> Breadcrumbs
    )? BuildIntegrationSemanticDomain(string dictionary, string domainId)
    {
        if (dictionary != "SDBG")
            return null;

        if (domainId == "001")
        {
            var root = new SemanticDomainNode(
                Id: "001",
                Prefix: "1",
                DisplayName: "Geographical Objects and Features",
                DomainRange: "1.1-1.99",
                HasSubDomains: true,
                HasEntries: false,
                Children: new List<SemanticDomainNode>
                {
                    new(
                        Id: "001.001",
                        Prefix: "1.1",
                        DisplayName: "Universe",
                        DomainRange: "1.1-1.4",
                        HasSubDomains: true,
                        HasEntries: true,
                        Children: new List<SemanticDomainNode>()
                    ),
                    new(
                        Id: "001.002",
                        Prefix: "1.2",
                        DisplayName: "Land",
                        DomainRange: "1.5-1.9",
                        HasSubDomains: true,
                        HasEntries: true,
                        Children: new List<SemanticDomainNode>()
                    ),
                }
            );
            var breadcrumbs = new List<SemanticDomainBreadcrumb>
            {
                new(Id: "root", DisplayName: "Semantic Domains"),
                new(Id: "001", DisplayName: "Geographical Objects and Features"),
            };
            return (root, breadcrumbs);
        }

        if (domainId == "004")
        {
            var root = new SemanticDomainNode(
                Id: "004",
                Prefix: "4",
                DisplayName: "Animals",
                DomainRange: "4.1-4.99",
                HasSubDomains: true,
                HasEntries: true,
                Children: new List<SemanticDomainNode>
                {
                    new(
                        Id: "004.001",
                        Prefix: "4.1",
                        DisplayName: "Animals",
                        DomainRange: "4.1-4.10",
                        HasSubDomains: true,
                        HasEntries: true,
                        Children: new List<SemanticDomainNode>()
                    ),
                    new(
                        Id: "004.002",
                        Prefix: "4.2",
                        DisplayName: "Insects",
                        DomainRange: "4.11-4.20",
                        HasSubDomains: false,
                        HasEntries: true,
                        Children: new List<SemanticDomainNode>()
                    ),
                }
            );
            var breadcrumbs = new List<SemanticDomainBreadcrumb>
            {
                new(Id: "root", DisplayName: "Semantic Domains"),
                new(Id: "004", DisplayName: "Animals"),
            };
            return (root, breadcrumbs);
        }

        return null; // NOT_FOUND
    }

    /// <summary>
    /// Generates synthetic test bytes with minimal structure.
    /// Size is proportional to requested dimensions for realistic payload testing.
    /// </summary>
    private static byte[] GenerateTestBytes(int width, int height)
    {
        int byteCount = Math.Max(16, (width * height) / 10);
        var bytes = new byte[byteCount];
        // JPEG SOI marker
        bytes[0] = 0xFF;
        bytes[1] = 0xD8;
        for (int i = 2; i < byteCount - 2; i++)
        {
            bytes[i] = (byte)((i * 37 + 11) % 256);
        }
        // JPEG EOI marker
        bytes[byteCount - 2] = 0xFF;
        bytes[byteCount - 1] = 0xD9;
        return bytes;
    }
}
