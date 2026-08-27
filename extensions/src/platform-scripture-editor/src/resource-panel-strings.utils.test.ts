import { describe, expect, it } from 'vitest';
import {
  RESOURCE_PANEL_TYPED_STRING_KEYS,
  resolveResourcePanelStringKeys,
} from './resource-panel-strings.utils';

describe('resolveResourcePanelStringKeys', () => {
  it('names Bible texts for a scripture resource', () => {
    expect(resolveResourcePanelStringKeys('ScriptureResource')).toEqual({
      titleKey: '%webView_resourcePanel_bibleTexts_title%',
      titleWithResourceKey: '%webView_resourcePanel_bibleTexts_title_withResource%',
      emptyStatePromptKey: '%webView_resourcePanel_bibleTexts_emptyState_prompt%',
      bookNotAvailableKey: '%webView_resourcePanel_bibleTexts_bookNotAvailable%',
      pickButtonKey: '%webView_resourcePanel_bibleTexts_pick%',
    });
  });

  it('names commentaries for a commentary resource', () => {
    // The commentary arm is the one a reader is least likely to check: the panel renders Bible texts
    // far more often, so a swapped pair would ship unnoticed without this.
    expect(resolveResourcePanelStringKeys('CommentaryResource')).toEqual({
      titleKey: '%webView_resourcePanel_commentaries_title%',
      titleWithResourceKey: '%webView_resourcePanel_commentaries_title_withResource%',
      emptyStatePromptKey: '%webView_resourcePanel_commentaries_emptyState_prompt%',
      bookNotAvailableKey: '%webView_resourcePanel_commentaries_bookNotAvailable%',
      pickButtonKey: '%webView_resourcePanel_commentaries_pick%',
    });
  });

  it('never serves a key from the other resource type', () => {
    // Guards the failure mode a per-string ternary invites: one line copied and not re-pointed, so
    // the commentaries panel says "Bible text" in a single spot.
    const bible = Object.values(resolveResourcePanelStringKeys('ScriptureResource'));
    const commentaries = Object.values(resolveResourcePanelStringKeys('CommentaryResource'));

    expect(bible.every((key) => key.includes('bibleTexts'))).toBe(true);
    expect(commentaries.every((key) => key.includes('commentaries'))).toBe(true);
  });

  it('gives every non-scripture resource type the commentaries wording', () => {
    // Only `ScriptureResource` gets the Bible-texts wording; an enhanced, XML, or source-language
    // resource falls to the commentary strings. Pinned so that fallback stays a decision rather than
    // drifting per call site.
    const commentaries = resolveResourcePanelStringKeys('CommentaryResource');

    expect(resolveResourcePanelStringKeys('EnhancedResource')).toEqual(commentaries);
    expect(resolveResourcePanelStringKeys('XmlResource')).toEqual(commentaries);
    expect(resolveResourcePanelStringKeys('SourceLanguageResource')).toEqual(commentaries);
  });

  it('exposes both resource types’ keys for the localization parity test', () => {
    // A key the panel renders but that this list omits would silently escape en/es parity coverage.
    expect(RESOURCE_PANEL_TYPED_STRING_KEYS).toHaveLength(10);
    expect(new Set(RESOURCE_PANEL_TYPED_STRING_KEYS).size).toBe(10);
  });
});
