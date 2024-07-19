import papi from '@papi/frontend';
import { VerseRef } from '@sillsdev/scripture';
import { LocalizeKey, ScriptureReference } from 'platform-bible-utils';

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

export const getText = async (
  scope: string,
  scriptureRef: ScriptureReference,
  projectId: string,
) => {
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
