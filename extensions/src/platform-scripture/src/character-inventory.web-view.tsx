import { WebViewProps } from '@papi/core';
import papi, { projectDataProviders, projectLookup } from '@papi/frontend';
import { useLocalizedStrings, useSetting } from '@papi/frontend/react';
import { VerseRef } from '@sillsdev/scripture';
import { CharacterInventory } from 'platform-bible-react';
import { LocalizeKey, ScriptureReference, split } from 'platform-bible-utils';

const defaultVerseRef: ScriptureReference = { bookNum: 1, chapterNum: 1, verseNum: 1 };

const getSetting = async (
  characterSet: 'validCharacters' | 'invalidCharacters',
  projectId: string,
) => {
  const projectMetadata = await projectLookup.getMetadataForProject(projectId);
  const pdp = await projectDataProviders.get('platform.base', projectMetadata.id);
  return split(await pdp.getSetting(`platformScripture.${characterSet}`), ' ');
};

const setSetting = async (
  characterSet: 'validCharacters' | 'invalidCharacters',
  projectId: string,
  characters: string[],
) => {
  const projectMetadata = await projectLookup.getMetadataForProject(projectId);
  const pdp = await projectDataProviders.get('platform.base', projectMetadata.id);
  pdp.setSetting(`platformScripture.${characterSet}`, characters.join(' '));
};

const getText = async (
  projectId: string,
  scriptureRef: ScriptureReference,
  scope: string,
): Promise<string | undefined> => {
  const verseRef = new VerseRef(
    scriptureRef.bookNum,
    scriptureRef.chapterNum,
    scriptureRef.verseNum,
  );

  if (scope === 'book') {
    const PDP = await papi.projectDataProviders.get('platformScripture.USFM_Book', projectId);
    return PDP.getBookUSFM(verseRef);
  }
  if (scope === 'chapter') {
    const PDP = await papi.projectDataProviders.get('platformScripture.USFM_Chapter', projectId);
    return PDP.getChapterUSFM(verseRef);
  }
  if (scope === 'verse') {
    const PDP = await papi.projectDataProviders.get('platformScripture.USFM_Verse', projectId);
    return PDP.getVerseUSFM(verseRef);
  }

  throw new Error('Cannot get scripture for unknown scope');
};

const STRING_KEYS: LocalizeKey[] = [
  '%webView_characterInventory_characters_all%',
  '%webView_characterInventory_characters_approved%',
  '%webView_characterInventory_characters_unapproved%',
  '%webView_characterInventory_characters_unknown%',
  '%webView_inventory_scope_book%',
  '%webView_inventory_scope_chapter%',
  '%webView_inventory_scope_verse%',
  '%webView_inventory_filter_text%',
  '%webView_inventory_table_header_character%',
  '%webView_inventory_table_header_unicode_value%',
  '%webView_inventory_table_header_count%',
  '%webView_inventory_table_header_status%',
  '%webView_inventory_occurrences_table_header_reference%',
  '%webView_inventory_occurrences_table_header_occurrence%',
];

global.webViewComponent = function CharacterInventoryWebView({ useWebViewState }: WebViewProps) {
  const [localizedStrings] = useLocalizedStrings(STRING_KEYS);
  const [projectId] = useWebViewState('projectId', '');
  const [scriptureRef, setScriptureRef] = useSetting('platform.verseRef', defaultVerseRef);

  return (
    <CharacterInventory
      scriptureReference={scriptureRef}
      setScriptureReference={setScriptureRef}
      localizedStrings={localizedStrings}
      projectId={projectId}
      getSetting={getSetting}
      setSetting={setSetting}
      getText={getText}
    />
  );
};
