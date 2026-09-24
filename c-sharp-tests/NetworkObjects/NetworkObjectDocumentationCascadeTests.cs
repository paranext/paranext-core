using Paranext.DataProvider;
using Paranext.DataProvider.NetworkObjects;
using Paranext.DataProvider.NetworkObjects.Documentation;

namespace TestParanextDataProvider.NetworkObjects;

/// <summary>
/// Verifies how <see cref="NetworkObjectDocumentation"/> cascades onto the per-method wire docs that
/// <see cref="NetworkObject.RegisterNetworkObjectAsync"/> sends: an object-level
/// <c>Experimental</c> marks the <c>object:{name}</c> existence method AND every function, rich
/// per-method docs are preserved (and force-marked), and per-method-only documentation leaves the
/// existence method and unlisted functions unmarked.
/// </summary>
[TestFixture]
public class NetworkObjectDocumentationCascadeTests
{
    private const string Name = "test.cascadeObject";
    private static readonly string ObjPrefix = $"object:{Name}";

    /// <summary>Minimal concrete network object exposing the protected registration for testing.</summary>
    private sealed class TestNetworkObject(PapiClient papiClient) : NetworkObject(papiClient)
    {
        public Task RegisterAsync(NetworkObjectDocumentation? documentation) =>
            RegisterNetworkObjectAsync(
                Name,
                [("alpha", new Func<bool>(() => true)), ("beta", new Func<bool>(() => true))],
                new NetworkObjectCreatedDetails
                {
                    Id = Name,
                    ObjectType = NetworkObjectType.OBJECT,
                    FunctionNames = ["alpha", "beta"],
                },
                documentation
            );
    }

    private static bool? Experimental(DummyPapiClient client, string requestType) =>
        client.GetDocumentationFor(requestType)?.Method.Experimental;

    [Test]
    public async Task ObjectWideExperimental_NoMethods_MarksExistenceAndEveryFunction()
    {
        var client = new DummyPapiClient();

        await new TestNetworkObject(client).RegisterAsync(
            new NetworkObjectDocumentation { Experimental = true }
        );

        Assert.That(Experimental(client, ObjPrefix), Is.True, "existence method");
        Assert.That(Experimental(client, $"{ObjPrefix}.alpha"), Is.True);
        Assert.That(Experimental(client, $"{ObjPrefix}.beta"), Is.True);
    }

    [Test]
    public async Task ObjectWideExperimental_WithRichMethod_KeepsRichDocAndMarksTheRest()
    {
        var client = new DummyPapiClient();

        await new TestNetworkObject(client).RegisterAsync(
            new NetworkObjectDocumentation
            {
                Experimental = true,
                Methods = new Dictionary<string, OpenRpcSingleMethodDocumentation>
                {
                    ["alpha"] = ExperimentalMethodDocumentation.Create("Alpha does a thing."),
                },
            }
        );

        var alpha = client.GetDocumentationFor($"{ObjPrefix}.alpha");
        Assert.That(alpha?.Method.Summary, Is.EqualTo("Alpha does a thing."));
        Assert.That(alpha?.Method.Experimental, Is.True);
        // beta has no rich doc of its own but is still marked by the object-wide cascade
        Assert.That(Experimental(client, $"{ObjPrefix}.beta"), Is.True);
        Assert.That(Experimental(client, ObjPrefix), Is.True, "existence method");
    }

    [Test]
    public async Task PerMethodOnly_MarksOnlyListedFunction_ExistenceAndOthersUnmarked()
    {
        var client = new DummyPapiClient();

        await new TestNetworkObject(client).RegisterAsync(
            new NetworkObjectDocumentation
            {
                Methods = new Dictionary<string, OpenRpcSingleMethodDocumentation>
                {
                    ["alpha"] = ExperimentalMethodDocumentation.Create("Alpha."),
                },
            }
        );

        Assert.That(Experimental(client, $"{ObjPrefix}.alpha"), Is.True);
        Assert.That(client.GetDocumentationFor($"{ObjPrefix}.beta"), Is.Null, "unlisted function");
        Assert.That(client.GetDocumentationFor(ObjPrefix), Is.Null, "existence method unmarked");
    }

    [Test]
    public async Task ObjectWideExperimental_ForcesExperimentalOntoNonExperimentalMethodDoc()
    {
        var client = new DummyPapiClient();
        var nonExperimental = new OpenRpcSingleMethodDocumentation
        {
            Method = new OpenRpcMethodDocumentation { Summary = "Alpha." },
        };

        await new TestNetworkObject(client).RegisterAsync(
            new NetworkObjectDocumentation
            {
                Experimental = true,
                Methods = new Dictionary<string, OpenRpcSingleMethodDocumentation>
                {
                    ["alpha"] = nonExperimental,
                },
            }
        );

        var alpha = client.GetDocumentationFor($"{ObjPrefix}.alpha");
        Assert.That(alpha?.Method.Summary, Is.EqualTo("Alpha."), "rich doc preserved");
        Assert.That(
            alpha?.Method.Experimental,
            Is.True,
            "object-wide cascade forces x-experimental"
        );
    }

    [Test]
    public async Task NoDocumentation_RegistersEverythingWithoutDocs()
    {
        var client = new DummyPapiClient();

        await new TestNetworkObject(client).RegisterAsync(null);

        Assert.That(client.GetDocumentationFor(ObjPrefix), Is.Null);
        Assert.That(client.GetDocumentationFor($"{ObjPrefix}.alpha"), Is.Null);
        Assert.That(client.GetDocumentationFor($"{ObjPrefix}.beta"), Is.Null);
    }
}
