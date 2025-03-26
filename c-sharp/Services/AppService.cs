namespace Paranext.DataProvider.Services
{
    internal static class AppService
    {
        private const string SERVICE_OBJECT = "object:AppService";
        private const string SERVICE_GET_APP_INFO = SERVICE_OBJECT + ".getAppInfo";

        /// <summary>
        /// Gets the default value for a project setting
        /// </summary>
        /// <param name="papiClient">The proxy to facilitate communication to the Paranext server
        /// via the PAPI</param>
        /// <param name="key">The (Paratext) project setting key for which to get the default value
        /// (this will probably always be different from the corresponding key known to
        /// Platform.Bible)
        /// </param>
        /// <remarks>Every Project Data Provider **must** run this function when it receives a
        /// request to get a project setting if the project does not have a value for the project
        /// setting requested. It should return the response from this function directly, either
        /// the returned default value or throw.</remarks>
        public static AppInfo GetAppInfo(PapiClient papiClient)
        {
            string description = $"AppService.GetAppInfo";
            return ThreadingUtils.GetTaskResult(
                papiClient.SendRequestAsync<AppInfo>(SERVICE_GET_APP_INFO, []),
                description,
                ThreadingUtils.DefaultTimeout
            );
        }
    }
}
