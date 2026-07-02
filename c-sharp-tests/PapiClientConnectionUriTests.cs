using Paranext.DataProvider;

namespace TestParanextDataProvider;

/// <summary>
/// Tests that PapiClient connects to the port main advertises via the PAPI_WEBSOCKET_PORT
/// environment variable so each paranext-based app talks to its own PAPI network (PT-4109)
/// </summary>
[TestFixture]
// These tests mutate a process-wide environment variable, so they must not run in parallel with
// each other or with other tests that might read it
[NonParallelizable]
public class PapiClientConnectionUriTests
{
    private string? _originalPortValue;

    [SetUp]
    public void Setup()
    {
        _originalPortValue = Environment.GetEnvironmentVariable(PapiClient.WEBSOCKET_PORT_ENV_VAR);
    }

    [TearDown]
    public void TearDown()
    {
        Environment.SetEnvironmentVariable(PapiClient.WEBSOCKET_PORT_ENV_VAR, _originalPortValue);
    }

    [Test]
    public void GetConnectionUri_NoEnvironmentVariable_UsesDefaultPort()
    {
        Environment.SetEnvironmentVariable(PapiClient.WEBSOCKET_PORT_ENV_VAR, null);

        Uri uri = PapiClient.GetConnectionUri();

        Assert.That(uri.Port, Is.EqualTo(PapiClient.DEFAULT_WEBSOCKET_PORT));
    }

    [Test]
    public void GetConnectionUri_ValidPortAdvertised_UsesAdvertisedPort()
    {
        Environment.SetEnvironmentVariable(PapiClient.WEBSOCKET_PORT_ENV_VAR, "9123");

        Uri uri = PapiClient.GetConnectionUri();

        Assert.That(uri.Port, Is.EqualTo(9123));
        Assert.That(uri.Host, Is.EqualTo("localhost"));
        Assert.That(uri.Scheme, Is.EqualTo("ws"));
    }

    [TestCase("not-a-port")]
    [TestCase("0")]
    [TestCase("-1")]
    [TestCase("70000")]
    public void GetConnectionUri_InvalidPortAdvertised_UsesDefaultPort(string invalidPort)
    {
        Environment.SetEnvironmentVariable(PapiClient.WEBSOCKET_PORT_ENV_VAR, invalidPort);

        Uri uri = PapiClient.GetConnectionUri();

        Assert.That(uri.Port, Is.EqualTo(PapiClient.DEFAULT_WEBSOCKET_PORT));
    }
}
