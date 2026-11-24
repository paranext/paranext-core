using System.Diagnostics.CodeAnalysis;
using Paranext.DataProvider;

namespace TestParanextDataProvider;

[TestFixture]
[ExcludeFromCodeCoverage]
internal class LaunchSecretsTests
{
    private const string CLIENT = "fake-client-secret";
    private const string SERVER = "fake-server-secret";
    private const string JSON = $"{{\"clientSecret\":\"{CLIENT}\",\"serverSecret\":\"{SERVER}\"}}";

    [Test]
    public void Parse_ValidJson_ReturnsSecrets()
    {
        var secrets = LaunchSecrets.Parse(JSON);

        Assert.That(secrets, Is.Not.Null);
        Assert.That(secrets!.ClientSecret, Is.EqualTo(CLIENT));
        Assert.That(secrets.ServerSecret, Is.EqualTo(SERVER));
    }

    [TestCase(null)]
    [TestCase("")]
    [TestCase("{}")]
    [TestCase("not json")]
    [TestCase("[\"a\",\"b\"]")]
    [TestCase("{\"clientSecret\":\"a\"}")]
    [TestCase("{\"serverSecret\":\"b\"}")]
    [TestCase("{\"clientSecret\":\"\",\"serverSecret\":\"b\"}")]
    [TestCase("{\"clientSecret\":1,\"serverSecret\":\"b\"}")]
    public void Parse_Garbage_ReturnsNull(string? json)
    {
        Assert.That(LaunchSecrets.Parse(json), Is.Null);
    }

    [Test]
    public void ToString_DoesNotContainTheSecrets()
    {
        string text = LaunchSecrets.Parse(JSON)!.ToString();

        Assert.That(text, Does.Not.Contain(CLIENT));
        Assert.That(text, Does.Not.Contain(SERVER));
    }

    [Test]
    public void Read_EnvironmentVariable_IsUsedAndCleared()
    {
        var cleared = new List<string>();

        var secrets = LaunchSecrets.ReadFromEnvironmentOrStandardInput(
            name => name == LaunchSecrets.ENVIRONMENT_VARIABLE ? JSON : null,
            cleared.Add,
            null
        );

        Assert.That(secrets?.ClientSecret, Is.EqualTo(CLIENT));
        Assert.That(cleared, Is.EqualTo(new[] { LaunchSecrets.ENVIRONMENT_VARIABLE }));
    }

    [Test]
    public void Read_StandardInputRequested_WinsOverAnInheritedVariable()
    {
        var cleared = new List<string>();

        var secrets = LaunchSecrets.ReadFromEnvironmentOrStandardInput(
            name =>
                name == LaunchSecrets.ENVIRONMENT_VARIABLE
                    ? """{"clientSecret":"stale-client","serverSecret":"stale-server"}"""
                    : null,
            cleared.Add,
            _ => JSON
        );

        Assert.That(secrets?.ClientSecret, Is.EqualTo(CLIENT));
        Assert.That(cleared, Is.EqualTo(new[] { LaunchSecrets.ENVIRONMENT_VARIABLE }));
    }

    [Test]
    public void Read_NoVariable_ReadsOneStandardInputLine()
    {
        TimeSpan? limit = null;

        var secrets = LaunchSecrets.ReadFromEnvironmentOrStandardInput(
            _ => null,
            _ => { },
            timeout =>
            {
                limit = timeout;
                return JSON;
            }
        );

        Assert.That(secrets?.ServerSecret, Is.EqualTo(SERVER));
        Assert.That(limit, Is.EqualTo(TimeSpan.FromSeconds(5)));
    }

    [TestCase(new[] { "ParanextDataProvider", LaunchSecrets.STANDARD_INPUT_FLAG }, true, true)]
    [TestCase(new[] { "ParanextDataProvider" }, true, false)]
    [TestCase(new[] { "ParanextDataProvider", LaunchSecrets.STANDARD_INPUT_FLAG }, false, false)]
    public void ShouldReadStandardInput_NeedsTheFlagAndRedirectedInput(
        string[] commandLineArgs,
        bool isInputRedirected,
        bool expected
    )
    {
        Assert.That(
            LaunchSecrets.ShouldReadStandardInput(commandLineArgs, isInputRedirected),
            Is.EqualTo(expected)
        );
    }

    /// <summary>
    /// Main passes these to .NET, and `dotnet-data-provider.service.test.ts` pins the same literals,
    /// so a rename on either side alone fails a test. Dev runs use only the variable, so a drifted
    /// flag would otherwise break only packaged builds.
    /// </summary>
    [Test]
    public void LaunchChannelNames_MatchWhatMainSends()
    {
        Assert.That(LaunchSecrets.STANDARD_INPUT_FLAG, Is.EqualTo("--launch-secrets-on-stdin"));
        Assert.That(LaunchSecrets.ENVIRONMENT_VARIABLE, Is.EqualTo("PAPI_LAUNCH_SECRETS"));
    }

    [Test]
    public void Read_Neither_ReturnsNull()
    {
        Assert.That(
            LaunchSecrets.ReadFromEnvironmentOrStandardInput(_ => null, _ => { }, null),
            Is.Null
        );
    }

    [Test]
    public void Read_StandardInputTimesOut_ReturnsNull()
    {
        Assert.That(
            LaunchSecrets.ReadFromEnvironmentOrStandardInput(_ => null, _ => { }, _ => null),
            Is.Null
        );
    }

    [Test]
    public void Read_MalformedVariable_IsStillCleared()
    {
        var cleared = new List<string>();

        var secrets = LaunchSecrets.ReadFromEnvironmentOrStandardInput(
            name => name == LaunchSecrets.ENVIRONMENT_VARIABLE ? "garbage" : null,
            cleared.Add,
            _ => null
        );

        Assert.That(secrets, Is.Null);
        Assert.That(cleared, Is.EqualTo(new[] { LaunchSecrets.ENVIRONMENT_VARIABLE }));
    }
}
