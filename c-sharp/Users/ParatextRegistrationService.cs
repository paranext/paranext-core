using System.Text.Json;
using System.Text.Json.Nodes;
using Paranext.DataProvider.JsonUtils;
using Paranext.DataProvider.MessageHandlers;
using Paranext.DataProvider.MessageTransports;
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

    public async Task Initialize()
    {
        // Set up commands on the PAPI
        await PapiClient.RegisterRequestHandler(
            "command:platformScripture.getParatextRegistrationData",
            GetParatextRegistrationData
        );
        await PapiClient.RegisterRequestHandler(
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
    protected ResponseToRequest GetParatextRegistrationData(JsonElement requestContents)
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

            return ResponseToRequest.Succeeded(registrationData);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Getting Paratext Registration data failed! {e}");
            return ResponseToRequest.Failed(
                $"Getting Paratext Registration data failed! {e.Message}"
            );
        }
    }

    /// <summary>
    /// Sets information about user's current Paratext Registry user information in ParatextData.dll
    /// and restarts the application
    /// </summary>
    /// <param name="requestContents">Contents of command request. Array whose first entry is the registration data object</param>
    /// <returns>`true` if successfully updated; `false` otherwise</returns>
    protected ResponseToRequest SetParatextRegistrationData(JsonElement requestContents)
    {
        try
        {
            RegistrationData? newRegistrationData;

            try
            {
                JsonArray contents = requestContents
                    .Deserialize<JsonNode>(s_papiOptions)!
                    .AsArray();
                if (contents.Count == 0)
                    return ResponseToRequest.Failed(
                        "Must specify array containing registration data object"
                    );
                try
                {
                    newRegistrationData = contents[0]!.Deserialize<RegistrationData>(s_papiOptions);
                }
                catch (Exception e)
                {
                    throw new Exception($"Could not deserialize registration data object! {e}");
                }
                if (newRegistrationData == null)
                    throw new Exception("Must specify registration data object");

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
            }
            catch (Exception e)
            {
                Console.Error.WriteLine($"Failed to parse registration data: {e}");
                return ResponseToRequest.Failed($"Failed to parse registration data: {e.Message}");
            }

            if (
                newRegistrationData.Name == RegistrationInfo.DefaultUser.Name
                && newRegistrationData.Code == RegistrationInfo.DefaultUser.RegistrationCode
                && newRegistrationData.Email == RegistrationInfo.DefaultUser.EmailAddress
                && newRegistrationData.SupporterName == RegistrationInfo.DefaultUser.SupportPerson
            )
                throw new Exception("No changes were made to the registration data");

            // Adapted from `RegistrationForm.cmdOK_Click`

            // Validate the registration code
            if (!StringUtils.IsValidEmail(newRegistrationData.Email))
                return ResponseToRequest.Failed(
                    LocalizationService.GetLocalizedString(
                        PapiClient,
                        "%paratextRegistration_warning_invalid_email%",
                        "Please enter a valid email address."
                    )
                );

            if (
                !RegistrationInfo.IsValidRegistration(
                    newRegistrationData.Code,
                    newRegistrationData.Name
                )
            )
                return ResponseToRequest.Failed(
                    LocalizationService.GetLocalizedString(
                        PapiClient,
                        "%paratextRegistration_warning_invalid_registration%",
                        "This registration code is not correct for this user."
                    )
                );

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

            // Restart the application after a delay. Don't wait for it so the response goes through
            Task.Delay(REGISTRATION_CHANGE_RESTART_DELAY_MS)
                .ContinueWith(
                    (Task task) =>
                    {
                        PapiClient.SendRequest(
                            "command:platform.restart",
                            Array.Empty<object>(),
                            (bool success, object? returnValue) => { }
                        );
                    }
                );

            return ResponseToRequest.Succeeded();
        }
        catch (Exception e)
        {
            Console.WriteLine($"Setting Paratext Registration data failed! {e}");
            return ResponseToRequest.Failed(
                $"Setting Paratext Registration data failed! {e.Message}"
            );
        }
    }

    #endregion

    #region Private properties and methods

    private static readonly JsonSerializerOptions s_papiOptions =
        SerializationOptions.CreateSerializationOptions();

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
