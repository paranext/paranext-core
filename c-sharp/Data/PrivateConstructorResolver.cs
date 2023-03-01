using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization.Metadata;

namespace Paranext.DataProvider.Data;

/// <summary>
/// Type resolver for creation objects that have a private default constructor
/// </summary>
internal class PrivateConstructorResolver : DefaultJsonTypeInfoResolver
{
   public override JsonTypeInfo GetTypeInfo(Type type, JsonSerializerOptions options)
   {
       JsonTypeInfo jsonTypeInfo = base.GetTypeInfo(type, options);

       if (jsonTypeInfo.Kind == JsonTypeInfoKind.Object && jsonTypeInfo.CreateObject is null)
       {
            if (jsonTypeInfo.Type.GetConstructors(BindingFlags.Public | BindingFlags.Instance)
                .All(c => c.GetParameters().Length > 0))
            {
                // The type doesn't have a public default constructor
                jsonTypeInfo.CreateObject = () => Activator.CreateInstance(jsonTypeInfo.Type, true)!;
            }
       }

      return jsonTypeInfo;
   }
}
