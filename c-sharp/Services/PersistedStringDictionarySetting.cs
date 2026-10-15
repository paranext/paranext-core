using PtxUtils;

namespace Paranext.DataProvider.Services;

/// <summary>
/// A dictionary setting that ParatextData holds in memory and writes back through
/// <c>SafeSave</c>. It is first read while the data provider starts, which can be before the
/// extension host has brought up the settings service. If that read fails, the value starts empty
/// and the stored value is read again in the background until it arrives, then merged in. Until
/// then <see cref="SafeSave"/> does nothing, because <see cref="SettingsService.SetSetting"/>
/// replaces the whole stored value and would wipe whatever the failed read missed.
/// </summary>
internal sealed class PersistedStringDictionarySetting
{
    private static readonly TimeSpan s_defaultRetryDelay = TimeSpan.FromSeconds(5);

    private readonly PapiClient _papiClient;
    private readonly string _key;
    private readonly TimeSpan _retryDelay;
    private SerializableStringDictionary _value;

    // The background read that follows a failed first read. Null once its result is merged, or
    // when the first read succeeded.
    private Task<SerializableStringDictionary?>? _pendingLoad;

    public PersistedStringDictionarySetting(
        PapiClient papiClient,
        string key,
        TimeSpan? retryDelay = null
    )
    {
        _papiClient = papiClient;
        _key = key;
        _retryDelay = retryDelay ?? s_defaultRetryDelay;

        if (SettingsService.TryGetSetting(papiClient, key, out SerializableStringDictionary? value))
        {
            _value = value ?? [];
        }
        else
        {
            _value = [];
            _pendingLoad = Task.Run(LoadUntilReadAsync);
        }
    }

    /// <summary>
    /// The in-memory value. Once a background read succeeds, the next access merges its stored
    /// entries in. The merge runs on the accessing thread, rather than when the read finishes,
    /// so it doesn't modify the dictionary while ParatextData is working with it.
    /// </summary>
    public SerializableStringDictionary Value
    {
        get
        {
            MergePendingLoad();
            return _value;
        }
        set => _value = value;
    }

    /// <summary>Whether the stored value has been read and merged in.</summary>
    public bool IsLoaded
    {
        get
        {
            MergePendingLoad();
            return _pendingLoad == null;
        }
    }

    public void SafeSave()
    {
        if (!IsLoaded)
            return;
        SettingsService.SetSetting(_papiClient, _key, _value);
    }

    private async Task<SerializableStringDictionary?> LoadUntilReadAsync()
    {
        while (!_papiClient.DisconnectTask.IsCompleted)
        {
            await Task.Delay(_retryDelay);
            try
            {
                return await SettingsService.GetSettingAsync<SerializableStringDictionary>(
                    _papiClient,
                    _key
                );
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Retrying read of setting {_key}: {ex.Message}");
            }
        }
        // The connection is gone, so there is nothing left to save to either.
        throw new OperationCanceledException($"Stopped reading setting {_key}: disconnected");
    }

    private void MergePendingLoad()
    {
        var pendingLoad = _pendingLoad;
        if (pendingLoad is not { IsCompletedSuccessfully: true })
            return;
        // Claim the result so that two threads reaching here at once merge it only once.
        if (Interlocked.CompareExchange(ref _pendingLoad, null, pendingLoad) != pendingLoad)
            return;

        // Entries changed this session are newer than the stored ones, so they win.
        foreach (var (key, value) in pendingLoad.Result ?? [])
            if (!_value.ContainsKey(key))
                _value[key] = value;
    }
}
