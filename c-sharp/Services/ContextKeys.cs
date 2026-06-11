using System.Text.RegularExpressions;

namespace Paranext.DataProvider.Services;

/// <summary>
/// Facade over the shared store for "context keys": named properties that drive dynamic menu item
/// state (when/enabledWhen/checkedWhen expressions in menus.json contributions).
/// Keep key format and semantics in sync with context-keys.service.ts.
/// Values are constrained to string, int, double, and bool. Keys must have at least two
/// dot-separated segments of word characters or hyphens; prefix keys with your component's name.
/// A key first set in one process can only be updated from that same process.
/// </summary>
internal sealed partial class ContextKeys(ISharedStore sharedStore)
{
    private const string STORE_PREFIX = "contextKeys.";

    // Matches at least two dot-separated segments of [A-Za-z0-9_-] (mirrors isValidContextKey in
    // context-keys.model.ts; intentionally ASCII-only to match the JS \w semantics)
    [GeneratedRegex(@"^[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)+$")]
    private static partial Regex ValidKeyRegex();

    private static readonly Regex s_validKeyRegex = ValidKeyRegex();

    private readonly ISharedStore _sharedStore = sharedStore;

    public static bool IsValidKey(string key)
    {
        return s_validKeyRegex.IsMatch(key);
    }

    public void Set(string key, string value)
    {
        SetInternal(key, value);
    }

    public void Set(string key, bool value)
    {
        SetInternal(key, value);
    }

    // Note: a char argument implicitly converts to int and lands here, storing a number. There is
    // no char overload on purpose - context key values are string | bool | int | double only.
    public void Set(string key, int value)
    {
        SetInternal(key, value);
    }

    public void Set(string key, double value)
    {
        SetInternal(key, value);
    }

    public bool TryGetValue<T>(string key, out T? value)
    {
        AssertValidKey(key);
        return _sharedStore.TryGetValue(STORE_PREFIX + key, out value);
    }

    public void Remove(string key)
    {
        AssertValidKey(key);
        _sharedStore.Remove<object>(STORE_PREFIX + key);
    }

    private void SetInternal<T>(string key, T value)
    {
        AssertValidKey(key);
        _sharedStore.Set(STORE_PREFIX + key, value);
    }

    private static void AssertValidKey(string key)
    {
        if (!IsValidKey(key))
            throw new ArgumentException(
                $"Invalid context key \"{key}\". Context keys must have at least two dot-separated "
                    + "segments of word characters or hyphens, e.g. \"myExtension.someProperty\"",
                nameof(key)
            );
    }
}
