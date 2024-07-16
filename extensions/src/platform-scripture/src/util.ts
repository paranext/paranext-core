import papi, { projectDataProviders, projectLookup } from '@papi/frontend';
import { VerseRef } from '@sillsdev/scripture';
import { LocalizeKey, ScriptureReference, split } from 'platform-bible-utils';

export const INVENTORY_STRING_KEYS: LocalizeKey[] = [
  '%webView_inventory_all%',
  '%webView_inventory_approved%',
  '%webView_inventory_unapproved%',
  '%webView_inventory_unknown%',
  '%webView_inventory_scope_book%',
  '%webView_inventory_scope_chapter%',
  '%webView_inventory_scope_verse%',
  '%webView_inventory_filter_text%',
  '%webView_inventory_table_header_repeatedWords%',
  '%webView_inventory_table_header_character%',
  '%webView_inventory_table_header_unicode_value%',
  '%webView_inventory_table_header_count%',
  '%webView_inventory_table_header_status%',
  '%webView_inventory_occurrences_table_header_reference%',
  '%webView_inventory_occurrences_table_header_occurrence%',
];

export const getSetting = async (
  itemSet: 'validCharacters' | 'invalidCharacters' | 'repeatableWords' | 'nonRepeatableWords',
  projectId: string,
) => {
  const projectMetadata = await projectLookup.getMetadataForProject(projectId);
  const pdp = await projectDataProviders.get('platform.base', projectMetadata.id);
  return split(await pdp.getSetting(`platformScripture.${itemSet}`), ' ');
};

export const setSetting = async (
  itemSet: 'validCharacters' | 'invalidCharacters' | 'repeatableWords' | 'nonRepeatableWords',
  projectId: string,
  items: string[],
) => {
  const projectMetadata = await projectLookup.getMetadataForProject(projectId);
  const pdp = await projectDataProviders.get('platform.base', projectMetadata.id);
  pdp.setSetting(`platformScripture.${itemSet}`, items.join(' '));
};

export const getText = async (
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
