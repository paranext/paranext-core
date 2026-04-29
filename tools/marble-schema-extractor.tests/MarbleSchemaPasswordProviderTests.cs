using Microsoft.Extensions.Configuration;
using Paratext.Data.ProjectFileAccess;

namespace MarbleSchemaExtractor.Tests;

[TestFixture]
public class MarbleSchemaPasswordProviderTests
{
    [Test]
    public void GetPassword_WhenSecretsMissing_ReturnsBenignPlaceholder()
    {
        // Arrange: build an empty config (no user secrets injected)
        IConfiguration empty = new ConfigurationBuilder().Build();
        var sut = new MarbleSchemaPasswordProvider(empty, isRegistrationValid: () => true);

        // Act
        string pw = sut.GetPassword();

        // Assert: must return a non-empty placeholder rather than throwing or returning null
        Assert.That(pw, Is.Not.Null);
        Assert.That(pw, Is.Not.Empty);
        // The placeholder MUST NOT be a real-looking password — use a clearly-marked sentinel
        Assert.That(pw, Does.Contain("not the correct password"));
    }

    [Test]
    public void GetPassword_WhenRegistrationInvalid_ReturnsBenignPlaceholder()
    {
        var configWithFakeSecrets = new ConfigurationBuilder()
            .AddInMemoryCollection(
                new Dictionary<string, string?>
                {
                    ["DblResourceBase64-DO-NOT-SHARE"] = "ignored",
                    ["DblResourceHash-DO-NOT-SHARE"] = "ignored",
                }
            )
            .Build();
        var sut = new MarbleSchemaPasswordProvider(
            configWithFakeSecrets,
            isRegistrationValid: () => false
        );

        string pw = sut.GetPassword();

        Assert.That(pw, Does.Contain("not the correct password"));
    }

    [Test]
    public void Provider_ImplementsIZippedResourcePasswordProvider()
    {
        // Compile-time guard via cast — fail at runtime if the interface isn't implemented
        IConfiguration empty = new ConfigurationBuilder().Build();
        IZippedResourcePasswordProvider sut = new MarbleSchemaPasswordProvider(empty, () => true);
        Assert.That(sut, Is.Not.Null);
    }
}
