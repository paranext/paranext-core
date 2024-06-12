using Newtonsoft.Json.Linq;
using Paranext.DataProvider.Projects;

namespace Paranext.DataProvider.JsonUtils
{
    internal static class ProjectMetadataConverter
    {
        private const string ID = "id";
        private const string PROJECT_INTERFACES = "projectInterfaces";

        public static bool TryGetMetadata(
            string jsonString,
            out ProjectMetadata? projectMetadata,
            out string errorMessage
        )
        {
            try
            {
                JObject parsedArgs = JObject.Parse(jsonString);
                string id = Get(parsedArgs, ID);
                List<string> projectInterfaces = GetStrings(parsedArgs, PROJECT_INTERFACES);
                projectMetadata = new ProjectMetadata(id, projectInterfaces);
            }
            catch (Exception ex)
            {
                projectMetadata = null;
                errorMessage = ex.ToString();
                return false;
            }

            errorMessage = "";
            return true;
        }

        private static List<string> GetStrings(JObject jObject, string propertyName)
        {
            if (
                !jObject.TryGetValue(propertyName, out var property)
                || (property.Values<string>() == null)
            )
                throw new ArgumentException($"Missing \"{propertyName}\" property in JSON");

            return property.Values<string>().ToList()!;
        }

        private static string Get(JObject jObject, string propertyName)
        {
            if (
                !jObject.TryGetValue(propertyName, out var property)
                || (property.Value<string>() == null)
            )
                throw new ArgumentException($"Missing \"{propertyName}\" property in JSON");

            return property.Value<string>()!;
        }

        public static string ToJsonString(ProjectMetadata projectMetadata)
        {
            return new JObject
            {
                [ID] = projectMetadata.ID,
                [PROJECT_INTERFACES] = JToken.FromObject(projectMetadata.ProjectInterfaces)
            }.ToString();
        }

        public static string ToJsonString(string id, List<string> projectInterfaces)
        {
            return new JObject
            {
                [ID] = id,
                [PROJECT_INTERFACES] = JToken.FromObject(projectInterfaces)
            }.ToString();
        }
    }
}
