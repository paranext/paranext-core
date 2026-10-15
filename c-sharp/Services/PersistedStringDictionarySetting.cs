using PtxUtils;

namespace Paranext.DataProvider.Services;

/// <summary>
/// A dictionary setting that ParatextData holds in memory and writes back through
/// <c>SafeSave</c>. It is first read while the data provider starts, which can be before the
/// extension host has brought up the settings service. If that read fails, the value starts empty
/// and the stored value is read again in the background until it arrives, then merged in, with
/// entries changed this session winning. Until then <see cref="SafeSave"/> only remembers that a
/// save is due, because <see cref="SettingsService.SetSetting"/> replaces the whole stored value
/// and would wipe whatever the failed read missed.
/// <para>
/// The merge cannot tell an entry deleted this session from one never added, so a stored entry
/// whose key was added and then removed before the stored value arrived comes back.
/// </para>
/// </summary>
internal sealed class PersistedStringDictionarySetting
{
    private static readonly TimeSpan s_defaultRetryDelay = TimeSpan.FromSeconds(5);

    private readonly PapiClient _papiClient;
    private readonly string _key;
    private readonly TimeSpan _retryDelay;
    private readonly object _lock = new();

    private SerializableStringDictionary _value;
    private bool _isLoaded;

    // The stored value once a background read gets it, until it is merged into _value
    private SerializableStringDictionary? _unmergedStoredValue;

    // Whether SafeSave was called before the stored value was merged in
    private bool _isSaveDeferred;

    public PersistedStringDictionarySetting(
        PapiClient papiClient,
        string key,
        TimeSpan? retryDelay = null
    )
    {
        _papiClient = papiClient;
        _key = key;
        _retryDelay = retryDelay ?? s_defaultRetryDelay;

        if (
            SettingsService.TryGetSetting(papiClient, key, out SerializableStringDictionary? value)
            && value != null
        )
        {
            _value = value;
            _isLoaded = true;
        }
        else
        {
            _value = [];
            _ = Task.Run(LoadInBackgroundAsync);
        }
    }

    /// <summary>
    /// The in-memory value. Once a background read gets the stored value, the next access merges
    /// it in. The merge runs on the accessing thread, rather than when the read finishes, so it
    /// doesn't modify the dictionary while ParatextData is working with it on another thread.
    /// </summary>
    public SerializableStringDictionary Value
    {
        get
        {
            lock (_lock)
            {
                MergeStoredValueLocked();
                return _value;
            }
        }
        set
        {
            lock (_lock)
                _value = value;
        }
    }

    /// <summary>Whether the stored value has been read and merged in.</summary>
    public bool IsLoaded
    {
        get
        {
            lock (_lock)
            {
                MergeStoredValueLocked();
                return _isLoaded;
            }
        }
    }

    public void SafeSave()
    {
        lock (_lock)
        {
            MergeStoredValueLocked();
            if (!_isLoaded)
            {
                _isSaveDeferred = true;
                return;
            }
            SettingsService.SetSetting(_papiClient, _key, _value);
        }
    }

    private async Task LoadInBackgroundAsync()
    {
        while (!_papiClient.DisconnectTask.IsCompleted)
        {
            await Task.Delay(_retryDelay);
            SerializableStringDictionary? storedValue;
            try
            {
                storedValue = await SettingsService.GetSettingAsync<SerializableStringDictionary>(
                    _papiClient,
                    _key
                );
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Retrying read of setting {_key}: {ex.Message}");
                continue;
            }
            // The settings this holds declare a default, so null means the service has no
            // answer yet, not that nothing is stored.
            if (storedValue == null)
            {
                Console.WriteLine($"Retrying read of setting {_key}: no value returned");
                continue;
            }

            // The await may have resumed on the JSON-RPC dispatch thread, where the blocking
            // SetSetting below would wait on a response that thread has to deliver.
            await Task.Run(() => AcceptStoredValue(storedValue));
            return;
        }
    }

    private void AcceptStoredValue(SerializableStringDictionary storedValue)
    {
        lock (_lock)
        {
            _unmergedStoredValue = storedValue;
            // A skipped save would otherwise wait for the next access, which may never come, so
            // merge and save now.
            if (!_isSaveDeferred)
                return;
            MergeStoredValueLocked();
            _isSaveDeferred = false;
            try
            {
                SettingsService.SetSetting(_papiClient, _key, _value);
            }
            catch (Exception ex)
            {
                Console.Error.WriteLine($"Could not save setting {_key}: {ex}");
            }
        }
    }

    private void MergeStoredValueLocked()
    {
        if (_unmergedStoredValue == null)
            return;
        // Entries changed this session are newer than the stored ones, so they win.
        foreach (var (key, value) in _unmergedStoredValue)
            if (!_value.ContainsKey(key))
                _value[key] = value;
        _unmergedStoredValue = null;
        _isLoaded = true;
    }
}
