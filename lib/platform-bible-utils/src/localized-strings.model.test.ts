import { localizedStringsDocumentSchema } from './localized-strings.model';

describe('fallbackKey regex', () => {
  const fallbackKeyRegExp = new RegExp(
    localizedStringsDocumentSchema.$defs.stringMetadata.properties.fallbackKey.pattern,
  );

  test('passes on normal LocalizeKeys', () => {
    expect(fallbackKeyRegExp.test('%test_underscore%')).toBeTruthy();
    expect(fallbackKeyRegExp.test('%test-hyphen%')).toBeTruthy();
  });

  test('fails on not LocalizeKeys', () => {
    expect(fallbackKeyRegExp.test('test_stuff%')).toBeFalsy();
    expect(fallbackKeyRegExp.test('%test_stuff')).toBeFalsy();
    expect(fallbackKeyRegExp.test('%%')).toBeFalsy();
  });

  test('passes on even the weirdest Paratext 9 keys', () => {
    // This key is pretty typical with .;& and normal space
    expect(
      fallbackKeyRegExp.test(
        '%Paratext.Repository.SendReceiveProjectsForm.lblProjectsTotal_MouseClick.&quot;Save As Html...&quot;%',
      ),
    ).toBeTruthy();
    // ,
    expect(
      fallbackKeyRegExp.test(
        '%Paratext.Repository.SendReceiveProjectsForm.uiProjectList_RenderItem.&quot;If necessary, ask the project administrator to share the projects with you.&quot;%',
      ),
    ).toBeTruthy();
    // '
    expect(
      fallbackKeyRegExp.test(
        "%Paratext.PTLive.PTLiveDedicatedServerForm.RefreshUserList.&quot;There's a connection problem.&quot;%",
      ),
    ).toBeTruthy();
    // ()
    expect(
      fallbackKeyRegExp.test(
        '%Paratext.PTLive.PTLiveSessionManager.CreateServerSilent.&quot;Internet server (secondary)&quot;%',
      ),
    ).toBeTruthy();
    // {}#?
    expect(
      fallbackKeyRegExp.test(
        '%Paratext.PTLive.PTLiveSessionManager.BeginSession.&quot;The following files are different from the shared project.  Do you wish to overwrite them with the shared project files?  This is necessary for you (a project observer) to use Paratext Live.&#xD;&#xA;&#xD;&#xA;{0}&quot;%',
      ),
    ).toBeTruthy();
    // :
    expect(
      fallbackKeyRegExp.test(
        '%Paratext.PTLive.LocalSyncServer.MakeServerDisplayName.&quot;Local default (this computer: {0})&quot;%',
      ),
    ).toBeTruthy();
    // /
    expect(
      fallbackKeyRegExp.test(
        '%Paratext.PTLive.PTLiveControlCentre.BeforeSharingProject.&quot;You are an observer on project {0}.  You cannot do a Send/Receive while Paratext Live is running.&quot;%',
      ),
    ).toBeTruthy();
    // \
    expect(
      fallbackKeyRegExp.test(
        '%Paratext.Checking.Reference.CrossReferenceScanner..ctor.&quot;Missing \\xt&quot;%',
      ),
    ).toBeTruthy();
    // %
    expect(
      fallbackKeyRegExp.test(
        '%Paratext.UpdateStatusForm.RefreshStatus.&quot;Downloading {0} &#xD;&#xA;{1}% of {2}MB has been downloaded.&quot;%',
      ),
    ).toBeTruthy();
    // ⋮
    expect(
      fallbackKeyRegExp.test(
        '%Paratext.TextForm.UpdateRibbonMessages.&quot;To determine if any content needs reordering, select &quot;Tools &gt; Check study content order&quot; or click the link below. If you have editing permission on a chapter, you may use the &quot;⋮&quot; menu on any study content to reorder it.&quot;%',
      ),
    ).toBeTruthy();
    // |
    expect(
      fallbackKeyRegExp.test(
        '%Paratext.TextForm.changedVerseTextToolStripMenuItem_Click.&quot;Some verse text has changed. Changes are shown as {original text|new text}.&quot;%',
      ),
    ).toBeTruthy();
    // []
    expect(
      fallbackKeyRegExp.test('%Paratext.EditMenu.FindReplaceForm.cmbWordRestrictions.Items[0]%'),
    ).toBeTruthy();
    // “”
    expect(
      fallbackKeyRegExp.test(
        '%Paratext.ToolsMenu.ConvertProjectForm..ctor.&quot;This dialog allows converting your project into another project applying chosen transformations. This process can take a long time. You must enter the name of a registered Paratext user in the “With” box, spelling it exactly as it appears in the user’s official registration.&quot;%',
      ),
    ).toBeTruthy();
    // ‘’
    expect(
      fallbackKeyRegExp.test(
        '%Paratext.RegistrationForm..ctor.&quot;It will greatly assist the global support team to know who currently provides Paratext support to you. If unknown, enter ‘unknown’.&quot;%',
      ),
    ).toBeTruthy();
    // !
    expect(
      fallbackKeyRegExp.test(
        '%Paratext.ToolsMenu.CopyBooksForm.SetDefaultEligibility.&quot;The book in the &quot;From&quot; project is older!!!&quot;%',
      ),
    ).toBeTruthy();
    // ~
    expect(
      fallbackKeyRegExp.test(
        '%Paratext.ToolsMenu.NoBreakSpaceReplacer.ReplaceRemovingTildes.&quot;This will replace all no-break spaces (currently represented by ~) with normal spaces. Continue?&quot;%',
      ),
    ).toBeTruthy();
    // *
    expect(
      fallbackKeyRegExp.test(
        "%Paratext.ToolsMenu.StudyBibleForm.ListUnmatchedNotesAndSidebars.&quot;All errors marked '***' must be fixed and the Merge repeated.&quot;%",
      ),
    ).toBeTruthy();
    // \u00A0 non-breaking space
    expect(
      fallbackKeyRegExp.test(
        '%Paratext.ProjectMenu.ProjectPropertiesForm.cmbUsfmVersion_SelectedIndexChanged.&quot;Changing USFM version of project {0} will enable features introduced in Paratext 9 to support USFM 3.&quot;%',
      ),
    ).toBeTruthy();
    // +
    expect(
      fallbackKeyRegExp.test('%Paratext.Ruby.RubyEditorPopup..ctor.&quot;Ctrl+Right&quot;%'),
    ).toBeTruthy();
    // =
    expect(
      fallbackKeyRegExp.test(
        "%Paratext.WordList.WordListForm.EditHyphenation.&quot;Enter the hyphenation by adding equal signs '=' at hyphenation points&quot%",
      ),
    ).toBeTruthy();
    // •
    expect(
      fallbackKeyRegExp.test(
        '%Paratext.ProjectProgress.PlanListControl.AllowMoveTaskToAnotherStage.&quot;Your Project Plan is currently based on &quot;{0}&quot;.&#xA;&#xA;You are moving a task to a different stage. This has the following consequences:&#xA;  • Recorded progress for this task will be lost.&#xA;  • You will not be able to update to a new version of &quot;{0}&quot;.&quot;%',
      ),
    ).toBeTruthy();
    // `
    expect(
      fallbackKeyRegExp.test(
        '%Paratext.ProjectProgress.Filters.CurrentPriorityFilter`1.get_Description.&quot;Current priority&quot;%',
      ),
    ).toBeTruthy();
    // …
    expect(
      fallbackKeyRegExp.test(
        '%Paratext.Marble.MarbleTabBase.AppendUserFeedbackHtml.&quot;Give feedback…&amp;nbsp;(optional)&quot;%',
      ),
    ).toBeTruthy();
    // \u200B zeo-width space
    expect(
      fallbackKeyRegExp.test(
        '%Paratext.ParallelPassages.&quot;The current active window is a resource text. To check an editable project, click on that project window and ​re-launch this tool.&quot;%',
      ),
    ).toBeTruthy();
    // ↑↓
    expect(
      fallbackKeyRegExp.test(
        '%Paratext.Base.ParatextWindows.WindowManagerHelper..ctor.&quot;Previous verse (Ctrl+↑)&#xD;&#xA;Next verse (Ctrl+↓)&quot;%',
      ),
    ).toBeTruthy();
  });
});
