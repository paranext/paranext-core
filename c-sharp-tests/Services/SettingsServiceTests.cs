using System.Diagnostics;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using Nerdbank.Streams;
using StreamJsonRpc;
using StreamJsonRpc.Protocol;
using TestParanextDataProvider;

namespace Paranext.DataProvider.Services.Tests;

[ExcludeFromCodeCoverage]
public class SettingsServiceTests
{
    #region Member variables
    // Both of these will be non-null when the test runs
    private DummyPapiClient _client = null!;
    private DummySettingsService _settingsService = null!;
    #endregion

    #region Test setup/teardown
    [SetUp]
    public virtual async Task TestSetupAsync()
    {
        _client = new DummyPapiClient();
        _settingsService = new DummySettingsService(_client);
        await _settingsService.RegisterDataProviderAsync();
    }

    [TearDown]
    public virtual void TestTearDown()
    {
        // SettingsChanged is static, so a subscriber this fixture leaves attached would keep firing
        // into — and leaking captured state across — every fixture that runs after it.
        SettingsService.ResetForTests();
        _client.Dispose();
    }
    #endregion

    [TestCase()]
    public void GetSettingValue_Boolean_ReturnsValue()
    {
        var settingKey = "isTest";
        var settingValue = true;
        _settingsService.AddSettingValue(settingKey, settingValue);

        var retrievedSettingValue = SettingsService.GetSetting<bool>(_client, settingKey);
        Assert.That(retrievedSettingValue, Is.EqualTo(settingValue));
    }

    [TestCase()]
    public void GetSettingValue_Integer_ReturnsValue()
    {
        var settingKey = "testNum";
        var settingValue = 15;
        _settingsService.AddSettingValue(settingKey, settingValue);

        var retrievedSettingValue = SettingsService.GetSetting<int>(_client, settingKey);
        Assert.That(retrievedSettingValue, Is.EqualTo(settingValue));
    }

    #region WaitForSettingAsync

    private static readonly TimeSpan s_retryDelay = TimeSpan.FromMilliseconds(10);

    /// <summary>Waits with a deadline <paramref name="timeout"/> from now.</summary>
    private static async Task<bool> WaitWithTimeoutAsync<T>(
        PapiClient client,
        string key,
        TimeSpan timeout,
        TimeSpan retryDelay
    )
    {
        using var deadline = new CancellationTokenSource(timeout);
        return await SettingsService.WaitForSettingAsync<T>(
            client,
            key,
            retryDelay,
            deadline.Token
        );
    }

    /// <summary>A read main answers with <paramref name="Value"/> after <paramref name="Delay"/>.</summary>
    private sealed record AnswersAfter(TimeSpan Delay, object? Value);

    /// <summary>
    /// Answers each request with the next scripted outcome, repeating the last one: an exception to
    /// throw, a value to return, an <see cref="AnswersAfter"/>, or one of the sentinels below.
    /// Stands in for main's answers, which DummyPapiClient's local handlers can't produce.
    /// </summary>
    private sealed class ScriptedPapiClient(params object?[] outcomes) : DummyPapiClient
    {
        /// <summary>A read main never answers; its own request timeout doesn't end it.</summary>
        public static readonly object NeverAnswers = new();

        /// <summary>The connection drops while the read is in flight.</summary>
        public static readonly object DisconnectsMidRead = new();

        public int Attempts { get; private set; }

        public override Task<T?> SendRequestAsync<T>(
            string requestType,
            IReadOnlyList<object?>? requestContents
        )
            where T : default
        {
            var outcome = outcomes[Math.Min(Attempts, outcomes.Length - 1)];
            Attempts++;
            if (outcome == NeverAnswers)
                return new TaskCompletionSource<T?>().Task;
            if (outcome == DisconnectsMidRead)
            {
                Dispose();
                return Task.FromException<T?>(new ConnectionLostException());
            }
            if (outcome is AnswersAfter late)
                return AnswerLaterAsync<T>(late);
            return outcome is Exception ex
                ? Task.FromException<T?>(ex)
                : Task.FromResult((T?)outcome);
        }

        private static async Task<T?> AnswerLaterAsync<T>(AnswersAfter late)
        {
            await Task.Delay(late.Delay);
            return (T?)late.Value;
        }
    }

    /// <summary>A real one: its constructor isn't public, so ask a peer for a missing method.</summary>
    private static RemoteMethodNotFoundException MethodNotFound()
    {
        var (clientStream, serverStream) = FullDuplexStream.CreatePair();
        using var server = JsonRpc.Attach(serverStream);
        using var client = JsonRpc.Attach(clientStream);
        return Assert.ThrowsAsync<RemoteMethodNotFoundException>(
            () => client.InvokeAsync("missing")
        )!;
    }

    private sealed class EchoTarget
    {
        public int Echo(int value) => value;
    }

    /// <summary>
    /// A real one that isn't about a missing handler: StreamJsonRpc reports a call to an existing
    /// method with the wrong arguments as this same exception type.
    /// </summary>
    private static RemoteMethodNotFoundException InvalidParams()
    {
        var (clientStream, serverStream) = FullDuplexStream.CreatePair();
        using var server = JsonRpc.Attach(serverStream, new EchoTarget());
        using var client = JsonRpc.Attach(clientStream);
        var ex = Assert.ThrowsAsync<RemoteMethodNotFoundException>(
            () => client.InvokeAsync(nameof(EchoTarget.Echo), 1, 2)
        )!;
        Assert.That(ex.ErrorCode, Is.EqualTo(JsonRpcErrorCode.InvalidParams));
        return ex;
    }

    [Test]
    public async Task WaitForSettingAsync_SettingHasValue_ReturnsTrue()
    {
        _settingsService.AddSettingValue("testNum", 15);

        var answered = await WaitWithTimeoutAsync<int?>(
            _client,
            "testNum",
            TimeSpan.FromSeconds(5),
            s_retryDelay
        );

        Assert.That(answered, Is.True);
    }

    [Test]
    public async Task WaitForSettingAsync_ServiceRegistersWhileWaiting_ReturnsTrue()
    {
        using var client = new DummyPapiClient();
        var waitTask = WaitWithTimeoutAsync<int?>(
            client,
            "testNum",
            TimeSpan.FromSeconds(5),
            s_retryDelay
        );
        // Long enough for several unanswered reads, so the wait is known to be retrying.
        await Task.Delay(s_retryDelay * 5);
        Assert.That(waitTask.IsCompleted, Is.False);

        var settingsService = new DummySettingsService(client);
        settingsService.AddSettingValue("testNum", 15);
        await settingsService.RegisterDataProviderAsync();

        Assert.That(await waitTask, Is.True);
    }

    [Test]
    public async Task WaitForSettingAsync_NoHandlerThenNullThenValue_ReturnsTrue()
    {
        using var client = new ScriptedPapiClient(MethodNotFound(), null, 15);

        var answered = await WaitWithTimeoutAsync<int?>(
            client,
            "testNum",
            TimeSpan.FromSeconds(5),
            s_retryDelay
        );

        Assert.That(answered, Is.True);
        Assert.That(client.Attempts, Is.EqualTo(3));
    }

    [Test]
    public async Task WaitForSettingAsync_NoHandlerUntilTimeout_ReturnsFalse()
    {
        using var client = new ScriptedPapiClient(MethodNotFound());

        var answered = await WaitWithTimeoutAsync<int?>(
                client,
                "testNum",
                TimeSpan.FromMilliseconds(500),
                s_retryDelay
            )
            .WaitAsync(TimeSpan.FromSeconds(5));

        Assert.That(answered, Is.False);
        // Dozens of attempts with these delays; a retry loop that doesn't pause makes thousands.
        Assert.That(client.Attempts, Is.GreaterThan(1).And.LessThan(200));
    }

    [Test]
    public async Task WaitForSettingAsync_ReadAnsweredBeforeTimeout_ReturnsTrue()
    {
        using var client = new ScriptedPapiClient(
            new AnswersAfter(TimeSpan.FromMilliseconds(50), 15)
        );

        var answered = await WaitWithTimeoutAsync<int?>(
                client,
                "testNum",
                TimeSpan.FromSeconds(5),
                s_retryDelay
            )
            .WaitAsync(TimeSpan.FromSeconds(5));

        Assert.That(answered, Is.True);
        Assert.That(client.Attempts, Is.EqualTo(1));
    }

    [Test]
    public async Task WaitForSettingAsync_LaterReadNeverAnswered_ReturnsFalseAtTimeout()
    {
        // The second read starts halfway through, so only a cap at the time left ends it on time; a
        // read capped at a fresh full timeout would end past 1.5x.
        var timeout = TimeSpan.FromSeconds(1);
        using var client = new ScriptedPapiClient(
            new AnswersAfter(timeout / 2, null),
            ScriptedPapiClient.NeverAnswers
        );
        var stopwatch = Stopwatch.StartNew();

        var answered = await WaitWithTimeoutAsync<int?>(client, "testNum", timeout, s_retryDelay)
            .WaitAsync(TimeSpan.FromSeconds(5));

        Assert.That(answered, Is.False);
        Assert.That(client.Attempts, Is.EqualTo(2));
        Assert.That(stopwatch.Elapsed, Is.GreaterThan(timeout * 0.8).And.LessThan(timeout * 1.4));
    }

    [Test]
    public async Task WaitForSettingAsync_RetryDelayPastTimeout_ReturnsFalseAtTimeout()
    {
        var timeout = TimeSpan.FromMilliseconds(100);
        using var client = new ScriptedPapiClient(MethodNotFound());
        var stopwatch = Stopwatch.StartNew();

        var answered = await WaitWithTimeoutAsync<int?>(
                client,
                "testNum",
                timeout,
                TimeSpan.FromSeconds(10)
            )
            .WaitAsync(TimeSpan.FromSeconds(5));

        Assert.That(answered, Is.False);
        Assert.That(client.Attempts, Is.EqualTo(1));
        Assert.That(stopwatch.Elapsed, Is.LessThan(TimeSpan.FromSeconds(2)));
    }

    [Test]
    public async Task WaitForSettingAsync_DeadlineAlreadyPassed_ReturnsFalseWithoutReading()
    {
        using var client = new ScriptedPapiClient(15);

        var answered = await SettingsService.WaitForSettingAsync<int?>(
            client,
            "testNum",
            s_retryDelay,
            new CancellationToken(canceled: true)
        );

        Assert.That(answered, Is.False);
        Assert.That(client.Attempts, Is.EqualTo(0));
    }

    private static IEnumerable<TestCaseData> OtherReadFailures()
    {
        yield return new TestCaseData(
            new Func<Exception>(() => new InvalidOperationException("broken"))
        ).SetArgDisplayNames("local failure");
        yield return new TestCaseData(
            new Func<Exception>(
                () =>
                    new RemoteInvocationException(
                        "handler failed",
                        (int)JsonRpcErrorCode.InvocationError,
                        (object?)null
                    )
            )
        ).SetArgDisplayNames("handler error");
        yield return new TestCaseData(new Func<Exception>(InvalidParams)).SetArgDisplayNames(
            "invalid params"
        );
    }

    [TestCaseSource(nameof(OtherReadFailures))]
    public void WaitForSettingAsync_ReadFailsOtherwise_ThrowsWithoutRetrying(
        Func<Exception> failure
    )
    {
        var expected = failure();
        using var client = new ScriptedPapiClient(expected, 15);

        var thrown = Assert.CatchAsync(
            () =>
                WaitWithTimeoutAsync<int?>(client, "testNum", TimeSpan.FromSeconds(5), s_retryDelay)
        );
        Assert.That(thrown, Is.SameAs(expected));
        Assert.That(client.Attempts, Is.EqualTo(1));
    }

    [Test]
    public async Task WaitForSettingAsync_ReadNeverAnswered_ReturnsFalseAtTimeout()
    {
        using var client = new ScriptedPapiClient(ScriptedPapiClient.NeverAnswers);

        var answered = await WaitWithTimeoutAsync<int?>(
                client,
                "testNum",
                TimeSpan.FromMilliseconds(100),
                s_retryDelay
            )
            .WaitAsync(TimeSpan.FromSeconds(5));

        Assert.That(answered, Is.False);
        Assert.That(client.Attempts, Is.EqualTo(1));
    }

    [Test]
    public async Task WaitForSettingAsync_DisconnectsMidRead_ReturnsFalse()
    {
        using var client = new ScriptedPapiClient(ScriptedPapiClient.DisconnectsMidRead);

        var answered = await WaitWithTimeoutAsync<int?>(
                client,
                "testNum",
                TimeSpan.FromSeconds(5),
                s_retryDelay
            )
            .WaitAsync(TimeSpan.FromSeconds(5));

        Assert.That(answered, Is.False);
        Assert.That(client.Attempts, Is.EqualTo(1));
    }

    [Test]
    public async Task WaitForSettingAsync_ReadReturnsNullUntilTimeout_ReturnsFalse()
    {
        using var client = new ScriptedPapiClient([null]);

        var answered = await WaitWithTimeoutAsync<string>(
                client,
                "testString",
                TimeSpan.FromMilliseconds(500),
                s_retryDelay
            )
            .WaitAsync(TimeSpan.FromSeconds(5));

        Assert.That(answered, Is.False);
        Assert.That(client.Attempts, Is.GreaterThan(1).And.LessThan(200));
    }

    [Test]
    public void WaitForSettingAsync_AlreadyDisconnected_ReturnsFalseWithoutWaitingForTimeout()
    {
        _client.Dispose();

        var waitTask = WaitWithTimeoutAsync<int?>(
            _client,
            "testNum",
            TimeSpan.FromMinutes(10),
            s_retryDelay
        );

        Assert.That(waitTask.Wait(TimeSpan.FromSeconds(5)), Is.True);
        Assert.That(waitTask.Result, Is.False);
    }

    #endregion

    #region SettingsChanged fan-out

    /// <summary>
    /// The wire name of the settings data provider's update announcement. Spelled out here rather
    /// than reached for through reflection so the test breaks loudly if the constant is renamed.
    /// </summary>
    private const string SettingsUpdateEvent =
        "platform.settingsServiceDataProvider-data:onDidUpdate";

    /// <summary>Stands in for the announcement main pushes; its contents are irrelevant.</summary>
    private static JsonElement AnnouncementPayload => JsonDocument.Parse("[\"*\"]").RootElement;

    [TestCase()]
    public void RegisterEventHandler_SecondHandlerForTheSettingsUpdateEvent_Throws()
    {
        // The reason SettingsChanged exists. JSON-RPC allows one local method per name and
        // parameter list, and Initialize claims this event for the whole process, so a component
        // that registers its own handler here faults whatever startup path it runs on. Pinning the
        // throw keeps that from being rediscovered at launch.
        SettingsService.Initialize(_client);

        Assert.That(
            () => _client.RegisterEventHandler(SettingsUpdateEvent, (JsonElement _) => { }),
            Throws.InvalidOperationException,
            "a second handler for one event name must be rejected, as StreamJsonRpc rejects it"
        );
    }

    [TestCase()]
    public void SettingsChanged_SettingsServiceAnnouncesAnUpdate_RaisesEverySubscriber()
    {
        var raises = new List<string>();
        SettingsService.SettingsChanged += () => raises.Add("first");
        SettingsService.SettingsChanged += () => raises.Add("second");
        SettingsService.Initialize(_client);

        _client.InvokeEventHandler(SettingsUpdateEvent, AnnouncementPayload);

        Assert.That(raises, Is.EqualTo(new[] { "first", "second" }));
    }

    [TestCase()]
    public void SettingsChanged_OneSubscriberThrows_TheRestStillRun()
    {
        // Subscribers are raised on the JSON-RPC dispatch thread, so an escaping exception would
        // fault the dispatch and silently drop the announcement for everyone registered after the
        // thrower.
        var reached = false;
        SettingsService.SettingsChanged += () => throw new InvalidOperationException("boom");
        SettingsService.SettingsChanged += () => reached = true;
        SettingsService.Initialize(_client);

        Assert.That(
            () => _client.InvokeEventHandler(SettingsUpdateEvent, AnnouncementPayload),
            Throws.Nothing,
            "a throwing subscriber must not escape into the JSON-RPC dispatch"
        );
        Assert.That(reached, Is.True, "subscribers after the thrower must still be raised");
    }

    [TestCase()]
    public void SettingsChanged_NoSubscribers_AnnouncementIsStillHandled()
    {
        SettingsService.Initialize(_client);

        Assert.That(
            () => _client.InvokeEventHandler(SettingsUpdateEvent, AnnouncementPayload),
            Throws.Nothing
        );
    }

    #endregion
}
