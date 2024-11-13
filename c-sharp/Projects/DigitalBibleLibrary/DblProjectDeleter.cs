using Paratext.Data;
using Paratext.Data.Archiving;
using Paratext.Data.ProjectComments;
using Paratext.Data.Repository;

namespace Paranext.DataProvider.Projects.DigitalBibleLibrary;

/// <summary>
/// Adapted from `Paratext.ProjectMenu.DeleteProjectForm.DeleteProject`
/// </summary>
public class DblProjectDeleter : IProjectDeleter
{
    public void DeleteProject(ScrText scrText)
    {
        CommentManager.RemoveCommentManager(scrText);
        VersioningManager.RemoveVersionedText(scrText);
        if (!scrText.Settings.IsMarbleResource)
            ScrTextCollection.DeleteProject(scrText);
    }
}
