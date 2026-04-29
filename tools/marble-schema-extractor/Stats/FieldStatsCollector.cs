using System.Text.Json;

namespace MarbleSchemaExtractor;

internal sealed class FieldStatsCollector
{
    private readonly Dictionary<string, FieldStats> _byField = new();

    public void Observe(string fieldPath, object? value)
    {
        var stats = _byField.GetValueOrDefault(fieldPath) ?? new FieldStats();
        stats.Present++;
        if (value is string s ? !string.IsNullOrEmpty(s) : value is not null)
            stats.NonEmpty++;
        _byField[fieldPath] = stats;
    }

    public void ObserveArray(string fieldPath, int lengths)
    {
        var stats = _byField.GetValueOrDefault(fieldPath) ?? new FieldStats();
        stats.Present++;
        if (lengths > 0)
        {
            stats.NonEmpty++;
            stats.LengthSum += lengths;
            stats.MinLen = stats.MinLen is null ? lengths : Math.Min(stats.MinLen.Value, lengths);
            stats.MaxLen = stats.MaxLen is null ? lengths : Math.Max(stats.MaxLen.Value, lengths);
        }
        else
        {
            stats.MinLen = stats.MinLen is null ? 0 : Math.Min(stats.MinLen.Value, 0);
        }
        _byField[fieldPath] = stats;
    }

    public string ToJson()
    {
        var dict = new Dictionary<string, object>();
        foreach (var (path, stats) in _byField)
        {
            var entry = new Dictionary<string, object>
            {
                ["present"] = stats.Present,
                ["nonEmpty"] = stats.NonEmpty,
            };
            if (stats.LengthSum > 0 || stats.MaxLen is not null)
            {
                entry["nonEmptyCount"] = stats.NonEmpty;
                entry["avgArrayLen"] =
                    stats.NonEmpty == 0
                        ? 0
                        : Math.Round((double)stats.LengthSum / stats.Present, 2);
                entry["minLen"] = stats.MinLen ?? 0;
                entry["maxLen"] = stats.MaxLen ?? 0;
            }
            dict[path] = entry;
        }
        return JsonSerializer.Serialize(dict, new JsonSerializerOptions { WriteIndented = true });
    }

    private sealed class FieldStats
    {
        public int Present;
        public int NonEmpty;
        public long LengthSum;
        public int? MinLen;
        public int? MaxLen;
    }
}
