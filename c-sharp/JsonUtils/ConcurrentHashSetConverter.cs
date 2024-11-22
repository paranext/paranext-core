using System.Text.Json;
using System.Text.Json.Serialization;

namespace Paranext.DataProvider.JsonUtils;

public class ConcurrentHashSetConverter<T> : JsonConverter<ConcurrentHashSet<T>>
    where T : notnull
{
    public override ConcurrentHashSet<T> Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options
    )
    {
        var list = JsonSerializer.Deserialize<List<T>>(ref reader, options);
        var retVal = new ConcurrentHashSet<T>();
        if (list != null)
        {
            foreach (var item in list)
                retVal.Add(item);
        }
        return retVal;
    }

    public override void Write(
        Utf8JsonWriter writer,
        ConcurrentHashSet<T> value,
        JsonSerializerOptions options
    )
    {
        JsonSerializer.Serialize(writer, value.GetItems(), options);
    }
}
