using Newtonsoft.Json.Linq;
using Paranext.DataProvider.Projects;

namespace Paranext.DataProvider.JsonUtils
{
    internal static class ProjectMetadataConverter
    {
        private const string ID = "id";
        private const string NAME = "name";
        private const string STORAGE_TYPE = "storageType";
        private const string PROJECT_TYPE = "projectType";

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
                string name = Get(parsedArgs, NAME);
                string projectStorageType = Get(parsedArgs, STORAGE_TYPE);
                string projectType = Get(parsedArgs, PROJECT_TYPE);
                projectMetadata = new ProjectMetadata(id, name, projectStorageType, projectType);
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
                [NAME] = projectMetadata.Name,
                [STORAGE_TYPE] = projectMetadata.ProjectStorageType,
                [PROJECT_TYPE] = projectMetadata.ProjectType
            }.ToString();
        }
    }
}
