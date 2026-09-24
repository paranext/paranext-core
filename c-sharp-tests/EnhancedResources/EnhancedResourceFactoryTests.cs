using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;
using Paranext.DataProvider.EnhancedResources;
using TestParanextDataProvider.EnhancedResources.Fixtures;

namespace TestParanextDataProvider.EnhancedResources;

/// <summary>
/// Tests for the rewritten EnhancedResourceFactory. Uses StubMarbleDataLoader to
/// supply deterministic MarbleData without touching the filesystem. Tests await
/// factory.LoadCompleted to ensure CompleteLoadAsync has published its fields.
///
/// Source: spec Section 7 + 9 (single NetworkObject), Section 11 (publication safety),
///         Section 15 (test reshape).
/// </summary>
[TestFixture]
[ExcludeFromCodeCoverage]
internal class EnhancedResourceFactoryTests : PapiTestBase
{
    #region Acceptance Tests

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-001")]
    [Property("BehaviorId", "BHV-102")]
    [Description(
        "Factory publishes HaveMarbleData=true after the stub loader returns non-null MarbleData"
    )]
    public async Task InitializeAsync_LoaderReturnsBibles_HaveMarbleDataIsTrue()
    {
        // Arrange
        var data = new MarbleDataBuilder()
            .WithBiblePackages([MarbleTestHelper.CreateFakeMarbleScrText("SDBG")])
            .WithGlossData(MarbleTestHelper.BuildTestGlossData())
            .Build();
        var factory = new EnhancedResourceFactory(
            Client,
            ParatextProjects,
            new StubMarbleDataLoader(data)
        );

        // Act
        await factory.InitializeAsync();
        await factory.LoadCompleted;

        // Assert
        var result = factory.CurrentInitializeResult;
        Assert.That(result.HaveMarbleData, Is.True);
        Assert.That(result.AvailableResources, Is.EqualTo(new[] { "SDBG" }));
        Assert.That(result.AvailableGlossLanguages, Is.EquivalentTo(new[] { "en", "zh-Hans" }));
    }

    [Test]
    [Category("Acceptance")]
    [Property("CapabilityId", "CAP-001")]
    [Property("BehaviorId", "BHV-105")]
    [Description(
        "Factory registers the platform.enhancedResources NetworkObject during InitializeAsync"
    )]
    public async Task InitializeAsync_RegistersPlatformEnhancedResourcesNetworkObject()
    {
        // Arrange
        var factory = new EnhancedResourceFactory(
            Client,
            ParatextProjects,
            StubMarbleDataLoader.Empty()
        );

        // Act
        await factory.InitializeAsync();

        // Assert: NetworkObject registration fires an onDidCreateNetworkObject event.
        Assert.That(Client.SentEventCount, Is.GreaterThan(0));
        var sentEvent = Client.NextSentEvent;
        Assert.That(sentEvent.eventType, Is.EqualTo("object:onDidCreateNetworkObject"));
        Assert.That(sentEvent.eventParameters, Is.Not.Null);
    }

    #endregion

    #region Contract Tests - ReadInitializeResult

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-105")]
    [Description("No marble data: readInitializeResult reports HaveMarbleData=false")]
    public async Task InitializeAsync_LoaderReturnsNull_HaveMarbleDataIsFalse()
    {
        var factory = new EnhancedResourceFactory(
            Client,
            ParatextProjects,
            StubMarbleDataLoader.Empty()
        );

        await factory.InitializeAsync();
        await factory.LoadCompleted;

        Assert.That(factory.CurrentInitializeResult.HaveMarbleData, Is.False);
        Assert.That(factory.CurrentInitializeResult.AvailableResources, Is.Empty);
    }

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-105")]
    [Description(
        "Factory surfaces MissingRequiredPackages and sets RequiredProjectsMissing when the loader reports missing packages"
    )]
    public async Task CompleteLoadAsync_WithMissingPackages_SetsRequiredProjectsMissingTrue()
    {
        var data = new MarbleDataBuilder().WithMissingRequiredPackages(["DCLEX", "GNT"]).Build();
        var factory = new EnhancedResourceFactory(
            Client,
            ParatextProjects,
            new StubMarbleDataLoader(data)
        );

        await factory.InitializeAsync();
        await factory.LoadCompleted;

        var result = factory.CurrentInitializeResult;
        Assert.That(result.RequiredProjectsMissing, Is.True);
        Assert.That(result.MissingRequiredPackages, Is.EquivalentTo(new[] { "DCLEX", "GNT" }));
    }

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-105")]
    [Description("Loader throwing produces HaveMarbleData=false with no rethrow")]
    public async Task InitializeAsync_LoaderThrows_DoesNotPropagate_HaveMarbleDataStaysFalse()
    {
        var factory = new EnhancedResourceFactory(
            Client,
            ParatextProjects,
            StubMarbleDataLoader.Throwing(new InvalidOperationException("simulated"))
        );

        await factory.InitializeAsync();
        await factory.LoadCompleted;

        Assert.That(factory.CurrentInitializeResult.HaveMarbleData, Is.False);
    }

    #endregion

    #region Contract Tests - ResolveResourceObjectId

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-105")]
    [Description("resolveResourceObjectId throws FAILED_PRECONDITION before load completes")]
    public async Task ResolveResourceObjectId_NoData_ThrowsFailedPrecondition()
    {
        var factory = new EnhancedResourceFactory(
            Client,
            ParatextProjects,
            StubMarbleDataLoader.Empty()
        );
        await factory.InitializeAsync();
        await factory.LoadCompleted;

        var ex = Assert.Throws<InvalidOperationException>(
            () => factory.InvokeResolveResourceObjectIdForTest("SDBG")
        );
        Assert.That(
            ex!.Data["platformErrorCode"],
            Is.EqualTo(PlatformErrorCodes.FailedPrecondition)
        );
    }

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-105")]
    [Description("resolveResourceObjectId throws NOT_FOUND for unknown resource after load")]
    public async Task ResolveResourceObjectId_UnknownResource_ThrowsNotFound()
    {
        var data = new MarbleDataBuilder()
            .WithBiblePackages([MarbleTestHelper.CreateFakeMarbleScrText("SDBG")])
            .Build();
        var factory = new EnhancedResourceFactory(
            Client,
            ParatextProjects,
            new StubMarbleDataLoader(data)
        );
        await factory.InitializeAsync();
        await factory.LoadCompleted;

        var ex = Assert.Throws<InvalidOperationException>(
            () => factory.InvokeResolveResourceObjectIdForTest("definitely-not-installed")
        );
        Assert.That(ex!.Data["platformErrorCode"], Is.EqualTo(PlatformErrorCodes.NotFound));
    }

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-105")]
    [Description("resolveResourceObjectId returns the same id on success")]
    public async Task ResolveResourceObjectId_KnownResource_EchoesId()
    {
        var data = new MarbleDataBuilder()
            .WithBiblePackages([MarbleTestHelper.CreateFakeMarbleScrText("SDBG")])
            .Build();
        var factory = new EnhancedResourceFactory(
            Client,
            ParatextProjects,
            new StubMarbleDataLoader(data)
        );
        await factory.InitializeAsync();
        await factory.LoadCompleted;

        var result = factory.InvokeResolveResourceObjectIdForTest("SDBG");
        Assert.That(result, Is.EqualTo("SDBG"));
    }

    #endregion

    #region Contract Tests - NetworkObject Name

    [Test]
    [Category("Contract")]
    [Description("NetworkObject is registered under platform.enhancedResources")]
    public void NetworkObjectName_MatchesSpec()
    {
        Assert.That(
            EnhancedResourceFactory.NetworkObjectName,
            Is.EqualTo("platform.enhancedResources")
        );
    }

    #endregion

    #region Contract Tests - PAPI Surface

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-105")]
    [Description(
        "parseMarbleTokens is not part of the PAPI surface - tokens are server-owned and "
            + "fetched internally via IMarbleBookTokenProvider (FU-CR1, FU-CR2)"
    )]
    public void BuildFunctionList_DoesNotIncludeParseMarbleTokens()
    {
        var factory = new EnhancedResourceFactory(
            Client,
            ParatextProjects,
            StubMarbleDataLoader.Empty()
        );

        var names = factory.GetRegisteredFunctionNamesForTest();

        Assert.That(names, Does.Not.Contain("parseMarbleTokens"));
    }

    [Test]
    [Category("Contract")]
    [Property("BehaviorId", "BHV-105")]
    [Description("findLinksForScope and buildTooltipData are registered (token-driven)")]
    public void BuildFunctionList_IncludesTokenDrivenCommands()
    {
        var factory = new EnhancedResourceFactory(
            Client,
            ParatextProjects,
            StubMarbleDataLoader.Empty()
        );

        var names = factory.GetRegisteredFunctionNamesForTest();

        Assert.That(names, Does.Contain("findLinksForScope"));
        Assert.That(names, Does.Contain("buildTooltipData"));
    }

    [Test]
    [Category("Contract")]
    [Property("CapabilityId", "CAP-019")]
    [Property("BehaviorId", "BHV-105")]
    [Description("loadMarbleChapterXml is registered (M-019, FN-014)")]
    public void BuildFunctionList_IncludesLoadMarbleChapterXml()
    {
        var factory = new EnhancedResourceFactory(
            Client,
            ParatextProjects,
            StubMarbleDataLoader.Empty()
        );

        var names = factory.GetRegisteredFunctionNamesForTest();

        Assert.That(names, Does.Contain("loadMarbleChapterXml"));
    }

    #endregion

    #region Contract Tests - AvailableResources Snapshot Semantics

    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-C09")]
    [Property("BehaviorId", "BHV-103")]
    [Property("ScenarioId", "TS-046")]
    [Description(
        "INV-C09: CurrentInitializeResult.AvailableResources stays stable across reads "
            + "(immutable record); mutating a copy does not affect subsequent reads."
    )]
    public async Task AvailableResources_MultipleCalls_ReturnStableSnapshot()
    {
        // Arrange: stub loader with two bibles
        var data = new MarbleDataBuilder()
            .WithBiblePackages(
                [
                    MarbleTestHelper.CreateFakeMarbleScrText("SDBG"),
                    MarbleTestHelper.CreateFakeMarbleScrText("SDBH"),
                ]
            )
            .Build();
        var factory = new EnhancedResourceFactory(
            Client,
            ParatextProjects,
            new StubMarbleDataLoader(data)
        );
        await factory.InitializeAsync();
        await factory.LoadCompleted;

        // Act
        var first = factory.CurrentInitializeResult.AvailableResources;
        var second = factory.CurrentInitializeResult.AvailableResources;

        // Assert: both reads expose the same two entries.
        Assert.That(first, Is.EqualTo(new[] { "SDBG", "SDBH" }));
        Assert.That(second, Is.EqualTo(new[] { "SDBG", "SDBH" }));
    }

    [Test]
    [Category("Invariant")]
    [Property("InvariantId", "INV-C09")]
    [Property("BehaviorId", "BHV-103")]
    [Property("ScenarioId", "TS-046")]
    [Description(
        "INV-C09: mutating a caller's copy of AvailableResources does not bleed into "
            + "subsequent reads from the factory."
    )]
    public async Task AvailableResources_MutateCopy_SubsequentReadUnaffected()
    {
        // Arrange
        var data = new MarbleDataBuilder()
            .WithBiblePackages([MarbleTestHelper.CreateFakeMarbleScrText("SDBG")])
            .Build();
        var factory = new EnhancedResourceFactory(
            Client,
            ParatextProjects,
            new StubMarbleDataLoader(data)
        );
        await factory.InitializeAsync();
        await factory.LoadCompleted;

        // Act: copy-and-mutate
        var copy = factory.CurrentInitializeResult.AvailableResources.ToArray();
        copy[0] = "CORRUPTED";

        // Assert: factory still reports the original
        Assert.That(
            factory.CurrentInitializeResult.AvailableResources,
            Is.EqualTo(new[] { "SDBG" })
        );
    }

    #endregion
}
