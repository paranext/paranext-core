namespace Paranext.DataProvider.JsonUtils
{
    [AttributeUsage(AttributeTargets.Class)]
    public class JsonMessageDeserializationAttribute : Attribute
    {
        /// <summary>
        /// Keys and values from a flat array converted into string tuples
        /// </summary>
        public List<(string key, string value)> KeyValuePairs { get; }

        public JsonMessageDeserializationAttribute(params string[] pairs)
        {
            KeyValuePairs = new List<(string key, string value)>();
            if (pairs.Length % 2 != 0)
                throw new ArgumentException(
                    "JSON deserialization keys and values must be provided in pairs"
                );

            for (int i = 0; i < pairs.Length; i += 2)
            {
                KeyValuePairs.Add((pairs[i], pairs[i + 1]));
            }
        }
    }
}
