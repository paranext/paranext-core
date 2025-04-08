namespace Paranext.DataProvider.Services
{
    /// <summary>
    /// Provides information about this app like name and version.
    /// </summary>
    internal static class AppService
    {
        private const string SERVICE_OBJECT = "object:AppService";
        private const string SERVICE_GET_APP_INFO = SERVICE_OBJECT + ".getAppInfo";

        /// <summary>
        /// Retrieve information about the application that is currently running like name and version.
        /// </summary>
        /// <param name="papiClient">The proxy to facilitate communication to the Paranext server
        /// via the PAPI</param>
        public static AppInfo GetAppInfo(PapiClient papiClient)
        {
            string description = "AppService.GetAppInfo";
            return ThreadingUtils.GetTaskResult(
                papiClient.SendRequestAsync<AppInfo>(SERVICE_GET_APP_INFO),
                description,
                ThreadingUtils.DefaultTimeout
            );
        }
    }
}
