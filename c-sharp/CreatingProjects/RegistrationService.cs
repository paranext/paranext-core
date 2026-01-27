namespace Paranext.DataProvider.CreatingProjects;

/// <summary>
/// Service for project registration state management.
/// </summary>
internal static class RegistrationService
{
    private static readonly HashSet<ProjectType> s_inheritingTypes =
        new()
        {
            ProjectType.BackTranslation,
            ProjectType.Auxiliary,
            ProjectType.TransliterationManual,
            ProjectType.TransliterationWithEncoder,
        };

    public static RegistrationState GetRegistrationState(
        string? projectGuid,
        string? baseProjectGuid,
        ProjectType projectType
    )
    {
        bool registryAvailable = IsRegistryServerAvailable();

        if (projectType == ProjectType.NotSelected)
        {
            return new RegistrationState
            {
                Status = RegistrationStatus.NotSelected,
                CanRegisterOnline = false,
                CanOptOutOfInheritance = false,
                RegistryServerAvailable = registryAvailable,
            };
        }

        if (projectType == ProjectType.ConsultantNotes)
        {
            return new RegistrationState
            {
                Status = RegistrationStatus.NotApplicable,
                CanRegisterOnline = false,
                CanOptOutOfInheritance = false,
                RegistryServerAvailable = registryAvailable,
            };
        }

        // Types that inherit from base
        if (baseProjectGuid != null && s_inheritingTypes.Contains(projectType))
        {
            bool canOptOut = projectType == ProjectType.BackTranslation;
            return new RegistrationState
            {
                Status = RegistrationStatus.InheritsFromBase,
                CanRegisterOnline = false,
                CanOptOutOfInheritance = canOptOut,
                RegistryServerAvailable = registryAvailable,
            };
        }

        // Types requiring own registration: Standard, Daughter, StudyBibleAdditions
        // or derived types without a base selected yet
        return new RegistrationState
        {
            Status = RegistrationStatus.Unregistered,
            CanRegisterOnline = true,
            CanOptOutOfInheritance = false,
            RegistryServerAvailable = registryAvailable,
        };
    }

    public static bool IsRegistryServerAvailable()
    {
        try
        {
            return Paratext.Data.RegistryServerAccess.RegistryServer.Default != null;
        }
        catch
        {
            return false;
        }
    }

    public static string InitiateOnlineRegistration(string projectGuid)
    {
        throw new NotImplementedException();
    }
}
