using Paranext.DataProvider.Services;
using Paratext.Data;
using Paratext.Data.RegistryServerAccess;
using Paratext.Data.Repository;
using Paratext.Data.Users;
using PtxUtils;

namespace Paranext.DataProvider.Users;

/// <summary>
/// Commands on the papi that handle Send/Receive-related operations
/// </summary>
internal class ParatextRegistrationService(PapiClient papiClient)
{
    #region Constructors, consts, and fields

    /// <summary>
    /// Time in milliseconds to wait before restarting the application after changing Paratext
    /// registration information
    /// </summary>
    private const int REGISTRATION_CHANGE_RESTART_DELAY_MS = 5 * 1000;

    /// <summary>
    /// Placeholder to show instead of real registration code so we aren't giving out the real
    /// registration code
    /// </summary>
    private const string PLACEHOLDER_CODE = "******-******-******-******-******";

    #endregion

    #region Public properties and methods

    public async Task InitializeAsync()
    {
        // Set up commands on the PAPI
        await PapiClient.RegisterRequestHandlerAsync(
            "command:platformScripture.getParatextRegistrationData",
            GetParatextRegistrationData
        );
        await PapiClient.RegisterRequestHandlerAsync(
            "command:platformScripture.setParatextRegistrationData",
            SetParatextRegistrationData
        );
    }

    #endregion

    #region Protected properties and methods

    protected PapiClient PapiClient { get; } = papiClient;

    /// <summary>
    /// Returns information about user's current Paratext Registry user information in ParatextData.dll
    /// </summary>
    /// <param name="requestContents">Contents of command request. No contents expected</param>
    /// <returns>Paratext registration information</returns>
    protected RegistrationData GetParatextRegistrationData()
    {
        try
        {
            var registrationData = new RegistrationData
            {
                Name = RegistrationInfo.DefaultUser.Name,
                // Do not provide the code since it is essentially a password. If we need to provide
                // the code in the future for some reason, we will need to consider security implications.
                // Never add the code here since this command is now usable by anyone for any reason
                Code = !string.IsNullOrEmpty(RegistrationInfo.DefaultUser.RegistrationCode)
                    ? PLACEHOLDER_CODE
                    : "",
                Email = RegistrationInfo.DefaultUser.EmailAddress,
                SupporterName = RegistrationInfo.DefaultUser.SupportPerson,
            };

            return registrationData;
        }
        catch (Exception e)
        {
            Console.WriteLine($"Getting Paratext Registration data failed! {e}");
            throw new Exception($"Getting Paratext Registration data failed! {e.Message}");
        }
    }

    /// <summary>
    /// Sets information about user's current Paratext Registry user information in ParatextData.dll
    /// and restarts the application
    /// </summary>
    /// <param name="requestContents">Contents of command request. Array whose first entry is the registration data object</param>
    /// <returns>`true` if successfully updated; `false` otherwise</returns>
    protected void SetParatextRegistrationData(RegistrationData newRegistrationData)
    {
        bool shouldSkipAppendingToExceptionMessage = false;
        try
        {
            // If someone submits the placeholder code, they probably meant to just change some
            // other things about their registration. Replace the placeholder with the current
            // code
            if (newRegistrationData.Code == PLACEHOLDER_CODE)
                newRegistrationData.Code = RegistrationInfo.DefaultUser.RegistrationCode;
            else
            {
                // Adapted from `RegistrationForm.FormData.get`
                newRegistrationData.Code = newRegistrationData.Code.Trim().ToUpperInvariant(); // code is always upper case
                newRegistrationData.Code = newRegistrationData.Code.Replace("S", "5"); // S is never allowed; replace with 5
                newRegistrationData.Code = newRegistrationData.Code.Replace("I", "1"); // I is never allowed; replace with 1
                newRegistrationData.Code = newRegistrationData.Code.Replace("L", "1"); // L is never allowed; replace with 1
                newRegistrationData.Code = newRegistrationData.Code.Replace("O", "0"); // O is never allowed; replace with 0
                newRegistrationData.Name = newRegistrationData.Name.Trim();
                newRegistrationData.Email = newRegistrationData.Email.Trim();
                newRegistrationData.SupporterName = newRegistrationData.SupporterName.Trim();
            }

            if (
                newRegistrationData.Name == RegistrationInfo.DefaultUser.Name
                && newRegistrationData.Code == RegistrationInfo.DefaultUser.RegistrationCode
                && newRegistrationData.Email == RegistrationInfo.DefaultUser.EmailAddress
                && newRegistrationData.SupporterName == RegistrationInfo.DefaultUser.SupportPerson
            )
                throw new Exception("No changes were made to the registration data");

            // Adapted from `RegistrationForm.cmdOK_Click`

            // Validate the registration information
            if (!StringUtils.IsValidEmail(newRegistrationData.Email))
            {
                shouldSkipAppendingToExceptionMessage = true;
                throw new Exception(
                    LocalizationService.GetLocalizedString(
                        PapiClient,
                        "%paratextRegistration_warning_invalid_email%",
                        "Please enter a valid email address."
                    )
                );
            }

            if (
                !RegistrationInfo.IsValidRegistration(
                    newRegistrationData.Code,
                    newRegistrationData.Name
                )
            )
            {
                shouldSkipAppendingToExceptionMessage = true;
                throw new Exception(
                    LocalizationService.GetLocalizedString(
                        PapiClient,
                        "%paratextRegistration_warning_invalid_registration%",
                        "This registration code is not correct for this user."
                    )
                );
            }

            // Commit all existing changes so they are marked as being edited by the current user
            if (
                !string.IsNullOrEmpty(RegistrationInfo.DefaultUser.Name)
                && RegistrationInfo.DefaultUser.Name != newRegistrationData.Name
            )
                try
                {
                    PrepareForUserChange();
                }
                catch (Exception e)
                {
                    Console.WriteLine(
                        $"Exception while committing existing changes to prepare to change users: {e}"
                    );
                }

            // Actually change the registration info
            RegistrationInfo.ChangeRegistrationData(newRegistrationData);

            // registration code may have changed, so reset the registry server with the new user data
            RegistryServer.Default?.ResetServer(RegistrationInfo.DefaultUser);

            // No need to observe this task in any way. We are scheduling a call to restart the application then
            // returning from this method to continue execution and properly return from this method.
#pragma warning disable VSTHRD110 // Observe result of async calls
            // Restart the application after a delay. Don't wait for it so the response goes through
            Task.Delay(REGISTRATION_CHANGE_RESTART_DELAY_MS)
                .ContinueWith(
                    async (Task task) =>
                    {
                        try
                        {
                            await PapiClient.SendRequestAsync("command:platform.restart", []);
                        }
                        catch (Exception e)
                        {
                            Console.WriteLine(
                                $"Error while requesting to restart the application: {e}"
                            );
                        }
                    },
                    TaskScheduler.Default
                );
#pragma warning restore VSTHRD110 // Observe result of async calls
        }
        catch (Exception e)
        {
            Console.WriteLine($"Setting Paratext Registration data failed! {e}");
            throw new Exception(
                shouldSkipAppendingToExceptionMessage
                    ? e.Message
                    : $"Setting Paratext Registration data failed! {e.Message}"
            );
        }
    }

    #endregion

    #region Private properties and methods

    /// <summary>
    /// For any project with uncommitted changes on this machine, marks a point in project history in
    /// preparation for switching to a different Paratext user.
    ///
    /// Adapted from `UserSwitchingHelper.PrepareForUserChange
    /// </summary>
    private void PrepareForUserChange()
    {
        if (PADeveloper.IsDeveloper)
            return;

        var commitComment = LocalizationService.GetLocalizedString(
            PapiClient,
            "%paratextRegistration_commit_comment_changing_user%",
            "Before changing registered user"
        );

        List<ScrText> scrTexts = ScrTextCollection
            .ScrTexts(IncludeProjects.AllEditable)
            .Where(scr => scr.Settings.Editable)
            .ToList();
        scrTexts.ForEach(scrText =>
        {
            var vText = VersioningManager.Get(scrText);
            if (vText.HasUncommittedChanges())
                vText.Commit(commitComment, null, false, null);
        });
    }

    #endregion
}
