// === NEW IN PT10 ===
// Reason: PAPI DataProvider pattern - wires all Text Collection services onto the network
// Maps to: CAP-018
// Source: Strategic plan BE-6, data-contracts.md M-001 through M-018
// Dependencies: All CAP-001 through CAP-017 services

using Paranext.DataProvider.NetworkObjects;
using SIL.Scripture;

namespace Paranext.DataProvider.TextCollection;

/// <summary>
/// PAPI DataProvider that exposes all Text Collection services on the network.
/// Registers 5 DataProvider get functions and 14 individual commands.
/// </summary>
internal sealed class TextCollectionDataProvider : NetworkObjects.DataProvider
{
    #region Consts and member variables

    private readonly SavedCollectionService _savedCollectionService;
    private readonly SinglePaneReloadService _singlePaneReloadService;

    private const string CommandPrefix = "command:platformScripture.textCollection";

    #endregion

    #region Constructor

    public TextCollectionDataProvider(PapiClient papiClient)
        : base("platformScripture.textCollection", papiClient)
    {
        _savedCollectionService = new SavedCollectionService();
        _singlePaneReloadService = new SinglePaneReloadService();
    }

    #endregion

    #region DataProvider methods

    protected override List<(string functionName, Delegate function)> GetFunctions()
    {
        return
        [
            (
                "getTitle",
                new Func<IList<TextCollectionItem>, int, string, TitleResult>(
                    TextCollectionService.GenerateTitle
                )
            ),
            (
                "getMultiPaneContent",
                new Func<IList<TextCollectionItem>, VerseRef, MultiPaneContent>(
                    VerseXmlGenerator.GenerateMultiPaneContent
                )
            ),
            (
                "getSavedLists",
                new Func<IList<SavedScrTextList>>(_savedCollectionService.GetSavedLists)
            ),
            (
                "getCombinedSets",
                new Func<IList<SavedScrTextSet>>(_savedCollectionService.GetCombinedSets)
            ),
            (
                "getSavedCollections",
                new Func<IList<SavedTextCollection>>(_savedCollectionService.GetSavedCollections)
            ),
        ];
    }

    protected override async Task StartDataProviderAsync()
    {
        await PapiClient.RegisterRequestHandlerAsync(
            $"{CommandPrefix}.filterEligibleTexts",
            new Func<IList<string>, TextFilterResult>(TextCollectionService.FilterEligibleTexts)
        );

        await PapiClient.RegisterRequestHandlerAsync(
            $"{CommandPrefix}.areEquivalent",
            new Func<IList<string>, IList<string>, bool>(TextCollectionService.AreEquivalent)
        );

        await PapiClient.RegisterRequestHandlerAsync(
            $"{CommandPrefix}.createOrActivateTextCollection",
            new Func<TextCollectionCreateRequest, IList<IList<string>>, TextCollectionCreateResult>(
                TextCollectionService.CreateOrActivateTextCollection
            )
        );

        await PapiClient.RegisterRequestHandlerAsync(
            $"{CommandPrefix}.writeResourceXml",
            new Func<TextCollectionItem, VerseRef, string>(VerseXmlGenerator.WriteResourceXml)
        );

        await PapiClient.RegisterRequestHandlerAsync(
            $"{CommandPrefix}.determineReloadDecision",
            new Func<TextCollectionItem, TextCollectionItem?, string, string, bool, ReloadDecision>(
                _singlePaneReloadService.DetermineReloadDecision
            )
        );

        await PapiClient.RegisterRequestHandlerAsync(
            $"{CommandPrefix}.createMemento",
            new Func<
                bool,
                IList<TextCollectionItem>,
                int,
                bool,
                bool,
                string,
                int,
                int,
                double,
                string,
                ScrollGroup,
                TextCollectionMemento
            >(TextCollectionMementoService.CreateMemento)
        );

        await PapiClient.RegisterRequestHandlerAsync(
            $"{CommandPrefix}.restoreFromMemento",
            new Func<TextCollectionMemento, TextCollectionRestoreResult>(
                TextCollectionMementoService.RestoreFromMemento
            )
        );

        await PapiClient.RegisterRequestHandlerAsync(
            $"{CommandPrefix}.mergeWithZoomPreservation",
            new Func<IList<TextCollectionItem>, IList<string>, IList<TextCollectionItem>>(
                TextCollectionService.MergeWithZoomPreservation
            )
        );

        await PapiClient.RegisterRequestHandlerAsync(
            $"{CommandPrefix}.removeDeletedTexts",
            new Func<IList<TextCollectionItem>, bool>(TextCollectionService.RemoveDeletedTexts)
        );

        await PapiClient.RegisterRequestHandlerAsync(
            $"{CommandPrefix}.matchesFilter",
            new Func<string, FilterButtonStates, bool>(
                (projectId, buttons) =>
                    ProjectFilterService.MatchesFilter(projectId, buttons, "", false)
            )
        );

        await PapiClient.RegisterRequestHandlerAsync(
            $"{CommandPrefix}.getProjectType",
            new Func<string, string>(ProjectFilterService.GetProjectType)
        );

        await PapiClient.RegisterRequestHandlerAsync(
            $"{CommandPrefix}.handleWriteLockChange",
            new Func<string, IList<TextCollectionItem>, int, ChangeAction>(
                TextCollectionService.HandleWriteLockChange
            )
        );

        await PapiClient.RegisterRequestHandlerAsync(
            $"{CommandPrefix}.saveTextList",
            new Action<string, IList<string>, int, int>(
                (name, textNames, hebGrkIndex, scrProjectIndex) =>
                {
                    _savedCollectionService.SaveList(name, textNames, hebGrkIndex, scrProjectIndex);
                    SendDataUpdateEvent("*", "saveTextList");
                }
            )
        );

        await PapiClient.RegisterRequestHandlerAsync(
            $"{CommandPrefix}.deleteTextList",
            new Action<string>(name =>
            {
                _savedCollectionService.DeleteList(name);
                SendDataUpdateEvent("*", "deleteTextList");
            })
        );
    }

    #endregion
}
