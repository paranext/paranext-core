using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization.Metadata;

namespace Paranext.DataProvider.Data;

internal class PrivateConstructorResolver : DefaultJsonTypeInfoResolver
{
   public override JsonTypeInfo GetTypeInfo(Type type, JsonSerializerOptions options)
   {
       JsonTypeInfo jsonTypeInfo = base.GetTypeInfo(type, options);

       if (jsonTypeInfo.Kind == JsonTypeInfoKind.Object && jsonTypeInfo.CreateObject is null)
       {
            if (jsonTypeInfo.Type.GetConstructors(BindingFlags.Public | BindingFlags.Instance).All(c => c.GetParameters().Length > 0))
            {
                // The type doesn't have public constructors
                jsonTypeInfo.CreateObject = () => Activator.CreateInstance(jsonTypeInfo.Type, true)!;
            }
       }

      return jsonTypeInfo;
   }
}
