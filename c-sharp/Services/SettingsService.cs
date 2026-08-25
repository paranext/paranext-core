using System.Text.Json;

namespace Paranext.DataProvider.Services;

internal static class SettingsService
{
    public const string SETTINGS_SERVICE_NAME = "platform.settingsServiceDataProvider";
    private const string SERVICE_UPDATE_EVENT = $"{SETTINGS_SERVICE_NAME}-data:onDidUpdate";
    private const string SERVICE_OBJECT = $"object:{SETTINGS_SERVICE_NAME}-data";
    private const string SERVICE_GET = $"{SERVICE_OBJECT}.get";
    private const string SERVICE_SET = $"{SERVICE_OBJECT}.set";

    /// <summary>
    /// Raised after the settings data provider announces that settings changed.
    /// <para>
    /// <b>Why this exists rather than a second <c>RegisterEventHandler</c>.</b> Event handlers are
    /// registered as JSON-RPC local methods, and <c>JsonRpc.AddLocalRpcMethod</c> throws
    /// <see cref="InvalidOperationException"/> ("A method with the same name and equivalent
    /// parameters has already been registered") when two handlers share an event name and parameter
    /// list. <see cref="Initialize"/> already claims <c>SERVICE_UPDATE_EVENT</c> for the whole
    /// process, so any other consumer of settings changes MUST subscribe here — a second
    /// registration would throw out of whatever startup path made it.
    /// </para>
    /// <para>
    /// <b>The payload does not say which setting changed.</b> A data provider's <c>onDidUpdate</c>
    /// carries data-type names (or <c>'*'</c>) — see <c>mapUpdateInstructionsToUpdateEvent</c> in
    /// <c>src/shared/services/data-provider.service.ts</c> — and the settings engine's <c>set</c>
    /// returns <c>true</c>, which maps to <c>'*'</c>. There is therefore no key to filter on: a
    /// subscriber that cares about one setting has to re-read it (or track its own last value) and
    /// must expect to be woken by changes to unrelated settings.
    /// </para>
    /// <para>
    /// <b>Threading.</b> Raised inline on the JSON-RPC dispatch thread, which is also the thread that
    /// services papi responses — so a handler that blocks on a round trip (<see cref="GetSetting"/>)
    /// can deadlock itself and stalls every other incoming message meanwhile. Handlers must return
    /// promptly and do any reading asynchronously (<see cref="GetSettingAsync"/>) or on another
    /// thread. Each handler is invoked in its own try/catch, so one throwing subscriber cannot
    /// suppress the others or fault the dispatch.
    /// </para>
    /// </summary>
    public static event Action? SettingsChanged;

    public static void Initialize(PapiClient papiClient)
    {
        papiClient.RegisterEventHandler(
            SERVICE_UPDATE_EVENT,
            (JsonElement _eventParams) =>
            {
                // Deliberately NOT awaited and NOT blocked on: this runs on the JSON-RPC dispatch
                // thread, so waiting here for the `get` response would block the very thread that
                // has to deliver it. Faults are observed by the helper.
                ThreadingUtils.ObserveTaskLoggingErrorsToStderr(
                    RefreshRequestTimeoutAsync(papiClient),
                    "refresh request timeout after a settings change"
                );
                RaiseSettingsChanged();
            }
        );

        ThreadingUtils.ObserveTaskLoggingErrorsToStderr(
            RefreshRequestTimeoutAsync(papiClient),
            "read the initial request timeout"
        );
    }

    /// <summary>
    /// Invokes each <see cref="SettingsChanged"/> handler under its own try/catch so one throwing
    /// subscriber can neither suppress the others nor fault the JSON-RPC dispatch this runs on.
    /// </summary>
    private static void RaiseSettingsChanged()
    {
        Action? handlers = SettingsChanged;
        if (handlers is null)
            return;
        foreach (Delegate handler in handlers.GetInvocationList())
        {
            try
            {
                ((Action)handler)();
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"A {nameof(SettingsChanged)} handler threw: {ex}");
            }
        }
    }

    private static async Task RefreshRequestTimeoutAsync(PapiClient papiClient)
    {
        try
        {
            int requestTimeoutSeconds = await GetSettingAsync<int>(
                papiClient,
                Settings.REQUEST_TIMEOUT
            );
            papiClient.SetRequestTimeout(new TimeSpan(0, 0, requestTimeoutSeconds));
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error updating request timeout: {ex}");
        }
    }

    /// <summary>
    /// Reads a setting, BLOCKING the calling thread until the papi answers or
    /// <see cref="ThreadingUtils.DefaultTimeout"/> elapses. Never call this from the JSON-RPC
    /// dispatch thread (a <see cref="SettingsChanged"/> handler, an event handler, a request
    /// handler that has not moved off the dispatch thread) — use <see cref="GetSettingAsync"/>
    /// there.
    /// </summary>
    public static T? GetSetting<T>(PapiClient papiClient, string key)
    {
        return ThreadingUtils.GetTaskResult(
            GetSettingAsync<T>(papiClient, key),
            $"SettingService.GetSetting for {key}",
            ThreadingUtils.DefaultTimeout
        );
    }

    /// <summary>
    /// Reads a setting without blocking a thread. Bounded by the papi request timeout rather than
    /// <see cref="ThreadingUtils.DefaultTimeout"/>, since there is no thread being held hostage
    /// here.
    /// </summary>
    /// <returns>The setting's value, or <see langword="default"/> when the settings service answers
    /// with JSON <c>null</c> (e.g. a setting that is registered but not yet valued). A
    /// <see langword="null"/> result is NOT proof the read succeeded in any meaningful sense —
    /// callers that cache the value should treat it as "no answer yet" rather than as a value.
    /// </returns>
    public static Task<T?> GetSettingAsync<T>(PapiClient papiClient, string key)
    {
        return papiClient.SendRequestAsync<T?>(SERVICE_GET, [key]);
    }

    public static bool SetSetting(PapiClient papiClient, string key, object? settingData)
    {
        string description = $"SettingService.SetSetting for {key}";
        var result = ThreadingUtils.GetTaskResult(
            papiClient.SendRequestAsync<JsonElement?>(SERVICE_SET, [key, settingData]),
            description,
            ThreadingUtils.DefaultTimeout
        );
        if (!result.HasValue)
            throw new InvalidDataException($"{description} returned null");

        try
        {
            if (result.Value.Deserialize<bool>())
                return true;
            else
                return false;
        }
        catch (JsonException)
        {
            // If they sent a string data type name or an array of them, it will fail to
            // deserialize. Interpret that as `true`because pretty much anything but `false` means
            // the data changed. See `DataProviderUpdateInstructions` for more info
            return true;
        }
    }

    /// <summary>
    /// Clears every <see cref="SettingsChanged"/> subscriber. Tests only: the event is static, so a
    /// fixture that subscribes and does not unsubscribe would keep receiving raises from — and
    /// leaking its captured state into — every fixture that runs after it in the same process.
    /// </summary>
    internal static void ResetForTests() => SettingsChanged = null;
}
