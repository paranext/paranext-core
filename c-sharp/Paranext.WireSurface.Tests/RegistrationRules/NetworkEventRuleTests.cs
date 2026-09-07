using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using NUnit.Framework;
using Paranext.WireSurface.RegistrationRules;
using Paranext.WireSurface.Tests.Fixtures;

namespace Paranext.WireSurface.Tests.RegistrationRules;

public class NetworkEventRuleTests
{
    private static readonly NetworkEventRule Rule = new();

    private static List<ScanEntry> Scan(CSharpCompilation compilation, SyntaxTree tree) =>
        Rule.Scan(tree, compilation.GetSemanticModel(tree), RuleContextFactory.Create(compilation))
            .ToList();

    private static List<ScanEntry> ScanFixtureTree(string source)
    {
        var compilation = FixtureCompilation.Create(source);
        return Scan(compilation, compilation.SyntaxTrees.Last());
    }

    private static StaticRegistration Static(
        string name,
        bool documented = false,
        bool docsStaticallyResolved = true,
        bool experimental = false
    ) =>
        new(
            RegistrationCategory.NetworkEvent,
            name,
            "c-sharp/Fixtures/Fixture1.cs",
            RegisteredVia.PapiClientSendRequestAsyncRegisterEvent,
            documented,
            docsStaticallyResolved,
            experimental
        );

    [Test]
    public void CollectionExpressionLiteralName()
    {
        var entries = ScanFixtureTree(
            """
            using System.Threading.Tasks;
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal sealed class FixtureCollectionExpression(PapiClient papiClient)
            {
                public Task RegisterAsync() =>
                    papiClient.SendRequestAsync<bool>(
                        "network:registerEvent",
                        ["fixture.event.collection", new OpenRpcSingleNotificationDocumentation()]
                    );
            }
            """
        );

        Assert.That(
            entries,
            Is.EqualTo(
                new[]
                {
                    new ScanEntry.Static(
                        Static(
                            "fixture.event.collection",
                            documented: true,
                            docsStaticallyResolved: true,
                            experimental: false
                        )
                    ),
                }
            )
        );
    }

    [Test]
    public void OneElementCollectionWithoutDocsIsStaticUndocumented()
    {
        // registerEvent(eventName, documentation?) -- documentation is optional on the wire handler,
        // so a one-element collection with just the name is a fully resolved, undocumented static
        // registration, not a dynamic one.
        var entries = ScanFixtureTree(
            """
            using System.Threading.Tasks;
            using Paranext.DataProvider;

            internal sealed class FixtureOneElement(PapiClient papiClient)
            {
                public Task RegisterAsync() =>
                    papiClient.SendRequestAsync<bool>(
                        "network:registerEvent",
                        ["fixture.event.one-element"]
                    );
            }
            """
        );

        Assert.That(
            entries,
            Is.EqualTo(
                new[]
                {
                    new ScanEntry.Static(
                        Static(
                            "fixture.event.one-element",
                            documented: false,
                            docsStaticallyResolved: true,
                            experimental: false
                        )
                    ),
                }
            )
        );
    }

    [Test]
    public void ImplicitArrayName()
    {
        // The documentation value is held in an `object?`-typed local (not cast inline at the array
        // site) so the array's own element expressions stay a plain string literal and a plain
        // identifier — an inline cast on either element would hide it from that element's own
        // resolver (neither NameResolver nor DocumentationResolver unwraps a cast expression).
        var entries = ScanFixtureTree(
            """
            using System.Threading.Tasks;
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal sealed class FixtureImplicitArray(PapiClient papiClient)
            {
                public Task RegisterAsync()
                {
                    object? documentation = new OpenRpcSingleNotificationDocumentation();
                    return papiClient.SendRequestAsync<bool>(
                        "network:registerEvent",
                        new[] { "fixture.event.implicit-array", documentation }
                    );
                }
            }
            """
        );

        Assert.That(
            entries,
            Is.EqualTo(
                new[]
                {
                    new ScanEntry.Static(
                        Static(
                            "fixture.event.implicit-array",
                            documented: true,
                            docsStaticallyResolved: true,
                            experimental: false
                        )
                    ),
                }
            )
        );
    }

    [Test]
    public void EventNameFromSharedConstantsClass()
    {
        var entries = ScanFixtureTree(
            """
            using System.Threading.Tasks;
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal static class FixtureEventNames
            {
                public const string Sync = "fixture.event.shared-constant";
            }

            internal sealed class FixtureSharedConstant(PapiClient papiClient)
            {
                public Task RegisterAsync() =>
                    papiClient.SendRequestAsync<bool>(
                        "network:registerEvent",
                        [FixtureEventNames.Sync, new OpenRpcSingleNotificationDocumentation()]
                    );
            }
            """
        );

        Assert.That(
            entries,
            Is.EqualTo(
                new[]
                {
                    new ScanEntry.Static(
                        Static(
                            "fixture.event.shared-constant",
                            documented: true,
                            docsStaticallyResolved: true,
                            experimental: false
                        )
                    ),
                }
            )
        );
    }

    [Test]
    public void EventNameFromCtorParameterPropagates()
    {
        var entries = ScanFixtureTree(
            """
            using System.Threading.Tasks;
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal sealed class FixtureEventNotifier(
                PapiClient papiClient,
                string eventName,
                OpenRpcSingleNotificationDocumentation eventDocumentation
            )
            {
                public Task InitializeAsync() =>
                    papiClient.SendRequestAsync<bool>(
                        "network:registerEvent",
                        [eventName, eventDocumentation]
                    );
            }

            internal static class FixtureEventNotifierSites
            {
                public static void RegisterBoth(PapiClient papiClient)
                {
                    _ = new FixtureEventNotifier(
                        papiClient,
                        "fixture.event.a",
                        new OpenRpcSingleNotificationDocumentation()
                    );
                    _ = new FixtureEventNotifier(
                        papiClient,
                        "fixture.event.b",
                        new OpenRpcSingleNotificationDocumentation()
                    );
                }
            }
            """
        );

        // Both entries' `eventDocumentation` argument is the notifier's own primary-constructor
        // parameter, referenced from a non-constructor method — DocumentationResolver does not
        // propagate through parameters (design §6), so both are unresolved rather than guessed at.
        Assert.That(
            entries,
            Is.EqualTo(
                new[]
                {
                    new ScanEntry.Static(
                        Static(
                            "fixture.event.a",
                            documented: true,
                            docsStaticallyResolved: false,
                            experimental: false
                        )
                    ),
                    new ScanEntry.Static(
                        Static(
                            "fixture.event.b",
                            documented: true,
                            docsStaticallyResolved: false,
                            experimental: false
                        )
                    ),
                }
            )
        );
    }

    [Test]
    public void NonCollectionSecondArgumentIsDynamic()
    {
        var entries = ScanFixtureTree(
            """
            using System.Threading.Tasks;
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal sealed class FixtureNonCollectionArg(PapiClient papiClient)
            {
                private static readonly object?[] s_payload =
                [
                    "fixture.event.non-collection",
                    new OpenRpcSingleNotificationDocumentation(),
                ];

                public Task RegisterAsync() =>
                    papiClient.SendRequestAsync<bool>("network:registerEvent", s_payload);
            }
            """
        );

        Assert.That(
            entries,
            Is.EqualTo(
                new[]
                {
                    new ScanEntry.Dynamic(
                        new DynamicRegistration(
                            RegistrationCategory.NetworkEvent,
                            "c-sharp/Fixtures/Fixture1.cs",
                            RegisteredVia.PapiClientSendRequestAsyncRegisterEvent,
                            "s_payload"
                        )
                    ),
                }
            )
        );
    }

    [Test]
    public void RequestTypeViaConstField()
    {
        var entries = ScanFixtureTree(
            """
            using System.Threading.Tasks;
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal sealed class FixtureConstField(PapiClient papiClient)
            {
                private const string RegisterEventMethod = "network:registerEvent";

                public Task RegisterAsync() =>
                    papiClient.SendRequestAsync<bool>(
                        RegisterEventMethod,
                        ["fixture.event.const-field", new OpenRpcSingleNotificationDocumentation()]
                    );
            }
            """
        );

        Assert.That(
            entries,
            Is.EqualTo(
                new[]
                {
                    new ScanEntry.Static(
                        Static(
                            "fixture.event.const-field",
                            documented: true,
                            docsStaticallyResolved: true,
                            experimental: false
                        )
                    ),
                }
            )
        );
    }

    [Test]
    public void NamedArgumentsOutOfOrder()
    {
        var entries = ScanFixtureTree(
            """
            using System.Threading.Tasks;
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal sealed class FixtureNamedOutOfOrder(PapiClient papiClient)
            {
                public Task RegisterAsync() =>
                    papiClient.SendRequestAsync<bool>(
                        requestContents:
                        [
                            "fixture.event.named-out-of-order",
                            new OpenRpcSingleNotificationDocumentation(),
                        ],
                        requestType: "network:registerEvent"
                    );
            }
            """
        );

        Assert.That(
            entries,
            Is.EqualTo(
                new[]
                {
                    new ScanEntry.Static(
                        Static(
                            "fixture.event.named-out-of-order",
                            documented: true,
                            docsStaticallyResolved: true,
                            experimental: false
                        )
                    ),
                }
            )
        );
    }

    [Test]
    public void OtherRequestTypesIgnored()
    {
        var entries = ScanFixtureTree(
            """
            using System.Threading.Tasks;
            using Paranext.DataProvider;

            internal sealed class FixtureOtherRequestType(PapiClient papiClient)
            {
                public Task<bool> CallAsync() =>
                    papiClient.SendRequestAsync<bool>("object:platform.x.get", [1]);
            }
            """
        );

        Assert.That(entries, Is.Empty);
    }

    [Test]
    public void NotificationDocsExperimental()
    {
        var entries = ScanFixtureTree(
            """
            using System.Threading.Tasks;
            using Paranext.DataProvider;
            using Paranext.DataProvider.NetworkObjects.Documentation;

            internal sealed class FixtureNotificationExperimental(PapiClient papiClient)
            {
                public Task RegisterAsync() =>
                    papiClient.SendRequestAsync<bool>(
                        "network:registerEvent",
                        [
                            "fixture.event.experimental",
                            new OpenRpcSingleNotificationDocumentation
                            {
                                Notification = new() { Experimental = true },
                            },
                        ]
                    );
            }
            """
        );

        Assert.That(
            entries,
            Is.EqualTo(
                new[]
                {
                    new ScanEntry.Static(
                        Static(
                            "fixture.event.experimental",
                            documented: true,
                            docsStaticallyResolved: true,
                            experimental: true
                        )
                    ),
                }
            )
        );
    }
}
